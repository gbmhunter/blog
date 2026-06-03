import { parseValueWithPrefix } from 'src/js/metric-prefix.js';

/**
 * Battery-life estimator.
 *
 * The battery is simulated month-by-month (see computeBatteryLife). Each month:
 *   1. Self-discharge removes a percentage of the *remaining* charge (so the
 *      decay is exponential, matching real Li-ion behaviour).
 *   2. The constant load + PCM draw removes a fixed amount of charge.
 * The cell is considered depleted once the remaining charge falls to the
 * usable floor (1 − usable%) of the full, age-adjusted capacity.
 */

// Average lengths so months/days/years stay self-consistent.
export const HOURS_PER_MONTH = 730.485; // 365.25 / 12 * 24
export const HOURS_PER_YEAR = 8766;     // 365.25 * 24

export const parseCapacity = (t) =>
  parseValueWithPrefix(t, { units: ['mAh'], allowZero: false, allowNegative: false });

export const parseCurrent = (t) =>
  parseValueWithPrefix(t, { units: ['A'], allowZero: true, allowNegative: false });

export const parseNumber = (t) =>
  parseValueWithPrefix(t, { units: [], allowZero: true, allowNegative: false });

export const parseTempC = (t) =>
  parseValueWithPrefix(t, { units: ['°C', 'C'], allowZero: true, allowNegative: true });

/** Range-check an already-parsed { value, error }. Returns a new parsed object. */
export function checkRange(parsed, { min, max, incMin = true, incMax = true }) {
  if (parsed.error) return parsed;
  const v = parsed.value;
  const okMin = incMin ? v >= min : v > min;
  const okMax = incMax ? v <= max : v < max;
  if (!okMin || !okMax) {
    return { value: NaN, error: `Must be ${incMin ? '≥' : '>'} ${min} and ${incMax ? '≤' : '<'} ${max}.` };
  }
  return parsed;
}

// Stop the simulation here so a near-zero drain can't loop forever. 12000
// months = 1000 years, well beyond any real battery's shelf life.
const MAX_MONTHS = 12000;

/**
 * @param p inputs (all already parsed & valid):
 *   capacity_mAh, activeA, dutyPct, sleepA, pcmA, selfDisPct, usablePct, tempC, eolPct
 */
export function computeBatteryLife(p) {
  const eolFrac = p.eolPct / 100;
  const usableFrac = p.usablePct / 100;
  const cFull = p.capacity_mAh * eolFrac;     // full charge available (age-adjusted), mAh
  const cUsable = cFull * usableFrac;         // extractable charge, mAh
  const qCut = cFull - cUsable;               // remaining charge at end-of-life, mAh

  // Average load current (A) from the duty-cycled active + sleep model.
  const duty = p.dutyPct / 100;
  const avgLoadA = p.activeA * duty + p.sleepA * (1 - duty);
  const iConst_mA = (avgLoadA + p.pcmA) * 1000; // mA == mAh per hour

  // Charge drawn by the constant loads each month (mAh/month).
  const loadMonth = avgLoadA * 1000 * HOURS_PER_MONTH;
  const pcmMonth = p.pcmA * 1000 * HOURS_PER_MONTH;
  const constMonth = loadMonth + pcmMonth;

  // Self-discharge rate per month, doubled per +10 °C above a 25 °C reference.
  let rEff = (p.selfDisPct / 100) * Math.pow(2, (p.tempC - 25) / 10);
  let warning = null;
  if (rEff >= 0.99) {
    rEff = 0.99;
    warning = 'Temperature-scaled self-discharge ≥ 99 %/month — clamped; treat the lifetime as a rough lower bound.';
  }
  if (rEff < 0) rEff = 0;

  // No drain at all → battery never reaches the cutoff.
  if (constMonth <= 0 && rEff <= 0) {
    return {
      lifetimeHours: Infinity, lifetimeMonths: Infinity,
      avgLoadA, iConst_mA, rEff, warning, cUsable,
      breakdown: { load_mAh: 0, pcm_mAh: 0, self_mAh: 0, loadFrac: 0, pcmFrac: 0, selfFrac: 0 },
    };
  }

  // Month-by-month simulation.
  let q = cFull;
  let months = 0;
  let loadCharge = 0, pcmCharge = 0, selfCharge = 0;
  let capped = false;

  while (q > qCut) {
    if (months >= MAX_MONTHS) { capped = true; break; }
    const qStart = q;
    const selfLoss = qStart * rEff;             // self-discharge acts on remaining charge
    const qEnd = qStart - selfLoss - constMonth;

    if (qEnd <= qCut) {
      // Cutoff reached partway through this month — interpolate the fraction.
      const f = (qStart - qCut) / (qStart - qEnd);
      months += f;
      selfCharge += selfLoss * f;
      loadCharge += loadMonth * f;
      pcmCharge += pcmMonth * f;
      q = qCut;
      break;
    }

    months += 1;
    selfCharge += selfLoss;
    loadCharge += loadMonth;
    pcmCharge += pcmMonth;
    q = qEnd;
  }

  const total = loadCharge + pcmCharge + selfCharge || 1;
  const lifetimeHours = capped ? Infinity : months * HOURS_PER_MONTH;

  return {
    lifetimeHours,
    lifetimeMonths: capped ? Infinity : months,
    avgLoadA,
    iConst_mA,
    rEff,
    warning: capped ? `Lifetime exceeds ${MAX_MONTHS / 12} years — drain is negligible.` : warning,
    cUsable,
    breakdown: {
      load_mAh: loadCharge, pcm_mAh: pcmCharge, self_mAh: selfCharge,
      loadFrac: loadCharge / total, pcmFrac: pcmCharge / total, selfFrac: selfCharge / total,
    },
  };
}

/** Human-friendly duration from a number of hours. */
export function formatDuration(hours) {
  if (!Number.isFinite(hours)) return '∞';
  if (hours <= 0) return '0';
  const days = hours / 24;
  const months = days / 30.4375;
  const years = days / 365.25;
  if (years >= 1) return `${years.toFixed(years < 10 ? 2 : 1)} years  (${days.toFixed(0)} days)`;
  if (months >= 1) return `${months.toFixed(1)} months  (${days.toFixed(0)} days)`;
  if (days >= 1) return `${days.toFixed(1)} days`;
  return `${hours.toFixed(1)} hours`;
}

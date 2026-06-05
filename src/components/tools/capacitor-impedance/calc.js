import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

export const parseCapacitance = (text) =>
  parseValueWithPrefix(text, { units: ['F', 'farads', 'farad'] });

export const parseFrequency = (text) =>
  parseValueWithPrefix(text, { units: ['Hz', 'hertz'] });

export const parseResistance = (text) =>
  parseValueWithPrefix(text, { units: ['Ω', 'ohms', 'ohm'], rNotation: true, allowZero: true });

export const parseInductance = (text) =>
  parseValueWithPrefix(text, { units: ['H', 'henries', 'henry'], allowZero: true });

export const formatResistance = (v, sigFigs = 4) => formatValueWithPrefix(v, 'Ω', { sigFigs });
export const formatFrequency = (v, sigFigs = 4) => formatValueWithPrefix(v, 'Hz', { sigFigs });

const TICK_PREFIXES = [
  { f: 1e12, s: 'T' }, { f: 1e9, s: 'G' }, { f: 1e6, s: 'M' }, { f: 1e3, s: 'k' },
  { f: 1, s: '' }, { f: 1e-3, s: 'm' }, { f: 1e-6, s: 'µ' }, { f: 1e-9, s: 'n' }, { f: 1e-12, s: 'p' },
];

// Compact metric-prefixed axis-tick label, no unit/space: 1e6 -> "1M", 1e-3 -> "1m".
export function formatMetricTick(value) {
  if (!Number.isFinite(value)) return '';
  if (value === 0) return '0';
  const abs = Math.abs(value);
  for (const p of TICK_PREFIXES) {
    if (abs >= p.f) return `${parseFloat((value / p.f).toPrecision(3))}${p.s}`;
  }
  return `${parseFloat(value.toPrecision(3))}`;
}

// Like formatMetricTick but only labels exact decade boundaries (powers of ten),
// returning '' for the in-between minor ticks. Used on log axes that span many
// decades so labels don't collide (the gridlines for unlabelled ticks remain).
export function formatMetricDecade(value) {
  if (!Number.isFinite(value) || value <= 0) return '';
  const log = Math.log10(value);
  if (Math.abs(log - Math.round(log)) > 1e-6) return '';
  return formatMetricTick(value);
}

const TWO_PI = 2 * Math.PI;

// Capacitive reactance X_C = 1 / (2πfC).
export function capacitiveReactance(f, C) {
  return 1 / (TWO_PI * f * C);
}

// Inductive reactance X_L = 2πf·ESL (from the parasitic series inductance).
export function inductiveReactance(f, ESL) {
  return TWO_PI * f * ESL;
}

// Impedance magnitude |Z| = sqrt(ESR² + (X_L − X_C)²).
export function impedanceMagnitude(f, C, ESR, ESL) {
  const reactance = inductiveReactance(f, ESL) - capacitiveReactance(f, C);
  return Math.sqrt(ESR * ESR + reactance * reactance);
}

// Self-resonant frequency f_SRF = 1 / (2π·√(ESL·C)). Null when there's no
// parasitic inductance (an ideal cap never resonates).
export function selfResonantFreq(C, ESL) {
  if (!(ESL > 0) || !(C > 0)) return null;
  return 1 / (TWO_PI * Math.sqrt(ESL * C));
}

/**
 * Log-spaced sweep of |Z| (and the ideal reactance X_C) vs frequency. The range
 * is chosen to comfortably bracket both the marked frequency and the
 * self-resonant frequency so the characteristic V-shape is always visible.
 */
export function impedanceSweep({ C, ESR, ESL, fMark, points = 240 }) {
  const srf = selfResonantFreq(C, ESL);
  const anchors = [fMark, srf].filter((x) => Number.isFinite(x) && x > 0);
  const lo = Math.min(...anchors) / 100;
  const hi = Math.max(...anchors) * 100;
  const ratio = hi / lo;

  const z = [];
  const ideal = [];
  for (let i = 0; i < points; i++) {
    const f = lo * Math.pow(ratio, i / (points - 1));
    // Floor at a tiny epsilon so a near-zero |Z| (ESR = 0 at exact resonance)
    // can't break the logarithmic y-axis.
    z.push({ x: f, y: Math.max(impedanceMagnitude(f, C, ESR, ESL), 1e-6) });
    ideal.push({ x: f, y: capacitiveReactance(f, C) });
  }
  return { z, ideal, lo, hi };
}

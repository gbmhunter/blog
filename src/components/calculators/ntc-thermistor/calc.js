import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

export const parseUnitless = (t) => parseValueWithPrefix(t, { units: [] });
export const parseResistance = (t) => parseValueWithPrefix(t, { units: ['Ω', 'ohms', 'ohm'], rNotation: true });

// Temperature unit conversions. Internal calculations are in kelvin — the
// per-input unit dropdown picks the unit the user sees / types in. Each entry
// provides toK / fromK conversion functions (not multipliers, since the
// offsets between scales aren't simple ratios).
export const TEMP_UNITS = [
  { label: 'K',  toK: (v) => v,                          fromK: (v) => v },
  { label: '°C', toK: (v) => v + 273.15,                 fromK: (v) => v - 273.15 },
  { label: '°F', toK: (v) => (v - 32) * (5 / 9) + 273.15, fromK: (v) => (v - 273.15) * (9 / 5) + 32 },
];

export function getTempUnit(label) {
  return TEMP_UNITS.find((u) => u.label === label) ?? TEMP_UNITS[0];
}

// Parse a plain number (no metric prefix, no unit). The unit comes from the
// dropdown for temperature fields.
export function parseNumber(text) {
  const s = String(text ?? '').trim();
  if (s === '') return { value: NaN, error: 'Empty' };
  const v = Number(s);
  if (!Number.isFinite(v)) return { value: NaN, error: 'Not a number' };
  return { value: v, error: null };
}

export const formatUnitless = (v) => Number.isFinite(v) ? v.toPrecision(5) : '—';
export const formatResistance = (v) => formatValueWithPrefix(v, 'Ω', { sigFigs: 4 });

// Format a kelvin value into the chosen display unit, with the unit suffix.
export function formatTempIn(kelvin, unitLabel) {
  if (!Number.isFinite(kelvin)) return '—';
  const unit = getTempUnit(unitLabel);
  const v = unit.fromK(kelvin);
  return `${v.toFixed(3)} ${unit.label}`;
}

// Beta equation: 1/T = 1/T0 + (1/β)·ln(R/R0)
// Solve for whichever of {beta, refR, refT, R, T} is the target.
// All temperature inputs/outputs are in kelvin — convert at the boundary.
export function computeNtc(target, { beta, refR, refT, R, T }) {
  switch (target) {
    case 'beta':
      if (R <= 0 || refR <= 0 || refT <= 0 || T <= 0)
        return errResult('All other variables must be greater than zero.');
      return { value: Math.log(R / refR) / (1 / T - 1 / refT), error: null };
    case 'refR':
      if (R <= 0 || beta <= 0 || refT <= 0 || T <= 0)
        return errResult('All other variables must be greater than zero.');
      return { value: R / Math.exp(beta * (1 / T - 1 / refT)), error: null };
    case 'refT':
      if (R <= 0 || refR <= 0 || beta <= 0 || T <= 0)
        return errResult('All other variables must be greater than zero.');
      return { value: 1 / (1 / T - (1 / beta) * Math.log(R / refR)), error: null };
    case 'R':
      if (refR <= 0 || beta <= 0 || refT <= 0 || T <= 0)
        return errResult('All other variables must be greater than zero.');
      return { value: refR * Math.exp(beta * (1 / T - 1 / refT)), error: null };
    case 'T':
      if (R <= 0 || refR <= 0 || beta <= 0 || refT <= 0)
        return errResult('All other variables must be greater than zero.');
      return { value: 1 / (1 / refT + (1 / beta) * Math.log(R / refR)), error: null };
    default:
      return errResult(`Unknown target "${target}".`);
  }
}

function errResult(error) { return { value: NaN, error }; }

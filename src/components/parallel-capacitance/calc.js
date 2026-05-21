import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

export const parseCapacitance = (text) =>
  parseValueWithPrefix(text, { units: ['F', 'farads', 'farad'] });

export const formatCapacitance = (farads, sigFigs = 4) =>
  formatValueWithPrefix(farads, 'F', { sigFigs });

// C_total = sum(C_i). All capacitances must be finite and non-negative.
export function parallelCapacitance(capacitances) {
  if (capacitances.length === 0) return NaN;
  let sum = 0;
  for (const c of capacitances) {
    if (!Number.isFinite(c) || c < 0) return NaN;
    sum += c;
  }
  return sum;
}

import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

export const parseCapacitance = (text) =>
  parseValueWithPrefix(text, { units: ['F', 'farads', 'farad'] });

export const formatCapacitance = (farads, sigFigs = 4) =>
  formatValueWithPrefix(farads, 'F', { sigFigs });

// 1 / C_total = sum(1 / C_i). All capacitances must be positive and finite.
export function seriesCapacitance(capacitances) {
  if (capacitances.length === 0) return NaN;
  let sumReciprocal = 0;
  for (const c of capacitances) {
    if (!Number.isFinite(c) || c <= 0) return NaN;
    sumReciprocal += 1 / c;
  }
  return 1 / sumReciprocal;
}

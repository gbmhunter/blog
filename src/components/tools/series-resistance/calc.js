import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

export const parseResistance = (text) =>
  parseValueWithPrefix(text, { units: ['Ω', 'ohm', 'ohms'], rNotation: true });

export const formatResistance = (ohms, sigFigs = 4) =>
  formatValueWithPrefix(ohms, 'Ω', { sigFigs });

// R_total = sum(R_i). All resistances must be finite and non-negative.
export function seriesResistance(resistances) {
  if (resistances.length === 0) return NaN;
  let sum = 0;
  for (const r of resistances) {
    if (!Number.isFinite(r) || r < 0) return NaN;
    sum += r;
  }
  return sum;
}

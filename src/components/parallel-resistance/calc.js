import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

export const parseResistance = (text) =>
  parseValueWithPrefix(text, { units: ['Ω', 'ohm', 'ohms'], rNotation: true });

export const formatResistance = (ohms, sigFigs = 4) =>
  formatValueWithPrefix(ohms, 'Ω', { sigFigs });

// R_total = 1 / sum(1 / R_i). All resistances must be positive and finite.
export function parallelResistance(resistances) {
  if (resistances.length === 0) return NaN;
  let sumConductance = 0;
  for (const r of resistances) {
    if (!Number.isFinite(r) || r <= 0) return NaN;
    sumConductance += 1 / r;
  }
  return 1 / sumConductance;
}

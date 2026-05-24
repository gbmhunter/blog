import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

export const parseResistance = (text) =>
  parseValueWithPrefix(text, { units: ['Ω', 'ohms', 'ohm'], rNotation: true });

export const parseCapacitance = (text) =>
  parseValueWithPrefix(text, { units: ['F', 'farads', 'farad'] });

export const parseFrequency = (text) =>
  parseValueWithPrefix(text, { units: ['Hz', 'hertz'] });

export const formatResistance = (v, sigFigs = 4) => formatValueWithPrefix(v, 'Ω', { sigFigs });
export const formatCapacitance = (v, sigFigs = 4) => formatValueWithPrefix(v, 'F', { sigFigs });
export const formatFrequency = (v, sigFigs = 4) => formatValueWithPrefix(v, 'Hz', { sigFigs });

// Solve f_c = 1 / (2πRC) for the unknown given the other two.
// Returns { value, error } — value is the computed quantity in SI units.
export function computeUnknown(target, knowns) {
  const { resistance, capacitance, frequency } = knowns;
  const twoPi = 2 * Math.PI;

  switch (target) {
    case 'frequency':
      if (resistance <= 0 || capacitance <= 0) {
        return { value: NaN, error: 'R and C must be greater than zero.' };
      }
      return { value: 1 / (twoPi * resistance * capacitance), error: null };
    case 'resistance':
      if (frequency <= 0 || capacitance <= 0) {
        return { value: NaN, error: 'f_c and C must be greater than zero.' };
      }
      return { value: 1 / (twoPi * frequency * capacitance), error: null };
    case 'capacitance':
      if (frequency <= 0 || resistance <= 0) {
        return { value: NaN, error: 'f_c and R must be greater than zero.' };
      }
      return { value: 1 / (twoPi * frequency * resistance), error: null };
    default:
      return { value: NaN, error: `Unknown target "${target}".` };
  }
}

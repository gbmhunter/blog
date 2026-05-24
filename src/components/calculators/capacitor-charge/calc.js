import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

export const parseCharge = (text) =>
  parseValueWithPrefix(text, { units: ['C', 'coulombs', 'coulomb'], allowZero: true });

export const parseCapacitance = (text) =>
  parseValueWithPrefix(text, { units: ['F', 'farads', 'farad'] });

export const parseVoltage = (text) =>
  parseValueWithPrefix(text, { units: ['V', 'volts', 'volt'], allowZero: true, allowNegative: true });

export const formatCharge = (v, sigFigs = 4) => formatValueWithPrefix(v, 'C', { sigFigs });
export const formatCapacitance = (v, sigFigs = 4) => formatValueWithPrefix(v, 'F', { sigFigs });
export const formatVoltage = (v, sigFigs = 4) => formatValueWithPrefix(v, 'V', { sigFigs });

// Solve Q = CV for the unknown given the other two.
// Returns { value, error } — value is the computed quantity in SI units.
export function computeUnknown(target, knowns) {
  const { charge, capacitance, voltage } = knowns;

  switch (target) {
    case 'charge':
      return { value: capacitance * voltage, error: null };
    case 'capacitance':
      if (voltage === 0) return { value: NaN, error: 'Voltage must be non-zero to solve for capacitance.' };
      return { value: charge / voltage, error: null };
    case 'voltage':
      if (capacitance === 0) return { value: NaN, error: 'Capacitance must be non-zero to solve for voltage.' };
      return { value: charge / capacitance, error: null };
    default:
      return { value: NaN, error: `Unknown target "${target}".` };
  }
}

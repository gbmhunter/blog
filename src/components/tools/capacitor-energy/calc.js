import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

export const parseEnergy = (text) =>
  parseValueWithPrefix(text, { units: ['J', 'joules', 'joule'], allowZero: true });

export const parseCapacitance = (text) =>
  parseValueWithPrefix(text, { units: ['F', 'farads', 'farad'] });

export const parseVoltage = (text) =>
  parseValueWithPrefix(text, { units: ['V', 'volts', 'volt'], allowZero: true, allowNegative: true });

export const formatEnergy = (v, sigFigs = 4) => formatValueWithPrefix(v, 'J', { sigFigs });
export const formatCapacitance = (v, sigFigs = 4) => formatValueWithPrefix(v, 'F', { sigFigs });
export const formatVoltage = (v, sigFigs = 4) => formatValueWithPrefix(v, 'V', { sigFigs });

// Solve E = 1/2 C V^2 for the unknown given the other two.
// Returns { value, error } — value is the computed quantity in SI units.
export function computeUnknown(target, knowns) {
  const { energy, capacitance, voltage } = knowns;

  switch (target) {
    case 'energy':
      return { value: 0.5 * capacitance * voltage * voltage, error: null };
    case 'capacitance':
      if (voltage === 0) return { value: NaN, error: 'Voltage must be non-zero to solve for capacitance.' };
      return { value: (2 * energy) / (voltage * voltage), error: null };
    case 'voltage':
      if (capacitance === 0) return { value: NaN, error: 'Capacitance must be non-zero to solve for voltage.' };
      // Energy is parsed as non-negative, so the square root is always real.
      return { value: Math.sqrt((2 * energy) / capacitance), error: null };
    default:
      return { value: NaN, error: `Unknown target "${target}".` };
  }
}

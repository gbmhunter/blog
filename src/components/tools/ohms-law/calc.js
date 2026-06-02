import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

export const parseVoltage = (text) =>
  parseValueWithPrefix(text, { units: ['V', 'volts', 'volt'], allowZero: true, allowNegative: true });

export const parseCurrent = (text) =>
  parseValueWithPrefix(text, { units: ['A', 'amps', 'amp', 'amperes'], allowZero: true, allowNegative: true });

export const parseResistance = (text) =>
  parseValueWithPrefix(text, { units: ['Ω', 'ohms', 'ohm'], rNotation: true });

export const formatVoltage = (v, sigFigs = 4) => formatValueWithPrefix(v, 'V', { sigFigs });
export const formatCurrent = (v, sigFigs = 4) => formatValueWithPrefix(v, 'A', { sigFigs });
export const formatResistance = (v, sigFigs = 4) => formatValueWithPrefix(v, 'Ω', { sigFigs });

// Solve V = IR for the unknown given the other two.
// Returns { value, error } — value is the computed quantity in SI units.
export function computeUnknown(target, knowns) {
  const { voltage, current, resistance } = knowns;

  switch (target) {
    case 'voltage':
      return { value: current * resistance, error: null };
    case 'current':
      if (resistance === 0) return { value: NaN, error: 'Resistance must be non-zero to solve for current.' };
      return { value: voltage / resistance, error: null };
    case 'resistance':
      if (current === 0) return { value: NaN, error: 'Current must be non-zero to solve for resistance.' };
      return { value: voltage / current, error: null };
    default:
      return { value: NaN, error: `Unknown target "${target}".` };
  }
}

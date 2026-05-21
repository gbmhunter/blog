import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

export const parseVoltage = (text) =>
  parseValueWithPrefix(text, { units: ['V', 'volts', 'volt'], allowZero: true });

export const parseResistance = (text) =>
  parseValueWithPrefix(text, { units: ['Ω', 'ohms', 'ohm'], rNotation: true });

export const formatVoltage = (v, sigFigs = 4) => formatValueWithPrefix(v, 'V', { sigFigs });
export const formatResistance = (r, sigFigs = 4) => formatValueWithPrefix(r, 'Ω', { sigFigs });

// Compute the unknown parameter of a resistor divider given the other three.
// Returns { value, error } — value is the computed quantity in SI units (volts or ohms).
export function computeUnknown(target, knowns) {
  const { vin, r1, r2, vout } = knowns;

  switch (target) {
    case 'vout': {
      if (r1 + r2 <= 0) return { value: NaN, error: 'R1 + R2 must be greater than zero.' };
      return { value: (vin * r2) / (r1 + r2), error: null };
    }
    case 'vin': {
      if (r2 <= 0) return { value: NaN, error: 'R2 must be greater than zero.' };
      return { value: (vout * (r1 + r2)) / r2, error: null };
    }
    case 'r1': {
      if (vout <= 0) return { value: NaN, error: 'V_OUT must be greater than zero to solve for R1.' };
      if (vin < vout) return { value: NaN, error: 'V_IN must be greater than or equal to V_OUT.' };
      return { value: (r2 * (vin - vout)) / vout, error: null };
    }
    case 'r2': {
      if (vin <= vout) return { value: NaN, error: 'V_IN must be greater than V_OUT to solve for R2.' };
      return { value: (r1 * vout) / (vin - vout), error: null };
    }
    default:
      return { value: NaN, error: `Unknown target "${target}".` };
  }
}

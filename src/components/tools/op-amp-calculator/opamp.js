import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

// Ideal op-amp configurations. Each lists the input fields it needs and a pure
// `compute` that returns the gain and output voltage. Gains assume an ideal
// op-amp (infinite gain/bandwidth/input impedance, matched resistors for the
// difference amp).

export function parseR(text) {
  return parseValueWithPrefix(text, { units: ['Ω', 'ohm', 'ohms'], rNotation: true });
}
export function parseV(text) {
  return parseValueWithPrefix(text, { units: ['V', 'volt', 'volts'], allowNegative: true, allowZero: true });
}
export const fmtR = (v) => formatValueWithPrefix(v, 'Ω');
export const fmtV = (v) => formatValueWithPrefix(v, 'V');

// kind: 'R' (resistance) or 'V' (voltage). main/sub render the symbol.
export const FIELD_META = {
  Rf: { kind: 'R', main: 'R', sub: 'f', label: 'Feedback resistor', def: '10k' },
  Ri: { kind: 'R', main: 'R', sub: 'i', label: 'Ground-leg resistor', def: '1k' },
  Rin: { kind: 'R', main: 'R', sub: 'in', label: 'Input resistor', def: '1k' },
  R1: { kind: 'R', main: 'R', sub: '1', label: 'Input resistors', def: '1k' },
  R2: { kind: 'R', main: 'R', sub: '2', label: 'Feedback / ground resistors', def: '10k' },
  Vin: { kind: 'V', main: 'V', sub: 'in', label: 'Input voltage', def: '1' },
  V1: { kind: 'V', main: 'V', sub: '1', label: 'Input voltage', def: '1' },
  V2: { kind: 'V', main: 'V', sub: '2', label: 'Input voltage', def: '2' },
};

export const CONFIGS = [
  {
    key: 'noninv', label: 'Non-inverting', fields: ['Vin', 'Rf', 'Ri'],
    compute: (p) => { const gain = 1 + p.Rf / p.Ri; return { gain, vout: gain * p.Vin }; },
  },
  {
    key: 'inv', label: 'Inverting', fields: ['Vin', 'Rf', 'Rin'],
    compute: (p) => { const gain = -p.Rf / p.Rin; return { gain, vout: gain * p.Vin }; },
  },
  {
    key: 'buffer', label: 'Buffer', fields: ['Vin'],
    compute: (p) => ({ gain: 1, vout: p.Vin }),
  },
  {
    key: 'diff', label: 'Difference', fields: ['V1', 'V2', 'R1', 'R2'],
    compute: (p) => { const gain = p.R2 / p.R1; return { gain, vout: gain * (p.V2 - p.V1) }; },
  },
];

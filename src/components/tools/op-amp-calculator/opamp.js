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
export function parseC(text) {
  return parseValueWithPrefix(text, { units: ['F', 'farad', 'farads'] });
}
export function parseF(text) {
  return parseValueWithPrefix(text, { units: ['Hz', 'hertz'] });
}
export const fmtR = (v) => formatValueWithPrefix(v, 'Ω');
export const fmtV = (v) => formatValueWithPrefix(v, 'V');
export const fmtC = (v) => formatValueWithPrefix(v, 'F');
export const fmtF = (v) => formatValueWithPrefix(v, 'Hz');

// Unit symbol + placeholder shown for each field kind.
export const KIND_UNIT = { R: 'Ω', V: 'V', C: 'F', F: 'Hz' };
export const KIND_PLACEHOLDER = { R: 'e.g. 10k', V: 'e.g. 1', C: 'e.g. 10n', F: 'e.g. 1k' };

// kind: 'R' (resistance), 'V' (voltage), 'C' (capacitance) or 'F' (frequency).
// main/sub render the symbol.
export const FIELD_META = {
  Rf: { kind: 'R', main: 'R', sub: 'f', label: 'Feedback resistor', def: '10k' },
  Ri: { kind: 'R', main: 'R', sub: 'i', label: 'Ground-leg resistor', def: '1k' },
  Rin: { kind: 'R', main: 'R', sub: 'i', label: 'Input resistor', def: '1k' },
  R1: { kind: 'R', main: 'R', sub: '1', label: 'Input resistors', def: '1k' },
  R2: { kind: 'R', main: 'R', sub: '2', label: 'Feedback / ground resistors', def: '10k' },
  C: { kind: 'C', main: 'C', sub: '', label: 'Capacitor', def: '10n' },
  Ci: { kind: 'C', main: 'C', sub: 'i', label: 'Input capacitor', def: '10n' },
  Cf: { kind: 'C', main: 'C', sub: 'f', label: 'Feedback capacitor', def: '82p' },
  freq: { kind: 'F', main: 'f', sub: '', label: 'Signal frequency', def: '1k' },
  Vin: { kind: 'V', main: 'v', sub: 'in', label: 'Input voltage', def: '1' },
  V1: { kind: 'V', main: 'v', sub: '1', label: 'Input voltage', def: '1' },
  V2: { kind: 'V', main: 'v', sub: '2', label: 'Input voltage', def: '2' },
};

export const CONFIGS = [
  {
    key: 'noninv', label: 'Non-inverting', fields: ['Vin', 'Ri', 'Rf'],
    compute: (p) => { const gain = 1 + p.Rf / p.Ri; return { gain, vout: gain * p.Vin }; },
  },
  {
    key: 'inv', label: 'Inverting', fields: ['Vin', 'Rin', 'Rf'],
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
  {
    // Basic (ideal) differentiator: vout = -Rf C dvin/dt. For a sine at
    // frequency f, the magnitude gain is |A| = 2πf Rf C (rising 20 dB/decade).
    key: 'diffbasic', label: 'Differentiator (basic)', freqDomain: true,
    fields: ['Vin', 'freq', 'Rf', 'C'],
    compute: (p) => {
      const w = 2 * Math.PI * p.freq;
      const gain = w * p.Rf * p.C; // magnitude at this frequency
      return { gain, vout: gain * p.Vin };
    },
  },
  {
    // Practical differentiator: input resistor Ri and feedback capacitor Cf
    // add two corners, f1 = 1/(2π Ri Ci) and f2 = 1/(2π Rf Cf). Below f1 it
    // differentiates, between f1 and f2 it is a flat inverting amp of gain
    // -Rf/Ri, above f2 it rolls off. Transfer-function magnitude:
    //   |A| = ωRf Ci / [√(1+(ωRi Ci)²)·√(1+(ωRf Cf)²)]
    key: 'diffpractical', label: 'Differentiator (practical)', freqDomain: true,
    fields: ['Vin', 'freq', 'Ri', 'Ci', 'Rf', 'Cf'],
    compute: (p) => {
      const w = 2 * Math.PI * p.freq;
      const f1 = 1 / (2 * Math.PI * p.Ri * p.Ci);
      const f2 = 1 / (2 * Math.PI * p.Rf * p.Cf);
      const midGain = p.Rf / p.Ri;
      const num = w * p.Rf * p.Ci;
      const den = Math.sqrt(1 + (w * p.Ri * p.Ci) ** 2) * Math.sqrt(1 + (w * p.Rf * p.Cf) ** 2);
      const gain = num / den;
      const region = p.freq < f1 ? 'Differentiating (below f₁)'
        : p.freq > f2 ? 'Rolling off (above f₂)'
        : 'Flat mid-band (f₁–f₂)';
      return { gain, vout: gain * p.Vin, f1, f2, midGain, region, valid: f1 < f2 };
    },
  },
];

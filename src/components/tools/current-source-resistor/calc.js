import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

// A JFET or depletion-mode MOSFET wired as a two-terminal constant-current
// source is self-biased by a source resistor R_S. The device follows the
// square-law transfer characteristic:
//
//   I_D = I_DSS (1 - V_GS / V_GS(off))^k       (k ≈ 2)
//
// Solving for the gate-source voltage needed to sit at the desired I_D, and
// then for the resistor that develops that voltage:
//
//   V_GS = V_GS(off) [ 1 - (I_D / I_DSS)^(1/k) ]
//   R_S  = |V_GS| / I_D

export const parseCurrent = (text) =>
  parseValueWithPrefix(text, { units: ['A', 'amperes', 'amps', 'amp'] });

// V_GS(off) is negative for an n-channel device; only the magnitude matters for
// R_S, but we accept the datasheet's signed value and take |·| in the compute.
export const parseVoltage = (text) =>
  parseValueWithPrefix(text, { units: ['V', 'volts', 'volt'], allowNegative: true });

export function parseK(text) {
  if (typeof text !== 'string' || text.trim() === '') return { value: NaN, error: 'Enter a value.' };
  const v = Number(text.trim());
  if (!Number.isFinite(v)) return { value: NaN, error: 'Could not parse as a number.' };
  if (v <= 0) return { value: NaN, error: 'k must be greater than zero.' };
  return { value: v, error: null };
}

export const formatCurrent = (v, sigFigs = 4) => formatValueWithPrefix(v, 'A', { sigFigs });
export const formatVoltage = (v, sigFigs = 4) => formatValueWithPrefix(v, 'V', { sigFigs });
export const formatResistance = (v, sigFigs = 4) => formatValueWithPrefix(v, 'Ω', { sigFigs });

// Compute V_GS (returned as a signed, negative voltage) and R_S for one
// operating point. vgsOff is the signed cutoff voltage; its magnitude is used.
// Returns { vgs, rs, error }.
export function computeRs({ iDss, vgsOff, iD, k }) {
  if (!(iDss > 0)) return { vgs: NaN, rs: NaN, error: 'I_DSS must be greater than zero.' };
  if (!(iD > 0)) return { vgs: NaN, rs: NaN, error: 'The desired current must be greater than zero.' };
  if (!(k > 0)) return { vgs: NaN, rs: NaN, error: 'k must be greater than zero.' };
  if (iD >= iDss) {
    return {
      vgs: NaN,
      rs: NaN,
      error: 'The desired I_D must be less than I_DSS — a self-biased source can only regulate below I_DSS.',
    };
  }
  const term = 1 - Math.pow(iD / iDss, 1 / k);
  const vgsMag = Math.abs(vgsOff) * term;
  return { vgs: -vgsMag, rs: vgsMag / iD, error: null };
}

// Datasheet presets (values cited on the discrete-current-sources / MOSFETs
// pages). vgsOff given as [min, max] magnitude-range endpoints (signed).
export const PRESETS = [
  { id: 'dn2540', label: 'DN2540', sub: 'depletion MOSFET', iDss: '150m', vgsOffMin: '-1.5', vgsOffMax: '-3.5', k: '2' },
  { id: 'lnd150', label: 'LND150', sub: 'depletion MOSFET', iDss: '1.5m', vgsOffMin: '-1.0', vgsOffMax: '-3.0', k: '2' },
  { id: '2n5457', label: '2N5457', sub: 'JFET', iDss: '3m', vgsOffMin: '-0.5', vgsOffMax: '-6.0', k: '2' },
];

import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

// MP4558 internal feedback reference voltage (datasheet page 12).
export const V_FB = 0.8;

export const parseFrequency = (text) =>
  parseValueWithPrefix(text, { units: ['Hz', 'hertz'] });

export const parseVoltage = (text) =>
  parseValueWithPrefix(text, { units: ['V', 'volts', 'volt'] });

export const parseCurrent = (text) =>
  parseValueWithPrefix(text, { units: ['A', 'amps', 'amp', 'amperes'] });

export const parseResistance = (text) =>
  parseValueWithPrefix(text, { units: ['Ω', 'ohms', 'ohm'], rNotation: true });

export const parseCapacitance = (text) =>
  parseValueWithPrefix(text, { units: ['F', 'farads', 'farad'] });

// Percentage. "%" is optional.
export const parsePercent = (text) => {
  const stripped = String(text ?? '').trim().replace(/%$/, '').trim();
  return parseValueWithPrefix(stripped, { units: [] });
};

export const formatFrequency = (v, sigFigs = 4) => formatValueWithPrefix(v, 'Hz', { sigFigs });
export const formatVoltage = (v, sigFigs = 4) => formatValueWithPrefix(v, 'V', { sigFigs });
export const formatCurrent = (v, sigFigs = 4) => formatValueWithPrefix(v, 'A', { sigFigs });
export const formatResistance = (v, sigFigs = 4) => formatValueWithPrefix(v, 'Ω', { sigFigs });
export const formatInductance = (v, sigFigs = 4) => formatValueWithPrefix(v, 'H', { sigFigs });

// Compute MP4558 design values. All equations are direct ports of those
// referenced in the MP4558 datasheet (Monolithic Power Systems):
//
//   R_freq      = (100000 / (f_sw_kHz) − 5) kΩ              (page 11)
//   R1          = R2 · (V_out / V_FB − 1)                    (page 12, V_FB = 0.8V)
//   ΔI_L        = I_load · (ripple% / 100)
//   L           = (V_out / (f_sw · ΔI_L)) · (1 − V_out/V_in) (page 12)
//   I_L,peak    = I_load + (V_out / (2·f_sw·L)) · (1 − V_out/V_in)
//   ΔV_in       = (I_load / (f_sw · C_in)) · (V_out/V_in) · (1 − V_out/V_in)   (page 14)
//   ΔV_out      = (V_out / (f_sw · L)) · (1 − V_out/V_in) ·
//                 (R_ESR + 1 / (8 · f_sw · C_out))           (page 14)
export function computeMp4558({
  fSw,
  vOut,
  r2,
  iLoad,
  ripplePercent,
  vIn,
  cIn,
  cOut,
  rEsr,
}) {
  if (fSw <= 0) return errorResult('Switching frequency must be greater than zero.');
  if (vOut <= 0) return errorResult('V_out must be greater than zero.');
  if (vIn <= 0) return errorResult('V_in must be greater than zero.');
  if (vOut >= vIn) return errorResult('V_out must be less than V_in (this is a buck topology).');
  if (r2 <= 0) return errorResult('R2 must be greater than zero.');
  if (iLoad <= 0) return errorResult('I_load must be greater than zero.');
  if (ripplePercent <= 0) return errorResult('Inductor ripple current must be greater than zero.');
  if (cIn <= 0) return errorResult('Input capacitance must be greater than zero.');
  if (cOut <= 0) return errorResult('Output capacitance must be greater than zero.');
  if (rEsr < 0) return errorResult('Output capacitor ESR cannot be negative.');

  // f_sw in kHz for the R_freq formula (datasheet gives it that way).
  const fSwKHz = fSw / 1000;
  const rFreq = (100000 / fSwKHz - 5) * 1000;

  const r1 = r2 * (vOut / V_FB - 1);

  const rippleA = iLoad * (ripplePercent / 100);
  const inductance = (vOut / (fSw * rippleA)) * (1 - vOut / vIn);

  const iLPeak = iLoad + (vOut / (2 * fSw * inductance)) * (1 - vOut / vIn);

  const vInRipple = (iLoad / (fSw * cIn)) * (vOut / vIn) * (1 - vOut / vIn);

  const vOutRipple =
    (vOut / (fSw * inductance)) *
    (1 - vOut / vIn) *
    (rEsr + 1 / (8 * fSw * cOut));

  return { rFreq, r1, inductance, iLPeak, vInRipple, vOutRipple, error: null };
}

function errorResult(error) {
  return {
    rFreq: NaN, r1: NaN, inductance: NaN, iLPeak: NaN,
    vInRipple: NaN, vOutRipple: NaN, error,
  };
}

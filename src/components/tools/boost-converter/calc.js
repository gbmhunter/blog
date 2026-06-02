import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

export const parseVoltage = (t) => parseValueWithPrefix(t, { units: ['V', 'volts', 'volt'], allowZero: true });
export const parseFrequency = (t) => parseValueWithPrefix(t, { units: ['Hz', 'hertz'] });
export const parseCurrent = (t) => parseValueWithPrefix(t, { units: ['A', 'amps', 'amp', 'amperes'] });
export const parsePercent = (t) => {
  const s = String(t ?? '').trim().replace(/%$/, '').trim();
  return parseValueWithPrefix(s, { units: [] });
};

export const formatPercent = (v) => Number.isFinite(v) ? `${(v * 100).toFixed(2)} %` : '—';
export const formatInductance = (v) => formatValueWithPrefix(v, 'H', { sigFigs: 4 });
export const formatCurrent = (v) => formatValueWithPrefix(v, 'A', { sigFigs: 4 });

// Generic boost converter (continuous-conduction mode):
//
//   Volt-second balance during t_on (switch closed) and t_off (switch open):
//     (V_in − V_SW) · D = (V_out + V_D − V_in) · (1 − D)
//   Solving for D:
//     D = (V_out + V_D − V_in) / (V_out + V_D − V_SW)
//
//   In CCM the inductor (= input) average current is set by power balance
//   (ignoring V_SW / V_D losses for the inductor current, since they're already
//   folded into the duty cycle above):
//     I_L_avg = I_out / (1 − D)
//
//   Inductor ripple is specified as a percentage of I_L_avg (matches the
//   convention used in TI SLVA372 and the design procedure on the boost page):
//     ΔI_L = ripple · I_L_avg
//   During t_on the inductor sees V_in − V_SW, giving:
//     L = (V_in − V_SW) · D / (f_sw · ΔI_L)
//
//   Peak inductor current — what the inductor's saturation rating must clear:
//     I_L_peak = I_L_avg + ΔI_L / 2
export function computeBoost({ vIn, vOut, vD, vSw, fSw, iOut, iLRipple }) {
  if (vIn <= 0) return errResult('V_in must be > 0.');
  if (vOut <= 0) return errResult('V_out must be > 0.');
  if (vOut < vIn) return errResult('V_out must be ≥ V_in (boost topology).');
  if (fSw <= 0) return errResult('Switching frequency must be > 0.');
  if (iOut <= 0) return errResult('Output current must be > 0.');
  if (iLRipple <= 0 || iLRipple > 1)
    return errResult('Inductor current ripple must be in (0, 100] %.');

  const duty = (vOut + vD - vIn) / (vOut + vD - vSw);
  if (!Number.isFinite(duty) || duty <= 0 || duty >= 1)
    return errResult('Computed duty cycle is out of range — check V_in / V_out / drops.');

  const iLAvg = iOut / (1 - duty);
  const rippleA = iLAvg * iLRipple;
  const inductance = ((vIn - vSw) * duty) / (fSw * rippleA);
  const iLPeak = iLAvg + rippleA / 2;

  return { duty, iLAvg, iLPeak, inductance, error: null };
}

function errResult(error) {
  return { duty: NaN, iLAvg: NaN, iLPeak: NaN, inductance: NaN, error };
}

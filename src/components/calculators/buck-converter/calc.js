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

// Generic buck:
//   D    = (V_out − V_D) / (V_in − V_SW − V_D)
//   ΔI_L = I_out · ripple
//   L    = (V_in − V_SW − V_out) · D / (f_sw · ΔI_L)
export function computeBuck({ vIn, vOut, vD, vSw, fSw, iOutAvg, iOutRipple }) {
  if (vIn <= 0) return errResult('V_in must be > 0.');
  if (vOut < 0) return errResult('V_out must be ≥ 0.');
  if (vOut >= vIn) return errResult('V_out must be less than V_in (buck topology).');
  if (fSw <= 0) return errResult('Switching frequency must be > 0.');
  if (iOutAvg <= 0) return errResult('Output current must be > 0.');
  if (iOutRipple <= 0 || iOutRipple > 1)
    return errResult('Output current ripple must be in (0, 100] %.');

  const duty = (vOut - vD) / (vIn - vSw - vD);
  if (!Number.isFinite(duty) || duty <= 0 || duty > 1)
    return errResult('Computed duty cycle is out of range — check V_in / V_out / drops.');

  const rippleA = iOutAvg * iOutRipple;
  const inductance = ((vIn - vSw - vOut) * duty) / (fSw * rippleA);
  return { duty, inductance, error: null };
}

function errResult(error) { return { duty: NaN, inductance: NaN, error }; }

import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

const METERS_PER_MIL = 25.4e-6;
const M2_PER_MIL2 = METERS_PER_MIL * METERS_PER_MIL;
const K_B = 0.44;
const K_C = 0.725;

export const parseCurrent = (t) => parseValueWithPrefix(t, { units: ['A', 'amps', 'amp', 'amperes'] });
export const parseLength = (t) => parseValueWithPrefix(t, { units: ['m', 'meters', 'metres', 'meter', 'metre'] });
export const parseTemp = (t) => parseValueWithPrefix(t, { units: ['°C', 'C', 'degC'] });
export const formatLength = (v, sf = 4) => formatValueWithPrefix(v, 'm', { sigFigs: sf });

// IPC-2221A: I = k · ΔT^0.44 · A^0.725, with A in mils² and I in amps.
// k = 0.048 (external), 0.024 (internal). Solving for A gives the required area;
// dividing by track thickness gives the width.
export function computeIpc2221a({ current, tempRise, trackThickness, layer }) {
  if (current <= 0) return { width: NaN, error: 'Current must be greater than zero.' };
  if (tempRise <= 0) return { width: NaN, error: 'Temperature rise must be greater than zero.' };
  if (trackThickness <= 0) return { width: NaN, error: 'Track thickness must be greater than zero.' };

  const k = layer === 'Internal' ? 0.024 : 0.048;
  const areaMils2 = Math.pow(current / (k * Math.pow(tempRise, K_B)), 1 / K_C);
  const areaM2 = areaMils2 * M2_PER_MIL2;
  const width = areaM2 / trackThickness;
  return { width, error: null };
}

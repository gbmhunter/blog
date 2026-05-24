import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

const METERS_PER_MIL = 25.4e-6;
const M2_PER_MIL2 = METERS_PER_MIL * METERS_PER_MIL;
const K = 0.048, B = 0.44, C = 0.725;

export const parseLength = (t) => parseValueWithPrefix(t, { units: ['m', 'meters', 'metres', 'meter', 'metre'] });
export const parseTemp = (t) => parseValueWithPrefix(t, { units: ['°C', 'C', 'degC'] });
export const parseResistivity = (t) => parseValueWithPrefix(t, { units: ['Ω·m', 'Ωm', 'ohm-m', 'ohm·m'] });
export const parseThermalCond = (t) => parseValueWithPrefix(t, { units: ['W/m·K', 'W/mK', 'W/(m·K)'] });

export const formatArea = (m2) => Number.isFinite(m2) ? `${(m2 * 1e12).toPrecision(4)} µm²` : '—';
export const formatResistance = (v) => formatValueWithPrefix(v, 'Ω', { sigFigs: 4 });
export const formatThermalR = (v) => Number.isFinite(v) ? `${v.toPrecision(4)} °C/W` : '—';
export const formatCurrent = (v) => formatValueWithPrefix(v, 'A', { sigFigs: 4 });

// Cross-section, electrical R, thermal R, and IPC-2221A current limit for a via.
//   A_via    = π · (d + t) · t
//   R_via    = ρ · l / A
//   Rθ_via   = l / (k · A)
//   I_max    = K · ΔT^B · A_mils²^C    (IPC-2221A)
export function computeViaCurrent({
  finishedHoleDiameter,
  platingThickness,
  viaLength,
  tempRise,
  resistivity,
  thermalConductivity,
}) {
  const inputs = { finishedHoleDiameter, platingThickness, viaLength, tempRise, resistivity, thermalConductivity };
  for (const [k, v] of Object.entries(inputs)) {
    if (!(v > 0)) return errResult(`${k} must be greater than zero.`);
  }
  const area = Math.PI * (finishedHoleDiameter + platingThickness) * platingThickness;
  const electricalR = (resistivity * viaLength) / area;
  const thermalR = viaLength / (thermalConductivity * area);
  const areaMils2 = area / M2_PER_MIL2;
  const currentLimit = K * Math.pow(tempRise, B) * Math.pow(areaMils2, C);
  return { area, electricalR, thermalR, currentLimit, error: null };
}

function errResult(error) {
  return { area: NaN, electricalR: NaN, thermalR: NaN, currentLimit: NaN, error };
}

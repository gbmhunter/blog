import { parseValueWithPrefix } from 'src/js/metric-prefix.js';

export const parseLength = (t) => parseValueWithPrefix(t, { units: ['m', 'meters', 'metres', 'meter', 'metre'] });
export const parseThermalCond = (t) => parseValueWithPrefix(t, { units: ['W/m·K', 'W/mK', 'W/(m·K)'] });

export const formatArea = (m2) => Number.isFinite(m2) ? `${(m2 * 1e12).toPrecision(4)} µm²` : '—';
export const formatThermalR = (v) => Number.isFinite(v) ? `${v.toPrecision(4)} °C/W` : '—';

// θ_via = h_via / (λ · A_via)  where A_via = π · t_plating · (d_via − t_plating)
export function computeViaThermalR({ viaDiameter, platingThickness, viaHeight, thermalCond }) {
  if (viaDiameter <= 0) return { area: NaN, thermalR: NaN, error: 'Via diameter must be > 0.' };
  if (platingThickness <= 0) return { area: NaN, thermalR: NaN, error: 'Plating thickness must be > 0.' };
  if (platingThickness >= viaDiameter / 2)
    return { area: NaN, thermalR: NaN, error: 'Plating thickness must be less than the via radius.' };
  if (viaHeight <= 0) return { area: NaN, thermalR: NaN, error: 'Via height must be > 0.' };
  if (thermalCond <= 0) return { area: NaN, thermalR: NaN, error: 'Thermal conductivity must be > 0.' };

  const area = Math.PI * platingThickness * (viaDiameter - platingThickness);
  const thermalR = viaHeight / (thermalCond * area);
  return { area, thermalR, error: null };
}

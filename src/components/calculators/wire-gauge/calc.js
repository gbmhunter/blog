import { parseValueWithPrefix } from 'src/js/metric-prefix.js';

// Resistivities in Ωm at ~20°C, matching the table in the NinjaCalc original.
export const MATERIAL_RESISTIVITIES_OHM_M = {
  Aluminium: 2.65e-8,
  Copper: 1.68e-8,
  Silver: 1.59e-8,
};

export const MATERIAL_OPTIONS = [...Object.keys(MATERIAL_RESISTIVITIES_OHM_M), 'Custom'];

export const parseVoltage = (text) =>
  parseValueWithPrefix(text, { units: ['V', 'volts', 'volt'] });

export const parseCurrent = (text) =>
  parseValueWithPrefix(text, { units: ['A', 'amps', 'amp', 'amperes'] });

export const parseLength = (text) =>
  parseValueWithPrefix(text, { units: ['m', 'meters', 'metres', 'meter', 'metre'] });

// Parse a percentage. "%" is optional, but stripped if present.
export const parsePercent = (text) => {
  const stripped = String(text ?? '').trim().replace(/%$/, '').trim();
  return parseValueWithPrefix(stripped, { units: [] });
};

// Resistivity in Ω·m. Use Ω as the unit so metric prefixes still work
// (e.g. "16.8n" parses as 1.68e-8 when the user picks "nano" implicitly).
export const parseResistivity = (text) =>
  parseValueWithPrefix(text, { units: ['Ωm', 'ohm-m', 'ohm.m', 'ohmm'] });

export const formatResistivity = (v, sigFigs = 4) => {
  if (!Number.isFinite(v)) return '—';
  return `${v.toExponential(sigFigs - 1)} Ω·m`;
};

export const formatAreaMm2 = (m2, sigFigs = 4) => {
  if (!Number.isFinite(m2)) return '—';
  const mm2 = m2 * 1e6;
  return `${mm2.toPrecision(sigFigs)} mm²`;
};

export const formatAwg = (n) => {
  if (!Number.isFinite(n)) return '—';
  // AWG only really makes sense as an integer; the calculator floors the
  // result so the chosen wire is at least as thick as required.
  return `${Math.floor(n)} AWG`;
};

// Compute the required cross-sectional area and resulting AWG gauge given the
// voltage source, allowed voltage drop, cable length, current, and conductor
// resistivity.
//
// Steps (matching the equations on the page):
//   V_cable = V_source * (drop% / 100)
//   R_cable = V_cable / I
//   ρ/m     = R_cable / L
//   A       = ρ / (R_cable / L)
//   d       = sqrt(4A / π)
//   AWG     = 36 - 39 · log10(d_mm / 0.127) / log10(92)
export function computeWireGauge({
  sourceVoltage,
  voltageDropPercent,
  cableLength,
  current,
  resistivity,
}) {
  if (sourceVoltage <= 0) return errorResult('Source voltage must be greater than zero.');
  if (voltageDropPercent <= 0) return errorResult('Voltage drop must be greater than zero.');
  if (cableLength <= 0) return errorResult('Cable length must be greater than zero.');
  if (current <= 0) return errorResult('Current must be greater than zero.');
  if (resistivity <= 0) return errorResult('Conductor resistivity must be greater than zero.');

  const voltageDrop = sourceVoltage * (voltageDropPercent / 100);
  const cableResistance = voltageDrop / current;
  const resistancePerMeter = cableResistance / cableLength;
  const crossSectionalAreaM2 = resistivity / resistancePerMeter;

  const diameterM = Math.sqrt((4 * crossSectionalAreaM2) / Math.PI);
  const diameterMm = diameterM * 1000;
  const awg = 36 - 39 * (Math.log(diameterMm / 0.127) / Math.log(92));

  return {
    crossSectionalAreaM2,
    awg,
    error: null,
  };
}

function errorResult(error) {
  return { crossSectionalAreaM2: NaN, awg: NaN, error };
}

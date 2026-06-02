import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

const METERS_PER_MIL = 25.4e-6;
const M_PER_OZ = 0.0000350012;
const M2_PER_MIL2 = METERS_PER_MIL * METERS_PER_MIL;
const W_PER_MK_PER_BTU_HR_FT_F = 1.73;

// IPC-2152 trendline coefficients (Universal Chart, ported from NinjaCalc).
const UC = { AA: 8.9710902134e-2, AB: 3.9379253898e-1, BA: 5.0382053698e-1, BB: 3.8495772461e-2 };
const TT_COEFS = [
  [9.8453567795e-1, -2.2281787548e-1, 2.0061423196e-1, -4.1541116264e-2],
  [-1.657194921e-2, 1.7520059279e-4, -5.0615234096e-3, 2.281483634e-3],
  [8.8711317661e-4, 1.3631745743e-3, -2.237330971e-4, -1.0974218613e-4],
  [-6.6729255031e-6, -1.4976736827e-4, 5.8082340133e-5, -2.4728159584e-6],
  [-7.9576264561e-7, 5.5788354958e-6, -2.4912026388e-6, 2.4000295954e-7],
  [1.6619678738e-8, -7.1122635445e-8, 3.3800191741e-8, -3.9797591878e-9],
];
const BOARD = { A: 2.4929779905e1, B: -7.5501997929e-1 };
const PLANE = { M: 3.1298662911e-3, C: 4.0450883823e-1 };
const TC = { M: -1.4210148167, C: 1.1958174134 };

export const parseCurrent = (t) => parseValueWithPrefix(t, { units: ['A', 'amps', 'amp', 'amperes'] });
export const parseThermalCond = (t) => parseValueWithPrefix(t, { units: ['W/mK', 'W/(m·K)', 'W/(mK)'] });

// ΔT is a temperature *rise* (a difference), so converting °F → °C is a pure
// scale factor (5/9) with no offset. The multiplier converts the typed value to
// °C, which is what computeIpc2152 expects.
export const DELTA_TEMP_UNITS = [
  { label: '°C', multiplier: 1 },
  { label: '°F', multiplier: 5 / 9 },
];

// Length inputs use a unit dropdown instead of metric prefixes (a bare "m"
// collides with the milli prefix, which is confusing). Each entry converts the
// typed magnitude to SI metres. oz here is copper weight expressed as a layer
// thickness.
export const TRACK_THICKNESS_UNITS = [
  { label: 'µm',  multiplier: 1e-6 },
  { label: 'mil', multiplier: METERS_PER_MIL },
  { label: 'oz',  multiplier: M_PER_OZ },
];
export const PCB_LENGTH_UNITS = [
  { label: 'mm',  multiplier: 1e-3 },
  { label: 'mil', multiplier: METERS_PER_MIL },
];

// Units offered for the computed minimum track width output.
export const WIDTH_UNITS = [
  { label: 'mm',  multiplier: 1e-3 },
  { label: 'mil', multiplier: METERS_PER_MIL },
  { label: 'µm',  multiplier: 1e-6 },
];

export function getUnit(table, label) {
  return table.find((u) => u.label === label) ?? table[0];
}

// Ranges actually covered by the IPC-2152 graphs (all bounds in SI units).
// Values outside these force the trend-line equations to extrapolate, so the
// result is less reliable — we warn the user. Limits and wording ported from
// NinjaCalc. (Improvement over NinjaCalc: the over-thickness message also notes
// the 3 oz equivalent, and ranges are surfaced in the help tooltip even when
// the value is in range — see TrackCurrentIpc2152.jsx.)
export const EXTRAPOLATION_LIMITS = {
  current: { max: 26.0,
    over:  'Current is above the maximum value (26 A) extracted from the universal graph in IPC-2152. Results might not be as accurate (extrapolation will occur).' },
  tempRise: { min: 1.0, max: 100.0,
    under: 'Temperature rise is below the minimum value (1 °C) extracted from the universal graph in IPC-2152. Results might not be as accurate (extrapolation will occur).',
    over:  'Temperature rise is above the maximum value (100 °C) extracted from the universal graph in IPC-2152. Results might not be as accurate (extrapolation will occur).' },
  trackThickness: { min: 17.5e-6, max: 105.0036e-6,
    under: 'Track thickness is below the minimum value (17.5 µm / 0.5 oz) extracted from the track-thickness modifier graph in IPC-2152. Results might not be as accurate (extrapolation will occur).',
    over:  'Track thickness is above the maximum value (105 µm / 3 oz) extracted from the track-thickness modifier graph in IPC-2152. Results might not be as accurate (extrapolation will occur).' },
  boardThickness: { min: 0.72e-3, max: 2.36e-3,
    under: 'Board thickness is below the minimum value (0.72 mm) extracted from the board-thickness modifier graph in IPC-2152. Results might not be as accurate (extrapolation will occur).',
    over:  'Board thickness is above the maximum value (2.36 mm) extracted from the board-thickness modifier graph in IPC-2152. Results might not be as accurate (extrapolation will occur).' },
  planeProx: { min: 144e-6, max: 2.4e-3,
    under: 'Plane proximity is below the minimum value (144 µm) extracted from the plane-proximity modifier graph in IPC-2152. Results might not be as accurate (extrapolation will occur).',
    over:  'Plane proximity is above the maximum value (2.40 mm) extracted from the plane-proximity modifier graph in IPC-2152. Results might not be as accurate (extrapolation will occur).' },
  thermalCond: { min: 0.18, max: 0.34,
    under: 'Thermal conductivity is below the minimum value (0.18 W/m·K) extracted from the thermal-conductivity modifier graph in IPC-2152. Results might not be as accurate (extrapolation will occur).',
    over:  'Thermal conductivity is above the maximum value (0.34 W/m·K) extracted from the thermal-conductivity modifier graph in IPC-2152. Results might not be as accurate (extrapolation will occur).' },
};

// Return a warning string if `value` (SI) falls outside the IPC-2152 graph
// range described by `spec`, otherwise null. A non-finite value (e.g. a failed
// parse) yields no warning — the parse error takes precedence in the UI.
export function extrapolationWarning(spec, value) {
  if (!spec || !Number.isFinite(value)) return null;
  if (spec.min != null && value < spec.min) return spec.under;
  if (spec.max != null && value > spec.max) return spec.over;
  return null;
}

// Parse a plain (positive) decimal number. No prefix / unit handling — the unit
// comes from the dropdown, so the input is just the bare magnitude.
export function parseNumber(text) {
  const s = String(text ?? '').trim();
  if (s === '') return { value: NaN, error: 'Enter a value.' };
  const v = Number(s);
  if (!Number.isFinite(v)) return { value: NaN, error: 'Could not parse as a number.' };
  if (v < 0) return { value: NaN, error: 'Value must be non-negative.' };
  return { value: v, error: null };
}

export const formatLength = (v, sf = 4) => formatValueWithPrefix(v, 'm', { sigFigs: sf });
export const formatArea = (m2) => Number.isFinite(m2) ? `${(m2 * 1e12).toPrecision(4)} µm²` : '—';
export const formatRatio = (r) => Number.isFinite(r) ? r.toFixed(3) : '—';

// Compute minimum track width and intermediate modifiers per IPC-2152.
// Inputs are all in SI units. Plane proximity is ignored when isPlanePresent=false.
export function computeIpc2152({
  current,
  tempRise,
  trackThickness,
  boardThickness,
  isPlanePresent,
  planeProximity,
  thermalConductivity,
}) {
  if (current <= 0) return errResult('Current must be greater than zero.');
  if (tempRise <= 0) return errResult('Temperature rise must be greater than zero.');
  if (trackThickness <= 0) return errResult('Track thickness must be greater than zero.');
  if (boardThickness <= 0) return errResult('Board thickness must be greater than zero.');
  if (isPlanePresent && planeProximity <= 0) return errResult('Plane proximity must be greater than zero.');
  if (thermalConductivity <= 0) return errResult('Thermal conductivity must be greater than zero.');

  // Universal-chart unadjusted cross-sectional area
  const ucA = UC.AA * Math.pow(tempRise, UC.AB);
  const ucB = UC.BA * Math.pow(tempRise, UC.BB);
  const unadjustedMils2 = Math.pow(current / ucA, 1 / ucB);
  const unadjustedM2 = unadjustedMils2 * M2_PER_MIL2;

  // Track-thickness modifier (5th-degree poly with coefficients themselves
  // 3rd-degree polys in track thickness in oz).
  const thicknessOz = trackThickness / M_PER_OZ;
  const ttCoefs = TT_COEFS.map((row) =>
    row.reduce((acc, c, j) => acc + c * Math.pow(thicknessOz, j), 0)
  );
  const trackThicknessModifier = ttCoefs.reduce((acc, c, i) => acc + c * Math.pow(current, i), 0);

  // Board-thickness modifier
  const boardMils = boardThickness / METERS_PER_MIL;
  const boardThicknessModifier = BOARD.A * Math.pow(boardMils, BOARD.B);

  // Plane proximity modifier
  let planeProximityModifier = 1;
  if (isPlanePresent) {
    const planeMils = planeProximity / METERS_PER_MIL;
    planeProximityModifier = PLANE.M * planeMils + PLANE.C;
  }

  // Thermal conductivity modifier
  const tcBtu = thermalConductivity / W_PER_MK_PER_BTU_HR_FT_F;
  const thermalConductivityModifier = TC.M * tcBtu + TC.C;

  const adjustedM2 =
    unadjustedM2 *
    trackThicknessModifier *
    boardThicknessModifier *
    planeProximityModifier *
    thermalConductivityModifier;
  const minTrackWidth = adjustedM2 / trackThickness;

  return {
    unadjustedArea: unadjustedM2,
    trackThicknessModifier,
    boardThicknessModifier,
    planeProximityModifier,
    thermalConductivityModifier,
    adjustedArea: adjustedM2,
    minTrackWidth,
    error: null,
  };
}

function errResult(error) {
  return {
    unadjustedArea: NaN, trackThicknessModifier: NaN, boardThicknessModifier: NaN,
    planeProximityModifier: NaN, thermalConductivityModifier: NaN,
    adjustedArea: NaN, minTrackWidth: NaN, error,
  };
}

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
export const parseLength = (t) => parseValueWithPrefix(t, { units: ['m', 'meters', 'metres', 'meter', 'metre'] });
export const parseTemp = (t) => parseValueWithPrefix(t, { units: ['°C', 'C', 'degC', 'celsius'] });
export const parseThermalCond = (t) => parseValueWithPrefix(t, { units: ['W/mK', 'W/(m·K)', 'W/(mK)'] });

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

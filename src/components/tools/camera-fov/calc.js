import { parseValueWithPrefix } from 'src/js/metric-prefix.js';

// Sensor presets for popular embedded camera sensors. Sensor dimensions are
// derived from pixel size × active resolution (this matches the quoted
// diagonals, e.g. IMX477: 1.55 µm × 4056 × 3040 → 7.86 mm diagonal).
export const PRESETS = [
  { label: 'Custom' },
  { label: 'Sony IMX219 (Pi Camera v2)', resH: 3280, resV: 2464, pixelUm: 1.12 },
  { label: 'Sony IMX296 (Pi Global Shutter Camera)', resH: 1440, resV: 1080, pixelUm: 3.45 },
  { label: 'Sony IMX477 (Pi HQ Camera)', resH: 4056, resV: 3040, pixelUm: 1.55 },
  { label: 'Sony IMX708 (Pi Camera v3)', resH: 4608, resV: 2592, pixelUm: 1.4 },
  { label: 'OmniVision OV5647 (Pi Camera v1)', resH: 2592, resV: 1944, pixelUm: 1.4 },
];

export function presetSensorFields(preset) {
  const w = (preset.resH * preset.pixelUm) / 1000;
  const h = (preset.resV * preset.pixelUm) / 1000;
  return {
    sensorW: w.toFixed(3),
    sensorH: h.toFixed(3),
    resH: String(preset.resH),
    resV: String(preset.resV),
  };
}

// Lens presets from the Arducam M12 lens set (SKU LK005), a common lens kit
// for embedded cameras. EFL/F-number/format from the kit's spec table.
// `warn` flags wide-angle/fisheye lenses whose real FoV is considerably wider
// than the rectilinear thin-lens model predicts (barrel distortion).
export const LENS_PRESETS = [
  { label: 'Custom' },
  { label: 'Arducam LN001 — 16 mm f/2.0 telephoto', focal: 16, fNumber: 2.0, model: 'M2516ZH01' },
  { label: 'Arducam LN065 — 12 mm f/2.0 telephoto', focal: 12, fNumber: 2.0, model: 'M2512ZH03' },
  { label: 'Arducam LN002 — 8 mm f/2.0', focal: 8, fNumber: 2.0, model: 'M2508ZH02' },
  { label: 'Arducam LN003 — 6 mm f/2.0', focal: 6, fNumber: 2.0, model: 'M2506ZH04' },
  { label: 'Arducam LN011 — 4 mm f/2.8', focal: 4, fNumber: 2.8, model: 'M2504ZH05S' },
  { label: 'Arducam LN012 — 3.6 mm f/3.0', focal: 3.6, fNumber: 3.0, model: 'M25360H06S' },
  { label: 'Arducam LN013 — 2.8 mm f/2.8 wide', focal: 2.8, fNumber: 2.8, model: 'M27280M07S' },
  { label: 'Arducam LN005 — 2.1 mm f/2.0 wide', focal: 2.1, fNumber: 2.0, model: 'M27210H08', warn: true },
  { label: 'Arducam LN055 — 1.95 mm f/2.0 ultra-wide', focal: 1.95, fNumber: 2.0, model: 'M27195H15', warn: true },
  { label: 'Arducam LN007 — 1.7 mm f/2.0 fisheye', focal: 1.7, fNumber: 2.0, model: 'M25170H12', warn: true },
];

// All these inputs are plain positive numbers (the unit is shown as a fixed
// suffix or a unit dropdown, so no unit stripping is needed here).
export const parsePositive = (t) => parseValueWithPrefix(t, { units: [] });

export const DISTANCE_UNITS = [
  { label: 'mm', multiplier: 1 },
  { label: 'cm', multiplier: 10 },
  { label: 'm', multiplier: 1000 },
];

// How the circle of confusion (the largest blur spot still called "in focus")
// is chosen. Machine vision ties it to the pixel pitch — a blur spot smaller
// than a pixel cannot be seen. The diagonal ÷ 1500 option is the traditional
// photographic convention, based on what the human eye can resolve in a print.
export const COC_PIXEL = '1 × pixel pitch';
export const COC_PIXEL_2 = '2 × pixel pitch';
export const COC_DIAG = 'Sensor diagonal ÷ 1500';
export const COC_CUSTOM = 'Custom';
export const COC_BASES = [COC_PIXEL, COC_PIXEL_2, COC_DIAG, COC_CUSTOM];

/** Resolve the circle of confusion, in µm, for the selected basis. */
export function resolveCocUm(basis, { pixelUm, sensorDiagMm, customUm }) {
  switch (basis) {
    case COC_PIXEL: return pixelUm;
    case COC_PIXEL_2: return 2 * pixelUm;
    case COC_DIAG: return (sensorDiagMm / 1500) * 1000;
    default: return customUm;
  }
}

const DEG_PER_RAD = 180 / Math.PI;

// Airy disc diameter (first null to first null) = 2.44·λ·N. Using λ = 550 nm,
// the middle of the visible band and near the peak of photopic sensitivity.
const WAVELENGTH_UM = 0.55;
export const airyDiscUm = (fNumber) => 2.44 * WAVELENGTH_UM * fNumber;

/**
 * Compute the field-of-view numbers for a sensor + lens + working distance.
 *
 * All lengths are in mm, resolutions in pixels. Uses the thin-lens/pinhole
 * model: an object plane at distance d_o from the lens maps onto the sensor
 * with magnification m = f / (d_o − f), so the scene width covered is
 * w_fov = w_sensor · (d_o − f) / f. Angular FoV is the infinity-focus value
 * 2·atan(w_sensor / 2f).
 *
 * Depth of field uses the standard geometric-blur model built on the
 * hyperfocal distance H = f²/(N·c) + f, where c is the circle of confusion.
 * It ignores diffraction — see `airyDiscUm` for the sanity check on that.
 *
 * @param solveFor 'fovWidth' (focal known) or 'focal' (required FoV width known).
 * @returns an object of results, or { error } if the geometry is impossible.
 */
export function compute({ solveFor, sensorW, sensorH, resH, focal, fovWidth, distance, fNumber, cocUm }) {
  let f = focal;
  let wFov = fovWidth;

  if (solveFor === 'focal') {
    // From w_fov = w_s (d − f) / f  →  f = w_s · d / (w_fov + w_s)
    f = (sensorW * distance) / (wFov + sensorW);
  } else {
    if (distance <= f) {
      return { error: 'Working distance must be greater than the focal length.' };
    }
    wFov = (sensorW * (distance - f)) / f;
  }

  const hFov = (sensorH * (distance - f)) / f;
  const sensorDiag = Math.hypot(sensorW, sensorH);

  return {
    error: null,
    focal: f,
    fovWidth: wFov,
    fovHeight: hFov,
    hFovDeg: 2 * Math.atan(sensorW / (2 * f)) * DEG_PER_RAD,
    vFovDeg: 2 * Math.atan(sensorH / (2 * f)) * DEG_PER_RAD,
    dFovDeg: 2 * Math.atan(sensorDiag / (2 * f)) * DEG_PER_RAD,
    sensorDiag,
    pixelUm: (sensorW / resH) * 1000,
    mmPerPx: wFov / resH,
    pxPerMm: resH / wFov,
    ...computeDof({ f, distance, fNumber, cocUm }),
  };
}

/**
 * Depth of field about an object plane at `distance`, using the geometric
 * (blur-circle) model. Everything in mm except `cocUm`.
 *
 * Beyond the hyperfocal distance the far limit runs off to infinity, which is
 * returned as `Infinity` rather than as a negative number.
 */
function computeDof({ f, distance, fNumber, cocUm }) {
  const c = cocUm / 1000;
  if (!(f > 0) || !(fNumber > 0) || !(c > 0) || !(distance > f)) {
    return { hyperfocal: NaN, dofNear: NaN, dofFar: NaN, dofTotal: NaN };
  }

  const hyperfocal = (f * f) / (fNumber * c) + f;
  const dofNear = (distance * (hyperfocal - f)) / (hyperfocal + distance - 2 * f);
  const dofFar = distance >= hyperfocal
    ? Infinity
    : (distance * (hyperfocal - f)) / (hyperfocal - distance);

  return { hyperfocal, dofNear, dofFar, dofTotal: dofFar - dofNear };
}

// Format a length in mm, auto-scaling to µm or m when appropriate.
export function formatLen(mm) {
  if (!Number.isFinite(mm)) return '—';
  if (mm >= 1000) return `${(mm / 1000).toPrecision(4)} m`;
  if (mm < 0.1) return `${(mm * 1000).toPrecision(4)} µm`;
  return `${mm.toPrecision(4)} mm`;
}

// As above, but for distances that legitimately run to infinity (the far DoF
// limit at or beyond the hyperfocal distance).
export const formatLenInf = (mm) => (mm === Infinity ? '∞' : formatLen(mm));

export const formatDeg = (deg) => `${deg.toFixed(1)}°`;
export const formatUm = (um) => `${um.toPrecision(3)} µm`;
export const formatPxPerMm = (v) => `${v.toPrecision(4)} px/mm`;

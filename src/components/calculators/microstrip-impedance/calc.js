// Unit tables for the dropdowns. Each entry: { label, multiplier_to_SI }.
// E.g. "mm" → 1e-3 means the user-typed value gets multiplied by 1e-3 to get
// metres.
export const LENGTH_UNITS = [
  { label: 'um', multiplier: 1e-6 },
  { label: 'mm', multiplier: 1e-3 },
];

export const IMPEDANCE_UNITS = [
  { label: 'mΩ', multiplier: 1e-3 },
  { label: 'Ω',  multiplier: 1e0 },
  { label: 'kΩ', multiplier: 1e3 },
  { label: 'MΩ', multiplier: 1e6 },
];

export function getUnit(table, label) {
  return table.find((u) => u.label === label) ?? table[0];
}

// Typical ranges for the microstrip approximation (all bounds in SI units, the
// dielectric is unit-less). Outside these the rfcafe formula is being pushed
// past usual PCB geometries, so we warn that the result is less reliable.
// Limits and wording ported from NinjaCalc.
export const RANGE_WARNINGS = {
  trackWidth:      { max: 10e-3,    over: 'This is a wide track. Results may not be as accurate.' },
  trackThickness:  { max: 355.6e-6, over: 'This is a very large track thickness (most are below 355.6 µm / 10 oz). Results may not be as accurate.' },
  substrateHeight: { max: 2e-3,     over: 'This is a very large substrate thickness (typically 1.6 mm or less). Results may not be as accurate.' },
  dielectric:      { max: 20,       over: 'This is a very large dielectric constant (typically around 3–6). Results may not be as accurate.' },
};

// Return a warning string if `value` (SI, or unit-less for the dielectric)
// falls outside `spec`'s range, else null. Non-finite yields no warning (a
// parse error takes precedence in the UI).
export function rangeWarning(spec, value) {
  if (!spec || !Number.isFinite(value)) return null;
  if (spec.min != null && value < spec.min) return spec.under;
  if (spec.max != null && value > spec.max) return spec.over;
  return null;
}

// Parse a plain (positive) decimal number. No prefix / unit handling — the
// unit comes from the dropdown, so the input is just the bare magnitude.
export function parseNumber(text) {
  const s = String(text ?? '').trim();
  if (s === '') return { value: NaN, error: 'Empty' };
  const v = Number(s);
  if (!Number.isFinite(v)) return { value: NaN, error: 'Not a number' };
  if (v < 0) return { value: NaN, error: 'Must be non-negative' };
  return { value: v, error: null };
}

// Format an impedance value in the given output unit, returning the magnitude
// number (formatted to sigFigs) and the unit label.
export function formatInUnit(siValue, unit, sigFigs = 4) {
  if (!Number.isFinite(siValue)) return '—';
  const v = siValue / unit.multiplier;
  return `${v.toPrecision(sigFigs)} ${unit.label}`;
}

// Compute the characteristic impedance of a microstrip using the equations
// from http://www.rfcafe.com/references/electrical/microstrip-eq.htm:
//
//   W       = w + (t/π) · (ln(2h/t) + 1)
//   H       = h − 2t
//   if W/H < 1:
//     ε_eff = (ε_r+1)/2 + ((ε_r−1)/2) · (1/√(1 + 12H/W) + 0.04·(1 − W/H)²)
//     Z     = (60 / √ε_eff) · ln(8H/W + W/(4H))
//   else:
//     ε_eff = (ε_r+1)/2 + (ε_r−1) / (2·√(1 + 12H/W))
//     Z     = 120π / (√ε_eff · (W/H + 1.393 + (2/3)·ln(W/H + 1.444)))
//
// Note: NinjaCalc's source had a typo in the W/H < 1 branch (multiplying
// instead of dividing in the W/(4H) term). This implementation uses the
// correct rfcafe formula.
export function computeMicrostripImpedance({
  trackWidth,        // w, in metres
  trackThickness,    // t, in metres
  substrateHeight,   // h, in metres
  dielectric,        // ε_r, unit-less
}) {
  if (trackWidth <= 0) return errorResult('Track width must be greater than zero.');
  if (trackThickness <= 0) return errorResult('Track thickness must be greater than zero.');
  if (substrateHeight <= 0) return errorResult('Substrate thickness must be greater than zero.');
  if (substrateHeight <= 2 * trackThickness) {
    return errorResult('Substrate must be thicker than 2× the track thickness for this approximation to apply.');
  }
  if (dielectric <= 0) return errorResult('Dielectric constant must be greater than zero.');

  const w = trackWidth;
  const t = trackThickness;
  const h = substrateHeight;
  const eR = dielectric;

  const W = w + (t / Math.PI) * (Math.log((2 * h) / t) + 1);
  const H = h - 2 * t;
  const ratio = W / H;

  let eEff;
  let Z;
  if (ratio < 1) {
    eEff =
      (eR + 1) / 2 +
      ((eR - 1) / 2) *
        (1 / Math.sqrt(1 + (12 * H) / W) +
          0.04 * Math.pow(1 - W / H, 2));
    Z = (60 / Math.sqrt(eEff)) * Math.log((8 * H) / W + W / (4 * H));
  } else {
    eEff = (eR + 1) / 2 + (eR - 1) / (2 * Math.sqrt(1 + (12 * H) / W));
    Z =
      (120 * Math.PI) /
      (Math.sqrt(eEff) *
        (W / H + 1.393 + (2 / 3) * Math.log(W / H + 1.444)));
  }

  return { impedance: Z, eEff, error: null };
}

function errorResult(error) {
  return { impedance: NaN, eEff: NaN, error };
}

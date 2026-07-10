// Math for the s-plane pole-zero explorer. A transfer function is defined by a
// set of poles, a set of zeros, and a gain K:
//
//   H(s) = K · Π(s - z_i) / Π(s - p_j)
//
// Poles/zeros are stored as single complex points; a point with a non-zero
// imaginary part implicitly carries its complex conjugate, so the expanded
// polynomial always has real coefficients (a real, physically-realisable system).

// ---- tiny complex helpers -------------------------------------------------
const cadd = (a, b) => ({ re: a.re + b.re, im: a.im + b.im });
const cmul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const cdiv = (a, b) => {
  const d = b.re * b.re + b.im * b.im;
  return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d };
};
const cabs = (a) => Math.hypot(a.re, a.im);

// Convolve two complex coefficient arrays (descending powers).
function polymulC(a, b) {
  const out = Array.from({ length: a.length + b.length - 1 }, () => ({ re: 0, im: 0 }));
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) out[i + j] = cadd(out[i + j], cmul(a[i], b[j]));
  }
  return out;
}

/**
 * Expand a set of roots into a real, monic polynomial (coefficients descending).
 * Each root with a non-zero imaginary part also contributes its conjugate.
 */
export function rootsToPoly(roots) {
  const full = [];
  for (const r of roots) {
    full.push({ re: r.re, im: r.im });
    if (Math.abs(r.im) > 1e-9) full.push({ re: r.re, im: -r.im });
  }
  let coeffs = [{ re: 1, im: 0 }];
  for (const root of full) {
    coeffs = polymulC(coeffs, [{ re: 1, im: 0 }, { re: -root.re, im: -root.im }]);
  }
  return coeffs.map((c) => c.re); // imaginary parts cancel for a conjugate-closed set
}

// Evaluate a real polynomial (descending coeffs) at a complex point s (Horner).
function polyEvalC(coeffs, s) {
  let acc = { re: 0, im: 0 };
  for (const c of coeffs) acc = cadd(cmul(acc, s), { re: c, im: 0 });
  return acc;
}

/** Degrees of the numerator/denominator for the given poles/zeros (incl. conjugates). */
export function orders(poles, zeros) {
  const count = (roots) => roots.reduce((n, r) => n + (Math.abs(r.im) > 1e-9 ? 2 : 1), 0);
  return { n: count(poles), m: count(zeros) };
}

/**
 * Frequency response over an array of angular frequencies [rad/s].
 * Returns { mag: [{x,y}], phase: [{x,y}] } with magnitude in dB and phase in
 * degrees (unwrapped).
 */
export function freqResponse(poles, zeros, K, omegas) {
  const den = rootsToPoly(poles);
  const num = rootsToPoly(zeros).map((c) => c * K);
  const mag = [];
  const phase = [];
  let offset = 0;
  let prev = null;
  for (const w of omegas) {
    const s = { re: 0, im: w };
    const H = cdiv(polyEvalC(num, s), polyEvalC(den, s));
    mag.push({ x: w, y: 20 * Math.log10(Math.max(cabs(H), 1e-12)) });
    let ph = Math.atan2(H.im, H.re) * 180 / Math.PI;
    if (prev !== null) {
      // unwrap: keep successive samples within ±180°
      let d = ph + offset - prev;
      while (d > 180) { offset -= 360; d -= 360; }
      while (d < -180) { offset += 360; d += 360; }
    }
    const unwrapped = ph + offset;
    phase.push({ x: w, y: unwrapped });
    prev = unwrapped;
  }
  return { mag, phase };
}

/** Log-spaced angular-frequency sweep spanning the pole/zero magnitudes. */
export function autoOmega(poles, zeros, points = 400) {
  const mags = [...poles, ...zeros].map((r) => cabs(r)).filter((m) => m > 1e-6);
  let lo = 0.1;
  let hi = 100;
  if (mags.length) {
    lo = Math.min(...mags) / 100;
    hi = Math.max(...mags) * 100;
  }
  lo = Math.max(lo, 1e-4);
  const logLo = Math.log10(lo);
  const logHi = Math.log10(hi);
  const out = [];
  for (let i = 0; i < points; i++) out.push(10 ** (logLo + (logHi - logLo) * (i / (points - 1))));
  return out;
}

/**
 * A sensible time window [s] for the step/impulse response, based on the pole
 * locations. Stable poles → a few time-constants; unstable/marginal → a capped
 * window so divergence is visible without running away.
 */
export function autoDuration(poles) {
  const reMags = poles.map((p) => Math.abs(p.re)).filter((m) => m > 1e-3);
  const anyUnstable = poles.some((p) => p.re > -1e-6);
  if (anyUnstable || reMags.length === 0) return 12;
  const tauMax = 1 / Math.min(...reMags);
  return Math.max(4, Math.min(40, 6 * tauMax));
}

/**
 * Step or impulse response, computed by simulating a controllable-canonical
 * state-space realisation of H(s) with RK4. Returns [{x:t, y}] or null if the
 * system is improper (more zeros than poles → no ordinary time response).
 */
export function timeResponse(poles, zeros, K, kind, T, N = 600) {
  const den = rootsToPoly(poles);        // monic, descending, length n+1
  const num = rootsToPoly(zeros).map((c) => c * K);
  const n = den.length - 1;
  const m = num.length - 1;
  if (m > n) return null;                // improper
  const dt = T / N;

  if (n === 0) {
    // No poles: pure gain K (the only proper case). Step = K, impulse = 0 (delta ignored).
    const y0 = kind === 'step' ? num[0] : 0;
    return Array.from({ length: N + 1 }, (_, i) => ({ x: i * dt, y: y0 }));
  }

  // Align numerator to degree n, split off the direct-feedthrough term D.
  const numFull = new Array(n + 1).fill(0);
  for (let i = 0; i < num.length; i++) numFull[n + 1 - num.length + i] = num[i];
  const D = numFull[0];
  const numP = new Array(n).fill(0);     // (num - D·den), degrees s^{n-1}..s^0
  for (let i = 1; i <= n; i++) numP[i - 1] = numFull[i] - D * den[i];

  // Controllable canonical form. aLow[k] = a_k (coeff of s^k), cLow[k] = c_k.
  const aLow = [];
  for (let k = 0; k < n; k++) aLow[k] = den[n - k];
  const cLow = [];
  for (let k = 0; k < n; k++) cLow[k] = numP[n - 1 - k];

  const deriv = (x, u) => {
    const xd = new Array(n);
    for (let i = 0; i < n - 1; i++) xd[i] = x[i + 1];
    let last = u;
    for (let i = 0; i < n; i++) last -= aLow[i] * x[i];
    xd[n - 1] = last;
    return xd;
  };
  const output = (x, u) => {
    let y = D * u;
    for (let i = 0; i < n; i++) y += cLow[i] * x[i];
    return y;
  };

  const u = kind === 'step' ? 1 : 0;                 // impulse handled via initial condition
  let x = new Array(n).fill(0);
  if (kind === 'impulse') x[n - 1] = 1;              // x(0) = B ⇒ y = C·e^{At}·B (delta term ignored)

  const out = [{ x: 0, y: output(x, u) }];
  const add = (a, b, s) => a.map((v, i) => v + s * b[i]);
  for (let i = 1; i <= N; i++) {
    const k1 = deriv(x, u);
    const k2 = deriv(add(x, k1, dt / 2), u);
    const k3 = deriv(add(x, k2, dt / 2), u);
    const k4 = deriv(add(x, k3, dt), u);
    x = x.map((v, j) => v + (dt / 6) * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]));
    let y = output(x, u);
    if (!Number.isFinite(y) || Math.abs(y) > 1e6) y = NaN; // diverged
    out.push({ x: i * dt, y });
  }
  return out;
}

/** Format the transfer function's numerator/denominator polynomials for display. */
export function polyToString(coeffs) {
  // coeffs descending, degree = length-1
  const deg = coeffs.length - 1;
  const terms = [];
  for (let i = 0; i <= deg; i++) {
    const c = coeffs[i];
    const power = deg - i;
    if (Math.abs(c) < 1e-9) continue;
    const rounded = Math.round(c * 1000) / 1000;
    let coeffStr;
    if (power === 0) coeffStr = `${rounded}`;
    else if (Math.abs(rounded - 1) < 1e-9) coeffStr = '';
    else if (Math.abs(rounded + 1) < 1e-9) coeffStr = '-';
    else coeffStr = `${rounded}`;
    const sVar = power === 0 ? '' : power === 1 ? 's' : `s^${power}`;
    terms.push((coeffStr === '' || coeffStr === '-' ? coeffStr : coeffStr) + sVar);
  }
  if (!terms.length) return '0';
  // join with + / - signs
  return terms.reduce((acc, t, i) => {
    if (i === 0) return t;
    if (t.startsWith('-')) return `${acc} − ${t.slice(1)}`;
    return `${acc} + ${t}`;
  }, '');
}

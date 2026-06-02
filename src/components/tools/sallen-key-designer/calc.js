// Pure logic for the Sallen-Key filter designer widget.
//
// All equations are taken directly from the Sallen-Key Filters page so that the
// "analyse" (component → response) and "design" (spec → component) modes stay
// mutually consistent.
//
// Low-pass transfer function:
//   H(s) = (K / (R1 R2 C1 C2)) / (s^2 + a1 s + w0^2)
//   a1   = (1/R1 + 1/R2)/C1 + (1-K)/(R2 C2)
//   w0^2 = 1/(R1 R2 C1 C2)
//
// High-pass transfer function:
//   H(s) = K s^2 / (s^2 + a1 s + w0^2)
//   a1   = (C2/R2 + C1/R2 + (1-K) C2/R1) / (C1 C2)
//   w0^2 = 1/(R1 C1 R2 C2)
//
// fc = w0 / 2π,  Q = w0 / a1,  K = 1 + R3/R4.

import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';
import { findPreferredValue, E_SERIES, SEARCH_METHODS } from '../e-series-finder/finder.js';

// ---- Input parsing / output formatting ------------------------------------

export const parseR = (t) => parseValueWithPrefix(t, { units: ['Ω', 'ohm', 'ohms'], rNotation: true });
export const parseC = (t) => parseValueWithPrefix(t, { units: ['F', 'farad', 'farads'] });
export const parseF = (t) => parseValueWithPrefix(t, { units: ['Hz', 'hertz'] });

// Plain positive number (gain K, quality factor Q).
export function parseNum(text, { min = -Infinity } = {}) {
  if (typeof text !== 'string' || text.trim() === '') return { value: NaN, error: 'Enter a value.' };
  const n = Number(text.trim());
  if (!Number.isFinite(n)) return { value: NaN, error: 'Could not parse as a number.' };
  if (n < min) return { value: NaN, error: `Must be ≥ ${min}.` };
  return { value: n, error: null };
}

export const formatR = (v, sigFigs = 4) => formatValueWithPrefix(v, 'Ω', { sigFigs });
export const formatC = (v, sigFigs = 4) => formatValueWithPrefix(v, 'F', { sigFigs });
export const formatF = (v, sigFigs = 4) => formatValueWithPrefix(v, 'Hz', { sigFigs });

// ---- Core coefficients ----------------------------------------------------

// Returns the s-coefficient a1 and w0^2 of the denominator for the given type.
function denomCoeffs(type, { R1, R2, C1, C2, K }) {
  const w0sq = 1 / (R1 * R2 * C1 * C2);
  const a1 =
    type === 'lp'
      ? (1 / R1 + 1 / R2) / C1 + (1 - K) / (R2 * C2)
      : (C2 / R2 + C1 / R2 + (1 - K) * (C2 / R1)) / (C1 * C2);
  return { a1, w0sq };
}

const COMP_KEYS = ['R1', 'R2', 'C1', 'C2', 'K'];

function componentsValid(c) {
  return COMP_KEYS.every((k) => Number.isFinite(c[k]) && c[k] > 0);
}

// ---- Derived metrics ------------------------------------------------------

// { fc, Q, K, stable } — Q/fc are NaN if the components are invalid.
export function computeMetrics(type, c) {
  if (!componentsValid(c)) return { fc: NaN, Q: NaN, K: c.K, stable: false };
  const { a1, w0sq } = denomCoeffs(type, c);
  const w0 = Math.sqrt(w0sq);
  const fc = w0 / (2 * Math.PI);
  const Q = w0 / a1; // a1 = w0/Q
  // a1 <= 0 means a right-half-plane pole → unstable / self-oscillating.
  const stable = a1 > 0;
  return { fc, Q, K: c.K, stable };
}

// ---- Frequency response ---------------------------------------------------

// Evaluate H(jω) and return { mag, phaseDeg }. Numerator is purely real for
// both filter types (constant for LP, -K ω² for HP), which keeps this simple.
function evalH(type, c, freqHz) {
  const w = 2 * Math.PI * freqHz;
  const { a1, w0sq } = denomCoeffs(type, c);
  const Dr = w0sq - w * w;
  const Di = a1 * w;
  const Nr = type === 'lp' ? c.K * w0sq : -c.K * w * w;
  const denom = Dr * Dr + Di * Di;
  const re = (Nr * Dr) / denom;
  const im = (-Nr * Di) / denom;
  return { mag: Math.hypot(re, im), phaseDeg: (Math.atan2(im, re) * 180) / Math.PI };
}

// Build magnitude (dB) and phase (deg) series over ±2 decades around fc.
export function bodeSeries(type, c, fc) {
  if (!componentsValid(c) || !Number.isFinite(fc) || fc <= 0) {
    return { mag: [], phase: [] };
  }
  const N = 240;
  const logMin = Math.log10(fc / 100);
  const logMax = Math.log10(fc * 100);
  const mag = [];
  const phase = [];
  for (let i = 0; i < N; i++) {
    const f = Math.pow(10, logMin + ((logMax - logMin) * i) / (N - 1));
    const h = evalH(type, c, f);
    mag.push({ x: f, y: 20 * Math.log10(h.mag) });
    phase.push({ x: f, y: h.phaseDeg });
  }
  return { mag, phase };
}

// ---- Design (spec → components) -------------------------------------------
//
// Strategy: fix equal capacitors C1 = C2 = C (the user picks C), then solve the
// page's own fc/Q equations for R1, R2. With S ≡ √(R1 R2) = 1/(2π fc C):
//   low-pass:  (2-K) R1² − (S/Q) R1 + S²       = 0
//   high-pass:  2    R1² − (S/Q) R1 + (1-K) S² = 0
// and R2 = S²/R1. Verified against both worked examples on the page.

export function designComponents(type, { fc, Q, K, C }) {
  if (![fc, Q, C].every((x) => Number.isFinite(x) && x > 0) || !Number.isFinite(K) || K < 1) {
    return { ok: false, error: 'Enter valid fc, Q, K and capacitor values.' };
  }
  const S = 1 / (2 * Math.PI * fc * C);
  const a = type === 'lp' ? 2 - K : 2;
  const b = -S / Q;
  const cc = type === 'lp' ? S * S : (1 - K) * S * S;

  let roots;
  if (Math.abs(a) < 1e-12) {
    // Linear case (low-pass with K = 2): b·R1 + cc = 0.
    roots = [-cc / b];
  } else {
    const disc = b * b - 4 * a * cc;
    if (disc < 0) {
      return {
        ok: false,
        error:
          'Not achievable with equal capacitors at this gain — increase the gain K, lower Q, or use unequal capacitors.',
      };
    }
    const sq = Math.sqrt(disc);
    roots = [(-b + sq) / (2 * a), (-b - sq) / (2 * a)];
  }

  const candidates = roots
    .filter((r) => Number.isFinite(r) && r > 0)
    .map((R1) => ({ R1, R2: (S * S) / R1 }))
    .filter((o) => Number.isFinite(o.R2) && o.R2 > 0)
    .sort((x, y) => x.R1 - y.R1); // smaller R1 first (matches the page's worked example)

  if (!candidates.length) {
    return {
      ok: false,
      error:
        'Not achievable with equal capacitors at this gain — increase the gain K, lower Q, or use unequal capacitors.',
    };
  }
  return { ok: true, R1: candidates[0].R1, R2: candidates[0].R2 };
}

// ---- E-series snapping ----------------------------------------------------

// Resistor E-series the designer can snap to (coarse → fine).
export const RESISTOR_SERIES = ['E24', 'E48', 'E96', 'E192'];

export function snapResistor(ohms, series = 'E96') {
  const e = E_SERIES[series] || E_SERIES.E96;
  return findPreferredValue(ohms, e, SEARCH_METHODS.CLOSEST);
}

export function snapCapacitor(farads) {
  return findPreferredValue(farads, E_SERIES.E12, SEARCH_METHODS.CLOSEST);
}

// Given a desired gain K (≥1) and a fixed R4, return ideal/E-series gain
// resistors. Unity gain (K = 1) needs no divider, so R3 = 0 / R4 = ∞.
export function gainResistors(K, R4 = 10000, series = 'E96') {
  if (K <= 1) return { unity: true, R3: 0, R4: Infinity, R3e: 0, R4e: Infinity, Kactual: 1 };
  const R3 = (K - 1) * R4;
  const R3e = snapResistor(R3, series);
  const Kactual = 1 + R3e / R4;
  return { unity: false, R3, R4, R3e, R4e: R4, Kactual };
}

/**
 * Exponential Moving Average (EMA) filter helpers — pure JS, no chart library.
 *
 * The EMA difference equation is:
 *     y[i] = α·x[i] + (1 - α)·y[i-1]
 * with transfer function:
 *     H(z) = α / (1 - (1-α)·z⁻¹)
 *
 * Exports:
 *   generateSignal(type, fs, numSamples, opts)  → Array<{x,y}>
 *   applyEma(input, alpha)                       → Array<{x,y}>
 *   cutoffNormalized(alpha)                      → f_c/f_s in cycles/sample, or null
 *   cutoffHz(alpha, fs)                          → f_c in Hz, or null
 *   timeConstantSamples(alpha)                   → τ in samples
 *   bodeResponse(alpha, numPoints)               → { mag:[{x,y}], phase:[{x,y}] }
 *
 * f_c/f_s is null when α is large enough that the response never drops to
 * −3 dB before the Nyquist frequency (α ≥ 2(√2−1) ≈ 0.82843).
 */

// α at/above which no valid −3 dB cut-off exists before Nyquist: 2(√2 − 1).
export const CUTOFF_ALPHA_LIMIT = 2 * (Math.SQRT2 - 1); // ≈ 0.82843

// Deterministic PRNG (mulberry32) so the chart doesn't flicker as α changes.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generate one of the demo input signals.
 *   type: 'step' | 'noisy-step' | 'sine' | 'noisy-sine' | 'square'
 * opts.signalFreqHz sets the sine/square frequency (defaults to ~4 cycles
 * across the window) and is clamped just under Nyquist to avoid aliasing.
 * opts.noiseAmp is the ± amplitude of the additive noise on the noisy variants.
 * Step signals hold a short baseline of 0 then step to 1 so the filter's
 * warm-up is visible.
 */
export function generateSignal(type, fs, numSamples, opts = {}) {
  const {
    signalFreqHz = (4 * fs) / numSamples,
    noiseAmp = 0.25,
    seed = 1234,
  } = opts;
  const rng = mulberry32(seed);
  const dt = 1 / fs;
  // Keep strictly below Nyquist so the demo waveform never aliases.
  const f = Math.min(Math.max(signalFreqHz, 0), fs / 2);
  const stepIndex = Math.floor(numSamples * 0.1);
  const out = new Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i * dt;
    let y;
    switch (type) {
      case 'step':
      case 'noisy-step':
        y = i < stepIndex ? 0 : 1;
        break;
      case 'square':
        y = Math.sin(2 * Math.PI * f * t) >= 0 ? 1 : -1;
        break;
      case 'sine':
      case 'noisy-sine':
      default:
        y = Math.sin(2 * Math.PI * f * t);
        break;
    }
    if (type === 'noisy-step' || type === 'noisy-sine') {
      y += noiseAmp * (rng() - 0.5) * 2;
    }
    out[i] = { x: t, y };
  }
  return out;
}

/**
 * Apply the EMA filter. The internal state starts un-primed at y = 0, matching
 * the step-response table on the page (first output for a 0→1 step is α).
 */
export function applyEma(input, alpha) {
  const out = new Array(input.length);
  let y = 0;
  for (let i = 0; i < input.length; i++) {
    y = alpha * input[i].y + (1 - alpha) * y;
    out[i] = { x: input[i].x, y };
  }
  return out;
}

/** −3 dB cut-off frequency normalised to fs (cycles/sample), or null if none. */
export function cutoffNormalized(alpha) {
  if (alpha <= 0 || alpha >= 1) return null;
  const arg = 1 - (alpha * alpha) / (2 * (1 - alpha));
  if (arg < -1 || arg > 1) return null;
  return Math.acos(arg) / (2 * Math.PI);
}

/** −3 dB cut-off frequency in Hz for a given sampling frequency, or null. */
export function cutoffHz(alpha, fs) {
  const fn = cutoffNormalized(alpha);
  return fn === null ? null : fn * fs;
}

/**
 * Filter time constant in samples — the number of iterations for the impulse
 * envelope (1-α)ⁿ to decay to 1/e, equivalently for a step response to reach
 * 1 − 1/e (63.2%) of its final value.  τ = −1 / ln(1-α).
 */
export function timeConstantSamples(alpha) {
  if (alpha <= 0) return Infinity;
  if (alpha >= 1) return 0;
  return -1 / Math.log(1 - alpha);
}

/**
 * Magnitude (dB) and phase (deg) response from DC to Nyquist.
 * x is normalised frequency in cycles/sample, 0 … 0.5.
 */
export function bodeResponse(alpha, numPoints = 240) {
  const mag = new Array(numPoints);
  const phase = new Array(numPoints);
  const oneMinus = 1 - alpha;
  for (let i = 0; i < numPoints; i++) {
    const fnorm = (i / (numPoints - 1)) * 0.5;
    const w = 2 * Math.PI * fnorm;
    const denRe = 1 - oneMinus * Math.cos(w);
    const denIm = oneMinus * Math.sin(w);
    const denMag = Math.sqrt(denRe * denRe + denIm * denIm);
    const h = alpha / denMag;
    mag[i] = { x: fnorm, y: 20 * Math.log10(h) };
    phase[i] = { x: fnorm, y: (-Math.atan2(denIm, denRe) * 180) / Math.PI };
  }
  return { mag, phase };
}

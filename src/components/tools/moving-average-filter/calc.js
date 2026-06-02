/**
 * Simple Moving Average (SMA) filter helpers — pure JS, no chart library.
 *
 * Functions:
 *   generateNoisySine(samplingFreqHz, numSamples, signalFreqHz, noiseAmp, seed)
 *   makeSmaWindow(N)
 *   convolveLeftHanded(input, window)         // left-handed (causal) SMA
 *   smaFrequencyResponse(N, samplingFreqHz, numPoints)
 *
 * The frequency-response formula for a left-handed SMA of length N is:
 *     |H(f)| = (1/N) · |sin(π·N·f/fs) / sin(π·f/fs)|
 * with H(0) = 1 by continuity.
 */

// Deterministic PRNG (mulberry32) so the chart doesn't flicker as state updates.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateNoisySine(samplingFreqHz, numSamples, signalFreqHz, noiseAmp = 0.2, seed = 1234) {
  const rng = mulberry32(seed);
  const out = new Array(numSamples);
  const dt = 1 / samplingFreqHz;
  for (let i = 0; i < numSamples; i++) {
    const t = i * dt;
    out[i] = { x: t, y: Math.sin(2 * Math.PI * signalFreqHz * t) + noiseAmp * (rng() - 0.5) * 2 };
  }
  return out;
}

export function makeSmaWindow(N) {
  return new Array(N).fill(1 / N);
}

// Left-handed (causal) SMA: output[n] = sum_{k=0..N-1} window[k] · input[n-k].
// For n < N-1 we just take the average of whatever samples we have.
export function convolveLeftHanded(input, window) {
  const N = window.length;
  const out = new Array(input.length);
  for (let n = 0; n < input.length; n++) {
    let sum = 0;
    let count = 0;
    for (let k = 0; k < N; k++) {
      const i = n - k;
      if (i < 0) break;
      sum += window[k] * input[i] * N; // input[i] * window[k] is already 1/N — undo for partial window
      count++;
    }
    out[n] = count > 0 ? sum / count : 0;
  }
  return out;
}

export function smaFrequencyResponse(N, samplingFreqHz, numPoints = 200) {
  const nyquist = samplingFreqHz / 2;
  const out = new Array(numPoints);
  for (let i = 0; i < numPoints; i++) {
    const f = (i / (numPoints - 1)) * nyquist;
    let mag;
    if (i === 0) {
      mag = 1;
    } else {
      const num = Math.sin((Math.PI * N * f) / samplingFreqHz);
      const den = Math.sin((Math.PI * f) / samplingFreqHz);
      mag = Math.abs(num / den) / N;
    }
    out[i] = { x: f, y: mag };
  }
  return out;
}

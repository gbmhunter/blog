// Pure DSP helpers for the Fourier transform explorer widget. No DOM access —
// everything here is unit-testable.

const TWO_PI = 2 * Math.PI;

export const SIGNAL_TYPES = [
  { key: 'sine', label: 'Sine' },
  { key: 'square', label: 'Square' },
  { key: 'triangle', label: 'Triangle' },
  { key: 'sawtooth', label: 'Sawtooth' },
  { key: 'pulse', label: 'Pulse' },
];

export const WINDOWS = [
  { key: 'rect', label: 'Rectangular (none)' },
  { key: 'hann', label: 'Hann' },
  { key: 'hamming', label: 'Hamming' },
  { key: 'blackman', label: 'Blackman' },
];

export const N_CHOICES = [64, 128, 256, 512, 1024];

// Deterministic PRNG so the noise doesn't re-roll on every re-render (which
// would make the plots shimmer while dragging unrelated sliders).
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function windowCoefficients(key, n) {
  const w = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const x = (TWO_PI * i) / (n - 1);
    switch (key) {
      case 'hann':
        w[i] = 0.5 - 0.5 * Math.cos(x);
        break;
      case 'hamming':
        w[i] = 0.54 - 0.46 * Math.cos(x);
        break;
      case 'blackman':
        w[i] = 0.42 - 0.5 * Math.cos(x) + 0.08 * Math.cos(2 * x);
        break;
      default:
        w[i] = 1;
    }
  }
  return w;
}

/**
 * Value of one component signal at time t. The phase (in degrees) is applied
 * as a fraction of a cycle for every waveform type, so e.g. 90° shifts a
 * square wave by a quarter period — and leaves its magnitude spectrum
 * untouched.
 */
function signalValue(s, t) {
  const cyc = s.freq * t + s.phaseDeg / 360;
  if (s.type === 'sine') return s.amp * Math.sin(TWO_PI * cyc);
  const ph = ((cyc % 1) + 1) % 1; // position within the cycle, 0..1
  switch (s.type) {
    case 'square':
      return s.amp * (ph < 0.5 ? 1 : -1);
    case 'triangle':
      return s.amp * (1 - 4 * Math.abs(ph - 0.5));
    case 'sawtooth':
      return s.amp * (2 * ph - 1);
    case 'pulse':
      return s.amp * (ph < 0.1 ? 1 : 0); // 10 % duty cycle
    default:
      return 0;
  }
}

/**
 * Generate the time-domain samples by summing the enabled component signals.
 *
 * signals  — Array<{ enabled, type, amp, freq, phaseDeg }>
 * noiseAmp — uniform noise amplitude (±)
 * fs       — sample rate in Hz
 * n        — number of samples
 */
export function generateSamples({ signals, noiseAmp, fs, n }) {
  const samples = new Float64Array(n);
  const rand = mulberry32(0xc0ffee);
  for (let i = 0; i < n; i++) {
    const t = i / fs;
    let v = 0;
    for (const s of signals) {
      if (!s.enabled) continue;
      v += signalValue(s, t);
    }
    if (noiseAmp > 0) v += noiseAmp * (2 * rand() - 1);
    samples[i] = v;
  }
  return samples;
}

/**
 * In-place iterative radix-2 Cooley-Tukey FFT. `re` and `im` must be
 * Float64Arrays whose length is a power of two.
 */
export function fft(re, im) {
  const n = re.length;
  // Bit-reversal permutation.
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      let tmp = re[i];
      re[i] = re[j];
      re[j] = tmp;
      tmp = im[i];
      im[i] = im[j];
      im[j] = tmp;
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const half = len >> 1;
    const ang = -TWO_PI / len;
    const wRe = Math.cos(ang);
    const wIm = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let curRe = 1;
      let curIm = 0;
      for (let k = 0; k < half; k++) {
        const a = i + k;
        const b = i + k + half;
        const vRe = re[b] * curRe - im[b] * curIm;
        const vIm = re[b] * curIm + im[b] * curRe;
        re[b] = re[a] - vRe;
        im[b] = im[a] - vIm;
        re[a] += vRe;
        im[a] += vIm;
        const nextRe = curRe * wRe - curIm * wIm;
        curIm = curRe * wIm + curIm * wRe;
        curRe = nextRe;
      }
    }
  }
}

/**
 * Window the samples and return the two-sided magnitude spectrum (length n,
 * bin k ↔ frequency k·fs/n). Magnitudes are normalised by the window's sum
 * (= n for rectangular) so a unit-amplitude sinusoid shows a pair of 0.5
 * peaks regardless of the window's coherent gain.
 */
export function magnitudeSpectrum(samples, windowKey) {
  const n = samples.length;
  const w = windowCoefficients(windowKey, n);
  let wSum = 0;
  for (let i = 0; i < n; i++) wSum += w[i];
  const re = new Float64Array(n);
  const im = new Float64Array(n);
  for (let i = 0; i < n; i++) re[i] = samples[i] * w[i];
  fft(re, im);
  const mags = new Float64Array(n);
  for (let k = 0; k < n; k++) mags[k] = Math.hypot(re[k], im[k]) / wSum;
  return mags;
}

/** Frequency a tone at `freq` appears at after sampling at `fs` (aliasing fold). */
export function foldedFrequency(freq, fs) {
  const r = freq % fs;
  return r <= fs / 2 ? r : fs - r;
}

import { useState, useMemo, useEffect } from 'preact/hooks';
import {
  SIGNAL_TYPES, WINDOWS, N_CHOICES,
  generateSamples, magnitudeSpectrum, foldedFrequency, windowCoefficients,
} from './calc.js';
import Plot2d from '../_shared/Plot2d.jsx';
import './styles.css';

const SIGNAL_COLOR = '#c60e00';  // brand red — the signal / spectrum
const RAW_COLOR = '#9ca3af';     // faint grey — unwindowed signal
const REF_COLOR = '#2563eb';     // blue — reference lines (Nyquist)

const DB_FLOOR = -80;

export default function FourierExplorer() {
  const [signals, setSignals] = useState([
    { enabled: true, type: 'sine', amp: 1, freq: 5, phaseDeg: 0 },
    { enabled: true, type: 'sine', amp: 1, freq: 10, phaseDeg: 0 },
    { enabled: false, type: 'square', amp: 0.5, freq: 20, phaseDeg: 0 },
  ]);
  const [noiseAmp, setNoiseAmp] = useState(0);
  // 160 Hz puts the default 5 Hz and 10 Hz tones exactly on FFT bins
  // (bin width 160/256 = 0.625 Hz), so the rectangular-window default shows
  // clean peaks; nudging a frequency off-bin then demonstrates leakage.
  const [fs, setFs] = useState(160);
  const [nSamples, setNSamples] = useState(256);
  const [windowKey, setWindowKey] = useState('rect');
  const [scale, setScale] = useState('linear');

  const nyquist = fs / 2;

  // Keep frequencies within the explorable range (0..fs) when fs drops.
  useEffect(() => {
    setSignals((prev) => prev.map((s) => ({ ...s, freq: Math.min(s.freq, fs) })));
  }, [fs]);

  const samples = useMemo(
    () => generateSamples({ signals, noiseAmp, fs, n: nSamples }),
    [signals, noiseAmp, fs, nSamples],
  );

  // --- Time-domain series ----------------------------------------------------
  const timeSeries = useMemo(() => {
    const raw = Array.from(samples, (y, i) => ({ x: i / fs, y }));
    if (windowKey === 'rect') {
      return [{ label: 'Signal', data: raw, color: SIGNAL_COLOR, width: 1.5 }];
    }
    const n = samples.length;
    const w = windowCoefficients(windowKey, n);
    const windowed = new Array(n);
    for (let i = 0; i < n; i++) windowed[i] = { x: i / fs, y: samples[i] * w[i] };
    return [
      { label: 'Signal', data: raw, color: RAW_COLOR, width: 1 },
      { label: 'Windowed', data: windowed, color: SIGNAL_COLOR, width: 1.5 },
    ];
  }, [samples, fs, windowKey]);

  // --- Frequency-domain series -----------------------------------------------
  const { spectrumSeries, yMin, yMax } = useMemo(() => {
    const mags = magnitudeSpectrum(samples, windowKey);
    const n = mags.length;
    const toY = scale === 'db'
      ? (m) => Math.max(20 * Math.log10(m + 1e-12), DB_FLOOR)
      : (m) => m;
    const data = Array.from(mags, (m, k) => ({ x: (k * fs) / n, y: toY(m) }));

    let yMin;
    let yMax;
    if (scale === 'db') {
      yMin = DB_FLOOR;
      yMax = 10;
    } else {
      let peak = 0;
      for (const p of data) if (p.y > peak) peak = p.y;
      yMin = 0;
      yMax = Math.max(peak * 1.15, 0.1);
    }
    const spectrumSeries = [
      { label: '|X(f)|', data, color: SIGNAL_COLOR, width: 1.5 },
      {
        label: 'Nyquist (f_s/2)',
        data: [{ x: nyquist, y: yMin }, { x: nyquist, y: yMax }],
        color: REF_COLOR, width: 1, dash: [6, 4],
      },
    ];
    return { spectrumSeries, yMin, yMax };
  }, [samples, windowKey, scale, fs, nyquist]);

  // --- Aliasing warnings -----------------------------------------------------
  const aliased = useMemo(
    () => signals
      .map((s, i) => ({ ...s, idx: i }))
      .filter((s) => s.enabled && s.freq > nyquist)
      .map((s) => ({ idx: s.idx, freq: s.freq, folded: foldedFrequency(s.freq, fs) })),
    [signals, nyquist, fs],
  );

  const updateSignal = (idx, patch) => {
    setSignals((prev) => prev.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  };

  return (
    <div class="fourier-explorer">
      <div class="fourier-explorer__legend">
        Build a time-domain signal from up to three components — each a sine, square, triangle,
        sawtooth or pulse — and watch its FFT magnitude spectrum update live. Try dragging a
        frequency past the dashed Nyquist line to see aliasing fold the peak back, or pick a
        frequency that doesn't land exactly on a bin to see spectral leakage smear the spectrum
        (then clean it up with a window function).
      </div>

      {/* Component signals */}
      <div class="fourier-explorer__signals">
        {signals.map((s, i) => (
          <div key={i} class={'fourier-explorer__signal' + (s.enabled ? '' : ' fourier-explorer__signal--off')}>
            <div class="fourier-explorer__signal-head">
              <label class="fourier-explorer__signal-toggle">
                <input
                  type="checkbox"
                  checked={s.enabled}
                  onInput={(e) => updateSignal(i, { enabled: e.currentTarget.checked })}
                />
                <span>Signal {i + 1}</span>
              </label>
              <select
                value={s.type}
                disabled={!s.enabled}
                onInput={(e) => updateSignal(i, { type: e.currentTarget.value })}
              >
                {SIGNAL_TYPES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
              </select>
            </div>
            <div class="fourier-explorer__signal-params">
              <Slider
                label="A" value={s.amp} min={0} max={2} step={0.05}
                display={s.amp.toFixed(2)}
                disabled={!s.enabled}
                onChange={(v) => updateSignal(i, { amp: v })}
              />
              <Slider
                label="f" value={s.freq} min={0.5} max={fs} step={0.5}
                display={`${s.freq.toFixed(1)} Hz`}
                disabled={!s.enabled}
                onChange={(v) => updateSignal(i, { freq: v })}
              />
              <Slider
                label="φ" value={s.phaseDeg} min={0} max={360} step={5}
                display={`${s.phaseDeg}°`}
                disabled={!s.enabled}
                onChange={(v) => updateSignal(i, { phaseDeg: v })}
              />
            </div>
          </div>
        ))}
      </div>

      <div class="fourier-explorer__noise">
        <Slider
          label="Noise ±" value={noiseAmp} min={0} max={1} step={0.05}
          display={noiseAmp.toFixed(2)}
          onChange={setNoiseAmp}
        />
      </div>

      {/* Sampling parameters */}
      <div class="fourier-explorer__sampling">
        <Slider
          label={<>Sample rate f<sub>s</sub></>} value={fs} min={50} max={500} step={10}
          display={`${fs} Hz`}
          onChange={setFs}
        />
        <div class="fourier-explorer__select-row">
          <span class="fourier-explorer__control-label">Samples N</span>
          <select value={nSamples} onInput={(e) => setNSamples(Number(e.currentTarget.value))}>
            {N_CHOICES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div class="fourier-explorer__select-row">
          <span class="fourier-explorer__control-label">Window</span>
          <select value={windowKey} onInput={(e) => setWindowKey(e.currentTarget.value)}>
            {WINDOWS.map((w) => <option key={w.key} value={w.key}>{w.label}</option>)}
          </select>
        </div>
      </div>

      {/* Readouts */}
      <div class="fourier-explorer__readouts">
        <Readout label="Bin width fs/N">{(fs / nSamples).toFixed(3)} Hz</Readout>
        <Readout label="Nyquist fs/2">{nyquist.toFixed(1)} Hz</Readout>
        <Readout label="Window length N/fs">{(nSamples / fs).toFixed(2)} s</Readout>
      </div>

      {/* Charts */}
      <div class="fourier-explorer__chart">
        <Plot2d
          title="Time domain"
          xLabel="Time [s]"
          yLabel="x(t)"
          series={timeSeries}
          height={260}
        />
      </div>

      <div class="fourier-explorer__chip-row fourier-explorer__scale-row">
        <span class="fourier-explorer__control-label">Magnitude scale</span>
        <div class="fourier-explorer__chips">
          <button
            class={'fourier-explorer__chip' + (scale === 'linear' ? ' fourier-explorer__chip--active' : '')}
            onClick={() => setScale('linear')}
          >Linear</button>
          <button
            class={'fourier-explorer__chip' + (scale === 'db' ? ' fourier-explorer__chip--active' : '')}
            onClick={() => setScale('db')}
          >dB</button>
        </div>
      </div>

      <div class="fourier-explorer__chart">
        <Plot2d
          title="Frequency domain (FFT magnitude)"
          xLabel="Frequency [Hz]"
          yLabel={scale === 'db' ? '|X(f)| [dB]' : '|X(f)|'}
          series={spectrumSeries}
          height={280}
          yMin={yMin}
          yMax={yMax}
        />
      </div>

      {aliased.length > 0 && (
        <div class="fourier-explorer__note">
          {aliased.map((a) => (
            <div key={a.idx}>
              Signal {a.idx + 1}'s {a.freq.toFixed(1)} Hz fundamental is <strong>above the Nyquist
              frequency</strong> ({nyquist.toFixed(1)} Hz) — it aliases and appears folded back
              at {a.folded.toFixed(1)} Hz.
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Slider({ label, value, min, max, step, display, onChange, disabled = false }) {
  return (
    <div class="fourier-explorer__slider">
      <span class="fourier-explorer__slider-label">{label}</span>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        disabled={disabled}
        onInput={(e) => onChange(Number(e.currentTarget.value))}
      />
      <span class="fourier-explorer__slider-value">{display}</span>
    </div>
  );
}

function Readout({ label, children }) {
  return (
    <div class="fourier-explorer__readout">
      <span class="fourier-explorer__readout-label">{label}</span>
      <span class="fourier-explorer__readout-value">{children}</span>
    </div>
  );
}

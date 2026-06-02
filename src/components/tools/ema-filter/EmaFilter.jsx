import { useState, useMemo, useEffect } from 'preact/hooks';
import {
  generateSignal, applyEma, cutoffHz, cutoffNormalized, timeConstantSamples,
  bodeResponse, CUTOFF_ALPHA_LIMIT,
} from './calc.js';
import Plot2d from '../_shared/Plot2d.jsx';
import './styles.css';

const NUM_SAMPLES = 200;

const SIGNALS = [
  { key: 'step',        label: 'Step',       periodic: false, noisy: false },
  { key: 'noisy-step',  label: 'Noisy step', periodic: false, noisy: true },
  { key: 'sine',        label: 'Sine',       periodic: true,  noisy: false },
  { key: 'noisy-sine',  label: 'Noisy sine', periodic: true,  noisy: true },
  { key: 'square',      label: 'Square',     periodic: true,  noisy: false },
];

const DEFAULT_SIGNAL_FREQ = 20;  // Hz — ≈4 cycles across the window at fs = 1 kHz
const DEFAULT_NOISE_AMP = 0.25;  // ± amplitude

const INPUT_COLOR = '#9ca3af';   // faint grey — raw input
const OUTPUT_COLOR = '#c60e00';  // brand red — filtered output
const REF_COLOR = '#2563eb';     // blue — reference lines

const MINUS_3DB = 20 * Math.log10(1 / Math.SQRT2); // ≈ -3.0103

export default function EmaFilter() {
  const [alpha, setAlpha] = useState(0.25);
  const [fs, setFs] = useState(1000);
  const [signal, setSignal] = useState('noisy-sine');
  const [signalFreq, setSignalFreq] = useState(DEFAULT_SIGNAL_FREQ);
  const [noiseAmp, setNoiseAmp] = useState(DEFAULT_NOISE_AMP);
  const [tab, setTab] = useState('time');

  const sigMeta = SIGNALS.find((s) => s.key === signal) || SIGNALS[0];
  const nyquist = Math.max(2, Math.floor(fs / 2));

  // Keep the signal frequency below Nyquist when the sampling frequency drops.
  useEffect(() => {
    setSignalFreq((f) => Math.min(f, nyquist));
  }, [nyquist]);

  // --- Time-domain data -----------------------------------------------------
  const timeSeries = useMemo(() => {
    const input = generateSignal(signal, fs, NUM_SAMPLES, { signalFreqHz: signalFreq, noiseAmp });
    const output = applyEma(input, alpha);
    return [
      { label: 'Input',  data: input,  color: INPUT_COLOR, width: 1 },
      { label: 'Output', data: output, color: OUTPUT_COLOR, width: 2 },
    ];
  }, [signal, fs, alpha, signalFreq, noiseAmp]);

  // --- Frequency-domain (Bode) data -----------------------------------------
  const { magSeries, phaseSeries } = useMemo(() => {
    const { mag, phase } = bodeResponse(alpha, 240);
    const fcNorm = cutoffNormalized(alpha);

    const magSeries = [
      { label: '|H(f)|', data: mag, color: OUTPUT_COLOR, width: 2 },
      { label: '−3 dB', data: [{ x: 0, y: MINUS_3DB }, { x: 0.5, y: MINUS_3DB }], color: REF_COLOR, width: 1, dash: [6, 4] },
    ];
    if (fcNorm !== null) {
      magSeries.push({
        label: 'f_c',
        data: [{ x: fcNorm, y: -60 }, { x: fcNorm, y: 5 }],
        color: REF_COLOR, width: 1, dash: [2, 3],
      });
    }
    const phaseSeries = [
      { label: '∠H(f)', data: phase, color: OUTPUT_COLOR, width: 2 },
    ];
    return { magSeries, phaseSeries };
  }, [alpha]);

  // --- Derived readouts -----------------------------------------------------
  const fc = cutoffHz(alpha, fs);
  const fcNorm = cutoffNormalized(alpha);
  const tauSamples = timeConstantSamples(alpha);
  const tauMs = (tauSamples / fs) * 1000;
  const noCutoff = alpha >= CUTOFF_ALPHA_LIMIT;

  return (
    <div class="ema-filter">
      <div class="ema-filter__legend">
        Explore the exponential moving average filter. Drag <em>α</em> to see how aggressively it
        smooths a signal (top) and how that shapes its frequency response (bottom). The sampling
        frequency only affects the values quoted in Hz / seconds — the filter's behaviour depends on
        <em> α</em> and the <em>normalised</em> frequency alone. Periodic inputs add a frequency
        control and noisy inputs a noise-amount control.
      </div>

      {/* Shared controls */}
      <div class="ema-filter__controls">
        <ControlRow label={<>α</>}>
          <input
            type="range" min="0.01" max="1" step="0.01"
            value={alpha}
            onInput={(e) => setAlpha(Number(e.currentTarget.value))}
          />
          <input
            type="number" min="0.01" max="1" step="0.01"
            value={alpha}
            onInput={(e) => setAlpha(clamp(Number(e.currentTarget.value), 0.01, 1))}
            class="ema-filter__num"
          />
        </ControlRow>
        <ControlRow label={<>Sampling f<sub>s</sub></>}>
          <input
            type="range" min="100" max="20000" step="100"
            value={fs}
            onInput={(e) => setFs(Number(e.currentTarget.value))}
          />
          <input
            type="number" min="1" step="100"
            value={fs}
            onInput={(e) => setFs(Math.max(1, Number(e.currentTarget.value) || 1))}
            class="ema-filter__num ema-filter__num--wide"
          />
          <span class="ema-filter__unit">Hz</span>
        </ControlRow>
      </div>

      {/* Readouts */}
      <div class="ema-filter__readouts">
        <Readout label="Cut-off (-3 dB)">
          {noCutoff
            ? <span class="ema-filter__warn">none before Nyquist</span>
            : <>{formatHz(fc)} <span class="ema-filter__muted">({fcNorm.toFixed(4)} cyc/sample)</span></>}
        </Readout>
        <Readout label="Time constant τ">
          {tauSamples.toFixed(1)} samples <span class="ema-filter__muted">({tauMs.toFixed(2)} ms)</span>
        </Readout>
      </div>

      {/* Tab bar */}
      <div class="ema-filter__tabs" role="tablist">
        <button
          role="tab"
          class={'ema-filter__tab' + (tab === 'time' ? ' ema-filter__tab--active' : '')}
          aria-selected={tab === 'time'}
          onClick={() => setTab('time')}
        >Time domain</button>
        <button
          role="tab"
          class={'ema-filter__tab' + (tab === 'freq' ? ' ema-filter__tab--active' : '')}
          aria-selected={tab === 'freq'}
          onClick={() => setTab('freq')}
        >Frequency response (Bode)</button>
      </div>

      {/* Tab content */}
      {tab === 'time' ? (
        <div class="ema-filter__pane">
          <div class="ema-filter__signal-row">
            <span class="ema-filter__control-label">Input signal</span>
            <div class="ema-filter__signal-buttons">
              {SIGNALS.map((s) => (
                <button
                  key={s.key}
                  class={'ema-filter__chip' + (signal === s.key ? ' ema-filter__chip--active' : '')}
                  onClick={() => setSignal(s.key)}
                >{s.label}</button>
              ))}
            </div>
          </div>

          {(sigMeta.periodic || sigMeta.noisy) && (
            <div class="ema-filter__signal-params">
              {sigMeta.periodic && (
                <ControlRow label={<>Signal f</>}>
                  <input
                    type="range" min="1" max={nyquist} step="1"
                    value={signalFreq}
                    onInput={(e) => setSignalFreq(Number(e.currentTarget.value))}
                  />
                  <input
                    type="number" min="1" max={nyquist} step="1"
                    value={signalFreq}
                    onInput={(e) => setSignalFreq(clamp(Math.round(Number(e.currentTarget.value)), 1, nyquist))}
                    class="ema-filter__num"
                  />
                  <span class="ema-filter__unit">Hz</span>
                </ControlRow>
              )}
              {sigMeta.noisy && (
                <ControlRow label={<>Noise ±</>}>
                  <input
                    type="range" min="0" max="1" step="0.05"
                    value={noiseAmp}
                    onInput={(e) => setNoiseAmp(Number(e.currentTarget.value))}
                  />
                  <input
                    type="number" min="0" max="1" step="0.05"
                    value={noiseAmp}
                    onInput={(e) => setNoiseAmp(clamp(Number(e.currentTarget.value), 0, 1))}
                    class="ema-filter__num"
                  />
                </ControlRow>
              )}
            </div>
          )}

          <div class="ema-filter__chart">
            <Plot2d
              title="Input vs EMA output"
              xLabel="Time [s]"
              yLabel="Amplitude"
              series={timeSeries}
              height={320}
            />
          </div>
        </div>
      ) : (
        <div class="ema-filter__pane">
          <div class="ema-filter__chart">
            <Plot2d
              title="Magnitude response"
              xLabel="Normalised frequency [cycles/sample]"
              yLabel="|H(f)| [dB]"
              series={magSeries}
              height={280}
              yMin={-60}
              yMax={5}
            />
          </div>
          <div class="ema-filter__chart">
            <Plot2d
              title="Phase response"
              xLabel="Normalised frequency [cycles/sample]"
              yLabel="Phase [°]"
              series={phaseSeries}
              height={240}
            />
          </div>
          {noCutoff && (
            <div class="ema-filter__note">
              With α = {alpha.toFixed(2)} ≥ {CUTOFF_ALPHA_LIMIT.toFixed(5)}, the magnitude never falls to
              −3 dB before the Nyquist frequency (0.5 cycles/sample), so the filter has <strong>no valid
              cut-off frequency</strong> — the inverse-cosine in the f<sub>c</sub> formula is undefined.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ControlRow({ label, children }) {
  return (
    <div class="ema-filter__control">
      <span class="ema-filter__control-label">{label}</span>
      <div class="ema-filter__control-body">{children}</div>
    </div>
  );
}

function Readout({ label, children }) {
  return (
    <div class="ema-filter__readout">
      <span class="ema-filter__readout-label">{label}</span>
      <span class="ema-filter__readout-value">{children}</span>
    </div>
  );
}

function clamp(v, lo, hi) {
  if (!Number.isFinite(v)) return lo;
  return Math.max(lo, Math.min(hi, v));
}

function formatHz(hz) {
  if (hz === null || !Number.isFinite(hz)) return '—';
  if (hz >= 1000) return `${(hz / 1000).toFixed(3)} kHz`;
  return `${hz.toFixed(2)} Hz`;
}

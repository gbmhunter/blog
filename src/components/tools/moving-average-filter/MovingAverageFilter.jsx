import { useState, useMemo } from 'preact/hooks';
import {
  generateNoisySine, makeSmaWindow, convolveLeftHanded, smaFrequencyResponse,
} from './calc.js';
import Plot2d from '../_shared/Plot2d.jsx';
import './styles.css';

const NUM_SAMPLES = 200;
const SIGNAL_FREQ_HZ = 100;
const NOISE_AMP = 0.2;
const SEED = 1234;

export default function MovingAverageFilter() {
  const [windowSize, setWindowSize] = useState(10);
  const [samplingFreq, setSamplingFreq] = useState(10000);

  const data = useMemo(() => {
    const input = generateNoisySine(samplingFreq, NUM_SAMPLES, SIGNAL_FREQ_HZ, NOISE_AMP, SEED);
    const window = makeSmaWindow(windowSize);
    const inputY = input.map((p) => p.y);
    const outputY = convolveLeftHanded(inputY, window);
    const output = input.map((p, i) => ({ x: p.x, y: outputY[i] }));
    const freqResponse = smaFrequencyResponse(windowSize, samplingFreq, 200);
    return { input, output, freqResponse };
  }, [windowSize, samplingFreq]);

  const samplingPeriodMs = (1 / samplingFreq) * 1000;

  // Memoise series props so Plot2d's effect only re-runs when the underlying
  // arrays change, not on every state update.
  const timeSeries = useMemo(() => ([
    { label: 'Input',  data: data.input,  color: '#c60e00' },
    { label: 'Output', data: data.output, color: '#2563eb' },
  ]), [data.input, data.output]);

  const freqSeries = useMemo(() => ([
    { label: '|H(f)|', data: data.freqResponse, color: '#c60e00' },
  ]), [data.freqResponse]);

  return (
    <div class="ma-filter">
      <div class="ma-filter__legend">
        Designs a left-handed (causal) simple moving average (SMA) filter. The top chart shows a noisy
        100 Hz sine wave (red) and the SMA output (blue). The bottom chart shows the SMA's magnitude
        frequency response. Adjust the window size and sampling frequency below.
      </div>

      <div class="ma-filter__controls">
        <ControlRow label="Window size, N">
          <input
            type="range" min="1" max="30" step="1"
            value={windowSize}
            onInput={(e) => setWindowSize(Number(e.currentTarget.value))}
          />
          <input
            type="number" min="1" max="30" step="1"
            value={windowSize}
            onInput={(e) => setWindowSize(Math.max(1, Math.min(30, Number(e.currentTarget.value) || 1)))}
            class="ma-filter__num"
          />
        </ControlRow>
        <ControlRow label="Sampling f">
          <input
            type="range" min="100" max="20000" step="100"
            value={samplingFreq}
            onInput={(e) => setSamplingFreq(Number(e.currentTarget.value))}
          />
          <input
            type="number" min="100" max="100000" step="100"
            value={samplingFreq}
            onInput={(e) => setSamplingFreq(Math.max(100, Number(e.currentTarget.value) || 100))}
            class="ma-filter__num ma-filter__num--wide"
          />
          <span class="ma-filter__unit">Hz</span>
        </ControlRow>
        <div class="ma-filter__info">
          T<sub>s</sub> = {samplingPeriodMs.toFixed(3)} ms &nbsp;·&nbsp;
          N samples = {NUM_SAMPLES} &nbsp;·&nbsp;
          Signal = {SIGNAL_FREQ_HZ} Hz sine + noise
        </div>
      </div>

      <div class="ma-filter__chart">
        <Plot2d
          title="Time domain"
          xLabel="Time [s]"
          yLabel="Magnitude"
          series={timeSeries}
          height={320}
        />
      </div>

      <div class="ma-filter__chart">
        <Plot2d
          title="Frequency response"
          xLabel="Frequency [Hz]"
          yLabel="|H(f)|"
          series={freqSeries}
          height={320}
          yMin={0}
          yMax={1.05}
        />
      </div>
    </div>
  );
}

function ControlRow({ label, children }) {
  return (
    <div class="ma-filter__control">
      <span class="ma-filter__control-label">{label}</span>
      <div class="ma-filter__control-body">{children}</div>
    </div>
  );
}

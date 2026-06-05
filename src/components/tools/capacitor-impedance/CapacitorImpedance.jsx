import { useState, useMemo } from 'preact/hooks';
import {
  parseCapacitance, parseFrequency, parseResistance, parseInductance,
  formatResistance, formatFrequency,
  capacitiveReactance, inductiveReactance, impedanceMagnitude,
  selfResonantFreq, impedanceSweep, formatMetricDecade,
} from './calc.js';
import Plot2d from '../_shared/Plot2d.jsx';
import './styles.css';

const COLOR_Z = '#c60e00';      // brand red — real |Z|
const COLOR_IDEAL = '#9ca3af';  // grey — ideal reactance
const COLOR_ESR = '#16a34a';    // green — ESR floor
const COLOR_MARK = '#2563eb';   // blue — marked frequency

// Optional fields (ESR, ESL) treat an empty string as zero (ideal).
function parseOptional(text, parser) {
  if (text.trim() === '') return { value: 0, error: null };
  return parser(text);
}

export default function CapacitorImpedance() {
  const [cap, setCap] = useState('1u');
  const [freq, setFreq] = useState('100k');
  const [esr, setEsr] = useState('20m');
  const [esl, setEsl] = useState('0.8n');
  const [ideal, setIdeal] = useState(false);

  const pCap = parseCapacitance(cap);
  const pFreq = parseFrequency(freq);
  const pEsr = parseOptional(esr, parseResistance);
  const pEsl = parseOptional(esl, parseInductance);

  const capOk = pCap.error === null && pCap.value > 0;
  const freqOk = pFreq.error === null && pFreq.value > 0;
  // When "ideal" is ticked, ESR/ESL are forced to zero and their inputs are
  // disabled, so their parse state no longer gates the result.
  const esrOk = ideal || (pEsr.error === null && pEsr.value >= 0);
  const eslOk = ideal || (pEsl.error === null && pEsl.value >= 0);
  const ready = capOk && freqOk && esrOk && eslOk;

  const C = pCap.value;
  const f = pFreq.value;
  const ESR = ideal ? 0 : pEsr.value;
  const ESL = ideal ? 0 : pEsl.value;

  // Derived readouts.
  const xc = ready ? capacitiveReactance(f, C) : NaN;
  const xl = ready ? inductiveReactance(f, ESL) : NaN;
  const z = ready ? impedanceMagnitude(f, C, ESR, ESL) : NaN;
  const srf = ready ? selfResonantFreq(C, ESL) : null;

  // Chart series.
  const series = useMemo(() => {
    if (!ready) return [];
    const { z: zData, ideal, lo, hi } = impedanceSweep({ C, ESR, ESL, fMark: f });

    // y-range for the vertical "marked frequency" line.
    let yMin = Infinity, yMax = -Infinity;
    for (const p of zData) { if (p.y < yMin) yMin = p.y; if (p.y > yMax) yMax = p.y; }
    for (const p of ideal) { if (p.y > yMax) yMax = p.y; }

    const out = [
      { label: 'Real |Z|', data: zData, color: COLOR_Z, width: 2 },
      { label: 'Ideal X_C', data: ideal, color: COLOR_IDEAL, width: 1.5, dash: [6, 4] },
    ];
    if (ESR > 0) {
      out.push({ label: 'ESR floor', data: [{ x: lo, y: ESR }, { x: hi, y: ESR }], color: COLOR_ESR, width: 1, dash: [2, 3] });
    }
    out.push({ label: `f = ${formatFrequency(f, 3)}`, data: [{ x: f, y: yMin }, { x: f, y: yMax }], color: COLOR_MARK, width: 1, dash: [4, 4] });
    return out;
  }, [ready, C, ESR, ESL, f]);

  return (
    <div class="calc-form cap-impedance">
      <div class="calc-form__legend">
        Enter a capacitance and frequency to get the capacitive reactance
        {' '}<em>X<sub>C</sub> = 1 / (2πfC)</em>. Add the parasitic
        {' '}<em>ESR</em> and <em>ESL</em> (leave blank for an ideal capacitor) to get the full
        impedance magnitude <em>|Z| = √(ESR² + (2πf·ESL − 1/(2πfC))²)</em> and the self-resonant
        frequency. The chart sweeps |Z| across frequency.
      </div>

      <label class="cap-impedance__ideal">
        <input type="checkbox" checked={ideal} onChange={(e) => setIdeal(e.currentTarget.checked)} />
        <span>Ideal capacitor (ignore ESR &amp; ESL)</span>
      </label>

      <div class="calc-form__rows">
        <InputRow label={<>C</>} value={cap} onInput={setCap} placeholder="1u" suffix="F" error={capOk ? null : pCap.error || 'Must be greater than zero.'} />
        <InputRow label={<>f</>} value={freq} onInput={setFreq} placeholder="100k" suffix="Hz" error={freqOk ? null : pFreq.error || 'Must be greater than zero.'} />
        <InputRow label={<>ESR</>} value={esr} onInput={setEsr} placeholder="0 (ideal)" suffix="Ω" error={ideal ? null : (esrOk ? null : pEsr.error)} help="optional" disabled={ideal} />
        <InputRow label={<>ESL</>} value={esl} onInput={setEsl} placeholder="0 (ideal)" suffix="H" error={ideal ? null : (eslOk ? null : pEsl.error)} help="optional" disabled={ideal} />
      </div>

      <div class="cap-impedance__readouts">
        <Readout label={<>Capacitive reactance X<sub>C</sub></>} value={ready ? formatResistance(xc) : '—'} />
        <Readout label={<>Inductive reactance X<sub>L</sub></>} value={ready ? formatResistance(xl) : '—'} />
        <Readout label={<>Impedance |Z|</>} value={ready ? formatResistance(z) : '—'} emphasis />
        <Readout label={<>Self-resonant freq f<sub>SRF</sub></>} value={srf ? formatFrequency(srf) : '—'} />
      </div>

      {ready ? (
        <div class="cap-impedance__chart">
          <Plot2d
            title="Impedance magnitude vs. frequency"
            xLabel="Frequency [Hz]"
            yLabel="Impedance |Z| [Ω]"
            series={series}
            height={440}
            xLog
            yLog
            xTickFormat={formatMetricDecade}
            yTickFormat={formatMetricDecade}
          />
        </div>
      ) : (
        <div class="cap-impedance__chart-empty">Enter a valid capacitance and frequency to see the impedance curve.</div>
      )}
    </div>
  );
}

function InputRow({ label, value, onInput, placeholder, suffix, error, help, disabled }) {
  const inputClass = [
    'calc-form__input',
    error ? 'calc-form__input--error' : '',
    disabled ? 'cap-impedance__input--disabled' : '',
  ].filter(Boolean).join(' ');
  return (
    <div class={'calc-form__row' + (disabled ? ' cap-impedance__row--disabled' : '')}>
      <span class="calc-form__label">{label}</span>
      <div class="calc-form__input-cell">
        <div class="calc-form__input-with-suffix">
          <input
            type="text"
            value={value}
            onInput={(e) => onInput(e.currentTarget.value)}
            placeholder={placeholder}
            spellcheck={false}
            disabled={disabled}
            class={inputClass}
          />
          {suffix && <span class="calc-form__suffix">{suffix}</span>}
        </div>
        {error && <div class="calc-form__input-error">{error}</div>}
      </div>
      {help && <div class="calc-form__help">{help}</div>}
    </div>
  );
}

function Readout({ label, value, emphasis }) {
  return (
    <div class={'cap-impedance__readout' + (emphasis ? ' cap-impedance__readout--emphasis' : '')}>
      <span class="cap-impedance__readout-label">{label}</span>
      <span class="cap-impedance__readout-value">{value}</span>
    </div>
  );
}

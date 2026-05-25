import { useState, useMemo } from 'preact/hooks';
import {
  parseFrequency,
  parseCapacitance,
  parseDutyPercent,
  formatTime,
  formatResistance,
  computeAstable,
} from './calc.js';
import './styles.css';

export default function Timer555Astable() {
  const [frequencyText, setFrequencyText] = useState('10k');
  const [dutyText, setDutyText] = useState('60');
  const [capacitanceText, setCapacitanceText] = useState('10n');

  const frequency = useMemo(() => parseFrequency(frequencyText), [frequencyText]);
  const duty = useMemo(() => parseDutyPercent(dutyText), [dutyText]);
  const capacitance = useMemo(() => parseCapacitance(capacitanceText), [capacitanceText]);

  const allValid =
    frequency.error === null && duty.error === null && capacitance.error === null;

  let computed = {
    period: NaN, timeHigh: NaN, timeLow: NaN, r1: NaN, r2: NaN, error: null,
  };
  if (allValid) {
    computed = computeAstable({
      frequency: frequency.value,
      dutyPercent: duty.value,
      capacitance: capacitance.value,
    });
  }

  return (
    <div class="timer-555">
      <div class="timer-555__legend">
        Enter the desired output frequency, duty cycle and timing capacitor to get the period, on/off
        times, and the two timing resistors (R<sub>1</sub>, R<sub>2</sub>) for a 555 in astable mode.
        Duty cycle must be greater than 50% — use an inverter on the output for <em>D</em> &lt; 50%.
      </div>

      <div class="timer-555__rows">
        <InputRow
          label={<>f</>}
          value={frequencyText}
          onInput={setFrequencyText}
          placeholder="10k"
          suffix="Hz"
          parsed={frequency}
          help="The desired frequency of the 555 output waveform."
        />
        <InputRow
          label="Duty"
          value={dutyText}
          onInput={setDutyText}
          placeholder="60"
          suffix="%"
          parsed={duty}
          help="The desired duty cycle. Because of the design of the 555, this must be greater than 50%. Use an inverter on the output for lower duty cycles."
        />
        <InputRow
          label="C"
          value={capacitanceText}
          onInput={setCapacitanceText}
          placeholder="10n"
          suffix="F"
          parsed={capacitance}
          help="The capacitance of the timing capacitor connected to the 555."
        />

        <OutputRow label="T"                   value={computed.period}    format={formatTime}        error={computed.error}
          help="The period of the output waveform, T = 1/f." />
        <OutputRow label={<>t<sub>H</sub></>}  value={computed.timeHigh}  format={formatTime}        error={computed.error}
          help="The time the output is high in each period." />
        <OutputRow label={<>t<sub>L</sub></>}  value={computed.timeLow}   format={formatTime}        error={computed.error}
          help="The time the output is low in each period." />
        <OutputRow label={<>R<sub>1</sub></>}  value={computed.r1}        format={formatResistance}  error={computed.error}
          help="The top timing resistor (between V_cc and the discharge pin)." />
        <OutputRow label={<>R<sub>2</sub></>}  value={computed.r2}        format={formatResistance}  error={computed.error}
          help="The middle timing resistor (between the discharge pin and the threshold pin)." />
      </div>
    </div>
  );
}

function InputRow({ label, value, onInput, placeholder, suffix, parsed, help }) {
  return (
    <div class="timer-555__row">
      <span class="timer-555__label">{label}</span>
      <div class="timer-555__input-cell">
        <div class="timer-555__input-with-suffix">
          <input
            type="text"
            value={value}
            onInput={(e) => onInput(e.currentTarget.value)}
            placeholder={placeholder}
            spellcheck={false}
            title={help}
            class={parsed.error
              ? 'timer-555__input timer-555__input--error'
              : 'timer-555__input'}
          />
          {suffix && <span class="timer-555__suffix">{suffix}</span>}
        </div>
        {parsed.error && <div class="timer-555__input-error">{parsed.error}</div>}
      </div>
      {help && <div class="timer-555__help">{help}</div>}
    </div>
  );
}

function OutputRow({ label, value, format, error, help }) {
  return (
    <div class="timer-555__row">
      <span class="timer-555__label">{label}</span>
      <div class="timer-555__input-cell">
        <div class="timer-555__output">
          {error ? (
            <span class="timer-555__output-error">{error}</span>
          ) : Number.isFinite(value) ? (
            <span class="timer-555__output-value">{format(value)}</span>
          ) : (
            <span class="timer-555__output-empty">—</span>
          )}
        </div>
      </div>
      {help && <div class="timer-555__help">{help}</div>}
    </div>
  );
}

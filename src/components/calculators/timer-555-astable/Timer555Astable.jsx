import { useState, useMemo } from 'preact/hooks';
import {
  parseFrequency,
  parseCapacitance,
  parseDutyPercent,
  formatTime,
  formatResistance,
  computeAstable,
} from './calc.js';
import { InputRow, OutputRow } from '../_shared/FormRows.jsx';
import './styles.css';

export default function Timer555Astable() {
  const [frequencyText, setFrequencyText] = useState('10k');
  const [dutyText, setDutyText] = useState('60');
  const [capacitanceText, setCapacitanceText] = useState('10n');

  const frequency = useMemo(() => parseFrequency(frequencyText), [frequencyText]);
  const duty = useMemo(() => parseDutyPercent(dutyText), [dutyText]);
  const capacitance = useMemo(() => parseCapacitance(capacitanceText), [capacitanceText]);

  // Warn for capacitor values well outside what's practical for a 555 timing
  // network — the resulting resistors become absurd. Thresholds/wording ported
  // from NinjaCalc.
  let capacitanceWarn = null;
  if (capacitance.error === null) {
    if (capacitance.value < 1e-12) capacitanceWarn = 'This is an extremely small capacitance (below 1 pF) — the timing resistors will be impractically large.';
    else if (capacitance.value > 1e-3) capacitanceWarn = 'This is an extremely large capacitance (above 1 mF) — the timing resistors will be impractically small.';
  }

  // The 555 astable's duty cycle is bounded: D = 50% means R1 = 0 (a short),
  // D = 100% means R2 = 0 (no discharge path). Surface as a hard error on the
  // duty input. Previously this only appeared as a compute error on the output.
  let dutyCrossError = null;
  if (duty.error === null) {
    if (duty.value <= 50) dutyCrossError = 'Duty cycle must be greater than 50%. Use an inverter on the output for D < 50%.';
    else if (duty.value >= 100) dutyCrossError = 'Duty cycle must be less than 100%.';
  }
  const dutyMerged = duty.error ? duty : dutyCrossError ? { value: duty.value, error: dutyCrossError } : duty;

  const allValid =
    frequency.error === null && dutyMerged.error === null && capacitance.error === null;

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

  // Warn if R1 or R2 ends up impractically large. Real-world board resistors
  // are typically ≤ 10 MΩ — anything above 10 GΩ is well beyond what's
  // sourceable as a discrete part, leaks current, and the 555's internal
  // discharge transistor / threshold input will dominate the timing instead.
  const R_PRACTICAL_MAX = 1e9;
  const PRACTICAL_MSG = 'This resistance is impractically large (>1 GΩ). Pick a larger timing capacitor to bring the resistor values into a practical range.';
  const r1Warn = Number.isFinite(computed.r1) && computed.r1 > R_PRACTICAL_MAX ? PRACTICAL_MSG : null;
  const r2Warn = Number.isFinite(computed.r2) && computed.r2 > R_PRACTICAL_MAX ? PRACTICAL_MSG : null;

  return (
    <div class="calc-form">
      <div class="calc-form__legend">
        Enter the desired output frequency, duty cycle and timing capacitor to get the period, on/off
        times, and the two timing resistors (R<sub>1</sub>, R<sub>2</sub>) for a 555 in astable mode.
        Duty cycle must be greater than 50% — use an inverter on the output for <em>D</em> &lt; 50%.
      </div>

      <div class="calc-form__rows">
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
          parsed={dutyMerged}
          help="The desired duty cycle. Because of the design of the 555, this must be greater than 50%. Use an inverter on the output for lower duty cycles."
        />
        <InputRow
          label="C"
          value={capacitanceText}
          onInput={setCapacitanceText}
          placeholder="10n"
          suffix="F"
          parsed={capacitance}
          warning={capacitanceWarn}
          help="The capacitance of the timing capacitor connected to the 555."
        />

        <OutputRow label="T"                   value={computed.period}    format={formatTime}        error={computed.error}
          help="The period of the output waveform, T = 1/f." />
        <OutputRow label={<>t<sub>H</sub></>}  value={computed.timeHigh}  format={formatTime}        error={computed.error}
          help="The time the output is high in each period." />
        <OutputRow label={<>t<sub>L</sub></>}  value={computed.timeLow}   format={formatTime}        error={computed.error}
          help="The time the output is low in each period." />
        <OutputRow label={<>R<sub>1</sub></>}  value={computed.r1}        format={formatResistance}  error={computed.error}  warning={r1Warn}
          help="The top timing resistor (between V_cc and the discharge pin)." />
        <OutputRow label={<>R<sub>2</sub></>}  value={computed.r2}        format={formatResistance}  error={computed.error}  warning={r2Warn}
          help="The middle timing resistor (between the discharge pin and the threshold pin)." />
      </div>
    </div>
  );
}


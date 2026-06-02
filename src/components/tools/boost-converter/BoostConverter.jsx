import { useState, useMemo } from 'preact/hooks';
import {
  parseVoltage, parseFrequency, parseCurrent, parsePercent,
  formatPercent, formatInductance, formatCurrent,
  computeBoost,
} from './calc.js';
import { InputRow, OutputRow } from '../_shared/FormRows.jsx';
import './styles.css';

export default function BoostConverter() {
  const [vInText, setVInText] = useState('5');
  const [vOutText, setVOutText] = useState('12');
  const [vDText, setVDText] = useState('0.5');
  const [vSwText, setVSwText] = useState('0.1');
  const [fSwText, setFSwText] = useState('1M');
  const [iOutText, setIOutText] = useState('0.5');
  const [rippleText, setRippleText] = useState('35');

  const vIn = useMemo(() => parseVoltage(vInText), [vInText]);
  const vOut = useMemo(() => parseVoltage(vOutText), [vOutText]);
  const vD = useMemo(() => parseVoltage(vDText), [vDText]);
  const vSw = useMemo(() => parseVoltage(vSwText), [vSwText]);
  const fSw = useMemo(() => parseFrequency(fSwText), [fSwText]);
  const iOut = useMemo(() => parseCurrent(iOutText), [iOutText]);
  const ripple = useMemo(() => parsePercent(rippleText), [rippleText]);

  // A ripple above ~50% of the average inductor current is typically too high
  // for sensible CCM operation (the inductor current would approach DCM).
  const rippleWarn = ripple.error === null && ripple.value > 50
    ? 'The inductor ripple current should be less than 50% of the average inductor current for sensible CCM operation.'
    : null;

  // Cross-field error: a boost converter can only step the voltage up.
  const vOutCrossError = vIn.error === null && vOut.error === null && vOut.value < vIn.value
    ? 'V_out must be greater than or equal to V_in — a boost converter can only step the voltage up.'
    : null;
  const vOutMerged = vOut.error
    ? vOut
    : vOutCrossError
      ? { value: vOut.value, error: vOutCrossError }
      : vOut;

  const allValid = [vIn, vOutMerged, vD, vSw, fSw, iOut, ripple].every((p) => p.error === null);
  let r = { duty: NaN, iLAvg: NaN, iLPeak: NaN, inductance: NaN, error: null };
  if (allValid) r = computeBoost({
    vIn: vIn.value, vOut: vOut.value, vD: vD.value, vSw: vSw.value,
    fSw: fSw.value, iOut: iOut.value, iLRipple: ripple.value / 100,
  });

  return (
    <div class="calc-form">
      <div class="calc-form__legend">
        Generic boost-converter design (CCM): enter the input/output voltages, diode and switch drops,
        switching frequency, output current and acceptable inductor ripple to get the duty cycle, average
        and peak inductor current, and required inductance. Diode drop is 0 for synchronous (active-rectifier)
        topologies.
      </div>
      <div class="calc-form__rows">
        <InputRow label={<>V<sub>in</sub></>}   value={vInText}    onInput={setVInText}    placeholder="5"   suffix="V" parsed={vIn}
          help="The voltage provided to the input of the boost converter. Usually from a battery or a lower DC rail you want to step up."/>
        <InputRow label={<>V<sub>out</sub></>}  value={vOutText}   onInput={setVOutText}   placeholder="12"  suffix="V" parsed={vOutMerged}
          help="The output voltage of the boost converter. Must be higher than V_in."/>
        <InputRow label={<>V<sub>D</sub></>}    value={vDText}     onInput={setVDText}     placeholder="0.5" suffix="V" parsed={vD}
          help="The forward voltage drop across the diode when fully conducting. Typically ~0.3 V for a Schottky. Use 0 for synchronous (active-rectifier) topologies."/>
        <InputRow label={<>V<sub>SW</sub></>}   value={vSwText}    onInput={setVSwText}    placeholder="0.1" suffix="V" parsed={vSw}
          help="The voltage drop across the switching element when fully ON. Typically a MOSFET's V_DS(on)."/>
        <InputRow label={<>f<sub>SW</sub></>}   value={fSwText}    onInput={setFSwText}    placeholder="1M"  suffix="Hz" parsed={fSw}
          help="The switching frequency of the transistor (or other switching element)."/>
        <InputRow label={<>I<sub>out</sub></>}  value={iOutText}   onInput={setIOutText}   placeholder="0.5" suffix="A" parsed={iOut}
          help="The average (DC) output current of the boost converter. Note: this is lower than the input current — boosts trade voltage for current."/>
        <InputRow label={<>ΔI<sub>L</sub></>}   value={rippleText} onInput={setRippleText} placeholder="35"  suffix="%" parsed={ripple} warning={rippleWarn}
          help="The peak-to-peak inductor ripple current as a percentage of the average inductor current. A typical rule of thumb is 30–40%."/>

        <OutputRow label="D"                          value={r.duty}        format={formatPercent}    error={r.error}
          help={<>The on/off duty cycle, <em>D = (V<sub>out</sub> + V<sub>D</sub> − V<sub>in</sub>) / (V<sub>out</sub> + V<sub>D</sub> − V<sub>SW</sub>)</em>.</>}/>
        <OutputRow label={<>I<sub>L,avg</sub></>}     value={r.iLAvg}       format={formatCurrent}    error={r.error}
          help="The average inductor (= input) current. For an ideal boost this is I_out / (1 − D)."/>
        <OutputRow label={<>I<sub>L,peak</sub></>}    value={r.iLPeak}      format={formatCurrent}    error={r.error}
          help="The peak inductor current. The inductor's saturation current rating must be above this."/>
        <OutputRow label="L"                          value={r.inductance}  format={formatInductance} error={r.error}
          help="The required inductance to keep the inductor ripple current below the specified percentage."/>
      </div>
    </div>
  );
}

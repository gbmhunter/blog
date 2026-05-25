import { useState, useMemo } from 'preact/hooks';
import {
  parseVoltage, parseFrequency, parseCurrent, parsePercent,
  formatPercent, formatInductance,
  computeBuck,
} from './calc.js';
import { InputRow, OutputRow } from '../_shared/FormRows.jsx';
import './styles.css';

export default function BuckConverter() {
  const [vInText, setVInText] = useState('12');
  const [vOutText, setVOutText] = useState('3.3');
  const [vDText, setVDText] = useState('0.5');
  const [vSwText, setVSwText] = useState('0.1');
  const [fSwText, setFSwText] = useState('1M');
  const [iOutText, setIOutText] = useState('1');
  const [rippleText, setRippleText] = useState('30');

  const vIn = useMemo(() => parseVoltage(vInText), [vInText]);
  const vOut = useMemo(() => parseVoltage(vOutText), [vOutText]);
  const vD = useMemo(() => parseVoltage(vDText), [vDText]);
  const vSw = useMemo(() => parseVoltage(vSwText), [vSwText]);
  const fSw = useMemo(() => parseFrequency(fSwText), [fSwText]);
  const iOut = useMemo(() => parseCurrent(iOutText), [iOutText]);
  const ripple = useMemo(() => parsePercent(rippleText), [rippleText]);

  const allValid = [vIn, vOut, vD, vSw, fSw, iOut, ripple].every((p) => p.error === null);
  let r = { duty: NaN, inductance: NaN, error: null };
  if (allValid) r = computeBuck({
    vIn: vIn.value, vOut: vOut.value, vD: vD.value, vSw: vSw.value,
    fSw: fSw.value, iOutAvg: iOut.value, iOutRipple: ripple.value / 100,
  });

  return (
    <div class="calc-form buck">
      <div class="calc-form__legend">
        Generic buck-converter design: enter the input/output voltages, diode and switch drops,
        switching frequency, output current and acceptable inductor ripple to get the duty cycle
        and required inductance. Diode drop is 0 for synchronous (active-rectifier) topologies.
      </div>
      <div class="calc-form__rows">
        <InputRow label={<>V<sub>in</sub></>}    value={vInText}    onInput={setVInText}    placeholder="12"  suffix="V" parsed={vIn}
          help="The voltage provided to the input of the buck converter. Usually from a DC power supply or battery."/>
        <InputRow label={<>V<sub>out</sub></>}   value={vOutText}   onInput={setVOutText}   placeholder="3.3" suffix="V" parsed={vOut}
          help="The output voltage of the buck converter. Must be lower than V_in."/>
        <InputRow label={<>V<sub>D</sub></>}     value={vDText}     onInput={setVDText}     placeholder="0.5" suffix="V" parsed={vD}
          help="The forward voltage drop across the diode when fully conducting. For synchronous converters (active MOSFET rectifier), use 0 or the MOSFET's V_DS(on)."/>
        <InputRow label={<>V<sub>SW</sub></>}    value={vSwText}    onInput={setVSwText}    placeholder="0.1" suffix="V" parsed={vSw}
          help="The voltage drop across the switching element when fully ON. Typically a MOSFET's V_DS(on)."/>
        <InputRow label={<>f<sub>SW</sub></>}    value={fSwText}    onInput={setFSwText}    placeholder="1M"  suffix="Hz" parsed={fSw}
          help="The switching frequency of the transistor (or other switching element)."/>
        <InputRow label={<>I<sub>out</sub></>}   value={iOutText}   onInput={setIOutText}   placeholder="1"   suffix="A" parsed={iOut}
          help="The average (DC) output current of the buck converter. Note: this is usually higher than the input current."/>
        <InputRow label={<>ΔI<sub>L</sub></>}    value={rippleText} onInput={setRippleText} placeholder="30"  suffix="%" parsed={ripple}
          help="The peak-to-peak inductor ripple current as a percentage of the average output current. Typically 10–30% for good operation."/>

        <OutputRow label="D"                     value={r.duty}        format={formatPercent}    error={r.error}
          help={<>The on/off duty cycle, <em>D = (V<sub>out</sub> − V<sub>D</sub>) / (V<sub>in</sub> − V<sub>SW</sub> − V<sub>D</sub>)</em>.</>}/>
        <OutputRow label="L"                     value={r.inductance}  format={formatInductance} error={r.error}
          help="The required inductance to keep the inductor ripple current below the specified percentage."/>
      </div>
    </div>
  );
}

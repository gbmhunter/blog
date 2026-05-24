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
  const [iOutText, setIOutText] = useState('1A');
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
        <InputRow label={<>V<sub>in</sub></>}              value={vInText}    onInput={setVInText}    placeholder="12"    suffix="V" parsed={vIn}/>
        <InputRow label={<>V<sub>out</sub></>}             value={vOutText}   onInput={setVOutText}   placeholder="3.3"   suffix="V" parsed={vOut}/>
        <InputRow label={<>V<sub>D</sub></>}               value={vDText}     onInput={setVDText}     placeholder="0.5"   suffix="V" parsed={vD}/>
        <InputRow label={<>V<sub>SW</sub></>}              value={vSwText}    onInput={setVSwText}    placeholder="0.1"   suffix="V" parsed={vSw}/>
        <InputRow label={<>f<sub>SW</sub></>}              value={fSwText}    onInput={setFSwText}    placeholder="1M"    parsed={fSw}/>
        <InputRow label={<>I<sub>out</sub></>}             value={iOutText}   onInput={setIOutText}   placeholder="1A"    parsed={iOut}/>
        <InputRow label={<>ΔI<sub>L</sub></>}              value={rippleText} onInput={setRippleText} placeholder="30"    suffix="%" parsed={ripple}/>

        <OutputRow label="D"                                value={r.duty}        format={formatPercent}    error={r.error}/>
        <OutputRow label="L"                                value={r.inductance}  format={formatInductance} error={r.error}/>
      </div>
    </div>
  );
}

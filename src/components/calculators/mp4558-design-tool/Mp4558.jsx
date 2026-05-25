import { useState, useMemo } from 'preact/hooks';
import {
  parseFrequency,
  parseVoltage,
  parseCurrent,
  parseResistance,
  parseCapacitance,
  parsePercent,
  formatVoltage,
  formatCurrent,
  formatResistance,
  formatInductance,
  computeMp4558,
} from './calc.js';
import './styles.css';

export default function Mp4558() {
  const [fSwText, setFSwText] = useState('500k');
  const [vOutText, setVOutText] = useState('3.3');
  const [r2Text, setR2Text] = useState('10k');
  const [iLoadText, setILoadText] = useState('1');
  const [ripplePctText, setRipplePctText] = useState('30');
  const [vInText, setVInText] = useState('36');
  const [cInText, setCInText] = useState('10u');
  const [cOutText, setCOutText] = useState('33u');
  const [rEsrText, setREsrText] = useState('10m');

  const fSw = useMemo(() => parseFrequency(fSwText), [fSwText]);
  const vOut = useMemo(() => parseVoltage(vOutText), [vOutText]);
  const r2 = useMemo(() => parseResistance(r2Text), [r2Text]);
  const iLoad = useMemo(() => parseCurrent(iLoadText), [iLoadText]);
  const ripplePct = useMemo(() => parsePercent(ripplePctText), [ripplePctText]);
  const vIn = useMemo(() => parseVoltage(vInText), [vInText]);
  const cIn = useMemo(() => parseCapacitance(cInText), [cInText]);
  const cOut = useMemo(() => parseCapacitance(cOutText), [cOutText]);
  const rEsr = useMemo(() => parseResistance(rEsrText), [rEsrText]);

  const allValid = [fSw, vOut, r2, iLoad, ripplePct, vIn, cIn, cOut, rEsr]
    .every((p) => p.error === null);

  let computed = {
    rFreq: NaN, r1: NaN, inductance: NaN, iLPeak: NaN,
    vInRipple: NaN, vOutRipple: NaN, error: null,
  };
  if (allValid) {
    computed = computeMp4558({
      fSw: fSw.value,
      vOut: vOut.value,
      r2: r2.value,
      iLoad: iLoad.value,
      ripplePercent: ripplePct.value,
      vIn: vIn.value,
      cIn: cIn.value,
      cOut: cOut.value,
      rEsr: rEsr.value,
    });
  }

  return (
    <div class="mp4558">
      <div class="mp4558__legend">
        Enter the switching frequency, output voltage, bottom feedback resistor (R<sub>2</sub>),
        average load current, allowable inductor ripple current, input voltage, input and output
        capacitances, and output capacitor ESR. Outputs the frequency-setting resistor (R<sub>freq</sub>),
        top feedback resistor (R<sub>1</sub>), required inductance, peak inductor current, and input /
        output ripple voltages. All equations are taken straight from the MP4558 datasheet.
      </div>

      <div class="mp4558__rows">
        <InputRow label={<>f<sub>sw</sub></>}    value={fSwText}       onInput={setFSwText}       placeholder="500k" suffix="Hz" parsed={fSw}
          help="The desired switching frequency."/>
        <InputRow label={<>V<sub>out</sub></>}   value={vOutText}      onInput={setVOutText}      placeholder="3.3"  suffix="V"  parsed={vOut}
          help="The desired output voltage."/>
        <InputRow label={<>R<sub>2</sub></>}     value={r2Text}        onInput={setR2Text}        placeholder="10k"  suffix="Ω"  parsed={r2}
          help="The resistance of the bottom resistor in the feedback divider that sets the output voltage."/>
        <InputRow label={<>I<sub>load</sub></>}  value={iLoadText}     onInput={setILoadText}     placeholder="1"    suffix="A"  parsed={iLoad}
          help="The average load current."/>
        <InputRow label={<>ΔI<sub>L</sub></>}    value={ripplePctText} onInput={setRipplePctText} placeholder="30"   suffix="%"  parsed={ripplePct}
          help="The allowable inductor ripple current, as a percentage of the average load current. Normally set to around 30%."/>
        <InputRow label={<>V<sub>in</sub></>}    value={vInText}       onInput={setVInText}       placeholder="36"   suffix="V"  parsed={vIn}
          help="The input voltage."/>
        <InputRow label={<>C<sub>in</sub></>}    value={cInText}       onInput={setCInText}       placeholder="10u"  suffix="F"  parsed={cIn}
          help="The capacitance on the input. A larger input capacitance results in lower input voltage ripple."/>
        <InputRow label={<>C<sub>out</sub></>}   value={cOutText}      onInput={setCOutText}      placeholder="33u"  suffix="F"  parsed={cOut}
          help="The capacitance on the output. A larger output capacitance results in lower output voltage ripple."/>
        <InputRow label={<>R<sub>ESR</sub></>}   value={rEsrText}      onInput={setREsrText}      placeholder="10m"  suffix="Ω"  parsed={rEsr}
          help="The ESR (equivalent series resistance) of the output capacitor. A larger ESR results in larger output voltage ripple."/>

        <OutputRow label={<>R<sub>freq</sub></>}    value={computed.rFreq}      format={formatResistance} error={computed.error}
          help="Resistance needed for the resistor that sets the switching frequency."/>
        <OutputRow label={<>R<sub>1</sub></>}       value={computed.r1}         format={formatResistance} error={computed.error}
          help="The resistance of the top resistor in the feedback divider that sets the output voltage."/>
        <OutputRow label="L"                        value={computed.inductance} format={formatInductance} error={computed.error}
          help="The required inductance of the inductor."/>
        <OutputRow label={<>I<sub>L,peak</sub></>}  value={computed.iLPeak}     format={formatCurrent}    error={computed.error}
          help="The peak current through the inductor. Make sure the inductor's saturation current is above this value."/>
        <OutputRow label={<>ΔV<sub>in</sub></>}     value={computed.vInRipple}  format={formatVoltage}    error={computed.error}
          help="The input ripple voltage."/>
        <OutputRow label={<>ΔV<sub>out</sub></>}    value={computed.vOutRipple} format={formatVoltage}    error={computed.error}
          help="The output ripple voltage. Lower it by increasing the output capacitance, decreasing the output capacitor's ESR, or increasing the switching frequency."/>
      </div>
    </div>
  );
}

function InputRow({ label, value, onInput, placeholder, suffix, parsed, help }) {
  return (
    <div class="mp4558__row">
      <span class="mp4558__label">{label}</span>
      <div class="mp4558__input-cell">
        <div class="mp4558__input-with-suffix">
          <input
            type="text"
            value={value}
            onInput={(e) => onInput(e.currentTarget.value)}
            placeholder={placeholder}
            spellcheck={false}
            title={help}
            class={parsed.error
              ? 'mp4558__input mp4558__input--error'
              : 'mp4558__input'}
          />
          {suffix && <span class="mp4558__suffix">{suffix}</span>}
        </div>
        {parsed.error && <div class="mp4558__input-error">{parsed.error}</div>}
      </div>
      {help && <div class="mp4558__help">{help}</div>}
    </div>
  );
}

function OutputRow({ label, value, format, error, help }) {
  return (
    <div class="mp4558__row">
      <span class="mp4558__label">{label}</span>
      <div class="mp4558__input-cell">
        <div class="mp4558__output">
          {error ? (
            <span class="mp4558__output-error">{error}</span>
          ) : Number.isFinite(value) ? (
            <span class="mp4558__output-value">{format(value)}</span>
          ) : (
            <span class="mp4558__output-empty">—</span>
          )}
        </div>
      </div>
      {help && <div class="mp4558__help">{help}</div>}
    </div>
  );
}

import { useState, useMemo } from 'preact/hooks';
import {
  parseLength,
  parseDielectric,
  formatImpedance,
  computeMicrostripImpedance,
} from './calc.js';
import './styles.css';

export default function MicrostripImpedance() {
  const [wText, setWText] = useState('0.2mm');
  const [tText, setTText] = useState('35um');
  const [hText, setHText] = useState('1.6mm');
  const [eRText, setERText] = useState('4.0');

  const w = useMemo(() => parseLength(wText), [wText]);
  const t = useMemo(() => parseLength(tText), [tText]);
  const h = useMemo(() => parseLength(hText), [hText]);
  const eR = useMemo(() => parseDielectric(eRText), [eRText]);

  const allValid =
    w.error === null && t.error === null && h.error === null && eR.error === null;

  let computed = { impedance: NaN, eEff: NaN, error: null };
  if (allValid) {
    computed = computeMicrostripImpedance({
      trackWidth: w.value,
      trackThickness: t.value,
      substrateHeight: h.value,
      dielectric: eR.value,
    });
  }

  return (
    <div class="microstrip">
      <div class="microstrip__legend">
        Enter the track width, track (copper) thickness, substrate thickness and substrate dielectric
        constant. The calculator returns the characteristic impedance using the rfcafe approximation.
        Dimensions accept metric prefixes — e.g. <code>0.2mm</code>, <code>35um</code>.
      </div>

      <div class="microstrip__rows">
        <InputRow label="w"          value={wText}   onInput={setWText}   placeholder="0.2mm" parsed={w}/>
        <InputRow label="t"          value={tText}   onInput={setTText}   placeholder="35um"  parsed={t}/>
        <InputRow label="h"          value={hText}   onInput={setHText}   placeholder="1.6mm" parsed={h}/>
        <InputRow label={<>ε<sub>r</sub></>} value={eRText}  onInput={setERText}  placeholder="4.0"   parsed={eR}/>

        <div class="microstrip__row">
          <span class="microstrip__label">Z</span>
          <div class="microstrip__output">
            {computed.error ? (
              <span class="microstrip__output-error">{computed.error}</span>
            ) : Number.isFinite(computed.impedance) ? (
              <span class="microstrip__output-value">{formatImpedance(computed.impedance)}</span>
            ) : (
              <span class="microstrip__output-empty">—</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InputRow({ label, value, onInput, placeholder, parsed }) {
  return (
    <div class="microstrip__row">
      <span class="microstrip__label">{label}</span>
      <div class="microstrip__input-cell">
        <input
          type="text"
          value={value}
          onInput={(e) => onInput(e.currentTarget.value)}
          placeholder={placeholder}
          spellcheck={false}
          class={parsed.error
            ? 'microstrip__input microstrip__input--error'
            : 'microstrip__input'}
        />
        {parsed.error && <div class="microstrip__input-error">{parsed.error}</div>}
      </div>
    </div>
  );
}

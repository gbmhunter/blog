import { useState, useMemo } from 'preact/hooks';
import {
  LENGTH_UNITS, IMPEDANCE_UNITS, getUnit,
  parseNumber, formatInUnit,
  computeMicrostripImpedance,
} from './calc.js';
import './styles.css';

export default function MicrostripImpedance() {
  // Each length input keeps a numeric magnitude (text) and a unit label
  // (matches NinjaCalc's per-row unit dropdown). Conversion to SI happens
  // when we feed the values to computeMicrostripImpedance.
  const [w, setW] = useState({ text: '0.2', unit: 'mm' });
  const [t, setT] = useState({ text: '35',  unit: 'um' });
  const [h, setH] = useState({ text: '1.6', unit: 'mm' });
  const [eRText, setERText] = useState('4.0');
  const [zUnit, setZUnit] = useState('Ω');

  const wParsed = useMemo(() => parseNumber(w.text),  [w.text]);
  const tParsed = useMemo(() => parseNumber(t.text),  [t.text]);
  const hParsed = useMemo(() => parseNumber(h.text),  [h.text]);
  const eRParsed = useMemo(() => parseNumber(eRText), [eRText]);

  const allValid = [wParsed, tParsed, hParsed, eRParsed].every((p) => p.error === null);

  let computed = { impedance: NaN, eEff: NaN, error: null };
  if (allValid) {
    computed = computeMicrostripImpedance({
      trackWidth:      wParsed.value * getUnit(LENGTH_UNITS, w.unit).multiplier,
      trackThickness:  tParsed.value * getUnit(LENGTH_UNITS, t.unit).multiplier,
      substrateHeight: hParsed.value * getUnit(LENGTH_UNITS, h.unit).multiplier,
      dielectric:      eRParsed.value,
    });
  }

  return (
    <div class="microstrip">
      <div class="microstrip__legend">
        Enter the track width, copper thickness, substrate thickness and substrate dielectric constant.
        Pick the unit for each dimension from the dropdown. The calculator returns the characteristic
        impedance using the rfcafe approximation.
      </div>

      <div class="microstrip__rows">
        <LengthRow label="w" state={w} setState={setW} parsed={wParsed} placeholder="0.2"
          help="The width of the track (microstrip). Usually measured in mm or mils."/>
        <LengthRow label="t" state={t} setState={setT} parsed={tParsed} placeholder="35"
          help="The thickness of the track (microstrip) — the same as the copper weight of the layer it's on. Usually measured in µm or oz./sq foot."/>
        <LengthRow label="h" state={h} setState={setH} parsed={hParsed} placeholder="1.6"
          help="The thickness of the substrate — the distance between the track and the plane below it. ≈ 1.6 mm on a standard 2-layer PCB; much smaller between adjacent layers on a high-density board."/>

        <div class="microstrip__row">
          <span class="microstrip__label">ε<sub>r</sub></span>
          <div class="microstrip__input-cell">
            <input
              type="text"
              value={eRText}
              onInput={(e) => setERText(e.currentTarget.value)}
              placeholder="4.0"
              spellcheck={false}
              title="The dielectric of the substrate. For standard FR-4 PCB material this is around 4–4.7."
              class={eRParsed.error
                ? 'microstrip__input microstrip__input--error'
                : 'microstrip__input'}
            />
            {eRParsed.error && <div class="microstrip__input-error">{eRParsed.error}</div>}
          </div>
          <div class="microstrip__help">The dielectric of the substrate. For standard FR-4 PCB material this is around 4–4.7.</div>
        </div>

        <div class="microstrip__row">
          <span class="microstrip__label">Z</span>
          <div class="microstrip__input-cell">
            <div class="microstrip__output-cell">
              <div class="microstrip__output">
                {computed.error ? (
                  <span class="microstrip__output-error">{computed.error}</span>
                ) : Number.isFinite(computed.impedance) ? (
                  <span class="microstrip__output-value">
                    {formatInUnit(computed.impedance, getUnit(IMPEDANCE_UNITS, zUnit))}
                  </span>
                ) : (
                  <span class="microstrip__output-empty">—</span>
                )}
              </div>
              <select
                class="microstrip__unit-select"
                value={zUnit}
                onChange={(e) => setZUnit(e.currentTarget.value)}
              >
                {IMPEDANCE_UNITS.map((u) => (
                  <option key={u.label} value={u.label}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div class="microstrip__help">The calculated characteristic impedance of the microstrip. Needs to match the impedance at each end so RF reflections don't occur. Typically 20–150 Ω.</div>
        </div>
      </div>
    </div>
  );
}

function LengthRow({ label, state, setState, parsed, placeholder, help }) {
  return (
    <div class="microstrip__row">
      <span class="microstrip__label">{label}</span>
      <div class="microstrip__input-cell">
        <div class="microstrip__input-with-unit">
          <input
            type="text"
            value={state.text}
            onInput={(e) => setState({ ...state, text: e.currentTarget.value })}
            placeholder={placeholder}
            spellcheck={false}
            title={help}
            class={parsed.error
              ? 'microstrip__input microstrip__input--error'
              : 'microstrip__input'}
          />
          <select
            class="microstrip__unit-select"
            value={state.unit}
            onChange={(e) => setState({ ...state, unit: e.currentTarget.value })}
          >
            {LENGTH_UNITS.map((u) => (
              <option key={u.label} value={u.label}>{u.label}</option>
            ))}
          </select>
        </div>
        {parsed.error && <div class="microstrip__input-error">{parsed.error}</div>}
      </div>
      {help && <div class="microstrip__help">{help}</div>}
    </div>
  );
}

import { useState, useMemo } from 'preact/hooks';
import {
  parseTemp, parsePercent, parseUnitless,
  formatTemp, formatPercent,
  computeMagnus,
} from './calc.js';
import { InputRow } from '../_shared/FormRows.jsx';
import './styles.css';

const TARGETS = ['airTemp', 'relativeHumidity', 'dewPoint'];
const LABELS = {
  airTemp: <>T<sub>air</sub></>,
  relativeHumidity: 'RH',
  dewPoint: <>T<sub>dp</sub></>,
};
const PLACEHOLDERS = {
  airTemp: '25', relativeHumidity: '50', dewPoint: '14.0',
};
const SUFFIXES = {
  airTemp: '°C', relativeHumidity: '%', dewPoint: '°C',
};

export default function DewPointMagnus() {
  const [values, setValues] = useState({ airTemp: '25', relativeHumidity: '50', dewPoint: '14.0' });
  const [target, setTarget] = useState('dewPoint');
  const [bText, setBText] = useState('17.625');
  const [cText, setCText] = useState('243.04');

  const air = useMemo(() => parseTemp(values.airTemp), [values.airTemp]);
  const rh = useMemo(() => parsePercent(values.relativeHumidity), [values.relativeHumidity]);
  const dp = useMemo(() => parseTemp(values.dewPoint), [values.dewPoint]);
  const b = useMemo(() => parseUnitless(bText), [bText]);
  const c = useMemo(() => parseTemp(cText), [cText]);

  const all = { airTemp: air, relativeHumidity: rh, dewPoint: dp };
  const knownErrors = TARGETS.filter((k) => k !== target).map((k) => all[k]).concat([b, c]);
  const allValid = knownErrors.every((p) => p.error === null);

  let computed = { value: NaN, error: null };
  if (allValid) {
    computed = computeMagnus(target, {
      airTemp: air.value, relativeHumidity: rh.value, dewPoint: dp.value,
      b: b.value, c: c.value,
    });
  }

  const formatFor = (key) => key === 'relativeHumidity' ? formatPercent : formatTemp;
  const setValue = (key, text) => setValues((prev) => ({ ...prev, [key]: text }));

  return (
    <div class="calc-form magnus">
      <div class="calc-form__legend">
        Solve the Magnus equation for any one of air temperature, relative humidity or dew point
        given the other two. Default coefficients (b = 17.625, c = 243.04 °C) are standard for
        liquid water.
      </div>
      <div class="calc-form__rows">
        {TARGETS.map((key) => {
          const isTarget = key === target;
          const parsed = all[key];
          return (
            <div class="calc-form__row calc-form__row--radio" key={key}>
              <label class="calc-form__radio">
                <input
                  type="radio"
                  name="magnus-target"
                  checked={isTarget}
                  onChange={() => setTarget(key)}
                />
              </label>
              <span class="calc-form__label">{LABELS[key]}</span>
              {isTarget ? (
                <div class="calc-form__output">
                  {computed.error ? (
                    <span class="calc-form__output-error">{computed.error}</span>
                  ) : Number.isFinite(computed.value) ? (
                    <span class="calc-form__output-value">{formatFor(key)(computed.value)}</span>
                  ) : (
                    <span class="calc-form__output-empty">—</span>
                  )}
                </div>
              ) : (
                <div class="calc-form__input-cell">
                  <div class="calc-form__input-with-suffix">
                    <input
                      type="text"
                      value={values[key]}
                      onInput={(e) => setValue(key, e.currentTarget.value)}
                      placeholder={PLACEHOLDERS[key]}
                      spellcheck={false}
                      class={parsed.error ? 'calc-form__input calc-form__input--error' : 'calc-form__input'}
                    />
                    <span class="calc-form__suffix">{SUFFIXES[key]}</span>
                  </div>
                  {parsed.error && <div class="calc-form__input-error">{parsed.error}</div>}
                </div>
              )}
            </div>
          );
        })}
        <InputRow label="b" value={bText} onInput={setBText} placeholder="17.625" parsed={b}/>
        <InputRow label="c" value={cText} onInput={setCText} placeholder="243.04" suffix="°C" parsed={c}/>
      </div>
    </div>
  );
}

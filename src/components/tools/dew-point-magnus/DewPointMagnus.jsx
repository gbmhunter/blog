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
const HELPS = {
  airTemp: 'The temperature of the air. Must be the same temperature at which the relative humidity was measured.',
  relativeHumidity: 'The relative humidity of the air, as a percentage of the total amount of water the air could hold at the current temperature.',
  dewPoint: 'If the air is cooled to the dew-point temperature, condensation starts to form. May be below the freezing point of water.',
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
                <div class="calc-form__input-cell">
                  <div class="calc-form__output">
                    {computed.error ? (
                      <span class="calc-form__output-error">{computed.error}</span>
                    ) : Number.isFinite(computed.value) ? (
                      <span class="calc-form__output-value">{formatFor(key)(computed.value)}</span>
                    ) : (
                      <span class="calc-form__output-empty">—</span>
                    )}
                  </div>
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
                      title={HELPS[key]}
                      class={parsed.error ? 'calc-form__input calc-form__input--error' : 'calc-form__input'}
                    />
                    <span class="calc-form__suffix">{SUFFIXES[key]}</span>
                  </div>
                  {parsed.error && <div class="calc-form__input-error">{parsed.error}</div>}
                </div>
              )}
              <div class="calc-form__help">{HELPS[key]}</div>
            </div>
          );
        })}
        <InputRow label="b" value={bText} onInput={setBText} placeholder="17.625" parsed={b}
          help="The b coefficient of the Magnus equation."/>
        <InputRow label="c" value={cText} onInput={setCText} placeholder="243.04" suffix="°C" parsed={c}
          help="The c coefficient of the Magnus equation."/>
      </div>
    </div>
  );
}

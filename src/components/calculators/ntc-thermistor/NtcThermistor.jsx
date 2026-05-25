import { useState, useMemo } from 'preact/hooks';
import {
  parseUnitless, parseResistance, parseNumber,
  formatUnitless, formatResistance, formatTempIn,
  TEMP_UNITS, getTempUnit,
  computeNtc,
} from './calc.js';
import './styles.css';

const TARGETS = ['beta', 'refR', 'refT', 'R', 'T'];
const TEMP_KEYS = new Set(['refT', 'T']);

// Static per-row metadata. Temperature rows (refT, T) get their parser and
// formatter at render time so they can pick up the user-selected unit.
const VARS = {
  beta: { label: 'β',                kind: 'unitless',
    placeholder: '3950',
    help: 'The Beta coefficient. Usually specified in the thermistor datasheet.' },
  refR: { label: <>R<sub>0</sub></>, kind: 'resistance',
    placeholder: '10k',
    help: 'The resistance of the thermistor at the reference point. Usually quoted at 25 °C.' },
  refT: { label: <>T<sub>0</sub></>, kind: 'temperature',
    placeholder: '25',
    help: 'The temperature of the thermistor at the reference point. Usually 25 °C.' },
  R:    { label: 'R',                kind: 'resistance',
    placeholder: '17.625k',
    help: 'The present resistance of the thermistor, measured at temperature T.' },
  T:    { label: 'T',                kind: 'temperature',
    placeholder: '15',
    help: 'The present temperature of the thermistor, at the measured resistance R.' },
};

export default function NtcThermistor() {
  // Plain text values for every field.
  const [values, setValues] = useState({
    beta: '3950', refR: '10k', refT: '25', R: '17.625k', T: '15',
  });
  // Per-temperature unit choice (defaults to °C, which is friendlier than K).
  const [tempUnits, setTempUnits] = useState({ refT: '°C', T: '°C' });
  const [target, setTarget] = useState('T');

  // Parse each field. Temperature fields parse the magnitude and store the
  // SI (kelvin) value alongside the user-typed value.
  const parsed = useMemo(() => {
    const out = {};
    for (const k of TARGETS) {
      const v = VARS[k];
      if (v.kind === 'unitless') out[k] = parseUnitless(values[k]);
      else if (v.kind === 'resistance') out[k] = parseResistance(values[k]);
      else {
        // temperature: parse the number then convert to kelvin via the unit.
        const n = parseNumber(values[k]);
        if (n.error) out[k] = n;
        else out[k] = { value: getTempUnit(tempUnits[k]).toK(n.value), error: null };
      }
    }
    return out;
  }, [values, tempUnits]);

  const allValid = TARGETS.filter((k) => k !== target).every((k) => parsed[k].error === null);

  let computed = { value: NaN, error: null };
  if (allValid) {
    computed = computeNtc(target, {
      beta: parsed.beta.value, refR: parsed.refR.value, refT: parsed.refT.value,
      R: parsed.R.value, T: parsed.T.value,
    });
  }

  const setValue = (key, text) => setValues((prev) => ({ ...prev, [key]: text }));
  const setUnit = (key, unit) => setTempUnits((prev) => ({ ...prev, [key]: unit }));

  // Choose the right formatter for the target output (in the user-selected unit
  // for temperature targets).
  const formatTarget = (key, val) => {
    const v = VARS[key];
    if (v.kind === 'unitless') return formatUnitless(val);
    if (v.kind === 'resistance') return formatResistance(val);
    return formatTempIn(val, tempUnits[key]);
  };

  return (
    <div class="calc-form ntc">
      <div class="calc-form__legend">
        Beta-equation solver for an NTC thermistor (<em>1/T = 1/T<sub>0</sub> + (1/β)·ln(R/R<sub>0</sub>)</em>).
        Pick which one of the five variables to compute; the others are inputs. Temperatures can be
        entered and shown in K, °C or °F via the dropdown next to each row.
      </div>
      <div class="calc-form__rows">
        {TARGETS.map((key) => {
          const v = VARS[key];
          const isTarget = key === target;
          const { error } = parsed[key];
          const isTemp = TEMP_KEYS.has(key);
          return (
            <div class="calc-form__row calc-form__row--radio" key={key}>
              <label class="calc-form__radio">
                <input
                  type="radio"
                  name="ntc-target"
                  checked={isTarget}
                  onChange={() => setTarget(key)}
                />
              </label>
              <span class="calc-form__label">{v.label}</span>
              {isTarget ? (
                <div class="calc-form__input-cell">
                  <div class={isTemp ? 'ntc__value-with-unit' : ''}>
                    <div class="calc-form__output">
                      {computed.error ? (
                        <span class="calc-form__output-error">{computed.error}</span>
                      ) : Number.isFinite(computed.value) ? (
                        <span class="calc-form__output-value">{formatTarget(key, computed.value)}</span>
                      ) : (
                        <span class="calc-form__output-empty">—</span>
                      )}
                    </div>
                    {isTemp && (
                      <select
                        class="ntc__unit-select"
                        value={tempUnits[key]}
                        onChange={(e) => setUnit(key, e.currentTarget.value)}
                      >
                        {TEMP_UNITS.map((u) => (
                          <option key={u.label} value={u.label}>{u.label}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              ) : (
                <div class="calc-form__input-cell">
                  <div class={isTemp ? 'ntc__value-with-unit' : 'calc-form__input-with-suffix'}>
                    <input
                      type="text"
                      value={values[key]}
                      onInput={(e) => setValue(key, e.currentTarget.value)}
                      placeholder={v.placeholder}
                      spellcheck={false}
                      title={v.help}
                      class={error ? 'calc-form__input calc-form__input--error' : 'calc-form__input'}
                    />
                    {isTemp ? (
                      <select
                        class="ntc__unit-select"
                        value={tempUnits[key]}
                        onChange={(e) => setUnit(key, e.currentTarget.value)}
                      >
                        {TEMP_UNITS.map((u) => (
                          <option key={u.label} value={u.label}>{u.label}</option>
                        ))}
                      </select>
                    ) : (
                      v.kind === 'resistance' && <span class="calc-form__suffix">Ω</span>
                    )}
                  </div>
                  {error && <div class="calc-form__input-error">{error}</div>}
                </div>
              )}
              {v.help && <div class="calc-form__help">{v.help}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

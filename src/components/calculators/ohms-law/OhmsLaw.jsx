import { useState, useMemo } from 'preact/hooks';
import {
  parseVoltage,
  parseCurrent,
  parseResistance,
  formatVoltage,
  formatCurrent,
  formatResistance,
  computeUnknown,
} from './calc.js';
import './styles.css';

const VARS = {
  voltage:    { label: 'V', parse: parseVoltage,    format: formatVoltage,    placeholder: '12', suffix: 'V', help: 'The voltage across the resistor.' },
  current:    { label: 'I', parse: parseCurrent,    format: formatCurrent,    placeholder: '1',  suffix: 'A', help: 'The current through the resistor.' },
  resistance: { label: 'R', parse: parseResistance, format: formatResistance, placeholder: '12', suffix: 'Ω', help: 'The resistance of the resistor.' },
};

const ORDER = ['voltage', 'current', 'resistance'];

export default function OhmsLaw() {
  const [values, setValues] = useState({ voltage: '12', current: '1', resistance: '12' });
  const [target, setTarget] = useState('resistance');

  const parsed = useMemo(() => {
    const out = {};
    for (const k of ORDER) out[k] = VARS[k].parse(values[k]);
    return out;
  }, [values]);

  const knownErrors = ORDER.filter((k) => k !== target).map((k) => ({ key: k, error: parsed[k].error }));
  const allKnownValid = knownErrors.every((e) => e.error === null);

  let computed = { value: NaN, error: null };
  if (allKnownValid) {
    const knowns = {
      voltage: parsed.voltage.value,
      current: parsed.current.value,
      resistance: parsed.resistance.value,
    };
    computed = computeUnknown(target, knowns);
  }

  const setValue = (key, text) => setValues((prev) => ({ ...prev, [key]: text }));

  return (
    <div class="calc-form">
      <div class="calc-form__legend">
        Select the parameter you want to compute (the other two are inputs). Solves <em>V = IR</em>.
      </div>
      <div class="calc-form__rows">
        {ORDER.map((key) => {
          const v = VARS[key];
          const isTarget = key === target;
          const { error } = parsed[key];
          return (
            <div class="calc-form__row calc-form__row--radio" key={key}>
              <label class="calc-form__radio">
                <input
                  type="radio"
                  name="ohms-law-target"
                  checked={isTarget}
                  onChange={() => setTarget(key)}
                />
              </label>
              <span class="calc-form__label">{v.label}</span>
              {isTarget ? (
                <div class="calc-form__input-cell">
                  <div class="calc-form__output">
                    {computed.error ? (
                      <span class="calc-form__output-error">{computed.error}</span>
                    ) : Number.isFinite(computed.value) ? (
                      <span class="calc-form__output-value">{v.format(computed.value)}</span>
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
                      placeholder={v.placeholder}
                      spellcheck={false}
                      title={v.help}
                      class={error ? 'calc-form__input calc-form__input--error' : 'calc-form__input'}
                    />
                    {v.suffix && <span class="calc-form__suffix">{v.suffix}</span>}
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

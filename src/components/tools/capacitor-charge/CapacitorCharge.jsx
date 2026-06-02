import { useState, useMemo } from 'preact/hooks';
import {
  parseCharge,
  parseCapacitance,
  parseVoltage,
  formatCharge,
  formatCapacitance,
  formatVoltage,
  computeUnknown,
} from './calc.js';
import './styles.css';

const VARS = {
  charge:      { label: <>Q</>, parse: parseCharge,      format: formatCharge,      placeholder: '5u', suffix: 'C' },
  capacitance: { label: <>C</>, parse: parseCapacitance, format: formatCapacitance, placeholder: '4u', suffix: 'F' },
  voltage:     { label: <>V</>, parse: parseVoltage,     format: formatVoltage,     placeholder: '100', suffix: 'V' },
};

const ORDER = ['charge', 'capacitance', 'voltage'];

export default function CapacitorCharge() {
  const [values, setValues] = useState({ charge: '5u', capacitance: '4u', voltage: '100' });
  const [target, setTarget] = useState('voltage');

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
      charge: parsed.charge.value,
      capacitance: parsed.capacitance.value,
      voltage: parsed.voltage.value,
    };
    computed = computeUnknown(target, knowns);
  }

  const setValue = (key, text) => setValues((prev) => ({ ...prev, [key]: text }));

  return (
    <div class="calc-form">
      <div class="calc-form__legend">
        Select the parameter you want to compute (the other two are inputs). Solves <em>Q = CV</em>.
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
                  name="capacitor-charge-target"
                  checked={isTarget}
                  onChange={() => setTarget(key)}
                />
              </label>
              <span class="calc-form__label">{v.label}</span>
              {isTarget ? (
                <div class="calc-form__output">
                  {computed.error ? (
                    <span class="calc-form__output-error">{computed.error}</span>
                  ) : Number.isFinite(computed.value) ? (
                    <span class="calc-form__output-value">{v.format(computed.value)}</span>
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
                      placeholder={v.placeholder}
                      spellcheck={false}
                      class={error ? 'calc-form__input calc-form__input--error' : 'calc-form__input'}
                    />
                    {v.suffix && <span class="calc-form__suffix">{v.suffix}</span>}
                  </div>
                  {error && <div class="calc-form__input-error">{error}</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

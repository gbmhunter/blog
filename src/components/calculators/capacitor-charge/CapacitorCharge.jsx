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
  charge:      { label: <>Q</>, parse: parseCharge,      format: formatCharge,      placeholder: '5u' },
  capacitance: { label: <>C</>, parse: parseCapacitance, format: formatCapacitance, placeholder: '4u' },
  voltage:     { label: <>V</>, parse: parseVoltage,     format: formatVoltage,     placeholder: '100' },
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
    <div class="capacitor-charge">
      <div class="capacitor-charge__legend">
        Select the parameter you want to compute (the other two are inputs). Solves <em>Q = CV</em>.
      </div>
      <div class="capacitor-charge__rows">
        {ORDER.map((key) => {
          const v = VARS[key];
          const isTarget = key === target;
          const { error } = parsed[key];
          return (
            <div class="capacitor-charge__row" key={key}>
              <label class="capacitor-charge__radio">
                <input
                  type="radio"
                  name="capacitor-charge-target"
                  checked={isTarget}
                  onChange={() => setTarget(key)}
                />
              </label>
              <span class="capacitor-charge__label">{v.label}</span>
              {isTarget ? (
                <div class="capacitor-charge__output">
                  {computed.error ? (
                    <span class="capacitor-charge__output-error">{computed.error}</span>
                  ) : Number.isFinite(computed.value) ? (
                    <span class="capacitor-charge__output-value">{v.format(computed.value)}</span>
                  ) : (
                    <span class="capacitor-charge__output-empty">—</span>
                  )}
                </div>
              ) : (
                <div class="capacitor-charge__input-cell">
                  <input
                    type="text"
                    value={values[key]}
                    onInput={(e) => setValue(key, e.currentTarget.value)}
                    placeholder={v.placeholder}
                    spellcheck={false}
                    class={error ? 'capacitor-charge__input capacitor-charge__input--error' : 'capacitor-charge__input'}
                  />
                  {error && <div class="capacitor-charge__input-error">{error}</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

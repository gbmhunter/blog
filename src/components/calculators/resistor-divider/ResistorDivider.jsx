import { useState, useMemo } from 'preact/hooks';
import {
  parseVoltage,
  parseResistance,
  formatVoltage,
  formatResistance,
  computeUnknown,
} from './calc.js';
import './styles.css';

// Variable definitions: id, display name (HTML), parser, formatter, hint text.
const VARS = {
  vin:  { id: 'vin',  label: <>V<sub>IN</sub></>,  parse: parseVoltage,    format: formatVoltage,    placeholder: '5',   suffix: 'V' },
  r1:   { id: 'r1',   label: <>R<sub>1</sub></>,   parse: parseResistance, format: formatResistance, placeholder: '10k', suffix: 'Ω' },
  r2:   { id: 'r2',   label: <>R<sub>2</sub></>,   parse: parseResistance, format: formatResistance, placeholder: '10k', suffix: 'Ω' },
  vout: { id: 'vout', label: <>V<sub>OUT</sub></>, parse: parseVoltage,    format: formatVoltage,    placeholder: '2.5', suffix: 'V' },
};

const ORDER = ['vin', 'r1', 'r2', 'vout'];

export default function ResistorDivider() {
  const [values, setValues] = useState({ vin: '5', r1: '10k', r2: '10k', vout: '2.5' });
  const [target, setTarget] = useState('vout');

  // Parse every input (we'll only use the 3 that aren't the target).
  const parsed = useMemo(() => {
    const out = {};
    for (const k of ORDER) out[k] = VARS[k].parse(values[k]);
    return out;
  }, [values]);

  // Validate the 3 known inputs.
  const knownErrors = ORDER.filter((k) => k !== target).map((k) => ({ key: k, error: parsed[k].error }));
  const allKnownValid = knownErrors.every((e) => e.error === null);

  let computed = { value: NaN, error: null };
  if (allKnownValid) {
    const knowns = {
      vin: parsed.vin.value,
      r1: parsed.r1.value,
      r2: parsed.r2.value,
      vout: parsed.vout.value,
    };
    computed = computeUnknown(target, knowns);
  }

  const setValue = (key, text) => setValues((prev) => ({ ...prev, [key]: text }));

  return (
    <div class="resistor-divider">
      <div class="resistor-divider__legend">Select the parameter you want to compute (the other three are inputs).</div>
      <div class="resistor-divider__rows">
        {ORDER.map((key) => {
          const v = VARS[key];
          const isTarget = key === target;
          const { error } = parsed[key];
          return (
            <div class="resistor-divider__row" key={key}>
              <label class="resistor-divider__radio">
                <input
                  type="radio"
                  name="resistor-divider-target"
                  checked={isTarget}
                  onChange={() => setTarget(key)}
                />
              </label>
              <span class="resistor-divider__label">{v.label}</span>
              {isTarget ? (
                <div class="resistor-divider__output">
                  {computed.error ? (
                    <span class="resistor-divider__output-error">{computed.error}</span>
                  ) : Number.isFinite(computed.value) ? (
                    <span class="resistor-divider__output-value">{v.format(computed.value)}</span>
                  ) : (
                    <span class="resistor-divider__output-empty">—</span>
                  )}
                </div>
              ) : (
                <div class="resistor-divider__input-cell">
                  <div class="resistor-divider__input-with-suffix">
                    <input
                      type="text"
                      value={values[key]}
                      onInput={(e) => setValue(key, e.currentTarget.value)}
                      placeholder={v.placeholder}
                      spellcheck={false}
                      class={error ? 'resistor-divider__input resistor-divider__input--error' : 'resistor-divider__input'}
                    />
                    {v.suffix && <span class="resistor-divider__suffix">{v.suffix}</span>}
                  </div>
                  {error && <div class="resistor-divider__input-error">{error}</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

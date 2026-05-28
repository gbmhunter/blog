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

  // Cross-field check: a passive resistor divider can't step up, so V_OUT must
  // be less than V_IN. Only enforce this when BOTH V_IN and V_OUT are inputs
  // (i.e. you're solving for R1 or R2). When solving for V_IN or V_OUT, the
  // calculation handles consistency itself.
  const voutCrossError =
    target !== 'vin' && target !== 'vout'
      && parsed.vin.error === null && parsed.vout.error === null
      && parsed.vout.value >= parsed.vin.value
        ? 'V_OUT must be less than V_IN — a passive resistor divider can\'t step up.'
        : null;

  // Effective per-field error: parse error first, cross-field error second.
  const effectiveErrors = {
    vin: parsed.vin.error,
    r1: parsed.r1.error,
    r2: parsed.r2.error,
    vout: parsed.vout.error || voutCrossError,
  };

  // Validate the 3 known inputs (using the effective error, which includes the
  // cross-field check above).
  const allKnownValid = ORDER.filter((k) => k !== target).every((k) => effectiveErrors[k] === null);

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
    <div class="calc-form">
      <div class="calc-form__legend">Select the parameter you want to compute (the other three are inputs).</div>
      <div class="calc-form__rows">
        {ORDER.map((key) => {
          const v = VARS[key];
          const isTarget = key === target;
          const error = effectiveErrors[key];
          return (
            <div class="calc-form__row calc-form__row--radio" key={key}>
              <label class="calc-form__radio">
                <input
                  type="radio"
                  name="resistor-divider-target"
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

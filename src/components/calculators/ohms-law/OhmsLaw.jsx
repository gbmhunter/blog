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
  voltage:    { label: 'V', parse: parseVoltage,    format: formatVoltage,    placeholder: '12', suffix: 'V' },
  current:    { label: 'I', parse: parseCurrent,    format: formatCurrent,    placeholder: '1',  suffix: 'A' },
  resistance: { label: 'R', parse: parseResistance, format: formatResistance, placeholder: '12', suffix: 'Ω' },
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
    <div class="ohms-law">
      <div class="ohms-law__legend">
        Select the parameter you want to compute (the other two are inputs). Solves <em>V = IR</em>.
      </div>
      <div class="ohms-law__rows">
        {ORDER.map((key) => {
          const v = VARS[key];
          const isTarget = key === target;
          const { error } = parsed[key];
          return (
            <div class="ohms-law__row" key={key}>
              <label class="ohms-law__radio">
                <input
                  type="radio"
                  name="ohms-law-target"
                  checked={isTarget}
                  onChange={() => setTarget(key)}
                />
              </label>
              <span class="ohms-law__label">{v.label}</span>
              {isTarget ? (
                <div class="ohms-law__output">
                  {computed.error ? (
                    <span class="ohms-law__output-error">{computed.error}</span>
                  ) : Number.isFinite(computed.value) ? (
                    <span class="ohms-law__output-value">{v.format(computed.value)}</span>
                  ) : (
                    <span class="ohms-law__output-empty">—</span>
                  )}
                </div>
              ) : (
                <div class="ohms-law__input-cell">
                  <div class="ohms-law__input-with-suffix">
                    <input
                      type="text"
                      value={values[key]}
                      onInput={(e) => setValue(key, e.currentTarget.value)}
                      placeholder={v.placeholder}
                      spellcheck={false}
                      class={error ? 'ohms-law__input ohms-law__input--error' : 'ohms-law__input'}
                    />
                    {v.suffix && <span class="ohms-law__suffix">{v.suffix}</span>}
                  </div>
                  {error && <div class="ohms-law__input-error">{error}</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

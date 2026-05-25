import { useState, useMemo } from 'preact/hooks';
import {
  parseUnitless, parseResistance, parseTempK,
  formatUnitless, formatResistance, formatTempK,
  computeNtc,
} from './calc.js';
import './styles.css';

const TARGETS = ['beta', 'refR', 'refT', 'R', 'T'];

const VARS = {
  beta: { label: 'β',                  parse: parseUnitless,   format: formatUnitless,    suffix: '',  placeholder: '3950' },
  refR: { label: <>R<sub>0</sub></>,   parse: parseResistance, format: formatResistance,  suffix: 'Ω', placeholder: '10k' },
  refT: { label: <>T<sub>0</sub></>,   parse: parseTempK,      format: formatTempK,       suffix: 'K', placeholder: '298.15' },
  R:    { label: 'R',                  parse: parseResistance, format: formatResistance,  suffix: 'Ω', placeholder: '17.625k' },
  T:    { label: 'T',                  parse: parseTempK,      format: formatTempK,       suffix: 'K', placeholder: '288.15' },
};

export default function NtcThermistor() {
  const [values, setValues] = useState({
    beta: '3950', refR: '10k', refT: '298.15', R: '17.625k', T: '288.15',
  });
  const [target, setTarget] = useState('T');

  const parsed = useMemo(() => {
    const out = {};
    for (const k of TARGETS) out[k] = VARS[k].parse(values[k]);
    return out;
  }, [values]);

  const allValid = TARGETS.filter((k) => k !== target).every((k) => parsed[k].error === null);

  let computed = { value: NaN, error: null };
  if (allValid) {
    computed = computeNtc(target, {
      beta: parsed.beta.value, refR: parsed.refR.value, refT: parsed.refT.value,
      R: parsed.R.value, T: parsed.T.value,
    });
  }

  const setValue = (key, text) => setValues((prev) => ({ ...prev, [key]: text }));

  return (
    <div class="calc-form ntc">
      <div class="calc-form__legend">
        Beta-equation solver for an NTC thermistor (<em>1/T = 1/T<sub>0</sub> + (1/β)·ln(R/R<sub>0</sub>)</em>).
        Pick which one of the five variables to compute; the others are inputs. Temperatures are in
        kelvin — the output also shows the equivalent °C.
      </div>
      <div class="calc-form__rows">
        {TARGETS.map((key) => {
          const v = VARS[key];
          const isTarget = key === target;
          const { error } = parsed[key];
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

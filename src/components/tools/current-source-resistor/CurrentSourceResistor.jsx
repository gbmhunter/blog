import { useState, useMemo } from 'preact/hooks';
import {
  parseCurrent,
  parseVoltage,
  parseK,
  formatVoltage,
  formatResistance,
  computeRs,
  PRESETS,
} from './calc.js';
import './styles.css';

export default function CurrentSourceResistor() {
  const [iDssText, setIDssText] = useState('150m');
  const [vgsOffMinText, setVgsOffMinText] = useState('-1.5');
  const [vgsOffMaxText, setVgsOffMaxText] = useState('-3.5');
  const [iDText, setIDText] = useState('10m');
  const [kText, setKText] = useState('2');

  const iDss = useMemo(() => parseCurrent(iDssText), [iDssText]);
  const vgsOffMin = useMemo(() => parseVoltage(vgsOffMinText), [vgsOffMinText]);
  const vgsOffMax = useMemo(() => parseVoltage(vgsOffMaxText), [vgsOffMaxText]);
  const iD = useMemo(() => parseCurrent(iDText), [iDText]);
  const k = useMemo(() => parseK(kText), [kText]);

  const applyPreset = (p) => {
    setIDssText(p.iDss);
    setVgsOffMinText(p.vgsOffMin);
    setVgsOffMaxText(p.vgsOffMax);
    setKText(p.k);
  };

  const inputsValid =
    iDss.error === null &&
    vgsOffMin.error === null &&
    vgsOffMax.error === null &&
    iD.error === null &&
    k.error === null;

  // Cross-field check: I_D must be below I_DSS. Surface it on the I_D row.
  const iDCrossError =
    iDss.error === null && iD.error === null && iD.value >= iDss.value
      ? 'Must be less than I_DSS — a self-biased source can only regulate below I_DSS.'
      : null;

  const results = useMemo(() => {
    if (!inputsValid || iDCrossError) return null;
    const a = computeRs({ iDss: iDss.value, vgsOff: vgsOffMin.value, iD: iD.value, k: k.value });
    const b = computeRs({ iDss: iDss.value, vgsOff: vgsOffMax.value, iD: iD.value, k: k.value });
    if (a.error || b.error) return { error: a.error || b.error };
    // Order by R_S so "low"/"high" read correctly regardless of which endpoint
    // the user typed where.
    const [low, high] = a.rs <= b.rs ? [a, b] : [b, a];
    const isRange = Math.abs(high.rs - low.rs) > 1e-9;
    return { low, high, isRange, error: null };
  }, [inputsValid, iDCrossError, iDss, vgsOffMin, vgsOffMax, iD, k]);

  const renderRange = (fmt, lo, hi, isRange) =>
    isRange ? `${fmt(lo)} to ${fmt(hi)}` : fmt(lo);

  return (
    <div class="calc-form current-source-resistor">
      <div class="calc-form__legend">
        Sizes the source resistor <code>R_S</code> for a JFET or depletion-mode MOSFET wired as a
        two-terminal constant-current source. Because the cutoff voltage <code>V_GS(off)</code> is
        specified as a datasheet range, the result is a range of <code>R_S</code>. One solution is to pick a fixed
        value near the low end and trim up with a series potentiometer.
      </div>

      <div class="calc-form__toolbar current-source-resistor__presets">
        <span class="current-source-resistor__presets-label">Presets:</span>
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            class="calc-form__toggle"
            onClick={() => applyPreset(p)}
            title={`Load datasheet values for the ${p.label} (${p.sub})`}
          >
            {p.label} <span class="current-source-resistor__preset-sub">({p.sub})</span>
          </button>
        ))}
      </div>

      <div class="calc-form__rows">
        {/* I_DSS */}
        <div class="calc-form__row">
          <span class="calc-form__label">I<sub>DSS</sub></span>
          <div class="calc-form__input-cell">
            <div class="calc-form__input-with-suffix">
              <input
                type="text"
                value={iDssText}
                onInput={(e) => setIDssText(e.currentTarget.value)}
                placeholder="150m"
                spellcheck={false}
                class={iDss.error ? 'calc-form__input calc-form__input--error' : 'calc-form__input'}
              />
              <span class="calc-form__suffix">A</span>
            </div>
            {iDss.error && <div class="calc-form__input-error">{iDss.error}</div>}
          </div>
          <div class="calc-form__help">Zero-gate-voltage drain current (drain current at V<sub>GS</sub> = 0), from the datasheet.</div>
        </div>

        {/* V_GS(off) min */}
        <div class="calc-form__row">
          <span class="calc-form__label">V<sub>GS(off)</sub> min</span>
          <div class="calc-form__input-cell">
            <div class="calc-form__input-with-suffix">
              <input
                type="text"
                value={vgsOffMinText}
                onInput={(e) => setVgsOffMinText(e.currentTarget.value)}
                placeholder="-1.5"
                spellcheck={false}
                class={vgsOffMin.error ? 'calc-form__input calc-form__input--error' : 'calc-form__input'}
              />
              <span class="calc-form__suffix">V</span>
            </div>
            {vgsOffMin.error && <div class="calc-form__input-error">{vgsOffMin.error}</div>}
          </div>
          <div class="calc-form__help">Gate-source cutoff (pinch-off) voltage, minimum-magnitude end of the datasheet range. Negative for n-channel.</div>
        </div>

        {/* V_GS(off) max */}
        <div class="calc-form__row">
          <span class="calc-form__label">V<sub>GS(off)</sub> max</span>
          <div class="calc-form__input-cell">
            <div class="calc-form__input-with-suffix">
              <input
                type="text"
                value={vgsOffMaxText}
                onInput={(e) => setVgsOffMaxText(e.currentTarget.value)}
                placeholder="-3.5"
                spellcheck={false}
                class={vgsOffMax.error ? 'calc-form__input calc-form__input--error' : 'calc-form__input'}
              />
              <span class="calc-form__suffix">V</span>
            </div>
            {vgsOffMax.error && <div class="calc-form__input-error">{vgsOffMax.error}</div>}
          </div>
          <div class="calc-form__help">Maximum-magnitude end of the cutoff-voltage range. Set both min and max equal for a single-value calculation.</div>
        </div>

        {/* I_D */}
        <div class="calc-form__row">
          <span class="calc-form__label">I<sub>D</sub></span>
          <div class="calc-form__input-cell">
            <div class="calc-form__input-with-suffix">
              <input
                type="text"
                value={iDText}
                onInput={(e) => setIDText(e.currentTarget.value)}
                placeholder="10m"
                spellcheck={false}
                class={(iD.error || iDCrossError) ? 'calc-form__input calc-form__input--error' : 'calc-form__input'}
              />
              <span class="calc-form__suffix">A</span>
            </div>
            {(iD.error || iDCrossError) && (
              <div class="calc-form__input-error">{iD.error || iDCrossError}</div>
            )}
          </div>
          <div class="calc-form__help">The constant current you want the source to drive.</div>
        </div>

        {/* k */}
        <div class="calc-form__row">
          <span class="calc-form__label">k</span>
          <div class="calc-form__input-cell">
            <input
              type="text"
              value={kText}
              onInput={(e) => setKText(e.currentTarget.value)}
              placeholder="2"
              spellcheck={false}
              class={k.error ? 'calc-form__input calc-form__input--error' : 'calc-form__input'}
            />
            {k.error && <div class="calc-form__input-error">{k.error}</div>}
          </div>
          <div class="calc-form__help">Conduction (square-law) exponent. Almost always 2 — leave as-is unless the datasheet says otherwise.</div>
        </div>

        {/* V_GS output */}
        <div class="calc-form__row">
          <span class="calc-form__label">V<sub>GS</sub></span>
          <div class="calc-form__input-cell">
            <div class="calc-form__output">
              {results?.error ? (
                <span class="calc-form__output-error">{results.error}</span>
              ) : results ? (
                <span class="calc-form__output-value">
                  {renderRange(formatVoltage, results.low.vgs, results.high.vgs, results.isRange)}
                </span>
              ) : (
                <span class="calc-form__output-empty">—</span>
              )}
            </div>
          </div>
          <div class="calc-form__help">Required gate-source voltage at the operating point (V<sub>GS</sub> = V<sub>GS(off)</sub> [1 − (I<sub>D</sub>/I<sub>DSS</sub>)<sup>1/k</sup>]).</div>
        </div>

        {/* R_S output */}
        <div class="calc-form__row">
          <span class="calc-form__label">R<sub>S</sub></span>
          <div class="calc-form__input-cell">
            <div class="calc-form__output">
              {results?.error ? (
                <span class="calc-form__output-error">{results.error}</span>
              ) : results ? (
                <span class="calc-form__output-value">
                  {renderRange(formatResistance, results.low.rs, results.high.rs, results.isRange)}
                </span>
              ) : (
                <span class="calc-form__output-empty">—</span>
              )}
            </div>
          </div>
          <div class="calc-form__help">Source resistor: R<sub>S</sub> = |V<sub>GS</sub>| / I<sub>D</sub>.</div>
        </div>
      </div>

      {results && !results.error && results.isRange && (
        <div class="calc-form__note">
          The spread comes from the V<sub>GS(off)</sub> range. To get better accuracy, use a fixed
          resistor near <strong>{formatResistance(results.low.rs)}</strong> in series with a
          trimmer of at least <strong>{formatResistance(results.high.rs - results.low.rs)}</strong>,
          then adjust it to hit the target current with an ammeter.
        </div>
      )}
    </div>
  );
}

import { useState, useMemo } from 'preact/hooks';
import {
  MATERIAL_RESISTIVITIES_OHM_M,
  MATERIAL_OPTIONS,
  parseVoltage,
  parseCurrent,
  parseLength,
  parsePercent,
  parseResistivity,
  formatResistivity,
  formatAreaMm2,
  formatAwg,
  computeWireGauge,
} from './calc.js';
import { InputRow } from '../_shared/FormRows.jsx';
import './styles.css';

export default function WireGauge() {
  const [voltageText, setVoltageText] = useState('12V');
  const [dropText, setDropText] = useState('2');
  const [lengthText, setLengthText] = useState('5');
  const [currentText, setCurrentText] = useState('10A');
  const [material, setMaterial] = useState('Copper');
  const [customResistivityText, setCustomResistivityText] = useState('1.68e-8');

  const voltage = useMemo(() => parseVoltage(voltageText), [voltageText]);
  const drop = useMemo(() => parsePercent(dropText), [dropText]);
  const length = useMemo(() => parseLength(lengthText), [lengthText]);
  const current = useMemo(() => parseCurrent(currentText), [currentText]);
  const customResistivity = useMemo(() => parseResistivity(customResistivityText), [customResistivityText]);

  const isCustom = material === 'Custom';
  const resistivity = isCustom ? customResistivity.value : MATERIAL_RESISTIVITIES_OHM_M[material];
  const resistivityError = isCustom ? customResistivity.error : null;

  const allValid =
    voltage.error === null &&
    drop.error === null &&
    length.error === null &&
    current.error === null &&
    resistivityError === null &&
    Number.isFinite(resistivity);

  let computed = { crossSectionalAreaM2: NaN, awg: NaN, error: null };
  if (allValid) {
    computed = computeWireGauge({
      sourceVoltage: voltage.value,
      voltageDropPercent: drop.value,
      cableLength: length.value,
      current: current.value,
      resistivity,
    });
  }

  return (
    <div class="calc-form">
      <div class="calc-form__legend">
        Find the minimum AWG gauge wire needed to carry a given DC current with no more than the
        specified voltage drop across the cable length. DC only — does not consider skin effect or
        thermal effects.
      </div>

      <div class="calc-form__rows">
        <InputRow
          label={<>V<sub>source</sub></>}
          help="Source voltage applied to the cable."
          value={voltageText}
          onInput={setVoltageText}
          placeholder="12"
          suffix="V"
          parsed={voltage}
        />
        <InputRow
          label="Drop"
          help="Maximum acceptable voltage drop across the cable, as a percentage of the source voltage."
          value={dropText}
          onInput={setDropText}
          placeholder="2"
          suffix="%"
          parsed={drop}
        />
        <InputRow
          label="L"
          help="Length of the cable."
          value={lengthText}
          onInput={setLengthText}
          placeholder="5"
          suffix="m"
          parsed={length}
        />
        <InputRow
          label="I"
          help="Current the wire must carry."
          value={currentText}
          onInput={setCurrentText}
          placeholder="10"
          suffix="A"
          parsed={current}
        />

        {/* Conductor material */}
        <div class="calc-form__row">
          <span class="calc-form__label">Material</span>
          <div class="calc-form__input-cell">
            <select
              class="calc-form__select"
              value={material}
              onChange={(e) => setMaterial(e.currentTarget.value)}
            >
              {MATERIAL_OPTIONS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div class="calc-form__help">The material of the conductor.</div>
        </div>

        {/* Resistivity: input when Custom, read-only output otherwise */}
        <div class="calc-form__row">
          <span class="calc-form__label">ρ</span>
          {isCustom ? (
            <div class="calc-form__input-cell">
              <div class="calc-form__input-with-suffix">
                <input
                  type="text"
                  value={customResistivityText}
                  onInput={(e) => setCustomResistivityText(e.currentTarget.value)}
                  placeholder="1.68e-8"
                  spellcheck={false}
                  title='The resistivity of the conductor. Set the material to "Custom" to edit this value.'
                  class={customResistivity.error
                    ? 'calc-form__input calc-form__input--error'
                    : 'calc-form__input'}
                />
                <span class="calc-form__suffix">Ω·m</span>
              </div>
              {customResistivity.error && (
                <div class="calc-form__input-error">{customResistivity.error}</div>
              )}
            </div>
          ) : (
            <div class="calc-form__input-cell">
              <div class="calc-form__readonly">
                <span class="calc-form__readonly-value">{formatResistivity(resistivity)}</span>
              </div>
            </div>
          )}
          <div class="calc-form__help">
            {isCustom
              ? 'The resistivity of the conductor. Set the material to "Custom" to edit this value.'
              : 'The resistivity of the selected conductor material. Set the material to "Custom" to edit this value.'}
          </div>
        </div>

        {/* Outputs */}
        <div class="calc-form__row">
          <span class="calc-form__label">A</span>
          <div class="calc-form__input-cell">
            <div class="calc-form__output">
              {computed.error ? (
                <span class="calc-form__output-error">{computed.error}</span>
              ) : Number.isFinite(computed.crossSectionalAreaM2) ? (
                <span class="calc-form__output-value">{formatAreaMm2(computed.crossSectionalAreaM2)}</span>
              ) : (
                <span class="calc-form__output-empty">—</span>
              )}
            </div>
          </div>
          <div class="calc-form__help">The required cross-sectional area of the conductor in the cable.</div>
        </div>
        <div class="calc-form__row">
          <span class="calc-form__label">Gauge</span>
          <div class="calc-form__input-cell">
            <div class="calc-form__output">
              {computed.error ? (
                <span class="calc-form__output-error">{computed.error}</span>
              ) : Number.isFinite(computed.awg) ? (
                <span class="calc-form__output-value">{formatAwg(computed.awg)}</span>
              ) : (
                <span class="calc-form__output-empty">—</span>
              )}
            </div>
          </div>
          <div class="calc-form__help">The maximum AWG gauge of the cable. The calculated value is rounded down to the nearest integer (lower AWG = thicker wire = more safety margin).</div>
        </div>
      </div>
    </div>
  );
}


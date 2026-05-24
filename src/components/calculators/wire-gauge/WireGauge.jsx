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
    <div class="wire-gauge">
      <div class="wire-gauge__legend">
        Find the minimum AWG gauge wire needed to carry a given DC current with no more than the
        specified voltage drop across the cable length. DC only — does not consider skin effect or
        thermal effects.
      </div>

      <div class="wire-gauge__rows">
        <InputRow
          label={<>V<sub>source</sub></>}
          help="Source voltage applied to the cable."
          value={voltageText}
          onInput={setVoltageText}
          placeholder="12V"
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
          placeholder="10A"
          parsed={current}
        />

        {/* Conductor material */}
        <div class="wire-gauge__row">
          <span class="wire-gauge__label">Material</span>
          <div class="wire-gauge__input-cell">
            <select
              class="wire-gauge__select"
              value={material}
              onChange={(e) => setMaterial(e.currentTarget.value)}
            >
              {MATERIAL_OPTIONS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Resistivity: input when Custom, read-only output otherwise */}
        <div class="wire-gauge__row">
          <span class="wire-gauge__label">ρ</span>
          {isCustom ? (
            <div class="wire-gauge__input-cell">
              <input
                type="text"
                value={customResistivityText}
                onInput={(e) => setCustomResistivityText(e.currentTarget.value)}
                placeholder="1.68e-8"
                spellcheck={false}
                class={customResistivity.error
                  ? 'wire-gauge__input wire-gauge__input--error'
                  : 'wire-gauge__input'}
              />
              {customResistivity.error && (
                <div class="wire-gauge__input-error">{customResistivity.error}</div>
              )}
            </div>
          ) : (
            <div class="wire-gauge__readonly">
              <span class="wire-gauge__readonly-value">{formatResistivity(resistivity)}</span>
            </div>
          )}
        </div>

        {/* Outputs */}
        <div class="wire-gauge__row">
          <span class="wire-gauge__label">A</span>
          <div class="wire-gauge__output">
            {computed.error ? (
              <span class="wire-gauge__output-error">{computed.error}</span>
            ) : Number.isFinite(computed.crossSectionalAreaM2) ? (
              <span class="wire-gauge__output-value">{formatAreaMm2(computed.crossSectionalAreaM2)}</span>
            ) : (
              <span class="wire-gauge__output-empty">—</span>
            )}
          </div>
        </div>
        <div class="wire-gauge__row">
          <span class="wire-gauge__label">Gauge</span>
          <div class="wire-gauge__output">
            {computed.error ? (
              <span class="wire-gauge__output-error">{computed.error}</span>
            ) : Number.isFinite(computed.awg) ? (
              <span class="wire-gauge__output-value">{formatAwg(computed.awg)}</span>
            ) : (
              <span class="wire-gauge__output-empty">—</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InputRow({ label, help, value, onInput, placeholder, suffix, parsed }) {
  return (
    <div class="wire-gauge__row">
      <span class="wire-gauge__label">{label}</span>
      <div class="wire-gauge__input-cell">
        <div class="wire-gauge__input-with-suffix">
          <input
            type="text"
            value={value}
            onInput={(e) => onInput(e.currentTarget.value)}
            placeholder={placeholder}
            spellcheck={false}
            title={help}
            class={parsed.error
              ? 'wire-gauge__input wire-gauge__input--error'
              : 'wire-gauge__input'}
          />
          {suffix && <span class="wire-gauge__suffix">{suffix}</span>}
        </div>
        {parsed.error && <div class="wire-gauge__input-error">{parsed.error}</div>}
      </div>
    </div>
  );
}

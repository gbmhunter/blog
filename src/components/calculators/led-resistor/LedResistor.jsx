import { useState, useMemo } from 'preact/hooks';
import {
  LED_FORWARD_VOLTAGES,
  COLOUR_OPTIONS,
  parseVoltage,
  parseCurrent,
  formatVoltage,
  formatResistance,
  formatPower,
  computeResistor,
} from './calc.js';
import './styles.css';

export default function LedResistor() {
  const [supplyVoltageText, setSupplyVoltageText] = useState('3.3');
  const [colour, setColour] = useState('Red');
  const [customVfText, setCustomVfText] = useState('2.0');
  const [ledCurrentText, setLedCurrentText] = useState('20m');

  const supplyParsed = useMemo(() => parseVoltage(supplyVoltageText), [supplyVoltageText]);
  const customVfParsed = useMemo(() => parseVoltage(customVfText), [customVfText]);
  const ledCurrentParsed = useMemo(() => parseCurrent(ledCurrentText), [ledCurrentText]);

  const isCustom = colour === 'Custom';
  // When a colour is selected, forward voltage is fixed from the table (read-only output).
  const forwardVoltage = isCustom ? customVfParsed.value : LED_FORWARD_VOLTAGES[colour];
  const forwardVoltageError = isCustom ? customVfParsed.error : null;

  const allInputsValid =
    supplyParsed.error === null &&
    forwardVoltageError === null &&
    ledCurrentParsed.error === null &&
    Number.isFinite(forwardVoltage);

  let computed = { resistance: NaN, power: NaN, error: null };
  if (allInputsValid) {
    computed = computeResistor({
      supplyVoltage: supplyParsed.value,
      forwardVoltage,
      ledCurrent: ledCurrentParsed.value,
    });
  }

  return (
    <div class="led-resistor">
      <div class="led-resistor__legend">
        Enter the supply voltage, LED colour (or a custom forward voltage), and desired drive current to
        get the required series resistance and the power it will dissipate.
      </div>

      <div class="led-resistor__rows">
        {/* Supply voltage */}
        <div class="led-resistor__row">
          <span class="led-resistor__label">V<sub>CC</sub></span>
          <div class="led-resistor__input-cell">
            <div class="led-resistor__input-with-suffix">
              <input
                type="text"
                value={supplyVoltageText}
                onInput={(e) => setSupplyVoltageText(e.currentTarget.value)}
                placeholder="3.3"
                spellcheck={false}
                class={supplyParsed.error
                  ? 'led-resistor__input led-resistor__input--error'
                  : 'led-resistor__input'}
              />
              <span class="led-resistor__suffix">V</span>
            </div>
            {supplyParsed.error && <div class="led-resistor__input-error">{supplyParsed.error}</div>}
          </div>
        </div>

        {/* LED colour */}
        <div class="led-resistor__row">
          <span class="led-resistor__label">Colour</span>
          <div class="led-resistor__input-cell">
            <select
              class="led-resistor__select"
              value={colour}
              onChange={(e) => setColour(e.currentTarget.value)}
            >
              {COLOUR_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Forward voltage (read-only when colour selected, editable when Custom) */}
        <div class="led-resistor__row">
          <span class="led-resistor__label">V<sub>F</sub></span>
          {isCustom ? (
            <div class="led-resistor__input-cell">
              <div class="led-resistor__input-with-suffix">
                <input
                  type="text"
                  value={customVfText}
                  onInput={(e) => setCustomVfText(e.currentTarget.value)}
                  placeholder="2.0"
                  spellcheck={false}
                  class={customVfParsed.error
                    ? 'led-resistor__input led-resistor__input--error'
                    : 'led-resistor__input'}
                />
                <span class="led-resistor__suffix">V</span>
              </div>
              {customVfParsed.error && (
                <div class="led-resistor__input-error">{customVfParsed.error}</div>
              )}
            </div>
          ) : (
            <div class="led-resistor__readonly">
              <span class="led-resistor__readonly-value">{formatVoltage(forwardVoltage)}</span>
            </div>
          )}
        </div>

        {/* LED current */}
        <div class="led-resistor__row">
          <span class="led-resistor__label">I<sub>LED</sub></span>
          <div class="led-resistor__input-cell">
            <div class="led-resistor__input-with-suffix">
              <input
                type="text"
                value={ledCurrentText}
                onInput={(e) => setLedCurrentText(e.currentTarget.value)}
                placeholder="20m"
                spellcheck={false}
                class={ledCurrentParsed.error
                  ? 'led-resistor__input led-resistor__input--error'
                  : 'led-resistor__input'}
              />
              <span class="led-resistor__suffix">A</span>
            </div>
            {ledCurrentParsed.error && (
              <div class="led-resistor__input-error">{ledCurrentParsed.error}</div>
            )}
          </div>
        </div>

        {/* Series resistance (output) */}
        <div class="led-resistor__row">
          <span class="led-resistor__label">R</span>
          <div class="led-resistor__output">
            {computed.error ? (
              <span class="led-resistor__output-error">{computed.error}</span>
            ) : Number.isFinite(computed.resistance) ? (
              <span class="led-resistor__output-value">{formatResistance(computed.resistance)}</span>
            ) : (
              <span class="led-resistor__output-empty">—</span>
            )}
          </div>
        </div>

        {/* Resistor power dissipation (output) */}
        <div class="led-resistor__row">
          <span class="led-resistor__label">P<sub>R</sub></span>
          <div class="led-resistor__output">
            {computed.error ? (
              <span class="led-resistor__output-error">{computed.error}</span>
            ) : Number.isFinite(computed.power) ? (
              <span class="led-resistor__output-value">{formatPower(computed.power)}</span>
            ) : (
              <span class="led-resistor__output-empty">—</span>
            )}
          </div>
        </div>
      </div>

      <div class="led-resistor__note">
        Make sure the chosen resistor is rated for at least <strong>{
          Number.isFinite(computed.power) ? formatPower(computed.power) : '—'
        }</strong> of continuous power dissipation.
      </div>
    </div>
  );
}

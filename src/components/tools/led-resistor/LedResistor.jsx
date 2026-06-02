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
  const forwardVoltageParseError = isCustom ? customVfParsed.error : null;

  // Cross-field check: V_F must be less than the supply voltage, otherwise the
  // LED can't be driven (the series resistance would be ≤ 0). Surface this on
  // the V_F row.
  const vfCrossError = supplyParsed.error === null
    && forwardVoltageParseError === null
    && Number.isFinite(forwardVoltage)
    && forwardVoltage >= supplyParsed.value
    ? 'V_F must be less than the supply voltage — the LED can\'t be driven from this supply.'
    : null;

  // Merge the cross-field error into the custom V_F parsed state so the input
  // gets the red border and inline message via its existing error handling.
  const customVfMerged = customVfParsed.error
    ? customVfParsed
    : vfCrossError
      ? { value: customVfParsed.value, error: vfCrossError }
      : customVfParsed;

  const allInputsValid =
    supplyParsed.error === null &&
    forwardVoltageParseError === null &&
    vfCrossError === null &&
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
    <div class="calc-form">
      <div class="calc-form__legend">
        Enter the supply voltage, LED colour (or a custom forward voltage), and desired drive current to
        get the required series resistance and the power it will dissipate.
      </div>

      <div class="calc-form__rows">
        {/* Supply voltage */}
        <div class="calc-form__row">
          <span class="calc-form__label">V<sub>CC</sub></span>
          <div class="calc-form__input-cell">
            <div class="calc-form__input-with-suffix">
              <input
                type="text"
                value={supplyVoltageText}
                onInput={(e) => setSupplyVoltageText(e.currentTarget.value)}
                placeholder="3.3"
                spellcheck={false}
                title="The supply voltage driving the LED. Often a battery, power supply rail or microcontroller pin."
                class={supplyParsed.error
                  ? 'calc-form__input calc-form__input--error'
                  : 'calc-form__input'}
              />
              <span class="calc-form__suffix">V</span>
            </div>
            {supplyParsed.error && <div class="calc-form__input-error">{supplyParsed.error}</div>}
          </div>
          <div class="calc-form__help">The supply voltage driving the LED. Often a battery, power supply rail or microcontroller pin.</div>
        </div>

        {/* LED colour */}
        <div class="calc-form__row">
          <span class="calc-form__label">Colour</span>
          <div class="calc-form__input-cell">
            <select
              class="calc-form__select"
              value={colour}
              onChange={(e) => setColour(e.currentTarget.value)}
            >
              {COLOUR_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div class="calc-form__help">The colour of the LED. Sets the forward voltage drop. These are approximate, and don't account for the slight V_F change with drive current. Pick "Custom" to enter your own V_F.</div>
        </div>

        {/* Forward voltage (read-only when colour selected, editable when Custom) */}
        <div class="calc-form__row">
          <span class="calc-form__label">V<sub>F</sub></span>
          {isCustom ? (
            <div class="calc-form__input-cell">
              <div class="calc-form__input-with-suffix">
                <input
                  type="text"
                  value={customVfText}
                  onInput={(e) => setCustomVfText(e.currentTarget.value)}
                  placeholder="2.0"
                  spellcheck={false}
                  title="The forward voltage drop across the LED, at the desired drive current."
                  class={customVfMerged.error
                    ? 'calc-form__input calc-form__input--error'
                    : 'calc-form__input'}
                />
                <span class="calc-form__suffix">V</span>
              </div>
              {customVfMerged.error && (
                <div class="calc-form__input-error">{customVfMerged.error}</div>
              )}
            </div>
          ) : (
            <div class="calc-form__input-cell">
              <div class={vfCrossError ? 'calc-form__readonly calc-form__readonly--error' : 'calc-form__readonly'}>
                <span class="calc-form__readonly-value">{formatVoltage(forwardVoltage)}</span>
              </div>
              {vfCrossError && (
                <div class="calc-form__input-error">{vfCrossError}</div>
              )}
            </div>
          )}
          <div class="calc-form__help">
            {isCustom
              ? 'The forward voltage drop across the LED, at the desired drive current.'
              : 'Typical forward voltage for the selected colour. Pick "Custom" to override.'}
          </div>
        </div>

        {/* LED current */}
        <div class="calc-form__row">
          <span class="calc-form__label">I<sub>LED</sub></span>
          <div class="calc-form__input-cell">
            <div class="calc-form__input-with-suffix">
              <input
                type="text"
                value={ledCurrentText}
                onInput={(e) => setLedCurrentText(e.currentTarget.value)}
                placeholder="20m"
                spellcheck={false}
                title="The desired LED drive current. Typical indicator LEDs run at 5–20 mA."
                class={ledCurrentParsed.error
                  ? 'calc-form__input calc-form__input--error'
                  : 'calc-form__input'}
              />
              <span class="calc-form__suffix">A</span>
            </div>
            {ledCurrentParsed.error && (
              <div class="calc-form__input-error">{ledCurrentParsed.error}</div>
            )}
          </div>
          <div class="calc-form__help">The desired LED drive current. Typical indicator LEDs run at 5–20 mA.</div>
        </div>

        {/* Series resistance (output) */}
        <div class="calc-form__row">
          <span class="calc-form__label">R</span>
          <div class="calc-form__input-cell">
            <div class="calc-form__output">
              {computed.error ? (
                <span class="calc-form__output-error">{computed.error}</span>
              ) : Number.isFinite(computed.resistance) ? (
                <span class="calc-form__output-value">{formatResistance(computed.resistance)}</span>
              ) : (
                <span class="calc-form__output-empty">—</span>
              )}
            </div>
          </div>
          <div class="calc-form__help">The series resistance required to get the desired drive current.</div>
        </div>

        {/* Resistor power dissipation (output) */}
        <div class="calc-form__row">
          <span class="calc-form__label">P<sub>R</sub></span>
          <div class="calc-form__input-cell">
            <div class="calc-form__output">
              {computed.error ? (
                <span class="calc-form__output-error">{computed.error}</span>
              ) : Number.isFinite(computed.power) ? (
                <span class="calc-form__output-value">{formatPower(computed.power)}</span>
              ) : (
                <span class="calc-form__output-empty">—</span>
              )}
            </div>
          </div>
          <div class="calc-form__help">The continuous power the resistor will dissipate. Make sure the part is rated at least this. For 3.3–12 V supplies at 1–20 mA, 0603/0805/1206 SMD parts are usually fine without heatsinking.</div>
        </div>
      </div>

      <div class="calc-form__note">
        Make sure the chosen resistor is rated for at least <strong>{
          Number.isFinite(computed.power) ? formatPower(computed.power) : '—'
        }</strong> of continuous power dissipation.
      </div>
    </div>
  );
}

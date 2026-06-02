import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

// Approximate forward voltages for common LED colours, sourced from the
// table on the LEDs page (matches NinjaCalc's original values).
export const LED_FORWARD_VOLTAGES = {
  Red: 2.0,
  Orange: 2.0,
  Yellow: 2.1,
  Green: 2.2,
  Blue: 3.3,
  Violet: 3.4,
};

export const COLOUR_OPTIONS = [...Object.keys(LED_FORWARD_VOLTAGES), 'Custom'];

export const parseVoltage = (text) =>
  parseValueWithPrefix(text, { units: ['V', 'volts', 'volt'], allowZero: true });

export const parseCurrent = (text) =>
  parseValueWithPrefix(text, { units: ['A', 'amps', 'amp', 'amperes'], allowZero: true });

export const formatVoltage = (v, sigFigs = 4) => formatValueWithPrefix(v, 'V', { sigFigs });
export const formatCurrent = (v, sigFigs = 4) => formatValueWithPrefix(v, 'A', { sigFigs });
export const formatResistance = (v, sigFigs = 4) => formatValueWithPrefix(v, 'Ω', { sigFigs });
export const formatPower = (v, sigFigs = 4) => formatValueWithPrefix(v, 'W', { sigFigs });

// Solve for series resistance and resistor power dissipation:
//   V_R = V_supply - V_F
//   R   = V_R / I_LED
//   P_R = V_R * I_LED
// Returns { resistance, power, error }.
export function computeResistor({ supplyVoltage, forwardVoltage, ledCurrent }) {
  if (forwardVoltage >= supplyVoltage) {
    return {
      resistance: NaN,
      power: NaN,
      error: 'LED forward voltage must be less than the supply voltage.',
    };
  }
  if (ledCurrent <= 0) {
    return {
      resistance: NaN,
      power: NaN,
      error: 'LED current must be greater than zero.',
    };
  }
  const voltageDrop = supplyVoltage - forwardVoltage;
  return {
    resistance: voltageDrop / ledCurrent,
    power: voltageDrop * ledCurrent,
    error: null,
  };
}

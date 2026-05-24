import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

// ln(2) — the natural-log factor that comes out of the 555's RC charge/discharge
// equations. Standard textbooks round to 0.693.
export const LN2 = Math.log(2);

export const parseFrequency = (text) =>
  parseValueWithPrefix(text, { units: ['Hz', 'hertz'] });

export const parseCapacitance = (text) =>
  parseValueWithPrefix(text, { units: ['F', 'farads', 'farad'] });

// Duty cycle as a percentage. The "%" suffix is optional.
export const parseDutyPercent = (text) => {
  const stripped = String(text ?? '').trim().replace(/%$/, '').trim();
  return parseValueWithPrefix(stripped, { units: [] });
};

export const formatFrequency = (v, sigFigs = 4) => formatValueWithPrefix(v, 'Hz', { sigFigs });
export const formatTime = (v, sigFigs = 4) => formatValueWithPrefix(v, 's', { sigFigs });
export const formatResistance = (v, sigFigs = 4) => formatValueWithPrefix(v, 'Ω', { sigFigs });

// Compute the period, on/off times, and the two timing resistors for a 555 in
// astable mode given the desired output frequency, duty cycle and timing
// capacitor.
//
// Uses the standard 555 astable equations (matching the schematic on the
// timers page):
//
//   t_H = ln(2) · (R1 + R2) · C        // capacitor charges through R1 + R2
//   t_L = ln(2) · R2 · C               // capacitor discharges through R2
//   T   = t_H + t_L
//   D   = t_H / T = (R1 + R2) / (R1 + 2·R2)
//
// Note: NinjaCalc's source swapped R1 and R2 — this implementation uses the
// convention shown in the schematic on the blog page (R1 on top, between V_cc
// and the discharge pin; R2 between discharge and threshold).
//
// Duty cycle must be in (50%, 100%) — at 50% R1 = 0 and at 100% R2 = 0.
export function computeAstable({ frequency, dutyPercent, capacitance }) {
  if (frequency <= 0) return errorResult('Frequency must be greater than zero.');
  if (capacitance <= 0) return errorResult('Capacitance must be greater than zero.');
  if (dutyPercent <= 50) {
    return errorResult('Duty cycle must be greater than 50%. (Use an inverter on the output for D < 50%.)');
  }
  if (dutyPercent >= 100) return errorResult('Duty cycle must be less than 100%.');

  const period = 1 / frequency;
  const duty = dutyPercent / 100;
  const timeHigh = duty * period;
  const timeLow = period - timeHigh;

  const r2 = timeLow / (LN2 * capacitance);
  const r1 = timeHigh / (LN2 * capacitance) - r2;

  return { period, timeHigh, timeLow, r1, r2, error: null };
}

function errorResult(error) {
  return {
    period: NaN, timeHigh: NaN, timeLow: NaN, r1: NaN, r2: NaN, error,
  };
}

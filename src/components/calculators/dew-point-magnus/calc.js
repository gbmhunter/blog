import { parseValueWithPrefix } from 'src/js/metric-prefix.js';

export const parseTemp = (t) => parseValueWithPrefix(t, { units: ['°C', 'C', 'degC'], allowNegative: true, allowZero: true });
export const parsePercent = (t) => {
  const s = String(t ?? '').trim().replace(/%$/, '').trim();
  return parseValueWithPrefix(s, { units: [] });
};
export const parseUnitless = (t) => parseValueWithPrefix(t, { units: [] });

export const formatTemp = (v) => Number.isFinite(v) ? `${v.toFixed(3)} °C` : '—';
export const formatPercent = (v) => Number.isFinite(v) ? `${v.toFixed(2)} %` : '—';

// Solve Magnus equation for the requested target.
//   T_dp = c · (ln(RH/100) + b·T/(c+T)) / (b − ln(RH/100) − b·T/(c+T))
// Rearrangements for T_air and RH are derived from the same equation.
export function computeMagnus(target, { airTemp, relativeHumidity, dewPoint, b, c }) {
  if (b <= 0) return errResult('b must be > 0.');
  if (c <= 0) return errResult('c must be > 0.');

  switch (target) {
    case 'dewPoint': {
      if (relativeHumidity <= 0 || relativeHumidity > 100)
        return errResult('Relative humidity must be in (0, 100] %.');
      const ln = Math.log(relativeHumidity / 100);
      const num = c * (ln + (b * airTemp) / (airTemp + c));
      const den = b - ln - (b * airTemp) / (airTemp + c);
      return { value: num / den, error: null };
    }
    case 'airTemp': {
      if (relativeHumidity <= 0 || relativeHumidity > 100)
        return errResult('Relative humidity must be in (0, 100] %.');
      const ln = Math.log(relativeHumidity / 100);
      const num = c * ((b * dewPoint) / (c + dewPoint) - ln);
      const den = b + ln - (b * dewPoint) / (c + dewPoint);
      return { value: num / den, error: null };
    }
    case 'relativeHumidity': {
      const numer = Math.exp((b * dewPoint) / (c + dewPoint));
      const denom = Math.exp((b * airTemp) / (c + airTemp));
      return { value: 100 * (numer / denom), error: null };
    }
    default:
      return errResult(`Unknown target "${target}".`);
  }
}

function errResult(error) { return { value: NaN, error }; }

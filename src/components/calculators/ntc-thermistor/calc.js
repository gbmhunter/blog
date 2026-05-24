import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

export const parseUnitless = (t) => parseValueWithPrefix(t, { units: [] });
export const parseResistance = (t) => parseValueWithPrefix(t, { units: ['Ω', 'ohms', 'ohm'], rNotation: true });
export const parseTempK = (t) => parseValueWithPrefix(t, { units: ['K', 'kelvin'] });

export const formatUnitless = (v) => Number.isFinite(v) ? v.toPrecision(5) : '—';
export const formatResistance = (v) => formatValueWithPrefix(v, 'Ω', { sigFigs: 4 });
export const formatTempK = (v) => Number.isFinite(v) ? `${v.toFixed(3)} K (${(v - 273.15).toFixed(3)} °C)` : '—';

// Beta equation: 1/T = 1/T0 + (1/β)·ln(R/R0)
// Solve for whichever of {beta, refR, refT, R, T} is the target.
export function computeNtc(target, { beta, refR, refT, R, T }) {
  switch (target) {
    case 'beta':
      if (R <= 0 || refR <= 0 || refT <= 0 || T <= 0)
        return errResult('All other variables must be greater than zero.');
      return { value: Math.log(R / refR) / (1 / T - 1 / refT), error: null };
    case 'refR':
      if (R <= 0 || beta <= 0 || refT <= 0 || T <= 0)
        return errResult('All other variables must be greater than zero.');
      return { value: R / Math.exp(beta * (1 / T - 1 / refT)), error: null };
    case 'refT':
      if (R <= 0 || refR <= 0 || beta <= 0 || T <= 0)
        return errResult('All other variables must be greater than zero.');
      return { value: 1 / (1 / T - (1 / beta) * Math.log(R / refR)), error: null };
    case 'R':
      if (refR <= 0 || beta <= 0 || refT <= 0 || T <= 0)
        return errResult('All other variables must be greater than zero.');
      return { value: refR * Math.exp(beta * (1 / T - 1 / refT)), error: null };
    case 'T':
      if (R <= 0 || refR <= 0 || beta <= 0 || refT <= 0)
        return errResult('All other variables must be greater than zero.');
      return { value: 1 / (1 / refT + (1 / beta) * Math.log(R / refR)), error: null };
    default:
      return errResult(`Unknown target "${target}".`);
  }
}

function errResult(error) { return { value: NaN, error }; }

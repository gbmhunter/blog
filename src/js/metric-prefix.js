/**
 * Shared metric-prefix value parsing & formatting.
 *
 * Used by widgets that need to accept human-friendly values like "10.3k",
 * "2u2", "470R", "1.5 MΩ" and emit a number, or format a number back into a
 * short string with an SI prefix. Unit-agnostic — pass the unit(s) you want
 * stripped on input and emitted on output via the options bag.
 */

export const METRIC_PREFIXES = Object.freeze({
  p: 1e-12,
  n: 1e-9,
  u: 1e-6, µ: 1e-6, μ: 1e-6,
  m: 1e-3,
  // R / r is a resistor-specific convention meaning "no prefix" (R = ×1).
  // It's enabled via the rNotation option.
  R: 1, r: 1,
  '': 1,
  k: 1e3, K: 1e3,
  M: 1e6,
  G: 1e9,
  T: 1e12,
});

const DEFAULT_PREFIX_LIST = 'p, n, u, m, k, M, G, T';
const R_PREFIX_LIST = 'm, R, k, M, G';

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const isRPrefix = (p) => p === 'R' || p === 'r';

function validate(value, { allowZero, allowNegative }) {
  if (!Number.isFinite(value)) return { value: NaN, error: 'Could not parse as a number.' };
  if (!allowNegative && value < 0) return { value: NaN, error: 'Value must be non-negative.' };
  if (!allowZero && value === 0) return { value: NaN, error: 'Value must be greater than zero.' };
  return { value, error: null };
}

/**
 * Parse a human-friendly value-with-prefix string into a number.
 *
 * Supports:
 *   - Plain numbers:           "10300"
 *   - Standard SI prefixes:    "10.3k", "2.2M", "470u"
 *   - "R" prefix for resistors when rNotation is true: "470R" → 470
 *   - "RK-notation" shorthand: "2k2" → 2200, "4R7" → 4.7, "1n5" → 1.5e-9
 *   - Optional unit suffix:    "10kΩ", "4.7 µF" (units listed in options.units are stripped)
 *
 * Returns { value, error }. On success error is null.
 *
 * Options:
 *   units            — array of unit-symbol strings to strip (case-insensitive). E.g. ['Ω', 'ohm', 'ohms'].
 *   allowZero        — boolean (default false).
 *   allowNegative    — boolean (default false).
 *   rNotation        — boolean (default false). Enables "R" as a synonym for "no prefix" (resistor convention).
 *   prefixListLabel  — string shown in error messages. Defaults to the standard SI list, or the resistor list when rNotation is true.
 */
export function parseValueWithPrefix(text, options = {}) {
  const {
    units = [],
    allowZero = false,
    allowNegative = false,
    rNotation = false,
    prefixListLabel = rNotation ? R_PREFIX_LIST : DEFAULT_PREFIX_LIST,
  } = options;

  if (typeof text !== 'string' || text.trim() === '') {
    return { value: NaN, error: 'Enter a value.' };
  }

  let cleaned = text.trim();
  for (const u of units) {
    cleaned = cleaned.replace(new RegExp(escapeRegex(u), 'gi'), '');
  }
  cleaned = cleaned.trim();

  const isAllowedPrefix = (p) => p === '' || (p in METRIC_PREFIXES && (rNotation || !isRPrefix(p)));

  // RK-shorthand: digits, prefix letter, digits (e.g. "2k2", "4R7", "1n5").
  const shorthand = cleaned.match(/^(\d+)\s*([A-Za-zµμ])\s*(\d+)$/);
  if (shorthand) {
    const [, intPart, prefix, fracPart] = shorthand;
    if (!isAllowedPrefix(prefix)) {
      return { value: NaN, error: `Unknown prefix "${prefix}" — use one of: ${prefixListLabel}.` };
    }
    const multiplier = METRIC_PREFIXES[prefix];
    return validate(parseFloat(`${intPart}.${fracPart}`) * multiplier, { allowZero, allowNegative });
  }

  // Standard form: optional sign, number, optional prefix letter(s).
  const standard = cleaned.match(/^([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*([A-Za-zµμ]*)$/);
  if (!standard) {
    return { value: NaN, error: `Couldn't parse "${text}" as a value.` };
  }
  const [, num, prefix] = standard;
  if (prefix && !isAllowedPrefix(prefix)) {
    return { value: NaN, error: `Unknown prefix "${prefix}" — use one of: ${prefixListLabel}.` };
  }
  const multiplier = prefix ? METRIC_PREFIXES[prefix] : 1;
  return validate(parseFloat(num) * multiplier, { allowZero, allowNegative });
}

const FORMAT_PREFIXES = [
  { factor: 1e12,  symbol: 'T' },
  { factor: 1e9,   symbol: 'G' },
  { factor: 1e6,   symbol: 'M' },
  { factor: 1e3,   symbol: 'k' },
  { factor: 1,     symbol: ''  },
  { factor: 1e-3,  symbol: 'm' },
  { factor: 1e-6,  symbol: 'µ' },
  { factor: 1e-9,  symbol: 'n' },
  { factor: 1e-12, symbol: 'p' },
];

function trimNumber(v, sigFigs) {
  if (v === 0) return '0';
  const order = Math.floor(Math.log10(Math.abs(v)));
  const decimals = Math.max(0, sigFigs - 1 - order);
  return parseFloat(v.toFixed(decimals)).toString();
}

/**
 * Format a number using the most appropriate SI prefix.
 * E.g. formatValueWithPrefix(10300, 'Ω') → "10.3 kΩ".
 *
 * Options:
 *   sigFigs — significant figures in the displayed mantissa (default 4).
 */
export function formatValueWithPrefix(value, unitSymbol = '', options = {}) {
  const { sigFigs = 4 } = options;
  if (!Number.isFinite(value)) return '—';
  if (value === 0) return `0 ${unitSymbol}`.trimEnd();
  const abs = Math.abs(value);
  for (const p of FORMAT_PREFIXES) {
    if (abs >= p.factor) {
      return `${trimNumber(value / p.factor, sigFigs)} ${p.symbol}${unitSymbol}`.trimEnd();
    }
  }
  return `${trimNumber(value, sigFigs)} ${unitSymbol}`.trimEnd();
}

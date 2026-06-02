// Power-unit conversions. Watts is the canonical internal representation.
// Each unit knows how to convert to/from watts, and how to label itself.
//
// The dBm/dBW conversions are not defined for non-positive power (log of 0 or
// a negative is nonsensical). The widget surfaces this as "—" / blank.

export const UNITS = {
  W:   { label: 'W',   toWatts: (n) => n,                          fromWatts: (w) => w },
  mW:  { label: 'mW',  toWatts: (n) => n / 1e3,                    fromWatts: (w) => w * 1e3 },
  µW:  { label: 'µW',  toWatts: (n) => n / 1e6,                    fromWatts: (w) => w * 1e6 },
  dBm: { label: 'dBm', toWatts: (n) => Math.pow(10, n / 10) / 1e3, fromWatts: (w) => w > 0 ? 10 * Math.log10(w * 1e3) : NaN },
  dBW: { label: 'dBW', toWatts: (n) => Math.pow(10, n / 10),       fromWatts: (w) => w > 0 ? 10 * Math.log10(w)       : NaN },
};

export const UNIT_ORDER = ['W', 'mW', 'µW', 'dBm', 'dBW'];

// Format a number for display. Power values can span ~15 decades, so switch
// to scientific notation outside a "comfortable" range.
export function formatNumber(n, sigFigs = 5) {
  if (!Number.isFinite(n)) return '';
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs !== 0 && (abs >= 1e6 || abs < 1e-4)) {
    return n.toExponential(sigFigs - 1);
  }
  // toPrecision then parseFloat to drop trailing zeros.
  return parseFloat(n.toPrecision(sigFigs)).toString();
}

export function parseNumber(text) {
  if (typeof text !== 'string' || text.trim() === '') return NaN;
  const t = text.trim();
  // Accept a single leading sign and an optional exponent. Reject everything else.
  if (!/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(t)) return NaN;
  const v = parseFloat(t);
  return Number.isFinite(v) ? v : NaN;
}

// Fixed-point (Q-format) encode/decode helpers.
//
// Convention (matching the Fixed-Point Mathematics page): a Qi.f number has
// i integer bits and f fractional bits, for a total word length N = i + f.
// Signed numbers use two's complement across all N bits, so e.g. Q5.3 spans
// −16 … 15.875 signed, or 0 … 31.875 unsigned. The real value is raw / 2^f,
// where raw is the stored integer.
//
// Word length is capped at 32 bits so every raw value and bit pattern stays
// inside the exact-integer range of a JS number (< 2^53).

export const MAX_BITS = 32;

/** Range of the stored integer for an N-bit word. */
export function rawRange(N, signed) {
  if (signed) return { min: -(2 ** (N - 1)), max: 2 ** (N - 1) - 1 };
  return { min: 0, max: 2 ** N - 1 };
}

/** Range of representable real values. */
export function valueRange(N, f, signed) {
  const { min, max } = rawRange(N, signed);
  const s = 2 ** f;
  return { min: min / s, max: max / s };
}

/** Encode a real value → stored integer (rounded, clamped). Flags overflow. */
export function encode(value, f, N, signed) {
  const scaled = Math.round(value * 2 ** f);
  const { min, max } = rawRange(N, signed);
  const overflow = scaled < min || scaled > max;
  return { raw: Math.max(min, Math.min(max, scaled)), overflow };
}

/** Stored integer → real value. */
export function decode(raw, f) {
  return raw / 2 ** f;
}

/** Signed stored integer → unsigned N-bit pattern (two's complement). */
export function toBitPattern(raw, N) {
  return raw >= 0 ? raw : raw + 2 ** N;
}

/** Unsigned N-bit pattern → signed stored integer. */
export function fromBitPattern(bp, N, signed) {
  if (signed && bp >= 2 ** (N - 1)) return bp - 2 ** N;
  return bp;
}

/** Bits as an array, MSB first. */
export function bitsMSBFirst(bp, N) {
  const bits = [];
  for (let p = N - 1; p >= 0; p--) bits.push(Math.floor(bp / 2 ** p) % 2);
  return bits;
}

/** The (signed) contribution of bit position p (0 = LSB) to the real value. */
export function bitWeight(p, N, f, signed) {
  const mag = 2 ** (p - f);
  return signed && p === N - 1 ? -mag : mag;
}

/** Flip bit at position p (0 = LSB) in an N-bit pattern. */
export function toggleBitAt(bp, p) {
  const set = Math.floor(bp / 2 ** p) % 2;
  return set ? bp - 2 ** p : bp + 2 ** p;
}

export function toHex(bp, N) {
  return bp.toString(16).toUpperCase().padStart(Math.ceil(N / 4), '0');
}

export function toBin(bp, N) {
  return bp.toString(2).padStart(N, '0');
}

/** Parse a hex/binary/decimal integer string into an unsigned bit pattern (masked to N bits), or null. */
export function parseCode(text, N) {
  const t = text.trim().replace(/[_\s]/g, '');
  if (t === '') return null;
  let v;
  if (/^0x[0-9a-f]+$/i.test(t)) v = parseInt(t.slice(2), 16);
  else if (/^0b[01]+$/i.test(t)) v = parseInt(t.slice(2), 2);
  else if (/^[0-9]+$/.test(t)) v = parseInt(t, 10);
  else return null;
  if (!Number.isFinite(v)) return null;
  return ((v % 2 ** N) + 2 ** N) % 2 ** N; // mask to N bits
}

/** Format a real value compactly (enough fractional digits for the resolution). */
export function formatValue(v, f) {
  if (!Number.isFinite(v)) return '—';
  const digits = Math.min(12, Math.max(0, f)); // 2^-f needs up to f decimal digits
  const s = v.toFixed(digits);
  // trim trailing zeros but keep at least one decimal if there was a point
  return s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s;
}

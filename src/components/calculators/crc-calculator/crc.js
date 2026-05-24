// Generic CRC implementation. Ported from the NinjaCalc CRC calculator
// (`utils/crc/crc-generic.js`), but using native JavaScript `BigInt` instead of
// the `big-integer` library — so the whole engine has zero external deps.
//
// Each `CrcGeneric` instance is a stateful accumulator: feed it bytes via
// `update(byte)` and then read `getHex()` for the final CRC. Construct it
// from an algorithm definition (see `catalogue.js`).

export class CrcGeneric {
  constructor(initObj) {
    this.DATA_WIDTH_BITS = 8;
    this.name = initObj.name;
    if (!initObj.crcWidthBits) {
      throw new Error('CrcGeneric: crcWidthBits is required');
    }
    this.crcWidthBits = initObj.crcWidthBits;
    this.crcPolynomial = BigInt(initObj.crcPolynomial);
    this.startingValue = BigInt(initObj.startingValue);
    this.finalXorValue = BigInt(initObj.finalXorValue);
    this.reflectData = !!initObj.reflectData;
    this.reflectRemainder = !!initObj.reflectRemainder;
    this.checkValue = initObj.checkValue !== undefined ? BigInt(initObj.checkValue) : null;

    // Width-bit mask: e.g. 0xFF for 8-bit, 0xFFFF for 16-bit, etc.
    this.mask = (1n << BigInt(this.crcWidthBits)) - 1n;

    // Pre-shifted polynomial for the width-less-than-byte path.
    const shift = 8 - this.crcWidthBits;
    this.shiftedPolynomial = shift > 0 ? this.crcPolynomial << BigInt(shift) : this.crcPolynomial;

    this.crcValue = this.startingValue;
  }

  update(byteOfData) {
    let input = BigInt(byteOfData & 0xff);
    if (this.reflectData) input = doMirror(input, 8);

    if (this.crcWidthBits - this.DATA_WIDTH_BITS >= 0) {
      // Polynomial width ≥ data width.
      this.crcValue = this.crcValue ^ (input << BigInt(this.crcWidthBits - this.DATA_WIDTH_BITS));
      const msbMask = 1n << BigInt(this.crcWidthBits - 1);
      for (let j = 0; j < this.DATA_WIDTH_BITS; j++) {
        if ((this.crcValue & msbMask) !== 0n) {
          this.crcValue = ((this.crcValue << 1n) ^ this.crcPolynomial) & this.mask;
        } else {
          this.crcValue = (this.crcValue << 1n) & this.mask;
        }
      }
    } else {
      // Polynomial width < 8 bits — shift the partial CRC up to byte-width
      // first, then shift back down at the end.
      this.crcValue = this.crcValue << BigInt(this.DATA_WIDTH_BITS - this.crcWidthBits);
      this.crcValue = this.crcValue ^ input;
      for (let k = 0; k < 8; k++) {
        if ((this.crcValue & 0x80n) !== 0n) {
          this.crcValue = (this.crcValue << 1n) ^ this.shiftedPolynomial;
        } else {
          this.crcValue = this.crcValue << 1n;
        }
      }
      this.crcValue = this.crcValue & 0xffn;
      this.crcValue = this.crcValue >> BigInt(this.DATA_WIDTH_BITS - this.crcWidthBits);
    }
  }

  getValue() {
    let out = this.reflectRemainder ? doMirror(this.crcValue, this.crcWidthBits) : this.crcValue;
    out = out ^ this.finalXorValue;
    return out;
  }

  getHex() {
    const hex = this.getValue().toString(16).toUpperCase();
    const numHexChars = Math.ceil(this.crcWidthBits / 4);
    return hex.padStart(numHexChars, '0');
  }

  reset() {
    this.crcValue = this.startingValue;
  }
}

function doMirror(input, numBits) {
  let output = 0n;
  for (let i = 0; i < numBits; i++) {
    output = (output << 1n) | (input & 1n);
    input = input >> 1n;
  }
  return output;
}

// Convenience: run the engine to completion on a byte array.
export function computeCrcHex(algorithm, bytes) {
  const crc = new CrcGeneric(algorithm);
  for (const b of bytes) crc.update(b);
  return crc.getHex();
}

// Convert a string of text into a byte array using UTF-8.
export function textToBytes(text) {
  return Array.from(new TextEncoder().encode(text));
}

// Parse a hex string into a byte array. Tolerates whitespace, commas, colons,
// and the `0x` prefix. Returns `{ bytes, error }` — `error` is non-null on a
// non-hex character or odd number of nibbles.
export function hexToBytes(text) {
  const cleaned = text.replace(/0x/gi, '').replace(/[\s,:]/g, '');
  if (cleaned === '') return { bytes: [], error: null };
  if (!/^[0-9a-fA-F]+$/.test(cleaned)) {
    return { bytes: [], error: 'Hex input contains non-hex characters.' };
  }
  if (cleaned.length % 2 !== 0) {
    return { bytes: [], error: 'Hex input has an odd number of nibbles.' };
  }
  const bytes = [];
  for (let i = 0; i < cleaned.length; i += 2) {
    bytes.push(parseInt(cleaned.slice(i, i + 2), 16));
  }
  return { bytes, error: null };
}

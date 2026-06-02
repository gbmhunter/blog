import { getAdType, hexFromBytes } from './adTypes.js';

// Encode an array of { adCode, value } structures into a hex string.
// Returns { hex, totalBytes, errors }.
export function buildAdvPayload(structures) {
  const errors = [];
  const chunks = [];
  let totalBytes = 0;

  for (const s of structures) {
    const adType = getAdType(s.adCode);
    let valueBytes;
    try {
      valueBytes = adType.encode(s.value);
    } catch (e) {
      errors.push(`${adType.name}: ${e.message}`);
      continue;
    }
    const length = 1 + valueBytes.length; // type byte + value
    if (length > 255) {
      errors.push(`${adType.name}: value too large (${valueBytes.length} bytes)`);
      continue;
    }
    const tlv = new Uint8Array(1 + length);
    tlv[0] = length;
    tlv[1] = s.adCode;
    tlv.set(valueBytes, 2);
    chunks.push(tlv);
    totalBytes += tlv.length;
  }

  const out = new Uint8Array(totalBytes);
  let pos = 0;
  for (const c of chunks) { out.set(c, pos); pos += c.length; }

  return { hex: hexFromBytes(out), totalBytes, errors };
}

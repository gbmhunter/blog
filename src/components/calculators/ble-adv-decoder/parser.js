import { getAdType, bytesFromHex } from './adTypes.js';

// Parse a BLE advertising payload hex string into an array of AD structures.
// Returns { structures, errors } — structures contains anything successfully decoded
// before any malformed TLV, and errors lists problems encountered.
export function parseAdvPayload(hexString) {
  const errors = [];
  const structures = [];

  let bytes;
  try {
    bytes = bytesFromHex(hexString);
  } catch (e) {
    return { structures, errors: [e.message] };
  }

  let pos = 0;
  while (pos < bytes.length) {
    const length = bytes[pos];
    if (length === 0) {
      // Common — devices pad the payload with zero-length structures up to 31 bytes.
      // Stop parsing without flagging an error.
      break;
    }
    if (pos + 1 + length > bytes.length) {
      errors.push(`TLV at byte ${pos} claims length ${length} but only ${bytes.length - pos - 1} bytes remain`);
      break;
    }
    const adCode = bytes[pos + 1];
    const valueBytes = bytes.slice(pos + 2, pos + 1 + length);
    const adType = getAdType(adCode);
    let value;
    try {
      value = adType.decode(valueBytes);
    } catch (e) {
      errors.push(`Failed to decode TLV at byte ${pos} (type 0x${adCode.toString(16)}): ${e.message}`);
      value = null;
    }
    structures.push({
      id: crypto.randomUUID(),
      adCode,
      value,
      rawLength: length,
    });
    pos += 1 + length;
  }

  return { structures, errors };
}

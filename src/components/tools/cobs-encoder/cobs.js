// Pure COBS (Consistent Overhead Byte Stuffing) encode/decode logic plus
// lenient hex parsing. No DOM / Preact dependencies so it can be reasoned
// about and tested in isolation.

const DELIMITER = 0x00;

// Lenient hex parser. Accepts continuous ("020103"), space/comma/colon/dash
// separated ("02 01 03", "02:01:03"), and "0x"-prefixed bytes. Returns the
// parsed byte array plus any non-fatal errors to surface to the user.
export function parseHex(text) {
  const errors = [];
  // Strip "0x"/"0X" byte prefixes first so the "x" isn't flagged as invalid.
  const noPrefix = text.replace(/0x/gi, '');
  const invalidChars = noPrefix.match(/[^0-9a-fA-F\s,:;_.\-]/g);
  if (invalidChars) {
    const unique = [...new Set(invalidChars)].map((c) => JSON.stringify(c)).join(', ');
    errors.push(`Ignored invalid character(s): ${unique}`);
  }
  const clean = noPrefix.replace(/[^0-9a-fA-F]/g, '');
  if (clean.length % 2 !== 0) {
    errors.push('Odd number of hex digits — each byte needs two hex digits. Ignoring the trailing digit.');
  }
  const bytes = [];
  for (let i = 0; i + 1 < clean.length; i += 2) {
    bytes.push(parseInt(clean.substr(i, 2), 16));
  }
  return { bytes, errors };
}

// Format a byte array as space-separated, upper-case, two-digit hex.
export function formatHex(bytes) {
  return bytes.map((b) => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
}

// COBS-encode a byte array. Returns the encoded frame *including* the trailing
// 0x00 delimiter, so the output is a complete, ready-to-send packet.
export function cobsEncode(data) {
  const output = [];
  let codeIndex = 0; // index in `output` holding the current code byte
  output.push(0); // placeholder for the first code byte
  let code = 1;

  for (const b of data) {
    if (b === 0) {
      output[codeIndex] = code;
      codeIndex = output.length;
      output.push(0); // placeholder for the next code byte
      code = 1;
    } else {
      output.push(b);
      code++;
      if (code === 0xff) {
        // A run of 254 non-zero bytes: emit the 0xFF code and start a new block.
        output[codeIndex] = code;
        codeIndex = output.length;
        output.push(0);
        code = 1;
      }
    }
  }
  output[codeIndex] = code;
  output.push(DELIMITER);
  return output;
}

// COBS-decode a frame. Tolerates a trailing 0x00 delimiter (and ignores any
// data after the first delimiter, treating it as the packet boundary).
// Returns { bytes, errors } — bytes holds whatever was decoded before an error.
export function cobsDecode(input) {
  const errors = [];
  if (input.length === 0) {
    return { bytes: [], errors: ['No data to decode.'] };
  }

  // Trim at the first delimiter — that marks the end of one packet.
  let data = input;
  const firstZero = data.indexOf(0);
  if (firstZero !== -1) {
    if (firstZero !== data.length - 1) {
      errors.push(
        `Found the 0x00 delimiter at byte ${firstZero}, before the end of the input — decoding only the bytes up to it.`,
      );
    }
    data = data.slice(0, firstZero);
  } else {
    errors.push('Input has no trailing 0x00 delimiter — decoding anyway, but a valid COBS frame should end in 0x00.');
  }

  if (data.length === 0) {
    return { bytes: [], errors: [...errors, 'Frame contains only a delimiter — no payload.'] };
  }

  const out = [];
  let i = 0;
  while (i < data.length) {
    const code = data[i];
    i++;
    const blockLen = code - 1;
    if (i + blockLen > data.length) {
      errors.push(
        `Code byte 0x${code.toString(16).toUpperCase().padStart(2, '0')} at byte ${i - 1} points past the end of the data (frame is truncated or malformed).`,
      );
      return { bytes: out, errors };
    }
    for (let j = 0; j < blockLen; j++) {
      out.push(data[i]);
      i++;
    }
    // Each block (except a 0xFF run, and except the final block) represents a
    // 0x00 in the original data.
    if (code !== 0xff && i < data.length) {
      out.push(0);
    }
  }
  return { bytes: out, errors };
}

// BLE Advertising Data (AD) type definitions.
// Each entry knows how to encode a value to bytes and decode bytes back to a value.
// The complete assigned-numbers list is large — this is the common subset.

const hexFromBytes = (bytes) =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, '0').toUpperCase()).join('');

const bytesFromHex = (hex) => {
  // Strip "0x" / "0X" prefixes (handles both a leading prefix and per-byte prefixes
  // like "0x02 0x01 0x06") before discarding any remaining non-hex characters.
  const clean = hex.replace(/0x/gi, '').replace(/[^0-9a-fA-F]/g, '');
  if (clean.length % 2 !== 0) throw new Error('Hex string must have an even number of nibbles');
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.substr(i * 2, 2), 16);
  return out;
};

const FLAG_BITS = [
  { mask: 0x01, key: 'leLimitedDiscoverable', label: 'LE Limited Discoverable Mode' },
  { mask: 0x02, key: 'leGeneralDiscoverable', label: 'LE General Discoverable Mode' },
  { mask: 0x04, key: 'brEdrNotSupported', label: 'BR/EDR Not Supported' },
  { mask: 0x08, key: 'leAndBrEdrController', label: 'Simultaneous LE & BR/EDR (Controller)' },
  { mask: 0x10, key: 'leAndBrEdrHost', label: 'Simultaneous LE & BR/EDR (Host)' },
];

const formatUuid128 = (bytes) => {
  // 128-bit UUIDs are transmitted little-endian; reverse for display.
  const be = Array.from(bytes).reverse();
  const hex = be.map((b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

const parseUuid128 = (str) => {
  const clean = str.replace(/[^0-9a-fA-F]/g, '');
  if (clean.length !== 32) throw new Error('128-bit UUID must be 32 hex chars');
  const be = bytesFromHex(clean);
  return new Uint8Array(Array.from(be).reverse());
};

export const AD_TYPES = {
  0x01: {
    code: 0x01,
    name: 'Flags',
    defaultValue: { leLimitedDiscoverable: false, leGeneralDiscoverable: true, brEdrNotSupported: true, leAndBrEdrController: false, leAndBrEdrHost: false },
    encode(value) {
      let b = 0;
      for (const f of FLAG_BITS) if (value[f.key]) b |= f.mask;
      return new Uint8Array([b]);
    },
    decode(bytes) {
      const b = bytes[0] ?? 0;
      const v = {};
      for (const f of FLAG_BITS) v[f.key] = (b & f.mask) !== 0;
      return v;
    },
    describe(value) {
      const on = FLAG_BITS.filter((f) => value[f.key]).map((f) => f.label);
      return on.length ? on.join(', ') : '(no flags set)';
    },
  },

  0x02: {
    code: 0x02,
    name: 'Incomplete List of 16-bit Service UUIDs',
    defaultValue: [0x180F], // Battery Service
    encode(value) {
      const out = new Uint8Array(value.length * 2);
      value.forEach((u, i) => {
        out[i * 2] = u & 0xff;
        out[i * 2 + 1] = (u >> 8) & 0xff;
      });
      return out;
    },
    decode(bytes) {
      const out = [];
      for (let i = 0; i + 1 < bytes.length; i += 2) out.push(bytes[i] | (bytes[i + 1] << 8));
      return out;
    },
    describe(value) { return value.map((u) => '0x' + u.toString(16).padStart(4, '0').toUpperCase()).join(', '); },
  },

  0x03: {
    code: 0x03,
    name: 'Complete List of 16-bit Service UUIDs',
    defaultValue: [0x180F],
    encode(v) { return AD_TYPES[0x02].encode(v); },
    decode(b) { return AD_TYPES[0x02].decode(b); },
    describe(v) { return AD_TYPES[0x02].describe(v); },
  },

  0x06: {
    code: 0x06,
    name: 'Incomplete List of 128-bit Service UUIDs',
    defaultValue: ['00000000-0000-1000-8000-00805F9B34FB'],
    encode(value) {
      const parts = value.map(parseUuid128);
      const out = new Uint8Array(parts.length * 16);
      parts.forEach((p, i) => out.set(p, i * 16));
      return out;
    },
    decode(bytes) {
      const out = [];
      for (let i = 0; i + 15 < bytes.length; i += 16) out.push(formatUuid128(bytes.slice(i, i + 16)));
      return out;
    },
    describe(v) { return v.join(', '); },
  },

  0x07: {
    code: 0x07,
    name: 'Complete List of 128-bit Service UUIDs',
    defaultValue: ['00000000-0000-1000-8000-00805F9B34FB'],
    encode(v) { return AD_TYPES[0x06].encode(v); },
    decode(b) { return AD_TYPES[0x06].decode(b); },
    describe(v) { return AD_TYPES[0x06].describe(v); },
  },

  0x08: {
    code: 0x08,
    name: 'Shortened Local Name',
    defaultValue: 'mbeddedNinja',
    encode(value) { return new TextEncoder().encode(value); },
    decode(bytes) { return new TextDecoder().decode(bytes); },
    describe(v) { return JSON.stringify(v); },
  },

  0x09: {
    code: 0x09,
    name: 'Complete Local Name',
    defaultValue: 'mbedded.ninja',
    encode(v) { return new TextEncoder().encode(v); },
    decode(b) { return new TextDecoder().decode(b); },
    describe(v) { return JSON.stringify(v); },
  },

  0x0A: {
    code: 0x0A,
    name: 'TX Power Level',
    defaultValue: 0,
    encode(value) {
      const v = ((value % 256) + 256) % 256; // two's complement int8
      return new Uint8Array([v]);
    },
    decode(bytes) {
      const b = bytes[0] ?? 0;
      return b > 127 ? b - 256 : b;
    },
    describe(v) { return `${v} dBm`; },
  },

  0x16: {
    code: 0x16,
    name: 'Service Data — 16-bit UUID',
    defaultValue: { uuid: 0x180F, dataHex: '64' }, // 100% battery
    encode(value) {
      const data = bytesFromHex(value.dataHex);
      const out = new Uint8Array(2 + data.length);
      out[0] = value.uuid & 0xff;
      out[1] = (value.uuid >> 8) & 0xff;
      out.set(data, 2);
      return out;
    },
    decode(bytes) {
      if (bytes.length < 2) return { uuid: 0, dataHex: '' };
      return { uuid: bytes[0] | (bytes[1] << 8), dataHex: hexFromBytes(bytes.slice(2)) };
    },
    describe(v) { return `UUID 0x${v.uuid.toString(16).padStart(4, '0').toUpperCase()}, data: ${v.dataHex || '(none)'}`; },
  },

  0xFF: {
    code: 0xFF,
    name: 'Manufacturer Specific Data',
    defaultValue: { companyId: 0x004C, dataHex: '0215' }, // Apple iBeacon prefix
    encode(value) {
      const data = bytesFromHex(value.dataHex);
      const out = new Uint8Array(2 + data.length);
      out[0] = value.companyId & 0xff;
      out[1] = (value.companyId >> 8) & 0xff;
      out.set(data, 2);
      return out;
    },
    decode(bytes) {
      if (bytes.length < 2) return { companyId: 0, dataHex: '' };
      return { companyId: bytes[0] | (bytes[1] << 8), dataHex: hexFromBytes(bytes.slice(2)) };
    },
    describe(v) { return `Company 0x${v.companyId.toString(16).padStart(4, '0').toUpperCase()}, data: ${v.dataHex || '(none)'}`; },
  },
};

export const UNKNOWN_AD_TYPE = {
  name: 'Unknown',
  defaultValue: '',
  encode(value) { return bytesFromHex(value); },
  decode(bytes) { return hexFromBytes(bytes); },
  describe(v) { return v ? `Raw bytes: ${v}` : '(empty)'; },
};

export const getAdType = (code) => AD_TYPES[code] ?? { ...UNKNOWN_AD_TYPE, code, name: `Unknown (0x${code.toString(16).padStart(2, '0').toUpperCase()})` };

export const SUPPORTED_AD_TYPE_CODES = Object.keys(AD_TYPES).map((k) => Number(k)).sort((a, b) => a - b);

export { hexFromBytes, bytesFromHex, FLAG_BITS };

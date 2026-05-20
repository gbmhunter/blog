// E-series resistor preferred values. Logic ported from NinjaCalc's
// StandardResistanceFinder (utils/standard-resistance-finder.js).

const E24 = [
  100, 110, 120, 130, 150, 160, 180, 200, 220, 240, 270, 300,
  330, 360, 390, 430, 470, 510, 560, 620, 680, 750, 820, 910, 1000,
];

const E192 = [
  100, 101, 102, 104, 105, 106, 107, 109, 110, 111, 113, 114, 115, 117, 118, 120,
  121, 123, 124, 126, 127, 129, 130, 132, 133, 135, 137, 138, 140, 142, 143, 145,
  147, 149, 150, 152, 154, 156, 158, 160, 162, 164, 165, 167, 169, 172, 174, 176,
  178, 180, 182, 184, 187, 189, 191, 193, 196, 198, 200, 203, 205, 208, 210, 213,
  215, 218, 221, 223, 226, 229, 232, 234, 237, 240, 243, 246, 249, 252, 255, 258,
  261, 264, 267, 271, 274, 277, 280, 284, 287, 291, 294, 298, 301, 305, 309, 312,
  316, 320, 324, 328, 332, 336, 340, 344, 348, 352, 357, 361, 365, 370, 374, 379,
  383, 388, 392, 397, 402, 407, 412, 417, 422, 427, 432, 437, 442, 448, 453, 459,
  464, 470, 475, 481, 487, 493, 499, 505, 511, 517, 523, 530, 536, 542, 549, 556,
  562, 569, 576, 583, 590, 597, 604, 612, 619, 626, 634, 642, 649, 657, 665, 673,
  681, 690, 698, 706, 715, 723, 732, 741, 750, 759, 768, 777, 787, 796, 806, 816,
  825, 835, 845, 856, 866, 876, 887, 898, 909, 920, 931, 942, 953, 965, 976, 988,
  1000,
];

const pickEvery = (arr, stride) => arr.filter((_, i) => i % stride === 0);

export const E_SERIES = {
  E6:   { name: 'E6',   values: pickEvery(E24, 4) },
  E12:  { name: 'E12',  values: pickEvery(E24, 2) },
  E24:  { name: 'E24',  values: E24 },
  E48:  { name: 'E48',  values: pickEvery(E192, 4) },
  E96:  { name: 'E96',  values: pickEvery(E192, 2) },
  E192: { name: 'E192', values: E192 },
};

export const SEARCH_METHODS = {
  CLOSEST: 'closest',
  CLOSEST_LOWER: 'closestLower',
  CLOSEST_HIGHER: 'closestHigher',
};

// Find the closest preferred value in `values` (which is one decade, 100..1000)
// for the scaled-into-decade `val`.
function findClosestMatch(val, values, method) {
  if (method === SEARCH_METHODS.CLOSEST) {
    let i = 1;
    while (i < values.length - 1 && values[i] <= val) i++;
    const lower = values[i - 1];
    const upper = values[i];
    const lowerDiff = Math.abs((lower - val) / val);
    const upperDiff = Math.abs((upper - val) / val);
    return lowerDiff < upperDiff ? lower : upper;
  }

  if (method === SEARCH_METHODS.CLOSEST_LOWER) {
    if (values[0] > val) return null;
    for (let i = 1; i < values.length; i++) {
      if (values[i] > val) return values[i - 1];
    }
    return values[values.length - 1];
  }

  // CLOSEST_HIGHER
  for (let i = 0; i < values.length; i++) {
    if (values[i] >= val) return values[i];
  }
  return null;
}

export function findPreferredValue(desiredResistance, eSeries, method) {
  if (!Number.isFinite(desiredResistance) || desiredResistance <= 0) return null;
  const order = Math.floor(Math.log10(desiredResistance)) - 2;
  const scale = Math.pow(10, order);
  const scaled = desiredResistance / scale;
  const matched = findClosestMatch(scaled, eSeries.values, method);
  if (matched === null) return null;
  return matched * scale;
}

const METRIC_PREFIXES = {
  p: 1e-12, n: 1e-9, u: 1e-6, µ: 1e-6, μ: 1e-6, m: 1e-3,
  R: 1, r: 1, '': 1,
  k: 1e3, K: 1e3, M: 1e6, G: 1e9, T: 1e12,
};

const PREFIX_LIST = 'm, R, k, M, G';

// Parse "10.3k", "1M", "470R", "4.7", "2.2 kΩ" into { value, error }.
// On success returns { value: <ohms>, error: null }. On failure returns
// { value: NaN, error: '<human-readable reason>' }.
export function parseResistance(text) {
  if (typeof text !== 'string' || text.trim() === '') {
    return { value: NaN, error: 'Enter a resistance value.' };
  }
  const cleaned = text.replace(/Ω/g, '').replace(/ohms?/gi, '').trim();

  // "4R7" / "2k2" notation: digits, prefix letter, digits.
  const rkNotation = cleaned.match(/^(\d+)\s*([A-Za-zµμ])\s*(\d+)$/);
  if (rkNotation) {
    const [, intPart, prefix, fracPart] = rkNotation;
    if (!(prefix in METRIC_PREFIXES)) {
      return { value: NaN, error: `Unknown unit "${prefix}" — use one of: ${PREFIX_LIST}.` };
    }
    const multiplier = METRIC_PREFIXES[prefix];
    const v = parseFloat(`${intPart}.${fracPart}`) * multiplier;
    return v > 0 ? { value: v, error: null } : { value: NaN, error: 'Resistance must be greater than zero.' };
  }

  // Standard: optional sign, number, optional single-letter prefix.
  const standard = cleaned.match(/^([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*([A-Za-zµμ]*)$/);
  if (!standard) {
    return { value: NaN, error: `Couldn't parse "${text}" as a resistance. Try formats like 4.7k, 470, 2M2 or 0.1.` };
  }
  const [, num, prefix] = standard;
  if (prefix && !(prefix in METRIC_PREFIXES)) {
    return { value: NaN, error: `Unknown unit "${prefix}" — use one of: ${PREFIX_LIST}.` };
  }
  const multiplier = prefix ? METRIC_PREFIXES[prefix] : 1;
  const v = parseFloat(num) * multiplier;
  if (!Number.isFinite(v)) {
    return { value: NaN, error: `Couldn't parse "${text}" as a number.` };
  }
  if (v <= 0) {
    return { value: NaN, error: 'Resistance must be greater than zero.' };
  }
  return { value: v, error: null };
}

// Format a resistance in ohms with the most appropriate metric prefix.
export function formatResistance(ohms, sigFigs = 4) {
  if (!Number.isFinite(ohms)) return '—';
  if (ohms === 0) return '0 Ω';
  const prefixes = [
    { factor: 1e9,  symbol: 'GΩ' },
    { factor: 1e6,  symbol: 'MΩ' },
    { factor: 1e3,  symbol: 'kΩ' },
    { factor: 1,    symbol: 'Ω'  },
    { factor: 1e-3, symbol: 'mΩ' },
  ];
  for (const p of prefixes) {
    if (Math.abs(ohms) >= p.factor) {
      const v = ohms / p.factor;
      return `${trimNumber(v, sigFigs)} ${p.symbol}`;
    }
  }
  return `${trimNumber(ohms, sigFigs)} Ω`;
}

function trimNumber(v, sigFigs) {
  if (v === 0) return '0';
  const order = Math.floor(Math.log10(Math.abs(v)));
  const decimals = Math.max(0, sigFigs - 1 - order);
  return parseFloat(v.toFixed(decimals)).toString();
}

export function percentError(actual, desired) {
  if (!Number.isFinite(actual) || !Number.isFinite(desired) || desired === 0) return NaN;
  return ((actual - desired) / desired) * 100;
}

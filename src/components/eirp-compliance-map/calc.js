// Headline EIRP limits in dBm for each (region, band) combination.
// `null` means the band is not available for unlicensed operation in that region.
// These are the typical-case limits — see RF Spectrum Regulations page for nuance.

export const REGIONS = ['US', 'CA', 'EU', 'UK', 'AU', 'NZ', 'JP'];

export const REGION_NAMES = {
  US: 'United States',
  CA: 'Canada',
  EU: 'European Union',
  UK: 'United Kingdom',
  AU: 'Australia',
  NZ: 'New Zealand',
  JP: 'Japan',
};

// Bands keyed by short name. Each protocol below maps to one of these.
export const BANDS = {
  '433mhz':  { label: '433 MHz ISM (433.05 – 434.79 MHz)', freqMHz: [433.05, 434.79] },
  '868mhz':  { label: '868 MHz EU (863 – 870 MHz)',         freqMHz: [863, 870] },
  '915mhz':  { label: '915 MHz ISM (902 – 928 MHz)',         freqMHz: [902, 928] },
  '2.4ghz':  { label: '2.4 GHz ISM (2400 – 2483.5 MHz)',     freqMHz: [2400, 2483.5] },
  '5ghz':    { label: '5 GHz U-NII (5150 – 5875 MHz)',        freqMHz: [5150, 5875] },
};

// EIRP caps in dBm by region × band. null = not allocated for unlicensed use.
export const EIRP_LIMITS = {
  US: { '433mhz': null, '868mhz': null, '915mhz': 36, '2.4ghz': 36, '5ghz': 36 },
  CA: { '433mhz': null, '868mhz': null, '915mhz': 36, '2.4ghz': 36, '5ghz': 36 },
  EU: { '433mhz': 10,   '868mhz': 14,   '915mhz': null, '2.4ghz': 20, '5ghz': 23 },
  UK: { '433mhz': 10,   '868mhz': 14,   '915mhz': null, '2.4ghz': 20, '5ghz': 23 },
  AU: { '433mhz': 14,   '868mhz': null, '915mhz': 30,  '2.4ghz': 36, '5ghz': 36 },
  NZ: { '433mhz': 14,   '868mhz': null, '915mhz': 30,  '2.4ghz': 36, '5ghz': 36 },
  JP: { '433mhz': null, '868mhz': null, '915mhz': 24,  '2.4ghz': 20, '5ghz': 23 },
};

// Pre-defined protocols — picks the right band for the user.
export const PROTOCOLS = {
  wifi24:    { label: 'Wi-Fi 2.4 GHz',           band: '2.4ghz' },
  wifi5:     { label: 'Wi-Fi 5 GHz',             band: '5ghz' },
  bluetooth: { label: 'Bluetooth / BLE (2.4 GHz)', band: '2.4ghz' },
  zigbee24:  { label: 'ZigBee 2.4 GHz',          band: '2.4ghz' },
  lora_eu:   { label: 'LoRa EU868',              band: '868mhz' },
  lora_us:   { label: 'LoRa US915 / AU915',      band: '915mhz' },
  ism433:    { label: '433 MHz ISM',             band: '433mhz' },
  custom:    { label: 'Custom (specify frequency)', band: null },
};

// Decide the band for a custom frequency in MHz. Returns a band key or null.
export function bandForFrequencyMHz(freqMHz) {
  if (!Number.isFinite(freqMHz)) return null;
  for (const [key, def] of Object.entries(BANDS)) {
    const [lo, hi] = def.freqMHz;
    if (freqMHz >= lo && freqMHz <= hi) return key;
  }
  return null;
}

// Returns 'compliant' | 'exceeds' | 'not-allocated' | 'unknown'.
export function complianceStatus(eirpDbm, limitDbm) {
  if (limitDbm === null) return 'not-allocated';
  if (!Number.isFinite(eirpDbm)) return 'unknown';
  return eirpDbm <= limitDbm ? 'compliant' : 'exceeds';
}

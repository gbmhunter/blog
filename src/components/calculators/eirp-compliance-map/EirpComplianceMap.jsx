import { useState, useMemo } from 'preact/hooks';
import { feature } from 'topojson-client';
import { geoMercator, geoPath } from 'd3-geo';
import worldData from 'world-atlas/countries-110m.json';
import {
  REGIONS,
  REGION_NAMES,
  BANDS,
  EIRP_LIMITS,
  PROTOCOLS,
  bandForFrequencyMHz,
  complianceStatus,
} from './calc.js';
import { COUNTRY_TO_REGION } from './country-regions.js';
import './styles.css';

const MAP_WIDTH = 720;
const MAP_HEIGHT = 420;

// Antarctica's ISO 3166-1 numeric code. Excluded from both the projection-fit
// and the rendered countries — Mercator stretches it to absurd proportions at
// the south pole, dominating the map. Google Maps / OpenStreetMap handle this
// the same way (clipped or omitted).
const ANTARCTICA_ID = '010';

// Build the projection + path generator once, at module scope, since the world
// data is static. Web Mercator (same projection family as Google Maps /
// OpenStreetMap), fitted to the inhabited world.
const ALL_FEATURES = feature(worldData, worldData.objects.countries).features;
const COUNTRIES = ALL_FEATURES.filter((c) => c.id !== ANTARCTICA_ID);
const COUNTRY_COLLECTION = { type: 'FeatureCollection', features: COUNTRIES };
const projection = geoMercator()
  .fitSize([MAP_WIDTH, MAP_HEIGHT], COUNTRY_COLLECTION)
  .clipExtent([[0, 0], [MAP_WIDTH, MAP_HEIGHT]]);
const pathGen = geoPath(projection);

const FILL_COLOURS = {
  compliant:      'var(--eirp-fill-compliant)',
  exceeds:        'var(--eirp-fill-exceeds)',
  'not-allocated':'var(--eirp-fill-not-allocated)',
  unknown:        'var(--eirp-fill-unknown)',
};

const STATUS_TEXT = {
  compliant: 'OK',
  exceeds: 'Over',
  'not-allocated': 'N/A',
  unknown: '?',
};

export default function EirpComplianceMap() {
  const [txPower, setTxPower] = useState(10);    // dBm
  const [antennaGain, setAntennaGain] = useState(2); // dBi
  const [protocol, setProtocol] = useState('wifi24');
  const [customFreqText, setCustomFreqText] = useState('2450');
  const [hoveredCountry, setHoveredCountry] = useState(null);

  const eirp = txPower + antennaGain;

  const band = useMemo(() => {
    if (protocol === 'custom') {
      const f = parseFloat(customFreqText);
      return bandForFrequencyMHz(f);
    }
    return PROTOCOLS[protocol].band;
  }, [protocol, customFreqText]);

  const customFreqMHz = protocol === 'custom' ? parseFloat(customFreqText) : null;
  const customFreqValid = protocol !== 'custom' || (Number.isFinite(customFreqMHz) && customFreqMHz > 0);
  const customFreqInBand = protocol !== 'custom' || band !== null;

  // Compute compliance per region.
  const regionStatus = useMemo(() => {
    const out = {};
    for (const r of REGIONS) {
      const limit = band ? EIRP_LIMITS[r][band] : null;
      out[r] = {
        limit,
        status: band ? complianceStatus(eirp, limit) : 'unknown',
      };
    }
    return out;
  }, [eirp, band]);

  return (
    <div class="eirp-map">
      <div class="eirp-map__controls">
        <label class="eirp-map__control">
          <span class="eirp-map__control-label">
            Transmitter power: <strong>{txPower} dBm</strong>
            <span class="eirp-map__control-aux"> ({Math.pow(10, txPower / 10).toFixed(2)} mW)</span>
          </span>
          <input
            type="range"
            min="-20" max="36" step="1"
            value={txPower}
            onInput={(e) => setTxPower(parseInt(e.currentTarget.value, 10))}
          />
        </label>

        <label class="eirp-map__control">
          <span class="eirp-map__control-label">
            Antenna gain: <strong>{antennaGain.toFixed(1)} dBi</strong>
          </span>
          <input
            type="range"
            min="-3" max="20" step="0.5"
            value={antennaGain}
            onInput={(e) => setAntennaGain(parseFloat(e.currentTarget.value))}
          />
        </label>

        <label class="eirp-map__control">
          <span class="eirp-map__control-label">Protocol / Band</span>
          <select value={protocol} onChange={(e) => setProtocol(e.currentTarget.value)}>
            {Object.entries(PROTOCOLS)
              .sort(([, a], [, b]) => {
                // Sort by the band's lower frequency edge, ascending. Entries
                // without a band (e.g. "Custom") sink to the bottom.
                const af = a.band ? BANDS[a.band].freqMHz[0] : Infinity;
                const bf = b.band ? BANDS[b.band].freqMHz[0] : Infinity;
                return af - bf;
              })
              .map(([key, def]) => (
                <option key={key} value={key}>{def.label}</option>
              ))}
          </select>
        </label>

        {protocol === 'custom' && (
          <label class="eirp-map__control">
            <span class="eirp-map__control-label">Frequency (MHz)</span>
            <input
              type="text"
              value={customFreqText}
              onInput={(e) => setCustomFreqText(e.currentTarget.value)}
              spellcheck={false}
              placeholder="e.g. 868.3"
            />
            {!customFreqValid && (
              <div class="eirp-map__warning">Enter a positive frequency in MHz.</div>
            )}
            {customFreqValid && !customFreqInBand && (
              <div class="eirp-map__warning">
                {customFreqMHz} MHz isn't in any tracked unlicensed band — limits unknown.
              </div>
            )}
            {customFreqValid && customFreqInBand && (
              <div class="eirp-map__hint">
                Matched band: <strong>{BANDS[band].label}</strong>
              </div>
            )}
          </label>
        )}
      </div>

      <div class="eirp-map__summary">
        <div class="eirp-map__summary-row">
          <span>EIRP =</span>
          <strong>{eirp.toFixed(1)} dBm</strong>
          <span>({(Math.pow(10, eirp / 10)).toFixed(1)} mW)</span>
        </div>
        {band ? (
          <div class="eirp-map__summary-row eirp-map__summary-row--muted">
            Band: {BANDS[band].label}
          </div>
        ) : (
          <div class="eirp-map__summary-row eirp-map__summary-row--muted">
            Band: (none — limits unknown)
          </div>
        )}
      </div>

      <div class="eirp-map__map-wrap" onMouseLeave={() => setHoveredCountry(null)}>
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          class="eirp-map__svg"
          role="img"
          aria-label="World map showing EIRP compliance per region"
        >
          <rect x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} fill="var(--eirp-fill-ocean)" />
          {COUNTRIES.map((c) => {
            const regionId = COUNTRY_TO_REGION[c.id];
            const status = regionId ? regionStatus[regionId].status : 'untracked';
            const fill = status === 'untracked'
              ? 'var(--eirp-fill-untracked)'
              : FILL_COLOURS[status];
            const d = pathGen(c);
            if (!d) return null;
            return (
              <path
                key={c.id}
                d={d}
                fill={fill}
                class="eirp-map__country"
                onMouseEnter={() => setHoveredCountry({
                  name: c.properties?.name ?? 'Unknown',
                  regionId,
                })}
              />
            );
          })}
        </svg>
        {hoveredCountry && (
          <div class="eirp-map__tooltip">
            <div class="eirp-map__tooltip-country">{hoveredCountry.name}</div>
            {hoveredCountry.regionId ? (() => {
              const { limit, status } = regionStatus[hoveredCountry.regionId];
              const margin = (limit !== null && Number.isFinite(eirp)) ? (limit - eirp) : null;
              return (
                <>
                  <div class="eirp-map__tooltip-region">
                    {REGION_NAMES[hoveredCountry.regionId]}
                  </div>
                  <div class={`eirp-map__tooltip-status eirp-map__tooltip-status--${status}`}>
                    Limit: {limit === null ? 'Not allocated' : `${limit} dBm`}
                    {margin !== null && ` · Margin: ${margin >= 0 ? '+' : ''}${margin.toFixed(1)} dB`}
                  </div>
                </>
              );
            })() : (
              <div class="eirp-map__tooltip-region eirp-map__tooltip-region--muted">
                Outside scope of this page
              </div>
            )}
          </div>
        )}
      </div>

      <div class="eirp-map__legend">
        <span class="eirp-map__legend-item">
          <span class="eirp-map__swatch eirp-map__swatch--compliant" /> Compliant
        </span>
        <span class="eirp-map__legend-item">
          <span class="eirp-map__swatch eirp-map__swatch--exceeds" /> Exceeds limit
        </span>
        <span class="eirp-map__legend-item">
          <span class="eirp-map__swatch eirp-map__swatch--not-allocated" /> Not allocated
        </span>
        <span class="eirp-map__legend-item">
          <span class="eirp-map__swatch eirp-map__swatch--untracked" /> Outside scope of this page
        </span>
      </div>

      <table class="eirp-map__table">
        <thead>
          <tr>
            <th>Region</th>
            <th>Limit</th>
            <th>Status</th>
            <th>Margin</th>
          </tr>
        </thead>
        <tbody>
          {REGIONS.map((r) => {
            const { limit, status } = regionStatus[r];
            const margin = (limit !== null && Number.isFinite(eirp)) ? (limit - eirp) : null;
            return (
              <tr key={r} class={`eirp-map__row eirp-map__row--${status}`}>
                <td>{REGION_NAMES[r]}</td>
                <td>{limit === null ? '—' : `${limit} dBm`}</td>
                <td>{STATUS_TEXT[status]}</td>
                <td>{margin === null ? '—' : `${margin >= 0 ? '+' : ''}${margin.toFixed(1)} dB`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

import { useState, useMemo } from 'preact/hooks';
import {
  E_SERIES,
  SEARCH_METHODS,
  parseResistance,
  formatResistance,
  findPreferredValue,
  percentError,
} from './finder.js';
import './styles.css';

const SERIES_ORDER = ['E6', 'E12', 'E24', 'E48', 'E96', 'E192'];

function ResultCells({ value, desired }) {
  if (value === null || !Number.isFinite(desired)) {
    return (
      <>
        <td class="e-series-finder__result e-series-finder__result--empty">—</td>
        <td class="e-series-finder__result e-series-finder__result--empty">—</td>
      </>
    );
  }
  const err = percentError(value, desired);
  return (
    <>
      <td class="e-series-finder__result e-series-finder__result-value">{formatResistance(value)}</td>
      <td class="e-series-finder__result e-series-finder__result-error">
        {err >= 0 ? '+' : ''}{err.toFixed(3)}%
      </td>
    </>
  );
}

export default function ESeriesFinder() {
  const [text, setText] = useState('10.3k');
  const desired = parseResistance(text);
  const valid = Number.isFinite(desired) && desired > 0;

  const rows = useMemo(() => {
    if (!valid) return [];
    return SERIES_ORDER.map((key) => {
      const eSeries = E_SERIES[key];
      return {
        name: eSeries.name,
        closest: findPreferredValue(desired, eSeries, SEARCH_METHODS.CLOSEST),
        lower: findPreferredValue(desired, eSeries, SEARCH_METHODS.CLOSEST_LOWER),
        higher: findPreferredValue(desired, eSeries, SEARCH_METHODS.CLOSEST_HIGHER),
      };
    });
  }, [desired, valid]);

  return (
    <div class="e-series-finder">
      <div class="e-series-finder__input-row">
        <label for="e-series-finder-input">Desired resistance:</label>
        <input
          id="e-series-finder-input"
          type="text"
          value={text}
          onInput={(e) => setText(e.currentTarget.value)}
          placeholder="e.g. 10.3k, 470R, 2.2M"
          spellcheck={false}
        />
      </div>
      <div class="e-series-finder__field-help">
        Accepts metric prefixes (k, M, G) and R/Ω suffixes. Examples: <code>4.7k</code>, <code>470</code>, <code>2M2</code>, <code>0.1</code>.
      </div>
      {!valid && (
        <div class="e-series-finder__field-error">
          Enter a positive resistance value.
        </div>
      )}

      {valid && (
        <div class="e-series-finder__table-wrap">
          <table class="e-series-finder__table">
            <thead>
              <tr>
                <th rowSpan="2">Series</th>
                <th colSpan="2">Closest</th>
                <th colSpan="2">Closest ≤ desired</th>
                <th colSpan="2">Closest ≥ desired</th>
              </tr>
              <tr>
                <th>Resistance</th><th>Error</th>
                <th>Resistance</th><th>Error</th>
                <th>Resistance</th><th>Error</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name}>
                  <td class="e-series-finder__series-name">{r.name}</td>
                  <ResultCells value={r.closest} desired={desired} />
                  <ResultCells value={r.lower} desired={desired} />
                  <ResultCells value={r.higher} desired={desired} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

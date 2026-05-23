import { useState, useMemo } from 'preact/hooks';
import { parseResistance, formatResistance, seriesResistance } from './calc.js';
import './styles.css';

const newRow = (text) => ({ id: crypto.randomUUID(), text });

const INITIAL_ROWS = [newRow('10k'), newRow('10k')];

export default function SeriesResistance() {
  const [rows, setRows] = useState(INITIAL_ROWS);

  const parsed = useMemo(() => rows.map((r) => parseResistance(r.text)), [rows]);
  const allValid = parsed.every((p) => p.error === null);
  const total = allValid ? seriesResistance(parsed.map((p) => p.value)) : NaN;

  const updateRow = (id, text) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, text } : r)));

  const addRow = () => setRows((prev) => [...prev, newRow('')]);
  const removeRow = (id) =>
    setRows((prev) => (prev.length <= 2 ? prev : prev.filter((r) => r.id !== id)));

  return (
    <div class="series-resistance">
      <div class="series-resistance__rows">
        {rows.map((r, i) => {
          const { error } = parsed[i];
          return (
            <div class="series-resistance__row" key={r.id}>
              <label class="series-resistance__row-label">R<sub>{i + 1}</sub></label>
              <div class="series-resistance__row-input">
                <input
                  type="text"
                  value={r.text}
                  onInput={(e) => updateRow(r.id, e.currentTarget.value)}
                  placeholder="e.g. 10k"
                  spellcheck={false}
                  class={error ? 'series-resistance__input series-resistance__input--error' : 'series-resistance__input'}
                />
                {error && <div class="series-resistance__row-error">{error}</div>}
              </div>
              <button
                class="series-resistance__remove"
                onClick={() => removeRow(r.id)}
                disabled={rows.length <= 2}
                title={rows.length <= 2 ? 'Need at least two resistors' : 'Remove this resistor'}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      <button class="series-resistance__add" onClick={addRow}>+ Add resistor</button>

      <div class="series-resistance__total">
        <span class="series-resistance__total-label">
          R<sub>total</sub> =
        </span>
        <span class="series-resistance__total-value">
          {allValid ? formatResistance(total) : '—'}
        </span>
      </div>
    </div>
  );
}

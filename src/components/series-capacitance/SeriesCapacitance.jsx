import { useState, useMemo } from 'preact/hooks';
import { parseCapacitance, formatCapacitance, seriesCapacitance } from './calc.js';
import './styles.css';

const newRow = (text) => ({ id: crypto.randomUUID(), text });

const INITIAL_ROWS = [newRow('10u'), newRow('10u')];

export default function SeriesCapacitance() {
  const [rows, setRows] = useState(INITIAL_ROWS);

  const parsed = useMemo(() => rows.map((r) => parseCapacitance(r.text)), [rows]);
  const allValid = parsed.every((p) => p.error === null);
  const total = allValid ? seriesCapacitance(parsed.map((p) => p.value)) : NaN;

  const updateRow = (id, text) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, text } : r)));
  const addRow = () => setRows((prev) => [...prev, newRow('')]);
  const removeRow = (id) =>
    setRows((prev) => (prev.length <= 2 ? prev : prev.filter((r) => r.id !== id)));

  return (
    <div class="series-capacitance">
      <div class="series-capacitance__rows">
        {rows.map((r, i) => {
          const { error } = parsed[i];
          return (
            <div class="series-capacitance__row" key={r.id}>
              <label class="series-capacitance__row-label">C<sub>{i + 1}</sub></label>
              <div class="series-capacitance__row-input">
                <input
                  type="text"
                  value={r.text}
                  onInput={(e) => updateRow(r.id, e.currentTarget.value)}
                  placeholder="e.g. 10u"
                  spellcheck={false}
                  class={error ? 'series-capacitance__input series-capacitance__input--error' : 'series-capacitance__input'}
                />
                {error && <div class="series-capacitance__row-error">{error}</div>}
              </div>
              <button
                class="series-capacitance__remove"
                onClick={() => removeRow(r.id)}
                disabled={rows.length <= 2}
                title={rows.length <= 2 ? 'Need at least two capacitors' : 'Remove this capacitor'}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      <button class="series-capacitance__add" onClick={addRow}>+ Add capacitor</button>

      <div class="series-capacitance__total">
        <span class="series-capacitance__total-label">
          C<sub>total</sub> =
        </span>
        <span class="series-capacitance__total-value">
          {allValid ? formatCapacitance(total) : '—'}
        </span>
      </div>
    </div>
  );
}

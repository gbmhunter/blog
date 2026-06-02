import { useState, useMemo } from 'preact/hooks';
import { parseCapacitance, formatCapacitance, parallelCapacitance } from './calc.js';
import './styles.css';

const newRow = (text) => ({ id: crypto.randomUUID(), text });

const INITIAL_ROWS = [newRow('10u'), newRow('10u')];

export default function ParallelCapacitance() {
  const [rows, setRows] = useState(INITIAL_ROWS);

  const parsed = useMemo(() => rows.map((r) => parseCapacitance(r.text)), [rows]);
  const allValid = parsed.every((p) => p.error === null);
  const total = allValid ? parallelCapacitance(parsed.map((p) => p.value)) : NaN;

  const updateRow = (id, text) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, text } : r)));
  const addRow = () => setRows((prev) => [...prev, newRow('')]);
  const removeRow = (id) =>
    setRows((prev) => (prev.length <= 2 ? prev : prev.filter((r) => r.id !== id)));

  return (
    <div class="parallel-capacitance">
      <div class="parallel-capacitance__rows">
        {rows.map((r, i) => {
          const { error } = parsed[i];
          return (
            <div class="parallel-capacitance__row" key={r.id}>
              <label class="parallel-capacitance__row-label">C<sub>{i + 1}</sub></label>
              <div class="parallel-capacitance__row-input">
                <input
                  type="text"
                  value={r.text}
                  onInput={(e) => updateRow(r.id, e.currentTarget.value)}
                  placeholder="e.g. 10u"
                  spellcheck={false}
                  class={error ? 'parallel-capacitance__input parallel-capacitance__input--error' : 'parallel-capacitance__input'}
                />
                {error && <div class="parallel-capacitance__row-error">{error}</div>}
              </div>
              <button
                class="parallel-capacitance__remove"
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

      <button class="parallel-capacitance__add" onClick={addRow}>+ Add capacitor</button>

      <div class="parallel-capacitance__total">
        <span class="parallel-capacitance__total-label">
          C<sub>total</sub> =
        </span>
        <span class="parallel-capacitance__total-value">
          {allValid ? formatCapacitance(total) : '—'}
        </span>
      </div>
    </div>
  );
}

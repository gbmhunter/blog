/**
 * Generic input/output row helpers shared across form-style calculator widgets.
 *
 * Both components rely on the styles defined in `calc-form.css`, which the
 * importing widget must include in its own `styles.css` (or import directly).
 */

export function InputRow({ label, value, onInput, placeholder, suffix, parsed, help }) {
  return (
    <div class="calc-form__row">
      <span class="calc-form__label">{label}</span>
      <div class="calc-form__input-cell">
        <div class="calc-form__input-with-suffix">
          <input
            type="text"
            value={value}
            onInput={(e) => onInput(e.currentTarget.value)}
            placeholder={placeholder}
            spellcheck={false}
            title={help}
            class={parsed.error
              ? 'calc-form__input calc-form__input--error'
              : 'calc-form__input'}
          />
          {suffix && <span class="calc-form__suffix">{suffix}</span>}
        </div>
        {parsed.error && <div class="calc-form__input-error">{parsed.error}</div>}
      </div>
    </div>
  );
}

export function OutputRow({ label, value, format, error }) {
  return (
    <div class="calc-form__row">
      <span class="calc-form__label">{label}</span>
      <div class="calc-form__output">
        {error ? (
          <span class="calc-form__output-error">{error}</span>
        ) : Number.isFinite(value) ? (
          <span class="calc-form__output-value">{format(value)}</span>
        ) : (
          <span class="calc-form__output-empty">—</span>
        )}
      </div>
    </div>
  );
}

export function SelectRow({ label, value, options, onChange, help }) {
  return (
    <div class="calc-form__row">
      <span class="calc-form__label">{label}</span>
      <div class="calc-form__input-cell">
        <select
          class="calc-form__select"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          title={help}
        >
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

/**
 * Generic input/output row helpers shared across form-style calculator widgets.
 *
 * Both components rely on the styles defined in `calc-form.css`, which the
 * importing widget must include in its own `styles.css` (or import directly).
 *
 * Help text is rendered as a *sibling* of the input-cell rather than a child
 * so the row CSS can flow help into a third grid column on wider containers
 * (and stack it below the input on narrow ones).
 */

export function InputRow({ label, value, onInput, placeholder, suffix, parsed, help, warning }) {
  const showWarning = !parsed.error && warning;
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
            title={showWarning ? `${help}\n\nWARNING: ${warning}` : help}
            class={inputClass(parsed, warning)}
          />
          {suffix && <span class="calc-form__suffix">{suffix}</span>}
        </div>
        {parsed.error && <div class="calc-form__input-error">{parsed.error}</div>}
        {showWarning && <div class="calc-form__input-warning">{warning}</div>}
      </div>
      {help && <div class="calc-form__help">{help}</div>}
    </div>
  );
}

// Pick the input class: a hard parse error (red) wins over an extrapolation
// warning (amber), which wins over the default.
function inputClass(parsed, warning) {
  if (parsed.error) return 'calc-form__input calc-form__input--error';
  if (warning) return 'calc-form__input calc-form__input--warning';
  return 'calc-form__input';
}

export function UnitInputRow({ label, value, onInput, unit, onUnitChange, units, placeholder, parsed, help, warning }) {
  const showWarning = !parsed.error && warning;
  return (
    <div class="calc-form__row">
      <span class="calc-form__label">{label}</span>
      <div class="calc-form__input-cell">
        <div class="calc-form__input-with-unit">
          <input
            type="text"
            value={value}
            onInput={(e) => onInput(e.currentTarget.value)}
            placeholder={placeholder}
            spellcheck={false}
            title={showWarning ? `${help}\n\nWARNING: ${warning}` : help}
            class={inputClass(parsed, warning)}
          />
          <select
            class="calc-form__unit-select"
            value={unit}
            onChange={(e) => onUnitChange(e.currentTarget.value)}
          >
            {units.map((u) => (
              <option key={u.label} value={u.label}>{u.label}</option>
            ))}
          </select>
        </div>
        {parsed.error && <div class="calc-form__input-error">{parsed.error}</div>}
        {showWarning && <div class="calc-form__input-warning">{warning}</div>}
      </div>
      {help && <div class="calc-form__help">{help}</div>}
    </div>
  );
}

export function OutputRow({ label, value, format, error, help, warning }) {
  const showWarning = !error && warning;
  return (
    <div class="calc-form__row">
      <span class="calc-form__label">{label}</span>
      <div class="calc-form__input-cell">
        <div class={showWarning ? 'calc-form__output calc-form__output--warning' : 'calc-form__output'}>
          {error ? (
            <span class="calc-form__output-error">{error}</span>
          ) : Number.isFinite(value) ? (
            <span class="calc-form__output-value">{format(value)}</span>
          ) : (
            <span class="calc-form__output-empty">—</span>
          )}
        </div>
        {showWarning && <div class="calc-form__input-warning">{warning}</div>}
      </div>
      {help && <div class="calc-form__help">{help}</div>}
    </div>
  );
}

export function UnitOutputRow({ label, value, units, unit, onUnitChange, error, help, warning, sigFigs = 4 }) {
  const u = units.find((x) => x.label === unit) ?? units[0];
  const showWarning = !error && warning;
  return (
    <div class="calc-form__row">
      <span class="calc-form__label">{label}</span>
      <div class="calc-form__input-cell">
        <div class="calc-form__output-with-unit">
          <div class={showWarning ? 'calc-form__output calc-form__output--warning' : 'calc-form__output'}>
            {error ? (
              <span class="calc-form__output-error">{error}</span>
            ) : Number.isFinite(value) ? (
              <span class="calc-form__output-value">{(value / u.multiplier).toPrecision(sigFigs)}</span>
            ) : (
              <span class="calc-form__output-empty">—</span>
            )}
          </div>
          <select
            class="calc-form__unit-select"
            value={unit}
            onChange={(e) => onUnitChange(e.currentTarget.value)}
          >
            {units.map((x) => (
              <option key={x.label} value={x.label}>{x.label}</option>
            ))}
          </select>
        </div>
        {showWarning && <div class="calc-form__input-warning">{warning}</div>}
      </div>
      {help && <div class="calc-form__help">{help}</div>}
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
      {help && <div class="calc-form__help">{help}</div>}
    </div>
  );
}

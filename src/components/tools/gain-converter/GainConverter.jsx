import { useState } from 'preact/hooks';
import { UNITS, UNIT_ORDER, formatNumber, parseNumber } from './calc.js';
import './styles.css';

export default function GainConverter() {
  const [activeUnit, setActiveUnit] = useState('dBm');
  const [activeText, setActiveText] = useState('0');

  const sourceNum = parseNumber(activeText);
  const sourceValid = Number.isFinite(sourceNum);
  const watts = sourceValid ? UNITS[activeUnit].toWatts(sourceNum) : NaN;

  const handleInput = (unit, text) => {
    setActiveUnit(unit);
    setActiveText(text);
  };

  return (
    <div class="gain-converter">
      <div class="gain-converter__legend">Edit any field — the rest update automatically.</div>
      <div class="gain-converter__rows">
        {UNIT_ORDER.map((unit) => {
          const isActive = unit === activeUnit;
          let display;
          if (isActive) {
            display = activeText;
          } else if (sourceValid) {
            const converted = UNITS[unit].fromWatts(watts);
            display = Number.isFinite(converted) ? formatNumber(converted) : '';
          } else {
            display = '';
          }
          const showError = isActive && activeText.trim() !== '' && !sourceValid;
          return (
            <div class="gain-converter__row" key={unit}>
              <input
                type="text"
                value={display}
                onInput={(e) => handleInput(unit, e.currentTarget.value)}
                spellcheck={false}
                inputMode="decimal"
                class={showError ? 'gain-converter__input gain-converter__input--error' : 'gain-converter__input'}
                placeholder={!isActive && !sourceValid ? '—' : ''}
              />
              <span class="gain-converter__unit">{UNITS[unit].label}</span>
            </div>
          );
        })}
      </div>
      {sourceValid === false && activeText.trim() !== '' && (
        <div class="gain-converter__error">Couldn't parse "{activeText}" as a number.</div>
      )}
    </div>
  );
}

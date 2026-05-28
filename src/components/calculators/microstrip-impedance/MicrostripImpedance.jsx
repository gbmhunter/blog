import { useState, useMemo } from 'preact/hooks';
import {
  LENGTH_UNITS, IMPEDANCE_UNITS, getUnit,
  parseNumber,
  RANGE_WARNINGS, rangeWarning,
  computeMicrostripImpedance,
} from './calc.js';
import { InputRow, UnitInputRow, UnitOutputRow } from '../_shared/FormRows.jsx';
import './styles.css';

export default function MicrostripImpedance() {
  // Each length input keeps a numeric magnitude (text) and a unit label
  // (matches NinjaCalc's per-row unit dropdown). Conversion to SI happens
  // when we feed the values to computeMicrostripImpedance.
  const [w, setW] = useState({ text: '0.2', unit: 'mm' });
  const [t, setT] = useState({ text: '35',  unit: 'um' });
  const [h, setH] = useState({ text: '1.6', unit: 'mm' });
  const [eRText, setERText] = useState('4.0');
  const [zUnit, setZUnit] = useState('Ω');

  const wParsed = useMemo(() => parseNumber(w.text),  [w.text]);
  const tParsed = useMemo(() => parseNumber(t.text),  [t.text]);
  const hParsed = useMemo(() => parseNumber(h.text),  [h.text]);
  const eRParsed = useMemo(() => parseNumber(eRText), [eRText]);

  // Convert to SI once — used for both the calculation and the range warnings.
  const wSI = wParsed.value * getUnit(LENGTH_UNITS, w.unit).multiplier;
  const tSI = tParsed.value * getUnit(LENGTH_UNITS, t.unit).multiplier;
  const hSI = hParsed.value * getUnit(LENGTH_UNITS, h.unit).multiplier;

  const wWarn = rangeWarning(RANGE_WARNINGS.trackWidth, wSI);
  const tWarn = rangeWarning(RANGE_WARNINGS.trackThickness, tSI);
  const hWarn = rangeWarning(RANGE_WARNINGS.substrateHeight, hSI);
  const eRWarn = rangeWarning(RANGE_WARNINGS.dielectric, eRParsed.value);

  const allValid = [wParsed, tParsed, hParsed, eRParsed].every((p) => p.error === null);

  let computed = { impedance: NaN, eEff: NaN, error: null };
  if (allValid) {
    computed = computeMicrostripImpedance({
      trackWidth:      wSI,
      trackThickness:  tSI,
      substrateHeight: hSI,
      dielectric:      eRParsed.value,
    });
  }

  // Helper to bridge the {text, unit} state shape to UnitInputRow's separate
  // value/unit/onInput/onUnitChange props.
  const lengthRow = (label, state, setState, parsed, warning, placeholder, help) => (
    <UnitInputRow
      label={label}
      value={state.text}
      onInput={(text) => setState({ ...state, text })}
      unit={state.unit}
      onUnitChange={(unit) => setState({ ...state, unit })}
      units={LENGTH_UNITS}
      parsed={parsed}
      warning={warning}
      placeholder={placeholder}
      help={help}
    />
  );

  return (
    <div class="calc-form">
      <div class="calc-form__legend">
        Enter the track width, copper thickness, substrate thickness and substrate dielectric constant.
        Pick the unit for each dimension from the dropdown. The calculator returns the characteristic
        impedance using the rfcafe approximation.
      </div>

      <div class="calc-form__rows">
        {lengthRow('w', w, setW, wParsed, wWarn, '0.2',
          'The width of the track (microstrip). Usually measured in mm or mils.')}
        {lengthRow('t', t, setT, tParsed, tWarn, '35',
          "The thickness of the track (microstrip) — the same as the copper weight of the layer it's on. Usually measured in µm or oz./sq foot.")}
        {lengthRow('h', h, setH, hParsed, hWarn, '1.6',
          'The thickness of the substrate — the distance between the track and the plane below it. ≈ 1.6 mm on a standard 2-layer PCB; much smaller between adjacent layers on a high-density board.')}

        <InputRow
          label={<>ε<sub>r</sub></>}
          value={eRText}
          onInput={setERText}
          placeholder="4.0"
          parsed={eRParsed}
          warning={eRWarn}
          help="The dielectric of the substrate. For standard FR-4 PCB material this is around 4–4.7."
        />

        <UnitOutputRow
          label="Z"
          value={computed.impedance}
          units={IMPEDANCE_UNITS}
          unit={zUnit}
          onUnitChange={setZUnit}
          error={computed.error}
          help="The calculated characteristic impedance of the microstrip. Needs to match the impedance at each end so RF reflections don't occur. Typically 20–150 Ω."
        />
      </div>
    </div>
  );
}

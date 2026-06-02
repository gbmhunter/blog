import { useState, useMemo } from 'preact/hooks';
import {
  parseCurrent, parseThermalCond, parseNumber,
  TRACK_THICKNESS_UNITS, PCB_LENGTH_UNITS, WIDTH_UNITS, DELTA_TEMP_UNITS, getUnit,
  formatArea, formatRatio,
  EXTRAPOLATION_LIMITS, extrapolationWarning,
  computeIpc2152,
} from './calc.js';
import { InputRow, OutputRow, SelectRow, UnitInputRow, UnitOutputRow } from '../_shared/FormRows.jsx';
import './styles.css';

export default function TrackCurrentIpc2152() {
  const [currentText, setCurrentText] = useState('1');
  const [tempRiseState, setTempRiseState] = useState({ text: '40', unit: '°C' });
  const [trackThicknessState, setTrackThicknessState] = useState({ text: '35', unit: 'µm' });
  const [boardThicknessState, setBoardThicknessState] = useState({ text: '1.6', unit: 'mm' });
  const [isPlaneText, setIsPlaneText] = useState('Yes');
  const [planeProxState, setPlaneProxState] = useState({ text: '1.6', unit: 'mm' });
  const [thermalCondText, setThermalCondText] = useState('0.20');
  const [widthUnit, setWidthUnit] = useState('mm');
  const [system, setSystem] = useState('metric');

  // Set every unit dropdown to the metric or imperial preset in one go. Imperial
  // uses oz (copper weight) for track thickness rather than mils. This only
  // switches the units — like the individual dropdowns, it reinterprets the
  // typed magnitudes rather than converting them.
  const applySystem = (sys) => {
    setSystem(sys);
    const u = sys === 'metric'
      ? { track: 'µm', pcb: 'mm', width: 'mm', temp: '°C' }
      : { track: 'oz', pcb: 'mil', width: 'mil', temp: '°F' };
    setTrackThicknessState((s) => ({ ...s, unit: u.track }));
    setBoardThicknessState((s) => ({ ...s, unit: u.pcb }));
    setPlaneProxState((s) => ({ ...s, unit: u.pcb }));
    setTempRiseState((s) => ({ ...s, unit: u.temp }));
    setWidthUnit(u.width);
  };

  const current = useMemo(() => parseCurrent(currentText), [currentText]);
  const tempRise = useMemo(() => parseNumber(tempRiseState.text), [tempRiseState.text]);
  const trackThickness = useMemo(() => parseNumber(trackThicknessState.text), [trackThicknessState.text]);
  const boardThickness = useMemo(() => parseNumber(boardThicknessState.text), [boardThicknessState.text]);
  const planeProx = useMemo(() => parseNumber(planeProxState.text), [planeProxState.text]);
  const thermalCond = useMemo(() => parseThermalCond(thermalCondText), [thermalCondText]);

  const isPlanePresent = isPlaneText === 'Yes';

  // Convert each input to SI once — used for both the calculation and the
  // out-of-range (extrapolation) checks.
  const currentSI = current.value;
  const tempRiseSI = tempRise.value * getUnit(DELTA_TEMP_UNITS, tempRiseState.unit).multiplier;
  const trackThicknessSI = trackThickness.value * getUnit(TRACK_THICKNESS_UNITS, trackThicknessState.unit).multiplier;
  const boardThicknessSI = boardThickness.value * getUnit(PCB_LENGTH_UNITS, boardThicknessState.unit).multiplier;
  const planeProxSI = planeProx.value * getUnit(PCB_LENGTH_UNITS, planeProxState.unit).multiplier;
  const thermalCondSI = thermalCond.value;

  // Extrapolation warnings (value outside the range the IPC-2152 graphs cover).
  const currentWarn = extrapolationWarning(EXTRAPOLATION_LIMITS.current, currentSI);
  const tempRiseWarn = extrapolationWarning(EXTRAPOLATION_LIMITS.tempRise, tempRiseSI);
  const trackThicknessWarn = extrapolationWarning(EXTRAPOLATION_LIMITS.trackThickness, trackThicknessSI);
  const boardThicknessWarn = extrapolationWarning(EXTRAPOLATION_LIMITS.boardThickness, boardThicknessSI);
  const thermalCondWarn = extrapolationWarning(EXTRAPOLATION_LIMITS.thermalCond, thermalCondSI);
  // Plane proximity: range check, plus an improvement over NinjaCalc — the
  // plane can't physically be further away than the board is thick, so flag it.
  let planeProxWarn = isPlanePresent ? extrapolationWarning(EXTRAPOLATION_LIMITS.planeProx, planeProxSI) : null;
  if (!planeProxWarn && isPlanePresent
      && Number.isFinite(planeProxSI) && Number.isFinite(boardThicknessSI)
      && planeProxSI > boardThicknessSI) {
    planeProxWarn = 'Plane proximity is greater than the board thickness, which is not physically possible (the plane lies within the board). Check your inputs.';
  }

  const anyExtrapolation = [currentWarn, tempRiseWarn, trackThicknessWarn,
    boardThicknessWarn, thermalCondWarn, planeProxWarn].some(Boolean);

  const inputs = [current, tempRise, trackThickness, boardThickness, thermalCond];
  if (isPlanePresent) inputs.push(planeProx);
  const allValid = inputs.every((p) => p.error === null);

  let r = { unadjustedArea: NaN, trackThicknessModifier: NaN, boardThicknessModifier: NaN,
    planeProximityModifier: NaN, thermalConductivityModifier: NaN,
    adjustedArea: NaN, minTrackWidth: NaN, error: null };
  if (allValid) {
    r = computeIpc2152({
      current: currentSI,
      tempRise: tempRiseSI,
      trackThickness: trackThicknessSI,
      boardThickness: boardThicknessSI,
      isPlanePresent,
      planeProximity: planeProxSI,
      thermalConductivity: thermalCondSI,
    });
  }

  return (
    <div class="calc-form track-2152">
      <div class="calc-form__legend">
        Compute the minimum PCB track width to carry a given DC current per IPC-2152.
        More accurate than IPC-2221A but needs board thickness, plane proximity and
        substrate thermal conductivity. Pick the unit for each dimension from the dropdown.
        Inputs highlighted <span class="track-2152__warn-text">amber</span> are outside the range
        the IPC-2152 graphs cover, so the result is extrapolated and less reliable.
      </div>
      <div class="calc-form__toolbar">
        <button
          type="button"
          class="calc-form__toggle"
          onClick={() => applySystem(system === 'metric' ? 'imperial' : 'metric')}
        >
          Switch to {system === 'metric' ? 'imperial' : 'metric'} units
        </button>
      </div>
      <div class="calc-form__rows">
        <InputRow label="I"                       value={currentText}        onInput={setCurrentText}        placeholder="1"    suffix="A" parsed={current} warning={currentWarn}
          help="The current you want the PCB track to be able to handle."/>
        <UnitInputRow label={<>ΔT</>} value={tempRiseState.text}
          onInput={(t) => setTempRiseState((s) => ({ ...s, text: t }))}
          unit={tempRiseState.unit}
          onUnitChange={(u) => setTempRiseState((s) => ({ ...s, unit: u }))}
          units={DELTA_TEMP_UNITS} placeholder="40" parsed={tempRise} warning={tempRiseWarn}
          help="The maximum desired temperature rise due to the current flowing through the track. 20–40 °C is a common value."/>
        <UnitInputRow label={<>t<sub>track</sub></>} value={trackThicknessState.text}
          onInput={(t) => setTrackThicknessState((s) => ({ ...s, text: t }))}
          unit={trackThicknessState.unit}
          onUnitChange={(u) => setTrackThicknessState((s) => ({ ...s, unit: u }))}
          units={TRACK_THICKNESS_UNITS} placeholder="35" parsed={trackThickness} warning={trackThicknessWarn}
          help="The thickness (height) of the track — equal to the thickness of the copper layer the track is on (a.k.a. the copper weight). Common values are 17.5 µm (0.5 oz) or 35 µm (1 oz). Range covered by IPC-2152: 17.5 µm – 105 µm (0.5–3 oz)."/>
        <UnitInputRow label={<>t<sub>board</sub></>} value={boardThicknessState.text}
          onInput={(t) => setBoardThicknessState((s) => ({ ...s, text: t }))}
          unit={boardThicknessState.unit}
          onUnitChange={(u) => setBoardThicknessState((s) => ({ ...s, unit: u }))}
          units={PCB_LENGTH_UNITS} placeholder="1.6" parsed={boardThickness} warning={boardThicknessWarn}
          help="The total thickness of the PCB the track is on. A standard PCB thickness is 1.6 mm. Range covered by IPC-2152: 0.72 mm – 2.36 mm."/>
        <SelectRow label="Plane?"                 value={isPlaneText}        options={['Yes','No']}          onChange={setIsPlaneText}
          help='Set to "Yes" if there is a copper plane either above or below the current-carrying track and then enter the distance to it. If there is no plane, set to "No" and the plane-proximity input is hidden.'/>
        {isPlanePresent && (
          <UnitInputRow label="Plane prox"        value={planeProxState.text}
            onInput={(t) => setPlaneProxState((s) => ({ ...s, text: t }))}
            unit={planeProxState.unit}
            onUnitChange={(u) => setPlaneProxState((s) => ({ ...s, unit: u }))}
            units={PCB_LENGTH_UNITS} placeholder="1.6" parsed={planeProx} warning={planeProxWarn}
            help="The distance from the current-carrying track to the closest copper plane. On a 2-layer 1.6 mm PCB with ground on the opposite side this is 1.6 mm. For 4+ layer boards it is usually much less. Range covered by IPC-2152: 144 µm – 2.40 mm."/>
        )}
        <InputRow label={<>κ</>}                  value={thermalCondText}    onInput={setThermalCondText}    placeholder="0.20" suffix="W/m·K" parsed={thermalCond} warning={thermalCondWarn}
          help="The thermal conductivity of the PCB substrate. Hard to determine in general, but for most FR-4 PCBs this is around 0.20 W·m⁻¹·K⁻¹. Range covered by IPC-2152: 0.18 – 0.34 W/m·K."/>

        <UnitOutputRow label={<>w<sub>min</sub></>} value={r.minTrackWidth} units={WIDTH_UNITS}
          unit={widthUnit} onUnitChange={setWidthUnit} error={r.error}
          help="The minimum track width needed to carry the specified current without exceeding the given temperature rise."/>
        {anyExtrapolation && !r.error && (
          <div class="calc-form__row">
            <span class="calc-form__label"></span>
            <div class="calc-form__output-note">
              ⚠ This result relies on extrapolation beyond the IPC-2152 data (see the amber input(s) above) and is less reliable.
            </div>
          </div>
        )}

        <div class="track-2152__divider">Intermediate values</div>

        <OutputRow label="A unadj."               value={r.unadjustedArea}           format={formatArea}    error={r.error}
          help="The unadjusted cross-sectional area read from the Universal Chart. Gets multiplied by the modifiers below to give the adjusted area."/>
        <OutputRow label="t mod"                  value={r.trackThicknessModifier}   format={formatRatio}   error={r.error}
          help="Multiplier applied to the cross-sectional area based on the track thickness."/>
        <OutputRow label="board mod"              value={r.boardThicknessModifier}   format={formatRatio}   error={r.error}
          help="Multiplier applied to the cross-sectional area based on the total PCB thickness."/>
        <OutputRow label="plane mod"              value={r.planeProximityModifier}   format={formatRatio}   error={r.error}
          help="Multiplier applied to the cross-sectional area based on how close a copper plane is to the current-carrying track."/>
        <OutputRow label="κ mod"                  value={r.thermalConductivityModifier} format={formatRatio} error={r.error}
          help="Multiplier applied to the cross-sectional area based on the substrate thermal conductivity."/>
        <OutputRow label="A adj."                 value={r.adjustedArea}             format={formatArea}    error={r.error}
          help="The adjusted cross-sectional area — unadjusted area multiplied by all four modifiers. Divided by track thickness to get the minimum width."/>
      </div>
    </div>
  );
}

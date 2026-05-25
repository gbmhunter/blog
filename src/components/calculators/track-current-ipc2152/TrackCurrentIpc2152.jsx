import { useState, useMemo } from 'preact/hooks';
import {
  parseCurrent, parseLength, parseTemp, parseThermalCond,
  formatLength, formatArea, formatRatio,
  computeIpc2152,
} from './calc.js';
import { InputRow, OutputRow, SelectRow } from '../_shared/FormRows.jsx';
import './styles.css';

export default function TrackCurrentIpc2152() {
  const [currentText, setCurrentText] = useState('1A');
  const [tempRiseText, setTempRiseText] = useState('40');
  const [trackThicknessText, setTrackThicknessText] = useState('35um');
  const [boardThicknessText, setBoardThicknessText] = useState('1.6mm');
  const [isPlaneText, setIsPlaneText] = useState('Yes');
  const [planeProxText, setPlaneProxText] = useState('1.6mm');
  const [thermalCondText, setThermalCondText] = useState('0.20');

  const current = useMemo(() => parseCurrent(currentText), [currentText]);
  const tempRise = useMemo(() => parseTemp(tempRiseText), [tempRiseText]);
  const trackThickness = useMemo(() => parseLength(trackThicknessText), [trackThicknessText]);
  const boardThickness = useMemo(() => parseLength(boardThicknessText), [boardThicknessText]);
  const planeProx = useMemo(() => parseLength(planeProxText), [planeProxText]);
  const thermalCond = useMemo(() => parseThermalCond(thermalCondText), [thermalCondText]);

  const isPlanePresent = isPlaneText === 'Yes';
  const inputs = [current, tempRise, trackThickness, boardThickness, thermalCond];
  if (isPlanePresent) inputs.push(planeProx);
  const allValid = inputs.every((p) => p.error === null);

  let r = { unadjustedArea: NaN, trackThicknessModifier: NaN, boardThicknessModifier: NaN,
    planeProximityModifier: NaN, thermalConductivityModifier: NaN,
    adjustedArea: NaN, minTrackWidth: NaN, error: null };
  if (allValid) {
    r = computeIpc2152({
      current: current.value,
      tempRise: tempRise.value,
      trackThickness: trackThickness.value,
      boardThickness: boardThickness.value,
      isPlanePresent,
      planeProximity: planeProx.value,
      thermalConductivity: thermalCond.value,
    });
  }

  return (
    <div class="calc-form track-2152">
      <div class="calc-form__legend">
        Compute the minimum PCB track width to carry a given DC current per IPC-2152.
        More accurate than IPC-2221A but needs board thickness, plane proximity and
        substrate thermal conductivity. Length inputs accept metric prefixes (e.g. <code>35um</code>, <code>1.6mm</code>).
      </div>
      <div class="calc-form__rows">
        <InputRow label="I"                       value={currentText}        onInput={setCurrentText}        placeholder="1"    suffix="A" parsed={current}
          help="The current you want the PCB track to be able to handle."/>
        <InputRow label={<>ΔT</>}                 value={tempRiseText}       onInput={setTempRiseText}       placeholder="40"   suffix="°C" parsed={tempRise}
          help="The maximum desired temperature rise due to the current flowing through the track. 20–40 °C is a common value."/>
        <InputRow label={<>t<sub>track</sub></>}  value={trackThicknessText} onInput={setTrackThicknessText} placeholder="35um" parsed={trackThickness}
          help="The thickness (height) of the track — equal to the thickness of the copper layer the track is on (a.k.a. the copper weight). Common values are 17.5 µm (0.5 oz) or 35 µm (1 oz)."/>
        <InputRow label={<>t<sub>board</sub></>}  value={boardThicknessText} onInput={setBoardThicknessText} placeholder="1.6mm" parsed={boardThickness}
          help="The total thickness of the PCB the track is on. A standard PCB thickness is 1.6 mm."/>
        <SelectRow label="Plane?"                 value={isPlaneText}        options={['Yes','No']}          onChange={setIsPlaneText}
          help='Set to "Yes" if there is a copper plane either above or below the current-carrying track and then enter the distance to it. If there is no plane, set to "No" and the plane-proximity input is hidden.'/>
        {isPlanePresent && (
          <InputRow label="Plane prox"            value={planeProxText}      onInput={setPlaneProxText}      placeholder="1.6mm" parsed={planeProx}
            help="The distance from the current-carrying track to the closest copper plane. On a 2-layer 1.6 mm PCB with ground on the opposite side this is 1.6 mm. For 4+ layer boards it is usually much less."/>
        )}
        <InputRow label={<>κ</>}                  value={thermalCondText}    onInput={setThermalCondText}    placeholder="0.20" suffix="W/m·K" parsed={thermalCond}
          help="The thermal conductivity of the PCB substrate. Hard to determine in general, but for most FR-4 PCBs this is around 0.20 W·m⁻¹·K⁻¹."/>

        <OutputRow label={<>w<sub>min</sub></>}   value={r.minTrackWidth}            format={formatLength}  error={r.error}
          help="The minimum track width needed to carry the specified current without exceeding the given temperature rise."/>

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

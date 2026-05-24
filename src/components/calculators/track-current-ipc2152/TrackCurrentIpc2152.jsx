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
        <InputRow label="I"                                  value={currentText}        onInput={setCurrentText}        placeholder="1A"   parsed={current}/>
        <InputRow label={<>ΔT</>}                            value={tempRiseText}       onInput={setTempRiseText}       placeholder="40"   suffix="°C" parsed={tempRise}/>
        <InputRow label={<>t<sub>track</sub></>}             value={trackThicknessText} onInput={setTrackThicknessText} placeholder="35um" parsed={trackThickness}/>
        <InputRow label={<>t<sub>board</sub></>}             value={boardThicknessText} onInput={setBoardThicknessText} placeholder="1.6mm" parsed={boardThickness}/>
        <SelectRow label="Plane?"                            value={isPlaneText}        options={['Yes','No']}          onChange={setIsPlaneText}/>
        {isPlanePresent && (
          <InputRow label="Plane prox"                        value={planeProxText}      onInput={setPlaneProxText}      placeholder="1.6mm" parsed={planeProx}/>
        )}
        <InputRow label={<>κ</>}                              value={thermalCondText}    onInput={setThermalCondText}    placeholder="0.20" suffix="W/m·K" parsed={thermalCond}/>

        <OutputRow label={<>w<sub>min</sub></>}              value={r.minTrackWidth}            format={formatLength}  error={r.error}/>
        <OutputRow label="Area"                              value={r.adjustedArea}             format={formatArea}    error={r.error}/>
        <OutputRow label="t mod"                             value={r.trackThicknessModifier}   format={formatRatio}   error={r.error}/>
        <OutputRow label="board mod"                         value={r.boardThicknessModifier}   format={formatRatio}   error={r.error}/>
        <OutputRow label="plane mod"                         value={r.planeProximityModifier}   format={formatRatio}   error={r.error}/>
        <OutputRow label="κ mod"                             value={r.thermalConductivityModifier} format={formatRatio} error={r.error}/>
      </div>
    </div>
  );
}

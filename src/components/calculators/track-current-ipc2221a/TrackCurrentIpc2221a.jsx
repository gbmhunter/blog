import { useState, useMemo } from 'preact/hooks';
import { parseCurrent, parseLength, parseTemp, formatLength, computeIpc2221a } from './calc.js';
import { InputRow, OutputRow, SelectRow } from '../_shared/FormRows.jsx';
import './styles.css';

export default function TrackCurrentIpc2221a() {
  const [currentText, setCurrentText] = useState('1A');
  const [tempRiseText, setTempRiseText] = useState('40');
  const [trackThicknessText, setTrackThicknessText] = useState('35um');
  const [layer, setLayer] = useState('External');

  const current = useMemo(() => parseCurrent(currentText), [currentText]);
  const tempRise = useMemo(() => parseTemp(tempRiseText), [tempRiseText]);
  const trackThickness = useMemo(() => parseLength(trackThicknessText), [trackThicknessText]);

  const allValid = [current, tempRise, trackThickness].every((p) => p.error === null);
  let r = { width: NaN, error: null };
  if (allValid) r = computeIpc2221a({
    current: current.value, tempRise: tempRise.value, trackThickness: trackThickness.value, layer,
  });

  return (
    <div class="calc-form track-2221a">
      <div class="calc-form__legend">
        Compute the minimum PCB track width for a given DC current using the older IPC-2221A
        standard. Simpler than IPC-2152 (no plane-proximity / substrate properties needed) but
        less accurate. Length inputs accept metric prefixes (e.g. <code>35um</code>).
      </div>
      <div class="calc-form__rows">
        <InputRow label="I"                                  value={currentText}        onInput={setCurrentText}        placeholder="1"  suffix="A" parsed={current}/>
        <InputRow label={<>ΔT</>}                            value={tempRiseText}       onInput={setTempRiseText}       placeholder="40" suffix="°C" parsed={tempRise}/>
        <InputRow label={<>t<sub>track</sub></>}             value={trackThicknessText} onInput={setTrackThicknessText} placeholder="35um" parsed={trackThickness}/>
        <SelectRow label="Layer"                             value={layer}              options={['External','Internal']} onChange={setLayer}/>

        <OutputRow label={<>w<sub>min</sub></>}              value={r.width}           format={formatLength} error={r.error}/>
      </div>
    </div>
  );
}

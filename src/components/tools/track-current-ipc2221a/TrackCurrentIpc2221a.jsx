import { useState, useMemo } from 'preact/hooks';
import {
  parseCurrent, parseLength, parseTemp, formatLength,
  EXTRAPOLATION_LIMITS, extrapolationWarning,
  computeIpc2221a,
} from './calc.js';
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

  // Extrapolation warnings (value outside the range the IPC-2221A chart covers).
  const currentWarn = extrapolationWarning(EXTRAPOLATION_LIMITS.current, current.value);
  const tempRiseWarn = extrapolationWarning(EXTRAPOLATION_LIMITS.tempRise, tempRise.value);
  const trackThicknessWarn = extrapolationWarning(EXTRAPOLATION_LIMITS.trackThickness, trackThickness.value);
  const anyExtrapolation = [currentWarn, tempRiseWarn, trackThicknessWarn].some(Boolean);

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
        Inputs highlighted <span class="track-2221a__warn-text">amber</span> are outside the range
        the IPC-2221A chart covers, so the result is extrapolated and less reliable.
      </div>
      <div class="calc-form__rows">
        <InputRow label="I"                       value={currentText}        onInput={setCurrentText}        placeholder="1"  suffix="A" parsed={current} warning={currentWarn}
          help="The current you want the PCB track to be able to handle. Range covered by IPC-2221A: up to 35 A."/>
        <InputRow label={<>ΔT</>}                 value={tempRiseText}       onInput={setTempRiseText}       placeholder="40" suffix="°C" parsed={tempRise} warning={tempRiseWarn}
          help="The maximum desired temperature rise due to the current flowing through the track. 20–40 °C is a common value. Range covered by IPC-2221A: 10–100 °C."/>
        <InputRow label={<>t<sub>track</sub></>}  value={trackThicknessText} onInput={setTrackThicknessText} placeholder="35um" parsed={trackThickness} warning={trackThicknessWarn}
          help="The thickness (height) of the track — equal to the copper-layer thickness (a.k.a. copper weight). Common values are 17.5 µm (0.5 oz) or 35 µm (1 oz). Range covered by IPC-2221A: 17.5 µm – 105 µm (0.5–3 oz)."/>
        <SelectRow label="Layer"                  value={layer}              options={['External','Internal']} onChange={setLayer}
          help='If the track is on the top or bottom copper layer of the PCB, set this to "External". For a buried inner-layer track, set to "Internal".'/>

        <OutputRow label={<>w<sub>min</sub></>}   value={r.width}            format={formatLength} error={r.error}
          help="The minimum track width needed to carry the specified current without exceeding the given temperature rise."/>
        {anyExtrapolation && !r.error && (
          <div class="calc-form__row">
            <span class="calc-form__label"></span>
            <div class="calc-form__output-note">
              ⚠ This result relies on extrapolation beyond the IPC-2221A chart (see the amber input(s) above) and is less reliable.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

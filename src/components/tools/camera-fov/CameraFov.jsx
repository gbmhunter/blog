import { useState } from 'preact/hooks';
import {
  PRESETS, LENS_PRESETS, presetSensorFields, parsePositive, compute,
  DISTANCE_UNITS, formatLen, formatDeg, formatUm, formatPxPerMm,
} from './calc.js';
import { InputRow, OutputRow, SelectRow, UnitInputRow } from '../_shared/FormRows.jsx';
import './styles.css';

const DEFAULT_PRESET = PRESETS.find((p) => p.label.includes('IMX477'));

const SOLVE_HELP = {
  focal: 'The focal length of the lens.',
  fovWidth: 'The width of the scene captured by the sensor at the working distance.',
};

export default function CameraFov() {
  const [preset, setPreset] = useState(DEFAULT_PRESET.label);
  const [sensor, setSensor] = useState(presetSensorFields(DEFAULT_PRESET));
  const [solveFor, setSolveFor] = useState('fovWidth');
  const [lensPreset, setLensPreset] = useState('Custom');
  const [focalText, setFocalText] = useState('6');
  const [fovWidthText, setFovWidthText] = useState('500');
  const [distText, setDistText] = useState('500');
  const [distUnit, setDistUnit] = useState('mm');

  const onPreset = (label) => {
    setPreset(label);
    const p = PRESETS.find((x) => x.label === label);
    if (p && p.resH) setSensor(presetSensorFields(p));
  };

  // Editing any sensor field switches the preset back to Custom.
  const editSensor = (key) => (text) => {
    setSensor((prev) => ({ ...prev, [key]: text }));
    setPreset('Custom');
  };

  const onLensPreset = (label) => {
    setLensPreset(label);
    const lens = LENS_PRESETS.find((x) => x.label === label);
    if (lens && lens.focal) {
      setFocalText(String(lens.focal));
      // A known lens means the focal length is a given, so solve for the FoV.
      setSolveFor('fovWidth');
    }
  };

  const selectedLens = LENS_PRESETS.find((x) => x.label === lensPreset);

  // Editing the focal length switches the lens preset back to Custom.
  const editFocal = (text) => {
    setFocalText(text);
    setLensPreset('Custom');
  };

  const sensorW = parsePositive(sensor.sensorW);
  const sensorH = parsePositive(sensor.sensorH);
  const resH = parsePositive(sensor.resH);
  const resV = parsePositive(sensor.resV);
  const focal = parsePositive(focalText);
  const fovWidth = parsePositive(fovWidthText);
  const dist = parsePositive(distText);
  const distMm = dist.value * (DISTANCE_UNITS.find((u) => u.label === distUnit)?.multiplier ?? 1);

  const knowns = [sensorW, sensorH, resH, resV, dist,
    solveFor === 'focal' ? fovWidth : focal];
  const allValid = knowns.every((p) => p.error === null);

  const r = allValid
    ? compute({
        solveFor,
        sensorW: sensorW.value, sensorH: sensorH.value,
        resH: resH.value, resV: resV.value,
        focal: focal.value, fovWidth: fovWidth.value,
        distance: distMm,
      })
    : { error: null };

  // One row of the focal-length ↔ FoV-width solve pair. The radio marks which
  // one is computed; the other is an editable input.
  const solveRow = (key, label, text, setText, parsed, computedValue, suffix) => {
    const isTarget = key === solveFor;
    return (
      <div class="calc-form__row calc-form__row--radio" key={key}>
        <label class="calc-form__radio" title="Solve for this value">
          <input
            type="radio"
            name="camera-fov-target"
            checked={isTarget}
            onChange={() => {
              setSolveFor(key);
              // Solving for the focal length makes a fixed lens preset meaningless.
              if (key === 'focal') setLensPreset('Custom');
            }}
          />
        </label>
        <span class="calc-form__label">{label}</span>
        {isTarget ? (
          <div class="calc-form__input-cell">
            <div class="calc-form__output">
              {r.error ? (
                <span class="calc-form__output-error">{r.error}</span>
              ) : Number.isFinite(computedValue) ? (
                <span class="calc-form__output-value">{formatLen(computedValue)}</span>
              ) : (
                <span class="calc-form__output-empty">—</span>
              )}
            </div>
          </div>
        ) : (
          <div class="calc-form__input-cell">
            <div class="calc-form__input-with-suffix">
              <input
                type="text"
                value={text}
                onInput={(e) => setText(e.currentTarget.value)}
                spellcheck={false}
                title={SOLVE_HELP[key]}
                class={parsed.error ? 'calc-form__input calc-form__input--error' : 'calc-form__input'}
              />
              <span class="calc-form__suffix">{suffix}</span>
            </div>
            {parsed.error && <div class="calc-form__input-error">{parsed.error}</div>}
          </div>
        )}
        <div class="calc-form__help">{SOLVE_HELP[key]}</div>
      </div>
    );
  };

  return (
    <div class="calc-form camera-fov">
      <div class="calc-form__legend">
        Calculate the field of view and on-target spatial resolution for a camera sensor and
        lens, or solve in reverse for the focal length needed to cover a required scene width.
        Select the radio button next to the value you want to solve for.
      </div>
      <div class="calc-form__rows">
        <div class="camera-fov__section">Sensor</div>
        <SelectRow
          label="Preset"
          value={preset}
          options={PRESETS.map((p) => p.label)}
          onChange={onPreset}
          help="Fills in the sensor dimensions and resolution for some popular embedded camera sensors. Editing any sensor field switches back to Custom."
        />
        <InputRow label="Width" value={sensor.sensorW} onInput={editSensor('sensorW')}
          placeholder="6.287" suffix="mm" parsed={sensorW}
          help="The width of the sensor's active pixel array." />
        <InputRow label="Height" value={sensor.sensorH} onInput={editSensor('sensorH')}
          placeholder="4.712" suffix="mm" parsed={sensorH}
          help="The height of the sensor's active pixel array." />
        <InputRow label="Res. (H)" value={sensor.resH} onInput={editSensor('resH')}
          placeholder="4056" suffix="px" parsed={resH}
          help="The number of pixels across the sensor (horizontal resolution)." />
        <InputRow label="Res. (V)" value={sensor.resV} onInput={editSensor('resV')}
          placeholder="3040" suffix="px" parsed={resV}
          help="The number of pixels down the sensor (vertical resolution)." />
        <OutputRow label="Pixel size" value={r.pixelUm} format={formatUm}
          help="The pixel pitch, derived from sensor width ÷ horizontal resolution. Bigger pixels gather more light." />

        <div class="camera-fov__section">Lens and scene</div>
        <SelectRow
          label="Lens"
          value={lensPreset}
          options={LENS_PRESETS.map((p) => p.label)}
          onChange={onLensPreset}
          help="Fills in the focal length from the Arducam M12 lens set (LK005). Editing the focal length switches back to Custom."
        />
        {selectedLens?.warn && (
          <div class="calc-form__row">
            <span class="calc-form__label"></span>
            <div class="calc-form__input-warning">
              Wide-angle/fisheye lens: barrel distortion makes the real field of view
              considerably wider than the rectilinear thin-lens model used here predicts.
            </div>
          </div>
        )}
        <UnitInputRow label="Distance" value={distText} onInput={setDistText}
          unit={distUnit} onUnitChange={setDistUnit} units={DISTANCE_UNITS}
          placeholder="500" parsed={dist}
          help="The working distance from the lens to the object being imaged." />
        {solveRow('focal', 'f', focalText, editFocal, focal, r.focal, 'mm')}
        {solveRow('fovWidth', 'FoV W', fovWidthText, setFovWidthText, fovWidth, r.fovWidth, 'mm')}

        <div class="camera-fov__section">Results</div>
        <OutputRow label="FoV height" value={r.error ? NaN : r.fovHeight} format={formatLen}
          help="The height of the scene captured at the working distance." />
        <OutputRow label="HFoV" value={r.error ? NaN : r.hFovDeg} format={formatDeg}
          help="The horizontal angular field of view (infinity focus)." />
        <OutputRow label="VFoV" value={r.error ? NaN : r.vFovDeg} format={formatDeg}
          help="The vertical angular field of view (infinity focus)." />
        <OutputRow label="DFoV" value={r.error ? NaN : r.dFovDeg} format={formatDeg}
          help="The diagonal angular field of view (infinity focus). Lens datasheets usually quote this one." />
        <OutputRow label="On target" value={r.error ? NaN : r.mmPerPx} format={formatLen}
          help="The spatial resolution on the object: the width of scene covered by one pixel. Key number for machine vision and inspection tasks." />
        <OutputRow label="Px density" value={r.error ? NaN : r.pxPerMm} format={formatPxPerMm}
          help="The inverse of the above: how many pixels land on each millimetre of the object." />
      </div>
      <div class="calc-form__note">
        Uses the thin-lens model: scene width = sensor width × (distance − f) / f. Real lenses
        (especially wide-angle ones with distortion) will deviate slightly — treat results as
        good first-pass numbers for lens selection, and check the lens's image circle covers
        the sensor.
      </div>
    </div>
  );
}

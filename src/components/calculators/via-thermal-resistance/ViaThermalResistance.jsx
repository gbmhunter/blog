import { useState, useMemo } from 'preact/hooks';
import {
  parseLength, parseThermalCond,
  formatArea, formatThermalR,
  computeViaThermalR,
} from './calc.js';
import { InputRow, OutputRow } from '../_shared/FormRows.jsx';
import './styles.css';

export default function ViaThermalResistance() {
  const [diaText, setDiaText] = useState('0.3mm');
  const [platingText, setPlatingText] = useState('35um');
  const [heightText, setHeightText] = useState('1.6mm');
  const [kText, setKText] = useState('401');

  const dia = useMemo(() => parseLength(diaText), [diaText]);
  const plating = useMemo(() => parseLength(platingText), [platingText]);
  const height = useMemo(() => parseLength(heightText), [heightText]);
  const k = useMemo(() => parseThermalCond(kText), [kText]);

  const allValid = [dia, plating, height, k].every((p) => p.error === null);
  let r = { area: NaN, thermalR: NaN, error: null };
  if (allValid) r = computeViaThermalR({
    viaDiameter: dia.value, platingThickness: plating.value, viaHeight: height.value, thermalCond: k.value,
  });

  return (
    <div class="calc-form via-thermal">
      <div class="calc-form__legend">
        Thermal resistance of a PCB via (top to bottom). Models the via as a hollow copper cylinder.
        Default copper thermal conductivity of 401&nbsp;W/m·K is appropriate for via plating.
      </div>
      <div class="calc-form__rows">
        <InputRow label={<>d<sub>via</sub></>}           value={diaText}      onInput={setDiaText}     placeholder="0.3mm" parsed={dia}/>
        <InputRow label={<>t<sub>plating</sub></>}      value={platingText}  onInput={setPlatingText} placeholder="35um" parsed={plating}/>
        <InputRow label={<>h<sub>via</sub></>}          value={heightText}   onInput={setHeightText}  placeholder="1.6mm" parsed={height}/>
        <InputRow label={<>λ<sub>Cu</sub></>}           value={kText}        onInput={setKText}       placeholder="401" suffix="W/m·K" parsed={k}/>

        <OutputRow label={<>A<sub>via</sub></>}         value={r.area}       format={formatArea}      error={r.error}/>
        <OutputRow label={<>θ<sub>via</sub></>}         value={r.thermalR}   format={formatThermalR}  error={r.error}/>
      </div>
    </div>
  );
}

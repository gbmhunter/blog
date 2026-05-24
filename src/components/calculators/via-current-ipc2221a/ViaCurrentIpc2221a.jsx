import { useState, useMemo } from 'preact/hooks';
import {
  parseLength, parseTemp, parseResistivity, parseThermalCond,
  formatArea, formatResistance, formatThermalR, formatCurrent,
  computeViaCurrent,
} from './calc.js';
import { InputRow, OutputRow } from '../_shared/FormRows.jsx';
import './styles.css';

export default function ViaCurrentIpc2221a() {
  const [diaText, setDiaText] = useState('1mm');
  const [platingText, setPlatingText] = useState('20um');
  const [lenText, setLenText] = useState('1.6mm');
  const [tempText, setTempText] = useState('40');
  const [rhoText, setRhoText] = useState('19e-9');
  const [kText, setKText] = useState('401.8');

  const dia = useMemo(() => parseLength(diaText), [diaText]);
  const plating = useMemo(() => parseLength(platingText), [platingText]);
  const len = useMemo(() => parseLength(lenText), [lenText]);
  const tempRise = useMemo(() => parseTemp(tempText), [tempText]);
  const rho = useMemo(() => parseResistivity(rhoText), [rhoText]);
  const k = useMemo(() => parseThermalCond(kText), [kText]);

  const allValid = [dia, plating, len, tempRise, rho, k].every((p) => p.error === null);
  let r = { area: NaN, electricalR: NaN, thermalR: NaN, currentLimit: NaN, error: null };
  if (allValid) r = computeViaCurrent({
    finishedHoleDiameter: dia.value, platingThickness: plating.value, viaLength: len.value,
    tempRise: tempRise.value, resistivity: rho.value, thermalConductivity: k.value,
  });

  return (
    <div class="calc-form via-current">
      <div class="calc-form__legend">
        Compute the IPC-2221A maximum current, cross-sectional area, electrical and thermal
        resistance of a PCB via. Default resistivity (19 nΩ·m) and copper thermal conductivity
        (401.8 W/m·K) match typical plated copper values.
      </div>
      <div class="calc-form__rows">
        <InputRow label={<>d<sub>via</sub></>}             value={diaText}     onInput={setDiaText}      placeholder="1mm" parsed={dia}/>
        <InputRow label={<>t<sub>plating</sub></>}        value={platingText}  onInput={setPlatingText} placeholder="20um" parsed={plating}/>
        <InputRow label={<>l<sub>via</sub></>}            value={lenText}      onInput={setLenText}     placeholder="1.6mm" parsed={len}/>
        <InputRow label={<>ΔT</>}                         value={tempText}     onInput={setTempText}    placeholder="40" suffix="°C" parsed={tempRise}/>
        <InputRow label={<>ρ</>}                          value={rhoText}      onInput={setRhoText}     placeholder="19e-9" suffix="Ω·m" parsed={rho}/>
        <InputRow label="κ"                                value={kText}        onInput={setKText}       placeholder="401.8" suffix="W/m·K" parsed={k}/>

        <OutputRow label="A"                               value={r.area}          format={formatArea}       error={r.error}/>
        <OutputRow label="R"                               value={r.electricalR}   format={formatResistance} error={r.error}/>
        <OutputRow label={<>R<sub>θ</sub></>}             value={r.thermalR}      format={formatThermalR}   error={r.error}/>
        <OutputRow label={<>I<sub>max</sub></>}           value={r.currentLimit}  format={formatCurrent}    error={r.error}/>
      </div>
    </div>
  );
}

import { useState, useMemo } from 'preact/hooks';
import { InputRow } from '../_shared/FormRows.jsx';
import { formatValueWithPrefix } from 'src/js/metric-prefix.js';
import {
  parseCapacity, parseCurrent, parseNumber, parseTempC, checkRange,
  computeBatteryLife, formatDuration,
} from './calc.js';
import './styles.css';

const DEFAULTS = {
  capacity: '1000',
  activeI: '20m',
  duty: '0',
  sleepI: '50u',
  pcmI: '5u',
  selfDis: '2',
  usable: '80',
  temp: '25',
  eol: '100',
};

export default function BatteryLife() {
  const [v, setV] = useState(DEFAULTS);
  const set = (key) => (text) => setV((prev) => ({ ...prev, [key]: text }));

  const capacity = useMemo(() => parseCapacity(v.capacity), [v.capacity]);
  const activeI = useMemo(() => parseCurrent(v.activeI), [v.activeI]);
  const duty = useMemo(() => checkRange(parseNumber(v.duty), { min: 0, max: 100 }), [v.duty]);
  const sleepI = useMemo(() => parseCurrent(v.sleepI), [v.sleepI]);
  const pcmI = useMemo(() => parseCurrent(v.pcmI), [v.pcmI]);
  const selfDis = useMemo(() => checkRange(parseNumber(v.selfDis), { min: 0, max: 100, incMax: false }), [v.selfDis]);
  const usable = useMemo(() => checkRange(parseNumber(v.usable), { min: 0, max: 100, incMin: false }), [v.usable]);
  const temp = useMemo(() => parseTempC(v.temp), [v.temp]);
  const eol = useMemo(() => checkRange(parseNumber(v.eol), { min: 0, max: 100, incMin: false }), [v.eol]);

  const parsed = [capacity, activeI, duty, sleepI, pcmI, selfDis, usable, temp, eol];
  const allValid = parsed.every((p) => p.error === null);

  const result = useMemo(() => {
    if (!allValid) return null;
    return computeBatteryLife({
      capacity_mAh: capacity.value,
      activeA: activeI.value,
      dutyPct: duty.value,
      sleepA: sleepI.value,
      pcmA: pcmI.value,
      selfDisPct: selfDis.value,
      usablePct: usable.value,
      tempC: temp.value,
      eolPct: eol.value,
    });
  }, [allValid, capacity, activeI, duty, sleepI, pcmI, selfDis, usable, temp, eol]);

  const bd = result?.breakdown;

  return (
    <div class="calc-form battery-life">
      <div class="calc-form__legend">
        Estimate how long a battery will last, simulated month-by-month. Each month self-discharge
        removes a percentage of the <em>remaining</em> charge, then the load and protection-circuit
        (PCM) currents draw a fixed amount. The battery is "dead" once the usable capacity is spent.
      </div>

      <div class="calc-form__rows">
        <InputRow label="Capacity" value={v.capacity} onInput={set('capacity')} placeholder="1000"
          suffix="mAh" parsed={capacity}
          help="Rated cell capacity." />
        <InputRow label={<>I<sub>active</sub></>} value={v.activeI} onInput={set('activeI')} placeholder="20m"
          suffix="A" parsed={activeI}
          help="Current the load draws while active/awake. Only used when the duty cycle is above 0%." />
        <InputRow label="Duty" value={v.duty} onInput={set('duty')} placeholder="0"
          suffix="%" parsed={duty}
          help="Percentage of time the load is active. 0% means the load is always in its sleep state." />
        <InputRow label={<>I<sub>sleep</sub></>} value={v.sleepI} onInput={set('sleepI')} placeholder="50u"
          suffix="A" parsed={sleepI}
          help="Current the load draws while idle/asleep (the average load equals this when duty = 0%)." />
        <InputRow label={<>I<sub>PCM</sub></>} value={v.pcmI} onInput={set('pcmI')} placeholder="5u"
          suffix="A" parsed={pcmI}
          help="Quiescent current of the battery's protection circuit module. Always drawn, on top of the load." />
        <InputRow label="Self-dis." value={v.selfDis} onInput={set('selfDis')} placeholder="2"
          suffix="%/mo" parsed={selfDis}
          help="Self-discharge per month, as a percentage of remaining charge, at 25 °C." />
        <InputRow label="Usable" value={v.usable} onInput={set('usable')} placeholder="80"
          suffix="%" parsed={usable}
          help="Fraction of capacity actually extractable before the cut-off voltage is hit. Li-ion is rarely run down to 0%." />
        <InputRow label="Temp." value={v.temp} onInput={set('temp')} placeholder="25"
          suffix="°C" parsed={temp}
          help="Ambient temperature. Self-discharge roughly doubles for every +10 °C above 25 °C." />
        <InputRow label="EOL cap." value={v.eol} onInput={set('eol')} placeholder="100"
          suffix="%" parsed={eol}
          help="Capacity remaining relative to rated, to model an aged cell (e.g. 80% near end-of-life). Use 100% for a fresh cell." />
      </div>

      {result ? (
        <div class="battery-life__results">
          <div class="battery-life__headline">
            <span class="battery-life__headline-label">Estimated lifetime</span>
            <span class="battery-life__headline-value">{formatDuration(result.lifetimeHours)}</span>
          </div>

          {result.warning && <div class="battery-life__warning">{result.warning}</div>}

          {bd && (bd.load_mAh + bd.pcm_mAh + bd.self_mAh) > 0 && (
            <div class="battery-life__breakdown">
              <div class="battery-life__bar" role="img"
                aria-label="Breakdown of where the usable charge goes">
                <span class="battery-life__seg battery-life__seg--load"
                  style={{ width: `${bd.loadFrac * 100}%` }} title={`Load: ${(bd.loadFrac * 100).toFixed(1)}%`} />
                <span class="battery-life__seg battery-life__seg--pcm"
                  style={{ width: `${bd.pcmFrac * 100}%` }} title={`PCM: ${(bd.pcmFrac * 100).toFixed(1)}%`} />
                <span class="battery-life__seg battery-life__seg--self"
                  style={{ width: `${bd.selfFrac * 100}%` }} title={`Self-discharge: ${(bd.selfFrac * 100).toFixed(1)}%`} />
              </div>
              <ul class="battery-life__legend">
                <li><span class="battery-life__swatch battery-life__swatch--load" />Load {(bd.loadFrac * 100).toFixed(1)}% ({bd.load_mAh.toFixed(0)} mAh)</li>
                <li><span class="battery-life__swatch battery-life__swatch--pcm" />PCM {(bd.pcmFrac * 100).toFixed(1)}% ({bd.pcm_mAh.toFixed(0)} mAh)</li>
                <li><span class="battery-life__swatch battery-life__swatch--self" />Self-discharge {(bd.selfFrac * 100).toFixed(1)}% ({bd.self_mAh.toFixed(0)} mAh)</li>
              </ul>
            </div>
          )}

          <dl class="battery-life__stats">
            <div>
              <dt>Average load current</dt>
              <dd>{formatValueWithPrefix(result.avgLoadA, 'A')}</dd>
            </div>
            <div>
              <dt>Total constant draw (load + PCM)</dt>
              <dd>{formatValueWithPrefix(result.iConst_mA / 1000, 'A')}</dd>
            </div>
            <div>
              <dt>Effective self-discharge</dt>
              <dd>{(result.rEff * 100).toPrecision(3)} %/month</dd>
            </div>
            <div>
              <dt>Usable charge</dt>
              <dd>{result.cUsable.toFixed(0)} mAh</dd>
            </div>
          </dl>
        </div>
      ) : (
        <div class="battery-life__results battery-life__results--invalid">
          Fix the highlighted input(s) to see the estimated lifetime.
        </div>
      )}
    </div>
  );
}

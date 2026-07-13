import { useState, useMemo } from 'preact/hooks';
import { CONFIGS, FIELD_META, parseR, parseV, fmtR, fmtV } from './opamp.js';
import './styles.css';

const DEFAULTS = Object.fromEntries(Object.entries(FIELD_META).map(([k, m]) => [k, m.def]));

export default function OpAmpCalculator() {
  const [cfgKey, setCfgKey] = useState('noninv');
  const [vals, setVals] = useState(DEFAULTS);

  const cfg = CONFIGS.find((c) => c.key === cfgKey);

  // Parse every field this config needs; collect numeric values + per-field errors.
  const parsed = useMemo(() => {
    const out = {};
    const errors = {};
    for (const f of cfg.fields) {
      const meta = FIELD_META[f];
      const { value, error } = meta.kind === 'R' ? parseR(vals[f]) : parseV(vals[f]);
      out[f] = value;
      if (error) errors[f] = error;
    }
    const ok = Object.keys(errors).length === 0;
    const result = ok ? cfg.compute(out) : null;
    return { values: out, errors, ok, result };
  }, [cfgKey, vals]);

  const setField = (f) => (e) => setVals((v) => ({ ...v, [f]: e.currentTarget.value }));

  const { result } = parsed;
  const gainDb = result && result.gain !== 0 ? 20 * Math.log10(Math.abs(result.gain)) : null;

  return (
    <div class="opa">
      <div class="opa__legend">
        Pick an op-amp configuration, enter the resistor values and input voltage(s), and see the
        gain, the output voltage and a live schematic. Assumes an ideal op-amp (and matched resistors
        for the difference amplifier). Resistors accept metric prefixes (e.g. <code>10k</code>, <code>4k7</code>).
      </div>

      {/* config selector */}
      <div class="opa__configs">
        {CONFIGS.map((c) => (
          <button
            key={c.key}
            class={'opa__chip' + (c.key === cfgKey ? ' opa__chip--active' : '')}
            onClick={() => setCfgKey(c.key)}
          >{c.label}</button>
        ))}
      </div>

      <div class="opa__main">
        {/* schematic */}
        <div class="opa__schematic">
          <Schematic cfg={cfgKey} vals={vals} />
        </div>

        {/* inputs + results */}
        <div class="opa__panel">
          <div class="opa__inputs">
            {['V', 'R'].map((kind) => {
              const group = cfg.fields.filter((f) => FIELD_META[f].kind === kind);
              if (group.length === 0) return null;
              return (
                <div class="opa__field-grid" key={kind}>
                  {group.map((f) => {
                    const meta = FIELD_META[f];
                    return (
                      <div class="opa__field" key={f}>
                        <label class="opa__field-label" for={`opa-${f}`}>
                          <Sym main={meta.main} sub={meta.sub} />
                          <span class="opa__field-desc">{meta.label}</span>
                        </label>
                        <input
                          id={`opa-${f}`}
                          class={'opa__input' + (parsed.errors[f] ? ' opa__input--err' : '')}
                          type="text"
                          value={vals[f]}
                          onInput={setField(f)}
                          placeholder={meta.kind === 'R' ? 'e.g. 10k' : 'e.g. 1'}
                        />
                        <span class="opa__unit">{meta.kind === 'R' ? 'Ω' : 'V'}</span>
                        {parsed.errors[f] && <span class="opa__err">{parsed.errors[f]}</span>}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div class="opa__results">
            <div class="opa__eq"><GainEquation cfg={cfgKey} p={parsed.values} result={result} /></div>
            <div class="opa__readouts">
              <Readout label={cfgKey === 'diff' ? 'Differential gain' : <>Gain (<span class="opa__var">A<sub>v</sub></span>)</>}>
                {result ? `${fmtNum(result.gain)} V/V` : '—'}
                {gainDb !== null && <span class="opa__muted"> ({gainDb.toFixed(1)} dB)</span>}
              </Readout>
              <Readout label={<>Output voltage (<span class="opa__var">v<sub>out</sub></span>)</>}>
                {result ? fmtV(result.vout) : '—'}
              </Readout>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- gain equation with substituted numbers --------------------------------
function GainEquation({ cfg, p, result }) {
  if (!result) return <span class="opa__muted">Enter valid values to compute the gain.</span>;
  const g = fmtNum(result.gain);
  if (cfg === 'noninv') {
    return <>A<sub>v</sub> = 1 + R<sub>f</sub> / R<sub>i</sub> = 1 + {fmtR(p.Rf)} / {fmtR(p.Ri)} = <strong>{g}</strong></>;
  }
  if (cfg === 'inv') {
    return <>A<sub>v</sub> = −R<sub>f</sub> / R<sub>i</sub> = −{fmtR(p.Rf)} / {fmtR(p.Rin)} = <strong>{g}</strong></>;
  }
  if (cfg === 'buffer') {
    return <>A<sub>v</sub> = 1 &nbsp;(v<sub>out</sub> = v<sub>in</sub>)</>;
  }
  // difference
  return <>v<sub>out</sub> = (R<sub>2</sub> / R<sub>1</sub>)(v<sub>2</sub> − v<sub>1</sub>) = {g} × ({fmtV(p.V2)} − {fmtV(p.V1)}) = <strong>{fmtV(result.vout)}</strong></>;
}

function Sym({ main, sub }) {
  return <span class="opa__sym">{main}<sub>{sub}</sub></span>;
}

function Readout({ label, children }) {
  return (
    <div class="opa__readout">
      <span class="opa__readout-label">{label}</span>
      <span class="opa__readout-value">{children}</span>
    </div>
  );
}

function fmtNum(v) {
  if (!Number.isFinite(v)) return '—';
  const r = Math.round(v * 1000) / 1000;
  return String(r);
}

// ============================ Schematic =====================================
// Schematics are hand-drawn SVGs in this folder, named <config>-schematic.svg.
// They're auto-discovered below. Any configuration without an SVG yet falls
// back to a simple inline drawing, so the tool always shows a diagram.
const SVG_FILE = {
  noninv: 'non-inverting-amplifier-schematic.svg',
  inv: 'inverting-amplifier-schematic.svg',
  buffer: 'voltage-follower-schematic.svg',
  diff: 'difference-amplifier-schematic.svg',
};
const SCHEMATIC_URLS = import.meta.glob('./*-schematic.svg', { eager: true, query: '?url', import: 'default' });

function Schematic({ cfg, vals }) {
  const url = SCHEMATIC_URLS['./' + SVG_FILE[cfg]];
  if (url) {
    const label = CONFIGS.find((c) => c.key === cfg)?.label ?? cfg;
    return <img class="opa__schematic-img" src={url} alt={`${label} op-amp schematic`} />;
  }
  return <InlineSchematic cfg={cfg} vals={vals} />;
}

// ---- inline fallback drawing -----------------------------------------------
const OUT_X = 300;
const OUT_Y = 125;
const IN_MINUS_Y = 100;
const IN_PLUS_Y = 150;
const TRI_LEFT = 210;

function InlineSchematic({ cfg, vals }) {
  return (
    <svg class="opa__svg" viewBox="0 0 400 230" role="img" aria-label={`${cfg} op-amp schematic`}>
      {cfg === 'noninv' && <NonInv vals={vals} />}
      {cfg === 'inv' && <Inv vals={vals} />}
      {cfg === 'buffer' && <Buffer vals={vals} />}
      {cfg === 'diff' && <Diff vals={vals} />}
      <OpAmp />
      {/* output + Vout label (shared) */}
      <Wire pts={`${OUT_X},${OUT_Y} 372,${OUT_Y}`} />
      <Node x={OUT_X} y={OUT_Y} />
      <Term x={366} y={OUT_Y - 8} main="v" sub="out" anchor="end" />
    </svg>
  );
}

function OpAmp() {
  return (
    <g>
      <polygon class="opa__tri" points={`${TRI_LEFT},75 ${TRI_LEFT},175 ${OUT_X},125`} />
      <text class="opa__pin" x={TRI_LEFT + 12} y={IN_MINUS_Y + 4}>−</text>
      <text class="opa__pin" x={TRI_LEFT + 12} y={IN_PLUS_Y + 4}>+</text>
    </g>
  );
}

function NonInv({ vals }) {
  // The feedback divider drops to ground on the far left (x = 60), and the +
  // input wire starts to the right of it (x = 115), so the Ri drop never
  // crosses the non-inverting input path.
  return (
    <g>
      {/* + input from Vin */}
      <Wire pts={`115,${IN_PLUS_Y} ${TRI_LEFT},${IN_PLUS_Y}`} />
      <Term x={109} y={IN_PLUS_Y - 8} main="v" sub="in" anchor="end" />
      {/* − input node runs left to the divider */}
      <Wire pts={`60,${IN_MINUS_Y} ${TRI_LEFT},${IN_MINUS_Y}`} />
      <Node x={170} y={IN_MINUS_Y} />
      {/* Ri to ground (far left, clear of the + input wire) */}
      <Wire pts={`60,${IN_MINUS_Y} 60,112`} />
      <Res x1={60} y1={112} x2={60} y2={175} main="R" sub="i" val={fmtR(parseR(vals.Ri).value)} />
      <Wire pts="60,175 60,192" />
      <Gnd x={60} y={192} />
      {/* Rf feedback over the top */}
      <Wire pts={`170,${IN_MINUS_Y} 170,55`} />
      <Res x1={170} y1={55} x2={OUT_X} y2={55} main="R" sub="f" val={fmtR(parseR(vals.Rf).value)} />
      <Wire pts={`${OUT_X},55 ${OUT_X},${OUT_Y}`} />
    </g>
  );
}

function Inv({ vals }) {
  return (
    <g>
      {/* + input to ground */}
      <Wire pts={`${TRI_LEFT},${IN_PLUS_Y} 170,${IN_PLUS_Y} 170,178`} />
      <Gnd x={170} y={178} />
      {/* Rin from Vin to node A */}
      <Term x={34} y={IN_MINUS_Y - 8} main="v" sub="in" anchor="start" />
      <Wire pts={`40,${IN_MINUS_Y} 70,${IN_MINUS_Y}`} />
      <Res x1={70} y1={IN_MINUS_Y} x2={150} y2={IN_MINUS_Y} main="R" sub="i" val={fmtR(parseR(vals.Rin).value)} />
      <Wire pts={`150,${IN_MINUS_Y} ${TRI_LEFT},${IN_MINUS_Y}`} />
      <Node x={170} y={IN_MINUS_Y} />
      {/* Rf feedback */}
      <Wire pts={`170,${IN_MINUS_Y} 170,55`} />
      <Res x1={170} y1={55} x2={OUT_X} y2={55} main="R" sub="f" val={fmtR(parseR(vals.Rf).value)} />
      <Wire pts={`${OUT_X},55 ${OUT_X},${OUT_Y}`} />
    </g>
  );
}

function Buffer() {
  return (
    <g>
      {/* + input from Vin */}
      <Wire pts={`60,${IN_PLUS_Y} ${TRI_LEFT},${IN_PLUS_Y}`} />
      <Term x={54} y={IN_PLUS_Y - 8} main="v" sub="in" anchor="end" />
      {/* direct feedback: output to − input */}
      <Wire pts={`${OUT_X},${OUT_Y} ${OUT_X},58 170,58 170,${IN_MINUS_Y} ${TRI_LEFT},${IN_MINUS_Y}`} />
      <Node x={OUT_X} y={OUT_Y} />
    </g>
  );
}

function Diff({ vals }) {
  return (
    <g>
      {/* − leg: V1 through R1 to node A, R2 feedback */}
      <Term x={34} y={IN_MINUS_Y - 8} main="v" sub="1" anchor="start" />
      <Wire pts={`40,${IN_MINUS_Y} 70,${IN_MINUS_Y}`} />
      <Res x1={70} y1={IN_MINUS_Y} x2={150} y2={IN_MINUS_Y} main="R" sub="1" val={fmtR(parseR(vals.R1).value)} />
      <Wire pts={`150,${IN_MINUS_Y} ${TRI_LEFT},${IN_MINUS_Y}`} />
      <Node x={170} y={IN_MINUS_Y} />
      <Wire pts={`170,${IN_MINUS_Y} 170,55`} />
      <Res x1={170} y1={55} x2={OUT_X} y2={55} main="R" sub="2" val={fmtR(parseR(vals.R2).value)} />
      <Wire pts={`${OUT_X},55 ${OUT_X},${OUT_Y}`} />
      {/* + leg: V2 through R1 to node B, R2 to ground */}
      <Term x={34} y={IN_PLUS_Y + 16} main="v" sub="2" anchor="start" />
      <Wire pts={`40,${IN_PLUS_Y} 70,${IN_PLUS_Y}`} />
      <Res x1={70} y1={IN_PLUS_Y} x2={150} y2={IN_PLUS_Y} main="R" sub="1" val={fmtR(parseR(vals.R1).value)} />
      <Wire pts={`150,${IN_PLUS_Y} ${TRI_LEFT},${IN_PLUS_Y}`} />
      <Node x={170} y={IN_PLUS_Y} />
      <Res x1={170} y1={162} x2={170} y2={200} main="R" sub="2" val={fmtR(parseR(vals.R2).value)} />
      <Wire pts={`170,${IN_PLUS_Y} 170,162`} />
      <Wire pts="170,200 170,208" />
      <Gnd x={170} y={208} />
    </g>
  );
}

// ---- schematic primitives --------------------------------------------------
function Wire({ pts }) {
  return <polyline class="opa__wire" points={pts} />;
}
function Node({ x, y }) {
  return <circle class="opa__node" cx={x} cy={y} r="2.6" />;
}
function Gnd({ x, y }) {
  return (
    <g class="opa__gnd">
      <line x1={x} y1={y} x2={x} y2={y + 6} />
      <line x1={x - 9} y1={y + 6} x2={x + 9} y2={y + 6} />
      <line x1={x - 5.5} y1={y + 10} x2={x + 5.5} y2={y + 10} />
      <line x1={x - 2} y1={y + 14} x2={x + 2} y2={y + 14} />
    </g>
  );
}
function Term({ x, y, main, sub, anchor }) {
  return (
    <text class="opa__term" x={x} y={y} text-anchor={anchor}>
      {main}<tspan class="opa__sub" dy="3">{sub}</tspan>
    </text>
  );
}
// Resistor box (horizontal or vertical) with leads + label (name + value).
function Res({ x1, y1, x2, y2, main, sub, val }) {
  const horiz = y1 === y2;
  const lead = 12;
  const half = 7;
  if (horiz) {
    const bx1 = x1 + lead;
    const bx2 = x2 - lead;
    const cx = (x1 + x2) / 2;
    return (
      <g>
        <line class="opa__wire" x1={x1} y1={y1} x2={bx1} y2={y1} />
        <rect class="opa__res" x={bx1} y={y1 - half} width={bx2 - bx1} height={half * 2} rx="2" />
        <line class="opa__wire" x1={bx2} y1={y1} x2={x2} y2={y1} />
        <text class="opa__res-label" x={cx} y={y1 - half - 4} text-anchor="middle">
          {main}<tspan class="opa__sub" dy="3">{sub}</tspan>
        </text>
        <text class="opa__res-val" x={cx} y={y1 + half + 11} text-anchor="middle">{val}</text>
      </g>
    );
  }
  const by1 = y1 + lead;
  const by2 = y2 - lead;
  const cy = (y1 + y2) / 2;
  return (
    <g>
      <line class="opa__wire" x1={x1} y1={y1} x2={x1} y2={by1} />
      <rect class="opa__res" x={x1 - half} y={by1} width={half * 2} height={by2 - by1} rx="2" />
      <line class="opa__wire" x1={x1} y1={by2} x2={x1} y2={y2} />
      <text class="opa__res-label" x={x1 + half + 4} y={cy - 1} text-anchor="start">
        {main}<tspan class="opa__sub" dy="3">{sub}</tspan>
      </text>
      <text class="opa__res-val" x={x1 + half + 4} y={cy + 11} text-anchor="start">{val}</text>
    </g>
  );
}

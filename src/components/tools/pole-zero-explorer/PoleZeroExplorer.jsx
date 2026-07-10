import { useState, useMemo, useRef } from 'preact/hooks';
import {
  freqResponse, timeResponse, autoOmega, autoDuration, rootsToPoly, orders, polyToString,
} from './transfer.js';
import Plot2d from '../_shared/Plot2d.jsx';
import './styles.css';

const POLE_COLOR = '#c60e00';   // brand red — poles (✕) and response traces
const ZERO_COLOR = '#2563eb';   // blue — zeros (○)

// s-plane domain (isotropic: equal Re/Im span so the plane is undistorted)
const RE_MIN = -6;
const RE_MAX = 2;
const IM_MIN = -4;
const IM_MAX = 4;
const VIEW = 300;
const PAD = 26;
const PLOT = VIEW - 2 * PAD;
const SPANX = RE_MAX - RE_MIN;
const SPANY = IM_MAX - IM_MIN;

const PRESETS = [
  { label: '1st order', poles: [{ re: -1, im: 0 }], zeros: [], K: 1 },
  { label: '2nd order', poles: [{ re: -1, im: 2 }], zeros: [], K: 5 },
  { label: 'With a zero', poles: [{ re: -1, im: 2 }], zeros: [{ re: -0.5, im: 0 }], K: 10 },
  { label: 'Unstable', poles: [{ re: 0.4, im: 2 }], zeros: [], K: 4 },
];

const sx = (re) => PAD + ((re - RE_MIN) / SPANX) * PLOT;
const sy = (im) => PAD + ((IM_MAX - im) / SPANY) * PLOT;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const round2 = (v) => Math.round(v * 100) / 100;

export default function PoleZeroExplorer() {
  const [poles, setPoles] = useState([{ id: 'p1', re: -1, im: 2 }]);
  const [zeros, setZeros] = useState([]);
  const [K, setK] = useState(5);
  const [tab, setTab] = useState('bode');

  const svgRef = useRef(null);
  const dragRef = useRef(null);
  const idRef = useRef(2);
  const nextId = (prefix) => `${prefix}${idRef.current++}`;

  // ---- pointer drag on the s-plane ----------------------------------------
  const toCoord = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * VIEW;
    const py = ((e.clientY - r.top) / r.height) * VIEW;
    let re = clamp(RE_MIN + ((px - PAD) / PLOT) * SPANX, RE_MIN, RE_MAX);
    let im = clamp(IM_MAX - ((py - PAD) / PLOT) * SPANY, IM_MIN, IM_MAX);
    if (Math.abs(im) < 0.18) im = 0;   // snap to the real axis
    if (Math.abs(re) < 0.18) re = 0;   // snap to the imaginary (jω) axis
    return { re: round2(re), im: round2(im) };
  };
  const onDown = (kind, id) => (e) => {
    e.preventDefault();
    dragRef.current = { kind, id };
    try { svgRef.current.setPointerCapture(e.pointerId); } catch { /* noop */ }
  };
  const onMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const { re, im } = toCoord(e);
    const upd = (list) => list.map((it) => (it.id === d.id ? { ...it, re, im } : it));
    if (d.kind === 'pole') setPoles(upd);
    else setZeros(upd);
  };
  const onUp = (e) => {
    if (dragRef.current) {
      try { svgRef.current.releasePointerCapture(e.pointerId); } catch { /* noop */ }
      dragRef.current = null;
    }
  };

  const reset = () => {
    setPoles([{ id: 'p1', re: -1, im: 2 }]);
    setZeros([]);
    setK(5);
    idRef.current = 2;
  };

  const addPole = () => setPoles((p) => [...p, { id: nextId('p'), re: -2, im: 0 }]);
  const addZero = () => setZeros((z) => [...z, { id: nextId('z'), re: -3, im: 0 }]);
  const removePole = (id) => setPoles((p) => p.filter((it) => it.id !== id));
  const removeZero = (id) => setZeros((z) => z.filter((it) => it.id !== id));
  const applyPreset = (preset) => {
    setPoles(preset.poles.map((r, i) => ({ id: `p${i}`, ...r })));
    setZeros(preset.zeros.map((r, i) => ({ id: `z${i}`, ...r })));
    setK(preset.K);
    idRef.current = 100;
  };

  // ---- model --------------------------------------------------------------
  const model = useMemo(() => {
    const omegas = autoOmega(poles, zeros);
    const { mag, phase } = freqResponse(poles, zeros, K, omegas);
    const T = autoDuration(poles);
    const { n, m } = orders(poles, zeros);
    const improper = m > n;
    return {
      mag, phase, T, improper,
      step: improper ? null : timeResponse(poles, zeros, K, 'step', T),
      impulse: improper ? null : timeResponse(poles, zeros, K, 'impulse', T),
      num: rootsToPoly(zeros).map((c) => c * K),
      den: rootsToPoly(poles),
      unstable: poles.some((p) => p.re > 1e-6),
      marginal: poles.some((p) => Math.abs(p.re) <= 1e-6) && !poles.some((p) => p.re > 1e-6),
    };
  }, [poles, zeros, K]);

  const stability = model.unstable
    ? { text: 'Unstable', cls: 'pzx__badge--danger' }
    : model.marginal
      ? { text: 'Marginally stable', cls: 'pzx__badge--warn' }
      : { text: 'Stable', cls: 'pzx__badge--ok' };

  return (
    <div class="pzx">
      <div class="pzx__legend">
        Drag the poles (<span class="pzx__k-pole">✕</span>) and zeros
        (<span class="pzx__k-zero">○</span>) around the s-plane and watch the transfer function's
        frequency response (Bode) and time response update live. A pole or zero off the real axis
        automatically carries its complex conjugate, so the system stays real. Poles in the
        right-half plane make it unstable.
      </div>

      <div class="pzx__top">
        {/* s-plane */}
        <svg
          ref={svgRef}
          class="pzx__plane"
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          onPointerMove={onMove}
          onPointerUp={onUp}
          role="img"
          aria-label="s-plane pole-zero map"
        >
          {/* grid */}
          {Array.from({ length: SPANX + 1 }).map((_, i) => {
            const re = RE_MIN + i;
            return <line key={`gx${i}`} class="pzx__grid" x1={sx(re)} y1={PAD} x2={sx(re)} y2={VIEW - PAD} />;
          })}
          {Array.from({ length: SPANY + 1 }).map((_, i) => {
            const im = IM_MIN + i;
            return <line key={`gy${i}`} class="pzx__grid" x1={PAD} y1={sy(im)} x2={VIEW - PAD} y2={sy(im)} />;
          })}
          {/* axes */}
          <line class="pzx__axis" x1={PAD} y1={sy(0)} x2={VIEW - PAD} y2={sy(0)} />
          <line class="pzx__axis" x1={sx(0)} y1={PAD} x2={sx(0)} y2={VIEW - PAD} />
          <text class="pzx__axis-label" x={VIEW - PAD + 2} y={sy(0) + 3}>Re</text>
          <text class="pzx__axis-label" x={sx(0) + 4} y={PAD - 4}>Im</text>
          {/* axis tick labels (every 2 units, origin omitted) */}
          {[-6, -4, -2, 2].map((re) => (
            <text key={`rt${re}`} class="pzx__tick" x={sx(re)} y={sy(0) + 12} text-anchor="middle">{re}</text>
          ))}
          {[4, 2, -2, -4].map((im) => (
            <text key={`it${im}`} class="pzx__tick" x={sx(0) - 5} y={sy(im) + 3} text-anchor="end">{im}j</text>
          ))}

          {/* zeros (○) — draw the conjugate too */}
          {zeros.flatMap((z) => {
            const pts = Math.abs(z.im) > 1e-9 ? [z.im, -z.im] : [z.im];
            return pts.map((imv, k) => (
              <g key={`${z.id}-${k}`} class="pzx__marker" onPointerDown={onDown('zero', z.id)}>
                <circle cx={sx(z.re)} cy={sy(imv)} r="10" fill="transparent" />
                <circle class="pzx__zero" cx={sx(z.re)} cy={sy(imv)} r="6" />
              </g>
            ));
          })}

          {/* poles (✕) — draw the conjugate too */}
          {poles.flatMap((p) => {
            const pts = Math.abs(p.im) > 1e-9 ? [p.im, -p.im] : [p.im];
            return pts.map((imv, k) => {
              const cx = sx(p.re);
              const cy = sy(imv);
              return (
                <g key={`${p.id}-${k}`} class="pzx__marker" onPointerDown={onDown('pole', p.id)}>
                  <circle cx={cx} cy={cy} r="10" fill="transparent" />
                  <line class="pzx__pole" x1={cx - 5} y1={cy - 5} x2={cx + 5} y2={cy + 5} />
                  <line class="pzx__pole" x1={cx - 5} y1={cy + 5} x2={cx + 5} y2={cy - 5} />
                </g>
              );
            });
          })}
        </svg>

        {/* controls */}
        <div class="pzx__controls">
          <div class="pzx__row">
            <span class={'pzx__badge ' + stability.cls}>{stability.text}</span>
          </div>

          <div class="pzx__presets">
            <span class="pzx__presets-label">Presets</span>
            <span class="pzx__presets-hint">— replace all poles, zeros &amp; gain:</span>
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                class="pzx__chip"
                title="Preset: replaces the current poles, zeros and gain"
                onClick={() => applyPreset(preset)}
              >{preset.label}</button>
            ))}
          </div>

          <div class="pzx__control">
            <span class="pzx__control-label">Gain K</span>
            <div class="pzx__control-body">
              <input type="range" min="0.1" max="20" step="0.1" value={K}
                onInput={(e) => setK(Number(e.currentTarget.value))} />
              <input type="number" min="0" step="0.1" value={K} class="pzx__num"
                onInput={(e) => setK(Math.max(0, Number(e.currentTarget.value) || 0))} />
            </div>
          </div>

          <div class="pzx__buttons">
            <button class="pzx__btn" onClick={addPole}>+ Pole</button>
            <button class="pzx__btn" onClick={addZero}>+ Zero</button>
            <button class="pzx__btn pzx__btn--reset" onClick={reset}>Reset</button>
          </div>

          <div class="pzx__lists">
            <RootList title="Poles" items={poles} color={POLE_COLOR} onRemove={removePole} />
            <RootList title="Zeros" items={zeros} color={ZERO_COLOR} onRemove={removeZero} />
          </div>

          {/* H(s) */}
          <div class="pzx__hs">
            <span class="pzx__hs-lhs">H(s) =</span>
            <span class="pzx__frac">
              <span class="pzx__frac-num">{polyToString(model.num)}</span>
              <span class="pzx__frac-den">{polyToString(model.den)}</span>
            </span>
          </div>
        </div>
      </div>

      {/* response views */}
      <div class="pzx__tabs" role="tablist">
        {[['bode', 'Bode'], ['step', 'Step response'], ['impulse', 'Impulse response']].map(([key, label]) => (
          <button
            key={key}
            role="tab"
            class={'pzx__tab' + (tab === key ? ' pzx__tab--active' : '')}
            aria-selected={tab === key}
            onClick={() => setTab(key)}
          >{label}</button>
        ))}
      </div>

      {tab === 'bode' && (
        <div class="pzx__pane">
          <div class="pzx__chart">
            <Plot2d title="Magnitude" xLabel="ω [rad/s]" yLabel="|H(jω)| [dB]" xLog
              series={[{ label: '|H|', data: model.mag, color: POLE_COLOR, width: 2 }]} height={240} />
          </div>
          <div class="pzx__chart">
            <Plot2d title="Phase" xLabel="ω [rad/s]" yLabel="∠H(jω) [°]" xLog
              series={[{ label: '∠H', data: model.phase, color: POLE_COLOR, width: 2 }]} height={220} />
          </div>
        </div>
      )}

      {tab === 'step' && (
        <div class="pzx__pane">
          {model.step ? (
            <Plot2d title="Step response" xLabel="Time [s]" yLabel="y(t)"
              series={[{ label: 'y', data: model.step, color: POLE_COLOR, width: 2 }]} height={280} />
          ) : <ImproperNote />}
        </div>
      )}

      {tab === 'impulse' && (
        <div class="pzx__pane">
          {model.impulse ? (
            <Plot2d title="Impulse response" xLabel="Time [s]" yLabel="h(t)"
              series={[{ label: 'h', data: model.impulse, color: POLE_COLOR, width: 2 }]} height={280} />
          ) : <ImproperNote />}
        </div>
      )}
    </div>
  );
}

function RootList({ title, items, color, onRemove }) {
  return (
    <div class="pzx__list">
      <span class="pzx__list-title">{title}</span>
      {items.length === 0 && <span class="pzx__muted">none</span>}
      {items.map((it) => (
        <span key={it.id} class="pzx__tag" style={{ borderColor: color }}>
          {fmtRoot(it)}
          <button class="pzx__tag-x" onClick={() => onRemove(it.id)} aria-label="remove">×</button>
        </span>
      ))}
    </div>
  );
}

function ImproperNote() {
  return (
    <div class="pzx__note">
      The system is <strong>improper</strong> (more zeros than poles), so it has no ordinary
      time-domain response. Remove a zero or add a pole to see the step/impulse response.
    </div>
  );
}

function fmtRoot(r) {
  const re = r.re.toFixed(2);
  if (Math.abs(r.im) < 1e-9) return re;
  return `${re} ± ${Math.abs(r.im).toFixed(2)}j`;
}

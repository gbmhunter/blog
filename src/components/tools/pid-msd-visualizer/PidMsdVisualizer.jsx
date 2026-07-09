import { useState, useMemo, useEffect, useRef } from 'preact/hooks';
import { makeState, makeController, stepPlant, isDiverged } from './physics.js';
import Plot2d from '../_shared/Plot2d.jsx';
import './styles.css';

// The plant matches the worked example on the PID Control page (m = 1 kg,
// k = 20 N/m, c = 10 N·s/m, ΔT = 10 ms, step to 1 m at t = 1 s). The default
// gains are deliberately *under-damped* (no derivative term) so the response
// visibly overshoots and oscillates — a starting point the user can then tune.
const DEFAULTS = {
  kp: 300,
  ki: 150,
  kd: 0,
  m: 1,
  k: 20,
  c: 10,
};
const DEFAULT_SETPOINT = 1;
const DEFAULT_PERIOD = 2;
const DEFAULT_MODE = 'alternating';

const DT = 0.01;          // simulation time step [s]
const STEP_TIME = 1;      // the single-step setpoint change happens here [s]
const STEP_DURATION = 6;  // window for the single-step mode [s]
const LIVE_WINDOW = 8;    // rolling window shown in manual mode [s]

const SP_COLOR = '#2563eb';   // blue — setpoint reference
const X_COLOR = '#c60e00';    // brand red — displacement response

const MODES = [
  { key: 'step', label: 'Single step' },
  { key: 'alternating', label: 'Alternating' },
  { key: 'manual', label: 'Manual' },
];

// System presets. Each restores the default plant (m, k, c) AND sets the gains,
// so the named damping character is reproducible — on an arbitrary plant the
// same gains would not reliably look under-/critically-/over-damped (the fixed
// Kp/Ki interact with the plant). Gains are tuned for the default plant.
const PRESETS = [
  { label: 'Default', kp: 300, ki: 150, kd: 0 },
  { label: 'Underdamped', kp: 600, ki: 200, kd: 0 },
  { label: 'Critically damped', kp: 300, ki: 100, kd: 26 },
  { label: 'Overdamped', kp: 200, ki: 60, kd: 49 },
];

// --- SVG geometry (viewBox units) -------------------------------------------
const VIEW_W = 440;
const VIEW_H = 136;   // includes a band below the ground for the "x = 0" label
const WALL_X = 16;
const WALL_W = 14;
const MASS_W = 58;
const MASS_H = 56;
const REST_CX = 200;          // mass centre (px) at x = 0
const PX_PER_M = 70;          // fixed metre→pixel scale — constant, so markers never drift
const MARKER_PX_MIN = WALL_X + WALL_W + 8;  // keep the setpoint marker clear of the wall
const MARKER_PX_MAX = VIEW_W - 8;           // …and inside the right edge
const PISTON_FULL_M = 1.2;    // displacement at which the damper piston reaches its travel
const FORCE_FULL_N = 300;     // PID-output force that draws a full-length control arrow
const GROUND_Y = 112;
// Connectors attach to the mass's left face (the block spans GROUND_Y-MASS_H … GROUND_Y).
const SPRING_Y = GROUND_Y - MASS_H + 8;    // upper attachment
const DAMPER_Y = GROUND_Y - MASS_H + 32;   // lower attachment
const DAMP_LEAD = 10;                       // rod from wall to cylinder
const DAMP_CX0 = WALL_X + WALL_W + DAMP_LEAD; // cylinder start x
const DAMP_CYL_LEN = 36;
const DAMP_CYL_H = 13;

// The setpoint as a function of simulated time, per mode.
function setpointAtTime(mode, t, setpoint, period) {
  if (mode === 'manual') return setpoint;                 // driven live by the slider
  if (mode === 'alternating') {
    const T = period > 1e-3 ? period : 1e-3;
    return Math.floor(t / T) % 2 === 0 ? setpoint : 0;    // square wave, starts high
  }
  return t >= STEP_TIME ? setpoint : 0;                   // single step at t = 1 s
}

export default function PidMsdVisualizer() {
  const [params, setParams] = useState(DEFAULTS);
  const [setpoint, setSetpoint] = useState(DEFAULT_SETPOINT);
  const [period, setPeriod] = useState(DEFAULT_PERIOD);
  const [mode, setMode] = useState(DEFAULT_MODE);
  const [running, setRunning] = useState(true);
  const [liveTick, setLiveTick] = useState(0);    // forces a re-render each animation frame
  const [diverged, setDiverged] = useState(false);

  const isManual = mode === 'manual';
  // Manual and alternating stream forever (rolling window); only the single
  // step runs for a fixed window and then freezes.
  const unbounded = isManual || mode === 'alternating';
  const runDuration = unbounded ? Infinity : STEP_DURATION;

  // Live-engine state (mutated by the rAF loop; refs so they survive renders).
  const stateRef = useRef(makeState());
  const ctrlRef = useRef(makeController());
  const bufferRef = useRef([]);       // [{ t, x, sp }] streamed history
  const simTimeRef = useRef(0);
  // Grow-only y-bounds so the axis contains the whole response (including
  // negative setpoints/overshoot) without jittering as the run develops.
  const viewLoRef = useRef(-0.3);
  const viewHiRef = useRef(1.3);
  const lastFrameRef = useRef(0);
  const accRef = useRef(0);
  const forceRef = useRef(0);         // latest PID output force F_ext [N]

  // Latest values the loop reads each frame (avoids stale closures).
  const liveRef = useRef({});
  liveRef.current = { ...params, setpoint, mode, period, runDuration };

  const resetLive = () => {
    stateRef.current = makeState();
    ctrlRef.current = makeController();
    bufferRef.current = [];
    simTimeRef.current = 0;
    viewLoRef.current = -0.3;
    viewHiRef.current = 1.3;
    forceRef.current = 0;
    setDiverged(false);
    setLiveTick((t) => t + 1);
  };

  // In the deterministic modes the setpoint is a function of time, so changing
  // any parameter rewinds and replays the run live (you watch the fresh
  // response stream in). In manual mode the loop just picks up the new value on
  // the next frame, so we leave the run going.
  const onParamChange = () => {
    if (!isManual) {
      resetLive();
      setRunning(true);
    }
  };
  const setParam = (key) => (value) => { setParams((p) => ({ ...p, [key]: value })); onParamChange(); };
  const onSetpoint = (value) => { setSetpoint(value); onParamChange(); };
  const onPeriod = (value) => { setPeriod(value); onParamChange(); };

  // Apply a system preset: restore the default plant AND set the gains, so each
  // named regime looks correct regardless of any plant changes the user made.
  const applyPreset = (preset) => {
    setParams({
      m: DEFAULTS.m, k: DEFAULTS.k, c: DEFAULTS.c,
      kp: preset.kp, ki: preset.ki, kd: preset.kd,
    });
    onParamChange();
  };

  const changeMode = (next) => {
    setMode(next);
    resetLive();
    setRunning(true); // keep running in every mode
  };

  const restart = () => { resetLive(); setRunning(true); }; // rewind to rest, keep running
  const resetAll = () => {
    setParams(DEFAULTS);
    setSetpoint(DEFAULT_SETPOINT);
    setPeriod(DEFAULT_PERIOD);
    setMode(DEFAULT_MODE);
    resetLive();
    setRunning(true); // running is the page default
  };

  // --- The single live loop, shared by every mode ---------------------------
  useEffect(() => {
    if (!running) return;
    lastFrameRef.current = 0;
    accRef.current = 0;

    let raf;
    const tick = (now) => {
      if (!lastFrameRef.current) lastFrameRef.current = now;
      let dt = (now - lastFrameRef.current) / 1000;
      lastFrameRef.current = now;
      if (dt > 0.1) dt = 0.1; // clamp after a tab switch to avoid a spiral of death
      accRef.current += dt;

      const lv = liveRef.current;
      const buf = bufferRef.current;
      let stop = false;
      let blew = false;
      while (accRef.current >= DT) {
        if (simTimeRef.current >= lv.runDuration) { stop = true; break; }
        const target = setpointAtTime(lv.mode, simTimeRef.current, lv.setpoint, lv.period);
        buf.push({ t: simTimeRef.current, x: stateRef.current.pos, sp: target });
        forceRef.current = stepPlant(stateRef.current, ctrlRef.current, lv, target, DT);
        simTimeRef.current += DT;
        accRef.current -= DT;
        if (isDiverged(stateRef.current.pos)) { blew = true; break; }
      }
      // Unbounded modes (manual, alternating) stream forever, so keep only the
      // rolling window; the fixed-duration step keeps its whole trace.
      if (lv.runDuration === Infinity) {
        const minT = simTimeRef.current - LIVE_WINDOW;
        while (buf.length && buf[0].t < minT) buf.shift();
      }

      setLiveTick((t) => t + 1);
      if (blew) { setDiverged(true); setRunning(false); return; }
      if (stop) { setRunning(false); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  // --- Plot series (streamed from the buffer, downsampled) ------------------
  const series = useMemo(() => {
    const buf = bufferRef.current;
    const stride = Math.max(1, Math.floor(buf.length / 240));
    const xs = [];
    const sps = [];
    for (let i = 0; i < buf.length; i += stride) {
      xs.push({ x: buf[i].t, y: buf[i].x });
      sps.push({ x: buf[i].t, y: buf[i].sp });
    }
    if (buf.length) {
      const last = buf[buf.length - 1];
      xs.push({ x: last.t, y: last.x });
      sps.push({ x: last.t, y: last.sp });
    }
    return [
      { label: 'Setpoint', data: sps, color: SP_COLOR, width: 1.5, dash: [6, 4] },
      { label: 'Displacement', data: xs, color: X_COLOR, width: 2 },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveTick]);

  // --- Current state + view scaling -----------------------------------------
  const curT = simTimeRef.current;
  const curX = stateRef.current.pos;
  const curSp = setpointAtTime(mode, curT, setpoint, period);

  // Grow-only bounds (in both directions) so the axis and the mass stay stable
  // as the run develops, while always containing the full response.
  let dataLo = Math.min(0, setpoint);
  let dataHi = Math.max(0, setpoint);
  for (const pt of bufferRef.current) {
    if (!Number.isFinite(pt.x)) continue;
    if (pt.x < dataLo) dataLo = pt.x;
    if (pt.x > dataHi) dataHi = pt.x;
  }
  const padLo = dataLo - Math.max(0.1, Math.abs(dataLo) * 0.15);
  const padHi = dataHi + Math.max(0.1, Math.abs(dataHi) * 0.15);
  if (padLo < viewLoRef.current) viewLoRef.current = padLo;
  if (padHi > viewHiRef.current) viewHiRef.current = padHi;
  const range = { min: viewLoRef.current, max: viewHiRef.current };

  // Rolling window for the unbounded modes (manual, alternating); a fixed
  // 0…duration window for the single step so its trace draws in place.
  const xWindow = unbounded
    ? { min: Math.max(0, curT - LIVE_WINDOW), max: Math.max(LIVE_WINDOW, curT) }
    : { min: 0, max: runDuration };

  const displayX = Number.isFinite(curX) ? curX : 0;
  // The animation uses a FIXED metre→pixel scale, so the x = 0 line and the
  // setpoint marker never move as long as the setpoint is unchanged. The
  // setpoint marker is clamped to sensible view bounds; the mass is NOT clamped
  // — if the response grows large it slides right off the edge of the view
  // (clipped by the SVG viewport), which shows a runaway far better than pinning
  // it to the side. The plot still auto-scales to show the whole response.
  const massCx = REST_CX + displayX * PX_PER_M;
  const massLeft = massCx - MASS_W / 2;
  const setpointPx = clamp(REST_CX + (curSp || 0) * PX_PER_M, MARKER_PX_MIN, MARKER_PX_MAX);
  const springPts = springPath(WALL_X + WALL_W, massLeft, SPRING_Y);

  // Damper piston plate slides inside the fixed cylinder as the mass moves,
  // saturating at its travel limit once the displacement passes PISTON_FULL_M.
  const pistonTravel = DAMP_CYL_LEN / 2 - 6;
  const pistonX = DAMP_CX0 + DAMP_CYL_LEN / 2
    + clamp((displayX / PISTON_FULL_M) * pistonTravel, -pistonTravel, pistonTravel);

  // Control-force arrow: the PID output F_ext acting on the mass. Length grows
  // with |F| (saturating), pointing in the direction the controller is pushing.
  const force = forceRef.current;
  const forceMag = Math.min(1, Math.abs(force) / FORCE_FULL_N);
  const showForce = Number.isFinite(force) && Math.abs(force) > 2 && Number.isFinite(massCx);
  const forceDir = force >= 0 ? 1 : -1;
  const forceY = GROUND_Y - MASS_H - 9;   // float just above the mass, clear of spring/damper
  const forceX0 = massCx;
  const forceX1 = forceX0 + forceDir * (10 + forceMag * 52);

  const atEnd = !isManual && curT >= runDuration - 1e-9;
  const playLabel = running ? 'Pause' : atEnd ? 'Replay' : 'Play';
  const onPlay = () => {
    if (!running && atEnd) resetLive();  // replay from the start
    setRunning((r) => !r);
  };

  return (
    <div class="pid-msd">
      <div class="pid-msd__legend">
        Tune a PID controller driving a spring-mass-damper plant. Drag the controller gains
        (K<sub>p</sub>, K<sub>i</sub>, K<sub>d</sub>) and the physical parameters and watch the mass
        respond. Pick how the setpoint is driven: a single step,
        a square wave that alternates every few seconds, or a slider you drag in real time. The
        default gains are intentionally under-damped so the response oscillates — try adding
        derivative gain (K<sub>d</sub>) to settle it down. The orange arrow is the PID output: the
        external force <em>F</em> it applies to the mass to drive it toward the setpoint.
      </div>

      {/* Primary controls */}
      <div class="pid-msd__buttons">
        <button class="pid-msd__btn pid-msd__btn--primary" onClick={onPlay}>{playLabel}</button>
        <button class="pid-msd__btn" onClick={restart}>Restart</button>
        <button class="pid-msd__btn" onClick={resetAll}>Reset to page defaults</button>
      </div>

      <div class="pid-msd__stage">
        <div class="pid-msd__viz">
        {/* Animated spring-mass-damper */}
        <svg
          class="pid-msd__svg"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Animated spring-mass-damper system"
        >
          {/* Ground */}
          <line class="pid-msd__ground" x1="0" y1={GROUND_Y} x2={VIEW_W} y2={GROUND_Y} />
          {Array.from({ length: 22 }).map((_, i) => (
            <line
              key={i}
              class="pid-msd__hatch"
              x1={i * 22}
              y1={GROUND_Y}
              x2={i * 22 - 10}
              y2={GROUND_Y + 10}
            />
          ))}

          {/* Wall */}
          <rect class="pid-msd__wall" x={WALL_X} y="16" width={WALL_W} height={GROUND_Y - 16} />
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={i}
              class="pid-msd__hatch"
              x1={WALL_X}
              y1={26 + i * 16}
              x2={WALL_X - 10}
              y2={26 + i * 16 + 10}
            />
          ))}

          {/* Equilibrium (x = 0) reference — label sits below the ground so it
              never collides with the setpoint label when the setpoint is near 0 */}
          <line class="pid-msd__equilib" x1={REST_CX} y1="28" x2={REST_CX} y2={GROUND_Y} />
          <text class="pid-msd__axis-label" x={REST_CX} y={GROUND_Y + 18} text-anchor="middle">x = 0</text>

          {/* Setpoint marker — label on a lower row so it never collides with x = 0 */}
          <line class="pid-msd__setpoint" x1={setpointPx} y1="28" x2={setpointPx} y2={GROUND_Y} />
          <text class="pid-msd__setpoint-label" x={setpointPx} y="23" text-anchor="middle">
            setpoint
          </text>

          {/* Spring (upper connector) */}
          <polyline class="pid-msd__spring" points={springPts} />
          <text class="pid-msd__part-label" x={(WALL_X + WALL_W + massLeft) / 2} y={SPRING_Y - 18} text-anchor="middle">k</text>

          {/* Damper (lower connector): rod → fixed cylinder with a sliding piston → rod to mass */}
          <line class="pid-msd__rod" x1={WALL_X + WALL_W} y1={DAMPER_Y} x2={DAMP_CX0} y2={DAMPER_Y} />
          {/* cylinder, open on the right */}
          <polyline
            class="pid-msd__damper-body"
            points={`${DAMP_CX0 + DAMP_CYL_LEN},${DAMPER_Y - DAMP_CYL_H / 2} ${DAMP_CX0},${DAMPER_Y - DAMP_CYL_H / 2} ${DAMP_CX0},${DAMPER_Y + DAMP_CYL_H / 2} ${DAMP_CX0 + DAMP_CYL_LEN},${DAMPER_Y + DAMP_CYL_H / 2}`}
          />
          {/* piston plate (tracks the mass) */}
          <line
            class="pid-msd__piston"
            x1={pistonX}
            y1={DAMPER_Y - DAMP_CYL_H / 2 + 2}
            x2={pistonX}
            y2={DAMPER_Y + DAMP_CYL_H / 2 - 2}
          />
          {/* piston rod out to the mass */}
          <line class="pid-msd__rod" x1={pistonX} y1={DAMPER_Y} x2={massLeft} y2={DAMPER_Y} />
          <text class="pid-msd__part-label" x={DAMP_CX0 + DAMP_CYL_LEN / 2} y={DAMPER_Y + DAMP_CYL_H / 2 + 13} text-anchor="middle">c</text>

          {/* Mass */}
          <rect
            class="pid-msd__mass"
            x={massLeft}
            y={GROUND_Y - MASS_H}
            width={MASS_W}
            height={MASS_H}
            rx="4"
          />
          <text class="pid-msd__mass-label" x={massCx} y={GROUND_Y - MASS_H / 2 + 5} text-anchor="middle">
            m
          </text>

          {/* Control force = PID output (F_ext) acting on the mass */}
          {showForce && (
            <g class="pid-msd__force">
              <line x1={forceX0} y1={forceY} x2={forceX1 - forceDir * 8} y2={forceY} />
              <polygon points={`${forceX1},${forceY} ${forceX1 - forceDir * 9},${forceY - 5} ${forceX1 - forceDir * 9},${forceY + 5}`} />
              <text x={(forceX0 + forceX1) / 2} y={forceY - 7} text-anchor="middle">
                F = {force.toFixed(0)} N
              </text>
            </g>
          )}
        </svg>

        <div class="pid-msd__readouts">
          <Readout label="Time">{curT.toFixed(2)} s</Readout>
          <Readout label="Displacement">
            {Number.isFinite(curX) ? `${curX.toFixed(3)} m` : '—'}
          </Readout>
          <Readout label="Setpoint">{(curSp || 0).toFixed(2)} m</Readout>
        </div>
        </div>

        {isManual && (
          <div class="pid-msd__hint">
            Drag the <strong>Setpoint (live)</strong> slider below to move the target around and
            watch the mass chase it.
          </div>
        )}

        {diverged && (
          <div class="pid-msd__warn-box">
            ⚠ The system is <strong>unstable</strong> — the response diverges with these gains. Reduce
            K<sub>p</sub>/K<sub>i</sub> or add more K<sub>d</sub> (or increase damping <em>c</em>).
          </div>
        )}
      </div>

      <div class="pid-msd__plot">
        <Plot2d
          title={isManual ? 'Live response' : mode === 'alternating' ? 'Square-wave response' : 'Step response'}
          xLabel="Time [s]"
          yLabel="Displacement [m]"
          series={series}
          height={280}
          xMin={xWindow.min}
          xMax={xWindow.max}
          yMin={range.min}
          yMax={range.max}
          animated={false}
        />
      </div>

      {/* System presets — set the whole plant + controller, so they live
          outside the individual Controller / Plant boxes. */}
      <div class="pid-msd__presets-row">
        <span class="pid-msd__presets-label">Presets</span>
        <div class="pid-msd__presets">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              class="pid-msd__preset-btn"
              onClick={() => applyPreset(preset)}
            >{preset.label}</button>
          ))}
        </div>
      </div>

      <div class="pid-msd__controls">
        <div class="pid-msd__control-group">
          <div class="pid-msd__group-title">Controller (parallel form)</div>
          <Slider label={<>K<sub>p</sub></>} min={0} max={2000} step={5} value={params.kp} onChange={setParam('kp')} />
          <Slider label={<>K<sub>i</sub></>} min={0} max={2000} step={5} value={params.ki} onChange={setParam('ki')} />
          <Slider label={<>K<sub>d</sub></>} min={0} max={200} step={1} value={params.kd} onChange={setParam('kd')} />
        </div>
        <div class="pid-msd__control-group">
          <div class="pid-msd__group-title">Plant &amp; setpoint</div>
          <Slider label={<>Mass <em>m</em></>} min={0.1} max={10} step={0.1} value={params.m} onChange={setParam('m')} unit="kg" />
          <Slider label={<>Spring <em>k</em></>} min={1} max={200} step={1} value={params.k} onChange={setParam('k')} unit="N/m" />
          <Slider label={<>Damping <em>c</em></>} min={0} max={100} step={1} value={params.c} onChange={setParam('c')} unit="N·s/m" />
          <div class="pid-msd__control">
            <span class="pid-msd__control-label">Mode</span>
            <div class="pid-msd__control-body">
              <div class="pid-msd__chips">
                {MODES.map((mo) => (
                  <button
                    key={mo.key}
                    class={'pid-msd__chip' + (mode === mo.key ? ' pid-msd__chip--active' : '')}
                    onClick={() => changeMode(mo.key)}
                  >{mo.label}</button>
                ))}
              </div>
            </div>
          </div>
          <Slider
            label={isManual ? 'Setpoint (live)' : mode === 'alternating' ? 'Setpoint (high)' : 'Setpoint'}
            min={-2} max={2} step={0.1} value={setpoint} onChange={onSetpoint} unit="m"
          />
          {mode === 'alternating' && (
            <Slider label="Period" min={0.5} max={5} step={0.5} value={period} onChange={onPeriod} unit="s" />
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------

function Slider({ label, min, max, step, value, onChange, unit }) {
  return (
    <div class="pid-msd__control">
      <span class="pid-msd__control-label">{label}</span>
      <div class="pid-msd__control-body">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onInput={(e) => onChange(Number(e.currentTarget.value))}
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onInput={(e) => onChange(clamp(Number(e.currentTarget.value), min, max))}
          class="pid-msd__num"
        />
        {unit && <span class="pid-msd__unit">{unit}</span>}
      </div>
    </div>
  );
}

function Readout({ label, children }) {
  return (
    <div class="pid-msd__readout">
      <span class="pid-msd__readout-label">{label}</span>
      <span class="pid-msd__readout-value">{children}</span>
    </div>
  );
}

function clamp(v, lo, hi) {
  if (!Number.isFinite(v)) return lo;
  return Math.max(lo, Math.min(hi, v));
}

// Build a zig-zag spring polyline between two x positions at a fixed y. It
// spans wall→mass, so it visibly stretches and compresses as the mass moves.
function springPath(x0, x1, y) {
  const coils = 11;
  const amp = 7;
  const lead = 12;                 // straight lead-in/out
  const body = Math.max(x1 - x0 - lead * 2, 1);
  const pts = [`${x0},${y}`, `${x0 + lead},${y}`];
  for (let i = 0; i <= coils; i++) {
    const px = x0 + lead + (body * i) / coils;
    const py = i === 0 ? y : y + (i % 2 === 0 ? amp : -amp);
    pts.push(`${px},${py}`);
  }
  pts.push(`${x1 - lead},${y}`, `${x1},${y}`);
  return pts.join(' ');
}

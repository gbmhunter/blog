import { useState, useMemo } from 'preact/hooks';
import {
  parseR, parseC, parseF, parseNum,
  formatR, formatC, formatF,
  computeMetrics, bodeSeries, designComponents,
  snapResistor, gainResistors, RESISTOR_SERIES,
} from './calc.js';
import Plot2d from '../_shared/Plot2d.jsx';
import Schematic from './Schematic.jsx';
import './styles.css';

const CURVE_COLOR = '#c60e00';   // brand red — the response
const REF_COLOR = '#2563eb';     // blue — reference lines
const Q_PEAK_LIMIT = 1 / Math.SQRT2; // 0.707 — peaking appears above this

export default function SallenKeyDesigner() {
  const [mode, setMode] = useState('design');   // 'design' | 'analyse'
  const [type, setType] = useState('lp');        // 'lp' | 'hp'

  // --- Analyse-mode inputs (component → response) ---------------------------
  const [aUnity, setAUnity] = useState(false);
  const [a, setA] = useState({ R1: '10k', R2: '10k', C1: '10n', C2: '10n', R3: '10k', R4: '10k' });
  const setAField = (k, v) => setA((p) => ({ ...p, [k]: v }));

  // --- Design-mode inputs (spec → component) --------------------------------
  const [dUnity, setDUnity] = useState(false);
  const [series, setSeries] = useState('E96');
  const [d, setD] = useState({ fc: '1k', Q: '0.707', K: '2', C: '10n' });
  const setDField = (k, v) => setD((p) => ({ ...p, [k]: v }));

  // ==========================================================================
  // ANALYSE: parse inputs → components → metrics
  // ==========================================================================
  const analyse = useMemo(() => {
    const R1 = parseR(a.R1), R2 = parseR(a.R2), C1 = parseC(a.C1), C2 = parseC(a.C2);
    const R3 = parseR(a.R3), R4 = parseR(a.R4);
    const fields = { R1, R2, C1, C2, ...(aUnity ? {} : { R3, R4 }) };
    const firstError = Object.entries(fields).find(([, p]) => p.error);
    let comps = null;
    let K = 1;
    if (!firstError) {
      K = aUnity ? 1 : 1 + R3.value / R4.value;
      comps = { R1: R1.value, R2: R2.value, C1: C1.value, C2: C2.value, K };
    }
    const metrics = comps ? computeMetrics(type, comps) : null;
    return { errors: { R1, R2, C1, C2, R3, R4 }, comps, metrics };
  }, [a, aUnity, type]);

  // ==========================================================================
  // DESIGN: parse spec → ideal R1/R2 → E96 components → resulting metrics
  // ==========================================================================
  const design = useMemo(() => {
    const fc = parseF(d.fc), Q = parseNum(d.Q, { min: 0 }), C = parseC(d.C);
    const K = dUnity ? { value: 1, error: null } : parseNum(d.K, { min: 1 });
    const errors = { fc, Q, K, C };
    if (fc.error || Q.error || C.error || K.error) return { errors, result: null };

    const ideal = designComponents(type, { fc: fc.value, Q: Q.value, K: K.value, C: C.value });
    if (!ideal.ok) return { errors, result: { error: ideal.error } };

    const R1e = snapResistor(ideal.R1, series);
    const R2e = snapResistor(ideal.R2, series);
    const gain = gainResistors(K.value, 10000, series);
    const comps = { R1: R1e, R2: R2e, C1: C.value, C2: C.value, K: gain.Kactual };
    const metrics = computeMetrics(type, comps);
    return {
      errors,
      result: { ideal, R1e, R2e, gain, C: C.value, comps, metrics, series },
    };
  }, [d, dUnity, type, series]);

  // ==========================================================================
  // Effective components driving the Bode plot + the live readout
  // ==========================================================================
  const effective = mode === 'analyse' ? analyse.comps : design.result?.comps || null;
  const effMetrics = mode === 'analyse' ? analyse.metrics : design.result?.metrics || null;

  const { magSeries, phaseSeries } = useMemo(() => {
    if (!effective || !effMetrics || !Number.isFinite(effMetrics.fc)) {
      return { magSeries: [], phaseSeries: [] };
    }
    const { mag, phase } = bodeSeries(type, effective, effMetrics.fc);
    const passbandDb = 20 * Math.log10(effMetricsGain(effMetrics.K));
    const magSeries = [
      { label: '|H(f)|', data: mag, color: CURVE_COLOR, width: 2 },
      {
        label: 'f_c',
        data: [{ x: effMetrics.fc, y: -80 }, { x: effMetrics.fc, y: passbandDb + 20 }],
        color: REF_COLOR, width: 1, dash: [2, 3],
      },
    ];
    const phaseSeries = [{ label: '∠H(f)', data: phase, color: CURVE_COLOR, width: 2 }];
    return { magSeries, phaseSeries };
  }, [effective, effMetrics, type]);

  const magBounds = useMemo(() => boundsFor(magSeries[0]?.data), [magSeries]);

  return (
    <div class="sk-designer">
      <div class="sk-designer__legend">
        Design a 2nd-order Sallen-Key filter or analyse one you already have. Switch between
        <em> low-pass</em> and <em>high-pass</em>, then pick a mode: <em>Design</em> turns a target
        f<sub>c</sub>/Q/gain into real E-series components (equal capacitors), and <em>Analyse</em> turns
        component values back into f<sub>c</sub>, Q and gain. The Bode plot updates live.
      </div>

      {/* Filter type + mode toggles */}
      <div class="sk-designer__toggles">
        <div class="sk-designer__chips" role="tablist" aria-label="Filter type">
          <Chip active={type === 'lp'} onClick={() => setType('lp')}>Low-pass</Chip>
          <Chip active={type === 'hp'} onClick={() => setType('hp')}>High-pass</Chip>
        </div>
        <div class="sk-designer__chips" role="tablist" aria-label="Mode">
          <Chip active={mode === 'design'} onClick={() => setMode('design')}>Design → components</Chip>
          <Chip active={mode === 'analyse'} onClick={() => setMode('analyse')}>Analyse → response</Chip>
        </div>
      </div>

      <div class="sk-designer__columns">
        {/* ---- Left column: inputs ---- */}
        <div class="sk-designer__panel">
          <Schematic type={type} unity={mode === 'design' ? dUnity : aUnity} />
          {mode === 'design' ? (
            <DesignInputs d={d} setDField={setDField} unity={dUnity} setUnity={setDUnity}
              errors={design.errors} series={series} setSeries={setSeries} />
          ) : (
            <AnalyseInputs a={a} setAField={setAField} unity={aUnity} setUnity={setAUnity} errors={analyse.errors} />
          )}
        </div>

        {/* ---- Right column: results ---- */}
        <div class="sk-designer__panel">
          {mode === 'design'
            ? <DesignResults design={design} unity={dUnity} />
            : <AnalyseResults metrics={analyse.metrics} />}
        </div>
      </div>

      {/* ---- Bode plot ---- */}
      <div class="sk-designer__chart">
        <Plot2d
          title="Magnitude response"
          xLabel="Frequency [Hz]"
          yLabel="|H(f)| [dB]"
          series={magSeries}
          height={260}
          xLog
          yMin={magBounds.min}
          yMax={magBounds.max}
        />
      </div>
      <div class="sk-designer__chart">
        <Plot2d
          title="Phase response"
          xLabel="Frequency [Hz]"
          yLabel="Phase [°]"
          series={phaseSeries}
          height={220}
          xLog
        />
      </div>
    </div>
  );
}

// ===========================================================================
// Input sub-panels
// ===========================================================================

function DesignInputs({ d, setDField, unity, setUnity, errors, series, setSeries }) {
  return (
    <>
      <h4 class="sk-designer__panel-title">Target specification</h4>
      <TextRow label={<>Cut-off f<sub>c</sub></>} value={d.fc} onInput={(v) => setDField('fc', v)}
        suffix="Hz" placeholder="1k" error={errors.fc.error} />
      <TextRow label="Quality factor Q" value={d.Q} onInput={(v) => setDField('Q', v)}
        placeholder="0.707" error={errors.Q.error} />
      {!unity && (
        <TextRow label="Pass-band gain K" value={d.K} onInput={(v) => setDField('K', v)}
          placeholder="2" error={errors.K.error} />
      )}
      <TextRow label="Capacitor C" value={d.C} onInput={(v) => setDField('C', v)}
        suffix="F" placeholder="10n" error={errors.C.error} hint="C1 = C2 = C" />
      <div class="sk-designer__row">
        <span class="sk-designer__row-label">Resistor series</span>
        <div class="sk-designer__row-input">
          <select class="sk-designer__select" value={series}
            onChange={(e) => setSeries(e.currentTarget.value)}>
            {RESISTOR_SERIES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <div class="sk-designer__field-hint">resistors snapped to this E-series</div>
        </div>
      </div>
      <UnityToggle checked={unity} onChange={setUnity} />
    </>
  );
}

function AnalyseInputs({ a, setAField, unity, setUnity, errors }) {
  return (
    <>
      <h4 class="sk-designer__panel-title">Component values</h4>
      <TextRow label={<>R<sub>1</sub></>} value={a.R1} onInput={(v) => setAField('R1', v)} suffix="Ω" placeholder="10k" error={errors.R1.error} />
      <TextRow label={<>R<sub>2</sub></>} value={a.R2} onInput={(v) => setAField('R2', v)} suffix="Ω" placeholder="10k" error={errors.R2.error} />
      <TextRow label={<>C<sub>1</sub></>} value={a.C1} onInput={(v) => setAField('C1', v)} suffix="F" placeholder="10n" error={errors.C1.error} />
      <TextRow label={<>C<sub>2</sub></>} value={a.C2} onInput={(v) => setAField('C2', v)} suffix="F" placeholder="10n" error={errors.C2.error} />
      {!unity && (
        <>
          <TextRow label={<>R<sub>3</sub></>} value={a.R3} onInput={(v) => setAField('R3', v)} suffix="Ω" placeholder="10k" error={errors.R3.error} hint="feedback" />
          <TextRow label={<>R<sub>4</sub></>} value={a.R4} onInput={(v) => setAField('R4', v)} suffix="Ω" placeholder="10k" error={errors.R4.error} hint="K = 1 + R₃/R₄" />
        </>
      )}
      <UnityToggle checked={unity} onChange={setUnity} />
    </>
  );
}

// ===========================================================================
// Result sub-panels
// ===========================================================================

function AnalyseResults({ metrics }) {
  if (!metrics) return <ResultPlaceholder />;
  if (!metrics.stable) {
    return (
      <>
        <h4 class="sk-designer__panel-title">Results</h4>
        <div class="sk-designer__note sk-designer__note--warn">
          The denominator's damping term is ≤ 0, so this filter has poles in the right-half plane — it is
          <strong> unstable / self-oscillating</strong>. Reduce the gain K or adjust component ratios.
        </div>
      </>
    );
  }
  const peaking = metrics.Q > Q_PEAK_LIMIT;
  return (
    <>
      <h4 class="sk-designer__panel-title">Results</h4>
      <Readout label="Cut-off frequency f_c">{formatF(metrics.fc)}</Readout>
      <Readout label="Quality factor Q">
        {metrics.Q.toFixed(3)}{' '}
        {peaking
          ? <span class="sk-designer__tag">Q &gt; 0.707 → peaking</span>
          : <span class="sk-designer__muted">no peaking</span>}
      </Readout>
      <Readout label="Pass-band gain K">
        {metrics.K.toFixed(3)} <span class="sk-designer__muted">({(20 * Math.log10(metrics.K)).toFixed(2)} dB)</span>
      </Readout>
    </>
  );
}

function DesignResults({ design, unity }) {
  const r = design.result;
  if (!r) return <ResultPlaceholder />;
  if (r.error) {
    return (
      <>
        <h4 class="sk-designer__panel-title">Components</h4>
        <div class="sk-designer__note sk-designer__note--warn">{r.error}</div>
      </>
    );
  }
  const { ideal, R1e, R2e, gain, C, metrics, series } = r;
  const tag = ` (${series})`;
  const peaking = metrics.Q > Q_PEAK_LIMIT;
  return (
    <>
      <h4 class="sk-designer__panel-title">Components <span class="sk-designer__muted">(ideal → nearest {series})</span></h4>
      <CompRow label={<>R<sub>1</sub></>} ideal={formatR(ideal.R1)} chosen={formatR(R1e) + tag} />
      <CompRow label={<>R<sub>2</sub></>} ideal={formatR(ideal.R2)} chosen={formatR(R2e) + tag} />
      <CompRow label={<>C<sub>1</sub> = C<sub>2</sub></>} ideal={formatC(C)} chosen={formatC(C)} />
      {unity ? (
        <CompRow label={<>R<sub>3</sub>, R<sub>4</sub></>} ideal="—" chosen="none (unity gain)" />
      ) : (
        <>
          <CompRow label={<>R<sub>4</sub></>} ideal={formatR(gain.R4)} chosen={formatR(gain.R4e) + ' (chosen)'} />
          <CompRow label={<>R<sub>3</sub></>} ideal={formatR(gain.R3)} chosen={formatR(gain.R3e) + tag} />
        </>
      )}

      <h4 class="sk-designer__panel-title sk-designer__panel-title--spaced">As built (E-series)</h4>
      <Readout label="Cut-off frequency f_c">{formatF(metrics.fc)}</Readout>
      <Readout label="Quality factor Q">
        {metrics.Q.toFixed(3)}{' '}
        {peaking ? <span class="sk-designer__tag">peaking</span> : null}
      </Readout>
      <Readout label="Pass-band gain K">
        {metrics.K.toFixed(3)} <span class="sk-designer__muted">({(20 * Math.log10(metrics.K)).toFixed(2)} dB)</span>
      </Readout>
    </>
  );
}

function ResultPlaceholder() {
  return (
    <>
      <h4 class="sk-designer__panel-title">Results</h4>
      <div class="sk-designer__note">Fix the highlighted input(s) to see results.</div>
    </>
  );
}

// ===========================================================================
// Small presentational helpers
// ===========================================================================

function Chip({ active, onClick, children }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      class={'sk-designer__chip' + (active ? ' sk-designer__chip--active' : '')}
      onClick={onClick}
    >{children}</button>
  );
}

function TextRow({ label, value, onInput, suffix, placeholder, error, hint }) {
  return (
    <div class="sk-designer__row">
      <span class="sk-designer__row-label">{label}</span>
      <div class="sk-designer__row-input">
        <div class={'sk-designer__field' + (error ? ' sk-designer__field--error' : '')}>
          <input
            type="text"
            value={value}
            spellcheck={false}
            placeholder={placeholder}
            onInput={(e) => onInput(e.currentTarget.value)}
            class="sk-designer__input"
          />
          {suffix && <span class="sk-designer__suffix">{suffix}</span>}
        </div>
        {error
          ? <div class="sk-designer__field-error">{error}</div>
          : hint ? <div class="sk-designer__field-hint">{hint}</div> : null}
      </div>
    </div>
  );
}

function UnityToggle({ checked, onChange }) {
  return (
    <label class="sk-designer__unity">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.currentTarget.checked)} />
      <span>Unity gain (no R<sub>3</sub>/R<sub>4</sub>, K = 1)</span>
    </label>
  );
}

function Readout({ label, children }) {
  return (
    <div class="sk-designer__readout">
      <span class="sk-designer__readout-label">{label}</span>
      <span class="sk-designer__readout-value">{children}</span>
    </div>
  );
}

function CompRow({ label, ideal, chosen }) {
  return (
    <div class="sk-designer__comp">
      <span class="sk-designer__comp-label">{label}</span>
      <span class="sk-designer__comp-ideal">{ideal}</span>
      <span class="sk-designer__comp-arrow">→</span>
      <span class="sk-designer__comp-chosen">{chosen}</span>
    </div>
  );
}

// ===========================================================================
// Plot helpers
// ===========================================================================

function effMetricsGain(K) {
  return Number.isFinite(K) && K > 0 ? K : 1;
}

// y-axis bounds for the magnitude plot: a little headroom above the peak, and a
// sensible -80 dB floor.
function boundsFor(data) {
  if (!data || !data.length) return { min: -80, max: 10 };
  let peak = -Infinity;
  for (const p of data) if (Number.isFinite(p.y) && p.y > peak) peak = p.y;
  if (!Number.isFinite(peak)) return { min: -80, max: 10 };
  const max = Math.ceil((peak + 10) / 10) * 10;
  return { min: -80, max: Math.max(max, 10) };
}

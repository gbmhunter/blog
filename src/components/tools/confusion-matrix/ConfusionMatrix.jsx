import { useState, useMemo } from 'preact/hooks';
import {
  parseCount, countsFromScenario, computeMetrics,
  formatRatio, formatPercent, formatCount,
} from './calc.js';
import { InputRow } from '../_shared/FormRows.jsx';
import './styles.css';

// Defaults are the worked example from the page: 10,000 PCBs, 100 defective,
// 80 flagged, 60 of those flags correct. Keeps the widget and the example in the page in sync.
const DEFAULT_COUNTS = { tp: '60', fn: '40', fp: '20', tn: '9880' };
const DEFAULT_SCENARIO = { total: '10000', actualPos: '100', flagged: '80', correct: '60' };

const BETA_PRESETS = [
  { beta: 0.5, label: 'F0.5', title: 'Weights precision higher than recall.' },
  { beta: 1, label: 'F1', title: 'Weights precision and recall equally.' },
  { beta: 2, label: 'F2', title: 'Weights recall higher than precision.' },
];

const SCENARIO_FIELDS = [
  {
    key: 'total', label: 'Total samples', placeholder: '10000',
    help: 'Every sample the classifier was run over.',
  },
  {
    key: 'actualPos', label: 'Actually +ve', placeholder: '100',
    help: 'How many of those samples really belong to the positive class.',
  },
  {
    key: 'flagged', label: 'Flagged +ve', placeholder: '80',
    help: 'How many samples the classifier predicted as positive, right or wrong.',
  },
  {
    key: 'correct', label: '...of which how many were correct?', placeholder: '60',
    help: 'How many of the flagged samples really were positive. This is TP.',
  },
];

export default function ConfusionMatrix() {
  const [mode, setMode] = useState('counts');
  const [counts, setCounts] = useState(DEFAULT_COUNTS);
  const [scenario, setScenario] = useState(DEFAULT_SCENARIO);
  const [beta, setBeta] = useState(1);

  const parsedCounts = useMemo(() => ({
    tp: parseCount(counts.tp), fn: parseCount(counts.fn),
    fp: parseCount(counts.fp), tn: parseCount(counts.tn),
  }), [counts]);

  const parsedScenario = useMemo(() => ({
    total: parseCount(scenario.total), actualPos: parseCount(scenario.actualPos),
    flagged: parseCount(scenario.flagged), correct: parseCount(scenario.correct),
  }), [scenario]);

  // Both modes converge on the same four numbers.
  const resolved = useMemo(() => {
    if (mode === 'counts') {
      const p = parsedCounts;
      if (Object.values(p).some((x) => x.error)) return { counts: null, error: null };
      return { counts: { tp: p.tp.value, fp: p.fp.value, fn: p.fn.value, tn: p.tn.value }, error: null };
    }
    const p = parsedScenario;
    if (Object.values(p).some((x) => x.error)) return { counts: null, error: null };
    const derived = countsFromScenario({
      total: p.total.value, actualPos: p.actualPos.value,
      flagged: p.flagged.value, correct: p.correct.value,
    });
    if (derived.error) return { counts: null, error: derived.error };
    return { counts: derived, error: null };
  }, [mode, parsedCounts, parsedScenario]);

  const metrics = useMemo(
    () => (resolved.counts ? computeMetrics(resolved.counts, beta) : null),
    [resolved, beta],
  );

  const m = metrics ?? {};
  const warn = metrics?.warnings ?? {};

  const setCount = (key, text) => setCounts((prev) => ({ ...prev, [key]: text }));
  const setScenarioField = (key, text) => setScenario((prev) => ({ ...prev, [key]: text }));

  const cell = (key, tag, correct) => (
    <div class={correct ? 'cm__cell cm__cell--right' : 'cm__cell'}>
      <span class="cm__tag">{tag}</span>
      <input
        type="text"
        inputMode="numeric"
        class={parsedCounts[key].error ? 'calc-form__input calc-form__input--error' : 'calc-form__input'}
        value={counts[key]}
        onInput={(e) => setCount(key, e.currentTarget.value)}
        placeholder={DEFAULT_COUNTS[key]}
        spellcheck={false}
        aria-label={tag}
      />
      {parsedCounts[key].error && <div class="calc-form__input-error">{parsedCounts[key].error}</div>}
    </div>
  );

  return (
    <div class="calc-form cm">
      <div class="calc-form__legend">
        Enter the four confusion-matrix counts (or describe the scenario) to get every metric on this
        page computed at once. Defaults are the PCB-defect example from above.
      </div>

      <div class="cm__modes">
        {[['counts', 'Enter counts'], ['scenario', 'Enter scenario']].map(([value, label]) => (
          <label class="cm__mode" key={value}>
            <input
              type="radio"
              name="cm-mode"
              checked={mode === value}
              onChange={() => setMode(value)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      {mode === 'counts' ? (
        <div class="cm__grid">
          <div />
          <div class="cm__head cm__head--col">Predicted positive</div>
          <div class="cm__head cm__head--col">Predicted negative</div>

          <div class="cm__head cm__head--row">Actually positive</div>
          {cell('tp', 'TP', true)}
          {cell('fn', 'FN', false)}

          <div class="cm__head cm__head--row">Actually negative</div>
          {cell('fp', 'FP', false)}
          {cell('tn', 'TN', true)}
        </div>
      ) : (
        <div class="calc-form__rows">
          {SCENARIO_FIELDS.map((f) => (
            <InputRow
              key={f.key}
              label={f.label}
              value={scenario[f.key]}
              onInput={(t) => setScenarioField(f.key, t)}
              placeholder={f.placeholder}
              parsed={parsedScenario[f.key]}
              help={f.help}
            />
          ))}
          <div class="cm__derived">
            {resolved.error ? (
              <span class="cm__derived-error">{resolved.error}</span>
            ) : resolved.counts ? (
              <>
                <span class="cm__derived-label">Gives</span>
                {[['TP', resolved.counts.tp], ['FP', resolved.counts.fp],
                  ['FN', resolved.counts.fn], ['TN', resolved.counts.tn]].map(([tag, v]) => (
                  <span class="cm__derived-item" key={tag}>
                    <span class="cm__tag">{tag}</span> {formatCount(v)}
                  </span>
                ))}
              </>
            ) : (
              <span class="cm__derived-label">Fix the inputs above to see the counts.</span>
            )}
          </div>
        </div>
      )}

      <div class="cm__beta">
        <span class="cm__beta-label">β</span>
        <input
          type="range" min="0.1" max="5" step="0.1"
          value={beta}
          onInput={(e) => setBeta(Number(e.currentTarget.value))}
          aria-label="F-beta weighting"
        />
        <input
          type="number" min="0.1" max="5" step="0.1"
          value={beta}
          onInput={(e) => setBeta(clampBeta(Number(e.currentTarget.value)))}
          class="cm__beta-num"
        />
        <div class="cm__beta-presets">
          {BETA_PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              title={p.title}
              class={beta === p.beta ? 'cm__chip cm__chip--active' : 'cm__chip'}
              onClick={() => setBeta(p.beta)}
            >{p.label}</button>
          ))}
        </div>
      </div>

      {metrics?.empty && (
        <div class="cm__notice">All four counts are zero — there is nothing to measure yet.</div>
      )}

      <div class="cm__metrics">
        <Metric label="Prevalence" sub="(TP+FN) / N" value={m.prevalence} format={formatPercent} />
        <Metric label="Samples" sub="N" value={m.n} format={formatCount} />

        <Metric label="Accuracy" sub="(TP+TN) / N" value={m.accuracy} format={formatRatio}
          warning={warn.accuracy} />
        <Metric
          label="↳ baseline"
          sub={metrics && metrics.baselineClass ? `always guess "${metrics.baselineClass}"` : 'majority class only'}
          value={m.baseline} format={formatRatio} muted />

        <Metric label="Balanced accuracy" sub="(TPR + TNR) / 2" value={m.balancedAccuracy} format={formatRatio} />
        <Metric label="MCC" sub="Matthews correlation" value={m.mcc} format={formatRatio} warning={warn.mcc} />

        <Metric label="Precision" sub="PPV — TP / (TP+FP)" value={m.precision} format={formatRatio}
          warning={warn.precision} />
        <Metric label="NPV" sub="TN / (TN+FN)" value={m.npv} format={formatRatio} warning={warn.npv} />

        <Metric label="Recall" sub="TPR — TP / (TP+FN)" value={m.recall} format={formatRatio}
          warning={warn.recall} />
        <Metric label="Specificity" sub="TNR — TN / (TN+FP)" value={m.specificity} format={formatRatio}
          warning={warn.specificity} />

        <Metric label="FPR" sub="1 − specificity" value={m.fpr} format={formatRatio} muted />
        <Metric label="FNR" sub="1 − recall" value={m.fnr} format={formatRatio} muted />

        <Metric label={<>F<sub>1</sub></>} sub="harmonic mean of P and R" value={m.f1} format={formatRatio}
          warning={warn.f1} />
        <Metric label={<>F<sub>β</sub></>} sub={`β = ${beta.toFixed(1)}`} value={m.fBeta} format={formatRatio}
          warning={warn.fBeta} />
      </div>
    </div>
  );
}

function clampBeta(v) {
  if (!Number.isFinite(v)) return 1;
  return Math.min(5, Math.max(0.1, v));
}

function Metric({ label, sub, value, format, warning, muted }) {
  return (
    <div class={muted ? 'cm__metric cm__metric--muted' : 'cm__metric'}>
      <div class="cm__metric-label">
        <span class="cm__metric-name">{label}</span>
        <span class="cm__metric-sub">{sub}</span>
      </div>
      <div class={warning ? 'calc-form__output calc-form__output--warning' : 'calc-form__output'}>
        {Number.isFinite(value) ? (
          <span class="calc-form__output-value">{format(value)}</span>
        ) : (
          <span class="calc-form__output-empty">—</span>
        )}
      </div>
      {warning && <div class="calc-form__input-warning cm__metric-warning">{warning}</div>}
    </div>
  );
}

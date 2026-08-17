/**
 * Pure logic for the confusion matrix calculator.
 *
 * Everything here works on the four raw counts (TP, FP, FN, TN). The widget
 * offers two ways of getting to them — typing them directly, or describing a
 * scenario (total / actually positive / flagged / correct) which we then
 * reduce to the same four numbers.
 *
 * Undefined metrics (a zero denominator) come back as NaN so `Metric` can
 * render an em-dash rather than "NaN". MCC is the one exception: scikit-learn
 * defines it as 0 when the denominator degenerates, and we match that so the
 * number agrees with what readers see in their own reports.
 */

const PRECISION_DP = 4;

// Below (or above) this prevalence, accuracy is being carried by the majority
// class and shouldn't be quoted on its own. 10% is a judgement call, not a
// standard — it's roughly where the baseline classifier starts to look good.
const IMBALANCE_THRESHOLD = 0.1;

/** Parse a count: a non-negative integer. Lenient about thousands separators. */
export function parseCount(text) {
  const raw = String(text ?? '').trim();
  if (raw === '') return { value: NaN, error: 'Required.' };

  // Allow "10,000", "10 000" and "10_000" — people paste counts in all three.
  const s = raw.replace(/[,\s_]/g, '');

  if (!/^\d+$/.test(s)) {
    if (/^-/.test(s)) return { value: NaN, error: 'Must not be negative.' };
    if (/^\d*\.\d+$/.test(s)) return { value: NaN, error: 'Must be a whole number.' };
    return { value: NaN, error: 'Must be a whole number.' };
  }

  const value = Number(s);
  if (!Number.isSafeInteger(value)) return { value: NaN, error: 'Too large.' };
  return { value, error: null };
}

/**
 * Reduce a scenario description to the four counts.
 *
 * Mirrors the worked example on the page: N boards were inspected, `actualPos`
 * of them were genuinely defective, the model flagged `flagged`, and `correct`
 * of those flags were right.
 */
export function countsFromScenario({ total, actualPos, flagged, correct }) {
  const err = (error) => ({ tp: NaN, fp: NaN, fn: NaN, tn: NaN, error });

  if (![total, actualPos, flagged, correct].every(Number.isFinite)) return err(null);

  if (actualPos > total) return err('Actually positive cannot exceed the total number of samples.');
  if (flagged > total) return err('Flagged positive cannot exceed the total number of samples.');
  if (correct > flagged) return err('Correctly flagged cannot exceed the number flagged.');
  if (correct > actualPos) return err('Correctly flagged cannot exceed the number actually positive.');

  const tp = correct;
  const fp = flagged - correct;
  const fn = actualPos - correct;
  const tn = total - tp - fp - fn;

  if (tn < 0) return err('These numbers do not add up — flagged plus actually positive exceeds the total.');

  return { tp, fp, fn, tn, error: null };
}

/** F-beta from precision and recall. beta > 1 favours recall, beta < 1 precision. */
export function fBetaScore(precision, recall, beta) {
  if (!Number.isFinite(precision) || !Number.isFinite(recall)) return NaN;
  const b2 = beta * beta;
  const denom = b2 * precision + recall;
  // Both precision and recall are zero. Conventionally scored 0, not undefined.
  if (denom === 0) return 0;
  return ((1 + b2) * precision * recall) / denom;
}

/** All the metrics the widget displays, plus a per-metric warning map. */
export function computeMetrics({ tp, fp, fn, tn }, beta) {
  const n = tp + fp + fn + tn;
  const warnings = {};

  if (n === 0) {
    return {
      n: 0,
      prevalence: NaN, accuracy: NaN, baseline: NaN, baselineClass: null,
      balancedAccuracy: NaN, precision: NaN, npv: NaN, recall: NaN,
      specificity: NaN, fpr: NaN, fnr: NaN, f1: NaN, fBeta: NaN, mcc: NaN,
      warnings, empty: true,
    };
  }

  const actualPos = tp + fn;
  const actualNeg = fp + tn;
  const predPos = tp + fp;
  const predNeg = tn + fn;

  const prevalence = actualPos / n;
  const accuracy = (tp + tn) / n;

  // The "do nothing" classifier: always guess whichever class is bigger.
  const baselineClass = actualNeg >= actualPos ? 'negative' : 'positive';
  const baseline = Math.max(actualPos, actualNeg) / n;

  const precision = predPos === 0 ? NaN : tp / predPos;
  const npv = predNeg === 0 ? NaN : tn / predNeg;
  const recall = actualPos === 0 ? NaN : tp / actualPos;
  const specificity = actualNeg === 0 ? NaN : tn / actualNeg;
  const fpr = Number.isFinite(specificity) ? 1 - specificity : NaN;
  const fnr = Number.isFinite(recall) ? 1 - recall : NaN;

  const balancedAccuracy =
    Number.isFinite(recall) && Number.isFinite(specificity) ? (recall + specificity) / 2 : NaN;

  const f1 = fBetaScore(precision, recall, 1);
  const fBeta = fBetaScore(precision, recall, beta);

  // F-scores inherit precision/recall being undefined. Worth calling out, because
  // scikit-learn reports 0.0 here (with a zero-division warning) rather than
  // nothing at all, and readers cross-checking a classification_report would
  // otherwise think one of the two is broken.
  if (!Number.isFinite(f1)) {
    const missing = !Number.isFinite(precision) ? 'Precision' : 'Recall';
    warnings.f1 = `${missing} is undefined, so the F-scores are too. scikit-learn reports 0.0 in this case and raises a zero-division warning.`;
    warnings.fBeta = warnings.f1;
  }

  // MCC. Any zero factor in the denominator means a whole row or column of the
  // matrix is empty; scikit-learn returns 0 there rather than dividing by zero.
  const mccDenomSq = predPos * actualPos * actualNeg * predNeg;
  let mcc;
  if (mccDenomSq === 0) {
    mcc = 0;
    warnings.mcc = 'A whole row or column of the matrix is empty, so MCC is undefined. Reported as 0, which is what scikit-learn does.';
  } else {
    mcc = (tp * tn - fp * fn) / Math.sqrt(mccDenomSq);
  }

  if (predPos === 0) {
    warnings.precision = 'The classifier never predicted positive, so there is nothing to be precise about.';
  }
  if (predNeg === 0) {
    warnings.npv = 'The classifier never predicted negative.';
  }
  if (actualPos === 0) {
    warnings.recall = 'There are no actual positives in this data, so there is nothing to recall.';
  }
  if (actualNeg === 0) {
    warnings.specificity = 'There are no actual negatives in this data.';
  }

  if (prevalence < IMBALANCE_THRESHOLD || prevalence > 1 - IMBALANCE_THRESHOLD) {
    const gain = accuracy - baseline;
    const gainText = gain >= 0
      ? `only ${formatRatio(gain)} better than`
      : `${formatRatio(-gain)} worse than`;
    warnings.accuracy =
      `Classes are imbalanced (prevalence ${formatPercent(prevalence)}), so accuracy is dominated by the ` +
      `majority class. This score is ${gainText} a classifier that always guesses "${baselineClass}". ` +
      `Read precision and recall instead.`;
  }

  return {
    n, prevalence, accuracy, baseline, baselineClass, balancedAccuracy,
    precision, npv, recall, specificity, fpr, fnr, f1, fBeta, mcc,
    warnings, empty: false,
  };
}

export const formatRatio = (v) => (Number.isFinite(v) ? v.toFixed(PRECISION_DP) : '—');
export const formatPercent = (v) => (Number.isFinite(v) ? `${(v * 100).toFixed(2)} %` : '—');
export const formatCount = (v) => (Number.isFinite(v) ? v.toLocaleString('en-US') : '—');

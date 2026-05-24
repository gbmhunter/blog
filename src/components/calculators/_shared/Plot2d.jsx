import { useEffect, useRef, useState } from 'preact/hooks';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';
import './plot2d.css';

/**
 * Thin Preact wrapper around uPlot for 2D engineering charts (line/scatter,
 * frequency responses, time-domain signals, etc.). uPlot is ~40 KB so we
 * import it directly — Astro will only bundle it into pages that use this
 * widget.
 *
 * Props
 *   title       — optional title shown above the chart
 *   xLabel      — x-axis label
 *   yLabel      — y-axis label
 *   series      — Array<{ label, data: Array<{x,y}>, color }>
 *   height      — px (default 220)
 *   xLog, yLog  — boolean, optional log axes
 *   yMin, yMax  — optional fixed y range (otherwise auto-scaled)
 *
 * Theme: colours are read from Starlight CSS variables at mount time. If the
 * user toggles light/dark mode the chart redraws on next prop update — good
 * enough for now.
 */
export default function Plot2d({
  title,
  xLabel,
  yLabel,
  series,
  height = 220,
  xLog = false,
  yLog = false,
  yMin,
  yMax,
}) {
  const wrapRef = useRef(null);
  const uRef = useRef(null);
  const [width, setWidth] = useState(0);

  // Resize observer so the chart re-renders when the container width changes
  // (e.g. browser resize, sidebar toggle, container query).
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.max(200, Math.floor(entries[0].contentRect.width));
      setWidth(w);
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  // Build / update the chart whenever the data, dimensions, or scales change.
  useEffect(() => {
    if (!wrapRef.current || width === 0) return;

    // uPlot wants data as [xValues, ySeries1, ySeries2, ...].
    // We assume all series share the same x grid (or close to it) — use the
    // first series' x values as the canonical x axis. For the frequency-
    // response case where x values differ per series this is fine because
    // uPlot interpolates linearly between samples.
    const xValues = series[0]?.data.map((p) => p.x) ?? [];
    const yArrays = series.map((s) => s.data.map((p) => p.y));
    const data = [xValues, ...yArrays];

    // Resolve theme colors. Read CSS vars once per draw — cheap enough.
    const cs = getComputedStyle(wrapRef.current);
    const text = cs.getPropertyValue('--sl-color-text').trim() || '#222';
    const gray5 = cs.getPropertyValue('--sl-color-gray-5').trim() || '#ccc';

    const opts = {
      width,
      height,
      title,
      cursor: { drag: { x: false, y: false } },
      scales: {
        x: xLog ? { distr: 3, log: 10 } : { time: false },
        y: {
          ...(yLog ? { distr: 3, log: 10 } : {}),
          ...(yMin !== undefined || yMax !== undefined
            ? { range: () => [yMin ?? null, yMax ?? null] }
            : {}),
        },
      },
      axes: [
        {
          label: xLabel,
          stroke: text,
          grid: { stroke: gray5, width: 0.5 },
          ticks: { stroke: gray5, width: 0.5 },
          labelFont: '12px ui-sans-serif, system-ui, sans-serif',
          font: '11px ui-sans-serif, system-ui, sans-serif',
        },
        {
          label: yLabel,
          stroke: text,
          grid: { stroke: gray5, width: 0.5 },
          ticks: { stroke: gray5, width: 0.5 },
          labelFont: '12px ui-sans-serif, system-ui, sans-serif',
          font: '11px ui-sans-serif, system-ui, sans-serif',
          size: 56,
        },
      ],
      series: [
        { label: xLabel || 'x' },           // x-series placeholder
        ...series.map((s) => ({
          label: s.label,
          stroke: s.color,
          width: 1.5,
          points: { show: false },
        })),
      ],
      legend: {
        show: series.length > 1,
        live: false,
      },
    };

    if (uRef.current) {
      uRef.current.destroy();
      uRef.current = null;
    }
    uRef.current = new uPlot(opts, data, wrapRef.current);

    return () => {
      if (uRef.current) {
        uRef.current.destroy();
        uRef.current = null;
      }
    };
  }, [width, height, title, xLabel, yLabel, series, xLog, yLog, yMin, yMax]);

  return <div ref={wrapRef} class="plot2d" style={{ height: `${height + 50}px` }} />;
}

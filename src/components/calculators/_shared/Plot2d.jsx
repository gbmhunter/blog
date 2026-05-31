import { useEffect, useRef } from 'preact/hooks';
import {
  Chart,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  ScatterController,
} from 'chart.js';
import './plot2d.css';

// Register only the chart.js modules we actually use. Tree-shaking trims the
// rest from the bundle.
Chart.register(
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  ScatterController,
);

/**
 * Thin Preact wrapper around Chart.js for 2D engineering charts (line/scatter,
 * frequency responses, time-domain signals, etc.). Picked over uPlot because
 * Chart.js animates data updates smoothly out of the box, which is what
 * calculator widgets with sliders want.
 *
 * Props
 *   title       — optional chart title
 *   xLabel      — x-axis label
 *   yLabel      — y-axis label
 *   series      — Array<{ label, data: Array<{x,y}>, color }>
 *   height      — px (default 240)
 *   xLog, yLog  — boolean, optional log axes
 *   yMin, yMax  — optional fixed y range (otherwise auto-scaled)
 *
 * Theme: colours are read from Starlight CSS variables on every redraw so
 * axis labels and gridlines stay readable in both light and dark modes.
 */
export default function Plot2d({
  title,
  xLabel,
  yLabel,
  series,
  height = 240,
  xLog = false,
  yLog = false,
  yMin,
  yMax,
}) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // Create the chart once on mount.
  useEffect(() => {
    if (!canvasRef.current) return;
    const { text, grid } = readThemeColors(canvasRef.current);

    chartRef.current = new Chart(canvasRef.current, {
      type: 'scatter',
      data: { datasets: buildDatasets(series) },
      options: buildOptions({ title, xLabel, yLabel, xLog, yLog, yMin, yMax, text, grid, showLegend: series.length > 1 }),
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update data + options when props change. Chart.js animates the transition.
  useEffect(() => {
    const c = chartRef.current;
    if (!c || !canvasRef.current) return;
    const { text, grid } = readThemeColors(canvasRef.current);

    // IMPORTANT: mutate the existing datasets in place instead of replacing
    // the array. Chart.js identifies datasets by reference — if we swap them
    // out it treats the new data as a fresh chart and animates each line in
    // from the baseline (y = 0) instead of tweening point-by-point from the
    // previous values to the new ones.
    series.forEach((s, i) => {
      const existing = c.data.datasets[i];
      if (existing) {
        existing.data = s.data;
        existing.label = s.label;
        existing.borderColor = s.color;
        existing.backgroundColor = s.color;
        existing.borderDash = s.dash || [];
        existing.borderWidth = s.width ?? 1.5;
      } else {
        c.data.datasets.push(buildDataset(s));
      }
    });
    // Trim if series count shrank.
    while (c.data.datasets.length > series.length) c.data.datasets.pop();

    c.options = buildOptions({ title, xLabel, yLabel, xLog, yLog, yMin, yMax, text, grid, showLegend: series.length > 1 });
    c.update();
  }, [series, title, xLabel, yLabel, xLog, yLog, yMin, yMax]);

  return (
    <div class="plot2d" style={{ height: `${height}px` }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

function readThemeColors(el) {
  const cs = getComputedStyle(el);
  return {
    text: cs.getPropertyValue('--sl-color-text').trim() || '#222',
    grid: cs.getPropertyValue('--sl-color-gray-5').trim() || '#ccc',
  };
}

function buildDataset(s) {
  return {
    label: s.label,
    data: s.data,
    borderColor: s.color,
    backgroundColor: s.color,
    showLine: true,
    pointRadius: 0,
    borderWidth: s.width ?? 1.5,
    // Optional dashed reference lines (e.g. a -3 dB threshold). Solid by default.
    borderDash: s.dash || [],
    tension: 0,
  };
}

function buildDatasets(series) {
  return series.map(buildDataset);
}

function buildOptions({ title, xLabel, yLabel, xLog, yLog, yMin, yMax, text, grid, showLegend }) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 300 },
    interaction: { mode: 'nearest', intersect: false, axis: 'x' },
    scales: {
      x: {
        type: xLog ? 'logarithmic' : 'linear',
        title: { display: !!xLabel, text: xLabel, color: text, font: { size: 12 } },
        ticks: { color: text, font: { size: 11 } },
        grid: { color: grid, lineWidth: 0.5 },
      },
      y: {
        type: yLog ? 'logarithmic' : 'linear',
        title: { display: !!yLabel, text: yLabel, color: text, font: { size: 12 } },
        ticks: { color: text, font: { size: 11 } },
        grid: { color: grid, lineWidth: 0.5 },
        min: yMin,
        max: yMax,
      },
    },
    plugins: {
      title: {
        display: !!title,
        text: title,
        color: text,
        font: { size: 13, weight: 'bold' },
        padding: { bottom: 6 },
      },
      legend: {
        display: showLegend,
        labels: { color: text, font: { size: 12 }, boxWidth: 16, boxHeight: 2 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: (${ctx.parsed.x.toPrecision(4)}, ${ctx.parsed.y.toPrecision(4)})`,
        },
      },
    },
  };
}

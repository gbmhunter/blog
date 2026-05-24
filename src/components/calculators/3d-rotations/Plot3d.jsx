import { useEffect, useRef, useState } from 'preact/hooks';

/**
 * Lazy-loaded Plotly 3D scene showing a reference frame and a rotated frame.
 *
 * Plotly is `import()`-ed on first mount so the ~1 MB dist isn't pulled in on
 * pages that don't render this widget. Subsequent updates use the same loaded
 * instance via `Plotly.react`, so changing the rotation matrix doesn't refetch.
 *
 * Props:
 *   rotMatrix: 3×3 array — the rotation applied to the second frame.
 */
export default function Plot3d({ rotMatrix }) {
  const containerRef = useRef(null);
  const plotlyRef = useRef(null);          // cached Plotly module
  const [loadError, setLoadError] = useState(null);

  // Build the trace data for a given rotation matrix.
  const buildData = (m) => {
    const refColor = '#2563eb';  // reference frame (blue)
    const rotColor = '#16a34a';  // rotated frame (green)
    const traces = [];

    // Reference frame axes (along X, Y, Z).
    const refAxes = [
      { p: [1, 0, 0], lbl: 'x₁' },
      { p: [0, 1, 0], lbl: 'y₁' },
      { p: [0, 0, 1], lbl: 'z₁' },
    ];
    refAxes.forEach((a, i) => {
      traces.push({
        type: 'scatter3d',
        mode: 'lines',
        x: [0, a.p[0]], y: [0, a.p[1]], z: [0, a.p[2]],
        line: { width: 5, color: refColor },
        showlegend: i === 0,
        name: 'reference frame',
        hoverinfo: 'skip',
      });
    });

    // Rotated frame axes = rotation matrix columns.
    const rotAxes = [0, 1, 2].map((col) => [m[0][col], m[1][col], m[2][col]]);
    const rotLabels = ['x₂', 'y₂', 'z₂'];
    rotAxes.forEach((p, i) => {
      traces.push({
        type: 'scatter3d',
        mode: 'lines',
        x: [0, p[0]], y: [0, p[1]], z: [0, p[2]],
        line: { width: 5, color: rotColor },
        showlegend: i === 0,
        name: 'rotated frame',
        hoverinfo: 'skip',
      });
    });

    // Axis-tip labels as a single text-mode scatter trace, so we don't pay
    // the cost of one trace per label.
    const labelPoints = [...refAxes, ...rotAxes.map((p, i) => ({ p, lbl: rotLabels[i] }))];
    traces.push({
      type: 'scatter3d',
      mode: 'text',
      x: labelPoints.map((l) => l.p[0] * 1.1),
      y: labelPoints.map((l) => l.p[1] * 1.1),
      z: labelPoints.map((l) => l.p[2] * 1.1),
      text: labelPoints.map((l) => l.lbl),
      textfont: {
        color: [refColor, refColor, refColor, rotColor, rotColor, rotColor],
        size: 12,
      },
      showlegend: false,
      hoverinfo: 'skip',
    });

    return traces;
  };

  const layout = {
    margin: { l: 0, r: 0, b: 0, t: 0 },
    scene: {
      xaxis: { range: [-1.2, 1.2], title: { text: '' } },
      yaxis: { range: [-1.2, 1.2], title: { text: '' } },
      zaxis: { range: [-1.2, 1.2], title: { text: '' } },
      aspectratio: { x: 1, y: 1, z: 1 },
      camera: { eye: { x: 1.6, y: 1.6, z: 1.2 } },
    },
    legend: { orientation: 'h', x: 0, y: 1.05 },
    paper_bgcolor: 'rgba(0,0,0,0)',
  };
  const config = { displayModeBar: false, responsive: true };

  // First mount: lazy-load plotly and draw.
  useEffect(() => {
    let cancelled = false;
    import('plotly.js-dist-min')
      .then((mod) => {
        if (cancelled) return;
        const Plotly = mod.default || mod;
        plotlyRef.current = Plotly;
        if (containerRef.current) {
          Plotly.newPlot(containerRef.current, buildData(rotMatrix), layout, config);
        }
      })
      .catch((e) => { if (!cancelled) setLoadError(e.message || String(e)); });
    return () => {
      cancelled = true;
      const Plotly = plotlyRef.current;
      if (Plotly && containerRef.current) {
        try { Plotly.purge(containerRef.current); } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Subsequent updates: efficient re-render via Plotly.react.
  useEffect(() => {
    const Plotly = plotlyRef.current;
    if (!Plotly || !containerRef.current) return;
    Plotly.react(containerRef.current, buildData(rotMatrix), layout, config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotMatrix]);

  if (loadError) {
    return (
      <div class="rotations3d__plot-error">
        Failed to load 3D plot: {loadError}
      </div>
    );
  }
  return <div ref={containerRef} class="rotations3d__plot" />;
}

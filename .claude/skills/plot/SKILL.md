---
name: plot
description: Create a graph/plot for the current blog page using Python and matplotlib, saving the source to the page's _assets/main.py and the output as a PNG. Use whenever the user asks to create, add, or update a plot, graph, chart, curve, frequency response, waveform, or any figure that visualizes data or a mathematical function. For schematics, block diagrams, and topology/flow figures use the diagram skill (SVG) instead.
---

# Plot Skill

Create plots with Python + matplotlib, following the convention already used by ~40 pages in this repo: the source lives in `<page-folder>/_assets/main.py` and the rendered PNG sits next to it.

Why matplotlib instead of hand-authored SVG: curves come out mathematically exact, axes/ticks/grids are automatic, and the committed `main.py` makes every plot reproducible and easy to tweak later.

## Step 1: Identify the target page

Determine which page the plot belongs to (the `.mdx` file currently being worked on). The plot script is always `<page-folder>/_assets/main.py` — one script per page, containing all of that page's plots.

## Step 2: Write or extend `_assets/main.py`

**If `main.py` does not exist for the page**, create it with this structure:

```python
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np

SCRIPT_DIR = Path(__file__).parent

def main():
    create_my_plot_name()

def create_my_plot_name():
    x = np.linspace(0, 100, 200)
    y = some_function(x)

    fig, ax = plt.subplots()
    ax.plot(x, y, label='My curve')
    ax.set_xlabel('Temperature [$^{\circ}C$]')
    ax.set_ylabel('Resistance [$k\Omega$]')
    ax.grid()
    ax.legend()

    fig.tight_layout()
    plt.savefig(SCRIPT_DIR / 'my-plot-name.png')

if __name__ == '__main__':
    main()
```

**If `main.py` already exists**, read it first, then add a new `create_<name>()` function and a call to it in `main()`. Match the existing file's style. Never delete or modify existing plot functions unless asked.

### Conventions

- One `create_<plot-name>()` function per output image; `main()` calls them all.
- Output filename: kebab-case, descriptive, `.png`, saved via `plt.savefig(SCRIPT_DIR / '<name>.png')` so the script works from any working directory.
- Axis labels: `Quantity [unit]` with the unit in square brackets, using inline math for symbols, e.g. `'Temperature [$^{\circ}C$]'`, `'Gain [dB]'`, `'Voltage [mV]'`.
- Always call `ax.grid()`. Add `ax.legend()` when there is more than one series or a marked feature (e.g. an `axvline`).
- Do NOT add the mbedded.ninja watermark (`util.add_watermark_to_fig`) — older `main.py` files use it, but it is no longer wanted on new plots. Don't copy the `import util` line from older scripts either, unless you need another `util` helper.
- Multi-panel figures: `fig, axes = plt.subplots(ncols=1, nrows=2, figsize=(8, 8))`.
- Log axes via `ax.set_xscale('log')` (e.g. frequency responses).
- Mark specific data points with a scatter/`ax.plot(..., 'o')` and annotate with `ax.annotate()` when the surrounding text refers to them.
- Available packages (pinned in `pyproject.toml`): numpy, matplotlib, pandas, scipy.

## Step 3: Run the script

Run with the repo's virtualenv from the repo root:

```
.venv/Scripts/python.exe src/content/pages/<...>/_assets/main.py
```

If you only added one function to a pre-existing `main.py`, run just that function instead of the whole script, so older plots aren't regenerated (their input data files may have moved, or regenerating them creates noisy diffs):

```
.venv/Scripts/python.exe -c "import sys; sys.path.insert(0, r'src/content/pages/<...>/_assets'); import main; main.create_my_plot_name()"
```

Then **Read the output PNG** to visually verify it (axes ranges sensible, labels not clipped, legend not covering data) before integrating it into the page.

## Step 4: Integrate into the mdx

Insert an `<Image>` at the appropriate spot, introduced with above/below-style prose (no `IRef`/`iref`):

```mdx
The graph below shows ...

<Image src={import('./_assets/<name>.png')} width="700px">Descriptive caption ending with a full stop.</Image>
```

- `width` must include `px`. Common values: `500px`–`800px` depending on detail.
- Bump the page's `lastUpdated` frontmatter to today's date.

## Edge cases

- **Plot needs external data** (simulation output, CSV): keep the data file in `_assets/` next to `main.py` and load it with a `SCRIPT_DIR`-relative path (see the BJT common-emitter page's `main.py` for a pandas example).
- **Re-running an old `main.py` that does `import util`**: the `util` module lives at `scripts/util/util.py` and resolves via the `PYTHONPATH` env var; if the import fails, run with `PYTHONPATH=scripts/util`.
- **The user wants a schematic, block diagram, or conceptual figure** rather than a data/function plot: use the `diagram` skill (hand-authored SVG) instead.

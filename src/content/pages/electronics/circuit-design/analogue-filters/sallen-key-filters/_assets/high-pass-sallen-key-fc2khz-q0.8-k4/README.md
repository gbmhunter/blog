# High-pass Sallen-Key design-example simulation

Regenerates `bode-plot.png` for the worked example on the
[Sallen-Key Filters](../../) page (fc = 2 kHz, Q = 0.8, K = 4).

This uses **ngspice** (open source) driven from Python — fully headless, no GUI,
reproducible. It replaces the old Micro-Cap workflow.

## Files

| File | Role |
|------|------|
| `sim.cir` | ngspice netlist (the durable, version-controlled source) |
| `main.py` | runs ngspice in batch mode + plots `bode-plot.png` |
| `sim_out.data` | generated AC data (freq, mag dB, phase deg) — regenerated each run |
| `bode-plot.png` | output figure embedded in the page |
| `high-pass-variable-gain-sallen-key-filter-schematic-example.webp` | schematic figure (drawn in Affinity Designer; `.afdesign` is the source) |

## Installing ngspice (portable, no admin)

```sh
# 1. Download the official Windows build (10.7 MB) from SourceForge:
#    https://sourceforge.net/projects/ngspice/files/ng-spice-rework/46/ngspice-46_64.7z
# 2. Extract it (e.g. with 7-Zip) somewhere user-local, e.g.:
#    %USERPROFILE%\tools\ngspice\
#    -> the executable is at  ...\ngspice\Spice64\bin\ngspice_con.exe
```

No installer / admin rights needed. Linux/macOS: install ngspice from your
package manager (`apt install ngspice`, `brew install ngspice`).

## Running

```sh
# point the runner at ngspice (or add it to PATH):
set NGSPICE_EXE=%USERPROFILE%\tools\ngspice\Spice64\bin\ngspice_con.exe   # Windows
python main.py
```

`main.py` resolves ngspice from `$NGSPICE_EXE`, else `ngspice_con`/`ngspice` on
PATH.

## Notes

- The op-amp is modelled as **ideal** (constant high gain), so this plot is the
  ideal response the design equations predict — appropriate for verifying
  fc / Q / gain. For the separate *frequency-limitation* plots, swap the ideal
  op-amp for a real SPICE macro-model (e.g. an NE5532 `.subckt`) and re-run.
- The schematic figure is **not** produced by this flow (ngspice doesn't draw
  schematics) — it's drawn by hand in Affinity Designer
  (`high-pass-variable-gain-sallen-key-filter-schematic-example.afdesign`) and
  must be re-exported if the component values change.

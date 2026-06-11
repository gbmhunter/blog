---
name: diagram
description: Create a diagram for the current blog page by authoring a hand-written SVG. Use this skill whenever the user asks to create, add, or draw a diagram, schematic, block diagram, topology, flow chart, or similar figure for a page. Output is always SVG — do not use Excalidraw, Mermaid, Affinity Designer, or any other tool.
---

# Diagram Skill

When the user asks for a diagram, author it as a hand-written SVG file and insert an `<Image>` reference into the current `.mdx` page.

## Why SVG

SVG is the right format for this blog because:

- **Committable as text** — the source lives in the repo, diffs cleanly, and future edits don't require any external tool.
- **Native browser render** — no build step, no export stage, no separate source-vs-output file to keep in sync.
- **Fine control over detail** — schematic symbols (transformers, op-amps, coils, etc.) can be drawn with arbitrary paths. Unlike Excalidraw or Mermaid, there's no fixed primitive library to constrain you.
- **Consistent with existing blog diagrams** — most hand-authored figures in `src/content/pages/**/_assets/` are SVG.

Do NOT use Excalidraw (`.excalidraw`), Mermaid, or Affinity Designer (`.afdesign`) for new diagrams, even if the user seems agnostic. If there's a specific reason SVG won't work (e.g. the user explicitly asks for a whiteboard-style sketch), raise it with the user first.

**Exception — data/function plots**: graphs that plot data or mathematical functions (curves, frequency responses, waveforms, fitted lines through points) should use the `plot` skill (Python + matplotlib saved to `_assets/main.py`) instead of hand-authored SVG.

## Step 1: Identify the target file

Look at recent Read/Edit tool calls to determine which `.mdx` file is currently being edited. If it's not clear, ask the user.

## Step 2: Choose file name and iref

Use kebab-case, descriptive but concise:

- File path: `<page-folder>/_assets/<name>.svg`
- Iref: `fig-<name>` (matches the `iref` convention used in the rest of the page)

Good examples: `spe-topology.svg` → `fig-spe-topology`, `buck-converter-current-path.svg` → `fig-buck-converter-current-path`.

## Step 3: Author the SVG

Write a clean, hand-authored SVG. Use this as a baseline structure:

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 W H" preserveAspectRatio="xMidYMid meet">
  <style>
    text { font-family: Arial, Helvetica, sans-serif; }
    .block-label { font-size: 42px; font-weight: bold; fill: white; text-anchor: middle; }
    .signal-label { font-size: 24px; font-weight: bold; fill: #1a7fc7; text-anchor: middle; }
    .interface-label { font-size: 20px; fill: #000; text-anchor: middle; }
  </style>
  <defs>
    <marker id="arrow" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
      <path d="M 0 0 L 12 6 L 0 12 z" fill="#000"/>
    </marker>
  </defs>

  <!-- elements here -->
</svg>
```

### Style conventions

- **viewBox**: set a meaningful coordinate system — e.g. `0 0 1800 440` for a wide block diagram. Render width in the mdx controls display size; viewBox controls internal proportions.
- **Fonts**: Arial / Helvetica sans-serif. Use font-size in px relative to the viewBox.
- **Palette** (for block/schematic diagrams):
  - Orange block fill `#f4a742` with dark stroke `#333` — for primary blocks (MAC, PHY, IC blocks).
  - Light blue `#93c5fd` with dark stroke `#1e3a5f` — for secondary blocks (magnetics, auxiliary).
  - Accent blue `#1a7fc7` — for data-flow labels and annotations.
  - Black `#000` — for structural lines, arrows, wires.
- **Arrow heads**: define once in `<defs>` with a `<marker>`, then reference via `marker-end="url(#arrow)"`.
- **Rounded block corners**: `rx="12"` on rectangles.
- **Stroke widths**: `2` for shapes/primary lines, `2.5` for arrows, `1.5` for subtle connectors.
- **Centred text in blocks**: `text-anchor="middle"` plus an approximate y-offset (font-size / 3 below centre is a good starting point).
- **Reusable groups**: for mirrored layouts, draw the left half then either mirror with a `<g transform="translate(...)">` or hand-code the right half for clarity.

### Schematic symbols

For schematic-style elements (transformers, coils, op-amps, capacitors, etc.):

- **Transformer / coupled coils**: two parallel horizontal wires with small upward-arcing bumps for one coil and downward-arcing bumps for the other, separated by two short vertical lines for the core. Quadratic bezier: `q 5 -14 10 0` for one bump.
- **Twisted pair cable**: two cubic-bezier sine waves 180° out of phase. Controls at `C 680 210 680 250 700 250` produce a clean S-curve over a 40px half-period.
- **Existing symbols**: several schematic symbol SVGs already exist under `src/content/pages/electronics/circuit-design/component-schematic-symbols-and-designators/_assets/` (diode, resistor, capacitor, ground, etc.). Reference them for style.

### Reference: `examples/spe-topology.svg`

A full worked example lives inside this skill at `.claude/skills/diagram/examples/spe-topology.svg`. Read it when you start a new diagram to copy the overall shape (viewBox, `<style>` block, `<defs>` marker, block+arrow idiom). It demonstrates orange MAC/PHY blocks, transformer-style magnetics (coupled coils + core), a twisted pair (two out-of-phase cubic beziers), bi-directional arrows, and caption labels anchored via short connector lines.

## Step 4: Integrate into the mdx

Insert an `<Image>` element at the appropriate location in the current mdx page. Use the standard pattern:

```mdx
<Image iref="fig-<name>" src={import('./_assets/<name>.svg')} width="900px">Descriptive caption ending with a full stop.</Image>
```

- `width` is the rendered display width — common values are `600px`, `800px`, `900px`, `1000px`. Choose based on the diagram's aspect ratio and level of detail.
- The caption is the body of the `<Image>` element. End it with a period.
- If the diagram comes from or is based on an external source, add a footnote reference in the caption — see the `reference` skill for the citation format.

## Step 5: Offer to verify

After creating the SVG and inserting it, suggest that the user start the dev server (`npm run dev`) to visually verify the figure rendered correctly. The user will usually handle this themselves.

## Edge cases

- **User asks for a whiteboard/sketch style**: that's the one case where Excalidraw could be appropriate. Raise it with the user and get explicit confirmation before deviating.
- **User asks for a Mermaid flowchart**: explain that Mermaid isn't used in this blog and propose an SVG equivalent. Mermaid-style boxes-and-arrows diagrams work well as hand-authored SVGs.
- **Diagram would require a photo-realistic render or complex illustration**: SVG is not well-suited to this — ask the user if a different approach (e.g. exporting from Affinity Designer to WebP) would be better.
- **External source for the diagram image exists**: don't hand-author a redraw if the original can be used directly — download or reference the existing image instead.

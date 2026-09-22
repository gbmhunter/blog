---
name: diagram
description: Create a diagram for the current blog page as an Inkscape-editable SVG on a 10 px grid, placing circuit symbols from libraries/symbols.svg via <use>. Use this skill whenever the user asks to create, add, or draw a diagram, schematic, block diagram, topology, flow chart, or similar figure for a page. Output is always SVG — do not use Excalidraw, Mermaid, Affinity Designer, or any other tool.
---

# Diagram Skill

When the user asks for a diagram, author it as a hand-written SVG file and insert an `<Image>` reference into the current `.mdx` page.

## Why SVG

SVG is the right format for this blog because:

- **Committable as text** — the source lives in the repo, diffs cleanly, and future edits don't require any external tool.
- **Native browser render** — no build step, no export stage, no separate source-vs-output file to keep in sync.
- **Fine control over detail** — schematic symbols (transformers, op-amps, coils, etc.) can be drawn with arbitrary paths. Unlike Excalidraw or Mermaid, there's no fixed primitive library to constrain you.
- **Consistent with existing blog diagrams** — most hand-authored figures in `src/content/pages/**/_assets/` are SVG.
- **GUI-tweakable by the user** — the same file opens in Inkscape with a 10 px grid, snapping and layers, so the user can nudge parts and add annotations without Claude, and Claude can keep editing the text afterwards. Affinity Designer files are binary and closed, which is why they are not used.

Do NOT use Excalidraw (`.excalidraw`), Mermaid, or Affinity Designer (`.afdesign`) for new diagrams, even if the user seems agnostic. If there's a specific reason SVG won't work (e.g. the user explicitly asks for a whiteboard-style sketch), raise it with the user first.

**Exception — data/function plots**: graphs that plot data or mathematical functions (curves, frequency responses, waveforms, fitted lines through points) should use the `plot` skill (Python + matplotlib saved to `_assets/main.py`) instead of hand-authored SVG.

## Step 1: Identify the target file

Look at recent Read/Edit tool calls to determine which `.mdx` file is currently being edited. If it's not clear, ask the user.

## Step 2: Choose file name

Use kebab-case, descriptive but concise: `<page-folder>/_assets/<name>.svg`, e.g. `spe-topology.svg`, `buck-converter-current-path.svg`, `photovoltaic-gate-driver-high-side-schematic.svg`. Do not add `iref` attributes — refer to figures in prose ("the schematic below").

## Step 3: Author the SVG

There are two kinds of diagram. Pick the right one first:

- **Schematics / circuits** (anything with resistors, MOSFETs, op-amps, grounds, rails…): use the **symbol-library workflow** below. Never redraw component symbols as raw paths.
- **Block diagrams, topologies, flow charts**: hand-author shapes as described under "Block diagrams" further down, but still start from the template so the file carries the Inkscape grid and layers.

Both kinds must be editable by the user in Inkscape afterwards: the SVG is the single source, edited by both Claude (text) and the user (GUI). Keep everything on a **10 px grid**.

### Schematic workflow (symbol library)

1. **Start from the template** `.claude/skills/diagram/templates/schematic-template.svg`. Copy it to `<page>/_assets/<name>.svg` and set `W`/`H` (width, height AND viewBox — they must match so Inkscape's px grid is 1:1). It already contains the Inkscape grid + snapping block, the three layers (Symbols / Wires / Annotations), and the shared CSS classes.
2. **Look up symbols** in `libraries/symbols.json` — it maps each symbol id to its `w`/`h` and a best-guess list of pin end coordinates (relative to the symbol origin). Ids are things like `resistor-american`, `cap-unpol`, `diode-led`, `tran-mos-enh-n`, `gnd-signal`, `v-rail`, `opamp-normal`, `load`, `batt-many-cell`. If pins look wrong, read the symbol's paths in `libraries/symbols.svg` — pin ends are the open endpoints of stroked paths.
3. **Place each part** in the Symbols layer with `<use id="R1" xlink:href="#resistor-american" href="#resistor-american" transform="translate(x,y) rotate(a)"/>`. Include BOTH `xlink:href` and `href` (Inkscape vs browsers). `x`,`y` **must be multiples of 10** — symbol geometry is pre-aligned so pins then land on the grid. Rotate about the origin: `rotate(-90)` turns a vertical part horizontal with its first pin at `(x, y-10)`, e.g. `translate(110,210) rotate(-90)` puts a vertical 100 px resistor's pins at (110,200) and (210,200).
4. **Wire** with `<path class="wire" d="M x1,y1 L x2,y2 …"/>` in the Wires layer, endpoints exactly on pin ends; mark T-junctions with the library's `junction` symbol (`<use id="J1" xlink:href="#junction" href="#junction" transform="translate(x,y)"/>` — its dot is centred on the origin, so the translate IS the junction point and it snaps like any other symbol). Never use a bare `<circle>`: its bbox corners are off-grid so the user can't snap it. Wires may overlap a symbol's pin stub — same colour, invisible. Always `<path>`, never `<polyline>`/`<line>`: Inkscape's Node tool can only edit paths, so polylines look frozen to the user.
5. **Annotate** in the Annotations layer with `<text>` using the template classes (`.ref`, `.label`, `.label-c`, `.note`, `.pin`, `.title`). Every `<text>` gets `xml:space="preserve"`, otherwise a trailing space collapses and typing a space in Inkscape appears to do nothing. Subscripts: `V<tspan baseline-shift="sub" font-size="15">GS</tspan>` (Inkscape's own sub/superscript format; works in browsers too).
   **Multi-line text is ONE `<text>` element, never one element per line.** Use SVG 2 flowed text with an SVG 1.1 fallback, which Inkscape edits as a single wrapping paragraph and browsers render line by line:
   ```svg
   <text x="1010" y="440" class="label-c" style="inline-size:240px;white-space:pre" xml:space="preserve"><tspan x="1010" y="440">first line </tspan><tspan x="1010" y="464">second line</tspan></text>
   ```
   - `inline-size` is the wrap width Inkscape reflows to; the `<tspan x y>` children are the pre-wrapped fallback lines browsers draw (line pitch ≈ 1.2 × font-size). Put a trailing space at the end of each wrapped line's tspan or Inkscape will glue the words together.
   - For a *hard* line break (e.g. a bold designator line followed by a normal description) put a literal newline between the tspans (`white-space:pre` makes it significant in Inkscape) and style the tspan itself, e.g. `<tspan … class="label" font-weight="normal">`.
   - Inkscape rewrites the fallback tspans itself when the user edits the text in the GUI.
6. **Embed the symbols**: run `python libraries/embed_symbols.py <file.svg>`. It copies every referenced `<symbol>` from `libraries/symbols.svg` into a generated `<defs id="symbols">` block so the file is self-contained. Re-run it whenever symbols are added/removed or the library changes.
7. **Verify grid alignment** with Inkscape's CLI (installed at `C:/Program Files/Inkscape/bin/inkscape.com`): `inkscape.com --query-all <file.svg> | grep -E '^(R1|Q1|…),'` prints `id,x,y,w,h` visual bounding boxes — every `<use>` must report x,y,w,h that are multiples of 10. (Each library symbol carries an invisible padded `snapbox` rect so Inkscape's visual bbox is grid-aligned; that is what makes GUI snapping work.)
8. **Render check**: open the file in Chrome (chrome-devtools MCP, `file:///…`) and screenshot at ~viewBox size to catch label collisions. The dev server is not needed for this.

Library maintenance (rare): `libraries/symbols.svg` + `symbols.json` are GENERATED from the Affinity export `libraries/electronic-components.svg` by `uv run --with svgelements python libraries/build_symbols.py`. Don't hand-edit them; fix the generator (e.g. `ORIGIN_NUDGE` for a symbol whose pins land on the half grid) and regenerate, then re-run `embed_symbols.py` on affected diagrams.

Inkscape gotchas worth knowing when the user reports problems: snapping is per-document (stored in `sodipodi:namedview`) and the template enables bbox-corner + grid snapping; the user may still need to toggle the magnet button once. "Save" (Inkscape SVG) keeps layers/grid; "Save as Plain SVG" strips them — never suggest plain. Inkscape re-serialises the whole file one-attribute-per-line on save; that's expected. WebP can't be opened by Inkscape.

### Block diagrams (hand-authored shapes)

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
- **Component symbols**: never hand-draw these in a block diagram either — pull them from the library with `<use>` as in the schematic workflow above, then run `embed_symbols.py`.

### Reference: `examples/spe-topology.svg`

A full worked example lives inside this skill at `.claude/skills/diagram/examples/spe-topology.svg`. Read it when you start a new diagram to copy the overall shape (viewBox, `<style>` block, `<defs>` marker, block+arrow idiom). It demonstrates orange MAC/PHY blocks, transformer-style magnetics (coupled coils + core), a twisted pair (two out-of-phase cubic beziers), bi-directional arrows, and caption labels anchored via short connector lines.

## Step 4: Integrate into the mdx

Insert an `<Image>` element at the appropriate location in the current mdx page. Use the standard pattern:

```mdx
<Image src={import('./_assets/<name>.svg')} width="900px">Descriptive caption ending with a full stop.</Image>
```

- `width` is the rendered display width — common values are `600px`, `800px`, `900px`, `1000px`. Choose based on the diagram's aspect ratio and level of detail.
- The caption is the body of the `<Image>` element. End it with a period.
- If the diagram comes from or is based on an external source, add a footnote reference in the caption — see the `reference` skill for the citation format.

## Step 5: Verify and hand over

Screenshot the raw SVG in Chrome yourself (see schematic step 8) and fix label collisions before handing over. Then tell the user the file is ready to tweak in Inkscape (plain Save, not Plain SVG) and that the page needs the dev server to see it in context. Worked example of the full workflow: `src/content/pages/electronics/components/gate-drivers/_assets/photovoltaic-gate-driver-high-side-schematic.svg`.

## Edge cases

- **User asks for a whiteboard/sketch style**: that's the one case where Excalidraw could be appropriate. Raise it with the user and get explicit confirmation before deviating.
- **User asks for a Mermaid flowchart**: explain that Mermaid isn't used in this blog and propose an SVG equivalent. Mermaid-style boxes-and-arrows diagrams work well as hand-authored SVGs.
- **Diagram would require a photo-realistic render or complex illustration**: SVG is not well-suited to this — ask the user if a different approach (e.g. exporting from Affinity Designer to WebP) would be better.
- **External source for the diagram image exists**: don't hand-author a redraw if the original can be used directly — download or reference the existing image instead.

# Calculator widgets

Each subfolder here is a self-contained interactive calculator embedded somewhere on the blog. The `/calculators/` index page (`src/content/pages/calculators/index.mdx`) aggregates them all into a searchable card grid via `src/components/calculator-index/`.

For the **widget code structure and Astro / Preact conventions**, see `.claude/skills/interactive-widget/SKILL.md`. The notes below are specifically about the **tile icons** shown on each card in the catalog.

## Folder layout (per calculator)

```
src/components/calculators/<calculator-name>/
├── <CalculatorName>.jsx     # main Preact component
├── calc.js                  # pure logic / parsers
├── catalog.js               # metadata for the calculator index
├── styles.css               # scoped CSS for the widget
└── tile.svg                 # icon shown on the calculator index card
                             # (or tile.png / tile.webp / tile.jpg — see below)
```

## Tile icon guidelines

### Format

Two formats are supported. **SVG is preferred** — sharper, smaller, and theme-aware. Raster is the fallback when an SVG isn't practical (e.g. you're reusing an existing screenshot or a complex non-vector image).

**SVG (preferred):**

- **File name:** `tile.svg` inside the widget folder.
- **`viewBox`:** `0 0 150 100` — a **3:2 landscape canvas**, which matches the recommended raster ratio below and reads better in the card than a square. (Older tiles use a square `0 0 96 96` viewBox and still work — they're just letterboxed; see note on the card slot below.)
- **Always include explicit `width` and `height` attributes** on the root `<svg>` (e.g. `width="150" height="100"`) — browsers loading SVGs via `<img src="...">` need intrinsic dimensions, or `naturalWidth` reports 0 and `aspect-ratio` fallbacks have to kick in.
- **Avoid `<defs>` with `<radialGradient>` or other internal references** — when the SVG is rendered via `<img>` (which is how the index card renders tiles), browsers restrict internal references for security reasons and the icon can fail to render. Stick to flat fills + strokes. A `<linearGradient>` is OK if you must; radial gradients are the ones that broke.

**Raster (PNG, JPG, WebP):**

- **File name:** `tile.png` (or `.jpg`, `.webp`) inside the widget folder.
- **Recommended size:** **900 × 600 px (3:2 landscape).** The card displays the tile at ~144 px wide on a typical screen, so 900 px wide is comfortably past 2× for crisp high-DPI rendering. 600 × 400 is the practical minimum.
- **Aspect ratio:** **3:2 landscape is preferred** — it reads as a tidy landscape image and is the ratio the rest of the tiles are moving towards. Other ratios still work (see the card-slot note below); they're just letterboxed rather than cropped, so nothing is clipped.
- **Background:** transparent (PNG / WebP) is preferred so the image blends with the card background in both light and dark themes. JPGs always have a background; in that case use a neutral colour that works on both themes (a mid-gray or pure white usually).
- **File size:** target < 50 KB. Optimise with [Squoosh](https://squoosh.app/) or similar if needed.

**Catalog import:** in `catalog.js`, always import with the `?url` suffix regardless of format:

```js
import tile from './tile.svg?url';  // or './tile.png?url', './tile.webp?url', etc.
```

Without `?url`, Astro returns a component factory for SVGs and a metadata object for raster — neither works as a plain `<img src>` value.

### The card slot (why 3:2, and why off-ratio still works)

On the `/calculators/` index, each tile is rendered inside a **fixed-height slot** (`.calc-index__card-tile`, currently `height: 10rem`) with `object-fit: contain`. The fixed height is deliberate: it guarantees every card's title and description start at the same vertical position regardless of the image. The slot height is **not** tied to the image aspect ratio (an earlier attempt to use `aspect-ratio: 3 / 2` on the slot broke that alignment, because the slot height then varied with card width).

Because the slot is a fixed height and `contain` never crops, a 3:2 image renders as a centred landscape image with thin letterbox bars top and bottom — which still looks like a clean landscape tile. Authoring at 3:2 keeps all tiles visually consistent; off-ratio images are tolerated but will letterbox more.

### Colours (SVG only)

Use this palette consistently:

| Hex         | Role                             | Notes                                                              |
|-------------|----------------------------------|--------------------------------------------------------------------|
| **`#c60e00`** | Primary accent (brand red)     | Matches `--sl-color-accent` (dark mode `#c60e00` / light `#c90e00`). Use for the focal stroke/fill — the element that makes the icon recognisably "ours". |
| `#6b7280`   | Secondary gray                   | Mid-tone gray for context elements (rails, gridlines, secondary labels). Tailwind's `gray-500`. |
| `#5b6472` / `#4b5563` | Tertiary gray                | Slightly darker / cooler gray for subtle structure (latitude lines, frame outlines). |
| `#1f2937` / `#27313f` | Filled disc / panel backgrounds | Dark slate fill for things like the globe disc on the EIRP map tile. Works on both light + dark themes since the surrounding card background is itself dark in both. |
| `#cbd5e1` / `#9ca3af` | Light text on dark fills    | For monospace bytes inside the `#1f2937` packet cells on the BLE tile. |
| `#2d9d4f`   | "Compliant" green                | Only used for status indicators that mean "OK / under limit". Mirrors the EIRP widget's `--eirp-fill-compliant`. |
| `#c93030`   | "Exceeds" red                    | Only used for status indicators that mean "over limit". Slightly brighter / more orange than the brand red so the two can be distinguished on the EIRP tile where both appear. |

**Rule of thumb:** if an element conveys the calculator's identity or its primary action, paint it `#c60e00`. If it provides context (labels, frames, grids), use a gray. Only reach for the status colours (`#2d9d4f` / `#c93030`) if the calculator itself uses them.

### Composition

- **3:2 canvas (150 × 100 SVG, or 900 × 600 raster), but leave breathing room** — keep meaningful content roughly within the inner ~90% so the icon doesn't crowd the card padding.
- **Two zones often work well:** a "what is this" element (e.g. BT rune, globe, schematic symbol) and a "what does it do" element (e.g. packet bytes, equivalence stack, color band) — side by side reads naturally on the 3:2 landscape canvas.
- **Use monospace text sparingly** — `font-family="ui-monospace, SFMono-Regular, monospace"` matches the rest of the blog's code styling. Reserve text for things like hex bytes, unit labels, or numeric examples that reinforce what the calculator computes.
- **Stroke widths ~3–6 px** (relative to a 150 × 100 viewBox) read well at the card display size (~144 px wide). Thinner strokes get spindly; thicker ones look chunky.

### Concept

The icon should evoke **what the calculator does**, not just the domain it lives in. A few good examples currently in the tree:

- `gain-converter/tile.svg` — `1 W = 30 dBm = 0 dBW` equivalence stack. Reads instantly as "unit conversion" rather than "RF in general".
- `eirp-compliance-map/tile.svg` — globe with green and red pins. Reads instantly as "per-region compliance" rather than "globe".
- `ble-adv-decoder/tile.svg` — Bluetooth rune + three hex byte cells. Communicates both "Bluetooth" and "packet decoder".
- `resistor-divider/tile.svg` — schematic of the actual two-resistor divider with input, tap and ground. Reads as the literal circuit being analysed.
- `crc-calculator/tile.png` — a raster icon imported from NinjaCalc. An example of when a raster is reasonable: the original artwork already existed and rebuilding it as SVG would have added work without improving the result.

### Testing the icon

After saving a new `tile.svg` or `tile.png` (or other format):

1. Run `npx astro dev` and open `/calculators/`. The card should display the new icon at ~144 × 144 px.
2. For SVGs, confirm `complete: true` and `naturalWidth > 0` in DevTools — if either is wrong, the SVG has a parse issue. The most common cause is an internal reference (`<defs>` / `url(#…)`) that's blocked in the `<img>` rendering context; replace with inline fills/strokes.
3. Toggle Starlight's light/dark mode to confirm the icon looks OK against both card backgrounds. The brand red works on both; greys may need adjustment for light mode if they get too washed out.

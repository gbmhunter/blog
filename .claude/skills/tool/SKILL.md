---
name: tool
description: Create an interactive client-side tool (also called a widget — calculator, decoder, builder, visualiser, simulator, designer, etc.), embed it in a blog .mdx page, and register it on the /tools/ index. Use this skill whenever the user asks to add an interactive component, calculator, widget, "playground", or any UI element that needs to react to user input on a blog page. Establishes the Preact + container-query pattern used by the existing tools so new ones follow the same conventions.
---

# Tool (Interactive Widget) Skill

On this website, interactive client-side widgets are collectively called **tools** (they may be calculators, designers, decoders, visualisers, etc.) and are listed on the `/tools/` index page. Building one is not complete until it is registered there (Step 5b).

When the user asks to add an interactive calculator/widget (something with state and inputs — not a static SVG, image, or `.astro` server-render-only component), follow this pattern.

## Step 1: Decide whether a widget is even needed

Before reaching for a framework, ask: could this be a plain `.astro` component with a `<script>` tag and DOM updates? If the state is trivial (one input, no derived structures, no list mutation), vanilla is simpler. Use Preact only when the widget has real component structure — multiple editors, derived hex/values, lists of cards, etc.

If the user explicitly says "React", clarify that Preact is preferred for this site (same JSX, ~3KB vs ~45KB, single integration already present). Only fall back to React if they insist.

## Step 2: Confirm scope and placement up front

Before writing code, settle these with the user using `AskUserQuestion`:

1. **What does it do?** — Decoder only, builder only, or both (two-way sync)?
2. **Where does it live?** — Inline in an existing MDX section, or a new dedicated page?
3. **What inputs / outputs** — Be concrete about every field the user will interact with.

Don't skip this. A vague brief becomes wasted code.

## Step 3: Install / verify the Preact integration

Run `npm ls @astrojs/preact preact` to check what's installed.

If missing, install with this **exact** pin:

```sh
npm install @astrojs/preact@4.1.3 preact
```

**⚠ Do NOT install `@astrojs/preact@5.x`** — 5.x ships vite 7, but Astro 5.12 (in this repo) uses vite 6.3.5, so the integration's vite plugins never register and you get this error at build time:

```
Could not resolve "astro:preact:opts"
```

If the project's Astro version bumps to one that uses vite 7, `@astrojs/preact@5.x` becomes the correct pin — re-check `npm ls vite` before pinning.

Verify the integration is registered in `astro.config.mjs`:

```js
import preact from "@astrojs/preact";

export default defineConfig({
  integrations: [
    preact(),
    // ...existing integrations
  ],
});
```

Add it if it isn't there.

## Step 4: Create the widget folder

Place every widget (a **tool** on the website — see `/tools/`) under its own folder in `src/components/tools/`:

```
src/components/tools/<widget-name>/
  <WidgetName>.jsx        # main Preact component
  parser.js / helpers.js  # pure logic (if non-trivial)
  styles.css              # scoped CSS (imported by the .jsx)
  catalog.js              # index entry — REQUIRED (see Step 5b)
  tile.webp               # index thumbnail — REQUIRED (see Step 5b)
```

Keep logic out of the JSX file when it grows past ~50 lines — pure functions in sibling `.js` files are easier to reason about and test.

### Imports in the .jsx

```jsx
import { useState, useEffect, useRef } from 'preact/hooks';
import './styles.css';
```

Use `class=` (not `className=`) — Preact accepts both, but the rest of the codebase uses `class`.

## Step 5: Embed in the MDX page — **local import, not global**

Single-page widgets are imported **locally** in the MDX file. **Do not add them to `src/js/GlobalMdxComponents.ts`** — that registry is reserved for components reused across many pages (`Image`, `Aside`, `CircuitJs`, etc.). Polluting it with single-use widgets bloats every page's import graph.

In the target `.mdx` file:

```mdx
---
title: ...
---

import WidgetName from 'src/components/tools/widget-name/WidgetName.jsx';

<!-- prose -->

<WidgetName client:load />
```

Place the widget under a `## Heading` — the heading's slug is the anchor you'll point the catalog entry's `href` at (Step 5b).

### Hydration directive: use `client:load`, not `client:visible`

`client:visible` looks attractive (defer hydration until scrolled into view), but the `astro-island` wrapper renders as `display: contents` and therefore has a zero-size bounding box. IntersectionObserver never fires, so the component **never hydrates** — it renders the SSR HTML forever and looks broken.

`client:load` is the safe default. Preact's runtime is small enough that eager hydration is fine.

## Step 5b: Register it on the `/tools/` index — **always do this**

Every interactive widget on this site is a "tool" and **must** appear on the `/tools/` index page. This is not optional — a widget that isn't registered is effectively undiscoverable. Skipping it is the most common omission, so treat it as part of "done".

Two required files in the widget folder, plus one import:

1. **`tile.webp`** — a thumbnail for the index card. The tile slot is `10rem` tall with `object-fit: contain`; a ~3:2 landscape source (e.g. 300×200) looks best. A small screenshot of the widget or its characteristic chart works well. (The user often supplies this; ask if it's missing rather than inventing a raster image — though an SVG tile imported via `?url` is a valid fallback.)

2. **`catalog.js`** — exports a `catalog` constant:

   ```js
   import tile from './tile.webp?url';

   export const catalog = {
     id: 'my-widget',                       // unique kebab-case id
     title: 'My widget designer',
     description: 'One or two sentences describing what it does (shown on the card and searched).',
     href: '/path/to/page/#heading-slug',   // page URL + the Step 5 heading's slug
     categoryPath: ['Software', 'Signal processing'],  // breadcrumb the index groups by
     tags: ['DSP', 'filter', '...'],         // extra search terms
     tile,
   };
   ```

   - `href` is the **full page path plus the `#slug`** of the heading the widget sits under. GitHub-style slug: lowercase, spaces → hyphens, punctuation stripped (e.g. "Interactive EMA Filter Explorer" → `#interactive-ema-filter-explorer`).
   - `categoryPath` controls which filter chips the card appears under. Reuse an existing path (grep the other `catalog.js` files) so you don't fragment categories — DSP widgets use `['Software', 'Signal processing']`.

3. **Register it** in `src/components/tools-index/catalogs.js` — add both the `import` and the array entry, keeping the existing alphabetical-by-folder order:

   ```js
   import { catalog as myWidget } from '../tools/my-widget/catalog.js';
   // ...and in the CATALOGS array:
   myWidget,
   ```

After this, the card shows on `/tools/` and is searchable. Verify in Step 9.

## Step 6: Styling conventions

### Use Starlight CSS variables, not hard-coded colours

The site has light + dark mode. Reference these variables (defined in `src/styles/custom.css`):

| Variable                  | Use for                                  |
|---------------------------|------------------------------------------|
| `--sl-color-bg`           | Card / input backgrounds                 |
| `--sl-color-bg-nav`       | Widget container background              |
| `--sl-color-text`         | Body text                                |
| `--sl-color-gray-2..5`    | Borders, muted text                      |
| `--sl-color-accent-low`   | Subtle accent-tinted background (very dark red in dark mode, light pink in light mode). Use sparingly for highlight surfaces. |
| `--sl-color-accent`       | **Primary action** surface colour (mid-tone brand red, ~`#c60e00`). Use as the background of solid call-to-action buttons and as the visible border/border-left of alert boxes. **Do NOT use this for error text on dark surfaces — it lacks contrast.** |
| `--sl-color-accent-high`  | **Error and warning TEXT** colour. Light pink (`#feb3a6`) in dark mode, dark red (`#640300`) in light mode — high contrast in both themes. Use for error messages, over-budget indicators, validation warnings. |
| `--__sl-font-mono`        | Monospace font stack for hex / code      |

**Rule of thumb for the red trio:**

- Solid action button background → `--sl-color-accent`
- Alert-box border or 15% background tint → `--sl-color-accent`
- Error / warning text content → **always** `--sl-color-accent-high`
- **Never** use `--sl-color-red` — the brand IS red, so use the accent variables (per [[feedback-local-vs-global-mdx-components]] convention this site uses brand-red as its primary accent).

### Use a CSS container query, not a viewport media query

Starlight's content area is narrower than the viewport (typically ~570px on a 950px viewport because of the sidebar). A viewport `@media (min-width: 60rem)` query will NOT trigger when the widget itself only has ~570px of room.

Put `container-type: inline-size` on the widget root and use `@container`:

```css
.my-widget {
  container-type: inline-size;
}

.my-widget__columns {
  display: grid;
  grid-template-columns: minmax(0, 1fr);   /* not just 1fr — see below */
  align-items: start;
}

@container (min-width: 34rem) {
  .my-widget__columns {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}
```

Use `minmax(0, 1fr)` rather than bare `1fr` — `1fr` resolves to `minmax(auto, 1fr)`, where `auto` = `min-content`. If one column has a wide intrinsic min-content (e.g. long input placeholders), the columns end up uneven.

### Reset Starlight's sibling margins inside the widget

Starlight applies `margin-top` to sibling block elements in prose content. Inside a multi-column grid widget this pushes the second column down so its heading doesn't align with the first. Reset it:

```css
.my-widget__columns > * {
  margin-top: 0;
}
```

### Match input + button heights with explicit sizing

Native `<select>` and `<button>` elements have different intrinsic heights. When putting them side-by-side, normalise:

```css
.my-widget__add {
  display: flex;
  gap: 0.5rem;
  align-items: stretch;
}

.my-widget__add select,
.my-widget__add button {
  box-sizing: border-box;
  height: 2rem;
  padding: 0 0.6rem;
  font-size: 0.85rem;
  line-height: 1.25;
  margin: 0;
}
```

## Step 7: Shared utilities — don't re-invent

Before writing helper code, check `src/js/` for existing utilities that match your need. Reuse beats duplication.

Current shared utilities:

### `src/js/metric-prefix.js`

Unit-agnostic parsing + formatting for values with SI prefixes. Use this whenever your widget takes a human-typed value with a unit (resistance, capacitance, inductance, voltage, current, frequency, time, etc.).

```js
import { parseValueWithPrefix, formatValueWithPrefix } from 'src/js/metric-prefix.js';

// Parsing
const { value, error } = parseValueWithPrefix(text, {
  units: ['F', 'farad', 'farads'],   // unit strings to strip from input
  rNotation: false,                  // set true for resistors (allows "470R", "4R7")
  allowZero: false,
  allowNegative: false,
});

// Formatting
formatValueWithPrefix(value, 'F');   // → "4.7 µF"
```

Supports both standard form (`4.7k`, `2.2M`) and "RK-shorthand" (`2k2`, `4n7`, `4R7`). Returns `{ value, error }` from the parser so widgets can surface specific validation messages.

Reference usage: `src/components/e-series-finder/finder.js` and `src/components/parallel-resistance/calc.js` both thin-wrap it (~3 lines each) to provide `parseResistance` / `formatResistance`.

**When to add to this list:** if you write a helper in a widget folder that another widget would benefit from, lift it into `src/js/` and update both call sites + this section. Don't pre-extract speculative shared code — wait for the second use case.

## Step 8: State & input patterns

### Two-way sync (e.g. hex ↔ structured editor)

Source of truth = the structured array. Re-derive the textual form via `useEffect` so the user's in-progress typing is preserved:

```jsx
const [items, setItems] = useState(initial);
const [text, setText] = useState('');
const lastSource = useRef('builder');

useEffect(() => {
  if (lastSource.current === 'builder') {
    setText(serialize(items));
  }
}, [items]);

const onTextChange = (t) => {
  lastSource.current = 'text';
  setText(t);
  setItems(parse(t));
};

const updateItem = (id, next) => {
  lastSource.current = 'builder';
  setItems((prev) => prev.map((x) => x.id === id ? next : x));
};
```

The `lastSource` ref prevents feedback loops between the two views.

### Decoupled-text editors (list of items in a single input)

If a user types into a "list" input that reformats on every keystroke (e.g. comma-separated UUIDs), they fight the cursor. Keep local text state and re-sync only when the parent's value changes:

```jsx
function useDecoupledListText(value, format) {
  const formatted = format(value);
  const [text, setText] = useState(formatted);
  const lastFormatted = useRef(formatted);
  useEffect(() => {
    if (formatted !== lastFormatted.current) {
      setText(formatted);
      lastFormatted.current = formatted;
    }
  }, [formatted]);
  const setBoth = (newText, parsedFormatted) => {
    setText(newText);
    lastFormatted.current = parsedFormatted;
  };
  return [text, setBoth];
}
```

Inside the input's `onInput`, call `setBoth(newText, format(parsedFromNewText))` then `onChange(parsedFromNewText)`.

### Surface validation inline

Parse the input text into `{ valid, invalid }` parts. Show `invalid` parts in a small red message under the input — don't silently drop them. Don't block typing.

### Be lenient about input

Strip `0x` / `0X` prefixes, dashes, whitespace, and other separators before parsing hex. Users paste hex in many formats — `02010606`, `0x02 0x01 0x06`, `02:01:06:06` should all work.

## Step 9: Verification

After implementing, run:

```sh
npx astro check    # type / import errors — must show 0 errors
npx astro build    # full build — must complete without errors
```

If `npx astro build` works but `npm run build` (which runs `astro check && astro build`) fails, the issue is almost always a missing or wrong-version integration.

For UI verification, run `npx astro dev` and use Chrome browser tools to visit the page. Confirm:

1. **Hydration succeeded** — `document.querySelector('astro-island').hasAttribute('ssr')` should be `false` (Astro removes the `ssr` attribute after the component hydrates).
2. **Interactivity works** — Programmatically dispatch an `input` event using the native property setter (Preact reads from the property, not the attribute):

   ```js
   const ta = document.querySelector('.my-widget__input');
   const set = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
   set.call(ta, 'new value');
   ta.dispatchEvent(new Event('input', { bubbles: true }));
   ```

3. **Theme** — Toggle light/dark mode in Starlight and confirm colours track (this is automatic if you used the CSS variables).
4. **Index registration** — visit `/tools/`, confirm the new card appears with its tile, and that searching its title/tags surfaces it. If the card is missing, you skipped Step 5b. A clean `astro build` does **not** prove registration — `astro check` passes even when `catalog.js` is never imported into `catalogs.js`.

## Step 10: Memory

If you encounter a new gotcha not covered above (a Starlight CSS conflict, a Preact-specific bug, a missing variable, etc.), update this `SKILL.md` so the next widget benefits. Skills are repo-scoped and checked in — improvements help every future session.

## Reference implementation

`src/components/tools/ble-adv-decoder/` is the canonical example for this pattern — copy its layout for new widgets and adapt the editors / parsers / styling. For a chart-based widget (Chart.js via the shared `_shared/Plot2d.jsx`) plus the catalog wiring, `src/components/tools/ema-filter/` is a good reference.

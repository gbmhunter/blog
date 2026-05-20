---
name: interactive-widget
description: Create an interactive client-side widget (decoder, builder, calculator, visualiser, simulator, etc.) and embed it in a blog .mdx page. Use this skill whenever the user asks to add an interactive component, widget, "playground", or any UI element that needs to react to user input on a blog page. Establishes the Preact + container-query pattern used by the BLE Advertising Decoder so future widgets follow the same conventions.
---

# Interactive Widget Skill

When the user asks to add an interactive widget (something with state and inputs — not a static SVG, image, or `.astro` server-render-only component), follow this pattern.

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

Place every widget under its own folder in `src/components/`:

```
src/components/<widget-name>/
  <WidgetName>.jsx        # main Preact component
  parser.js / helpers.js  # pure logic (if non-trivial)
  styles.css              # scoped CSS (imported by the .jsx)
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

import WidgetName from 'src/components/widget-name/WidgetName.jsx';

<!-- prose -->

<WidgetName client:load />
```

### Hydration directive: use `client:load`, not `client:visible`

`client:visible` looks attractive (defer hydration until scrolled into view), but the `astro-island` wrapper renders as `display: contents` and therefore has a zero-size bounding box. IntersectionObserver never fires, so the component **never hydrates** — it renders the SSR HTML forever and looks broken.

`client:load` is the safe default. Preact's runtime is small enough that eager hydration is fine.

## Step 6: Styling conventions

### Use Starlight CSS variables, not hard-coded colours

The site has light + dark mode. Reference these variables (defined in `src/styles/custom.css`):

| Variable                  | Use for                                  |
|---------------------------|------------------------------------------|
| `--sl-color-bg`           | Card / input backgrounds                 |
| `--sl-color-bg-nav`       | Widget container background              |
| `--sl-color-text`         | Body text                                |
| `--sl-color-gray-2..5`    | Borders, muted text                      |
| `--sl-color-accent`       | **Primary action** colour (brand red) — buttons, error highlights. **Do NOT use `--sl-color-red`** — the brand colour for this site IS red, so the accent variable IS the red. |
| `--__sl-font-mono`        | Monospace font stack for hex / code      |

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

## Step 7: State & input patterns

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

## Step 8: Verification

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

## Step 9: Memory

If you encounter a new gotcha not covered above (a Starlight CSS conflict, a Preact-specific bug, a missing variable, etc.), update this `SKILL.md` so the next widget benefits. Skills are repo-scoped and checked in — improvements help every future session.

## Reference implementation

`src/components/ble-adv-decoder/` is the canonical example for this pattern — copy its layout for new widgets and adapt the editors / parsers / styling.

---
name: review-page
description: Review a blog page (.mdx) for technical accuracy, spelling/grammar, LaTeX/KaTeX conventions, image width format, reference formatting, and internal consistency. Use whenever the user asks to review, check, proofread, or audit a blog page or its content ("review this page", "review <path>", "check this page for errors").
---

# Review Page Skill

Review a blog page's `index.mdx` for correctness and house style. The deliverable is a **findings report** — do NOT edit the page unless the user asks you to apply the fixes.

## Step 1: Identify and read the page

- If the user gave a path, use it. Otherwise infer the page from context (e.g. the file currently being worked on) and confirm if ambiguous.
- Read the entire `index.mdx`.
- Read every image the page embeds (the Read tool renders them visually). You need them for the consistency checks below — component labels in prose must match labels in schematics/diagrams.

## Step 2: Run the checks

### Technical accuracy

- Verify the engineering content: equations derived correctly, claims consistent with established theory, rules of thumb reasonable.
- **Recompute every numerical result** in worked examples (use a script if there are many). Check intermediate steps, not just final answers.
- Check claims against the page's own data: e.g. if prose says output impedance is "medium" but a properties table says "High", flag it.
- Check part numbers are used consistently (e.g. don't introduce a BC548B then quote limits for a BC547B).
- Check component designators in prose match the labels in the schematic images (e.g. prose says $C1$ but the schematic labels it $C_{IN}$).
- If a simulation/measurement result differs noticeably from a calculated value, check the explanation given for the gap actually accounts for it (do the math).

### Spelling and grammar

- Typos, its/it's, subject-verb agreement ("the amplifier find use"), wrong word ("less that" → "less than"), doubled words, missing words.
- The site uses NZ/British-leaning English (e.g. "analogue", "whilst") — do not flag these as errors.

### LaTeX/KaTeX conventions

**Units** — use the `\unit{}` macro (defined in `astro.config.mjs`), not `\text{}` or `\,`:

- Write `50\unit{kHz}`, not `50 \text{kHz}`, `50\text{kHz}`, or `50\,kHz`.
- No manual space before it — `\unit` supplies a thin space (e.g. `15.7\unit{m\Omega}`).
- For a bare unit label not following a number (e.g. "the input is in mV"), use `\mathrm{...}` directly to avoid the leading space.

**Multiplication** — `\cdot` is the default explicit operator (e.g. `2\pi \cdot 50\unit{Hz} \cdot 50\unit{uH}`). Never `*` inside math. Reserve `\times` for:

- Scientific notation, e.g. `6.02 \times 10^{23}`.
- Vector cross products, e.g. `\vec{a} \times \vec{b}`.
- Dimensions / Cartesian products, e.g. "a 3 × 4 matrix", `\mathbb{R} \times \mathbb{R}`.

For tightly-bound products, prefer juxtaposition (e.g. `2\pi f L`, `IR`).

**Equation numbering** — display equations must use `\begin{align*}`/`\end{align*}` (no numbering), not `\begin{align}`. With `align*` there is never any need for `\nonumber` — flag any that remain.

**KaTeX pitfalls** — these render wrong silently:

- A bare `%` inside math is a comment character — `$100%$` renders as "100". Must be `\%`.
- Multi-character subscripts/superscripts need braces — `$V_BE$` renders as "V_B E"; must be `$V_{BE}$`.
- `\log` of a signed quantity in dB conversions should use `|...|`, and "dB" is capitalized that way (not "db").

### Image widths

Every `<Image ... width="...">` must include `px`, e.g. `width="600px"`, not `width="600"`.

### Markdown style

Bullet point lists must use `- `, not `* `.

### Cross-references to figures and tables

Use plain above/below prose ("The schematic below shows...", "...is shown below"), NOT `<IRef>` components or `iref=`/`data-iref` attributes. Flag any iref usage.

### Internal links to related site pages

Two parts — validate the links that exist, and suggest relevant ones that are missing.

**Validate existing internal links** (`/electronics/...`, or absolute `https://blog.mbedded.ninja/...`):

- The target page exists under `src/content/pages/` (map the URL path to a directory containing an `index.mdx`). Flag broken links as bugs.
- The link ends with a trailing `/` (e.g. `/electronics/components/`, not `/electronics/components`).
- The anchor text matches what the target page is actually about (don't link "capacitor" to the resistors page).

**Suggest relevant missing links** — the site is a densely cross-linked engineering reference, so pages should link to related material:

- Identify the key concepts, components, and techniques the page mentions (e.g. on a debouncing page: switches, capacitors, resistors, Schmitt triggers, RC charging, delay circuits, diode types).
- Search `src/content/pages/` for pages covering those concepts (grep titles/headings, or list likely directories under `components/` and `circuit-design/`). Confirm each candidate genuinely covers the concept — open it if unsure; a single passing mention in a table cell is not enough to justify a link.
- Propose linking the **first meaningful mention** of each concept in the prose, with the concept word(s) as the anchor text. Link a concept once, not every occurrence, and don't link so heavily it becomes noise — a page on the specific technique being discussed is higher value than a generic component page (capacitors/resistors).
- List each suggestion with the proposed anchor text, target URL (trailing slash), and the page it points to, so the user can accept or decline.

### References (footnotes)

Every footnote definition at the bottom of the page must follow:

```
[^reference-key]: Author (year, month day). _Title_ [type]. Site/Publisher. Retrieved 2025-09-18, from https://www.site.com/path/to/page.
```

- Title wrapped in `_underscores_` (italic).
- Retrieved date in `YYYY-MM-DD` form, "Retrieved <date>, from <url>." with the trailing period.
- Date after the author in `(year, Mon day)` form when known; omit gracefully when unknown.
- The `[type]` tag (e.g. `[datasheet]`, `[forum post]`, `[wiki]`) when applicable.

Also check:

- **Unused definitions** — every `[^key]:` at the bottom must be cited somewhere in the body.
- **Undefined citations** — every `[^key]` in the body must have a definition.

### Frontmatter and structure

- `description`, `tags`, `title`, `date` present and sensible; `image` path exists.
- If the review leads to edits being applied, `lastUpdated` should be bumped to today's date.
- Heading capitalization and structure consistent with the rest of the page. (Internal-link validation is covered under "Internal links to related site pages" above.)

## Step 3: Report

Group findings by severity, with `file:line` references:

1. **Bugs / technical issues** — wrong math, rendering-breaking KaTeX, contradictions, broken links, unused/undefined references.
2. **Typos / grammar**.
3. **Style compliance** — `\unit{}`, `\cdot`, px widths, iref usage, reference format, trailing-slash internal links.
4. **Minor / optional** — suggestions that improve the page but aren't errors, including suggested links to related site pages.

State explicitly which numerical results you verified. End by offering to apply the fixes.

## Step 4: If asked to apply fixes

- Apply everything found, bump `lastUpdated`, then re-grep for the mechanical issues (old-style units, `*` in math, missing px, `it's`, etc.) to confirm nothing was missed.
- Do NOT run a full `astro build` to verify — it is slow. Content-only changes need no build; at most use `astro check` or the dev server.

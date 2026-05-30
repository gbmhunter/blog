---
name: snip-image
description: Capture a screenshot region, save it as a resized WebP into the current blog page's _assets dir, and insert an <Image> tag with an auto-generated caption into the page's index.mdx. Use this skill whenever the user wants to grab a screenshot of part of the screen and add it to the current blog post, says "snip an image", "screenshot into the page", "add a screen capture", or similar.
---

# Snip Image Skill

This skill captures a region of the screen, saves it as an optimised WebP in the
current blog page's `_assets/` directory, and inserts an `<Image>` tag (with an
auto-written caption) into that page's `index.mdx`.

The actual screen capture is done by `scripts/snip-to-webp.py`, a GUI tool that
pops up a fullscreen overlay. All input (filename + width) is collected **in the
overlay window**, not the terminal, so **Claude launches it directly via the Bash
tool** — the user only has to draw a box and type the filename/width in the panel.
The GUI is reachable from the Bash tool on this machine (verified).

## Step 1: Identify the target page

Determine which `index.mdx` the user is working on, from recent Read/Edit calls in
the conversation. You need:

- the absolute path to its directory, e.g. `C:\personal\blog\src\content\pages\electronics\components\batteries\coin-cells`
- its `_assets` subdirectory (the tool creates it automatically via `--outdir`)

If the current page is genuinely unclear, ask the user.

## Step 2: Launch the capture (Claude runs it)

Run the snip tool yourself with the Bash tool, pointing `--outdir` at the page's
`_assets` directory (a repo-root-relative path is fine). Use a **long timeout**
(e.g. 300000 ms) because the call blocks while the user interacts with the window:

```
uv run scripts/snip-to-webp.py --outdir "src/content/pages/<...>/<page>/_assets"
```

The tool **arms and waits** — it does not freeze the screen on launch. Tell the
user, in one short line: navigate/scroll to the target, then press **F9** to
freeze and capture; drag a box, type a **filename** (kebab-case, no extension,
descriptive) and a **target width** in px in the little panel, and press Enter
(Esc cancels, F10 cancels while armed, drag again to reselect).

(The hotkey is `--key` (default `f9`); `--now` captures immediately and `--delay
SECONDS` uses a countdown instead, if ever needed.)

When the command returns, it prints:

```
Saved src/content/pages/.../_assets/<filename>.webp (800x540px, quality 85).
```

Read the saved path and final width from that line. (If the user prefers to run
it themselves, they can prefix the same command with `!` — but default to running
it for them.)

## Step 3: Look at the saved image

Use the Read tool on the saved `.webp` path so you can see the image visually.
This is what lets you write an accurate caption.

## Step 4: Write the caption

**Exception — pages under `src/content/updates/`:** these get **no caption** and a
self-closing tag with the `userClass="red-glow"` attribute. Skip the caption
guidance below and use the updates-page form in Step 5. (Example in any month's
updates post: `<Image src={import('./_assets/x.webp')} width="800px" userClass="red-glow"/>`.)

For all other pages, write the caption automatically from **the image content +
the surrounding page context** (no confirmation round-trip — the user opted for
auto mode). Guidelines:

- One sentence, sentence case, ending in a full stop. Describe what the image
  shows, framed for this page's topic.
- Match the voice of existing captions on the page (look at other `<Image>` tags).
- If the image clearly came from a source that is already a footnote reference on
  the page (e.g. a vendor datasheet, a cited article), append that citation inside
  the caption, before the full stop's footnote — e.g.
  `...typical application circuit.[^ti-amc3330-isolated-amplifier-ds]`. Only do
  this when the matching `[^...]` reference already exists in the file; do not
  invent one.

## Step 5: Insert the `<Image>` tag

Build the tag (note: **no `iref` attribute** — it is no longer used).

For pages under `src/content/updates/`, use the **no-caption, red-glow** form:

```
<Image src={import('./_assets/<filename>.webp')} width="<width>px" userClass="red-glow"/>
```

For every other page, use the captioned form:

```
<Image src={import('./_assets/<filename>.webp')} width="<width>px"><caption></Image>
```

`<width>` is the final width reported by the tool (the resized width). The `src`
path is always relative to the mdx file as `./_assets/<filename>.webp`, regardless
of the absolute `--outdir` used.

Choose the insertion point, in this order of preference:

1. If the page contains a placeholder marker `{/* IMAGE */}`, replace that marker
   with the tag.
2. Otherwise, append it at the end of the page body — immediately **before** the
   references comment block if one exists (the
   `{/* ... REFERENCES ... */}` banner), so the tag stays within the body and
   above the footnote definitions.
3. Otherwise, append it at the very end of the file.

Surround the tag with blank lines so it renders as its own block.

Use the Edit tool to make the insertion. After editing, confirm to the user what
was added, showing the inserted `<Image>` line.

## Edge cases

- **Capture cancelled / empty selection**: the tool prints "Cancelled / empty
  selection." and saves nothing — tell the user and stop.
- **Filename collision**: the tool overwrites silently. If the user wants to keep
  an existing asset, have them choose a different filename.
- **No `_assets` dir yet**: the tool creates it via `--outdir`, so no action
  needed.

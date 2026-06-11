---
name: take-screenshot
description: Take a screenshot of a rendered blog page section using Playwright (via uv) against the local dev server, save it as a WebP into a page's _assets dir, and insert an <Image> tag. Use whenever the user asks to take/create/capture a screenshot of a page or section themselves (especially for monthly updates pages), e.g. "take a screenshot of X", "create a screenshot for this updates entry". For capturing an arbitrary region of the user's screen instead, use the snip-image skill.
---

# Take Screenshot Skill

Screenshot part of a rendered blog page headlessly with Playwright, without needing the user to do anything. The main use case is illustrating monthly updates entries (`src/content/updates/...`) with a screenshot of the content the entry links to.

Prefer this over the Chrome extension tools: element-based clipping is exact, the mouse cursor never appears in frame, and viewport height is not a constraint.

## What makes a good capture

- **Interesting, not exhaustive** — show a representative slice of the new content, ideally including a figure, plot, or table rather than a wall of text. The reader should get the flavour of the content, not read all of it in the screenshot.
- **400–800 px tall.** The script's `--max-height` (default 800) enforces the upper end by stopping on a clean element boundary; if a capture comes out much shorter than 400 px, start it earlier or include the section's figure.
- **Just a little wider than the content** — the script handles this automatically (content column + 10 px padding each side, rendered at 1100 px viewport width, dark mode).

## Step 1: Check the dev server

The dev server must be running at `http://localhost:4321`:

```
curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/
```

If it isn't (non-200), ask the user to start it (`npm run dev`) — don't start it yourself unless asked, as the user often already has one running.

## Step 2: Capture

No environment setup is needed — the bundled script declares its dependencies inline (PEP 723) and is run with `uv run`, which creates/caches the environment automatically. It uses the newest Playwright-managed Chromium under `%LOCALAPPDATA%/ms-playwright` (if none is installed, run `uv run playwright install chromium` once).

```
uv run .claude/skills/take-screenshot/section_screenshot.py \
  http://localhost:4321/programming/microcontrollers/stm32/ \
  src/content/updates/2026/06-30-june-2026-updates/_assets/stm32n6-screenshot.png \
  "STM32N6"
```

Arguments: `<url> <out.png> <startText> [--end-img SUBSTR] [--max-height PX]`

- `startText`: text of the h2/h3 (or a unique starting paragraph) the capture starts at. It doesn't have to be the section heading — starting at a mid-section paragraph is the way to frame an interesting slice.
- Default behaviour: elements are added until the next one would blow the `--max-height` budget (default 800 px) or the section ends (next same-or-higher-level heading), always stopping on an element boundary.
- `--end-img <substring of an img src>`: end the capture at that figure (caption included), overriding the height budget. Use this to make sure a section's key image is in frame.

## Step 3: Verify, convert to WebP, clean up

1. **Read the output PNG** to check it: an interesting slice, sensible height, nothing clipped.
2. Convert to WebP with the repo venv's Pillow (crop here if there's a sliver of unwanted content):

```
.venv/Scripts/python.exe -c "
from PIL import Image
im = Image.open(r'<out>.png')
# im = im.crop((0, 0, im.width, im.height - 20))  # optional trim
im.save(r'<out>.webp', quality=85)
print(im.size)
"
```

3. Delete the intermediate PNG.

Name the file `<topic>-screenshot.webp`, kebab-case.

## Step 4: Insert into the page

For **updates pages**, insert below the entry's text with no caption and the red-glow style:

```mdx
<Image src={import('./_assets/<topic>-screenshot.webp')} width="600px" userClass="red-glow"/>
```

For regular content pages, use the normal captioned form (caption ends with a full stop, width includes `px`).

## Edge cases

- **Heading text matches multiple elements**: the script takes the first match; pass a longer, more unique string.
- **The capture ends mid-thought** (height budget cut it before the interesting part): either raise `--max-height` slightly, start later in the section, or use `--end-img` to anchor the end at a figure.
- **User wants a region of their actual screen** (an app window, a non-blog site): use the `snip-image` skill instead.

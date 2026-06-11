# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "playwright>=1.45",
# ]
# ///
"""Screenshot part of a rendered blog page (dark mode) using Playwright.

Usage:
    uv run section_screenshot.py <url> <out.png> <startText> [--end-img SUBSTR] [--max-height PX]

    url            - full page URL, e.g. http://localhost:4321/programming/microcontrollers/stm32/
    out.png        - output PNG path
    startText      - text of the h2/h3 the capture starts at (or unique text of a starting paragraph)
    --end-img      - substring of an <img> src the capture should end at (its figure caption is
                     included), overriding --max-height
    --max-height   - height budget in px (default 800). Elements are added until the next one
                     would exceed it (never past the end of the section), so the capture always
                     ends on a clean element boundary.

The capture is a little wider than the content column (10 px padding each side).

uv creates the environment from the inline dependencies above. The script uses the
newest Playwright-managed Chromium under %LOCALAPPDATA%/ms-playwright (auto-detected),
so no browser download is needed if one is already installed.
"""

import argparse
import re
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

SECTION_CLIP_JS = """
({ startText, endImgSubstr, maxHeight }) => {
  const candidates = [...document.querySelectorAll('h1, h2, h3, h4, p')];
  const start = candidates.find(el => el.textContent.includes(startText));
  if (!start) return { error: 'start element not found' };

  const startLevel = /^H\\d$/.test(start.tagName) ? Number(start.tagName[1]) : 99;
  const startRect = start.getBoundingClientRect();
  const rects = [startRect];
  let el = start.nextElementSibling;
  let endImgSeen = false;
  while (el) {
    const rect = el.getBoundingClientRect();
    if (endImgSubstr) {
      rects.push(rect);
      if (el.querySelector && (el.querySelector(`img[src*="${endImgSubstr}"]`) || (el.tagName === 'IMG' && el.src.includes(endImgSubstr)))) {
        endImgSeen = true;
        break;
      }
    } else {
      if (/^H\\d$/.test(el.tagName) && Number(el.tagName[1]) <= startLevel) break;
      // stop (on an element boundary) once the height budget would be exceeded,
      // but always include at least one element after the start
      if (rects.length > 1 && rect.bottom - startRect.top > maxHeight) break;
      rects.push(rect);
    }
    el = el.nextElementSibling;
  }
  if (endImgSubstr && !endImgSeen) return { error: 'end image not found among section siblings' };

  const sx = window.scrollX, sy = window.scrollY;
  const x0 = Math.min(...rects.map(r => r.left)) + sx - 10;
  const y0 = Math.min(...rects.map(r => r.top)) + sy - 10;
  const x1 = Math.max(...rects.map(r => r.right)) + sx + 10;
  const y1 = Math.max(...rects.map(r => r.bottom)) + sy + 10;
  return { x: x0, y: y0, width: x1 - x0, height: y1 - y0 };
}
"""

LAZY_LOAD_SCROLL_JS = """
async ({ y, height }) => {
  for (let pos = y; pos < y + height; pos += 800) {
    window.scrollTo(0, pos);
    await new Promise(r => setTimeout(r, 150));
  }
}
"""

def find_chromium() -> str:
    pw_dir = Path.home() / 'AppData/Local/ms-playwright'
    dirs = sorted(d for d in pw_dir.glob('chromium-*') if re.fullmatch(r'chromium-\d+', d.name))
    if not dirs:
        sys.exit(f'No Playwright Chromium found under {pw_dir} — run: uv run playwright install chromium')
    return str(dirs[-1] / 'chrome-win64' / 'chrome.exe')

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('url')
    parser.add_argument('out_path')
    parser.add_argument('start_text')
    parser.add_argument('--end-img', default=None)
    parser.add_argument('--max-height', type=int, default=800)
    args = parser.parse_args()

    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=find_chromium())
        page = browser.new_page(viewport={'width': 1100, 'height': 4000}, color_scheme='dark')
        page.goto(args.url, wait_until='networkidle')
        page.wait_for_timeout(500)

        clip = page.evaluate(SECTION_CLIP_JS, {
            'startText': args.start_text,
            'endImgSubstr': args.end_img,
            'maxHeight': args.max_height,
        })
        if 'error' in clip:
            browser.close()
            sys.exit('ERROR: ' + clip['error'])

        # Scroll through the clip region so lazy-loaded images actually load
        page.evaluate(LAZY_LOAD_SCROLL_JS, {'y': clip['y'], 'height': clip['height']})
        try:
            page.wait_for_function('() => [...document.images].every(i => i.complete)', timeout=5000)
        except Exception:
            pass
        page.wait_for_timeout(300)

        page.screenshot(path=args.out_path, clip=clip, full_page=True)
        browser.close()
        print('saved', args.out_path, clip)

if __name__ == '__main__':
    main()

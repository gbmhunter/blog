"""
Finds all pages with a `lastUpdated` frontmatter date older than a cutoff
(default 2026-01-01) and ranks them from the most content to the least.
Useful for finding out which pages need updating first.

If a page has no `lastUpdated`, its `date` is used instead. Pages with
`type: updates` (monthly update posts) are skipped by default as they are
dated news posts and are never "updated"; include them with --include-updates.

Usage:
    python scripts/find-stale-pages.py
    python scripts/find-stale-pages.py --cutoff 2025-06-01 --limit 20
"""

import argparse
import re
from datetime import date
from pathlib import Path

PAGES_DIR = Path(__file__).resolve().parent.parent / 'src' / 'content' / 'pages'

FRONTMATTER_RE = re.compile(r'\A---\r?\n(.*?)\r?\n---\r?\n', re.DOTALL)
DATE_KEY_RE = r'^{key}:\s*[\'"]?(\d{{4}}-\d{{2}}-\d{{2}})'
TYPE_RE = re.compile(r'^type:\s*[\'"]?(\w+)', re.MULTILINE)


def get_frontmatter_date(frontmatter: str, key: str) -> date | None:
    match = re.search(DATE_KEY_RE.format(key=key), frontmatter, re.MULTILINE)
    if match is None:
        return None
    return date.fromisoformat(match.group(1))


def count_words(body: str) -> int:
    return len(body.split())


def main() -> None:
    parser = argparse.ArgumentParser(description='Rank stale pages by content size.')
    parser.add_argument('--cutoff', type=date.fromisoformat, default=date(2026, 1, 1),
                        help='Only report pages last updated before this date (default: 2026-01-01).')
    parser.add_argument('--limit', type=int, default=None,
                        help='Only show the top N pages.')
    parser.add_argument('--include-updates', action='store_true',
                        help='Also include pages with type: updates.')
    args = parser.parse_args()

    stale_pages = []
    for mdx_path in sorted(PAGES_DIR.rglob('index.mdx')):
        text = mdx_path.read_text(encoding='utf-8-sig')
        match = FRONTMATTER_RE.match(text)
        if match is None:
            print(f'WARNING: no frontmatter found in {mdx_path}, skipping.')
            continue
        frontmatter = match.group(1)
        body = text[match.end():]

        type_match = TYPE_RE.search(frontmatter)
        if not args.include_updates and type_match and type_match.group(1) == 'updates':
            continue

        last_updated = get_frontmatter_date(frontmatter, 'lastUpdated')
        if last_updated is None:
            last_updated = get_frontmatter_date(frontmatter, 'date')
        if last_updated is None:
            print(f'WARNING: no lastUpdated or date found in {mdx_path}, skipping.')
            continue

        if last_updated >= args.cutoff:
            continue

        url_path = '/' + mdx_path.parent.relative_to(PAGES_DIR).as_posix() + '/'
        stale_pages.append((count_words(body), last_updated, url_path))

    stale_pages.sort(key=lambda page: page[0], reverse=True)
    total = len(stale_pages)
    if args.limit is not None:
        stale_pages = stale_pages[:args.limit]

    shown = f' (showing top {len(stale_pages)})' if len(stale_pages) < total else ''
    print(f'{total} pages last updated before {args.cutoff}{shown}, '
          f'ranked by word count (most content first):\n')
    print(f'{"RANK":>4}  {"WORDS":>6}  {"LAST UPDATED":<12}  PAGE')
    for rank, (words, last_updated, url_path) in enumerate(stale_pages, start=1):
        print(f'{rank:>4}  {words:>6}  {last_updated.isoformat():<12}  {url_path}')


if __name__ == '__main__':
    main()

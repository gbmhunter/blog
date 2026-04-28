"""
Search every content file in the blog for links to a given page path.

Usage:
    python .claude/skills/move-page/find-page-links.py <page-path>

The page path is the URL form (the path that appears inside markdown links
like `[text](/url/path)`). Both with and without a leading slash are
accepted; filesystem paths under `src/content/pages/...` are also accepted
as a convenience and the prefix is stripped automatically.

Examples:
    python .claude/skills/move-page/find-page-links.py /programming/general/checksums
    python .claude/skills/move-page/find-page-links.py programming/general/checksums
    python .claude/skills/move-page/find-page-links.py src/content/pages/programming/general/checksums

Matches both relative (`/page`) and absolute
(`https://blog.mbedded.ninja/page`) link forms. Searching for `/foo/bar`
also reports links to subpages like `/foo/bar/baz`. It does NOT match
unrelated suffixes like `/foo/bar-other` (the trailing boundary check
rejects extra slug characters).

Output format:
    <relative-path>:<line>: <matched-line>

Exit code is 0 whether or not matches are found; only true errors return
a non-zero code.
"""

import argparse
import re
import sys
from pathlib import Path

ABSOLUTE_PREFIX = "https://blog.mbedded.ninja"
SEARCH_EXTENSIONS = ("*.mdx", "*.md")


def find_repo_root(start: Path) -> Path:
    """Walk upward until we find a directory that looks like the repo root."""
    p = start.resolve()
    for _ in range(15):
        if (p / "pyproject.toml").exists() or (p / ".git").exists():
            return p
        if p.parent == p:
            break
        p = p.parent
    raise RuntimeError(f"Could not locate repo root from {start}")


TOP_LEVEL_SECTIONS = (
    "electronics",
    "mathematics",
    "pcb-design",
    "programming",
    "project-management",
    "pyrotechnics",
    "robotics",
    "site-info",
    "space",
    "test",
)


def normalize_page_path(raw: str) -> str:
    """Convert any input form to a URL-rooted path with no trailing slash.

    Handles three input quirks:
      1. Filesystem paths under `src/content/pages/...` — strip that prefix.
      2. Git Bash MSYS path conversion — when run from Git Bash, an argument
         like `/programming/foo` gets rewritten to `C:/Program Files/Git/programming/foo`
         (or similar). Detect a known top-level section and strip everything
         before it.
      3. Missing or extra leading/trailing slashes — normalize to one leading
         slash and no trailing slash.
    """
    p = raw.strip().replace("\\", "/")

    # 1. Strip `src/content/pages` filesystem prefix if present.
    marker = "src/content/pages"
    idx = p.find(marker)
    if idx >= 0:
        p = p[idx + len(marker):]

    # 2. Recover from Git-Bash MSYS path mangling by anchoring on a known
    #    top-level section name.
    for section in TOP_LEVEL_SECTIONS:
        idx = p.find("/" + section + "/")
        if idx > 0:
            p = p[idx:]
            break
        if p.endswith("/" + section):
            p = "/" + section
            break

    if not p.startswith("/"):
        p = "/" + p
    return p.rstrip("/")


def build_patterns(page_path: str) -> list[re.Pattern]:
    """Two patterns: absolute URL form and relative URL form.

    The trailing `(?![A-Za-z0-9-])` rejects unrelated slug suffixes
    (so `/foo/bar` doesn't match `/foo/bar-other`).
    The relative form's leading `(?<![A-Za-z0-9/-])` prevents matching
    when the path appears mid-URL (e.g. so searching `/general/checksums`
    doesn't match inside `/programming/general/checksums`).
    """
    body = re.escape(page_path)
    trail = r"(?![A-Za-z0-9-])"
    return [
        re.compile(re.escape(ABSOLUTE_PREFIX) + body + trail),
        re.compile(r"(?<![A-Za-z0-9/-])" + body + trail),
    ]


def search(content_dir: Path, patterns: list[re.Pattern]) -> list[tuple[Path, int, str]]:
    matches: list[tuple[Path, int, str]] = []
    files: list[Path] = []
    for ext in SEARCH_EXTENSIONS:
        files.extend(content_dir.rglob(ext))
    for path in sorted(set(files)):
        try:
            text = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError) as e:
            print(f"Skipping {path}: {e}", file=sys.stderr)
            continue
        for i, line in enumerate(text.splitlines(), start=1):
            if any(p.search(line) for p in patterns):
                matches.append((path, i, line.rstrip()))
    return matches


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Find internal links to a blog page (and its subpages).",
    )
    parser.add_argument(
        "page_path",
        help="URL path of the page, e.g. /programming/general/checksums",
    )
    args = parser.parse_args()

    repo_root = find_repo_root(Path(__file__).parent)
    content_dir = repo_root / "src" / "content"
    if not content_dir.exists():
        print(f"Error: content directory not found at {content_dir}", file=sys.stderr)
        return 1

    page_path = normalize_page_path(args.page_path)
    patterns = build_patterns(page_path)
    matches = search(content_dir, patterns)

    if not matches:
        print(f"No links to {page_path} found.")
        return 0

    print(f"Found {len(matches)} link(s) matching {page_path}:")
    print()
    for path, line_no, line in matches:
        rel = path.relative_to(repo_root).as_posix()
        print(f"{rel}:{line_no}: {line.strip()}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

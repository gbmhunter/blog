---
name: move-page
description: Move a blog page directory to a new location and update every internal link to it across the codebase. Use whenever the user asks to move, relocate, re-parent, or restructure a page ("move X under Y", "put X into Y", "move X out of A into B"). Handles both relative (`/path`) and absolute (`https://blog.mbedded.ninja/path`) link forms, and updates links to sub-pages too.
---

# Move Page Skill

Use this skill when the user asks to move a blog page from one location in the content tree to another. Pages live at `src/content/pages/<...>/index.mdx`; moving a page means moving the directory that contains its `index.mdx`.

## Step 1: Confirm source and target

Determine:
- **Source directory** — the page's current directory, e.g. `src/content/pages/programming/general/checksums`.
- **Target directory** — the new location, e.g. `src/content/pages/programming/checksums`.

For "move X under Y", the target is `<Y-dir>/<X-slug>` — preserve the slug unless the user asks to rename.

If the user is moving multiple pages in one request (e.g. a parent page and a child page), do them one at a time, parent first. Otherwise the child move target may not exist yet.

## Step 2: Find every link to the page

Run the bundled search script with the page's URL path (the path that appears inside markdown links like `[text](/url/path)`):

```
python .claude/skills/move-page/find-page-links.py /programming/general/checksums
```

The script:
- Walks every `.mdx` and `.md` file under `src/content/`.
- Matches both relative (`/page-path`) and absolute (`https://blog.mbedded.ninja/page-path`) link forms.
- Matches sub-pages too — searching for `/foo/bar` also reports links to `/foo/bar/baz`.
- Stops short of unrelated slug suffixes — `/foo/bar` does NOT match `/foo/bar-other`.

Output is `file:line: matched-line` for every hit. Read the output before moving so you have the full list of files to update in step 4.

## Step 3: Move the directory with `git mv`

```
git mv src/content/pages/programming/general/checksums src/content/pages/programming/checksums
```

Use `git mv` (not plain `mv`) so the rename is tracked in git history.

The target's parent directory must already exist. Usually it does because the parent is itself an existing page directory (it has its own `index.mdx`). If the parent doesn't exist, that's a sign you should check the target with the user before continuing.

## Step 4: Update every found link

For each match returned by step 2, use the Edit tool to rewrite the link. Both forms must be updated where they appear:
- Relative: `/old/path` → `/new/path`
- Absolute: `https://blog.mbedded.ninja/old/path` → `https://blog.mbedded.ninja/new/path`

Use Edit (not sed/awk). Each replacement should be visible and reviewable.

## Step 5: Verify

Re-run the search script with the OLD path. It should report no matches. Then run `git status` and confirm:
- The directory rename appears as `renamed:` lines.
- Every linking file appears as `modified:` with the link rewritten.

## Notes

- The script is stdlib-only — no `uv` or extra packages required.
- Sub-page links update automatically because the search matches by prefix. After moving `/foo/bar` to `/baz/bar`, a link to `/foo/bar/child` becomes `/baz/bar/child` with the same prefix replacement.
- Inbound links from other sites cannot be updated — only files inside this repo are touched.
- If the search returns dozens of hits, pause and confirm the move with the user — broad page moves create a lot of churn and may indicate the target slug isn't quite right.

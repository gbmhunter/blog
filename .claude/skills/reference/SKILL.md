---
name: reference
description: Build a formatted citation reference for a blog page and insert it into that page's references section. Use this skill whenever the user says "reference <url>", "add a reference for <url>", "cite <url>", or pastes a URL and asks for it to be added as a reference/citation. The skill fetches the URL, extracts metadata, formats a footnote reference line, and appends it to the references block of the active .mdx file (the user adds the in-text citation themselves).
---

# Reference Skill

When the user provides a URL and asks for a reference, follow these steps.

**Whenever you are asked to ref a URL, the finished reference always gets inserted into the references section at the bottom of the active `.mdx` file** (when there is one) — see Step 6. Never cite it anywhere else in the markdown; the user does that themselves.

## Step 1: Identify the target page

Look at the conversation context to work out which `.mdx` page the reference is for. It will usually be obvious from the file open in the IDE, or from recent Read/Edit tool calls. This page is where the reference gets inserted (Step 6), and it's also what the duplicate-key check in Step 4 runs against. If it's genuinely unclear which page is active, skip the insert and just print the reference line — don't ask.

## Step 2: Fetch the URL

**For HTML pages**, use the Chrome browser tools (NOT WebFetch) to navigate and extract content. This avoids bot-blocking that WebFetch often triggers:

1. Call `mcp__claude-in-chrome__tabs_context_mcp` (with `createIfEmpty: true`) to get a tab ID.
2. Call `mcp__claude-in-chrome__navigate` to navigate to the URL.
3. Call `mcp__claude-in-chrome__get_page_text` to read the page content.

**For PDF URLs** (URL ends in `.pdf`, or browser navigation says the page is a PDF/canvas with no extractable text), download and extract instead. The browser's `get_page_text` returns "No text content found" for PDFs:

1. Download the PDF to a temp file (PowerShell):
   ```powershell
   Invoke-WebRequest -Uri "<URL>" -OutFile "$env:TEMP\<filename>.pdf" -UseBasicParsing
   ```
2. Extract text with pypdf via `uv run` (handles owner-password-protected PDFs by decrypting with empty password — common for vendor datasheets):
   ```powershell
   uv run --with pypdf python -c @"
   from pypdf import PdfReader
   r = PdfReader(r'$env:TEMP\<filename>.pdf')
   if r.is_encrypted:
       r.decrypt('')
   print(r.pages[0].extract_text()[:2000])
   "@
   ```
3. The first page typically contains the title, part number, revision date, and publisher.

Extract from whichever source you used:
- **Title** — the page's main title (use the `<title>` tag, `<h1>`, or PDF first-page heading)
- **Author** — the author's name if present (bylines, meta tags, or a clear "by X" attribution)
- **Publication date** — if present (`<time>` tags, meta tags, or "REVISED" / "Rev." dates on PDFs)
- **Publisher/Site name** — the organisation or site name (`og:site_name`, PDF footer, or domain name)
- **Content type** — see type guide below

If the page redirects, follow the redirect. The final URL shown after navigation is the canonical URL to use in the reference.

## Step 3: Determine the content type tag

Include a `[type]` tag only for non-article content. Common types:

| Content                          | Tag              |
|----------------------------------|------------------|
| Wikipedia article                | `[wiki]`         |
| Datasheet / technical spec       | `[datasheet]`    |
| Forum post / Q&A answer          | `[forum post]`   |
| GitHub issue                     | `[GitHub issue]` |
| GitHub repository                | `[GitHub repository]` |
| PDF document                     | `[pdf]`          |
| Product page                     | `[product page]` |
| Specification document           | `[specification]`|
| Regular article / blog post      | _(omit the tag)_ |

## Step 4: Generate the reference key

The key should be lowercase, hyphen-separated, and read naturally. Derive it from the **publisher/author slug** + **short title slug**. Keep it under ~60 characters. Examples:

- `wikipedia-coaxial-power-connector`
- `silicon-labs-bluetooth-mesh-performance`
- `novel-bits-coded-phy-bluetooths-long-range-feature`
- `cypress-cyw20702-bluetooth-transceiver-and-baseband-processor`

## Step 5: Format the reference line

Use this exact format (from the project's CLAUDE.md):

```
[^reference-key]: Author (year, Mon day). _Title_ [type]. Publisher. Retrieved YYYY-MM-DD, from https://url.
```

Rules:
- The title **must** be wrapped in `_underscores_` to italicise it
- Author and date are omitted if unknown — don't guess or fabricate them
- Omit the date from the author field if only the year is known, e.g. `Silicon Labs (2015).`
- Month abbreviations: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
- The retrieved date is today (see the current date in the conversation context)
- Omit `[type]` for standard articles/blog posts
- End the line with a period

**Examples from the project:**

```
[^wikipedia-bluetooth-sig]: Wikipedia (2023, Apr 27). _Bluetooth Special Interest Group_ [wiki]. Retrieved 2023-05-24, from https://en.wikipedia.org/wiki/Bluetooth_Special_Interest_Group.
[^silicon-labs-bluetooth-mesh-performance]: Silicon Labs. _AN1137: Bluetooth Mesh Network Performance_. Retrieved 2023-05-24, from https://www.silabs.com/documents/public/application-notes/an1137-bluetooth-mesh-network-performance.pdf.
[^punch-through-bluetooth-phy-how-it-works]: Henry Anfang (2019, Dec 31). _Bluetooth PHY - How it Works and How to Leverage it_. Punch Through. Retrieved 2025-08-03, from https://punchthrough.com/crash-course-in-2m-bluetooth-low-energy-phy/.
[^tonymacx86-tp-link-ub400-not-recognized]: tonymacx86 (2022, Oct 25). _Tp-Link UB400 not being recognized_ [forum post]. Retrieved 2025-02-05, from https://www.tonymacx86.com/threads/tp-link-ub400-not-being-recognized.322815/.
```

## Step 6: Insert the reference into the active page

If a target `.mdx` page was identified in Step 1, **insert the finished reference line into that page's references section** — the block at the bottom of the file marked by the `{/* REFERENCES */}` comment banner:

```
{/* ============================================================================================ */}
{/* REFERENCES */}
{/* ============================================================================================ */}

[^existing-key]: ...
[^new-key]: Author (year, Mon day). _Title_ [type]. Publisher. Retrieved YYYY-MM-DD, from https://url.
```

Rules for the insert:

- Append the new line at the **end** of the existing footnote list. Do not re-sort or otherwise touch the existing references.
- If the page has no references section yet, add the three-line comment banner (blank line above and below it) at the bottom of the file, then the reference line.
- **Only ever edit the references section.** Never add a `[^key]` citation marker to the body text, never reword body prose to work the reference in, and never suggest where it should be cited — the user cites it themselves.

Then print the inserted line in the chat, in a fenced code block, and say which page it went into:

```
[^reference-key]: Author (year, Mon day). _Title_ [type]. Publisher. Retrieved YYYY-MM-DD, from https://url.
```

If **no** target page is active (Step 1 came up empty), don't go hunting for one — just print the reference line in a fenced code block and leave it at that.

Add a brief note only if the fetch turned up something the user would want to know (e.g. the page redirected, the listing had no date, the product was not what the URL suggested). Otherwise the code block plus a one-line summary is the whole response.

**Never remind the user to cite the reference.** They know the footnote has to be referenced from the body text to render — pointing out that it is not yet cited, or suggesting where to cite it, is unwanted.

## Edge cases

- **Can't fetch the URL** (paywalled, auth required, Chrome not available, etc.): Tell the user what information you need — title, author, date, publisher — and construct the reference from what they provide.
- **PDF with a real user-password** (pypdf's `decrypt('')` returns 0 / fails): Treat as un-fetchable and ask the user for title/date.
- **No URL available** (e.g. a PDF received via email, a document otherwise shared privately): replace the `from https://...` portion with `on file with author`. The full ending becomes `Retrieved YYYY-MM-DD, on file with author.` Example:

  ```
  [^fujifilm-prescale-llw-instruction-manual]: Fujifilm (2017). _Prescale LLW Instruction Manual_ [instruction manual]. Retrieved 2026-04-20, on file with author.
  ```

- **Duplicate key**: Before inserting, grep the target page for the key. If it already exists, append `-2` (or `-3`, etc.) to make it unique. If the target page is unknown, skip this check.
- **Wikipedia pages**: The author is always "Wikipedia", the date is the page's last edited date (shown in the footer), and the type is `[wiki]`.
- **GitHub repos**: Author is the repo owner username, title is `owner/repo-name`, type is `[GitHub repository]`, no publication date.

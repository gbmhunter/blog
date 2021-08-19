---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Web Design" ]
date: 2018-12-04
description: "Information on the static-site builder Hugo."
lastmod: 2020-02-27
tags: [ "programming", "web design", "Hugo", "static site", "website", "go", "software", "server", "templating", "errors" ]
title: "Hugo"
type: "page"
---

## Development

To start a development server and watch for file changes:

```sh
$ hugo server -w
```

Sometimes when watching for changes the server will get out-of-sync with the current state of the files. If this is happening frequently, you can use the `--disableFastRender` flag to force Hugo to rebuild from scratch each time there are changes.

```sh
$ hugo server -w --disableFastRender
```

However, this will slow down build times, which may become an issue for larger sites.

## Templating

You can tell Hugo to automatically remove whitespace between HTML tags and template output by adding the hyphen `-` next to the `{{` and `}}` delimiters.

**Without hyphens:**

```html
<div>
{{ .Title }}
</div>
```

will result in:

```html
<div>
My Page Title
</div>
```

**With hyphens:**

```html
<div>
{{- .Title -}}
</div>
```

will result in (notice that whitespace is removed):

```html
<div>My Page Title</div>
```

I recommend to add whitespace removing hyphens to all template delimiters `{{` and `}}` unless you explicitly need the whitespace. Leaving the whitespace in can cause unexpected issues when the markdown parser interprets it as special formatting (e.g. wraps everything in an unwanted code block due to indentation being present).

### Printing Variables

You can easily debug variables by printing them to the HTML and then viewing the output in your browser (by building the site).

You can print a variable by just doing:

```html
{{ $myVariable }}
```

However, it is not easy to print messages to the hugo command line, which would be helpful in cases where you can't print to the page, e.g. when the page is failing to render.

## Page Rendering Timeouts

Hugo has a built in per-page rendering timeout, which by default is set to `10s`. This is designed to detect recursive error conditions for shortcodes and partials when they include themselves without proper terminating conditions, causing infinite recursion. However, **this timeout can also be incorrectly triggered when pages have a lot of image resources that need processing**. You may see an error similar to:

```text
6:42:50 PM: Error: Error building site: "/opt/build/repo/content/index.md:1:1":
   timed out initializing value. This is most likely a 
   circular loop in a shortcode
```

This may occur only on your build server but not locally due to typically lower performant hardware being available on build servers. This error occurred for me when building on Netlify but not when building locally.

Luckily, you can increase the timeout by adding/adjusting the `timeout` parameter in `config.toml` at the root directory of the Hugo project. As of [v0.60.1](https://github.com/gohugoio/hugo/releases/tag/v0.60.1), Hugo supports postfixes such as `s` to the end of the timeout so you don't have to specify it in milliseconds ([v0.60.0](https://github.com/gohugoio/hugo/releases/tag/v0.60.0) added this feature, but included a bug which caused it to work incorrectly).

```toml
timeout = 30s
```

## Remove Build Cache

If you need remove build cache, make sure to delete both the `public/` and `resources/` directories:

```bash
rm -rf public/ resources/
```

## Common Errors

```text
unrecognized character in shortcode action: U+007D '}'. Note: Parameters with non-alphanumeric args must be quoted
```

You will typically get this error when you forget to add a leading `%` or `>` prefix to the closing `}}` of a shortcode.

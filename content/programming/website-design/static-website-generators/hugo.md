---
author: gbmhunter
date: 2018-12-04
title: Hugo
type: page
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

### Printing Variables

You can easily debug variables by printing them to the HTML and then viewing the output in your browser (by building the site).

You can print a variable by just doing:

```html
{{ $myVariable }}
```

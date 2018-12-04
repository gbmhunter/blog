---
author: gbmhunter
date: 2018-12-04
title: Hugo
type: page
---

# Development

To start a development server and watch for changes:

```sh
$ hugo server -w
```

Sometimes when watching for changes the server will get out-of-sync with the current state of the files. If this is happening frequently, you can use the `--disableFastRender` flag to force Hugo to rebuild from scratch each time there are changes.

```sh
$ hugo server -w --disableFastRender
```

However, this will slow down build times, which may become an issue for larger sites.
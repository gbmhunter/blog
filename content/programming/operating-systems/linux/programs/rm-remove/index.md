---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Operating Systems", "Linux", "Programs" ]
date: 2019-02-04
description: "A tutorial on the UNIX command-line program rm, used for deleting files and directories from the file system."
draft: false
lastmod: 2019-07-29
tags: [ "Linux", "rm", "remove", "program", "utility", "special characters", "UNIX", "argument list", "find" ]
title: "rm (remove)"
type: "page"
---

## Overview

`rm` is a UNIX command for deleting files and directories on the file system.

{{% figure src="example.svg" width="500px" %}}

## Dealing With Special Characters

See [Bash - Dealing With Special Characters](/programming/languages/bash) for more information.


## Argument list too long

If you provide too many files to delete to a single invocation of the `rm` (e.g. you use the wildcard expression `rm *.jpg` in bash to match a large number of images), you may get the following error:

```bash
unable to execute /bin/rm: Argument list too long
```

This is because bash expands the command to `rm file1.jpg file2.jpg ...` and `rm` only supports a limited number of arguments.

A workaround is to use `find` instead:

```bash
$ find . -maxdepth 1 -name "*.jpg" -delete
```

`-maxdepth 1` is required to prevent `find` from recursively going into subdirectories and deleting files from in there.

{{% aside type="note" %}}
Instead of using the `delete` option, you could use `find` in combination with piping and `xargs`. However, this is likely to be less performant than `-delete` as you are passing data between multiple processes. It is also more to type!
{{% /aside %}}
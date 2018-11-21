---
title: "du"
date: 2018-11-19
type: page
---

To list the sizes of files inside a protected directory, you can use `du` in conjunction with `ls` and `xargs`:

```sh
$ sudo ls | xargs sudo du -sh
```
---
author: gbmhunter
date: 2014-02-08
draft: false
lastmod: 2019-03-08
title: "Git"
type: page
---

## Pulling In Temporary Changes To Your Branch

If you have some small improvements on branch `A` that make debugging/testing easier that are not yet reviewed/pushed to master, and you are working on branch `B`, you can bring these useful changes into `B` without polluting the branch with:

```sh
$ git merge --no-commit --squash A
$ git reset HEAD
```
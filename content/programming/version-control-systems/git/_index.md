---
author: gbmhunter
date: 2014-02-08 03:28:52+00:00
draft: false
title: Git
type: page
url: /programming/version-control-systems/git
---

## Pulling In Temporary Changes To Your Branch

If you have some small improvements on branch `A` that make debugging/testing easier that are not yet reviewed/pushed to master, and you are working on branch `B`, you can bring these useful changes into `B` without polluting the branch with:

```sh
$ git merge --no-commit --squash A
$ git reset HEAD
```
---
title: "Git"
date: 2018-11-19
type: page
---

# Searching For A File

If you want to find a file in your git history, and are not sure on the exact path, you can use the command:

```shell
$ git log --all --full-history -- **/thefile.*
```

This will show a list of all commits from all branches which modified the file in any way.
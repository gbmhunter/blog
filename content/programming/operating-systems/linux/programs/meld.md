---
author: gbmhunter
date: 2016-12-09 08:38:00+00:00
draft: false
title: meld
type: page
url: /programming/operating-systems/linux/programs/meld
---

# Overview

**meld** is a graphical software tool that allows the user to compare and merge the differences between files and folders.

It is commonly used when **resolving merge conflicts** between two files with are under a version control system such as git.

# Compare Two Files

The simplest way to run meld is to compare two files with:

```sh   
$ meld file1.c file2.c
```

This will open up the two files in a graphical interface, where you can easily see the differences and merge if required.
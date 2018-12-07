---
author: gbmhunter
date: 2014-01-05 20:05:42+00:00
draft: false
title: find
type: page
url: /programming/operating-systems/linux/programs/find
---

# Overview

`find` is a UNIX utility program which searches directory trees for files matching particular patterns.

By default, `find` is recursive. It searches from the specified directory and looks in all sub-directories.

The search pattern uses glob-style pattern matching.

# Multiple Patterns

You can provide find with multiple patterns by using the `-o` option.

The following example looks for all files with the `.cpp` or `.hpp` file extension in the current directory.

```sh    
find . -name "*.cpp" -o -name "*.hpp"
```    

# Combining With sed

`find`, a program which finds files, lends itself to working well in conjuction with `sed`, a program for modifying the contents of a file.

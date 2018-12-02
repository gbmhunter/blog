---
author: gbmhunter
date: 2014-01-05 20:05:42+00:00
draft: false
title: find
type: page
url: /programming/operating-systems/linux/programs/find
---

# Multiple Patterns

You can provide find with multiple patterns by using the `-o` option.

The following example looks for all files with the .cpp or .hpp file extension in the current directory.

```sh    
find . -name "*.cpp" -o -name "*.hpp"
```    

# Combining With sed

`find`, a program which finds files, lends itself to working well in conjuction with sed, a program for modifying the contents of a file.

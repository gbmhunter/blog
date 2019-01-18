---
author: gbmhunter
date: 2015-10-07 03:21:26+00:00
draft: false
title: GCC Compiler Optimisation Levels
type: page
---

## Fancy Optimisations

One aspect of GCC optimisation that still amazes me is it's ability to convert specific repetitive operations into highly-efficient mathematical sequence equations.

One example is that GCC can convert an function in where you sum all the integers up to the number specified as an input variable using a for loop, into the equation x * (x + 1) / 2.

This is covered in more detail [here](http://blog.xebia.com/gcc-compiler-optimizations-dissection-of-a-benchmark/).

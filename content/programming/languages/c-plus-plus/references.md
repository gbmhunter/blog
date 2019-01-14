---
author: gbmhunter
date: 2013-12-25 03:17:14+00:00
draft: false
title: References
type: page
---

## Overview

C++ introduces the reference operator, `&`, which works slightly different than it does in C.
    
```c++
    double a = 1;
    double b = &a;  // b is now a pointer to a
    
    b = 2;
    
    // a now = 2
```

For those who come from a C background and understand pointers, treat it as though `double &b = a` goes to `double *b = &a` and all the subsequent usage of `b` is replaced with `*b`. Note that the double that `b` points to cannot be changed! This is unlike a normal pointer, `double *b = &a`, in where you could later write `b = &c`. This will not work with a reference.

## What Are They Good For?

References can simplify the syntax of certain pointer manipulation. They also useful when creating operator overloads, (e.g. the ++ operator for an enumeration), so that the syntax remains consistent with the base types in C++.

{{% warning %}}
Undefined behaviour occurs if you ever return a local variable by reference, even if it's an rvalue reference.
{{% /warning %}}

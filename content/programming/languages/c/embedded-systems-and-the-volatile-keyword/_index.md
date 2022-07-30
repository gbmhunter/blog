---
authors: [ "Geoffrey Hunter" ]
date: 2022-07-29
description: "."
draft: false
lastmod: 2022-07-29
tags: [ programming, C, volatile ]
title: Embedded Systems And The Volatile Keyword
type: page
---

{{% warning-is-notes %}}

## Overview

Many C/C++ software engineers could go their entire life without ever needing to use the `volatile` keyword. However in embedded systems, knowing how the `volatile` keyword works and how to use it is a vital skill.

The `volatile` keyword is a qualifier you apply to a variable. It tells the compiler that the value stored at this address may change at any time, even if the compiler cannot see a code path that would cause it to change. This forces the compiler to perform a read/write from memory every time the variable is used in the code, rather than the compiler storing the variable locally in a register or optimizing the read/write out completely!

`volatile` is used for:

* Variables which are read/written to from interrupts and also accessed outside the interrupt. If you forgot the `volatile` the compiler cannot set the code path that calls the interrupt (because interrupts are called asynchronously) and thus may assume nothing else touches the variable and cache the value in a register (or optimize out the read/write completely).
* Memory addresses which point to hardware registers in microcontrollers. These hardware registers are liable to be changed at any time by the hardware (e.g. a bit in a UART peripheral register which indicates when there are received bytes available for reading), so the compiler cannot assume it's only changed when the code writes to it.

## memcpy() And volatile

`memcpy()` cannot operate on `volatile` data. This can be an annoyance if you are trying to copy data to or from a buffer (array of bytes, i.e. `char *`) which is declared `volatile`. However, you can easily make your own version of `memcpy()` which does work with `volatile`. Below is a example of a `memcpy()` equivalent that works with a destination buffer that is `volatile`:

```c
// Version of memcpy that works with a volatile destination buffer
void memcpy_to_volatile(volatile char * dest, char * src, uint32_t num_bytes) {
    for (uint32_t i = 0; i < num_bytes; i++) {
        dest[i] = src[i];
    }
}
```

## Casting Away volatile

{{% warning %}}
Casting away `volatile` on a variable can cause undefined behaviour.
{{% /warning %}}

In C++, you can use `const_cast` to cast away `volatile` (confusingly, it's called `const_cast`, but it actually casts away both `const` and `volatile`).

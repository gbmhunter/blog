---
author: gbmhunter
date: 2014-01-21
draft: false
title: Warning And Error Message Help
type: page
---

## warning: ISO C++ says that these are ambiguous, even though the worst conversion for the first is better than the worst conversion for the second:

This is a form of overload ambiguity. It occurs because a candidate function is only better than another candidate function if `NONE` of it's parameters are a worst match than the parameters of the other, and at least one conversion is better.

This warning can also be an error!

## error: undefined reference to `typeinfo for [classname]`

This can come about if you have run-time info disabled via the `-fno-rtti` GCC compiler option.

This can also come about from forgetting to declare non-pure virtual functions, as the following snippet from GCC suggests.

> If the class declares any non-inline, non-pure virtual functions, the first one is chosen as the “key method” for the class, and the `vtable` is only emitted in the translation unit where the key method is defined.

---
author: gbmhunter
date: 2016-12-15 08:14:43+00:00
draft: false
title: Boost Libraries
type: page
url: /programming/languages/c-plus-plus/boost-libraries
---

## shared_ptr

shared_ptr stores a pointer to a dynamically allocated object. It performs reference counting and will call delete on the original object when the last shared_ptr pointing to the object is destroyed (or reset).

shared_ptr was included in the C++11 standard, as std::shared_ptr. It is recommended to use the standard library version unless backwards compatibility is required.

## Assertion `px != 0` failed

If you get the runtime error:

```c++    
Assertion px != 0 failed.
```

it usually means you tried to access the stuff the shared_ptr was pointing to before allocating it anything. This is the equivalent of trying to de-reference a raw pointer that is equal to null and getting a segmentation fault, except shared_ptr is smarter and checks this for you.

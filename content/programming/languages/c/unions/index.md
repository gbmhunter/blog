---
authors: [ "Geoffrey Hunter" ]
date: 2017-08-14
draft: false
title: Unions
type: page
---

## Overview

**Unions are used to create a data structure that can be addressed using different data types.** An example of a union is shown below. This defines a result_t type which can either be read/written as a 32-bit value or an 8-bit error.

```c    
typedef union {
    uint32_t value;
    uint8_t error;
} result_t;
```

Unions are useful when function parameters have multiple purposes.

The purpose of union is to save memory by using the same memory region for storing different objects at different times. Unions are NOT meant to be used for type conversion.

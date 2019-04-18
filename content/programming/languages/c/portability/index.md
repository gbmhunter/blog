---
author: gbmhunter
date: 2014-07-19
draft: false
title: Portability
type: page
---

Use data types defined in `stdint.h` for better portability. These include:

```c
int8_t
uint8_t
int16_t
uint16_t
int32_t
uint32_t
int64_t
uint64_t
// Not all compilers/platforms (especially microcontroller ones) support these last two
int128_t
uint128_t 
```    

This is because the data types such as int can vary in size between platforms. It is guaranteed to be at least 16 bits, but is defined to be the "most natural integer representation for a particular platform", so on a 32-bit machine an int is likely to be 32 bits wide.

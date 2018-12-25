---
author: gbmhunter
date: 2016-02-12 05:58:03+00:00
draft: false
title: Bit Fields And Bit Manipulation/Masking
type: page
url: /programming/languages/c/bit-fields-and-bit-manipulation-masking
---

## Overview

A _bit field_ is a software/firmware variable that stores many bits in a **consecutive memory** structure.

_Bit masking_ is the process of masking (selecting) specific bits in a bit field (a multi-bit software/firmware variable), e.g. a 32-bit integer, or uint32_t) to manipulate, without modifying the value of any bits that where not selected.

Bit masking is thought-of as a low-level operation, and is normally only seen in languages such C and C++ (higher level languages may still use bit masking, but the code is likely to be abstracted away from the user). C and C++ bit masking usually makes extensive use of pre-processor macros.

## Setting Bits

The bit-wise OR operation (|) can be used to **set bits in a variable to 1**. The bits in the bit field which you wish to set to 1 are ORed with 1, while those you wish to leave unchanged are ORed with 0.

```c    
uint8_t bitField1 = 0b10110011;
// Using the bitwise OR operator to set bits 4-7 to 1
bitField |= 0b11110000;
// bitField = 0b11110011;
```

## Clearing Bits

The bit-wise AND operation (&) can be used to **set bits in a variable to 0**. The bits in the bitfield which you wish to clear are ANDed with 0, while those you wish to leave unchanged are ANDed with 1.

```c    
uint8_t bitField1 = 0b10110011;
// Using the bitwise AND operator to keep only bits 4-7 (bits 0-3 will
// be cleared)
bitField &= 0b11110000;
// bitField = 0b10110000;
```

## Creating A Multi-Bit Bit Mask

This following example uses a macro to perform the masking and setting of bits. A function could be used, but macros are generally more efficient due to the lack of a function call.

```c    
//! @brief		The maximum width (in bits) that the following bit field manipulation macros can work with.
#define MAX_BIT_FIELD_WIDTH_BITS	32

//! @brief		Creates a "MAX_BIT_FIELD_WIDTH_BITS"-wide bit mask for the specified bit range a to b (inclusive).
//! @details	Example:
//!					BIT_MASK(5, 12) returns the value (if MAX_BIT_FIELD_WIDTH_BITS = 32).
//!						0b 0000 0000 0000 0000 0011 1111 1110 0000
//! @warning	ONLY WORKS WITH UP TO "MAX_BIT_FIELD_WIDTH_BITS" WIDE BIT FIELDS
#define BIT_MASK(a, b) (((unsigned) -1 >> ((MAX_BIT_FIELD_WIDTH_BITS - 1) - (b))) & ~((1U << (a)) - 1))

//! @brief		Use this macro to set a number of bits within a bit field.
//! @details	Example:
//!					SET_BITS(myUint16, 12, 3, 0b101)
//!					will set bits 12 through to 14 with 1, 0 and 1 respectively.
//! @warning	ONLY WORKS WITH UP TO "MAX_BIT_FIELD_WIDTH_BITS" WIDE BIT FIELDS
#define SET_BITS(var, startBit, numBits, val) \
    var = var & ~BIT_MASK(startBit, startBit + numBits - 1); \
    var = var | (val << startBit);
```

You can then use it as in the following:

```c    
uint8_t aRegister = 0x00;
SET_BITS(aRegister, 2, 4, 0b1011);

// aRegister = 0b00101100;

SET_BITS(aRegister, 0, 3, 0b011);

// aRegister = 0b00101011;
```

Note that the above BIT_MASK and SET_BITS macros only work for variables up to MAX_BIT_FIELD_WIDTH_BITS wide!

## Use In The Industry

Many microcontroller manufactures (e.g. [Atmel](/programming/microcontrollers/atmel)), provide firmware libraries and example code which make extensive use of bitfield manipulation to modify the registers which control the hardware peripherals (e.g the register(s) which configures the baud rate, parity and num. stop bits for a UART).

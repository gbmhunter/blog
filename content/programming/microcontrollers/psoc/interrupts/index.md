---
authors: [ "Geoffrey Hunter" ]
date: 2013-07-17
draft: false
title: Interrupts
type: page
---

## Overview

This page is all about how to use interrupts on a PSoC microcontroller. Covers both component based interrupts (also check out the [PSoC Components page](/programming/microcontrollers/psoc/components)) and code based interrupts.

## Component-Based Interrupts

The easiest and most common way to create interrupts on a PSoC microcontroller is to use the schematic-based PSoC Interrupt component. This creates the interrupt for you, allows you to edit it's priority through a GUI, and creates the API to use the interrupt in code. Make sure to check out information about the [PSoC Interrupt Component on the PSoC Component page](/programming/microcontrollers/psoc/components#interrupts).

## Code-Based Interrupts

You have to be aware that **not all interrupts** have to be created using a [PSoC Interrupt component](/programming/microcontrollers/psoc/components#interrupts). There are also pure software method for creating/installing interrupts. This can lead to confusion/bugs if the coder expects that all the interrupts running on the PSoC can be seen in the schematics. Cypress defines the `cyisraddress` data type to store pointers to interrupt handlers. They also define the array `CyRamVectors[]` which stores the interrupt handlers at the correct locations. This is an example from the FreeRTOS port to the PSoC 5.

```c
// Code taken from the FreeRTOS PSoC 5 port

extern void xPortPendSVHandler(void);
extern void xPortSysTickHandler(void);
extern void vPortSVCHandler(void);
extern cyisraddress CyRamVectors[];

// Install the OS Interrupt Handlers.
CyRamVectors[11] = (cyisraddress)vPortSVCHandler;
CyRamVectors[14] = (cyisraddress)xPortPendSVHandler;
CyRamVectors[15] = (cyisraddress)xPortSysTickHandler;
```

The above code installs the neccessary interrupt handlers for the FreeRTOS operating system to work correctly on the PSoC 5. Note that `xPortSysTickHandler` is the "tick" or "heartbeat" for the operating system,

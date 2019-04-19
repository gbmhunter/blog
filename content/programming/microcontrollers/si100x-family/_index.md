---
author: gbmhunter
date: 2011-09-15
draft: false
title: Si100x Family
type: page
---

## Overview

The Si100x is a microcontroller range from Silicon Laboratories that features an inbuilt sub-GHz RF transceiver. It also has a 10-bit ADC, SPI, UART and timer hardware peripherals. It has ultra-low power consumption modes, such as the sleep mode which only uses 60nA. It uses a digital 'priority' crossbar to assign hardware to specific pins. At first glance this may seem like a flexible and nice way of assigning any peripheral to any pin, but actually has huge restrictions! Although peripherals can be mapped to certain pins, peripherals have to be mapped in an certain order (e.g. UART cannot be before SPI in terms of `P0.0` down to `P2.7`), and the peripheral pins have to be in the correct order (e.g. `SCLK`, `SDO` and `SDI` have to be in that order, again in respect to `P0.0` down to `P2.7`).

This restricts the available pins for mapping hardware peripherals, and is responsible for a huge headache when dealing with this issue. It's further complicated by the fact you can 'skip' pins entirely, in a way that they are ignored by the crossbar altogether (e.g. P2.1 = SCK, P2.2 = nothing (skip), P2.3 = SDO, ...). However SiLabs do provide a PC based configuration utility with a GUI that can auto-generate basic code for many of the Si100x's capabilities.

## Interrupts

The Si100x supports digital compare interrupts on PORT's 0 and 1, with a total of two interrupt handlers to be called on logic level change events. The Si100x also supports standard micro interrupts such as ADC compares and timer overflows.

## Supported IDE's

* Silicon Labs IDE (proprietary)
* Keil
* Raisonance Ride 7

## Code Tutorials

[Si100x Low Level Functions](http://localhost/?q=node/149)

[Si100x Inputs/Outputs](http://localhost/?q=node/141)

[Timers](http://localhost/?q=node/107)

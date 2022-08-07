---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Components" ]
date: 2020-04-08
description: "Definition, configurations, uses, example circuit schematics and more information about shift registers."
draft: false
lastmod: 2020-04-09
tags: [ "electronics", "components", "shift registers", "digital logic", "flip flops", "SISO", "SIPO", "PISO", "microcontrollers", "diagrams", "circuits", "bit shift", "C", "595" ]
title: "Shift Registers"
type: "page"
---

## Overview

A shift register is a digital logic circuit which consists of a cascade of flip flops. Each flip-flops output is connected to the input of the next flip flop in succession, and they all share a common clock signal. On each clock pulse, a high or low bit on the input of the first flip flop propagates one flip flop down the line. This is the "shifting" of data from input to output. 

Shift registers can have either parallel or serial inputs, as well as parallel or serial outputs. Common configurations include "serial in, parallel out" (SIPO) and "parallel in, serial out" (PISO) shift registers.

Shift registers are used as digital delay circuits, microcontroller pin expanders, the conversion of data from serial to parallel (and vice versa) and as primitive computer memory.


## Serial-in, Serial-out (SISO) Shift Registers

A SISO shift register can be used as a simple digital delay circuit. A 4-bit SISO shift register would delay the input signal from reaching the output by 4 clock cycles.

{{% figure src="serial-in-serial-out-shift-register.svg" width="600px" caption="Schematic for building a 4-bit SISO shift register from flip flops." %}}

## Serial-in, Parallel-out (SIPO) Shift Registers

Data is shifted in serially on a single wire, but all the data is read out in parallel on multiple output wire.

{{% figure src="sn74hc595-functional-block-diagram-texas-instruments.png" width="500px" caption="The functional block diagram for the Texas Instruments SN74HC595 shift register. Image from http://www.ti.com/lit/ds/symlink/sn74hc595.pdf." %}}

A common use case for SIPO shift registers it to convert a serial signal into a parallel signal.

SIPO shift registers are also used to drive electronics which requires a large number of connections from a microcontroller with a limited number on outputs or GPIO. The microcontroller can output the drive state for all the pins from a single serial pin, and the SIPO converts this into output of many pins. This technique only works for driving electronics which doesn't require fast update rates, as the microcontroller has to output the data serially.

{{% figure src="two-seven-segment-displays-driven-by-shift-registers-texas-instruments.png" width="600px" caption="Two 7-segment displays driven by Texas Instruments SN74HC595 shift registers. Image from https://www.ti.com/lit/an/sbva057/sbva057.pdf." %}}

Likely to be the most popular SIPO shift register in the 74HC595 which is commonly abbreviated to just the "595" (similar to the "555" being the most popular timer IC) [^fastled-github-page].

## Parallel-in, Serial-out (PISO) Shift Registers

The most popular PISO shift register is the 74HC165.

## Bit Shifting In Code

Most low-level programming languages allow you to perform "bit shift" operations on variables. For example, in C, the `<<` and `>>` operators perform left and right shifts. Left shifting a binary number by 1 is a quick way of multiplying the number by 2, whilst right shifting a binary number is a quick way of dividing by 2. Exactly how the hardware performs the bit shift is dependent on the CPU architecture, but typically they would use a digital circuit similar to the shift registers described above.

[^fastled-github-page]: https://github.com/FastLED/FastLED
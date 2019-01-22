---
author: gbmhunter
date: 2012-01-05 03:50:31+00:00
draft: false
title: Crystals
type: page
---

## Overview

_Crystals_ (also called by the more generic term _oscillator_, although oscillators are also used to refer to other "oscillating" components) are electrical components which output a periodic waveform that can be used as a clock source for digital logic (which includes microcontrollers, it's main use).

{{< figure src="/images/2012/01/crystal-schematic.png" width="275px" caption="A schematic of a crystal, usually connected to a microcontroller or other digital device that uses a clock. The load capacitance usually varies from 6-25pF per leg (see the crystals datasheet for the correct value)."  >}}

I have also seen them being called "SMD Tuning Forks". WTF? I'm putting this down to a bad to-English translation.

{{< figure src="/images/2012/01/smd-tuning-fork-weird-name-for-crystal.png" width="275px" caption="Weird name for a crystal, don't you think? Image from http://www.foxonline.com/pdfs/fsrlf.pdf."  >}}

## Schematic Symbol

Unfortunately, many different designator prefixes are used to represent a crystal. Some of the most common are:  * XC  * XO  * OCXO (oven-controller crystal oscillator)

## Important Parameters

Sorted alphabetically.

## Accuracy

Like stability, this is measured in ppm.

Combined with the stability, this gives you the total error you can expect from a crystal operating over a particular temperature range.

## Frequency

Arguably the most important parameter, this is the nominal frequency of the waveform the crystal generates.

Typical values: 20kHz-48MHz

## Lead Capacitance

Typical Values: 8pF-20pF

## Operating Mode

Most crystals operate in the "fundamental" operating mode, that is, they are running at their fundamental frequency.

## Operating Temperature

The operating temperature is the temperature range in which the crystal is guaranteed to operate within it's specified tolerances (e.g. stability and accuracy).

Typical operating temperatures are -40 to +85°C.

## Power Consumption

The power consumption of a crystal is a measure of how much **power** the **crystal consumes** during normal operation. This can be of concern for extremely low power designs.

Typical power consumption for a TH/SMD crystal is around 50uW.

Note that this is the power consumption of the crystal itself, and **does not take into account the power consumption of the associated drive circuitry** (which can be much greater!).

## Stability

Stability is a measure of how repetitive, or stable, the clocks frequency is over time. It is measured in parts-per-million (ppm).

Typical stability is around 30-50ppm.

## What The Crystal Output Looks Like...

The following waveform is the voltage on one of a 12MHz SMD crystals pins, when driven by a standard microcontroller.

{{< figure src="/images/2012/01/12mhz-crystal-output-when-driven-by-microcontroller.jpg" width="1200px" caption="The output voltage waveform of a 12MHz crystal being driven by a standard microcontroller."  >}}

## Oven-Controlled Crystal Oscillators (OCXOs)

High-performance crystal oscillators are kept with temperature-controlled environments to increase the stability of the oscillator. They are called oven-controlled crystal oscillators (OCXOs).

{{< figure src="/images/2012/01/n4a-series-oven-controlled-crystal-oscillator-ocxo-photo.gif" width="264px" caption="A photo of an N4A series OXCO. Image from http://www.bliley.com/."  >}}

The crystals are designed to have a _turning-point_, a point of greatest stability, close to the oven temperature. OXCOs, rather than having a temperature stability in the ppm (parts-per-million) range like normal crystals, have a stability in the ppb (parts-per-billion) range (20ppb would be a viable stability).

Peltier devices can be used as the "oven" to keep the crystal's temperature constant.

## Popular Crystal Packages

The HC-49/U package is a popular choice for older through-hole crystals.

Newer crystals come in small, custom SMD packages, with typically either 2 or 4 pins (with the 4-pin packages usually have two GND pins).

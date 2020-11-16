---
author: "gbmhunter"
categories: [ "Electronics", "Electronic Components" ]
date: 2020-11-03
description: "Architectures, how to read the datasheets, manufacturer part numbers and more info about Digital-to-Analogue Converters (DACs)."
draft: false
lastmod: 2020-11-05
tags: [ "electronics", "components", "digital-to-analogue converters", "DACs", "string DAC", "MDAC", "R2R", "R-2R", "Kelvin divider", "voltage switching DAC", "delta-sigma" ]
title: "Digital-to-Analogue Converters (DACs)"
type: "page"
---

{{% warning-is-notes %}}

## Architectures

When looking for a DAC for your next project, you might stumble across a few different DAC types (or _architectures_). Whilst they all achieve the same basic end goal of converting a digital value into an analogue one, it pays to understand the different internal designs to choose the one that best suits your need. The most common DAC architectures are:

* String DAC (Kelvin Divider DAC)
* R-2R DAC (Voltage Switching DAC)
* Multiplying DAC (MDAC)
* Sigma-Delta

We will discuss these further in the following sections:

### String DAC (Kelvin Divider)

The string DAC (a.k.a Kelvin divider DAC) is the the easiest DAC design to understand, and is just a string of equal-valued resistors from `\(V_{REF}\)` to `\(GND\)`, with taps of each junction to the output.

{{% figure src="dac-architecture-string.svg" width="600px" caption="The internal architecture of a string DAC." %}}

A `\(n\)` bit string DAC requires `\(2^n - 1\)` resistors. This is a sensible number for lower resolutions of 8-10 bits, but soon gets prohibitively high for higher resolutions. For example:

* 8bit DAC: 255 resistors
* 10bit DAC: 1023 resistors
* 12bit DAC: 4095 resistors
* 16bit DAC: 65535 resistors!!!

A string DAC is very dependent on well matched resistors to achieve good linearity. A string DAC has low glitch error.

### R-2R DAC (Voltage Switching DAC)

R-2R (or R-2R ladder) allows for many outputs.

{{% figure src="dac-architecture-r2r.svg" width="800px" caption="The internal architecture of a R-2R DAC." %}}

A `\(n\)` bit R-2R DAC requires `\(2N\)` resistors[^analog-mt015-basic-dac-architectures].

A R-2R DAC can have large glitch errors, due to timing differences in the switches which connect junctions to either `\(V_{REF}\)` or `\(GND\)`.  

### MDAC

The MDAC architecture is very similar to the R-2R architecture.

### Delta-Sigma

Delta-Sigma (or Sigma-Delta) DACs provide the highest precision DACs compared to any other common architecture. You typically find Sigma-Delta DACs with a resolution of 18-24 bits.

## Output Types

* Buffered voltage outputs
* Unbuffered voltage outputs

## Voltage References

### External Voltage References

Most DACs have a requirement for the external voltage reference to be no less than approx. 1V.

## Datasheet Specifications

* Resolution: Number of bits
* Zero Code Error: Voltage when the DAC is instructed to output 0V. Typically 0.5-10mV.
* Offset Error: 
* Output Power-Up Voltage: Within a family of DACs, sometimes there are different physical variants of the IC which will output different voltages on power-up. The most common output voltage is 0V on start-up.

## Manufacturer Part Families

* **AD**: Range of DACs by Analog Devices
  * **AD7**: 

## References

[^analog-mt015-basic-dac-architectures]: <https://www.analog.com/media/ru/training-seminars/tutorials/MT-015.pdf>, retrieved 2020-11-03.
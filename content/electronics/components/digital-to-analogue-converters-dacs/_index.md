---
author: "gbmhunter"
categories: [ "Electronics", "Electronic Components" ]
date: 2020-11-03
description: "Architectures, how to read the datasheets, manufacturer part numbers and more info about Digital-to-Analogue Converters (DACs)."
draft: false
lastmod: 2020-11-25
tags: [ "electronics", "components", "digital-to-analogue converters", "DACs", "string DAC", "MDAC", "R2R", "R-2R", "Kelvin divider", "voltage switching DAC", "delta-sigma", "unipolar", "single-supply", "bipolar", "ppm", "voltage references" ]
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

**Any of these architectures can be _unipolar_ or _bipolar_**. _Unipolar_ (a.k.a. _single supply_) DACs only convert digital values into either positive or negative values, while _bipolar_ DACs can output both negative and positive output values.

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

* **Buffered voltage outputs**: The output from the digital-to-analogue conversion circuitry is fed into an op-amp to buffer the circuitry, lowering the output impedance and making the output less sensitive to current draw and noise.
* **Unbuffered voltage outputs**: No op-amp is added to buffer the output voltage. 

## Voltage References

**The voltage reference is a very important piece of a DAC circuit**. The voltage reference provides the full-scale voltage that the DAC will output (or a fixed multiplier of the full-scale output if there is an output buffer with multiplier). It is important to consider the accuracy of the voltage reference over temperature changes. Typically an error in `\(ppm/°C\)` is provided, with a value of `\(10-100ppm/°C\)` being normal.

### Internal Voltage References

Many DACs come with built in internal voltage references (as well as allowing you to connect an external voltage reference if required).

### External Voltage References

Most DACs have a requirement for the external voltage reference to be no less than approx. 1V.

## Datasheet Specifications

* **Resolution**: This is normally given as the number of bits. This determines what the smallest output step change will be in-response to the smallest digital code change (and change in the LSB). For example, a 10-bit DAC will have 2^10=1024 steps, an so the smallest output step change will be 1/1024 of the reference voltage. Not to be confused with _accuracy_.
* **Zero Code Error**: Voltage when the DAC is instructed to output 0V (the zero code). Typically 0.5-10mV. In a unipolar DAC, this is the same as the _offset error_. In a bipolar DAC, this is different to the _offset error_.
* **Offset Error**: The different between the ideal output and measured output at the lowest possible voltage. For a unipolar DAC the lowest possible voltage is 0V, so this is the same as the _zero code error_. For a bipolar DAC, this will be the most negative voltage and different from the _zero code error_.
* **Output Power-Up Voltage**: Within a family of DACs, sometimes there are different physical variants of the IC which will output different voltages on power-up. The most common output voltage is 0V on start-up.

## Manufacturer Part Families

* **AD**: Range of DACs by Analog Devices
  * **AD7**: 
* **LTC**: Range of DACs by Linear Technology (now owned by Analog Devices).
  * **LTC2664**: Precision reference DAC.

## References

[^analog-mt015-basic-dac-architectures]: <https://www.analog.com/media/ru/training-seminars/tutorials/MT-015.pdf>, retrieved 2020-11-03.
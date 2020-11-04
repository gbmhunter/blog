---
author: "gbmhunter"
categories: [ "Electronics", "Electronic Components" ]
date: 2020-11-03
description: "Architectures, how to read the datasheets, manufacturer part numbers and more info about Digital-to-Analogue Converters (DACs)."
draft: false
lastmod: 2020-11-04
tags: [ "electronics", "components", "digital-to-analogue converters", "DACs" ]
title: "Digital-to-Analogue Converters (DACs)"
type: "page"
---

{{% warning-is-notes %}}

## Architectures

* R-2R
* Sigma-Delta
* String DAC

### R-2R

R-2R (or R-2R ladder) allows for many outputs.

An N-bit R-2R DAC requires 2N resistors[^analog-mt015-basic-dac-architectures].

### Sigma-Delta

Sigma-Delta DACs provide the highest precision DACs compared to any other common architecture. You typically find Sigma-Delta DACs with a resolution of 18-24 bits.

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
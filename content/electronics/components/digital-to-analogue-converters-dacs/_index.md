---
author: "gbmhunter"
categories: [ "Electronics", "Electronic Components" ]
date: 2020-11-03
draft: false
lastmod: 2020-11-03
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

## Voltage References

### External Voltage References

Most DACs have a requirement for the external voltage reference to be no less than approx. 1V.

## Manufacturer Part Families

* **AD**: Range of DACs by Analog Devices
  * **AD7**: 

## References

[^analog-mt015-basic-dac-architectures]: <https://www.analog.com/media/ru/training-seminars/tutorials/MT-015.pdf>, retrieved 2020-11-03.
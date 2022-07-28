---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Components ]
date: 2020-07-29
description: 
draft: false
lastmod: 2022-07-29
tags: [ electronics, components, thermal jumper chips, thermal jumpers, ThermaWick, TJC ]
title: Thermal Jumper Chips
type: page
---

{{% warning-is-notes %}}

## Overview

_Thermal jumper chips_ (TJCs) are surface mount (SMD) chip-sized components which have two pads (e.g. just like 0603 resistors). They are designed to provide good thermal conductivity between the two pads but the pads are electrically isolated from one another. They are typically made from aluminium nitride (AIN), which has a thermal conductivity of around `\(170W/mK\)`[^bib-tt-elec-tjc-series-ds] [^bib-vishay-thermawick-series-ds].

{{% img src="vishay-thermawick-construction-thjp.png" width="400px" caption="Basic construction of a thermal jumper chip from the Vishay ThermaWick family[^bib-vishay-thermawick-series-ds]." %}}

They are used to reduce the temperature of components and high-heat areas on a PCB, and can thermally connect "live copper pours" to better heat-sinked parts of the PCB such as the ground plane. 

{{% img src="tjc-application-example-tt-electronics.png" width="300px" caption="Typical application example for a thermal jumper chip.[^bib-tt-elec-tjc-series-ds]" %}}

## Manufacturers

### TT Electronics

TT Electronics manufacturers a family of thermal jumper chips called the _TJC series_[^bib-tt-elec-tjc-series-ds].

### Vishay ThermaWick

Vishay manufactures a family of thermal jumper chips in the _ThermaWick_ (THJP) series[^bib-vishay-thermawick-series-ds]. For more info see the datasheet at https://www.vishay.com/docs/60157/thjp.pdf.

## References

[^bib-tt-elec-tjc-series-ds]: TT Electronics. _Thermal Jumper Chip: TJC Series (datasheet)_. Retrieved 2022-07-29, from https://nz.mouser.com/datasheet/2/414/TJC-1594299.pdf.
[^bib-vishay-thermawick-series-ds]: Vishay. _ThermaWickTM Thermal Jumper Surface Mount Chip (datasheet)_. Retrieved 2022-07-29, from https://www.vishay.com/docs/60157/thjp.pdf.

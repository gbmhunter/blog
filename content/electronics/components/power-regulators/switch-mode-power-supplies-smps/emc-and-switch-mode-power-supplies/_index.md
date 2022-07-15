---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Electronic Components, Power Regulators ]
date: 2022-07-12
description: How to reduce EMI and reach EMC compliance when using switch-mode power supplies (SMPSs).
draft: false
images: [ /electronics/components/power-regulators/switch-mode-power-supplies-smps/smps-buck-converter-simple.png ]
lastmod: 2022-07-12
tags: [ electronics, components, power regulators, SMPS, buck converter, EMI, EMC ]
title: EMC and Switch-Mode Power Supplies
type: page
---

{{% warning-is-notes %}}

## Overview

## Hot Loops

_Hot loops_ are the current loops in SMPS designs which generally generate/radiate the most EMI and are of greatest concern when it comes to EMC.

The following image shows a basic SMPS circuit (with the switch representing a MOSFET and using a flyback diode rather than active rectification). The light blue rectangle shows the current path when the switch is closed. The green rectangle shows the current path when the switch is open. The red rectangle shows the "hot loop", the current path which has the highest di/dt and is generally the loop you want to minimize and pay particular care to when routing the tracks. 

{{% img src="buck-converter-hot-loop.png" width="700px" caption="Schematic showing the \"Hot Loop\" of a standard buck converter." %}}

The loop involving the inductor and output capacitor are not so important because they experience a relatively smooth trapezoidal shaped current profile (at least when in continuous conduction). The input capacitor and switch however experience a much larger di/dt -- when the switch is closed it goes from 0A and jumps up to the current through the inductor. It then follows the inductor current on the upwards rise until the switch is opened, at which point the current rapidly falls back to 0A. The diode is in a similar position, except it conducts when the input cap and switch are not (it takes the falling edge of the inductor current). Thus the "hot loop" creating the most EMI is the loop involving the input capacitor, switch and diode[^bib-analog-devices-hot-loops].

## References

[^bib-analog-devices-hot-loops]: Christian Kueck. _Layout for Power Designs #1: Hot Loops_. Analog Devices. Retrieved 2022-07-13, from https://www.analog.com/en/technical-articles/layout-for-power-designs-1-hot-loops.html.

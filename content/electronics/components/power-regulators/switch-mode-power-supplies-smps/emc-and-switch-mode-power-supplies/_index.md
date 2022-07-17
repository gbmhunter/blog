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

Switch-mode power supplies (SMPS) can be a **large source of EMI in a circuit**, which can cause your PCB to fail EMC tests. Most of the noise is emitted at the switching frequency and it's harmonics. Many manufacturers will provide recommended layouts for their SMPS ICs and surrounding components, and it's generally a good idea to follow these as closely as possible in your design. This includes things such as:

* Input and output capacitors as close as possible to the SMPS IC.
* Keeping the current loops involving the capacitors, inductor(s) and switching node(s) as small as possible (w.r.t. to their area).
* Making sure there is a continuous ground plane close to all other nets (this also relates to keeping current loops small). 
## Hot Loops

_Hot loops_ are the current loops in SMPS designs which generally generate/radiate the most EMI and are of greatest concern when it comes to EMC.

The following image shows a basic buck converter circuit (with the switch representing a MOSFET and using a flyback diode rather than active rectification). The light blue rectangle shows the current path when the switch is closed. The green rectangle shows the current path when the switch is open. The red rectangle shows the "hot loop", the current path which has the highest di/dt and is generally the loop you want to minimize and pay particular care to when routing the tracks. 

{{% img src="buck-converter-hot-loop.png" width="700px" caption="Schematic showing the \"Hot Loop\" of a standard buck converter." %}}

The loop involving the inductor and output capacitor are not so important because they experience a relatively smooth trapezoidal shaped current profile (at least when in continuous conduction). The input capacitor and switch however experience a much larger di/dt -- when the switch is closed it goes from 0A and jumps up to the current through the inductor. It then follows the inductor current on the upwards rise until the switch is opened, at which point the current rapidly falls back to 0A. The diode is in a similar position, except it conducts when the input cap and switch are not (it takes the falling edge of the inductor current). Thus the "hot loop" creating the most EMI is the loop involving the input capacitor, switch and diode[^bib-analog-devices-hot-loops].

The hot loop for a boost converter is on the output side rather than the input:

{{% img src="boost-converter-hot-loop.png" width="700px" caption="Schematic showing the \"Hot Loop\" of a boost converter." %}}

{{% tip %}}
Because the current cannot change instantaneously through an inductor, the inductor is never part of the hot loop, no matter what topology of SMPS you are using. However, this rule does not apply to transformers (they can be part of hot loops, e.g. the flyback topology), as they do not behave like an inductor.
{{% /tip %}}

## References

[^bib-analog-devices-hot-loops]: Christian Kueck. _Layout for Power Designs #1: Hot Loops_. Analog Devices. Retrieved 2022-07-13, from https://www.analog.com/en/technical-articles/layout-for-power-designs-1-hot-loops.html.

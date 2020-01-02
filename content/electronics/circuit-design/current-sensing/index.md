---
author: gbmhunter
categories: [ "Electronics", "Circuit Design" ]
date: 2012-08-20
draft: false
tags: [ "current sensing", "low-side current sensing" ]
title: Current Sensing
type: page
---

## Low-Side Current Sensing

The following image shows a schematic for a low-side current sensing circuit that can be connected to an ADC. This can be used for applications such as brushed/BLDC motor phase current measurement (see the [BLDC Motor Control page](/electronics/circuit-design/bldc-motor-control)). It uses a current sense resistor on the low side of the current path (i.e., next to ground) and then shifts the result away from the rails to `\( \frac{V_{cc}}{2} \)` for better precision/compatibility with ADCs.

{{< img src="low-side-current-sense-adc-interface-circuit.png" width="663px" caption="A schematic for a low-side current sensing circuit that can be connected to a microcontroller/MCU ADC."  >}}





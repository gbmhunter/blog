---
author: "gbmhunter"
date: 2014-12-01
description: "Schematics, advantages/disadvantages to buck converters, uses/applications and more info about charge pumps (a type of SMPS)."
draft: false
lastmod: 2020-12-07
tags: [ "electronics", "components", "power supplies", "charge pumps", "SMPS", "switch-mode power supplies", "op-amps", "MOSFETs", "buck converters", "LEDs", "drivers", "voltage doublers", "diodes", "schottky", "capacitors" ]
title: "Charge Pumps"
type: "page"
---

## Overview

A _charge pump_ (also known as a _switched capacitor_ circuit) is a voltage-converting circuit that uses capacitors, diodes, and a oscillating switch to move charge from one capacitor to another. Like a _buck converter_, charge pumps are typically used to produce an output voltage which is higher than the input voltage.

Charge Pump                         | Boost Converter
------------------------------------|-------------------
Efficient at low power (<10mA)      | Efficient at high power (>100mA)
Simple circuit, low component count | Complex control, high count/bulky components
Low noise                           | High noise

A single capacitor/diode configuration (with additional smoothing capacitor on the output) **doubles the input voltage**. Multiple elements can be connected together to create larger voltage increases.

## Schematics

{{% img src="charge-pump-voltage-doubler-schematic.png" width="700px" caption="The basic schematic for a voltage doubling charge pump circuit." %}}

Schottky diodes are preferred because of their low forward voltage drop and higher switching speeds.

## Uses

### Negative Voltage Bias For Op-Amps

Charge pumps can be used to provide the negative voltage to op-amps. They suit this application since op-amp power supplies typically require little current (1-20mA), and can generate the negative voltage from the main, higher-current, positive power source.

Special charge pumps exist that only produce a very small negative voltage (e.g. -250mV), for providing the negative power supply to rail-to-rail "single-supply" op-amps so that they can output a true 0V. [More on this on the Op-amps page.](/electronics/components/op-amps#rail-to-rail-op-amps)

{{< img src="lm7705-low-noise-negative-bias-voltage-generator-for-op-amp-application-schematic.png" width="409px" caption="The typical application schematic for the Texas Instruments LM7705, a 'Low-Noise Negative Bias Generator' for the negative supply of an op-amp. This allows the op-amp to output true 0V. Image from http://www.ti.com/."  >}}

### LED Drivers

Some LED drivers feature charge pumps to boost the supply voltage to a proper level to drive the LEDs. Charge pumps are usually feature in low power (20mA per channel) LED drivers, that may need to boost say, a +3.3V supply to +4.5V to drive an LED with the correct current. The [NCP1840 8-Channel Charge-Pump I2C LED Driver by On Semiconductor](http://www.onsemi.com/PowerSolutions/product.do?id=NCP1840) is one such example.

### MOSFET Gates

N-channel MOSFETs are typically better performing (lower `\(R_{DS(on)}\)`, larger max. current limit) than P-channel MOSFETs. However, N-channel MOSFETs require a positive gate-source voltage (`\(V_{GS}\)`) to turn them on. This makes it problematic to use them as a high-side switch on a circuit, as you require a voltage on the gate which is higher than the load/input voltage (the load is connected to the source, which is at the same potential as the input voltage when the switch is on).

The most common way to overcome this problem is to use a small charge pump circuit to power the gate. Many buck converters use this trick to use an N-channel rather than a P-channel MOSFET as the switching element.

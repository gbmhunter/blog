---
author: gbmhunter
date: 2014-12-01 02:44:46+00:00
draft: false
title: Charge Pumps
type: page
url: /electronics/components/power-regulators/charge-pumps
---

# Overview

A _charge pump_ (also known as a _switched capacitor_ circuit) is a voltage-converting circuit that uses capacitors, diodes, and a oscillating switch to move charge from one capacitor to another.

A single capacitor/diode configuration (with additional smoothing capacitor on the output) **doubles the input voltage**. Multiple elements can be connected together to create larger voltage increases.

# Negative Voltage Bias For Op-Amps

Charge pumps can be used to provide the negative voltage to op-amps. They suit this application since op-amp power supplies typically require little current (1-20mA), and can generate the negative voltage from the main, higher-current, positive power source.

Special charge pumps exist that only produce a very small negative voltage (e.g. -250mV), for providing the negative power supply to rail-to-rail "single-supply" op-amps so that they can output a true 0V. [More on this on the Op-amps page.](http://blog.mbedded.ninja/electronics/components/op-amps#rail-to-rail-op-amps)

{{< figure src="/images/2011/09/lm7705-low-noise-negative-bias-voltage-generator-for-op-amp-application-schematic.png" width="409px" caption="The typical application schematic for the Texas Instruments LM7705, a 'Low-Noise Negative Bias Generator' for the negative supply of an op-amp. This allows the op-amp to output true 0V. Image from http://www.ti.com/."  >}}

# LED Drivers

Some LED drivers feature charge pumps to boost the supply voltage to a proper level to drive the LEDs. Charge pumps are usually feature in low power (20mA per channel) LED drivers, that may need to boost say, a +3.3V supply to +4.5V to drive an LED with the correct current. The [NCP1840 8-Channel Charge-Pump I2C LED Driver by On Semiconductor](http://www.onsemi.com/PowerSolutions/product.do?id=NCP1840) is one such example.

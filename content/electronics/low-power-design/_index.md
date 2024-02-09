---
authors: [ Geoffrey Hunter ]
date: 2024-02-08
draft: false
lastmod: 2024-02-09
tags: [ low power, MCU, firmware, SMPS ]
title: Low Power Design
type: page
---

{{% warning-is-notes %}}

## Overview

1-10uA when idle, pulses of 10-100mA when active.

## Use High-Valued Resistors For Dividers

Even the innocuous resistor divider can draw too much current in low power designs if not careful. For example, let's say you want to measure the voltage of the battery using an ADC with a reference voltage of 2.5V. The maximum battery voltage is 4.2V. You might choose to divide the voltage in 2 with a resistor divider consisting of a `\(10k\Omega\)` on top and bottom (very common values when low power is not a concern!). However, this will continuously draw `\(210uA\)` from the battery (if at 4.2V).

You'll need to up these resistors values, keeping the ratio the same. Generally values in the `\(M\Omega\)` range are good. It's easy to do mental maths using exponents to tell you that `\(1V\)` across `\(1M\Omega\)` draws `\(1uA\)` (`\(\frac{1}{1e^6} = 1e^{-6}\)`). So let's replace the `\(10k\Omega\)` resistors with `\(2.2M\Omega\)`. Now we only have `\(0.95uA\)` of current draw (at a battery voltage of `\(4.2V\)`, and the same output voltage. Great! But be careful, you must watch out for:

1. **Increased noise on the ADC input.** Since the ADC input is being driven through a much high resistance, it's more susceptible to noise.
1. **The input capacitance of the ADC can cause the voltage to sag during measurement.**
1. **The ADC input takes a long time to settle if the battery voltage changes quickly.** This is most apparent if you have just connected the battery to the device, and the MCU powers up and measures the battery voltage. The MCU boot time is likely to be very fast compared to the RC time constant with `\(2.2M\Omega\)` resistors. Your MCU firmware might think the battery is flat, but in reality the ADC input capacitance is still charing up! You will have to add a delay in to only measure the battery after a delay on startup.

## Use a SMPS Instead of a Linear Regulator

Linear regulators will not offer any power saving if the system runs of a voltage much less than the battery, as all the extra energy will just be burnt through the linear switch in the regulator. A SMPS however will perform voltage conversion using switched inductive and capacitive elements and typically give you 80-95% power efficiency from input to output.

SMPS are not worth worrying about if the system voltage is close to the battery voltage.

## Use An Event Based Architecture in Your Firmware

GPIO interrupts are your best friend!

## Compile For Speed, Not Code Size

Get that `-Os` flag into action!

## Measuring Power Consumption

One of the difficulties of measuring low power circuits is that you often need a measurement device which has a very large dynamic range. Most low power circuits will draw something in the 1 to 10's of microamps when sleeping, and then suddenly draw mA or amps for short durations when actively doing something. Most multimeters can measure microamps accurately, but will saturate when large currents are draw. Worse, they may not even permit a large current to be drawn, either due to a large measurement resistance or fuse being blown.

{{% figure src="_assets/power-profiler-kit-2-photo.webp" width="1000px" caption="A photo of the Nordic Power Profiler Kit 2 when measuring the power to a low-power embedded circuit (off the bottom of screen, not visible)." %}}

{{% figure src="_assets/nrf-power-profiler-screenshot-showing-typical-low-power-mcu-with-spikes.png" width="1000px" caption="A screenshot of the nRF Power Profiler showing the current consumption of a typical low-power MCU circuit using Bluetooth LE. The idle current consumption is approx. 7uA, and current spikes up to approx. 10mA during Bluetooth transmissions, resulting in an average current of 120uA. Note the logarithmic Y-axis." %}}

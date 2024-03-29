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

Even the innocuous **[resistor divider](/electronics/components/resistors/#resistor-dividers) can draw too much current** in low power designs if not careful. For example, let's say you want to measure the voltage of the battery using an [ADC](/electronics/components/analogue-to-digital-converters-adcs/) with a reference voltage of 2.5V. The maximum battery voltage is 4.2V. You might choose to divide the voltage in 2 with a resistor divider consisting of a \(10k\Omega\) on top and bottom (very common values when low power is not a concern!). However, this will continuously draw \(210uA\) from the battery (if at 4.2V).

You'll need to up these resistors values, keeping the ratio the same. Generally values in the \(M\Omega\) range are good. It's easy to do mental maths using exponents to tell you that \(1V\) across \(1M\Omega\) draws \(1uA\) (\(\frac{1}{1e^6} = 1e^{-6}\)). So let's replace the \(10k\Omega\) resistors with \(2.2M\Omega\). Now we only have \(0.95uA\) of current draw (at a battery voltage of \(4.2V\), and the same output voltage. Great! But be careful, you must watch out for:

1. **Increased noise on the ADC input.** Since the ADC input is being driven through a much high resistance, it's more susceptible to noise. If noise becomes a problem, either adding a capacitor on the resistor divider output (more on this below) or averaging the readings in firmware can help!
1. **The input capacitance of the ADC can cause the voltage to sag during measurement.** At the start of an ADC measurement, the ADC switches to the selected input (a single ADC peripheral can usually switch between a large number of pins). The ADC typically contains a sample-and-hold capacitor. When this capacitance is connected, it can cause voltage to sag as it charges up the capacitor[^nordic-measuring-lithium-batt-voltage-with-nrf52]
. One solution is to add your own capacitor on the output of the resistor divider, which has a capacitance much larger than the internal capacitance (e.g. \(\times 10\)).

You could aim to add enough capacitance so that when the internal capacitor is connected up, the voltage disturbance is at maximum 1 LSB of the ADC reading.

1. **The ADC input takes a long time to settle if the battery voltage changes quickly.** This is most apparent if you have just connected the battery to the device, and the MCU powers up and measures the battery voltage. The MCU boot time is likely to be very fast compared to the RC time constant with \(2.2M\Omega\) resistors. Your MCU firmware might think the battery is flat, but in reality the ADC input capacitance is still charing up! You will have to add a delay in to only measure the battery after a delay on startup.

{{% figure ref="fig-battery-voltage-measurement-with-resistor-divider-caps-and-adc" src="_assets/battery-voltage-measurement-with-resistor-divider-caps-and-adc.webp" width="800px" caption="." %}}

## Use a SMPS Instead of a Linear Regulator

Linear regulators will not offer any power saving if the system runs of a voltage much less than the battery, as all the extra energy will just be burnt through the linear switch in the regulator. A SMPS however will perform voltage conversion using switched inductive and capacitive elements and typically give you 80-95% power efficiency from input to output.

However, you can't just pick just any SMPS. You need to pick one which has a **low quiescent current** (\(I_Q\)). It is also a good idea to pick one with **burst-mode**. This is when the SMPS cycles between on and standby states when operating at low power. It greatly reduces the quiescent current draw of the SMPS.

**Watch out for the feedback resistor network on your SMPS**, if the values are too low the will draw a lot of current. Try and increase the resistance(s), but watch out for instabilities if the values are too large. The SMPS datasheet should guide you on this process. If it is specifically designed for low power operation then it will probably use appropriate resistor values in the first place.

## Turn On LEDs Sparingly

A standard indicator LED consumes between 1-20mA when turned on. This is going to flatten most small batteries very quickly if left on. The good news is that humans can see very rapid pulses of light, so you can still communicate with the user with quick flashes.

The amount you can reduce the period of a flash is a function of brightness. The brighter the LED, the shorter you can make the pulse. For starters, try a pulse of around 10ms long and then make it shorter or longer until you can an acceptable level.

{{% aside type="example" %}}
Leaving the green LED on at 10mA to indicate the product is working drains the battery too quickly.

You decide it is sufficient to flash it ON for 5ms every 10s to indicate it is working (still drawing 10mA when on). This reduces the average current down to 5uA, a reduction of 2000.

{{% /aside %}}

For pulses shorter than the flicker fusion frequency, the eye "sees" a brief pulse whose brightness is proportional to the luminous intensity multiplied by the ON time.

## Use An Event Based Architecture in Your Firmware

**In a low power product, you want the MCU to spend most of it's time in a sleep mode.** A MCU normally has different "levels" of sleep, depending on how many things are turned off and what it can wake up from. GPIO interrupts are your best friend, as they are normally supported right down to the deepest levels of sleep. Many ICs you might attached to an MCU via a comms bus such as I2C typically also have a few configurable interrupt lines. For example, a temperature sensor IC might allow you to set over and under temperature limits which cause the interrupt lines to change state. These can be directly connected up to GPIO on the MCU that support interrupts, and can be used to trigger a wakeup and perform an action. This is a much better approach for low power design than continuously polling the temperature over I2C.

The Zephyr OS combined with Nordic chips supports low power operation out-of-the-box. Whenever one of your Zephyr threads is not doing anything, the MCU is automatically put to sleep.

## Compile For Speed, Not Code Size

Get that `-Os` flag into action!

## Measuring Power Consumption

One of the difficulties of measuring low power circuits is that you often need a measurement device which has a very large dynamic range. Most low power circuits will draw something in the 1 to 10's of microamps when sleeping, and then suddenly draw mA or amps for short durations when actively doing something. Most multimeters can measure microamps accurately, but will saturate when large currents are draw. Worse, they may not even permit a large current to be drawn, either due to a large measurement resistance or fuse being blown.

{{% figure src="_assets/power-profiler-kit-2-photo.webp" width="1000px" caption="A photo of the Nordic Power Profiler Kit 2 when measuring the power to a low-power embedded circuit (off the bottom of screen, not visible)." %}}

{{% figure src="_assets/nrf-power-profiler-screenshot-showing-typical-low-power-mcu-with-spikes.png" width="1000px" caption="A screenshot of the nRF Power Profiler showing the current consumption of a typical low-power MCU circuit using Bluetooth LE. The idle current consumption is approx. 7uA, and current spikes up to approx. 10mA during Bluetooth transmissions, resulting in an average current of 120uA. Note the logarithmic Y-axis." %}}

## References

[^nordic-measuring-lithium-batt-voltage-with-nrf52]: Ole Bauck (2016, May 23). _Measuring Lithium battery voltage with nRF52_. Nordic Semiconductor. Retrieved 2024-02-10, from https://devzone.nordicsemi.com/nordic/nordic-blog/b/blog/posts/measuring-lithium-battery-voltage-with-nrf52.

---
authors: [Geoffrey Hunter]
categories: [Programming, Firmware]
date: 2024-04-02
description: 
draft: false
lastmod: 2024-04-02
tags: [LEDs, PWM, duty cycle, brightness, look-up table, LUT, microcontrollers, radiance, luminance, firmware, C]
title: Controlling a LED Using PWM
type: page
---

## Overview

This page explains the various ways you can drive a single [LED](/electronics/components/diodes/light-emitting-diodes-leds/) from firmware running on a microcontroller.

If all you need is a fixed brightness, you could just set the LED current by choosing the appropriate resistor. This will impart a slight colour change, but won't be noticeable for most use cases. 

## Varying the Radiance

The easiest way of dynamically varying the light output of an LED is to use [pulse-width modulation (PWM)](/electronics/circuit-design/pulse-width-modulation-pwm/). PWM is a digital signal with a fixed frequency but an adjustable on-time (hence the "width modulation").

If the PWM period was 1s (a frequency of 1Hz) and the duty cycle 50%, we would see the LED "blink". However -- if the PWM frequency is fast enough (e.g. 10kHz), we do not see any flicker. Instead, because of the "averaging" that occurs in our eyes, a LED driven at 20mA for 50% of the time (50% PWM duty cycle) looks the same as driving the LED continuously at 10mA (ignoring the slight colour change due to changing current).

So we can very the duty cycle of the PWM to vary the light output (radiance) of the LED. 0% duty cycle would make the LED turn off, and 100% duty cycle would be full brightness. The nice thing is that radiance varies very linearly with duty cycle. 

This is great if humans are not involved (e.g. agricultural grow LEDs for plants). However if you look at an LED whose duty cycle is linearly varied from 0% to 100%, you won't perceive a uniform change in brightness! More on this below...

## Adjusting For Our Eyes (Brightness)

Our eyes work over a huge range of brightness, and to do that they are not linearly sensitive to light output. Our eyes are far more sensitive to small changes in light output (radiance) when the LED is at a low output compared to when it is at a high output. Our eyes follow somewhat of a logarithmic response (similar to our hearing!).

{{% aside type="tip" %}}
Luminance is the quantifiable scientific measure that is closely related to brightness.
{{% /aside %}}

Look-up table (LUT).

## Further Reading

Another way to control LEDs is with constant-current drivers or sinks.

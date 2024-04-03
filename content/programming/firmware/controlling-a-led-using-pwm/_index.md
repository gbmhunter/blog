---
authors: [Geoffrey Hunter]
categories: [Programming, Firmware]
date: 2024-04-02
description: 
draft: false
lastmod: 2024-04-02
tags: [LEDs, PWM, duty cycle, brightness, look-up table, LUT, microcontrollers, radiance, luminance, firmware, C, CIELAB, lightness]
title: Controlling a LED Using PWM
type: page
---

## Overview

This page explains the various ways you can drive a single [LED](/electronics/components/diodes/light-emitting-diodes-leds/) from firmware running on a microcontroller.

If all you need is a fixed brightness, you could just set the LED current by choosing the appropriate resistor. This will impart a slight colour change, but won't be noticeable for most use cases. 

## Varying the Radiance

The easiest way of dynamically varying the light output of an LED is to use [pulse-width modulation (PWM)](/electronics/circuit-design/pulse-width-modulation-pwm/). PWM is a digital signal with a fixed frequency but an adjustable on-time (hence the "width modulation").

If the PWM period was 1s (a frequency of 1Hz) and the duty cycle 50%, we would see the LED "blink". However -- if the PWM frequency is fast enough (e.g. 10kHz), we do not see any flicker due to persistence of vision. Instead, because of the "averaging" that occurs in our eyes, a LED driven at 20mA for 50% of the time (50% PWM duty cycle) looks the same as driving the LED continuously at 10mA (ignoring the slight colour change due to changing current). This is great news! It means we can easily drive our LED using digital on/off signals, and don't have to implement costly and potentially energy inefficient analog current sources/sinks.

So we can very the duty cycle of the PWM to vary the light output (radiance) of the LED. 0% duty cycle would make the LED turn off, and 100% duty cycle would be full brightness. The nice thing is that radiance varies very linearly with duty cycle. This is great if humans are not involved (e.g. agricultural grow LEDs for plants). However if you look at an LED whose duty cycle is linearly varied from 0% to 100%, you won't perceive a uniform change in brightness! More on this below...

## Adjusting For Our Eyes (Brightness)

Our eyes work over a huge range of brightness, and to do that they are not linearly sensitive to light output. Our eyes are far more sensitive to small changes in light output (radiance) when the LED is at a low output compared to when it is at a high output. This human perception of brightness follows somewhat of a logarithmic response (similar to our hearing!). This can also be called a power law.

{{% aside type="tip" %}}
Luminance is the quantifiable scientific measure that is closely related to brightness.
{{% /aside %}}

What we want is a function which maps brightness to a PWM duty cycle. That way the rest of the firmware can set the LED in terms of brightness, and it will be converted to the correct PWM value.

> These power functions, with a gamma of 2.2, are frequently used to map between linear and perceptual values. Although the “gamma function” is commonly used it is arguable that CIE Lightness is the more precise formulation; and in fact CIE Lightness is the formula use for L in the CIE Lab color model rather than a gamma function[^photonstophotos-psychometric-lightness-and-gamma].

CIELAB represents lightness with the symbol \(L*\)[^wikipedia-lightness] (not to be confused with just \(L\) which is used for luminance).

Look-up table (LUT).

A decent resolution on the PWM duty cycle is needed for good smoothness. If you had an 8-bit PWM, with only 256 discrete settings for the duty cycle, you're smallest non-off value (setting the duty cycle to 0x01) 

## Further Reading

Another way to control LEDs is with constant-current drivers or sinks.

## References

[^photonstophotos-psychometric-lightness-and-gamma]: Bill Claff (2005, Mar 26)._Psychometric Lightness and Gamma_. photonstophotos.net. Retrieved 2024-04-03, from https://www.photonstophotos.net/GeneralTopics/Exposure/Psychometric_Lightness_and_Gamma.htm.
[^wikipedia-lightness]: Wikipedia (2024, Feb 10). _Lightness_. Retrieved 2024-04-03, from https://en.wikipedia.org/wiki/Lightness.

---
author: gbmhunter
date: 2013-05-20
draft: false
title: Outputting A Constant Length Pulse
type: page
---

## Using A PWM Module

This is probably the easiest way to output a constant pulse, yet one of the most resource intensive. Configure the PWM module into one-shot mode.

## The Timer Method

This method uses a timer and a DQ flipflop. It it less resource intensive than using a PWM module.

## Using The Pulse Converter Component

However, note that when using the pulse converter, there could be a delay between the start of the input and the start of the output pulse, depending on the phase difference between the two clocks. After the input goes high, the output only goes high once it detects a rising edge on the output clock line. The maximum delay will be the period of the output clock signal.

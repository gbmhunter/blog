---
authors: [Geoffrey Hunter]
date: 2024-03-28
description: Workings, on GMR, IMR type magnetic rotary position sensors.
draft: false
lastmod: 2024-03-28
tags: [magnetism, magnetics, rotation, rotary, sensors, GMR]
title: Magnetic Rotary Position Sensors
type: page
---

{{% warning-is-notes %}}

## Overview

The benefits over a standard resistive potentiometer are that:

* Supports continuous rotation with no end stops.
* There is no resistive track/wiper that wears out.
* It's more resistant to contamination.

{{% figure src="_assets/ams-osram-as5600-in-knob-diagram.png" width="600px" caption="Diagram showing how the ams AS5600 rotary position sensor can be embedded into a standard dial (along with a magnet at the end of the shaft) for rotary position detection[^ams-osram-as5600-position-sensor-blog]." %}}

Most of the ICs include a processor to convert the raw magnetic readings into rotational data that can be read back over a communications bus to a microcontroller.

Giant Magnetoresistance (GMR) increases the signal of standard magnetoresistance.

TMR: Tunneling Magneto Resistive technology (Infineon). High sensing sensitivty and high output voltage, no need for internal amplifier.

## References

[^ams-osram-as5600-position-sensor-blog]: AMS-Osram. _Reliability to switch on: Small position sensor keeps consumer products running_ [blog post]. Retrieved 2024-03-28, from https://ams-osram.com/news/blog/magnetic-rotary-position-sensor.

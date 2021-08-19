---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Embedded", "Microcontrollers" ]
date: 2015-10-06
draft: false
tags: [ "AVR", "AVRDUDE", "Atmel", "microcontroller", "programmer", "embedded", "baudrate" ]
title: AVRDUDE
type: page
---

## Overview

[AVRDUDE](http://www.nongnu.org/avrdude/) (or avrdude) is a popular, open-source, third-party (i.e. non-Atmel) command-line utility for programming Atmel microcontrollers.

{{< figure src="/images/2015/10/avr-dude-windows-command-line-default-usage-info.png" width="486px" caption="The default information printed by avrdude from the Windows command line."  >}}

It supports a wide-range of programmers and microcontrollers.

{{< figure src="/images/2015/10/example-cmd-screenshot-of-avrdude-programming-atmega-microcontroller.png" width="452px" caption="A Windows command-line screenshot of AVRDUDE programming an Atmel ATmega microcontroller."  >}}

## The Micro Won't Program, What Do I Do?

Sometimes the bit rate that the programmer is trying to talk to the micro at can be a little to fast. You can slow it down with the bit rate option (`-B`). The bit-rate option requires a floating-point number which determines _half_ the period of the programming waveform, in microseconds. That's right. Half. What? So `-B 2.5` would set the period to be 5us, or 200kHz.

Do NOT get this confused with the baudrate option (`-b`), which determines the serial baudrate at which the computer talks to serial-based programmers at.

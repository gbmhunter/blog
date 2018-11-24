---
author: gbmhunter
date: 2015-10-06 01:40:29+00:00
draft: false
title: AVRDUDE
type: page
url: /programming/microcontrollers/atmel/avrdude
---

# Overview

[AVRDUDE](http://www.nongnu.org/avrdude/) (or avrdude) is a popular, open-source, third-party (i.e. non-Atmel) command-line utility for programming Atmel microcontrollers.

{{< figure src="/images/2015/10/avr-dude-windows-command-line-default-usage-info.png" width="486" caption="The default information printed by avrdude from the Windows command line." caption-position="bottom" >}}

It supports a wide-range of programmers and microcontrollers.

{{< figure src="/images/2015/10/example-cmd-screenshot-of-avrdude-programming-atmega-microcontroller.png" width="452" caption="A Windows command-line screenshot of AVRDUDE programming an Atmel ATmega microcontroller." caption-position="bottom" >}}

# The Micro Won't Program, What Do I Do?

Sometimes the bit rate that the programmer is trying to talk to the micro at can be a little to fast. You can slow it down with the bit rate option (-B). The bit-rate option requires a floating-point number which determines _half_ the period of the programming waveform, in microseconds. That's right. Half. What? So -B 2.5 would set the period to be 5us, or 200kHz.

Do NOT get this confused with the baudrate option (-b), which determines the serial baudrate at which the computer talks to serial-based programmers at.

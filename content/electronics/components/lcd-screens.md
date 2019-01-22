---
author: gbmhunter
date: 2012-06-05 15:32:47+00:00
draft: false
title: LCD Screens
type: page
url: /electronics/components/lcd-screens
---

## Character LCD Screens

## Types

Character LCD screens can typically display 1, 2 or 4 rows of text between 16 and 20 characters wide. Various text and backlight colours exist. Most if not all have inbuilt driver IC's which connect to the individual display segments, requiring only a 4-bit/8-bit external interface and other control/power lines.

## Contrast

The contrast is normally controlled by a potentiometer connected to one of the pins. This could be replaced with a DPOT to control the contrast digitally. It's worth noting that LCD screens are commonly misdiagnosed as 'broken' when in fact it's just that the contrast has not been set.

## The Interface

LCD screens are typically use 8-bit interfaces which can usually support a reduced pin-count 4-bit mode. The following schematic shows how a typical character LCD screen is connected when using four-bit mode. The 7 lines D-RS, D-R/W, D-EN and D-D4 through D-D7 are connected to a microcontroller or similar interface. The contrast  of the screen is set by potentiometer VR1. Note that for a LCD requiring a negative contrast supply (the one shown is for a LCD with an internal negative-voltage generator), VR1 is connected differently with the pin connected to +5V-SCAP instead connected to a negative supply (typically between -2 and -3V).

{{< figure src="/images/electronics-misc/lcd-schematic.jpg" caption="Schematic for a character LCD."  width="500px" >}}

## Mounting

## Reverse-mounted Onto PCB

The following image shows how you can reverse mount an LCD screen onto a PCB directly (using the PCB as the front panel).

{{< figure src="/images/electronics-misc/reverse-mounting-lcd-screen-onto-pcb-annotated.png" caption="This picture shows how to reverse-mount a standard LCD screen onto a PCB. Notice the SMD 2.54mm pitch header with long contacts (6.80mm)."  width="600px" >}}

The image below shows what a reverse-mounted LCD screen will look like from the front.

{{< figure src="/images/electronics-misc/lcd-screen-reverse-mounted-on-pcb-front-view.jpg" caption="The front view of a reverse-mounted LCD screen."  width="600px" >}}

## TFT LCD Screens

A TFT screen is a form of LCD which uses thin-film technology.

In 2013, FTDI released the EVE chip, which is a combined graphics/sound/touch screen processor designed for embedded applications which can be run from an 8-bit microcontroller. It supports QVGA and WQVGA resolution TFT displays with 24-bit true colour support, 256k internal object memory, and up to 2,000 objects. It communicates with the microcontroller via an [I2C](/electronics/communication-protocols/i2c-communication-protocol/) or [SPI](/electronics/communication-protocols/spi-communication-protocol/) interface. It is available in a [QFN-48 package](/pcb-design/component-packages/#qfn).

More on [EVE on the FTDI website](http://www.ftdichip.com/EVE.htm).

## Software

MikroElektronika makes a software/firmware package called Visual TFT (see their website). It's designed to help develop user interfaces for TFT LCD screens, especially those controlled microcontrollers. It offers a computer based design environment which then creates code compatible with MikroElektronica's compilers. This is one let-down with the software, as it does not support industry standard compilers such as GCC. The Visual TFT program supports the FTDI EVE chip.

---
author: "gbmhunter"
date: 2013-05-19
draft: false
lastmod: 2021-01-18
tags: [ "programming", "microcontrollers", "Atmel", "SAM", "D20" ]
title: "Atmel SAM Family"
type: "page"
---

## Overview

The Atmel SAM D20 family uses the ARM Cortex-M0+ core. Peripherals include general purpose serial comms, timer/counters, PWMs, ADCs, a DAC, and capacitive touch channels. Go to [their website for more information](http://www.atmel.com/microsite/samd20/).

{{< figure src="/images/programming-misc/atmel-sam3u-development-kit-annotated-diagram.jpg" caption="Annotated hardware diagram of the Atmel SAM3U development kit. Image from www.digikey.com."  width="700px" >}}

## Programming Header

There are a number of different programming protocols you can use with the Atmel SAMD family. This includes the ARM SWD protocol. The pinout used by the Atmel-ICE programming is shown below:

{{% img src="atmel-ice-swd-pin-mapping.png" width="600px" caption="The pin mapping for the Atmel-ICE programmer when using the SWD programming interface. Image from http://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-42330-Atmel-ICE_UserGuide.pdf." %}}

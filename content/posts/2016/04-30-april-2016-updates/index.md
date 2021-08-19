---
authors: [ "Geoffrey Hunter" ]
date: 2016-04-30
draft: false
tags: [ "BJTs", "constant-current", "I2C", "LED drivers", "low-pass RC", "Microblaze", "multiple-collector", "multiple-emitter", "NinjaCalc", "NTC", "PWM", "sensors", "temperature", "thermistors", "track current", "VDAC", " z-wave" ]
title: April 2016 Updates
type: post
categories:
- Updates
---


* Added information about [multiple-collector and multiple-emitter BJTs](/electronics/components/transistors/bipolar-junction-transistors-bjts#multiple-collector-and-multiple-emitter-bjts).  

  	{{< figure src="/images/2015/08/basic-two-input-tll-nand-gate-schematic.png" width="499px" caption="The schematic of a basic two-input TTL NAND gate." >}}  

* Information added on using low-pass RC filters for making a VDAC from a PWM source.

* Added information about the [10-bit I2C addressing scheme](/electronics/communication-protocols/i2c-communication-protocol/).

* New [How To Calculate Track Current page](/pcb-design/how-to-calculate-maximum-track-current) under the PCB Design section of the website, with information, equations, and more info on how to calculate the maximum current a track (a.k.a. trace) on a PCB can take.

* New [NTC Thermistor Temperature Sensing page](/electronics/components/sensors/temperature-sensors/ntc-thermistors-temperature-sensors) with information on PTC and NTC thermistors, including how to connect them up to a microcontroller for temperature measurements.  

  	{{< figure src="/images/2016/05/screenshot-of-ntc-thermistor-page.png" width="529px" caption="A screenshot of the NTC thermistor page." >}}  

* New [MicroBlaze page](/programming/microcontrollers/microblaze) under Programming->Microcontrollers.

* New [Z-Wave page](/electronics/communication-protocols/z-wave) under Electronics->Communication Protocols.

* New information about the [common-collector BJT amplifier](/electronics/components/transistors/bipolar-junction-transistors-bjts#common-collector).  

  	{{< figure src="/images/2015/08/basic-common-collector-bjt-amplifier-schematic.png" width="517px" caption="The basic schematic of a common-collector BJT amplifier."  >}}including simulation results...  

	  {{< figure src="/images/2015/08/vout-vs-vin-basic-common-collector-bjt-amplifier-v2.png" width="1418px" caption="Vout vs. Vin for a basic common-collector BJT amplifier." >}}  

* Information added about making [constant-current LED drivers using BJTs](/electronics/components/transistors/bipolar-junction-transistors-bjts#constant-current-sink).  

	  {{< figure src="/images/2015/08/constant-current-bjt-based-led-driver.png" width="465px" caption="The simulation schematic for a constant-current BJT-based LED driver." >}}
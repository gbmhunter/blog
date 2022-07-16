---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Electronic Components", "Diodes" ]
date: 2011-09-05
description: "Info about diodes."
draft: false
lastmod: 2021-09-26
tags: [ "electronics", "diodes", "components", "current", "schematic symbols", "TVS", "Schottky", "bridge rectifier", "Zener", "dynamic resistance", "impedance", "LEDs", "light-emitting diodes", "parameters", "forward current", "forward voltage", "reverse voltage", "dominant wavelength", "peak wavelength", "reverse mounting", "multiplexing", "charlieplexing", "RGB", "laser diodes", "current control", "PWM", "lens", "radiation pattern", "spatial distribution", "irradiance", "radiometric", "photosynthetic flux", "PPF" ]
title: "Diodes"
type: "page"
---

## Overview

Diodes are passive semiconductor components consisting of a single P-N junction. Their main property is that they only allow conduction of current in one direction but not in the other, which makes them a useful component in many electronic circuits.

There are many different types of diodes, some of which are explained on the following child pages:

* [General purpose diodes](general-purpose-diodes/)
* [Schottky diodes](schottky-diodes/)
* [Zener diodes](zener-diodes/)
* [TVS diodes](tvs-diodes/)
* [Light-emitting diodes (LEDs)](light-emitting-diodes-leds/)
* [PIN diodes](pin-diodes/)
* [Photodiodes](photodiodes/)

## Avalanche Photo-diodes (APDs)

Avalanche photo-diodes (APDs) are constructed in a similar manner to PIN diodes. The major difference is that they are operated with a much larger reverse voltage (100-200V for silicon based ones). This causes the avalanche effect (impact ionization) whenever photons strike the sensor, giving a current-gain of around 100. The current gain is roughly proportional to the applied reverse voltage, and for this reason some special avalanche diodes have been made which have a reverse breakdown voltage of over 1500V, allowing much higher gains (e.g. 1000).

Sometimes they can be operated above their maximum reverse voltage for short periods of time, giving even larger gains! When operated in this fashion, it is called **Geiger mode**.

APDs are used in range-finders and optical communications.

## Temperature Sensors

Diodes can be used as temperature sensors, as their forward voltage changes depending on the temperature. Most 3-pin active linear temperature sensors use a diode for the temperature measurement, along with additional circuitry to linearise and scale the reading. See the [Temperature Sensors page](/electronics/components/sensors/temperature-sensors) for more information.

## Steering Diodes

Steering diodes is a name given to a configuration of two or more diodes that changes the direction of current depending on the polarity of the waveform.

They can be used to provide transient ESD protection.

{{% img src="steering-diodes-used-for-transient-esd-protection.png" width="500" caption="Steering diodes can be used for transient ESD protection. Image from http://www.protekdevices.com/Assets/Documents/Technical_Articles/ta1002.pdf." %}}

They can be used alongside a potentiometer and 555 timer to create a PWM circuit.

{{% img src="schematic-steering-diodes-used-for-555-timer-pwm-circuit.png" width="700" caption="Schematic highlighting the steering diodes used to generate a variable duty-cycle PWM circuit using a 555 timer, without changing the frequency. Image from http://www.electroschematics.com/6950/555-duty-cycle-control/ (with modifications)." %}}

## Manufacturer Part Numbers

* **1N4148**: Common general-purpose diode family.
* **1N58xx**: Common Schottky diode family.
* **BZX384**: Series of Zeners in a SOD-323 package from Nexperia.
** **BZX384-B**: ±2% tolerance range.
** **BZX384-C**: ±5% tolerance range.
* **MM3Z**: Family of Zener diodes from Fairchild Semiconductor (now On Semiconductor). 
* **MMSZ52**: Family of Zener diodes from Diodes Incorporated.

## DIACs

The DIAC is a form of diode which conducts current only after it reaches it's breakover voltage. The diode then continues to conduct, even if the voltage reduces, until the point where current drops below it's holding current, at which point the DIAC goes back to it's initial non-conducting state.

### Schematic Symbol

Below is the schematic symbol for the DIAC.

{{% img src="diac-diode-schematic-symbol.svg" width="300" caption="The schematic symbol for a DIAC." %}}

## Constant-Current Diodes

_Constant-current diodes_ are two terminal current sources made from a N-channel JFET and resistor. You can either make one yourself or buy a discrete component containing the JFET and resistor built-in. See [Current Sources And Sinks: Constant-Current Diode (JFET Current Source)](/electronics/components/current-sources-and-sinks/#_constant_current_diode_jfet_current_source) for schematics, equations and worked examples.

{{% img src="constant-current-diode-schematic.png" width="350" caption="Schematic of a constant-current diode. See [Current Sources And Sinks: Constant-Current Diode (JFET Current Source)](/electronics/components/current-sources-and-sinks/#_constant_current_diode_jfet_current_source) for more info." %}}

## References

[^bib-digikey-onsemi-1n4148]:  DigiKey. _onsemi 1N4148_. Retrieved 2021-11-25, from https://www.digikey.co.nz/en/products/detail/onsemi/1N4148/458603.

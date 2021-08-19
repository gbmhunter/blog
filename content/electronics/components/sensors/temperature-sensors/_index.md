---
authors: [ "Geoffrey Hunter" ]
date: 2012-11-08
draft: false
title: Temperature Sensors
type: page
---

## Overview

Temperature sensors are electronic transducers which measure the temperature of the nearby body (which in many cases is the temperature sensor itself) and then converts it into either a analogue or digital electrical signal.

{{< img src="schematic-icon-for-temperature-sensor.png" width="343px" caption="A schematic icon for a temperature sensor."  >}}

## Thermostats

Thermostats are simple on/off switched that are controlled by temperature. They are used in cheap, simple, bang-bang temperature control, and the huge benefit with these is that they don't require a microcontroller or other logic device to control them. The KSD301 is a common code for a family of thermostats with varying temperature ratings.

## Infrared Thermopiles

Infrared thermopiles can measure the temperature of an object without coming into contact with it. They measure the amount of incoming infrared radiation, which is related to the temperature of the object. You can by them in IC packages for directly mounting onto a PCB. The ICs normally come with interface electronics, so that you communicate and read the temperature back over a serial communications protocol such as I2C. One example is the TI TMP006.

## Composite Sensors

Temperature sensors are so ubiquitous that they are often integrated into other sensor ICs to create composite sensors. They are also very useful in helping to calibrate the measurement of another sensor reading, as many real-world measurements dependent on the temperature.

One such example would be [humidity sensors](/electronics/components/sensors/humidity-sensors).

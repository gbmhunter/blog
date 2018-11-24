---
author: gbmhunter
date: 2012-11-08 05:09:44+00:00
draft: false
title: Temperature Sensors
type: page
url: /electronics/components/sensors/temperature-sensors
---

# Overview




Temperature sensors are electronic transducers which measure the temperature of the nearby body (which in many cases is the temperature sensor itself) and then converts it into either a analogue or digital electrical signal.



[caption id="attachment_13143" align="aligncenter" width="343"][![A schematic icon for a temperature sensor.](/images/2012/11/schematic-icon-for-temperature-sensor.png)
](/images/2012/11/schematic-icon-for-temperature-sensor.png) A schematic icon for a temperature sensor.[/caption]



# Child Pages




[sb_child_list template=2 orderby=title order=asc nest_level=1]




# Thermostats




Thermostats are simple on/off switched that are controlled by temperature. They are used in cheap, simple, bang-bang temperature control, and the huge benefit with these is that they don't require a microcontroller or other logic device to control them. The KSD301 is a common code for a family of thermostats with varying temperature ratings.




# Infrared Thermopiles




Infrared thermopiles can measure the temperature of an object without coming into contact with it. They measure the amount of incoming infrared radiation, which is related to the temperature of the object. You can by them in IC packages for directly mounting onto a PCB. The IC's normally come with interface electronics, so that you communicate and read the temperature back over a serial communications protocol such as I2C. One example is the TI TMP006.




# Composite Sensors




Temperature sensors are so ubiquitous that they are often integrated into other sensor IC's to create composite sensors. They are also very useful in helping to calibrate the measurement of another sensor reading, as many real-world measurements dependent on the temperature.




One such example would be [humidity sensors](http://blog.mbedded.ninja/electronics/components/sensors/humidity-sensors).

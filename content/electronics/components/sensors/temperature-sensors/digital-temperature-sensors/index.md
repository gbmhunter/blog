---
authors: [ "Geoffrey Hunter" ]
date: 2016-04-19
draft: false
title: "Digital Temperature Sensors"
type: "page"
---

## Overview

Digital temperature sensors are not as easy to interface with a microcontroller, but offer other advantages, such as the ability to be added onto an existing communication bus (and hence requiring to extra pins to the microcontroller), less sensitivity to noise (you are now transmitting a digital signal, not an analogue one), and the ability to chain many together (temperature sensors using the I2C or 1-Wire interface commonly allow for this).

{{< img src="tmp-102-temperature-sensor-ic.jpg" width="250px" caption="The TMP102 digital temperature sensor."  >}}

Digital temperature sensors require contact with the medium that is to be measured.

{{% note %}}
Although digital sensors are more immune to external noise, they also generate more noise than analogue ones (think about the sharp rise/fall times of a digital signal). It may be desirable to use an analogue temperature sensor in a highly sensitive environment.
{{% /note %}}

## History

The first every temperature sensor IC was the Texas Instruments LM3911 in 1970.

## Sequence Detect

Because it is common to want to string many temperature sensors together to get temperature profiles of large objects (e.g. rooms, buildings, chimneys, pipes, ...) you can get temperature sensors which support **sequence detect**. This allows a microcontroller to determine the position of each sensor in a daisy chain, without requiring a manually entered look-up table (LUT). They normally also use the 1-wire interface, making them very easy to string together. The DS28EA00 "1-wire digital thermometer with sequence detect and PIO"  from Dallas is one example. Below is a typical application circuit for this temperature sensor.

{{< img src="ds28ea00-sequence-detect-temp-sensor-typical-schematic.png" width="1165px" caption="A typical application circuit for the Dallas DS28EA00 '1-wire digital thermometer with sequence detect and PIO' sensor."  >}}

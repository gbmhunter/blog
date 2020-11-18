---
author: "gbmhunter"
date: 2020-11-18
description: "A tutorial on the I3C communication protocol."
draft: false
lastmod: 2020-11-18
tags: [ "I3C", "communication protocol", "bus", "serial", "microcontroller", "transceiver", "TX", "RX", "SCL", "SDA", "MIPI Alliance", "Sensor Working Group", "I2C" ]
title: "I3C Communication Protocol"
type: "page"
---

{{% warning-is-notes %}}

## Overview

The _I3C communication protocol_ (pronounced eye-three-see) is a standard by the Sensor Working Group at the MIPI Alliance. The name is intended to indicate it's similarity to {{% link text="I2C" src="i2c-communication-protocol/" %}}, with the bus having the same two-wire _SCL_ and _SDA_ wires and being **backwards compatible with I2C** (with some caveats).

## History

The I3C standard was first released publicly by the MIPI Alliance in late 2017[^hindu-business-line-i3c-release], named _MIPI I3C v1.0_. MIPI Alliance members had access to the standard before this release date. _MIPI I3C Basic v1.0_ was released in October 2018. MIPI I3C v1.1 was released in December 2019[^mipi-i3c-sensor-specification].

## Backwards Compatibility With I2C

**I2C devices can be connected to an I3C bus** and communicate with I2C and I3C nodes at I2C bit rates. The standard allows the **bit rate to increase** when an I3C node is communicating with another I3C node. 

## References

[^hindu-business-line-i3c-release]: <https://www.thehindubusinessline.com/business-wire/mipi-alliance-opens-access-to-its-mipi-i3c-sensor-interface-specification/article22310984.ece>
[^mipi-i3c-sensor-specification]: <https://mipi.org/specifications/i3c-sensor-specification>
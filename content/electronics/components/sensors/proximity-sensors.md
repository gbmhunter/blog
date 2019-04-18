---
author: gbmhunter
date: 2011-09-05 06:08:53+00:00
draft: false
title: Proximity Sensors
type: page
url: /electronics/components/sensors/proximity-sensors
---

## Overview

Proximity sensors are used to determine the range and position of an object in the near vicinity of the sensor. One application is touchless control panels and human interfaces. Most use infrared light  to detect the object.

## Magnetic

Magnetic proximity sensors usually come in 2 or 3-pin variants. They come in normally-open and normally-closed variants. When they turn on, as they use BJT transistors, their voltage does not drop to zero, this remaining voltage is called the **residual voltage**.

The two pins variants only come with a V+/SIG and GND pin. The supply voltage on the V+/SIG pin only applies when the device is open, when it is closed, this voltage drops down to the residual voltage.

## Examples

* ISL29028 - Intersil Low Power Ambient Light and Proximity Sensor with Intelligent Interrupt and Sleep Modes
* Si1120 - SiLabs
* Si114x - Silabs (new product as of 2011 with 2-axis detection and longer range)

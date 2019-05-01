---
author: gbmhunter
categories: [ "Electronics", "Electronic Components" ]
date: 2014-06-22
draft: false
tags: [ "electropermanent magnet", "EPM", "component", "electronics", "stepper motor", "OpenGrab" ]
title: Electropermanent Magnets (EPMs)
type: page
---

## Overview

An **electropermanent magnet (EPM)** is a device which can have it's magnetic field switched on/off by an electronic pulse. Once the pulse is applied, the magnetic field will retain it's current state with the device unpowered.

{{< img src="electropermanent-magnet-construction-and-metal-properties.png" caption="The basic construction of an electropermanent magnet and the properties of the two magnetic materials used. Image from Electropermanent Magnetic Connectors and Actuators: Devices and Their Application in Programmable Matter by Ara Nerses Knaian." width="600px" >}}

**For a fixed amount of input electrical energy, EPMs can do a fixed amount of output work in an arbitrarily long amount of time.**

## How They Work

EPMs contain a hard magentic material (such as NIB) and a semi-hard magnetic meterial (such as Alnico), wound in a coil of wire. An electrical current through the coil polarises the magnetic field of the semi-hard magnetic material. When the current flows in one direction, the semi-hard materials magnetic field aligns with the magnetically hard materials magnetic field, allowing an external field to develop. When the current flows in the other direction, the two fields oppose one another, and all (well, most) of the magnetic flux is divereted internally in the device, giving no external field.

{{< img src="diagram-of-electropermanent-magnet-fields-and-hystersis.png" caption="Diagram showing the how electropermanent magnets work. Image from Electropermanent Magnetic Connectors and Actuators: Devices and Their Application in Programmable Matter by Ara Nerses Knaian." width="600px" >}}

## Uses

The ability to for the magnet to hold it's current state with being powered is the main advantage of an electropermanent magnet over an **electromagnet**. This gives it many uses including:

* On-board RC (remote control) planes/quadcopters/cars/e.t.c for gripping and holding objects.
* Self-assembling robot research.
* You can make electropermanent stepper motors!

## Electropermanent Stepper Motors

If you replace the normal magnets inside a stepper motor with electropermanent ones, you can make a electropermanent stepper motor. Electropermanent stepper motors offer high efficiencyies at low speeds. The EPM's inside them allow the rotor to rotate at it's own speed, taking an arbitrarily long amount of time to reach the next step. A traditional stepper motor needs to continuouly provide a current, and because of I2R losses, is not very efficient at very slow speeds.

## Examples

The [OpenGrab Electro Permanent Magnet (EPM) Gripper v2.0](http://nicadrone.com/index.php?id_product=13&controller=product) is an open source, small, low-power, EPM. You can switch it either with a standard RC servo signal, or by using the on-board switch (which just connects one of the microcontrollers pins to Vcc, so you could wire something up the switch instead of using the PWM). It claims it can hold up to a 1kg payload. Vcc can be anywhere between 3.3-7.0V. Steady-state power is less than 1mW.

{{< img src="opengrab-epm-688-v2.0-electropermanent-magnet-module.jpg" caption="The OpenGrab Electropermanent Magnet (EPM) module. Image from http://nicadrone.com/index.php?id_product=13&controller=product." width="600px" >}}

---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Electronic Components" ]
date: 2011-09-05
draft: false
lastmod: 2021-11-22
tags: [ "electronics", "components", "DPOT", "digital potentiometer", "resistor", "resistance", "rheostat", "communication", "I2C", "SPI" ]
title: "Digital Potentiometers (DPOTs)"
type: "page"
---

## Overview

A DPOT is a device which has a **variable resistance which can be controlled digitally** through some kind of communication protocol (such as [I2C](/electronics/communication-protocols/i2c-communication-protocol) or [SPI](/electronics/communication-protocols/spi-communication-protocol)). They essentially behave like a potentiometer that can be controlled with a microcontroller rather than requiring human input.

## Internal Design

A DPOT usually is made from a string of closely matched, equal valued resistors. At each junction an analog switch can control weather or not the junction is connected to the wiper. The analog switches are controlled over the digital communication bus, usually from a microcontroller writing to a register on the DPOT. A DPOT's memory can either be _volatile_, where the set resistance information is lost on power down, or _non-volatile_ where the DPOT retains the information for the next time it powers up.

**There are two variants on the DPOT design, the _potentiometer_ configuration and the _rheostat_ configuration**. The potentiometer configuration provides three pins to the resistor, one connected to each end of the resistor network and one connected to the wiper. The rheostat version has only one pin connected to one of the ends, and one pin for the wiper. Manufacturers usually make a rheostat version because it saves a pin, allowing for a smaller package, since some applications don't require all three connections of a potentiometer. A rheostat behaves exactly like a variable resistance.

DPOT resistances typically vary from 1kΩ to 1MΩ.

## Communication

Most DPOT's use either the SPI or I²C communication protocol to control the wiper's resistance values, as well as to read back the current value and any error messages. When using SPI, the DPOT acts as a slave.

## Datasheet Specifications

* Taper: Usually one of:
  * Linear
  * Logarithmic
  * Reverse Logarithmic
* Wiper Resistance: Typically 50-200Ω. Note that this is a significant amount of resistance (ideally the wiper would have 0 resistance) and for some applications cannot be ignored. 

## Uses

* Dynamically controlling the DC gain of an amplifier (by replacing one or both of the gain resistors with a DPOT)
* Producing a controllable high impedance voltage output (for using as a reference voltage, comparison voltage, e.t.c)
* Balancing a wheatstone bridge
* Small-scale current control (typically a few milliamps or less)

## Design Considerations

Whilst standard potentiometers can handle any voltage on their terminals (within power dissipation and arcing limits), DPOT terminals are limited between GND and VDD, since digital switching elements are used to connect the wiper to the internal resistor string.

Digital potentiometers usually have a poor total resistance tolerance, usually around \(\pm 20%\)! However, the accuracy of the wiper as a percentage from 0 to full-scale is much more accurate, typically \(0.1-2%\), so it is preferred to use them for ratiometric purposes (i.e. resistive divider, or configured as a potentiometer rather than a rheostat).

## Manufacturer Part Numbers

* **MCP4**: Family of DPOTs from Microchip. An Arduino library for driving these ICs can be found at https://github.com/jmalloc/arduino-mcp4xxx.
* **TPL0401**: DPOT from Texas Instruments.

## Suppliers

Link to DigiKey's digital potentiometer section: https://www.digikey.com/en/products/filter/data-acquisition-digital-potentiometers/717
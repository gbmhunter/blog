---
author: gbmhunter
categories: [ "Electronics", "Components" ]
date: 2011-09-05
draft: false
tags: [ "DPOT", "digital potentiometer", "resistance", "rheostat", "communication" ]
title: DPOTs
type: page
---

## Overview

A DPOT is a device which has a variable resistance which can be controlled digitally through some kind of communication protocol (such as SPI). They essentially behave like a potentiometer that can be controlled with a microcontroller rather than requiring human input.

## Design

A DPOT usually is made from a string of closely matched, equal valued resistors. At each junction an analog switch can control weather or not the junction is connected to the wiper. The analog switches are controlled over the digital comms, usually by writing to a register on the DPOT. A DPOT's memory can either be volatile, where the set resistance information is lost on power down, or non-volatile where the DPOT retains the information for the next time it powers up.

There are two variants on the DPOT design, the potentiometer configuration and the rheostat configuration. The potentiometer configuration provides three pins to the resistor, one connected to each end of the resistor network and one connected to the wiper. The rheostat version has only one pin connected to one of the ends, and one pin for the wiper. Manufacturers usually make a rheostat version because it saves a pin, allowing for a smaller package, and some applications don't require the need for all three connections of a potentiometer anyway. A rheostat behaves exactly like a variable resistance.

## Communication

Most DPOT's use either the SPI or I²C communication protocol to control the wiper's resistance values, as well as to read back the current value and any error messages. When using SPI, the DPOT acts as a slave.

## Uses

* Dynamically controlling the DC gain of an amplifier (by replacing one or both of the gain resistors with a DPOT)
* Producing a controllable high impedance voltage output (for using as a reference voltage, comparison voltage, e.t.c)
* Balancing a wheatstone bridge
* Small-scale current control (typically a few milliamps or less)

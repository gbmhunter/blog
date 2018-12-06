---
author: gbmhunter
date: 2016-03-10 01:40:57+00:00
draft: false
title: 4-20mA Current Loops
type: page
url: /electronics/communication-protocols/4-20ma-current-loops
---

[mathjax]

# Overview

The 4-20mA current loop protocol is an **analogue electrical communication protocol**. It is based around a **current loop** from transmitter to receiver that is varied between 4-20mA under normal operating conditions. This signal is usually used to represent 1 continuously varying measurement such as temperature, pressure, e.t.c.

The first uses of the 4-20mA current loop appeared in the 1950's.

# Protocol

The reason that the valid range is set between 4-20mA and not say, 0-20mA is so that no current can be used to signify that the transmitter is either not connected or not working correctly.

It also allows devices to be self-powered from the current-loop, as long as the devices consume more than 4mA. The 0-20mA protocol does not allow for self-powered devices.

Note that some devices do use a 0-20mA protocol instead.

# Types

## 2-Wire

In the 2-wire variant, both the power and signal is transmitted over the same pair of wires. These are called _self-powered_ or _loop-powered_ devices.

2-wire sensors (the transmitters), draw a continuous amount of current, usually less than 4mA, to keep themselves powered and operating. They then draw a variable amount of extra current to keep the total between 4-20mA and to perform communication.

2-wire sensors can be powered/measured with either a low-side or high-side shunt, the shunt being an additional resistor to measure the current the sensor is drawing.

## 3-Wire

The 3-wire variant uses two wires for power and ground, and then shares the third wire for the 4-20mA current signal, with it's return path being shared with the ground wire.

## 4-Wire

The 4-wire version has a **differential pair** for the current signalling, which is not shared by the power source.

# Transmission Distances

Because the current-loop protocol is resistant to voltage drops over lengths of cabling (the current through all the series elements remains the same!), the current-loop protocol can work over large distance. It is insensitive to various noise sources that would otherwise affect voltage-based communication protocols.

A transmission distance of up to 5km or more through standard signal/data cabling is not unusual. The limiting factor is when the voltage drop in the cable exceeds the maximum voltage that is powering the current source (the system voltage).

# Standards

## ISA S50.1

The ISA S50.1 standard initially defined both 4-20mA and 10-50mA as possible current ranges. However, the 10-50mA was then later dropped.

## NAMUR NE43

NAMUR, an international association of process instrumentation companies, made a recommendation called _NAMUR NE43_ to standardise sensor fault indication on the 4-20mA current-loop protocol.

The "standard" defines any current below 3.6mA or above 21mA as a sensor fault. This signal needs to be present for at least 4 seconds before it is considered a fault.

{{< figure src="/images/2016/03/namur-ne-43-current-looop-current-ranges-diagram.png" width="560px" caption="The current ranges allowed by the NAMUR NE 43 current-loop standard."  >}}

The standard also extends the normal operation 4-20mA current range to 3.8-20.5mA, allowing more measurement information to be communicated.

4-20mA devices that use this specification usually state _Compliant to NAMUR NE 43_.

# Applications

The 4-20mA current-loop communication protocol is used by many **industrial sensors** to return the value of the property they are measuring. These include:  * Temperature  * Position  * Speed  * Pressure  * Strain

# Interfacing To A Microcontroller

A 4-20mA current loop signal can be easily interfaced to a microcontroller which has an [ADC](/electronics/circuit-design/adcs).

## A Simple Interface

The schematic below shows probably the simplest 4-20mA interface you could build to an ADC on a microcontroller. It uses just a single, precision \(100\Omega\) resistor to convert the 4-20mA signal into a 400-2000mV voltage.

{{< figure src="/images/2016/03/simple-4-20ma-current-loop-interface-to-micro-adc.png" width="807px" caption="Possibly the simplest 4-20mA current loop interface to an ADC on a microcontroller. No filtering, buffering or voltage scaling."  >}}

The value of the resistor can be changed to modify the voltage range that the ADC measures. Below is a table of common resistors that are used and the voltage ranges they give:

<table ><tbody ><tr >
<td >**Resistance**
</td>
<td >**Voltage Range**
</td></tr><tr >
<td >\(50\Omega\)
</td>
<td >\(0.2-1V\)
</td></tr><tr >
<td >\(100\Omega\)
</td>
<td >\(0.4-2V\)
</td></tr><tr >
<td >\(250\Omega\)
</td>
<td >\(1-5V\)
</td></tr><tr >
<td >\(500\Omega\)
</td>
<td >\(2-10V\)
</td></tr></tbody></table>

## Filtering And Buffering

The schematic below shows how you can convert the 4-20mA current loop into a voltage signal suitable for the ADC, along with a low-pass filter and buffering circuitry.

{{< figure src="/images/2016/03/4-20ma-current-loop-interface-to-micro-schematic-with-filter-and-buffer.png" width="1021px" caption="An schematic showing how to interface a 4-20mA current loop signal to the ADC on a microcontroller. The circuit also has a low-pass filter and a buffer."  >}}

# Noise

4-20mA current loops can be thought of as a **low-impedance** communication protocol, as the low-valued resistor at the destination effectively makes the input impedance very small. This **reduces the amount of induced noise** on the input signal (i.e. the noise has to be of a higher power to produce the same voltage change).

# Out-of-band Signalling

Some devices use currents **lower than 4mA or higher than 20mA** to communicate extra information. This is called _out-of-band_ communication.

For example, a distance sensor might use 3.5mA to signal that the object is too close, and 20.5mA to signal that the object to too far away.

The NAMUR NE43 standard specifies any current below 3.6mA or above 21mA should be treated as any error condition.

# HART

The HART communication protocol (_Highway Addressable Remote Transducer_) is a separate communications protocol which can communicate on the same wires as the 4-20mA current loop protocol.

{{< figure src="/images/2016/03/hart-communication-protocol-logo-4-20ma-current-loop.jpg" width="390px" caption="The logo for the HART communication protocol."  >}}

It transmits one or digital signals which are **superimposed** onto the 4-20mA current signal.

# Over-voltage Dangers

Because the communication protocol is based on a current, the voltage at the receiver end is **dependent** on the resistor you choose to convert the current to a voltage. Care has to be taken to make sure that the resistance is low enough that produced voltage will **never exceed** the maximum input voltage of the receiving device (e.g. the ADC of a microcontroller). 

This includes looking at all possible _out-of-band_ signalling scenarios that the transmitter supports. For example, although the transmitter might say it follows the 4-20mA protocol, it may be designed to transmit **30mA** under certain fault conditions.

# Multiple Receivers

While the 4-20mA current-loop protocol can only have one transmitter, it does support multiple receivers. These receivers have to be connected in series, and you have to make sure the total voltage drop across all of the receivers does not exceed the maximum voltage the the system, or that of the transmitter supports.

# 4-20mA Transmitters

4-20mA transmitters can be built either using discrete circuitry (usually involving an op-amp), or with dedicated ICs.

The [Voltage-To-Current Converters page](/electronics/circuit-design/voltage-to-current-converters) has more info (including schematics), on how to build 4-20mA transmitters.

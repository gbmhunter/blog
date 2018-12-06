---
author: gbmhunter
date: 2013-10-20 22:28:10+00:00
draft: false
title: 1-Wire Protocol
type: page
url: /electronics/communication-protocols/1-wire-protocol
---

# Overview

The 1-wire protocol is a one wire, half-duplex, bi-directional, multi-drop, wired communication protocol.

{{< figure src="/images/2013/10/1-wire-ic-schematic-ds18b20-high-zoom-logo.png" width="181px" caption="A high-zoom schematic screenshot of the DS18B20, a Maxim 1-wire temperature sensor."  >}}

<table>
    <tbody>
        <tr>
            <td>Num. Dedicated Communication Wires</td>
            <td>1</td>
        </tr>
        <tr>
            <td>Num. Extra Wires</td>
            <td>1 (0 if parasitic power is supported)</td>
        </tr>
        <tr >
            <td>Duplex</td>
            <td>Half-duplex</td>
        </tr>
        <tr >
            <td>Directionality</td>
            <td>Bi-directional</td>
        </tr>
        <tr >
            <td>Configuration</td>
            <td>Multi-drop</td>
        </tr>
        <tr >
            <td>License</td>
            <td>Proprietary</td>
        </tr>
        <tr>
            <td>Max. Data Throughput</td>
            <td></td>
        </tr>
        <tr>
            <td>Max. Node Distance</td>
            <td></td>
        </tr>
    </tbody>
</table>

The 1-wire communication protocol is a hardware and software design that allows communication between a microcontroller and other ICs, using only a single wire (excluding ground, and if needed, a power rail). Each and every 1-Wire IC has it's own unique code.

{{< figure src="/images/2013/10/ds18b20-temp-sensor-functional-block-diagram-showing-one-wire-interface.png" width="475px" caption="The functional block diagram of the DS18B20 temperature sensor, showing the 1-wire interface circuitry. Image from www.maximintegrated.com."  >}}

# Addressing

Each 1-wire slave device has a unique, unchangeable 64-bit _ID_ which serves as it's address on the 1-wire bus. Part of this 64-bit address is an 8-bit _family code_, which identifies the device type/functionality.

The 1-wire protocol has a unique discovery system in where the master can search and discover the addresses of all slaves on the bus, without knowing any information (like how slaves there are) beforehand.

# Parasitic Power

To obtain true 1-wire communication (excluding ground), some 1-wire ICs support powering over the data line (_parasitic power_).

To do this, the devices have an internal capacitor (usually 800pF), which stores energy from the data line when it goes high. For reliable power over data communication, the data cannot have a too large sequence of zeros.

The disadvantages of parasitic power:  1. A MOSFET is required to drive the DQ line to Vcc (bypassing the pull-up resistor) when the 1-wire device requires a high-current (such as writing to it's internal EEPROM, or performing a temperature measurement).  2. This MOSFET switching requires a not-that-simple control algorithm on a microcontroller (or similar).  3. The `\(V_{DQ}\)` pin of the 1-wire device has to be connected to GND, which if you can't do right at the device, requires you to run three wires to the PCB anyway, which can defeat the purpose!

# Sequence Detection

Although the standard 1-wire bus allows the master to search and discover an arbitrary number of 1-wire slaves of the bus, it does not allow the master to determine the physical sequence in which they connected (e.g. which one is closest to the master). This can be useful for certain applications.

Some 1-wire devices have two additional pins to support sequence detection.

{{< figure src="/images/2013/10/1-wire-bus-example-showing-sequence-detection-with-ds28ea00.png" width="702px" caption="An example of a 1-wire bus with the DS28EA00 ICs, which support sequence detection. Image from www.maximintegrated.com."  >}}

# Bit Bashing

Bit bashing the 1-Wire interface is possible, but not recommended, due to it's asynchronous nature and associated tight timing constraints.

As of October 2015, the [Cypress PSoC 3, PSoC 4 and PSoC 5 LP microcontroller families](/programming/microcontrollers/psoc) do not have a 1-wire hardware component, and so bit-bashing is the only option.

# Uses

* Digital temperature sensors (especially distributed temperature sensor networks, because of 1-wire's multi-drop and discoverable slave capability)
* EEPROM

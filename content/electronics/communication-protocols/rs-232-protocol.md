---
author: gbmhunter
date: 2015-10-29 02:55:58+00:00
draft: false
title: RS-232 Protocol
type: page
url: /electronics/communication-protocols/rs-232-protocol
---

## Overview

RS-232 (_Universal Asynchronous Receiver/Transmitter_) is a digital data transmission protocol with origins dating back to the 1960's. It was designed as a communication protocol to talk between _DTE_ (data terminal equipment) and _DCE_ (data communication equipment). It is universal in the sense the timing, voltages, flow control and error checking can be configured.

<table >
<tbody >
<tr >

<td >Drive Type
</td>

<td >Single-ended
</td>
</tr>
<tr >

<td >Num. Wires (excl. GND)
</td>
<td >
2 (TX/RX) or  
 4 (TX/RX and RTS/CTS)
</td>
</tr>
<tr >

<td >Duplexity
</td>

<td >Full
</td>
</tr>
<tr >

<td >Connection Topology
</td>

<td >Point-to-point
</td>
</tr>
<tr >

<td >OSI Layers
</td>

<td >Layers 1 (physical) and 2 (data link)
</td>
</tr>
</tbody>
</table>

RS-232 is commonly used today for a variety of different purposes in embedded systems, incl industrial equipment, test and measurement equipment. RS-232 ports are no longer available on most desktop computers (and certainly not on laptops), but USB-to-RS232 adapters are cheap, popular and easy to use with almost any operating system.

## Pinout

{{< figure src="/images/2015/10/rs232-comm-protocol-male-connector-large-pinout.png" width="315px" caption="The pinout of a male RS-232 DE-9 connector. Image from http://www.ethernut.de/."  >}}

## Revisions

* RS-232C (or just shortened to RS-232)
* EIA-232-D (1987)
* EIA/TIA-232-E (1991)

## Transmission Distances

15m or less

## Higher-Level Protocols

Do you need a higher-level communication protocol that works over a UART connection? See the [SerialFiller](https://github.com/mbedded-ninja/SerialFiller) library on GitHub (written in C++). SerialFiller uses a publish/subscribe mechanism and works well on point-to-point serial connections such as UART.

## Interfaces

The pinout of a typical Analog Devices RS-232 to UART transceiver is shown below.

{{< figure src="/images/2011/09/analog-devices-rs-232-transceiver-pin-layout.png" width="242px" caption="Pinout of a RS-232 transceiver by Analogue Devices."  >}}

Another example of a RS-232 to CMOS UART converter is the MAX3221IDBE4. It supports an auto-shutdown feature based on the voltage-level of the receiving RS-232 line.

## Cheap Discrete-Part RS-232 To TTL Converter

A RS-232 to TTL logic-level converter can be made out of a few discrete components. The schematic shown below uses some clever circuitry, including a charge-pump like circuit, to generate the negative voltage required for RS-232 transmission back to the computer.

{{< figure src="/images/2015/10/low-cost-discrete-part-rs-232-to-ttl-converter-schematic-atmel-avr910.png" width="600px" caption="The schematic of a cheap, discrete-part RS-232 to TTL logic-level converter. Image from Atmel AVR910 (http://www.atmel.com/)."  >}}

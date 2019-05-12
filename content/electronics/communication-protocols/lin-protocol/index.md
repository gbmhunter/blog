---
author: "gbmhunter"
categories: [ "Electronics", "Communication Protocols" ]
date: 2012-12-13
draft: false
tags: [ "LIN", "communication protocol", "bit rate", "transmission distances", "node addressing", "standards" ]
title: "LIN Protocol"
type: "page"
---

## Overview

The LIN protocol is a serial, wired communications protocol for electronic devices. It consists of one master and one or more slaves, and does not support multiple masters.

The LIN (local interconnect network) protocol was originally designed for localised communication within an automobile (for instance, between electrical devices in the door), while the CAM protocol was designed for global communication (e.g. from the back to the engine bay).

It can be considered as a cross between the RS-232/UART and I2C protocols. It uses the open-drain, pull-up design of the [I2C protocol](/electronics/communication-protocols/i2c-communication-protocol/), but the start/stop bit and asynchronous timing of the [UART protocol](/electronics/communication-protocols/uart-communication-protocol).

## Bit Rate And Transmission Distances

Bit rates vary between 1-20kBit/s. The top speed is limited primarily for EMC reasons. The transmission rate is changeable by the master at any time, as the slaves use a sync byte included in the message header to synchronise their clocks to the bit rate.

## Node Addressing

6 bits is allocated for the header ID, giving a total of 64 different header IDs. However, the IDs 60-63 are reserved for special functions, giving a useable range 0-59.

{{% note %}}
These "header IDs" do not necessarily mean node addresses. The header IDs purely describe what the data is, meaning that a single packet sent from the master can be interpreted and used by more than one slave node.
{{% /note %}}

## Standards

## SAE J2602

From the [Freescale website](http://www.freescale.com/webapp/sps/site/overview.jsp?code=IFATOLIN)

> LIN/SAE J2602 is a universal asynchronous receiver–transmitter (UART)–based, single–master, multiple–slave networking architecture originally developed for automotive sensor and actuator networking applications.</blockquote>

## Devices

[NI USB-8476 - 1-port USB-to-LIN Interface](http://sine.ni.com/nips/cds/view/p/lang/en/nid/203388).

Atmel makes SiP (System-in-Package) IC's such as the [ATA6624C](http://www.atmel.com/devices/ATA6612C.aspx), which contains a ATmega168 microcontroller and ATA6624 (which they call a LIN-system-basis chip).

Texas Instruments make LIN interface IC's, such as the [TPIC1021DR](http://www.ti.com/product/TPIC1021), which is a cheap (approx US$0.50, as of 2012), simple, SOIC-8, LIN bus driver.

{{< img src="lin-bus-example-schematic-ti-tpic1021-and-micro.png" caption="An example schematic using the Texas Instruments TPIC1021 LIN bus driver IC. Image from http://www.ti.com/lit/ds/slis113c/slis113c.pdf."  width="500px" >}}

Texas Instruments MSP430 microcontrollers with the USCI_A (Universal Serial Communication Interface) peripheral support the LIN protocol. This includes the MSP430 Value Line (MSP430G2xx), MSP430 2 Series (MSP430F2xx), MSP430 4 Series, MSP430 5 Series, MSP430 6 Series and MSP430 Automotive Series.

{{< img src="ti-msp-430-micro-controller-usci-block.png" caption="The USCI_A hardware peripheral block in a MSP430 microcontroller. Image from http://www.ti.com/lit/ds/symlink/msp430g2153.pdf."  width="250px" >}}

[Freescale's S08 automotive microcontrollers](http://www.freescale.com/webapp/sps/site/overview.jsp?code=8BITAUTO) have an SCIx peripheral, which support the LIN protocol.

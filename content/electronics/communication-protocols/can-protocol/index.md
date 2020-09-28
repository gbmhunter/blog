---
author: "gbmhunter"
date: 2012-12-12
description: "Bit rates, arbitration, encoding, frame types, CAN base frame, CAN extended frame, USB adapters and more info about the CAN communication protocol."
categories: [ "Electronics", "Communication Protocols" ]
lastmod: 2020-06-09
tags: [ "CAN bus", "bus", "communication protocol", "CAN1.0", "CAN2.0", "CAN base frame", "CAN extended frame", "USB adapters", "NoCAN", "encoding", "controller", "CANopen", "NEMA 2000", "termination resistors", "FlexRay", "SAE", "J1850", "J1939", "ISO 11783", "ISOBUS", "isolation", "mailboxes" ]
title: "CAN Protocol"
type: "page"
---

## Overview

**The CAN (Controller Area Network) protocol is a serial-based, multi-master digital communication protocol originally developed by BOSCH**. It was initially developed for use in the automotive industry. It makes use of priority-based message arbitration. The voltage is not part of the standard, and operating voltages of 5V or 12V are common.

{{< img src="can-bus-logo-bosch.png" width="270px" caption="The CAN bus logo. Image from www.bosch.com." >}}

If you are looking for help interfacing with SocketCAN from the Linux command-line, see the [How To Use SocketCAN With The Command-Line In Linux page](/programming/operating-systems/linux/how-to-use-socketcan-with-the-command-line-in-linux/).

If you are looking for help controlling a SocketCAN interface from C software, see the [How To Use SocketCAN With C In Linux page](/programming/operating-systems/linux/how-to-use-socketcan-with-c-in-linux/).

A alternative communications protocol used in similar applications is the LIN protocol.

## Physical Layer

### Voltages

The CAN bus transmits 1 and 0's across a differential pair of wires. A recessive logic 1 is when the driver is not "driving" the bus, and therefore there should be almost no voltage differential across `CAN_H` and `CAN_L`. A dominant logic 0 bit is when the transmitting node drives `CAN_H` high and `CAN_L` low.

### Bit Rate And Transmission Distances

The following equation can be used as a rule-of-thumb to calculate the maximum transmission speed for distances larger than 50m.

<p>$$ BR\times L\leq 60 $$</p>

<p class="centered">
    where:<br>
    \(BR\) = bit rate (in MBit/s)<br>
    \(L\) = length (in m)<br>
<p>

{{% img src="can-bus-bit-rate-vs-bus-length.png" width="500px" caption="Graph showing the relationship between the CAN bus transmission rate and maximum bus length." %}}

A value `\(5ns/m\)` is typically used for the propagation time of the CAN bus signal down the twisted-pair cable when calculating maximum baud rates and/or cable lengths. A table of common distances/transmission rates is shown below. These cable lengths are for the cable _trunk_, and not for _stubs_.

<table>
  <thead>
    <tr>
      <th>Speed</th>
      <th>Distance</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1MBit/s</td>
      <td>25m</td>
      <td></td>
    </tr>
    <tr >
      <td>800kBit/s</td>
      <td>50m</td>
      <td></td>
    </tr>
    <tr >
      <td>500kBit/s</td>
      <td>100m</td>
      <td></td>
    </tr>
    <tr >
      <td>250kBit/s</td>
      <td>250m</td>
      <td>Used by the J1939 standard.</td>
    </tr>
    <tr >
      <td>125kBit/s</td>
      <td>500m</td>
      <td>Default speed for CANopen.</td>
    </tr>
    <tr>
      <td>50kBit/s</td>
      <td>1000m</td>
      <td></td>
    </tr>
    <tr>
      <td>20kBit/s</td>
      <td>2500m</td>
      <td></td>
    </tr>
    <tr>
      <td>10kBit/s</td>
      <td>5000m</td>
      <td>Used by the SAE J1850 standard.</td>
    </tr>
  </tbody>
</table>

### Termination Resistors

For high-speed transmission on the CAN bus, **_termination resistors_ are required between the `CAN_H` and `CAN_L` wires at both ends of the cable**. However, make sure to only add them at the ends of the cable, **any CAN devices connected partway along the bus should not have termination resistors**. For a CAN bus in which devices may be arbitrarily connected and disconnected, it is common practise to add _switchable termination_, which can be connected manually with a typical mechanical switch or automatically controlled by firmware/software using an MOSFET-based switch or similar. Although required by the standard, termination resistors are not typically required for the CAN bus to function at slow speeds over small distances.

Adding a single termination resistor of `120R` at each end of the bus is called _standard termination_. Sometimes a decoupling capacitor is also added in conjunction with the termination resistors. This is called _split termination_[^ti-importance-of-termination-resistors], as you have to use two termination resistors instead of one, with the capacitor "splitting" them in two. Using this combination of resistors and capacitor makes a _low-pass filter_ for the common-mode noise on the bus, which has a corner frequency given by the equation[^ti-importance-of-termination-resistors]:

<p>$$ f_{corner} = \frac{1}{2\pi \cdot R_{term/2} \cdot C_{split}} $$</p>

### Isolation

When CAN bus receivers are incorporated onto PCBs with microcontrollers and other digital/analogue circuitry, it is common practise to isolate the CAN circuitry so that noise and voltage spikes from the CAN bus do not damage the circuitry.

### Connectors

The CiA DS-102 standard defines CAN bus pin assignments for the ubiquitous serial DE-9 connector:

{{% img src="can-bus-cia-ds-102-9-pin-sub-d-connector-pin-assignment.png" width="500px" caption="CAN bus pin assignments for the DE-9 serial connector from the CiA DS-102 standard." %}}

This pin layout is also used for other CAN standards such as CANopen.

## Arbitration

**The CAN network uses priority-based message arbitration**. Message arbitration is required because the CAN networks supports a multi-master bus configuration (i.e. no one master node controls all communication, any node is freely able to attempt to transmit at any time). Arbitration works like such:

The drivers to the CAN line(s) are open-drain. This means that if a node writes a 0 (dominant), it will over-write a 1 (recessive). This is also called a _wired AND_ configuration.

* Both nodes starts to transmit, but each message has a different message ID. Both nodes also monitor the state of the bus.
* At some point in time, because of the different message IDs, one node will try to transmit a 0 (dominant) while the other will try to transmit a 1 (recessive).
* The node transmitting the 0 will detect the bus as 0, all will continue transmitting
* The node transmitting the 1 will detect the bus as 0, indicating that it has lost control (remember a 1 is recessive, and get's "overwritten" by a 1 due to the open-drain drive). This node will back-off, stop transmitting, and try again later.
* Therefore CAN messages with lower numbered identifiers will therefore take priority over those with higher identifiers. 

## Receiver Sampling Points

The main limiting factor on the total bus length at a specific baud rate is the stabilization time for a dominant to recessive bit transmission on the bus. Because it is not driven, the termination resistors play the role of bringing the differential voltage back to the recessive state. The time it takes for the resistors to do this is **primarily dependent on the amount of capacitance on the bus**. This in term determines the maximum length of the bus, as adding additional twisted pair cable increases the capacitance.

Most receivers sample the bit between 75% and 87.5% of the time between the start of one bit and the beginning of the next bit[^elektromotus-can-bus-topology-recommendations]. Earlier sampling points decreases the sensitivity to oscillator tolerances between the different nodes of the CAN bus, whilst a later sampling point allows for a longer signal propagation time and hence longer bus length.

## Encoding

The CAN bus uses _bit-stuffed NRZ encoding_.

Any sequential sequence of 5 bits of the same type requires the transmitter to insert (_stuff_) a bit of the opposite polarity. Consequentially, the receiver has to remove this bit from the incoming data stream, as it is not part of the original data.

This bit stuffing prevents serious clock drift when there a long sequences of either 0's or 1's transmitted on the bus. There is no seperate clock signal (which is why the CAN bus can be called an _asyncronous protocol_), so the clock is recovered from the data.

## Frame Types

Data Frames: Used to transmit a data payload of up to 8 bytes. Very similar frame structure to a remote frame.

Remote Frames: Used to request data. Contains no data payload itself. Very similar frame structure to a data frame.

Error Frames: Transmitted when a node encounters an error during communication. An error frame contains only an error flag and an error delimiter.

## Frame Structure

Dominant bits are logic level 0, while recessive bits are logic level 1.

**Standard Data/Remote Frame (11-bit Identifier)**

{{< img src="can-standard-base-frame-format-data-remote.png" width="883px" caption="The standard (base) CAN frame format for both data and remote frames." >}}

_**SOF bit:**_ A dominant start of frame bit marks the start of a message. It is used to synchronize all the nodes on a bus after being idle. Transmitted by the sender.

_**11-bit Identifier:**_ This 11-bit value is used to identify the contents packet. It is also used to prioritize packets, and identifiers with lower values will have higher priorities. It is important to note that the identifier is NOT a destination node address. It is purely used to identify the type of message, and multiple CAN nodes may be listening/receiving this type of message.

_**RTR bit**_: The _Remote Transit Request_ bit differentiates between data and remote frames (a remote frame is a request for data). In data frames, this bit is dominant and in remote frames this bit is recessive. Thus, data being returned from a request always has a higher priority than a packet requesting the data (with the same identifier).

_**IDE bit**_: The Identifier Extension bit distinguishes between standard and extended frames. In standard frames this bit is dominant, in extended frames this bit is recessive.

_**r0 bit:**_ This bit is reserved for future CAN bus standards user. Always recessive.

_**4-bit DLC:**_ The 4-bit Data Length Code (DLC) contains the number of bytes that will be transmitted. Since the range of data bytes can vary between 0-8, we need 4 bits to specify this value. DLC values from 9-15 are not allowed.

_**0-8 bytes Data:**_ This is the data payload. Up to 8 bytes can be sent in a single packet, as long as it is a data frame. For a remote frame, there must be no data bytes.

_**16-bit CRC:**_ The Cyclic Redundancy Check (CRC) is used to detect errors in the packet. It consists of a 15-bit CRC value followed by a delimiter.

_**2-bit ACK:**_ Based on the value of the CRC, the receiver uses first acknowledge bit to either positively or negatively acknowledge the message. The 2nd bit is a delimiter.

_**7-bit EOF:**_ The End Of Frame is marked with 7 recessive bits.

**Extended Data/Remote Frame (29-bit Identifier)**

{{< img src="can-extended-frame-format-data-remote.png" width="1111px" caption="The extended CAN frame format for both data and remote frames."  >}}

The extended frame is the same as the above standard frame, except for the differences described below:

_**SRR bit**_: The Substitute Remote Request bit is transmitted in extended frames at the position of the RTR bit in standard frames. It is always recessive.

_**IDE bit**_: The Identifier Extension bit distinguishes between standard and extended frames. In standard frames this bit is dominant, in extended frames this bit is recessive.

_**r1:**_ An additional reserve bit for extended frames only. Must be recessive.

_**18-bit Identifier:**_ Another 18-bits that can be used as part of the identifier, giving a total of 29-bits for the identifier in an extended frame. 11-bit identifiers have a higher priority than 29-bit identifiers.

## Message Lengths

There are two different message lengths supported by the CAN protocol.

* CAM Base Frame (CAN2.0A)
* CAM Extended Frame (CAN2.0B)

## Errors

There are 5 different types of errors:

* **Bit Error**: The transmitter monitors the bus level as it sends bits. If the level is not the same as what it is transmitting, a bit error occurs. Physical layer error.
* **Stuff Error**: If 6 or more consecutive bits of the same type are found. Physical layer error.
* **Format Error**: Data-link layer error.
* **CRC Error**: When the computed CRC does not match the one received in the message packet. Data-link layer error.
* **Acknowledge (ACK) Error**: Data-link layer error.

## CAN Controller IP

Most popular FPGA vendors provide pre-licensed (you don't have to pay anything to use it!) CAN controller IP cores for use within their FPGAs.

Xilinx provides the [CAN 2.0B and CAN-FD Controller IP core](https://www.xilinx.com/products/intellectual-property/1-8dyf-2862.html) which is compatible with the Ultrascale, Zynq-7000, 7-series, 6-series and other Xilinx FPGAs.

## Standards

### CANopen

CANopen was developed for embedded devices in automation systems . It defines the OSI network layers that the basic CAN standards leaves unspecified, which includes the network layer and above.

{{% img src="can-open-logo.jpg" width="500px" caption="The CANopen logo." %}}

The CANopen standard is defined by the CiA (CAN in Automation) group. The documents for these standards can be found at [https://www.can-cia.org/groups/specifications/](https://www.can-cia.org/groups/specifications/). The most important document is [CiA 301](), which defines the CANopen application layer. If the above link is down, you can view the [local cached copy, v4.2.0, accessed June 2020](cia-301-canopen-specification-document.pdf).

All CANopen nodes must have a object dictionary.

### FlexRay

FlexRay is a newer protocol that has been designed to overcome some of the limitations of the CAN bus. It supports much longer message data lengths and has improved CRC/error detection. However it is more expensive to implement than CAN as as of June 2020 is still not as popular worldwide as CAN.

### ISO 11783

ISO 11783 is title "Tractors and machinery for agriculture and forestry—Serial control and communications data network" and is commonly called _ISOBUS_. It is based of the SAE J1939 protocol (which includes the CAN bus).

### ISO 11898

**ISO 11898 is a widely followed basic CAN standard, defining parts of the physical and data link layers**. There are many different versions of this standard:

* ISO 11898-1:2015 - Specifies data-link layer and physical signalling
* ISO 11898-2:2003 - Specifies the high-speed transmission (up to 1MBit/s) medium access unit (MAU). **This has been revised by ISO 11898-2:2016.**
* ISO 11898-2:2016 - Specifies the high-speed physical media attachment (HS-PMA) component for the CAN bus.
* ISO 11898-3:2006 - Specifies low-speed, fault tolerant CAN bus information transfer between road vehicles.

ISO 11898 specifies a maximum bus length of 1km, but does allow the use of bridge-devices or repeaters to extend the bus beyond this[^cia-can-physical-layer].

**Related to ISO 11898 is ISO 16845, which details test suites and test requirements** for checking CAN bus/controller conformance to the specs.

### NEMA 2000

A communication protocol for ships which is based on the CAN standard.

### PeliCAN

**PeliCAN is a CAN controller "mode" named by NXP with the arrival of their SJA1000 stand-alone CAN controller ICs**, which were a successor to the PCA82C200 CAN controller ICs (BasicCAN). PeliCAN supports all of the frame types defined by CAN 2.0B.

PeliCAN mode extensions include:

* Error counters
* Error interrupt
* Single-shot transmission (no re-transmission)
* Listen only mode
* Hot plug-in support
* Acceptance filter extension
* Self reception support (can receive messages sent by self)

### SAE J1939-11

Uses a shielded twisted pair. Used in trucks, agricultural and industrial equipment.

## Licensing

**The CAN protocol and CAN FD protocol are protected with IP rights by Bosch**. Any CAN IP modules for a FPGA or ASIC (including self-developed ones!!!), or fixed hardware CAN IP peripherals for microcontrollers **must be licensed**.

{{< img src="can-bus-licensing-fee-highlighted-bosch.png" width="506px" caption="A screenshot of the CAN bus licensing fee details from Bosch. Image from http://www.bosch-semiconductors.de/media/automotive_electronics/pdf_2/ipmodules_3/can_protocol_license_1/Bosch_CAN_Protocol_License_Conditions.pdf."  >}}

See [http://www.bosch-semiconductors.de/media/automotive_electronics/pdf_2/ipmodules_3/can_protocol_license_1/Bosch_CAN_Protocol_License_Conditions.pdf](http://www.bosch-semiconductors.de/media/automotive_electronics/pdf_2/ipmodules_3/can_protocol_license_1/Bosch_CAN_Protocol_License_Conditions.pdf) for more information.

## USB to CAN Adapters

Many USB to CAN adapters use a serial DB-9 connector for the CAN side.

One example is the PCAN-USB, which support Windows and Linux.

{{< img src="pcan-usb-device-connected-to-ubuntu-vmware.png" width="759px" caption="Screenshot showing a PCAN-USB device connected to Ubuntu running inside VMware."  >}}

## Drivers

### SocketCAN

SocketCAN is a set of open-source CAN drivers and a networking stack for the Linux kernel.

SocketCAN creates a new protocol family called `PF_CAN`. You can then communicate with the CAN bus with a socket, in the same way you would for the internet protocol (IP).

CAN support was added to the Linux kernel in version 2.6.25.

More information on SocketCAN, including information and code examples on how to send and receive CAN data from the terminal using SocketCAN, see the [How To Use SocketCAN With The Command-Line In Linux page](/programming/operating-systems/linux/how-to-use-socketcan-with-the-command-line-in-linux) or the [How To Use SocketCAN With C++ In Linux page](/programming/operating-systems/linux/how-to-use-socketcan-with-c-in-linux).

## Dedicated CAN Controller ICs

Some CAN controller ICs use the notion of _mailboxes_. These are areas of memory in which CAN messages can be read from or written to (similar to a buffer).

[MCP2515: Microchip CAN Controller](http://www.microchip.com/wwwproducts/Devices.aspx?dDocName=en010406) is a standalone CAN controller 18-pin IC. It is designed to be connected to a microcontroller via SPI. It is used on the [RS-485 
CAN HAT for Raspberry Pi by WaveStudio](https://www.waveshare.com/rs485-can-hat.htm).

[MCP2551: Microchip Highspeed CAN Transceiver](http://ww1.microchip.com/downloads/en/DeviceDoc/21667f.pdf)


## ICs

Atmel T89C51CC01 Microcontroller. 8-bit 8051 architecture, with CAN interface. Supports bootloading from the CAN protocol

{{< img src="t89c51cc01-8bit-atmel-can-network-microcontroller.png" width="849px" caption="The Atmel T89C51CC01 microcontroller. An 8-bit 8051 architecture, with a CAN interface."  >}}

The [Freescale MC9SO8D](http://www.freescale.com/webapp/sps/site/prod_summary.jsp?code=S08D) range of microcontrollers have built-in support for both CAN and LIN communication protocols. The CAN peripheral block is called an _MSCAN_.

{{< img src="freescale-mc9so8-microcontroller-mscan-hardware-peripheral.png" width="660px" caption="The Freescale MC9SO8 microcontroller MSCAN peripheral." >}}

## NoCAN

NoCAN is a communications protocol that is **built on-top of the CAN bus**. It provides a layer of abstraction on-top of a 125kHz CAN bus which adds _publish-subscribe based messaging_ and _automated address assignment_. With many wireless options available for IoT devices, NoCAN was borne out the idea that there is a need for an easy-to-use wired communications solution for IoT devices. The protocol was created by Omzlo and was [funded in part by a KickStarter campaign](https://www.kickstarter.com/projects/1242572682/nocan-the-wired-iot-platform-for-makers) in 2019.

{{% img src="omzlo-white.png" width="200px" caption="The Omzlo logo." %}}

NoCAN only uses the _CAN Extended Mode_, which supports a 29-bit ID, and up to 8 bytes of message data. However NoCAN provides the ability to send up to 64 bytes of data per message by chaining together up to 8 CAN messages (also called frames). For every NoCAN bus, there must be one (and only one) "special" node called a _Network Manager_, and one or more "standard" nodes. NoCAN also offers defines message formats for firmware update and bootloader control over the CAN bus.

NoCAN supports up to 128 nodes on a CAN bus. 

## DeviceNet (IEC 62026-3)

_DeviceNet_ is a network/messaging layer ontop of the CAN bus protocol. It is commonly used in the automation industry. 

DeviceNet supports the following baud rates:

* 125Kbits/s
* 250Kbits/s
* 500Kbits/s

DeviceNet cable typically consists of two shielded, twisted pairs. One pair has a larger wire diameter for carrying power, and the other pair with a smaller wire diameter is for the data. 

## CAN Bus Repeaters

**CAN bus repeaters are devices that allow you to extend the length of a CAN bus or make a fixed-length bus more resilient to external noise**. They do this by _regenerating_ (a.k.a. _buffering_) the CAN bus signal. They typically pass-through signals from one side to the other very quickly (a low _propagation delay_) and therefore are typically invisible to the other nodes on the CAN bus.

{{% img src="iso-11898-2-can-bus-repeater.png" width="600px" caption="A CAN bus repeater topology from the CiA ISO 118989-2 standard." %}}

Ideally, the CAN bus repeater would go into a sensible passive state when powered down and present high-impedance inputs to the connected CAN bus segments. It should also provide _glitch free_ power up and power down such that spurious signals are not emitted on the bus at start-up or shut-down.

On Semiconductor manufactures the [AMIS-42770 IC](https://docs.rs-online.com/c9be/0900766b816f7ada.pdf) which can be configured to act as a CAN bus repeater with little external circuitry.

{{% img src="amis-42770-on-semiconductor-can-bus-repeater-ic.png" width="600px" caption="Application diagram from the AMIS-42770 IC's datasheet which shows how it can be configured to act as a CAN bus repeater." %}}

### Examples

**CAN Bus Repeater CRep S4 by EMS Wuensche**

This device has 4 separate channels and is transparent to the other nodes on the CAN bus.

{{% img src="ems-crep-s4-can-bus-repeater.png" width="500px" caption="The CRep S4 CAN Bus repeater by EMD Wuensche." %}}

**CAN FD Repeater Reference Design**

A in-depth reference design by Texas Instruments which explains the inner-workings of a CAN bus repeater.

Link: [http://www.ti.com/lit/ug/tidudb5a/tidudb5a.pdf?ts=1591658758534](http://www.ti.com/lit/ug/tidudb5a/tidudb5a.pdf?ts=1591658758534) [local cached copy](/electronics/communication-protocols/can-protocol/ti-can-fd-repeater-reference-design-tida-01487.pdf)

One informative diagram in this document is the block-level architecture of the repeater:

{{% img src="reference-ti-can-repeater-design-tida-01487.png" width="700px" caption="The block-level architecture of the CAN bus repeater design by Texas Instruments. Image from http://www.ti.com/lit/ug/tidudb5a/tidudb5a.pdf?ts=1591658758534." %}}


[^ti-importance-of-termination-resistors]: [https://e2e.ti.com/blogs_/b/industrial_strength/archive/2016/07/14/the-importance-of-termination-networks-in-can-transceivers](https://e2e.ti.com/blogs_/b/industrial_strength/archive/2016/07/14/the-importance-of-termination-networks-in-can-transceivers)

[^elektromotus-can-bus-topology-recommendations]: [https://emusbms.com/files/bms/docs/Elektromotus_CAN_bus_recommendations_v0.2_rc3.pdf](https://emusbms.com/files/bms/docs/Elektromotus_CAN_bus_recommendations_v0.2_rc3.pdf)

[^cia-can-physical-layer]: [http://www.inp.nsk.su/~kozak/canbus/canphy.pdf](http://www.inp.nsk.su/~kozak/canbus/canphy.pdf)
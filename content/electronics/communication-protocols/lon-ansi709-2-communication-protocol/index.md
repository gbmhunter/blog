---
author: "gbmhunter"
categories: [ "Electronics", "Communication Protocols" ]
date: 2015-02-13
draft: false
tags: [ "LON", "communication protocol", "Echelon", "LonTalk", "wiring topology", "routers", "ANSI709.2" ]
title: "LON (ANSI709.2) Communication Protocol"
type: "page"
---

## Overview

The Local Operating Network (LON) protocol is a inter-device communication protocol. Echelon holds the rights to the protocol, with the trade name LonTalk, although it also known as ANSI709.2 (see the standards section for more info). It is a multi-media protocol, supporting many different modes of transmission.

<table>
    <tbody>
        <tr>
            <td>Logo</td>
            <td>{{< img src="lonmark-international-logo-certified.jpg" caption="The logo of LonMark International. Image from http://www.prlog.org/." width="200px" >}}</td>
        </tr>
        <tr>
            <td>Speed</td>
            <td><ul><li>78kbit/s (twisted pair)</li><li>5.4, 3.6kbit/s (powerline)</li></ul></td>
        </tr>
        <tr >
            <td>Transmission mediums</td>
            <td><ul><li>Twister pair cable</li><li>Powerlines</li><li>Fiber optics</li><li>RF</li></ul></td>
        </tr>
        <tr>
            <td>Main uses</td>
            <td><ul>
                <li>Building lighting control</li>
                <li>HVAC</li>
                <li>Service station forecourt control</li>
                <li>In-train controls</li>
            </ul></td>
        </tr>
    </tbody>
</table>

## Standards

Also known as the ANSI/CEA 709.1-B Control Networking Standard. It is related to European standard EN 14908.

A "LonMark" is given to products which met the LonMark guidelines that allow it to interoperate with other LonMark devices over the LON.

LonWorks 2.0 is the name given to the "next-generation" devices, aimed at increasing the capability of the LON network while decreasing node cost.

The LON devices can use an affiliate internet protocol tunnelling standard (ISO/IEC 14908-4) to connect devices on LON networks to remote internet aware devices.

## Protocol

The protocol is based of the concept of an _open network_, in where there **no masters and slaves**, and every node is able to talk freely to any other node.

## Standard network-variable types (SNVTs)

_Standard network-variable types_ (SNVTs) are used for sharing data over the network. 

They contain variable context (e.g. temperature, height), unit of measure (e.g. voltage, time, current) and dimension (e.g. volts, milliseconds, GPM).

SNVTs may be a single data item, or a data structure.

Standard configuration-property types (SCPTs) and user-defined configuration parameter types (UCPTs) are data types used for setting parameters of a device.

## Bindings

_Bindings_ are how LON nodes share data. For data to be shared, two variables on a LON network must be bound together. There are two rules that must be adhered to when binding network variables:

1. One variable must be an output (NVO), and the other must be an input (NVI). One NVO can be bound to multiple NVIs.  
2. The SNVTs of the two bound variables must be equal (i.e. the context, unit of measure, and dimension must be the same).

## **Nodes (Devices)**

A Echelon Neuron microprocessor is not to be confused with a Cavium Neuron, which is a processor designed for high-performance IEEE802 network search applications. Neuron microprocessors are commonly used as transceivers on the LON. A Neuron chip contains three 8-bit inline CPUs, on-board memory, 11 GPIOs and a LON hardware peripheral.

{{< img src="ft-5000-smart-transceiver-cip-block-diagram.png" width="392px" caption="The block diagram for the FT5000 'Smart Transceiver' IC which can be used as part of a LON node."  >}}

The transceivers usually run of a 5.0V power supply.

## Transmission Medium

Many transmission mediums are supported by LON. These include:

* Twisted-pair cabling
* Powerlines
* Fibre optics

This diversity is enabled by transceiver IC which goes between the transmission line and the Neuron microprocessor. There is a dedicated transceiver for every transmission medium.

One of the most popular transceiver ICs is the FTT-10 Free Topology transceiver. It supports a twisted pair, unshielded, polarity insensitive, peer-to-peer transmission medium at a baud rate of 78kbps.

Mains wiring is supported with the Echelon PL3120 and PL3150 power line smart transceivers. These are compliant with the Neuron 3120 and 3150 processors.

## Segments

A "segment" is a single piece of wire. Up to 64 nodes can be connected to a single segment.

## Wiring Topology

There are two different wiring topologies for the FTT-10 transceiver:   

* Free Topology  
* Doubly Terminated

Free topology uses a single termination module installed anywhere on the segment, and allows up to 500m of cable on one segment.

Doubly terminated uses a termination module at each end of a segment, and does not allow wiring tees. All multi-node connections must be daisy-chained. This allows for a longer segment distance, which is dependent on the wire size.

## Net Names

`NETA` and `NETB` are commonly used net names for the twisted-pair differential LON signals.

## Repeaters

Repeaters can be connected to the transmission medium to amplify the incoming signal and pass it on.  

## Routers

Routers are used to manage network traffic, extend the length of a channel (similar to a repeater), increase the number of attached devices and connect channels that use different transmission mediums.

The ability of a router to partition traffic and selectively let messages through reduces the total amount of traffic on a LON system.

There a four different routing algorithm types to choose from:

* Repeater
* Bridge
* Configured router
* Learning router

## Transformers

A communications transformer sits between the transceiver and the transmission line.

{{< img src="ft500-ft-x3-connection-diagram.png" width="518px" caption="A connection diagram between the FT5000 processor and the FT-X3 transformer."  >}}

The FT-X1 was the first transformer. FT-X3 (US$4.52 (1), DigiKey, Feb 2015) belongs to the LonWorks 2.0 platform.

## Addressing

Each node's Neuron processor contains a unique 48-bit ID. Each node is also assigned a logical domain, subnet and node (DSN) number by software when operating on a LON network.

## Domain

Domains can be used to keep two network applications that share the same transmission medium separate from each other. Nodes must be on the same domain to communicate. Nodes can be a member of up to two domains (this feature is not often used).

A LON domain has an identifier of 0, 1, 3, or 6 byte length. The length is variable so that you can optimise it for a particular network. Since the domain identifier is part of every packet, the domain ID's length has a big impact in the network performance. For example, a private network may only use 1 byte for the domain length, while a public network (or one on a more open network medium such as powerlines or RF) may choose to use the full 6 bytes.

A domain with a 0-byte identifier is referred to as the _zero-length domain_, and should be reserved for network management purposes only.

## Subnet

A subnet is the logical grouping of up to 127 nodes from one or more channels (a channel is a set of all LON devices that are connected to the same transmission medium). Each LON domain can accommodate up to 255 subnets. 

A subnet is usually associated with one channel only, whereas the reverse is not normally true.

## Node Address

The node address is a subnet-unique address for the node. It is a numerical identifier in  the range 1-127. It is used to uniquely identify a node on a subnet. Routers ignore the node address. This is not to be confused with the unique 48-bit ID contained in the Neuron processor.

The subnet and node addresses can be referred together as _subnet/node-ID addressing_ (S/N addressing).

## Broadcasts

The LON network supports broadcasting, which is when a message is sent to all nodes in a particular scope. The scope can either be a subnet or the entire domain. 

## Group Addressing

The LON network supports multicasting (group addressing). Up to 64 nodes are allowed to be added to a group, and up to 127 groups are allowed on each domain. Most nodes can only be a member of up to 15 groups at once.

## Communication To Other Protocols

A LON network can communicate to a LAN network through a IP-852 router, oBIX XML server, or web server.

## Real-World Uses

The International Forecourt Standards Forum (IFSF) specifies standards for petroleum forecourts which use the LON network protocol for the communication layer. These are predominately used in Europe.

## Chips You Should Be Aware Of

## FT5000

The Echelon FT5000 (manf. part number 14305R-ES) is a modern (as of Feb 2015) LON controller. It allows you to run user defined code. It itself has no on-board non-volatile user memory, so external flash/EEPROM must be provided. It has 42kB of volatile memory to hold application code. It supports re-programming of the flash/EEPROM over the TF/PT-10 LON network (the differential, wired LON network).

{{< img src="ft5000-typical-operating-conditions.png" width="325px" caption="The typical operating conditions of the FT5000 processor."  >}}

### Memory

The FT5000 requires at least 2kB of external serial EEPROM for storing it's configuration data. The maximum size the EEPROM is allowed to be is 64kB. You also need space to store your user application code (since the FT5000 itself does not have any internal NVM). You can either use the EEPROM data, or if that is not big enough, use an external SPI flash IC. Note that although the FT5000 supports I2C flash, the datasheet says that as of it's publication date, it is not aware of any I2C flash which meets the FT5000's specifications. I am not aware of any size restrictions for the flash memory.

{{< img src="ft5000-allowed-external-memory-configurations.png" width="270px" caption="The permitted external memory configurations for the FT5000 processor."  >}}

Because the way of writing SPI flash memory can very slightly between manufacturers (reads are all the same), a small function resides in the EEPROM that instructs the FT5000 how to correctly write to the device. Echelon provides three memory ICs which have been "qualified" to work with the FT5000. These are:

* Atmel AT25F512B 512-Kilobit 2.7-volt Minimum SPI Serial Flash Memory.
* Numonyx M25P05-A 512-Kbit, serial flash memory, 50MHz SPI bus interface.
* Silicon Storage Technology SST25VF512A 512 kBit SPI Serial Flash.

The onboard microprocessors can run up to a speed of 80MHz.

### Voltages And Currents

The FT5000 is designed to run of a 3.3V supply. In receive mode, it typically draws between 9mA (5MHz clock) and 38mA (80MHz clock). In transmit, it draws between 24mA (5MHz) and 53mA (80MHz). The peak currents are not much higher. Given these relatively low operating currents, it is easy to design a power supply for chip, possibly using something as simple as a [linear regulator](/electronics/components/power-regulators/linear-regulators).

### Transmission Mediums

It can be used with the FT-X3 communications transformer to use as a TF/PT-10 node. It also supports the older FT-X2 and FT-X1 transformers.

### Application Code

Because the FT5000 uses a proprietary architecture and instruction set (this is called the Neuron core), the code can only be compiled with either the NodeBuilder FX Development Tool or the Mini FX Evaluation Kit.

The FT5000 supports JTAG for production-time testing of devices.

It has 12 I/O, all of which can be configured to one or more of 35 predefined I/O models. The chips also has two 16-bit timer/counter peripherals to offload tasks off the processor.

### More Resources

The [FT5000 datasheet](http://downloads.echelon.com/support/documentation/datashts/142x5R_FT_5000_Smart_Transceiver.pdf) (local copy [here](/images/2015/02/Echelon-142x5R-FT5000-Smart-Transceiver-Datasheet.pdf)) provides a brief 9-page overview of the FT5000.

You might then want to move onto the heavier 194-page [Series 5000 Chip Data Book](http://www.echelon.com/assets/bltf1b015c7aa71641a/005-0199-01B_Series_5000_Databook.pdf) (local copy [here](/images/2015/02/Echelon-005-0199-01B-Series-5000-Chip-Data-Book.pdf)).  

For the firmware developers interested in writing code for running on the FT5000, you would want to read the [LonWorks Host Application Programmer's Guide](http://www.echelon.com/assets/blt7a0ec688f1e43c90/078-0016-01B.pdf) (local copy [here](/images/2015/02/LonWorks-Host-Application-Programmers-Guide-Revision-2.pdf)).

## FT 6000 Family

The FT 6000 family of LON microcontrollers (known as _smart transceivers_) are the latest generation (as of Dec 2015) of LON network controller ICs. They supersede the FT 5000 family of microcontrollers.

The FT 6000 family of microcontrollers have identical pin and package layouts to the FT 5000 series, so they should be interchangeable.

The FT 6000 transceiver also has a Neuron 6000 processor onboard. The internal system clock can run at speeds up to 80MHz. It has 64kB of internal RAM and 16kB of internal ROM, with the option of adding additional external RAM, up to 256kB in size.

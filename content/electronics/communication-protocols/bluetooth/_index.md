---
authors: [ Geoffrey Hunter ]
date: 2015-01-03
draft: false
lastmod: 2023-05-24
tags: [ communication protocol, Bluetooth, mesh, network, Bluetooth 4.0, hops, flooding, packets, messages, encryption, latencies, Silicon Labs, nodes, routing, Bluetooth SIG ]
title: Bluetooth
type: page
---

{{% warning-is-notes %}}

## Overview

Bluetooth is a collection of short range wireless communication protocols. The Bluetooth _Special Interests Group_ (SIG) was founded in 1998 and oversees the development of Bluetooth standards[^bib-wikipedia-bluetooth-sig]. The original Bluetooth is known as Bluetooth Classic and was designed as a short-range wireless point-to-point communications protocol.

{{% tip %}}
Bluetooth was named after King Harald “Bluetooth” Gormsson who united Denmark and Norway in 958. He had a dead tooth that was blue/grey in colour, and hence his nickname "Bluetooth". The protocol was named after him because the wireless standard was intended to unite PC and and cellular industries with a short-range wireless link[^bib-sig-origin-of-name].
{{% /tip %}}

Personal area network (PAN) was called a piconet. 1 central device and up to 7 peripherals.

## Logo

The bluetooth logo is shown below:

{{% figure src="bluetooth-4-0-icon.jpg" width="300px" caption="The Bluetooth icon/logo." %}}

## Advanced Audio Distribution Profile (A2DP)

This is a bluetooth standard which supports the streaming of audio between bluetooth-enabled devices.

## Bluetooth 4.0

In 2010, the Bluetooth Core Specification version 4.0 was released. This included Bluetooth Low Energy (BLE), which is now more commonly known as Bluetooth Smart. Bluetooth Smart specifies a hub-and-spoke connection model (with broadcast support), but no mesh topology.

An attribute is a piece of labelled and addressable data. A characteristic is a group of attributes, and a service is a group of attributes.

attribute < characteristic < service

Bluetooth 4.0 uses the server/client paradigm.

## Bluetooth Smart Mesh Working Group

In 2017, a set of three specifications were released by the Bluetooth SIG:

* Mesh Profile
* Mesh Model
* Mesh Device Properties

These specifications allowed Bluetooth devices to form a mesh network. Mesh Profiles use Bluetooth LE for it's underlying radio communications, and as such Mesh Profiles work with Bluetooth 4.2 and Bluetooth 5 devices.

Bluetooth Mesh data packets can be up to 384 bytes.

### Packet Delivery

Packets are not routed in a Bluetooth mesh, but instead use _flooding_. Packets are not sent through a particular sequence of nodes to reach the destination, nor are routing tables kept by any of the nodes. Instead, nodes can be designated as _relays_ receive the message and re-broadcast it to everyone in range. Any relays receiving this will then re-broadcast it again, and so on. Nodes keep track of the packet ID so that they do not re-transmit a message they have already received and transmitted before. This method of _flooding_ is intended to keep the network simple and resilient to node failure. If nodes acted as routers, their failure might have a significant impact on the network[^bib-sig-intro-to-mesh-part-2].

### Latencies

Bluetooth mesh latency depends on the payload size, number of nodes (incl. number of relays) and the connection topology. You can expect round-trip latencies of around 50ms for packets with an 8 byte payload that go through 3 hops[^bib-silicon-labs-bluetooth-mesh-performance]. Silicon Labs has a great application note, [AN1137: Bluetooth Mesh Network Performance](https://www.silabs.com/documents/public/application-notes/an1137-bluetooth-mesh-network-performance.pdf) which goes into mesh latencies in more detail.

### Encryption

Two types of encryption keys:

1. Network keys: Specific to a physical network.
1. Application keys: Specific to the function of the data, e.g. reading sensor values vs. configuring the sensor.

### Generic Models

#### Generic OnOff Server

#### Generic Level Server

## References

[^bib-sig-intro-to-mesh-part-2]: Martin Woolley (2017, Aug 1). _BlueTooth Blog - An Intro to Bluetooth Mesh Part 2_. BlueTooth SIG. Retrieved 2023-05-24, from https://www.bluetooth.com/blog/an-intro-to-bluetooth-mesh-part2/.
[^bib-silicon-labs-bluetooth-mesh-performance]: Silicon Labs. _AN1137: Bluetooth Mesh Network Performance_. Retrieved 2023-05-24, from https://www.silabs.com/documents/public/application-notes/an1137-bluetooth-mesh-network-performance.pdf.
[^bib-wikipedia-bluetooth-sig]: Wikipedia (2023, Apr 27). _Bluetooth Special Interest Group_. Retrieved 2023-05-24, from https://en.wikipedia.org/wiki/Bluetooth_Special_Interest_Group.
[^bib-sig-origin-of-name]: Bluetooth SIG. _About Us - Origin of the Bluetooth Name_. Retrieved 2023-05-24, from https://www.bluetooth.com/about-us/bluetooth-origin/.

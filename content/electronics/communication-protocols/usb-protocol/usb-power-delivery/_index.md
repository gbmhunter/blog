---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Communication Protocols, USB ]
date: 2023-07-07
description: Data and power roles, standards, communication protocols, schematics and more info about USB power delivery (PD).
draft: false
lastmod: 2023-07-08
tags: [ USB, power delivery, PD, sinks, sources, e-marker, Type-C ]
title: USB Power Delivery
type: page
---

{{% warning-is-notes %}}

## Overview

USB _power delivery_ (PD) is a **communication protocol and power transfer service designed to work with the USB Type-C connector**. Without PD, USB Type-C connectors can provide 5V at 3A (15W). PD allows a power source and sink to communicate with each other and negotiate a **higher voltage and/or current, up to maximum of 20V at 5A (240W)**[^usb-org-usb-pd].

A summary of USB specifications and maximum voltages, currents and powers is shown in the table below[^ti-primer-on-usb-pd]:

| Specification | Max. Voltage | Max. Current | Max. Power
|---------------|--------------|--------------|------------
| USB 2.0       | 5V           | 500mA        | 2.5W
| USB 3.0/3.1   | 5V           | 900mA        | 4.5W
| USB BC 1.2    | 5V           | 1.5A         | 7.5W
| USB Type-C 1.2| 5V           | 3A           | 15W
| USB PD 3.0    | 20V          | 5A           | 150W

{{% aside type="info" %}}
According to the specification, all **USB type-C cables must be able to carry at least 3A** (at up to 20V, i.e. 60W). USB type-C cables supporting more than this (5A) must contain e-marker chips, which identify the cable and it's current handling capabilities[^wikipedia-usb-c].
{{% /aside %}}

## Data and Power Roles

In USB terminology, it is important to understand the _data_ and _power_ roles.

There are three _data_ roles:

1. **Down-stream facing port (DFP)**: Sends data downstream, e.g. a USB port on your computer (which is acting as a host) or one of the many on a USB hub.
1. **Up-steam facing port (UFP)**: Sends data upstream, e.g. a USB mouse, keyboard or camera. UFPs typically acts a power _sinks_.
1. **Dual-role data (DRD) port**: Can act as either a DFP or UFP. 

Simlarly, there are also three _power_ roles:

1. **Source**: A device capable of providing power onto VBUS, e.g. a USB hub or the host controller that provides the USB ports on your computer.
1. **Sink**: A device which consumes power from VBUS, e.g. a USB mouse or fan.
1. **Dual-role power**: A device that can act as either a source or a sink. A common example is a computers USB C port. When you plug a mouse into it, it powers the mouse, acting as a sink. However, many laptops support charing themselves over the same port. If you plug in a USB C charger, the computer acts as a sink.

## Standards

* USB PD Revision : Max power of 100W (20V at 5A).

### USB PD Revision 3.1 

_USB PD Revision 3.1_ was released in May 2021[^usb-promoter-group-pd-rev-3.1]. It increased the max. power from 100W to 240W. Added new fixed voltages of 28V (140W), 36V (180W) and 48V (240W), as well as an adjustable voltage mode that allows the device being powered to request intermediate voltages (with a 100mV resolution[^usb-promoter-group-pd-rev-3.1]) between 15V and the max. supported voltage of the charger[^usb-org-usb-pd]. The power direction was made flexible, allowing hosts and peripherals to both be sources and sinks[^usb-org-usb-pd].

## Communication Protocol

USB PD uses the two CC lines provided in the Type-C connector to perform negotiation between source and sink. The VBUS lines on the Type-C cablue plugged into a host/source remain unpowered until a device/sink is plugged in and the CC lines are pulled-down. At this point, VBUS rises to 5V. To get above 5V, more complex digital communications needs to occur between the source and sink over the CC lines.

### USB 2.0 Without PD

Before we dive into PD, let's cover what happens without PD. The most basic powering scenario with Type-C connectors is simple pull-down of the CC lines, leading to 5V being provided on VBUS at either 1.5A or 3A.

{{% figure src="usb2.0-without-pd.webp" width="800px" caption="Basic connection scheme for USB 2.0 without PD over a Type-C connector." %}}

The value of `\(R_p\)` is how the DFP advertises it's current capability. The UFP always has a fixed value for `\(R_d\)`. When connected together, they form a voltage-divider. The UFP can measure the voltage at the center point and determine the current capability of the DFP. 

## References

[^ti-primer-on-usb-pd]: Nate Enos, Brian Gosselin. _A Primer on USB Type-C® and USB Power Delivery Applications and Requirements_ [PDF]. Texas Instruments. Retrieved 2023-07-07, from https://www.ti.com/lit/wp/slyy109b/slyy109b.pdf.
[^wikipedia-usb-c]: Wikipedia (2023, Jun 29). _USB-C_ [Web Page]. Retrieved 2023-07-07, from https://en.wikipedia.org/wiki/USB-C.
[^usb-org-usb-pd]: usb.org. _USB Charger (USB Power Delivery)_ [Web Page]. Retrieved 2023-07-07, from https://www.usb.org/usb-charger-pd.
[^usb-promoter-group-pd-rev-3.1]: USB Promoter Group. _USB Promoter Group Announces USB Power Delivery Specification Revision 3.1 - Specification defines delivering up to 240W of power over USB Type-C_ [PDF]. Retrieved 2023-07-07, from https://www.usb.org/sites/default/files/2021-05/USB%20PG%20USB%20PD%203.1%20DevUpdate%20Announcement_FINAL.pdf. 

---
authors: [ Geoffrey Hunter ]
date: 2011-09-05
description: Terminology, types, manufacturers, common usages and more info on circular connectors.
draft: false
lastmod: 2022-06-08
tags: [ electronics, connectors, electronic components, circular connectors, M12, M8, field installable, DIN, coding, splitters ]
title: Circular Connectors
type: page
---

## Overview

_Circular connectors_ are a large family of connectors that are generally characterized by having a circular house/mating interface. Circular connectors include DIN connectors and the M8/M12 connectors.

## DIN Connectors

The DIN connector was originally developed by the German National Standards Organisation. The known standards are:

* DIN 41524
* DIN 41612
* DIN 43356
* DIN 41652

DIN connectors with different numbers of pins can sometimes mate with each other. For example, 3-pin DIN connectors used for mono audio can mate with the left-channel of larger 5-pin DIN stereo connections. DIN connectors were used for the PS/2 keyboard and mouse connectors (know succeeded by the USB connector).

## Mini-DIN Connectors

Mini-DIN connectors are smaller versions of the DIN connectors and are 9.5mm in diameter. A major difference between DIN and Mini-DIN connectors is that Mini-DIN connectors cannot be mated with any of different-number-of-pins Mini-DIN connectors.

Mini-DIN connectors have been used for the S-video interface.

## M8/M12 Circular Connectors

**M8 and M12 connectors are circular connectors with a 8mm or 12mm mating thread** (note the thread in question is the thread joining the two mating connectors together, not the other threads which may be present on the M12 connector, such as panel-mount variants which typically have a 16mm thread for mounting to the panel). They are used for a variety of purposes across a large number of industries. A large number of these connectors are rated IP67 and prevent the ingress of water and dust.

M8/M12 connectors have different _codings_. Each coding is a particular pin arrangement and key which prevents the same diameter and pin connector being mated with connectors with different codings.

* A: Sensors, DC power (deprecated use), 1Gbit Ethernet. This is a very common/popular encoding.
* B: PROFIBUS
* C: AC power (deprecated)
* D: 100Mbit ethernet
* K: AC power
* L: PROFINET DC power
* N: 
* S: AC power (replacement for `C`)
* T: DC power (replacement for `A` DC power)
* X: 10Gbit Ethernet

{{% img src="m8-m12-connector-codings-te-connectivity.png" width="700" caption="Common codings for M8/M12 circular connectors. Image from https://www.te.com/content/dam/te-com/documents/industrial-automation-and-control/global/m8m12_product_presentation.pdf." %}}

Common pin counts (larger pin counts are only available in the larger diameter connector):

* 4 (M8, M12)
* 5 (M12, sometimes M8)
* 8 (M12)
* 12 (M12)

Some of the panel mount M12 connectors have a M16 (16mm) panel mount thead, others have a PG9 (see [https://en.wikipedia.org/wiki/Panzergewinde](https://en.wikipedia.org/wiki/Panzergewinde)) thread.

### Inline Connectors

They typically have a PG7 or PG9 thread. The PG9 thread seems to be more common/widely available. The inline connectors may have screw termination (terminal block style).

### Splitters

The M8/M12 connector family also come with splitters --- Y and T shaped units which allow 3 cables to be connected together.

{{% img src="y-style-m12-splitter-phoenix-contact-1054338.jpg" width="300" caption="A Y-style M12 splitter from Phoenix Contact. Image from https://nz.element14.com/phoenix-contact/1054338/sensor-splitter-8p-m12-plug-plug/dp/3223043." %}}

### Field Installable Connectors

Some M8/M12 connectors are _field installable_. This is when the connection to the wire is done via terminal block style screw cages (or similar) on the backside of the connector. No crimping tool or soldering is required, hence they are able to be made on the fly in the "field".

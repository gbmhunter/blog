---
author: gbmhunter
date: 2015-11-30
draft: false
title: PCB Card Edge
type: page
---

## Overview

This is a cheap and many-pin capable solution when you want to connect two PCB's together. PCB card edge connector involve using the edge of one of the mating PCB's as the connector, by etching/routing "fingers" on the PCB. The other mating part of the connector is designed to accept these fingers. Most card edge connectors are used when the PCB's are at right-angles to each other, although you can get connectors designed for parallel and co-planar connections.

The fingers that are etched on the PCB are usually gold plated to make the contacts more reliable (the normal lead/tin coating oxidises too quickly). This is a special process that most PCB manufacturers will support, and does not add much to the cost of the PCB. The supported PCB thickness of most of these connectors is around 1.60mm (which is pretty standard). Also, it is recommended to add a small bevel to the inserted end of the PCB to facilitate mating. Again, most quality PCB manufacturers will support this.

Card-edge connectors are very susceptible to board warping and board thickness errors, so takes these into consideration when adding card-edge connectors to your PCB design.

{{< img src="edge-connector-gold-fingers-and-bevel.png" width="445px" caption="Edge connector fingers which have been gold plated and the PCB bevelled. Image from http://www.eurocircuits.com/index.php/eurocircuits-printed-circuits-blog/gold-plating-for-edge-connectors."  >}}

The following image is of PCB card edge connectors on the [Cavro XL-3000 syringe pump](/electronics/teardowns/cavro-xl3000-8-port-syringe-pump-teardown).

{{< img src="pcb-card-edge-connector-example-from-cavro-xl-3000.jpg" width="1200px" caption="An example of a PCB card edge connector. This is a photo of the Cavro XL-3000 syringe pump."  >}}

You can get PCB card edge connectors which have latches, which lock in the daughter board which has special "hockey stick" pieces routed on the sides.

{{< img src="pcb-edge-connector-pci-hockey-stick.png" width="412px" caption="Male pcb-card edge connectors can have 'hockey-stick' latches as indicated (the female connector also has to support this)."  >}}

This is a screenshot from a PCB design for the male part of a card-edge connector in Altium.

{{< img src="altium-card-edge-male-connector-on-pcb.png" width="1502px" caption="An Altium PCB design of a male card-edge connector. This is for the 20-pin connector in the Molex SPD08 series."  >}}

This is a female latching card-edge connector.

{{< img src="pcb-connector-with-latches-3m-spd08.png" width="1265px" caption="A 20-pin card-edge female connector from the Molex SPD08 series."  >}}

In some rare cases (e.g. the Sullins EBC Card-Edge connector series), aside from the socket, the connector manufacturer will also manufacture a plug which replicates PCB fingers, instead of you using the PCB for this purpose.

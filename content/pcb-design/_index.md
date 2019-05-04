---
author: "gbmhunter"
date: 2011-12-12
draft: false
title: "PCB Design"
type: "page"
---


## Estimating PCB Design Time

A good way of estimating the time to design a PCB board is by working out the utilization ratio. This is the total land area of all components divided by the total surface area of the board. A utilization ratio of 0.25 is easy enough to route, and the board starts getting harder as the ratio hits 0.50 and above. There is a good article, '[Estimating PCB Design Time And Complexity](http://www.pcbdesign007.com/pages/zone.cgi?a=74943&artpg=1)', that explains this in more detail, and even has a program to work it out for you.

## Clearances

There are many different types of clearances on a PCB board, and it can be really confusing sometimes to find out you can an can't do in terms of component and track placement.

## Copper To Board-Edge Clearance

Typical copper to board-edge clearance : 0.3048mm (12mill) This is the closest you can put copper to the board edge. This usually accomodates for slight board-misaglignment and tool in-accuracies when routing the the board into shape so that the router will not cut into the copper and leave 'exposed copper' ( a big no-no, usually). However, there are cases in which this rule is ignored, for example when you a making an RD shield or box from pieces of PCB, and need the copper to go right to the edge so that they can be soldered together into a box shape. This clearance is usually larger than the 'track and gap' clearance.

## Copper (Track And Gap) Clearance

The copper to copper and copper width clearance are usually have the same value. This is commonly called the 'Track and Gap' clearance. **Typical Values:**

* 0.5mm - Homemade PCBs
* 0.2mm - Professionally printed PCBs
* 0.1mm - High-end PCBs

## Multi-Layer Routing

Route on the top or bottom layers if possible, especially when prototyping, this makes debugging and rework easier to do (you can't cut a track on one of the inside layers!).

## EMC Considerations/Noise Supression

This is a big topic, and has it's own page [here](/pcb-design/decoupling-and-noise-suppression/).

## PCB Antennas

## RF Antennas

In some situations, antennas for wireless communications can be formed directly on the PCB, with no need for an external component. They are normally used with carrier frequencies in the UHF range (300MHz-3GHz), due to these have frequencies having the appropriate wavelength for PCB construction. They are very cheap, and easy to tune, at the expense of sacrificing some communication range relative to a external antenna. PCB antennas are commonly made for:

* [RFID](/electronics/circuit-design/rfid)
* 2.4GHz communication (e.g. ZigBee, Wi-Fi, ANT+)

## Stress Relief Antennas

Antennas can also be used for stress relief during soldering for stress-sensitive parts, such as accelerometers and gyros. Un-used pins on the stress-sensitive component package are routed a minimum distance from the pad, just like the used pins, so that when soldering using reflow or infrared techniques, all the solder on the pads melts and solidifies at the same time, reducing the stress on the component.

{{< figure src="/images/electronics-pcbdesign/routed-accelrometer-footprint-showing-thermal-relief-on-not-connects-for-stress-relief.png" caption="Routing un-used pins on a accelerometer component package a minimum distance away from the IC to reduce stress when infrared/reflow soldering."  width="800px" >}}

## Undesired Antennas

Any PCB antenna that isn't for radio transmission or stress relief is probably a **bad** thing. These are cause by tracks end in the middle of nowhere, and are often created un-intentionally when routing the PCB.

## Heatsinking

See the [Heatsinking page](/electronics/components/heatsinks/).

## Mounting

Don't forget to consider how the PCB is going to be mounted. One of the most common things accidentally left of a PCB. Normally all it requires is four holes (un-plated) in the corners for screwing in bolts/supports or just enough free PCB space to stick on rubber feet. M3 bolts and nuts are commonly used. Remember to consider the implications of using metal bolts next to/on-top of electrical signals. There are nylon bolts and washers when insulation is needed. Lock-tight can be good to prevent bolts/screws from undoing. The following picture shows the four mounting holes on a PCB. Notice one is underneath a component (the Xbee module).

{{< figure src="/images/electronics-pcbdesign/pcb-showing-mounting-holes.png" caption="A PCB, showing the four mounting holes. Note that one is underneath a component (the Xbee module)."  width="800px" >}}

{{< figure src="/images/electronics-misc/m3-12mm-pcb-standoff.jpg" caption="A M3 PCB standoff. Image from http://www.electronicparts.net.au/."  width="200px" >}}

Standoffs are good for providing clearance between the PCB and the mounting surface. You can buy plastic or metallic standoffs for most electronic suppliers, and they come in round or hex shapes. Electrical enclosures usually come with standoffs built into the structure.

{{< figure src="/images/electronics-misc/spherical-rubber-pcb-feet.jpg" caption="A stick-on spherical rubber PCB foot."  width="160px" >}}

Below is an example of a SMD standoff from [Pem Engineering](http://www.pemnet.com/).

{{< figure src="/images/electronics-pcbdesign/reelfast-smd-standoff-example.jpg" caption="An SMD standoff from Pen Engineering. Image from http://catalog.pemnet.com/viewitems/uts-and-spacers-standoffs-surface-mount-type-smtso/t-nuts-and-spacers-standoffs-br-type-smtso-unified."  width="500px" >}}

## Desiccant

Desiccant (a moisture absorbing compound), can be a good thing to use if your PCB is at risk of condensation. {{< figure src="/images/electronics-misc/dessicant-on-oven-tray.jpg" caption="Desiccant about to be dried on an oven tray."  width="400px" >}} See the [Desiccant page](/electronics/components/desiccant) for more info.

## Making It Look Good

It could be said that PCB design is an art form. Personally, I take great pleasure in making a PCB that got the looks as well as the functionality. And it's helpful that most steps toward making a PCB look good actually tie in well with good design practises anyway.

This is an example of a PCB which I really like. It is called "[The Mojo](http://embeddedmicro.com/products/the-mojo)", and it is a Arduino-like FPGA development board. I love the black and green colour combination of the soldermask and silkscreen respectively.

{{< figure src="/images/electronics-pcbdesign/the-mojo-fpga-pcb.jpg" caption="'The Mojo', a Arduino-like FPGA development that looks really nice. Image from http://embeddedmicro.com/products/the-mojo."  width="800px" >}}

## Late Cycle Rework

"Late cycle rework" is the term given to PCB reworking done at the late stages, just before being sent of to the PCB manufacturer. Late cycle work is normally a bad thing, it is estimated that work done in this stage cost 10x as much as it does in the earlier stage.

## Panelisation

Panelisation is when you combine multiple PCB designs onto one PCB board, with the normal intention of saving costs associated with producing individual PCBs. Most PCB manufacturers support panelisation and will route/v-score each design out for you, so you can separate them easily.

[Altium](/electronics/general/altium) supports panelization. There is also software called [GerbMerge](https://github.com/unwireddevices/gerbmerge), an open-source tool which merges Gerber files together.

## Sending It To A PCB Manufacturer

For a review on different PCB manufacturers and their capabilities, see the [PCB Manufacturers section of the Electrical Suppliers page](/electronics/general/electrical-suppliers#pcb-manufacturers).

## PCB Rework

Below is an example of a screwed PCB after too much rework was done on a 0.5mm pitch QFN package.

{{< figure src="/images/electronics-pcbdesign/qfn-footprint-failure-after-too-much-resoldering.jpg" caption="The PCB was wrecked after doing too much re-soldering on a 0.5mm pitch QFN footprint."  width="600px" >}}

## PCB Design Checklist

Click [here](/pcb-design/pcb-design-checklist/).

---
author: gbmhunter
date: 2015-11-30
draft: false
title: D-Subminiature (D-sub)
type: page
---

## Overview

These connectors were designed by ITT Canon in 1952. Large by today's standards, at the time, these connectors where one of the smallest connectors available for a computer, hence the name "subminiature". They are characterised by two or more rows of connections inside a **"D" shape** metal shell.

{{< img src="de-9-female-pcb-mount-d-sub-connector-photo.jpg" width="272px" caption="One of the most commonly used D-sub connectors of this era, the 9-pin female PCB-mount DE-9 connector."  >}}

The **DE-9** is a very **popular** 9-pin computer serial cable. It is also commonly (and **incorrectly**) called a DB-9 connector, presumably because of the name of larger DB-25 connector that it replaced.

The DE-15 connector is commonly used for VGA connections between computers and screens.

## Schematic Symbol

I recommend using the unique schematic symbol style below for the range of D-sub-miniature connectors. It immediately identifies the connector to the viewer.

{{< img src="connector-db25-schematic-symbol.png" width="185px" caption="An easy-to-identify schematic symbol style for representing D sub-miniature connectors."  >}}

## Sizes

The available sizes are:

<table>
    <thead>
        <tr>
            <th colspan="2" >Normal Density</th>
            <th colspan="2" >High Density</th>
            <th colspan="2" >Double Density</th>
        </tr>
        <tr>
            <th>Name</th>
            <th>Num. Pins (layout)</th>
            <th>Name</th>
            <th>Num. Pins (layout)</th>
            <th>Name</th>
            <th>Num. Pins (layout)</th>
        </tr>
    </thead>
    <tbody>
><tr >
<td >DE-09
</td>
<td >9 (8-7)
</td>
<td >DE-15
</td>
<td >15 (5-5-5)
</td>
<td >DE-19
</td>
<td >19 (6-7-6)
</td></tr><tr >
<td >DA-15
</td>
<td >15
</td>
<td >DA-26
</td>
<td >26 (9-9-8)
</td>
<td >DA-31
</td>
<td >31 (10-10-10
</td></tr><tr >
<td >DB-25
</td>
<td >25
</td>
<td >DB-44
</td>
<td >44 (15-15-14)
</td>
<td >DB-52
</td>
<td >52 (17-18-17)
</td></tr><tr >
<td >DC-37
</td>
<td >37 (19-18) 
</td>
<td >DC-62
</td>
<td >62 (21-21-20)
</td>
<td >DC-79
</td>
<td >79 (26-27-26)
</td></tr><tr >
<td > DD-50
</td>
<td >50 (17-16-17) 
</td>
<td >DD-78
</td>
<td >78  (20-19-20-19)
</td>
<td >DD-100
</td>
<td >100 (26-25-24-25)
</td></tr><tr >
<td > 
</td>
<td > 
</td>
<td >DF-104
</td>
<td >104 (21-21-21-21-20)
</td>
<td > 
</td>
<td > 
</td></tr></tbody></table>

## Backshells

D-subminiature connectors which are **attached to cables** (i.e. are not PCB mounted or panel mounted) are designed to be fitted with a _backshell_. The backshell **protects/encloses** the wire connections from from the cable, as well providing **mechancial support and strain relief** for the cable.

## Termination Styles

PCB Mount: The connectors has protroding pins (in either straight or right-angle orientation) so that the connector can be soldered to a PCB.

Solder Lug: Designed so that wires can be soldered onto the pins. This style of connector is designed to be panel mounted (**not PCB mounted**). Also called _solder bucket_.

## Uses

Many older consumer products and prototype circuits of all ages use the DE-9 connector for [RS-232 communications](/electronics/communication-protocols/rs-232-protocol). However, it is becoming less common, with USB-to-UART cables becoming more popular, which get connected directly to a microcontrollers pins through flying leads, standard header, or USB connector (in this case the USB-to-UART converter is usually on the board itself, i.e. [Arduino boards](/programming/microcontrollers/arduino)).

## Filtered D-sub Connectors

Filtered D-sub connectors have purposeful capacitance-to-ground (or more complicated filters) built into each one of the connectors pins.

{{< img src="d-sub-connector-with-c-filter-conec-graph-of-insertion-loss-vs-freq.pdf.png" width="551px" caption="A graph of insertion loss vs. frequency for a Conec D-sub connector with integrated capacitance for filtering (a 'C' filter)."  >}}

Compared to implementing the filtering on say, the PCB, filtering at the connector offers the advantage of increased EMI protection due to the filtering occurring at the point that the signal enters the enclosure (so the wires to the PCB don't radiate noise). It also saves PCB space and simplifies PCB routing/layout.

## Screw Kits

You can buy pre-made screw kits, such as the [TE Connectivity 5205817-1](http://www.digikey.co.nz/product-search/en?vendor=0&keywords=5205817-1&stock=1), which comes with all the necessary screws and associated hardware to secure two D-sub connectors together (I might point out here that screws **are not required** to make a connection, but help to make it more secure).

{{< img src="te-connectivity-5205817-1-d-sub-screw-kit.jpg" width="254px" caption="The TE Connectivity 5205817-1 D-Sub screw kit."  >}}

## Waterproof Variants

Waterproof variants of D-sub connectors exist, the two most common being a DE-9 or a DB-25.

{{< img src="amphenol-ltw-waterproof-serial-de-9-receptacle-connector.jpg" width="450px" caption="A waterproof DE-9 receptacle by Amphenol LTW."  >}}

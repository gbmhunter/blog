---
author: gbmhunter
date: 2011-09-03
draft: false
tags: [ "component", "designators", "electronincs", "engineering", "symbol", "PCB", "silkscreen" ]
title: Component Designators
type: page
---

## Overview

Component designators are used to identify components both on schematics and PCB's. They usually consist of a short acronym representing the type of component, followed by unique number to distinguish it from other components of the same type (e.g. R3, R4, C3).

Over the years, many standards have been released that specify particular designator prefixes for component types (such as the IEEE 315-1975). However, many schematics and PCB silkscreen do not strictly follow any standard (although the similarities are usually quite high). The following table shows non-standard specific, commonly used acronyms and the type of component they represent.

Sorted by alphabetic order...

<div class="table-wrapper">
<table>
    <tr>
        <th>Designator</th>
        <th>Image</th>
        <th>Component Type</th>
    </tr>
<tbody >
<tr >
    <td>A</td>
    <td></td>
    <td>Separate assembly or sub-assembly (e.g. daughter board). I do not see this designator used much in practise (and I myself have never used it, for things such as GPS modules with an LGA footprint I have always used the designator U).</td>
</tr>
<tr >
    <td >AGND</td>
    <td >{{< figure src="/images/2011/09/ground-analogue.png" caption="The schematic symbol for analogue ground (AGND)."  >}}</td>
    <td >Analogue ground. See also DGND and GND.</td>
</tr>
<tr >
    <td >ANT</td>
    <td ></td>
    <td >Antenna. E is also used, however ANT is my personal preference..</td>
</tr>
<tr >
    <td >BT</td>
    <td ></td>
    <td >Battery.</td>
</tr>
<tr >
    <td >C</td>
    <td >{{< figure src="/images/2011/09/non-polarised-capacitor-schematic-symbol.png" caption="The schematic symbol for a non-polarised capacitor."  >}}
    {{< figure src="/images/2011/09/polarised-capacitor-schematic-symbol.png" caption="The schematic symbol for a polarised capacitor."  >}}</td>
    <td >Capacitor (both polarised and non-polarised)</td>
</tr>
<tr>
    <td>D</td>
    <td>{{< figure src="/images/2011/09/led-schematic-symbol.png" caption="The schematic symbol for an LED."  >}}</td>
    <td >Diode (standard, Schottky, zener, e.t.c). Note that many different variations on the schematic symbol exist for the different types of diodes.</td>
</tr>
<tr >
<td >DGND</td>
<td >{{< figure src="/images/2011/09/digital-ground-schematic-symbol.png" caption="The schematic symbol for digital ground."  >}}</td>
<td >Digital ground. See also AGND and GND.</td>
</tr>
<tr >
<td >E</td>
<td ></td>
<td >Antenna. ANT is also used (and is my personal preference).</td>
</tr>
<tr >
<td >F</td>
<td ></td>
<td >Fuse (wired, electrical, e.t.c). XF is for a fuse holder.</td>
</tr>
<tr >
<td >FB
</td>
<td >{{< figure src="/images/2011/09/ferrite-bead-schematic-symbol.png" caption="The schematic symbol for a ferrite bead."  >}}</td>

<td >Ferrite bead. Sometimes the designator FEB is used instead.
</td>
</tr>
<tr >

<td >FID
</td>

<td>{{< figure src="/images/2011/09/fiducial-schematic-symbol.png" caption="The schematic symbol for a fiducial."  >}}</td>
<td>Fiducial.</td>
</tr>
<tr >
<td >GND</td>
<td >{{< figure src="/images/2011/09/general-common-ground-schematic-symbol.png" caption="The schematic symbol for a general or common ground."  >}}</td>
<td>Common/General Ground (also see AGND and DGND).</td>
</tr>
<tr>
<td>J</td>
<td></td>
<td>A jack/socket/female connector. Also defined in IEEE 315 as the least moving part of a connector set (which also includes a plug, P).</td>
</tr>
<tr>
<td >JP</td>
<td ></td>
<td >Jumper or link (L is for inductor, not link). This maybe a simple piece of wire, a physical jumper component, or perhaps a \(0\Omega\) resistor).</td>
</tr>
<tr >
<td >L</td>
<td ></td>
<td >Inductor</td>
</tr>
<tr >
<td >M</td>
<td ></td>
<td >Motor</td>
</tr>
<tr >
<td >MP</td>
<td ></td>
<td >A mechanical part. This is an umbrella term for many different things, such as screws, standoffs, brackets, e.t.c.</td>
</tr>
<tr >
<td >P</td>
<td ></td>

<td >A plug/male connector. Also defined in IEEE 315 as the most moving part of a connector set (which also includes a jack, J).
</td>
</tr>
<tr >

<td >PV
</td>

<td >
</td>

<td >Photo-voltaic (aka solar panel).
</td>
</tr>
<tr >

<td >Q
</td>

<td>
{{< figure src="/images/2011/09/n-channel-mosfet-schematic-symbol.png" caption="The schematic symbol for an N-channel MOSFET."  >}}
{{< figure src="/images/2011/09/p-channel-mosfet-schematic-symbol.png" caption="The schematic symbol for a P-channel MOSFET."  >}}
</td>
<td >Transistor (BJT's, MOSFETs, JFET's, e.t.c). Sometimes this is used for an integrated circuit, but I prefer using 'U'.</td>
</tr>
<tr >
<td >R</td>

<td >
</td>

<td >Resistor.
</td>
</tr>
<tr >

<td >RN
</td>

<td >
</td>

<td >Resistor network (more than one resistor in the same package, sometimes sharing a common connection).
</td>
</tr>
<tr >

<td >S
</td>

<td >
</td>

<td >Switch. SW is also used.
</td>
</tr>
<tr >

<td >SG
</td>

<td >


{{< figure src="/images/2011/09/spark-gap-schematic-symbol-triangular-200um-no-bom.png" caption="A schematic symbol for a spark gap. This spark gap is created with two triangles of copper on the PCB, with a gap of 200um between them. As this is made purely from the PCB, there is no BOM component needed."  >}}



</td>

<td >Spark gap.
</td>
</tr>
<tr >

<td >T
</td>

<td >
</td>

<td >Transformer
</td>
</tr>
<tr >

<td >TP
</td>

<td >
</td>

<td >Test point. These may be physical components on the PCB, or just places of exposed copper (e.g. pads, holes or vias).
</td>
</tr>
<tr >

<td >U
</td>

<td >
</td>

<td >Integrated Circuit (microcontroller, liner voltage regulator, op-amp, e.t.c)
</td>
</tr>
<tr >

<td >VR
</td>

<td >


{{< figure src="/images/2011/09/variable-resistor-potentiometer-schematic-symbol.png" caption="The schematic symbol for a variable resistor (potentiometer)."  >}}



</td>

<td >Variable resistor (potentiometer).
</td>
</tr>
<tr >

<td >W
</td>

<td >
</td>

<td >Wire/cable.
</td>
</tr>
<tr>
<td>XC</td>
<td>
{{< figure src="/images/2011/09/crystal-schematic-symbol.png" caption="The schematic symbol for a crystal."  >}}
</td>
<td>Timing crystals. XTAL or Y are also used.</td>
</tr>
<tr>
    <td>XF</td>
    <td></td>
    <td>Fuse holder. F is a fuse.</td>
</tr>
<tr>
    <td>Y</td>
    <td></td>
    <td> Used for crystals or oscillators. XC or XTAL are also used.</td>
</tr>
</tbody>
</table>
</div>

## Regex

The regex pattern to match any valid component designator, which is one or more capital letters followed by one or more numerals, is:

```
^[A-Z][A-Z]*[0-9][0-9]*$
```

The above pattern also contains the start and end-of-line anchors `^` and `$`, to enforce that there is no text before or after the designator. These can be removed if desired. More on using regex with component designators can be found on the [Altium Scripting page](/electronics/general/altium/altium-scripting-and-using-the-api).

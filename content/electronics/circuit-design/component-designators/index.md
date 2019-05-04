---
author: gbmhunter
categories: [ "Electronics", "Circuit Design" ]
date: 2011-09-03
description: "A list of the most popular component designators used on schematics and PCB silkscreens."
draft: false
lastmod: 2019-05-03
tags: [ "electronics", "circuit design", "components", "designators", "engineering", "symbols", "PCBs", "silkscreen", "IEEE 315" ]
title: Component Designators
type: page
---

## Overview

Component designators and schematic symbols are used to quickly identify components both on schematics and PCBs. They usually consist of a short acronym representing the type of component, followed by unique number to distinguish it from other components of the same type (e.g. `R3`, `R4`, `C3`).

Over the years, many standards have been released that specify particular designator prefixes for component types. These include:

* Australian Standard AS1102:1995 (Graphical symbols for electrotechnology)
* IEC 60617
* IEEE 315-1975.

However, many schematic and PCB silkscreen designs do not strictly follow any standard (although the similarities are usually quite high). The following list shows non-standard specific, commonly used acronyms and the type of component they represent.

## List of Common Component Designators And Symbols

Sorted by alphabetic order.

Some of the symbols below where created with InkScape and saved to a SVG file, which you can [view/download here](/electronics/circuit-design/component-designators/schematic-symbols.svg).

### Antennas (ANT)

There are a number of different schematic symbols for an antenna, but they all look similar and should be easily recognizable. The designator `E` is also used, however `ANT` is my personal preference.

<u>Recommended designator(s):</u>

* `ANT`

<u>Recommended schematic symbols(s):</u>

{{< img src="antenna-schematic-symbol.png" caption="A schematic symbol for an antenna." width="100px" >}}

{{< img src="antenna-schematic-symbol-2.png" caption="Another schematic symbol for an antenna." width="100px" >}}

### Assemblies (A)

Separate assembly or sub-assembly (e.g. daughter board). I do not see this designator used much in practice (and I myself have never used it, for things such as GPS modules with an LGA footprint I have always used the designator U).

<u>Recommended designator(s):</u>

* `A`

### Batteries (BT)

The designator `BT` is commonly used for a battery. The schematic symbol shown below is typical for a battery, although sometimes the distinction between a single-celled and multi-celled battery is made. If the battery is single-celled, this can be represented by a symbol with only one pair of long/short lines (representing the two electrodes of the cell). If the battery is multi-celled, two pairs of long/short lines with a dotted line connecting them (representing many plates) can be used. I prefer to just use the below symbol for any battery type.

<u>Recommended designator(s):</u>

* `BT`

<u>Recommended schematic symbol(s):</u>

{{< img src="battery-schematic-symbol-bt1.png" width="200px" caption="The schematic symbol for a battery." >}}

### Capacitors (C)

`C` is the recommended designator for capacitors (both polarised and non-polarised). Sometimes you will see `VC` used for a variable capacitor (these are not common). I recommend using two different schematic symbols, flat plates for a non-polarised capacitor, and one plate which is curved for a polarised capacitor.

<u>Recommended designator(s):</u>

* `C`

<u>Recommended schematic symbol(s):</u>

{{< img src="non-polarised-capacitor-schematic-symbol.png" caption="The schematic symbol for a non-polarised capacitor." width="200px" >}}

{{< img src="polarised-capacitor-schematic-symbol.png" caption="The schematic symbol for a polarised capacitor." width="200px" >}}

### Diodes (D)

The designator `D` can be used for most diodes. Sometimes `Z` is used for a Zener diode, and `LED` for a light-emitting diode, however TVS, Schottky and general purpose diodes are still just `D`.

<u>Recommended designator(s):</u>

* `D`

Recommended symbol(s):

{{< img src="led-schematic-symbol.png" caption="The schematic symbol for an LED." width="200px" >}}

### Fuse/Fuse Holders (F, XF)

`F` is the designator used for fuses (wired, electrical, e.t.c). `XF` is commonly used for a fuse holder.</td>

<u>Recommended designator(s):</u>

* `F` (fuse)
* `XF` (fuse holder)

<u>Recommended symbol(s):</u>

{{< img src="fuse-schematic-symbol-f1.png" width="200px" >}}

### Ferrite Beads (FB, FEB)

`FB` is the designator used for ferrite beads. Sometimes the designator `FEB` is used instead.

<u>Recommended designator(s):</u>

* `FB`

<u>Recommended schematic symbol(s):</u>

{{< img src="ferrite-bead-schematic-symbol.png" caption="The schematic symbol for a ferrite bead." width="200px" >}}

### Fiducials (FID)

<u>Recommended designator(s):</u>

* `FID`

<u>Recommended schematic symbol(s):</u>

{{< img src="fiducial-schematic-symbol.png" caption="The schematic symbol for a fiducial." width="200px" >}}


### Ground (GND, AGND, DGND)

Sometimes `GND` is used for all ground points, and sometimes grounds are split based on noise boundaries such as `AGND` and `DGND` (this is common in high-frequency circuits).

<u>Recommended designator(s):</u>

* `GND`: For general purpose use.
* `AGND`: Specialised analogue ground.
* `DGND`: Specialised digital ground.

<u>Recommended schematic symbol(s):</u>

<div class="hbox">
  {{< img src="general-common-ground-schematic-symbol.png" caption="The schematic symbol for a general or common ground." width="200px" >}}
  {{< img src="ground-analogue.png" caption="The schematic symbol for analogue ground (AGND)." width="200px" >}}
  {{< img src="digital-ground-schematic-symbol.png" caption="The schematic symbol for digital ground (DGND)." width="200px" >}}
</div>

### Integrated Circuits (U)

`U` is the designator for integrated circuits. ICs include microcontrollers, liner voltage regulators, op-amps, e.t.c.

Why `U`? One theory is that `U` was the the designator for anything "Unspecified". It makes sense that when ICs first came into use that they would of been labelled as such. The name stuck, and now `U` is used for ICs (and no longer for anything "unspecified"). Another theory is that `U` stood for "Unrepairable"[^ics].

In older schematics you may also see `IC` or `Z` used for integrated circuits.

<u>Recommended designator(s):</u>

* `U`

<u>Recommended schematic symbol(s):</u>

{{< img src="integrated-circuit-schematic-symbol-u1.png" width="200px" caption="Recommended schematic symbol for an integrated circuit (IC)." >}}

### Jack (J)

A jack/socket/female connector. Also defined in IEEE 315 as the least moving part of a connector set (which also includes a plug, `P`).

<u>Recommended designator(s):</u>

* `J`

### Jumper (JP)

Jumper or link (L is for inductor, not link). This maybe a simple piece of wire, a physical jumper component, or perhaps a `\(0\Omega\)` resistor).

<u>Recommended designator(s):</u>

* `JP`

### Inductor (L)

`L` is used as a designator for inductors. This is probably in honour of the physicist Heinrich Lenz who was a pioneer in the discovery of electromagnetism (and because `I` is commonly used to represent current).

<u>Recommended designator(s):</u>

* `L`

### Motor (M)

<u>Recommended designator(s):</u>

* `M`

### Mechanical Part (MP)

A mechanical part. This is an umbrella term for many different things, such as screws, standoffs, brackets, e.t.c.

<u>Recommended designator(s):</u>

* `MP`

### Plug (P)

A plug/male connector. Also defined in IEEE 315 as the most moving part of a connector set (which also includes a jack, `J`).

<u>Recommended designator(s):</u>

*`P`

### Photovoltaics/Solar Panels (PV)

`PV` is the designator for photovoltaics (aka solar panels).</td>

<u>Recommended designator(s):</u>

* `PV`

### Resistors (R, VR)

Sometimes you will see `LDR` for light-dependent resistors.

<u>Recommended designator(s):</u>

* `R`: Standard 2-pin resistors
* `RN`: Resistor networks (more than one resistor in the same package, sometimes sharing a common connection).
* `VR`: Variable resistors (aka potentiometers)

<u>Recommended schematic symbol(s):</u>

{{< img src="variable-resistor-potentiometer-schematic-symbol.png" caption="The schematic symbol for a variable resistor (potentiometer)." width="200px" >}}

### Switches (S, SW)

`S` is the designator used for a switch. `SW` is also commonly used. Sometimes you will see switches labelled according to their type (e.g. `PB` for push-button switches, `DPDT` for double-pole double-throw switches), **but this is not recommended**.

<u>Recommended designator(s):</u>

* `S`

### Spark Gap (SG)

<u>Recommended designator(s):</u>

* `SG`

<u>Recommended schematic symbol(s):</u>

{{< img src="spark-gap-schematic-symbol-triangular-200um-no-bom.png" caption="A schematic symbol for a spark gap. This spark gap is created with two triangles of copper on the PCB, with a gap of 200um between them. As this is made purely from the PCB, there is no BOM component needed." width="200px" >}}

### Transformer (T)

`T` is the designator used for transformers.

<u>Recommended designator(s):</u>

*`T`

### Transistors (Q)

`Q` is the designator used for transistors (BJTs, MOSFETs, JFETs, e.t.c). Sometimes `Q` is also used for an integrated circuit, but I prefer using `U`.

<u>Recommended designator(s):</u>

* `Q`

<u>Recommended schematic symbol(s):</u>

{{< img src="n-channel-mosfet-schematic-symbol.png" caption="The schematic symbol for an N-channel MOSFET." width="200px" >}}
{{< img src="p-channel-mosfet-schematic-symbol.png" caption="The schematic symbol for a P-channel MOSFET." width="200px" >}}

### Test Point (TP)

Test point. These may be physical components on the PCB, or just places of exposed copper (e.g. pads, holes or vias).</td>

<u>Recommended designator(s):</u>

*`TP`

### Wire/Cable (W)

Wire/cable.

<u>Recommended designator(s):</u>

* `W`

### Crystals/Oscillators (XC, XTAL, Y)

Timing crystals. XTAL or Y are also used.

<u>Recommended designator(s):</u>

* `XC` 

<u>Recommended schematic symbols:</u>

{{< img src="crystal-schematic-symbol.png" caption="The schematic symbol for a crystal." width="200px" >}}

## Regex

The regex pattern to match any valid component designator, which is one or more capital letters followed by one or more numerals, is:

```text
^[A-Z][A-Z]*[0-9][0-9]*$
```

The above pattern also contains the start and end-of-line anchors `^` and `$`, to enforce that there is no text before or after the designator. These can be removed if desired. More on using regex with component designators can be found on the [Altium Scripting page](/electronics/general/altium/altium-scripting-and-using-the-api).


[^ics]: https://electronics.stackexchange.com/questions/25655/why-is-u-used-for-ics-on-circuit-diagrams, fetched on 2019-05-03.
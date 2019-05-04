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

Component designators are used to identify components both on schematics and PCBs. They usually consist of a short acronym representing the type of component, followed by unique number to distinguish it from other components of the same type (e.g. R3, R4, C3).

Over the years, many standards have been released that specify particular designator prefixes for component types. These include:

* Australian Standard AS 1102
* IEC 60617
* IEEE 315-1975.

However, many schematic and PCB silkscreen designs do not strictly follow any standard (although the similarities are usually quite high). The following table shows non-standard specific, commonly used acronyms and the type of component they represent.

## List of Common Schematic And PCB Designators

Sorted by alphabetic order.

Some of the symbols below where created with InkScape and saved to a SVG file, which you can [view/download here](/electronics/circuit-design/component-designators/schematic-symbols.svg).

### Antennas (ANT)

Designator(s): `ANT`

{{< img src="antenna-schematic-symbol.png" caption="A schematic symbol for an antenna." width="100px" >}}

{{< img src="antenna-schematic-symbol-2.png" caption="Another schematic symbol for an antenna." width="100px" >}}

There are a number of different schematic symbols for an antenna, but they all look similar and should be easily recognizable. The designator <code>E</code> is also used, however <code>ANT</code> is my personal preference.

### Assemblies (A)

Designator(s): `A`

Separate assembly or sub-assembly (e.g. daughter board). I do not see this designator used much in practice (and I myself have never used it, for things such as GPS modules with an LGA footprint I have always used the designator U).

### Batteries (BT)

The designator `BT` is commonly used for a battery. The schematic symbol shown below is typical for a battery, although sometimes the distinction between a single-celled and multi-celled battery is made. If the battery is single-celled, this can be represented by a symbol with only one pair of long/short lines (representing the two electrodes of the cell). If the battery is multi-celled, two pairs of long/short lines with a dotted line connecting them (representing many plates) can be used. I prefer to just use the below symbol for any battery type.

Designator(s): `BT`

Symbol:

{{< img src="battery-schematic-symbol-bt1.png" width="200px" caption="The schematic symbol for a battery." >}}

### Capacitors (C)

`C` is the recommended designator for capacitors (both polarised and non-polarised). Sometimes you will see `VC` used for a variable capacitor (these are not common, 
)

Recommended designator(s): `C`

{{< img src="non-polarised-capacitor-schematic-symbol.png" caption="The schematic symbol for a non-polarised capacitor." width="200px" >}}

{{< img src="polarised-capacitor-schematic-symbol.png" caption="The schematic symbol for a polarised capacitor." width="200px" >}}

### Diodes (D)

The designator `D` can be used for most diodes. Sometimes `Z` is used for a Zener diode, and `LED` for a light-emitting diode, however TVS, Schottky and general purpose diodes are still just `D`.

Designator(s): `D`

Symbols:

{{< img src="led-schematic-symbol.png" caption="The schematic symbol for an LED." width="200px" >}}

### Fuse/Fuse Holders (F, XF)

`F` is the designator used for fuses (wired, electrical, e.t.c). `XF` is commonly used for a fuse holder.</td>

Recommended Designator(s):
* `F` (fuse)
* `XF` (fuse holder)

Recommended Symbol:

{{< img src="fuse-schematic-symbol-f1.png" width="200px" >}}

### Ferrite Beads (FB, FEB)

Designator(s): `FB` (preferred), `FEB`

{{< img src="ferrite-bead-schematic-symbol.png" caption="The schematic symbol for a ferrite bead." width="200px" >}}

`FB` is the designator used for ferrite beads. Sometimes the designator `FEB` is used instead.

### Fiducials (FID)

Designator(s): `FID`

{{< img src="fiducial-schematic-symbol.png" caption="The schematic symbol for a fiducial." width="200px" >}}

Fiducial.

### Ground (GND, AGND, DGND)

Designator(s): `GND`, `AGND`, `DGND`

<div class="hbox">
  {{< img src="general-common-ground-schematic-symbol.png" caption="The schematic symbol for a general or common ground." width="200px" >}}
  {{< img src="ground-analogue.png" caption="The schematic symbol for analogue ground (AGND)." width="200px" >}}
  {{< img src="digital-ground-schematic-symbol.png" caption="The schematic symbol for digital ground (DGND)." width="200px" >}}
</div>

Sometimes `GND` is used for all ground points, and sometimes grounds are split based on noise boundaries such as `AGND` and `DGND` (this is common in high-frequency circuits).

### Integrated Circuits (U)

Designator(s): `U`

`U` is the designator for integrated circuits. ICs include microcontrollers, liner voltage regulators, op-amps, e.t.c.

Why `U`? One theory is that `U` was the the designator for anything "Unspecified". It makes sense that when ICs first came into use that they would of been labelled as such. The name stuck, and now `U` is used for ICs (and no longer for anything "unspecified"). Another theory is that `U` stood for "Unrepairable"[^ics].

In older schematics you may also see `IC` or `Z` used for integrated circuits.

### Jack (J)

Designator(s): `J`

A jack/socket/female connector. Also defined in IEEE 315 as the least moving part of a connector set (which also includes a plug, `P`).

### Jumper (JP)

Designator(s): `JP`

Jumper or link (L is for inductor, not link). This maybe a simple piece of wire, a physical jumper component, or perhaps a `\(0\Omega\)` resistor).

### Inductor (L)

Designator(s): `L`

`L` is used as a designator for inductors. This is probably in honour of the physicist Heinrich Lenz who was a pioneer in the discovery of electromagnetism (and because `I` is commonly used to represent current).

### Motor (M)

Designator(s): `M`

Motor

### Mechanical Part (MP)

Designator(s): `MP`

A mechanical part. This is an umbrella term for many different things, such as screws, standoffs, brackets, e.t.c.

### Plug (P)

Designator(s): `P`

A plug/male connector. Also defined in IEEE 315 as the most moving part of a connector set (which also includes a jack, `J`).

### Photovoltaics/Solar Panels (PV)

Designator(s): `PV`

`PV` is the designator for photo-voltaics (aka solar panels).</td>

### Resistors (R, VR)

Sometimes you will see `LDR` for light-dependent resistors.

Designator(s):
* `R`: Standard 2-pin resistors
* `RN`: Resistor networks (more than one resistor in the same package, sometimes sharing a common connection).
* `VR`: Variable resistors (aka potentiometers)

{{< img src="variable-resistor-potentiometer-schematic-symbol.png" caption="The schematic symbol for a variable resistor (potentiometer)." width="200px" >}}

### Switches (S, SW)

Designator(s): `S`

`S` is the designator used for a switch. `SW` is also commonly used. Sometimes you will see switches labelled according to their type (e.g. `PB` for push-button switches, `DPDT` for double-pole double-throw switches), **but this is not recommended**.

### Spark Gap (SG)

Designator(s): `SG`

{{< img src="spark-gap-schematic-symbol-triangular-200um-no-bom.png" caption="A schematic symbol for a spark gap. This spark gap is created with two triangles of copper on the PCB, with a gap of 200um between them. As this is made purely from the PCB, there is no BOM component needed." width="200px" >}}

Spark gap.

### Transformer (T)

Designators: `T`

`T` is the designator used for transformers.

### Transistors (Q)

Designator(s): `Q`

{{< img src="n-channel-mosfet-schematic-symbol.png" caption="The schematic symbol for an N-channel MOSFET." width="200px" >}}
{{< img src="p-channel-mosfet-schematic-symbol.png" caption="The schematic symbol for a P-channel MOSFET." width="200px" >}}

`Q` is the designator used for transistors (BJTs, MOSFETs, JFETs, e.t.c). Sometimes `Q` is also used for an integrated circuit, but I prefer using `U`.

### Test Point (TP)

Designator(s): `TP`

Test point. These may be physical components on the PCB, or just places of exposed copper (e.g. pads, holes or vias).</td>

### Wire/Cable (W)

Designator(s): `W`

Wire/cable.

### Crystals/Oscillators (XC, XTAL, Y)

Designator(s): `XC` 

{{< img src="crystal-schematic-symbol.png" caption="The schematic symbol for a crystal." width="200px" >}}

Timing crystals. XTAL or Y are also used.

## Regex

The regex pattern to match any valid component designator, which is one or more capital letters followed by one or more numerals, is:

```text
^[A-Z][A-Z]*[0-9][0-9]*$
```

The above pattern also contains the start and end-of-line anchors `^` and `$`, to enforce that there is no text before or after the designator. These can be removed if desired. More on using regex with component designators can be found on the [Altium Scripting page](/electronics/general/altium/altium-scripting-and-using-the-api).

## References

[^ics]: https://electronics.stackexchange.com/questions/25655/why-is-u-used-for-ics-on-circuit-diagrams, fetched on 2019-05-03.
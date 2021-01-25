---
author: "gbmhunter"
categories: [ "Electronics", "Circuit Design" ]
date: 2011-09-03
description: "A list of the most popular component designators used on schematics and PCB silkscreens."
draft: false
lastmod: 2021-01-25
tags: [ "electronics", "circuit design", "components", "designators", "engineering", "symbols", "PCBs", "silkscreen", "IEEE 315", "schematics", "prefix" ]
title: "Component Designators"
type: "page"
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

Recommended designator(s):

* `ANT`

Recommended schematic symbols(s):

<div class="hbox">
  {{< img src="antenna-schematic-symbol.png" caption="A schematic symbol for an antenna." width="100px" >}}
  {{< img src="antenna-schematic-symbol-2.png" caption="Another schematic symbol for an antenna." width="100px" >}}
</div>

### Assemblies (A)

Separate assembly or sub-assembly (e.g. daughter board). I do not see this designator used much in practice (and I myself have never used it, for things such as GPS modules with an LGA footprint I have always used the designator U).

Recommended designator(s):

* `A`

### Batteries (BT)

The designator `BT` is commonly used for a battery. The schematic symbol shown below is typical for a battery, although sometimes the distinction between a single-celled and multi-celled battery is made. If the battery is single-celled, this can be represented by a symbol with only one pair of long/short lines (representing the two electrodes of the cell). If the battery is multi-celled, two pairs of long/short lines with a dotted line connecting them (representing many plates) can be used. I prefer to just use the below symbol for any battery type.

Recommended designator(s):

* `BT`

Recommended schematic symbol(s):

{{< img src="battery-schematic-symbol-bt1.png" width="200px" caption="The schematic symbol for a battery." >}}

### Capacitors \(C)

`C` is the recommended designator for capacitors (both polarised and non-polarised). Sometimes you will see `VC` used for a variable capacitor (these are not common). I recommend using two different schematic symbols, flat plates for a non-polarised capacitor, and one plate which is curved for a polarised capacitor.

Recommended designator(s):

* `C`

Recommended schematic symbol(s):

<div class="hbox">
  {{% img src="non-polarised-capacitor-schematic-symbol.png" caption="The schematic symbol for a non-polarised capacitor." width="200px" %}}
  {{% img src="polarised-capacitor-schematic-symbol.png" caption="The schematic symbol for a polarised capacitor." width="200px" %}}
</div>

### Diodes (D)

The designator `D` can be used for most diodes. Sometimes `Z` is used for a Zener diode, and `LED` for a light-emitting diode, however TVS, Schottky and general purpose diodes are still just `D`.

Recommended designator(s):

* `D`

Recommended symbol(s):

<div class="hbox">
  {{< img src="diode-general-purpose-d1-schematic-symbol.png" caption="The recommended schematic symbol for an general purpose diode." width="200px" >}}
  {{< img src="diode-led-d1-schematic-symbol.png" caption="The recommended schematic symbol for an LED." width="200px" >}}
  {{< img src="diode-zener-d1-schematic-symbol.png" caption="The recommended schematic symbol for a Zener diode." width="200px" >}}
</div>

### Fuse/Fuse Holders (F, XF)

`F` is the designator used for fuses (wired, electrical, e.t.c). `XF` is commonly used for a fuse holder.

Recommended designator(s):

* `F` (fuse)
* `XF` (fuse holder)

Recommended symbol(s):

{{< img src="fuse-schematic-symbol-f1.png" width="200px" >}}

### Ferrite Beads (FB, FEB)

`FB` is the designator used for ferrite beads. Sometimes the designator `FEB` is used instead. To learn more, see the {{% link text="Ferrite Beads page" src="/electronics/components/ferrite-beads" %}}.

Recommended designator(s):

* `FB`

Recommended schematic symbol(s):

{{< img src="ferrite-bead-schematic-symbol.png" caption="The schematic symbol for a ferrite bead." width="200px" >}}

### Fiducials (FID)

Recommended designator(s):

* `FID`

Recommended schematic symbol(s):

{{< img src="fiducial-schematic-symbol.png" caption="The schematic symbol for a fiducial." width="200px" >}}


### Ground (GND, AGND, DGND)

Sometimes `GND` is used for all ground points, and sometimes grounds are split based on noise boundaries such as `AGND` and `DGND` (this is common in high-frequency circuits).

Recommended designator(s):

* `GND`: For general purpose use.
* `AGND`: Specialised analogue ground.
* `DGND`: Specialised digital ground.

Recommended schematic symbol(s):

<div class="hbox">
  {{< img src="general-common-ground-schematic-symbol.png" caption="The schematic symbol for a general or common ground." width="200px" >}}
  {{< img src="ground-analogue.png" caption="The schematic symbol for analogue ground (AGND)." width="200px" >}}
  {{< img src="digital-ground-schematic-symbol.png" caption="The schematic symbol for digital ground (DGND)." width="200px" >}}
</div>

### Integrated Circuits (U)

`U` is the designator for integrated circuits. ICs include microcontrollers, liner voltage regulators, op-amps, e.t.c.

Why `U`? One theory is that `U` was the the designator for anything "Unspecified". It makes sense that when ICs first came into use that they would of been labelled as such. The name stuck, and now `U` is used for ICs (and no longer for anything "unspecified"). Another theory is that `U` stood for "Unrepairable"[^ics].

In older schematics you may also see `IC` or `Z` used for integrated circuits.

Recommended designator(s):

* `U`

Recommended schematic symbol(s):

{{< img src="integrated-circuit-schematic-symbol-u1.png" width="200px" caption="Recommended schematic symbol for an integrated circuit (IC)." >}}

### Jack (J)

A jack/socket/female connector. Also defined in IEEE 315 as the least moving part of a connector set (which also includes a plug, `P`).

Recommended designator(s):

* `J`

### Jumper (JP)

Jumper or link (L is for inductor, not link). This maybe a simple piece of wire, a physical jumper component, or perhaps a `\(0\Omega\)` resistor).

Recommended designator(s):

* `JP`

### Inductor (L)

`L` is used as a designator for inductors. This is probably in honour of the physicist Heinrich Lenz who was a pioneer in the discovery of electromagnetism (and because `I` is commonly used to represent current).

Recommended designator(s):

* `L`

### Motor (M)

Recommended designator(s):

* `M`

### Mechanical Part (MP)

A mechanical part. This is an umbrella term for many different things, such as screws, standoffs, brackets, e.t.c.

Recommended designator(s):

* `MP`

### Plug (P)

A plug/male connector. Also defined in IEEE 315 as the most moving part of a connector set (which also includes a jack, `J`).

Recommended designator(s):

* `P`

### Photovoltaics/Solar Panels (PV)

`PV` is the designator for photovoltaics (aka solar panels).

Recommended designator(s):

* `PV`

### Resistors (R, VR)

Sometimes you will see `LDR` for light-dependent resistors. For more info see the {{< link text="Resistors page" src="/electronics/components/resistors" >}}

Recommended designator(s):

* `R`: Standard 2-pin resistors
* `RN`: Resistor networks (more than one resistor in the same package, sometimes sharing a common connection).
* `VR`: Variable resistors (aka potentiometers or rheostats). I have seen the reverse, `RV` is use before, along with `POT`. 

Recommended schematic symbol(s):

<div class="hbox">
{{< img src="resistor-schematic-symbol-r1.png" caption="The schematic symbol for a standard resistor." width="200px" >}}

{{< img src="variable-resistor-potentiometer-schematic-symbol.png" caption="The schematic symbol for a variable resistor (potentiometer)." width="200px" >}}
</div>

### Switches (S, SW)

`S` is the designator used for a switch. `SW` is also commonly used. Sometimes you will see switches labelled according to their type (e.g. `PB` for push-button switches, `DPDT` for double-pole double-throw switches), **but this is not recommended**.

Recommended designator(s):

* `S`

### Spark Gap (SG)

Recommended designator(s):

* `SG`

Recommended schematic symbol(s):

{{< img src="spark-gap-schematic-symbol-triangular-200um-no-bom.png" caption="A schematic symbol for a spark gap. This spark gap is created with two triangles of copper on the PCB, with a gap of 200um between them. As this is made purely from the PCB, there is no BOM component needed." width="200px" >}}

### Transformer (T)

`T` is the designator used for transformers.

Recommended designator(s):

* `T`

### Transistors (Q)

`Q` is the designator used for transistors (BJTs, MOSFETs, JFETs, e.t.c). Sometimes `Q` is also used for an integrated circuit, but I prefer using `U`.

Recommended designator(s):

* `Q`

Recommended schematic symbol(s):

<div class="hbox">
  {{< img src="n-channel-mosfet-schematic-symbol.png" caption="The schematic symbol for an N-channel MOSFET." width="200px" >}}
  {{< img src="p-channel-mosfet-schematic-symbol.png" caption="The schematic symbol for a P-channel MOSFET." width="200px" >}}
</div>

### Test Point (TP)

Test point. These may be physical components on the PCB, or just places of exposed copper (e.g. pads, holes or vias).</td>

Recommended designator(s):

* `TP`

### Wire/Cable (W)

Wire/cable.

Recommended designator(s):

* `W`

### Crystals/Oscillators (XC, XTAL, Y)

Timing crystals. XTAL or Y are also used.

Recommended designator(s):

* `XC` 

Recommended schematic symbols:

{{< img src="crystal-schematic-symbol.png" caption="The schematic symbol for a crystal." width="200px" >}}

## Regex

The regex pattern to match any valid component designator, which is one or more capital letters followed by one or more numerals, is:

```text
^[A-Z][A-Z]*[0-9][0-9]*$
```

The above pattern also contains the start and end-of-line anchors `^` and `$`, to enforce that there is no text before or after the designator. These can be removed if desired. More on using regex with component designators can be found on the [Altium Scripting page](/electronics/general/altium/altium-scripting-and-using-the-api).

## References

[^ics]: https://electronics.stackexchange.com/questions/25655/why-is-u-used-for-ics-on-circuit-diagrams, fetched on 2019-05-03.
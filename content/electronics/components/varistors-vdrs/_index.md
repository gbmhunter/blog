---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Electronic Components" ]
date: 2015-11-23
draft: false
lastmod: 2021-07-09
tags: [ electronics, components, varistors, resistors, VDRs, MOVs, ESD, schematic symbols, surge current, energy rating ]
title: "Varistors (VDRs)"
type: "page"
---

## Overview

A _varistor_ (also known as a voltage-dependent resistor, VDR) is an electrical component whose resistance depends on the applied voltage. As the voltage increases, the resistance of a varistor drops. Their voltage-resistance behaviour is similar to that of a diode, except a varistor exhibits this behaviour with voltages of both polarities (where diodes are a one-way device).

They can also be called MOVs, but is strictly a type of varistor named after it's inclusion of a metal-oxide chemical. Older, silicon carbon (SiC) based varistors are not MOVs, whilst newer zinc oxides (ZnO) ones are. 

They are commonly used as a form of circuit-protection against voltage transients, especially in mains and other high voltage applications. For more information about their use for ESD protection, see the [ESD Protection page](/electronics/circuit-design/esd-protection/).

Because their resistance in not fixed, they are called _non-Ohmic devices_.

## Schematic Symbol and Designators

{{% figure src="varistor-symbol-mov.svg" width="200px" caption="The schematic symbol for a varistor (a.k.a. voltage-dependent resistor, VDR)." %}}

Common designators used for varistors:

* `RV` (my preferred choice)
* `MV`
* `MOV`

## How They Work

Zinc oxide varistors are made from a sintered matrix of zinc oxide (ZnO) grains. The grain boundaries behave very similar to semiconductor PN junction. Because the grains are randomly orientated and positioned throughout the varistor, the whole structure can be compared a huge network of diodes connected in various series and parallel configurations (and random polarities)[^bib-eepower].

In the "normal" varistor region of operation (above the leakage current region and below the upturn region), the voltage and current through the varistor is approximated well by the following equation[^bib-lf-theory]:

<p>\begin{align}
I = kV^\alpha
\end{align}</p>

<p class="centered">
where:<br/>
\(I\) is the current, in Amps \(A\)<br/>
\(k\) is a constant<br/>
\(V\) is the varistor voltage, in Volts \(V\)<br/>
\(\alpha\) is a device specific constant (more on this below)<br/>
</p>

`\(\alpha\)` is a "figure of merit" and device specific. The higher the `\(\alpha\)` for more non-linear the varistor, and the better it performs as a voltage clamp. It has a very strong relationship to the composition of the device, and can be somewhat generalized by device makeup:


| Composition | `\(\alpha\)`
|-------------|---------------
| SiC (silicon carbide) | 3-7
| ZnO (zinc oxide) | 20-50

Varistors degrade when they are subjected to repeated surges.

## Important Parameters

### Varistor Voltage

This is the voltage at which the varistor starts to "conduct". The varistor is considered conducting when the current through it exceeds some small threshold amperage (typically 1mA).

### Surge Current

The surge current rating is an indication of how much current the varistor can withstand during a voltage transient event.

### Energy Rating

Typically a one-off (non-repetitive) and repetitive pulse energy rating is given for the varistor. The ratings are normally given for standardised transients, such as the 8/10 or 10/1000.

## Comparison With Other Forms Of Circuit Protection

Varistors are preferred over TVS diodes when the product is price-sensitive, higher surge energy absorption is required, when physical space is not a constraint, or when high operating voltage capability is required.

## References

[^bib-lf-theory]:  Littelfuse. (1999, July). _Littelfuse Varistors - Basic Properties,
Terminology and Theory_. Retrieved 2021-07-11, from https://www.littelfuse.com/~/media/electronics_technical/application_notes/varistors/littelfuse_varistors_basic_properties_terminology_and_theory_application_note.pdf
[^bib-eepower]:  EEPower. _Chapter 3 - Resistor types: Varistor_. Retrieved 2021-07-11, from https://eepower.com/resistor-guide/resistor-types/varistor/#

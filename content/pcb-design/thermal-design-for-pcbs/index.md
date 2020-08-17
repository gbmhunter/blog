---
author: "gbmhunter"
categories: [ "PCB Design" ]
date: 2020-08-10
description: "The resistance model, a via thermal resistance calculator and more info on thermal design for PCBs."
draft: false
lastmod: 2020-08-11
tags: [ "PCB design", "thermal design", "junction", "ambient", "temperature", "power dissipation", "resistor model", "thermal resistance", "thermal conductivity", "vias", "calculator" ]
title: "Thermal Design For PCBs"
type: "page"
---

## Overview

The resistor model is commonly used to calculate basic PCB operating temperatures.

## The Thermal Resistor Model

Just like resistance is defined via Ohm's law as `\( R = \frac{V}{I} \)`, thermal resistance is defined as:

<p>$$ \theta = \frac{\Delta T}{P} $$</p>

<p class="centered">
  where:<br>
  \( \theta \) is the thermal resistance, in \( °C/W \) <br>
  \( \Delta T \) is the difference in temperature, in \(°C\)<br>
  \( P \) is the power dissipation, in \( W \)
</p>

When talking about thermal resistances, a resistor symbol is used to indicate the fixed thermal resistance of a component or piece of hardware, between two points or two surfaces. The difference in temperature is analogous to the voltage drop across a resistor, and the power dissipation is analogous to the current through the resistor. 

{{% figure src="basic-thermal-resistance-principle.svg" width="300px" caption="The basic principle behind thermal resistance. Note the similarity to Ohm's law." %}}

When looking through component datasheets, one of the most common thermal resistances is the _junction-to-ambient_ thermal resistance. This value is defined as:

<p>$$ \theta_{JA} = \frac{T_J - T_A}{P} $$</p>

<p class="centered">
  where:<br>
  \( T_J \) is the temperature at the junction (the silicon die) inside the IC, in °C<br>
  \( T_A \) is the ambient temperature (temperature of air/environment PCB is in), in °C<br>
  \( P \) is the power dissipation of the IC
</p>

However, **you have to be vigilant with specified junction-to-ambient values as they are not just a property of the component package**, but also of the PCB! When specified on a datasheet it is usually tested on a JEDEC standardized PCB and package land pattern.

A much more useful thermal resistance in a components datasheet is the _junction-to-case_ thermal resistance. This is usually specified as `\( \theta_{JC} \)`. This typically represents the thermal resistance from the junction to the place on the PCB where the component is soldered. You can then take into account your PCB layout and estimate a _case-to-ambient_ thermal resistance.

{{% figure src="ic-temperature-diagram-with-junction-case-ambient.svg" width="800px" caption="A diagram of the different temperature points used when defining thermal resistances for ICs mounted on PCBs." %}}

Your case-to-ambient thermal resistance can be added to the manufacturer-specified junction-to-case thermal resistance to get the total junction-to-ambient resistance using simple addition:

<p>$$ \theta_{JA} = \theta_{JC} + \theta_{CA} $$</p>

## The Thermal Resistance Of A Via

Thermal vias are a very common way of dissipating heat away from an IC or other component. They are normally placed in and around the thermal pad of a component package. However, via-in-pads cause solder wicking issue. During the soldering process, both gravity and surface tension can push molten solder down the barrel of a via, sucking solder away from the pad. This can leave a pad which is under-soldered and a dry joint. Unfortunately, you cannot even rely on the solder wicking to completely "plug" a via, which would be advantageous in certain circumstances (it would decrease the thermal resistance of the vias). Instead, the via barrel typically only gets partially filled and has "voids" of air.

There are a few ways to prevent wicking:

* 0.3mm or smaller via diameter limits the amount of solder wicking that will occur.

Adding more thermal vias is a case of dimensioning returns, due to the limited spreading of the heat in the horizontal direction.

## What Is Thermal Conductivity?

_Thermal conductivity_ is a property of a material which describes it's ability to conduct heat. Materials with a high thermal conductivity conduct heat well, and materials with a low thermal conductivity conduct heat poorly (they are called _thermal insulators_). The symbol `\( \lambda \)` (_lambda_) is typically used to represent thermal conductivity.

_Thermal resistance_ is just the inverse (reciprocal) of thermal conductivity. **However, care has to be taken to distinguish between the two types of thermal resistances.**

1. There is the thermal resistance which is the inverse of thermal conductivity, and is a property of the material, irrespective of it's shape, length, size, e.t.c. It has units `\( m \cdot K \cdot W^{-1} \)`.
1. The thermal resistance used when talking about the thermal resistance of a via, copper plane, PCB, e.t.c. This value takes into account both the material and it's shape/length/size. This has units `\( °C \cdot W^{-1} \)`. This is the thermal resistance mentioned on component datasheets. 

<p></p>

For most metals, a thermal conductivity is specified, typically in the SI units `\( W \cdot m^{-1} \cdot K^{-1} \)` (Watts per meter-Kelvin). It is typically written as `\( W/mK \)`, but **remember that the `\(m\)` is for meters, not milli-Kelvin**!

Below are the thermal conductivities for common PCB materials:

<table>
  <thead>
    <tr><th>Material</th> <th>Thermal Conductivity (\(W \cdot m^{-1} \cdot K^{-1}) \)</th></tr>
  </thead>
  <tbody>
    <tr><td>Aluminium</td>  <td>205</td></tr>
    <tr><td>Copper</td>     <td>401</td></tr>
    <tr><td>FR-4</td>       <td>0.29 (through-plane), 0.81 (across-plane)</td></tr>
    <tr><td>Gold</td>       <td>314</td></tr>
    <tr><td>Silver</td>     <td>406</td></tr>
  </tbody>
</table>

Most of these values were obtained from <http://hyperphysics.phy-astr.gsu.edu/hbase/Tables/thrcn.html>[^hyperphysics-thermal-conductivity].

Non-uniform materials such as FR-4 (which is a glass epoxy) have different thermal conductivities in the through-plane and across-plane directions.

### Via Thermal Resistance Calculator

<iframe src="https://calc-mbedded-ninja.gbmhunter.now.sh/calculators/via-thermal-resistance" style="width: 800px; height: 800px; border: 0;"></iframe>

## Copper Planes

(2oz.) copper is recommended for top and bottom layers.

## References

[^ti-an-2020-thermal-design-by-insight]: <https://www.ti.com/lit/an/snva419c/snva419c.pdf>. Visited 2020-08-10.
[^hyperphysics-thermal-conductivity]: <http://hyperphysics.phy-astr.gsu.edu/hbase/Tables/thrcn.html>. Visited 2020-08-10.
[^cree-optimizing-pcb-thermal-performance]: <https://www.cree.com/led-components/media/documents/XLamp_PCB_Thermal.pdf>. Visited 2020-08-10.
---
author: "gbmhunter"
categories: [ "PCB Design" ]
date: 2020-08-10
description: "Thermal conductivity, the resistance model, TIMs, a via thermal resistance calculator and more info on thermal design for PCBs."
draft: false
lastmod: 2020-08-17
tags: [ "PCB design", "thermal design", "junction", "ambient", "temperature", "power dissipation", "resistor model", "thermal resistance", "thermal conductivity", "vias", "calculator", "specific thermal conductance", "specific thermal resistance", "absolute thermal conductance", "absolute thermal resistance", "thermal interface material", "TIM" ]
title: "Thermal Design For PCBs"
type: "page"
---

## Overview

The resistor model is commonly used to calculate basic PCB operating temperatures.

## What Is Thermal Conductivity?

### Specific Thermal Conductivity

_Specific thermal conductivity_ is a property of a material which describes it's ability to conduct heat. Materials with a high specific thermal conductivity conduct heat well, and materials with a low specific thermal conductivity conduct heat poorly (they are called _thermal insulators_). The symbol `\( \lambda \)` (_lambda_) is typically used to represent specific thermal conductivity.

<p>$$ \lambda = \frac{P \cdot t}{A \cdot \Delta T} $$</p>

<p class="centered">
  where:<br/>
  \( \lambda \) is the specific thermal conductivity in \( W \cdot m^{-1} \cdot K^{-1} \)<br/>
  \( P \) is the power in \(Watts\)<br/>
  \( t \) is the thickness, in \(meters\)<br/>
  \( A \) is the surface area, in \(meters^2\)<br/>
  \( \Delta T \) is the difference in temperature between the hot and cold surfaces in \(Kelvin\)</br>
</p>

_Thermal resistance_ is just the inverse (reciprocal) of thermal conductivity.

### Absolute Thermal Conductivity

Absolute thermal conductance is defined as:

<p>$$ \lambda_A = \frac{P}{A \cdot \Delta T} $$</p>

<p class="centered">
  where:<br/>
  \( \lambda_A \) is the absolute thermal conductivity in \( W \cdot K^{-1} \)<br/>
  \( P \) is the power in \(Watts\)<br/>
  \( A \) is the surface area, in \(meters^2\)<br/>
  \( \Delta T \) is the difference in temperature between the hot and cold surfaces in \(Kelvin\)</br>
</p>

Notice how it is very similar to the formula for _specific thermal conductivity_, except it is missing the thickness `\(t\)`. **Care has to be taken to distinguish between the two types of thermal resistances!** To recap:

1. _Specific thermal conductivity_ is a property of the material, irrespective of it's shape, length, size, e.t.c. It has units `\( W \cdot m^{-1} \cdot K^{-1} \)`. This is what we were talking about above.
1. _Absolute thermal conductivity_ (and _absolute thermal resistance_) is used when talking about the thermal conductance of a via, copper plane, PCB, e.t.c. This value takes into account both the material and it's shape/length/size. This has units `\( W \cdot C^{-1} \)`. **Absolute thermal resistance is the value mentioned on component datasheets.**

**However, both of these thermal conductivities are usually referred to without the "specific" or "absolute" qualifier**, leaving it up to you to work out what is being used based on the context and units. Remember, 99% of the time when a component datasheet mentioned "thermal resistance" they will be talking about "absolute thermal resistance". 

### Temperature Dependence

Thermal conductivity has some dependence on temperature (especially near `\(0 K\)`), however for most materials at common PCB temperatures the thermal conductivity can be considered constant.

For most metals, a specific thermal conductivity is specified, typically in the SI units `\( W \cdot m^{-1} \cdot K^{-1} \)` (Watts per meter-Kelvin). It is typically written as `\( W/mK \)`, but **remember that the `\(m\)` is for meters, not milli-Kelvin**!

Below are the specific thermal conductivities for common PCB materials:

<table>
  <thead>
    <tr><th>Material</th> <th>Specific Thermal Conductivity (\(W \cdot m^{-1} \cdot K^{-1}) \)</th></tr>
  </thead>
  <tbody>
    <tr><td>Air</td>        <td>0.026</td></tr>
    <tr><td>Aluminium</td>  <td>205</td></tr>
    <tr><td>Copper</td>     <td>401</td></tr>
    <tr><td>FR-4</td>       <td>0.29 (through-plane), 0.81 (across-plane)</td></tr>
    <tr><td>Rogers 92ML</td><td>2.0 (through-plane)</td></tr>
    <tr><td>Gold</td>       <td>314</td></tr>
    <tr><td>Silver</td>     <td>406</td></tr>
  </tbody>
</table>

Most of these values were obtained from <http://hyperphysics.phy-astr.gsu.edu/hbase/Tables/thrcn.html>[^hyperphysics-thermal-conductivity].

Non-isotropic materials such as FR-4 (which is a glass epoxy) have different thermal conductivities in the through-plane (Z) and across-plane (XY) directions.

## The Thermal Resistor Model

Remember, thermal resistance is the inverse of thermal conductance. When modelling the thermal properties of PCBs, it is **useful to use thermal resistance instead of conductance as the resistances sum when the materials are in series**, just like resistance values would. We use absolute thermal resistances here as we have taken into account the thickness.

Just like resistance is defined via Ohm's law as `\( R = \frac{V}{I} \)`, thermal resistance (absolute) `\(R_\theta\)` is defined as:

<p>$$ R_{\theta} = \frac{\Delta T}{P} $$</p>

<p class="centered">
  where:<br>
  \( R_\theta \) is the thermal resistance, in \( °C/W \) <br>
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

### Via Thermal Resistance Calculator

<iframe src="https://calc-mbedded-ninja.gbmhunter.now.sh/calculators/via-thermal-resistance" style="width: 800px; height: 800px; border: 0;"></iframe>

## Copper Planes

(2oz.) copper is recommended for top and bottom layers.

## Thermal Interface Material (TIM)

* Thermal grease TIMs: Offers the best thermal conductivity, but can be messy and slow to apply.
* Phase-change TIMs: Have a high thermal conductivity but require significant clamping force for correct operation.
* Adhesive-based TIMs: Have the lowest thermal conductivity but require less clamping force.

## References

[^ti-an-2020-thermal-design-by-insight]: <https://www.ti.com/lit/an/snva419c/snva419c.pdf>. Visited 2020-08-10.
[^hyperphysics-thermal-conductivity]: <http://hyperphysics.phy-astr.gsu.edu/hbase/Tables/thrcn.html>. Visited 2020-08-10.
[^cree-optimizing-pcb-thermal-performance]: <https://www.cree.com/led-components/media/documents/XLamp_PCB_Thermal.pdf>. Visited 2020-08-10.
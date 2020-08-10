---
author: "gbmhunter"
categories: [ "PCB Design" ]
date: 2020-08-20
draft: false
lastmod: 2020-08-10
tags: [ "PCB design", "thermal design", "junction", "ambient", "temperature", "power dissipation", "resistor model", "thermal resistance", "thermal conductivity", "vias" ]
title: "Thermal Design For PCBs"
type: "page"
---

## Overview

The resistor model is commonly used to calculate basic PCB operating temperatures.

## The Resistor Model

Just like resistance is defined via Ohm's law as `\( R = \frac{V}{I} \)`, thermal resistance is defined as:

<p>$$ \theta = \frac{\Delta T}{P} $$</p>

<p class="centered">
  where:<br>
  \( \theta \) is the thermal resistance, in \( °C/W \) <br>
  \( \Delta T \) is the difference in temperature, in \(°C\)<br>
  \( P \) is the power dissipation, in \( W \)
</p>

One of the most common thermal resistances is the **junction-to-ambient thermal resistance**. This can be calculated with:

<p>$$ \theta_{JA} = \frac{T_J - T_A}{P} $$</p>

## The Thermal Resistance Of A Via

For most metals, a thermal conductivity is specified, typically in the SI units `\( W \cdot m^{-1} \cdot K^{-1} \)` (Watts per meter-Kelvin). It is typically written as `\( W/mk \)`, but remember that the `\(m\)` is for meters, not milli-Kelvin!

Below are the thermal conductivities for common PCB materials:

<table>
  <thead>
    <tr><th>Material</th> <th>Thermal Conductivity \(W \cdot m^{-1} \cdot K^{-1} \)</th></tr>
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

## References

[^ti-an-2020-thermal-design-by-insight]: <https://www.ti.com/lit/an/snva419c/snva419c.pdf>. Visited 2020-08-10.
[^hyperphysics-thermal-conductivity]: <http://hyperphysics.phy-astr.gsu.edu/hbase/Tables/thrcn.html>. Visited 2020-08-10.
[^cree-optimizing-pcb-thermal-performance]: <https://www.cree.com/led-components/media/documents/XLamp_PCB_Thermal.pdf>. Visited 2020-08-10.
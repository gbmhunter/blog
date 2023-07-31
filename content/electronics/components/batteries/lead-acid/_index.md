---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Electronic Components ]
date: 2011-09-05
draft: false
lastmod: 2023-07-31
title: Lead-Acid Batteries
type: page
---

## Overview

Lead-acid batteries are the oldest form of rechargeable battery, invented in 1859.

## General Characteristics

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Value</th>
        </tr>
    </thead>
  <tbody>
    <tr>
      <td>Specific Energy</td>
      <td>30-40Wh/kg</td>
    </tr>
    <tr>
      <td>Specific Power</td>
      <td>180W/kg</td>
    </tr>
    <tr>
      <td>Common Battery Voltages</td>
      <td>6V, 12V</td>
    </tr>
    <tr>
      <td>Nominal Cell Voltage</td>
      <td>2.105V</td>
    </tr>
  </tbody>
</table>

## Chemistries

### VRLA (Valve Regulated Lead Acid)

VRLA batteries do not suffer the same amount of water loss as a traditional lead-acid battery and therefore are very low maintenance. They are sometimes called 'sealed lead-acid' batteries, but in reality they have a small pressure valve for safety. Because of the tight containment, VRLA's can stored and used in any position since they do not spill their electrolyte when turned upside down. Being called 'Valve Regulated' does not describe their technology perfectly. The real reason they don't suffer from much water loss is that the oxygen evolved at the positive plate largely recombined with the hydrogen at the negative plates, reproducing the water it originated from.

### AGM (Absorbed Glass Mat) VRLA

A subcategory of a VRLA, the AGM battery contains thinly woven fibreglass mats in which electrolyte is absorbed. The glass mats are slightly 'starved', meaning a few percent of the electrolyte is wrung out after immersion before it is built into the battery, leading to this technology also being called 'starved mat'. The plates remain the same, except the

### Gel Cell VRLA

As the name implies, a gel cell battery contains a gelled electrolyte. This is made by dissolving silica fume into sulphuric acid. The gel prevents evaporation and leakage of the electrolyte. The pressure valve keeps the internal pressure high enough to allow total recombination of the hydrogen and oxygen back into water.

### Charging

It is recommended to charge a lead-acid at C/10 or less. There are three different ways to charge a lead-acid battery. The best chargers incorporate all three in a multi-stage configuration.

### No-Repetitive Charging

Non-repetitive charging of lead-acids allows you to charge it to a higher voltage than with repetitive charging (float charging). The battery can be charged to 2.4V per cell. Charging should be terminated when the current (in Amps) drops to 0.02C (where C is the Amp-hour rating of the battery, but to all those concerned that the unit don't match up, ignore the hour bit when doing this calculation).

{{% figure src="lead-acid-charging-showing-voltage-and-current.jpg" width="600px" caption="Monitoring the voltage and current is important while charging a lead-acid battery." %}}

The table below shows a list of common lead-acid battery voltages and the voltage you should charge them to, based on a charge voltage 2.4V per cell and an ambient temperature of 25C.

<table>
    <thead>
        <tr>
            <th>Nominal Voltage (V)</th>
            <th>Voltage To Charge To (V)</th>
        </tr>
    </thead>
<tbody >
<tr>
<td>6.0</td>
<td>7.2</td>
</tr>
<tr>
<td>12.0</td>
<td>14.4</td>
</tr>
</tbody>
</table>

{{% figure src="charging-a-lead-acid.jpg" width="800px" caption="Charging a 12V, 6Ah lead-acid battery with a variable-voltage power supply." %}}

### Float Charging

Float charging is charging at a fixed voltage for an indefinite amount of time. Float charging has no time limit and when done properly does not damage the battery. It allows the battery to be fully charged up to its maximum. The voltage to charge at (called the float voltage) is dependent on temperature and lead-acid technology.

## Lifetime

The lifetime of a lead-acid battery is affected by:

* The charging/discharging regime the battery has experienced during its life
* The depth of discharge
* The exposure to long period's with the battery being only partially charged (causing sulphation)
* The average temperature of the battery over its life

## Sulphation

Sulphation occurs when the battery is left in a partially charged state for an extended period of time.

## Equalization

It's an obvious statement that not every cell in a lead-acid battery would be exactly equal. Because of this, they lose/gain slightly different amounts of charge when in use. This fact becomes more predominant with time and more cycles of charging. At some point, the cells can become so imbalanced that the performance of the battery is severely affected.

To 're-equalize' the batteries, the standard practise is to fully charge the battery to 2.4V/cell, and then keep charging at 0.02C until the voltage does not rise anymore. This brings the charge of the weaker cells in the battery up to the same level as the stronger ones.

This equalization process should not be done often, and only when the performance of the battery is being significantly effected by a charge imbalance in the batteries cells (which is not the easiest thing to work out!).

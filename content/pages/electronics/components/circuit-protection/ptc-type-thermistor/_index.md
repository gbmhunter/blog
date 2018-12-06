---
author: gbmhunter
date: 2016-03-08 04:26:39+00:00
draft: false
title: PTC Type Thermistor
type: page

---

# Overview

A PTC-type thermistor is a resistor whose resistance increases as temperature increases. They are commonly used as a "resettable fuse" in circuit protection applications.

For information on just plain old resistors, see the [Resistors page](/electronics/components/resistors).

# Schematic Symbol And Designator

I prefer to use the designator prefix `\(RT\)` (e.g. `\(RT1\)`) and the following schematic symbol for a PTC-type thermistor. 

{{< figure src="/images/2016/03/positive-temperature-coefficient-ptc-component-schematic-symbol-and-designator.png" width="417px" caption="Schematic symbol and designator for a PTC (positive-temperature co-efficient) thermistor."  >}}

I use the designator prefix `\(RT\)` for thermistors (**R**esistance depends on **T**emperature), while using `\(RV\)` for varistors (**R**esistance depends on **V**oltage).

# Types

## Linear

Linear thermistors are those which have a roughly linear response in resistance to a temperature change. They are also known as _silistors_, as the are normally made with silicon.

## Switching

# PTC Thermistors vs. Fuses

When should a circuit designer use a PTC thermistor, and when should they use a fuse?

The huge point of difference between a PTC thermistor and a fuse is the fact that a **PTC thermistor is resettable, while a fuse is a blow once and replace** component. This makes PTC thermistors suitable for applications where you might expect over-current conditions to occur frequently, and it would be inconvenient for the user to have to continually replace the fuse.

Conversely, this makes fuses better for applications where over-current conditions should not occur at all, and if they do, there is a higher chance of something being dangerous (e.g. live mains wiring that has shorted to the case). In these scenarios it can be safer to highlight the problem to the user and let the user/technician decide whether it is safe to replace the fuse and re-apply power.

One clear **advantage of PTC thermistors is cost** in price-sensitive circuit board designs. As of the year 2016, a cheap SMD fuse in a chip package costs about US$0.40 in quantities of a 100, while a PTC thermistor for the same current rating in a similar SMD chip package costs about US$0.10, 4 times cheaper.

# How To Calculate The Triggered Resistance

Most PTC thermistor datasheets will tell you the nominal off resistance (and/or it's range of values), but not the triggered resistance! However, you can calculate this using the typical power value (`\(P_D\)`) that they provide.

`\(P_D\)` is the typical power dissipated by the device when in a tripped state and in a fixed temperature (usually 23-25°C) still air environment. This is somewhat independent of the voltage applied to the thermistor, due to an increased voltage causing more heating, which in turn increases the resistance, which lowers the current and therefore dissipated. This is a form of negative feedback, and because this dissipated power is independent of the supply voltage, it can be specified as a property of the component on the datasheet.

To calculate the triggered resistance, use the following equation:

<div>$$ R_{triggered} = \frac{V^2}{P_D} $$</div>

<p class="centered">
    where:<br>
    \( R_{triggered} \) is the triggered resistance of the PTC thermistor, in Ohms<br>
    \( V \) is the voltage across the PTC thermistor (usually equal to the open-circuit supply voltage)<br>
    \( P_D \) is the dissipated power of the PTC thermistor when in it's triggered state, as given by it's datasheet><br>
</p>

The triggered resistance should be many orders of magnitude larger than the off resistance.

---
author: "gbmhunter"
categories: [ "Electronics", "Electronic Components", "Diodes" ]
date: 2020-07-08
description: "Info about Zener diodes."
draft: false
lastmod: 2020-07-08
tags: [ "electronics", "electronic components", "diodes", "zener diodes", "zeners" ]
title: "Zener Diodes"
type: "page"
---

## Overview

Zener diodes are diodes which have a specified reverse blocking voltage at which they breakdown and begin to conduct. They are similar to TVS diodes, but generally have a more defined and precise breakdown voltage, but a lower power rating. Also, shunt voltage references are similar in concept to zener diodes, except that they are more precise but can't dissipate as much power.

Uses for zener diodes include:

* Low power/simple voltage reference
* Over-voltage protection for low power applications (use TVS diodes to dissipate high energy voltage spikes)
* To turn on a sub-circuit once a certain voltage level is reached (e.g. an LED in a simple battery charging circuit)

You can purchase Zeners with a reverse voltage drop as low as 1.8V all the way to above 100V. For voltage drops less than 1.8V, you can stack (i.e. place in series) multiple normal or schottky diodes in forward bias.

## Schematic Symbols

{{% img src="zener-diode-schematic-symbol-triangle-outline.png" width="400px" caption="The schematic symbol for a Zener diode." %}}

## How To Read A Zener Diode Datasheet

A zener voltage `\( V_Z \)` is given at a Zener test current `\( I_{ZT} \)`. `\( V_Z \)` is the voltage the Zener regulates to. The test current typically a current large enough to overcome the "knee" in the voltage vs. current curve, and put the Zener into it's "voltage regulation" state (where the voltage stays relatively stable with large changes in current).

## Simple Voltage-Limiting Circuit With A Zener Diode

You can build a simple voltage limiting circuit from a Zener diode, a NPN BJT transistor, and a couple of resistors. The schematic below shows an example of this, used to limit the maximum voltage to the `\(V_{in}\,\)` pin of the ADP8140 LED driver IC.

{{% img src="zener-and-npn-bjt-voltage-limiter-adp8140.png" width="600px" caption="A simple Zener/NPN based voltage limiter circuit for the input to the ADP8140 LED driver IC. Image from https://www.analog.com/media/en/technical-documentation/data-sheets/ADP8140.pdf." %}}

The voltage at `\(V_{in}\,\)` is regulated to approximately `\( V_Z - 0.7V \)`. The current through `\(R_Z\)` is:

<p>$$ I_{RZ} = \frac{V_{CC} - V_Z}{R_Z} $$</p>

For more information, see the {{% link text="ESD Protection" src="/electronics/circuit-design/esd-protection" %}} page.

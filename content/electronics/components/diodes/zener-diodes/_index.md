---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Electronic Components", "Diodes" ]
date: 2011-09-05
description: "Info about diodes."
draft: false
lastmod: 2022-07-16
tags: [ "electronics", "diodes", "components", Zener ]
title: "Zener Diodes"
type: "page"
---

## Overview

Zener diodes are diodes which have a specified reverse blocking voltage at which they breakdown and begin to conduct. They are similar to TVS diodes, but generally have a more defined and precise breakdown voltage, but a lower power rating. The allows Zeners to be used a shunt-style voltage regulators to power small circuits and as such, are sometimes called _voltage regulator diodes_. Shunt voltage references are similar in concept to zener diodes, except that they are more precise but can't dissipate as much power.

Uses for zener diodes include:

* Low power/simple voltage reference
* Over-voltage protection for low power applications (use TVS diodes to dissipate high energy voltage spikes)
* To turn on a sub-circuit once a certain voltage level is reached (e.g. an LED in a simple battery charging circuit)

You can purchase Zeners with a reverse voltage drop as low as \(1.8V\) all the way to above \(100V\). For voltage drops less than 1.8V, you can stack (i.e. place in series) multiple normal or schottky diodes in forward bias.

## Schematic Symbol

{{% figure src="zener-diode-schematic-symbol.svg" width="300" caption="The schematic symbol for a Zener diode." %}}

## How To Read A Zener Diode Datasheet

A zener voltage \( V_Z \) is given at a Zener test current \( I_{ZT} \). \( V_Z \) is the voltage the Zener regulates to. The test current typically a current large enough to overcome the "knee" in the voltage vs. current curve, and put the Zener into it's "voltage regulation" state (where the voltage stays relatively stable with large changes in current).

## Regulation Performance And Dynamic Resistance

Low voltage (1-4V) Zener diodes are notoriously bad at voltage regulation due to their high dynamic resistance compared to their high-voltage siblings.

## Simple Voltage-Limiting Circuit With A Zener Diode

You can build a simple voltage limiting circuit from a Zener diode, a NPN BJT transistor, and a couple of resistors. The schematic below shows an example of this, used to limit the maximum voltage to the \(V_{in}\,\) pin of the ADP8140 LED driver IC.

{{% figure src="zener-and-npn-bjt-voltage-limiter-adp8140.png" width="600" caption="A simple Zener/NPN based voltage limiter circuit for the input to the ADP8140 LED driver IC. Image from https://www.analog.com/media/en/technical-documentation/data-sheets/ADP8140.pdf." %}}

The voltage at \(V_{in}\,\) is regulated to approximately \( V_Z - 0.7V \). The current through \(R_Z\) is:

$$\begin{align}
I_{RZ} = \frac{V_{CC} - V_Z}{R_Z}
\end{align}$$

For more information, see the [ESD Protection](/electronics/circuit-design/esd-protection) page.

## Popular Zener Diodes

### BZX55 Series

The BZX55 series of Zener diodes was (and still is) a popular choice for a standard through-hole Zener diode, provided in the [axial DO-35 package](/pcb-design/component-packages/do-35-do-214ah-component-package/). Manufactured by Vishay. Zener voltages range from 2.4V to 74V with a power dissipation of 500mW[^bib-bzx55-datasheet].

```
         BZX55    B   3V3
Family --|        |   |
Tolerance --------|   |
B=2%, C=5%            |
Zener Voltage --------|
3V3=3.3V, 12=12V
```

## References

[^bib-bzx55-datasheet]:  Vishay (2019, Mar 11). _BZX55 Series Datasheet_. Retrieved 2021-09-25, from https://www.vishay.com/docs/85604/bzx55.pdf.

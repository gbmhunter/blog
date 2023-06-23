---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Circuit Design" ]
date: 2022-01-17
draft: false
images: [ "/electronics/circuit-design/wheatstone-bridges/basic-schematic-of-wheatstone-bridge.png" ]
lastmod: 2022-02-05
tags: [ "electronics", "Wheatstone bridges" ]
title: "Wheatstone Bridges"
type: "page"
---

{{% warning-is-notes %}}

## Overview

The _Wheatstone bridge_ (a.k.a. _resistance bridge_) is a circuit consisting of four resistive components. It has the benefit of being able to perform accurate measurements of resistance. The below image shows the basic schematic:

{{% figure src="basic-schematic-of-wheatstone-bridge.png" width="400px" caption="The basic schematic of a Wheatstone bridge (resistance bridge)." %}}

`\(Eq.\ \ref{eq-wheatstone-general}\)` is the general equation for the Wheatstone bridge.

<p>\begin{align}
\label{eq-wheatstone-general}
V_{OUT} = V_{DC} \left( \frac{R2}{R1 + R2} - \frac{R4}{R3 + R4} \right)
\end{align}</p>

The output voltage (and consequentially, output current) is 0 when both of the "legs" of the bridge are balanced. That is:

<p>\begin{align}
V_{OUT} = 0 \quad \text{if} \quad \frac{R2}{R1} = \frac{R4}{R3}
\end{align}</p>

The traditional use is to replace the bottom resistors on both legs of the Wheatstone bridge -- one leg with a variable resistor (rheostat or potentiometer) and the other with an unknown resistance which you want to measure. The variable resistor is adjusted until the output voltage (or current) is `\(0\)`. Assuming you know the resistance of the rheostat, you can calculate the resistance of `\(R_x\)`.

{{% figure src="pot-and-unknown-resistance-wheatstone-bridge.png" width="400px" caption="Traditional use of the Wheatstone bridge. The bottom resistor on one leg is replaced with a rheostat (`\(R2\)`), and the other bottom resistor with the unknown resistance `\(R_x\)`. Adjusting the rheostat until the output voltage (or current) is 0 \"balances\" the bridge, and the unknown resistance can be found knowing the other three." %}}

In the scenario shown above, the unknown resistance `\(R_x\)` can be found with:

<p>\begin{align}
R_x = \frac{R2\ R3}{R1}
\end{align}</p>

## Benefits Over A Simple Resistor Divider

You might be wondering why use a complicated 4-resistor Wheatstone bridge when you could just use a simple 2-resistor [resistor divider](/electronics/components/resistors/#_resistor_dividers), and measure the output voltage. By knowing the output voltage, the supply voltage, and at least one of the resistances, you can then calculate the other resistance in a resistor divider. **The benefit of a Wheatstone bridge is that it is inherently a _differential_ measurement**, rather than a _single-ended_ one (which a resistor divider is). This means:

* You don't need a precise auxiliary voltage reference to compare with `\(V_{OUT}\)` if you just plan on balancing the bridge (i.e. making `\(V_{OUT} = 0V\)`). Because it is _ratiometric_, in this case the supply voltage `\(V_{DC}\)` to the bridge is also unimportant.
* Even if you are measuring the output voltage (and hence need an auxiliary voltage reference):
** Environmental effects that effect both legs of the bridge cancel each other out (e.g. temperature-related drift in the resistances)
** The common-mode voltage that a single-ended resistor divider gives you has been removed, hence it is much easier to apply a large gain to a differential Wheatstone output to measure small voltages.

## History

The Wheatstone bridge was invented by Samuel Hunter Christie in 1833, but got it's name from Sir Charles Wheatstone, who improved and popularized the circuit in 1843[^bib-maglab-wheatstone-history].

## Applications

* **Strain gauge measurement:** Metal foil strain gauges change their resistance depending on the strain they are subject to. Measuring the small change in resistance precisely is normally done with a Wheatstone bridge circuit. In this application the bridge is not balanced, but rather the output voltage is then fed into an amplifier and then measured (usually with an [ADC](/electronics/components/analogue-to-digital-converters-adcs/)).
* **Weight-scales:** This is typically done with four load cells (each being a strain gauge), where the four load cells are arranged into a Wheatstone bridge topology.
* **Temperature measurement:** One way of measuring temperature is with a thermistor, a component which changes resistance with temperature.

## References

[^bib-maglab-wheatstone-history]:  National MagLab (2014, Dec 10). _Wheatstone Bridge – 1843_. Retrieved 2022-01-17, from https://nationalmaglab.org/education/magnet-academy/history-of-electricity-magnetism/museum/wheatstone-bridge-1843.
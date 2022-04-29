---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Components ]
date: 2022-04-28
draft: false
lastmod: 2022-04-29
tags: [ resistors, delta, wye, resistor networks ]
title: Delta-Wye Resistor Networks
type: page
---

{{% warning-is-notes %}}

## Overview

The following schematic shows the four common resistor network arrangements. Note that there is only two different connection topologies (those on the left, and those on the right), but there are two different ways of drawing each. The Delta network can be rearranged as the Pi network, and the Wye network rearranged as the Tee network.  

{{% img src="delta-wye-pi-t-networks.png" width="800px" caption="Schematic showing the four common resistor network arrangements: Wye, Delta, Pi and Tee." %}}

{{% note %}}
The Delta and Pi network is the same configuration, just drawn differently (as shown in the above diagram)! Same goes to the Wye and Tee.
{{% /note %}}

With a few equations, you can transform a Delta network into a Wye network, and vise versa. These transformed networks are equivalent, i.e. from an outside observer who can only touch and measure the terminals `\(A\)`, `\(B\)` and `\(C\)`, they wouldn't be able to tell the difference. These transformations are useful for a number of reasons.

## Delta To Wye Transformation

You can convert a Delta network of resistors to an equivalent Wye network with the following equations:

<p>\begin{align}
R_A = \frac{R_{AB}R_{AC}}{R_{AB} + R_{AC} + R_{BC}} \\
R_B = \frac{R_{AB}R_{BC}}{R_{AB} + R_{AC} + R_{BC}} \\
R_C = \frac{R_{AC}R_{BC}}{R_{AB} + R_{AC} + R_{BC}} \\
\end{align}</p>

## Wye To Delta Transformation

You can convert a Wye network of resistors to an equivalent Delta network with the following equations:

<p>\begin{align}
R_{AB} = \frac{R_A R_B + R_A R_C + R_B R_C}{R_C} \\
R_{AC} = \frac{R_A R_B + R_A R_C + R_B R_C}{R_B} \\
R_{BC} = \frac{R_A R_B + R_A R_C + R_B R_C}{R_A} \\
\end{align}</p>

## Resistor Network Example

{{% img src="wheatstone-resistor-network.png" width="400px" caption="What is the current I drawn from the +12V for this resistor network? This can't be solved purely with resistors-in-series and resistors-in-parallel equations, but can be done with the help of a Delta To Wye transformation." %}}

21mA.
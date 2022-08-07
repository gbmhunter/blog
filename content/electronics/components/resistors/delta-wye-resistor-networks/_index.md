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

{{% figure src="delta-wye-pi-t-networks.png" width="800px" caption="Schematic showing the four common resistor network arrangements: Wye, Delta, Pi and Tee." %}}

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

{{% figure src="wheatstone-resistor-network-worked-example-01.png" width="300px" caption="What is the current I drawn from the +12V for this resistor network? This can't be solved purely with resistors-in-series and resistors-in-parallel equations, but can be done with the help of a Delta To Wye transformation." %}}

Let's treat the top three resistors as a Delta network:

{{% figure src="wheatstone-resistor-network-worked-example-02.png" width="300px" caption="We can treat the top three resistors as a Delta network." %}}

Let's now convert this Delta network to a Wye network:

<p>\begin{align}
R_A &= \frac{R_{AB}R_{AC}}{R_{AB} + R_{AC} + R_{BC}} \nonumber \\
    &= \frac{200\Omega \cdot 120\Omega}{200\Omega + 120\Omega + 680\Omega} \nonumber \\
    &= 24.0\Omega \\
R_B &= \frac{R_{AB}R_{BC}}{R_{AB} + R_{AC} + R_{BC}} \nonumber \\
    &= \frac{200\Omega \cdot 680\Omega}{200\Omega + 120\Omega + 680\Omega} \nonumber \\
    &= 136\Omega \\
R_C &= \frac{R_{AC}R_{BC}}{R_{AB} + R_{AC} + R_{BC}} \nonumber \\
    &= \frac{120\Omega \cdot 680\Omega}{200\Omega + 120\Omega + 680\Omega} \nonumber \\
    &= 81.6\Omega \\
\end{align}</p>

{{% figure src="wheatstone-resistor-network-worked-example-03.png" width="300px" caption="The same circuit, but now transformed to a Wye network." %}}

We can now collapse the rest of this circuit down by using the standard resistors-in-series and resistors-in-parallel simplifications:

<p>\begin{align}
R_{LL} &= 24\Omega + 820\Omega \nonumber \\    
       &= 844\Omega \\
R_{LR} &= 81.6\Omega + 180\Omega \nonumber \\    
       &= 262\Omega \\
\end{align}</p>

{{% figure src="wheatstone-resistor-network-worked-example-04.png" width="300px" caption="The two bottom legs simplified." %}}

We can now simplify the two bottom resistors which are in parallel:

<p>\begin{align}
R_{parallel} &= 844\Omega\ ||\ 262\Omega \nonumber \\    
             &= \frac{844\Omega \cdot 262\Omega}{844\Omega + 262\Omega} \nonumber \\
             &= 200\Omega \\
\end{align}</p>

{{% figure src="wheatstone-resistor-network-worked-example-05.png" width="200px" caption="Simplifying the two bottom resistors in parallel into this one resistor." %}}

And then we combine the last two resistors in series into just one resistor:

<p>\begin{align}
R_{single} &= 136\Omega + 200\Omega \nonumber \\             
           &= 336\Omega \\
\end{align}</p>

{{% figure src="wheatstone-resistor-network-worked-example-06.png" width="200px" caption="Simplifying the two remaining resistors in series into just the one resistor." %}}

Now it's a simple task of `\(I = \frac{V}{R} \)`:

<p>\begin{align}
I &= \frac{V}{R} \\
  &= \frac{12V}{336\Omega} \\
  &= 35.7mA
\end{align}</p>

Link to circuitjs simulation: [https://tinyurl.com/y2tu5t2t](https://tinyurl.com/y2tu5t2t)

{{% figure src="circuitjs-sim-of-wheatstone-resistor-network.png" width="200px" caption="Screenshot of this Wheatstone bridge resistor network in a circuitjs simulation." %}}

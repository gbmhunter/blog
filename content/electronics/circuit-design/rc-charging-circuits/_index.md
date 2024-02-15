---
aliases: [ pwm ]
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Circuit Design ]
date: 2012-10-04
draft: false
lastmod: 2012-10-04
tags: [ electronics, circuit design, pulse width modulation, PWM ]
title: RC Charging Circuits
type: page
---

## Overview

_RC charging circuits_ appear in almost all electronic designs in some form or another.

{{% figure ref="fig-basic-rc-schematic" src="_assets/basic-rc-schematic.webp" width="500px" caption="A basic RC charging circuit." %}}

Assuming the capacitor's voltage started at `\(0V\)` at `\(t=0\)`, and a constant supply voltage `\(V_S\)` is applied across the capacitor and resistor, then the capacitors voltage at any time `\(t\)` is:

<p>\begin{align}
\Large{
  V_C = V_S (1 - e^{ \left[ \frac{-t}{RC} \right] })
}
\end{align}</p>

<p class="centered">
where:</br>
\(V_C\) is the voltage across the capacitor, in Volts</br>
\(V_S\) is the supply voltage, in Volts</br>
\(e\) is Euler's number, \(= 2.718...\)</br>
\(t\) is the time, in seconds</br>
\(R\) is the resistance, in Ohms</br>
\(C\) is the capacitance, in Farads</br>
</p>





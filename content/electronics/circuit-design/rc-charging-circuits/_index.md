---
aliases: [ pwm ]
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Circuit Design ]
date: 2024-02-16
draft: false
lastmod: 2024-02-16
tags: [ electronics, circuit design, capacitors, resistors, RC, exponential, charging ]
title: RC Charging Circuits
type: page
---

## Overview

_RC charging circuits_ are circuits which charge a capacitor through a resistor. They appear in almost all electronic designs in some form or another. They are used for things such as simple time delays, primitive oscillators, debouncing, and filtering.

This page looks at how the **RC circuit responds in the time domain**. If you are interested in it's frequency response, see the [Analogue Filters page](/electronics/circuit-design/analogue-filters/).

## The Circuit

{{% figure ref="fig-basic-rc-schematic" src="_assets/basic-rc-schematic.webp" width="500px" caption="A basic RC charging circuit." %}}

Assuming the capacitor's voltage started at `\(0V\)` at `\(t=0\)`, and a constant supply voltage `\(V_S\)` is applied across the capacitor and resistor, then the capacitors voltage at any time `\(t\)` is[^electronics-tutorials-ws-rc-charging-circuit]:

<p>\begin{align}\Large{
V_C = V_S (1 - e^{ \left[ \frac{-t}{RC} \right] })
}\end{align}</p>

<p class="centered">
where:</br>
\(V_C\) is the voltage across the capacitor, in Volts</br>
\(V_S\) is the supply voltage, in Volts</br>
\(e\) is Euler's number, \(= 2.718...\)</br>
\(t\) is the time, in seconds</br>
\(R\) is the resistance, in Ohms</br>
\(C\) is the capacitance, in Farads</br>
</p>

`\(RC\)` can be replaced with a concept called a time constant, where `\(\tau \equiv RC\)`. This gives:

<p>\begin{align}
\Large{
  V_C = V_S (1 - e^{ \left[ \frac{-t}{\tau} \right] })
}
\end{align}</p>

The capacitor voltage with respect to time is shown in {{% ref "fig-rc-charging-plot" %}}. 

{{% figure ref="fig-rc-charging-plot" src="_assets/rc-charging-plot.png" width="700px" caption="A basic RC charging circuit." %}}

{{% aside type="tip" %}}
The Y-axis is just which the equation re-arranged to:

<p>\begin{align}
\frac{V_C}{V_S} = 1 - e^{ \left[ \dfrac{-t}{RC} \right] }
\end{align}</p>

{{% /aside %}}

The capacitors voltage `\(V_C\)` starts of a `\(0V\)` and charges towards `\(V_S\)`. However the charging rate follows an exponential decay, the rate gets slower and slower. Mathematically, the capacitors voltage never reaches `\(V_S\)`. However for most practical purposes you can consider the capacitor "fully-charged" after about 5 _time constants_.

## What is the Time Constant?

The time constant is a way of simplifying the analysis of an RC circuit and lets you think and talk about the circuit in a consistent manner.

<p>\begin{align}
\tau \equiv RC
\end{align}</p>

After 1 time constant (`\(t = 1\tau\)`), then the equation simplifies to:

<p>\begin{align}
\frac{V_C}{V_S} &= 1 - e^{ \left[ \dfrac{-t}{RC} \right] } \\
                &= 1 - e^{ \left[ \dfrac{-1\tau}{\tau} \right] } \\
                &= 1 - e^{ \left[ -1 \right] } \\
                &= 1 - 0.368 \\
                &= 0.632
\end{align}</p>

So you know that at `\(1\tau\)`, your capacitor has charged to 63% of the supply voltage. The beauty of `\(\tau\)` is that you can quickly calculate it for any RC circuit and get a feel for how long it will take to charge (it is also very useful when looking at [RC filters](/electronics/circuit-design/analogue-filters/)). {{% ref "table-tau-and-voltage-levels" %}} shows various time constants and the voltage level on the capacitor at that point.

<table ref="table-tau-and-voltage-levels">
  <thead>
    <tr><td>Time Constant</td>    <td>Voltage as Percentage of Supply</td></tr>
  </thead>
  <tbody>
    <tr><td>1\(\tau\)</td>        <td>63.2%</td></tr>
    <tr><td>2\(\tau\)</td>        <td>86.5%</td></tr>
    <tr><td>3\(\tau\)</td>        <td>95.0%</td></tr>
    <tr><td>4\(\tau\)</td>        <td>98.2%</td></tr>
    <tr><td>5\(\tau\)</td>        <td>99.3%</td></tr>
  </tbody>
</table>

{{% aside type="tip" %}}
The percentages in {{% ref "table-tau-and-voltage-levels" %}} were calculated with:
<p>\begin{align}
\text{perc} = (1 - e^{-\tau}) \times 100
\end{align}</p>
{{% /aside %}}

Note that by 5 time constants, the voltage is at 99.3% of the supply voltage. This is generally considered to be the point at which it is "fully charged".

## References

[^electronics-tutorials-ws-rc-charging-circuit]: Electronics Tutorials. _RC Charging Circuit_. Retrieved 2024-02-16, from https://www.electronics-tutorials.ws/rc/rc_1.html.
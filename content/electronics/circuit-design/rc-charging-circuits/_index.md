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

`\(RC\)` can be replaced with a concept called a time constant, where `\(\tau \equiv RC\)`. This gives:

<p>\begin{align}
\Large{
  V_C = V_S (1 - e^{ \left[ \frac{-t}{\tau} \right] })
}
\end{align}</p>

The capacitor voltage with respect to time is shown in {{% ref "fig-rc-charging-plot" %}}. 

{{% figure ref="fig-rc-charging-plot" src="_assets/rc-charging-plot.png" width="700px" caption="A basic RC charging circuit." %}}

The capacitors voltage `\(V_C\)` starts of a `\(0V\)` and charges towards `\(V_S\)`. However the charging rate follows an exponential decay, the rate gets slower and slower. Mathematically, the capacitors voltage never reaches `\(V_S\)`. However for most practical purposes you can consider the capacitor "fully-charged" after about 5 _time constants_.

## What is the Time Constant?

The time constant is a way of simplifying the analysis of an RC circuit and lets you think and talk about the circuit in a consistent manner.

<p>\begin{align}
\tau \equiv RC
\end{align}</p>

After 1 time constant `\(1\tau\)`, you know that your capacitor has charged to 0.63% of the supply voltage.

<table>
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

The percentages were calculated with:

<p>\begin{align}
\text{perc
} = (1 - e^{-\tau}) \cdot 100
\end{align}</p>


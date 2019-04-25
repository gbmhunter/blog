---
author: "gbmhunter"
categories: [ "Programming" ]
date: 2019-04-23
description: ""
draft: false
lastmod: 2019-04-23
tags: [ "signals", "sinusoidal", "unit-step function", "Heaviside", "exponential", "unit-impulse function", "waveform", "complex numbers" ]
title: "Basic Signal Types"
type: "page"
---

## Overview

This page serves to be a tutorial on the basic types of signals/waveforms you will come across in engineering.

All usages of trigonometric functions such as `\(\sin()\)` and `\(\cos()\)` below assume **angles measured in radians, not degrees**.

This page assumes basic understanding of trigonometry and complex numbers.

## Real Sinusoidal Signals

A real sinusoidal signal has the general form:

<p>$$ f(t) = A \sin ( \omega t + \theta ) $$</p>

<p class="centered">
  where:<br/>
  \(A\), \(\omega\), and \(\theta\) are real numbers
</p>

An example sinusoidal where `\( f(t) = 2\sin(2t + \frac{\pi}{4}) \)` is shown below:

{{% img src="examples-of-basic-sinusoidal-signals.png" width="700px" %}}

{{% note %}}
`\(\sin()\)` in the above equation may be replaced by `\(\cos()\)`, which just shifts everything by `\(\frac{\pi}{2}\)` (`\( \cos(x) = \sin(x + \frac{\pi}{2})  \)`). It is still called a sinusoidal signal.
{{% /note %}}

`\(A\)` controls the amplitude of the signal. A negative number will invert the signal. A value of `\(A = 1\)` will give an amplitude of `\(1\)`. 

`\(\omega\)` controls the period/frequency of the signal. A value of `\(\omega = 1\)` gives a period of `\(2\pi\)`. Doubling `\(\omega\)` doubles the frequency.

`\(\theta\)` controls the offset of the signal along the x-axis. A positive value shift the signal to the left, a negative value shifts the signal to the right.

**Sinusoidal signals normally arise in systems that conserve energy**, such as an ideal mass-spring system (no damper or frictional forces!), or an ideal LC circuit (no resistive losses).

Complex sinusoidal signals are introduced after exponential signals are explained.

## Exponential

The general form for an exponential signal is:

<p>$$ f(t) = Ae^{\lambda t} $$</p>

<p class="centered">
  where:<br/>
  \(A\), \(\lambda\) are complex numbers
</p>

### Real Exponential Signals

Below are some examples of real exponential signals, showing how varying `\(A\)` and `\(\lambda\)` (limited to real numbers only) effect the waveform shape.

{{% img src="examples-of-basic-real-exponential-signals.png" width="700px" %}}

When `\(\lambda > 1\)`, the signal exhibits _exponential growth_ (this typically represents an _unstable_ signal). When `\(\lambda < 1\)`, the signal exhibits _exponential decay_ (this typically represents a _stable_ signal).

### Complex Exponential Signals

If the restriction that `\(A\)` and `\(\lambda\)` must be real numbers is removed from the general form for an exponential signal, and they are now complex numbers, a different class of signals arise.

## Heaviside (Unit-Step) Function

The **Heaviside function**, named after [Oliver Heaviside](https://en.wikipedia.org/wiki/Oliver_Heaviside) (also known as the **unit-step function**) can be defined as:

<p>$$
f(t) =
\begin{cases}
0, & \text{for $t < 0$} \\
1 & \text{for $t > 0$}
\end{cases}
$$</p>

The Heaviside function looks something like the signal below, however the point at `\(H(0)\)` can be drawn in different ways (more on that below):

{{% img src="the-unit-step-function-heaviside.png" width="700px" %}}

### The Different Conventions For H(0)

The value of Heaviside function at 0 (`\(H(t)\)` at `\(t = 0\)`) depends on the implementation or use of the function. The different values are described below. However, it is worth noting that **the value of `\(H(0)\)` is of no importance for most use cases of the Heaviside function**, as it is commonly used as a windowing function in integration (or distribution).

**H(0) = 0**

<p>$$
H(t) =
\begin{cases}
0, & \text{for $t <= 0$} \\
1 & \text{for $t > 0$}
\end{cases}
$$</p>

{{% img src="heaviside-unit-step-function-h0-eq-0" width="500px" %}}


**H(0) = 0.5**

If the convention `\(H(0) = 0.5\)` is used, you might see the Heaviside function defined as:

<p>$$
H(t) =
\begin{cases}
0, & \text{for $t < 0$} \\
\frac{1}{2}, & \text{for $t = 0$} \\
1 & \text{for $t > 0$}
\end{cases}
$$</p>

{{% img src="heaviside-unit-step-function-h0-eq-0p5" width="500px" %}}

**H(0) = 1**

<p>$$
H(t) =
\begin{cases}
0, & \text{for $t < 0$} \\
1 & \text{for $t >= 0$}
\end{cases}
$$</p>

{{% img src="heaviside-unit-step-function-h0-eq-1" width="500px" %}}

`\(H(0) = 1\)` is what ISO 80000-2:2009 uses {{< ref id="ref-iso-80000" >}}. The Haversine function is right-continuous at `\(t = 0\)` but not left continuous.

**H(0) = [0, 1]**

`\(H(0) = [0, 1]\)` is when the Heaviside equals both `\(0\)` and `\(1\)` (a set) at `\(t = 0\)`. This approach is not as common, but is used in optimization and game theory {{< ref id="ref1" >}}.

{{% img src="heaviside-unit-step-function-h0-eq-set-0-1" width="500px" %}}


## Unit Impulse Function

The unit-impulse function is defined as:

<p>$$
f(t) = 0 \text{ for } t \neq 0 \text{ and} \\
\int_{- \infty}^{\infty} f(t) dt = 1
$$</p>

The unit-impulse function is `\(0\)` everywhere except for `\(t = 0\)` where it is infinite.

## References

<ul id="ref-list">
  <li id="ref1"><a href="https://www.quora.com/What-is-the-value-of-the-unit-step-function-at-T-0">https://www.quora.com/What-is-the-value-of-the-unit-step-function-at-T-0</a></li>
  <li id="ref-iso-80000"><a href="https://www.iso.org/standard/31887.html">https://www.iso.org/standard/31887.html</a></li>
</ul>
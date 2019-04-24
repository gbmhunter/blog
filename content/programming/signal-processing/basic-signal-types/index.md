---
author: "gbmhunter"
categories: [ "Programming" ]
date: 2019-04-23
description: ""
draft: false
lastmod: 2019-04-23
tags: [ "signals", "sinusoidal", "unit-step function", "Heaviside", "exponential", "unit-impulse function" ]
title: "Basic Signal Types"
type: "page"
---

## Overview

All usages of trigonometric functions such as `\(\sin()\)` and `\(\cos()\)` below assume **angles measured in radians, not degrees**.

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

Complex sinusoidal signals are introduced after exponential signals are explained.

## Exponential

The general form for an exponential signal is:

<p>$$ f(t) = Ae^{\lambda t} $$</p>

<p class="centered">
  where:<br/>
  \(A\), \(\lambda\) are complex numbers, potentially only with a real component
</p>

Below are some examples of real exponential signals, showing how varying `\(A\)` and `\(\lambda\)` (limited to real numbers only) effect the waveform shape.

{{% img src="examples-of-basic-real-exponential-signals.png" width="700px" %}}

## Unit Step Function

The unit-step function (also known as the **Heaviside function**) is defined as:

<p>$$
y(t) =
\begin{cases}
0, & \text{for $t < 0$} \\
1, & \text{for $t > 0$}
\end{cases}
$$</p>

## Unit Impulse Function

The unit-impulse function is defined as:

<p>$$
y(t) = 0 \text{ for } t \neq 0 \text{ and} \\
\int_{- \infty}^{\infty} y(t) dt = 1
$$</p>

The unit-impulse function is 0 everywhere except for `\(t = 0\)` where it is infinite.
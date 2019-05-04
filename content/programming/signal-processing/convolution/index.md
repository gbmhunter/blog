---
author: gbmhunter
categories: [ "Mathematics", "Signal Processing" ]
date: 2018-06-05
draft: false
lastmod: 2019-04-28
tags: [ "convolution", "mathematics", "signal processing" ]
title: Convolution
type: page
---

## Overview

Convolution is a mathematic operation that can be performed on two functions, which produces a third output function which is a "blend" of the two inputs.

Convolution can be thought of as a measure of the amount of overlap of one function as it is shifted completely over the other function.

## Formal Definition

<p>$$ (f \ast g)(t) \triangleq \int_{-\infty}^{\infty} f(\tau)\ g(t - \tau) d \tau $$</p>

<p class="centered">
  where:<br/>
  \(f(t), g(t)\) are functions that vary in time (signals)<br/>
  \(\ast\) is used to denote the convolution of signals \(f(t)\) and \(g(t)\).
</p>

{{% warning %}}
It is important to notice the distinction between `\(t\)` (standard letter t) and `\(\tau\)` (lower-case tau). t is a constant (i.e. we are going to produce an equation which evaluates the convolution at time `\(t\)`, while `\(\tau\)` is the variable which you are integrating with (it is introduced by the definition of convolution). `\(\tau\)` will disappear from the convolution function when the limits are substituted into the integrated function (a _definite integral_), while `\(t\)` will remain, allowing us to calculate the value of the convolution at any time `\(t\)`.
{{% /warning %}}

The result will be another function which varies with time.

## Mathematical Properties

Convolution is **commutative**:

<p>$$ f \ast g = g \ast f $$</p>

Convolution is **associative**:

<p>$$ (f \ast g) \ast h = f \ast (g \ast h) $$</p>

Convolution is **distributive**:

<p>$$ f \ast (g + h) = f \ast g + f \ast h $$</p>

These other properties also hold true:

<p>$$ a (f \ast g) = (af) \ast g $$</p>

## Calculating A Convolution

One of the easiest convolution calculations that has a closed-form solution is that of two "box-car" signals.

`\(f(t)\)` is defined by:

<p>$$ f(t) =
\begin{cases}
1, & \text{for $0 \le t < 1$} \\
0 & \text{otherwise}
\end{cases}
$$</p>

And `\(g(t)\)` is exactly the same:

<p>$$ g(t) =
\begin{cases}
1, & \text{for $0 \le t < 1$} \\
0 & \text{otherwise}
\end{cases}
$$</p>

We need to "flip and slide" `\(g(t)\)`:

When `\(t < 0\)` the two box-cars do not intersect at all, so:

<p>$$
\int_{-\infty}^{-\infty} f(\tau)g(t - \tau)\,d\tau = 0
$$</p>

When `\(0 \le t < 1\)`:

<p>\begin{align}
\int_{-\infty}^{-\infty} f(\tau)g(t - \tau)\,d\tau &= \int_0^t 1*1\,d\tau \\
&= [\tau]_0^t \\
&= t
\end{align}</p>

When `\(1 \le t < 2\)`:

<p>\begin{align}
\int_{-\infty}^{-\infty} f(\tau)g(t - \tau)\,d\tau &= \int_{t-1}^1 1*1\,d\tau \\
&= [\tau]_{t-1}^1 \\
&= 1 - (t - 1) \\
&= 2 - t
\end{align}</p>

When `\(t \ge 2\)`, the two box-cars do not intersect at all, so:

<p>$$
\int_{-\infty}^{-\infty} f(\tau)g(t - \tau)\,d\tau = 0
$$</p>



Putting all of this together:

<p>$$
(f \ast g)(t) =
\begin{cases}
0, &\text{for $t \le 0$} \\
t, &\text{for $0 \le t < 1$} \\
2-t, &\text{for $1 \le t < 2$} \\
0 &\text{fot $t > 2$}
\end{cases}
$$</p>

{{% img src="convolution-two-box-car-functions.gif" width="700px" caption="An animated .gif showing the convolution of two box-car functions. The value of the convolution function at any time t (bottom line in red) is the amount area shown in red in the middle plot, which is the area under the curve of f(t)g(t) (the two waveforms multiplied together)." %}}

## Convolution With Unit Impulse (Dirac Delta) Function

Convolution of any function `\(g(t)\)` with the unit impulse function (also known as the _Dirac delta_ function) will always result in `\(g(t)\)` (the original function, unmodified).

<p>$$ (\delta \ast g)(t) = \int_{-\infty}^{\infty} \delta(\tau) g(t - \tau) = g(t) $$</p>

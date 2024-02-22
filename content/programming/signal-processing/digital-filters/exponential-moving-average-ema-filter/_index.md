---
authors: [ Geoffrey Hunter ]
categories: [ Programming, Signal Processing, Filters ]
date: 2014-02-26
description: Equations, graphs and more info on IIR exponential moving average (EMA) filters.
draft: false
lastmod: 2022-05-25
tags: [ EMA, exponential, filters, recursive ]
title: Exponential Moving Average (EMA) Filters
type: page
---

## Overview

The _exponential moving average_ (EMA) filter is a **discrete, low-pass, infinite-impulse response (IIR) filter**. It **places more weight on recent data by discounting old data in an exponential fashion**, and behaves similarly to the **discrete first-order low-pass RC filter**.

Unlike a SMA, most EMA filters is not windowed, and the next value depends on all previous inputs. Thus most EMA filters are a form of infinite impulse response (IIR) filter, whilst a SMA is a finite impulse response (FIR) filter. There are exceptions, and you can indeed build a windowed exponential moving average filter in where the coefficients are weighted exponentially.

## EMA Equation

The _difference equation_ for an exponential moving average filter is:

$$\begin{align}
y[i] = \alpha \cdot x[i] + (1 - \alpha) \cdot y[i-1]
\end{align}$$

<p class="centered">
    where:<br>
    \( y \) is the output (\([i]\) denotes the sample number)<br>
    \( x \) is the input<br>
    \( \alpha \) is a constant which sets the cutoff frequency (a value between \(0\) and \(1\))<br>
</p>

Notice that the calculation does not require the storage of past values of \(x\) and only the previous value of \(y\), **which makes this filter memory and computation friendly (especially relevant for microcontrollers)**. Only one addition, one subtraction, and two multiplication operations are needed.

The constant \( \alpha \) determines how aggressive the filter is. It can vary between \(0\) and \(1\) (inclusive). As \( \alpha \to 0 \), the filter gets more and more aggressive, until at \( \alpha = 0 \), where the input has no effect on the output (if the filter started like this, then the output would stay at \(0\)). As \( \alpha \to 1 \), the filter lets more of the raw input through at less filtered data, until at \( \alpha = 1 \), where the filter is not "filtering" at all (pass-through from input to output).

The filter is called _exponential_ because the weighted contribution of previous inputs decreases exponentially the further the input is away in time. This can be seen in the difference equation if we substitute in previous inputs:

$$\begin{align}
y[i] &= \alpha \cdot x[i] + (1 - \alpha) \cdot y[i-1] \nonumber \\
y[i] &= \alpha \cdot x[i] + (1 - \alpha) \cdot (\alpha \cdot x[i-1] + (1 - \alpha) \cdot y[i-2]) \nonumber \\
y[i] &= \alpha \cdot x[i] + (1 - \alpha) \cdot (\alpha \cdot x[i-1] + (1 - \alpha) \cdot \nonumber \\ 
     &(\alpha \cdot x[i-2] + (1 - \alpha) \cdot y[i-3])) \nonumber \\
... \nonumber \\
\label{eq:ema-sum}
y[i] &= \alpha \sum_{k=0}^n (1-\alpha)^k x[n-k] \\
\end{align}$$

The following code implements a IIR EMA filter in C++, suitable for microcontrollers and other embedded devices[^pieter-p-ema]. {{% link text="Fixed-point numbers" src="/programming/general/fixed-point-mathematics" %}} are used instead of floats to speed up computation. `K` is the number of fractional bits used in the fixed-point representation.

```cpp
template <uint8_t K, class uint_t = uint16_t>
class EMA {
  public:
    /// Update the filter with the given input and return the filtered output.
    uint_t operator()(uint_t input) {
        state += input;
        uint_t output = (state + half) >> K;
        state -= output;
        return output;
    }

    static_assert(
        uint_t(0) < uint_t(-1),  // Check that `uint_t` is an unsigned type
        "The `uint_t` type should be an unsigned integer, otherwise, "
        "the division using bit shifts is invalid.");

    /// Fixed point representation of one half, used for rounding.
    constexpr static uint_t half = 1 << (K - 1);

  private:
    uint_t state = 0;
};
```

## Frequency Response

The frequency response of the EMA filter can be found by using the Z transform. If we start with the time-domain equation for an EMA filter:

$$\begin{align}
y[i] = \alpha \cdot x[i] + (1 - \alpha) \cdot y[i-1]
\end{align}$$

And then take the Z tranform of it:

$$\begin{align}
Y(z) = aX(z) + (1 - \alpha) z^{-1} Y(z)
\end{align}$$

Then re-arrange to find the transfer function \(H(z)\):

$$\begin{align}
H(z) &= \frac{Y(z)}{X(z)} \nonumber \\
     &= \frac{\alpha}{1 - (1-\alpha)z^{-1}} \\
\end{align}$$

This transfer function can be used to create bode plots of the magnitude and phase response of the EMA filter. The below bode plot shows the response of an EMA filter with \(\alpha=0.25\). The x-axis frequency is the normalized frequency, in units \(Hz/sample\), which makes the plot applicable for any sampling frequency.

{{% figure src="ema-bode-plot.png" width="600px" caption="Bode plot showing the magnitude and phase of an EMA filter with \\\\( \alpha=0.25 \\\\)." %}}

The _cut-off frequency_ (-3dB point) of an EMA filter is given by[^se-dsp-ema-cutoff]:

$$\begin{align}
f_c = \frac{f_s}{2\pi} \arccos{\left[1 - \frac{\alpha^2}{2(1-\alpha)}\right]}
\end{align}$$

<p class="centered">
where:<br/>
\(f_s\) is the sampling frequency in \(Hz\)<br/>
</p>

## Impulse Response

The discrete unit sample function is defined as:

$$\begin{align}
\delta[n] =
\begin{cases} 
      1 & n = 0 \\
      0 & n \neq 0 \\      
\end{cases}
\end{align}
</p>

If we use this as our input into \(Eq.\ \ref{eq:ema-sum}\):

$$\begin{align}
y[i] &= \alpha \sum_{k=0}^n (1-\alpha)^k \delta[n-k] \\
\end{align}$$

Given the unit sample function is 0 at most points, the only sum term that matters is when \(k = n\), so we can simplify this to:

<p>\begin{align}
y[i] &= \alpha (1-\alpha)^n \\
\end{align}$$

From this, we can plot what the response will look like for impulse as the input. As you can see in the following graph, the output starts off at \(y[0] = \alpha\) and then decays towards 0. A larger alpha makes the initial response larger but also the decay faster.

{{% figure src="ema-impulse-response.png" width="600px" caption="Impulse response for an EMA filter with different \\\\(\alpha\\\\) values." %}}

## External Resources

[https://stratifylabs.co/embedded%20design%20tips/2013/10/04/Tips-An-Easy-to-Use-Digital-Filter/](https://stratifylabs.co/embedded%20design%20tips/2013/10/04/Tips-An-Easy-to-Use-Digital-Filter/) is a great page explaining the exponential moving average filter.

## References

[^pieter-p-ema]: <https://tttapa.github.io/Pages/Mathematics/Systems-and-Control-Theory/Digital-filters/Exponential%20Moving%20Average/C++Implementation.html#arduino-example>, accessed 2021-05-29.
[^se-dsp-ema-cutoff]: Andy Walls (2017, Apr 22). _Exponential moving average cut-off frequency (Q/A)_. StackExchange: Signal Processing. Retrieved 2022-05-25, from https://dsp.stackexchange.com/questions/40462/exponential-moving-average-cut-off-frequency.

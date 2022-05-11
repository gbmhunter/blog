---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Signal Processing", "Filters" ]
date: 2014-02-26
description: "Simple moving averages, exponential moving averages, Savizky-Golay filters, frequency responses, source code and more info on digital filtering (a form of signal processing)."
draft: false
lastmod: 2021-05-29
tags: [ "moving average", "filter", "ADCs", "DACs", "time domain", "discrete", "frequency responses", "exponentially weighted", "multiple pass", "signal processing", "Savitzky–Golay fFilters" ]
title: "Digital Filters"
type: "page"
---

## Overview

For information on the popular simple moving average (windowed) filters, see the [Simple Moving Average Filters (SMAs) page](/programming/signal-processing/digital-filters/simple-moving-average-filters-smas/).

## Terminology

**Causality**: _Casual_ filters are filters whose present output **does not** depend on future input. _Non-casual_ filters are those whose present output **does** depend on future input. Real-time filters must be casual, but filters which are either time delayed or do not act in the time domain can be non-casual.

**Cycles per sample**: _Cycles per sample_ is a convenient way of expressing a frequency w.r.t. the sample frequency. It is found by dividing the frequency in Hz (cycles/second) by the sampling rate in samples per second (samples/second), giving you units of cycles/sample.

**Difference equation**: A difference equation is the core equation of a filter which shows how the next output value is calculated based on past and present input and output values. For example, the difference equation for an exponential moving average filter is:

<p>\begin{align}
y_i = y_{i-1} \cdot (1 - \alpha) + x_i \cdot \alpha \nonumber
\end{align}</p>

## FIR Moving Average (MA) Filters

### Overview

One of the classic examples of an FIR is a moving average (MA) filter. It can also be called a **box-car filter**. There are many subtypes of moving average filter, including the _simple moving average_ (SMA) filter and _exponential moving average_ (EMA) filter.

Moving average filters are also fast. In fact, they are the **fastest digital filter availiable** (when recursion is used).

{{% note %}}
Some equations use frequency `\( f \)`, while others use angular frequency `\( \omega \)`.
{{% /note %}}

### Terminology

<table>
  <thead>
    <tr>
      <th>Term</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>\(N\)</td>
      <td>The number of data points used in a moving average filter. This is called the "size of the window". \(M\) is another letter commonly used to represent the same thing.</td>
    </tr>
    <tr>
      <td>\(F\)</td>
      <td>The normalised frequency, units \(cycles/sample\). This is a frequency in the discrete time-domain. Do not confuse with \( f \),, which is a frequency in the continuous time-domain.</td>
    </tr>
    <tr>
      <td>\(f\)</td>
      <td>A frequency of a waveform in the continuous time-domain. Do not confuse with \( F \), which is a frequency in the discrete time-domain.</td>
    </tr>
    <tr>
      <td>\(f_s\)</td>
      <td>The sample frequency of a waveform, measured in the continuous time-domain. This parameter is used when you want to convert a input waveform frequency from a continuous time-domain frequency to a normalised discrete time-domain frequency (see more here).</td>
    </tr>
    <tr>
      <td>\( \omega \)</td>
      <td>The normalised frequency, in units \(radians/sample\).</td>
    </tr>
  </tbody>
</table>

### Converting From A Continuous Time-Domain To Normalised Discrete Time-Domain Frequency

Remember, to map a continuous time-domain frequency to the discrete time-domain, use the following equation:

<p>$$ F = \frac{f}{f_s} $$</p>

<p class="centered">
    where:<br />
    \( F \) is the frequency in the discrete time-domain, in \(cycles/sample\)<br />
    \( f \) is the frequency in the continuous time-domain, in \(Hz\) (or \(cycles/second\))<br />
    \( f_s \) is the sample frequency in the continuous time-domain, in \(Hz\) (or \(samples/second\))<br />
</p>

### A Comparison Of The Popular Windows

All the windows shown below are centered windows (and not left-aligned). The window sample weights are normalized to 1.

The frequency responses can be found by extending the window waveform with 0's, and then performing an FFT on the waveform. The resultant frequency domain waveform will be the frequency response of the window. This works because **a moving window is mathematically equivalent to a convolution, and convolution in the time domain is multiplication in the frequency domain**. Hence your input signal in the frequency domain will be multiplied by FFT of the window.

{{% figure src="window-comparison-shapes.png" width="600px" caption="A comparison of the popular window shapes for moving average filters." %}}

And a comparison of the frequency responses of these windows is shown below: 

{{% figure src="window-comparison-shapes.png" width="600px" caption="The frequency responses of the popular window shapes shown above, normalized w.r.t to the sampling frequency fs." %}}

### External Resources

[https://stratifylabs.co/embedded%20design%20tips/2013/10/04/Tips-An-Easy-to-Use-Digital-Filter/](https://stratifylabs.co/embedded%20design%20tips/2013/10/04/Tips-An-Easy-to-Use-Digital-Filter/) is a great page explaining the exponential moving average filter.



### Source Code

The opensource [Math.Net NeoDym library](http://neodym.mathdotnet.com/) contains C# code for using FIR filters.

## IIR Exponentially Weighted Moving Average Filter

A exponentially weighted moving average filter **places more weight on recent data by discounting old data in an exponential fashion**. It is a **low-pass, infinite-impulse response (IIR) filter**.

It is identical to the **discrete first-order low-pass filter**.

The _difference equation_ for an exponential moving average filter is:

<p>\begin{align}
y_i = y_{i-1} \cdot (1 - \alpha) + x_i \cdot \alpha
\end{align}</p>

<p class="centered">
    where:<br>
    \( y \) = the output (\(i\) denotes the sample number)<br>
    \( x \) = the input<br>
    \( \alpha \) = is a constant which sets the cutoff frequency (a value between \(0\) and \(1\))<br>
</p>

Notice that the calculation does not require the storage of past values of `\(x\)` and only the previous value of `\(y\)`, **which makes this filter memory and computation friendly (especially relevant for microcontrollers)**. Only one addition, one subtraction, and two multiplication operations are needed.

The constant `\( \alpha \)` determines how aggressive the filter is. It can vary between `\(0\)` and `\(1\)` (inclusive). As `\( \alpha \to 0 \)`, the filter gets more and more aggressive, until at `\( \alpha = 0 \)`, where the input has no effect on the output (if the filter started like this, then the output would stay at `\(0\)`). As `\( \alpha \to 1 \)`, the filter lets more of the raw input through at less filtered data, until at `\( \alpha = 1 \)`, where the filter is not "filtering" at all (pass-through from input to output).

The following code implements a IIR EMA filter in C++, suitable for microcontrollers and other embedded devices[^pieter-p-ema]. {{% link text="Fixed-point numbers" src="/programming/general/fixed-point-mathematics" %}} are used instead of floats to speed up computation. `K` is the number of fractional bits used in the fixed-point representation.

```c++
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

## Creating Digital Filters In Python

Python is a great language for experimenting with digital filters. The popular `numpy` and `scipy` libraries provide a variety of functions to make it easy to create and visualize the behaviour of a digital filter.

`scipy.fftpack.fft(x)` performs a discrete Fourier transform on the input data. Passing in a window (an array of the weighting at each sample in the window) will return an array of complex numbers.

`scipy.fftpack.fftshift()` shifts the result from `fft()` so that the DC component is centered in the array.

`fftfreq()` converts normalized frequencies into real frequencies.

## References

[^pieter-p-sma]: <https://tttapa.github.io/Pages/Mathematics/Systems-and-Control-Theory/Digital-filters/Simple%20Moving%20Average/Simple-Moving-Average.html>, accessed 2021-05-27.
[^pieter-p-ema]: <https://tttapa.github.io/Pages/Mathematics/Systems-and-Control-Theory/Digital-filters/Exponential%20Moving%20Average/C++Implementation.html#arduino-example>, accessed 2021-05-29.
[^dsp-stack-exchange-cut-off-freq-sma]: <https://dsp.stackexchange.com/questions/9966/what-is-the-cut-off-frequency-of-a-moving-average-filter>, accessed 2021-05-27.
[^analog-devices-dsp-book-ch15]: <https://www.analog.com/media/en/technical-documentation/dsp-book/dsp_book_Ch15.pdf>, accessed 2021-05-27.

---
author: "gbmhunter"
categories: [ "Programming", "Signal Processing", "Filters" ]
date: 2014-02-26
description: "Simple moving averages, exponential moving averages, Savizky-Golay filters, frequency responses, source code and more info on digital filtering (a form of signal processing)."
draft: false
lastmod: 2021-05-29
tags: [ "moving average", "filter", "ADCs", "DACs", "time domain", "discrete", "frequency responses", "exponentially weighted", "multiple pass", "signal processing", "Savitzky–Golay fFilters" ]
title: "Digital Filters"
type: "page"
---

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

### Simple Moving Average Filter (aka Sliding Window Filter)

The simple moving average filter is one of the most commonly used digital filters, due to it's simplicity and ease of use. Although SMA filters are simple, they are first equal (there are other filters that perform as good as, but not better) **at reducing random noise whilst retaining a sharp step response**. However, they are the **worst filter for frequency domain signals**, they have a very poor ability to separate one band of frequencies from another[^analog-devices-dsp-book-ch15]. You can see their poor roll-off in the stop band in proceeding graphs.

There are two common types of simple moving average filters, left-hand and symmetric filters.

A left-hand simple moving average filter can be represented by:

<p>$$ y[i] = \frac{1}{N} \sum\limits_{j=0}^{N-1} x[i+j] $$</p>

<p class="centered">
    where:<br/>
    \( x \) = the input signal<br/>
    \( y \) = the output signal<br/>
    \( N \) = the number of points in the average (the width of the window)<br/>
 </p>

For example, for the points `\( x[0] = 2, x[1] = 6, x[2] = 9, x[3] = 4, x[4] = 3 \)`, with a windows size of `\(N = 3\)`, then `\( y[1] = \frac{6 + 9 + 4}{3} \)`. Left-handed filters of this type can be calculated in real-time (`\(y[i]\)` can be found as soon as `\(x[i]\)` is known).

The window can also be centered around the output signal (a symmetric moving average filter), with the following adjustment of the limits:

<p>$$ y[i] = \frac{1}{N} \sum\limits_{j=-(N-1)/2}^{+(N-1)/2} x[i+j] $$</p>

Symmetric simple moving averages require `\(N\)` to be odd, so that there is an equal number of points either side. One disadvantage of a symmetric filter is that you have to know data points that occur after the point in interest, and therefore it is not real time (i.e. _non-casual_).

When treating a simple moving average filter as a FIR, the coefficients are all equal. The order of the filter is 1 less than the value you divide each value by. The coefficients are given by the following equation:

<p>$$b_i = \frac{1}{N + 1}$$</p>

A simple moving average filter can also be seen as a convolution between the input signal and a rectangular pulse whose area is 1.

### Frequency Response

The frequency response for a simple moving average filter is given by:

<p>$$ |H(f)| = \frac{1}{N}\left|\frac{sin(\pi F N)}{sin(\pi F)}\right| $$</p>

<p class="centered">
    where:<br>
    \( H(f) \) is the frequency response<br>
    \( F \) the normalised frequency, in \( cycles/sample \)<br>
    \( N \) = the number of points in the average (the width of the window)<br>
</p>

Note that the sine function uses radians, not degrees. You may also see this shown in angular frequency units (`\(\omega\)`), in which case `\( \omega = 2\pi F \)`.

To avoid division by zero, use `\( H(0) = N \)`. The magnitude follows the shape of a `\( sinc \)` function.

Or it can be written as:

<p>$$ H(\omega) = \frac{1}{N}\left(\frac{1 - e^{-j\omega L}}{1 - e^{-j\omega}}\right) $$</p>

<p class="centered">
    where:<br>
    \( N \) = the number of points in the average (the width of the window)<br>
</p>

Lets design a SMA filter with a sampling rate of `\(1kHz\)` and a window size of `\(10\)`. This gives the following magnitude response:

{{% figure src="frequency-response-of-sma-magnitude.png" width="700px" caption="The magnitude response of a SMA filter with fs=1kHz and a window size of 10. Frequency range is from 0Hz up to Nyquist (fs/2)." %}}

and the phase:

{{% figure src="frequency-response-of-sma-phase.png" width="700px" caption="The phase response of a SMA filter with fs=1kHz and a window size of 10. Frequency range is from 0Hz up to Nyquist (fs/2)." %}}

### Cutoff Frequency

When designing a SMA filter, you typically want to set the window size `\(N\)` based on the frequencies you want to pass through and those you want reject. The easiest figure of merit for this is the cutoff frequency `\(\omega_c\)` (or `\(f_c\)`), which we'll define here as the `\(\frac{1}{2}\)` power point (`\(-3dB\)` point). This is the frequency at which the power of the signal is reduced by half.

We can find the equation for the cutoff frequency from `\(H(\omega)\)` above.

<p>\begin{equation}
\sin^2 \left(\frac{\omega_c N}{2}\right) - \frac{N^2}{2} \sin^2 \left( \frac{\omega_c}{2} \right) = 0
\end{equation}</p>

Unfortunately, no general closed form solution for the cutoff frequency exists (i.e. there is no way to re-arrange this equation to solve for `\(\omega_c\)`). However, these are two ways to get around this problem.

1. Solve the equation numerically, e.g. use the Newton-Raphson method.
1. Use an equation which approximates the answer (easier method, recommended approach unless you really need the accuracy!)

**Numerically**

The Newton-Raphson method can be used to solve the above equation. Below is a code example in Python which includes the function `get_sma_cutoff()` that can calculate the cutoff frequency `\(\omega_c\)` given the window size `\(N\)` to a high degree of accuracy[^pieter-p-sma]:

```python
import numpy as np
import scipy.signal

def get_sma_cutoff(N, **kwargs):
    """
    Function for calculating the cut-off frequency of a 
    simple moving average filter. Uses the Newton-Raphson method to 
    converge to the correct solution.

    This function was initially written by Pieter P.
    (https://tttapa.github.io/Pages/Mathematics/Systems-and-Control-Theory/
    Digital-filters/Simple%20Moving%20Average/Simple-Moving-Average.html).

    Args:
        N: Window size, in number of samples.

    Returns:
        The angular cut-off frequency, in rad/s.  
    """
    func = lambda w: np.sin(N*w/2) - N/np.sqrt(2) * np.sin(w/2)  # |H(e^jω)| = √2/2
    deriv = lambda w: np.cos(N*w/2) * N/2 - N/np.sqrt(2) * np.cos(w/2) / 2  # dfunc/dx
    omega_0 = np.pi/N  # Starting condition: halfway the first period of sin(Nω/2)
    return scipy.optimize.newton(func, omega_0, deriv, **kwargs)
```

**Approximate Equation**

An approximate equation can be found relating the window size to the cutoff frequency which is accurate to 0.5% for `\(N >= 4\)`[^dsp-stack-exchange-cut-off-freq-sma]:

<p>\begin{align}
N = \frac{\sqrt{0.196202 + F_c^2}}{F_c}
\end{align}</p>

<p class="centered">
where:<br/>
\(N\) is the window size, expressed as a number of samples<br/>
\(F_c\) is the normalized cutoff frequency
</p>

Remember that `\(F_c\)` can be calculated with:

<p>\begin{align}
F_c = \frac{f_c}{f_s}
\end{align}</p>

<p class="centered">
where:<br/>
\(f_c\) is the cutoff frequency, in Hertz \(Hz\)<br/>
\(f_s\) is the sample frequency, in Hertz \(Hz\)
</p>

### Multiple Pass Moving Average Filters

A _multiple pass simple moving average filter_ is a SMA filter which has been applied multiple times to the same signal. Two passes through a simple moving average filter produces the same effect as a triangular moving average filter. After four or more passes, it is equivalent to a Gaussian filter[^analog-devices-dsp-book-ch15].

### Code Examples

The following code shows how to create a `\( n = 1 \)` simple moving average filter, using the Math.Net Neodym C# library.

```c#
MathNet.SignalProcessing.Filter.FIR.OnlineFirFilter filter;

// Create a simple n=1 averaging filter
private void CreateFilter(int numberOfCo) {
    // Create coefficients
    IList<double> filterCo = new List<double>();
    for (int x = 0; x < numberOfCo; x++) {
        filterCo.Add(1.0/(double)numberOfCo);
    }
    // Instantiate filter
    filter = new MathNet.SignalProcessing.Filter.FIR.OnlineFirFilter(filterCo);
}

private double RunFilter(double input) {
    // Run filter
    return filter.ProcessSample(input);
}
```

### Fast Start-up

Like all filters, the simple moving average filter introduces lag to the signal. You can use fast start-up logic to reduce the lag on start-up (and reset, if applicable). This is done by keeping track of how many data points have been passed through the filter, and if less have been passed through than the width of the window (i.e. some window elements are still at their initialised value, normally 0), you ignore them when calculating the average.

This is conceptually the same as having a variable-width window which increases from 1 to the maximum value, `\(x\)`, as the first `\(x\)` values are passed through the filter. The window width then stays at width `\(x\)` for evermore (or until the filter is reset/program restarts).

If you also know a what times the signal will jump significantly, you can reset the filter at these points to remove the lag from the output. You could even do this automatically by resetting the filter if the value jumps by some minimum threshold.

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
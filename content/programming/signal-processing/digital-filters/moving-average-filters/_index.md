---
authors: [ Geoffrey Hunter ]
categories: [ Programming, Signal Processing, Filters ]
date: 2014-02-26
description: Simple moving average (SMA) filters, window sizes, frequency responses, recursive SMA, EMAs and more info on moving average filters.
draft: false
lastmod: 2022-05-12
tags: [ SMA, simple moving average, moving average, EMA, exponential, filters, recursive, left-handed, centered, Python, Pandas, Numpy, convolve, kernel ]
title: Moving Average Filters
type: page
---

## Overview

_Moving average filters_ are a family of filters which have a finite impulse response (FIR). They all use a finite-length window of data points to calculate the averaged output. The easiest moving average filter to understand is the _Simple Moving Average_ (SMA) filter (also called a **box-car filter**), which uses a window in where all the inputs values are weighted equally (coefficients are equal). Other moving average filters include the _Exponential Moving Average_ (EMA) filter, with exponentially-weighted coefficients.

## Terminology

First off, some terminology.

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

## Simple Moving Average Filter

The _simple moving average_ (SMA) filter (a.k.a _rolling average filter_) is one of the most commonly used digital filters (or averaging device), due to it's simplicity and ease of use. Although SMA filters are simple, they are first equal (there are other filters that perform as good as, but not better) **at reducing random noise whilst retaining a sharp step response**. However, they are the **worst filter for frequency domain signals**, they have a very poor ability to separate one band of frequencies from another[^analog-devices-dsp-book-ch15].

The following plot shows the effect of a SMA filter. The data used is New Zealand's national average temperature (data from https://data.mfe.govt.nz/table/89453-new-zealands-national-temperature-19092016/):

{{% img src="nz-nat-yearly-temp-plot.png" width="600px" caption="The effect of SMAs on data. New Zealand's national average yearly temperatures, overlaid with a 5-wide and 20-wide left-handed SMA." %}}

{{% note %}}
Sometimes SMAs don't start at the same point as the data due to them not being considered "valid" until the window is full of data (like above). Other times you may want to reduce the effective window size as you approach the ends to get an output at every input.
{{% /note %}}

The below plot shows a noisy 1kHz sine wave (with random, normally distributed noise) and then the application of a SMA filter (symmetric, window size = 50) which does a commendable job at recovering the original signal:

{{% img src="sine-wave-with-noise.png" width="600px" caption="Plot showing a noisy sine wave (random, normally distributed noise) and then the application of a SMA filter (symmetric, window size = 50) which recovers the original signal really well!" %}}

There are two common types of simple moving average filters:
* Left-handed SMA
* Symmetric SMA

A left-handed simple moving average filter can be represented by:

<p>\begin{align}
y[i] = \frac{1}{N} \sum\limits_{j=0}^{N-1} x[i-j]
\end{align}</p>

<p class="centered">
    where:<br/>
    \( x \) = the input signal<br/>
    \( y \) = the output signal<br/>
    \( N \) = the number of points in the average (the width of the window)<br/>
 </p>

For example, with a windows size of `\(N = 5\)`, the moving average at point 9 would be sum of the last 5 inputs `\(x[9]\)` thru to `\(x[5]\)` divided by 5:

<p>\begin{align}
y[9] = \frac{x[9] + x[8] + x[7] + x[6] + x[5]}{5}
\end{align}</p>

Left-handed filters of this type can be calculated in real-time (`\(y[i]\)` can be found as soon as `\(x[i]\)` is known).

The window can also be centered around the output signal (a symmetric moving average filter), with the following adjustment of the limits:

<p>\begin{align}
y[i] = \frac{1}{N} \sum\limits_{j=-(N-1)/2}^{+(N-1)/2} x[i-j]
\end{align}</p>

For example, using our `\(y[9]\)` again:

<p>\begin{align}
y[9] = \frac{x[11] + x[10] + x[9] + x[8] + x[7]}{5}
\end{align}</p>

Symmetric simple moving averages require `\(N\)` to be odd, so that there is an equal number of points either side. The advantage of a symmetric filter is that the output is not delayed (phase shifted) relative to the input signal, as it is with the left-handed filter. **One disadvantage of a symmetric filter is that you have to know data points that occur after the point in interest, and therefore it is not real time (i.e. _non-casual_)**. Most SMA filters used on stock market data use a left-handed filter so that it is real-time.

When treating a simple moving average filter as a FIR, the coefficients are all equal. The order of the filter is 1 less than the value you divide each value by. The coefficients are given by the following equation:

<p>\begin{align}
b_i = \frac{1}{N + 1}
\end{align}</p>

A simple moving average filter can also be seen as a convolution between the input signal and a rectangular pulse whose area is 1.
### Frequency Response

The frequency response for a simple moving average filter is given by:

<p>\begin{align}
|H(f)| = \frac{1}{N}\left|\frac{sin(\pi F N)}{sin(\pi F)}\right|
\end{align}</p>

<p class="centered">
    where:<br>
    \( H(f) \) is the frequency response<br>
    \( F \) the normalised frequency, in \( cycles/sample \)<br>
    \( N \) = the number of points in the average (the width of the window)<br>
</p>

Note that the sine function uses radians, not degrees. You may also see this shown in angular frequency units (`\(\omega\)`), in which case `\( \omega = 2\pi F \)`.

To avoid division by zero, use `\( H(0) = N \)`. The magnitude follows the shape of a `\( sinc \)` function.

Or it can be written as:

<p>\begin{align}
H(\omega) = \frac{1}{N}\left(\frac{1 - e^{-j\omega L}}{1 - e^{-j\omega}}\right)
\end{align}</p>

<p class="centered">
    where:<br>
    \( N \) = the number of points in the average (the width of the window)<br>
</p>

Lets design a SMA filter with a sampling rate of `\(1kHz\)` and a window size of `\(10\)`. This gives the following magnitude response:

{{% img src="frequency-response-of-sma-magnitude.png" width="700px" caption="The magnitude response of a SMA filter with fs=1kHz and a window size of 10. Frequency range is from 0Hz up to Nyquist (fs/2)." %}}

and the phase:

{{% img src="frequency-response-of-sma-phase.png" width="700px" caption="The phase response of a SMA filter with fs=1kHz and a window size of 10. Frequency range is from 0Hz up to Nyquist (fs/2)." %}}

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

### Recursive SMA Implementation

**The computation power required to calculate the output at each step in a SMA filter can be significantly reduced with a simple trick**. For example, consider a basic left-handed SMA with a window size of 5:

<p>\begin{align}
y[9] = \frac{x[9] + x[8] + x[7] + x[6] + x[5]}{5}
\end{align}</p>

Instead of calculating each output as above, we can instead save the last output value we calculated, add the new input data point to it, and subtract the oldest data point from the window:

<p>\begin{align}
y[9] = y[8] + \frac{1}{5}(x[9] - x[4])
\end{align}</p>

This is called a _recursive_ algorithm[^analog-devices-dsp-book-ch15], because the output of one step is used in the calculation of future steps. It's main benefit is the tremendous speed increase in computing each step, especially when the window size is large. Whilst this dependence on previous output (`\(y[9]\)` depends on `\(y[8]\)`) makes it look like an IIR filter, this recursion trick does not change the SMAs behaviour, and it still an FIR filter (once the input flies "past" the end of the window, it has no bearing on the output).

{{% note %}}
The simple moving average filter is the only such window-based filter which can be speed up with this recursion trick. Other forms like exponential, Gaussian and Blackman moving averages have to use computationally expensive convolution.
{{% /note %}}

**One thing to watch out for is accumulated error if using floating point numbers**. Because you are now calculating the next output value from the previous output calculation (rather than fresh input data, as you would for the non-recursive algorithm), floating point precision errors will accumulate slowly in the output. 

To show this, the following graph plots the accumulated error when using 32-bit floating point numbers. 10 million random 32-bit floats in the range of `\([0, 1000]\)` (our input data) was pushed through a left-handed SMA with a window size of 10 (the window size should not really matter). On every 100th input, the output value as computed by the recursive algorithm was compared with the output computed by the non-recursive algorithm. The difference between these two values is the accumulated error. 

{{% img src="windowed-moving-average-accumulated-error.png" width="700px" caption="Plot showing the error that slowly accumulates when using the recursive SMA method with floating points." %}}

**By the time the 10 million inputs have passed through the filter, the answer is wrong by about 0.6!** This may or may not be a bad thing depending on your application. I guess (no proof!) that the average error `\(e\)` will grow proportional to the square root of the number of samples `\(N\)` pushed through the filter, similar to a random walk (drunkards walk).

<p>\begin{align}
e \propto \sqrt{N}
\end{align}</p>

{{% warning %}}
Watch out when using floating point numbers with the recursive algorithm!
{{% /warning %}}

**Integer based data does not have this accumulation error problem with the recursive SMA**. If you did need to use floats, and you don't have the CPU brute to use the non-recursive method, one solution may be to periodically clear the previous output value and recompute the output using the non-recursive equation. This will reset your error back to 0, preventing it from growing without bound.

### Similarity To Convolution

A SMA filter is identical to the [convolution (a mathematical concept)](/programming/signal-processing/convolution/) of the input signal with the window waveform (kernel). Typically you would set the height of each point in the window to `\(\frac{1}{N}\)`, so that the area under the window curve is 1 (and the SMA has no gain). For example, a 5-point window waveform `\(g(t)\)` would have the values:

<p>\begin{align}
g(t) = 0, 0, \frac{1}{5}, \frac{1}{5}, \frac{1}{5}, \frac{1}{5}, \frac{1}{5}, 0, 0
\end{align}</p>

### Multiple Pass Moving Average Filters

A _multiple pass simple moving average filter_ is a SMA filter which has been applied multiple times to the same signal. Two passes through a simple moving average filter produces the same effect as a triangular moving average filter (convolution of a square wave with a square wave is a triangle wave). After four or more passes, it is equivalent to a Gaussian filter[^analog-devices-dsp-book-ch15].

### Code Examples

The following code shows how to create a left-handed SMA filter in [Python](/programming/languages/python/). Note that this example is to show the logic behind the algorithm. For fast and easy SMA use in Python I would recommend using Numpy's `np.convolve()` or Panda's `pd.Series.rolling()`.

```python
def sma_example_code():
    """
    Example code of recursive left-handed SMA.
    """

    inputs = [1, 6, 3, 4, 2]

    window_length = 3
    moving_average = 0
    window = [0]*window_length
    curr_pos = 0

    for idx, input in enumerate(inputs):
        # Use recursive SMA algorithm
        moving_average = moving_average + 
            (1/window_length)*(input - window[curr_pos])

        # Save new input into window at correct position (overwrite oldest)
        window[curr_pos] = input

        curr_pos += 1
        if curr_pos >= len(window):
            curr_pos = 0
        
        if idx < window_length - 1:
            # SMA not yet valid
            print(f'y[{idx}] = NAN')
        else:
            print(f'y[{idx}] = {moving_average:.2f}')
```

The output is:

```
y[0] = NAN
y[1] = NAN
y[2] = 3.33
y[3] = 4.33
y[4] = 3.00
```

### Fast Start-up

Like all filters, the simple moving average filter introduces lag to the signal. You can use fast start-up logic to reduce the lag on start-up (and reset, if applicable). This is done by keeping track of how many data points have been passed through the filter, and if less have been passed through than the width of the window (i.e. some window elements are still at their initialised value, normally 0), you ignore them when calculating the average.

This is conceptually the same as having a variable-width window which increases from 1 to the maximum value, `\(x\)`, as the first `\(x\)` values are passed through the filter. The window width then stays at width `\(x\)` for evermore (or until the filter is reset/program restarts).

If you also know a what times the signal will jump significantly, you can reset the filter at these points to remove the lag from the output. You could even do this automatically by resetting the filter if the value jumps by some minimum threshold.

## Exponential Moving Average (EMA) Filters

Unlike a SMA, most EMA filters is not windowed, and the next value depends on all previous inputs. Thus most EMA filters are a form of infinite impulse response (IIR) filter, whilst a SMA is a finite impulse response (FIR) filter. There are exceptions, and you can indeed build a windowed exponential moving average filter in where the coefficients are weighted exponentially.

## Gaussian Window

The 1D Gaussian function `\(G(x)\)` is[^auckland-uni-comp-sci-gaussian-filtering]:

<p>\begin{align}
\Large
G(x) = \frac{1}{\sqrt{2\pi} \sigma} e^{-\frac{x^2}{2\sigma^2}}
\end{align}</p>

<p class="centered">
where:<br/>
\(\sigma\) is the standard deviation<br/>
</p>

A 5-item symmetric Gaussian window with a standard deviation `\(\sigma\)` of `\(1\)` would give the window coefficients:

```
[ 0.061, 0.245, 0.388, 0.245, 0.061 ]
```

TODO: Add more info.

## A Comparison Of The Popular Window Shapes

Stuck on what window shape to use? If a simple moving average won't suffice in it's simplicity, it might then depend on the frequency response you are after. Popular window shapes and their frequency responses are shown below. All the windows shown below are centered windows (and not left-aligned). The window sample weights are normalized to 1.

The frequency responses can be found by extending the window waveform with 0's, and then performing an FFT on the waveform. The resultant frequency domain waveform will be the frequency response of the window. This works because **a moving window is mathematically equivalent to a convolution, and convolution in the time domain is multiplication in the frequency domain**. Hence your input signal in the frequency domain will be multiplied by FFT of the window.

{{% img src="window-comparison-shapes.png" width="600px" caption="A comparison of the popular window shapes for moving average filters." %}}

And a comparison of the frequency responses of these windows is shown below: 

{{% img src="window-comparison-frequency-response.png" width="600px" caption="The frequency responses of the popular window shapes shown above, normalized w.r.t to the sampling frequency fs." %}}

## References

[^pieter-p-sma]: <https://tttapa.github.io/Pages/Mathematics/Systems-and-Control-Theory/Digital-filters/Simple%20Moving%20Average/Simple-Moving-Average.html>, accessed 2021-05-27.
[^pieter-p-ema]: <https://tttapa.github.io/Pages/Mathematics/Systems-and-Control-Theory/Digital-filters/Exponential%20Moving%20Average/C++Implementation.html#arduino-example>, accessed 2021-05-29.
[^dsp-stack-exchange-cut-off-freq-sma]: <https://dsp.stackexchange.com/questions/9966/what-is-the-cut-off-frequency-of-a-moving-average-filter>, accessed 2021-05-27.
[^analog-devices-dsp-book-ch15]: <https://www.analog.com/media/en/technical-documentation/dsp-book/dsp_book_Ch15.pdf>, accessed 2021-05-27.
[^auckland-uni-comp-sci-gaussian-filtering]: University of Auckland. _Gaussian Filtering (lecture slides)_. Retrieved 2022-05-15 from https://www.cs.auckland.ac.nz/courses/compsci373s1c/PatricesLectures/Gaussian%20Filtering_1up.pdf. 

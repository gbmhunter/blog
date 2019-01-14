---
author: "gbmhunter"
date: 2014-02-26
draft: false
tags: [ "moving average", "filter", "ADC", "DAC", "time domain", "discrete", "frequency response", "exponentially weighted", "multiple pass", "signal processing" ]
title: "Moving Average Filters"
type: "page"
---

## Overview

One of the classic examples of an FIR is a moving average (MA) filter. It can also be called a **box-car filter**. Although they are simple, they are the **best filter (optimal) at reducing random noise whilst retaining a sharp step respone**. However, they are the **worst filter for frequency domain signals**, they have a very poor ability to seperate one band of frequencies from another.

Moving average filters are also fast. In fact, they are the **fastest digital filter availiable** (when recursion is used).

{{% note %}}
Some equations use frequency `\( f \)`, while others use angular frequency `\( \omega \)`.
{{% /note %}}

## Terminology

<table>
    <thead>
        <tr>
            <th>Term</th>
            <th>Description</th>
        </tr>
    </thead>
<tbody>
<tr >

<td >\(M\)
</td>

<td >The number of data points used in a moving average filter. This is called the "size of the window".
</td>
</tr>
<tr >

<td >\(F\)
</td>

<td >The normalised frequency, units \(cycles/sample\). This is a frequency in the discrete time-domain. Do not confuse with \( f \),, which is a frequency in the continuous time-domain.
</td>
</tr>
<tr >

<td >\(f\)
</td>

<td >A frequency of a waveform in the continuous time-domain. Do not confuse with \( F \), which is a frequency in the discrete time-domain.
</td>
</tr>
<tr >

<td >\(f_s\)
</td>

<td >The sample frequency of a waveform, measured in the continuous time-domain. This parameter is used when you want to convert a input waveform frequency from a continuous time-domain frequency to a normalised discrete time-domain frequency (see more here).
</td>
</tr>
<tr >

<td >\( \omega \)
</td>

<td >The normalised frequency, in units \(radians/sample\).
</td>
</tr>
</tbody>
</table>

## Converting From A Continuous Time-Domain To Normalised Discrete Time-Domain Frequency

Remember, to map a continuous time-domain frequency to the discrete time-domain, use the following equation:

<div>$$ F = \frac{f}{f_s} $$</div>

<p class="centered">
    where:<br>
    \( F \) is the frequency in the discrete time-domain, in \(cycles/sample\)<br>
    \( f \) is the frequency in the continuous time-domain, in \(Hz\) (or \(cycles/second\))<br>
    \( f_s \) is the sample frequency in the continuous time-domain, in \(Hz\) (or \(samples/second\))<br>
</p>

## Simple Moving Average Filter (aka Sliding Window Filter)

The simple moving average filter is one of the most commonly used digital filters, due to it's simplicity and ease of use. There are two common types of simple moving average filters, left-hand and symmetric filters.

A left-hand simple moving average filter can be represented by:

<div>$$ y[i] = \frac{1}{M} \sum\limits_{j=0}^{M-1} x[i+j] $$</div>

<p class="centered">
    where:<br>
    \( x \) = the input signal<br>
    \( y \) = the output signal<br>
    \( M \) = the number of points in the average (the width of the window)<br>
 </p>

For example, for the points `\( x[0] = 2, x[1] = 6, x[2] = 9, x[3] = 4, x[4] = 3 \)`, with a windows size of `\(M = 3\)`, then `\( y[1] = \frac{6 + 9 + 4}{3} \)`. Left-handed filters of this type can be calculated in real-time (`\(y[i]\)` can be found as soon as `\(x[i]\)` is known).

The window can also be centered aroung the output signal (a symmetric moving average filter), with the following adjustment of the limits:

<div>$$ y[i] = \frac{1}{M} \sum\limits_{j=-(M-1)/2}^{+(M-1)/2} x[i+j] $$</div>

Symmetric simple moving averages require `\(N\)` to be odd, so that there is an equal number of points either side. One disadvantage of a symmetric filter is that you have to know data points that occur after the point in interest, and therefore is not real time.

When treating a simple moving average filter as a FIR, the coefficients are all equal. The order of the filter is 1 less than the value you divide each value by. The coefficients are given by the following equation:

<div>$$b_i = \frac{1}{N + 1}$$</div>

A simple moving average filter can also be seen as a convolution between the input signal and a rectangular pulse whose area is 1.

## Frequency Response

The frequency response for a simple moving average filter is given by:

<div>$$ |H(f)| = \frac{1}{M}\left|\frac{sin(pi F M)}{sin(\pi F)}\right| $$</div>

<p class="centered">
    where:<br>
    \( H(f) \) is the frequency response<br>
    \( F \) the normalised frequency, in \( cycles/sample \)<br>
    \( M \) = the number of points in the average (the width of the window)<br>
</p>

Note that the sine function uses radians, not degrees. You may also see this shown in angular frequency units (`\(\omega\)`), in which case `\( \omega = 2\pi F \)`.

To avoid division by zero, use `\( H(0) = M \)`. The magnitude follows the shape of a `\( sinc \)` function.

Or it can be written as:

<div>$$ H(\omega) = \frac{1}{M}(\frac{1 - e^{-j\omega L}}{1 - e^{-j\omega}}) $$</div>

<p class="centered">
    wher`e:<br>
    \( M` \) = the number of points in the average (the width of the window)<br>
</p>

## Code Examples

The following code shows how to create a `\( n = 1 \)` simple moving average filter, using the Math.Net Neodym C# library.

```    
MathNet.SignalProcessing.Filter.FIR.OnlineFirFilter filter;

// Create a simple n=1 averaging filter
private void CreateFilter(int numberOfCo)
{
    // Create coefficients
    IList<double> filterCo = new List<double>();
    for (int x = 0; x < numberOfCo; x++)
        {
            filterCo.Add(1.0/(double)numberOfCo);
        }
    // Instantiate filter
    filter = new MathNet.SignalProcessing.Filter.FIR.OnlineFirFilter(filterCo);
}

private double RunFilter(double input)
{
    // Run filter
    return filter.ProcessSample(input);
}
```

## Fast Start-up

Like all filters, the simple moving average filter introduces lag to the signal. You can use fast start-up logic to reduce the lag on start-up (and reset, if applicable). This is done by keeping track of how many data points have been passed through the filter, and if less have been passed through than the width of the window (i.e. some window elements are still at their initialised value, normally 0), you ignore them when calculating the average.

This is conceptially the same as having a variable-width window which increases from 1 to the maximum value, `\(x\)`, as the first `\(x\)` values are passed through the filter. The window width then stays at width `\(x\)` for evermore (or until the filter is reset/program restarts).

If you also know a what times the signal will jump significantly, you can reset the filter at these points to remove the lag from the output. You could even do this automatically by resetting the filter if the value jumps by some minimum threshold.

## Exponentially Weighted Moving Average Filter

A exponentially weighted moving average filter **places more weight on recent data by discounting old data in an exponential fashion**. It is a **low-pass, infinite-impulse response (IIR) filter**.

It is identical to the **discrete first-order low-pass filter**.

The equation for an exponential moving average filter is:

<div>$$ y_n = y_{n-1} \cdot (1 - \alpha) + x_n \cdot \alpha $$</div>

<p class="centered">
    where:<br>
    \( y \) = the output (\(n\) denotes the sample number)<br>
    \( x \) = the input<br>
    \( \alpha \) = is a constant which sets the cutoff frequency (a value between 0 and 1)<br>
</p>

Notice that the calculation does not require the storage of past values of `\(x\)` and only the previous value of `\(y\)`, which makes this filter computer memory friendly (especially relevant for microcontrollers). Only one addition, one subtraction, and two multiplication operations are needed.

The constant `\( \alpha \)` determines how aggressive the filter is. It can vary between 0 and 1 (inclusive). As `\( \alpha \to 0 \)`, the filter gets more and more aggressive, until at `\( \alpha = 0 \)`, where the input has no effect on the output (if the filter started like this, then the output would stay at 0). As `\( \alpha \to 1 \)`, the filter lets more of the raw input through at less filtered data, until at `\( \alpha = 1 \)`, where the filter is not "filtering" at all (pass-through from input to output).

## External Resources

[https://stratifylabs.co/embedded%20design%20tips/2013/10/04/Tips-An-Easy-to-Use-Digital-Filter/](https://stratifylabs.co/embedded%20design%20tips/2013/10/04/Tips-An-Easy-to-Use-Digital-Filter/) is a great page explaining the exponential moving average filter.

## Multiple Pass Moving Average Filters

This is when a signal is passed through a moving avergae filter multiple times. Two passes through a simple moving average filter produces the same effect as a triangular moving average filter. After four or more passes, it is equivalent to a Gaussian filter.

## Source Code

The opensource [Math.Net NeoDym library](http://neodym.mathdotnet.com/) contains C# code for using FIR filters.

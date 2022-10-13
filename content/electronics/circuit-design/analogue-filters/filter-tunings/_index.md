---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Circuit Design ]
date: 2013-01-03
description: 
draft: false
lastmod: 2022-10-09
tags: [ electronics, circuit design, filters ]
title: Filter Tunings
type: page
---

## Overview

_Filter tunings_ are specific tunings of filters to maximise a particular characteristic of it's response. Filter tuning directly specifies what the filters polynomials must be.

* **Butterworth** Optimized for the flattest response through the pass-band, at the expense of having a low transition between the pass and stop-band.
* **Chebyshev**: Designed to have a steep transition between the pass and stop-band, at the expense of gain ripple in either the pass or stopband (_type 1_ or _type 2_). Also called  Chevyshev, Tschebychev, Tschebyscheff or Tchevysheff, depending on exactly how you translate the original Russian name. There are two types of Chebyshev filters:
    * **Type 1:** _Type 1 Chebyshev filters_ (a.k.a. just a _Chebyshev filter_) have ripple in the passband, but no ripple in the stopband.
    * **Type 2:** _Type 2 Chebyshev filters_ (a.k.a. an _inverse Chebyshev filter_) have ripple in the stopband, but no ripple in the passband.
* **Bessel**: Optimized for linear phase response up to (or down to for high-pass filters) the cutoff frequency `\(f_c\)`, at the expense of a slower transition to the stop-band. This is useful to minimizing the signal distortion (a linear _phase response_ in the frequency domain is a constant _time delay_ in the time domain).
* **Elliptic:** Designed to have the fastest transition from the passband to the stopband, at the expense of ripple in both of these bands (Chebyshev optimization only produces ripple in one of the bands but is not as fast in the transition). Also called _Cauer_ filters or _Rational Chebyshev_ filters.

The graphs below show the differences in response (bode plots, gain and phase) for these various filter tunings:

{{% figure src="low-pass-filter-optimization-comparison-gain-db.png" width="700px" caption="A comparison of different filter optimizations. Gain shown in dB." %}}

Sometimes the differences can been visualized better by display the gain as `\(V/V\)`:

{{% figure src="low-pass-filter-optimization-comparison-gain-vv.png" width="700px" caption="A comparison of different filter optimizations. Gain shown in V/V." %}}

The linear phase delay of the Bessel filter is best visualized in the below plot where the phase in plotted on a linear scale rather than a logarithmic:

{{% figure src="low-pass-filter-optimization-comparison-phase-linear.png" width="700px" caption="Phase delay of different filter optimizations, with the frequency plotted on a linear axis rather than a logarithmic axis. This is the best way to visualize the linear phase delay of the Bessel optimization." %}}

### Butterworth Tunings

Tuning a filter for a Butterworth response gives a filter which is **maximally flat in the passband**, and rolls off towards zero in the stopband. The price you pay for this is slower roll-off into the stop-band, compared with Chebyshev or Elliptic tunings.

{{% tip %}}
It may sounds dumb, but I've always remembered Butterworth as a flat passband which "slides like butter".
{{% /tip %}}

Butterworth tunings are defined as a filter whose magnitude is[^bib-wikipedia-butterworth-filter]:

<p>\begin{align}
\label{eq:butterworth-magnitude}
| H_n(s) | \triangleq \frac{1}{\sqrt{1 + \omega^{2n}}}
\end{align}</p>

<p class="centered">
where:<br/>
\(\omega\) is the angular frequency \([rads^{-1}]\)<br/>
\(n\) is the order of the filter<br/>
</p>

The normalized Butterworth polynomial of degree `\(n\)` is given by[^bib-pieter-p-butterworth-filters]:

<p>\begin{align}
\label{eq:butterworth-polynomial}
B_n(s) =
\begin{cases}
  \prod_{k=0}^{\frac{n}{2} - 1}(s^2 -2\cos{(2\pi\frac{2k + n + 1}{4n})s + 1}) & \text{even }n \\
  (s + 1)\prod_{k=0}^{\frac{n - 1}{2} - 1}(s^2 -2\cos{(2\pi\frac{2k + n + 1}{4n})s + 1}) & \text{odd }n \\
\end{cases}
\end{align}</p>

{{% tip %}}
If you've never seen it before, the uppercase Pi symbol `\(\prod\)` in the above equation represents the product of a series of things, such like the uppercase Sigma symbol `\(\Sigma\)` represents the sum of a series of things. For example, `\(\prod_{k=1}^{3}k = 1\times 2 \times 3\)`.
{{% /tip %}}

Below is a table of the normalized factored Butterworth polynomials for order `\(n\)`. The polynomial is useful in this form as each product forms either a first or second-order partial filter which can be directly implemented by a standard filter topology (e.g. RC filter for a first-order section, Sallen-Key for a second-order section). These polynomials were generated with `\(Eq.\ \ref{eq:butterworth-polynomial}\)`. The polynomials are normalized by setting `\(\omega_c = 1\)` (the characteristic frequency).

_All numbers are rounded to 3 decimal places_.

{{% file src="butterworth-factored-polynomial-table.html" %}}

Using these polynomials `\(B_n\)`, we can write the transfer function of a Butterworth filter as[^bib-pieter-p-butterworth-filters]:

<p>\begin{align}
H_n(s) = \frac{1}{B_n}
\end{align}</p>

{{% note %}}
This equation is different from `\(Eq.\ \ref{eq:butterworth-magnitude}\)` which defined the magnitude of a Butterworth filter, because this equation lacks the magnitude `\(|\)` symbols around `\(H_n(s)\)`. This equation is the full-and-proper transfer function, which contains both the magnitude and phase information.
{{% /note %}}

This transfer function gives the following bode plots (by taking the magnitude and arg of the transfer function):

{{% figure src="butterworth-bode-plot-for-various-n.png" width="900px" caption="Magnitude and phase bode plots for normalized Butterworth filters of orders 1, 2, 4 and 8." %}}

The Butterworth polynomial coefficients `\(a_0, a_1, ..., a_n\)` for an `\(n\)`-order filter can be calculated with this product-based equation[^bib-wikipedia-butterworth-filter]:

<p>\begin{align}
a_{k}=\prod _{\mu =1}^{k}{\frac {\cos((\mu -1)\gamma )}{\sin(\mu \gamma )}}
\end{align}</p>

<p class="centered">
where:<br/>
\(a_0 = 1\) (ignore the above equation for \(a_0\))<br/>
\(\gamma = \dfrac{\pi}{2n}\)<br/>
</p>

There is also a recursive formula to calculate the coefficients, but we'll just use the product based one. The below table shows the Butterworth polynomial coefficients calculated with this equation, up to `\(n=8\)` (8th order filter).

{{% file src="butterworth-polynomial-coeffs-table.html" %}}

For example, the above table tells you for order `\(n=3\)` the Butterworth polynomial is `\(s^3 + 2s^2 + 2s + 1\)`. If expand the factorized version we should arrive at the same polynomial:

<p>\begin{align}
B_3 &= (s + 1)(s^2 + s + 1) \nonumber \\
    &= s^3 + s^2 + s + s^2 + s + 1 \nonumber \\
    &= s^3 + 2s^2 + 2s + 1 \nonumber \\
\end{align}</p>

Yay, they are the same!


### Chebyshev Optimization

Chebyshev filters with even order numbers (e.g. 2nd order, 4th order, ...) generate ripples above the 0dB line, filters with odd order numbers (e.g. 3rd order, 5th order, ...) generate ripples below the 0dB line.

Because Chebyshev filters have ripple in the pass-band, **their cutoff frequency is usually defined in a completely different way to all other filter optimizations**. Rather than specifying `\(f_c\)` as the -3dB point, the `\(f_c\)` for Chebyshev filters is defined at the point at which the gain leaves the allowed ripple region (i.e. > 0.5dB for a 0.5dB Chebyshev filter, > 3dB for a 3dB Chebyshev filter).

### Bessel Optimization

Commonly used in analogue-crossover circuitry.

### Elliptic Optimization

Elliptic optimization (a.k.a. a Cauer or Zolotarev filter[^bib-rutgers-elliptic-lecture-notes]) is a filter that is optimized for the fastest transition in gain from the passband to the stopband. It has equal ripple in both the passband and stopband[^bib-wikipedia-elliptic-filter].

You can generate an Elliptical filter in Python using the scipy package:

```python
scipy.signal.ellip(N, rp, rs, Wn, btype='low', analog=False, output='ba', fs=None)
```

### Filter Coefficient Tables

* `\(n\)` is the filter order
* `\(i\)` is the partial filter order
* `\(a_i\)` and `\(b_i\)` are the filter coefficients
* `\(k_i\)` is the ratio between the corner frequency of the partial filter `\(f_{ci}\)` and the corner frequency of the overall filter `\(f_c\)`. In equation form:
    <p>\begin{align}k_i = \frac{f_{ci}}{f_c} \end{align}</p>
* `\(Q_i\)` is the quality factor of the partial filter

All values have been normalized by setting `\(\omega_c = 1\)`.

#### Butterworth Coefficients

<table>
  <thead>
    <tr><th>n</th>  <th>\(i\)</th>  <th>\(a_i\)</th>  <th>\(b_i\)</th>  <th>\(k_i\)</th>  <th>\(Q_i\)</th>  <th style="width: 200px;">Polynomial Factors</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td>      <td>1</td>      <td>1.0000</td>   <td>0.0000</td>   <td>1.000</td>    <td>n/a</td>  <td>\(s + 1\)</td></tr>
    <tr><td>2</td>      <td>1</td>      <td>1.4142</td>   <td>1.0000</td>   <td>1.000</td>    <td>0.71</td> <td>\(s^2 + 1.4142s + 1\)</td></tr>
    <tr><td>3</td>      <td>1</td>      <td>1.0000</td>   <td>0.0000</td>   <td>1.000</td>    <td>n/a</td>  <td rowspan="2">\((s + 1)(s^2 + s + 1)\)</td></tr>
    <tr><td></td>       <td>2</td>      <td>1.0000</td>   <td>1.0000</td>   <td>1.272</td>    <td>1.00</td></tr>
  </tbody>
</table>



#### Chebyshev Coefficients For 3dB Passband Ripple

<table>
  <thead>
    <tr><th>n</th>  <th>\(i\)</th>  <th>\(a_i\)</th>  <th>\(b_i\)</th>  <th>\(k_i\)</th>  <th>\(Q_i\)</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td>      <td>1</td>      <td>1.0000</td>   <td>0.0000</td>   <td>1.000</td>    <td>n/a</td></tr>
    <tr><td>2</td>      <td>1</td>      <td>1.0650</td>   <td>1.9305</td>   <td>1.000</td>    <td>1.30</td></tr>
    <tr><td>3</td>      <td>1</td>      <td>2.7994</td>   <td>0.0000</td>   <td>0.357</td>    <td>n/a</td></tr>
    <tr><td></td>       <td>2</td>      <td>0.4300</td>   <td>1.2036</td>   <td>1.378</td>    <td>2.55</td></tr>
  </tbody>
</table>

#### Bessel Coefficients

<table>
  <thead>
    <tr><th>n</th>  <th>\(i\)</th>  <th>\(a_i\)</th>  <th>\(b_i\)</th>  <th>\(k_i\)</th>  <th>\(Q_i\)</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td>      <td>1</td>      <td>1.0000</td>   <td>0.0000</td>   <td>1.000</td>    <td>n/a</td></tr>
    <tr><td>2</td>      <td>1</td>      <td>1.3617</td>   <td>0.6180</td>   <td>1.000</td>    <td>0.58</td></tr>
    <tr><td>3</td>      <td>1</td>      <td>0.7560</td>   <td>0.0000</td>   <td>1.323</td>    <td>n/a</td></tr>
    <tr><td></td>       <td>2</td>      <td>0.9996</td>   <td>0.4772</td>   <td>1.414</td>    <td>0.69</td></tr>
  </tbody>
</table>

## References

[^bib-pieter-p-butterworth-filters]: Pieter P (2021, Jul 15). _Butterworth Filters_. Retrieved 2022-10-06, from https://tttapa.github.io/Pages/Mathematics/Systems-and-Control-Theory/Analog-Filters/Butterworth-Filters.html.
[^bib-wikipedia-butterworth-filter]: Wikipedia (2022, Aug 25). _Butterworth Filter_. Retrieved 2022-10-08, from https://en.wikipedia.org/wiki/Butterworth_filter.
[^bib-wikipedia-elliptic-filter]: Wikipedia (2022, Jan 30). _Elliptic filter_. Retrieved 2022-09-20, from https://en.wikipedia.org/wiki/Elliptic_filter.
[^bib-rutgers-elliptic-lecture-notes]: Sophocles J. Orfanidis (2006, Nov 20). _Lecture Notes on Elliptic Filter Design_. Rutgers University: Department of Electrical & Computer Engineering. Retrieved 2022-09-20, from https://www.ece.rutgers.edu/~orfanidi/ece521/notes.pdf.

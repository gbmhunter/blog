---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Circuit Design ]
date: 2013-01-03
description: Butterworth, Chebyshev, Bessel, elliptic, transfer functions, polynomials, equations, graphs and more information on analogue filter tunings. 
draft: false
lastmod: 2022-10-20
tags: [ electronics, circuit design, filters, tunings, Butterworth, Chebyshev, Bessel, Bessel-Thomson, Elliptic, analogue, mathematics, transfer functions, polynomials, equations, graphs, passband, stopband ]
title: Filter Tunings
type: page
---

## Overview

_Filter tunings_ are specific tunings of filters to maximise a particular characteristic of it's response. Filter tuning directly specifies what the filters polynomials must be in it's transfer function (see [What Are Transfer Functions, Poles and Zeroes](/electronics/circuit-design/what-are-transfer-functions-poles-and-zeroes/) for more info).

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

## Butterworth Tunings

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

Yay, they are the same! If you are ever wanting to generate the Butterworth polynomial coefficients yourself, here is a Python function that returns you the Butterworth coefficients for any order `\(n\)`:

```python
from typings import List
import numpy as np

def calc_butterworth_coeffs_for_order(n: int) -> List[float]:
    """
    Calculates the Butterworth polynomial coefficients for the given degree n.

    Equation from https://en.wikipedia.org/wiki/Butterworth_filter:
        {\displaystyle a_{k}=\prod _{\mu =1}^{k}{\frac {\cos((\mu -1)\gamma )}{\sin(\mu \gamma )}}\,,}

    Args:
        n   Degree of Butterworth polynomial. Must be >= 0.
    Returns:
        Coefficients of Butterworth polynomial of degree n. Coefficients are returned in a list, in this order: [ a0, a1, ..., an ].
    """

    gamma = np.pi / (2*n)
    # Need to calculate n + 1 coefficients
    coeffs = []
    for k in range(n + 1):
        if k == 0:
            # a_0 = 1.0
            coeffs.append(1.0)
        else:
            # Use product formula
            product = 1.0
            for mew in range(1, k + 1):
                product *= np.cos((mew - 1)*gamma) / np.sin(mew * gamma)
            coeffs.append(product)
    return coeffs
```

## Chebyshev Tunings

Chebyshev-tuned filters with even order numbers (e.g. 2nd order, 4th order, ...) generate ripples above the 0dB line, filters with odd order numbers (e.g. 3rd order, 5th order, ...) generate ripples below the 0dB line.

Chebyshev-tuned filters can be further broken down into two _types_: 

* **Type I:** Ripple in the pass-band, no ripple in the stop-band. This is the most common type of Chebyshev-tuned filter, as it has faster roll-off. Sometimes referred to just as a _Chebyshev filter_ (with no mention that it's Type I).
* **Type II:** No-ripple in the pass-band, ripple in the stop-band. Also known as an _inverse Chebyshev-tuned filter_. This is not as popular as Type I as it's roll-off is not as steep.

Because Chebyshev filters have ripple in the pass-band, **their cutoff frequency is usually defined in a completely different way to all other filter optimizations**. Rather than specifying `\(f_c\)` as the -3dB point, the `\(f_c\)` for Chebyshev filters is defined at the point at which the gain leaves the allowed ripple region (i.e. > 0.5dB for a 0.5dB Chebyshev filter, > 3dB for a 3dB Chebyshev filter).

A Type I Chebyshev tuned filter of order `\(n\)` has a gain response of[^bib-wikipedia-chebyshev-filter]:

<p>\begin{align}
| H_n(s) | = \frac{1}{\sqrt{1 + \varepsilon^2 T_n(\omega / \omega_0)^2}}
\end{align}</p>

<p class="centered">
where:<br/>
\(\varepsilon\) is the damping factor<br/>
\(\omega_0\) is the characteristic frequency<br/>
\(T_n(\omega / \omega_0)\) is a Chebyshev polynomial of the first kind with order \(n\) </br>
</p>

{{% note %}}
The are actually two different kinds of "Chebyshev polynomials". In analogue filter design, we always use the first kind (for both Type I and Type II Chebyshev filters), commonly denoted `\(T_n\)`. Chebyshev polynomials of the second kind are usually denoted `\(U_n\)`.
{{% /note %}}

The ripple in the passband may have multiple maxima and minima. However, the peaks of each maxima/minima have the same amplitude (i.e. they are bounded by a fixed value). This is known as equiripple behaviour, and stems from the core definition of a Type I Chebyshev polynomial.

The driving factor behind the Chebyshev tunings is the Chebyshev polynomials of the first kind. They are defined by[^bib-wikipedia-chebyshev-polynomials]:

<p>\begin{align}
T_n(\cos{\theta}) &= \cos(n\theta) \\
\end{align}</p>

{{% tip %}}
It's a little unusual in the way it's normally defined with it being a function of `\(\cos(\theta)\)` rather than just `\(x\)`. If you let `\(x = \cos \theta\)`, then you can substitute `\(\theta = \arccos x\)` are arrive at: 

<p>\begin{align}
T_n(x) &= \cos(n\arccos(x)) \text{ for }|x| \leq 1 \\
\end{align}</p>
{{% /tip %}}

You can calculate the Chebyshev polynomials of the first kind with the recursive definition[^bib-wikipedia-chebyshev-polynomials]:

<p>\begin{align}
T_0(x)     &= 1 \nonumber \\
T_1(x)     &= x \nonumber \\
T_{n+1}(x) &= 2xT_n(x) - T_{n-1}(x) \\
\end{align}</p>

The first 6 Chebyshev polynomials are shown below:

<p>\begin{align}
T_0(x) &= 1 \nonumber \\
T_1(x) &= x \nonumber \\
T_2(x) &= 2x^2 - 1 \nonumber \\
T_3(x) &= 4x^3 - 3x \nonumber \\
T_4(x) &= 8x^4 - 8x^2 + 1 \nonumber \\
T_5(x) &= 16x^5 - 20x^3 + 5x \nonumber \\
\end{align}</p>

These are special polynomials in which the leading coefficient (coefficient in front of the highest power of `\(x\)`) is the largest value it can be whilst the polynomial is bounded between `\([-1, 1]\)` on the interval `\(x\ \epsilon\ [-1, 1]\)`[^bib-wikipedia-chebyshev-polynomials]. You can see this interesting behaviour in the below graph. It shows the first 6 Chebyshev polynomials `\(T_0\)` through to `\(T_5\)`. Note that `\(T_0 = 1\)`, and is somewhat hidden by the horizontal bounding line.

{{% figure src="chebyshev-poly-graph.png" width="600px" caption="The first 6 Chebyshev polynomials (of the first kind) from `\(T_1\)` to `\(T_6\)`." %}}

The below Python function can be used to calculate the Chebyshev polynomial coefficients of the first kind, for a given order `\(n\)`. Although we could build up a recursive function and use sympy to find them based of the recursive equation above, it's easier just to use the `numpy.polynomial` module which provides a function to calculate them.

```python
import numpy.polynomial
def chebyshev_poly_coeffs(n: int) -> List[float]:
    """
    Calculates the Chebyshev polynomial coefficients (of the first kind) for the provided degree n.

    Args:
        n: Degree of polynomial. Must be >= 0.
    Returns:
        List of Chebyshev polynomial coefficients, sorted from lowest degree to highest degree i.e. [ a_0, a_1, ..., a_n ].
    """
    # First build up coefficients for a_0T_0 + a_1T_1 + ... a_nT_n
    input_coeffs = [0] * (n + 1)
    input_coeffs[-1] = 1 # Set the last item to 1, this corresponds to T_n(x)
    # Now convert this to Chebyshev polynomial coefficients
    poly_coeffs = numpy.polynomial.chebyshev.cheb2poly(input_coeffs)
    return poly_coeffs
```

## Bessel Tunings

A _Bessel_ tuned filter is one which has a **maximally linear phase response**. This corresponds to a **maximally flat group/phase delay** (the time it takes for a signal to pass through as a function of frequency). This behaviour preserves the shapes of filtered signals in the passband, which is a desirable property for audio signals. It is also sometimes called _Bessel-Thomson_ tuned filters because W. E. Thomson who worked out how to apply Bessel functions to electronic filters in 1949[^bib-thomson-delay-networks-maximally-flat-freq].

The transfer function of a low-pass Bessel tuned filter is[^bib-wikipedia-bessel-filter]:

<p>\begin{align}
H(s) &= \frac{\theta_n(0)}{\theta_n(s/\omega_0)}
\end{align}</p>

where `\(\theta_n(s)\)` is a reverse Bessel polynomial (more on this below), `\(\omega_0\)` is the characteristic frequency and `\(s=k\omega\)`.

The reverse Bessel polynomials are given by[^bib-wikipedia-bessel-filter]:

<p>\begin{align}
\theta_n(s) &= \sum_{k=0}^n a_k s^k
\end{align}</p>

where `\(a_k\)` is a coefficient given by:

<p>\begin{align}
a_k &= \frac{(2n - k)!}{2^{n-k}k!(n - k)!}
\end{align}</p>

However, by this definition of the reverse Bessel polynomials, `\(\theta_n(0)\)` is indeterminate. So instead, `\(\theta_n(0)\)` is defined as:

<p>\begin{align}
\theta_n(0) &= \lim_{x \to 0} \theta_n(x)
\end{align}</p>

The above equations were used to generate the table below, which lists the reverse Bessel polynomials of degree 0 to 8. 

{{% file src="bessel-polynomial-coeffs-table.html" %}}

The visually demonstrate the flat group delay of the Bessel tuned filter, we can plot the group delay of the Bessel-tuned 4th-order low-pass filter vs. a number of other popular tunings. The below plot shows the group delay for Bessel, Butterworth, Chebyshev and Elliptic tuned filter. The critical frequency was set to `\(10kHz\)` for all filter tunings. All filters are 4th-order. As you can see, the Bessel tuned filter has the flattest group delay.

{{% figure src="tuning-comparison-group-delay.png" width="700px" caption="The group delay for various 4th-order filter tunings. The Bessel-tuned filter has the flattest group delay in the passband." %}}

<div class="worked-example">

**Find the transfer function for a 2nd-order Bessel low-pass filter with `\(\omega_0 = 1\)`. Then find the equations for magnitude/phase and create bode plots.**

Using the equations or table above, the 2nd-order reverse Bessel polynomial `\(\theta_2(s/1) = s^2 + 3s + 3\)`. The limit of this function as `\(s \to 0\)` is `\(3\)`. So:

<p>\begin{align}
H(s) &= \frac{\theta_n(0)}{\theta_n(s/\omega_0)} \nonumber \\
     &= \frac{3}{s^2 + 3s + 3} \nonumber \\
\end{align}</p>

To find the magnitude response of this we substitute `\(s = j\omega\)`.

<p>\begin{align}
|H(\omega)| &= \left|\frac{3}{(j\omega)^2 + 3(j\omega) + 3}\right| \nonumber \\
            &= \frac{3}{|-\omega^2 + 3j\omega + 3|} \nonumber \\
            &= \frac{3}{| (3-\omega^2) + j(3\omega) |} \nonumber \\
            &= \frac{3}{\sqrt{\omega^4 - 6\omega^2 + 9 + 9\omega^2}} \nonumber \\
            &= \frac{3}{\sqrt{\omega^4 + 3\omega^2 + 9}} \nonumber \\
\end{align}</p>

And finding the phase response:

<p>\begin{align}
\angle H(\omega) &= Arg{\left(\frac{\Im \{H(s)\}}{\Re \{H(s)\}}\right)} \nonumber \\
                 &= Arg{\frac{\Im (num)}{\Re (num)}} - Arg{\frac{\Im (den)}{\Re (den)}} \nonumber \\
                 &= Arg{\frac{0}{3}} - Arg{\frac{3\omega}{3 - \omega^2}} \nonumber \\
\end{align}</p>

`\(Arg\)` can be implemented with `atan2()` in most programming languages, i.e.:

<p>\begin{align}
\angle H(\omega) &= Arg{\frac{0}{3}} - Arg{\frac{3\omega}{3 - \omega^2}} \nonumber \\
                 &= atan2(0,\ 3) - atan2(3\omega,\ 3 - \omega^2) \nonumber \\
\end{align}</p>

We now use these equations for magnitude and phase and create bode plots!

{{% figure src="bessel-2nd-order-bode-plot.png" width="600px" caption="Bode plots for the 2nd-order Bessel low-pass filter." %}}

</div>

## Elliptic Tunings

Elliptic-tuned filters (a.k.a. a Cauer or Zolotarev filter[^bib-rutgers-elliptic-lecture-notes]) is a filter that is optimized for the fastest transition in gain from the passband to the stopband. It has equal ripple in both the passband and stopband[^bib-wikipedia-elliptic-filter].

You can generate an Elliptical filter in Python using the scipy package:

```python
import scipy.signal

scipy.signal.ellip(N, rp, rs, Wn, btype='low', analog=False, output='ba', fs=None)
```

## Filter Coefficient Tables

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



### Chebyshev Coefficients For 3dB Passband Ripple

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

### Bessel Coefficients

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
[^bib-wikipedia-chebyshev-filter]: Wikipedia (2022, Oct 11). _Chebyshev Filter_. Retrieved 2022-10-14, from https://en.wikipedia.org/wiki/Chebyshev_filter.
[^bib-wikipedia-chebyshev-polynomials]: Wikipedia (2022, Oct 16). _Chebyshev polynomials_. Retrieved 2022-10-16, from https://en.wikipedia.org/wiki/Chebyshev_polynomials.
[^bib-thomson-delay-networks-maximally-flat-freq]: W. E. Thomson (1949, Nov). _Delay networks having maximally flat frequency characteristics_. 621.392.5: Paper No. 872 - Radio section.
[^bib-wikipedia-bessel-filter]: Wikipedia (2022, Oct 16). _Bessel filter_. Retrieved 2022-10-20, from https://en.wikipedia.org/wiki/Bessel_filter.

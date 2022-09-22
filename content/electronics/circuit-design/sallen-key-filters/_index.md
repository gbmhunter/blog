---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Circuit Design ]
date: 2013-01-03
description:
draft: false
lastmod: 2022-09-21
tags: [ electronics, circuit design, filters, active filters, low-pass, high-pass, bode plot, frequency response, Sallen-Key, voltage-controlled voltage source, VCVS, cutoff frequency ]
title: Sallen-Key Filters
type: page
---

## Overview

The Sallen-Key filter is one of the **most popular active 2nd-order analogue filters**[^bib-analog-devices-ch8-analog-filters]. It can be configured as a low-pass, high-pass, band-pass or band-stop filter. Also called a _Sallen and Key_ filter. It was first introduced in 1955 by R.P. Sallen and E.L. Key of MIT's Lincoln Labs, whose last names give this filter it's name.

It has low _component spread_ (low ratios of highest to lowest capacitor and resistor values). It also has a high input impedance and low output impedance, allowing for multiple filters to be chained together without intermediary buffers.

The performance of a Sallen-Key filters does not depend that much on the performance of the op-amp. This is because the op-amp is used as an amplifier, rather than an integrator, which minimizes the gain-bandwidth requirements of the op-amp[^bib-analog-devices-ch8-analog-filters].

One disadvantage of the Sallen-Key filter is that the Q of the filter is very sensitive to component variations, which can be a problem, especially for high-Q filter sections.

The Sallen-Key filter is closely related to a _voltage-controlled voltage source (VCVS)_ filter. Some literature makes the distinction of a Sallen-Key filter having unity gain, and the VCVS filter including non-unity gain by connecting a resistor divider from the output to the inverting terminal of the op-amp. However we will consider them one and the same for the purpose of analysis, as the unity-gain version is a special subtype of the generalized with-gain version.

## Low-Pass Sallen-Key Filter

The schematic for a unity-gain low-pass Sallen-Key filter is shown below:

{{% figure src="low-pass-unity-gain-sallen-key-filter-schematic.png" width="700px" caption="The schematic for a unity-gain low-pass Sallen-Key filter." %}}

It looks like 2 cascaded RC filters, except with the other terminal of the 1st capacitor connected to the op-amp's output rather than ground! What does this mean?

{{% warning %}}
Take note of labelling of the resistors and capacitors if reading other material on Sallen-Key filters, there is no one popular convention as the resistor and capacitor orders are switched frequently.
{{% /warning %}}

We will simulate the response of a Sallen-Key filter designed with a cutoff frequency of 1kHz. Below is the KiCad schematic used for the simulation:

{{% figure src="low-pass-sallen-key/low-pass-sallen-key-simulation-schematic.png" width="800px" caption="Simulation schematics of a low-pass Sallen-Key filter designed for a cutoff frequency of 1kHz." %}}

The KiCad schematic for this simulation can be <a href="low-pass-sallen-key/low-pass-sallen-key.sch" download>downloaded here</a>. The simulated gain (magnitude) and phase response is shown below.

{{% figure src="low-pass-sallen-key/response.png" width="800px" caption="The simulated gain (magnitude) and phase response of a low-pass Sallen-Key filter designed for a cutoff frequency of 1kHz. The dotted line shows the cutoff frequency." %}}

The generalized transfer function for a 2nd-order low-pass filter is[^bib-ti-analysis-of-sallen-key-arch]:

<p>\begin{align}
H(f) &= \frac{K}{-\left( \frac{f}{f_c} \right)^2 + \frac{jf}{Qf_c} + 1} \\
\end{align}</p>

<p class="centered">
where:<br/>
\(K\) is the gain factor<br/>
\(f_c\) is the cut-off frequency in Hertz [\(Hz\)]<br/>
\(Q\) is the quality factor<br/>
</p>

The transfer function for a 2nd-order low-pass Sallen-Key filter is[^bib-ti-analysis-of-sallen-key-arch]:

<p>\begin{align}
H(s) &= \frac{K}{(R1R2C1C2)s^2 + (R1C1 + R2C1 + R1C2(1 - K))s + 1} \\
\end{align}</p>

The cut-off frequency is:

<p>\begin{align}
f_c = \frac{1}{2\pi \sqrt{R1R2C1C2}}
\end{align}</p>

and the quality factor is:

<p>\begin{align}
Q = \frac{\sqrt{R1R2C1C2}}{R1C1 + R2C1 + R1C2(1 - K)}
\end{align}</p>

### Low-Pass Simplifications

There are a range of different "simplifications" you can make to Sallen-Key filter design to make it easier to calculate the required resistances and capacitances for you desired cut-off frequency, Q and tuning[^bib-ti-active-low-pass-filter-design].

#### Set Filter Components As Ratios

The idea here is to define a new variable `\(m\)` which is the ratio of the resistances and a new variable `\(n\)` which is a ratio of the capacitances. **This is the most basic of simplifications**, and actually doesn't impose any restrictions on any of the values.

So we define:

<p>\begin{align}
R_1 = mR,\ R_2 = R,\ C_1 = C,\ C_2 = nC \\
\end{align}</p>

This simplifies the cut-off frequency and quality factor equations to:

<p>\begin{align}
f_c &= \frac{1}{2\pi RC\sqrt{mn}} \\
Q   &= \frac{\sqrt{mn}}{m + 1 + mn(1 - K)} \\
\end{align}</p>

Firstly, you decide on a desired gain `\(K\)` and quality factor `\(Q\)`. Then chose a ratio `\(n\)` for the capacitors, for example `\(1\)`. This will allow you to calculate `\(m\)` using the equation for the quality factor.

With arbitrary `\(K\)`, `\(Q\)` and `\(n\)`, solving the quality factor equation for `\m\)` gives something truly horrible (I got [Wolfram Alpha to solve this one](https://www.wolframalpha.com/input?i=solve+Q%3Dsqrt%28m+n%29%2F%28m+%2B+1+%2B+m+n%281+-+K%29%29+for+m) for me):

<p>\begin{align}
m = \frac{2 K n Q^2 - \sqrt{n} \sqrt{4 K n Q^2 - 4 n Q^2 + n - 4 Q^2} - 2 n Q^2 + n - 2 Q^2)}{(2 Q^2 (K^2 n^2 - 2 K n^2 - 2 K n + n^2 + 2 n + 1)}
\end{align}</p>

Lastly, decide on your cut-off frequency `\(f_c\)` and then you can calculate `\(R\)` using the cut-off frequency equation.

<p>\begin{align}
R &= \frac{1}{2\pi f_c C\sqrt{mn}} \\
\end{align}</p>

### Tuning Based Design

You can design a Sallen-Key filter based of a particular filter tuning and it's coefficients, this is an alternative to choosing the quality factor and gain yourself. Given the filter tuning coefficients `\(a_0\)` and `\(a_1\)` and desired cut-off frequency `\(f_c\)` you can then calculate the required resistances and capacitances.

The resistance of the resistors `\(R1\)` and `\(R2\)` are related to the capacitances and filter coefficients by the following equation:

<p>\begin{align}
\label{eqn:r1r2eq}
R1, R2 = \frac{a_1 C1 \mp \sqrt{ (a_1 C1)^2 - 4 b_1 C1C2}}{4\pi f_c C1 C2}
\end{align}</p>

You use the `\(-\)` sign when calculating `\(R1\)` and the `\(+\)` sign for calculating `\(R2\)`.

To obtain real values under the square root, `\(C1\)` must obey the follow condition:

<p>\begin{align}
\label{eqn:c1geq}
C1 \geq C2 \frac{4b_1}{a_1^2}
\end{align}</p>

{{% note %}}
The choice of resistances affects the cut-off frequency, but the choice of capacitors does not.
{{% /note %}}

These equations give you enough info to calculate all the resistances and capacitors for a Sallen-Key filter. See the design example below to show how you would go about it.

<div class="worked-example">

**Design Example: 2nd-Order Low-Pass Unity-Gain 3dB-Chebyshev Sallen-Key Filter**

The task is to design a 2nd-order unity-gain Sallen-Key filter optimized with Chebyshev 3dB ripple coefficients (this will give us a sharp transition from the passband to the stopband) and a corner frequency of `\(f_c = 1kHz\)`.

1. Look up the [Chebyshev filter coefficients](/electronics/circuit-design/analogue-filters/#filter-coefficient-tables). From the table we get:
    <p>\begin{align}
    a_1 = 1.0650 \\
    b_1 = 1.9305 \\
    \end{align}</p>

1. Choose a capacitance for `\(C2\)`. This is rather arbitrary, but a good recommended starting range is something between `\(1-100nF\)`. Lets pick:
    <p>\begin{align}
    C2 = 10nF
    \end{align}</p>

1. Calculate the capacitance of `\(C1\)` from `\(Eq. \ref{eqn:c1geq}\)`:
    <p>\begin{align}
    C1 &\geq C2 \frac{4b_1}{a_1^2} \\
        &\geq 10nF \frac{4\cdot1.9305}{1.0650^2} \\
        &\geq 68.1nF
    \end{align}</p>

    Pick the next largest E12 value:

    <p>\begin{align}
    C1 = 82nF
    \end{align}</p>

1. Calculate `\(R1\)` and `\(R2\)` using `\(Eq. \ref{eqn:r1r2eq}\)`:
    <p>\begin{align}
    R1 &= \frac{a_1 C1 - \sqrt{(a_1 C1)^2 - 4 b_1 C1C2}}{4\pi f_c C1 C2} \\
        &= \frac{1.0650 \cdot 82nF - \sqrt{1.0650^2 \cdot 82nF^2 - 4 \cdot 1.9305 \cdot 10nF \cdot 82nF}}{4\pi \cdot 1kHz \cdot 10nF \cdot 82nF} \\
        &= 4.98k\Omega
    \end{align}</p>

    <p>\begin{align}
    R2 &= \frac{a_1 C2 + \sqrt{a_1^2 C2^2 - 4 b_1 C1C2}}{4\pi f_c C1 C2} \\
        &= \frac{1.0650 \cdot 82nF + \sqrt{1.0650^2 \cdot 82nF^2 - 4 \cdot 1.9305 \cdot 10nF \cdot 82nF}}{4\pi \cdot 1kHz \cdot 10nF \cdot 82nF} \\
        &= 12.0k\Omega
    \end{align}</p>

    Pick the closest E96 values:
    <p>\begin{align}
    R1 = 4.99k\Omega \\
    R2 = 12.1k\Omega
    \end{align}</p>

1. Build the circuit! It should look like this:
    {{% figure src="low-pass-sallen-key-chebyshev-3db/schematic-print.svg" width="700px" caption="Schematic of the design example (2nd-order 3dB Chebyshev Sallen-Key low-pass filter with a cutoff frequency of 1kHz) above." %}}
1. And just good measure this was simulated, to make sure the response is as expected.

    {{% figure src="low-pass-sallen-key-chebyshev-3db/response.png" width="700px" caption="Simulated response of the design example (2nd-order 3dB Chebyshev Sallen-Key low-pass filter with a cutoff frequency of 1kHz) above." %}}

</div>

## High-Pass Sallen-Key Filter

You can arrive at a high-pass Sallen-Key filter by switching the positions of the resistors and capacitors in a low-pass Sallen-Key filter (just like you can for passive RC filters). This gives you the following schematic:

The transfer function for a 2nd-order high-pass Sallen-Key filter is[^bib-ti-2nd-order-sallen-key-high-pass]:

<p>\begin{align}
H(s) &= \frac{s^2}{s^2 + \left(\frac{1}{R2C1} + \frac{1}{R2C2}\right)s + \frac{1}{R1C1R2C2}} \\
\end{align}</p>

It is similar to the transfer function for the low-pass filter, except note:
1. It's just `\(s^2\)` on the numerator.
2. The coefficient for `\(s\)` on the denominator changes from `\(\left(\frac{1}{R1C1} + \frac{1}{R2C2}\right)\)` to `\(\left(\frac{1}{R2C1} + \frac{1}{R2C2}\right)\)`.

This means our filter coefficients `\(a_0\)` and `\(a_1\)` are:

<p>\begin{align}
a_0 &= \frac{1}{R1 \times R2 \times C1 \times C2} \\
a_1 &= \frac{1}{R2 \times C1} + \frac{1}{R2 \times C2} \\
\end{align}</p>

<div class="worked-example">

**Design Example: 2nd-Order High-Pass Unity-Gain Butterworth Sallen-Key Filter**

For the low-pass filter example we chose Chebyshev tunings, this time around we are going to use Butterworth tunings.

From the table, the Butterworth coefficients are:

<p>\begin{align}
a_0 &= 1 \\
a_1 &= 1.414 \\
\end{align}</p>

</div>

## Dependence On Op-Amp Output Impedance

A Sallen-Key filter is strongly dependent on the op-amp having a low output impedance. A op-amp's output impedance increases with increasing frequency, thus the performance of the Sallen-Key begins to suffer around the 50-500kHz range. **Thus the gain which begins to increase again after a certain frequency in the stop band**.

This can be seen in the following bode plot for a 2nd-order low-pass Sallen-Key filter, with a cutoff frequency `\(f_c\)` of 1kHz:

{{% figure src="low-pass-sallen-key-showing-gain-rise/annotated-plot.svg" width="600px" caption="Gain plot of a low-pass Sallen-Key filter showing the reversal to increasing again once a certain frequency is reached, owing to the increasing op-amp output impedance." %}}

## Further Reading

For general information on analogue filters, see the [Analogue Filters page](/electronics/circuit-design/analogue-filters/).

## Old

<p>\begin{align}
H(s) &= \frac{\frac{1}{R1C1R2C2}}{s^2 + \left(\frac{1}{R1C1} + \frac{1}{R2C2}\right)s + \frac{1}{R1C1R2C2}} \\
\end{align}</p>

## References

[^bib-analog-devices-ch8-analog-filters]: Analog Devices. _Chapter 8: Analog Filters_. Retrieved 2022-09-20, https://www.analog.com/media/en/training-seminars/design-handbooks/Basic-Linear-Design/Chapter8.pdf.
[^bib-ti-2nd-order-sallen-key-high-pass]: Texas Instruments (2021, Jun). _SBOA225: Single-supply, 2nd-order, Sallen-Key high-pass filter circuit_. Retrieved 2022-09-21, from https://www.ti.com/lit/an/sboa225/sboa225.pdf.
[^bib-ti-active-low-pass-filter-design]: Jim Karki (2002, Sep). _SLOA049B: Active Low-Pass Filter Design_. Texas Instruments. Retrieved 2022-09-21, from https://www.ti.com/lit/an/sloa049b/sloa049b.pdf.
[^bib-ti-analysis-of-sallen-key-arch]: James Karki (1999, Jul). _SLOA024B: Analysis of the Sallen-Key Architecture (Application Report)_. Texas Instruments. Retrieved 2022-09-22, from https://www.ti.com/lit/an/sloa024b/sloa024b.pdf.

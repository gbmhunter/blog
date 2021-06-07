---
author: gbmhunter
categories: [ "Electronics", "Circuit Design" ]
date: 2013-10-16
description: "Noise spectral densities, thermal noise, and more info about electrical noise."
draft: false
lastmod: 2021-06-07
tags: [ "noise", "dB", "AC coupling", "thermal noise", "Johnson noise", "Nyquist noise", "Stochastic resonance" ]
title: "Electrical Noise"
type: "page"
---

## Overview

## Noise Related Variables And Units 

### Noise Power Spectral Density (PSD)

**The _noise power spectral density_ (PSD) is a measure of the noise power per Hertz of bandwidth in a signal**. It also called the _noise spectral density_, _noise power density_, or just _noise density_. Typically denoted with `\(N_0\)` and has units `\(W / Hz\)`. The `\(0\)` in the symbol `\(N_0\)` is used to distinguish a density (i.e., per `\(Hz\)`). Without the `\(0\)`, `\(N\)` represents a noise power over a specified bandwidth.

The noise power `\(N\)` can be calculated from the noise power density `\(N_0\)` with the following equation:

<p>\begin{align}
N = BN_0
\end{align}</p>

<p class="centered">
where:<br/>
\(N\) is the noise power, in Watts \(W\)<br/>
\(B\) is the bandwidth of the signal, in Hertz \(Hz\)<br/>
\(N_0\) is the noise power spectral density, in \(W / Hz\) 
</p>

Noise power spectral density can be either one-sided or double-sided. TODO: Add more info on this.

### Noise Amplitude Spectral Density (ASD)

_Noise amplitude spectral density_ (ASD) is an alternative to specifying a _noise power spectral density_. Instead of the noise power (in Watts), the noise "amplitude" is used. The amplitude is almost always either voltage or current (with voltage being the more common of the two). The symbol and units depend on whether voltage or current is used:

- Noise voltage spectral density: Typical symbol `\(v_n\)` and has units `\(V / \sqrt{HZ}\)`
- Noise current spectral density: Typical symbol `\(i_n\)` and has units `\(A / \sqrt{HZ}\)`

The noise voltage spectral density `\(v_n\)` can be calculated from the noise power spectral density `\(N\)` if you assume the load is a resistance of `\(1\Omega\)`:

<p>\begin{align}
v_n = \sqrt{N}
\end{align}</p>

<p class="centered">
where:<br/>
\(v_n\) is the noise voltage spectral density, in \(V / \sqrt(Hz)\)
</p>

## Colours Of Noise

The _colour of noise_ refers to the shape of the power spectrum with respect to the frequency.

* **White noise**: White noise is the simplest form of noise, and has a flat frequency spectrum when plotted as a linear function of frequency (it has a spectral power density proportional to `\(1\)`). White noise got it's name from _white light_, which was assumed to have a flat power density spectrum across the visible range (the catch here is that, well, it actually doesn't).
* **Pink noise**: _Pink noise_ has a spectral power density proportional to `\(\frac{1}{f}\)`.
* **Red noise**: _Red noise_ has a spectral power density proportional to `\(\frac{1}{f^2}\)`. Also called _Brownian noise_.

If you don't have access to equipment that can perform a spectrum/frequency analysis on measured voltages or currents, you can roughly identify the "colour" of the noise sources by recognizing the "shape" of the noise in the time domain on a simple oscilloscope. The following sections contain examples of what each colour of noise looks like in both the time and frequency domain.

### White Noise

The following graph shows what Gaussian white noise looks like in the time domain:

{{% figure src="noise-white-time-domain.png" width="700px" caption="What white noise looks like in the time domain." %}}

And this is what it looks like in the frequency domain (the discrete FFT of the above signal):

{{% figure src="noise-white-freq-domain.png" width="700px" caption="What white noise looks like in the frequency domain." %}}

White noise does have to be _Gaussian_. Gaussian noise means the probability density function has a Gaussian distribution. 

_Stochastic resonance_ is the clever technique of adding white noise to a signal which is usually too weak to be detected by the measurement device. The frequencies in the white noise which are also present in the signal will resonate with each other, amplifying the original signal but not amplifying the rest of the white noise. The system has to have a non-linear response for this to work[^wikipedia-stochastic-resonance].

### Pink Noise

Also called `\(\frac{1}{f}\)` noise.

The following graph shows what pink noise looks like in the time domain:

{{% figure src="noise-pink-time-domain.png" width="700px" caption="What pink noise looks like in the time domain." %}}

And this is what it looks like in the frequency domain (the discrete FFT of the above signal):

{{% figure src="noise-pink-freq-domain.png" width="700px" caption="What pink noise looks like in the frequency domain." %}}

The following difference equation can create pink noise[^procaccia-schuster-universal-1-f-noise]:

<p>\begin{align}
x_t = (x_{t-1} + x_{t-1}^2)\ mod\ 1
\end{align}</p>

### Red (Brownian) Noise

Also called _Brownian_ or `\(\frac{1}{f^2}\)` noise.

The following graph shows what red noise looks like in the time domain:

{{% figure src="noise-red-time-domain.png" width="700px" caption="What red noise looks like in the time domain." %}}

And this is what it looks like in the frequency domain (the discrete FFT of the above signal):

{{% figure src="noise-red-freq-domain.png" width="700px" caption="What red noise looks like in the frequency domain." %}}

## Thermal (Johnson-Nyquist) Noise

Thermal noise is generated in any resistor by the random movement of charge carriers (e.g. electrons in a typical circuit) due to them having thermal energy. It is also called _Johnson_, _Nyquist_ or _Johnson-Nyquist_ noise. Thermal noise is unavoidable at any temperature except absolute zero (good luck with that).

The noise power spectral density of thermal noise is found with the following equation:

<p>\begin{align}
N_0 = 4 k_B T R 
\end{align}</p>

<p class="centered">
where:<br/>
\(N_0\) is the one-sided noise power spectral density, in Watts per Hertz \(WHz^{-1}\)<br/>
\(k_B\) is Boltzmann's constant, in Joules per Kelvin \(JK^{-1}\) (\(1.380649\times10^{-23} JK^{-1}\))<br/>
\(T\) is the temperature of the resistor, in Kelvin \(K\)<br/>
\(R\) is the resistance of the resistor, in Ohms \(\Omega\)
</p>

For example, a `\(10k\Omega\)` resistor at `\(25^{\circ}C\)` has a noise power spectral density `\(N_0\)` of:

<p>\begin{align}
N_0 &= 4 k_B T R \nonumber \\
    &= 4 \cdot 1.380649\times10^{-23} JK^{-1} \cdot 298.15K \cdot 10k\Omega \nonumber \\
    &= 1.647\times 10^{-16} W Hz^{-1} \nonumber
\end{align}</p>

Converting this to a noise voltage spectral density `\(v_n\)`:

<p>\begin{align}
v_n &= \sqrt{N_0} \nonumber \\
    &= \sqrt{1.647\times 10^{-16} W Hz^{-1}} \nonumber \\
    &= 12.83 nV Hz^{-0.5}
\end{align}</p>

If our system had a bandwidth `\(B\)` of `\(10kHz\)`, then the RMS noise voltage would be:

<p>\begin{align}
v_{rms} &= v_n \cdot \sqrt{B} \nonumber \\
        &= 12.83 nV / \sqrt{Hz} \cdot \sqrt{10kHz} \nonumber \\
        &= 1.28uV \nonumber
\end{align}</p>

## Measuring Noise

Use the oscilloscope trigger for viewing the noise caused by specific aggressor events. Use the oscilloscope's infinite persistence measurement to measure total noise. It is good practice to measure of a time span of many minutes with the device operating in as many of it's different states as possible.

With the oscilloscope in averaging mode and it set up to trigger of a specific event, you can view the amount of noise due to that event. Any noise asynchronous to the event will be removed through repeated averaging.

## RMS, dB, dBm, SD, Huh?

Noise measurements come in many different units. It can become very confusing when trying to compare different units or convert between them.

AC coupled waveforms become a little simpler...

> For a waveform that has no DC component, the RMS value is the same as the standard deviation.

Typically, when doing noise measurements with an oscilloscope, AC coupling is turned on, which removes the DC component. This means that the standard deviation and the RMS measurements are equal.

Uncorrelated noise sources add in a root-sum-of-squares manner.

<p>$$ e_{total} = \sqrt{e_{1}^2 + e_{2}^2} $$</p>

This comes from the equation:

<p>$$ x_{rms}^2 = \bar{x}^2 + \sigma_{x}^2 $$</p>

<p class="centered">
    where:<br>
    \( x_{rms} \) is the RMS value of waveform x<br>
    \( \bar{x} \) is the average (mean) of waveform x<br>
    \( \sigma_{x} \) is the standard deviation of waveform x<br>
</p>

As you can see, if the average of the waveform is 0 (as in the case when the waveform is AC coupled), the RMS value is the same as the standard deviation.

## Purpose-built Noise Generators

Noise generators can be built for testing circuits.

## References

[^procaccia-schuster-universal-1-f-noise]: Itamar Procaccia and Heinz Schuster: _Functional renormalization-group theory of universal 1/f noise in dynamical systems_. Phys. Rev. A 28, 1210(R). Published 1 August 1983. <https://journals.aps.org/pra/abstract/10.1103/PhysRevA.28.1210>, accessed 2021-06-07.
[^wikipedia-stochastic-resonance]: <https://en.wikipedia.org/wiki/Stochastic_resonance>, accessed 2021-06-07.
---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Circuit Design ]
date: 2022-08-26
description: 
draft: false
images: [ /electronics/circuit-design/how-to-create-sine-waves-from-square-waves-and-rc-filters/four-rc-filter-sine-wave-generator-schematic.png ]
lastmod: 2022-08-26
tags: [ electronics, circuit design, square waves, sine waves, RC filters, Fourier, digital, analogue, simulations, Micro-Cap, SPICE, distortion, THC, bode plots, frequency response ]
title: How To Create Sine Waves From Square Waves And RC Filters
type: page
---

## Overview

During circuit design, you may need a sine wave for some reason. One way to create a sine wave is by **generating a square wave (which is trivial to produce digitally) and then filtering the result with some [RC filters](/electronics/circuit-design/analogue-filters/)**.

{{% figure src="four-rc-filter-sine-wave-generator-schematic.png" width="900px" caption="Schematic of a sine wave generator circuit using a square wave input and 4 RC filter stages." %}}

If you can remember Fourier analysis, a square wave can be thought of as being made up of an infinite number of sine waves, starting at the fundamental frequency and then going up with all the odd numbered harmonics. The filtering works by **allowing the fundamental frequency through (it's in it's pass band), whilst blocking all the higher harmonics**. The below image shows a `\(10kHz\)`, `\(3.3V\)` square wave at it's FFT. You can see the spike which represents the fundamental at `\(10kHz\)`. The next spike is the first harmonic at `\(30kHz\)`. 

{{% figure src="sim-four-stage-rc-filter-fft-of-input-plot.png" width="600px" caption="The time domain voltage signal of a 10kHz 3.3V square wave (top) and the FFT of this signal (bottom)." %}}

**One RC filter does not provide enough attenuation of the higher harmonics**. But we can **stack many RC filters together** until we get a sine wave which is "good enough". One disadvantage of the RC filter approach is that the voltage gets attenuated through every stage of the filter. If this is going to be a problem, active filters can be used (or an amplifier could be added at the end).

## Choosing The R And Cs

Lets say we want a sine wave at `\(10kHz\)`. We'll configure a timer or PWM peripheral on a microcontroller to output a square wave at `\(10kHz\)` with a `\(50\%\)` duty cycle.

For each RC filter, we get to pick either the capacitance or resistance and then calculate the other. Let's pick a capacitance of `\(10nF\)`.

We'll design the cut-off frequency of each stage to be equal to the desired sine wave frequency. Remember that the cut-off frequency `\(f_c\)` for a RC filter is:

<p>\begin{align}
f_c &= \frac{1}{2\pi R C} \nonumber \\
\end{align}</p>

<p class="centered">
where:</br>
\(f_c\) is the cut off frequency (\(-3dB\) point) in Hertz [\(Hz\)]</br>
\(R\) is the resistance in Ohms [\(\Omega\)]</br>
\(C\) is the capacitance in Farads [\(F\)]</br>
</p>

{{% note %}}
**You don't have to make the cut-off frequency of each stage equal to the input/output frequency**. It's a trade-off between the amplitude of the output sine wave and the amount of distortion the sine wave will have. If you lower the cut-off frequency, the RC filters will attenuate more of the fundamental frequency and reduce the amplitude of your sine wave, but will also attenuate more of the harmonics, meaning less distortion. In reverse, if you raise the cut-off frequency, you will get a larger amplitude sine wave but with more distortion.
{{% /note %}}

This means the resistor in each RC stage has to be:

<p>\begin{align}
R &= \frac{1}{2\pi f_c C} \nonumber \\
  &= \frac{1}{2\pi \cdot 10kHz \cdot 10nF} \nonumber \\
  &= 1.592k\Omega \\
\end{align}</p>

{{% warning %}}
Setting the cut-off frequency for each stage to 10kHz does not mean the entire filter will attenuate the input signal by only `\(-3dB\)`. It will attenuate the signal by much more than that!
{{% /warning %}}

Remember, all the `\(R\)` and `\(C\)` values should be the same. This gives us the following schematic:

{{% figure src="sim-four-stage-rc-filter-schematic.png" width="700px" caption="Schematic for our 10kHz sine wave generator." %}}

[(Micro-Cap simulation file)](sim-four-stage-rc-filter.cir)

I added taps at the outputs of the intermediate stages so we can see how the waveform changes as it moves through the circuit!

## Simulating The Sine Wave Generator

The simulated output voltage waveforms are shown below (using SPICE transient analysis). Note how the waveforms get progressively more and more sinewave-esque as they pass through each RC filter stage:

{{% figure src="sim-four-stage-rc-filter-output-plot.png" width="700px" caption="Simulation results for the four-stage RC filter based sine wave generator circuit." %}}

It's also interesting to point out that the final output the sine wave has a DC offset of `\(1.65V\)`. This is because the DC component (average voltage) of the input `\(3.3V\)` square wave at `\(50\%\)` duty cycle is `\(3.3V / 2 = 1.65V\)`. If you want to remove this bias, you can connect an AC coupling capacitor to the output to center the sine wave around `\(0V\)`.

The bode plots (frequency response) of this circuit is shown below. Each successive filter stage increases the slope of the attenuation. At the fundamental frequency (which the frequency we want to pass) of `\(10kHz\)`, the attenuation is `\(23dB\)` (14x reduction). At `\(30kHz\)` (which is the 1st harmonic of the square wave, and we want to block this), the output is attenuated by `\(45dB\)` (178x reduction).

{{% figure src="sim-four-stage-rc-filter-bode-plot.png" width="700px" caption="Bode plots for the four-stage RC filter based sine wave generator circuit." %}}

{{% note %}}
As shown in the bode plots above, the phase of the output is also shifted. Our output 10kHz sine wave is shifted by `\(166^{\circ}\)`, which is almost "inverting" the input. Make sure to take this into consideration.
{{% /note %}}

## Distortion

**Is a four stage RC filter going to produce a perfect sine wave? No.** It just happens that four stages produces a sine wave which is "good enough" for most applications. We can do an FFT on the resulting output to see how "good" our sine wave is. A pure sine wave will have a single spike in the FFT at the fundamental frequency. Any distortion will show up as other spikes in the FFT. And while we are at it, lets do an FFT of the output from each intermediate stage, so see how the quality improves at it makes it's way through the circuit.

The following plots show the waveform and it's FFT at the input and at the output of each RC filter stage. The DC component of the waveform has been removed as to not swamp the FFT plot (we usually don't care about the DC component anyway, we could easily remove this with an AC coupling capacitor).

{{% figure src="sim-four-stage-rc-filter-thd.png" width="700px" caption="Plots showing the reduction in harmonic distortion through each successive RC filter stage." %}}

One figure of merit we can use for each output is the _total harmonic distortion_ (THD). This is found by take the square root of the sum of all the RMS harmonic magnitudes in the FFT plots, and dividing it by the RMS voltage of the fundamental frequency. If we do this, we get the following graph:

{{% figure src="sim-four-stage-rc-filter-thd-bar-plot.png" width="600px" caption="Plot showing the THD at each stage in the sine wave generator circuit." %}}

By the time we get to the final output, `\(V_{OUT4}\)`, we are down to a THD of `\(3.8\%\)`. Pretty good!

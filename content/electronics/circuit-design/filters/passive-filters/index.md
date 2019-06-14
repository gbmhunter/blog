---
author: "gbmhunter"
categories: [ "Electronics", "Circuit Design" ]
date: 2013-01-03
description: "A tutorial on passive electronic filters, including low-pass/high-pass RC, LC and RLC filters."
draft: false
lastmod: 2019-06-12
tags: [ "electronics", "circuit design", "filters", "passive filters", "RC", "low-pass", "high-pass", "LC", "bode plot", "frequency response" ]
title: "Passive Filters"
type: "page"
---

## Overview

Even in the pass-band, passive filters almost always increase the impedance of the signal, post filter. For a trace on a circuit board, this actually makes the post-filter trace more susceptible to picking up external noise. For this reason, when using a passive filter to filter out induced noise of a sensitive trace, always place a passive filter as close as possible to the receiving end of the signal (e.g. as close as possible to an ADC pin on a microcontroller).

Low-pass filters have an additional advantage when used on the analogue outputs from microcontrollers. If the DAC does not work properly for some reason (assuming you are using a DAC), you can sometimes implement the desired behaviour by using PWM instead. With the cut-off frequency set correctly, the PWM signal will be filtered so that a DC voltage proportional to the duty cycle remains, which is what you wished to implement with the DAC in the first place.

## Low-Pass RC Filter

### Schematic

The low-pass RC filter consists of a single series resistor and then a single capacitor to ground.

{{% img src="low-pass-rc-filter-schematic.png" width="500px" caption="Schematic of a simple low-pass RC filter. Schematic from https://workspace.circuitmaker.com/Projects/Details/GeoffreyHunter/mbedded-ninja." %}}

The low-pass RC filter lets through low frequencies but dampens high frequencies.

### How To Choose R And C

The cut-off frequency is determined by **both the value of the resistor and the value of the capacitor**, and is equal to:

<p>$$ f_{c} = \frac{1}{2\pi RC} $$</p>

<p class="centered">
  where:<br>
  \(R\) is the resistance, in Ohms<br>
  \(C\) is the capacitance, in Farads<br>
  \(f_c\) is the cut-off frequency, in Hertz
</p>

As usual, the choice of `\(R\)` and `\(C\)` is a design decision which involves trade-offs. In terms of choosing `\(R\)`:

* A resistance which is too small could draw too much current, either presenting too much load to the input, or overheating. It also could mean that the capacitor has to be very large and/or expensive to get the desired cut-off frequency.
* A resistance which is too large increases the output impedance of the filter, resulting in distortions if too much load is applied to `\(V_{out}\)`. It also increases the noise susceptibility of the circuit.

Typically, a resistance between `\(1k\Omega\)` and `\(100k\Omega\)` is used. Then the capacitance is chosen to give the desired cut-off frequency.

### Frequency Response

The following plot shows the frequency response (also known as a _bode plot_) of a low-pass filter, with values `\(R = 1k\Omega\)` and `\(C = 1\mu F\)`. Magnitude is plotted in blue and phase in green.

{{% img src="rc-low-pass-filter-frequency-response.png" width="700px" caption="The frequency response (magnitude and phase) of a low-pass RC filter." %}}

The magnitude of the RC output voltage `\(V_{out}\)` when in the input is a sine wave at frequency `\(f\)` and magnitude `\(V_{in}\)` is given by:

<p>$$ V_{out} = V_{in} \frac{X_c}{\sqrt{R^2 + X_c^2}} $$</p>

<p class="centered">
  where:<br>
  `\(V_{in}\)` is the magnitude of the input signal at frequency `\(f\)`, in Volts
  `\(X_c\)` is the impedance of the capacitor at frequency `\(f\)`, in Ohms
  `\(R\)` is the resistance of the resistor, in Ohms
</p>

Remember that the impedance of a capacitor is:

<p>$$ X_c = \frac{1}{2\pi fC} $$</p>

The low-pass RC filter also effects the phase of the signal. The higher the frequency, the greater the lag.

<p>$$ \phi = -\arctan{(2\pi fRC)} $$</p>

The cut-off frequency (also called the _break frequency_ or _turnover frequency_[^wikipedia-low-pass-filter]), `\(f_c\)` is not the frequency at which all higher frequencies are stopped (remember, this is an ideal filter, but in real-life they always let through some fraction of the higher-frequencies). Instead, it is the frequency at where:

<p>$$ V_{out} = \frac{1}{\sqrt{2}} V_{in} = 0.707*V_{in} $$</p>

The choice of resistor and capacitor above gives a cut-off frequency of `\(f_c = 159Hz\)`.

Low-pass RC filters are typically used for applications up to 100kHz, above 100kHz RLC filters are used[^elec-tutorial-filters].

### Time Constant

The time constant `\(\tau\)` of a low-pass RC filter is[^wikipedia-low-pass-filter]:

<p>$$ \tau = RC $$</p>

### Typical Uses

The low-pass RC filter is one (if not) the most commonly used filters on circuit board designs. Its popularity results from it's simplicity (two passive components), low cost (one resistor, one capacitor), small size, and it's myriad of uses.

Due to the presence of the resistor, it is a lossy filter, and therefore not suited for high-power applications (use a low-pass LC filter instead).

The low-pass RC filter can be used to provide filtering on analogue inputs to a microcontroller before being sampled by the ADC. One example could be to filter the output of an analogue temperature sensor. Note that is **normally advantageous to place the filter as close as possible to the microcontroller**, rather than close to the sensor producing the voltage. This is because the series resistor of the RC filter increases the source impedance of the analogue signal, **making the PCB track less immune to noise once it passes through the resistor**.

Another way to reduce the reduction in noise immunity due to the resistor in the RC low-pass filter is **to make the capacitor as large as practically possible** (for a particular cut-off frequency). Both the resistance and the capacitance influence the cut-off frequency. If you increase the capacitance by 10x, and reduce the resistance by 10x, you get the same cut-off frequency, but far better noise immunity since the source impedance is not altered as much.

**Another consideration is the effect of the increase in source impedance (due to the resistor in the RC filter) when connecting the output to something like a {{% link text="microcontroller ADC" src="/electronics/circuit-design/adcs" %}}).** The input impedance of an non-buffered ADC pin on a microcontroller is usually somewhere between `\(20-500k\Omega\)` (note that this is usually variable, and can change with sampling rate). This will form a resistor divider with the RC filter resistance, increasing the ADC measurement error. As a general rule, **you want the RC filter resistance to be much lower than the ADC input impedance**.

<p>$$ R_{RC filter} << R_{ADC} $$</p>

**A RC filter resistance which is at least 50x lower than the ADC input impedance is acceptable in most cases.** For a standard ADC input impedance of `\(50k\Omega\)`, this means that the resistor in the RC filter should be no more than `\(1k\Omega\)`.

### Transient Response

The equation for the voltage across the capacitor is:

<div>$$V_c = V_s(1 - e^{(\frac{t}{RC})})$$</div>

<p class="centered">
    where:<br>
    \(V_c\) = voltage across the capacitor, Volts<br>
    \(V_s\) = supply voltage, Volts<br>
    \(t\) = time since supply was turned on, Seconds<br>
    \(R\) = resistance, Ohms<br>
    \(C\) = capacitance, Farads<br>
</p>

This equation can be re-arranged to find the time `\(t\)`, and which the capacitor is at a certain voltage:

<div>$$t = -log(\frac{V-V_c}{V})RC$$</div>

This form of the equation can be useful to calculate the delay (aka the time `\(t\)`), that the RC circuit will provide before something happens.


## Building A VDAC From An ADC And Low-pass RC Filter

**Low-pass RC filters can also be used to create a VDAC (voltage-based digital-to-analogue converter) from a {{% link text="PWM signal" src="/electronics/circuit-design/pulse-width-modulation-pwm" %}}.** This is useful since many microcontrollers have one (or more) PWM peripherals, but rarely a built-in VDAC. A simple RC filter placed on the output pin of the PWM signal can convert it into a VDAC, in where the **duty cycle** determines the analogue voltage output.

## Low-Pass LC Filter

The basic low-pass LC filter consists of a single inductor and capacitor.

{{< img src="lc-low-pass-filter-basic-diagram-schematic.png" width="556px" caption="A basic schematic of a low-pass LC filter."  >}}

Unlike the low-pass RC filter, the low-pass LC filter is theoretically loss-less. This means that it does not dissipate energy as heat. However, the presence of the inductance usually makes the LC filter larger and more expensive than the RC filter.

This makes an LC low-pass filter suitable for higher-power applications. You will see LC low-pass filters being used on the output of buck converters (they are essentially part of the buck converter), to filter the output of an H-bridge, and to filter audio signals before they reach the speakers.

The cut-off frequency is given by the following equation:

<div>$$ f_c = \frac{1}{2\pi \sqrt{LC}} $$</div>

The characteristic impedance is:

<div>$$ Z = \sqrt{LC} $$</div>

which you will notice is also present in the cut-off frequency equation.

## Parasitic elements

The main parasitic element to consider with a low-pass LC filter is the parasitic coil resistance of the inductor. This dampens the output signal.

{{< img src="lc-low-pass-filter-schematic-with-parasitic-inductor-resistance.png" width="539px" caption="A schematic of a LC low-pass filter with parasitic inductor resistance included."  >}}

This is equivalent to a low-pass RLC filter.

## Low-pass RLC Filter

The quality factor is equal to:

<div>$$ Q = \frac{2\pi f}{R} $$</div>

As you increase the series resistance, the quality factor decreases.

The damping factor is equal to:

<div>$$ d_0 = \frac{1}{Q} $$</div>

<div>$$ d_0 = \frac{R}{2\pi fL} $$</div>

## Low-Pass Pi And t Filters

Low-pass Pi (π) and t-filters are one step better than the low-pass LC or RC filter.

A 1st-order low-pass π-filter has two capacitors and one inductor. The first capacitor absorbs the most AC by shunting it to ground (assuming the input has a finite source impedance). The inductor then blocks remaining AC, allowing only DC to pass through to the second capacitor. The second capacitor then shunts any remaining AC signal back through ground.

The equations for a 1st order filter are:

<div>$$C = \frac{z_o}{\pi f_c}$$</div>
<div>$$L = \frac{1}{z_o \pi f_c}$$</div>
<div>$$f_c = \frac{1}{\pi \sqrt{LC}}$$</div>

<p class="centered">
where:<br>
\(C\) = total capacitance ,Farads<br>
\(L\) = total inductance, Henrys<br>
\(z_o\) = characteristic impedance, Ohms<br>
\(f_c\) = -3dB cut-off frequency, Hz<br>
</p>

{{% note %}}
Mentioned is total capacitance or total inductance, as in the case of the π-filter each capacitor is C/2, and in the case of the t-filter, each inductor is L/2.
{{% /note %}}

The typical value to use for the characteristic impedance is `\( z_o = 50 \Omega \)`. Use this if you are unsure on what to set it to. This value is only important if your are matching two RF circuits.

A t-filter is usually better at suppressing high-frequencies than a π-filter, as parasitic coupling between input and output due to PCB layout tends to turn the π filter into a notch filter. However, π-filters are more common because they are cheaper (capacitors are cheaper than inductors).

Both π and t filters may use [feedthrough capacitors](/electronics/components/capacitors#feedthrough-capacitors) instead of standard caps for better performance (feedthrough capacitors have lower parasitic series inductance).

## Prepackaged Filters

π and t filters can come in prepackaged components which take all the hassle out of designing the filter correctly and reduce the BOM count of your design. They are commonly in [EIAxxxx chip packages](/pcb-design/component-packages/chip-eia-component-packages/).

One such example is the [TDK Corporation MEM Series](http://www.digikey.com/product-search/en?FV=ffec061a).

[^wikipedia-low-pass-filter]: [https://en.wikipedia.org/wiki/Low-pass_filter](https://en.wikipedia.org/wiki/Low-pass_filter)
[^elec-tutorial-filters]: [https://www.electronics-tutorials.ws/filter/filter_2.html](https://www.electronics-tutorials.ws/filter/filter_2.html)
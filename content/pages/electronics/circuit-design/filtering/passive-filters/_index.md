---
author: gbmhunter
date: 2013-01-03 04:10:26+00:00
draft: false
title: Passive Filters
type: page
url: /electronics/circuit-design/filtering/passive-filters
---

[mathjax]

# Overview

Even in the pass-band, passive filters almost always increase the impedance of the signal, post filter. For a trace on a circuit board, this actually makes the post-filter trace more susceptible to picking up external noise. For this reason, when using a passive filter to filter out induced noise of a sensitive trace, always place a passive filter as close as possible to the receiving end of the signal (e.g. as close as possible to an ADC pin on a microcontroller).

Low-pass filters have an additional advantage when used on the analogue outputs from micrcontrollers. If the DAC does not work properly for some reason (assuming you are using a DAC), you can sometimes implement the desired behaviour by using PWM instead. With the cut-off frequency set correctly, the PWM signal will be filtered so that a DC voltage proportional to the duty cycle remains, which is what you wished to implement with the DAC in the first place.

# Low-Pass RC Filter

The low-pass RC filter consists of a single series resistor and then a single capacitor to ground.

The low-pass RC filter is one (if not) the most commonly used filters on circuit board designs. Its popularity results from it's simplicity (two passive components), low cost (one resistor, one capacitor), small size, and it's myriad of uses.

Due to the presence of the resistor, it is a lossy filter, and therefore not suited for high-power applications (use a low-pass LC filter instead).

The equation for the voltage across the capacitor is:

$$V_c = V_s(1 - e^{(\frac{t}{RC})})$$

where:  
\(V_c\) = voltage across the capacitor, Volts  
\(V_s\) = supply voltage, Volts  
\(t\) = time since supply was turned on, Seconds  
\(R\) = resistance, Ohms  
\(C\) = capacitance, Farads

This equation can be re-arranged to find the time \(t\), and which the capacitor is at a certain voltage:

$$t = -log(\frac{V-V_c}{V})RC$$

This form of the equation can be useful to calculate the delay (aka the time \(t\)), that the RC circuit will provide before something happens.

The low-pass RC filter can be used to provide filtering on analogue inputs to a microcontroller before being sampled by the ADC. One example could be to filter the output of an analogue temperature sensor. Note that is **normally advantageous to place the filter as close as possible to the microcontroller**, rather than close to the sensor producing the voltage. This is because the series resistor of the RC filter increases the source impedance of the analogue signal, **making the PCB track less immune to noise once it passes through the resistor**.

Another way to reduce the reduction in noise immunity due to the resistor in the RC low-pass filter is **to make the capacitor as large as practically possible **(**for a particular cut-off frequency)**. Both the resistance and the capacitance influence the cut-off frequency. If you increase the capacitance by 10x, and reduce the resistance by 10x, you get the same cut-off frequency, but far better noise immunity since the source impedance is not altered as much.

**Another consideration is the effect of the increase in source impedance (due to the resistor in the RC filter) when connecting the output to something like a [microcontroller ADC](http://blog.mbedded.ninja/electronics/circuit-design/adcs).** The input impedance of an non-buffered ADC pin on a microcontroller is usually somewhere between \(20-500k\Omega\) (note that this is usually variable, and can change with sampling rate). This will form a resistor divider with the RC filter resistance, increasing the ADC measurement error. As a general rule, **you want the RC filter resistance to be much lower than the ADC input impedance**.

$$ R_{RC filter} << R_{ADC} $$

**A RC filter resistance which is at least 50x lower than the ADC input impedance is acceptable in most cases.** For a standard ADC input impedance of \(50k\Omega\), this means that the resistor in the RC filter should be no more than \(1k\Omega\).

## Building A VDAC From An ADC And Low-pass RC Filter

**Low-pass RC filters can also be used to create a VDAC (voltage-based digital-to-analogue converter) from a [PWM signal](http://blog.mbedded.ninja/electronics/circuit-design/pwm).** This is useful since many microcontrollers have one (or more) PWM peripherals, but rarely a built-in VDAC. A simple RC filter placed on the output pin of the PWM signal can convert it into a VDAC, in where the **duty cycle** determines the analogue voltage output.

# Low-Pass LC Filter

The basic low-pass LC filter consists of a single inductor and capacitor.

[caption id="attachment_12173" align="aligncenter" width="556"][![A basic schematic of a low-pass LC filter.](http://blog.mbedded.ninja/wp-content/uploads/2013/01/lc-low-pass-filter-basic-diagram-schematic.png)
](http://blog.mbedded.ninja/wp-content/uploads/2013/01/lc-low-pass-filter-basic-diagram-schematic.png) A basic schematic of a low-pass LC filter.[/caption]

Unlike the low-pass RC filter, the low-pass LC filter is theoretically loss-less. This means that it does not dissipate energy as heat. However, the presence of the inductance usually makes the LC filter larger and more expensive than the RC filter.

This makes an LC low-pass filter suitable for higher-power applications. You will see LC low-pass filters being used on the output of buck converters (they are essentially part of the buck converter), to filter the output of an H-bridge, and to filter audio signals before they reach the speakers.

The cut-off frequency is given by the following equation:

$$ f_c = \frac{1}{2\pi \sqrt{LC}} $$

The characteristic impedance is:

$$ Z = \sqrt{LC} $$

which you will notice is also present in the cut-off frequency equation.

## Parasitic elements

The main parasitic element to consider with a low-pass LC filter is the parasitic coil resistance of the inductor. This dampens the output signal.

[caption id="attachment_12175" align="aligncenter" width="539"][![A schematic of a LC low-pass filter with parasitic inductor resistance included.](http://blog.mbedded.ninja/wp-content/uploads/2013/01/lc-low-pass-filter-schematic-with-parasitic-inductor-resistance.png)
](http://blog.mbedded.ninja/wp-content/uploads/2013/01/lc-low-pass-filter-schematic-with-parasitic-inductor-resistance.png) A schematic of a LC low-pass filter with parasitic inductor resistance included.[/caption]

This is equivalent to a low-pass RLC filter.

# Low-pass RLC Filter

The quality factor is equal to:

$$ Q = \frac{2\pi f}{R} $$

As you increase the series resistance, the quality factor decreases.

The damping factor is equal to:

$$ d_0 = \frac{1}{Q} $$

$$ d_0 = \frac{R}{2\pi fL} $$

# Low-Pass π And t Filters

Low-pass π and t-filters are one step better than the low-pass LC or RC filter.

A 1st-order low-pass π-filter has two capacitors and one inductor. The first capacitor absorbs the most AC by shunting it to ground (assuming the input has a finite source impedance). The inductor then blocks remaining AC, allowing only DC to pass through to the second capacitor. The second capacitor then shunts any remaining AC signal back through ground.

The equations for a 1st order filter are:

$$C = \frac{z_o}{\pi f_c}$$  
$$L = \frac{1}{z_o \pi f_c}$$  
$$f_c = \frac{1}{\pi \sqrt{LC}}$$

where:  
\(C\) = total capacitance ,Farads  
\(L\) = total inductance, Henrys  
\(z_o\) = characteristic impedance, Ohms  
\(f_c\) = -3dB cutoff frequency, Hz

Note that I mention total capacitance or total inductance, as in the case of the π-filter each capacitor is C/2, and in the case of the t-filter, each inductor is L/2.

The typical value to use for the characteristic impedance is \( z_o = 50 \Omega \). Use this if you are unsure on what to set it to. This value is only important if your are matching two RF circuits.

A t-filter is usually better at suppressing high-frequencies than a π-filter, as parasitic coupling between input and output due to PCB layout tends to turn the π filter into a notch filter. However, π-filters are more common because they are cheaper (capacitors are cheaper than inductors).

Both π and t filters may use [feedthrough capacitors](http://blog.mbedded.ninja/electronics/components/capacitors#feedthrough-capacitors) instead of standard caps for better performance (feedthrough capacitors have lower parasitic series inductance).

## Prepackaged Filters

π and t filters can come in prepackaged components which take all the hassle out of designing the filter correctly and reduce the BOM count of your design. They are commonly in [EIAxxxx chip packages](http://blog.mbedded.ninja/pcb-design/component-packages/chip-eia-xxxx-component-packages).

One such example is the [TDK Corporation MEM Series](http://www.digikey.com/product-search/en?FV=ffec061a).

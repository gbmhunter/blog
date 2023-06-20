---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Electronic Components, Power Regulators ]
date: 2015-03-24
description: Control methods, component selection, equations, operation modes, schematics, examples and more info on buck converters.
draft: false
images: [ /electronics/components/power-regulators/switch-mode-power-supplies-smps/smps-buck-converter-simple.png ]
lastmod: 2022-07-12
tags: [ electronics, components, power regulators, SMPS, buck converter, power electronics, inductor, capacitor, regulation, control methods, constant frequency, current-mode, SNVA555, PCM, peak current mode, CCM, constant current mode ]
title: Buck Converters
type: page
---

## Overview

_Buck converters_ are a particular topology of [switch-mode power supply](/electronics/components/power-regulators/switch-mode-power-supplies-smps/) (SMPSs) that use a switching element, diode (or second switch), inductor and capacitor to convert an input voltage into a **lower** output voltage.

{{% figure src="buck-converter-basic-schematic.svg" width="600" caption="The basic schematic of a buck converter. SW1 is typically a MOSFET switched by control logic (not shown)." %}}

To learn more about EMI/EMC considerations regarding buck converters, see the [EMC and Switch-Mode Power Supplies page](/electronics/components/power-regulators/switch-mode-power-supplies-smps/emc-and-switch-mode-power-supplies/).

## How A Buck Converter Works

The output voltage of a buck converter is purely determined by the input voltage `\(V_{IN}\)` and the percentage of time that the switch spend on during each switching cycle, `\(D\)`:

<p>\begin{align}
\label{eq:vout-d-vin}
V_{OUT} = DV_{IN}
\end{align}</p>

`\(D\)` is the duty cycle, and varies from `\(0\)` to `\(1\)`. It is defined as:

<p>\begin{align}
D = \frac{t_{on}}{T}
\end{align}</p>

<p class="centered">
where:</br>
\(t_{on}\) is the on time of the switch, in seconds</br>
\(T\) is the switching frequency, in seconds (\(t_{on} + t_{off}\))</br>
</p>

{{% note %}}
The simple equation showing `\(V_{OUT}\)` is only dependent on `\(V_{IN}\)` and `\(D\)` is only true when all components act ideally (e.g. no voltage drop across the diode, no ESR in the capacitor, no resistance through the inductor) AND the inductor is in continuous conduction (i.e. current never drops to 0). In the real world there are always parasitics, however this equation is still a good first approximation to help understand how it works.
{{% /note %}}

The following steps show a way to **intuitively understand how a buck converter produces a lower output voltage** (and derive Eq `\(\ref{eq:vout-d-vin}\)`):

1. The average voltage across the inductor, over an entire switching cycle, must be 0 (other ways of saying is this is that the integral must be 0, or the volt-seconds must be 0). If it wasn't, then because `\(V = L \frac{di}{dt}\)` (the basic equation for an inductor), **the current in the inductor would increase or decrease without bound (i.e. go to infinity)**. 
1. When the switch is closed (`\(t_{on}\)`), the voltage across `\(L1\)` is `\(V_{IN} - V_{OUT}\)` during this phase.
1. When the switch is open (`\(t_{off}\)`), `\(D1\)` is forward biased, and if we assume it's a perfect diode (no forward voltage drop), the voltage across `\(L1\)` is `\(-V_{OUT}\)` during this phase.
1. The average (or integral) over the entire switching cycle has to be 0, so:
    <p>\begin{align}
    (V_{IN} - V_{OUT})t_{on} - V_{OUT}t_{off} &= 0 \nonumber \\
    V_{IN}t_{on} - V_{OUT}t_{on} - V_{OUT}t_{off} &= 0 \nonumber \\
    V_{IN}t_{on} &= V_{OUT}(t_{on} + t_{off}) \nonumber \\
    V_{OUT} &= \frac{t_{on}}{t_{on} + t_{off}} V_{IN} \nonumber \\
            &= D V_{IN} \nonumber 
    \end{align}</p>

{{% tip %}}
This analysis method of realizing the average voltage across the inductor must be 0 over an entire switching cycle also works for other switching topologies. 
{{% /tip %}}

When the switch is closed, the current flows from the input through the inductor to the output, as shown below:

{{% figure src="buck-converter-schematic-current-path-ton.svg" width="500" caption="Current path when the switch is **closed** (during `\(t_{on}\)` )." %}}

When the switch opens, the input is disconnected. Because the inductor doesn't like changes in current, it keeps a current flowing through the load by forward biasing `\(D1\)`, as shown below:

{{% figure src="buck-converter-schematic-current-path-toff.svg" width="500" caption="Current path when the switch is **open** (during `\(t_{off}\)`)." %}}

`\(C1\)` (which is also called `\(C_{OUT}\)`) is to reduce the voltage ripple at the output/load.

## Control Methods

99% of the time, you want a fixed (regulated) and stable output voltage, which does not depend on the input voltage and one which does not start to sag as you draw more current. To achieve this, it is insufficient to drive the switch at a fixed duty cycle. More complex control mechanisms with feedback are required. The most popular two are _voltage-mode control_ and _current-mode control_, which are explained in the following section.

{{% aside type="tip" %}}
See the [SMPS Control Methodologies page](/electronics/components/power-regulators/switch-mode-power-supplies-smps/control-methodologies/) for general information on these control methods that is not specific to buck converters.
{{% /aside %}}

### Voltage Mode Control

_Voltage-mode (VM) control_ is the simplest control method, originating in approx. the 1970's[^bib-microsemi-v-i-mode]. It works by taking a proportion of the output voltage and comparing it with a fixed reference voltage. The difference between these two is called the error voltage and is amplified by an _error amplifier_. This error voltage is then fed into a comparator, with the other input being a sawtooth signal (triangular waveform). The switch is turned on at the start of the sawtooth period, and turned off when the sawtooth exceeds the error voltage. An SR latch is normally used to prevent multiple triggers per cycle due to noise. Voltage-mode control is named as such because the duty cycle is proportional to the control voltage.

{{% figure src="voltage-mode-control-diagram.svg" width="800" caption="The basic logical components used for voltage-mode control." %}}

### Current-Mode Control (Constant Frequency)

_Current-mode (CM) control_ is a very common control method for buck converters.

It has the following advantages over VM:

* Simpler external frequency compensation than VM 
* Faster load transient response than VM.

However, one big disadvantage is the extra control circuitry complexity. However, this is somewhat mitigated in more recent years as all of this circuitry is integrated into a cheap silicon IC.

Peak current measurement is a common way of "measuring" the average output current.

A transconductance amplifier (amplifier that converts a input voltage to an output current) is used to compare the voltage at a feedback pin (typically labelled _FB_) to an internal voltage reference.

PCM: Peak current mode

See the excellent [SNVA555: Understanding and Applying Current-Mode Control Theory](https://www.ti.com.cn/cn/lit/an/snva555/snva555.pdf) by TI for more information on current-mode control theory.

### Hysteretic Control

Hysteretic control is when the output voltage is directly monitored by a comparator, rather than going through an error amplifier. If the output voltage falls or exceeds below a certain value, the buck converter switch is turned on/off. Because the control is performed by measuring the ripple in the output voltage, this method is also called the _ripple control method_.

There are two ways on controlling the switch:

1. Detect when the voltage falls BELOW a set threshold, and turn the switch ON for a fixed amount of time, OR
1. Detect when the voltage rises ABOVE a set threshold, and turn the switch OFF for a fixed amount of time

Hysteretic control has the benefit of being extremely fast to respond to transient current changes, since it is directly monitoring the output voltage and there is no error amplifier. It also does not need any compensation. These advantages make it suitable for powering the rapidly changing current demands of high power CPUs and FPGAs.  

## Calculating Buck Converter Component Values

### Inductor Selection

You can use the following equations to select the inductor for a buck converter.

Since the inductor is in series with the input, the average inductor current is also equal to the average input current. So we can use the conversation of energy (energy in = energy out) to find the average inductor current using:

<p>\begin{align}
I_L = I_{OUT} \frac{V_{OUT}}{\eta V_{IN}}
\end{align}</p>

<p class="centered">
where:<br/>
\(V_{IN}\) is the input voltage to the buck regulator<br/>
\(V_{OUT}\) is the output voltage of the buck regulator<br/>
\(I_{OUT}\) is the output current of the buck regulator (pick your maximum)<br/>
\(\eta\) is the efficiency, typically \(0.9\) (i.e. 90%)[^ti-slva477b-basic-calc-buck-power-stage]<br/>
</p>

Then, calculate the value of inductance required with:

<p>\begin{align}
L = \frac{V_{IN} (V_{OUT} - V_{IN})}{\Delta I_L \cdot f \cdot V_{OUT}}
\end{align}</p>

<p class="centered">
where:</br>
\(\Delta I_L\) = the desired ripple current in the inductor</br>
`\(f\)` = the switching frequency</br>
and everything else as mentioned previously</br>
</p>

The ripple current is typically chosen to be 20-40% of the average current[^ti-slva477b-basic-calc-buck-power-stage]. If we choose 30%, then we can calculate `\(\Delta I_L\)` with:

<p>\begin{align}
\Delta I_L = 0.3I_L
\end{align}</p>

{{% aside type="warning" %}}
Aside from making sure the inductor you pick has at least the inductance calculated above, you also want to make sure that the peak inductor current is less than the inductor's _saturation current_ (otherwise it will stop storing energy in it's magnetic field and stop behaving like an inductor), and the average current is less than the inductor's _rated current_ (otherwise it will overheat).
{{% /aside %}}

## Capacitor Selection

The output capacitance is primarily determined by the maximum allowed output voltage ripple. This ripple is determined by the capacitance of the capacitor and it's ESR (equivalent series resistance). The output capacitance of a boost converter can be found using the following equation.

<p>\begin{align}
C_{min} = \dfrac{I_O (V_{OUT} - V_{IN})}{f  \Delta V V_{OUT}}
\end{align}</p>

<p class="centered">
where:</br>
\(\Delta V\) = the maximum desired output voltage ripple</br>
and everything else as mentioned previously</br>
</p>

The actual ripple will be slightly larger than this due to the ESR of the capacitor.

<p>\begin{align}
\Delta V_{ESR} = I_O R_{ESR}
\end{align}</p>

<p class="centered">
where:</br>
\(R_{ESR}\) = the parasitic series resistance of the output capacitor</br>
</p>

The total output ripple is the sum of the ripple caused by the capacitance, and the ripple cause by the ESR. 

{{% note %}}
These equations assume a constant load. Load transients (fluctuations in the load current) will also cause voltage ripple.
{{% /note %}}

## Buck Converter Calculator

You can find a buck converter calculator as part of [mbedded.ninja&lsquo;s NinjaCalc web app](http://ninja-calc.mbedded.ninja/buck-converter-calculator).

{{% figure src="ninja-calc-buck-converter-calculator-screenshot.png" width="956" caption="A screenshot of the buck converter calculator in NinjaCalc (as of v2.2.0)." %}}

## Synchronous Rectification

When using a P-channel MOSFET for synchronous rectification, it's body diode is forward-biased when the converter is in shutdown mode. This can **drain the power source** into the output. More advanced buck converters have extra circuitry to disconnect this P-channel MOSFET when the device is not active.

## EMC

The input current "hot loop" of a buck converter is the most important part to worry about when it comes to EMC. See the [EMC and Switch-Mode Power Supplies page](/electronics/components/power-regulators/switch-mode-power-supplies-smps/emc-and-switch-mode-power-supplies/) for more information.

{{% figure src="/electronics/components/power-regulators/switch-mode-power-supplies-smps/emc-and-switch-mode-power-supplies/buck-converter-hot-loop.png" width="500px" caption="The hot loop in a buck converter is on the output side." %}}

## Examples

### Tiny (Nano) Buck Converters

Texas Instruments released a series of very small (3.5x3.5x1.8mm) buck converter modules in 2015. One of the most impressive features is that this includes the inductor (external capacitors are still required). One example is the LMZ20502, which can provide up to 2A of current with an input voltage range of 2.7-5.5V and a output voltage range of 0.8-3.6V.

{{% figure src="photo-of-lmz20502-buck-converter.jpg" width="306" caption="A photo of the LMZ20502 buck converter. Image from http://www.digikey.co.nz/product-detail/en/LMZ20502SILT/296-38656-1-ND/." %}}

Notice how most of the volume on the module is taken up the chip inductor (the big brown thing that dominates most of the image). The dimensions of the package are shown in the diagram below.

{{% figure src="microsip-component-package-dimensions.png" width="500" caption="The dimensions of the MicroSIP component package, used by the Texas Instruments 'Nano' buck converters. Image from http://www.ti.com/lit/ds/symlink/lmz20502.pdf." %}}

## References

[^bib-microsemi-v-i-mode]: Maniktala, Sanjaya (2012). _Voltage-Mode, Current-Mode (and Hysteretic Control)_. Microsemi. Retrieved 2021-08-22, from https://www.microsemi.com/document-portal/doc_view/124786-voltage-mode-current-mode-and-hysteretic-control.
[^ti-slva477b-basic-calc-buck-power-stage]: Brigitte Hauke (2015, Aug). _Basic Calculation of a Buck Converter's Power Stage_ [Application Report]. Texas Instruments. Retrieved 2023-06-20, from https://www.ti.com/lit/an/slva477b/slva477b.pdf.

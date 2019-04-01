---
author: gbmhunter
categories: [ "Electronics", "Components", "Power Regulators" ]
date: 2015-03-24
draft: false
tags: [ "SMPS", "buck converter", "power electronics", "inductor", "capacitor", "regulation" ]
title: Buck Converters
type: page
---

## Overview

Buck converters use a switching element, inductor and capacitor to convert an input voltage into a lower output voltage.

{{< figure src="/images/2015/03/smps-buck-converter-simple.png" width="629px" caption="The basic parts of a buck converter."  >}}

When using a P-channel MOSFET for synchronous rectification, it's body diode is forward-biased when the converter is in shutdown mode. This can **drain the power source** into the output. More advanced buck converters have extra circuitry to disconnect this P-channel MOSFET when the device is not active.

## Inductor Selection

You can use the following equations to select the main inductor for a buck converter.

First, calculate the maximum average inductor current using:

<div>$$ I_L = I_{OUT} \frac{V_{OUT}}{0.8 V_{IN}} $$</div>

<p class="centered">
    where:<br>
    \( V_{IN} \) = the input voltage to the buck regulator<br>
    \( V_{OUT} \) = the output voltage of the buck regulator<br>
</p>

Then, calculate the value of inductance required with:

<div>$$ L = \frac{V_{IN} (V_{OUT} - V_{IN})}{\Delta I_L \cdot f \cdot V_{OUT}} $$</div>

<p class="centered">
    where:<br>
    \( \Delta I_L \) = the desired ripple current in the inductor<br>
    \( f \) = the switching frequency<br>
and everything else as mentioned previously<br>
</p>

## Capacitor Selection

The output capacitance is primarily determined by the maximum allowed output voltage ripple. This ripple is determined by the capacitance of the capacitor and it's ESR (equivalent series resistance). The output capacitance of a boost converter can be found using the following equation.

<div>$$ C_{min} = \dfrac{I_O (V_{OUT} - V_{IN})}{f  \Delta V V_{OUT}} $$</div>

<p class="centered">
where:<br>
\(\Delta V\) = the maximum desired output voltage ripple<br>
and everything else as mentioned previously<br>
</p>

The actual ripple will be slightly larger than this due to the ESR of the capacitor.

<div>$$ \Delta V_{ESR} = I_O R_{ESR} $$</div>

<p class="centered">
    where:<br>
    \(R_{ESR}\) = the parasitic series resistance of the output capacitor<br>
</p>

The total output ripple is the sum of the ripple caused by the capacitance, and the ripple cause by the ESR. 

{{% note %}}
These equations assume a constant load. Load transients (fluctuations in the load current) will also cause voltage ripple.
{{% /note %}}

## Down Conversion

Some boost converters also have a built in regulator to provide regulation when the input voltage exceeds the desired output voltage. This is normally a linear regulator, so your efficiency will drop and you will have to take into account the thermal dissipation. This is normally called **down conversion**.

{{< figure src="/images/2015/03/schematic-of-boost-converter-with-down-conversion-capability.png" width="507px" caption="The internal schematic of a boost converter with in-built down conversion capability (the ability to drop the input voltage)."  >}}

The price you pay for this added down conversion feature is a slightly higher cost, and slightly higher quiescent current (e.g. some of TI's boost converters have 19uA quiescent current without down conversion, and 25uA with down conversion).

## Input Voltage Range

Typically, boost ICs with an internal switch (a converter) can support lower input voltages than those that require an external switch (a controller). A typical minimum input voltage for a converter is in the range 0.3-0.9V, while a controller's minimum is in the range 0.9-1.8V.

## Buck Converter Calculator

You can find a buck converter calculator as part of [mbedded.ninja's NinjaCalc web app](http://ninja-calc.mbedded.ninja/buck-converter-calculator).

{{< figure src="/images/2015/03/ninja-calc-buck-converter-calculator-screenshot.png" width="956px" caption="A screenshot of the buck converter calculator in NinjaCalc (as of v2.2.0)." >}}

## Examples

## Tiny (Nano) Buck Converters

Texas Instruments released a series of very small (3.5x3.5x1.8mm) buck converter modules in 2015. One of the most impressive features is that this includes the inductor (external capacitors are still required). One example is the LMZ20502, which can provide up to 2A of current with an input voltage range of 2.7-5.5V and a output voltage range of 0.8-3.6V.

{{< figure src="/images/2015/03/photo-of-lmz20502-buck-converter.jpg" width="306px" caption="A photo of the LMZ20502 buck converter. Image from http://www.digikey.co.nz/product-detail/en/LMZ20502SILT/296-38656-1-ND/."  >}}

Notice how most of the volume on the module is taken up the chip inductor (the big brown thing that dominates most of the image). The dimensions of the package are shown in the diagram below.

{{< figure src="/images/2015/03/microsip-component-package-dimensions.png" width="501px" caption="The dimensions of the MicroSIP component package, used by the Texas Instruments 'Nano' buck converters. Image from http://www.ti.com/lit/ds/symlink/lmz20502.pdf."  >}}

---
author: gbmhunter
date: 2014-06-13 04:41:03+00:00
draft: false
title: Boost Converters
type: page
url: /electronics/components/power-regulators/boost-converters
---

[mathjax]

## Overview

Boost converters use a switching element, inductor, diode, and capacitor to convert an input voltage `\(V_{in}\)` into a higher or equal output voltage `\(V_{out}\)`.

{{< figure src="/images/2014/06/smps-boost-converter-simple.png" width="599px" caption="The basic components of a boost converter."  >}}

In a real boost converter, the switch `\( SW \)` is usually realised 

## Modes Of Operation

A boost converter can operate in three different modes of operation:  * Continuous conduction mode (CCM)  * Discontinuous conduction mode (DCM)  * Critical conduction mode (CrCM)  * Burst-mode

These are explained in the following sub-sections.

## Continuous Conduction Mode (CCM)

For the same output current, the peak current through the inductor is lower when the boost converter is operating in CCM, compared on any other mode of operation.

CCM encounters turn-on losses through the switch. These can be exacerbated by the diodes reverse recover charge (`\( Q_{rr} \)`). Ultra-fast diodes with low (`\(Q_{rr}\)`) are therefore recommended.

## Discontinuous Conduction Mode (DCM)

The switch (lets assume a MOSFET) is turned on at zero current, which means there is little turn-on loss.

## Critical Conduction Mode (CrCM)

Critical conduction mode (CrCM) is at the boundary between CCM and DCM. 

In CrCM, the peak inductor current is exactly twice the average value. This increases the switching element's RMS current and turn-off current.

CrCM is good for low to medium power boost converter designs. At higher power levels the low filtering ability and high peak inductor currents start to become disadvantageous. Above this point boost converters operating in CCM are more preferable.

## Burst-Mode

Burst-mode is a favourite for saving power when the load needs very little current. In burst-mode operation, the regulator operates for a period of time, charges up the output capacitor to a set threshold, and then shuts down completely. When the output voltage sags below a set threshold, the converter turns back on and the cycle restarts. This works well when there is little load current and so the converter can "sleep" for a significant period of time before it has to turn on again.

When the converter enters sleep, a number of power consuming components of the boost regulators control circuit can be disabled (e.g. oscillators, voltage references, op-amps), saving power.

## Design Procedure

This assumes you already know:

<table>
    <thead>
        <tr>
            <th>Symbol</th>
            <th>Description</th>
        </tr>
    </thead>
<tbody>
<tr>
<td > \( V_{in} \)
</td>
<td >The input voltage.
</td></tr><tr >
<td > \( V_{out} \)
</td>
<td >The output voltage. This has to be higher or equal to \( V_{in} \)
</td></tr><tr >
<td >\( I_{SW(max)} \)
</td>
<td >The maximum current allowed through the switch.
</td></tr><tr >
<td >\( f_{S} \)
</td>
<td >The switching frequency of the boost converter.
</td></tr><tr >
<td >\( \eta \)
</td>
<td >The efficiency of the converter. This is dependent on output current, but it is o.k. just to approximate with a rough value (e.g. 90%) and use for all calculations.
</td></tr></tbody></table>

## Duty Cycle

The duty cycle for a boost converter is given by:

<div>$$ D = 1 - \eta \cdot \frac{V_{IN}}{V_{OUT}} $$</div>

As you can see, the duty cycle is dependent only on the ratio between the input and output voltages. This has to be one of the simplest boost converter equations. This equation ignores the specific voltage drops across the switching element and rectifier, but rather lumps them together into the efficiency term.

## Inductance

The inductance can be determined using:

<div>$$ L = (\frac{V_{in}}{V_{out}})^2 \cdot (\frac{V_{out} - V_{in}}{I_{out} \cdot f_s}) \cdot (\frac{\eta I_L}{\Delta I_L}) $$</div>

You don't know `\( I_L \)` or `\( \Delta I_L \)` yet, but the trick is here to assume a maximum inductor ripple current `\( \Delta I_L \)` as a percentage of the average inductor current, `\( I_L \)`. A rule-of-thumb is to assume a maximum ripple current of 35% (assuming it is operating in CCM mode). Thus,

<div>$$ \frac{\Delta I_L}{I_L} = 0.35$$</div>

Now the equation for the inductance becomes:

<div>$$ L = (\frac{V_{in}}{V_{out}})^2 \cdot (\frac{V_{out} - V_{in}}{I_{out} \cdot f_s}) \cdot (\frac{\eta }{0.35}) $$</div>

which can be solved as we know all of the variables.

## Output Current

The maximum output current is given by:

<div>$$ I_{OUT(max)} = (I_{SW(max)} - \frac{\Delta I_L}{2})(1 - D) $$</div>

## Diode Selection

The maximum reverse voltage of the diode must be at least equal to the output voltage of the boost converter. This is because diode see's the full load voltage when the switch is closed (in a reverse-biased setup).

## PCB Routing

The same rules apply for routing boost converters as with any SMPS. See the PCB Routing section on the SMPS page for more information.

## Light Load Instabilities

Bad things can happen when boost converters are operated with light/no load. If the controller isn't smart enough to reduce the duty cycle down to near 0 when there is no or little load, the voltage across the capacitor can build up to a point where it causes damage to part of the circuitry.

Also, if the converter is in DCM and the load current suddenly increases, the output voltage can sag greatly.

## Turning Off/Disabling

While most boost controllers have an enable/disable pin, this doesn't actually disconnect the input from output, as the switching device is not in series with input and output, as it is in a buck Converter. Thus if you need the load completely disconnected from the input, you will need to add something like a P-Channel MOSFET or load switch to the front-end of the boost converter.

## Start-up vs. Runtime Minimum Input Voltage Requirements

Some boost converters have differing start-up and runtime minimum input voltage requirements. Typically, the boost converter requires a higher minimum input voltage to start (e.g. 18V), but once running, can run of a lower voltage (e.g. 500mV).

## Bypass

Some boost converters designed for ultra-lower power applications have a **bypass mode**. When the output voltage is not needed to be higher than the input voltage, the converter enters a bypass mode in where most of the control circuitry is disabled, the converter stops switching, and the input voltage is "bypassed" straight to the output.

## Max. Current Ratings

One gotcha: The "max. current" rating that a manufacturer will provide with a boost controller with an integrated switch will usually be the maximum current rating of the switch. **This is not the maximum output current**, but rather the maximum input current. The maximum output current, assuming you have a higher output voltage, will be less than this.

## Compensation Loop

The compensation loop is part of the feedback mechanism. The below diagram shows a current-mode controlled boost converter with a transconductance amplifier (\( g_m \)) providing the feedback.

{{< figure src="/images/2015/04/simplified-diagram-current-mode-boost-converter-with-gm-amplifier.png" width="557px" caption="A simplified diagram of a current-mode boost converter with a transconductance amplifier (gm). Image from Texas Instruments Application Report SLVA452 - Compensating the Current-Mode-Controlled Boost Converter."  >}}

The above model is only valid for when the boost converter is acting like a current-mode controlled regulator. This is the case when the ripple current is within the normal operating region (0.2-0.4 times the average input current). When the inductor is oversized to further reduce current ripple through the inductor (less than 0.2 times the average input current), the boost converter behaves more like a voltage-mode controlled regulator and this above model is no longer valid.

External compensation can be added if the manufacturer provides a compensation pin (typically called COMP). The pin is the output of the internal transconductance amplifier.

{{< figure src="/images/2015/04/compensation-components-for-tps61087evm-boost-converter-annotated.png" width="870px" caption="The external loop compensation components for the TPS61087 boost regulator. Image from the Texas Instruments TPS61087EVM User's Guide with annotations."  >}}

A resistance between 5-100kR and a capacitance between 1-10nF is typical. A higher resistance corresponds to a faster response time. A lower capacitance corresponds to a higher phase margin.

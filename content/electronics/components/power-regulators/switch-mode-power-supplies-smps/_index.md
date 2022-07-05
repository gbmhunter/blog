---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Electronic Components", "Power Regulators" ]
date: 2015-03-24
description: "Topologies (buck, boost, buck-boost, SEPIC, Ćuk), control methods, component selection, equations, operation modes, schematics, examples and more info on switch-mode power supplies."
draft: false
images: [ "/electronics/components/power-regulators/switch-mode-power-supplies-smps/smps-buck-converter-simple.png" ]
lastmod: 2021-08-19
tags: [ "electronics", "components", "power regulators", "SMPS", "buck converter", "power electronics", "inductor", "capacitor", "regulation", "control methods", "constant frequency", "current-mode", "SNVA555", "PCM", "peak current mode", "CCM", "constant current mode", "SEPIC", "Cuk", "Ćuk" ]
title: "Switch Mode Power Supplies (SMPS)"
type: "page"
---

## Overview

_Switch-mode power supplies_ (SMPS) are power conversion circuits that **efficiently convert input voltages/currents (power) into different output voltages/currents**. This page only looks at non-isolated SMPSs, i.e. topologies that don't use a transformer. For info on isolated SMPS regulator designs, see the [Isolated Switch Mode Power Supplies page](/electronics/components/power-regulators/isolated-switch-mode-power-supplies/). SMPS can either:

* Decrease the voltage ([^Buck Converters, buck converter])
* Increase the voltage ([^Boost Converters, boost converter])
* Increase or decrease the voltage (buck-boost, [^SEPIC, SEPIC], [^Ćuk Converter, Ćuk Converter])
* Increase or decrease AND invert the voltage ([^Inverting Buck-Boost Converters, inverting buck-boost converter])

Unlike linear regulators which act as a dynamic series resistance to dump energy as heat and produce a lower output voltage, **SMPSs efficiently perform voltage conversion by storing energy in the magnetic field of an inductor and electric field of a capacitor** (and are not limited to just producing lower output voltages, they can produce higher output voltages also).

## SMPS Modes Of Operation

SMPS can work in different modes of operation:

* Continuous conduction mode (CCM)
* Discontinuous conduction mode (DCM)
* Critical conduction mode (CrCM)
* Burst-mode

We'll explain these a little in the following sub-sections before moving on to boost converters.

### Continuous Conduction Mode (CCM)

_Continuous conduction mode_ (CCM) is when the **current through the inductor never falls to 0** during the switching cycle. In the case of converter with multiple inductors (e.g. [^SEPIC, SEPIC], [^Ćuk Converter, Ćuk Converter]), CCM is when the current never falls to 0 in **any** of the inductors.

For the same output current, the peak current through the inductor is lower when the SMPS is operating in CCM, compared on any other mode of operation.

CCM encounters turn-on losses through the switch. These can be exacerbated by the diodes reverse recover charge (`\( Q_{rr} \)`). Ultra-fast diodes with low (`\(Q_{rr}\)`) are therefore recommended.

### Discontinuous Conduction Mode (DCM)

_Discontinuous conduction mode_ (DCM) is when the **current through the inductor falls to 0** (and stays there for a period of time, if it just reaches 0 but does not stay there it is in [^Critical Conduction Mode (CrCM), Critical Conduction Mode]) during a switching cycle of the SMPS.

The switch (lets assume a MOSFET) is turned on at zero current, which means there is little turn-on loss.

### Critical Conduction Mode (CrCM)

Critical conduction mode (CrCM) is at the boundary between CCM and DCM. 

In CrCM, the peak inductor current is exactly twice the average value. This increases the switching element's RMS current and turn-off current.

CrCM is good for low to medium power boost converter designs. At higher power levels the low filtering ability and high peak inductor currents start to become disadvantageous. Above this point boost converters operating in CCM are more preferable.

### Burst-Mode

Burst-mode is a favourite for saving power when the load needs very little current. In burst-mode operation, the regulator operates for a period of time, charges up the output capacitor to a set threshold, and then shuts down completely. When the output voltage sags below a set threshold, the converter turns back on and the cycle restarts. This works well when there is little load current and so the converter can "sleep" for a significant period of time before it has to turn on again.

When the converter enters sleep, a number of power consuming components of the SMPS control circuit can be disabled (e.g. oscillators, voltage references, op-amps), saving power.

### Advanced Asynchronous Modulation (AAM)

AAM is not supported by all buck converters, and is a mode used at low output currents to reduce the power consumption of the SMPS.

## Inverting Buck-Boost Converters

An inverting buck-boost is a type of switch-mode power supply (SMPS) that converts an input voltage into a higher or lower output voltage. It is given the name inverting because it generates a negative output voltage.

{{% img src="inverting-buck-boost-converter-basic-schematic.svg" width="600" caption="The basic schematic of a inverting buck-boost converter. SW1 is typically a MOSFET switched by control logic (not shown)." %}}

### Output Voltage

Again, the output voltage for an ideal SEPIC is purely determined by the input voltage and the duty cycle `\(D\)`, as given in the following equation:

[stem]
++++
\begin{align}
V_{OUT} = -\frac{D}{1 - D} V_{IN}
\end{align}
++++

To give you an idea of how varying the duty cycle can produce either a higher or lower output voltage, see [^vout-to-vin-vs-duty-cycle-buck-boost] which shows how the output voltage can vary from a small fraction of `\(V_{IN}\)` to many times larger than `\(V_{IN}\)`, and they are equal when the duty cycle is set at 50%.

[[vout-to-vin-vs-duty-cycle-buck-boost]]
{{% img src="vout-to-vin-vs-duty-cycle-buck-boost.png" width="500" caption="Relationship between duty cycle and the voltage ratio for a inverting buck-boost converter, ignoring the sign (so applicable for a SEPIC also). Dotted line drawn where `\(V_{OUT} = V_{IN}\)`, at `\(D=0.5\)`." %}}

As the duty cycle approaches 100%, the ideal output voltage approaches infinity! In practise, non-idealities and component absolute maximums limit the the output voltage to something in the range of 10x the input voltage.

## Ćuk Converter

The _Ćuk converter_ is a buck-boost topology that only requires a single switch, but two inductors (just like the [SEPIC](#_sepic)). It also has the additional property of 0 output ripple current when it's two inductors are coupled. It produces an output voltage which is opposite in polarity to the input (i.e. it is _inverting_).

**Advantages:**

* 0 output ripple current (when the two inductors are coupled).

**Disadvantages:**

* High current stress in the switch.
* Inverting (depending on the application, this could be an advantage!)

## Floating Buck-Boost Converters

A _floating buck-boost converter_ is a rarer form of SMPS topology that can generate an output voltage that is either lower or higher than the input voltage. It is labelled "floating" because neither of the output terminals is connected to ground. LEDs do not normally need to be ground referenced, and for this reason it is almost exclusively used for LED driver circuits (configured with feedback so the SMPS output a constant current rather than a constant voltage).

**Advantages:**

* Buck-boost ability with only a single inductor.

**Disadvantages:**

* Floating load (not referenced to ground).

{{% img src="floating-buck-boost-converter-basic-schematic.svg" width="500" caption="Schematic of a floating buck-boost converter. Note that `\(V_{IN}\)` is referenced to ground, but `\(V_{OUT}\)` is not (measured across `\(R_{LOAD}\)` as shown)." %}}

[^floating-buck-boost-converter-current-when-switch-closed] shows the current paths through the floating buck-boost converter when the switch is closed[^bib-onsemi-floating-buck-boost]. `\(V_{IN}\)` provides a linearly increasing charging current to `\(L1\)`, whilst output capacitor `\(C_{OUT}\)` provides current to the load. `\(D1\)` is reverse-biased and so open-circuit.

[[floating-buck-boost-converter-current-when-switch-closed]]
{{% img src="floating-buck-boost-converter-current-when-switch-closed.svg" width="500" caption="Current paths through the floating buck-boost converter when the switch is **closed** (during `\(t_{on}\)`)." %}}

[^floating-buck-boost-converter-current-when-switch-open] shows the current paths when the switch is open. `\(L1\)` had current going through it the moment `\(SW1\)` was opened, and isn't too happy about having it's current interrupted. So it generates a voltage which forward biases `\(D1\)` and provides current to both the load and to re-charge the output capacitor `\(C_{OUT}\)`.

[[floating-buck-boost-converter-current-when-switch-open]]
{{% img src="floating-buck-boost-converter-current-when-switch-open.svg" width="500" caption="Current paths through the floating buck-boost converter when the switch is **open** (during `\(t_{off}\)`)." %}}

### Output Voltage To Duty Cycle Equation

Like the other topologies, we can find the equation linking the input voltage, output voltage and duty cycle by remembering the simple rule that the **average voltage across the inductor must be 0 over a switch cycle**. The voltage across the inductor when the switch is on (during `\(t_{on}\)`) is just `\(V_{IN}\)` (taking the left side of the inductor as positive). The voltage across the inductor when the switch is off (during `\(t_{off}\)`) is `\(-V_{OUT}\)` (ignoring the forward voltage drop across the diode, and remembering we had defined the positive side of the inductor to be the on the left, hence `\(V_{OUT}\)` is negative). So: 

[stem]
++++
\begin{align}
V_{IN}t_{on} + (-V_{OUT})t_{off} = 0 \nonumber \\
\label{eq:vout-vin-ton-toff}
\frac{V_{OUT}}{V_{IN}} = \frac{t_{on}}{t_{off}} \\
\end{align}
++++

Using:

[stem]
++++
\begin{align}
\label{eq:d-eq-ton-t}
D = \frac{t_{on}}{T} \\
\label{eq:one-d-eq-toff-t}
1 - D = \frac{t_{off}}{T} \\
\end{align}
++++

We can then write `\(\frac{V_{OUT}}{V_{IN}}\)` in terms of `\(D\)`:

[stem]
++++
\begin{align}
\frac{V_{OUT}}{V_{IN}} &= \frac{DT}{(1 - D)T} & \text{Subs. \ref{eq:d-eq-ton-t} and \ref{eq:one-d-eq-toff-t} into \ref{eq:vout-vin-ton-toff}.} \nonumber \\
                        \label{eq:floating-buck-boost-vout-vin-d}
                       &= \frac{D}{1 - D} \\
\end{align}
++++

Eq. `\(\ref{eq:floating-buck-boost-vout-vin-d}\)` is the classic equation for a buck-boost converter.

### ICs That Support The Floating Buck-Boost Topology

* [OnSemi NCP3020A](https://www.onsemi.com/pdf/datasheet/ncp3020-d.pdf): 4.7-28V input, requires external switch.
* [TI TPS92001](https://www.ti.com/product/TPS92001): 12-21V input, 2A output max. Requires external switch.

## References

[^bib-microsemi-v-i-mode]:  Maniktala, Sanjaya (2012). _Voltage-Mode, Current-Mode (and Hysteretic Control)_. Microsemi. Retrieved 2021-08-22, from https://www.microsemi.com/document-portal/doc_view/124786-voltage-mode-current-mode-and-hysteretic-control.
[^bib-onsemi-floating-buck-boost]:  OnSemi (2011, May). _Design Note DN05002/D: Buck-Boost Converter for 3A LEDs_. Retrieved 2021-09-16, from https://www.onsemi.com/pub/Collateral/DN05002-D.PDF.
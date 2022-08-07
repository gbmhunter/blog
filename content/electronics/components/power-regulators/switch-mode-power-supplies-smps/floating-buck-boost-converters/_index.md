---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Electronic Components", "Power Regulators" ]
date: 2015-03-24
description: "Info on floating buck-boost converters."
draft: false
images: [ "/electronics/components/power-regulators/switch-mode-power-supplies-smps/smps-buck-converter-simple.png" ]
lastmod: 2022-07-18
tags: [ "electronics", "components", "power regulators", "SMPS",  ]
title: "Floating Buck-Boost Converters"
type: "page"
---

## Floating Buck-Boost Converters

A _floating buck-boost converter_ is a rarer form of SMPS topology that can generate an output voltage that is either lower or higher than the input voltage. It is labelled "floating" because neither of the output terminals is connected to ground. LEDs do not normally need to be ground referenced, and for this reason it is almost exclusively used for LED driver circuits (configured with feedback so the SMPS output a constant current rather than a constant voltage).

**Advantages:**

* Buck-boost ability with only a single inductor.

**Disadvantages:**

* Floating load (not referenced to ground).

{{% figure src="floating-buck-boost-converter-basic-schematic.svg" width="500" caption="Schematic of a floating buck-boost converter. Note that `\(V_{IN}\)` is referenced to ground, but `\(V_{OUT}\)` is not (measured across `\(R_{LOAD}\)` as shown)." %}}

[^floating-buck-boost-converter-current-when-switch-closed] shows the current paths through the floating buck-boost converter when the switch is closed[^bib-onsemi-floating-buck-boost]. `\(V_{IN}\)` provides a linearly increasing charging current to `\(L1\)`, whilst output capacitor `\(C_{OUT}\)` provides current to the load. `\(D1\)` is reverse-biased and so open-circuit.

[[floating-buck-boost-converter-current-when-switch-closed]]
{{% figure src="floating-buck-boost-converter-current-when-switch-closed.svg" width="500" caption="Current paths through the floating buck-boost converter when the switch is **closed** (during `\(t_{on}\)`)." %}}

[^floating-buck-boost-converter-current-when-switch-open] shows the current paths when the switch is open. `\(L1\)` had current going through it the moment `\(SW1\)` was opened, and isn't too happy about having it's current interrupted. So it generates a voltage which forward biases `\(D1\)` and provides current to both the load and to re-charge the output capacitor `\(C_{OUT}\)`.

[[floating-buck-boost-converter-current-when-switch-open]]
{{% figure src="floating-buck-boost-converter-current-when-switch-open.svg" width="500" caption="Current paths through the floating buck-boost converter when the switch is **open** (during `\(t_{off}\)`)." %}}

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
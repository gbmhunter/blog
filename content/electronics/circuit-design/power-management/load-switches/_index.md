---
author: "gbmhunter"
categories: [ "Electronics", "Circuit Design" ]
date: 2013-11-08
description: "Schematics, circuit explanations, equations and more info on load switches."
draft: false
lastmod: 2021-02-16
tags: [ "electronics", "circuit design", "load switches", "MOSFETs", "BJTs", "power supplies", "loads", "current sinks", "ICs" ]
title: "Load Switches"
type: "page"
---

## MOSFET Based

The following image shows a {{% link text="MOSFET" src="/electronics/components/transistors/mosfets" %}} based high-side switch:

{{< img src="high-side-mosfet-load-switch-schematic.png" width="678px" caption="A high-side load switch made from a N-Channel and P-Channel MOSFET." >}}

### BJT Current Sink Driving P-Channel MOSFET Load Switch

A simple resistor divider can be used to provide the correct `\(V_{GS}\)` to turn on a P-channel MOSFET based load switch, however that only works well if the `\(V_{IN}\)` is known and stays at fixed voltage. If it doesn't, then the resistor divider provides a varying `\(V_{GS}\)`, which could either turn the switch the MOSFET off at lower input voltages, or exceed `\(V_{GS(max)}\)` at higher input voltages (`\(V_{GS(max)} = \pm 20V\)` for most MOSFETs).

A better option in this case is to use a BJT current sink to set the desired `\(V_{GS}\)` across a resistor, as shown in the following diagram:

{{% img src="bjt-current-source-to-turn-p-channel-on.svg" width="700px" caption="Rather than using a simple resistor divider to provide the necessary gate-source voltage to turn on a P-channel load switch, you can use a BJT current sink, which has the added benefit of providing a constant Vgs over a wide range of input voltages." %}}

We assume the BJT (`\(Q_1\)`) is switched with `\(+3.3V\)` coming from a microcontroller or similar. The BJT is configured to be a simple current sink, with the current given by:

<p>\begin{align}
I_C &= \frac{V_B - 0.7V}{R_E} \\
    &= \frac{3.3V - 0.7V}{2.7k\Omega} \\
    &= 1mA
\end{align}</p>

This current goes through `\(R_1\)`, which provides the necessary `\(V_{GS}\)` to turn the P-channel MOSFET (`\(Q_2\)`) on:

<p>\begin{align}
V_{GS}  &= -I \cdot R_1 \\
        &= -1mA \cdot 10k\Omega \\
        &= -10V
\end{align}</p>

`\(R_G\)` is added as good standard practise to limit gate current and gate voltages. In the above example, `\(V_{IN}\)` can vary from approx. 11V right up to the maximum allowed drain-source or collector-emitter voltages (for example, `\(48V\)`), whilst keeping `\(V_{GS} = -10V\)`.

## IC Based

The following image shows an IC based high-side switch.

{{< img src="high-side-load-switch-with-tps27082lddcr-ic-schematic.png" width="692px" caption="The TPS27082LDDCR, a high-side load switch IC."  >}}

Some load-switches have reverse-polarity protection. More information of how they exactly implement reverse-protection with only the one MOSFET can be found in the [The Substrate (Body) Connection section of the MOSFET page](/electronics/components/transistors/mosfets/#the-substrate-body-connection).


{{< img src="ncp380-ncv-380-load-switch-internal-block-diagram-with-reverse-current-protection.png" width="516px" caption="A functional diagram of the NCP380 high-side load switch. Note the switches connected to the MOSFET substrate which show how reverse-current protection is performed."  >}}


---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Electronic Components ]
date: 2015-03-25
draft: false
lastmod: 2023-04-21
tags: [ analogue, analog, switches, crosstalk, power consumption, CMOS, MOSFETs, ADC, resistance, substrate, transmission gates, TGs, flip-flops, latches, I2C ]
title: Analogue Switches (Transmission Gates)
type: page
---

## Overview

**Analogue switches are electrical circuits which connect and disconnect analogue signals**. When used in digital circuits (e.g. [flip-flops](/electronics/circuit-design/digital-logic/latches-and-flip-flops/)) the same circuit made below from MOSFETs is normally called a _transmission gate_.

Apart from the the fact that analogue switches work with continuous voltages and digital buffers only work with discrete HIGHs or LOWs, one other big difference is that **analogue switches allow bi-directional data flow, whilst digital buffers only allow uni-directional data flow**. Digital buffers have a dedicated IN and OUT, whilst each side of an analogue switch can either be IN or OUT (IN/OUT).

When many analogue switches are combined so that one analogue signal can be routed to many different locations, it is called an _analogue multiplexor_. These are discussed on the [Multiplexers And Demultiplexers page](/electronics/components/multiplexers-and-demultiplexers/).

## How Do Analogue Switches Work?

CMOS ([MOSFETs](/electronics/components/transistors/mosfets/)) is the most popular IC process to make analogue switches from, however [JFETs](/electronics/components/transistors/junction-gate-field-effect-transistor-jfets/) are used for special applications such as video switching due to the high bandwidth and signal quality requirements of the signal[^bib-ad-analog-switch-multiplexers-basics].

The basic idea is to connect 1 N-channel and 1 P-channel MOSFET together in parallel, so their sources and drains are connected together (although because the substrates are not connected to the source, there is symmetry in the construction of the MOSFET and no actual difference between the source and drain, more on this below).

{{% figure src="analog-switch-circuit-two-mosfets.svg" width="600px" caption="Circuit diagram of a basic CMOS analogue switch, using one P-channel MOSFET (`\(Q1\)`) and one N-channel MOSFET (`\(Q2\)`)." %}}

{{% warning %}}
The substrates of the two MOSFETS in the diagram above are not connected to the source pin, as they typically are for all discrete MOSFETs. Instead they are connected to `\(V_{SS}\)` (e.g. `\(GND\)`) and `\(V_{DD}\)` respectively such that 1 of the two internal body diodes is always reverse biased and OFF. They have to be like this for this circuit to work correctly. If the substrate WAS connected to the source (like a regular discrete MOSFET), then one of the inherent body diodes is shorted out, leaving only 1 remaining per MOSFET. These remaining body diodes would forward conduct in 1 direction and would mean it would be impossible to turn the analogue switch off. For this reason, you cannot make an analogue switch as shown from typical discrete MOSFETs. See the [MOSFETs page](/electronics/components/transistors/mosfets/#_the_substrate_body_connection) for more info.
{{% /warning %}}

When the analogue switch is turned on, the resistance of each MOSFET depends on the analogue switch voltage. At low voltages, the N-channel MOSFETs resistance is very low and conducts most of the current. As the voltage rises, the P-channel MOSFETs resistance decreases whilst the N-channel increases, at the P-channel conducts most of the current. The graph below shows the resistance of each individual MOSFET, as well as the combined resistance seen by an external circuit. The combined resistance is the parallel resistance of both the N-channel and P-channel MOSFET.

{{% figure src="analogue-switch-resistance-graph.png" width="600px" caption="Graph of the individual MOSFETs on resistance versus the switch voltage, and the combined on resistance seen by the external circuit (which is both resistances in parallel)." %}}

Notice how the resistance is not relatively constant, but not perfectly linear! This non-linearity can cause signal degradation depending on the input and output impedances of the circuity connected to it. Generally speaking, the on resistance of the analogue switch is not an issue if driven from a suitable "stiff" source, and passed through to a high-impedance input such as an ADC (assuming you allow for enough settling time, the input capacitance of the ADC will form a low-pass RC circuit with the switch resistance). 

## Transmission Gates

A _transmission gate_ (which can be abbreviated to just _TG_[^bib-electronics-tutorials-transmission-gate]) is used to describe the **same MOSFET-in-parallel circuit** as the analog switch above, but when **used in a digital context**. It is commonly used in the design of [latches and flip-flops](/electronics/circuit-design/digital-logic/latches-and-flip-flops/), and is an integral part of [pass transistor logic (PTL)](/electronics/circuit-design/digital-logic/gates/#pass-transistor-logic-ptl).

When showing a transmission gate on a schematic, it is almost **never drawn showing discrete MOSFETs**. It is usually simplified in the form of a "single bow tie" or "double bow tie" symbol, as shown below. Sometimes, simplified MOSFET symbols are shown, in where no arrows are used to indicate NMOS from PMOS, but rather a "inverting bubble" is added to the gate of the PMOS MOSFET. 

{{% figure src="transmission-gate-symbols.png" width="900px" caption="Various schematic symbols used for transmission gates (the same thing as an analogue switch but used for digital signals)." %}}

`\(CLK\)` is the gate of the N-channel MOSFET, `\(\overline{CLK}\)` the gate of the P-channel. `\(A\)` and `\(B\)` are the two sides of the transmission gate.

Notice how the clock signal `\(CLK\)` and it's inverse `\(\overline{CLK}\)` are provided to the gates. This will enable the transmission gate when the clock is HIGH, and disable it when LOW. If you swap `\(CLK\)` and `\(\overline{CLK}\)` you will invert the logic and instead enable the transmission gate when the clock is LOW. The clock signal is the most common signal provided to turn the transmission gate on and off. 

To show a real-world use case for a transmission gate, this is the logic diagram for the Nexperia `74HC74` dual D-type flip-flop IC[^bib-nexperia-74hc74-ds]:

{{% figure src="nexperia-74hc74-d-flip-flop-logic-diagram.png" width="700px" caption="Logic diagram for 1 of the positive-edge triggered D-type flip-flops in the Nexperia 74HC74 IC. Note the complexity![^bib-nexperia-74hc74-ds]" %}}

## Crosstalk

For analog switch ICs with more than one switch, the amount of channel-to-channel crosstalk becomes an important metric.

## Switching Speeds

For switches with more than one pole, the IC manufacturers usually make sure there is a specified "break-before-make" period.

## Power Consumption

The following values are considered a low-power switch:

* Iq = 25nA (typ), 40nA (max)
* Ileakage = 5nA (typ), 90nA (max)

## Examples

### Intersil ISL43L410

The Intersil `ISL43L410` is a low on-resistance, low-voltage single-supply, DPDT analogue switch. One of its main selling points is it's low power consumption with an `\(I_q = 25nA\)` (typ) and `\(40nA\)` (max). Leakage current is `\(I_{leakage} = 5nA\)` (typ), `\(90nA\)` (max).

{{% figure src="intersil-isl43l410-analogue-switch-functional-diagram.png" width="250px" caption="Functional diagram of the Intersil ISL43L410 analogue switch. Image from http://www.intersil.com/content/dam/Intersil/documents/isl4/isl43l410.pdf." %}}

This IC has the nice feature that the common net can be disconnected from both NC and NO at the same time. However, both switches cannot be switched from NC to NO independently, which might be a deal-breaker for some designs.

### Maxim DS3690

The [Maxim DS3690](https://www.analog.com/media/en/technical-documentation/data-sheets/DS3690T-DS3690TTRL.pdf) (now Analog Devices) is a 26-channel transmission gate in a TQFN-56 package[^bib-maxim-ds3690-ds]. Each channel is independent (in the sense it's not connected to any other channels, but it is switched with a shared control signal). It is designed for digital bus isolation when digital bus components are disabled or removed.

{{% figure src="maxim-ds3690-26-channel-transmission-gate-functional-diagram.png" width="300px" caption="The functional diagram for the Maxim DS3690 26-channel transmission gate[^bib-maxim-ds3690-ds]." %}}

## References

[^bib-ad-analog-switch-multiplexers-basics]: Analog Devices (2008, Oct.). _MT-088: Analog Switches and Multiplexers Basics_. Retrieved 2021-09-01, from https://www.analog.com/media/en/training-seminars/tutorials/MT-088.pdf.
[^bib-wikipedia-transmission-gate]: Wikipedia (2022, July 9). _Transmission gate_. Retrieved 2023-04-21, from https://en.wikipedia.org/wiki/Transmission_gate.
[^bib-nexperia-74hc74-ds]: Nexperia (2023, Feb 9). _74HC74; 74HCT74 - Dual D-type flip-flop with set and reset; positive edge-trigger_. Retrieved 2023-04-11 from https://assets.nexperia.com/documents/data-sheet/74HC_HCT74.pdf.
[^bib-electronics-tutorials-transmission-gate]: Electronics Tutorials. _Transmission Gate_. Retrieved 2023-04-22, from https://www.electronics-tutorials.ws/combination/transmission-gate.html.
[^bib-maxim-ds3690-ds]: Maxim (2007, Oct). _3.3V 26-Channel, Three-Stateable Transmission Gate_. Retrieved 2023-04-22, from https://www.analog.com/media/en/technical-documentation/data-sheets/DS3690T-DS3690TTRL.pdf.

---
author: "gbmhunter"
categories: [ "Electronics", "Circuit Design" ]
date: 2011-09-03
draft: false
tags: [ "ESD", "diodes", "electrostatic discharge", "high voltage", "electronics", "series resistance" ]
title: "ESD Protection"
type: "page"
---

## Overview

Electrostatic discharge (ESD) is a unintended quick high-voltage transient waveform which appears on conductors within an electrical circuit. The high voltages and current peaks caused by ESD can cause devices such as static sensitive ICs to fail. Human contact is a common source of an ESD. Even if there is no direct human contact with the circuit, devices such as capacitive sense switches can allow charge to be coupled through onto electrical conductors. ESD protection is needed in cases were ESD discharges could potentially cause a circuit to fail.

{{< img src="esd-protectors-schematic-symbol.png" width="400px" caption="The schematic symbol for ESD protectors. Image from http://www.bourns.com/data/global/pdfs/MLC.pdf." >}}

## ESD Protection Devices

The table below summarizes the different components you can use for ESD protection.

<div class="table-wrapper">
<table>
	<tr>
		<th>Component</th>
		<th>Power Capability</th>
		<th>Comments</th>
	</tr>
	<tbody>
		<tr>
			<td>Ceramic Capacitor</td>
			<td>Poor</td>
			<td>One of the oldest, simplest and cheapest forms of ESD protection. As you can guess, because of this, it does not perform as well as some of the dedicated ESD devices.</td>
		</tr>
		<tr >
			<td>Zener Diode</td>
			<td>Average</td>
			<td >Zener diodes were designed for voltage regulation rather than ESD protection, but they can be used for low-power ESD protection. For more information, see the <a href="/electronics/components/diodes/">Diodes page</a>.</td>
		</tr>
		<tr>
			<td>TVS Diode</td>
			<td>Excellent</td>
			<td>These things are designed to handle high-power ESD surges. Turn on time is very good also. Uni-directional TVS diodes have a much faster turn-on time (e.g. 4ps) as opposed to bi-directional types (e.g. 4ns). For more information, see the <a href="/electronics/components/diodes/">Diodes page</a>.</td>
		</tr>
	</tbody>
</table>
</div>

## Internal ESD Protection On CMOS I/O

Inbuilt protection is very common on a CMOS I/O pins that may be part of a device (anything from a simple load switch, to a medium complexity microcontroller, to a high complexity FPGA). They are normally two per I/O pin. One attached between the pin and GND, and one attached between the pin and VCC. Both are reverse-biased under normal operating conditions (`\( GND <= V_{I/O} <= V_{CC} \)`).

They serve to protect the sensitive CMOS logic in the case of a fault condition on the pin. If the voltage on `\( V_{I/O} \)` rises above `\( V_{CC} \)` (e.g. positive ESD voltage spike), then the top diode conducts, clamping the voltage on the pin to no more than `\( V_{CC} + V_f \)`. Similarly, if the voltage on `\( V_{I/O} \)` drops below `\(V_{GND}\)` (e.g. negative ESD voltage spike), then the bottom diode conducts, clamping the voltage on the pin to no more than `\( -V_f \)`.

Be careful, as these diodes usually have quite a low maximum current. Exceeding this maximum current will blow the ESD diode, usually causing it to go open-circuit, removing the protection from the sensitive CMOS circuitry, which then gets fried almost instantaneously. Your I/O pin then stops working. If your lucky, it will only be a single pin that is effected. If your not, the whole port (if applicable), or even the whole device is fried.

However useful they may be, they also generate design challenges in specific scenario's, and therefore require careful consideration when doing any schematic design involving CMOS I/O with the ESD protection diodes present. The two scenario's which cause problems are:

1. When powering up a circuit with multiple voltage rails
1. When the voltage on `\(V_{I/O}\)` could at some points be higher than `\(V_{CC}\)` because of the nature of the incoming signal.
1. When you are selectively powering down the voltage rails powering these ICs in low-power designs.

Out of all these scenarios, 3. has to be the one that catches a schematic designer out the most often.

## Backpowering

Backpowering is a phenomenon which occurs in circuits that selectively turn of voltage rails as part of it's normal operation (e.g. low-power circuitry). Even though you have turned the linear regulator/SMPS/load switch off, the circuit still remains powered! What?!?

If the leakage current through any CMOS I/O ESD diodes onto the "unpowered" rail is large enough, the circuit may begin back powering itself. This means that although you have turned off the voltage source supplying that rail, the rail still remains powered and all the ICs connected to it still work normally.

You can normally diagnose this by noting the the "unpowered" rail will be one diode forward voltage drop (`\(V_f\)`, which is usually around 0.5-0.7V) less than the voltage on the I/O pin(s) powering the rail (which are normally at `\(V_{CC}\)`).

## Disabling The ESD Diodes

Extra diodes, external to the IC, can be added to prevent leakage currents through CMOS IO pins on devices which have ESD protection diodes to VCC and GND. The following image shows how they would be connected to the IC of interest.

{{< img src="protection-diodes-to-disable-esd-diodes-on-cmos-io.png" width="489px" caption="Adding external diodes to disable the internal ESD diodes in an IC. Image from http://www.intersil.com/content/dam/Intersil/documents/isl4/isl43l410.pdf."  >}}

However, this approach has it's disadvantages. The actual supply voltage seen by the IC is reduced by twice the voltage drop (`\(V_f\)`) across the diodes (normally 2x 0.5-0.7V = 1.0-1.4V). Also, the IC ground is now significantly different from the system ground. This can upset single-ended ADC measurements and other analogue functions.

## Series Resistance Into CMOS I/O

I would explain this, but I found an application note by Silicon Labs to explain this much better than I could. So here is a direct copy-and-paste from [AN376](http://www.silabs.com/Support%20Documents/TechnicalDocs/AN376.pdf).

<blockquote>
The most common method of external ESD protection is adding a small series resistance in-line between the source of ESD energy and the integrated circuit pin to be protected. Somewhat counter-intuitively, a resistance as small as 50Ω can double the ESD immunity of a CMOS IC. Higher immunity is possible; a higher level of protection is somewhat proportional to increased series resistance.

This method works for two reasons. First, the series resistance works with the ICs parasitic pin capacitance (typically 5 to 10 pF) to create a single-pole low pass filter with a cut-off frequency below 1 GHz. This causes the series resistor to attenuate a majority of an ESD event's high-frequency energy (as much as 90% of the rising-edge power in an HBM discharge). Second, when the ICs protection circuits are operating normally, their impedance is very low (on the order of tens of ohms or less). This low resistance works with the series resistance to create a voltage divider, so that the high voltage from an ESD event can only bias the ICs built-in protection circuits with a portion of the total ESD voltage. This attenuation is in addition to rising-edge filtering. The sum of these effects from a simple external series resistor dramatically improves ESD performance in a demanding application.
</blockquote>

## Optimal Placement

If you are adding both a TVS diode and a series resistor as ESD protection to a CMOS I/O pin (e.g. a GPIO pin on a microcontroller), it is best to put the series resistor first (closer to the source of the ESD event), and then the TVS diode second (closer to the microcontroller).

This is allowable because the resistor is not damaged by ESD, and can dissipate most of the power, leaving only fraction for the TVS diode, meaning the voltage on the CMOS I/O pin will not change by as much as it would otherwise.

## Issues With Pull-ups/Pull-downs

One problem with series resistors is that they can cause problems when used in conjunction with pull-up or pull-down resistors. Pull-up/pull-down resistors are common on CMOS I/O outputs which have either an open-collector (the more common choice) or open-emitter configuration. The problem is that the ESD/current-limiting series resistor and pull-up/pull-down will form a voltage divider in particular scenarios.

Check the inputs maximum digital low and minimum digital high voltage levels. If they are still met, then you don't have to worry.

## ESD Protection Of Capacitive Sensing I/O Lines

See the [Capacitive Touch Sensing](/electronics/circuit-design/capacitive-touch-sensing) page.

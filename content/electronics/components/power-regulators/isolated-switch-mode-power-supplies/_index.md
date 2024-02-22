---
authors: [ "Geoffrey Hunter" ]
date: 2021-08-27
description: "Schematics, uses/applications and more info about isolated switch-mode power supplies."
draft: false
lastmod: 2021-08-27
tags: [ "electronics", "components", "power supplies", "isolated", "switch-mode power supplies", "SMPS", "flyback", "forward" ]
title: "Isolated Switch Mode Power Supplies"
type: "page"
---

{{% warning-is-notes %}}

## Overview

For regular non-isolated buck, boost, regulators, SEPIC and Ćuk regulators see the [Switch Mode Power Supplies (SMPS) page.]()

Isolated SMPS topologies:

| Name          | Advantages
|---------------|-----------------------------------------------------------------------
| Flyback       | Requires no inductor (uses the transformer). Simple. Low cost.
| Flybuck       | Higher freq. than flyback (= smaller components/better efficiency).
| Forward

{{% figure src="traco-power-tsp600-124-psu-photo.jpg" width="350px" caption="Photo of the Traco TSP600-124 24V 600W DIN-mounted power supply, which runs of mains power. This is medium power isolated switch-mode power supply unit." %}}

## Flyback Converters

A flyback converter is a type of isolated power converter. It can be thought of as a buck-boost converter with the inductor split to form a transformer. The basic schematic is shown below:

{{% figure src="flyback-regulator-schematic-basic.svg" width="600px" caption="Schematic of a basic flyback converter, with no feedback. Transformer T1 is usually called a \"mutually coupled inductor\"." %}}

Flyback converters are unique in the fact that they use the transformer as **both a transformer (to provide voltage/current conversion and isolation) and inductor (for storage of energy in it's magnetic field)**. All other isolating SMPSs only use the transformer for voltage/current conversion and isolation, and require a separate inductor on the secondary side for performing the buck/boost regulation. The flyback converter to the most used isolating SMPS topology used[^bib-ti-feedback-loop-design-considerations].

### Principle Of Operation

1. Switch \(SW1\) closes. The primary of the transformer is connected directly to the input. The current ramps up linearly in the transformer, storing energy in it's magnetic field. Since the voltage on the secondary is negative (note the polarity dots on the windings), diode \(D1\) is reverse biased and does not conduct, leaving \(C_{OUT}\) to supply energy to the load (which it does from energy stored in the previous cycle).

1. Switch \(SW1\) opens. The primary current drops (very rapidly). Suddenly, the secondary voltage becomes positive, and \(D1\) conducts. This supplies energy to both \(C_{OUT}\) and the load.

{{% aside type="tip" %}}
TIP: At first you may be thinking, but wait, because inductors don't like changes in current, isn't the transformer going to create a huge primary side voltage when the switch is opened? This would be true for a standalone inductor, but because the magnetic field is coupled to the secondary side, the moment the switch opens and the primary-side current stops, the current in the secondary side starts. However, there is still the problem of parasitic inductance. This is a portion of the total primary inductance which is not coupled over to the secondary. This does create a large voltage spike, and has to be dealt with zeners/TVS diodes.
{{% /aside %}}

The output voltage is given by Eq \(\ref{eq:vout-vin-flyback}\).

$$\begin{align}
\label{eq:vout-vin-flyback}
V_{OUT} = \frac{V_{IN}}{N_{PS}} \frac{D}{1 - D}
\end{align}$$

<p class="centered">
where:<br/>
\(N_{PS}\) is the windings ratio from primary to secondary, \(\frac{N_P}{N_S}\)<br/>
\(D\) is the duty cycle, and varies from \(0\) to \(1\). It is defined as:<br/>
\begin{align}
D = \frac{t_{on}}{T}
\end{align}
</p>

### Feedback

Without feedback, regulation for a flyback converter can be as good a 5-10% (assuming the input voltage is known and constant). If you need tighter precision of the output voltage, or if the input voltage varies wildly, you will need to add feedback.

The TL431 precision shunt voltage reference in tandem with an optocoupler is a popular way of providing feedback from the secondary side back to a flyback converter. As shown below, it's REF pin is connected via resistor divider to \(V_{OUT}\), and it sinks as much current through the optocoupler's LED to keep \(V_{REF}\) at \(2.5V\), hence providing just enough feedback drive to regulate the output voltage.

{{% figure src="flyback-regulator-schematic-with-optocoupler-feedback.svg" width="800px" caption="Schematic of a flyback regulator with optocoupler-based feedback. The TL431 plays a pivotal role in the feedback loop, essentially sinking as much current through the LED of the optocoupler to keep it's REF voltage at 2.5V (which is a proportion of the output voltage). Compensation components have been omitted for brevity." %}}

Flyback converters are used extensively in [Power over Ethernet (PoE) applications](/electronics/communication-protocols/ethernet-protocol/#_power_over_ethernet_poe).

### Controllers

* LM3481

## Flybuck Converters

TODO: Add info here.

## Forward Converters

TODO: Add info here.

## References

[^bib-ti-feedback-loop-design-considerations]: Lee, S.W. (2020, May). _Practical Feedback Loop Design Considerations for Flyback Converter Using UCC28740_. Texas Instruments. Retrieved 2021-08-27, from https://www.ti.com/lit/an/sluaa66/sluaa66.pdf.
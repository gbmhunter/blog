---
authors: [ "Geoffrey Hunter" ]
date: 2012-10-25
draft: false
lastmood: 2023-06-08
tags: [ "relay", "relays", "solid state", "single-pole", "double-pole", "single-throw", "double-throw", "inductive kickback" ]
title: "Relays"
type: "page"
---

## Overview

Relays are traditionally electro-mechanical devices used for switching electronic circuits. There now exists "sold-state relays", which are purely electronic and contain no moving parts.

Uses:

* Turing on mains voltage devices from 5-12V circuits, while providing isolation
* Switching large currents

Relays with built in timers.

## Terminology/Parameters

* The Coil: The windings which turn the relay on when you apply a voltage
* The Contacts: The output pins when get connected or disconnected when the relay turns on
* Rated Coil Voltage: The recommended voltage that should be applied to the coil to turn the relay on.
* Rated Coil Current: The current the relay coil will draw when the rated coil voltage is applied to it.
* Contact Current Rating: The maximum current that the relay can conduct through the contacts

{{% figure src="relay-dec-dh1u-5vdc-tv-8.jpg" width="200px" caption="The DEC DH1U-5VDC relay that can switch 250VAC at 15A." %}}

{{% figure src="relay-tyco-t9as5d12-12-12vdc-240vac.jpg" width="350px" caption="The Tyco T9AS5D12 relay. Coil is driven with 12VDC and switches 240VAC. Notice the two different contact ratings, 10A for the N.C. (normally closed) and 20A for the N.O. (normally open)." %}}

## Solid State Relays

Solid-state relays are relay's that don't have any moving mechanical parts involved in the switching. They use semi-conductor devices to perform the switching instead.

{{% figure src="solid-state-relay-mgr-1-d4825.jpg" width="500px" caption="The MGR-1 D4825 solid state relay from Mager. The input takes 3-32VDC to switch the output 24-480VAC contacts at up to 25A." %}}

The normal way of doing this is to perform the switching with back-to-back N-channel [MOSFETs](/electronics/components/transistors/mosfets/) whose gates are activated by a isolating opto-coupler (LED and receiver).

Below is the typical schematic symbol for a solid-state relay, along with a resistor connected to the input to limit the current through the internal LED.

{{% figure src="solid-state-relay-in-schematic-with-input-resistor.png" width="600px" caption="This is the typical schematic symbol for a solid-state relay, along with a resistor connected to the input to limit the current through the internal LED." %}}

## Contact Arrangements

* **Normally open (NO):** Contacts which are open-circuit when the coil is not energized, and become short-circuit to common when the coil is energized.
* **Normally open (NO):** Contacts which are short-circuit to common when the coil is not energized, and become open-circuit when the coil is energized.

Single-pole, single-throw (1A)

Double-pole, single-throw (1C)

{{% figure src="relay-no-nc-schematic-symbol.png" width="500px" caption="Schematic symbol for a relay with a normally-open (NO), normally-closed (NC) and common contact." %}}

## Inductive Kickback and Flyback Diodes

The coil of a relay is basically an inductor. Due to the rapid `\(\frac{di}{dt}\)` when the relay is switched off, the inductive coil will generate a large negative voltage to try and keep the current flowing (remember: inductors "resist" the change in current). This is called _inductive kickback_. This voltage spike can cause havoc in neighbouring components (e.g. killing the transistor used to switch the relay on, or arcing across switch terminals) if not suppressed. A _flyback_ diode in anti-parallel across the coil of the relay will clamp the voltage spike to approx. no more than `\(-0.7V\)`.

{{% figure src="flyback-diode-relay-schematic.png" width="500px" caption="Always add a \"flyback\" diode in anti-parallel across the coil of a relay to quench voltage spikes due the rapid di/dt through the inductor when the relay is switched of. " %}}

> It is absolutely necessary to connect a diode in the circuit as a means of preventing damage from the counter emf --- Panasonic: Relay Technical Information[^bib-relay-tech-info].

However, there are some drawbacks to using basic flyback diodes. On relay switch-off, the flyback diode decays the magnetic field of the coil far more slowly than if there was no flyback diode protection present. This causes the relay to take longer for the "clapper type" relay contacts to open. When relay contacts open, small "microwelds" occurs at the contact interface. Usually, the contacts are moving apart with enough force/velocity that these welds are easily broken. However, the slower open time with a flyback diode can cause the relay to "stick" -- this is when the contacts become welded together and do not open[^bib-te-coil-suppression-relay-life][^bib-relay-tech-info].

> This diode shunt provides maximum protection to the solid state switch, but may have very adverse effects on the switching capability of the relay --- TE Connectivity (Application Note): Coil Suppression Can Reduce Relay Life[^bib-te-coil-suppression-relay-life].

The solution? Add a Zener diode in series with the general purpose diode to increase the voltage drop when the coil is turning off. This causes the magnetic field to collapse faster (closer to an open-circuit), but still provides circuit protection. Choose a Zener voltage so that the Zener voltage plus forward diode drop does not exceed the maximum voltage of the switching element (or other circuitry).

{{% figure src="flyback-zener-relay-schematic.png" width="500px" caption="Adding a Zener in series with a general purpose diode as shown will improve the turn-off time and help prevent sticking, yet still provides over-voltage protection. " %}}

## Latching

With a little external componentry, a mechanical relay can be made to latch-on after triggered, and will only reset once a reset button has been pushed (or power disconnected).

{{% figure src="latching-relay-circuit.png" width="400px" caption="A simple latching relay circuit. The RESET push button can be replaced with short if you only need the circuit to reset on power off." %}}

## Common Relay Packages

Most PCB-mount relays have an asymmetric lead configuration so that it cannot be installed incorrectly.

You can get DIN mounted relay "sockets" for mounting relays onto DIN rail, as shown below:

{{% figure src="relay-in-din-socket.jpg" width="500px" caption="An Omron relay on a DIN mounted relay \"socket\"." %}}

## Supplier Links

* DigiKey: http://www.digikey.com/product-search/en/relays
* TE: http://www.te.com/catalog/relays/menu/en/16453

## References

[^bib-te-coil-suppression-relay-life]:  TE Connectivity. _Application Note: Coil Suppression Can Reduce Relay Life_. Retrieved 2021-12-29, from https://www.te.com/commerce/DocumentDelivery/DDEController?Action=srchrtrv&DocNm=13C3264_AppNote&DocType=CS&DocLang=EN.
[^bib-relay-tech-info]:  Panasonic. _Relay Technical Information_. Retrieved 2021-12-29, from https://www.panasonic-electric-works.com/pew/eu/downloads/technical_information_relay_en.pdf.

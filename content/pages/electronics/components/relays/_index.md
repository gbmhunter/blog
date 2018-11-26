---
author: gbmhunter
date: 2012-10-25 20:48:03+00:00
draft: false
title: Relays
type: page
url: /electronics/components/relays
---

# Overview


Relays are traditionally electro-mechanical devices used for switching electronic circuits. There now exists "sold-state relays", which are purely electronic and contain no moving parts.

Uses:



	  * Turing on mains voltage devices from 5-12V circuits, while providing isolation
	  * Switching large currents

Relays with built in timers.


# Terminology/Parameters





	  * The Coil: The windings which turn the relay on when you apply a voltage
	  * The Contacts: The output pins when get connected or disconnected when the relay turns on
	  * Rated Coil Voltage: The recommended voltage that should be applied to the coil to turn the relay on.
	  * Rated Coil Current: The current the relay coil will draw when the rated coil voltage is applied to it.
	  * Contact Current Rating: The maximum current that the relay can conduct through the contacts



# Mechanical


Coming soon...


# Solid State


Solid-state relays are relay's that don't have any moving mechanical parts involved in the switching. They use semi-conductor devices to perform the switching instead.

The normal way of doing this is to perform the switching with back-to-back N-channel [MOSFETs](http://blog.mbedded.ninja/electronics/components/mosfets) whose gates are activated by a isolating opto-coupler (LED and receiver).

Below is the typical schematic symbol for a solid-state relay, along with a resistor connected to the input to limit the current through the internal LED.

{{< figure src="/images/electronics-components/solid-state-relay-in-schematic-with-input-resistor.png" caption="This is the typical schematic symbol for a solid-state relay, along with a resistor connected to the input to limit the current through the internal LED."  width="600px" >}}


# Contact Arrangements


Normally Open vs. Normally Closed

Single-pole, single-throw (1A)

Double-pole, single-throw (1C)

The following diagram shows three of the most common contact arrangements for relays.

{{< figure src="/images/electronics-misc/relay-form-a-b-c-contact-arrangement.png" caption="Three of the most common contact arrangements for relays. Image from 'http://relays.te.com/pnb.asp'."  width="500px" >}}


# Inductive Kickback


Protect with diode in anti-parallel. This diode can keep the relay turned on for longer than expected, and this turn-off time is called the relay drop-out time. This slower off-time can decrease the life of the relay due to arcing.


# Latching


With a little bit of clever (in design, not in the components themselves) external componentry, a mechanical relay can be made to latch-on, and will only reset once the load has been disconnected.


# Common Relay Packages


Most PCB-mount relays have an asymmetric lead configuration so that it cannot be installed incorrectly.

Square


# Suppliers


The [relay category page on DigiKey](http://www.digikey.com/product-search/en/relays). [TE's relay product page](http://www.te.com/catalog/relays/menu/en/16453).

Luxcity

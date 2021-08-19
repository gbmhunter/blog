---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Components" ]
date: 2020-06-22
description: "Semiconductor make-up, schematic symbol, commutation and more info about silicon controlled rectifiers (SCRs)."
draft: false
lastmod: 2020-07-03
tags: [ "electronics", "components", "silicon controlled rectifiers", "SCRs", "semiconductor", "schematic symbol", "transistor", "rectifier", "diode", "coil gun", "rail gun", "IGBT", "commutation", "natural commutation", "source commutation", "line commutation", "class F commutation", "latch-up" ]
title: "Silicon Controlled Rectifiers (SCRs)"
type: "page"
---

## Overview

A silicon controlled rectifier, or _SCR_, is an electrical semiconductor which is part of the thyristor family. A SCR is made up of 4 alternating layers of P-type and N-type semiconductor.

{{% figure src="scr-pn-junction-diagram.svg" width="400px" caption="The construction of a SCR showing the P and N semiconductor regions." %}}

It is argued whether an SCR and thyristor are identical or represent two different devices. Those who believe they are two different devices argue that SCRs are thyristors which have a least four layers of alternating p and n-type silicon[^wikipedia-scrs]. This site always refers to a _four-layer thyristor_ when talking about SCRs. Other parts that are part of the thyristor family that are NOT SCRs include:

* Gate turn-off thyristor (GTO)
* Insulated-gate Bipolar Transistor (IGBT)

An SCR can be turned on electrically via the _gate_, just like a normal transistor, **but cannot be turned off as easily**. Once turned on, the SCR _latches_ on, even if the gate voltage is removed. It only turns off when the current through the SCR drops below the _holding current_, **and** then a sufficient reverse voltage is applied to a fixed length of time[^electronics-hub-scr-turn-off-methods]. The process of turning a SCR off is called _commutation_.

{{% img src="two-scrs-on-heatsinks.jpg" width="600px" caption="Two high-power SCRs in TO-93 packages that are mounted to heatsinks (the International Rectifier 151RB60 and an unknown SCR)." %}}

## Schematic Symbol

The schematic symbol for an SCR is shown below:

{{% figure src="scr-schematic-symbol.svg" width="400px" caption="The schematic symbol for a silicon controlled rectifier (SCR)." %}}

## Commutation

**Commutation is the process of the SCR turning itself off**. To turn a SCR off, you must do the following:

1. Reduce the forward current to below it's holding current.
2. Apply a sufficient reverse voltage for a fixed amount of time.

It's important to understand that just reducing the SCR's current to below the holding current is not sufficient. This is because charge carriers (holes and electrons) still exist in the P and N substrates. If, after reducing the current to below the holding current, a positive forward voltage is immediately re-applied to the SCR, it will begin to conduct again.

This is why a reverse voltage has to be applied for at least the minimum _off time_. This reverse voltage removes the charge carries and puts the SCR back into it's off state.

There are different ways to achieve commutation which are described below.

### Natural Commutation

_Natural commutation_ occurs when an SCR is connected to an AC voltage source (such as 110/240VAC). Because AC contains alternating voltages and currents, the SCR will turn off by itself at the end of the positive half-cycle of the AC waveform.

Natural commutation is also called _source commutation_, _line commutation_, or _class F commutation_.

### Class A Commutation

Class A commutation involves using an under-damped RLC circuit as the load. Because of the oscillatory nature of the under-damped RLC circuit, the voltage across the SCR can be forced negative, turning the SCR off. Class A commutation is a form of _forced commutation_.

### Class B Commutation

Class B commutation is when a series LC circuit is connected across the SCR. Class B commutation is a form of _forced commutation_.

### Class C Commutation

Class C commutation is when a second SCR is connected in parallel with primary SCR which is switching the load. Class C commutation is also known as _complementary commutation_. Class C commutation is a form of _forced commutation_.

## Latch-up

Parasitic SCRs are formed during the manufacturing of CMOS logic devices (e.g. a CMOS totem-pole output driver circuit) on the silicon substrate. These parasitic SCRs can cause the dangerous phenomenon known as _latch-up_, which can destroy ICs and circuits. Read more about it on the {{% link text="Logic Families page" src="/electronics/circuit-design/logic-families" %}}.

## Applications

SCRs are typically used in applications that require the switching of high voltages and/or currents.

{{% img src="m54123l-circuit-breaker-typical-application-with-scr.png" width="600px" caption="Typical application diagram for the M54123L circuit breaker IC, showing the use of an external SCR." %}}

They are used in coil-gun/rail-gun designs to connect the charged capacitor bank into the coil or rail, dumping the energy into the gun and firing the device. The typical high voltage and pulse current ratings of SCRs makes them a good choice for this. The main disadvantage of using an SCR over an IGBT for this purpose is that you cannot turn them off. This is not so important in a rail-gun, but in a coil-gun design you may want to disconnect the capacitor bank once the projectile reaches the center of the coil, to prevent pull-back.

## References

[^wikipedia-scrs]: <https://en.wikipedia.org/wiki/Silicon_controlled_rectifier>
[^electronics-hub-scr-turn-off-methods]: <https://www.electronicshub.org/scr-turn-off-methods/>
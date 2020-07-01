---
author: "gbmhunter"
categories: [ "Electronics", "Components" ]
date: 2020-06-22
description: "Semiconductor make-up, schematic symbol and more info about silicon controlled rectifiers (SCRs)."
draft: false
lastmod: 2020-07-01
tags: [ "electronics", "components", "silicon controlled rectifiers", "SCRs", "semiconductor", "schematic symbol", "transistor", "rectifier", "diode", "coil gun", "rail gun", "IGBT" ]
title: "Silicon Controlled Rectifiers (SCRs)"
type: "page"
---

## Overview

A silicon controlled rectifier, or _SCR_, is a form of thyristor, which is it's self a form of transistor. It is argued whether an SCR and thyristor are identical or represent two different devices. Those who believe they are two different devices argue that SCRs are thyristors which have a least four layers of alternating p and n-type silicon[^wikipedia-scrs].

A SCR is made up of 4 alternating layers of P-type and N-type semiconductor.

{{% figure src="scr-pn-junction-diagram.svg" width="400px" caption="The construction of a SCR showing the P and N semiconductor regions." %}}

An SCR can be turned on electrically via the _gate_, just like a normal transistor, **but cannot be turned off as easily**. Once turned on, the SCR _latches_ on, even if the gate voltage is removed. It only turns off when the current through the SCR drops below the _holding current_, **and** then a sufficient reverse voltage is applied[^electronics-hub-scr-turn-off-methods]. 

## Schematic Symbol

The schematic symbol for an SCR is shown below:

{{% figure src="scr-schematic-symbol.svg" width="400px" caption="The schematic symbol for a silicon controlled rectifier (SCR)." %}}

## Applications

SCRs are typically used in applications that require the switching of high voltages and/or currents.

{{% img src="m54123l-circuit-breaker-typical-application-with-scr.png" width="600px" caption="Typical application diagram for the M54123L circuit breaker IC, showing the use of an external SCR." %}}

They are used in coil-gun/rail-gun designs to connect the charged capacitor bank into the coil or rail, dumping the energy into the gun and firing the device. The typical high voltage and pulse current ratings of SCRs makes them a good choice for this. The main disadvantage of using an SCR over an IGBT for this purpose is that you cannot turn them off. This is not so important in a rail-gun, but in a coil-gun design you may want to disconnect the capacitor bank once the projectile reaches the center of the coil, to prevent pull-back.  

## References

[^wikipedia-scrs]: <https://en.wikipedia.org/wiki/Silicon_controlled_rectifier>
[^electronics-hub-scr-turn-off-methods]: <https://www.electronicshub.org/scr-turn-off-methods/>
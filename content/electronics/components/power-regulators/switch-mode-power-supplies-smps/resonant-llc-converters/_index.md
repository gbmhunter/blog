---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Electronic Components, Power Regulators ]
date: 2023-06-27
description: Control methods, component selection, equations, operation modes, schematics, examples and more info on resonant LLC converters.
draft: false
images: [  ]
lastmod: 2023-06-27
tags: [ electronics, components, power regulators, SMPS, resonant LLC converters, inductors, capacitors, transformers ]
title: Resonant LLC Converters
type: page
---

{{% warning-is-notes %}}

## Overview

_Resonant LLC converters_ are a topology of switch-mode power supply (SMPS) that use two inductors (LL) and one capacitor in a resonant circuit (along with switches, transformers, a controller and more) to transform voltage and current. Compared to other SMPS topologies, they offer high efficiency (93-95% is common) due to ZCS (zero current switching) and ZVS (zero voltage switching) capabilities which reduce the switching losses.

Leakage inductance from the transformer is used as one of the L's in the resonant tank[^infineon-half-bridge-and-llc-controller].

## References

[^infineon-half-bridge-and-llc-controller]: Infineon. _Half-bridge and LLC controller_ [Product Page]. Retrieved 2023-06-27, from https://www.infineon.com/cms/en/product/power/ac-dc-power-conversion/ac-dc-pwm-pfc-controller/llc-resonant-mode-controller/.

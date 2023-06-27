---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Electronic Components, Power Regulators ]
date: 2023-06-28
description: Info on power factor correction (PFC) modules.
draft: false
images: [  ]
lastmod: 2023-06-28
tags: [ electronics, components, power regulators, SMPS, power factor correction, PFC ]
title: Power Factor Correction Modules
type: page
---

## Overview

_Power factor correction_ (PFC) modules are SMPS which are designed to have an input power factor near unity, irrespective of what load is connected to them. This makes the PFC module look like a purely resistive load to the AC input, which helps devices meet power factor regulations such as the European IEC 1000-3-2[^eeweb-power-factor-correction-modules].

Many PFC modules utilize the boost topology and accept a AC input from 90-264VAC(rms). This results in a peak voltage of `\(264V \times \sqrt{2} = 373V\)` fed into the input of the boost converter. `\(380V\)` DC is commonly chosen output voltage such that it is always operating in boost mode.

{{% aside type="note" %}}
The 264VAC comes from most countries at most having a 240VAC (nominal) single phase voltage specification. Then 10% variation is added as typically allowed in grid specifications, i.e. `\(240V \times 1.1 = 264V\)`[^stack-exchange-where-does-264vac-come-from].
{{% /aside %}}


## References

[^eeweb-power-factor-correction-modules]: EEWeb (2013, Dec 29). _Power Factor Correction (PFC) Modules_ [Web Page]. Retrieved 2023-06-28, from https://www.eeweb.com/power-factor-correction-pfc-modules/.
[^stack-exchange-where-does-264vac-come-from]: helloworld922 (2014, Jul 4). _Where does 264Vac come from?_ [Forum Post]. Stack Exchange - Electronics. Retrieved 2023-06-28, from https://electronics.stackexchange.com/questions/117729/where-does-264vac-come-from. 

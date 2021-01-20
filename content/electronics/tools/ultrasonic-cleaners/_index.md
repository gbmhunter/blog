---
author: "gbmhunter"
categories: [ "Electronics", "Tools" ]
date: 2020-10-27
description: "Uses, brands, specifications, and more info about ultrasonic cleaners."
draft: false
lastmod: 2021-01-18
tags: [ "electronics", "tools", "ultrasonic cleaners", "cleaners", "PCB", "sound" ]
title: "Ultrasonic Cleaners"
type: "page"
---

{{% warning-is-notes %}}

Fill up with mixture of water and detergent. Standard kitchen detergent will do. Expensive cleaning solutions aimed at the professional electronics market. Do they perform any better?

GT Sonic Ultrasonic Cleaner 6L: Large enough for most PCBs.

Synergy Electronics Ltd, NZ supplier of the GT Sonic range.

## Components That Don't Like Ultrasonic Baths

* MEMS Oscillators: {{% link text="Ultrasonic cleaners can cause permanent damage or long-term reliability issues to the MEMS resonator" src="/electronics/components/oscillators#mems-oscillators" %}} inside a MEMS oscillator.
* Crystal Resonators (XTALs): The ultrasonic bath could excite a XTAL into a resonant frequency (or harmonic) that causes damage. 32.678kHZ crystals are especially sensitive since they operate at about the same frequency as an ultrasonic bath uses for it's cleaning action. MHz XTALs are far less sensitive.
---
author: gbmhunter
date: 2013-03-20
draft: false
title: Family Comparison
type: page
---

So you've decided on using a PSoC microcontroller, but what from what family? They all have their advantages/disadvantages...

## PSoC 1

* PSoC 1 is the oldest PSoC device
* The cheapest PSoC family!
* They also come in really small packages, a useful thing when needing something for a small project, and this is something the other PSoC families do not offer.

## PSoC 3

* In general, the chips are much cheaper than the PSoC 5 (US$2-10 compared to US$8-20, as of 2012)
* Uses the cheap but not so fast 8051 core.
* Higher accuracy IMO (±2% compared to ±5%, both at 3MHz)
* Some PSoC's with 32kB or more of flash support USB
* Maximum of 64kB flash
* More production ready than PSoC 5 (overall, there are less bugs)
* More sleep functionality than PSoC 5 (sleep current is lower, wake-up times are faster, and wakeup sources are greater)

## PSoC 4

* PSoC 4 is the newest family in the PSoC range.
* Uses the low-power ARM Cortex-M0 core (slightly less feature-packed version of the Cortex-M3).
* In terms of price/features, it is higher than PSoC 3 but lower than PSoC 5/5LP.

## PSoC 5

* Faster maximum clock speed (67MHz vs. 50MHz)
* Uses the very popular [ARM Cortex-M3 core](/programming/cpu-architectures/arm-cortex-m3).
* Better compiler (IMO, GCC is much better than Keil)
* More flash and ROM
* More UDB (Universal Digital Blocks)
* More features (a big one being the Sigma-Delta ADC)
* Maximum of 256kB flash

## PSoC 5LP

* Same maximum clock speed as PSoC 5 (67MHz). It was initially spec'd at 80MHz but was revised to 67MHz when the 5LP family was released.
* The LP family fixed most of the known silicone errors with the original PSoC 5. Designed to eventually replace the PSoC 5.
* Much lower sleep power usage, and added sleep functionality (the LP stands for "low power")
* Like the PSoC 5, uses the [ARM Cortex-M3 core](/programming/cpu-architectures/arm-cortex-m3).
* You can get the PSoC 5LP micro in space saving [0.40mm pitch QFN packages](/pcb-design/component-packages/qfn-component-package/).
---
author: gbmhunter
date: 2011-09-03 02:06:28+00:00
draft: false
title: Active Filters
type: page
url: /electronics/circuit-design/filtering/active-filters
---

# Overview

Active filters are electronic waveform filters which require their own power source (such as any filter powered with an [op-amp](http://blog.mbedded.ninja/electronics/components/op-amps)), as opposed to passive filters (such as RC filters) which do not require an external power source. Active filters allow higher roll-of and better transfer characteristics than passive filters, but require more componentry and consume power.

# Types of Filters

* Butterworth (designed to give a flat gain response through the pass-band, at the expense of having a low transisiton between the pass and stop-band)
* Tschebyscheff (designed to have the steepest transisition between the pass ad stop-band, at the expense of gain ripple through the pass-band)
* Bessel

# Filter Design

## Gain

Active filters can have gain. However, introducing gain introduces other issues, and the usual practise is to make any active filter have unity ggain (a gain of one). Then what is the advantage of an active filter over a passive you may ask? A passive filter always has a gain of less than 1, which results it the output being attenuated to some degree. The gain of a passive filter also depends on the load, while an ideal active filter keeps the gain stable.

## Design Tools

**OKAWA Filter Design and Analysis** ([http://sim.okawa-denshi.jp/en/Fkeisan.htm](http://sim.okawa-denshi.jp/en/Fkeisan.htm)) - Recommended Awesome site with web-based calculators and design tools for active and passive filters. Very detailed site with many configuration options and the site even outputs graphs of your desinged filter repsonse.

**PSoC Microcontrollers And The PSoC Creator IDE** The PSoC microcontroller features an in-built and versatile digital filter block, and the IDE has a graphically-edited method of configuring the DFB to do exactly what you want. The IDE even shows you graphs of the expected response (magnitude, phase, step plots e.t.c).

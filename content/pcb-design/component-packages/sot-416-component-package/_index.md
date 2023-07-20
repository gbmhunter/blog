---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, PCB Design, Component Packages ]
date: 2015-04-07
draft: false
lastmod: 2023-07-19
tags: [ component packages, PCB design, SOT-416 ]
title: SOT-416 Component Package
type: page
---

## Overview

_SOT-416_ is the JEDEC name for a family of 3-lead SMD component packages that comes in 2 variants. It is only used by Rohm Semiconductor. It is very similar to the SOT-490 package which is used by many manufacturers. The JEITA name `SC-89` can refer to either the `SOT-416` or `SOT-490`.

## SOT-416

`SOT-416` is the default variant with bent legs, rather than the flat legs of the `SOT-416FL`.

### Synonyms

* `EMT3`: Rohm's name[^rohm-dtc143z-transistor-ds].

## SOT-416FL

### Synonyms

* `EMD3F`: ROhm's name[^rohm-rb715wm-schottky-barrier-diode-ds].
* `EMT3F`: Another name from ROhm[^rohm-dtc143z-transistor-ds]. Not sure why there are two!
* `SC-89`: JEITA name[^rohm-rb715wm-schottky-barrier-diode-ds], although this name is also used for the [SOT-490](/pcb-design/component-packages/sot-490-component-package/).
* `SOT-416FL`: JEDEC name[^rohm-rb715wm-schottky-barrier-diode-ds].

### Dimensions

{{% ref "fig-sot-416fl-dimensions-rohm" %}} shows the dimensions of the `SOT-416FL` component package.

{{% figure ref="fig-sot-416fl-dimensions-rohm" src="sot-416fl-dimensions-rohm.png" width="600px" caption="Dimensions of the SOT-416FL package from Rohm Semiconductor[^rohm-rb715wm-schottky-barrier-diode-ds]." %}}

### Recommended Land Pattern

{{% ref "fig-sot-416fl-recommended-land-pattern-rohm" %}} shows the recommended land pattern from Rohm Semiconductor for their `SOT-416FL` package.

{{% figure ref="fig-sot-416fl-recommended-land-pattern-rohm" src="sot-416fl-recommended-land-pattern-rohm.png" width="400px" caption="The recommended land pattern from Rohm for the SOT-416FL package[^rohm-rb715wm-schottky-barrier-diode-ds]." %}}

### Used For

* Low-power BJTs
* Low-power MOSFETs

### Similar To

* [SOT-490](/pcb-design/component-packages/sot-490-component-package/)

## References

[^rohm-rb715wm-schottky-barrier-diode-ds]: Rohm Semiconductor (2016, Jul). _RB715WM: Schottky Barrier Diode_ [Datasheet]. Retrieved 2023-07-21, from https://fscdn.rohm.com/en/products/databook/datasheet/discrete/diode/schottky_barrier/rb715wm-e.pdf.
[^rohm-dtc143z-transistor-ds]: Rohm Semiconductor (2017, Nov). _DTC143Z - NPN 100mA 50V Digital Transistor_ [Datasheet]. Retrieved 2023-07-21, from https://docs.rs-online.com/a6bb/0900766b8161b9fe.pdf. 

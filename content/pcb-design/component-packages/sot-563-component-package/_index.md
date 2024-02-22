---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, PCB Design, Component Packages ]
date: 2015-04-06
draft: false
lastmod: 2023-07-21
tags: [ component packages, PCB design, SOT-563, SC-89-6, small-outline, transistor ]
title: SOT-563 Component Package
type: page
---

## Overview

`SOT-563` (Small Outline Transistor 563) is the JEDEC name for a 6-lead SMD component package. It is very small, and has a 68% smaller footprint than the popular [SOT-23](/pcb-design/component-packages/sot-23-component-package/) package family.

{{% ref "fig-sot-563-component-package-3d-render" %}} is a 3D render of the `SOT-563` package.

{{% figure ref="fig-sot-563-component-package-3d-render" src="sot-563-component-package-3d-render.jpg" width="350px" caption="A 3D render of the SOT-563 component package."  %}}

## Synonyms

* `DRL|6`, or `DRL0006A`: Texas Instrument's package code[^ti-sn74lvc1g97-configurable-gate-ds].
* `SC-89-6`: JEITA package code.

## Dimensions

The body is 1.6mm long (sides with the leads) and 1.2mm wide. The width including the leads is 1.6mm. It has a pitch of 0.5mm. {{% ref "fig-sot-563-component-package-dimensions-ti-drl-r-pdso-n6" %}} shows the dimensions for the `SOT-563` component package as defined by Texas Instruments.

{{% figure ref="fig-sot-563-component-package-dimensions-ti-drl-r-pdso-n6" src="sot-563-component-package-dimensions-ti-drl-r-pdso-n6.png" width="556px" caption="Dimensions of the SOT-563 component package. Image from http://www.ti.com/."  %}}

## Recommended Footprint

{{% ref "fig-sot-563-component-package-recommended-pcb-footprint-ti-drl-r-pdso-n6" %}} shows the recommended footprint for the `SOT-563` component package from Texas Instruments. It is 1.30mm long (sides with the leads) and 1.80mm wide, giving a PCB land area of \(2.34mm^2\).

{{% figure ref="fig-sot-563-component-package-recommended-pcb-footprint-ti-drl-r-pdso-n6" src="sot-563-component-package-recommended-pcb-footprint-ti-drl-r-pdso-n6.png" width="800px" caption="A recommended PCB footprint for the SOT-563 (TI DRL) component package. Image from http://www.ti.com/."  %}}

## References

[^ti-sn74lvc1g97-configurable-gate-ds]: Texas Instruments (2017, Jan). _SN74LVC1G97 - Configurable Multiple-Function Gate_ [Datasheet]. Retrieved 2023-07-21, https://www.ti.com/lit/ds/symlink/sn74lvc1g97.pdf.

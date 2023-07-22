---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, PCB Design, Component Packages ]
date: 2015-04-06
description: Variants, pin counts, pitches, solderability, thermal resistances, dimensions, land patterns, 3D models and more info for the SOT-23 component package.
draft: false
lastmod: 2020-01-15
tags: [ component packages, PCB design, RJ-3, RJ-5, RJ-6, RJ-8, SOT-23, SOT-23-3, SOT-23-5, SOT-23-6, SOT-23-6, Micro3, SC-59, SC-59A, SOT-346, SSOT3, SOT-753, SOT-457, SC-74A, TO-236AA, TO-236AB, JEDEC, JEITA, EIAJ, SMT3, SOT-26, SM8, Analog Devices ]
title: SOT-23 Component Package
type: page
---

## Overview

`SOT-23` (_Small Outline Transistor 23_) is the JEDEC code for a family of very popular medium-sized SMD packages with 3 to 8 gull-wing leads.

When surface mount components were just beginning to gain popularity, `SOT-23` was introduced to replace the well used through-hole 3-pin [TO-18](/pcb-design/component-packages/to-18-component-package/) and [TO-92](/pcb-design/component-packages/to-92-component-package/) transistor packages, and so the first variant of `SOT-23` was the 3 leaded version (`SOT-23-3`, officially called `TO-236AA` by JEDEC)[^mad-pcb-sot-23].

The SOT-23 family probably has the largest number of differing variant names which all refer to the same packages (see the synonym section above).

The number of pins used not only depends on the required number of connections but also the desired thermal resistance (high-current `SOT-23` devices may use more than one pin for the same net to improve thermal performance). SparkFun makes a [SOT-23 to DIP breakout board](http://www.sparkfun.com/products/717).

The 3, 5, and 6 pin `SOT-23` variants have the same pitch of 0.95mm, and all are compatible with the 6 pin footprint (which means you can use a `SOT-23-6` adapter board for the 3 and 5 pin variants also). `SOT-23-8` has a smaller pitch to fit all the leads on the package.

JEDEC formalized the dimensions of the `SOT-23` package (and all it's variants) in the MO-178 document (with package designator `R-PDSO-G`). After registering, you can download this document for free from (https://www.jedec.org/standards-documents/docs/mo-178-c)[https://www.jedec.org/standards-documents/docs/mo-178-c].

The [SOT-23F package](../sot-23f-component-package/) is closely related to the `SOT-23` put has flat leads instead of gull-wing leads.

The body of all `SOT-23-x` packages is 1.30x2.92mm. The component area taking into account the leads is 7.98mm² (2.9x2.75mm). The standard land area is 11.22mm² (3.3x3.4mm).

Easy to hand-solder if you have had a bit of practise with surface mount devices before. Easy to solder with infrared or reflow techniques.

`R-PDSO-G` is the JEDEC package designator for SOT-23 in all it's variants[^jedec-mo-178-c].

## SOT-23-3

`SOT-23-3` is the most common package in the `SOT-23` family, and is sometimes just referred to as `SOT-23`. {{% ref "fig-sot-23-3-3d-render-nisshinbo" %}} shows a 3D render of the SOT-23-3 package by Nisshinbo.

{{% figure ref="fig-sot-23-3-3d-render-nisshinbo" src="sot-23-3-3d-render-nisshinbo.png" width="300px" caption="A 3D render of the SOT-23-3 component package by Nisshinbo[^nisshinbo-sot-23-3]." %}}

### Synonyms

* `2-3AB1A`: Toshiba package code[^toshiba-sot-23].
* `Micro3`: Infineon, International Rectifier
* `MPAK`: NXP Semiconductors
* `RT-3`: Analog Devices package code[^analog-devices-sot-23-3-rt-3-package-info].
* `S3`: Analog Devices package code, seems like it a legacy code from when Linear Technology existed[^analog-devices-s3-package]
* `SC-59`: JEITA EIAJ code
* `SC-59A`: JEITA EIAJ code (more specific)
* `SMT3`: NXP Semiconductors, Rohm Semiconductor
* `SOT-23`: Informal JEDEC name. If no additional number is provided, assume `SOT-23` has 3 pins
* `SOT-23-3`: Informal JEDEC name.
* `SOT-346`:
* `SSOT3`: Fairchild Semiconductor
* `TO-236AA`: Formal JEDEC code (see note below)
* `TO-236AB`: Formal JEDEC code (see note below)[^toshiba-sot-23]

Both `TO-236AA` and `TO-236AB` are official JEDEC names for the `SOT-23-3` package. An image comment on Wikipedia[^wikipedia-inductiveload] states that the `TO-236AB` package is approximately 0.1mm higher. However it is hard to verify this claim by comparing manufacturer package dimensions, as 0.1mm is well with the manufacturing tolerances.

### Dimensions

{{% ref "fig-package-dimensions-sot23-3" %}} shows the dimensions of the `SOT-23-3` package.

{{% figure ref="fig-package-dimensions-sot23-3" src="package-dimensions-sot23-3.gif" caption="The dimensions of the SOT-23-3 component package."  width="500px" %}}

### Recommended Land Pattern

{{% ref "fig-sot-23-3-recommend-land-pattern-nxp" %}} shows the recommended land pattern by NXP for the `SOT-23-3` package.

{{% figure ref="fig-sot-23-3-recommend-land-pattern-nxp" src="sot-23-3-recommend-land-pattern-nxp.png" width="600px" caption="The recommended land pattern for the SOT-23-3 package by NXP[^nxp-sot-23-package-info]." %}}

### Common Uses

Because of the 3 leads, `SOT-23-3` is used for a large number of low-power 2-3 lead devices such as linear regulators, BJTs, MOSFETs and diodes (sometimes with two diodes, sharing either a common anode or cathode). 

* Linear regulators
* BJTs
* MOSFETs
* Diodes (including diode arrays)

## SOT-23-5

{{% ref "fig-sot-23-5-3d-render-direnc" %}} shows a 3D render of the `SOT-23-5` package from Direnc.

{{% figure ref="fig-sot-23-5-3d-render-direnc" src="sot-23-5-3d-render-direnc.png" width="300px" caption="A 3D render of the SOT-23-5 package from Direnc[^direnc-tps70950dbvr]." %}}

### Synonyms

* `RJ-5`: Analog Devices
* `SC-74A`: JEITA
* `SOT-753`
* `SOT-25`: TopLine

### Dimensions

{{% ref "fig-sot-23-5-dimensions-bourns" %}} shows the dimensions of the `SOT-23-5` package from Bourns.

{{% figure ref="fig-sot-23-5-dimensions-bourns" src="sot-23-5-dimensions-bourns.png" width="700px" caption="The dimensions of the SOT-23-5 package from Bourns[^bourns-sot23-5-package-info]." %}}

### Recommended Land Pattern

{{% ref "fig-sot-23-5-recommended-land-pattern-bourns" %}} shows a recommended land pattern from Bourns for the `SOT-23-5` package.

{{% figure ref="fig-sot-23-5-recommended-land-pattern-bourns" src="sot-23-5-recommended-land-pattern-bourns.png" width="600px" caption="A recommended land pattern from Bourns for the SOT-23-5 package." %}}

### Common Uses

* Op-amps
* Linear voltage regulators

## SOT-23-6

{{% ref "fig-component-package-sot-23-6-sc-74a-sot-457-3d-render" %}} shows a 3D render of the `SOT-23-6` component package.

{{% figure ref="fig-component-package-sot-23-6-sc-74a-sot-457-3d-render" src="component-package-sot-23-6-sc-74a-sot-457-3d-render.jpg" width="200px" caption="A 3D render of the SOT-23-6 (SOT-457) component package."  %}}

### Synonyms

* `RJ-6`: Analog Devices
* `SC-74`: JEITA
* `SMT6`: Rohm Semiconductor
* `SOT-26`: SOT-23-6 by TopLine
* `SOT-457`: JEDEC

### Non-standard Pin Numbering

{{% aside type="warning" %}}
The `SOT-23-6` package by Rohm (a.k.a `IMT4`, `SOT-457`, `SMT6`) has non-standard, clockwise pin numbering starting at the top right pin.
{{% /aside %}}

{{% figure src="rohm-sot-457-imt4-sot-23-6-component-package-non-standard-clockwise-pin-numbering-annotated.png" width="645px" caption="The Rohm SOT-23-6 component package (a.k.a. SOT-457, IMT4) with non-standard pin numbering."  %}}

### Dimensions

The `SOT-23-6` has a pitch of 0.95mm. 

## SOT-23-8

### Synonyms

* `RJ-8`: Analog Devices
* `SM8`: Diodes Incorporated
* `SOT-28`: TopLine

### Dimensions

The SOT-23-8 has a different pitch to the other packages in the family of 0.65mm, so it can fit 4 leads on each side.

{{% figure src="sot-23-8-component-package-dimensions-diodes-incorporated.png" width="800px" caption="Dimensions for the SOT-23-8 component package. Image from http://www.diodes.com/." %}}

### Recommended Land Pattern

{{% warning %}}
The `SOT-23-8` has a smaller pitch of 0.65mm compared to the `SOT-23-3`, `SOT-23-5`, and `SOT-23-6` which all have a pitch of 0.95mm. This is to fit the 4 pins on each side, the original `SOT-23` design (which is a synonym for `SOT-23-3`) only had room for a maximum of 3 pins per side.
{{% /warning %}}

{{% figure src="sot-23-8-component-package-recommended-footprint-diodes-incorporated.png" width="1000px" caption="A recommended footprint for the SOT-23-8 component package. Image from http://www.diodes.com/."  %}}

## References

[^jedec-mo-178-c]: [https://www.jedec.org/standards-documents/docs/mo-178-c](https://www.jedec.org/standards-documents/docs/mo-178-c)
[^wikipedia-inductiveload]: [https://commons.wikimedia.org/wiki/File:TO-236AA_Front_Top.svg](https://commons.wikimedia.org/wiki/File:TO-236AA_Front_Top.svg)
[^toshiba-sot-23]: Toshiba. _SOT23_ [Package Information]. Retrieved 2023-07-22, from https://toshiba.semicon-storage.com/ap-en/semiconductor/design-development/package/detail.SOT23.html.
[^nisshinbo-sot-23-3]: Nisshinbo Micro Devices Inc. _SOT-23-3_ [Package Information]. _Retrieved 2023-07-22, from https://www.nisshinbo-microdevices.co.jp/en/design-support/package/sot-23-3.html.
[^mad-pcb-sot-23]: MAD PCB. _SOT-23_. Retrieved 2023-07-22, from https://madpcb.com/glossary/sot-23/.
[^analog-devices-sot-23-3-rt-3-package-info]: Analog Devices. _3-Lead Small Outline Transistor Package - SOT-23-3 (RT-3)_ [Package Information]. Retrieved 2023-07-22, from https://www.analog.com/media/en/package-pcb-resources/package/pkg_pdf/sot-23-3-rt/rt_3.pdf.
[^analog-devices-s3-package]: Analog Devices. _S3 Package - 3-Lead Plastic SOT-23 (Reference LTC DWG # 05-08-1631 Rev D)_ [Package Information]. Retrieved 2023-07-22, from https://www.analog.com/media/en/package-pcb-resources/package/pkg_pdf/ltc-legacy-sot-23/sot3%2005-08-1631%20rev%20d.pdf.
[^nxp-sot-23-package-info]: NXP (2017, Jan 9). _SOT-23 - plastic, surface-mounted package; 3 terminals; 1.9 mm pitch; 2.9 mm x 1.3 mm x 1 mm body_ [Package Information]. Retrieved 2023-07-22, from https://www.nxp.com/docs/en/package-information/SOT23.pdf.
[^bourns-sot23-5-package-info]: Bourns (2008, Jun). _SOT23-5_ [Package Information]. Retrieved 2023-07-22, from https://www.bourns.com/docs/Product-Datasheets/sot23-5.pdf.
[^direnc-tps70950dbvr]: Direnc. _TPS70950DBVR - SOT23-5 5V 150m Linear Voltage Regulator_ [Product Page]. Retrieved 2023-07-22, from https://www.direnc.net/tps70950dbvr-sot23-5-5v-150m-lineer-voltaj-regulator-en.

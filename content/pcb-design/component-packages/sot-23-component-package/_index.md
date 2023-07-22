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

When surface mount components were just beginning to gain popularity, `SOT-23` was introduced to replace the well used through-hole 3-pin `TO-18` and `TO-92` transistor packages, and so the first variant of `SOT-23` was the 3 leaded version (`SOT-23-3`, officially called `TO-236AA` by JEDEC).

The SOT-23 family probably has the largest number of differing variant names which all refer to the same packages (see the synonym section above).

{{% figure src="sot-23-component-package-photo.jpg" width="200px" caption="A 3D render of the SOT-23 component package." %}}

The number of pins used not only depends on the required number of connections but also the desired thermal resistance (high-current SOT23 devices may use more than one pin for the same net to improve thermal performance). Used commonly for FETs transistors, diodes, and other components only having a small number of leads. SparkFun makes a [SOT-23 to DIP breakout board](http://www.sparkfun.com/products/717).

{{% figure src="component-package-sot-23-6-sc-74a-sot-457-3d-render.jpg" width="200px" caption="A 3D render of the SOT-23-6 (SOT-457) component package."  %}}

The 3, 5, and 6 pin `SOT-23` variants have the same pitch of 0.95mm, and all are compatible with the 6 pin footprint (which means you can use a `SOT-23-6` adapter board for the 3 and 5 pin variants also). `SOT-23-8` has a smaller pitch to fit all the leads on the package.

JEDEC formalized the dimensions of the `SOT-23` package (and all it's variants) in the MO-178 document (with package designator `R-PDSO-G`). After registering, you can download this document for free from (https://www.jedec.org/standards-documents/docs/mo-178-c)[https://www.jedec.org/standards-documents/docs/mo-178-c].

The [SOT-23F package](../sot-23f-component-package/) is closely related to the `SOT-23` put has flat leads instead of gull-wing leads.

The body of all SOT-23-x packages is 1.30x2.92mm. Component Area = 7.98mm² (2.9x2.75mm). Standard Footprint Land Area = 11.22mm² (3.3x3.4mm).

Easy to hand-solder if you have had a bit of practise with surface mount devices before. Easy to solder with infrared or reflow techniques.

`R-PDSO-G` is the JEDEC package designator for SOT-23 in all it's variants[^jedec-mo-178-c].

## SOT-23-3

`SOT-23-3` is the most common package in the `SOT-23` family, and is sometimes just referred to as `SOT-23`.

### Synonyms

* `Micro3`: Infineon, International Rectifier
* `MPAK`: NXP Semiconductors
* `RJ-3`: Analog Devices
* `SC-59`: JEITA EIAJ code
* `SC-59A`: JEITA EIAJ code (more specific)
* `SMT3`: NXP Semiconductors, Rohm Semiconductor
* `SOT-23`: If no additional number is provided, assume `SOT-23` has 3 pins
* `SOT-346`:
* `SSOT3`: Fairchild Semiconductor
* `TO-236AA`: JEDEC code (see note below)
* `TO-236AB`: JEDEC code (see note below)

Both `TO-236AA` and `TO-236AB` are official JEDEC names for the `SOT-23-3` package. An image comment on Wikipedia[^wikipedia-inductiveload] states that the `TO-236AB` package is approximately 0.1mm higher. However it is hard to verify this claim by comparing manufacturer package dimensions, as 0.1mm is well with the manufacturing tolerances.

### Dimensions

The `SOT-23-6` has a pitch of 0.95mm.

{{% figure src="package-dimensions-sot23-3.gif" caption="The dimensions of the SOT-23-3 component package."  width="500px" %}}


### Common Uses

* Linear regulators
* BJTs
* MOSFETs
* Diodes (including diode arrays)



## SOT-23-5

### Synonyms

* `RJ-5`: Analog Devices
* `SC-74A`: JEITA
* `SOT-753`
* `SOT-25`: TopLine

### Common Uses

* Op-amps

## SOT-23-6

The `SOT-23-6` has a pitch of 0.95mm. Also called _SC-74_.

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

Why you'd ever number the package in that manner is beyond me. It's dangerous, and bound to cause PCB designers to do board respins!

## SOT-23-8

### Synonyms

* `RJ-8`: Analog Devices
* `SM8`: Diodes Incorporated
* `SOT-28`: TopLine

### Dimensions

The SOT-23-8 has a different pitch to the other packages in the family of 0.65mm.

{{% figure src="sot-23-8-component-package-dimensions-diodes-incorporated.png" width="800px" caption="Dimensions for the SOT-23-8 component package. Image from http://www.diodes.com/." %}}

### Recommended Land Pattern

{{% warning %}}
The `SOT-23-8` has a smaller pitch of 0.65mm compared to the `SOT-23-3`, `SOT-23-5`, and `SOT-23-6` which all have a pitch of 0.95mm. This is to fit the 4 pins on each side, the original `SOT-23` design (which is a synonym for `SOT-23-3`) only had room for a maximum of 3 pins per side.
{{% /warning %}}

{{% figure src="sot-23-8-component-package-recommended-footprint-diodes-incorporated.png" width="1000px" caption="A recommended footprint for the SOT-23-8 component package. Image from http://www.diodes.com/."  %}}

## References

[^jedec-mo-178-c]: [https://www.jedec.org/standards-documents/docs/mo-178-c](https://www.jedec.org/standards-documents/docs/mo-178-c)
[^wikipedia-inductiveload]: [https://commons.wikimedia.org/wiki/File:TO-236AA_Front_Top.svg](https://commons.wikimedia.org/wiki/File:TO-236AA_Front_Top.svg)

---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-04-07
draft: false
lastmod: 2023-06-13
tags: [ "component packages", "PCB design", "D2PAK", "DDPAK", "SMD-220", "TO-263", "TO-263AB", "TO-279" ]
title: "TO-263 Component Package"
type: "page"
---

## Overview

The `TO-263` (Transistor Outline 263, JEDEC) is a large SMD component package. It can be considered the SMD version of the `TO-220AB` package. It is a 3, 5 or 7 leaded heavy-duty SMD package that allows for good heat-sinking due to a large pad on it's underside. It is used frequently for high power MOSFETs, LDOs and SMPS.

Synonyms:

* D2PAK (Double Decawatt package)
* DDPAK (Double Decawatt package)
* SMD-220 (named so because the TO-263 is the SMD equivalent of the TO-220).
* TO-263 (Transistor Outline 263, JEDEC)
* TO-263AB (TO-263-3S only)
* TO-279 (TO-263 THIN only, by Texas Instruments)

{{% figure src="d2pak-to-263-component-package-3d-render.jpg" width="350px" caption="A 3D render of the TO-263 (D2PAK) component package." %}}

The height of all `TO-263` variants except `TO-263 THIN` is 4.57mm. `TO-263 THIN` is 2.00mm high.

For every variant with a different number of pins, there is also an `S` variant in where the middle lead is cut off.

Solderability: Easy to solder by hand, as long as you have a decent powered soldering iron for the central thermal pad. Easy to solder with infrared and reflow techniques.

Similar To:

* [TO-220](../to-220-component-package)

## TO-263-3/TO-263-3S

The `TO-263-3` is the 3-pin variant of the `TO-263`. `TO-263-3S` is the same as `TO-263-3` except the middle lead is cut off.

Pitch: 2.54mm

The junction-to-ambient thermal resistance for the `TO-263-3` component package on both standard JEDEC 2-layer and 4-layer boards is shown below:

{{% figure src="d2pak-to-263-component-package-thermal-resistance-2-vs-4-layer-comparison.png" width="680px" caption="Junction-to-ambient thermal resistance data of the TO-263 component package on both standard JEDEC 2-layer and 4-layer PCBs. Image from www.ti.com." %}}

* `\(T_{JA} = 18.0^{\circ}{\rm C}/W\)` (1 square inch of copper surrounding pads, connected to ground)
* `\(T_{JA} = 33.6^{\circ}{\rm C}/W\)` (copper filling package land-area)
* `\(T_{JA} = 36.7^{\circ}{\rm C}/W\)` (pads only, no copper fill)

3D models:

* [TO-263-3](http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=168926)
* [TO-263-3S](http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=168921)

Common Uses:

* High power MOSFETs
* High power LDOs
* High power SMPS (usually with integrated switching element)

## TO-263-5

The `TO-263-5` is the 5-pin variant of the `TO-263`.

Thermal resistance of the TO-263-5L THIN:

`\(T_{JA} = 22.0^{\circ}{\rm C}/W\)` (no air flow, on JEDEC 4-layer test board)

3D models:

* [TO-263-5](http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=168928)
* [TO-263-5S](http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=168927)

## TO-263-7

The `TO-263-7` is the 7-pin variant of the `TO-263`.

Pitch: 1.7mm

3D models:

* [TO-263-7S](http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=167948)

## TO-263 THIN

`TO-263 THIN` is a variant of the `TO-263` component package by Texas Instruments. It shares a similar PCB footprint, but is significantly smaller in height (i.e. thinner).

{{% figure src="to-263-normal-vs-thin-component-package-comparison.pdf.png" width="450px" caption="A comparison in dimensions of the standard TO-263 component package vs. the TO-263 THIN component package. Image from www.ti.com." %}}

It still has a similar exposed pad on it's underside (making it footprint compatible with the standard `TO-263` package).

The exact dimensions of the `TO-263 THIN` package are shown below:

{{% figure src="to-263-thin-component-package-dimensions.png" width="800px" caption="The dimensions for the TO-263 THIN component package. Image built from elements taken from www.ti.com." %}}
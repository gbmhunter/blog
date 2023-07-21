---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, PCB Design, Component Packages ]
date: 2021-09-02
draft: false
lastmod: 2023-06-12
tags: [ component packages, PCB design, SC-89, SC-89-3, SOT-490 ]
title: SOT-490 Component Package
type: page
---

## Overview

The `SOT-490` (Small-outline Transistor 490) is a 3-lead SMD component package primarily used for transistors. It is very similar to the [SOT-416FL component package](/pcb-design/component-packages/sot-416-component-package/) used by Rohm Semiconductor, which also used the JEITA name `SC-89` for the `SOT-416FL`.

{{% figure src="sc-89-3-3d-model-digikey.png" width="250px" caption="3D model of the SOD-490 (SC-89-3) component package. Retrieved 2021-09-02, from https://www.digikey.co.nz/en/products/detail/onsemi/NTE4153NT1G/687079." %}}

`SOT-490` (`SC-89-3`) has the same package dimensions as the `SC-89-6`, but just with half the leads missing (similar to the `SOT-23-3` vs. `SOT-23-6`).

## Synonyms

Synonyms:

* `463C-03`: On Semiconductor's package code[^bib-on-semi-sc-89-3].
* `SC-89-3`: JEITA.
* `SOT-490`: JEDEC.

## Dimensions

Pitch: 1.00mm[^bib-on-semi-sc-89-3]

Package LxWxH: 1.60x1.60x0.58mm[^bib-on-semi-sc-89-3]

Typical PCB Land Area: 2.49mm²[^bib-on-semi-sc-89-3]

Solderability: Reflow is most suitable. Possible to hand solder/reflow as long as experienced.

{{% ref "fig-sot-490-dimensions-vishay" %}} shows the dimensions of the SOT-490 package from Vishay.

{{% figure ref="fig-sot-490-dimensions-vishay" src="sot-490-dimensions-vishay.png" width="600px" caption="Dimensions of the SOT-490 package from Vishay[^vishay-sot-490]." %}}

## Similar To

Similar To:

* [SOT-563](/pcb-design/component-packages/sot-563-component-package/) (`SC-89-6`)

3D Models:

* [3dContentCentral](https://www.3dcontentcentral.com/download-model.aspx?catalogid=171&id=363411)

## References

[^bib-on-semi-sc-89-3]:  On Semiconductor (2003, Jul 21). _Mechanical Case Outline: SC-89, 3 Lead, Case 463C-03 Issue C_. Retrieved 2021-09-02, from https://www.onsemi.com/pub/Collateral/463C-02.PDF.
[^vishay-sot-490]: Vishay (2004, Sep 6). _SOT-490_ [Package Dimensions]. Retrieved 2023-07-21, from https://www.vishay.com/docs/84035/84035.pdf. 

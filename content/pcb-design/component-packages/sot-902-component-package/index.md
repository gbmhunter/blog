---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-04-06
draft: false
lastmod: 2024-04-20
tags: [ "component packages", "PCB design", "SOT-902", "small-outline", "transistor", "XQFN8U", "XQFN8" ]
title: SOT-902 Component Package
type: page
---

## Overview

SOT-902 (Small Outline Transistor 902) is a small family of SMD component packages with 8 leads. There are three variants in this family:

* SOT-902-1 (XQFN8U)
* SOT-902-2 (XQFN8)
* SOT-902-3 (XQFN8)

NXP seems to be the only manufacturer who uses this package.

## SOT-902-1

SOT-902-1 is a variant in the SOT-902 family. SOT-901-1 has the added U on the end of it's package code (XQFN8U), whilst SOT-902-2 and SOT-902-3 are both just XQFN8. This U stands for UTLP based (whatever that means?)[^nxp-sot-902-1].

## SOT-902-2

{{% figure src="_assets/sot-902-2-3d-render-nxp.png" width="150px" float="right" caption="A 3D render of the SOT-902-2 component package from NXP[^nxp-sot-902-2]." %}}

### Synonyms

* MO-255: JEDEC package outline code[^nxp-sot-902-2].
* XQFN8: NXP's package type descriptive code[^nxp-sot-902-2]. Note that SOT-902-3 has the same code.

### Dimensions

{{% figure src="_assets/sot-902-2-package-dimensions-nxp.png" width="800px" caption="The dimensions of the SOT-902-2 component package from NXP[^nxp-sot-902-2]." %}}

### Recommended Land Pattern

{{% figure src="_assets/sot-902-2-recommended-land-pattern-nxp.png" caption="The land pattern for the SOT-902-2 component package from NXP[^nxp-sot-902-2]."  width="800px" %}}

## SOT-902-3

### Dimensions

{{% figure src="component-package-sot-902-3-nxp-xqfn8-dimensions.png" width="800px" caption="The dimensions for the SOT-902-3 component package. Image from http://www.nxp.com/documents/outline_drawing/sot902-3_po.pdf."  %}}

### Recommended Land Pattern

{{% figure src="component-package-sot-902-3-nxp-xqfn8-land-pattern.png" width="800px" caption="The land pattern for the SOT-902-3 component package. Image from http://www.nxp.com/documents/reflow_soldering/sot902-3_fr.pdf." %}}

## References

[^nxp-sot-902-2]: NXP (2017, Feb 6). _SOT902-2 - plastic, extremely thin quad flat package; 8 terminals; 0.55mm pitch; 1.6 mm x 1.6 mm x 0.5 mm body_. Retrieved 2024-04-20 from https://www.nxp.com/docs/en/package-information/SOT902-2.pdf
[^nxp-sot-902-1]: NXP (2016, Feb 8). _SOT902-1 - plastic extremely thin quad flat package; no leads; 8terminals; UTLP based; body 1.6 x 1.6 x 0.5 mm_. Retrieved 2024-04-20, from https://www.nxp.com/docs/en/package-information/SOT902-1.pdf.

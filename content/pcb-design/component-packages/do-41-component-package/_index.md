---
authors: [Geoffrey Hunter]
categories: [Electronics, PCB Design, Component Packages]
date: 2015-04-04
description: Info on the DO-41 component package, commonly used for older through-hole diodes.
draft: false
lastmod: 2024-04-08
tags: [component packages, PCB design, DO-41, DO-204, diodes, thermal resistance, 1N4001]
title: DO-41 Component Package
type: page
---

## Overview

The DO-41 (Diode Outline 41) component package is a very popular 2-lead through-hole package used for older diodes (incl. the famous 1N400x series[^vishay-1n4001-ds]). The pitch is typically 400mil, although because of the long through-hole leads, it is user variable. It is easy to solder by hand. The DO-41 package is normally used for higher power "rectifier" diodes, whilst the lower power "signal" diodes use smaller through-hole packages such as the DO-35. The typical rated current for a diode in this package is 1A.

{{% figure src="_assets/do-41-component-package-photo.jpg" width="300px" caption="A photo of the DO-41 component package." %}}

## Synonyms

* **DO-204AL**: JEDEC DO-204 Variant AL[^vishay-1n4001-ds]
* **SOD-66**: NXP[^nxp-sod66]
* **LALF**: NXP "Package Style"[^nxp-sod66]

## Thermal Resistance

Vishay gives the typical junction-to-ambient thermal resistance of a DO-41 mounted to be \(R_{\theta JA} = 50^{\circ C/W}\). This is when the DO-41 is mounted horizontally on a PCB with a 9.5mm lead length. The junction-to-lead thermal resistance is \(R_{\theta JL} = 25^{\circ C/W}\)[^vishay-1n4001-ds].

## Dimensions and Mounting

{{% figure src="_assets/do-41-package-dimensions-vishay.png" width="500px" caption="The dimensions for the DO-41 component package from Vishay[^vishay-1n4001-ds]." %}}

This package is normally mounted on the PCB in two ways, either flat with the legs bent at 90° to fit into the holes, or in space-constrained applications, vertical, with one of the legs straight and one bent 180° to fit into the holes in the PCB (which are closer together than when in the flat orientation). Material of package is normally moulded plastic.

Weight of a diode in a DO-41 package is around 0.33g[^vishay-1n4001-ds].

## Similar To

* [DO-15](/pcb-design/component-packages/do-15-component-package/)
* [DO-35](/pcb-design/component-packages/do-35-component-package/)

## References

[^nxp-sod66]: NXP (2016, Feb 8). _SOD66: Package Information_. Retrieved 2021-09-26, from https://www.nxp.com/docs/en/package-information/SOD66.pdf.
[^vishay-1n4001-ds]: Vishay (2020, Apr 29). _1N4001, 1N4002, 1N4003, 1N4004, 1N4005, 1N4006, 1N4007 - General Purpose Plastic Rectifier_ [datasheet]. Retrieved 2024-04-08, from https://www.vishay.com/docs/88503/1n4001.pdf.

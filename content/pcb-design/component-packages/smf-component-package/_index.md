---
authors: [Geoffrey Hunter]
categories: [Electronics, PCB Design, Component Packages]
date: 2024-04-17
draft: false
lastmod: 2024-04-17
tags: [component packages, PCB design, SMF, DO-219AB, diodes]
title: SMF Component Package
type: page
---

## Overview

{{% figure src="_assets/smf-package-3d-render-digikey.png" width="150px" float="right" caption="3D render of the SMF (DO-219AB) package from DigiKey[^digikey-smf24a-e3-08]." %}}

SMF (also commonly known as DO-219AB[^vishay-bzd17-zener-diodes]) is a 2-lead SMD package commonly used for diodes. Vishay seems to be the main manufacturer that uses this package.

## Synonyms

* **DO-219AB**: This is the JEDEC name for the SMF package.
* **SMF**: This is the name used by Vishay for this package.

## Dimensions

The dimensions of the SMF package from Vishay are shown below:

{{% figure src="_assets/smf-do-219ab-package-dimensions-vishay.png" width="900px" caption="SMF (DO-219AB) package dimensions from Vishay[^vishay-bzd17-zener-diodes]." %}}

The key dimensions from this diagram are (typical):

* Length: 3.7mm
* Width: 1.8mm
* Height: 1.0mm

## Recommended Land Pattern

{{% figure src="_assets/smf-do-219ab-recommended-land-pattern-vishay.png" width="600px" caption="Recommended land pattern for the SMF (DO-219AB) package from Vishay[^vishay-bzd17-zener-diodes]." %}}

The outer bounding box of both the package and the land pattern are:

* Length: \(4.2mm\)
* Width: \(1.8mm\)

This gives a land area of \(7.56mm^2\).

## Thermal Resistance

The thermal resistance of the SMF package is \(R_{\theta JA} = 180\,^{\circ}\text{C/W}\) (junction to ambient) when mounted on a standard PCB with 3x3mm copper pads than are \(\ge 40um\) thick[^vishay-bzd17-zener-diodes].

## Common Uses

* Schottky and zener diodes from Vishay.

## References

[^vishay-bzd17-zener-diodes]: Vishay (2022, Dec 15). _BZD17 Series - Zener Diodes_ [datasheet]. Retrieved 2024-04-17, from https://www.vishay.com/docs/85161/bzd17series.pdf.
[^digikey-smf24a-e3-08]: DigiKey. _SMF24A-E3-08_ [product page]. Retrieved 2024-04-17, from https://www.digikey.com/en/products/detail/vishay-general-semiconductor-diodes-division/SMF24A-E3-08/1680581.
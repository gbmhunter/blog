---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, PCB Design, Component Packages ]
date: 2023-08-29
description: Variants, pin counts, pitches, solderability, thermal resistances, dimensions, land patterns, 3D models and more info for the SOT-23 component package.
draft: false
lastmod: 2023-08-29
tags: [ component packages, PG-SCT595 ]
title: PG-SCT595 Component Package
type: page
---

## Overview

_PG-SCT595_ (_Plastic Green Semiconductor Transistor Package_) is a 5-lead gull-wing SMD component package used by Infineon. {{% ref "fig-pg-sct595-3d-render" %}} shows a 3D render of this package.

{{% figure ref="fig-pg-sct595-3d-render" src="pg-sct595-3d-render.png" width="300px" caption="A 3D render of the PG-SCT595 package[^digikey-tls105b0mbhtsa1-product-page]." %}}

The _Green_ in it's name refers to it being Pb-free and suitable for Pb-free soldering[^infineon-tls105b0mb-lin-reg-ds] (which is not special in 2023 --- most components are).

## Synonyms

* PG-SCT595-5-1: Infineon[^infineon-pg-sct595-5-1].

## Dimensions

{{% ref "fig-pg-sct595-package-dimensions" %}} shows the dimensions for the PG-SCT595 package.

{{% figure ref="fig-pg-sct595-package-dimensions" src="pg-sct595-package-dimensions.png" width="800px" caption="The dimensions for the PG-SCT595 package[^infineon-bts3800sl-gate-driver-ds]." %}}

## Recommended Land Pattern

{{% ref "fig-pg-sct595-recommended-land-pattern" %}} shows the recommended land pattern and solder paste apertures.

{{% figure ref="fig-pg-sct595-recommended-land-pattern" src="pg-sct595-recommended-land-pattern.png" width="700px" caption="The recommended land pattern and solder paste apertures for the PG-SCT595 package[^infineon-pg-sct595-5-1]." %}}

## Common Uses

* Gate driver ICs[^infineon-bts3800sl-gate-driver-ds]
* Linear regulators[^digikey-tls105b0mbhtsa1-product-page]

## References

[^infineon-bts3800sl-gate-driver-ds]: Infineon (2011, Apr 30). _BTS3800SL - Small Protected Automotive Relay Driver Single Channel, 800mR_ [Datasheet]. Retrieved 2023-08-29, from https://www.mouser.com/datasheet/2/196/Infineon_BTS3800SL_DS_v01_01_EN-3160892.pdf.
[^digikey-tls105b0mbhtsa1-product-page]: DigiKey. _TLS105B0MBHTSA1 - Linear Voltage Regulator IC Positive Adjustable 1 Output 120mA PG-SCT595-5_ [Product Page]. Retrieved 2023-08-29, from https://www.digikey.com/en/products/detail/infineon-technologies/TLS105B0MBHTSA1/8627139.
[^infineon-tls105b0mb-lin-reg-ds]: Infineon (2023, Jul 25). _TLS105B0MB - OPTIREG™ linear voltage regulator_ [Datasheet]. Retrieved 2023-08-29, from https://www.infineon.com/dgdl/Infineon-TLS105B0MB-DS-v01_00-EN.pdf?fileId=5546d46261ff5777016200cc39952f83. 
[^infineon-pg-sct595-5-1]: Infineon. _PG-SCT595-5-1_ [Package Information]. Retrieved 2023-08-29, from https://www.infineon.com/cms/en/product/packages/PG-SCT595/PG-SCT595-5-1/. 
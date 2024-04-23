---
authors: [Geoffrey Hunter]
categories: [Electronics, PCB Design, Component Packages]
date: 2015-04-06
draft: false
lastmod: 2024-04-18
tags: [component packages, PCB design, SOJ]
title: SOJ Component Package
type: page
---

## Overview

{{% figure src="_assets/soj-component-package-3d-render.jpg" width="200px" float="right" caption="A 3D render of the SOJ component package."  %}}

SOJ (Small-Outline J-leaded package) is a SMD component package with many J-type folded leads. It has the same general package dimensions as the standard SOIC but with J-type leads rather than Gull-wing leads. Just like SOIC, it is commonly used to house integrated circuits (ICs).

All variants of the SOJ package seem to have a 1.27 mm (0.05") lead pitch, except for SOJ-4. 10.16mm (0.400") is a common body width for SOJ packages. Pin counts commonly vary from 16 to 40.

As of 2024, SOJ is not a commonly used SMD package. One advantage of the SOJ package is the bending resilience of the J-type leads before it is soldered. A SOJ package could be dropped from a fair height onto a hard surface without the leads bending. Packages with gull-wing leads such as [SOIC](/pcb-design/component-packages/soic-component-package/) or [QFP](/pcb-design/component-packages/qfp-component-package/) would not fare as well.

## Synonyms

* **PBG32**: Renesas's name for the SOJ-32 package[^renesas-pbg32-soj-32].

## Photos

{{% figure src="_assets/ic-package-soj-28.jpg" width="500px" caption="Photo of a SOJ-28 package, a variant of the SOIC package with J-type leads." %}}

## Dimensions

According to EESemi[^eesemi-soj], the SOJ packages with 16 through 24 pins have a body width of 7.5mm and height of 2.9mm, while the SOJ packages with 28 through 40 pins have a body width of 10.16mm and height of 3.5mm. The lead pitch is 1.27mm.

Below are the dimensions for Infineon's SOJ-32 package[^infineon-soj-32]:

{{% figure src="_assets/soj-32-package-dimensions-infineon.png" width="700px" caption="The dimensions of Infineon's SOJ-32 component package[^infineon-soj-32]." %}}

## Recommended Land Pattern

Below is the recommended land pattern for Infineon's SOJ-32 package[^infineon-soj-32]:

{{% figure src="_assets/soj-recommended-land-pattern-infineon.png" width="700px" caption="The recommended land pattern for Infineon's SOJ-32 component package[^infineon-soj-32]." %}}

## SOJ Sockets

You can purchase sockets for SOJ ICs so that you don't have to solder them onto the PCB. Below is a photo of a 40pin SOJ socket listed on eBay:

{{% figure src="_assets/soj-40-socket-ebay.webp" width="500px" caption="A 40-pin SOJ socket from Foxconn listed on eBay by West Florida Components[^soj-40-socket-ebay]." %}}

## Similar To

* PLCC: Another package with J-type leads.
* [SOIC](/pcb-design/component-packages/soic-component-package/): Like SOJ but with Gull-wing leads. More popular than SOJ.

## References

[^renesas-pbg32-soj-32]: Renesas. _PBG32 (SOJ 32)_. Retrieved 2024-04-18, from https://www.renesas.com/us/en/package/pbg32.
[^eesemi-soj]: EESemi. _SOJ - Small Outline J-Lead Package_. Retrieved 2024-04-18, from https://eesemi.com/soj.htm.
[^infineon-soj-32]: Infineon. _PG-SOJ-32-801 | SOJ-32 (51-85033)_. Retrieved 2024-04-18, from https://www.infineon.com/cms/en/product/packages/PG-SOJ/PG-SOJ-32-801/.
[^soj-40-socket-ebay]: eBay. _40 Pin IC Sockets Surface Mount SOJ Foxconn PA1200-P2 (20 pieces)_. Retrieved 2024-04-18, from https://www.ebay.com/itm/382682187300.
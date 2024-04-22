---
authors: [Geoffrey Hunter]
categories: [Electronics, PCB Design, Component Packages]
date: 2015-04-07
draft: false
lastmod: 2024-04-22
tags: [component packages, PCB design, transistor, TO-Leadless]
title: TO-Leadless Component Package
type: page
---

## Overview

{{% figure src="_assets/to-leadless-component-package-3d-render.jpg" width="200px" float="right" caption="A 3D render of the TO-Leadless component package." %}}

TO-Leadless is a component package is solely used by Infineon for a range of it's high power MOSFETs[^infineon-to-leadless]. In this package, Infineon's MOSFETs can achieve on-resistances as low as 0.4mΩ. It's package size is 60% smaller than the D2PAK 7-pin package.

The package has 8 leads plus and exposed pad[^infineon-ipt026n10n5-mosfet-ds].

Below is a size comparison between DPAK (left) and TO-Leadless (right):

{{% figure src="_assets/to-leadless-component-package-size-comparison-with-d2pak.png" width="500px" caption="Size comparison between the TO-Leadless and DPAK component packages." %}}

## Synonyms

* PG-HSOF-8: Infineon name[^infineon-ipt026n10n5-mosfet-ds].

## Dimensions

{{% figure src="_assets/to-leadless-component-package-dimensions.png" width="800px" caption="The dimensions of the TO-Leadless component package." %}}

## Footprint

{{% figure src="_assets/to-leadless-component-package-recommended-land-pattern.png" width="800px" caption="The recommended land pattern for the TO-Leadless component package." %}}

{{% figure src="_assets/to-leadless-component-package-recommended-stencil.png" width="600px" caption="The recommended stencil pattern for the TO-Leadless component package." %}}

## Solderability

Not suitable for hand soldering due to pads underneath the package. Suitable for hot air and reflow soldering techniques

## Thermal Resistance

* \(R_{JC} = 0.4^{\circ}{\rm C}/W\)
* \(R_{JA} = 40^{\circ}{\rm C}/W\) (max)

## References

[^infineon-ipt026n10n5-mosfet-ds]: Infineon. _IPT026N10N5 - MOSFET - OptiMOS 5 Power-Transistor, 100V_ [datasheet]. Retrieved 2024-04-22, from https://www.infineon.com/dgdl/Infineon-IPT026N10N5-DS-v02_01-EN.pdf?fileId=5546d46269e1c019016ac029615332f7.
[^infineon-to-leadless]: Infineon. _TO-Leadless (TOLL) OptiMOS™ package_. Retrieved 2024-04-22, from https://www.infineon.com/cms/en/product/power/mosfet/n-channel/optimos-and-strongirfet-latest-packages/to-leadless/.

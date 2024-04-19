---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-10-06
draft: false
lastmod: 2024-04-19
tags: [ "component packages", "PCB design", "SOT-583", "small-outline", "transistor", "FCSOT" ]
title: "SOT-583 Component Package"
type: "page"
---

## Overview

{{% figure src="_assets/sot-583-component-package-3d-render-ti.png" width="200px" float="right" caption="A 3D render of the SOT-583 component package from Texas Instruments[^ti-tps628512-product-page]." %}}

SOT-583 is an 8-lead SMD component package.

## Synonyms

* FCSOT: Flipchip SOT, Texas Instruments
* SOT-583-8: Monolithic Power Systems

## Dimensions

SOT-583 has a pitch of 0.5mm. The package is 2.1mm x 1.6mm (including pins). The dimensions are shown in the image below.

{{% figure src="_assets/sot-583-component-package-dimensions-ti.png" width="500px" caption="The dimensions of the SOT-583 component package from TI. Image from https://www.ti.com/lit/ml/mpcs002/mpcs002.pdf." %}}

## Recommended Footprint

{{% figure src="_assets/sot-583-component-package-recommended-footprint.png" width="500px" caption="The recommended footprint for the SOT-583 component package by TI. Image from https://www.ti.com/lit/ml/mpcs002/mpcs002.pdf." %}}

## Solderability

Hard but not impossible to solder by hand because of the small 0.5mm pitch. Reflow soldering is recommended.

## Thermal Parameters

<table>
  <tr>
    <td>Junction-to-ambient thermal resistance</td>
    <td>\( R_{θJA} \)</td>
    <td>\( 110^\circ C \cdot W^{-1} \)</td>
  </tr>
  <tr>
    <td>Junction-to-case (top) thermal resistance</td>
    <td>\( R_{θJC(top)} \)</td>
    <td>\( 41.3^\circ C \cdot W^{-1} \)</td>
  </tr>
  <tr>
    <td>Junction-to-bottom (PCB) thermal resistance</td>
    <td>\( R_{θJB} \)</td>
    <td>\( 20^\circ C \cdot W^{-1} \)</td>
  </tr>
  <tr>
    <td>Junction-to-top characterization parameter</td>
    <td>\( \Psi_{JT} \)</td>
    <td>\( 0.8^\circ C \cdot W^{-1} \)</td>
  </tr>
  <tr>
    <td>Junction-to-bottom characterization parameter</td>
    <td>\( \psi_{JB} \)</td>
    <td>\( 20^\circ C \cdot W^{-1} \)</td>
  </tr>
</table>

All thermal parameters from <a href="https://www.ti.com/lit/ds/symlink/tps628501-q1.pdf">https://www.ti.com/lit/ds/symlink/tps628501-q1.pdf</a>.     

## References

[^ti-tps628501-datasheet]: <https://www.ti.com/lit/ds/symlink/tps628501-q1.pdf>
[^ti-tps628512-product-page]: Texas Instruments. _TPS628512 - 2.7-V to 6-V, 2-A, fixed-frequency, step-down converter in SOT583 package_. Retrieved 2024-04-19 from https://www.ti.com/product/TPS628512.

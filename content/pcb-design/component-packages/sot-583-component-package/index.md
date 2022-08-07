---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-10-06
draft: false
lastmod: 2020-10-06
tags: [ "component packages", "PCB design", "SOT-583", "small-outline", "transistor", "FCSOT" ]
title: "SOT-583 Component Package"
type: "page"
---

## Overview

<table>
  <tbody>
    <tr>
      <td>Name</td>
      <td>SOT-583 (Small Outline Transistor 583)</td>
    </tr>
    <tr>
      <td>Synonyms</td>
      <td>
        <ul>
          <li>FCSOT (Flipchip SOT, Texas Instruments)</li>
          <li>SOT-583-8 (Monolithic Power Systems)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Variants</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Similar To</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Mounting</td>
      <td>SMD</td>
    </tr>
    <tr>
      <td>Pin Count</td>
      <td>8</td>
    </tr>
    <tr>
      <td>Pitch</td>
      <td>0.5mm</td>
    </tr>
    <tr>
      <td>Solderability</td>
      <td>Hard to solder because of the tiny 0.5mm pitch.</td>
    </tr>
    <tr>
      <td>Thermal Parameters</td>
      <td>
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
      </td>
    </tr>
    <tr>
      <td>Dimensions</td>
      <td>2.1mm x 1.6 mm (incl. pins)</td>
    </tr>
    <tr>
      <td>3D Models</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Common Uses</td>
      <td>Switch-mode Power Supplies (SMPS)</td>
    </tr>
  </tbody>
</table>

## Dimensions

{{% figure src="sot-583-component-package-dimensions-ti.png" width="500px" caption="The dimensions of the SOT-583 component package from TI. Image from https://www.ti.com/lit/ml/mpcs002/mpcs002.pdf." %}}

## Recommended Footprint

{{% figure src="sot-583-component-package-recommended-footprint.png" width="500px" caption="The recommended footprint for the SOT-583 component package by TI. Image from https://www.ti.com/lit/ml/mpcs002/mpcs002.pdf." %}}

## 3D Renders

{{% figure src="sot-583-component-package-3d-render-ti.png" width="200px" caption="A 3D render of the SOT-583 component package. Image from https://www.ti.com/product/TPS628512." %}}

## References

[^ti-tps628501-datasheet]: <https://www.ti.com/lit/ds/symlink/tps628501-q1.pdf>
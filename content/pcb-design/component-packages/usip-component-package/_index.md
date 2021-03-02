---
author: "gbmhunter"
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2021-03-03
description: "Synonyms, variants, dimensions, 3D models, land patterns and more info on the uSiP component package."
draft: false
lastmod: 2021-03-03
tags: [ "component packages", "PCB design", "uSiP", "SIL-10C", "Texas Instruments", "TI" ]
title: "uSiP Component Package"
type: "page"
---

## Overview

<table>
  <tbody>
    <tr>
      <td>Name</td>
      <td>uSiP (Plastic System In Package or Micro System In Package, TI)</td>
    </tr>
    <tr>
      <td>Synonyms</td>
      <td>
        <ul>
          <li>SIL (TI)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Variants</td>
      <td>
        <ul>
          <li>SIL-10C (10 pin uSiP)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Similar To</td>
      <td></td>
    </tr>
    <tr>
      <td>Mounting</td>
      <td>SMD</td>
    </tr>
    <tr>
      <td>Pin Count</td>
      <td>8-33</td>
    </tr>
    <tr>
      <td>Pitch</td>
      <td></td>
    </tr>
    <tr>
      <td>Solderability</td>
      <td></td>
    </tr>
    <tr>
      <td>Thermal Resistance</td>
      <td>Depends on variant and exact component, see the Thermal Resistance section below.</td>
    </tr>
    <tr>
      <td>Dimensions</td>
      <td></td>
    </tr>
    <tr>
      <td>3D Models</td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Common Uses</td>
      <td>
        <ul>
          <li>Small point-of-load power modules.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

The uSiP package is used for the TPSM265R1 family of point-of-load power modules (this component incorporates the SMPS buck controller, MOSFET, inductor and some of the capacitors, hence being a complete power modules).

{{% img src="sil10c-usip-component-package-3d-render.png" width="150px" caption="A 3D render of the SIL-10C 10-pin uSiP component package. Image from https://www.ti.com/lit/ds/symlink/tpsm265r1.pdf, retrieved 2021-03-03." %}}

## Thermal Resistance

The thermal resistance of a uSiC package depends on the variant and also on the components soldered onto the sub-assembly. For that reason, thermal resistances are not given per package, but per component in the component's datasheet. For example, a graph of `\(\theta_{JA}\)` versus copper area on the PCB is shown below from the TPSM265R1 datasheet, which uses the SIL-10C uSiP package:

{{% img src="tpsm265r1-theta-ja-vs-copper-area.png" width="500px" caption="Theta JA vs. copper area for the TPSM265R1 power module in the SIL-10C uSiP component package." %}}
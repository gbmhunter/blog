---
author: gbmhunter
categories: [ Electronics, PCB Design, Component Packages ]
date: 2020-01-09
description: "Variants, pin counts, pitches, solderability, thermal resistances, dimensions, land patterns, 3D models and more info for the QFP component package."
draft: false
lastmod: 2020-01-09
tags: [ component packages, PCB design, quad flat package, BQFP, CQFP, FQFP, QFP, TQFP,  ]
title: QFP Component Package
type: page
---

## Overview

<table>
<tbody>
<tr>
  <td>Name</td>
  <td>Quad Flat Package (QFP)</td>
</tr>
<tr>
  <td>Synonyms</td>
  <td></td>
</tr>
<tr>
  <td>Variants</td>
  <td>
    <ul>
      <li>BQFP (Bumpered Quad Flat Package)</li>
      <li>CQFP (Ceramic Quad Flat Package)</li>
      <li>FQFP (Fine pitch Quad Flat Package)</li>
      <li>QFP (Quad Flat Package)</li>
      <li>TQFP (Thin Quad Flat Package)</li>
    </ul>
  </td>
</tr>
<tr>
  <td>Similar To</td>
  <td>
    <ul>
      <li>{{% link text="QFN" src="qfn-component-package" %}}</li>
    </ul>
  </td>
</tr>
<tr>
<td>Mounting</td>
<td>SMD</td>
</tr>
<tr>
<td>Pin Count</td>
<td>16-100+</td>
</tr>
<tr>
<td>Pitch</td>
<td>0.4-0.8mm (TQFP)</td>
</tr>
<tr>
<td>Solderability</td>
<td>Hand solderable given enough patience and skill, as long as it is not a variant with a thermal pad.</td>
</tr>
<tr>
  <td>Thermal Resistance</td>
  <td>n/a</td>
</tr>
<tr>
  <td>Dimensions</td>
  <td>n/a</td>
</tr>
<tr>
  <td>3D Models</td>
  <td>n/a</td>
</tr>
<tr>
  <td>Common Uses</td>
  <td>
    <ul>
      <li>Microcontrollers</li>
      <li>FPGAs</li>
    </ul>
  </td>
</tr>
</tbody>
</table>

The QFP package and most of it's variants are very sensitive to improper handling. Because of the fine pitch, size, and protrusion of the pins, they can be easily damaged and bent before the component is soldered onto the PCB. Although uncommon, the BQFP variant (see below) offers the most pin protection.

## BQFP

_Bumpered Quad Flat Pack_ (BQFP) is a variant of the QFP package which has bumpers on the four corners of the package to protect the pins from bending before the package is soldered to a PCB.

## CQFP

_Ceramic Quad Flat Pack_ (CQFP) is a variant of the QFP package which uses a high-quality ceramic material. The CQFP package can be hermetically sealed and is typically used for space applications.

See the [Texas Instruments Ceramic Quad Flat Pack document (SNOA025)](http://www.ti.com/lit/an/snoa025/snoa025.pdf) ([local cached copy](/pcb-design/component-packages/qfp-component-package/snoa025-ti-instruments-cqfp-dimensions.pdf)) for package dimensions for CQFP packages from 28 to 304 pins.

{{% img src="cqfp-component-package-3d-render.jpg" width="200px" caption="A 3D render of a CQFP component package. Image from analog.com." %}}

## TQFP

The thin-quad-flat-pack package (TQFP) is a leaded, thin SMT package commonly used for microcontrollers. It is one of the most popular variants of the QFN package. It's quite easy to solder these packages and easy enough to probe the individual pins afterwards when testing also.

Pitch: 0.4-0.8mm

**3D Render:**

{{< img src="tqfp-32-component-package-3d-render.jpg" width="300px" caption="A 3D render of the TQFP-32 component package." >}}
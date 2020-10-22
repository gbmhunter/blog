---
author: "gbmhunter"
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2020-10-21
description: "Variants, pin counts, pitches, solderability, thermal resistances, dimensions, land patterns, 3D models and more info for the PowerDI123 component package."
draft: false
lastmod: 2020-10-21
tags: [ "component packages", "PCB design", "PowerDI123", "diodes", "SOD-123" ]
title: "PowerDI123 Component Package"
type: "page"
---

## Overview

<table>
  <tbody>
    <tr>
      <td>Name</td>
      <td>PowerDI123</td>
    </tr>
    <tr>
      <td>Synonyms</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Variants</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Similar To</td>
      <td>SOD-123</td>
    </tr>
    <tr>
      <td>Mounting</td>
      <td>SMD
    </td>
    </tr>
    <tr>
      <td>Pin Count</td>
      <td>2</td>
    </tr>
    <tr>
      <td>Pitch</td>
      <td>3.05mm</td>
    </tr>
    <tr>
      <td>Solderability</td>
      <td>Easy enough to solder by hand.</td>
    </tr>
    <tr>
      <td>Thermal Resistance</td>
      <td>
        <p>Device mounted on 25.4x25.4mm FR-4 PCB (10x10mm 1oz copper, minimum recommended pad layout on
top layer and thermal vias to bottom layer ground plane)[^al5809-datasheet]:</p>
        <ul>
          <li>\( T_{JC} = 27.15°C/W \)</li>
          <li>\( T_{JA} = 148.61°C/W \)</li>
        </ul>
        <p>When mounted on 50.8mm x 50.8mm GETEK PCB with 25.4mm x 25.4mm copper pads[^al5809-datasheet]:</p>
        <ul>
          <li>\( T_{JC} = 17.81°C/W \)</li>
          <li>\( T_{JA} = 81.39°C/W \)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Dimensions</td>
      <td>2.8x1.78x0.98mm</td>
    </tr>
    <tr>
      <td>PCB Footprint</td>
      <td>6.75mm2</td>
    </tr>
    <tr>
      <td>3D Models</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Common Uses</td>
      <td>
        <ul>
          <li>Diodes</li>
          <li>Constant-current LED drivers (shunt style)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

PowerDI123 is a proprietary package by Diodes Incorporated.

## Dimensions

{{% img src="powerdi123-component-package-dimensions.png" width="800px" caption="The dimensions for the PowerDI123 component package. Image from https://www.diodes.com/assets/Package-Files/PowerDI123-Type-B.pdf." %}}

## Recommended Footprint

{{% img src="powerdi123-component-package-recommended-footprint.png" width="800px" caption="The recommended footprint for the PowerDI123 component package. Image from https://www.diodes.com/assets/Package-Files/PowerDI123-Type-B.pdf." %}}

## References

[^al5809-datasheet]: <https://www.diodes.com/assets/Datasheets/AL5809.pdf>
---
author: gbmhunter
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2019-04-29
description: "Dimensions, land patterns, thermal resistances and more info on the TO-273AA (Super TO-220) component package."
draft: false
lastmod: 2019-04-29
tags: [ "component packages", "PCB design", "transistor", "TO-273AA", "Super TO-220", "TO-220", "JEDEC" ]
title: TO-273AA Component Package
type: page
---

## Overview

<table>
  <tbody>
    <tr>
      <td>Name</td>
      <td>TO-273AA (Transistor Outline 273AA, JEDEC)</td>
    </tr>
    <tr>
      <td>Synonyms</td>
      <td>Super TO-220 (International Rectifier)</td>
    </tr>
    <tr>
      <td>Variants</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Similar To</td>
      <td>
        <ul>
          <li>{{% link src="../to-220-component-package/_index.md" text="TO-220" %}}</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Mounting</td>
      <td>TH</td>
    </tr>
    <tr>
      <td>Pin Count</td>
      <td>3</td>
    </tr>
    <tr>
      <td>Pitch</td>
      <td>2.54mm (100mil)</td>
    </tr>
    <tr>
      <td>Solderability</td>
      <td>Easily soldered by hand</td>
    </tr>
    <tr>
      <td>Thermal Resistance</td>
      <td>
        <ul style="width: 300px;">
          <li>\(T_{JC} = 0.7^{\circ}{\rm C}/W\) {{< bib id="ips0551t" >}}</li>
          <li>\(T_{JA} = 60^{\circ}{\rm C}/W\) (min. PCB footprint) {{< bib id="ips0551t" >}}</li>
          <li>\(T_{JA} = 35^{\circ}{\rm C}/W\) (1" sq. PCB footprint) {{< bib id="ips0551t" >}}</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Land Area</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Height</td>
      <td>Approx. 20.5mm high when mounted vertically, with pins pushed into PCB until they hit the taper.</td>
    </tr>
    <tr>
      <td>3D Models</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Common Uses</td>
      <td>MOSFETs</td>
    </tr>
  </tbody>
</table>

## Comments

The TO-273AA (also known as the Super-220) can be considered a variant of the TO-220 which replaces the screw-mounted design of the TO-220 with a clip-mounted design. Because of the clip, this package can usually achieve lower junction-to-ambient thermal resistances, hence the "Super". It is used by International Rectifier.

## 3D Render

{{% img src="to-273aa-super-to-220-component-package-3d-render.png" width="200px" caption="A 3D render of the TO-273AA (Super TO-220) component package. Image from http://www.irf.com/part/INTELLIGENT-POWER-SWITCH-1-CHANNEL-LOW-SIDE-DRIVER-IN-A-SUPER-220-TO-273AA-PACKAGE/_/A~IPS0551T." %}}

## Dimensions

{{% img src="component-package-to-273aa-super-to-220-case-outline-dimensions" width="700px" caption="The case outline and dimensions of the TO-273AA component package (Super TO-220). Image from http://www.irf.com/product-info/datasheets/data/ips0551t.pdf." %}}

## References

<ul id="bib-list">
  <li id="ips0551t">http://www.irf.com/product-info/datasheets/data/ips0551t.pdf</li>
</ul>
---
author: gbmhunter
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-04-06
draft: false
tags: [ "component package", "PCB design", "transistor", "TO-220", "TO-220AB", "TO-220-3", "JEDEC" ]
title: TO-220 Component Package
type: page
---

## Overview

<table>
  <tbody>
    <tr>
      <td>Name</td>
      <td>TO-220 (Transistor Outline 220, JEDEC)</td>
    </tr>
    <tr>
      <td>Synonyms</td>
      <td>TO-220-3</td>
    </tr>
    <tr>
      <td>Variants</td>
      <td>
        <ul>
          <li>TO-220AB</li>
          <li>TO-220AC</li>
          <li>TO-220F</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Similar To</td>
      <td>
        <ul>
          <li>{{% link text="TO-273AA (Super TO-220)" src="to-273aa-component-package/" %}}</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Mounting</td>
      <td>TH</td>
    </tr>
    <tr>
      <td>Pin Count</td>
      <td>3-5</td>
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
          <li>\(T_{JC} = 0.5-3^{\circ}{\rm C}/W\)</li>
          <li>\(T_{JA} = 34^{\circ}{\rm C}/W\) (typical heatsink)</li>
          <li>\(T_{JA} = 70^{\circ}{\rm C}/W\) (no heatsink)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Land Area</td>
      <td>\(44mm^2\)</td>
    </tr>
    <tr>
      <td>Height</td>
      <td>18.8mm high when mounted vertically, with pins pushed into PCB until they hit the taper.</td>
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

## TO-220AB

`TO-220AB` is a variant on the `TO-220` package with three leads and the pad (but only has three distinct connections). Commonly used in power electronics for components which require high heat-dissipation. Can dissipate about 1W of power without a heatsink.

The tab is commonly connected electrically to one of the legs, and sometimes isolated heatsinks or isolating thermal pads (between the tab on the `TO-220AB` and the heatsink) are required.

### 3D Renders

{{< figure src="/images/2015/04/to-220ab-to-220-3-component-package-3d-render.jpg" width="378px" caption="A 3D render of the TO-220AB component package."  >}}

### Images

{{< figure src="/images/electronics-packages/component-package-to-220ab-dimensions.png" caption="The dimensions of the TO-220AB component package."  width="500px" >}}

{{< figure src="/images/electronics-packages/component-package-to-220ab-photo.jpg" caption="A photo of the TO-220AB component package."  width="300px" >}}

{{< figure src="/images/electronics-packages/component-package-to-220ab-mounted-on-heatsink.jpg" caption="A photo of the TO-220AB component package, mounted on a heatsink."  width="300px" >}}

## TO-220AC

A variant on the TO-220 package with only two leads and the pad (which still means it could have three distinct connections). Use for some high power diodes.

{{< figure src="/images/2015/04/to-220ac-component-package-photo.jpg" width="271px" caption="A photo of the TO-220AC component package."  >}}

{{< figure src="/images/2015/04/to-220ac-component-package-dimensions.png" width="637px" caption="The dimensions of the TO-220AC component package."  >}}
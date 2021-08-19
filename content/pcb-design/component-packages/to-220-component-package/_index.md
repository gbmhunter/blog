---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-04-06
description: "Dimensions, land patterns and more info for TO-220 package variants such as TO-220AB and TO-220AC."
draft: false
lastmod: 2019-04-29
tags: [ "component packages", "PCB design", "transistor", "TO-220", "TO-220AB", "TO-220-3", "TO-220NIS", "JEDEC" ]
title: "TO-220 Component Package"
type: "page"
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
      <td>n/a</td>
    </tr>
    <tr>
      <td>Variants</td>
      <td>
        <ul>
          <li>{{% link text="TO-220-5 (SOT-263B)" src="#to-220-5-sot-263b" %}}</li>
          <li>{{% link text="TO-220AB (TO-220-3)" src="#to-220ab-to-220-3" %}}</li>
          <li>{{% link text="TO-220AC (TO-220-2)" src="#to-220ac-to-220-2" %}}</li>
          <li>{{% link text="TO-220F (TO-220FP, SOT-186A)" src="#to-220f-to-220fp-sot-186a" %}}</li>
          <li>{{% link text="TO-220FM" src="#to-220fm" %}}</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Similar To</td>
      <td>
        <ul>
          <li>{{% link text="TO-273AA (Super TO-220)" src="../to-273aa-component-package" %}}</li>
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
        <p>TO-220AB</p>
        <ul style="width: 300px;">
          <li>\(T_{JC} = 0.5-3^{\circ}{\rm C}/W\)</li>
          <li>\(T_{JA} = 34^{\circ}{\rm C}/W\) (typical heatsink)</li>
          <li>\(T_{JA} = 70^{\circ}{\rm C}/W\) (no heatsink)</li>
        </ul>
        <p>TO-220F</p>
        <ul style="width: 300px;">
          <li>\(T_{JC} = 4.2^{\circ}{\rm C}/W\) {{% bib id="cs306am" %}}</li>
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

## TO-220-5 (SOT-263B)

The TO-220-5 (also known as SOT-263B{{% bib id="bib-to-220-5" %}}) is a 5 leg variant of the TO-220 package.

{{< img src="to-220-5-component-package-3d-model.jpg" width="300px" caption="3D model of the TO-220-5 (SOT-263B) component package. Image from https://assets.nexperia.com/documents/outline-drawing/SOT263B.pdf." >}}

{{< img src="to-220-5-component-package-dimensions.png" width="700px" caption="Dimensions of the TO-220-5 (SOT-263B) component package. Image from https://assets.nexperia.com/documents/outline-drawing/SOT263B.pdf." >}}

## TO-220AA

This is a JEDEC package which has been made obsolete. It was a variant of the TO-220 package with two legs which were bent at right angles.

## TO-220AB (TO-220-3)

TO-220AB (also known as TO-220-3) is a variant on the TO-220 package with three leads and the pad (but only has three distinct connections). Commonly used in power electronics for components which require high heat-dissipation. Can dissipate about 1W of power without a heatsink.

The tab is commonly connected electrically to one of the legs, and sometimes isolated heatsinks or isolating thermal pads (between the tab on the TO-220AB and the heatsink) are required.

### 3D Renders

{{< img src="to-220ab-to-220-3-component-package-3d-render.jpg" width="378px" caption="A 3D render of the TO-220AB component package."  >}}

### Dimensions

{{< img src="component-package-to-220ab-dimensions.png" caption="The dimensions of the TO-220AB component package."  width="500px" >}}

### Photos

{{< img src="component-package-to-220ab-photo.jpg" caption="A photo of the TO-220AB component package."  width="300px" >}}

{{< img src="component-package-to-220ab-mounted-on-heatsink.jpg" caption="A photo of the TO-220AB component package, mounted on a heatsink."  width="300px" >}}

## TO-220AC (TO-220-2)

The TO-220AC (also known as the TO-220-2) is a variant on the TO-220 package with only two leads and the pad (which still means it could have three distinct connections). Use for some high power diodes.

{{< img src="to-220ac-component-package-photo.jpg" width="271px" caption="A photo of the TO-220AC component package."  >}}

{{< img src="to-220ac-component-package-dimensions.png" width="637px" caption="The dimensions of the TO-220AC component package." >}}

## TO-220F (TO-220FP, SOT-186A)

The TO-220F (also known as TO-220FP or SOT-186A) is a variant of the TO-220 package which has an **insulated metal tab, which is not electrically connected to any of its pins**. Some thermal performance is sacrificed because of this insulating layer. The `F` or `FP` is an initialism for _full pack_.

This insulating tab is added to remove one of the disadvantages of the TO-220AB package -- the metal tab, which although great for heatsinking reasons, is electrically connected to the middle pin of the component. This usually requires either an insulated heatsink or an insulated thermal pad between the tab and heatsink to prevent unwanted connections (such as a short-circuit to ground).

TO-220F generally refers to the 3-pin version, although sometimes it may be called TO-220F-3, to distinguish it from {{< link text="TO-220FM" src="#to-220fm" >}} (a 2-pin variant). This also might be the same as the TO-220NIS package (not verified).

### 3D Renders

{{< img src="to-220f-component-package-3d-render.jpg" width="338px" caption="A 3D render of the TO-220F component package."  >}}

### Dimensions

The dimensions of the TO-220F are shown below:

{{< img src="component-package-to-220f-dimensions.png" width="574px" caption="The dimensions for the TO-220F component package."  >}}

### Photos

{{< img src="component-packages-to-220f-photo.jpg" width="329px" caption="A photo of the TO-220F component package."  >}}

## TO-220FM

The TO-220FM is a variant of the TO-220 package which is identical to the {{% link text="TO-220F" src="#to-220f" %}} except it has two legs instead of three. The middle leg is cut short, so it only just protrudes from the epoxy case (and it is not meant to be used).

{{< img src="to-220fm-component-package-dimensions.png" width="700px" caption="Dimensions of the TO-220FM component package. Image from https://d1d2qsbl8m0m72.cloudfront.net/en/techdata_basic/power/dimension/SiC_TO-220FM-e.pdf." >}}

## References

<ul id="bib-list">
  <li id="cs306am"><a href="https://www.mouser.ca/datasheet/2/348/cs306am-e-1519302.pdf">https://www.mouser.ca/datasheet/2/348/cs306am-e-1519302.pdf</a></li>
  <li id="bib-to-220-5">https://www.nexperia.com/packages/SOT263B.html</li>
</ul>

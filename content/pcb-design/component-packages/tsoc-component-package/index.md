---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-04-07
description: "Variants, pin counts, pitches, solderability, thermal resistances, dimensions, land patterns, 3D models and more info for the TSOC component package."
draft: false
lastmod: 2020-01-08
tags: [ "component packages", "PCB design", "transistor", "TSOC", "thin small-outline C-Lead", "TSOC-6", "D6-1", "D6N-1", "Dallas", "Maxim" ]
title: "TSOC Component Package"
type: "page"
---

## Overview

<table>
  <tbody>
    <tr>
      <td>Name</td>
      <td>Thin Small-Outline C-Lead</td>
    </tr>
    <tr>
      <td>Synonyms</td>
      <td>D6 (Maxim)</td>
    </tr>
    <tr>
      <td>Variants</td>
      <td>
        <ul>
          <li>D6+1/D6-1 (Variant A)</li>
          <li>D6N+1/D6N-1 (Variant B)</li>
        </ul>
      </td>
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
      <td>6 (TSOC-6)</td>
    </tr>
    <tr>
      <td>Pitch</td>
      <td>1.27mm (for all variants)</td>
    </tr>
    <tr>
      <td>Solderability</td>
      <td>Easy to solder by hand.</td>
    </tr>
    <tr>
      <td>Thermal Resistance</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Dimensions</td>
      <td>
        <ul>
          <li>3.94x4.29x1.40mm, LA: 17.6mm2 (D6+1/D6-1)</li>
          <li>3.94x4.62x1.40mm, LA: 18.9mm2 (D6N+1/D6N-1)</li>
        </ul>
      </td>`
    </tr>
    <tr>
      <td>Height</td>
      <td>1.80mm</td>
    </tr>
    <tr>
      <td>3D Models</td>
      <td><a href="http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&id=166218">TSOC-6</a></td>
    </tr>
    <tr>
      <td>Common Uses</td>
      <td>
        <ul>
          <li>EEPROM</li>
          <li>Timing IC</li>
          <li>ESD protection diodes</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Comments

As far as I can tell, this package only comes in the 6-pin version (TSOC-6), and is only used by Dallas/Maxim (since 2001, Dallas has been a subsidiary of Maxim). While Maxim Integrated lists four different variants (see the `Title` section of the recommended land patterns below), there seems to be no physical difference between the D6+1 and D6-1 variants, and no difference between the D6N+1 and D6N-1 variants. The difference between the variants with and without `N` in their name are the package width and the lead length (and hence two slightly different land patterns).

See [https://www.maximintegrated.com/en/design/packaging/package-information.html](https://www.maximintegrated.com/en/design/packaging/package-information.html) for the official dimensions and land patterns from Maxim Integrated.

## TSOC-6

The only difference between the D6+1, D6-1 and D6N-1 variants of the TSOC-6 component package is the recommended land pattern.

**Photo**

{{< img src="tsoc-6-component-package-photo.jpg" width="360px" caption="A photo of the TSOC-6 component package. Image from maximintegrated.com." >}}

**Dimensions**

All Variants:

{{< img src="tsoc-6-component-package-dimensions.png" width="500px" caption="A photo of the TSOC-6 component package. Image from maximintegrated.com." >}}

**Recommended Land Pattern**

D6+1/D6-1 Variants (Variant A):

{{< img src="component-package-tsoc-6-d6n-1-recommended-land-pattern.png" width="500px" caption="The recommended land pattern for the TSOC-6 D6+1/D6-1 component package. Image from maximintegrated.com." >}}

D6N+1/D6N-1 Variants (Variant B):

{{< img src="component-package-tsoc-6-d6n-1-recommended-land-pattern.png" width="500px" caption="The recommended land pattern for the TSOC-6 D6N+1/D6N-1 component package. Image from maximintegrated.com." >}}

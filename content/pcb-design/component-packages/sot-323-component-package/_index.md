---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2014-11-09
description: "Dimensions, recommended footprints, thermal resistances, variants, synonyms and more info about the SOT-323 component package."
draft: false
lastmod: 2020-10-19
tags: [ "component packages", "PCB design", "SOT-323", "small-outline", "transistor" ]
title: "SOT-323 Component Package"
type: "page"
---

## Overview

<table>
  <tbody>
    <tr>
      <td>Name</td>
      <td>SOT-323 (Small Outline Transistor 323)</td>
    </tr>
    <tr>
      <td>Synonyms</td>
      <td>
        <ul>
          <li>SC-70 (SOT323-3, JEITA)</li>
          <li>SCx (Analog Devices)</li>
          <li>SMini3-G1-B (SOT323-3, Panasonic)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Variants</td>
      <td>
        <ul>
          <li>SOT-323-3 (3 lead)</li>
          <li>SOT-323-5 (5 lead)</li>
          <li>SOT-323-8 (8 lead)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Similar To</td>
      <td>{{% link text="SOT-363" src="../sot-363-sc-88-component-package" %}}</td>
    </tr>
    <tr>
      <td>Mounting</td>
      <td>SMD</td>
    </tr>
    <tr>
      <td>Pin Count</td>
      <td>
        <ul>
          <li>3 (SOT-323-3)</li>
          <li>5 (SOT-323-5)</li>
          <li>8 (SOT-323-8, SC8)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Pitch</td>
      <td>
        <ul>
          <li>0.50mm (SOT-323-8, SC8)</li>
          <li>0.65mm (all other variants)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Solderability</td>
      <td>Difficult to solder by hand (but possible).</td>
    </tr>
    <tr>
      <td>Thermal Resistance</td>
      <td>
        <ul>
          <li>
            SOT-323-3:<br/>
            \( T_{ja} = 380°C/W \) (mounted on 10x8x0.6mm FR4, still air)<br/>
            \( T_{jc} = 60°C/W \)
          </li>
          <li>
            SOT-323-8<br/>
            \( T_{ja} = 70-90°C/W \)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Land Area</td>
      <td>
        SOT-323-3:<br/>
        \( 4.20mm^2 (2.10*2.00mm) \) for the package alone<br/>
        \( 6.23mm^2 (2.65*2.35mm) \) when included with the recommended reflow PCB footprint
      </td>
    </tr>
    <tr>
      <td>Height</td>
      <td>0.95mm</td>
    </tr>
    <tr>
      <td>3D Models</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Common Uses</td>
      <td>
        <ul>
          <li>Diodes (SOT-323-3)</li>
          <li>Voltage regulators (SOT-323-8)</li>
          <li>MOSFETs (SOT-323-3)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

This package is a little confusing because it shares two common names, the SOT-323-x and the SC-70-x. And it also can have a different pitch (the SOT-323-8, aka SC-70-8 or SC8 has a 0.5mm pitch). It has a lead-pitch double that of the SOT-363.

If the pin number isn't specified, it is likely to be the 3 pin variant (this is the most common). The SOT-323 package has a significantly smaller PCB footprint than the SOT-23. 

## SOT-323-3

This package is also commonly known as the `SC-70`.

{{% figure src="component-package-sot-323-3-3d-model.jpg" caption="3D model of the SOT-323-3 (SC-70-3) component package."  width="500px" %}}

## SOT-323-5

{{% figure src="component-package-sot-323-5-dimensions-and-land-pattern.png" caption="Dimensions and recommended land pattern for the SOT-323-5 (SC-70-5) component package." width="800px" %}}

{{% figure src="component-package-sot-323-5-3d-model.jpg" caption="3D model of the SOT-323-5 (SC-70-5) component package."  width="500px" %}}

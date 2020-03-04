---
author: "gbmhunter"
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-01-21
description: "Synonyms, variants, dimensions, 3D models, land patterns and more info on the WSON component package."
draft: false
lastmod: 2020-03-04
tags: [ "component packages", "PCB design", "WSON", "SOIC", "flash memory", "DQD", "DMB", "PWSON", "SOT-23" ]
title: "WSON Component Package"
type: "page"
---

## Overview

<table>
  <tbody>
    <tr>
      <td>Name</td>
      <td>WSON (Plastic Small-outline No-lead Package)</td>
    </tr>
    <tr>
      <td>Synonyms</td>
      <td>
        <ul>
          <li>DMB/PWSON (Texas Instruments)</li>
          <li>DQD (Texas Instruments)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Variants</td>
      <td>Varying number of pins.</td>
    </tr>
    <tr>
      <td>Similar To</td>
      <td>{{% link text="SOIC" src="../soic-component-package" %}}</td>
      <td>{{% link text="USON" src="../uson-component-package" %}}</td>
    </tr>
    <tr>
      <td>Mounting</td>
      <td>SMD</td>
    </tr>
    <tr>
      <td>Pin Count</td>
      <td>8 (all also have exposed thermal pad)</td>
    </tr>
    <tr>
      <td>Pitch</td>
      <td>Varies. Many are 1.27mm (just like SOIC, for example the Cypress WSON 8L package), the TI DMB package as a pitch of 1.0mm, and the TI DQD package as a pitch of 0.4mm.</td>
    </tr>
    <tr>
      <td>Solderability</td>
      <td>Hard to solder with a soldering iron due to underside thermal pad.</td>
    </tr>
    <tr>
      <td>Thermal Resistance</td>
      <td></td>
    </tr>
    <tr>
      <td>Dimensions</td>
      <td>
        <p><strong>WSON-8</strong>  </p>
        <ul>
          <li>Package: 6.0x5.0x0.80mm (w<em>l</em>h, Winbond package code ZP)</li>
          <li>Recommended Land Pattern: 6.10x5.10mm (31.11mm2)</li>
        </ul>
    </td>
    </tr>
    <tr>
      <td>3D Models</td>
      <td>
        <ul>
          <li><a href="https://www.3dcontentcentral.com/download-model.aspx?catalogid=171&id=416428">WSON-8 6x8mm</a></li>
          <li><a href="https://www.3dcontentcentral.com/download-model.aspx?catalogid=171&id=626725">WSON-10 3x3mm</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Common Uses</td>
      <td>
        <ul>
          <li>Flash memory ICs</li>
          <li>Secondary-side bias regulators for DC-DC converters</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Comments

The WSON package has a exposed thermal pad on the underside. However, it is not normally electrically connected to anything, and is optionally soldered to the PCB. It is recommended to be soldered when the PCB has a large amount of flex, else left unconnected.

{{% warning %}}
Texas Instruments has a WSON package which does not have a pitch of 1.27mm!
{{% /warning %}}

Below is an "odd shaped" SON package used by Numonyx flash chips that goes under the name VDFPN8. Notice the half-round appearance of the pins.

{{< img src="component-package-vdfpn8-mlp8-outline-dimensions.png" width="554px" caption="Outline and dimensions for the VDFPN8 (SON-8) component package of a Numonyx flash IC.Image from http://www.micron.com/~/media/Documents/Products/Data%20Sheet/NOR%20Flash/Serial%20NOR/M25P/M25P128.pdf."  >}}

Atmel produces a document titled [PCB Design Considerations when Changing from 6-pin SOT23 to 6-pin WSON Atmel Products](http://ww1.microchip.com/downloads/en/AppNotes/QAN0027_6-Pin-SOT23-to-6-Pin-WSON_1_05.pdf). It is a good read if you are migrating from larger SOT-23 packages to the smaller WSON package.

## The DMB/PWSON Package (Texas Instruments)

The `DMB` package (also called `PWSON`) is a variant of the `WSON` package used by Texas Instruments. It has a pitch of 1mm. The [HDC1080 datasheet](http://www.ti.com/lit/ds/symlink/hdc1080.pdf) is an example of a TI component which comes in the `DMB` package.

## The DQD Package (Texas Instruments)

The `DQD` package is a variant of the `WSON` package used by Texas Instruments. The [TPD8F003 datasheet](http://www.ti.com/lit/ds/symlink/tpd8f003.pdf) is an example of a TI component which comes in the `DQD` package.

{{% img src="dqd-texas-instruments-tpd8f003-wson-component-package.png" width="500px" caption="The pin diagram for three different TPD8F003 family components which come in the WSON package (the TI synonym for WSON is DQD)." %}}

3D model exist for some of the DQD packages on 3DContentCentral, for example:

* [WSON-8 (DQD)](https://www.3dcontentcentral.com/download-model.aspx?catalogid=171&id=1025764)
* [WSON-12 (DQD)](https://www.3dcontentcentral.com/download-model.aspx?catalogid=171&id=1025763)
* [WSON-16 (DQD)](https://www.3dcontentcentral.com/download-model.aspx?catalogid=171&id=1025762)
 
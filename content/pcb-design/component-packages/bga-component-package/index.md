---
author: gbmhunter
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-03-08
tags: [ "component package", "PCB design", "BGA", "MO-207", "DSBGA" ]
title: BGA Component Package
type: page
---

## Overview

<table>
<tbody>
<tr>
  <td>Name</td>
  <td>BGA (Ball-Grid Array)</td>
</tr>
<tr>
  <td>Synonyms</td>
  <td >n/a</td>
</tr>
<tr>
  <td>Variants</td>
  <td>
    <ul>
      <li>CABGA</li>
      <li>CTBGA</li>
      <li>DSBGA (Die-Size BGA). Used by Texas Instruments. JEDEC standard MO-207</li>
      <li>FBGA</li>
      <li>FGG484 (Xilinx)</li>
      <li>X-DSBGA (Very thin die-size BGA). JEDEC standard MO-211-C.</li>
      <li>xDSB (Square and rectangular die-size BGA). JEDEC standard MO-207N.</li>
    </ul>
  </td>
</tr>
<tr>
<td>Similar To</td>
<td>{{< link src="wlcsp-component-package/" text="WLCSP" >}}</td>
</tr>
<tr>
<td>Mounting</td>
<td>SMD</td>
</tr>
<tr >
<td >Pin Count</td>
<td >4-1700+</td>
</tr>
<tr>
<td>Pitch</td>
<td>0.5mm, 0.8mm, 1.0mm</td>
</tr>
<tr>
<td>Solderability</td>
<td>BGA usually requires reflow oven or infrared heater. Expert-level solderers can use the "dead-bug" prototyping method and attach super-thin wires to each ball when the package is upside down.</td>
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
<td>
  <ul>
    <li><a href="http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=215083">Various Config 1mm Pitch</a></li>
    <li><a href="http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=363398">324pins 18x18mm 1mm Pitch</a></li>
  </ul>
</td>
</tr>
<tr>
<td>Common Uses</td>
<td>
  <ul>
    <li>Microcontrollers</li>
    <li>FPGAs</li>
    <li>High-density SMD ICs</li>
    <li>CPUs</li>
    <li>GPUs</li>
    <li>Memory</li>
  </ul>
</td>
</tr></tbody></table>

## Comments

The package with the densest pin density out there, BGAs are used to either make components very small or to encompass a large number of leads. Some modern FPGAs have more than 1700 leads! Requires an x-ray machine to discover if the balls have correctly soldered onto the pads.

A 3D render of the BGA-144 component package.

{{< img src="bga-144-component-package-3d-render.jpg" width="372px" caption="A 3D render of the BGA-144 component package."  >}}

## Ball Layout

A particular BGA package may not have a complete grid of balls. BGA packages also come in a _straight_ or _staggered_ ball layout.

## BGA Pad Diameter

The pad diameter for a BGA footprint can be determined by one of three methods:

* Maximum material condition (MMC)
* Least material condition (LMC)
* Percentage reduction of nominal ball diameter (e.g. 20%)

## Soldermask Considerations

{{< img src="example-of-nsmd-pcb-pad-solder-joint-xilinx.png" width="507px" caption="Example of a NSMD (non-soldermask defined) solder joint on a BGA package. Image from http://www.xilinx.com/."  >}}

## Variants

### DSBGA

DSBGA (Die Sized BGA) is the name given by Texas Instruments for their family of BGA packages in where the die size is the same as the package size. They are also known by the term Wafer-Level Chip Scale Package (WLCSP). As of October 2015, they are available in 0.30, 0.35, 0.40, and 0.50mm pitches. 

{{< img src="dsbga-component-package-4-25-bump-size-comparison-ti.png" width="282px" caption="A size comparison of the 4 to 25 bump DSBGA component packages. Image from http://www.ti.com/."  >}}

Texas Instruments also assigns a package code to each package within the DSBGA family. Here are some example (this is in no way an exhaustive list):

<table>
  <thead>
    <tr>
      <th>TI Package Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>YDC</td>
      <td>DSBGA, 4 Leads, Pitch 0.5mm, Body 1.1x1.1mm, Height 0.4mm</td>
    </tr>
    <tr>
      <td>YEA</td>
      <td>DSBGA, 5 Leads, Pitch 0.5mm, Body 0.9x1.4mm, Height 0.5mm</td>
    </tr>
    <tr>
      <td>YEB</td>
      <td>DSBGA, 4 Leads, Pitch 0.5mm, Body 1.3x1.3mm, Height 0.625mm</td>
    </tr>
    <tr>
      <td>YEC</td>
      <td>DSBGA, 6 Leads, Pitch 0.5mm, Body 1.8x1.3mm, Height 0.625mm</td>
    </tr>
    <tr>
      <td>YZP</td>
      <td>DSBGA, 8 Leads, Pitch 0.5mm, Body 1.9x0.9mm, Height 0.5mm</td>
    </tr>
  </tbody>
</table>

Note that confusingly, the three letter Texas Instrument's code is **not unique** for a particular package. For example, the code "YZP" may refer to a 5, 6, or 8 ball DSBGA package, which also may have **different** height, width and length dimensions. 

{{< img src="dsbga-8-component-package-2d-pcb-footprint-birds-eye.png" width="236px" caption="A 2D birds-eye view of the CAD model for the DSBGA-8 component package."  >}}

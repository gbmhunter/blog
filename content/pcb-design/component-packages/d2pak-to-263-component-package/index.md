---
author: gbmhunter
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-04-07
draft: false
tags: [ "component packages", "PCB design", "D2PAK", "TO-263", "DDPAK", "TO-263AB", "TO-279", "SMD-220" ]
title: D2PAK (TO-263) Component Package
type: page
---

## Overview

<table>
<tbody>
<tr>
<td>Name</td>
<td>Transistor Outline 263</td>
</tr>
<tr>
<td>Synonyms</td>
<td>
  <ul>
    <li>TO-263 (Transistor Outline 263)</li>
    <li>D2PAK (Double Decawatt package)</li>
    <li>DDPAK</li>
    <li>TO-263AB (TO-263-3S only)</li>
    <li>TO-279 (TO-263 THIN only)</li>
    <li>SMD-220 (because the TO-263 is the SMD equivalent of the TO-220).</li>
  </ul>
</td>
</tr>
<tr>
<td>Variants</td>
<td>
  <ul>
    <li>TO-263-X1X2 (where X1 is the lead count and X2 is the length of the centre pin).</li>
    <li>TO-263 THIN (a thinner variant of the standard TO-263 package by Texas Instruments)</li>
  </ul>
</td>
</tr>
<tr>
<td>Similar To</td>
<td>{{% link src="to-220-component-package" text="TO-220" %}}</td>
</tr>
<tr >
<td >Mounting
</td>
<td >SMD
</td></tr><tr >
<td >Pin Count
</td>
<td >3, 5, 7, or 9 (this is X1). All packages also have a thermal pad.
</td></tr><tr >
<td >Pitch
</td>
<td>
<ul>
<li>TO-263-3, TO-263-3S: 2.54mm</li>
<li>TO-263-7, TO-263-7S: 1.7mm</li>
</ul>
</td>
</tr>
<tr>
    <td>Solderability</td>
    <td>Easy to solder by hand, as long as you have a decent powered soldering iron for the central thermal pad. Easy to solder with infrared and reflow techniques.</td>
</tr>
<tr>
    <td>Thermal Resistance</td>
    <td >
        <b>TO-263-3</b>
        <ul>
            <li>\(T_{JA} = 18.0^{\circ}{\rm C}/W\) (1 square inch of copper surrounding pads, connected to ground)</li>
            <li>\(T_{JA} = 33.6^{\circ}{\rm C}/W\) (copper filling package land-area)</li>
            <li>\(T_{JA} = 36.7^{\circ}{\rm C}/W\) (pads only, no copper fill)</li>
        </ul>
        <b>TO-263-5L THIN</b>
        <ul>
            <li>\(T_{JA} = 22.0^{\circ}{\rm C}/W\) (no air flow, on JEDEX 4-layer test board)</li>
        </ul>
    </td>
</tr>
<tr >
<td >Land Area</td>
<td >n/a</td>
</tr>
<tr>
    <td>Height</td>
    <td>
        <ul>
            <li>All except TO-263 THIN: 4.57mm</li>
            <li>TO-263 THIN: 2.00mm</li>
        </ul>
    </td>
</tr><tr >
<td >3D Models
</td>
<td >
    <ul>
        <li><a href="http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=168926">TO-263-3</a></li>
        <li><a href="http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=168921">TO-263-3S</a></li>
        <li><a href="http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=168928">TO-263-5</a></li>
        <li><a href="http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=168927">TO-263-5S</a></li>
        <li><a href="http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=167948">TO-263-7S</a></li>
    </ul>
</td></tr><tr >
<td >Common Uses
</td>
<td >
<ul>
<li>High power MOSFETs</li>
<li>High power LDOs</li>
<li>High power SMPS (usually with integrated switching element)</li>
</ul>
</td></tr></tbody></table>

## The Standard Package (TO-263)

This package can be considered the SMT version of the TO-220AB. It is a 3, 5 or 7 leaded heavy-duty package that allows for good heat-sinking due to a large pad on it's underside. Used frequently for high power MOSFETs, LDOs and SMPS. Comes with either a normal middle lead (X2 = nothing) or a short, cut-off middle lead (X2 = S).

{{< img src="d2pak-to-263-component-package-3d-render.jpg" width="345px" caption="A 3D render of the D2PAK (TO-263) component package."  >}}

The synonym for the TO-263 package, D2PAK, stands for "double decawatt package". It was designed by Motorola for high power devices.

## Thermal Resistance

The junction-to-ambient thermal resistance for the TO-263 component package on both standard JEDEC 2-layer and 4-layer boards is shown below:

{{< img src="d2pak-to-263-component-package-thermal-resistance-2-vs-4-layer-comparison.png" width="680px" caption="Junction-to-ambient thermal resistance data of the TO-263 component package on both standard JEDEC 2-layer and 4-layer PCBs. Image from www.ti.com." >}}

## TO-263 THIN

TO-263 THIN is a variant of the TO-263 component package by Texas Instruments. It shares a similar PCB footprint, but is significantly smaller in height (i.e. thinner).

{{< img src="to-263-normal-vs-thin-component-package-comparison.pdf.png" width="446px" caption="A comparison in dimensions of the standard TO-263 component package vs. the TO-263 THIN component package. Image from www.ti.com." >}}

It still has a similar exposed pad on it's underside (making it footprint compatible with the standard TO-263 package).

The exact dimensions of the TO-263 THIN package are shown in the below image:

{{< img src="to-263-thin-component-package-dimensions.png" width="817px" caption="The dimensions for the TO-263 THIN component package. Image built from elements taken from www.ti.com." >}}
---
author: gbmhunter
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-03-08
draft: false
lastmod: 2015-03-08
tags: [ "component packages", "PCB design", "DIP", "N Package", "PDIP", "CDIP", "dual inline package" ]
title: DIP Component Package
type: page
---

## Overview

<table >
<tbody >
<tr >
<td>Name</td>
<td>Dual In-Line Package</td>
</tr>
<tr >
<td >Synonyms</td>
<td>
  <ul>
    <li>N Package (Analog Devices)</li>
    <li>PDIP (plastic dual-inline package)</li>
    <li>CDIP (ceramic dual-inline package)</li>
  </ul>
</td>
</tr>
<tr>
    <td>Variants</td>
    <td></td>
</tr>
<tr>
<td >Similar To</td>
<td>
  <ul>
    <li>{{% link src="../sip-component-package" text="SIP" %}}</li>
    <li>{{% link src="../qip-component-package" text="QIP" %}}</li>
    <li>{{% link src="../soic-component-package" text="SOIC" %}}</li>
  </ul>
</td>
</tr>
<tr>
<td>Mounting</td>
<td>TH</td>
</tr>
<tr>
  <td>Pin Count</td>
  <td>4-64</td>
</tr>
<tr>
  <td>Pitch</td>
  <td>2.54mm (0.1mil)</td>
</tr>
<tr>
  <td>Solderability</td>
  <td>Easiest chip package to solder! Perfect for prototyping, fits into standard 100mill pitch prototype board.</td>
</tr>
<tr>
  <td>Thermal Resistance</td>
  <td></td>
</tr>
<tr>
<td>Land Area</td>
<td>
    <p>The general land area formula for DIP packages A = ((n/2)*2.54) * (width + 1.65mm)  
where n is the number of pins and the width is the rated package width in mm (e.g.  7.62 (300mil), 15.24 (600mil)).</p>
    <ul>
        <li>DIP-300-8 : 94.2mm2</li>
        <li>DIP-300-16: 188.4mm2</li>
        <li>DIP-300-32: 376.7mm2</li>
        <li>DIP-600-32: 686.4mm2</li>
    </ul>
</td>
</tr>
<tr>
  <td>Height</td>
  <td>5.0mm</td>
</tr>
<tr>
  <td>3D Models</td>
  <td>
<ul>
<li><a href="http://www.3dcontentcentral.com/download-model.aspx?catalogid=1023&amp;id=79">DIP-300-8</a></li>
<li><a href="http://www.3dcontentcentral.com/download-model.aspx?catalogid=1023&amp;id=71">DIP-300-16</a></li>
<li><a href="http://www.3dcontentcentral.com/download-model.aspx?catalogid=171&amp;id=71043">DIP-300-20</a></li>
<li><a href="http://www.3dcontentcentral.com/download-model.aspx?catalogid=171&amp;id=95319">DIP-600-40</a></li>
</ul>
</td>
</tr>
<tr>
<td>Common Uses</td>
<td >
    <ul>
        <li>Through-hole ICs</li>
        <li>DIP switches</li>
        <li>Relays/reed switches</li>
        <li>7-segment, 4-digit LCD character display footprints (with different package)</li>
    </ul>
</td>
</tr>
</tbody>
</table>

## Comments

The most common through-hole IC package. Now mostly superseded by SMT packages. Has standard 100mill pitch spacing. The two rows of legs are usually 300mill (thin-type), or 600mill (fat-type) apart (400mil and 900mil variants are also present). The 600mill package is usually reserved for the larger pin variants. As well as standard through-hole mounting, they can also be inserted into a socket, either by friction or clamping (zero insertion force). Pin numbering is counter-clockwise from the top-left.

Anti-static packaging can easily be made for DIP packages with foam and aluminium foil as shown in the picture below.

{{< img src="making-antistatic-packaging-for-dip-ic-with-aluminium-foil.jpg" caption="Anti-static packaging can easily be made for DIP packages with foam and aluminium foil."  width="500px" >}}

Components other than ICs can also use this footprint (although they typically have different packages). One example are some 7-segment, 4-digit LCD character displays, which use the DIP-600-12 footprint.

## 3D Renders

{{< img src="dip-16-component-package-3d-render.jpg" width="297px" caption="A 3D render of the DIP-16 component package." >}}
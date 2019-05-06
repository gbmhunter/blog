---
author: gbmhunter
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-04-07
draft: false
tags: [ "D3PAK", "TO-268", "DDDPAK", "Decawatt", "TO-268AA", "TO-268-3", "component package" ]
title: D3PAK (TO-268) Component Package
type: page
---

## Overview


<table>
<tbody>
<tr>
  <td>Name</td>
  <td>TO-263 (D3PAK)</td>
</tr>
<tr>
  <td>Synonyms</td>
  <td>
    <ul>
      <li>TO-263 (Transistor Outline 268)</li>
      <li>D3PAK</li>
      <li>DDDPAK</li>
      <li>Decawatt Package 3</li>
      <li>TO-268AA (TO-268-3)</li>
    </ul>
  </td>
</tr>
<tr>
  <td>Variants</td>
  <td>n/a</td>
</tr>
<tr>
  <td>Similar To</td>
  <td>TO-263</td>
</tr>
<tr>
  <td>Mounting</td>
  <td>SMD</td>
</tr>
<tr>
  <td>Pin Count</td>
  <td>3</td>
</tr>
<tr>
<td>Pitch
</td>

<td >5.461mm
</td>
</tr>
<tr >

<td >Solderability
</td>

<td >Easy to solder by hand, as long as you have a decent powered soldering iron for the central thermal pad. Easy to solder with infrared and reflow techniques.
</td>
</tr>
<tr>
  <td>Thermal Resistance</td>
  <td>
    <ul>
      <li>\(T_{JC}: 0.24-1.18^{\circ}{\rm C}/W\)</li>
      <li>\(T_{JA}: 40^{\circ}{\rm C}/W\)</li>
      <li>\(T_{JA}: 21.9^{\circ}{\rm C}/W\) (13.5x17.5mm copper pad)</li>
      <li>\(T_{JA}: 18^{\circ}{\rm C}/W\) (19x29.4mm copper pad)</li>
    </ul>
  </td>
</tr>
<tr >

<td >Land Area
</td>

<td >n/a
</td>
</tr>
<tr >

<td >Height
</td>

<td >5.03mm
</td>
</tr>
<tr >
<td >Weight</td>
<td >6.2g</td>
</tr>
<tr >
<td >3D Models</td>
<td >[TO-268AA (D3PAK)](http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&id=399669)
</td>
</tr>
<tr>
<td>Common Uses</td>
<td>
  <ul>
    <li>Microsemi power MOSFETs</li>
    <li>Microsemi power diodes</li>
    <li>Microsemi power IGBTs</li>
  </ul>
</td>
</tr>
</tbody>
</table>

## Comments

The TO-268 (D3PAK) package is bigger than the TO-263 (D2PAK) package. The D3PAK name stands for "decawatt 3 package". Unlike the TO-263 package, the TO-268 package only comes in one variant with 3 pins.

It is designed to have a really low thermal resistance so that it can be used in high power applications. The larger die also means that MOSFETs in this package can have lower `\(R_{DS(ON)}\)` values, resulting in less power dissipation for the same current.

I have only ever seen this in the 3-pin variant (called TO-268-3).

## Recommended Land Pattern

{{< img src="to-268-component-package-land-pattern.png" width="500px" caption="Recommended land pattern for the D3PAK (TO-268) component package." >}}

## Recommended Stencil

{{< img src="to-268-component-package-recommended-stencil-pattern.png" width="500px" caption="Recommended stencil pattern for the D3PAK (TO-268) component package." >}}


## Package Dimensions

{{< img src="to-268-3-component-package-dimensions.png" width="500px" caption="Dimensions for the D3PAK (TO-268) component package." >}}

## Photos

{{< img src="d3pak-to-268-component-package-photo.jpg" width="366px" caption="Photo of the D3PAK (TO-268) component package."  >}}
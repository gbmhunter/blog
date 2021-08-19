---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-04-07
draft: false
tags: [ "component packages", "PCB design", "DPACK", "SC-63", "SOT-428", "TO-252", "TO-252AA", "CPD", "Case 369C" ]
title: DPACK Component Package
type: page
---

## Overview

<table >
<tbody >
<tr >
<td >Name</td>
<td >DPAK</td>
</tr>
<tr>
<td >Synonyms</td>
<td>
    <ul>
        <li>Case 369C (On Semiconductor's name for the TO-252AA)</li>
        <li>CPD (Rohm Semiconductor)</li>
        <li>SC-63 (JEITA, EIAJ)</li>
        <li>SOT-428</li>
        <li>TO-252 (JEDEC Transistor Outline 252)</li>
        <li>TO-252AA (only applies to DPAK3 (TO-252-3))</li>
    </ul>
</td>
</tr>
<tr>
  <td>Variants</td>
  <td>
    <ul>
      <li>DPAK3 (TO-252-3, TO-252AA)</li>
      <li>TO-252-5-P1 (5-pin, square and short tab)</li>
      <li>TO-252-5-P2 (5-pin, rounded and longer tab). If there is no suffix listed, it will likely be this variant.</li>
    </ul>
  </td>
</tr>
<tr>
  <td>Similar To</td>
  <td>{{% link text="TO-220" src="../to-220-component-package" %}}</td>
</tr>
<tr>
  <td>Mounting</td>
  <td>SMD</td>
</tr>
<tr>
  <td>Pin Count</td>
  <td>
    <ul>
      <li>3 (DPAK)</li>
      <li>5 (TO-252-5)</li>
    </ul>
  </td>
</tr>
<tr>
  <td>Pitch</td>
  <td>1.27mm (50mill)</td>
</tr>
<tr>
  <td>Solderability</td>
  <td>Quite easy to hand-solder, although the large tab can make things difficult because of it's heatsinking capabilities.</td>
</tr>
<tr>
  <td>Thermal Resistance</td>
  <td>
    <p>TO-252-3 (DPAK)</p>
    <ul>
      <li>\(T_{JA} = 80^{\circ}{\rm C}/W\) (pads only, no copper fill)</li>
    </ul>
    <p>TO-252-5-xx (both P1 and P2 suffixes)</p>
    <ul>
      <li>\(T_{JA} = 59^{\circ}{\rm C}/W\) (pads only, no copper fill)</li>
      <li>\(T_{JA} = 26^{\circ}{\rm C}/W\) (high-wattage land pattern)</li>
      <li>\(T_{JA} = 20^{\circ}{\rm C}/W\) (one square inch of copper surrounding package, connected to ground)</li>
      <li>\(T_{JA} = 7^{\circ}{\rm C}/W\) (high-wattage land pattern with thermal vias to bottom layer)</li>
    </ul>
  </td>
</tr>
<tr>
  <td>Dimensions</td>
  <td>n/a</td>
</tr>
<tr>
<td>3D Models</td>
<td>
  <ul>
    <li><a href="http://www.3dcontentcentral.com/download-model.aspx?catalogid=171&amp;id=444823">DPAK, TO-252AA, by Bill Brooks (this is DPAK3)</a></li>
    <li><a href="http://www.3dcontentcentral.com/download-model.aspx?catalogid=171&amp;id=432344">DPAK-5, by Alexey Olehnovich</a> </li>
  </ul>
</td>
</tr>
<tr>
  <td>Common Uses</td>
  <td>
    <ul>
      <li>MOSFETs</li>
      <li>Linear voltage regulators</li>
    </ul>
  </td>
</tr>
</tbody>
</table>

## Comments

Commonly used for power MOSFETs and high power voltage regulators. Features a large tab/pin which can be soldered directly onto the PCB, providing good heatsinking capabilities.

If DPAK is referred to by itself, with no pin number indication (e.g. DPAK3, DPAK5), it is usually referring to the 3-pin version.

## 3D Renders

{{< img src="to-252-component-package-3d-render.jpg" width="340px" caption="A 3D render of the TO-252 component package."  >}}

{{< img src="to-252-3d-model.jpg" caption="3D model of the TO-252 (DPACK) package."  width="400px" >}}

## Recommended Land Pattern

{{< img src="component-package-to-252-5-recommended-land-pattern.png" caption="The recommended PCB land pattern for the TO-252-5 component package. Image from Ricoh TO-252 Package Information (http://www.ricoh.com/LSI/product_power/pkg/to-252-5-p2.pdf)."  width="500px" >}}

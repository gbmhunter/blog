---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-04-07
draft: false
tags: [ "component packages", "PCB design", "transistor", "TO-92", "Z Package", "TO-226AA", "TO-226AB" ]
title: TO-92 (TO-226) Component Package
type: page
---

## Overview

<table>
  <tbody>
    <tr>
      <td>Name</td>
      <td>TO-92 (Transistor Outline 92)</td>
    </tr>
    <tr>
<td>Synonyms</td>
<td>
  <ul>
    <li>TO-226</li>
    <li>Z Package (Analog Devices)</li>
    <li>29-11 (On Semiconductor)</li>
  </ul>    
</td>
</tr>
<tr>
<td >Variants
</td>
<td >
    <ul>
        <li>TO-92 (TO-226AA)</li>
        <li>TO-92/18 (TO-226AB, TO-92MOD)</li>
    </ul>
</td>
</tr>
<tr>
<td>Similar To</td>
<td>{{% link text="TO-226" src="../to-226-component-package" %}}</td>
</tr>
<tr >
<td >Mounting</td>
<td >TH</td>
</tr>
<tr >
<td >Pin Count</td>
<td >3</td>
</tr>
<tr >
<td >Pitch</td>
<td >Variable, commonly adjusted to 2.54mm.
</td></tr><tr >
<td >Solderability
</td>
<td >Perfect for hand soldering and prototyping! Fits well into breadboards.
</td></tr><tr >
<td >Thermal Resistance
</td>
<td>
  <ul>
    <li>\(220^{\circ}{\rm C}/W\) (package only)</li>
    <li>\(175^{\circ}{\rm C}/W\) (plated through-holes)</li>
    <li>\(145^{\circ}{\rm C}/W\) (plated through-holes and \(0.25inch^2\) pad per lead)</li>
  </ul>
</td>
</tr>
<tr >
<td >Land Area</td>
<td >n/a</td>
</tr>
<tr >
<td >Height</td>
<td >10mm (typical, including body and enough space to get the through-hole legs mounted in the PCB).</td>
</tr>
<tr >
<td >3D Models</td>
<td >n/a</td>
</tr>
<tr >
<td >Common Uses</td>
<td>
  <ul>
    <li>BJTs</li>
    <li>MOSFETs</li>
    <li>Linear regulators</li>
    <li>Active linear analogue temperature sensors</li>
    <li>Digital 1-wire temperature sensors</li>
  </ul>
</td>
</tr>
</tbody>
</table>

## Usage

TO-92 is a very common package for low-power through-hole transistors, MOSFETs, and linear regulators.

## Variants

## TO-92

If a package is just labelled as TO-92, then it is most likely to be the "standard" variant, which is also known as TO-226AA.

{{% figure src="to-92-3-component-package-3d-render.jpg" width="292px" caption="A 3D render of the TO-92-3 component package."  %}}

## TO-92/18

The TO-92/18 variant of the TO-92 package is similar to the standard package (which is just called the TO-92), except that it has a longer body. It is also known as the TO-226AB or TO-92MOD package.

{{% figure src="to-226-component-package-3d-render.jpg" width="407px" caption="A 3D render of the TO-92/18 (TO-226AB) component package."  %}}

## Pin Numbering

Pin numbering is always done from left-to-right, when the flat side of the TO-92 package is facing you and the legs are pointing downwards, as shown in the following diagram:

{{% figure src="package-to-92-3d-render-with-pin-numbering-v2.png" width="516px" caption="A 3D render of the TO-92 component package with pin numbering."  %}}

This is applicable to both the standard TO-92 (TO-226AA) and TO-92/18 (TO-226AB) variants.

## Standard Pinouts

The pinout for JEDEC-named 2N series transistors is standardised as per the following table:

<table>
    <thead>
        <tr>
            <th>Pin Number</th>
            <th>BJT Connection</th>
        </tr>
    <tbody>
        <tr>
            <td>1</td>
            <td>Emitter (E)</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Base (B)</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Collector (C)</td>
        </tr>
    </tbody>
</table>

## Thermal Resistance And Heatsinks

There are a limited range of heatsinks available for the TO-92 component package. Aavid Thermalloy makes two TO-92 heatsinks, one of which is currently available (as of May 2016) on [DigiKey](http://www.digikey.com/product-detail/en/575200B00000G/HS251-ND/269309).

{{% figure src="to-92-clip-on-heatsink-aavid-thermalloy-575200B00000G.png" width="295px" caption="The TO-92 clip-on heatsink by Aavid Thermalloy (part num. 575200B00000G)."  %}}

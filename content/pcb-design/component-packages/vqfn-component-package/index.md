---
author: gbmhunter
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-04-07
draft: false
tags: [ "component package", "PCB design", "VQFN", "QFN" ]
title: VQFN Component Package
type: page
---

## Overview

<table>
<tbody >
<tr >
<td >Name</td>
<td >VQFN (Very-thin Quad Flat Non-leaded)</td>
</tr>
<tr >
<td >Synonyms</td>
<td >n/a</td>
</tr>
<tr >
<td >Variants</td>
<td >n/a</td>
</tr>
<tr >
<td >Similar To</td>
<td>
    <ul>
        <li>QFN</li>
        <li>UQFN</li>
    </ul>
</td>
</tr>
<tr >

<td >Mounting
</td>

<td >SMD
</td>
</tr>
<tr >

<td >Pin Count
</td>

<td >n/a
</td>
</tr>
<tr >

<td >Pitch
</td>

<td >n/a
</td>
</tr>
<tr >

<td >Solderability
</td>

<td >Can be soldered with a soldering iron with moderate experience, as long as it doesn't have a centre pad.
</td>
</tr>
<tr >

<td >Thermal Resistance
</td>

<td >n/a
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

<td >n/a
</td>
</tr>
<tr >

<td >3D Models
</td>

<td >n/a
</td>
</tr>
<tr >

<td >Common Uses
</td>

<td >ICs
</td>
</tr>
</tbody>
</table>

## Comments

These packages don't have leads, instead all of the pins are present as pads the run around the outside of the package. They are kind of a intermediary between leaded packages and ball-grid arrays. The pads are mostly on the bottom of the chip, although a little of the pad creeps around the corner and is visible from the side, hence they are 'kind of' hand solderable. However, the side section of the pad is not normally tinned (well not in the 'sawn' version of the package), which means it can be hard to get solder to stick to it. Not recommended for DIY purposes unless you have an oven! However in a commercial situation they are better since they offer better electrical and thermal characteristics than leaded packages. The improved thermal characteristic mainly come from the large metal pad the covers the bottom centre of the chip. This is either connected to ground or left floating, but offers great thermal conductivity when it is soldered (this definitely requires an oven to do). Check out the nice [VQFN Design Guide](http://www.cmlmicro.com/products/datasheets/docs/VQFN_PCB_DesignGuide_2.pdf) by [CML Micro](http://www.cmlmicro.com/).

## Photos

{{< img src="vqfn-28-component-package-photo-top-bottom.jpg" width="392px" caption="A photo of the VQFN-28 component package."  >}}
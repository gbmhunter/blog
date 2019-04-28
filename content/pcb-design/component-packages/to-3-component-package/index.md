---
author: gbmhunter
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-04-07
draft: false
tags: [ "component package", "PCB design", "transistor", "TO-3", "TO-204AD" ]
title: TO-3 Component Package
type: page
---

## Overview

<table>
<tbody>
<tr>
    <td>Name</td>
    <td>Transistor Outline 3</td>
</tr>
<tr>
    <td>Synonyms</td>
    <td>TO-204AD (TO-3-2L)</td>
</tr>
<tr>
    <td>Variants</td>
    <td>
        <ul>
            <li>TO-3-2L (2 pins + case)</li>
            <li>TO-3-4L (4 pins + case)</li>
            <li>TO-204 AA (TO-3-2L with 1.0mm pins)</li>
            <li>TO-204 AE (TO-3-2L with 1.5mm pins)</li>
            <li>TO-204 AD</li>
        </ul>
    </td>
</tr>
<tr >
<td >Similar To</td>
<td >TO-23</td>
</tr>
<tr >
<td >Mounting</td>
<td >TH</td>
</tr>
<tr >

<td >Pin Count
</td>

<td >3, 5, 8 (including the case)
</td>
</tr>
<tr >

<td >Pitch
</td>

<td >10.9mm (0.430") (TO-3-2L)
</td>
</tr>
<tr >

<td >Solderability
</td>

<td >Easy to solder by hand.
</td>
</tr>
<tr>
    <td>Thermal Resistance</td>
    <td>
        <ul>
            <li>\(T_{JC} = 0.83-1.4^{\circ}{\rm C}/W\) (depending on exact component)</li>
            <li>\(T_{CH} = 0.40^{\circ}{\rm C}/W\) (using thermal grease)</li>
            <li>\(T_{CH} = 1.00^{\circ}{\rm C}/W\) (using thermal grease with mica insulator)</li>
            <li>\(T_{JA} = 30.0^{\circ}{\rm C}/W\) (typical socket mount)</li>
        </ul>
    </td>
</tr>
<tr >

<td >Dimensions
</td>

<td>\(39.94x26.67=1065mm^2\) (smallest square area to enclose package)</td>
</tr>
<tr>
    <td>Height</td>
    <td>
        <p>All variants of the TO-3 package seem to have the same height.</p>
        <p>\(6.35-11.43mm (0.250-0.450")\) (when mounted flat with no standoff on PCB).</p>
    </td>
</tr>
<tr>
<td >3D Models
</td>

<td >n/a
</td>
</tr>
<tr>
    <td>Common Uses</td>
    <td>
        <ul>
            <li>Transistors (TO-3-2L)</li>
            <li>Linear regulators (TO-3-2L)</li>
            <li>Op-amps (TO-3-8L)</li>
            <li>Diodes (TO-3-2L)</li>
        </ul>
    </td>
</tr>
</tbody>
</table>

## Comments

This package comes in many different pin variants. The 2-pinned device, called the TO-3-2L is the most common.

The TO-3 package has a very low junction-to-case thermal resistance (`\(0.8-1.5^{\circ}{\rm C}/W\)`). The TO-3 package is flange mount, which facilitates easy heatsinking. They are commonly screwed onto the metal enclosure of the device (you can sometimes see them on the outside of the enclosure!) for cheap and effective heatsinking.

Large heatsinks designed for the TO-3 package can have thermal resistances as low as `\(0.4^{\circ}{\rm C/W}\)`. The thermal resistance between the device case and the heatsink is normally between `\(0.5-1.7^{\circ}{\rm C/W}\)`.

## Photos

{{< figure src="/images/2015/04/to-3-8-component-package-photo-top-bottom.jpg" width="401px" caption="A photo of the TO-3-8 component package."  >}}

## Other Images

{{< gallery dir="/images/electronics-packages/to-3" />}}
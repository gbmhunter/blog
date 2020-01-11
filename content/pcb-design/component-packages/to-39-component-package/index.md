---
author: gbmhunter
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-04-07
draft: false
tags: [ "component packages", "PCB design", "transistor", "TO-39", "TO-205AD" ]
title: TO-39 Component Package
type: page
---

## Overview

<table>
<tbody>
<tr>
    <td>Name</td>
    <td >TO-39 (Transistor Outline 39)</td>
</tr>
<tr>
<td>Synonyms</td>
<td>
    <ul>
        <li>TO-205AD</li>
        <li>H (Linear Technology Package Code)</li>
    </ul>
</td>
</tr>
<tr>
    <td>Variants</td>
    <td>
        <ul>
            <li>TO-39-3</li>
            <li>TO-39-4</li>
            <li>TO-39-6</li>
            <li>TO-39-8</li>
        </ul>
        <p>The height can also vary (e.g. low profile and high profile, see comments).</p>
    </td>
</tr>
<tr>
    <td>Similar To</td>
    <td >TO-18</td>
</tr>
<tr>
    <td>Mounting</td>
    <td>TH</td>
</tr>
<tr >
<td >Pin Count
</td>
<td >3-10 (most common pin count is 3)
</td></tr><tr >
<td >Pitch
</td>
<td >2.54mm (100mil)
</td></tr><tr >
<td >Solderability
</td>
<td >Easy to solder by hand.
</td>
</tr>
<tr>
    <td>Thermal Resistance</td>
    <td>
        <ul>
            <li>\(T_{JC} = 15^{\circ}{\rm C}/W\)</li>
            <li>\(T_{JA} = 150^{\circ}{\rm C}/W\) (mounted in the standard way to the PCB)</li>
        </ul>
    </td>
</tr>
<tr>
<td>Land Area</td>
<td >\(88mm^2\) (smallest square area to enclose package)
</td></tr><tr >
<td >Height
</td>
<td >\(3.18mm\) (when mounted flat with no standoff on PCB)
</td></tr><tr >
<td >3D Models
</td>
<td >n/a
</td>
</tr>
<tr>
    <td >Common Uses
    </td>
    <td>
        <ul>
            <li>Transistors</li>
            <li>UV LEDs</li>
            <li>IR Thermometers</li>
        </ul>
    </td>
</tr>
</tbody></table>

## Comments

The TO-39 package is a metallic can package used for hermetically sealing semiconductor devices. It usually has three legs (the TO-39-3 variant), but variants with up to 10 legs are in use. The metal case can be gold coated. As a large through-hole package, it is being used less in recent years, although it still finds applications with high-end, sensitive electronic devices such as UV LEDs and IR thermometers.

The TO-39 package has a small polarising tab on the side of the metal case. However this is merely an indication and does not prevent the user from inserting the package incorrectly. The 3-pin variant can only be inserted in one way because it's 3 pins are not symmetric around the centre (it's the same as the 4-pin version, but with one pin missing).

The TO-39 package comes in different heights, two of which are commonly called low profile and high profile.

The ground pin of the TO-39 package is usually connected to the metal case. The TO-39 can sit directly on the PCB, so it's important to consider that it could short out any unmasked nets running underneath the package. This also applies to the pads surrounding the non-ground pins. I measured the clearance around the non-ground pins and the maximum diameter of the pad surrounding the hole was about 1.60mm before it would short to ground. The pad on the other side of the PCB can be as large as you want.

You can get clip-on heatsinks for the TO-39 package with thermal resistances of around `\(30-40^{\circ}{\rm C}/W\)`, which drops the `\(T_{JA}\)` to around `\(45-55^{\circ}{\rm C}\)`.

## Photos

{{< img src="to-39-component-package-photo.jpg" width="265px" caption="A photo of the TO-39 component package."  >}}

## Other Images

{{< gallery dir="images/electronics-packages/to-39" />}}
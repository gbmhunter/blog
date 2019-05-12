---
author: gbmhunter
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-03-24
draft: false
tags: [ "component packages", "PCB design", "WLCSP", "LCSPW", "BGA" ]
title: WLCSP Component Package
type: page
---

## Overview


<table>
<tbody >
<tr >
<td >Name</td>
<td >Wafer-level Chip-scale Package (WLCSP)</td>
</tr>
<tr >
<td >Synonyms</td>
<td >
<ul>
	<li>LCSPW (W has changed position)</li>
</ul>
</td>
</tr>
<tr >

<td >Variants
</td>

<td > n/a
</td>
</tr>
<tr >
<td >Similar To</td>
<td>
	<ul>
		<li>{{% link src="../bga-component-package/_index.md" text="BGA" %}}</li>
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

<td >4-144
</td>
</tr>
<tr >

<td >Pitch
</td>

<td >0.3-0.5mm
</td>
</tr>
<tr >

<td >Solderability
</td>

<td >Cannot be soldered with a soldering iron. Requires reflow oven or infrared heater.
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

<td > n/a
</td>
</tr>
<tr >

<td >Common Uses
</td>

<td >
<ul>
<li>Op-amps</li>
</ul>
</td>
</tr>
</tbody>
</table>

## Comments

The WLCSP package can either be rectangular or square in shape.

The pin numbering follows the standard {{% link text="BGA" src="../bga-component-package/_index.md" %}} convention, the columns are labelled with letters (A, B, C, ...) and the rows with numbers (1, 2, 3, ...). Thus pins are referred to as A1, C3, D11, e.t.c.

The rows of bumps maybe aligned in a grid or offset, again like BGA.

As of March 2015, WLCSP offers the smallest possible footprint of any component package for a particular die ((https://www.fairchildsemi.com/application-notes/AN/AN-5075.pdf)).

## Photosensitivity

Unusually, **the WLCSP package is sensitive to high-intensity, long wavelength light**. This was due to the photoelectric effect, where the light hitting the top and sides of the semiconductor-based package causes current to flow in the die and can disrupt proper operation.

WLCSP packages can come with a backside laminate (BSL) which blocks light from disrupting the IC. Fairchild Semiconductor explain that having a BSL is not significant for board-level reliability.

{{< img src="paragraph-on-backside-laminate-for-wlcsp-package-farchild-an-5075.png" width="517px" caption="Paragraph on backside laminate (BSL) for WLCSP component packages. Image from https://www.fairchildsemi.com/application-notes/AN/AN-5075.pdf."  >}}

## RaspberryPi 2 Bug

The photosensitivity of the WLCSP package manifested itself as a bug on the RaspberryPi 2. The regulator that provided power to the RaspberryPi 2 core was in a WLCSP package, and when exposed to a high-intensity, long wavelength light (like a xenon camera flash), the RaspberryPi 2 would reset.

The current caused by "normal" camera flashes do not seem to be able to permanently damage the chip.
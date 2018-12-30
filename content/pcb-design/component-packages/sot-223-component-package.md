---
author: gbmhunter
date: 2015-01-08 03:04:07+00:00
draft: false
tags: [ "component package", "SOT-223", "DCQ", "DCY", "MP04A", "PG-SOT-223-4", "TO-261-4", "R-PDSO-G6", "footprint", "land pattern", "PCB", "dimensions", "linear regulator" ]
title: SOT-223 Component Package
type: page
---

## Overview

<table>
<tbody>
<tr>
    <td>Name</td>
    <td>SOT-223 (Small-outline Transistor 223)</td>
</tr>
<tr>
    <td>Synonyms</td>
    <td>
        <ul>
            <li>DCQ (SOT-223-5, Texas Instruments)</li>
            <li>DCY (SOT-223, Texas Instruments)</li>
            <li>MP04A (National Semiconductor)</li>
            <li>PG-SOT-223-4 (Infineon Technologies)</li>
            <li>R-PDSO-G6 (SOT-223-5, Texas Instruments)</li>
            <li>ST Package (Analog Devices)</li>
            <li>TO-261-4</li>
        </ul>
    </td>
</tr>
<tr>
    <td>Variants</td>
    <td>
        <ul>
            <li>SOT-223-3 (3 pin excl. tab)</li>
            <li>SOT-223-4 (4 pin excl. tab)</li>
            <li>SOT-223-5 (5 pin excl. tab)</li>
        </ul>
    </td>
</tr>
<tr>
    <td>Similar To</td>
    <td>
        <ul>
            <li><a href="/pcb-design/component-packages/sot-23-component-package">SOT-23</a></li>
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

<td >3, 4, 5 (excl. tab)
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

<td >Easily solderable by hand
</td>
</tr>
<tr >

<td >Thermal Resistance
</td>

<td>
    <b>SOT-223-3</b>
    <ul>
        <li>\(T_{JA} = 174^{\circ}{\rm C}/W\) (standard footprint)</li>
        <li>\(T_{JA} = 75^{\circ}{\rm C}/W\) (\(300mm^2\) heatsink area)</li>
        <li>\(T_{JA} = 63^{\circ}{\rm C}/W\)(\(600mm^2\) heatsink area)</li>
        <li>\(T_{JA} = 27^{\circ}{\rm C}/W\)(one square inch copper fill surrounding package)</li>
    </ul>
    <b>SOT-223-5</b>
    <ul>
        <li>\(55-165^{\circ}{\rm C}/W\) (see the SOT-223-5 section below)</li>
    </ul>
</td>
</tr>
<tr>
<td>Dimensions</td>
<td>n/a</td>
</tr>
<tr>
<td>3D Models</td>
<td>n/a</td>
</tr>
<tr >

<td >Common Uses
</td>

<td >
    <ul>
        <li>MOSFET's</li>
        <li>Load switches</li>
        <li>High-power linear regulators</li>
        <li>Current sources</li>
    </ul>
</td>
</tr>
</tbody>
</table>

## Conflicting Naming Conventions

**WARNING:** Some manufacturers use the term SOT-223-3 to refer to the 3-pin, 1 -tab package, while others count the tab as a "pin", and so name it SOT-223-4. However this conflicts with the first lot of manufacturers who use the term SOT-223-4 to refer to the package with 4 pins and 1 tab. In summary, BE CAREFUL.

This page associates the x in SOT-223-x to stand for the **number of pins excluding the tab**. This is the most popular convention.

## SOT-223-3

The SOT-223-3 (TO-261AA) component package is the most common variant within the SOT-223 family. It looks similar to the SOT-23 package, but with a tab on one side instead of legs.

{{< figure src="/images/2015/01/to-261aa-sot-223-component-package-3d-model.jpg" width="341px" caption="A 3D render of the TO-261AA (SOT-223-3) component package."  >}}

It is commonly used for medium-power linear regulators and load switches.

## Thermal Resistance

Texas Instruments gives the following thermal resistance data for the SOT-223-3 package (taken from http://www.ti.com/lit/ds/symlink/tps7b6933-q1.pdf, **as of Dec 2017, URL is unavailable**).

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Symbol</th>
            <th>Value</th>
        </tr>
    </thead>
<tbody >
<tr >
<td >Junction-to-ambient thermal resistance
</td>

<td >\(R_{\theta JA}\)
</td>

<td >\(64.2^{\circ}C/W\)
</td>
</tr>
<tr >

<td >Junction-to-case (top) thermal resistance
</td>

<td >\(R_{\theta JC(top)}\)
</td>

<td >\(46.8^{\circ}C/W\)
</td>
</tr>
<tr >

<td >Junction-to-board thermal resistance
</td>

<td >\(R_{\theta JB}\)
</td>

<td >\(13.3^{\circ}C/W\)
</td>
</tr>
<tr >

<td >Junction-to-top characterisation parameter
</td>

<td >\(R_{\psi JT}\)
</td>

<td >\(6.3^{\circ}C/W\)
</td>
</tr>
<tr >

<td >Junction-to-board characterisation parameter
</td>

<td >\(R_{\psi JB}\)
</td>

<td >\(13.2^{\circ}C/W\)
</td>
</tr>
</tbody>
</table>

All of the parameters in the above table were measured with the SOT-223-3 package soldered to a _JEDEC standard high-K profile, JESD 51-7, 2s2p four layer board with 2-oz copper_. The copper pad was soldered to the thermal land pattern.

{{< figure src="/images/2015/01/to-216aa-sot-223-component-package-thermal-resistance.jpg" width="400px" caption="The thermal resistance of the TO-261AA (SOT-223-3) component package for various PCB footprints."  >}}

## Standard Linear Regulator Pinout

The SOT-223-3 package is commonly used for small, medium-power linear regulators. There is a de-facto standard pinout that many manufacturers use when incorporating a linear regulator into the SOT-223-3 package:

{{< figure src="/images/2015/01/sot-223-3-component-package-footprint-layout-example-linear-regulator-with-caps.png" width="441px" caption="The de-facto standard pinout for a linear regulator inside a SOT-223-3 package. This image also shows the standard PCB footprint used to achieve a low thermal resistance. Image from http://www.ti.com/."  >}}

## Standard Load Switch Pinout

The SOT-223-3 package is commonly used for smaller low and high-side load switches. As such, there is a de-facto standard pinout that many manufacturers use for load switches in the SOT-223-3 package:

{{< figure src="/images/2015/01/sot-223-4-component-package-load-switch-typical-pinout.png" width="469px" caption="The de-facto standard pinout for a load switch in a SOT-223-3 package. Image from http://www.infineon.com/."  >}}

## SOT-223-4

This variant can be confused with the three pin and one pad variant (SOT-223-3) if you decide to count the pad as well as the pins in the number.

{{< figure src="/images/2015/01/sot-223-4-component-package-3d-render.jpg" width="268px" caption="A 3D render of the SOT-223-4 component package. Image from http://www.datasheetdir.com/."  >}}

## SOT-223-5

## Dimensions

Below are the dimensions of the SOT-223-5 package as specified by Texas Instruments.

{{< figure src="/images/2015/01/sot-223-5-component-package-dimensions-ti.png" width="695px" caption="The dimensions of the SOT-223-5 component package. Image from http://www.ti.com/."  >}}

## Footprint (Land Pattern)

Below is the recommended footprint (land pattern) for the SOT-223-5 component package as specified by Texas Instruments.

{{< figure src="/images/2015/01/sot-223-5-component-package-recommended-footprint-land-pattern-ti.png" width="858px" caption="A recommended footprint (land pattern) for the SOT-223-5 component package. Image from http://www.ti.com/."  >}}

## Thermal Resistance

Below is a graph showing the thermal resistance of the SOT-223-5 package with varying copper area.

{{< figure src="/images/2015/01/sot-223-5-component-package-thermal-resistance-vs-copper-area-graph-ti.png" width="1059px" caption="Graph of thermal resistance vs. copper area for the SOT-223-5 component package. Image from http://www.ti.com/."  >}}

As you can see, as the copper area increases, the thermal resistance decreases asymptotically to around `\(55^{\circ}{\rm C}/W\)`.

---
author: gbmhunter
date: 2015-04-07 01:19:35+00:00
draft: false
title: TO-92 (TO-226) Component Package
type: page
url: /pcb-design/component-packages/to-92-to-226-component-package
---

# Overview

<table style="width: 600px;" ><tbody ><tr >
<td >Name
</td>
<td >TO-92 (Transistor Outline 92)
</td></tr><tr >
<td >Synonyms
</td>
<td >  * Z Package (Analog Devices)  * 29-11 (On Semiconductor)
</td></tr><tr >
<td >Variants
</td>
<td >  * TO-92 (TO-226AA)  * TO-92/18 (TO-226AB, TO-92MOD)
</td></tr><tr >
<td >Similar To
</td>
<td >TO-226
</td></tr><tr >
<td >Mounting
</td>
<td >TH
</td></tr><tr >
<td >Pin Count
</td>
<td >3
</td></tr><tr >
<td >Pitch
</td>
<td >Variable, commonly adjusted to 2.54mm.
</td></tr><tr >
<td >Solderability
</td>
<td >Perfect for hand soldering and prototyping! Fits well into breadboards.
</td></tr><tr >
<td >Thermal Resistance
</td>
<td >  * [latex]220^{\circ}{\rm C}/W[/latex] (package only)  * [latex]175^{\circ}{\rm C}/W[/latex] (plated through-holes)  * [latex]145^{\circ}{\rm C}/W[/latex] (plated through-holes and [latex]0.25inch^2[/latex] pad per lead)
</td></tr><tr >
<td >Land Area
</td>
<td >n/a
</td></tr><tr >
<td >Height
</td>
<td >10mm (typical, including body and enough space to get the through-hole legs mounted in the PCB).
</td></tr><tr >
<td >3D Models
</td>
<td >n/a
</td></tr><tr >
<td >Common Uses
</td>
<td >  * BJTs  * MOSFETs  * Linear regulators  * Active linear analogue temperature sensors  * Digital 1-wire temperature sensors
</td></tr></tbody></table>

# Usage

TO-92 is a very common package for low-power through-hole transistors, MOSFET's, and linear regulators.

# Variants

## TO-92

If a package is just labelled as TO-92, then it is most likely to be the "standard" variant, which is also known as TO-226AA.

{{< figure src="/images/2015/04/to-92-3-component-package-3d-render.jpg" width="292px" caption="A 3D render of the TO-92-3 component package." caption-position="bottom" >}}

## TO-92/18

The TO-92/18 variant of the TO-92 package is similar to the standard package (which is just called the TO-92), except that it has a longer body. It is also known as the TO-226AB or TO-92MOD package.

{{< figure src="/images/2015/04/to-226-component-package-3d-render.jpg" width="407px" caption="A 3D render of the TO-92/18 (TO-226AB) component package." caption-position="bottom" >}}

# Pin Numbering

Pin numbering is always done from left-to-right, when the flat side of the TO-92 package is facing you and the legs are pointing downwards, as shown in the following diagram:

{{< figure src="/images/2015/04/package-to-92-3d-render-with-pin-numbering-v2.png" width="516px" caption="A 3D render of the TO-92 component package with pin numbering." caption-position="bottom" >}}

This is applicable to both the standard TO-92 (TO-226AA) and TO-92/18 (TO-226AB) variants.

# Standard Pinouts

The pinout for JEDEC-named 2N series transistors is standardised as per the following table:

<table ><tbody ><tr >
<td >**Pin Number**
</td>
<td >**BJT Connection**
</td></tr><tr >
<td >1
</td>
<td >Emitter (E)
</td></tr><tr >
<td >2
</td>
<td >Base (B)
</td></tr><tr >
<td >3
</td>
<td >Collector (C)
</td></tr></tbody></table>

# Thermal Resistance And Heatsinks

There are a limited range of heatsinks available for the TO-92 component package. Aavid Thermalloy makes two TO-92 heatsinks, one of which is currently available (as of May 2016) on [DigiKey](http://www.digikey.com/product-detail/en/575200B00000G/HS251-ND/269309).

{{< figure src="/images/2015/04/to-92-clip-on-heatsink-aavid-thermalloy-575200B00000G.png" width="295px" caption="The TO-92 clip-on heatsink by Aavid Thermalloy (part num. 575200B00000G)." caption-position="bottom" >}}

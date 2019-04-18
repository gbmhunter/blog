---
author: gbmhunter
date: 2015-04-06 20:16:54+00:00
draft: false
title: SOT-23 Component Package
type: page
url: /pcb-design/component-packages/sot-23-component-package
---

## Overview

<table style="width: 600px;" ><tbody ><tr >
<td >Name
</td>
<td >SOT-23 (Small Outline Transistor 23)
</td></tr><tr >
<td >Synonyms
</td>
<td >

<p><strong>SOT-23-3</strong></p>

<ul>
<li>Micro3</li>

<li>SC-59 (JEITA)</li>

<li>SOT-23 (TopLine)</li>

<li>SOT-346</li>

<li>SSOT3 (Fairchild Semiconductor)</li>

<li>TO-236AA (JEDEC)</li>

<li>TO-236AB (NXP)</li>
</ul>

<p><strong>SOT-23-5</strong></p>

<ul>
<li>SC-74A (JEITA)</li>

<li>SOT-753</li>

<li>SOT-25 (TopLine)</li>
</ul>

<p><strong>SOT-23-6</strong></p>

<ul>
<li>SC-74 (JEITA)</li>

<li>SMT6 (ROhm)</li>

<li>SOT-26 (SOT-23-6 by TopLine)</li>

<li>SOT-457 (JEDEC)</li>
</ul>

<p><strong>SOT-23-8</strong></p>

<ul>
<li>RJ-8 (Analog Devices)</li>

<li>SM8 (Diodes Incorporated)</li>

<li>SOT-28 (TopLine)</li>
</ul>
</td></tr><tr >
<td >Variants
</td>
<td >There are 3-pin (SOT-23-3), 5-pin (SOT-23-5), 6-pin (SOT-23-6) and 8-pin (SOT-23-8) variants.
</td></tr><tr >
<td >Similar To
</td>
<td >n/a
</td></tr><tr >
<td >Mounting
</td>
<td >SMD
</td></tr><tr >
<td >Pin Count
</td>
<td >3, 5, 6, 8
</td></tr><tr >
<td >Pitch
</td>
<td >
<ul>
<li>0.65mm (SOT-23-8)</li>

<li>0.95mm (SOT-23-3, SOT-23-5, SOT-23-6)</li>
</ul>
</td></tr><tr >
<td >Solderability
</td>
<td >Easy to hand-solder if you have had a bit of practise with surface mount devices before. Easy to solder with infrared or reflow techniques.
</td></tr><tr >
<td >Thermal Resistance
</td>
<td >SOT-23-5: 230°C/W
</td></tr><tr >
<td >Dimensions
</td>
<td >The body of all SOT-23-x packages is 1.30x2.92mm.
</td></tr><tr >
<td >3D Models
</td>
<td >n/a
</td></tr><tr >
<td >Common Uses
</td>
<td >
<ul>
<li>Linear regulators</li>
<li>Op-amps</li>
<li>Transistors</li>
<li>MOSFET's</li>
<li>Diodes (including diode arrays)</li>
<li>Battery management IC's</li>
<li>Analogue active linear temperature sensors</li>
</ul>
</td></tr></tbody></table>

## Comments

A very common surface-mount package that is used for a huge number of functions. Variations exist with 3 to 8 pins.

The SOT-23 family probably has the largest number of differing variant names which all refer to the same packages.

{{< figure src="/images/2015/04/sot-23-component-package-photo.jpg" width="262px" caption="A 3D render of the SOT-23 component package."  >}}

The number of pins used not only depends on the required number of connections but also the desired thermal resistance (high-current SOT23 devices may use more than one pin for the same net to improve thermal performance). Used commonly for FET's transistors, diodes, and other components only having a small number of leads. SparkFun makes a [SOT-23 to DIP breakout board](http://www.sparkfun.com/products/717).

{{< figure src="/images/2015/04/component-package-sot-23-6-sc-74a-sot-457-3d-render.jpg" width="297px" caption="A 3D render of the SOT-23-6 (SOT-457) component package."  >}}

## Dimensions

{{< figure src="/images/2015/04/sot-23-8-component-package-dimensions-diodes-incorporated.png" width="1288px" caption="Dimensions for the SOT-23-8 component package. Image from http://www.diodes.com/."  >}}

## Footprint

The 3, 5, and 6 pin SOT-23 variants have the same pitch of 0.95mm, and all are compatible with the 6 pin footprint (which means you can use a SOT-23-6 adapter board for the 3 and 5 pin variants also).

However, the 8 lead variant, SOT-23-8, has a smaller pitch of 0.65mm

{{< figure src="/images/2015/04/sot-23-8-component-package-recommended-footprint-diodes-incorporated.png" width="1000px" caption="A recommended footprint for the SOT-23-8 component package. Image from http://www.diodes.com/."  >}}

## SOT-23-6

## Non-standard Pin Numbering

{{% warning %}}
The SOT-23-6 package by Rohm (a.k.a IMT4, SOT-457, SMT6) has non-standard, clockwise pin numbering starting at the top right pin.
{{% /warning %}}

{{< figure src="/images/2015/04/rohm-sot-457-imt4-sot-23-6-component-package-non-standard-clockwise-pin-numbering-annotated.png" width="645px" caption="The Rohm SOT-23-6 component package (a.k.a. SOT-457, IMT4) with non-standard pin numbering."  >}}

Why you'd ever number the package in that manner is beyond me. It's dangerous, and bound to cause PCB designers to do board respins!

## Other Images

{{< figure src="/images/electronics-packages/package-dimensions-sot23-3.gif" caption="The dimensions of the SOT-23-5 component package."  width="500px" >}}

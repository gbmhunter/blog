---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, PCB Design, Component Packages ]
date: 2015-04-06
description: Variants, pin counts, pitches, solderability, thermal resistances, dimensions, land patterns, 3D models and more info for the SOT-23 component package.
draft: false
lastmod: 2020-01-15
tags: [ component packages, PCB design, RJ-3, RJ-5, RJ-6, RJ-8, SOT-23, SOT-23-3, SOT-23-5, SOT-23-6, SOT-23-6, Micro3, SC-59, SC-59A, SOT-346, SSOT3, SOT-753, SOT-457, SC-74A, TO-236AA, TO-236AB, JEDEC, JEITA, EIAJ, SMT3, SOT-26, SM8, Analog Devices ]
title: SOT-23 Component Package
type: page
---

## Overview

<table>
  <tbody>
    <tr>
      <td>Name</td>
      <td>SOT-23 (Small Outline Transistor 23)</td>
    </tr>
    <tr>
      <td>Synonyms</td>
      <td>
        <p><strong>SOT-23-3</strong></p>
        <ul>
        <li>Micro3 (Infineon, International Rectifier)</li>
        <li>MPAK (NXP Semiconductors)</li>
        <li>RJ-3 (Analog Devices)</li>
        <li>SC-59 (JEITA/EIAJ)</li>
        <li>SC-59A (JEITA/EIAJ)</li>
        <li>SMT3 (NXP Semiconductors, ROHM Semiconductor)</li>
        <li>SOT-23 (if no additional number is provided, assume SOT-23 has 3 pins)</li>
        <li>SOT-346</li>
        <li>SSOT3 (Fairchild Semiconductor)</li>
        <li>TO-236AA (JEDEC)</li>
        <li>TO-236AB (JEDEC)</li>
        </ul>
        <p><strong>SOT-23-5</strong></p>
        <ul>
          <li>RJ-5 (Analog Devices)</li>
          <li>SC-74A (JEITA)</li>
          <li>SOT-753</li>
          <li>SOT-25 (TopLine)</li>
        </ul>
        <p><strong>SOT-23-6</strong></p>
        <ul>
          <li>RJ-6 (Analog Devices)</li>
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
        <p>{{< md >}}`R-PDSO-G` is the JEDEC package designator for SOT-23 in all it's variants[^jedec-mo-178-c].{{< /md >}}</p>
      </td>
    </tr>
    <tr>
      <td>Variants</td>
      <td>There are 3-pin (SOT-23-3), 5-pin (SOT-23-5), 6-pin (SOT-23-6) and 8-pin (SOT-23-8) variants.</td>
    </tr>
    <tr>
      <td>Similar To</td>
      <td>n/a
    </td>
    </tr>
    <tr>
      <td>Mounting</td>
      <td>SMD
    </td>
    </tr>
    <tr>
      <td>Pin Count</td>
      <td>3, 5, 6, 8</td>
    </tr>
    <tr>
      <td>Pitch</td>
      <td>
        <ul>
          <li>0.95mm (SOT-23-3, SOT-23-5, SOT-23-6)</li>
          <li>0.65mm (SOT-23-8)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Solderability</td>
      <td>Easy to hand-solder if you have had a bit of practise with surface mount devices before. Easy to solder with infrared or reflow techniques.</td>
    </tr>
    <tr>
      <td>Thermal Resistance</td>
      <td>
        <ul>
          <li>SOT-23-3: 500°C/W</li>
          <li>SOT-23-5: 230°C/W</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Dimensions</td>
      <td>
      The body of all SOT-23-x packages is 1.30x2.92mm.
      Component Area = 7.98mm² (2.9x2.75mm)  
      Standard Footprint Land Area = 11.22mm² (3.3x3.4mm)
      </td>
    </tr>
    <tr>
      <td>3D Models</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Common Uses</td>
      <td>
        <ul>
          <li>Linear regulators</li>
          <li>Op-amps</li>
          <li>Transistors</li>
          <li>MOSFETs</li>
          <li>Diodes (including diode arrays)</li>
          <li>Battery management ICs</li>
          <li>Analogue active linear temperature sensors</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Comments

`SOT-23` is a very common surface-mount package that is used for a huge number of functions. Variations exist with 3 to 8 pins. When surface mount components were just beginning to gain popularity, `SOT-23` was introduced to replace the well used through-hole 3-pin TO-18 and TO-92 transistor packages, and so the first variant of SOT-23 was the 3 leaded version (SOT-23-3, officially called TO-236AA by JEDEC).

The SOT-23 family probably has the largest number of differing variant names which all refer to the same packages (see the synonym section above).

{{% figure src="sot-23-component-package-photo.jpg" width="200px" caption="A 3D render of the SOT-23 component package." %}}

The number of pins used not only depends on the required number of connections but also the desired thermal resistance (high-current SOT23 devices may use more than one pin for the same net to improve thermal performance). Used commonly for FETs transistors, diodes, and other components only having a small number of leads. SparkFun makes a [SOT-23 to DIP breakout board](http://www.sparkfun.com/products/717).

{{% figure src="component-package-sot-23-6-sc-74a-sot-457-3d-render.jpg" width="200px" caption="A 3D render of the SOT-23-6 (SOT-457) component package."  %}}

The 3, 5, and 6 pin SOT-23 variants have the same pitch of 0.95mm, and all are compatible with the 6 pin footprint (which means you can use a SOT-23-6 adapter board for the 3 and 5 pin variants also).

JEDEC formalized the dimensions of the SOT-23 package (and all it's variants) in the MO-178 document (with package designator `R-PDSO-G`). After registering, you can download this document for free from (https://www.jedec.org/standards-documents/docs/mo-178-c)[https://www.jedec.org/standards-documents/docs/mo-178-c].

The [SOT-23F package](../sot-23f-component-package/) is closely related to the `SOT-23` put has flat leads instead of gull-wing leads.

## What Is The Difference Between TO-236AA And TO-236AB?

Both `TO-236AA` and `TO-236AB` are official JEDEC names for the SOT-23-3 package. An image comment on Wikipedia[^wikipedia-inductiveload] states that the `TO-236AB` package is approximately 0.1mm higher. However it is hard to verify this claim by comparing manufacturer package dimensions, as 0.1mm is well with the manufacturing tolerances.

## SOT-23-3

The `SOT-23-6` has a pitch of 0.95mm.

**Dimensions**

{{% figure src="package-dimensions-sot23-3.gif" caption="The dimensions of the SOT-23-3 component package."  width="500px" %}}

## SOT-23-5

Also called _SOT-753_ or _SC-74A_.

## SOT-23-6

The `SOT-23-6` has a pitch of 0.95mm. Also called _SC-74_.

### Non-standard Pin Numbering

{{% warning %}}
The SOT-23-6 package by Rohm (a.k.a IMT4, SOT-457, SMT6) has non-standard, clockwise pin numbering starting at the top right pin.
{{% /warning %}}

{{% figure src="rohm-sot-457-imt4-sot-23-6-component-package-non-standard-clockwise-pin-numbering-annotated.png" width="645px" caption="The Rohm SOT-23-6 component package (a.k.a. SOT-457, IMT4) with non-standard pin numbering."  %}}

Why you'd ever number the package in that manner is beyond me. It's dangerous, and bound to cause PCB designers to do board respins!


## SOT-23-8

**Dimensions**

{{% figure src="sot-23-8-component-package-dimensions-diodes-incorporated.png" width="800px" caption="Dimensions for the SOT-23-8 component package. Image from http://www.diodes.com/." %}}

**Recommended Footprint**

{{% warning %}}
The `SOT-23-8` has a smaller pitch of 0.65mm compared to the `SOT-23-3`, `SOT-23-5`, and `SOT-23-6` which all have a pitch of 0.95mm. This is to fit the 4 pins on each side, the original `SOT-23` design (which is a synonym for `SOT-23-3`) only had room for a maximum of 3 pins per side.
{{% /warning %}}

{{% figure src="sot-23-8-component-package-recommended-footprint-diodes-incorporated.png" width="1000px" caption="A recommended footprint for the SOT-23-8 component package. Image from http://www.diodes.com/."  %}}

## References

[^jedec-mo-178-c]: [https://www.jedec.org/standards-documents/docs/mo-178-c](https://www.jedec.org/standards-documents/docs/mo-178-c)
[^wikipedia-inductiveload]: [https://commons.wikimedia.org/wiki/File:TO-236AA_Front_Top.svg](https://commons.wikimedia.org/wiki/File:TO-236AA_Front_Top.svg) 
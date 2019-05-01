---
author: gbmhunter
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2014-12-04
draft: false
tags: [ "component package", "PCB design", "QFN", "LFCSP", "MLF", "DO-214AC", "solderpaste", "soldermask", "singulation", "voiding", "lead styles", "JEDEC" ]
title: QFN Component Package
type: page
---

## Overview

<table >
<tbody >
<tr>
<td >Name</td>
<td >Quad-flat No-leads Package
</td>
</tr>
<tr >
<td >Synonyms</td>
<td >
  <ul>
    <li><strong>2077-02</strong> | Freescale QFN-16 Pins-5x3 Body-3x3mm)</li>
    <li><strong>CP-32-2</strong> | Analog Devices QFN-32 Pins-8x8 Pitch-0.50mm Body-5x5mm)</li>
    <li><strong>DO-214AC</strong></li>
    <li><strong>LFCSP</strong> | Analog Devices</li>
    <li><strong>MLF</strong> | Micro-leadframe</li>
    <li><strong>QFN-UT</strong> | Ultra-thin QFN packages by Samtech</li>
    <li><strong>RQZ</strong> | QFN-48, 7x7mm, 050mm pitch by Texas Instruments</li>
    <li><strong>RSB</strong> | QFN-40 by Texas Instruments</li>
    <li><strong>SOT....</strong> | NXP's name for it's QFN range of packages, not this does not include packages such as the SOT-23, which are NOT QFN packages)</li>
  </ul>
</td>
</tr>
<tr >

<td >Variants
</td>

<td >n/a
</td>
</tr>
<tr >
<td >Similar To</td>
<td>
  <ul>
    <li>{{% link text="SON (DFN)" src="son-component-package/" %}}</li>
    <li>{{% link text="UQFN" src="uqfn-component-package/" %}}</li>
    <li>{{% link text="VQFN" src="vqfn-component-package/" %}}</li>
  </ul>
</td>
</tr>
<tr >
<td >Mounting</td>
<td >SMD</td>
</tr>
<tr >
<td >Pin Count</td>
<td >12-108</td>
</tr>
<tr >
<td >Pitch</td>
<td >
<ul>
  <li>0.40mm</li>
  <li>0.50mm</li>
  <li>0.65mm</li>
</ul>
</td>
</tr>
<tr >
<td >Solderability</td>
<td >Surprisingly easy to solder by hand, as long as the pads extend around to the sides of the IC, and you drill a hole to solder the centre pad from the reverse. QFN packages can also be soldered easily with a infrared rework station or the 'frying pan' technique.
</td>
</tr>
<tr >

<td >Thermal Resistance
</td>

<td >n/a
</td>
</tr>
<tr>
<td >Dimensions</td>
<td>
    <p>0.40mm pitch QFN packages:</p>
    <ul>
        <li>QFN-UT-20: 3x3x0.6mm (LA: 9mm2)</li>
        <li>QFN-56: 7x7x1mm (LA: 49mm2)</li>
        <li>QFN-64: 8x8x1mm (LA: 64mm2)</li>
        <li>QFN-72: 9x9x1mm (LA: 81mm2)</li>
        <li>QFN-88: 10x10x1mm (LA: 100mm2)</li>
        <li>QFN-108: 12x12x1mm (LA: 144mm2)</li>
    </ul>
    <p>0.50mm pitch QFN packages:</p>
    <ul>
        <li>QFN-16: 3x3x1mm (LA: 9mm2)</li>
        <li>QFN-20: 3x3x1mm (LA: 9mm2)</li>
        <li>QFN-24: 4x4x1mm (LA: 16mm2)</li>
        <li>QFN-32: 5x5x1mm (LA: 25mm2)</li>
        <li>QFN-36: 6x6x1mm (LA: 36mm2)</li>
        <li>QFN-48: 7x7x1mm (LA: 49mm2)</li>
        <li>QFN-56: 8x8x1mm (LA: 64mm2)</li>
        <li>QFN-64: 9x9x1mm (LA: 81mm2)</li>
        <li>QFN-68: 10x10x1mm (LA: 100mm2)</li>
    </ul>
    <p>0.65mm pitch QFN packages:</p>
    <ul>
        <li>QFN-16: 4x4x1mm (LA: 16mm2)</li>
        <li>QFN-20: 4x4x1mm (LA: 16mm2)</li>
        <li>QFN-32: 7x7x1mm (LA: 49mm2)</li>
    </ul>
</td>
</tr>
<tr >
<td >Height</td>
<td >1mm (max, applies to all QFN packages, includes stand-off). Some a smaller (e.g. the UT/ultra-thin QFN packages).
</td>
</tr>
<tr >

<td >3D Models
</td>

<td>
    <p>0.50mm Pitch:</p>
    <ul>
        <li><a href="http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=173415">QFN-20 3x3mm</a></li>
        <li><a href="http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=201710">QFN-36 6x6mm</a></li>
        <li><a href="http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=214813">QFN-56 8x8mm</a></li>
    </ul>
    <p>0.65mm Pitch:</p>
    <ul>
        <li><a href="http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=167937">QFN-32 7x7mm</a></li>
        <li><a href="http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=413189">QFN-44 8x8mm</a></li>
    </ul>
</td>
</tr>
<tr>
<td>Common Uses</td>
<td>
    <ul>
        <li>Microcontrollers</li>
        <li>High-pin count, low footprint area ICs</li>
    </ul>
</td>
</tr>
</tbody>
</table>

The QFN component package is commonly used today for higher pin-count ICs such as microcontrollers. It is a **near chip-scale package**, with all the pins being around the perimeter and an optional thermal pad(s) in the center. It is one of the highest pin-density SMD packages without resorting to BGA. Note that there are different pitch footprints within the QFN family! And QFN packages do not have to be square (square is the most common), some rectangular versions exist with a different number of leads on the two sides (they always have the same number of pins on the opposite side).

QFN packages offer benefits over other packages for high-speed circuits, as well as high heat dissipation capabilities. QFN packages are lacking gull-wing leads (like that present on the QFP package), which create noise in high-speed applications.

Texas Instruments recommends rounded pads on the QFN package to prevent solder bridging. Also, stencil windows are recommended for the solder paste on the thermal pad so that a limited amount of solder is added. Too much solder can cause the QFN package to "float" around during the soldering process.

A QFN-like package with pins on only two of the fours sides is a SON package (DFN).

Confusingly, NXP names it's range of QFN  packages with SOT... (e.g, SOT-662-1), a name which is commonly reserved for transitory packages such as the popular SOT-23.

## Solder Mask

TI recommends a non-solder mask defined (NSMD) pad over a solder mask defined (SMD) pad. This is to produce consistent and reliable solder joints. As a rule-of-thumb, you want solder mask openings that are 0.1-0.14mm larger than the pad size. By default, Altium uses NSMD pads.

Some QFN packages have an exposed metal feature on the underside to indicate pin 1. If this is the case, make sure this area is covered with solder mask to prevent shorting to neighbouring traces. This is an unusual feature, and personally I have not used any QFN packages with this present.

## Solder Paste

It is recommended to reduce the amount of solder paste applied to the centre pad to prevent the QFN package from floating during reflow. A rule-of-thumb is to have between 50-80% coverage on the center pad (this obviously does not apply to QFN packages with no pad).

<table >
<tbody >
<tr >

<td >
{{< figure src="/images/2014/12/qfn-68-component-package-with-no-solder-paste-aperture-reduction-on-center-pad.png" width="359px" caption="A QFN-68 package with no solder paste aperture reduction on the center pad (not recommended)."  >}}

</td>

<td >
{{< figure src="/images/2014/12/qfn-68-component-package-with-solder-paste-aperture-reduction-on-center-pad.png" width="340px" caption="A QFN-68 package with solder paste aperture reduction on the center pad (recommended)."  >}}

</td>
</tr>
</tbody>
</table>

It may be necessary to mask or plug vias in the center pad to prevent solder paste being carried through the via and away from the pad during reflow. Small holed vias (such as vias with a hole diameter of 0.3mm or less) do not normally cause a big problem.

## Singulation Methods

There are two singulation methods for QFN packages:

* Punch singulation: This is used on individually-moulded QFN packages.
* Saw singulation: This is used on _moulded array_ QFN packages.

The main difference between these two singulation methods is the cross-sectional profile. Punch singulation gives a tapered cross-section (larger cross-section at the bottom than the top), while sawn singulation gives a completely square cross-section.

{{< figure src="/images/2014/12/qfn-component-package-sawn-vs-punch-vs-col-singulation.png" width="573px" caption="Cross-sectional comparison of sawn and punch singulated QFN packages. Image from http://cache.freescale.com/files/analog/doc/app_note/AN1902.pdf."  >}}

Punch singulated QFN packages are JEDEC compliant.

## Voiding

Volatiles that get trapped underneath the pad during reflow can cause voids to form underneath the component (areas in where the pad is not soldered to the PCB). Another potential cause of voiding is when too much solderpaste is applied to the centre pad, which causes the package to float on the PCB during reflow.

## Stresses

Because the QFN package sits directly on the PCB and has no standoff, they are less resilient to mechanical stresses that say, QFP packages. The amount of PCB board flex must be taken into consideration. Excessive stress can damage a QFN package.

## Lead Styles

<table >
<tbody >
<tr >
<td >
{{< figure src="/images/2014/07/qfn-package-e-style-leads-fully-exposed-on-side-of-package.png" width="205px" caption="A QFN package with 'e' style leads which are fully exposed on the side of the package (this is a good thing)."  >}}
</td>
<td >
{{< figure src="/images/2014/07/qfn-package-s-style-leads-not-exposed-on-side-of-package.png" width="207px" caption="A QFN package with 'S' style leads which are only partially exposed on the side of the package (this is a not a good thing)."  >}}
</td>
<td >
{{< figure src="/images/2014/07/qfn-package-wf-style-dimpled-leads.png" width="206px" caption="A QFN package with 'WF' style leads. They have dimples which allow for improved soldering."  >}}
</td>
</tr>
</tbody>
</table>

## Unique Corner Pins

QFN packages exist in where the **corner pins have to be of a different shape** to all the others for **clearance reasons**. The only example of this I have ever seen is the package for the [IvenSense MPU-9250 IMU](https://www.invensense.com/products/motion-tracking/9-axis/mpu-9250/). It is a QFN package with 24 pins in a 3x3x1.0mm size with 6 0.40mm pitch pins on each edge. Because of the high pin density, the outer pins on each edge almost touch each other, and so a different pin shape is used. This also means you use a different pad shape for the package footprint.

<table >
<tbody >
<tr >
<td >
{{< figure src="/images/2014/12/qfn-24-component-package-with-unique-corner-pads-mpu-9250-dimensions.png" width="306px" caption="The corner pins on the QFN package used by the IvenSense MPU-9250 have a unique shape."  >}}</td>
<td >{{< figure src="/images/2014/12/qfn-24-component-package-with-unique-corner-pads-mpu-9250-land-pattern.png" width="260px" caption="The footprint for the IvenSense MPU-9250 IMU which uses a QFN package with unique corner pin shapes (notice how they are smaller)."  >}}</td>
</tr>
</tbody>
</table>

## Standardization Of Pinout For Logic Functions

JEDEC has a standard on the pinout of QFN packages for logic functions.

[JESD75-5 - JEDEC Standard - QFN Pinouts For Logic Functions](/images/2014/12/JESD75-5-JEDEC-Standard-QFN-Pinouts-For-Logic-Functions.pdf)
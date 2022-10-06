---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, PCB Design, Component Packages ]
date: 2020-07-30
description: Synonyms, variants, dimensions, recommended footprints, thermal resistance and more info about the SON (DFN) component package.
draft: false
lastmod: 2022-10-06
tags: [ component packages, PCB design, DFN, SON, QFN ]
title: DFN Component Package
type: page
---

## Overview

<table>
  <tr>
    <td style="width: 200px;">Name</td>
    <td>DFN (Dual Flat No-lead)</td>
  </tr>
  <tr>
    <td>Synonyms</td>
    <td>
      <ul>
        <li>DFN (Linear Technology, Micron Technology Inc, this synonym is more common than the JEDEC named SON!)</li>
        <li>DRC/S-PVSON-N9 (TI, DFN-10_1EP_3x3mm_P0.5mm_EP1.05x2.5mm){{% md %}}[^bib-ti-drc-s-pvson-n9-package-outline]{{% /md %}}</li>
        <li>DRP/S-PVSON-N6 (TI)</li>
        <li>DSG/S-PWSON-N8 (TI)</li>
        <li>LLP (Leadless Lead frame Package). The terminology used by National Semiconductor for their SON/DFN/QFN packages until they were acquired by Texas Instruments{{% md %}}[^bib-ti-qfn-son-faqs]{{% /md %}}.</li>
        <li>MLP (micro leadframe package or moulded leaded package). This also can refer to variants with pins on all four sides of the package, which is also called a QFN package). This name is used by Linear Technologies, Carsem.</li>
        <li>MLPD (MLP dual).</li>
        <li>MLPM (MLP micro). This name is used by Carsem.</li>
        <li>MLPQ (MLP quad).</li>
        <li>PE-SON-8 (SON-8, Ricoh)</li>
        <li>SON (JEDEC)</li>
        <li>SW-PWSON-N8 (SON-8, TI)</li>
        <li>VDFPN (Numonyx, Micron Technology)</li>
        <li>VFDFN (DigiKey, e.g. part TPS54260DRCT).</li>
        <li>VSON (Texas Instruments)</li>
        <li>WDFN-6 (SON-6, On Semiconductor/Fairchild Semiconductor)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Similar To</td>
    <td>
      <ul>
        <li>QFN (note that some may call SON a variant of QFN)</li>
        <li>SOD-882 (two pad package used for diodes)</li>
        <li>SOT-883 (three pad package used for transistors)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Variants</td>
    <td>The SON package can have a varying number of pins. There are also VSON and WSON packages which are exactly the same as the SON package except for a different height. This package can also optionally include an exposed pad.</td>
  </tr>
  <tr>
    <td>Mounting</td>
    <td>SMD</td>
  </tr>
  <tr>
    <td>Pin Count</td>
    <td>4-20+ (depends on variant)</td>
  </tr>
  <tr>
    <td>Pitch</td>
    <td>Depends on variant.</td>
  </tr>
  <tr>
    <td>Solderability</td>
    <td>Reflow soldering is recommended. Hard to solder with a soldering iron due to underside thermal pad (some don’t have a thermal pad, and in that case, your chances are better). The tiny pitch is not so much of an issue as unlike the TQFP package, solder bridges are really easy to remove. You can solder the exposed pad in some cases by drilling a hole in the centre of the pad and soldering from the underside.</td>
  </tr>
  <tr>
    <td>Thermal Resistance</td>
    <td>Depends on variant.</td>
  </tr>
  <tr>
    <td>Package LxWxH</td>
    <td>Depends on variant.</td>
  </tr>
  <tr>
    <td>Typical PCB Land Area</td>
      <td>Depends on variant.</td>
  </tr>
  <tr>
    <td>3D Models</td>
    <td>n/a</td>
  </tr>
  <tr>
    <td>Common Uses</td>
    <td>
      <ul>
        <li>MOSFETs</li>
        <li>Embedded SIM cards</li>
        <li>Solid-state load switches</li>
        <li>Flash memory ICs</li>
      </ul>
    </td>
  </tr>
</table>

The `DFN` (_Dual Flat No-lead_) component package is also commonly known as the `SON` package. TI also calls this the _Plastic Small Outline No-lead_ package.

The `DFN` package is very closely related to the `QFN` package. **From what I can tell, the main difference between the DFN and QFN package is that the `DFN` package generally only has pins running down two of it's sides, while a `QFN` package has pins on all four sides.** However, this is not a hard-and-fast rule, for example the `V-DFN3020-13 (Type A)` package by Diodes Inc. has pins on three of four sides[^bib-diodes-inc-ap63356]. The other big difference I have seen is that QFN packages seem to more standardized with consistent pin/package shapes and dimensions, whilst packages labelled "DFN" can have all sorts of "weird" pad/package geometries (see the below image).

{{% figure src="ap63356-dfn-pin-assignments.png" width="300px" caption="Outline of the V-DFN3020-13 package by Diodes Inc[^bib-diodes-inc-ap63356]. Notice the very un-standard pin geometries, which you'll see in some DFN packages." %}}

JEDEC standard `JESD75-5` specifies how generic logic circuits will be connected to certain pins of the DFN package.

Below is an "odd shaped" SON package used by Numonyx flash chips that goes under the name VDFPN8. Notice the half-round appearance of the pins.

{{% figure src="component-package-vdfpn8-mlp8-outline-dimensions.png" width="500px" caption="Outline and dimensions for the VDFPN8 (SON-8) component package of a Numonyx flash IC.Image from http://www.micron.com/~/media/Documents/Products/Data%20Sheet/NOR%20Flash/Serial%20NOR/M25P/M25P128.pdf." %}}

[Texas Instruments AN-1187: Leadless Leadframe Package (LLP)](https://www.ti.com/lit/an/snoa401r/snoa401r.pdf) is a great PCB designers reference document when using DFN or QFN packages (the document calls them LLP, but it is the same thing as DFN/QFN).

## Thermal Pad

The SON package has a exposed thermal pad on the underside, similar to a QFN package.

For a comparable TQFP package with the same pin count, the SON package (with an exposed pad) can usually handle more than twice the power dissipation.

## DFN-6, 3x3mm

The DFN-6 3x3mm package is used for components such as MOSFETs.

{{% figure src="son-6-component-package-3d-model.jpg" width="300px" caption="The 3D model of the DFN-6 component package." %}}

{{% figure src="son-6-component-package-with-two-thermal-pads.jpg" width="300px" caption="The 3D model of the DFN-6 component package which has two thermal pads instead of one." %}}

## DFN-8, 3x3mm

The DFN-8 3x3mm package is used for components such as linear regulators[^bib-st-ldk715-ds].

{{% figure src="son-8-component-package-3d-model.jpg" width="400px" caption="The 3D model of the DFN-8 component package." %}}

{{% figure src="son-8-component-package-dimensions.png" width="400px" caption="The package dimensions of the DFN-8 component package." %}}

{{% figure src="son-8-component-package-exposed-thermal-pad.png" width="400px" caption="The package dimensions of the DFN-8 component package with exposed thermal pad." %}}

{{% figure src="son-8-component-package-land-pattern-and-thermal-properties.png" width="400px" caption="The recommended land pattern and thermal properties of the DFN-8 component package." %}}

{{% figure src="son-8-component-package-ti-land-pattern.png" width="400px" caption="The recommended land pattern (from TI) of the DFN-8 component package." %}}

## WSON And VSON Variants

The WSON and VSON variants of the SON package are identical to the SON package except for varying heights.

The WSON variant has a height of 0.80mm (max.)

{{% figure src="wson-component-package-height.png" width="450px" caption="An outline of the WSON component package showing it's height." %}}

The VSON variant has a height of 1.00mm (max.)

{{% figure src="vson-component-package-height.png" width="470px" caption="An outline of the VSON component package showing it's height." %}}

## References

[^bib-ti-qfn-son-faqs]:  Texas Instruments. _QFN/SON package FAQs_. Retrieved 2020-07-30, from https://www.ti.com/support-quality/faqs/qfn-son-faqs.html.
[^bib-diodes-inc-ap63356]:  Diodes Incorporated. _3.8V to 32V input, 3.5A low Iq Synchronous Buck with Enhanced EMI Reduction_. Retrieved 2021-12-14, from https://www.diodes.com/assets/Datasheets/AP63356-AP63357.pdf.
[^bib-st-ldk715-ds]:  STMicroelectronics (2020, Apr). _LDK715 (datasheet)_. Retrieved 2021-12-14, from https://www.st.com/resource/en/datasheet/ldk715.pdf.
[^bib-ti-drc-s-pvson-n9-package-outline]: Texas Instruments (2011, Sep). _DRC (S-PVSON-N9): Mechanical Data_. Retrieved 2022-10-06, from https://www.ti.com/lit/ml/mpss035d/mpss035d.pdf.

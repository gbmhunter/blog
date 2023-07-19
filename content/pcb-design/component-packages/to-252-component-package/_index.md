---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, PCB Design, Component Packages ]
date: 2015-04-07
draft: false
lastmod: 2023-07-19
tags: [ component packages, PCB design, DPACK, SC-63, SOT-428, TO-252, TO-252AA, CPD, Case 369C ]
title: TO-252 Component Package
type: page
---

## Overview

_TO-252_ (JEDEC Transistor Outline 252) is family of SMD component packages that is commonly used for things such as medium power MOSFETs and linear power regulators. There is a popular 3-lead variant also known as `DPAK`, along with 2 less commonly used 5-lead variants. All TO-252 packages have a pitch of 1.27mm (50mill).

Similar To:

* [TO-220](../to-220-component-package)

Solderability: Quite easy to hand-solder, although the large tab can make things difficult because of it's heatsinking capabilities.

Commonly used for power MOSFETs and high power voltage regulators. Features a large tab/pin which can be soldered directly onto the PCB, providing good heatsinking capabilities.

If DPAK is referred to by itself, with no pin number indication (e.g. DPAK3, DPAK5), it is usually referring to the 3-pin version.

## TO-252-3

The `TO-252-3` is the 3-lead variant in the TO-252 family, most commonly known by the synonym `DPACK`. {{% ref "fig-to-252-component-package-3d-render" %}} shows a 3D render of this package.

{{% figure ref="fig-to-252-component-package-3d-render" src="to-252-component-package-3d-render.jpg" width="300px" caption="A 3D render of the TO-252-3 (DPACK) component package." %}}

Synonyms:

* `Case 369C`: Used by On Semiconductor[^onsemi-mbrb1045g-schottky-diode-ds].
* `CPD`: Used by Rohm Semiconductor[^rohm-semi-rb085b-40fh-schottky-diode-ds].
* `DPAK`: Popular alternative name.
* `DPAK3`: A version of DPAK but with a `3` to distinguish it from the 5-lead version.
* `SC-63`: The JEITA EIAJ standard name[^nexperia-sot-428-package-info].
* `SOT-428`: Used by Nexperia[^nexperia-sot-428-package-info].
* `TO-252`: Strictly this is a family of packages, but if no suffix is mentioned it's typically referring to `TO-252-3`[^nexperia-sot-428-package-info].
* `TO-252AA`: JEDEC name.

3D Models:

* [DPAK, TO-252AA, by Bill Brooks](http://www.3dcontentcentral.com/download-model.aspx?catalogid=171&amp;id=444823)

Thermal resistance:

* `\(T_{JA} = 80^{\circ}{\rm C}/W\)` (pads only, no copper fill)

## TO-252-5-P1

The `TO-252-5` is the 5-lead variant in the `TO-252` family with a square a shorter tab than the `TO-252-5-P2`. It is not as common as the 3-lead variant. Most of the time the middle lead (3rd lead) is cut short in this variant, as it's electrically connected to the tab.

**3D Model**

{{% ref "fig-to-252-5-p1-3d-model-diodes-inc" %}} shows a 3D model for this component package.

{{% figure ref="fig-to-252-5-p1-3d-model-diodes-inc" src="to-252-5-p1-3d-model-diodes-inc.png" width="400px" caption="3D model of the TO-252-5-P1 package[^diodes-inc-to-252-5-p1]." %}}

You can download 3D models from:

* [DPAK-5, by Alexey Olehnovich](http://www.3dcontentcentral.com/download-model.aspx?catalogid=171&amp;id=432344)

**Synonyms**

* `KVU (R-PSFM-G5)`: Used by Texas Instruments as a drawing number[^ti-tps7b87-q1-ldo-ds].
* `TO-252-5`: Sometimes this package is just called `TO-252-5`.

**Dimensions**

{{% ref "fig-to-252-p1-package-dimensions-diode-inc" %}} shows the dimensions of the `TO-252-5-P1` package from Diodes Inc.

{{% figure ref="fig-to-252-p1-package-dimensions-diode-inc" src="to-252-p1-package-dimensions-diode-inc.png" width="600px" caption="Dimensions of the TO-252-5-P1 package from Diodes Inc[^diodes-inc-to-252-5-p2-ds]." %}}

**Recommended Land Pattern**

{{% ref "fig-to-252-p1-recommended-land-pattern-diode-inc" %}} shows the recommended land pattern of the `TO-252-5-P1` package from Diodes Inc.

{{% figure ref="fig-to-252-p1-recommended-land-pattern-diode-inc" src="to-252-p1-recommended-land-pattern-diode-inc.png" width="600px" caption="The recommended land pattern for the TO-252-5-P1 package from Diodes Inc[^diodes-inc-to-252-5-p2-ds]." %}}

**Thermal Resistances**

The thermal resistances for any TO-252-5 package are shown below. 

* `\(T_{JA} = 59^{\circ}{\rm C}/W\)` (pads only, no copper fill)
* `\(T_{JA} = 26^{\circ}{\rm C}/W\)` (high-wattage land pattern)
* `\(T_{JA} = 20^{\circ}{\rm C}/W\)` (one square inch of copper surrounding package, connected to ground)
* `\(T_{JA} = 7^{\circ}{\rm C}/W\)` (high-wattage land pattern with thermal vias to bottom layer)

## TO-252-5-P2

The `TO-252-5-P2` is a 5-lead variant of the `TO-252` package with a rounded and longer tab than the `TO-252-5-P1`[^nisshinbo-to-252-5-p2]. If there is no suffix listed on a `TO-252-5` package (e.g. no mention of `P1` or `P2`), it will likely be this variant. {{% ref "fig-to-252-5-p2-3d-render-nisshinbo" %}} shows a 3D render of this package.

{{% figure ref="fig-to-252-5-p2-3d-render-nisshinbo" src="to-252-5-p2-3d-render-nisshinbo.png" width="300px" caption="A 3D render of the TO-252-5-P2 component package.[^nisshinbo-to-252-5-p2]" %}}

**Recommended Land Pattern**

{{% ref "fig-component-package-to-252-5-recommended-land-pattern" %}} shows a recommended land pattern from Ricoh for the `TO-252-5-P2`.

{{% figure ref="fig-component-package-to-252-5-recommended-land-pattern" src="component-package-to-252-5-recommended-land-pattern.png" caption="The recommended PCB land pattern for the TO-252-5 component package. Image from Ricoh TO-252 Package Information (http://www.ricoh.com/LSI/product_power/pkg/to-252-5-p2.pdf)." width="500px" %}}

## References

[^onsemi-mbrb1045g-schottky-diode-ds]: onsemi (2020, Aug). _Schottky Power Rectifier, Switch-Mode, 10 A, 45 V - MBRB1045G, MBRD1045G, SBRB1045G, SBRD81045T4G_ [Datasheet]. Retrieved 2023-07-19, from https://www.onsemi.com/pdf/datasheet/mbrb1045-d.pdf.
[^nexperia-sot-428-package-info]: Nexperia (2022, May 20). _SOT428 - plastic, single-ended surface-mounted package (DPAK); 3 leads; 2.285 mm pitch; 6 mm x 6.6 mm x 2.3 mm body_ [Package Information]. Retrieved 2023-07-19, from https://assets.nexperia.com/documents/package-information/SOT428.pdf.
[^nisshinbo-to-252-5-p2]: Nisshinbo Micro Devices Inc. _TO-252-5-P2_ [Package Information]. Retrieved 2023-07-19, from https://www.nisshinbo-microdevices.co.jp/en/design-support/package/to-252-5-p2.html.
[^diodes-inc-to-252-5-p1]: Diodes Inc. _TO-252-5_ [Package Overview]. Retrieved 2023-07-19, from https://www.diodes.com/package/view/400.info.
[^diodes-inc-to-252-5-p2-ds]: Diodes Inc (2017, April 4). _TO-252-5_ [Package Information]. Retrieved 2023-17-19, from https://www.diodes.com/assets/Package-Image/TO252-5.pdf.
[^ti-tps7b87-q1-ldo-ds]: Texas Instruments (2021, Apr). _TPS7B87-Q1 - 500-mA, 40-V, Low-Dropout Regulator With Power-Good_ [Datasheet]. Retrieved 2023-07-19, from https://www.ti.com/lit/ds/symlink/tps7b87-q1.pdf. 
[^rohm-semi-rb085b-40fh-schottky-diode-ds]: Rohm Semiconductor (2011). _RB085B-40FH - Schottky barrier diode_ [Datasheet]. Retrieved 2023-07-19, from https://fscdn.rohm.com/en/products/databook/datasheet-nrnd/discrete/diode/schottky_barrier/rb085b-40fh.pdf.  

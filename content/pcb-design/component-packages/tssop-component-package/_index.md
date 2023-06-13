---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-04-07
draft: false
lastmod: 2023-06-13
tags: [ "component packages", "PCB design", "transistor", "TSSOP", "thin scale small-outline package", "HTSSOP" ]
title: "TSSOP Component Package"
type: "page"
---

## Overview

TSSOP (_Thin Shrink Small Outline Package_) is a plastic, SMD IC component package with gull-wing leads.

Synonyms:

* PWP (PowerPAD) (TI's name for the HTSSOP variant, independent on pin count)[^bib-ti-drv8424ep-ds]
* SOT1171-2 (NXP's name for the HTSSOP-28)[^bib-nxp-sot1172-2-pack-info]
* MO-153 (JEDEC's name for the HTSSOP-28)[^bib-nxp-sot1172-2-pack-info]

Pin Count: 8-80[^bib-wikipedia-tssop]

Pitch:

* 0.50mm[^bib-wikipedia-tssop]
* 0.65mm

Solderability: Reflow is most suitable. O.K. to solder by hand by an experienced user. Care must be taken to avoid solder bridges between the legs of the IC.

Common Uses:

* General ICs
* H-bridges (the HTSSOP variant)

## TSSOP

{{% figure src="tssop-38-component-package-3d-render.jpg" width="300px" caption="A 3D render of the TSSOP-38 component package." %}}

Body widths of TSSOP packages can be 3.0, 4.4 and 6.1mm[^bib-wikipedia-tssop].

## HTSSOP

`HTSSOP` is a variant of the `TSSOP` with a solder pad on the underside, used by both Texas Instruments and Rohm Semiconductor[^bib-ti-lm3421-datasheet] [^bib-rohm-htssop]. It is used for ICs which require good thermal conductivity (e.g. half-bridges, SMPS).

* `\(R_{\theta JA}\)`: Junction-to-ambient thermal resistance.
* `\(R_{\theta JB}\)`: Junction-to-board thermal resistance.
* `\(R_{\theta JC(top)}\)`: Junction-to-case (top) thermal resistance.
* `\(R_{\theta JC(bot)}\)`: Junction-to-case (bottom) thermal resistance.

<table>
  <thead>
    <tr>
      <th>Package Name</th>
      <th width="100">Body Size (nominal)</th>
      <th width="100">{{% md %}}`\(R_{\theta JA}\)`{{% /md %}}</th>
      <th width="100">{{% md %}}`\(R_{\theta JB}\)`{{% /md %}}</th>
      <th width="100">{{% md %}}`\(R_{\theta JC(top)}\)`{{% /md %}}</th>
      <th width="100">{{% md %}}`\(R_{\theta JC(bot)}\)`{{% /md %}}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTSSOP-16</td>
      <td>{{% md %}}5.00x4.40mm[^bib-ti-lm3421-datasheet]{{% /md %}}</td>
      <td>{{% md %}}`\(38.9^{\circ}C/W\)`[^bib-ti-lm3421-datasheet]{{% /md %}}</td>
      <td>{{% md %}}`\(16.8^{\circ}C/W\)`[^bib-ti-lm3421-datasheet]{{% /md %}}</td>
      <td>{{% md %}}`\(23.1^{\circ}C/W\)`[^bib-ti-lm3421-datasheet]{{% /md %}}</td>
      <td>{{% md %}}`\(1.7^{\circ}C/W\)`[^bib-ti-lm3421-datasheet]{{% /md %}}</td>
    </tr>
    <tr>
      <td>HTSSOP-20</td>
      <td>{{% md %}}6.50x4.40mm[^bib-ti-lm3421-datasheet]{{% /md %}}</td>
      <td>{{% md %}}`\(36.7^{\circ}C/W\)`[^bib-ti-lm3421-datasheet]{{% /md %}}</td>
      <td>{{% md %}}`\(18^{\circ}C/W\)`[^bib-ti-lm3421-datasheet]{{% /md %}}</td>
      <td>{{% md %}}`\(21.5^{\circ}C/W\)`[^bib-ti-lm3421-datasheet]{{% /md %}}</td>
      <td>{{% md %}}`\(1.9^{\circ}C/W\)`[^bib-ti-lm3421-datasheet]{{% /md %}}</td>
    </tr>
    <tr>
      <td>HTSSOP-28</td>
      <td>{{% md %}}9.70x4.40mm[^bib-ti-drv8424ep-ds]{{% /md %}}</td>
      <td>{{% md %}}`\(31.0^{\circ}C/W\)`[^bib-ti-drv8424ep-ds]{{% /md %}}</td>
      <td>{{% md %}}`\(10.8^{\circ}C/W\)`[^bib-ti-drv8424ep-ds]{{% /md %}}</td>
      <td>{{% md %}}`\(25.2 ^{\circ}C/W\)`[^bib-ti-drv8424ep-ds]{{% /md %}}</td>
      <td>{{% md %}}`\(3.3^{\circ}C/W\)`[^bib-ti-drv8424ep-ds]{{% /md %}}</td>
    </tr>
  </tbody>
</table>

{{% figure src="htssop-28-component-package-3d-render-with-thermal-pad.jpg" width="320px" caption="A 3D render of the 28-pin TSSOP component package that has a thermal pad (HTSSOP-28)." %}}

## References

[^bib-ti-lm3421-datasheet]: Texas Instruments (2008, Jul). _LM342x N -Channel Controllers for Constant-Current LED Drivers (Datasheet)_. Retrieved 2021-10-13, from https://www.ti.com/lit/ds/symlink/lm3421.pdf.
[^bib-nxp-sot1172-2-pack-info]: NXP (2016, Feb 8). _SOT1172-2 (Package Information)_. Retrieved 2021-10-13, from https://www.nxp.com/docs/en/package-information/SOT1172-2.pdf.
[^bib-ti-drv8424ep-ds]: Texas Instruments (2020, May). _DRV8424E/P, DRV8425E/P Dual H-Bridge Motor Drivers With Integrated Current Sense
and Smart Tune Technology_. Retrieved 2021-10-13, from https://www.ti.com/lit/ds/symlink/drv8424e.pdf.
[^bib-wikipedia-tssop]: Wikipedia (2021, Jul). _Thin shrink small outline package_. Retrieved 2021-10-13, from https://en.wikipedia.org/wiki/Thin_shrink_small_outline_package.
[^bib-rohm-htssop]: Rohm Semiconductor (2016, Sep 19). _Package Information : HTSSOP-B28_. Retrieved 2021-10-13, from https://fscdn.rohm.com/en/techdata_basic/ic/package/htssop-b28_1-e.pdf.

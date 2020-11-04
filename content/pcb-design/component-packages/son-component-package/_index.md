---
author: gbmhunter
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2014-12-03
description: "Synonyms, variants, dimensions, recommended footprints, thermal resistance and more info about the SON (DFN) component package."
draft: false
lastmod: 2020-07-30
tags: [ "electronics", "component packages", "PCB design", "SON", "DRP", "DFN", "DSG", "MLP", "MLPD", "MLPM", "VFDFN", "VDFPN", "VSON", "QFN" ]
title: "SON Component Package"
type: "page"
---

## Overview

<table>
<tbody >
<tr>
	<td>Name</td>
	<td>SON (Small-outline No-lead Package)</td>
</tr>
<tr >
	<td>Synonyms</td>
	<td>
		<ul>
			<li>DFN (Linear Technology, Micron Technology Inc, this synonym is more common than the JEDEC named SON!)</li>
			<li>DRP/S-PVSON-N6 (TI)</li>
			<li>DSG/S-PWSON-N8 (TI)</li>
      <li>LLP (Leadless Lead frame Package). The terminology used by National Semiconductor for their SON/DFN/QFN packages until they were acquired by Texas Instruments[^ti-qfn-son-faqs].</li>
			<li>MLP (micro leadframe package or moulded leaded package). This also can refer to variants with pins on all four sides of the package, which is also called a <a href="/pcb-design/component-packages/qfn-component-package">QFN package</a>). This name is used by Linear Technologies, Carsem.</li>
			<li>MLPD (MLP dual).</li>
			<li>MLPM (MLP micro). This name is used by Carsem.</li>
			<li>MLPQ (MLP quad).</li>
			<li>PE-SON-8 (SON-8, Ricoh)</li>
			<li>SW-PWSON-N8 (SON-8, TI)</li>
			<li>VDFPN (Numonyx, Micron Technology)</li>
      <li>VFDFN (DigiKey, e.g. part<a href="https://www.digikey.com/product-detail/en/texas-instruments/TPS54260DRCT/296-28102-1-ND/2509805">TPS54260DRCT</a>.</li>
      <li>VSON (Texas Instruments)</li>
			<li>WDFN-6 (SON-6, On Semiconductor/Fairchild Semiconductor)</li>
		</ul>
	</td>
</tr>
<tr>
  <td>Variants</td>
  <td>The SON package can have a varying number of pins. There are also VSON and WSON packages which are exactly the same as the SON package except for a different height. This package can also optionally include an exposed pad.</td>
</tr>
<tr>
  <td>Similar To</td>
  <td>{{% link text="QFN" src="../qfn-component-package" %}} (note that some may call SON a variant of QFN)</td>
</tr>
<tr>
  <td>Mounting</td>
  <td>SMD</td>
</tr>
<tr>
  <td>Pin Count</td>
  <td>6, 8 (all also have exposed thermal pad)</td>
</tr>
<tr>
  <td>Pitch</td>
  <td>0.5mm</td>
</tr>
<tr>
  <td>Solderability</td>
  <td>Hard to solder with a soldering iron due to underside thermal pad (some don't have a thermal pad, and in that case, your chances are better). The tiny pitch is not so much of an issue as unlike the TQFP package, solder bridges are really easy to remove. You can solder the exposed pad in some cases by drilling a hole in the centre of the pad and soldering from the underside.</td>
</tr>
<tr>
	<td>Thermal Resistance</td>
	<td>
		<b>SON-8</b>
		<ul>
			<li>\(T_{ja}\) = 333°C/W (free-air)</li>
			<li>\(T_{ja}\) = 65.3°C/W (mounted on PCB with standard land pattern)</li>
			<li>\(T_{jc}\) (bottom) = 12.8°C/W (thermal resistance between junction and the thermal pad)</li>
		</ul>
	</td>
</tr>
<tr>
	<td>Dimensions</td>
	<td>
		<b>SON-8</b>
		<ul>
			<li>Package: 2.0x2.0x0.75mm (w<em>l</em>h)</li>
			<li>Recommended Land Pattern: 2.4x1.92mm (4.61mm2)</li>
		</ul>
	</td>
</tr>
<tr>
  <td>3D Models</td>
  <td><a href="http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&amp;id=421849">DSG (S-PWSON-N8)</a></td>
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
</tbody>
</table>

The SON component package is more commonly known as the DFN (_Dual Flat No-lead_) package. TI also calls this the _Plastic Small Outline No-lead_ package.

The SON/DFN package is very closely related to the QFN package. **The difference between the SON/DFN and QFN package is that the SON package only has pins running down two of it's sides, while a QFN package has pins on all four sides.**

JEDEC standard `JESD75-5` specifies how generic logic circuits will be connected to certain pins of the SON package.

Below is an "odd shaped" SON package used by Numonyx flash chips that goes under the name VDFPN8. Notice the half-round appearance of the pins.

{{< img src="component-package-vdfpn8-mlp8-outline-dimensions.png" width="554px" caption="Outline and dimensions for the VDFPN8 (SON-8) component package of a Numonyx flash IC.Image from http://www.micron.com/~/media/Documents/Products/Data%20Sheet/NOR%20Flash/Serial%20NOR/M25P/M25P128.pdf." >}}

[Texas Instruments AN-1187: Leadless Leadframe Package (LLP)](https://www.ti.com/lit/an/snoa401r/snoa401r.pdf) is a great PCB designers reference document when using SON/DFN or QFN packages (the document calls them LLP, but it is the same thing as SON/QFN).

## Thermal Pad

The SON package has a exposed thermal pad on the underside, similar to a QFN package.

For a comparable TQFP package with the same pin count, the SON package (with an exposed pad) can usually handle more than twice the power dissipation.

## SON-6

<table>
  <tr>
    <td>{{% img src="son-6-component-package-3d-model.jpg" width="300px" caption="The 3D model of the SON-6 component package." %}}</td>
    <td>{{% img src="son-6-component-package-with-two-thermal-pads.jpg" width="300px" caption="The 3D model of the SON-6 component package which has two thermal pads instead of one." %}}</td>
  </tr>
</table>

## SON-8

{{% img src="son-8-component-package-3d-model.jpg" width="400px" caption="The 3D model of the SON-8 component package." %}}

{{% img src="son-8-component-package-dimensions.png" width="400px" caption="The package dimensions of the SON-8 component package." %}}

{{% img src="son-8-component-package-exposed-thermal-pad.png" width="400px" caption="The package dimensions of the SON-8 component package with exposed thermal pad." %}}

{{% img src="son-8-component-package-land-pattern-and-thermal-properties.png" width="400px" caption="The recommended land pattern and thermal properties of the SON-8 component package." %}}

{{% img src="son-8-component-package-ti-land-pattern.png" width="400px" caption="The recommended land pattern (from TI) of the SON-8 component package." %}}

## WSON And VSON Variants

The WSON and VSON variants of the SON package are identical to the SON package except for varying heights.

The WSON variant has a height of 0.80mm (max.)

{{< img src="wson-component-package-height.png" width="471px" caption="An outline of the WSON component package showing it's height." >}}

The VSON variant has a height of 1.00mm (max.)

{{< img src="vson-component-package-height.png" width="471px" caption="An outline of the VSON component package showing it's height." >}}

## References

[^ti-qfn-son-faqs]: <https://www.ti.com/support-quality/faqs/qfn-son-faqs.html>
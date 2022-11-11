---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, PCB Design, Component Packages ]
date: 2015-03-08
draft: false
lastmod: 2022-11-12
tags: [ component packages, PCB design, DIP, N Package, PDIP, CDIP, dual inline package ]
title: DIP Component Package
type: page
---

## Overview

<table>
<tbody>
<tr>
<td style="width: 100px;">Name</td>
<td style="width: 500px;">DIP (Dual In-Line Package)</td>
</tr>
<tr>
<td>Synonyms</td>
<td>

* FDIP (ST Microelectronic's name for DIP with transparent lid[^bib-st-m27w256])
* N Package (Analog Devices)
* DIL (Mitsubishi[^bib-mitsubishi-m5l2764k-ds])

</td>
</tr>
<tr>
<td>Variants</td>
<td>
* PDIP (plastic dual-inline package)
* CDIP/CERDIP (ceramic dual-inline package)
</td>
</tr>
<tr>
<td>Similar To</td>
<td>

* [SIP](../sip-component-package)
* [QIP](../qip-component-package)

</td>
</td>
</tr>
<tr>
<td>Mounting</td>
<td>TH</td>
</td>
</tr>
<tr>
<td>Pin Count</td>
<td>4-64</td>
</tr>
<tr>
<td>Pitch</td>
<td>2.54mm (0.1mil)</td>
</tr>
<tr>
<td>Solderability</td>
<td>Easiest chip package to solder! Perfect for prototyping, fits into standard 100mill pitch prototype board.</td>
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
<td>5.0mm high</td>
</tr>
<tr>
<td>3D Models</td>
<td>n/a</td>
</tr>
<tr>
<td>Common Uses</td>
<td>

* Through-hole ICs
* DIP switches
* Relays/reed switches
* 7-segment, 4-digit LCD character display footprints (with different package)

</td>
</tr>
</tbody>
</table>

## Comments

The most common through-hole IC package in history, although it is now mostly superseded by SMT packages. It is the lego building block of the component packaging world -- and just like Lego, it will destroy your bare feet if you stand on one. It has standard 100mill pitch spacing. The two rows of legs are usually 300mill (thin-type), or 600mill (fat-type) apart (400mil and 900mil variants are also present). The 600mill package is usually reserved for the larger pin variants. As well as standard through-hole mounting, they can also be inserted into a socket, either by friction or clamping (zero insertion force). Pin numbering is counter-clockwise from the top-left.

{{% figure src="dip-16-component-package-3d-render.jpg" width="300px" caption="A 3D render of the DIP-16 component package." %}}

A common way to denominate the package is by width and the number of pins in the form `DIP-<width in inches>-<num. pins>`, e.g. `DIP-300-8` would be a 300mill wide 8-pin DIP package. If the width is not specified, e.g. `DIP-8`, assume it is 300mill wide as this is the most common variant.

Anti-static packaging can easily be made for DIP packages with foam and aluminium foil as shown in the picture below.

{{% figure src="making-antistatic-packaging-for-dip-ic-with-aluminium-foil.jpg" width="500px" caption="Anti-static packaging can easily be made for DIP packages with foam and aluminium foil." %}}

Components other than ICs can also use this footprint (although they typically have different packages). One example are some 7-segment, 4-digit LCD character displays, which use the `DIP-600-12` footprint.

Large DIP packages are unsuitable for high speed devices because of the long length between the internal die and the external pins.

{{% figure src="motorola-mc68000-dip-package-640x314.jpg" width="500px" caption="The iconic 1979 Motorola 68000 CPU in a DIP-600-64 package." %}}

## Land Area

The general land area formula for DIP packages is:

<p>\begin{align}
A = (\frac{n}{2})*2.54) * (width + 1.65mm)
\end{align}</p>

<p class="centered">
where:<br/>
\(n\) is the number of pins<br/>
\(width\) is the rated package width in mm (e.g.  7.62 (300mil), 15.24 (600mil))<br/>
</p>

* `DIP-300-8`: 94.2mm2
* `DIP-300-16`: 188.4mm2
* `DIP-300-32`: 376.7mm2
* `DIP-600-32`: 686.4mm2  

## 3D Models

* [DIP-300-8](http://www.3dcontentcentral.com/download-model.aspx?catalogid=1023&amp;id=79)
* [DIP-300-16](http://www.3dcontentcentral.com/download-model.aspx?catalogid=1023&amp;id=71)
* [DIP-300-20](http://www.3dcontentcentral.com/download-model.aspx?catalogid=171&amp;id=71043)
* [DIP-600-40](http://www.3dcontentcentral.com/download-model.aspx?catalogid=171&amp;id=95319)

## PDIP

A _Plastic Dual Inline Package_ (`PDIP`) is a `DIP` variant in where the case is made from plastic. It typically formed by fusing or cementing the plastic halves around the leads, however it is not considered to be hermetically sealed due to the porous nature of the plastic[^bib-wikipedia-dip].

## Transparent Lids

Many EPROM devices in the 1970's-1980's were made in a DIP package with a _transparent lid_. The lid had a transparent section made from quartz which would allow the EPROM to be erased used ultraviolet light (quartz is transparent to many wavelengths of UV lights, whilst many other "clear" materials are not).

{{% figure src="m5l2764k-eeprrom.jpg" width="400px" caption="Photo of the Mitsubishi M5L2764K EPROM (note, one \"E\" not two, it's \"erasable\" but not \"electronically erasable\") with a transparent lid in a \"DIL\" (DIP) package." %}}

## References

[^bib-wikipedia-dip]: : Wikipedia. _Dual In-line Package (DIP)_. Retrieved 2021-12-28, from https://en.wikipedia.org/wiki/Dual_in-line_package.
[^bib-mitsubishi-m5l2764k-ds]: : Mitsubishi. _M5L2764K 65536-bit (8192-word by 8-bit) Erasable and Electronically Reprogrammable ROM (datasheet)_. Retrieved 2021-12-27, from https://pdf1.alldatasheet.com/datasheet-pdf/view/126049/MITSUBISHI/M5L2764K.html.
[^bib-st-m27w256]:  ST Microelectronics (2006, April). _M27W256: 256 Kbit (32Kb x 8) Low Voltage UV EPROM and OTP EPROM (datasheet)_. Retrieved 2021-12-28, from https://www.st.com/resource/en/datasheet/cd00004936.pdf. 

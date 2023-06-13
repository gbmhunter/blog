---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-11-11
draft: false
lastmod: 2022-04-04
tags: [ "component packages", "PCB design", "SOT-89", "small-outline", "transistor", "SC-62", "TO-243", "2-5K1A", "BJTs" ]
title: "SOT-89 Component Package"
type: "page"
---

## Overview

`SOT-89` is a small, SMD family of component packages. There are two variants within the family, the `SOT-89-3` (with three leads, one of which is more like a tab), and the `SOT-89-5` (with 5 leads, again -- one of which is more like a tab).

All packages in this family have a number of rectangular leads and a central single tab-shaped lead. The tab-shaped lead improves the thermal performance of the package (decreases it's thermal resistance).

## SOT-89-3

SOT-89-3 (Small Outline Transistor 89)

{{% figure src="sot-89-sc62-to-243-component-package-3d-render.jpg" width="200px" caption="" %}}

Synonyms:

* `2-5K1A` (Toshiba)[^bib-toshiba-2sc2873-ds]
* `SC-62` (JEITA)[^bib-toshiba-2sc2873-ds][^bib-nxp-sot89]
* `TO-243` (JEDEC)[^bib-nxp-sot89]

Similar To:

* `SOT-89-6`

Mounting: SMD

Pin Count: 3 (incl. tab-like lead)

Pitch: 1.50mm (between lead centers on the same side)[^bib-nxp-sot89]

Solderability: The package is relatively easy to solder by hand. There are no issues with hand soldering the tab since the tab produces on one side of the package.

Package Dimensions:

* Length: 4.5mm (nom)[^bib-nxp-sot89]
* Width: 2.5mm (nom)[^bib-nxp-sot89]
* Height: 1.5mm (nom)[^bib-nxp-sot89]

Common Uses:

* BJTs[^bib-toshiba-2sc2873-ds]

### Dimensions

{{% figure src="sot-89-3-package-dimensions-diodes-inc.png" width="300px" caption="Dimensions of the SOT-89-3 component package[^bib-diodes-sot89]." %}}

## SOT-89-5

The `SOT-89-5` package is commonly used as a SMD replacement for the `SIP-4` TH package. It call also be called the `SOT-89-6`, since it appears to have 6 leads when look down on the package.

{{% figure src="sot-89-sc62-to-243-component-package-3d-render.jpg" width="296px" caption="A 3D render of the SOT-89 (SC-62, TO-243) component package. Image from http://www.digikey.com/." %}}

### Dimensions

{{% figure src="sot-89-sc62-to-243-component-package-dimensions.jpg.png" width="937px" caption="The dimensions for the SOT-89-5 (SC-62, TO-243) component package." %}}

### Thermal Resistance

www.diodes.com states their SOT-89-5 component package to have:

<p>\begin{align}
\theta_{JA} = 168^{\circ}C/W
\end{align}</p>

<p>\begin{align}
\theta_{JC} = 36^{\circ}C/W $$</div>
\end{align}</p>

## References

[^bib-diodes-sot89]: Retrieved 2022-04-03, from https://www.diodes.com/assets/Package-Files/SOT89.pdf.
[^bib-toshiba-2sc2873-ds]: Toshiba (2013, Nov 01). _2SC2873: TOSHIBA Transistor Silicon NPN Epitaxial Type (PCT Process) (datasheet)_. Retrieved 2022-04-04, from https://www.mouser.com/datasheet/2/408/2SC2873_datasheet_en_20131101-1649836.pdf.
[^bib-nxp-sot89]: NXP (2016, Feb 8). _SOT89: plastic surface-mounted package; die pad for good heat transfer; 3 leads (package information)_. Retrieved 2022-04-04 from https://www.nxp.com/docs/en/package-information/SOT89.pdf.

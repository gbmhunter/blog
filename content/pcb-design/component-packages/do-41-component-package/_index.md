---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-04-04
draft: false
lastmod: 2021-09-26
tags: [ "component packages", "PCB design", "DO-41", "DO-204", "diodes" ]
title: "DO-41 Component Package"
type: "page"
---

## Overview

The `DO-41` (Diode Outline 41) component package is a very popular 2-lead through-hole package used for older diodes (incl. the famous `1N400x` series). The pitch is typically 400mil, although because of the long through-hole leads, it is user variable. It is easy to solder by hand. The `DO-41` package is normally used for higher power "rectifier" diodes, whilst the lower power "signal" diodes use smaller through-hole packages such as the `DO-35`. The typical rated current for a diode in this package is 1A.

Synonyms:

* JEDEC DO-204 Variant AL (DO-204AL)
* SOD66 (NXP)[^bib-nxp-sod66]
* LALF (NXP "Package Style")[^bib-nxp-sod66]

Similar To:

* [DO-15](/pcb-design/component-packages/do-15-component-package/)
* [DO-35](/pcb-design/component-packages/do-35-do-214ah-component-package/)

Thermal Resistance: \(100^{\circ}{\rm C/W}\)

Typical PCB Land Area: 22mm²

This package is normally mounted on the PCB in two ways, either flat with the legs bent at 90° to fit into the holes, or in space-constrained applications, vertical, with one of the legs straight and one bent 180° to fit into the holes in the PCB (which are closer together than when in the flat orientation. Material of package is normally moulded plastic.

{{% figure src="do-41-component-package-photo.jpg" width="400px" caption="A photo of the DO-41 component package." %}}

## References

[^bib-nxp-sod66]: NXP (2016, Feb 8). _SOD66: Package Information_. Retrieved 2021-09-26, from https://www.nxp.com/docs/en/package-information/SOD66.pdf.

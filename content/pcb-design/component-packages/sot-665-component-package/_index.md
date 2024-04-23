---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-11-12
draft: false
tags: [ "component packages", "PCB design", "SOT-665", "small-outline", "transistor" ]
title: SOT-665 Component Package
type: page
---

## Overview

{{% figure src="_assets/sot-665-component-package-3d-render.jpg" width="200px" float="right" caption="A 3D render of the SOT-665 component package. Image from http://www.digikey.com/." %}}

SOT-665 (Small-Outline Transistor 665) is a SMD component package with 5 leads. It is commonly used for TVS diodes manufacturer by NXP and STMicroelectronics.

## Synonyms

* SOT-665
* SOT-665-5: Used by Mouser[^mouser-tvs-diode-search]. Presumably the 5 is added to indicate the number of leads.

## Dimensions

Below are the dimensions for the SOT-665 component package from NXP[^nxp-sot-665]:

{{% figure src="_assets/sot-665-component-package-dimensions.png" width="836px" caption="The dimensions for the SOT-665 component package from NXP[^nxp-sot-665]."  %}}

As per the above diagram, the SOT-665 body is 1.2mm wide and 1.6mm long. The total width including the leads is 1.6mm. The pitch is 0.5mm.

## Footprint

A recommended footprint (land pattern) for the `SOT-665` component package is shown below:

{{% figure src="_assets/sot-665-component-package-footprint-land-pattern.png" width="736px" caption="A recommended footprint (land pattern) for the SOT-665 component package. Image from http://www.st.com/."  %}}

The footprint has a land area of \(3.38mm^2\) (1.3x2.6mm), ignoring any clearance area given around the perimeter of the footprint (i.e. courtyard).

Here is another land pattern for the SOT-665, this time from NXP:

{{% figure src="_assets/sot-665-recommended-land-pattern.png" width="800px" caption="The recommended land pattern for the SOT-665 component package from NXP[^nxp-sot-665]." %}}

## Similar To

* SOT-663
* SOT-666IP

## References

[^nxp-sot-665]: NXP (2016, Feb 8). _SOT665 - plastic surface-mounted package; 5 leads_. Retrieved 2024-04-19, from https://www.nxp.com/docs/en/package-information/SOT665.pdf.
[^mouser-tvs-diode-search]: Mouser. _SOT-665-5 ESD Suppressors / TVS Diodes_ [search results]. Retrieved 2024-04-19, from https://nz.mouser.com/c/circuit-protection/esd-suppressors-tvs-diodes/?package%20%2F%20case=SOT-665-5.
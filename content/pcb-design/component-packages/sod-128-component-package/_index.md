---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-04-06
draft: false
lastmod: 2022-03-28
tags: [ "component packages", "PCB design", "SOD-128", "small-outline", "diodes", "PMDTM", "CFP5", "SOD-128 FLAT", "Nexperia", "Rohm Semiconductor", "ST Microelectronics" ]
title: "SOD-128 Component Package"
type: "page"
---

## Overview

<table>
  <tbody>
    <tr>
      <td>Name</td>
      <td>SOD-128 (Small-outline Diode 128)</td>
    </tr>
    <tr>
      <td>Image</td>
      <td>{{% figure src="sod-128-component-package-3d-render.jpg" width="150px" %}}</td>
    </tr>
    <tr>
      <td>Synonyms</td>
      <td>
        <ul>

* `CFP5` (Nexperia)[^bib-nexperia-sod-128]
* `PMDTM` (Rohm Semiconductor)[^bib-rohm-rbr5lam30b-ds]
* `SOD-128-2` (Mouser)[^bib-mouser-rb088lam-30tr]
* `SOD-128 FLAT` (ST Microelectronics)[^bib-st-sm6fxxay-ds]
      </ul>
    </tr>
    <tr>
      <td>Variants</td>
      <td>None</td>
    </tr>
    <tr>
      <td>Mounting</td>
      <td>SMD</td>
    </tr>
    <tr>
      <td>Pin Count</td>
      <td>2</td>
    </tr>
    <tr>
      <td>Pitch</td>
      <td>4.4mm</td>
    </tr>
    <tr>
      <td>Solderability</td>
      <td>Reflow is most suitable. Possible to hand solder/reflow as long as experienced.</td>
    </tr>
    <tr>
      <td>Package Dimensions</td>
      <td>

* Length (incl. leads, avg.): 4.70mm[^bib-rohm-rbr5lam30b-ds]
* Width (avg.): 2.50mm[^bib-rohm-rbr5lam30b-ds]
* Height (avg.): 0.95mm[^bib-rohm-rbr5lam30b-ds]
      </td>
    </tr>
    <tr>
      <td>Typical PCB Land Area</td>
      <td>
      
\(21.1mm^2\) (6.2x3.4mm)[^bib-nexperia-sod-128]
      </td>
    </tr>
    <tr>
      <td>Common Uses</td>
      <td>
      
* General purpose diodes
* TVS diodes
      </td>
    </tr>
  </tbody>
</table>

`SOD-128` is a package used by a few manufacturers for diodes. I could not find any JEITA (EIAJ) code (e.g. `SC-xxx`) for this package. ST Microelectronics calls this package the `SOD-128 FLAT` (presumably because it has flat leads, as opposed to many SOD packages which by default have gull-wing leads, and only offer flat variants once you add a `F` suffix)[^bib-st-sm6fxxay-ds]. There does not appear to be any difference between the ST Microelectronics `SOD-128 FLAT` package and the `SOD-128` as labelled by Rohm and Nexperia.

## Thermal Resistance

* \(R_{JA} = 200^{\circ}{\rm C}/W\) (standard land pattern, see below)
* \(R_{JA} = 120^{\circ}{\rm C}/W\) (mounting pad for cathode 1cm²)
* \(R_{JA} = 60^{\circ}{\rm C}/W\) (mounted on ceramic PCB with standard footprint)

## 3D Render

{{% figure src="sod-128-component-package-3d-render.jpg" width="300" caption="A 3D render of the SOD-128 component package." %}}

## Dimensions

{{% figure src="sod128-package-outline.jpg" width="500" caption="The package outline for the SOD-128 component package." %}}

## Recommended Land Pattern

{{% figure src="sod128-recommended-land-pattern.jpg" width="500" caption="The recommended land pattern for the SOD-128 component package." %}}

## References

[^bib-nexperia-sod-128]:  Nexperia. _SOD128: plastic, surface mounted package; 2 terminals; 4 mm pitch; 3.8 mm x 2.6 mm x 1 mm body (package information)_. Retrieved 2022-03-28, from https://assets.nexperia.com/documents/package-information/SOD128.pdf.
[^bib-mouser-rb088lam-30tr]:  Mouser. _ROHM Semiconductor RB088LAM-30TR (product page)_. Retrieved 2022-03-28, from https://www.mouser.com/ProductDetail/ROHM-Semiconductor/RB088LAM-30TR?qs=F5EMLAvA7IAOGmDi0yYqWA%3D%3D.
[^bib-rohm-rbr5lam30b-ds]:  Rohm Semiconductor (2019, May 28). _RBR5LAM30B: Schottky Barrier Diode (datasheet)_. Retrieved 2022-03-28, from https://fscdn.rohm.com/en/products/databook/datasheet/discrete/diode/schottky_barrier/rbr5lam30btr-e.pdf.
[^bib-st-sm6fxxay-ds]:  ST Microelectronics (2020, Jan). _SM6FxxAY: Automotive 600 W TVS in SOD128 Flat (datasheet)_. Retrieved 2022-03-28, from https://www.st.com/resource/en/datasheet/sm6f11ay.pdf.

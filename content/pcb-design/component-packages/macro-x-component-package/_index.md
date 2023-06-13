---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2022-04-18
draft: false
lastmod: 2022-04-18
tags: [ "component packages", "PCB design", "Macro X", "Micro-X Ceramic" ]
title: "Macro X Component Package"
type: "page"
---

## Overview

_Macro X_ is a 4 lead component package the is used for RF transistors[^bib-microsemi-mrf581-ds]. As of 2022, the package seems obsolete.

{{% figure src="mrf581.png" width="200px" caption="" %}}

Synonyms:

* Micro-X Ceramic[^bib-digikey-mrf581]
* Package Style M238[^bib-microsemi-mrf581-ds]

Similar To:

* Macom CASE 305A-01[^bib-macom-mrf158-ds]
* Macro T[^bib-microsemi-mrf581-ds]

Microsemi's BJT pinout for this package connected the longest lead to the collector, the lead opposite this to the base, and the other two leads to the emitter[^bib-microsemi-mrf581-ds].

{{% figure src="mrf581.png" width="350px" caption="Photo of the MRF581 RF NPN transistor in the Macro X component package." %}}

The `Macro X` package is similar to Macom's `CASE 305A-01` component package, used for the Macom MRF158 N-channel RF MOSFET[^bib-macom-mrf158-ds].

## References

[^bib-microsemi-mrf581-ds]:  Microsemi (2008, Dec). _MRF581: RF & Microwave Discrete Low Power Transistors (datasheet)_. Retrieved 2022-04-18, from https://www.microsemi.com/document-portal/doc_download/11675-mrf581-mrf581a-reva-datasheet.
[^bib-digikey-mrf581]:  Digikey. _Microsemi Corporation MRF581 (product page)_. Retrieved 2022-04-18, from https://www.digikey.com/en/products/detail/microsemi-corporation/MRF581/2077046.
[^bib-macom-mrf158-ds]:  Macom. _The Broadband RF TMOS Line, 2W, 500MHz, 28V_. Retrieved 2022-04-19, from https://nz.mouser.com/datasheet/2/249/MRF158-318450.pdf.

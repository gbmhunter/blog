---
authors: [Geoffrey Hunter]
categories: [Electronics, PCB Design, Component Packages]
date: 2023-07-14
draft: false
lastmod: 2024-01-31
tags: [component packages, PCB design, SOD-353]
title: SOD-353 Component Package
type: page
---

## Overview

_SOD-353_ (Small-outline Diode 353) is a 5-lead SMD component package with a pitch of 0.65mm[^nexperia-sot-353].

Synonyms:

* CASE 419A (onsemi)[^on-semi-nl17sz86-ds]
* SC-70-5[^on-semi-nl17sz86-ds]
* SC-88A (EIAJ)[^nexperia-sot-353]

Dimensions: 2.10mm wide, 2.15mm long, 1.00m high

PCB Area:
* 4.52mm2 (just mechanical body, 2.10x2.15mm)
* 5.38mm2 (incl. recommended footprint, 2.5x2.15mm)

Similar To:

* [SOD-123](/pcb-design/component-packages/sod-123-component-package/) (larger)
* [SOD-523](/pcb-design/component-packages/sod-523-component-package/) (smaller)
* [SOD-723](/pcb-design/component-packages/sod-723-component-package/) (even smaller)
* [SOD-923](/pcb-design/component-packages/sod-923-component-package/) (smallest)

## Mechanical Dimensions

The below image shows the mechanical outline and dimensions for the SOT-353 package from Diodes Incorporated.:

{{% figure src="_assets/sot-353-package-dimensions-diodes-com.png" width="700px" caption="Mechanical outline and dimensions for the SOT-353 package[^diodes-incorp-sot-353-package-info]." %}}

## Recommended Land Pattern

The below image shows the recommended land pattern from Diodes Incorporated:

{{% figure src="_assets/sot-353-recommended-land-pattern-diodes-inc.png" width="700px" caption="The recommended land pattern for the SOT-353 package from Diodes Incorporated[^diodes-incorp-sot-353-package-info]." %}}

## Uses

The SOT-353 package is used for things such as logic gates[^on-semi-nl17sz86-ds], analogue switches and voltage supervisors[^nisshinbo-r3118x-series-voltage-supervisors-ds].

## References

[^nexperia-sot-353]: Nexperia. _SOT353 - plastic, surface-mounted package; 5 leads; 0.65 mm pitch; 2.1 mm x 1.25 mm x 0.95 mm body_ [Web Page]. Retrieved 2023-07-14, from https://www.nexperia.com/packages/SOT353.html.
[^on-semi-nl17sz86-ds]: onsemi. _NL17SZ86 - Single 2-Input Exclusive-OR Gate_ [Datasheet]. Retrieved 2023-07-14, from https://www.mouser.com/datasheet/2/308/nl17sz86-d-1194181.pdf.
[^diodes-incorp-sot-353-package-info]: Diodes Incorporated (2018, Jan 16). _SOT-353 - Package Information_ [Datasheet]. Retrieved 2023-07-14, from https://www.diodes.com/assets/Package-Files/SOT353.pdf.
[^nisshinbo-r3118x-series-voltage-supervisors-ds]: Nisshinbo. _R3118x Series - Low Voltage Detector with Individual SENSE Pin and Delay Function_ [Datasheet]. Retrieved 2023-07-14, from https://www.nisshinbo-microdevices.co.jp/en/pdf/datasheet/r3118-ea.pdf.

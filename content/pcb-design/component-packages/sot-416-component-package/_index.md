---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, PCB Design, Component Packages ]
date: 2015-04-07
draft: false
lastmod: 2023-07-19
tags: [ component packages, PCB design, SOT-416 ]
title: SOT-416 Component Package
type: page
---

## Overview

_SOT-416_ is the JEDEC name for a family of 3-lead SMD component packages that comes in 2 variants. It is very similar to the SOT-490 package which is used by many manufacturers. The JEITA name `SC-89` can refer to either the `SOT-416` or `SOT-490`.

## SOT-416

`SOT-416` is the default variant with gull-wing leads, rather than the flat leads of the `SOT-416FL`. It is used by companies such as NXP and Rohm semiconductor.

{{% figure src="sot-416-3d-render-rohm.png" width="300px" caption="A 3D render of the SOT-416 component package by Rohm Semiconductor[^rs-dtd523ye3tl-npn-transistor]." %}}

### Synonyms

* `2-2H1S`: Toshiba package code[^toshiba-sot-416].
* `EMT3`: Rohm package code[^rohm-dtc143z-transistor-ds].
* `SC-75`: JEITA, `SC-75A` is also used[^nxp-sot-416-package-info].
* `SC-75A`: JEITA, sometimes the `A` suffix is dropped so it's just `SC-75`[^nxp-sot-416-package-info].
* `SOT-416-3`: Name used by Mouser[^mouser-sot-416-3-mosfet].

### Dimensions

{{% ref "fig-sot-416-dimensions-toshiba" %}} shows the dimensions from Toshiba for the `SOT-416` component package.

{{% figure ref="fig-sot-416-dimensions-toshiba" src="sot-416-dimensions-toshiba.png" width="500px" caption="Dimensions from Toshiba for the SOT-416 component package[^toshiba-sot-416]." %}}

### Recommended Land Pattern

{{% ref "fig-sot-416-recommended-land-pattern-toshiba" %}} shows the recommended land pattern from Toshiba for the `SOT-416`.

{{% figure ref="fig-sot-416-recommended-land-pattern-toshiba" src="sot-416-recommended-land-pattern-toshiba.png" width="300px" caption="The recommended land pattern from Toshiba for the SOT-416 package[^toshiba-sot-416]." %}}

## SOT-416FL

`SOT-416FL` is the flat-leads (not gull-wing) variant of the `SOT-416`. I could only find references to it by Rohm Semiconductor. {{% ref "fig-sot-416fl-3d-render-snapeda" %}} shows a 3D render from SnapEDA of the `SOT-416FL`.

{{% figure ref="fig-sot-416fl-3d-render-snapeda" src="sot-416fl-3d-render-snapeda.jpg" width="250px" caption="A 3D render of the SOT-416FL from SnapEDA[^snapeda-dtc143zebtl-bjt]." %}}

### Synonyms

* `EMD3F`: ROhm's package code[^rohm-rb715wm-schottky-barrier-diode-ds].
* `EMT3F`: Another name from Rohm[^rohm-dtc143z-transistor-ds]. Not sure why there are two!
* `SC-89`: JEITA name[^rohm-rb715wm-schottky-barrier-diode-ds], although this name is also used for the [SOT-490](/pcb-design/component-packages/sot-490-component-package/).
* `SOT-416FL`: JEDEC name[^rohm-rb715wm-schottky-barrier-diode-ds].

### Dimensions

{{% ref "fig-sot-416fl-dimensions-rohm" %}} shows the dimensions of the `SOT-416FL` component package.

{{% figure ref="fig-sot-416fl-dimensions-rohm" src="sot-416fl-dimensions-rohm.png" width="600px" caption="Dimensions of the SOT-416FL package from Rohm Semiconductor[^rohm-rb715wm-schottky-barrier-diode-ds]." %}}

### Recommended Land Pattern

{{% ref "fig-sot-416fl-recommended-land-pattern-rohm" %}} shows the recommended land pattern from Rohm Semiconductor for their `SOT-416FL` package.

{{% figure ref="fig-sot-416fl-recommended-land-pattern-rohm" src="sot-416fl-recommended-land-pattern-rohm.png" width="400px" caption="The recommended land pattern from Rohm for the SOT-416FL package[^rohm-rb715wm-schottky-barrier-diode-ds]." %}}

### Used For

* Low-power BJTs
* Low-power MOSFETs

### Similar To

* [SOT-490](/pcb-design/component-packages/sot-490-component-package/) (very similar, some companies use the names interchangeably)

## References

[^rohm-rb715wm-schottky-barrier-diode-ds]: Rohm Semiconductor (2016, Jul). _RB715WM: Schottky Barrier Diode_ [Datasheet]. Retrieved 2023-07-21, from https://fscdn.rohm.com/en/products/databook/datasheet/discrete/diode/schottky_barrier/rb715wm-e.pdf.
[^rohm-dtc143z-transistor-ds]: Rohm Semiconductor (2017, Nov). _DTC143Z - NPN 100mA 50V Digital Transistor_ [Datasheet]. Retrieved 2023-07-21, from https://docs.rs-online.com/a6bb/0900766b8161b9fe.pdf. 
[^nxp-sot-416-package-info]: NXP (2016, Feb 8). _SOT416 - plastic surface-mounted package; 3 leads_ [Package Information]. Retrieved 2023-07-21, from https://www.nxp.com/docs/en/package-information/SOT416.pdf.
[^rs-dtd523ye3tl-npn-transistor]: RS Components. _ROHM DTD523YE3TL NPN Digital Transistor, 500 mA SOT-416_ [Product Page]. Retrieved 2023-07-21, from https://nz.rs-online.com/web/p/bipolar-transistors/2619287.
[^toshiba-sot-416]: Toshiba. _Product detail - SSM_ [Package Information]. Retrieved 2023-07-21, from https://toshiba.semicon-storage.com/ap-en/semiconductor/design-development/package/detail.SSM.html.
[^mouser-sot-416-3-mosfet]: Mouser. _SOT-416-3 N-Channel MOSFET_ [Product Page]. Retrieved 2023-07-21, from https://www.mouser.com/c/semiconductors/discrete-semiconductors/transistors/?package%20%2F%20case=SOT-416-3&transistor%20polarity=N-Channel.
[^snapeda-dtc143zebtl-bjt]: SnapEDA. _DTC143ZEBTL - Pre-Biased Bipolar Transistor (BJT) NPN - Pre-Biased 50 V 100 mA 250 MHz 150 mW Surface Mount EMT3F (SOT-416FL)_. Retrieved 2023-07-21, from https://www.snapeda.com/parts/DTC143ZEBTL/Rohm/view-part/.

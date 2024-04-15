---
authors: [Geoffrey Hunter]
categories: [Electronics, PCB Design, Component Packages]
date: 2021-09-07
description: Dimensions, codes, recommended land patterns and more info on SMD crystal component packages.
draft: false
lastmod: 2021-09-07
tags: [component packages, PCB design, SMD, crystal, oscillator, package, dimensions, component]
title: Crystal Packages
type: page
---

{{% warning-is-notes %}}

Unfortunately, most surface-mount crystals do not come in named packages. A notable exception is the [HC-49US package](/pcb-design/component-packages/hc-49us-component-package/). This page contains info on the unnamed SMD crystal packages, which are usually identified by their width*length. There are a variety of popular width*length combinations used.

## SMD Crystal Packages

Table of common SMD 2 pad crystal package dimensions:

| Dimensions (width x length)
|--------------------------------
| 1.20x1.00mm
| 1.60x1.00mm
| 2.00x1.20mm
| 2.05x1.20mm
| 3.20x1.50mm
| 4.10x1.50mm

### 1.5x0.8mm

* Dimensions: 1.5x0.8mm
* Num. leads: 4
* Connection type: BGA

{{% figure src="_assets/sit1532ai-j4-dcc-32.768e-1.5x0.8mm-4-bga-package-3d-render.png" width="300px" caption="3D render of the SiTIME SIT1532AI-J4-DCC-32.768E in the 1.5x0.8mm CSP BGA package[^element14-sit1532ai-j4-dcc-32.768e]." %}}

### 3.2x2.5mm (4-Lead)

* Dimensions: 3.2x2.5mm
* Num. leads: 4
* Connection type: Pads

{{% figure src="_assets/abm3b-8.000mhz-10-1-u-t-crystal-3.2x2.5mm-package-render.png" width="300px" caption="3D render of the Abracon ABM3B-8.000MHZ-10-1-U-T in the 3.2x2.5mm SMD crystal package[^element14-abm3b-8.000mhz-10-1-u-t]." %}}

A very common package size for a 4-lead SMD crystal. There is also a 6-lead crystal package with the same length and width of 3.2x2.5mm.

### 3.2x2.5mm (6-Lead)

* Dimensions: 3.2x2.5mm
* Num. leads: 6
* Connection type: Pads
 
{{% figure src="_assets/abracon-ax3dbf1-125.0000t-crystal-package-dimensions.png" width="600px" caption="Package dimensions of the Abracon AX3DBF1-125.0000T SMD crystal, in a 3.2x2.5x1.0mm form factor. Image retrieved 2021-09-07, from https://nz.mouser.com/datasheet/2/3/AX3-1578477.pdf." %}} 

### 7.0x5.0mm (2-Lead)

* Dimensions: 7.0x5.0mm
* Num. leads: 2
* Connection type: Pads

This is a common larger SMD package for crystals. There is also a 4-Lead package with the same outer dimensions.

### 7.0x5.0mm (4-Lead)

* Dimensions: 7.0x5.0mm
* Num. leads: 4
* Connection type: Pads

{{% figure src="_assets/7x5mm-4lead-euroquartz-smd-crystal-smd-package-photo.png" width="400px" caption="Photo of the EUROQUARTZ 10.000MHZ MQ/30/30/40/12PF crystal in a 7x5mm SMD package[^element14-10.000mhz-mq-30-30-40-12pf]." %}}

This is a common larger SMD package for crystals. There is also a 2-Lead package with the same outer dimensions.

{{% figure src="_assets/7x5mm-4lead-euroquartz-smd-crystal-smd-package-dimensions.png" width="400px" caption="Package dimensions of the EUROQUARTZ 10.000MHZ MQ/30/30/40/12PF crystal in a 7x5mm SMD package[^element14-10.000mhz-mq-30-30-40-12pf]." %}}

## Through-Hole Crystal Packages

Radial 6.2x2.1mm

{{% figure src="_assets/raltron-r26-32.768-6-crystal-package-6.2x2.1mm-photo.png" width="300px" caption="Photo of a Raltron R26-32.768-6 32.678kHz crystal in a 6.2x2.1mm radial package. Image retrieved 2021-09-11, from https://nz.element14.com/raltron/r26-32-768-6/crystal-32-768khz-6pf-6-2-x-2/dp/2982324." %}}

## References

[^element14-abm3b-8.000mhz-10-1-u-t]: Element14. _Crystal, 8 MHz, SMD, 5mm x 3.2mm, 10 ppm, 10 pF, 10 ppm, ABM3B_ [Product Page]. Retrieved 2021-09-07, from https://nz.element14.com/abracon/abm3b-8-000mhz-10-1-u-t/crystal-8mhz-10pf-5-x-3-2mm/dp/2467817.
[^element14-sit1532ai-j4-dcc-32.768e]: Element14. _SIT1532AI-J4-DCC-32.768E: MEMS Oscillator, 32.768 kHz, SMD, 1.5mm x 0.8mm, 100 ppm, SiT1532, LVCMOS_ [Product Page]. Retrieved 2023-06-27, from https://nz.element14.com/sitime/sit1532ai-j4-dcc-32-768e/osc-32-7khz-1-5-x-0-8mm-lvcmos/dp/2850210.
[^element14-10.000mhz-mq-30-30-40-12pf]: Element14. _10.000MHZ MQ/30/30/40/12PF - Crystal, 10 MHz, SMD, 7mm x 5mm, 30 ppm, 12 pF, 30 ppm, MQ_ [Product Page]. Retrieved 2023-06-27, from https://nz.element14.com/euroquartz/10-000mhz-mq-30-30-40-12pf/crystal-5x7mm-cer-10-000mhz/dp/1640911

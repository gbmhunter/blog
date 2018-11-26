---
author: gbmhunter
date: 2015-03-08 21:34:20+00:00
draft: false
title: BGA Component Package
type: page
url: /pcb-design/component-packages/bga-component-package
---

# Overview

<table style="width: 600px;" ><tbody ><tr >
<td style="width: 100px;" >Name
</td>
<td >BGA (Ball-Grid Array)
</td></tr><tr >
<td >Synonyms
</td>
<td >n/a
</td></tr><tr >
<td >Variants
</td>
<td >  * CABGA  * CTBGA  * DSBGA (Die-Size BGA). Used by Texas Instruments. JEDEC standard MO-207  * FBGA  * FGG484 (Xilinx)  * X-DSBGA (Very thin die-size BGA). JEDEC standard MO-211-C.  * xDSB (Square and rectangular die-size BGA). JEDEC standard MO-207N.
</td></tr><tr >
<td >Similar To
</td>
<td >  * [WLCSP](http://blog.mbedded.ninja/pcb-design/component-packages/wlcsp-component-package)
</td></tr><tr >
<td >Mounting
</td>
<td >SMD
</td></tr><tr >
<td >Pin Count
</td>
<td >4-1700+
</td></tr><tr >
<td >Pitch
</td>
<td >0.5mm, 0.8mm, 1.0mm
</td></tr><tr >
<td >Solderability
</td>
<td >BGA usually requires reflow oven or infrared heater. Expert-level solderers can use the "dead-bug" prototyping method and attach super-thin wires to each ball when the package is upside down.
</td></tr><tr >
<td >Thermal Resistance
</td>
<td >n/a
</td></tr><tr >
<td >Dimensions
</td>
<td >n/a
</td></tr><tr >
<td >3D Models
</td>
<td >  * [Various Config 1mm Pitch](http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&id=215083)  * [324pins 18x18mm 1mm Pitch](http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&id=363398)
</td></tr><tr >
<td >Common Uses
</td>
<td >  * Microcontrollers  * FPGAs  * High-density SMD IC's  * CPU's  * GPU's  * Memory
</td></tr></tbody></table>

# Comments

The package with the densest pin density out there, BGA's are used to either make components very small or to encompass a large number of leads. Some modern FPGA's have more than 1700 leads! Requires an x-ray machine to discover if the balls have correctly soldered onto the pads.

A 3D render of the BGA-144 component package.

{{< figure src="/images/2015/03/bga-144-component-package-3d-render.jpg" width="372px" caption="A 3D render of the BGA-144 component package."  >}}

# Ball Layout

A particular BGA package may not have a complete grid of balls. BGA packages also come in a _straight_ or _staggered_ ball layout.

# BGA Pad Diameter

The pad diameter for a BGA footprint can be determined by one of three methods:  * Maximum material condition (MMC)  * Least material condition (LMC)  * Percentage reduction of nominal ball diameter (e.g. 20%)

# Soldermask Considerations

{{< figure src="/images/2015/03/example-of-nsmd-pcb-pad-solder-joint-xilinx.png" width="507px" caption="Example of a NSMD (non-soldermask defined) solder joint on a BGA package. Image from http://www.xilinx.com/."  >}}

# Variants

## DSBGA

DSBGA (Die Sized BGA) is the name given by Texas Instruments for their family of BGA packages in where the die size is the same as the package size. They are also known by the term Wafer-Level Chip Scale Package (WLCSP). As of October 2015, they are available in 0.30, 0.35, 0.40, and 0.50mm pitches. 

{{< figure src="/images/2015/03/dsbga-component-package-4-25-bump-size-comparison-ti.png" width="282px" caption="A size comparison of the 4 to 25 bump DSBGA component packages. Image from http://www.ti.com/."  >}}

Texas Instruments also assigns a package code to each package within the DSBGA family. Here are some example (this is in no way an exhaustive list):

<table ><tbody ><tr >
<td >TI Package Code
</td>
<td >Description
</td></tr><tr >
<td >YDC
</td>
<td >DSBGA, 4 Leads, Pitch 0.5mm, Body 1.1x1.1mm, Height 0.4mm
</td></tr><tr >
<td >YEA
</td>
<td >DSBGA, 5 Leads, Pitch 0.5mm, Body 0.9x1.4mm, Height 0.5mm
</td></tr><tr >
<td >YEB
</td>
<td >DSBGA, 4 Leads, Pitch 0.5mm, Body 1.3x1.3mm, Height 0.625mm
</td></tr><tr >
<td >YEC
</td>
<td >DSBGA, 6 Leads, Pitch 0.5mm, Body 1.8x1.3mm, Height 0.625mm
</td></tr><tr >
<td >YZP
</td>
<td >DSBGA, 8 Leads, Pitch 0.5mm, Body 1.9x0.9mm, Height 0.5mm
</td></tr></tbody></table>

Note that confusingly, the three letter Texas Instrument's code is **not unique** for a particular package. For example, the code "YZP" may refer to a 5, 6, or 8 ball DSBGA package, which also may have **different** height, width and length dimensions. 

{{< figure src="/images/2015/03/dsbga-8-component-package-2d-pcb-footprint-birds-eye.png" width="236px" caption="A 2D birds-eye view of the CAD model for the DSBGA-8 component package."  >}}

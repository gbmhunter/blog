---
author: gbmhunter
date: 2015-04-07 00:54:58+00:00
draft: false
title: D2PAK (TO-263) Component Package
type: page
url: /pcb-design/component-packages/d2pak-to-263-component-package
---

[mathjax]

# Overview

<table style="width: 600px;" ><tbody ><tr >
<td >Name
</td>
<td > Transistor Outline 263
</td></tr><tr >
<td >Synonyms
</td>
<td >  * TO-263 (Transistor Outline 263)  * D2PAK (Double Decawatt package)  * DDPAK  * TO-263AB (TO-263-3S only)  * TO-279 (TO-263 THIN only)  * SMD-220 (because the TO-263 is the SMD equivalent of the TO-220).
</td></tr><tr >
<td >Variants
</td>
<td >  * TO-263-X1X2where X1 is the lead count and X2 is the length of the centre pin.  * TO-263 THIN (a thinner variant of the standard TO-263 package by Texas Instruments)
</td></tr><tr >
<td >Similar To
</td>
<td >  * TO-220AB
</td></tr><tr >
<td >Mounting
</td>
<td >SMD
</td></tr><tr >
<td >Pin Count
</td>
<td >3, 5, 7, or 9 (this is X1). All packages also have a thermal pad.
</td></tr><tr >
<td >Pitch
</td>
<td >  * TO-263-3, TO-263-3S: 2.54mm  * TO-263-7, TO-263-7S: 1.7mm
</td></tr><tr >
<td >Solderability
</td>
<td >Easy to solder by hand, as long as you have a decent powered soldering iron for the central thermal pad. Easy to solder with infrared and reflow techniques.
</td></tr><tr >
<td >Thermal Resistance
</td>
<td >

**TO-263-3**  * \(T_{JA} = 18.0^{\circ}{\rm C}/W\) (1 square inch of copper surrounding pads, connected to ground)  * \(T_{JA} = 33.6^{\circ}{\rm C}/W\) (copper filling package land-area)  * \(T_{JA} = 36.7^{\circ}{\rm C}/W\) (pads only, no copper fill)

**TO-263-5L THIN**  * \(T_{JA} = 22.0^{\circ}{\rm C}/W\) (no air flow, on JEDEX 4-layer test board)
</td></tr><tr >
<td >Land Area
</td>
<td >n/a
</td></tr><tr >
<td >Height
</td>
<td >  * All except TO-263 THIN: 4.57mm  * TO-263 THIN: 2.00mm
</td></tr><tr >
<td >3D Models
</td>
<td >  * [TO-263-3](http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&id=168926)  * [TO-263-3S](http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&id=168921)  * [TO-263-5](http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&id=168928)  * [TO-263-5S](http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&id=168927)  * [TO-263-7S](http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&id=167948)
</td></tr><tr >
<td >Common Uses
</td>
<td >  * High power MOSFET's  * High power LDO's  * High power SMPS (usually with integrated switching element)
</td></tr></tbody></table>

# The Standard Package (TO-263)

This package can be considered the SMT version of the TO-220AB. It is a 3, 5 or 7 leaded heavy-duty package that allows for good heat-sinking due to a large pad on it's underside. Used frequently for high power MOSFETs, LDOs and SMPS. Comes with either a normal middle lead (X2 = nothing) or a short, cut-off middle lead (X2 = S).

{{< figure src="/images/2015/04/d2pak-to-263-component-package-3d-render.jpg" width="345" caption="A 3D render of the D2PAK (TO-263) component package." caption-position="bottom" >}}

The synonym for the TO-263 package, D2PAK, stands for "double decawatt package". It was designed by Motorola for high power devices.

## Thermal Resistance

The junction-to-ambient thermal resistance for the TO-263 component package on both standard JEDEC 2-layer and 4-layer boards is shown below:

{{< figure src="/images/2015/04/d2pak-to-263-component-package-thermal-resistance-2-vs-4-layer-comparison.png" width="680" caption="Junction-to-ambient thermal resistance data of the TO-263 component package on both standard JEDEC 2-layer and 4-layer PCBs. Image from www.ti.com." caption-position="bottom" >}}

# TO-263 THIN

TO-263 THIN is a variant of the TO-263 component package by Texas Instruments. It shares a similar PCB footprint, but is significantly smaller in height (i.e. thinner).

{{< figure src="/images/2015/04/to-263-normal-vs-thin-component-package-comparison.pdf.png" width="446" caption="A comparison in dimensions of the standard TO-263 component package vs. the TO-263 THIN component package. Image from www.ti.com." caption-position="bottom" >}}

It still has a similar exposed pad on it's underside (making it footprint compatible with the standard TO-263 package).

The exact dimensions of the TO-263 THIN package are shown in the below image:

{{< figure src="/images/2015/04/to-263-thin-component-package-dimensions.png" width="817" caption="The dimensions for the TO-263 THIN component package. Image built from elements taken from www.ti.com." caption-position="bottom" >}}

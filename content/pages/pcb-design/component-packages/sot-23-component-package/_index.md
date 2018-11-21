---
author: gbmhunter
date: 2015-04-06 20:16:54+00:00
draft: false
title: SOT-23 Component Package
type: page
url: /pcb-design/component-packages/sot-23-component-package
---

# Overview

<table style="width: 600px;" ><tbody ><tr >
<td >Name
</td>
<td >SOT-23 (Small Outline Transistor 23)
</td></tr><tr >
<td >Synonyms
</td>
<td >

**SOT-23-3**  * Micro3  * SC-59 (JEITA)  * SOT-23 (TopLine)  * SOT-346  * SSOT3 (Fairchild Semiconductor)  * TO-236AA (JEDEC)  * TO-236AB (NXP)

**SOT-23-5**  * SC-74A (JEITA)  * SOT-753  * SOT-25 (TopLine)

**SOT-23-6**  * SC-74 (JEITA)  * SMT6 (ROhm)  * SOT-26 (SOT-23-6 by TopLine)  * SOT-457 (JEDEC)

**SOT-23-8**  * RJ-8 (Analog Devices)  * SM8 (Diodes Incorporated)  * SOT-28 (TopLine)
</td></tr><tr >
<td >Variants
</td>
<td >There are 3-pin (SOT-23-3), 5-pin (SOT-23-5), 6-pin (SOT-23-6) and 8-pin (SOT-23-8) variants.
</td></tr><tr >
<td >Similar To
</td>
<td >n/a
</td></tr><tr >
<td >Mounting
</td>
<td >SMD
</td></tr><tr >
<td >Pin Count
</td>
<td >3, 5, 6, 8
</td></tr><tr >
<td >Pitch
</td>
<td >  * 0.65mm (SOT-23-8)  * 0.95mm (SOT-23-3, SOT-23-5, SOT-23-6)
</td></tr><tr >
<td >Solderability
</td>
<td >Easy to hand-solder if you have had a bit of practise with surface mount devices before. Easy to solder with infrared or reflow techniques.
</td></tr><tr >
<td >Thermal Resistance
</td>
<td >SOT-23-5: 230°C/W
</td></tr><tr >
<td >Dimensions
</td>
<td >The body of all SOT-23-x packages is 1.30x2.92mm.
</td></tr><tr >
<td >3D Models
</td>
<td >n/a
</td></tr><tr >
<td >Common Uses
</td>
<td >  * Linear regulators  * Op-amps  * Transistors  * MOSFET's  * Diodes (including diode arrays)  * Battery management IC's  * Analogue active linear temperature sensors
</td></tr></tbody></table>

# Comments

A very common surface-mount package that is used for a huge number of functions. Variations exist with 3 to 8 pins.

The SOT-23 family probably has the largest number of differing variant names which all refer to the same packages.

[caption id="attachment_11346" align="aligncenter" width="262"][![A 3D render of the SOT-23 component package.](http://blog.mbedded.ninja/wp-content/uploads/2015/04/sot-23-component-package-photo.jpg)
](http://blog.mbedded.ninja/wp-content/uploads/2015/04/sot-23-component-package-photo.jpg) A 3D render of the SOT-23 component package.[/caption]

The number of pins used not only depends on the required number of connections but also the desired thermal resistance (high-current SOT23 devices may use more than one pin for the same net to improve thermal performance). Used commonly for FET's transistors, diodes, and other components only having a small number of leads. SparkFun makes a [SOT-23 to DIP breakout board](http://www.sparkfun.com/products/717).

[caption id="attachment_11966" align="aligncenter" width="297"][![A 3D render of the SOT-23-6 (SOT-457) component package.](http://blog.mbedded.ninja/wp-content/uploads/2015/04/component-package-sot-23-6-sc-74a-sot-457-3d-render.jpg)
](http://blog.mbedded.ninja/wp-content/uploads/2015/04/component-package-sot-23-6-sc-74a-sot-457-3d-render.jpg) A 3D render of the SOT-23-6 (SOT-457) component package.[/caption]

# Dimensions

[caption id="attachment_12308" align="aligncenter" width="1288"][![Dimensions for the SOT-23-8 component package. Image from http://www.diodes.com/.](http://blog.mbedded.ninja/wp-content/uploads/2015/04/sot-23-8-component-package-dimensions-diodes-incorporated.png)
](http://blog.mbedded.ninja/wp-content/uploads/2015/04/sot-23-8-component-package-dimensions-diodes-incorporated.png) Dimensions for the SOT-23-8 component package. Image from http://www.diodes.com/.[/caption]

# Footprint

The 3, 5, and 6 pin SOT-23 variants have the same pitch of 0.95mm, and all are compatible with the 6 pin footprint (which means you can use a SOT-23-6 adapter board for the 3 and 5 pin variants also).

However, the 8 lead variant, SOT-23-8, has a smaller pitch of 0.65mm

[caption id="attachment_12307" align="aligncenter" width="1000"][![A recommended footprint for the SOT-23-8 component package. Image from http://www.diodes.com/.](http://blog.mbedded.ninja/wp-content/uploads/2015/04/sot-23-8-component-package-recommended-footprint-diodes-incorporated.png)
](http://blog.mbedded.ninja/wp-content/uploads/2015/04/sot-23-8-component-package-recommended-footprint-diodes-incorporated.png) A recommended footprint for the SOT-23-8 component package. Image from http://www.diodes.com/.[/caption]

# SOT-23-6

## Non-standard Pin Numbering

**WARNING:** The SOT-23-6 package by Rohm (a.k.a IMT4, SOT-457, SMT6) has non-standard, clockwise pin numbering starting at the top right pin.

[caption id="attachment_12990" align="aligncenter" width="645"][![The Rohm SOT-23-6 component package (a.k.a. SOT-457, IMT4) with non-standard pin numbering.](http://blog.mbedded.ninja/wp-content/uploads/2015/04/rohm-sot-457-imt4-sot-23-6-component-package-non-standard-clockwise-pin-numbering-annotated.png)
](http://blog.mbedded.ninja/wp-content/uploads/2015/04/rohm-sot-457-imt4-sot-23-6-component-package-non-standard-clockwise-pin-numbering-annotated.png) The Rohm SOT-23-6 component package (a.k.a. SOT-457, IMT4) with non-standard pin numbering.[/caption]

Why you'd ever number the package in that manner is beyond me. It's dangerous, and bound to cause PCB designers to do board respins!

# Other Images

[singlepic id=554 w=500 h=500 float=center template=caption]

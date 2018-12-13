---
author: gbmhunter
date: 2015-04-06 20:22:59+00:00
draft: false
title: SOT-363 (SC-88) Component Package
type: page
url: /pcb-design/component-packages/sot-363-sc-88-component-package
---

# Overview

<table><tbody ><tr >
<td >Name
</td>
<td >SOT-363 (Small Outline Transistor 363)
</td></tr><tr >
<td >Synonyms
</td>
<td >SC-88
</td></tr><tr >
<td >Variants
</td>
<td >n/a
</td></tr><tr >
<td >Similar To
</td>
<td >SOT-323
</td></tr><tr >
<td >Mounting
</td>
<td >SMD
</td></tr><tr >
<td >Pin Count
</td>
<td >6
</td></tr><tr >
<td >Pitch
</td>
<td >0.65mm
</td></tr><tr >
<td >Solderability
</td>
<td >Difficult to solder by hand because of it's small pitch (but possible). Reflow compatible.
</td></tr><tr >
<td >Thermal Resistance
</td>
<td >
<ul>
<li>\(R_{\theta JA} = 435^{\circ}/W\) (FR-4, single-sided, 1oz. copper, minimum recommended pad layout)</li>

<li>\(R_{\theta JA} = 330^{\circ}/W\) (FR-4, double-sided, 2oz. copper, 1 inch square copper pad layout)</li>

<li>\(R_{\theta JC} = 139^{\circ}/W\)</li>
</ul>
</td></tr><tr >
<td >Dimensions
</td>
<td >n/a
</td></tr><tr >
<td >Land Area
</td>
<td >n/a
</td></tr><tr >
<td >3D Models
</td>
<td >n/a
</td></tr><tr >
<td >Common Uses
</td>
<td >
<ul>
<li>BJTs</li>
<li>MOSFETs (with up to two per package)</li>
</ul>
</td></tr></tbody></table>

# Comments

SOT-363 is used for smaller SMD transistors and MOSFET's. It has a lead-pitch half of that of the SOT-323.

# Dimensions

{{< figure src="/images/2015/04/sot-363-component-package-dimensions-diodes-inc.png" width="917px" caption="The dimensions of the SOT-363 component package. Image from http://www.diodes.com/."  >}}

# Footprint (Land Pattern)

{{< figure src="/images/2015/04/sot-363-component-package-recommended-footprint-land-pattern-diodes-inc.png" width="885px" caption="A recommended footprint (land pattern) for the SOT-363 component package. Image from http://www.diodes.com/."  >}}

# Polarity

Some components using the SOT-363 package do not require any polarity marking as the pins are rotationally symmetric. This is a common configuration for a two-device MOSFET component, in where the pinout is shown below:

{{< figure src="/images/2015/04/dmn63d8ldw-dual-device-mosfet-in-sot-363-component-package-internal-schematic.png" width="322px" caption="Internal schematic of a dual-MOSFET component in a SOT-363 package. Notice it is not polarity sensitive. Image from http://www.diodes.com/."  >}}

# 3D Renders

{{< figure src="/images/2015/04/sot-363-component-package-3d-render.jpg" width="412px" caption="A 3D render of the SOT-363 component package."  >}}

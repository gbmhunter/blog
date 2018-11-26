---
author: gbmhunter
date: 2015-04-07 02:28:48+00:00
draft: false
title: TSSOP Component Package
type: page
url: /pcb-design/component-packages/tssop-component-package
---

[mathjax]

# Overview

<table style="width: 600px;" ><tbody ><tr >
<td >Name
</td>
<td >TSSOP (Thin Scale Small Outline Package)
</td></tr><tr >
<td >Synonyms
</td>
<td >n/a
</td></tr><tr >
<td >Variants
</td>
<td >  * Variant with pad on bottom for power ICs (e.g. half-bridges), known as HTSSOP.
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
<td >n/a
</td></tr><tr >
<td >Pitch
</td>
<td >n/a
</td></tr><tr >
<td >Solderability
</td>
<td >O.K. to solder by hand by experienced user. Care must be taken to avoid solder bridges between the legs of the IC.
</td></tr><tr >
<td >Thermal Resistance
</td>
<td >n/a
</td></tr><tr >
<td >Land Area
</td>
<td >n/a
</td></tr><tr >
<td >Height
</td>
<td >n/a
</td></tr><tr >
<td >3D Models
</td>
<td >n/a
</td></tr><tr >
<td >Common Uses
</td>
<td >  * General IC's  * H-bridges (the HTSSOP variant)
</td></tr></tbody></table>

# Variants

There is a variant of the TSSOP with a solder pad on the underside. Texas Instruments calls this the HTSSOP package. It is used for ICs which require good thermal conductivity (e.g. half-bridges).

{{< figure src="/images/2015/04/htssop-28-component-package-3d-render-with-thermal-pad.jpg" width="370px" caption="A 3D render of the 28-pin TSSOP component package that has a thermal pad (HTSSOP-28)."  >}}

The HTTSOP-28 component package has the following thermal resistances:

<table ><tr >
<td >**Symbol**
</td>
<td >**Description**
</td>
<td >**Thermal Resistance**
</td></tr><tbody ><tr >
<td >\( R_{\theta JA} \)
</td>
<td >Junction-to-ambient thermal resistance
</td>
<td >\(31.6^{\circ}C/W\)
</td></tr><tr >
<td >\( R_{\theta JC (top)} \)
</td>
<td >Junction-to-case (top) thermal resistance
</td>
<td >\(15.9 ^{\circ}C/W\)
</td></tr><tr >
<td >\( R_{\theta JC (bottom)} \)
</td>
<td >Junction-to-case (bottom) thermal resistance
</td>
<td >\(1.4^{\circ}C/W\)
</td></tr><tr >
<td >\( R_{\theta JB} \) 
</td>
<td >Junction-to-board thermal resistance 
</td>
<td >\(5.6^{\circ}C/W\)
</td></tr></tbody></table>

# 3D Renders

{{< figure src="/images/2015/04/tssop-38-component-package-3d-render.jpg" width="297px" caption="A 3D render of the TSSOP-38 component package."  >}}

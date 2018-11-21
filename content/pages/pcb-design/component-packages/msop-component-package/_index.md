---
author: gbmhunter
date: 2015-01-08 22:31:45+00:00
draft: false
title: MSOP Component Package
type: page
url: /pcb-design/component-packages/msop-component-package
---

[mathjax]

# Overview

<table style="width: 600px;" ><tbody ><tr >
<td >Name
</td>
<td >Micro Small Outline Package
</td></tr><tr >
<td >Synonyms
</td>
<td >  * Micro SOP  * RM-8, RM-10 (Analog Devices, no pad)  * MINI_SO_EP, RH-8-1, RH-10-1 (Analog Devices, with pad)  * MSE (Linear Technology)  * uSOP (Maxim Integrated)  * uMAX (Maxim Integrated)  * u8+1 (Maxim Integrated package code for MSOP-8 P0.65mm)
</td></tr><tr >
<td >Variants
</td>
<td >n/a
</td></tr><tr >
<td >Similar To
</td>
<td >  * SSOP
</td></tr><tr >
<td >Mounting
</td>
<td >SMD
</td></tr><tr >
<td >Lead-type
</td>
<td >Gull-wing
</td></tr><tr >
<td >Pin Count
</td>
<td >8-16
</td></tr><tr >
<td >Pitch
</td>
<td >  * 0.50mm (MSOP-16)  * 0.65mm (uMAX, uSOP)
</td></tr><tr >
<td >Solderability
</td>
<td >Moderately difficult to solder by hand, due to the small pitch. Easy to solder with hot air, infrared, or reflow techniques.
</td></tr><tr >
<td >Thermal Resistance
</td>
<td >n/a
</td></tr><tr >
<td >Dimensions
</td>
<td >  * 4.9x3.0x1.1mm (LA: 14.7mm2)  * MSOP-10: 3.0x3.0mm, LA = 9.0mm2 
</td></tr><tr >
<td >Height
</td>
<td >1.10mm
</td></tr><tr >
<td >3D Models
</td>
<td >  * [MSOP-10](http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&id=205903)  * [IPC-7351 All SOIC SOP HSOP QSOP MSOP VSOP TVSOP SSOP TSSOP 250 packages](http://www.3dcontentcentral.com/secure/download-model.aspx?catalogid=171&id=225862)  * [uMAX-8](http://www.3dcontentcentral.com/Download-Model.aspx?catalogid=171&id=165793)
</td></tr><tr >
<td >Common Uses
</td>
<td >  * Audio amplifiers (Analog Devices)  * LED Controllers (Linear Technology)
</td></tr></tbody></table>

# **Comments**

The width of any MSOP package is always 3mm. The length is also commonly 3mm (except for MSOP-16). Because of this restriction, the pitch usually decreases as the pin count increases.

The exposed pad on this package is optional (Analog Devices have separate codes for each).

# Thermal Resistances

## MSOP-10

Synonyms: DGS (Texas Instruments), VSSOP-10 (Texas Instruments)

<table ><tr >
<td >Symbol
</td>
<td >Description
</td>
<td >Value
</td></tr><tbody ><tr >
<td >\( R_{\theta JA} \)
</td>
<td >Junction-to-ambient
</td>
<td >\(171.4^{\circ}C/W\)
</td></tr><tr >
<td >\( R_{\theta JC(top)} \)
</td>
<td >Junction-to-case (top)
</td>
<td >\(42.9^{\circ}C/W\)
</td></tr><tr >
<td >\( R_{\theta JB)} \)
</td>
<td >Junction-to-board
</td>
<td >\(91.8^{\circ}C/W\)
</td></tr></tbody></table>

# **Images**

![](http://blog.mbedded.ninja/nextgen-attach_to_post/preview/id--5082)


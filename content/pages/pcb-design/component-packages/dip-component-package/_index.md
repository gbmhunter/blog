---
author: gbmhunter
date: 2015-03-08 22:28:51+00:00
draft: false
title: DIP Component Package
type: page
url: /pcb-design/component-packages/dip-component-package
---

# Overview


<table >
<tbody >
<tr >

<td >Name
</td>

<td >Dual In-Line Package
</td>
</tr>
<tr >

<td >Synonyms
</td>

<td >



  * N Package (Analog Devices)
  * PDIP (plastic dual-inline package)
  * CDIP (ceramic dual-inline package)


</td>
</tr>
<tr >

<td >Variants
</td>

<td > 
</td>
</tr>
<tr >

<td >Similar To
</td>

<td >



  * SIP
  * QIP
  * SOIC


</td>
</tr>
<tr >

<td >Mounting
</td>

<td >TH
</td>
</tr>
<tr >

<td >Pin Count
</td>

<td >4-64
</td>
</tr>
<tr >

<td >Pitch
</td>

<td >2.54mm (0.1mil)
</td>
</tr>
<tr >

<td >Solderability
</td>

<td >Easiest chip package to solder! Perfect for protoyping, fits into standard 100mill pitch prototype board.
</td>
</tr>
<tr >

<td >Thermal Resistance
</td>

<td > 
</td>
</tr>
<tr >

<td >Land Area
</td>

<td >The general land area formula for DIP packages A = ((n/2)*2.54) * (width + 1.65mm)  
where n is the number of pins and the width is the rated package width in mm (e.g.  7.62 (300mil), 15.24 (600mil)) 



  * DIP-300-8 : 94.2mm2
  * DIP-300-16: 188.4mm2
  * DIP-300-32: 376.7mm2
  * DIP-600-32: 686.4mm2


</td>
</tr>
<tr >

<td >Height
</td>

<td >5.0mm
</td>
</tr>
<tr >

<td >3D Models
</td>

<td >[DIP-300-8](http://www.3dcontentcentral.com/download-model.aspx?catalogid=1023&id=79), [DIP-300-16](http://www.3dcontentcentral.com/download-model.aspx?catalogid=1023&id=71), [DIP-300-20](http://www.3dcontentcentral.com/download-model.aspx?catalogid=171&id=71043), [DIP-600-40](http://www.3dcontentcentral.com/download-model.aspx?catalogid=171&id=95319)
</td>
</tr>
<tr >

<td >Common Uses
</td>

<td >



  * Through-hole IC's
  * DIP switches
  * Relays/reed switches
  * 7-segment, 4-digit LCD character display footprints (with different package)


</td>
</tr>
</tbody>
</table>


# **Comments**




The most common through-hole IC package. Now mostly superseded by SMT packages. Has standard 100mill pitch spacing. The two rows of legs are usually 300mill (thin-type), or 600mill (fat-type) apart (400mil and 900mil variants are also present). The 600mill package is usually reserved for the larger pin variants. As well as standard through-hole mounting, they can also be inserted into a socket, either by friction or clamping (zero insertion force). Pin numbering is counter-clockwise from the top-left.




Anti-static packaging can easily be made for DIP packages with foam and aluminium foil as shown in the picture below.




[singlepic id=656 w=500 h=500 float=center template=caption]




Components other than ICs can also use this footprint (although they typically have different packages). One example are some 7-segment, 4-digit LCD character displays, which use the DIP-600-12 footprint.




# 3D Renders


[caption id="attachment_9882" align="aligncenter" width="297"][![A 3D render of the DIP-16 component package.](/images/2015/03/dip-16-component-package-3d-render.jpg)
](/images/2015/03/dip-16-component-package-3d-render.jpg) A 3D render of the DIP-16 component package.[/caption]

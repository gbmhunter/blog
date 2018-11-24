---
author: gbmhunter
date: 2015-04-07 06:56:11+00:00
draft: false
title: DPACK Component Package
type: page
url: /pcb-design/component-packages/dpack-component-package
---

[mathjax]




# Overview


<table >
<tbody >
<tr >

<td >Name
</td>

<td >DPAK
</td>
</tr>
<tr >

<td >Synonyms
</td>

<td >



  * Case 369C (On Semiconductor's name for the TO-252AA)
  * CPD (Rohm Semiconductor)
  * SC-63 (JEITA, EIAJ)
  * SOT-428
  * TO-252 (JEDEC Transistor Outline 252)
  * TO-252AA (only applies to DPAK3 (TO-252-3))


</td>
</tr>
<tr >

<td >Variants
</td>

<td >



  * DPAK3 (TO-252-3, TO-252AA)
  * TO-252-5-P1 (5-pin, square and short tab)
  * TO-252-5-P2 (5-pin, rounded and longer tab). If there is no suffix listed, it will likely be this variant.


</td>
</tr>
<tr >

<td >Similar To
</td>

<td >TO-220AB
</td>
</tr>
<tr >

<td >Mounting
</td>

<td >SMD
</td>
</tr>
<tr >

<td >Pin Count
</td>

<td >



  * 3 (DPAK)
  * 5 (TO-252-5)


</td>
</tr>
<tr >

<td >Pitch
</td>

<td >1.27mm (50mill)
</td>
</tr>
<tr >

<td >Solderability
</td>

<td >Quite easy to hand-solder, although the large tab can make things difficult because of it's heatsinking capabilities.
</td>
</tr>
<tr >

<td >Thermal Resistance
</td>

<td >


TO-252-3 (DPAK)





  * \(T_{JA} = 80^{\circ}{\rm C}/W\) (pads only, no copper fill)



TO-252-5-xx (both P1 and P2 suffixes)





  * \(T_{JA} = 59^{\circ}{\rm C}/W\) (pads only, no copper fill)
  * \(T_{JA} = 26^{\circ}{\rm C}/W\) (high-wattage land pattern)
  * \(T_{JA} = 20^{\circ}{\rm C}/W\) (one square inch of copper surrounding package, connected to ground)
  * \(T_{JA} = 7^{\circ}{\rm C}/W\) (high-wattage land pattern with thermal vias to bottom layer)


</td>
</tr>
<tr >

<td >Dimensions
</td>

<td >n/a
</td>
</tr>
<tr >

<td >3D Models
</td>

<td >



  * [DPAK, TO-252AA, by Bill Brooks (this is DPAK3)](http://www.3dcontentcentral.com/download-model.aspx?catalogid=171&id=444823)
  * [DPAK-5, by Alexey Olehnovich](http://www.3dcontentcentral.com/download-model.aspx?catalogid=171&id=432344) 


</td>
</tr>
<tr >

<td >Common Uses
</td>

<td >



  * MOSFET's
  * Linear voltage regulators


</td>
</tr>
</tbody>
</table>


# Comments




Commonly used for power MOSFET's and high power voltage regulators. Features a large tab/pin which can be soldered directly onto the PCB, providing good heatsinking capabilities.




If DPAK is referred to by itself, with no pin number indication (e.g. DPAK3, DPAK5), it is usually referring to the 3-pin version.




# 3D Renders


{{< figure src="/images/2015/04/to-252-component-package-3d-render.jpg" width="340px" caption="A 3D render of the TO-252 component package." caption-position="bottom" >}}


# Other Images




[singlepic id=725 w=500 h=500 float=center template=caption]




[singlepic id=335 w=400 h=400 float=center template=caption]

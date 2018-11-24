---
author: gbmhunter
date: 2015-01-08 03:04:07+00:00
draft: false
title: SOT-223 Component Package
type: page
url: /pcb-design/component-packages/sot-223-component-package
---

[mathjax]




# Overview


<table >
<tbody >
<tr >

<td >Name
</td>

<td >SOT-223 (Small-outline Transistor 223)
</td>
</tr>
<tr >

<td >Synonyms
</td>

<td >



	  * DCQ (SOT-223-5, Texas Instruments)
	  * DCY (SOT-223, Texas Instruments)
	  * MP04A (National Semiconductor)
	  * PG-SOT-223-4 (Infineon Technologies)
	  * R-PDSO-G6 (SOT-223-5, Texas Instruments)
	  * ST Package (Analog Devices)
	  * TO-261-4


</td>
</tr>
<tr >

<td >Variants
</td>

<td >



	  * SOT-223-3 (3 pin excl. tab)
	  * SOT-223-4 (4 pin excl. tab)
	  * SOT-223-5 (5 pin excl. tab)


</td>
</tr>
<tr >

<td >Similar To
</td>

<td >



	  * [SOT-23](http://blog.mbedded.ninja/pcb-design/component-packages/sot-23-component-package)


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

<td >3, 4, 5 (excl. tab)
</td>
</tr>
<tr >

<td >Pitch
</td>

<td >n/a
</td>
</tr>
<tr >

<td >Solderability
</td>

<td >Easily solderable by hand
</td>
</tr>
<tr >

<td >Thermal Resistance
</td>

<td >


**SOT-223-3**





	  * \(T_{JA} = 174^{\circ}{\rm C}/W\) (standard footprint)
	  * \(T_{JA} = 75^{\circ}{\rm C}/W\) (\(300mm^2\) heatsink area)
	  * \(T_{JA} = 63^{\circ}{\rm C}/W\)(\(600mm^2\) heatsink area)
	  * \(T_{JA} = 27^{\circ}{\rm C}/W\)(one square inch copper fill surrounding package)



**SOT-223-5**





	  * \(55-165^{\circ}{\rm C}/W\) (see the SOT-223-5 section below)





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

<td >n/a
</td>
</tr>
<tr >

<td >Common Uses
</td>

<td >



	  * MOSFET's
	  * Load switches
	  * High-power linear regulators
	  * Current sources


</td>
</tr>
</tbody>
</table>


# Conflicting Naming Conventions




**WARNING:** Some manufacturers use the term SOT-223-3 to refer to the 3-pin, 1 -tab package, while others count the tab as a "pin", and so name it SOT-223-4. However this conflicts with the first lot of manufacturers who use the term SOT-223-4 to refer to the package with 4 pins and 1 tab. In summary, BE CAREFUL.




This page associates the x in SOT-223-x to stand for the **number of pins excluding the tab**. This is the most popular convention.




# SOT-223-3




The SOT-223-3 (TO-261AA) component package is the most common variant within the SOT-223 family. It looks similar to the SOT-23 package, but with a tab on one side instead of legs.



{{< figure src="SOT-223" width="341" caption="](/images/2015/01/to-261aa-sot-223-component-package-3d-model.jpg) A 3D render of the TO-261AA (SOT-223-3) component package." caption-position="bottom" >}}



It is commonly used for medium-power linear regulators and load switches.




## **Thermal Resistance**




Texas Instruments gives the following thermal resistance data for the SOT-223-3 package (taken from http://www.ti.com/lit/ds/symlink/tps7b6933-q1.pdf, **as of Dec 2017, URL is unavailable**).


<table >
<tbody >
<tr >

<td >**Property**
</td>

<td >**Symbol**
</td>

<td >**Value**
</td>
</tr>
<tr >

<td >Junction-to-ambient thermal resistance
</td>

<td >\(R_{\theta JA}\)
</td>

<td >\(64.2^{\circ}C/W\)
</td>
</tr>
<tr >

<td >Junction-to-case (top) thermal resistance
</td>

<td >\(R_{\theta JC(top)}\)
</td>

<td >\(46.8^{\circ}C/W\)
</td>
</tr>
<tr >

<td >Junction-to-board thermal resistance
</td>

<td >\(R_{\theta JB}\)
</td>

<td >\(13.3^{\circ}C/W\)
</td>
</tr>
<tr >

<td >Junction-to-top characterisation parameter
</td>

<td >\(R_{\psi JT}\)
</td>

<td >\(6.3^{\circ}C/W\)
</td>
</tr>
<tr >

<td >Junction-to-board characterisation parameter
</td>

<td >\(R_{\psi JB}\)
</td>

<td >\(13.2^{\circ}C/W\)
</td>
</tr>
</tbody>
</table>


All of the parameters in the above table were measured with the SOT-223-3 package soldered to a _JEDEC standard high-K profile, JESD 51-7, 2s2p four layer board with 2-oz copper_. The copper pad was soldered to the thermal land pattern.



{{< figure src="SOT-223" width="400" caption="](/images/2015/01/to-216aa-sot-223-component-package-thermal-resistance.jpg) The thermal resistance of the TO-261AA (SOT-223-3) component package for various PCB footprints." caption-position="bottom" >}}






## Standard Linear Regulator Pinout




The SOT-223-3 package is commonly used for small, medium-power linear regulators. There is a de-facto standard pinout that many manufacturers use when incorporating a linear regulator into the SOT-223-3 package:



{{< figure src="/images/2015/01/sot-223-3-component-package-footprint-layout-example-linear-regulator-with-caps.png" width="441" caption="The de-facto standard pinout for a linear regulator inside a SOT-223-3 package. This image also shows the standard PCB footprint used to achieve a low thermal resistance. Image from http://www.ti.com/." caption-position="bottom" >}}



## Standard Load Switch Pinout




The SOT-223-3 package is commonly used for smaller low and high-side load switches. As such, there is a de-facto standard pinout that many manufacturers use for load switches in the SOT-223-3 package:



{{< figure src="/images/2015/01/sot-223-4-component-package-load-switch-typical-pinout.png" width="469" caption="The de-facto standard pinout for a load switch in a SOT-223-3 package. Image from http://www.infineon.com/." caption-position="bottom" >}}



# SOT-223-4




This variant can be confused with the three pin and one pad variant (SOT-223-3) if you decide to count the pad as well as the pins in the number.



{{< figure src="/images/2015/01/sot-223-4-component-package-3d-render.jpg" width="268" caption="A 3D render of the SOT-223-4 component package. Image from http://www.datasheetdir.com/." caption-position="bottom" >}}



# SOT-223-5




## Dimensions




Below are the dimensions of the SOT-223-5 package as specified by Texas Instruments.



{{< figure src="/images/2015/01/sot-223-5-component-package-dimensions-ti.png" width="695" caption="The dimensions of the SOT-223-5 component package. Image from http://www.ti.com/." caption-position="bottom" >}}



## Footprint (Land Pattern)




Below is the recommended footprint (land pattern) for the SOT-223-5 component package as specified by Texas Instruments.



{{< figure src="land pattern" width="858" caption="](/images/2015/01/sot-223-5-component-package-recommended-footprint-land-pattern-ti.png) A recommended footprint (land pattern) for the SOT-223-5 component package. Image from http://www.ti.com/." caption-position="bottom" >}}



## Thermal Resistance




Below is a graph showing the thermal resistance of the SOT-223-5 package with varying copper area.



{{< figure src="/images/2015/01/sot-223-5-component-package-thermal-resistance-vs-copper-area-graph-ti.png" width="1059" caption="Graph of thermal resistance vs. copper area for the SOT-223-5 component package. Image from http://www.ti.com/." caption-position="bottom" >}}



As you can see, as the copper area increases, the thermal resistance decreases asymptotically to around \(55^{\circ}{\rm C}/W\).

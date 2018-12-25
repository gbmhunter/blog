---
author: gbmhunter
date: 2011-09-05 06:10:43+00:00
draft: false
title: Connectors
type: page
url: /electronics/components/connectors
---

## Overview

Unlike most other electrical components, most connector manufacturers do not append any letter codes in the part numbers for connectors, rather they are just a long sequence of numbers. This can make part recognition very confusing (e.g. when you see an IC with "74" in it's part name, you instantly think of digital logic). A standard way to indicate pin 1 on a connector PCB footprint is to make the copper pad surrounding the pin 1 hole to be a different shape than the rest (e.g. square, while all the others are round).

## Terminology

<table>
	<thead>
		<tr>
			<th>Term</th>
			<th>Description</th>
		</tr>
	</thead>
<tbody >
<tr >
<td >Female
</td>

<td >See socket.
</td>
</tr>
<tr >

<td >Genderless
</td>

<td >A connector that can be mated with it's self (i.e. there is no seperate male/female or plug/receptacle parts).
</td>
</tr>
<tr >

<td >Header
</td>

<td >Can either stand for a particular style of connector (see the Header section), or it can stand for a male gender connector.
</td>
</tr>
<tr >

<td >Hermaphroditic
</td>

<td >See genderless.
</td>
</tr>
<tr >

<td >Loaded
</td>

<td >On connectors with a large number of pins, this indicated how many of the pins come shipped with contacts. The contact pattern can also vary.
</td>
</tr>
<tr >

<td >Male
</td>

<td >See plug.
</td>
</tr>
<tr >

<td >Plug
</td>

<td >A connector which has rod-shaped part for plugging into socket. Also called a male connector, or header.
</td>
</tr>
<tr >

<td >Receptacle
</td>

<td >See socket.
</td>
</tr>
<tr >

<td >Socket
</td>

<td >A connector which has holes that accepts plug pins. Also called a female connector or receptacle.
</td>
</tr>
</tbody>
</table>


## Connector Manufacturers

<table >
	<thead>
		<tr>
			<th>Name</th>
			<th>Website</th>
			<th>Range</th>
			<th>Provide 3D Models</th>
			<th>Affordability (1 expensive, 10 cheap)</th>
			<th>Site Usability (1 bad, 10 good)</th>
		</tr>
	</thead>
<tbody >
<tr >

<td >3M
</td>

<td >[http://www.3m.com/](http://www.3m.com/)
</td>

<td >Card edge (inc. latching)
</td>

<td >Yes, but not always for all parts in a connector family. (Step, IGES, Parasolid)
</td>

<td >3
</td>

<td >
</td>
</tr>
<tr >

<td >Harting
</td>

<td >[http://www.harting.com](http://www.harting.com/)
</td>

<td >Card edge
</td>

<td >Yes (Step)
</td>

<td >5
</td>

<td >
</td>
</tr>
<tr >

<td >Hirose
</td>

<td >[http://www.hirose.com/](http://www.hirose.com/)
</td>

<td >High-end circular
</td>

<td >Yes, after providing your paid-for email address. (Step)
</td>

<td >5
</td>

<td >
</td>
</tr>
<tr >

<td >Molex
</td>

<td >[http://www.molex.com](http://www.molex.com/)
</td>

<td >Card edge
</td>

<td >Yes (Step)
</td>

<td >3
</td>

<td >6
</td>
</tr>
<tr >

<td >Samtec
</td>

<td >[http://www.samtec.com](http://www.samtec.com/)
</td>

<td >Backplane, headers (various pitches, and both square-post and machined), rugged circular.
</td>

<td >Yes (Step).
</td>

<td >7
</td>

<td >8
</td>
</tr>
<tr >

<td >TE Connectivity
</td>

<td >[http://www.te.com](http://www.te.com/)
</td>

<td >Backplane
</td>

<td >?
</td>

<td >6
</td>

<td >
</td>
</tr>
</tbody>
</table>

## Tin vs. Gold Plating

Many connectors come to at least two plating options, either tin or gold. Gold is a more expensive option, but offers a lower initial contact resistance, lower corrosion over time, and lower mating force (which may or may not be a good thing).

There is the 50:50:50 rule (taken from www.connector.com, as of **Dec 2017, link no longer alive**) when it comes to deciding which plating to choose. The rule says that tin is the best choice if:

* You have less than 50 contacts (due to the mating force getting too large)
* The connector will experience 50 or less mating cycles
* You can live with 50mOhms of contact resistance over time

Selecting gold tinned contacts can add a good US$0.50 or more to the price of the connnector.

Mixing the two plating metals is not recommended! The corrosion rate is greatly increased when two dissimilar metals come into contact with each other (this is due to the difference in the metal's electrode potentials, which is +1.5V for gold, and only +0.15V for tin).

{{< figure src="/images/electronics-components/gold-and-tin-plated-contacts.jpg" caption="You can see the difference between the gold and tin plated header connectors. Image from http://www.fischerelektronik.de/en/latest-news/press-releases/releases/smd-high-precision-male-header-with-2point54mm-grid-spacing-horizontal-design/."  width="900px" >}}

## Mass Pinned Header's

These are good for making many connections between PCB boards, while holding the boards parallel or perpendicular to each other.

Example: Harting 0903 296 6825 96pin DIN41612 Socket Element14 Code: 1096910

## USB

USB plug assemblies (non pre-assembled plugs) are hard to come by. However, they do exist. Here is a picture of a Molex Mini-USB Type-B plug assembly.

{{< figure src="/images/electronics-connectors/molex-mini-usb-type-b-plug-assembly-photo.jpg" caption="The Molex Mini Usb Type B plug assembly."  width="400px" >}}

## Jumpers

Jumpers are used to connect adjacent pins on a header together. They can also be called **zero-Ohm links **or** zero-Ohm resistors. **

{{< figure src="/images/electronics-connectors/using-jumpers-to-connect-pin-headers-to-test-leads.jpg" caption="A clever way of using jumpers to connect test leads to header pins. Image from http://hackadaycom.files.wordpress.com/2013/06/dgcaicca.jpg."  width="550px" >}}

The term zero Ohm resistor is usually reserved for a resistor package whose resistance is close to zero ohms. In recent years these have tended to be in small SMD packages such as the 0603 chip package. A problem with these zero Ohm resistors is that they usually have quite a high resistance compared to a similar sized track on the PCB. Manufacturers also make "true" zero links in these packages, designed to have a much smaller resistance. One such example is the Keystone 5110, an 0603 sized zero-ohm jumper.

{{< figure src="/images/2011/09/keystone-5110-smd-0604-jumper-3d-model.jpg" width="222px" caption="3D model of the Keystone 0603 'true' zero-Ohm jumper. Image from http://www.keyelco.com/product.cfm/Zero-ohm-SMT-Jumpers/0603-Zero-ohm-SMT-Jumper/product_id/14038."  >}}

## Spring-Loaded (Pogo) Connectors

Spring-loaded connectors (also called Pogo connectors after the similarity to a pogo stick), are connectors that use springs to push the pins of the connectors together to make an electrical connection. They are commonly used in scenarios where a fast, temporary connection is needed between two circuit boards (e.g. automatic test equipment/bed of nails testing devices, and in-circuit programming devices for microcontrollers).

One company which is doing interesting things with spring-loaded connectors is Tag-Connect. They sell a range of spring-loaded pin based wire-to-board connectors.

{{< figure src="/images/2011/09/tc2050-idc-nl-pogo-pin-connector-photo.png" width="562px" caption="Photo of the TC2050-IDC-NL connector by Tag-Connect."  >}}

They sell legged and no-legged versions. The legged versions have retainers (legs) which clip the connector to the PCB and are designed for a more persistant, hands-free connection. The no-legged versions have no retainers (legs), and a smaller footprint. You have to physically hold the connector against the board while using and are designed for a quick, non-persistant connection.

{{< figure src="/images/2011/09/tc2050-idc-nl-pogo-pin-connector-pcb-footprint.png" width="806px" caption="The recommended PCB footprint for accepting the TC2050-IDC-NL connector by Tag-Connect."  >}}

## Circular Connectors

## DIN Connectors

The DIN connector was originally developed by the German National Standards Organisation. The known standards are:

* DIN 41524
* DIN 41612
* DIN 43356
* DIN 41652

DIN connectors with different numbers of pins can sometimes mate with each other. For example, 3-pin DIN connectors used for mono audio can mate with the left-channel of larger 5-pin DIN stereo connections. DIN connectors were used for the PS/2 keyboard and mouse connectors (know succeeded by the USB connector).

## Mini-DIN Connectors

Mini-DIN connectors are smaller versions of the DIN connectors and are 9.5mm in diameter. A major difference between DIN and Mini-DIN connectors is that Mini-DIN connectors cannot be mated with any of different-number-of-pins Mini-DIN connectors.

Mini-DIN connectors have been used for the S-video interface.

## Telecom Connectors

## BT Connector

The connector called the "BT" connector (which is an acronym for the British Telecom connector) is commonly used through out houses in many countries (including the U.K. and New Zealand) to plug into a  Telecom jack that is mounted on the wall. It's proper name is the BS6312 431A plug. You can get cheap BT to RJ-11 adapters.

## Contactless Connectors

Contactless connectors is the name given to connectors which don't require a physical electrical contact between the two mating pieces (they still may require physical mechanical contact). They can transmit both signals and power from one side to the other. This is normally done through magnetic/capacitive coupling.

This is still a relatively new field compared to other forms of connectors, and unit prices are still very high.

TE Connectivity make a range under the family name [ARISO](http://www.digikey.co.nz/en/product-highlight/t/te-connectivity-amp/ariso-contactless-connectivity). They are capable to transmitting up to 12W of power at 24VDC.

{{< figure src="/images/2011/09/te-connectivity-ariso-m30-contactless-connector-pair-photo.png" width="640px" caption="A photo of TE Connectivity's ARISO M30 contactless connectors. Image from www.te.com."  >}}

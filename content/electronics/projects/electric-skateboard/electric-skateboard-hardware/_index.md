---
author: gbmhunter
date: 2011-09-06
draft: false
title: Electric Skateboard Hardware
type: page
---

This page contains basic stats about all the individual pieces of hardware that went into the construction of the electric skateboard.

Current Hardware

* Motor
* Motor Controller
* Battery
* Battery Management System (BMS)
* Skateboard Electronics Enclosure
* Lights
* High Power On/Off Relay

## Current Hardware

## Motor

The motor was brought from TradeMe.

<table>
<tbody >
<tr >
<td >Technology</td>
<td >Brushed DC</td>
</tr>
<tr >
<td >Brand</td>
<td >Unite Motor</td>
</tr>
<tr >
<td >Model</td>
<td >MY8919</td>
</tr>
<tr >
<td >Rated Voltage</td>
<td >36V</td>
</tr>
<tr >
<td >Rated Current</td>
<td >28.4A</td>
</tr>
<tr >
<td >Rated Power</td>
<td >800W</td>
</tr>
<tr >
<td >Rated Speed</td>
<td >3000RPM</td>
</tr>
<tr >
<td >Weight</td>
<td >3.42kg</td>
</tr>
<tr >
<td >Vendor</td>
<td><a href="http://www.trademe.co.nz/Members/Listings.aspx?member=3683662">Greenskate</a> from <a href="http://www.trademe.co.nz/">TradeMe</a>.</td>
</tr>
</tbody>
</table>

Motor Power Wire thickness (individual): 3.25mm (OD)  

Wire thickness (total, including shealth): 8mm (OD)

{{< figure src="/images/electronics-electricskateboard-secondprototype/bdc-motor-01.jpg" caption="The new 800W, 36V brushed motor I got after the BLDC motor blew up."  width="600px" >}}

## Motor Controller

The motor controller was brought after I gave up in frustration about trying to build my own half-bridge (and I didn't give up easily, see the post [Skateboard Half-Bridge Blew Up (for the 10th+ time)](/posts/2012/06-09-skateboard-h-bridge-blew-up-for-the-10th-time/)).


<table>
<tbody >
<tr >
<td >Manufacturer
</td>
<td >?</td>
</tr>
<tr >
<td >Manufacturer Part Number</td>
<td>A121#</td>
</tr>
<tr >
<td >Supplier</td>
<td >[Tiger Ecommerce Co. LTD (AliExpress)](http://www.aliexpress.com/store/801114)</td>
</tr>
<tr >

<td >Supplier Part Number
</td>

<td >[486387907](http://www.aliexpress.com/item/A121-Wide-Voltage-DC12-60V-30A-1500W-PWM-Pulse-DC-Motor-Speed-Controller-Adjuster-0-100/486387907.html)
</td>
</tr>
<tr >

<td >Supplier Price
</td>

<td >US$54.38
</td>
</tr>
<tr >

<td >Rated Bridge Voltage
</td>

<td >12-60V
</td>
</tr>
<tr >

<td >Maximum Continuous Bridge Current
</td>

<td >30A
</td>
</tr>
<tr >

<td >Current Trip Limit
</td>

<td >35A
</td>
</tr>
</tbody>
</table>

I had a sneak peak around in the guts of this thing, and I discovered that it had four n-channel MOSFETs (STP75NF75x4) and four schottky diodes (NFA19) to make up the half-bridge. Both components were in the [TO-220AB](/pcb-design/component-packages/to-220ab-component-package/) package, and each all four of each were in series to increase the current capabilities.

{{< figure src="/images/electronics-electricskateboard/2012-06-15-18-31-28.jpg" caption="The quarter-bridge motor driver that I ended up buying from AliExpress."  width="600px" >}}

## Battery

The battery was brought from AliExpress.

<table>
<tbody >
<tr >

<td >Supplier
</td>

<td >Shirley Hu (AliExpress)
</td>
</tr>
<tr >

<td >Supplier Price
</td>

<td >US$363.42
</td>
</tr>
<tr >

<td >Chemistry
</td>

<td >LiFePO4
</td>
</tr>
<tr >

<td >Brand
</td>

<td >?
</td>
</tr>
<tr >

<td >Rated Voltage
</td>

<td >48V
</td>
</tr>
<tr >

<td >Capacity
</td>

<td >10Ah (1.728MJ)
</td>
</tr>
<tr >

<td >Maximum Continuous Discharge Current
</td>

<td >20A
</td>
</tr>
<tr >

<td >Maximum Instantaneous Dischage Current (BMS Limited)
</td>

<td >60A
</td>
</tr>
<tr >

<td >Size
</td>

<td >270x180x75mm
</td>
</tr>
<tr >

<td >Weight
</td>

<td >5.9kg
</td>
</tr>
</tbody>
</table>

{{< figure src="/images/electronics-electricskateboard-secondprototype/2012-01-29-15-05-51.jpg" caption="Working out how to mount the 48V 10Ah LiFePO battery onto the bottom of the board. The foam is used to pad the battery and protect it when the board flexes during use."  width="600px" >}}

## Battery Management System (BMS)

The battery management system came with the LiFePo battery. It protects the battery from high currents, provides a mechanism for charging, and charge balances the individual cells in the battery.

<table>
<tbody >
<tr >

<td >Enclosure Size (w*l*h, mm)
</td>

<td >235*120*45
</td>
</tr>
<tr >

<td >PCB Size (w*l*h, mm)
</td>

<td >198*61*10
</td>
</tr>
<tr >

<td >Weight (grams)
</td>

<td >n/a
</td>
</tr>
</tbody>
</table>

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-02-25-16-20-34.jpg"   width="600px" >}}

## Skateboard Electronics Enclosure

**Specs:**

<table>
<tbody >
<tr >

<td >Brand
</td>

<td >Bud Industries
</td>
</tr>
<tr >

<td >Model
</td>

<td >PN-1329-CMB
</td>
</tr>
<tr >

<td >Datasheet
</td>

<td >[External Link](http://www.budind.com/pdf/hb1329mb.pdf)
</td>
</tr>
<tr >

<td >External Dimensions (w*h*d)
</td>

<td >222x146x75mm
</td>
</tr>
<tr >

<td >Environmental Rating
</td>

<td >IP67
</td>
</tr>
<tr >

<td >Weight
</td>

<td >499g
</td>
</tr>
<tr >

<td >Vendor
</td>

<td >Digi-Key
</td>
</tr>
<tr >

<td >Vendor Part Num
</td>

<td >377-1895-ND
</td>
</tr>
</tbody>
</table>


{{< figure src="/images/electronics-electricskateboard-final-mech/skateboard-electronic-enclsoure-product-photo.jpg"   width="500px" >}}

## Lights

### White Front Lights And Red Rear Light


<table>
<tbody >
<tr >

<td >Voltage
</td>

<td >12V
</td>
</tr>
<tr >

<td >Current
</td>

<td >?
</td>
</tr>
<tr >

<td >Rated Power
</td>

<td >1W
</td>
</tr>
<tr >

<td >Vendor
</td>

<td >Deal Extreme
</td>
</tr>
<tr >

<td >Vendor ID
</td>

<td >11263 ([link to product](http://www.dealextreme.com/p/waterproof-water-tight-high-powered-1w-led-module-12v-white-11263))
</td>
</tr>
</tbody>
</table>


Used for seeing where you are riding at night, and for cars to see you. The red light was made by putting red cellophane over a white light.

{{< figure src="/images/electronics-electricskateboard-final-mech/2012-04-25-13-26-51.jpg"   width="500px" >}}

### Green Flexible EL Skirting Light

<table>
<tbody >
<tr >
<td >Type
</td>
<td >Flexible EL Wire
</td>
</tr>
<tr >

<td >Voltage
</td>

<td >12V
</td>
</tr>
<tr >

<td >Vendor
</td>

<td >Deal Extreme
</td>
</tr>
<tr >

<td >Vendor ID
</td>

<td >41015 ([link to product](http://www.dealextreme.com/p/flexible-2-mode-green-light-el-strip-dc-12v-3m-length-41015))
</td>
</tr>
</tbody>
</table>

## High-Power On/Off Relay

After the low-side MOSFET power switch idea failed, I decided to use a high-power on/off relay.

<table>
<tbody >
<tr >

<td >Manufacturer
</td>

<td >TE Connectivity
</td>
</tr>
<tr >

<td >Manufacturer Part Number
</td>

<td >V23134J1053D642
</td>
</tr>
<tr >

<td >Element14 Order Code
</td>

<td >[991-3793](http://nz.element14.com/te-connectivity/v23134j1053d642/relay-spno-24vdc/dp/9913793)
</td>
</tr>
<tr >

<td >Coil Voltage
</td>

<td >24V
</td>
</tr>
<tr >

<td >Coil Resistance
</td>

<td >332Ω
</td>
</tr>
<tr >

<td >Operating Power
</td>

<td >1.6W
</td>
</tr>
<tr >

<td >Rated Contact Voltage
</td>

<td >500VAC
</td>
</tr>
<tr >

<td >Maximum Continuous Contact Current
</td>

<td >25A
</td>
</tr>
<tr >

<td >Maximum Peak Contact Current
</td>

<td >240A
</td>
</tr>
</tbody>
</table>

{{< figure src="/images/electronics-electricskateboard/2012-06-16-10-41-45.jpg" caption="The relay I decided to use after my low-side MOSFET for turning the board on didn't work. Next to a 9V battery for size comparison."  width="600px" >}}

## Wheels

As mentioned, the wheels were also brought from Green Skate. If you are imagining normal skateboard wheels, you've got it all wrong! These are huge, pneumatic off-road wheels.

{{< figure src="/images/electronics-electricskateboard-firstprototype/img_6309.jpg" caption="One of the four pneumatic wheels used on the electric skateboard."  width="600px" >}}

## Axles

The axles were brought from Green Skate ([www.greenskate.co.nz](http://www.greenskate.co.nz/)). They are designed for the large off-road tires that I brought from the same place. They come with a nice thick 11mm rubber block for shock absorption.

Rear Axle Weight: 1.86kg
Bolt Diameter: 6.0mm  
Bolt Length: 45mm  
Bolt Head Type: Counter-sunk, accepts 4mm hex key
Number of Bolts: 4 (square layout)  
Distance Between Centers: 90mm

## Belt

The belt was supplied with the wheels and axles.

## Old Prototype Hardware

## Motor

* Technology: Brushless DC (BLDC)  
* Brand: Turnigy  
* Voltage: 10-36V  
* Style: Outrunner  
* Shaft Diameter: 10mm  
* Kv: 200  
* Weight: 914g  
* Dimensions: 63mmx92mm  
* Vendor: [Hobby King](http://www.hobbyking.com/)  
* Vendor Code: HXT63-74-200  
* Price: NZ$74.78 (US$59.99)

Notes: One of the largest outrunner motors that Hobby King sells. Sensorless motor, to requires an ESC that used the back EMD for position detection.

{{< figure src="/images/electronics-electricskateboard-firstprototype/img_6210.jpg" caption="A supposedly '3kW' BLDC motor I got from Hobby King."  width="600px" >}}

## Battery

* Chemistry: Li-Po  
* Brand: Turnigy  
* Voltage: 29.6V (8 Li-Po cells, quoted as 8S)  
* Capacity: 5800mAh  
* Max Discharge Rate: 203A (quoted as 25-35C)  
* Vendor: [Hobby King](http://www.hobbyking.com/)  
* Vendor Code: T5800L.8S.25  
* Price: NZ$131.83 (US$99.99)  

Notes: 8AWG wire connections. Supplied with 5.5mm gold connectors, but I replaced them with the 4mm gold connectors because I won't be drawing too much current. These connectors require a small blow torch to solder as they are too large for a soldering iron to handle (even when set at 450°C!). Update (05/03/11): One of the eight cells has died. There is not voltage across it and the cell draws current without a voltage appearing across it's terminals. In other words, rooted. This was on the second charge! I'm going to have words with Hobby King.

{{< figure src="/images/electronics-electricskateboard-firstprototype/img_6221.jpg" caption="A lithium-ion polymer battery from Hobby King."  width="600px" >}}

## Motor Driver

* Technology: BLDC ESC (electronic speed controller)  
* Brand: Turnigy  
* Model No: 70A-HV-OPTO  
* Min Voltage: 18.5V (5 Li-Po Cells, quoted as 5S)  
* Max Voltage: 44.4V (12 Li-Po Cells, quoted as 12S)  
* Max Current: 70A  
* Vendor: [Hobby King](http://www.hobbyking.com/)  
* Vendor Code: KF-70A  
* Price: NZ$92.27 (US$69.99)  
* Manual: n/a

An electronic speed controller (ESC) in hobby circles is a power circuit which controls the speed of a brushless DC motor. They typically are rated for motor currents between 20-150A and use MOSFETs, PWM and back EMF sensing to switch the currents through the motor windings at the correct time. They are necessary to set up a rotating magnetic field since BLDC motors are not commutated like brushed DC motors. They typically accept a PWM input to control the speed of the motor (which is designed to be directly connect to a RC receiver, but I will be generating the PWM with a micro-controller instead), and feature programmable settings to control the characteristics of the controller (such as acceleration, braking force e.t.c).

{{< figure src="/images/electronics-electricskateboard-firstprototype/img_6226.jpg"   width="600px" >}}

## ESC Programming Card (redundant after v1.1 failed)

* Brand: Turnigy  
* Model No: Unknown  
* Vendor: [Hobby King](http://www.hobbyking.com/)  
* Vendor Code: [Unknown](http://www.hobbyking.com/hobbyking/store/uh_viewItem.asp?idProduct=2169)
* Price: US$6.95  
* Manual: n/a

A programming card connects to the ESC and makes programming of the variable settings of the ESC easy. Without a programming card, you have to do it the harder and not so easy to understand way of using the the throttle. Anyway, it turns out that the particular programming card I got isn't compatible with the ESC anyway. Even though Hobby Kings website says it is, and I quote "Compatible with all Hobbywing, Thunderpower, Turnigy and OEMRC Sentilon speed controllers". In the end I had to use the throttle method, which worked perfectly fine even though the throttle and PWM signal was custom made. Goes to show I got the programming half right!

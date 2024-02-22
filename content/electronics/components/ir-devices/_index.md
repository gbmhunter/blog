---
authors: [ Geoffrey Hunter ]
date: 2011-09-03
draft: false
lastmod: 2024-01-31
title: IR Devices
type: page
---

## Overview

Infrared devices are used commonly used in electronics for communication, object detection, electrical isolation and illumination. The vague and broad category of 'infrared devices' includes infrared emitting diodes (IEDs), phototransistors, and photodiodes. Phototransistors and photodiodes can actually also be used for visible light, but only their infrared use will be discussed here.

Diodes which emit visible light are discussed on the [LEDs page](/electronics/components/diodes/light-emitting-diodes-leds/).

Diodes which don't emit light at all are discussed on the [Diodes page](/electronics/components/diodes).

## Infrared Emitting Diodes

### Important parameters

1. Peak wavelength
2. Peak current
3. Average current
4. Package size
5. Half-angle

### Application Circuits

Infrared diodes are normally driven continuously for IR illumination or pulsed for object detection, communication or isolation.

### Examples

**SFH4056 - High Power Infrared Emitter (850nm)**

Manufacturer: OSRAM  

Manufacturer Code: SFH4056  

Supplier: DigiKey  

Supplier Code: 475-2909-1-ND  

Notes: Small SMD infrared emitter with a little light blocker around the sides of the diode

## Photodiodes

Photodiodes receive incoming light and convert it into electrical energy, which can be detected as either a current or voltage, depending on the way the surrounding circuit is configured. They are an alternative to phototransistors to infrared light detection, and offer faster response and the cost of decreased senstivity. Saying that, I have seem to get better object detection range with photodiodes than phototransistors! They also consume less power than the phototransistor (infact they generate power!). Photodiodes can detect light from the visible and infrared spectrum, however some come with specialised filters optimised for the infrared region (generally allowing through 850-950nm light). It should be noted that although they can detect a wide range of light, their peak sensitivty is normally in the infrared spectrum.

### Important parameters

1. Peak wavelength
2. Optical filter/no filter
3. Photocurrent vs light input
4. Amount of dark current (useful to know when operating in photo-conductive mode)

### Design Considerations

* Less susceptible to voltage supply noise than phototransistors as they produce their own current/voltage and do not need to be connected to the supply (on the input of an op-amp)
* Less sensitive than phototransistors
* Faster response time than phototransistors
* When operating in photovoltaic mode, the built up charge can take a long time to dissapte, making it unsuitable for pulsed operation. Use in photoconductive mode instead.

### Application Circuits

Photodiodes are normally interfaced to a op-amp to produce a voltage output that is related to the incident light level. Essentially, a photodiode can be modelled as a current source is parallel with a high resistance and capacitance. There are essentially two 'modes' of operation, the photo-voltaic and photo-conductive mode.

Photovoltaic mode is when the photo diode is not reverse biased. Incident light causes a voltage to appear across it's terminals in the forward direction. This can be amplified using a standard voltage-to-voltage amplifier, or can be amplified using a current-to-voltage amplifier (also called a trans-impendence amplifier). Photo-conductive mode is when the diode is reverse biased in a pseudo 'short-circuit' configuration, in where the diode outputs a current relative to the incident light. In this configuration the diode has to be used in a current-to-voltage amplifier configuration.

You want to apply as much gain as possible in the first stages of amplification to keep the SNR down. If you are using a current-to-voltage amplifier and the diode in photovoltaic mode, doubling the gain increases the SNR by 3dB.

### Examples

**BPW34FS - Silicon PIN Photodiode with Daylight Filter**

A cheap and common SMD photodiode that can be used in a variety of applications. Comes with a daylight filter which is optimised for 950nm light.

Manufacturer: OSRAM MAnufacturer Code: BPW34FS Element 14 Code: 1212747 Element 14 Price: NZ$2.47 (1), NZ$1.32 (100)

**SFH2400xx - Silicon PIN Photodiode with Very Short Switching Time**

This diode has a smaller area than the BPW34FS. Availiabe with no filter (xx = "") or with a sunlight filter (xx = "FA").

Manufacturer: OSRAM MAnufacturer Code: SFH4200xx Element 14 Code: 122-6452 Element 14 Price: NZ$2.15 (1), NZ$1.30 (100)

## Phototransistors

Phototransistors use the base-emitter junction of a transistor as a photodiode and exposes it to the environment. This causes the transistor to turn on when light hits the junction. They offer better sensitvity than photodiodes, but have a slower response and consumer more power.

### Important Parameters

1. Peak wavelength
2. Optical filter/no filter (usually an infrared-pass filter)
3. Forward current vs light input

### Thermopiles

Thermopiles are infrared sensors that convert thermal energy into electrical energy. Their output is **driectly proportional** to incident radiation (as opposed to pyroelectric devices whose output is proportional to the rate of change of incident radiation).

They are built by connecting a number of thermocouples together in series (a thermocouple being a junction of dissimilar metals). Because thermocouples themselves can only measure a difference in temperature, so only can a thermopile. Some devices using thermocouples also have an absolute temperature sensor to use as a reference point, so they can give back a temperature reading.

Compared to pyroelectrics, thermopiles have a **low impedance**.

The Panasonic Grid-eye sensor uses this technology.

## Pyroelectrics

Pyroelectric sensors are infrared sensors whose output is proportional to the **rate of change** of incident radiation (as opposed to thermopiles whose output is directly proportional to the incident radiation).

## Passive Infrared Receiver (PIR) Sensors

PIR sensors are pyroelectric infrared devices. They may not detect motion coming directly to, or directly away from the sensor. Lowest temperature difference for detection can be around \(4^\cdot C\).

Popular brands include Zmotion, Parallax, Panasonic.

## Emissivities

The emissivity of a material is it's relative ability of it's surface to emit energy as radiation. Bulky, dull materials usually have high emissivity (0.98), while shiny object have low emissivity (0.02).

The following table lists emissivities of common materials (source of this data was a manual for an IR range thermometer, 700-EN-00):

<table>
	<thead>
		<tr>
			<th>Material</th>
			<th>Emissivity</th>
		</tr>
	</thead>
<tbody >
<tr >

<td >Aluminium
</td>

<td >0.30
</td>
</tr>
<tr >

<td >Asbestos
</td>

<td >0.95
</td>
</tr>
<tr >

<td >Basalt
</td>

<td >0.95
</td>
</tr>
<tr >

<td >Brass
</td>

<td >0.70
</td>
</tr>
<tr >

<td >Brick
</td>

<td >0.50
</td>
</tr>
<tr >

<td >Carbon
</td>

<td >0.90
</td>
</tr>
<tr >

<td >Ceramic
</td>

<td >0.95
</td>
</tr>
<tr >

<td >Concrete
</td>

<td >0.95
</td>
</tr>
<tr >

<td >Copper
</td>

<td >0.95
</td>
</tr>
<tr >

<td >Dirt
</td>

<td >0.94
</td>
</tr>
<tr >

<td >Frozen Food
</td>

<td >0.90
</td>
</tr>
<tr >

<td >Hot Food
</td>

<td >0.93
</td>
</tr>
<tr >

<td >Glass
</td>

<td >0.85
</td>
</tr>
<tr >

<td >Ice
</td>

<td >0.98
</td>
</tr>
<tr >

<td >Iron
</td>

<td >0.70
</td>
</tr>
<tr >

<td >Lead
</td>

<td >0.50
</td>
</tr>
<tr >

<td >Limestone
</td>

<td >0.98
</td>
</tr>
<tr >

<td >Oil
</td>

<td >0.94
</td>
</tr>
<tr >

<td >Paint
</td>

<td >0.93
</td>
</tr>
<tr >

<td >Paper
</td>

<td >0.95
</td>
</tr>
<tr >

<td >Plastic
</td>

<td >0.95
</td>
</tr>
<tr >

<td >Rubber
</td>

<td >0.95
</td>
</tr>
<tr >

<td >Sand
</td>

<td >0.90
</td>
</tr>
<tr >

<td >Silver (polished)
</td>

<td >0.02
</td>
</tr>
<tr >

<td >Skin
</td>

<td >0.98
</td>
</tr>
<tr >

<td >Snow
</td>

<td >0.90
</td>
</tr>
<tr >

<td >Steel
</td>

<td >0.80
</td>
</tr>
<tr >

<td >Textiles
</td>

<td >0.94
</td>
</tr>
<tr >

<td >Water
</td>

<td >0.93
</td>
</tr>
<tr >

<td >Wood
</td>

<td >0.94
</td>
</tr>
</tbody>
</table>

## More Info

[Wikipedia - Photodiode](http://en.wikipedia.org/wiki/Photodiode) Good article on photodiodes and the photo-voltaic or photo-conductive method of operation.

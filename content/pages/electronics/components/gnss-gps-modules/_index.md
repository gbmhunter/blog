---
author: gbmhunter
date: 2013-10-25 00:02:57+00:00
draft: false
title: GNSS (GPS) Modules
type: page
url: /electronics/components/gnss-gps-modules
---

# Terminology

<table border="0" ><tbody ><tr >
<td >**Term**
</td>
<td >**Description**
</td></tr><tr >
<td >A-GPS
</td>
<td >A-GPS (or AGPS) is an acronym for assisted GPS.
</td></tr><tr >
<td >Chip antenna
</td>
<td >A type of antenna that can be used to receive GNSS signals.
</td></tr><tr >
<td >dB
</td>
<td >A logarithmic ratio used to measure the power gain or less in a RF circuit.
</td></tr><tr >
<td >dBi
</td>
<td >The directivity ratio between the antenna of interest and a **theoretical isotropic antenna** (that is **not** circularly polarized).
</td></tr><tr >
<td >dBic
</td>
<td >The directivity ratio between the antenna of interest and a **theoretical circularly polarized and isotropic antenna.**
</td></tr><tr >
<td >Ephemeris
</td>
<td >Part of the data packet transferred from the satellite to the receiving GNSS device.
</td></tr><tr >
<td >Galileo
</td>
<td >Galileo is a European global satellite navigation system (GNSS).
</td></tr><tr >
<td >GLONASS
</td>
<td >GLONASS is an acronym for **Globalnaya Navigazionnaya Sputnikovaya Sistema**, a satellite navigation system controlled by Russia.
</td></tr><tr >
<td >GNSS
</td>
<td >GNSS is an acronym for **Global Navigation Satellite System**. It is the proper umbrella term for anything related to using satellites for navigation, not GPS, which should only stand for the American system.
</td></tr><tr >
<td >GPS
</td>
<td >GPS is an acronym for **Global Positioning System**, a satellite navigation system developed and controlled by the USA. It is commonly used in error to describe any satellite navigation system.
</td></tr><tr >
<td >IRNSS
</td>
<td >IRNSS is an acronym for **Indian Regional Navigation Satellite System**. It is a GNSS under the control of the Indian government.
</td></tr><tr >
<td >ISRO
</td>
<td >ISRO is an acronym for **Indian Space Research Organisation**. They designed the IRNSS.
</td></tr><tr >
<td >L1
</td>
<td >The 1575MHz civilian frequency band of the GPS system.
</td></tr><tr >
<td >M2M
</td>
<td >M2M is an acronym for **machine-to-machine**. It is used as an umbrella term for GNSS and GPRS devices.
</td></tr><tr >
<td >Patch Antenna
</td>
<td >A type of antenna that can be used to receive GNSS signals.
</td></tr><tr >
<td >SWR
</td>
<td >SWR is an acronym from **standing wave ratio**. The most commonly used variant of SWR is VSWR, and in terms of GPS is used to describe the amount of reflection that a GPS antenna has. An ideal transmission line would have a SWR of 1:1. It is related to return loss.
</td></tr><tr >
<td >Return loss
</td>
<td >Return loss is the loss of signal power due to a reflection caused by a discontinuity in a transmission line. It is usually expressed as a ratio in dB. A higher return loss is better and a lower one, and results in a lower insertion loss (note that negative return losses should really be expressed as a positive number. Return loss should be expressed as a positive number, but conventionally is expressed as a negative one.
</td></tr><tr >
<td >VSWR
</td>
<td >VSWR is an acronym for **voltage standing wave ratio**. It is a type of SWR.
</td></tr></tbody></table>

#  Frequencies

<table style="width: 600px;" border="0" ><tbody ><tr >
<td >**GPS System**
</td>
<td >**Frequency Range**
</td></tr><tr >
<td >Galileo
</td>
<td >1555-1596MHz
</td></tr><tr >
<td >GLONASS
</td>
<td >1246-1257MHz, 1602-1616 MHz
</td></tr><tr >
<td >GPS
</td>
<td >1224-1230MHz, 1575.42MHz (L1)
</td></tr></tbody></table>

# Antenna Basics

{{< figure src="/images/2013/10/gps-bluetooth-antenna-with-isolated-magnetic-dipole-photo.jpg" width="281" caption="Photo of a combined GPS and Bluetooth antenna with an isolated magnetic dipole. Image from www.digikey.com." caption-position="bottom" >}}

## Gain

Because GPS signals transmitted by the satellites have extremely low power once they reach the receiving device, the gain of a GPS antenna is very important!

## Passive vs. Active

Passive antennas require no power supply, and are cheaper and simpler to use. However, they don't work well when the antenna trace length if long. This is a where a powered active antenna with an on-board LNA is better, since it amplifies the signal at the source, before passing it along the antenna trace to the decoder.

## Polarization

GNSS signals are right-hand circularly polarized. Thus it makes sense to get a right-hand polarized antenna also.

## VSWR

For a GPS antenna, the VSWR approaches 1 for the GPS signal frequency. The below graph shows the typical VSWR and efficiency vs. frequency for a passive SMD GPS antenna.

{{< figure src="/images/2013/10/gps-chip-antenna-vswr-and-efficiency-graph.png" width="540" caption="A graph of the VSWR and efficiency vs. frequency for a passive SMD GPS antenna. Image from http://www.fractus.com/sales_documents/FR05-S1-E-0-103/DS_FR05-S1-E-0-103.pdf." caption-position="bottom" >}}

# Types Of Antennas

## Chip

Typical parameter values:

<table style="width: 400px;" border="0" ><tbody ><tr >
<td >Peak linear gain
</td>
<td >2.5 to 3dBi
</td></tr><tr >
<td >Peak RHCP gain
</td>
<td >0.3 to 0.7dBi
</td></tr><tr >
<td >Average gain
</td>
<td >-2.5dBi
</td></tr><tr >
<td >Minimum return loss
</td>
<td >9.5dB to 16dB
</td></tr><tr >
<td >Max. input power
</td>
<td >3W
</td></tr><tr >
<td >Impedance
</td>
<td >50Ω
</td></tr></tbody></table>

Chip antennas are SMD components which look similar to chip resistors or chip capacitors. Chip antennas come in two types; **on ground types**, that require a **ground below them and a clearance around them**, and **ground-cleared** types, that require a **ground-free area** underneath them. Ground-cleared types have the useful ability of being able to be **reverse mounted** onto PCBs. Examples of GNSS chip antenna manufacturers include [Pulse Electronics](http://www.pulseelectronics.com/products/antennas), Antenova, Taiyo Yuden (who also manufacture chip resistors and capacitors), Johanson Technology, and Ethertronics.

{{< figure src="/images/2013/10/gps-chip-antenna-3d-model.jpg" width="278" caption="Photo of a small GPS chip antenna. Image from www.digikey.com." caption-position="bottom" >}}

Below is a typical footprint for a 0603-sized chip antenna. Notice how both the input and ground connect up to the same pad of the chip! (and the other pad is connected to ground only). Although you may think this is a direct short, at microwave frequencies you can do this.

{{< figure src="/images/2013/10/gps-chip-antenna-footprint-w3009.png" width="969" caption="The recommended footprint for the W3009 GPS chip antenna. Image from http://productfinder.pulseeng.com/products/datasheets/W3009.pdfhttp://productfinder.pulseeng.com/products/datasheets/W3009.pdf." caption-position="bottom" >}}

Below is the typical radiation patterns for a 0603-sized chip antenna.

{{< figure src="/images/2013/10/gps-chip-antenna-w3009-typical-free-space-radiation-patterns.png" width="992" caption="The typical radiation pattern for all 3 planes for the W3009 GPS chip antenna. Image from http://productfinder.pulseeng.com/products/datasheets/W3009.pdf." caption-position="bottom" >}}

## Helixes

Helixes are one of the best types of GNSS antennas because their large volume ensures good reception towards the horizon. Because of their size and cost, they are normally used on large, expensive equipment.

## Patch

Patch antennas are common on circuit boards (PCBs), and also for plug in antennas to smallish GNSS devices.

{{< figure src="/images/2013/10/gps-patch-antenna-01-photo.jpg" width="331" caption="Photo of a SMD mounted GPS patch antenna. Image from www.digikey.com." caption-position="bottom" >}}

They are normally made from a base ceramic material (and called ceramic patch antennas). They are typically more expensive than chip antennas but cheaper than helical antennas.

{{< figure src="/images/2013/10/gps-patch-antenna-02-photo.jpg" width="358" caption="Photo of a SMD mounted GPS patch antenna. Image from www.digikey.com." caption-position="bottom" >}} {{< figure src="to PCB" width="407" caption="](/images/2013/10/gps-external-patch-antenna-photo.jpg) Photo of an external (to PCB) GPS patch antenna. Image from www.digikey.com." caption-position="bottom" >}}

# Relativity

GNSS satellites have to account for relativity, otherwise devices uses these satellites would be inaccurate to about 7m.

# Communications With Microcontroller

GPS modules typically output NMEA protocol data, plus the option for a proprietary protocol that usually contains more information or allows extra features.  

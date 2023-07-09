---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Communication Protocols, USB ]
date: 2023-07-07
description: Data and power roles, standards, communication protocols, schematics and more info about USB power delivery (PD).
draft: false
lastmod: 2023-07-08
tags: [ USB, power delivery, PD, sinks, sources, e-marker, Type-C, USB-IF, batteries, charging ]
title: USB Charging and Power Delivery
type: page
---

{{% warning-is-notes %}}

## Overview

As more and more devices communicate over USB, the same devices are also being designed to be powered/charged over USB (removing the need for a second cable!). It started of with low power devices drawing power from the bus voltage, and has progressed to specific standards being implement to address the issue of charging power hungry devices (e.g. laptops) over the same USB cables. Many companies have implemented "quick charge" capabilitieis over USB cables, but the USB Implementators Forum (USB-IF) hopes to standardize charging with the more recent USB Power Delivery standard.

USB _power delivery_ (PD) is a **communication protocol and power transfer service designed to work with the USB Type-C connector**. Without PD, USB Type-C connectors can provide 5V at 3A (15W). PD allows a power source and sink to communicate with each other and negotiate a **higher voltage and/or current, up to maximum of 20V at 5A (240W)**[^usb-org-usb-pd]. Using Type-C cables to power things is becoming increasingly popular, and the EU has mandated that from 2024 most personal electronic equipment must come with a Type-C charging port[^consumer-org-eus-charging-port-rules]. And 2 years after that in 2026, laptops must also be chargable from USB Type-C connectors.

{{% ref "table-summary-usb-specs" %}} shows a summary of USB specifications and maximum voltages, currents and powers.

<table ref="table-summary-usb-specs">
<caption>

Summary of USB maximum voltages, currents and powers for each standard[^ti-primer-on-usb-pd].</caption>
<thead>
<tr>
<th>Specification</th>
<th>Max. Voltage</th>
<th>Max. Current</th>
<th>Max. Power</th>
</tr>
</thead>
<tbody>
<tr>
<td>USB 2.0</td>
<td>5V</td>
<td>500mA</td>
<td>2.5W</td>
</tr>
<tr>
<td>USB 3.0/3.1</td>
<td>5V</td>
<td>900mA</td>
<td>4.5W</td>
</tr>
<tr>
<td>USB BC 1.2</td>
<td>5V</td>
<td>1.5A</td>
<td>7.5W</td>
</tr>
<tr>
<td>USB Type-C 1.2</td>
<td>5V</td>
<td>3A</td>
<td>15W</td>
</tr>
<tr>
<td>USB PD 3.0</td>
<td>20V</td>
<td>5A</td>
<td>150W</td>
</tr>
</tbody>
</table>

{{% aside type="info" %}}
According to the specification, all **USB type-C cables must be able to carry at least 3A** (at up to 20V, i.e. 60W). USB type-C cables supporting more than this (5A) must contain e-marker chips, which identify the cable and it's current handling capabilities[^wikipedia-usb-c].
{{% /aside %}}

## Data and Power Roles

In USB terminology, it is important to understand the _data_ and _power_ roles.

There are three _data_ roles:

1. **Down-stream facing port (DFP)**: Sends data downstream, e.g. a USB port on your computer (which is acting as a host) or one of the many on a USB hub.
1. **Up-steam facing port (UFP)**: Sends data upstream, e.g. a USB mouse, keyboard or camera. UFPs typically acts a power _sinks_.
1. **Dual-role data (DRD) port**: Can act as either a DFP or UFP. 

Simlarly, there are also three _power_ roles:

1. **Source**: A device capable of providing power onto VBUS, e.g. a USB hub or the host controller that provides the USB ports on your computer.
1. **Sink**: A device which consumes power from VBUS, e.g. a USB mouse or fan.
1. **Dual-role power**: A device that can act as either a source or a sink. A common example is a computers USB C port. When you plug a mouse into it, it powers the mouse, acting as a sink. However, many laptops support charing themselves over the same port. If you plug in a USB C charger, the computer acts as a sink.

## Standards

### USB Power Delivery 1.0

_USB Power Delivery 1.0_ was released by the USB-IF in July 2012[^renesas-usb-power-delivery] which offered 5 fixed power profiles. {{% ref "usb-pd-1.0" %}} shows the voltages, currents and powers that each profile provides.

<table ref="usb-pd-1.0">
  <caption>
  
The 5 power profiles offered by USB PD 1.0[^manhatten-usb-c-power-delivery].</caption>
  <thead>
    <tr>
      <th>Profile</th>
      <th>Voltage</th>
      <th>Current</th>
      <th>Power</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>5V</td>
      <td>2A</td>
      <td>10W</td>
    </tr>
    <tr>
      <td>2</td>
      <td>12V</td>
      <td>1.5A</td>
      <td>18W</td>
    </tr>
    <tr>
      <td>3</td>
      <td>12V</td>
      <td>3A</td>
      <td>36W</td>
    </tr>
    <tr>
      <td>4</td>
      <td>20V</td>
      <td>3A</td>
      <td>60W</td>
    </tr>
    <tr>
      <td>5</td>
      <td>20V</td>
      <td>5A</td>
      <td>100W</td>
    </tr>
  </tbody>
</table>

### USB Power Delivery 2.0

### USB Power Delivery 3.0

_USB Power Delivery 3.0_ made no changes to the maximum power compared to PD 2.0/1.0 (still 100W), but did improve by adding more charging information exchange between the two ports. Information about battery charging status, failures, overvoltages, battery temperatures can be exchanged[^the-phone-talks-usb-pd-2.0-3.0-3.1].

### USB Power Delivery 3.1 

_USB PD Revision 3.1_ was released by the USB-IF in May 2021[^usb-promoter-group-pd-rev-3.1]. It increased the **max. power available from a USB port from 100W to 240W**. It keeps the original spec as per PD 3.0 as part of it's _Standard Power Range_ (SPR). Added was the _Extended Power Range_ (EPR) with new fixed voltages of 28V (140W), 36V (180W) and 48V (240W). Also added is an adjustable voltage mode that allows the device being powered to request intermediate voltages (with a 100mV resolution[^usb-promoter-group-pd-rev-3.1]) between 15V and the max. supported voltage of the charger[^usb-org-usb-pd]. The power direction was made flexible, allowing hosts and peripherals to both be sources and sinks[^usb-org-usb-pd].

## Communication Protocol

USB PD uses the two CC lines provided in the Type-C connector to perform negotiation between source and sink. The VBUS lines on the Type-C cablue plugged into a host/source remain unpowered until a device/sink is plugged in and the CC lines are pulled-down. At this point, VBUS rises to 5V. To get above 5V, more complex digital communications needs to occur between the source and sink over the CC lines.

{{% ref "usb-type-c-plug-photo" %}} is a photo of a USB Type-C plug on the end of a white cable.

{{% figure ref="usb-type-c-plug-photo" src="usb-type-c-plug-photo.jpg" width="600px" caption="Photo of a USB Type-C plug on the end of a cable." %}}

{{% ref usb-type-c-connector-pinout %}} shows the pinout for both the USB Type-C plug and the receptacle.

{{% figure ref="usb-type-c-connector-pinout" src="usb-type-c-connector-pinout.webp" width="800px" caption="Pinout for both the USB Type-C plug and receptacle[^wikipedia-usb-c]." %}}

### USB 2.0 Without PD

Before we dive into PD, let's cover what happens without PD. The most basic powering scenario with Type-C connectors is simple pull-down of the CC lines, leading to 5V being provided on VBUS at either 1.5A or 3A.

{{% ref "usb2.0-without-pd" %}} shows the basic connections on the CC lines when using USB 2.0 over a Type-C connector.

{{% figure ref="usb2.0-without-pd" src="usb2.0-without-pd.webp" width="800px" caption="Basic connection scheme for USB 2.0 without PD over a Type-C connector." %}}

The value of `\(R_p\)` is how the source/DFP advertises it's current capability. The sink/UFP always has a fixed value for `\(R_d\)` of `\(5.1k\Omega\)`. When connected together, they form a voltage-divider. The sink can measure the voltage at the center point and determine the current capability of the source. {{% ref "rp-requirements" %}} shows the requirements for `\(R_p\)`.

<table ref="rp-requirements">
  <caption>
  
The requirements for `\(R_p\)` on the source side of the cable.[^st-overview-usb-type-c-pd]</caption>
  <thead>
    <tr>
      <th>Source Current Capability</th>
      <th>Current Source to 1.7-5.5V</th>
      <th>\(R_p\) pull-up to 3.3V ±5%</th>
      <th>\(R_p\) pull-up to 4.75-5.5V</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Default USB power</td>
      <td>80µA ±20%</td>
      <td>36kΩ ±20%</td>
      <td>56kΩ ±20%</td>
    </tr>
    <tr>
      <td>1.5A @5V</td>
      <td>180µA ±8%</td>
      <td>12kΩ ±5%</td>
      <td>22kΩ ±5%</td>
    </tr>
    <tr>
      <td>3.0A @5V</td>
      <td>330µA ±8%</td>
      <td>4.7kΩ ±5%</td>
      <td>10kΩ ±5%</td>
    </tr>
  </tbody>
</table>

The Type-C cable needs to provide a pull-down resistor `\(R_a\)` on it's `VCONN` pin to signal to the source that it needs power. `\(R_a\)` must be between `\(0.8{-}1.2k\Omega\)`[^infineon-termination-resistors-for-type-c]. With this resistance, the source can easily tell the difference between which CC pin is connected to the sink and which is the `VCONN`. 

## Emarkers

_Emarkers_ are chips embedded in fancier USB Type-C cables which can inform the source or sink about their capabilities. They are typically embedded in one or both of the ends of the cable. They are required for cables that are designed to go over the standard 3A and provide up to 5A of current.

The Emarker requires power, at it uses one of the CC lines to do so. One of the CC lines is used for communication (which one depends on which way around the Type-C connector is plugged in), and the other is called `\(VCONN\)` and is used to power the Emarker.

It's a manufacturing choice about whether a cable is provided with just one Emarker at one of the cable or one at both ends. In the case of just one at one end, a separate `VCONN` wire must be run the entire length of the cable to bring power to the E-marker from the other end of the cable.

## Non-standard Implementations

### Qualcomm Quick Charge

Quick charge is designed to work with a number of different connectors, including[^qualcomm-quick-charge-faq]:

* USB Type-A
* USB Micro
* USB Type-C
* Proprietary connectors

## References

[^ti-primer-on-usb-pd]: Nate Enos, Brian Gosselin. _A Primer on USB Type-C® and USB Power Delivery Applications and Requirements_ [PDF]. Texas Instruments. Retrieved 2023-07-07, from https://www.ti.com/lit/wp/slyy109b/slyy109b.pdf.
[^wikipedia-usb-c]: Wikipedia (2023, Jun 29). _USB-C_ [Web Page]. Retrieved 2023-07-07, from https://en.wikipedia.org/wiki/USB-C.
[^usb-org-usb-pd]: usb.org. _USB Charger (USB Power Delivery)_ [Web Page]. Retrieved 2023-07-07, from https://www.usb.org/usb-charger-pd.
[^usb-promoter-group-pd-rev-3.1]: USB Promoter Group. _USB Promoter Group Announces USB Power Delivery Specification Revision 3.1 - Specification defines delivering up to 240W of power over USB Type-C_ [PDF]. Retrieved 2023-07-07, from https://www.usb.org/sites/default/files/2021-05/USB%20PG%20USB%20PD%203.1%20DevUpdate%20Announcement_FINAL.pdf. 
[^st-overview-usb-type-c-pd]: STMicroelectronics. _TA0357 - Overview of USB Type-C and Power Delivery technologies_. Retrieved 2023-07-08, from https://www.st.com/resource/en/technical_article/ta0357-overview-of-usb-typec-and-power-delivery-technologies-stmicroelectronics.pdf.
[^infineon-termination-resistors-for-type-c]: Infineon (2015, Apr 17). _Termination Resistors Required for the USB Type-C Connector – KBA97180_ [Forum Post]. Retrieved 2023-07-08, from https://community.infineon.com/t5/Knowledge-Base-Articles/Termination-Resistors-Required-for-the-USB-Type-C-Connector-KBA97180/ta-p/253544.
[^consumer-org-eus-charging-port-rules]: Nick Gelling (2022, Jun). _Europe's new universal charging port rules: how will they affect us?_ [News Article]. consumer. Retrieved 2023-07-09, from https://www.consumer.org.nz/articles/europes-new-universal-charging-port-rules-how-will-they-affect-us. 
[^renesas-usb-power-delivery]: Renesas. _USB Power Delivery: Enhanced Convenience in USB Charging_ [Web Page]. Retrieved 2023-07-09, from https://www.renesas.com/us/en/support/engineer-school/usb-power-delivery-01-usb-type-c.
[^manhatten-usb-c-power-delivery]: manhatten. _USB-C Power Delivery_ [Web Page]. Retrieved 2023-07-09, from https://manhattanproducts.eu/pages/usb-c-pd-charging-everything-you-need-to-know.
[^qualcomm-quick-charge-faq]: Qualcomm. _Qualcomm Quick Charge FAQs_ [Web Page]. Retrieved 2023-07-09, from https://www.qualcomm.com/products/features/quick-charge/faq.
[^the-phone-talks-usb-pd-2.0-3.0-3.1]: The Phone Talks. _USB PD 2.0 vs 3.0 vs 3.1 Comparison - How Far Have We Come?_ [Web Page]. Retrieved 2023-07-09, from https://www.thephonetalks.com/usb-pd-2-0-vs-3-0-vs-3-1/.

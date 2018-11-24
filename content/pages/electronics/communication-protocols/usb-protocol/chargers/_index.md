---
author: gbmhunter
date: 2015-03-04 22:31:03+00:00
draft: false
title: Chargers
type: page
url: /electronics/communication-protocols/usb-protocol/chargers
---

# Overview

USB wasn't initially designed for charging batteries in devices such as phones and GPS units. However, people soon realised USB was a neat way to charge these things while connected to your computer, without having to provide a separate power supply, cable and connector. USB chargers starting appearing which just gave the user a "dumb" USB A receptacle that just provided VBUS and GND (nothing connected to the data lines). This immediately breaks the USB 2.0 spec (devices need to draw less than 100mA in the unconfigured state, and less than 2.5mA if the bus is suspended).

{{< figure src="/images/2015/03/generic-usb-charger.jpg" width="393px" caption="A generic 5V wall-socket USB charger." caption-position="bottom" >}}

Even so, most devices managed to draw 500mA and get away with it (one exception is Sony, which designed chargers/devices that strictly followed the USB 2.0 protocol). Soon however, the 500mA limit of the standard USB 2.0 specification began to limit the speed at which you could charge things.

Thus, the USB Implementers Forum (USB-IF) formally added charger specifications in 2010 to USB 2.0. They are designed to allow devices to safely draw more than 500mA of current. The specification covers the limits, detection, control and reporting mechanisms for this. They are backwards compatible with USB 2.0 hosts and peripherals. This is contained in the Battery Charging Specification (at revision 1.2, as of March 2015).

# Terminology

Portable Device (PD): A device which can draw current from USB to charge it's batteries.

Other terms are described as they introduced below.

# The Different Types

## Accessory Charger Adapter (ACA)

An accessory charger adapter (ACA) has one upstream port, and zero or more downstream ports.

## Charging Downstream Port (CDP)

A CDP has to comply with the USB 2.0 definition of a host or a hub, except for when that conflicts with Charging Downstream Port specifications. If a _PD_ is connected to a _Charging Port_, then it is allowed to draw \(I_{DEV_CHG}\) without first having to be configured. Also, it does not have to suspend.

But how does a PD work out whether the upstream port is a standard USB 2.0 port or a Charging Port?

When not connected to a peripheral, a CDP has to output a voltage of \(V_{DM_SRC}\) onto D- when it sense a voltage greater than \(V_{DAT_REF}\) but less than \(V_{LGC}\) on it's D+ line.

## Charging Port

A charging port can be a ACA, a ACA-Dock, CDP or DCP.

# Weak And Dead Batteries

The USB Battery Charging Spec defines good, weak and dead batteries.

<table style="width: 600px;" ><tbody ><tr >
<td >**Battery State**
</td>
<td >**Battery Voltage**
</td></tr><tr >
<td >Good
</td>
<td >> Weak Battery Threshold
</td></tr><tr >
<td >Weak
</td>
<td >Dead Battery Threshold > Battery > Weak Battery Threshold
</td></tr><tr >
<td >Dead
</td>
<td >< Dead Battery Threshold
</td></tr></tbody></table>

A device with a _Weak Battery_ may not be able to power up successfully.

The Dead Battery Provision (DBP).

A PD with a weak or dead battery may not use the DBP to

---
author: gbmhunter
categories: [ "PCB Design" ]
date: 2015-07-14
draft: false
title: "General Routing Tips"
type: page
---

## Overview

See below for PCB routing tips and tricks.

{{< img src="screenshot-during-routing-a-track-on-pcb-in-altium.png" width="321px" caption="Screenshot during the routing of a track on a PCB in Altium."  >}}

## Always Have Schematics In-Front Of You

Having schematics in-front of you when routing is a must. Either print them out or put them on a second monitor if you are lucky enough to have one.

Sometimes it is not obvious from the rats nest to where a component should go. A classic example is decoupling caps. A rats nest will only show one pin connected to the power rail, and the other to ground. However, the schematic show (hopefully!) that it is associated with the power input to an IC, and therefore should be placed next to the IC. 

Having the schematic visible also lets you place the components in a logical manner.

## Stress Relief Antennas

Antennas can also be used for stress relief during soldering for stress-sensitive parts, such as accelerometers and gyros. Un-used pins on the stress-sensitive component package are routed a minimum distance from the pad, just like the used pins, so that when soldering using reflow or infrared techniques, all the solder on the pads melts and solidifies at the same time, reducing the stress on the component.

{{< img src="routed-accelrometer-footprint-showing-thermal-relief-on-not-connects-for-stress-relief.png" caption="Routing un-used pins on a accelerometer component package a minimum distance away from the IC to reduce stress when infrared/reflow soldering."  width="800px" >}}

## Undesired Antennas

Any PCB antenna that isn't for radio transmission or stress relief is probably a **bad** thing. These are cause by tracks end in the middle of nowhere, and are often created un-intentionally when routing the PCB.
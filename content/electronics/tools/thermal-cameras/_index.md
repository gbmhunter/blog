---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Tools" ]
date: 2020-08-31
description: "Uses, brands, specifications, software and more info about thermal cameras."
draft: false
lastmod: 2020-09-03
tags: [ "electronics", "tools", "thermal cameras", "thermal resistances", "heatsinking", "Keysight", "TrueIR", "FLIR", "Fluke", "Testo", "RS Pro", "infrared", "IR", "PCBs", "NETD", "noise equivalent temperature difference" ]
title: "Thermal Cameras"
type: "page"
---

{{% warning-is-notes %}}

## Overview

Thermal cameras are great tools to have in an electronics lab for inspecting the thermal behaviour for PCBs and other electrical devices. They can be used to:

* See how heat spread across a PCB
* Detect if things are getting too hot
* Work out where heat sinking is needed
* Calculate {{% link text="thermal resistances" src="/pcb-design/thermal-design-for-pcbs" %}}.
* Find short-circuits

In the context of hand-held thermal cameras, 80x80 is a small number of pixels, 160x120 is moderate, and 640x480 is a large amount.

## Parameters

NETD: _Noise Equivalent Temperature Difference_: This is the minimum temperature difference that is resolvable by the camera. You could think of this as the _sensitivity_. It is bad practise to refer to this as the resolution as this will get confused with the pixel (spatial) resolution. NETD of thermal cameras is typically between 100-500mk (100-500m°C). The NETD is measure by pointing the camera at a very stable and uniform black body at a specific temperature. The NETD is the standard deviation of the varying pixel values recorded by the camera over a specific period of time[^movitherm-netd].

## Brands

### Keysight

Keysight has one range of handheld thermal cameras called TrueIR. Within this range there are 3 separate devices, with the key difference between them being the maximum measurement temperature. They all have a medium resolution of 160x120 pixels.

{{% img src="keysight-u5856a-marketing-photo.jpg" width="300px" caption="A marketing photo for the Keysight U5856A thermal camera." %}}

A unique selling point of the Keysight TrueIR range is the small minimum focal distance of 100mm (most other hand-held thermal cameras have a minimum focal length of 300-500mm), which makes them especially useful for inspecting PCBs.

The 350C camera (U5855A) starts at about US$2500, going up to US$3500 for the 1200C camera (U5857A).

**Software**

TrueIR Analysis And Reporting Tool

Windows only. Includes ability to stream video from the IR camera when plugged in via USB cable.

{{% img src="keysight-trueir-analysis-reporting-tool-screenshot.png" width="600px" caption="A screenshot of the Keysight TrueIR software tool." %}}

### FLIR

I was not impressed with the FLIR software (called _Fluke Connect Desktop_). It took account registration and email link clicking to even get to the point to be able to download it. I then encountered issues installing it without having and old version of Microsoft Word present (the software was looking for this so it could generate reports).

### Fluke

### Optris

{{% img src="optris-xi-400-spot-finder-ir-camera-photo.jpg" width="500px" caption="A photo of the Optris Xi 400 spot finder IR camera." %}}

### Testo

Testo 865: 160x120 pixels, measurement range -20 to 280°C.
Testo 868: 160x120 pixels, measurement range -50 to 650°C.

Minimum focal distance of 0.5m, not so suitable for viewing PCBs.

"SuperResolution" takes the raw infrared pixel resolution of 160x120 and upscales it to 320x240pixels. However I'm not sure how more advanced this is other than just up-sampling the image in the digital realm.


*Software*

IRsoft

### RS Pro

RS Pro is RS Components self-owned brand.

## References

[^movitherm-netd]: <https://movitherm.com/knowledgebase/netd-thermal-camera/>
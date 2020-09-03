---
author: "gbmhunter"
categories: [ "Electronics", "Tools" ]
date: 2020-08-31
description: "Uses, brands, specifications, software and more info about thermal cameras."
draft: false
lastmod: 2020-09-03
tags: [ "electronics", "tools", "thermal cameras", "thermal resistances", "heatsinking", "Keysight", "TrueIR", "FLIR", "Fluke", "Testo", "RS Pro", "infrared", "IR", "PCBs" ]
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

### Testo

*Software*

IRsoft

### RS Pro

RS Pro is RS Components self-owned brand.
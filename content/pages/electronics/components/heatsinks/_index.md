---
author: gbmhunter
date: 2013-05-29 02:10:25+00:00
draft: false
title: Heatsinks
type: page
url: /electronics/components/heatsinks
---

[mathjax]

# Overview

Heatsinks are used in circuit design to conduct heat away from a component faster than what air would do, usually to prevent high-power components from overheating and failing.

[caption id="attachment_13705" align="aligncenter" width="411"][![A typical TO-220 heatsink with fins. Image from www.digikey.com.](http://blog.mbedded.ninja/wp-content/uploads/2013/05/typical-to-220-heatsink-with-fins.jpg)
](http://blog.mbedded.ninja/wp-content/uploads/2013/05/typical-to-220-heatsink-with-fins.jpg) A typical TO-220 heatsink with fins. Image from www.digikey.com.[/caption]

Typical components that require heatsinking are high current [linear regulators](http://blog.mbedded.ninja/electronics/components/power-regulators), MOSFET's on [H-bridges](http://blog.mbedded.ninja/electronics/circuit-design/h-bridges), power amplifier BJT's and [MOSFET's](http://blog.mbedded.ninja/electronics/components/mosfets), and power limiting resistors. Most heatsinks are made from black anodized aluminium.

Their heatsinking capability is rated with a thermal resistance, which has the units \( ^{\circ} C / W \). Common packages that heatsinks are made for include [TO-220](http://blog.mbedded.ninja/electronics/circuit-design/component-packages#to-220ab), [SOT-223](http://blog.mbedded.ninja/electronics/circuit-design/component-packages#sot-23-x).

You can get heatsinks with twisted fins, which gives better cooling due to increased air turbulance and convection flow.

Phase change compounds can be used as thermal pads. Phase change compounds are designed to be solid at room temperature but become liquid at the operating temperature, which gives a better bond between the component and heatsink, lowering it's thermal resistance.

For more information on thermal resistances, see the [Thermal Management page](http://blog.mbedded.ninja/electronics/circuit-design/thermal-management).

# Where Does The Heat Go?

The following diagram is a thermal analysis of a SMD MOSFET mounted to a PCB.

[caption id="attachment_13703" align="aligncenter" width="687"][![Thermal analysis of a SMD MOSFET mounted on a PCB. Image from http://www.fairchildsemi.com/an/AN/AN-1029.pdf.](http://blog.mbedded.ninja/wp-content/uploads/2013/05/thermal-analysis-of-smd-mosfet-on-pcb.png)
](http://blog.mbedded.ninja/wp-content/uploads/2013/05/thermal-analysis-of-smd-mosfet-on-pcb.png) Thermal analysis of a SMD MOSFET mounted on a PCB. Image from http://www.fairchildsemi.com/an/AN/AN-1029.pdf.[/caption]

# List Of Component Package Thermal Resistances

See the [Component Packages page](http://blog.mbedded.ninja/electronics/circuit-design/component-packages). This has many of the common component packages and their thermal resistances.

# Forced Convection

The following image shows two graphs combined into one, the thermal performance of a heatsink with natural convection, and that with forced convection (e.g. a fan).

[caption id="attachment_13706" align="aligncenter" width="960"][![Heat dissipation graph for both natural and forced convection. Image from http://www.aavid.com/sites/default/files/products/boardlevel/aavid-standard-heatsinks.pdf.](http://blog.mbedded.ninja/wp-content/uploads/2013/05/heat-dissipation-graph-for-natural-and-forced-convection.png)
](http://blog.mbedded.ninja/wp-content/uploads/2013/05/heat-dissipation-graph-for-natural-and-forced-convection.png) Heat dissipation graph for both natural and forced convection. Image from http://www.aavid.com/sites/default/files/products/boardlevel/aavid-standard-heatsinks.pdf.[/caption]

# Packages

There is no standard package for heatsinks and the pitch for their support pins, although some more common pin spacings exist (such as 25.4mm (1inch) e.t.c).

[caption id="attachment_13707" align="alignnone" width="1364"][![The technical drawing of a typical TO-220 heatsink. Image from www.digikey.com.](http://blog.mbedded.ninja/wp-content/uploads/2013/05/to-220-pcb-mount-heatsink-hs22-technical-drawing.png)
](http://blog.mbedded.ninja/wp-content/uploads/2013/05/to-220-pcb-mount-heatsink-hs22-technical-drawing.png) The technical drawing of a typical TO-220 heatsink. Image from www.digikey.com.[/caption]

---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Components ]
date: 2013-05-29
lastmod: 2023-07-18
tags: [ heatsinks, circuit design, components, overheating, thermal, temperature, packages, pads, interfaces, thermal interfaces ]
title: Heatsinks And Thermal Interfaces
type: page
---

## Heatsinks

Heatsinks are used in circuit design to conduct heat away from a component faster than what air would do, usually to prevent high-power components from overheating and failing.

{{% figure src="typical-to-220-heatsink-with-fins.jpg" width="411px" caption="A typical TO-220 heatsink with fins. Image from www.digikey.com."  %}}

Typical components that require heatsinking are high current {{% link text="linear regulators" src="/electronics/components/power-regulators" %}}, MOSFETs on [H-bridges](/electronics/circuit-design/h-bridges), power amplifier BJTs and {{% link text="MOSFETs" src="/electronics/components/transistors/mosfets" %}}, and power limiting resistors. Most heatsinks are made from black anodized aluminium.

Their heatsinking capability is rated with a thermal resistance, which has the units \( ^{\circ} C / W \). Common packages that heatsinks are made for include {{% link text="TO-220" src="/pcb-design/component-packages/to-220-component-package" %}}, {{% link text="SOT-223" src="/pcb-design/component-packages/sot-23-component-package" %}}.

You can get heatsinks with twisted fins, which gives better cooling due to increased air turbulence and convection flow.

Phase change compounds can be used as thermal pads. Phase change compounds are designed to be solid at room temperature but become liquid at the operating temperature, which gives a better bond between the component and heatsink, lowering it's thermal resistance.

For more information on thermal resistances, see the {{% link text="Thermal Management page" src="/electronics/circuit-design/thermal-management" %}}.

### Where Does The Heat Go?

The following diagram is a thermal analysis of a SMD MOSFET mounted to a PCB.

{{% figure src="thermal-analysis-of-smd-mosfet-on-pcb.png" width="687px" caption="Thermal analysis of a SMD MOSFET mounted on a PCB. Image from http://www.fairchildsemi.com/an/AN/AN-1029.pdf, retrieved 2013-05-29." %}}

### List Of Component Package Thermal Resistances

See the {{% link text="Component Packages page" src="/pcb-design/component-packages" %}}. This has many of the common component packages and their thermal resistances.

### Forced Convection

The following image shows two graphs combined into one, the thermal performance of a heatsink with natural convection, and that with forced convection (e.g. a fan).

{{% figure src="heat-dissipation-graph-for-natural-and-forced-convection.png" width="960px" caption="Heat dissipation graph for both natural and forced convection. Image from http://www.aavid.com/sites/default/files/products/boardlevel/aavid-standard-heatsinks.pdf, retrieved 2013-05-29." %}}

### Packages

There is no standard package for heatsinks and the pitch for their support pins, although some more common pin spacings exist (such as 25.4mm (1inch) e.t.c).

{{% figure src="to-220-pcb-mount-heatsink-hs22-technical-drawing.png" width="1364px" caption="The technical drawing of a typical TO-220 heatsink. Image from www.digikey.com, retrieved 2013-05-29." %}}

## Thermal Interfaces

Two packaging types:

* Pad
* Roll

The thermal interface material may be filled with ceramic particles to improve thermal conductivity.

Polymer with acrylic adhesive.

Sometimes the electrical resistivity will not be specified, but a dielectric strength (in `kV/mm`) will be given. This is when the electric field becomes strong enough to pull outer valence electrons away from the material's atoms, and the material becomes conductive. 
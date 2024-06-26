---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-04-06
draft: false
lastmod: 2022-03-07
tags: [ "component packages", "PCB design", "MiniMELF", "Mini-MELF", "DO213-AA", "SOD-80", "LL-34", "LLDS", "roll away package" ]
title: "MiniMELF (SOD-80, DO-213AA) Component Package"
type: "page"
---

## Overview

`MiniMELF` is a cylindrical, 2-lead SMD component package whose most common use is for packaging diodes and resistors. This package often comes under the alternative names _SOD-80_ or _DO-213AA_. I prefer to call it MiniMELF as it's to remember when there are a plethora of other packages under the "SOD" or "DO-" naming convention.

{{% figure src="_assets/mini-melf-sod-80-do-213aa-component-package-photo.jpg" width="100px" caption="Mini-MELF (SOD-80, DO-213AA)." %}}

{{% figure src="_assets/mini-melf-sod-80-do-213aa-component-package-photo.jpg" width="300px" caption="A photo of the Mini-MELF (SOD-80, DO-213AA) component package." %}}

MiniMELF (and all the other packages in the MELF family) are cylindrical shaped components. This makes them somewhat infamous because they have a tendency to roll around when soldering. This leads to the backronym "MELF: **M**ost **E**nd up **L**ying on the **F**loor" or being called the "roll away" package. However, they remain popular because offer significant advantages over traditional SMD packages including:

* High accuracy
* Moisture resistance
* High-temperature operation

Synonyms:

* 100H01: IEC package outline code[^bib-nexperia-sod80c-package-info].
* DO-213AA
* LL-34: Littelfuse[^bib-littelfuse-ll-34-thermistors-ds].
* LL34: Microsemi[^microsemi-bzv55-ds].
* LLDS (Nexperia[^bib-nexperia-sod80c-package-info])
* SOD-80 (Small-outline Diode 80)
* SOD-80C (Nexperia[^bib-nexperia-sod80c-package-info])

Pitch: 3.2mm (distance between terminal centers)

Solderability: Easy to solder by hand, but doesn't stay in one place! Can also be wave or reflow soldered.

Similar To:

* [MELF (SOD-106, DO-213AB)](../melf-component-package)
* MicroMELF

## Dimensions And Recommended Land Pattern

Package Dimensions: 3.5mm length, 1.5mm diameter

{{% figure src="component-package-sod-80-dimensions-and-land-pattern.gif" width="500px" caption="Image from http://www.topline.tv/drawings/images/MELF_Diodes/SOD80.gif." %}}

## Common Uses

* Diodes
* Resistors

## References

[^bib-nexperia-sod80c-package-info]:  Nexperia (2017, Jan 30). _SOD80C: Glass, hermetically sealed glass surface-mounted package; 2 connectors; 3.5 mm x 1.5 mm body (package information)_. Retrieved 2022-03-04, from https://assets.nexperia.com/documents/package-information/SOD80C.pdf.
[^bib-littelfuse-ll-34-thermistors-ds]:  Littelfuse (2018, Feb 26). _Surface Mount Thermistors: MELF Style Thermistor: LL 34 MiniMELF SM_. Retrieved 2022-03-07, from https://www.littelfuse.com/~/media/electronics/datasheets/surface_mount_thermistors/littelfuse_surface_mount_thermistors_melf_style_thermistors_ll_34_minimelf_sm_datasheet.pdf.pdf.
[^microsemi-bzv55-ds]: Microsemi. _BZV55 C2V4 thru BZV55 C75_ [datasheet]. Retrieved 2024-04-16, from https://nz.mouser.com/datasheet/2/268/BZV55_C2V4_C75-1593780.pdf.

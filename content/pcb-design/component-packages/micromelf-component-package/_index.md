---
authors: [Geoffrey Hunter]
categories: [Electronics, PCB Design, Component Packages]
date: 2015-04-04
draft: false
lastmod: 2024-04-16
tags: [component packages, PCB design, MicroMELF]
title: Micro-MELF Component Package
type: page
---

## Overview

MicroMELF (Micro Metal Electrode Leadless Face) is a small 2-lead SMD component package. It is the smallest package in the family also containing t
he [MELF](/pcb-design/component-packages/melf-component-package/) and [MiniMELF (SOD-80, DO-213AA)](/pcb-design/component-packages/minimelf-component-package/) packages.

Some versions have squared bits in the middle, making it easier to place one on a PCB and solder without it rolling around. 0Ω resistors in this package usually have a single centered black line.

{{% figure src="_assets/micro-melf-component-package-photo.jpg" width="300px" caption="A photo of the Micro-MELF component package."  %}}

## Dimensions And Recommended Land Pattern

The Vishay MicroMELF measures 2.2mm long and 1.1mm in diameter[^vishay-smm0102-thin-film-micromelf-resistors]. The dimensions and recommended land pattern are shown in the below diagram:

{{% figure src="_assets/component-package-micro-melf-dimensions-and-land-pattern.png" width="800px" caption="The dimensions and recommended land pattern for the Vishay MicroMELF component package[^vishay-smm0102-thin-film-micromelf-resistors]." %}}

## Common Uses

* Resistors
* Diodes

## Similar To

* [MELF (SOD-106, DO-213AB)](/pcb-design/component-packages/melf-component-package/)
* [MiniMELF (SOD-80, DO-213AA)](/pcb-design/component-packages/minimelf-component-package/)

## References

[^vishay-smm0102-thin-film-micromelf-resistors]: Vishay (2015, Dec 4). _SMM0102 - Thin Film Micro-MELF Resistors_ [datasheet]. Retrieved 2024-04-16, from https://www.vishay.com/docs/20003/smm0102.pdf.
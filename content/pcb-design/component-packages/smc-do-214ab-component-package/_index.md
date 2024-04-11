---
authors: [Geoffrey Hunter]
categories: [Electronics, PCB Design, Component Packages]
date: 2015-03-09
draft: false
lastmod: 2024-04-10
tags: [component packages, PCB design, SMC, DO-214AB, diodes]
title: SMC (DO-214AB) Component Package
type: page
---

## Overview

{{% figure float="right" src="_assets/smc-do-214ab-component-package-3d-render.jpg" width="200px" caption="A 3D render of the SMC (DO-214AB) component package." %}}

SMC is a 2-lead SMD component package. It is also commonly known as DO-214AB. It is the largest package in the family containing SMA, SMB, and SMC. It is used for diodes that require good heatsinking requirements and/or high-surge current capabilities. Used for general purpose, schottky, and TVS diodes.

The package is easy to solder. The soldering iron needs a bit of juice though (especially if connected to large planes on the PCB), as this package is designed for good heatsinking abilities.

## Dimensions And Recommended Land Pattern

{{% figure src="_assets/component-package-smc-do-214ab-dimensions-and-land-pattern.png" caption="Dimensions and recommended land pattern for the DO-214AB (SMC) component package. Image from Vishay Outline Dimensions: SMC (http://www.vishay.com/docs/95023/smc.pdf)." width="800px" %}}

The height of the SMC is 2.62mm above the surface of the PCB. The used PCB land area is 50.6mm^2. Pitch is 6.8mm from pad center to pad center.

## Thermal Resistance

* \(T_{\theta JC} = 10-16°C/W\)
* \(T_{\theta JA} = 47-55°C/W\) (mounted on PCB with 8x8mm copper pad area)
* \(T_{\theta JA} = 90°C/W\) (mounted on PCB with two 1.54x3.14mm copper pads)

## Similar To

* [SMA (DO-214AC)](/pcb-design/component-packages/sma-do-214ac-component-package/)
* [SMB (DO-214AA)](/pcb-design/component-packages/smb-do-214aa-component-package/)
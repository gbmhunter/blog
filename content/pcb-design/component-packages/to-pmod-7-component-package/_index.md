---
authors: [Geoffrey Hunter]
categories: [Electronics, PCB Design, Component Packages]
date: 2015-04-07
draft: false
lastmod: 2024-04-23
tags: [component packages, PCB design, transistor, TO-PMOD-7]
title: TO-PMOD-7 Component Package
type: page
---

## Overview

{{% figure src="to-pmod-7-component-package-3d-render.jpg" width="200px" float="right" caption="A 3D render of the TO-PMOD-7 component package." %}}

Transistor Outline Power Module 7 is a rather large SMD package with good heat sinking abilities. Texas Instruments uses this package for some of their DC/DC power modules, which have built in shielded inductors.

## Synonyms

* NDW: Used by Texas Instruments[^ti-lmz12001ext-smps-ds].
* TZA07A: Used by Texas Instruments[^ti-lmz12001ext-smps-ds].

## Dimensions And Recommended Land Pattern

{{% figure src="to-pmod-7-component-package-dimensions-and-land-pattern.png" caption="The dimensions and recommended land pattern for the TO-PMOD-7 component package. Image from http://www.ti.com/."  width="800px" %}}

Pitch is 1.27mm (between the six pins, excluding the pad).

Height: 4.57mm.

Land Area: \(10.16x13.77mm = 140mm^2\)

## Thermal Resistances

* \(T_{JC} = 1.9^{\circ}{\rm C}/W\)
* \(T_{JA} = 16^{\circ}{\rm C}/W\) (with the recommended land pattern)

## References

[^ti-lmz12001ext-smps-ds]: Texas Instruments (2015, Sep). _LMZ12001EXT 1-A SIMPLE SWITCHER® Power Module with 20-V Maximum Input Voltage for Demanding Environments and Rugged Applications_ [datasheet]. Retrieved 2024-04-23, from https://www.ti.com/lit/ds/symlink/lmz12001ext.pdf.

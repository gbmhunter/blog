---
authors: [Geoffrey Hunter]
categories: [Electronics, PCB Design, Component Packages]
date: 2020-01-09
description: Variants, pin counts, pitches, solderability, thermal resistances, dimensions, land patterns, 3D models and more info for the QFP component package.
draft: false
lastmod: 2024-04-03
tags: [component packages, PCB design, quad flat package, BQFP, CQFP, FQFP, QFP, TQFP, SOT-1571-1]
title: QFP Component Package
type: page
---

## Overview

Quad-flat pack (QFP) is a family of SMD component packages. It is characterized by a flat, square body with gull-wing pins protruding from all four sides.

There are many sub-families of QFP packages. The pitch typically varies between 0.4-0.8mm. The pin count is typically between 12 (4 leads per side) to over 200.

The QFP package and most of it's variants are very sensitive to improper handling. Because of the fine pitch, size, and protrusion of the pins, they can be easily damaged and bent before the component is soldered onto the PCB. Although uncommon, the BQFP variant (see below) offers the most pin protection.

{{% figure src="_assets/stm32f070rbt6-lqfp-64-two-dots.png" width="600px" caption="Close-up of the STM32F070RBT6 microcontroller in a LQFP-64 package (mounted on a NUCLEO-F070RV dev kit). For some reason ST decided to put two polarity-looking dots on the package, it's not easy to work out which is the right one! (the dot on the silkscreen gives it away, but imagine if you just had the raw IC!)" %}}

## Synonyms

* SOT-1571-1: NXP's name for a QFP, 48pin, 7x7x1.4mm body, 0.5mm pitch, 4.5x4.5mm EP[^nxp-sot1571-1-ds].

## Variants

* BQFP (Bumpered Quad Flat Package)
* CQFP (Ceramic Quad Flat Package)
* FQFP (Fine pitch Quad Flat Package)
* QFP (Quad Flat Package)
* TQFP (Thin Quad Flat Package)

## Similar To

* [QFN](../qfn-component-package): Similar to QFP except the instead of gull-wing leads, QFN has pads that are mostly on the underside of the body, and slightly climb up the side walls. 

## Solderability

Reflow recommended. Hand solderable given enough patience and skill, as long as it is not a variant with a thermal pad. Non-zero chance of solder bridges between adjacent pins forming when hand soldering, although these can be easily removed. If you have the option, pick QFN over QFP if hand soldering as QFN doesn’t have as many solder bridge issues.

## BQFP

_Bumpered Quad Flat Pack_ (BQFP) is a variant of the QFP package which has bumpers on the four corners of the package to protect the pins from bending before the package is soldered to a PCB.

## CQFP

_Ceramic Quad Flat Pack_ (CQFP) is a variant of the QFP package which uses a high-quality ceramic material. The CQFP package can be hermetically sealed and is typically used for space applications.

See the [Texas Instruments Ceramic Quad Flat Pack document (SNOA025)](http://www.ti.com/lit/an/snoa025/snoa025.pdf) ([local cached copy](_assets/snoa025-ti-instruments-cqfp-dimensions.pdf)) for package dimensions for CQFP packages from 28 to 304 pins.

{{% figure src="_assets/cqfp-component-package-3d-render.jpg" width="200px" caption="A 3D render of a CQFP component package. Image from analog.com." %}}

## TQFP

The thin-quad-flat-pack package (TQFP) is a leaded, thin SMT package commonly used for microcontrollers. It is one of the most popular variants of the QFN package. It's quite easy to solder these packages and easy enough to probe the individual pins afterwards when testing also.

Pitch: 0.4-0.8mm

{{% figure src="_assets/tqfp-32-component-package-3d-render.jpg" width="300px" caption="A 3D render of the TQFP-32 component package." %}}

## References

[^nxp-sot1571-1-ds]: NXP (2018, Jan 12). _SOT1571-1 - HLQFP48, plastic, thermal enhanced low profile quad flat package; 48 terminals; 0.5 mm pitch; 7 mm x 7 mm x 1.4 mm body_ [package datasheet]. Retrieved 2024-04-03, from https://www.nxp.com/docs/en/package-information/98ASA00173D.pdf.

---
authors: [ "Geoffrey Hunter" ]
categories: [ Electronics, PCB Design, Component Packages ]
date: 2020-01-09
description: "Variants, pin counts, pitches, solderability, thermal resistances, dimensions, land patterns, 3D models and more info for the QFP component package."
draft: false
lastmod: 2020-01-09
tags: [ component packages, PCB design, quad flat package, BQFP, CQFP, FQFP, QFP, TQFP,  ]
title: QFP Component Package
type: page
---

## Overview

<table>
    <tbody>
        <tr>
            <th width="100px">Name</th>
            <th width="500px"z>Quad Flat Package (QFP)</th>
        </tr>
        <tr>
            <td>Synonyms</td>
            <td>n/a</td>
        </tr>
        <tr>
            <td>Variants</td>
            <td>

* BQFP (Bumpered Quad Flat Package)
* CQFP (Ceramic Quad Flat Package)
* FQFP (Fine pitch Quad Flat Package)
* QFP (Quad Flat Package)
* TQFP (Thin Quad Flat Package)
</td>
        </tr>
        <tr>
            <td>Similar To</td>
            <td>
            
[QFN](../qfn-component-package)
            </td>
        </tr>
        <tr>
            <td>Mounting</td>
            <td>SMD</td>
        </tr>
        <tr>
            <td>Pin Count</td>
            <td>16-100+</td>
        </tr>
        <tr>
            <td>Pitch</td>
            <td>0.4-0.8mm (TQFP)</td>
        </tr>
        <tr>
            <td>Solderability</td>
            <td>Reflow recommended. Hand solderable given enough patience and skill, as long as it is not a variant with a thermal pad. Non-zero chance of solder bridges between adjacent pins forming when hand soldering, although these can be easily removed. If you have the option, pick QFN over QFP if hand soldering as QFN doesn’t have as many solder bridge issues.</td>
        </tr>
        <tr>
            <td>Thermal Resistance</td>
            <td></td>
        </tr>
        <tr>
            <td>Package LxWxH</td>
            <td>n/a</td>
        </tr>
        <tr>
            <td>Typical PCB Land Area</td>
            <td>n/a</td>
        </tr>
        <tr>
            <td>3D Models</td>
            <td>n/a</td>
        </tr>
        <tr>
            <td>Common Uses</td>
            <td>

* Microcontrollers
* FPGAs
</td>
        </tr>
    </tbody>
</table>

The QFP package and most of it's variants are very sensitive to improper handling. Because of the fine pitch, size, and protrusion of the pins, they can be easily damaged and bent before the component is soldered onto the PCB. Although uncommon, the BQFP variant (see below) offers the most pin protection.

{{% figure src="stm32f070rbt6-lqfp-64-two-dots.png" width="600px" caption="Close-up of the STM32F070RBT6 microcontroller in a LQFP-64 package (mounted on a NUCLEO-F070RV dev kit). For some reason ST decided to put two polarity-looking dots on the package, it's not easy to work out which is the right one! (the dot on the silkscreen gives it away, but imagine if you just had the raw IC!)" %}}

## BQFP

_Bumpered Quad Flat Pack_ (BQFP) is a variant of the QFP package which has bumpers on the four corners of the package to protect the pins from bending before the package is soldered to a PCB.

## CQFP

_Ceramic Quad Flat Pack_ (CQFP) is a variant of the QFP package which uses a high-quality ceramic material. The CQFP package can be hermetically sealed and is typically used for space applications.

See the [Texas Instruments Ceramic Quad Flat Pack document [SNOA025](http://www.ti.com/lit/an/snoa025/snoa025.pdf) ([local cached copy](/pcb-design/component-packages/qfp-component-package/snoa025-ti-instruments-cqfp-dimensions.pdf)) for package dimensions for CQFP packages from 28 to 304 pins.

{{% figure src="cqfp-component-package-3d-render.jpg" width="200px" caption="A 3D render of a CQFP component package. Image from analog.com." %}}

## TQFP

The thin-quad-flat-pack package (TQFP) is a leaded, thin SMT package commonly used for microcontrollers. It is one of the most popular variants of the QFN package. It's quite easy to solder these packages and easy enough to probe the individual pins afterwards when testing also.

Pitch: 0.4-0.8mm

{{% figure src="tqfp-32-component-package-3d-render.jpg" width="300px" caption="A 3D render of the TQFP-32 component package." %}}

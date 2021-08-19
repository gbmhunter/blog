---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-01-21
description: "Synonyms, variants, pitches, pin numbering, mechanical drawings, recommend footprints and more info about the SOIC range of component packages."
draft: false
lastmod: 2020-07-21
tags: [ "component packages", "PCB design", "SOIC", "R-PSDO", "S8", "WSON", "S8E", "SO-4", "SOIC-4", "optical isolators" ]
title: "SOIC Component Package"
type: "page"
---

## Overview

<table>
  <tbody>
    <tr>
      <td>Name</td>
      <td>SOIC (Small Outline Integrated Package)</td>
    </tr>
    <tr>
      <td>Synonyms</td>
      <td>
        <ul>
          <li>R-PDSO (JEDEC wide body SOIC, 7.5mm width, 0.65mm pitch)</li>
          <li>SO (ST Microelectronics)</li>
          <li>S8 (SOIC-8, Analog Devices)</li>
          <li>S8E (Linear Technologies, SOIC-8 with exposed pad)</li>
          <li>WSON (SST, this is a package which shares the same footprint as a SOIC but has a smaller height, not to be confused with the different SON package)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Variants</td>
      <td>
        <p>The SOIC family contains packages with a varying number of pins.</p>
        <p>There are also two width's for SOIC packages, narrow width (3.9mm wide body, `SOICx_N`) and wide width (7.5mm wide body, `SOICx_W`). The width is usually expressed by the addition of `_N` or `_W` to the end of the package name. If the width is not mentioned, it is most likely going to be narrow width.</p>
      </td>
    </tr>
    <tr>
      <td>Relevant Standards</td>
      <td>
        <ul>
          <li>JEDEC MS-012-AA (SOIC Narrow)</li>
          <li>JEDEC MS-013 (SOIC Wide)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Similar To</td>
      <td>{{% link text="SOJ" src="../soj-soijc-component-package" %}}</td>
    </tr>
    <tr>
      <td>Mounting</td>
      <td>SMD</td>
    </tr>
    <tr>
      <td>Pin Count</td>
      <td>8, 14, 16, 18, 20, 24, 28, 32</td>
    </tr>
    <tr>
      <td>Pitch</td>
      <td>
        <ul>
          <li>0.65mm (e.g. R-PDSO)</li>
          <li>1.27mm (50mill)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Solderability</td>
      <td>Relatively easy to hand solder compared to other SMT packages.</td>
    </tr>
    <tr>
      <td>Thermal Resistance</td>
      <td>
        <ul>
          <li>SOIC-8: 70.6K/W (pads only, no copper fill)</li>
          <li>SOIC-8: 55K/W (6cm2 of copper, ground pins attached internally to die)</li>
          <li>SOIC-8: 33.5K/W (1 square inch of copper surrounding package, connected to ground)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Land Area</td>
      <td>
        <ul>
          <li>SOIC-8: 29.4mm2</li>
          <li>SOIC-28W: 186.4mm² (10.3x18.1mm)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Height</td>
      <td>1.50-2.54mm</td>
    </tr>
    <tr>
      <td>3D Models</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Common Uses</td>
      <td>
        <ul>
          <li>Linear regulators</li>
          <li>Drivers/buffers</li>
          <li>High-power MOSFETs (normally in a SOIC-8N, with one pin for the gate, and either 3 or 4 pins for the drain and source)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Dimensions

The dimensions for the `SOIC-8N` package are shown below:

{{< img src="soic-8-component-package-dimensions.png" width="555px" caption="The dimensions for the SOIC-8N component package." >}}

The dimensions for the `SOIC-16N` component package are shown below:

{{< img src="soic-16-component-package-dimensions.jpg" width="575px" caption="The dimensions for the SOIC-16N component package." >}}

## Pitch

Most `SOIC` packages have a pitch of 1.27mm (50mil) and usually have Gullwing leads. When used for regulators, sometimes the many ground pins are connected internally to the die attach flag, providing better heat sinking capabilities. SOIC packages use _leadframe_ technology.

The `SOIC` package `R-PDSO` defined by JEDEC has a non-standard pitch of 0.65mm (and the standard wide body width of 7.5mm).

## Pin Numbering

Pin numbering is the same as a `DIP` package, in that pin 1 is at the top left, and then pins are numbered sequentially down the left-hand side, then up the right hand-side.

## Polarity Marks

There are three ways of indicating the polarity on a `SOIC` package. The first two, a dot or a notch, indicate pin 1 or the top of the chip. The third way is not so obvious, and features a bevelled edge along the side that pin 1 is on (so for `SOIC-8`, the bevelled edge would be on the side with pins 1 to 4).

## Related Packages

The `WSON` package by SST is lower in height than a standard `SOIC` package, but is designed to use the same PCB footprint.

## Adapter PCBs

Adapter PCBs for the `SOIC` family of packages are widely available due to the popularity of the package.

SparkFun makes a `SOIC-8` to `DIP-8-300` adapter PCB.

{{< img src="soic-8-component-package-sparkfun-breakout-board.jpg" width="272px" caption="A SOIC-8 to DIP-8-300 adapter PCB by SparkFun." >}}

## Thermal Resistance And Power Dissipation

This graph shows the maximum power dissipation for the `SOIC-8N` component package, for various PCB copper areas.

{{< img src="maximum-power-dissapation-graphs-so-8.png" width="701px" caption="Maximum power dissipation graphs for the SOIC-8N component package." >}}

## Standard Pinout For MOSFETs

The `SOIC-8` component package is commonly used for medium-power N and P-channel MOSFETs. Most of these MOSFETs have the exact same pinout (both N and P-Channels!), as shown in the below diagram.

Note: As far I'm aware, this is not specified in any standard, but is just an industry default. Also, this only applies to `SOIC-8` packages with 1 MOSFET inside them.

{{< img src="soic-8-component-package-standard-mosfet-pinout.png" width="334px" caption="The standard pinout for a single MOSFET (N or P-channel) in a SOIC-8 package." >}}

Examples that follow this pinout include the [ST STS25NH3LL (N-channel)](https://www.sparkfun.com/datasheets/Robotics/sts25nh3ll.pdf), the [International Rectifier IRF8721PbF-1 (N-channel)](http://www.irf.com/product-info/datasheets/data/irf8721pbf-1.pdf), and the [Vishay SI9407BDY-T1-GE3 (P-channel)](http://www.vishay.com/docs/69902/si9407bd.pdf).

## SOIC-4 (SO-4)

The `SO-4` package is quite unique from other `SO` packages. It typically has the same mechanical dimensions as a `SO-6` package, but has the two middle pins on either side removed. Typically the `SO-6` pin numbering is also kept, such that the remaining pins are numbered 1, 3, 4 and 6. Due to the large clearances between the pins and on the package, this `SO-4` package is used for optical isolators.

The `SO-4` package is different to the `SOIC-4` package, even though these two different names refer to the same package at higher pin counts.

ON Semiconductor uses the case code `751EP` for the `SOIC-4W` package[^on-semiconductor-bridge-rectifier].

## References

[^on-semiconductor-bridge-rectifier]: <https://nz.mouser.com/datasheet/2/308/MB10S-D-1810767.pdf>
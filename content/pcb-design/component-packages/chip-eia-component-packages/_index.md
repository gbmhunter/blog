---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "PCB Design", "Component Packages" ]
date: 2015-10-25
description: "Sizes, dimensions, recommended land patterns and more info for the chip (EIA xxxx) component package, which is commonly used for SMD resistors and capacitors."
draft: false
lastmod: 2022-01-25
tags: [ "component packages", "PCB design", "chip", "EIA", "0603", "0805", "1206", "MEMS", "oscillators", "crystals", "tombstoning", "head-in-pillow" ]
title: "Chip (EIA) Component Packages"
type: "page"
---

## Overview

The following are a description of the most popular chip packages. Chip packages are standardized small SMT footprints primarily used for 2 lead passive components such as resistors, capacitors and ferrite beads. They are defined by four-digit number which represents the total footprint width and height, respectively (assuming the two footprint pads are on the left and right rather than the top or bottom, or more formally, the axis of the component runs parallel to the width).

The standard is to define them in the metric scale, however most manufacturers, and hence suppliers still use the imperial units. In **metric** units, the format is to use two number each to describe the width and height in tenths of a millimeter, e.g. a chip package size '2012' tells you the width is 2.0mm and the height is 1.2mm. In **imperial**, the numbers are in hundredths of an inch (which is NOT mills; that is thousandths of an inch). For example, an 0805 chip package tells you the width is 0.08inch, and the height 0.05inch. This is equivalent to the '2012' metric representation. Below is a short description on the most popular chip packages. The imperial size of the footprint is listed first, and then the metric equivalent is followed in brackets.

Sorted from smallest to largest package size.

<table>
    <thead>
        <tr>
            <th width="100">Package Designator (metric, IEC)</th>
            <th width="100">Dimensions (metric)</th>
            <th width="100">Package Designator (imperial, EIA)</th>
            <th width="100">Dimensions (imperial)</th>
            <th width="100">Typical Power Rating (W)</th>
            <th width="100">Land Area</th>
            <th width="400">Comments</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>0402</td>
            <td>0.4x0.2mm</td>
            <td>01005</td>
            <td>0.0157x0.0079in</td>
            <td>1/32</td>
            <td></td>
            <td>Ridiculously small chip package that can barely be seen by the naked eye.</td>
        </tr>
        <tr>
            <td>0603</td>
            <td>0.6x0.3mm</td>
            <td>0201</td>
            <td>0.024x0.012in</td>
            <td>1/20</td>
            <td>0.12mm²</td>
            <td>Small chip package that is unsolderable by hand (it is just too small). BE CAREFUL NOT TO GET THE METRIC SIZE CONFUSED AS AN IMPERIAL as an 0603 imperial also exists!</td>
        </tr>
        <tr>
            <td>1005</td>
            <td>1.0x0.5mm</td>
            <td>0402</td>
            <td>0.039x0.020in</td>
            <td>1/16</td>
            <td>0.5mm²</td>
            <td>These are too small for &#39;legitimate&#39; hand soldering, but it can be done. A common size for resistors and small valued capacitors in the pico/nanofarad range.</td>
        </tr>
        <tr>
            <td>1608</td>
            <td>1.6x0.8mm</td>
            <td>0603</td>
            <td>0.063x0.031in</td>
            <td>1/16</td>
            <td>1.28mm²</td>
            <td>This package supports all resistors, and ceramic capacitors up to 10uF. My favourite package size! You can easily solder these with a little experience. You can route a small track between the pads (given a distance of 0.6mm between the inside edges of the two pads, this just allows for a 0.2mm track and 0.2mm gap on each side, which is a common minimum clearance rule).</td>
        </tr>
        <tr>
            <td>2012</td>
            <td>2.0x1.25mm</td>
            <td>0805</td>
            <td>0.079x0.049in</td>
            <td>1/10</td>
            <td>2.4mm²</td>
            <td>Supports ceramic capacitors up to 47uF. You can easily route a track between the two pads.</td>
        </tr>
        <tr>
            <td>2518</td>
            <td></td>
            <td>1007</td>
            <td></td>
            <td>?</td>
            <td>4.5mm²</td>
            <td>Commonly used for chip inductors are the 100uH, 250mA mark.</td>
        </tr>
        <tr>
            <td>3216</td>
            <td>3.2x1.6mm</td>
            <td>1206</td>
            <td>0.126x0.063in</td>
            <td>1/8</td>
            <td>5.1mm²</td>
            <td>One of the larger forms of SMT resistor/cap packages. Many of the bigger valued ceramic capacitors (100uF and up), come in this package, as well as the higher wattage resistors. Although smaller than their through-hole equivalents, 1206 components still take up a considerable amount of space on a PCB. Very easy to hand solder though!</td>
        </tr>
        <tr>
            <td>3225</td>
            <td>3.2x2.5mm</td>
            <td>1210</td>
            <td>0.126x0.098in</td>
            <td>1/4</td>
            <td>8.0mm²</td>
            <td>Slightly fatter version of the 3216, and hence can handle more power.</td>
        </tr>
        <tr>
            <td>4516</td>
            <td>4.5x1.6mm</td>
            <td>1806</td>
            <td>0.177x0.063in</td>
            <td>?</td>
            <td>7.2mm²</td>
            <td></td>
        </tr>
        <tr>
            <td>4532</td>
            <td>4.5x3.2mm</td>
            <td>1812</td>
            <td>0.18x0.13in</td>
            <td>1/2</td>
            <td>14.4mm²</td>
            <td></td>
        </tr>
        <tr>
            <td>5025</td>
            <td>5.0x2.5mm</td>
            <td>2010</td>
            <td>0.197x0.098in</td>
            <td>1/2</td>
            <td>12.5mm²</td>
            <td></td>
        </tr>
        <tr>
            <td>6432</td>
            <td>6.4x3.2mm</td>
            <td>2512</td>
            <td>0.25x0.13in</td>
            <td>1</td>
            <td>20.48mm²</td>
            <td>One of the largest SMT chip packages you can get. Limited supply of components in this package, mainly power and current-sense resistors.</td>
        </tr>
        <tr>
            <td>7451 or (7351{{% md %}}[^bib-mouser-resettable-fuses]{{% /md %}})</td>
            <td>7.4x5.1mm</td>
            <td>2920</td>
            <td>0.29x0.20in</td>
            <td></td>
            <td>mm²</td>
            <td>Used for PTC resettable fuses{{% md %}}[^bib-belfuse-0zcf-ptc]{{% /md %}}.</td>
        </tr>
    </tbody>
</table>

The following image shows how you can easily route an 0.2mm thick trace between the pads of a 0805 component.

{{% figure src="routing-between-0805-footprints.jpg" width="500px" caption="Routing between the pads of a 0805 footprint (in Altium)." %}}

The following image is of 0603 (imperial) SMD components inside a small container.

{{% figure src="smd-container-open-and-closed.jpg" width="800px" caption="A container from DealExtreme used for holding SMD components (capacitors in this picture)" %}}

## SMD Chip Resistors

The following table shows the range of chip resistors package sizes (based on the EIAJ Chip Packages above), and typical parameters for each. Note that the maximum current rating is based on the thermal properties of the package and its leads, and does not take into account the actual resistance of the resistor (e.g. tested with a 0Ω resistance). Obviously, the actual allowable current is likely to be much less due to resistance.

<table>
    <thead>
        <tr>
            <th>Designator (metric)</th>
            <th>Designator (imperial, EIA)</th>
            <th>Max. Current (A)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1005</td>
            <td>0402</td>
            <td>1</td>
        </tr>
        <tr>
            <td>1608</td>
            <td>0603</td>
            <td>1</td>
        </tr>
        <tr>
            <td>2012</td>
            <td>0805</td>
            <td>2</td>
        </tr>
        <tr>
            <td>3216</td>
            <td>1206</td>
            <td>2</td>
        </tr>
        <tr>
            <td>3225</td>
            <td>1210</td>
            <td>3</td>
        </tr>
        <tr>
            <td>5025</td>
            <td>2010</td>
            <td>3</td>
        </tr>
        <tr>
            <td>6432</td>
            <td>2512</td>
            <td>3</td>
        </tr>
    </tbody>
</table>

## Footprints

Every PCB CAD program worth it's weight in salt will provide footprints for the standard chip packages in their default libraries.

There are reports that the default 0402 (imperial) footprint that is shipped with Eagle is non-ideal and causes "head-in-pillow" and/or tombstoning. See https://www.worthingtonassembly.com/perfect-0402-footprint for more details.

## Reverse-Aspect Chip Capacitors (LICC)

Reverse-aspect chip capacitors (a.k.a LICC) have their leads on the long sides of the chip, as opposed to standard chip components which have the leads on the short sides. This reverse-geometry reduces the inductance in the PCB-to-capacitor connection, and is in high-speed designs where ultra-low inductance is required.

{{% figure src="comparison-of-various-smd-chip-capacitor-internal-designs-mlcc-licc-mpdigest.png" width="483px" caption="A comparison of the different internal designs of various SMD chip capacitors. Image from http://www.mpdigest.com/." %}}

They are normally named the same as normal aspect chip capacitors except with the two numbers in reverse order, i.e. an 0603 sized capacitor now becomes a 0306 capacitor.

## MEMS Oscillators

Some MEMS oscillators uses chip package sizes, but with extra pins for power and ground. One common package size is 2012 (2.0x1.2mm) which is sometimes used for 32.768kHz crystal oscillators (XTAL):

{{% figure src="2012-smd-mems-oscillator-component-package.png" width="300px" caption="Photo of the underside of a MEMS oscillator in a modified (2 extra pins) 2012 (2.0x1.2mm) chip package. Image from https://www.mouser.com/ProductDetail/SiTime/SiT1533AI-H4-AA3-32768E/?qs=dMZC7um9hO9NUxlac12G7g%3D%3D." %}}

## References

[^bib-belfuse-0zcf-ptc]:  Bel. _0ZCF Series_. Retrieved 2022-01-25, from https://www.belfuse.com/product-detail/circuit-protection-0zcf-series.
[^bib-mouser-resettable-fuses]:  Mouser. _2920 (7351 metric) Resettable Fuses - PPTC Datasheets_. Retrieved 2022-01-25, from https://www.mouser.com/c/ds/circuit-protection/thermistors/resettable-fuses-pptc/?package%20%2F%20case=2920%20%287351%20metric%29.

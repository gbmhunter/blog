---
author: gbmhunter
date: 2015-10-25 23:46:07+00:00
draft: false
title: Chip (EIA xxxx) Component Packages
type: page
url: /pcb-design/component-packages/chip-eia-xxxx-component-packages
---

## Chip (EIA xxxx) Component Packages

<table ><tbody ><tr >
<td >Name
</td>
<td >Chip (EIA xxxx) Component Package
</td></tr><tr >
<td >Synonyms
</td>
<td >0603, 0805, 1206 e.t.c
</td></tr><tr >
<td >Variants
</td>
<td >n/a
</td></tr><tr >
<td >Similar To
</td>
<td >n/a
</td></tr><tr >
<td >Mounting
</td>
<td >SMD
</td></tr><tr >
<td >Pin Count
</td>
<td >2+ (2 is the most common, but feedthrough caps have 3 or 4, and resistor networks can have up to 8)
</td></tr><tr >
<td >Pitch
</td>
<td >Variable
</td></tr><tr >
<td >Solderability
</td>
<td >Hand solderability depends on size. Chip packages down to 0402 are easy to solder by hand once you have had some experience.
</td></tr><tr >
<td >Thermal Resistance
</td>
<td >Variable
</td></tr><tr >
<td >Land Area
</td>
<td >Variable
</td></tr><tr >
<td >Height
</td>
<td >Variable
</td></tr><tr >
<td >3D Models
</td>
<td >n/a
</td></tr><tr >
<td >Common Uses
</td>
<td>
    <ul>
        <li>Resistors</li>
        <li>Capacitors</li>
        <li>Ferrite Chips</li>
        <li>LED's</li>
    </ul>
</td></tr></tbody></table>

## Chip Packages And The EIAJ Standard

The following are a description of the most popular chip packages. Chip packages are standardized small SMT footprints primarily used for 2 lead passive components such as resistors, capacitors and ferrite beads. They are defined by four-digit number which represents the total footprint width and height, respectively (assuming the two footprint pads are on the left and right rather than the top or bottom, or more formally, the axis of the component runs parallel to the width).

The standard is to define them in the metric scale, however most manufacturers, and hence suppliers still use the imperial units. In **metric** units, the format is to use two number each to describe the width and height in tenth's of a millimeter, e.g. a chip package size '2012' tells you the width is 2.0mm and the height is 1.2mm. In **imperial**, the numbers are in hundreths of an inch (which is NOT mills; that is thousandth's of an inch). For example, an 0805 chip package tells you the width is 0.08inch, and the height 0.05inch. This is equivalent to the '2012' metric representation. Below is a short description on the most popular chip packages. The imperial size of the footprint is listed first, and then the metric equivalent is followed in brackets.

Sorted from smallest to largest package size.

<table>
    <thead>
        <tr>
            <th>Package Designator (metric)</th>
            <th>Package Designator (imperial)</th>
            <th>Typical Power Rating (W)</th>
            <th>Land AreaComments</th>
        </tr>
    </thead>
    <tbody>
<tr >
<td > ?
</td>
<td >01005
</td>
<td >1/32
</td>
<td > 
</td>
<td >Ridiculously small chip package that can barely be seen by the naked eye.
</td></tr><tr >
<td >0603
</td>
<td >0201
</td>
<td >1/20
</td>
<td >0.12mm2
</td>
<td >Small chip package that is unsolderable by hand (it is just too small). BE CAREFUL NOT TO GET THE METRIC SIZE CONFUSED AS AN IMPERIAL as an 0603 imperial also exists!
</td></tr><tr >
<td >1005
</td>
<td >0402
</td>
<td >1/16
</td>
<td >0.5mm2
</td>
<td >These are too small for 'legitimate' hand soldering, but it can be done. A common size for resistors and small valued capacitors in the pico/nanofarad range.
</td></tr><tr >
<td >1608
</td>
<td >0603
</td>
<td >1/16
</td>
<td >1.28mm2
</td>
<td >This package supports all resistors, and ceramic capacitors up to 10uF. My favourite package size! You can easily solder these with a little experience. You can route a small track between the pads (given a distance of 0.6mm between the inside edges of the two pads, this just allows for a 0.2mm track and 0.2mm gap on each side, which is a common minimum clearance rule).
</td></tr><tr >
<td >2012
</td>
<td >0805
</td>
<td >1/10
</td>
<td >2.4mm2
</td>
<td >Supports ceramic capacitors up to 47uF. You can easily route a track between the two pads.
</td></tr><tr >
<td >2518
</td>
<td >1007
</td>
<td >?
</td>
<td >4.5mm2
</td>
<td >Commonly used for chip inductors are the 100uH, 250mA mark.
</td></tr><tr >
<td >3216
</td>
<td >1206
</td>
<td >1/8
</td>
<td >5.1mm2
</td>
<td >One of the larger forms of SMT resistor/cap packages. Many of the bigger valued ceramic capacitors (100uF and up), come in this package, as well as the higher wattage resistors. Although smaller than their through-hole equivalents, 1206 components still take up a considerable amount of space on a PCB. Very easy to hand solder though!
</td></tr><tr >
<td >3225
</td>
<td >1210
</td>
<td >1/4
</td>
<td >8.0mm2
</td>
<td >Slightly fatter version of the 3216, and hence can handle more power.
</td></tr><tr >
<td >4516
</td>
<td >1806
</td>
<td >?
</td>
<td >7.2mm2
</td>
<td >?
</td></tr><tr >
<td >4532
</td>
<td >1812
</td>
<td >1/2
</td>
<td >14.4mm2
</td>
<td > 
</td></tr><tr >
<td >5025
</td>
<td >2010
</td>
<td >1/2
</td>
<td >12.5mm2
</td>
<td > 
</td></tr><tr >
<td >6432
</td>
<td >2512
</td>
<td >1
</td>
<td >20.48mm2
</td>
<td >One of the largest SMT chip packages you can get. Limited supply of components in this package, mainly power and current-sense resistors.
</td></tr></tbody></table>

The following image shows how you can easily route an 0.2mm thick trace between the pads of a 0805 component.

{{< figure src="/images/electronics-packages/routing-between-0805-footprints.jpg" caption="Routing between the pads of a 0805 footprint (in Altium)."  width="500px" >}}

The following image is of 0603 (imperial) SMD components inside a small container.

{{< figure src="/images/my-workshop/smd-container-open-and-closed.jpg" caption="A container from DealExtreme used for holding SMD components (capacitors in this picture)"  width="800px" >}}

## SMD Chip Resistors

The following table shows the range of chip resistors package sizes (based on the EIAJ Chip Packages above), and typical parameters for each. Note that the maximum current rating is based on the thermal properties of the package and its leads, and does not take into account the actual resistance of the resistor (e.g. tested with a 0Ω). Obviously, the actual allowable current is likely to be much less due to resistance.

<table>
    <thead>
        <tr>
            <th>Package</th>
            <th>Designator (metric)</th>
            <th>Package</th>
            <th>Designator (imperial)</th>
            <th>Maximum Current (A, typical)</th>
            <th>Has Printed Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
<td>1005</td>
<td>0402
</td>
<td>1
</td>
<td>No
</td></tr><tr >
<td>1608
</td>
<td>0603
</td>
<td>1
</td>
<td>Yes
</td></tr><tr >
<td>2012
</td>
<td>0805
</td>
<td>2
</td>
<td>Yes
</td></tr><tr >
<td>3216
</td>
<td>1206
</td>
<td>2
</td>
<td>Yes
</td></tr><tr >
<td>3225
</td>
<td>1210
</td>
<td>3
</td>
<td>Yes
</td></tr><tr >
<td>5025
</td>
<td>2010
</td>
<td>3
</td>
<td>Yes
</td></tr><tr >
<td>6432
</td>
<td>2512
</td>
<td>3
</td>
<td>Yes
</td></tr></tbody></table>

## Reverse-Aspect Chip Capacitors (LICC)

Reverse-aspect chip capacitors (a.k.a LICC) have their leads on the long sides of the chip, as opposed to standard chip components which have the leads on the short sides. This reverse-geometry reduces the inductance in the PCB-to-capacitor connection, and is in high-speed designs where ultra-low inductance is required.

{{< figure src="/images/2015/10/comparison-of-various-smd-chip-capacitor-internal-designs.mlcc-licc-mpdigest.png" width="483px" caption="A comparison of the different internal designs of various SMD chip capacitors. Image from http://www.mpdigest.com/." >}}

They are normally named the same as normal aspect chip capacitors except with the two numbers in reverse order, i.e. an 0603 sized capacitor now becomes a 0306 capacitor.
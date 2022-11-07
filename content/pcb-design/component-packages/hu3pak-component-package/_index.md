---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, PCB Design, Component Packages ]
date: 2022-11-07
description: Pin count, solderability, thermal resistance, dimensions, land pattern, 3D models and more info for the HU3PAK component package.
draft: false
lastmod: 2022-11-07
tags: [ component packages, PCB design, HU3PAK, ST Microelectronics, MOSFETs, thermal resistance, heatsinks ]
title: HU3PAK Component Package
type: page
---

## Overview

<table>
  <tbody>
    <tr>
      <td>Name</td>
      <td style="width: 500px">HU3PAK</td>
    </tr>
    <tr>
      <td>Image</td>
      <td>{{% figure src="hu3pak-3d-render-st-microelectronics.png" width="300px" %}}</td>
    </tr>
    <tr>
      <td>Synonyms</td>
      <td>None</td>
    </tr>
    <tr>
      <td>Variants</td>
      <td>None</td>
    </tr>
    <tr>
      <td>Similar To</td>
      <td>n/a
    </td>
    </tr>
    <tr>
      <td>Mounting</td>
      <td>SMD
    </td>
    </tr>
    <tr>
      <td>Pin Count</td>
      <td>7 + tab (which has two PCB contact points)</td>
    </tr>
    <tr>
      <td>Pitch</td>
      <td>1.27mm{{% md %}}[^bib-st-micro-hu3pak-package-mounting]{{% /md %}}</td>
    </tr>
    <tr>
      <td>Solderability</td>
      <td>Easy to hand-solder if you have had a bit of practise with surface mount devices before. Easy to solder with infrared or reflow techniques.</td>
    </tr>
    <tr>
      <td>Thermal Resistance</td>
      <td>
        <ul>
          <li>\(R_{JC} = 0.51^{\circ}C/W\){{% md %}}[^bib-st-micro-sthu32n65dm6ag-ds]{{% /md %}}</li>
          <li>\(R_{JA} = 30^{\circ}C/W\){{% md %}}[^bib-st-micro-sthu32n65dm6ag-ds]{{% /md %}} (when mounted on 2oz. 1inch^2 PCB) (note that this thermal resistance hides the fact that the thermal resistance to ambient can be much lower if a top-side heatsink is added as intended)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Dimensions</td>
      <td>14mm wide, 18.58 long (including leads) and 3.50mm high{{% md %}}[^bib-st-micro-hu3pak-package-mounting]{{% /md %}}</td>
    </tr>
    <tr>
      <td>3D Models</td>
      <td>n/a</td>
    </tr>
    <tr>
      <td>Common Uses</td>
      <td>
        <ul>
          <li>MOSFETs{{% md %}}[^bib-st-micro-sthu32n65dm6ag-ds]{{% /md %}}</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

The `HU3PAK` component package is a package design used solely by ST Microelectronics. It's designed attached to a heatsink on it's top surface, but unusually does not have any provision for thermally coupling to the PCB (the recommended footprint only has a small amount of soldering points for the 7 pins and two tab locations).

{{% figure src="hu3pak-3d-render-st-microelectronics.png" width="300px" caption="3D render of the HU3PAK component package[^bib-st-micro-sthu32n65dm6ag-ds]." %}}

The only use I could find for this package is for MOSFETs.

## References

[^bib-st-micro-hu3pak-package-mounting]: ST Microelectronics (2021, Nov). _TN1378:  HU3PAK package mounting and thermal behavior_. Retrieved 2022-11-07, from https://www.st.com/resource/en/technical_note/tn1378-hu3pak-package-mounting-and-thermal-behavior-stmicroelectronics.pdf.
[^bib-st-micro-sthu32n65dm6ag-ds]: ST Microelectronics (2021, Nov). _STHU32N65DM6AG: Automotive-grade N-channel 650 V, 83 mΩ typ., 37 A MDmesh DM6 Power MOSFET in an HU3PAK package (datasheet)_. Retrieved 2022-11-07, from https://www.st.com/resource/en/datasheet/sthu32n65dm6ag.pdf.

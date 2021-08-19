---
authors: [ "Geoffrey Hunter" ]
date: 2011-09-03
draft: false
lastmod: 2020-08-28
tags: [ "PCB design", "component packages", "components", "packages", "footprints", "dimensions", "manufacturers", "database", "leadframes" ]
title: "Component Packages"
type: "page"
---

## Overview

Most electronic components come in standardized packages. A package type has well a defined set of physical dimensions that the component has to conform to. For each package, normally the pitch spacing, height and general shape is defined. However most packages contain variants with a differing number of leads (for example the classic old-school DIP package comes in 4, 8, and 10 lead variants just to name a few). This means that total land area and size of a package can vary according to how many leads it has.

Standardizing components sizes and shapes makes it easier for the component manufacturer, the PCB manufacturer, and the design engineer. Although most components are standardized, there are still plenty of packages out there. This pages purpose is to hopefully make some sense of the most common and widely used packages and to help anyone choosing a component package or designing a PCB.

## Component Package Database

Packages are listed alphabetically under the "Child Pages" heading at the top of this page. Click on any package to see more information.

All land-area (occupied PCB space) calculations are based around the minimum-sized square that encloses the entire package. This does not take into account the size of the pads required on the PCB, which would increase the calculation by a small amount. Nominal package dimensions used for calculation. All 3D models are from [http://www.3dcontentcentral.com](http://www.3dcontentcentral.com/).

Click on any photo to expand into a full-sized version.

Component packages with many names (synonyms) are listed by the most common, or most "popular" name, which is not necessarily the technically correct name.

Some items such as the {{% link text="PP3 9V battery case" src="pp3-component-package" %}}, and {{% link text="SIM card sizes" src="sim-card-sizes/" %}}, may not be strictly component packages, but are included here for completeness.

## Break-out Boards

{{< img src="sparkfun-break-out-board.jpg" caption="A SOIC-8 to DIP break-out board made by SparkFun." width="160px" >}}

Break-out boards are useful for converting one package footprint into another. They are particular common for converting smaller SMT package footprints into 100mil DIP packages for prototyping with modern ICs.

If not brought from the right place, these break-out boards can be very expensive!

SparkFun is the cheapest supplier of break-out boards that I've found. Element14 also sells them, but at a much higher price.

## Leadframes

_Leadframes_ are the metal structures that are use during the manufacturing of certain component packages (both through-hole and surface mount) to provide the electrical connection from the IC die to the outside world[^wikipedia-leadframe]. The pins (a.k.a. leads) form part of the leadframe.

Examples of component packages that use leadframes:

* DIP
* QFN
* QFP

## External References

If there is one other site I would direct you to for PCB information, it would be [Tom Hausherr's blog](http://blogs.mentor.com/tom-hausherr/) on the Mentor Graphics website.

3D models (which can be imported into Altium as step files) can be downloaded from 3D Content Central ([www.3dcontentcentral.com](www.3dcontentcentral.com)). It is a combination of content submitted from both users and suppliers, can contains many standard component packages in 3D.

SiliconFarEast "IC Package Types" ([http://www.siliconfareast.com/ic-package-types.htm](http://www.siliconfareast.com/ic-package-types.htm)) - A short but tidy graphical table describing most footprints. Also has data on the body size, body thickness, and lead pitch for the most common variants of each package.

The SMT Code Book ([http://www.marsport.org.uk/smd/mainframe.htm](http://www.marsport.org.uk/smd/mainframe.htm)) - Handy database for working out what small SMT components are. Since there is usually not enough space to print the entire part number, most manufacturers print their own kind of code of small SMT components. This makes it really hard to determine what they are. To make matters worse, many manufacturers use the same code for different components, and sometimes the manufacturer releases two components with the same code! The trick is to be able to identify the package and the code, and together you can get a good idea of what the component is. The SMT Code Book lists over 3,500 SMT device codes in alphabetical order.

[Answers.com's Surface-mount Technology page](http://www.answers.com/topic/surface-mount-technology). Broad spectrum of information regarding SMT components, the production methods and package sizes.

Suggested Pad Layouts For A Number Of Packages (Diodes INC) - Many recommended pad layouts/land patterns for common packages all in one PDF!

Quick-tecks SMT Package Dimensions PDF, which contains hundreds of dimensions for common SMD component packages. You can [download it from here](http://www.quick-teck.co.uk/TechArticleDoc/9522698761347382744.pdf), or alternatively, use the local link [here](/docs/Quick-tecks SMT Package Dimensions.pdf).

## Template

The latest version of the summary template table used on each component package is shown below:

<table>
  <tbody>
    <tr>
      <td>Name</td>
      <td></td>
    </tr>
    <tr>
      <td>Synonyms</td>
      <td></td>
    </tr>
    <tr>
      <td>Variants</td>
      <td>
        <ul>
          <li></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Similar To</td>
      <td></td>
    </tr>
    <tr>
      <td>Mounting</td>
      <td>TH | SMD</td>
    </tr>
    <tr>
      <td>Pin Count</td>
      <td></td>
    </tr>
    <tr>
      <td>Pitch</td>
      <td></td>
    </tr>
    <tr>
      <td>Solderability</td>
      <td></td>
    </tr>
    <tr>
      <td>Thermal Resistance</td>
      <td>
        <ul>
          <li>\(T_{JC} = 0.0^{\circ}{\rm C}/W\)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Dimensions</td>
      <td>0 \(0x0x0=0mm^2\)</td>
    </tr>
    <tr>
      <td>Land Area</td>
      <td></td>
    </tr>
    <tr>
    <td>3D Models</td>
    <td>n/a</td>
    </tr>
    <tr>
      <td>Common Uses</td>
      <td>
        <ul>
          <li></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## References

[^wikipedia-leadframe]: <https://en.wikipedia.org/wiki/Lead_frame>
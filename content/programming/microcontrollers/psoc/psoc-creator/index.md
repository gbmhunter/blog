---
author: gbmhunter
categories: [ "Programming", "Microcontrollers", "Cortex-M3" ]
date: 2013-04-19
draft: false
tags: [ "PSoC", "microcontroller", "IDE", "Cortex-M3" ]
title: PSoC Creator
type: page
---

## Overview

Cypress provides PSoC Designer (for PSoC 1's) and PSoC Creator (for PSoC 3 and 5's). PSoC 5 uses the Cortex-M3 ARM architecture, and uses a free GCC compiler. As of writing, PSoC Creator 2 has just been released which has more pre-made modules and integration into 3rd party IDE's (as of Feb 2013, only Keil, but Cypress plans on extending this in the next year).

## Installing

One annoying thing about PSoC Creator is that it takes plenty of time to install/uninstall (5-10mins+, even on a fast computer). Each new version of PSoC Creator is a fresh install (e.g. PSoC Creator 2.1 and PSoC Creator 2.2), so you normally would want to uninstall the older versions.

## Debugging

When debugging with the IDE, watched variables (shown at the bottom of the screen) can take some time to update themselves once you have paused the program. It all depends on how many you are watching, but keep in mind that it might take a few seconds before the variables update to their correct values. Don't just continue the program quickly thinking that their must be a bug in your code.

## File Types

Knowing what each file can do is helpful when working out what to include in a SCM program (such a Mercurial or Git). Files which can be regenerated are not included in the SCM, as in my opinion they just clutter up change logs.

## All Platforms

<table>
    <thead>
        <tr>
            <th>File</th>
            <th>File Format</th>
            <th>Description</th>
            <th>Include in SCM?</th>
        </tr>
    </thead>
<tbody>
<tr >
<td >_**ProjectName**_.cycdx
</td>
<td >text-xml
</td>
<td >This file is for register mapping. Contains names/addresses, field names/positions, and values for these field for all components used in the project.
</td>
<td >Yes
</td></tr><tr >
<td >_**ProjectName**_.cydwr
</td>
<td >binary
</td>
<td >?
</td>
<td >Yes
</td></tr><tr >
<td >_**ProjectName**_.cyfit
</td>
<td >binary
</td>
<td >?
</td>
<td > 
</td></tr><tr >
<td >_**ProjectName**._cyprj
</td>
<td >text-xml
</td>
<td >The main project file! This contains a reference and path to all the files used in the project. This also stores build settings for both the project and the individual settings.
</td>
<td >Yes
</td></tr><tr >
<td >**_ProjectName_**.cyprj.**_UserName_**
</td>
<td >text-xml
</td>
<td >Contains user information related to the project. Includes lists of all the files in the project, including dependencies for any object files. Also holds debugger information such as what variables you were watching and where you had placed breakpoints.
</td>
<td >No
</td></tr><tr >
<td >_**ProjectName**._cyrpt
</td>
<td >binary
</td>
<td >A report file.
</td>
<td >No
</td></tr><tr >
<td >_**ProjectName**_.cyversion
</td>
<td >text-xml
</td>
<td >This is a very small file which stores the project version.
</td>
<td >Yes
</td></tr><tr >
<td >_**ProjectName-000**_.cywrk
</td>
<td >text-xml
</td>
<td >Default workspace auto-generated when project is made, and contains the project itself.
</td>
<td >Yes
</td></tr><tr >
<td >_**_**ProjectName-000**_.**_cywrk_**.Username**_
</td>
<td >text-xml
</td>
<td >Remembers which nodes have been expanded in the Project Explorer window.
</td>
<td >No
</td></tr><tr >
<td >_**ProjectName**_.rpt
</td>
<td >text-xml
</td>
<td >This file is a mixture of plain text and xml. It is a report file from the hardware creation process (similar to an FPGA report file). There useful for debugging hardware compilation errors.
</td>
<td >Yes
</td></tr><tr >
<td >_**ProjectName**_.svd
</td>
<td >text-xml
</td>
<td >Contains peripheral information.
</td>
<td >Yes
</td></tr><tr >
<td >_**ProjectName**__timing.html
</td>
<td >text-html
</td>
<td >Generated during hardware synthesis, and contains useful information regarding the timing of the routed digital signals (e.g. setup, hold off time).
</td>
<td >No
</td></tr></tbody></table>

## PSoC 3 Specific

<table>
    <thead>
        <tr>
            <th>File</th>
            <th>File Format</th>
            <th>Description</th>
            <th>Include in SCM?</th>
        </tr>
    </thead>
<tbody >
<tr >
<td >**_ProjectName_**_PSoC3lib.uvopt
</td>
<td >text-xml
</td>
<td >Holds file extension, target and debug information
</td>
<td >Yes
</td></tr><tr >
<td >**_**_ProjectName_**_**_PSoC3lib.uvproj
</td>
<td >text-xml
</td>
<td >uVision project file. Contains project file names and paths, build settings,
</td>
<td >Yes
</td></tr></tbody></table>

## File Changes

PSoC Creator can handle outside changes files that it has open and ones loaded with the current project really well. This usually happens if you are using an external code editor or updating files using versioning software. PSoC Creator warns that the files have be changed and gives you the option to reload them.

## Working Out How Much Hardware You Are Using

As part of the compile process, a very nice table showing the utilisation of the different hardware inside the PSoC. This is called the **Technology mapping summary**. It is located in the ProjectName.rpt file in the PSoC project solution folder (.cydsn).

As shown in the image below, the table shows you useful things like how many of the following you are using: UDB Macrocells and Datapath Cells, analog and digital clock dividers, DMA channels, interrupts and pins.

{{< figure src="/images/programming-psoc/psoc-creator-verilog-report-file-technology-mapping-summary-hardware-utilisation.png" caption="The PSoC Creator 'Technology Mapping Table' in the .rpt file, showing a breakdown of the hardware utilisation."   >}}

## Bugs

The Find/Replace algorithm resets it's search position when any text is manipulated. This gets annoying when using "Find Next" or "Replace Next" to selectively replace only certain matches , as you end up going back through previously found matches everytime you make a text edit.

Files in the project explorer are real (i.e. they represent real files somewhere, and if you rename them, the file gets renamed on the disk), but folders are virtual. This is really annoying. If you want to rename a folder that contains source code, you can't just rename it from PSoC Creator and it rename the folder and update all the links for files in that folder. Instead, you have to rename the folder in explorer, and then remove and re-add every single source file that was in that folder in the Project Explorer.

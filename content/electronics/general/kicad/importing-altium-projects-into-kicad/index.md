---
author: "gbmhunter"
date: 2020-05-01
description: "Info on importing Altium PCB projects into KiCAD."
categories: [ "Electronics", "General" ]
lastmod: 2020-05-01
tags: [ "electronics", "KiCAD", "CAD", "Eeschema", "PcbNew", "Altium", "import", "importing", "PCB" ]
title: "Importing Altium Projects Into KiCAD"
type: "page"
---

{{% warning-is-notes %}}

## Overview

If you are wondering if you can import Alitum PCB projects into KiCAD, and how to do it, then you've come to the right place!

## Use The Built-In Import Tool To Convert the PCB File

As of May 2020, the built-in import tool is only available in the nightly builds, and only supports the conversion of the `.PcbDoc` file (the board layout), to the `.kicad_pcb` format. It does not support the import of shcematic files. For importing the schematics we will rely on the 3rd party `altiumtokicad` tool (more on this later).

In PcbNew (KiCADs board routing tool), click _File->Import->Non KiCAD Board File_. Then select _Altium Designer PCB Files (*.PcbDoc)_ from the lower-left dropdown, and then select the Atlium PCB file that you want to import. The tool should take care of the rest!

## Using altiumtokicad To Import The Schematics




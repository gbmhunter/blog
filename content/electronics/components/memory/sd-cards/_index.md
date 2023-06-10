---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Electronic Components" ]
date: 2020-06-25
description: "Info on SD cards."
draft: false
lastmod: 2022-04-07
tags: [ "memory", "SD cards", "NAND", "flash", "controllers", "SLC", "MLC", "pSLC", "TRIM", "wear-levelling", "MOSFETs", "speed classes" ]
title: "SD Cards"
type: "page"
---

## Overview

NAND flash is used as the main memory device inside of SD cards. There is also a memory controller IC (typically a microcontroller) which acts as an intermediary between the flash and the connected device reading/writing to/from the memory.

## The TRIM command

The `TRIM` command is an ATA command which can be sent to an SSD controller by the OS. It is sent from the OS when a file is deleted from the filesystem, and the OS tells the SSD controller which NAND pages have been deleted. If the controller supports `TRIM` commands, then it will flag the pages for deletion so that the SSD controller can erase/free the pages. This increases the pool of available memory the wear-levelling algorithm can work with, allowing it to work more effectively and increasing the life time of the storage device.

```text
# m     h       dom     mon     dow     command
0       1       *       *       *       ionice -c 3 fstrim -v /
```

## Wear-levelling

> Wear leveling is an intrinsic part of the erase pooling functionality of cards in the SanDisk microSD Card Product Family using NAND memory. [^bib-sandisk-sd-oem-product-manual]

There are two types of wear-levelling, _static_ and _global_.

A local cached copy of [SanDisk Whitepaper: SanDisk Flash Memory Cards Wear Leveling, October 2003](/electronics/components/memory/sandisk-white-paper-flash-memory-cards-wear-leveling.pdf).

## Speed Classes

There are three different systems for rating the access speed of an SD card[^bib-sdcard-speed-class]:

* Speed Class
* UHS Speed Class
* Video Speed Class

You will commonly see an SD card rated against more than one of these standards at the same time, e.g. "Class 10, UHS Class 3".

## Multi-level Cells (MLCs)

In the context of NAND memory, a cell is an individual storage element (essentially a MOSFET with a floating gate). The first NAND cells were used to store one 1-bit of information and are called _single-level cells_. A _multi-level cell_ (MLC) is a cell which can hold two bits of information. Most cheaper, high-density SD cards on the market in the 2010's/2020's utilize multi-level cell NAND flash to offer memory spaces of 64GB, 128GB and beyond. However, multi-level cells come at a cost --- they are less reliable than their single-layer cell (SLC) counterparts. This technology has been extended further into Triple-Level Cell (TLC, 3 bits per cell) and Quad-Level Cell (QLC, 4 bits per cell).

1. **SLC** (_Single Level Cell_) is the highest grade of NAND flash. Each cell only has one voltage level it is charged to, allowing only 1-bit to be stored per cell. It is very hard to purchase via standard retail outlets. [Example](https://nz.rs-online.com/web/p/micro-sd-cards/1448058/). As of 2020, 8GB class 10 SLC cards retail for approx. US$120, approx. 5-10x more expensive than their MLC counterparts[^bib-digikey-sd-memory-cards-section].
1. **MLC** (_Multi Level Cell_) has 4 voltage levels per cell, allowing 2 bits of information to be stored. Read speeds are typically lower than _SLC_ because the controller may need to read the cell at two different voltages to help resolve errors[^bib-wikipedia-multi-level-cell]. MLC cards are also marketed for industrial use. The Intel 8087 was one of the first mass-produced ICs to use MLC technology.
1. **TLC** (_Triple-Level Cell_) has 8 voltage levels per cell, allowing 3 bits of information to be stored.
1. **QLC** (_Quad-Level Cell_) has 16 voltage levels per cell, allowing 4 bits of information to be stored.

SLC memory is recommended for SD cards that are going to be used for intensive and/or critical applications in where the SD card will be written to frequently. This includes RaspberryPis that will be used frequently for more than just personal/hobbyist use. RaspberryPis typically use an SD card as it's main source of non-volatile RAM, and writing to the hard disk writes to the RaspberryPi.

Cheaper MLC memory is recommended for typical, standard SD card applications such as storing photos, music and transferring files between devices.

## Pseudo Single-Level Cell (pSLC)

_Pseudo single-level cell_ (pSLC) technology is a cross between SLC and MLC approaches. It uses the more common and cheaper MLC NAND flash memory, but the flash memory controller only stores 1 bit per cell rather than 2 or 3. It offers more reliability than MLC cards but less reliability SLC, however it is much, much cheaper than SLC (pSLC cards are generally only slightly more expensive than MLC cards)

PLC also goes under the names enhanced MLC, superMLC, iSLC, advanced MLC (aMLC), MLC+, turboMLC [^bib-atp-pslc][^bib-cactus-tech-pslc-overview].

Examples of pSLC SD cards include the [AF8GUD4A-BBBIM 8GB microSD Class 10 SD card from ATP Electronics](https://www.digikey.com/en/products/detail/atp-electronics-inc/AF8GUD4A-BBBIM/12336488) which as of April 2022 costs around USD$30 in quantities of 10.

## References

[^bib-sandisk-sd-oem-product-manual]:  https://datasheet.ciiva.com/26837/getdatasheetpartid-335894-26837658.pdf
[^bib-wikipedia-multi-level-cell]:  https://en.wikipedia.org/wiki/Multi-level_cell
[^bib-digikey-sd-memory-cards-section]:  https://www.digikey.com/products/en/memory-cards-modules/memory-cards/501
[^bib-atp-pslc]:  ATP (2020, Nov 11). _The Benefits of Pseudo SLC (pSLC) Flash with Customizable Endurance_. Retrieved 2022-04-06, from https://www.atpinc.com/blog/Pseudo-SLC-benefits-SSD-endurance.
[^bib-cactus-tech-pslc-overview]:  Cactus Technologies. _CTWP016: An Overview of Pseudo-SLC NAND_. Retrieved 2022-04-07, from https://www.cactus-tech.com/wp-content/uploads/2019/03/An-Overview-of-Pseudo-SLC-NAND.pdf.
[^bib-sdcard-speed-class]:  SD Association. _Speed Class_. Retrieved 2022-04-07, from https://www.sdcard.org/developers/sd-standard-overview/speed-class/.

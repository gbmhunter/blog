---
author: "gbmhunter"
categories: [ "Electronics", "Electronic Components" ]
date: 2013-10-02
description: "EEPROM, flash, SD cards and more info about memory."
draft: false
lastmod: 2020-06-25 
tags: [ "memory", "EEPROM", "flash", "I2C", "M25P128" ]
title: "Memory"
type: "page"
---

## EEPROM

Even though flash is technically a form of EEPROM, the word EEPROM is usually reserved to smaller-memory, read/write/erase 1 byte at-a-time ICs (flash is usually erased in pages and has way more memory).

The cheapest EEPROM on the market is usually available with an I2C, 1-wire (e.g. UNI/O), or SPI-like (e.g. Microwire) interface, in packages such as the SOT-23-6, SOIC-8 and DIP-8.

{{< img src="example-eeprom-pinout-in-sot-23-6-package.png" width="361px" caption="Example pinout of a EEPROM IC in a SOT-23-6 component package." >}}

### Unique IDs

Some EEPROM chips also come with unique ID's burnt into memory. The [DS28E05 by Maxim Integrated](http://datasheets.maximintegrated.com/en/ds/DS28E05.pdf) is one such example. It provides a unique 64-bit ID number which can be read back from read-only memory. It also serves as it's 1-wire address.

{{< img src="ds28e05-eeprom-ic-connected-to-micro-using-1-wire.pdf.png" width="390px" caption="The DS28E05 EEPROM I2C, connected to a microcontroller via the 1-wire interface."  >}}

## Flash

Flash sometimes uses flip-flop style pin naming conventions. The M25P128 is one such example.

{{< img src="m25p128-flash-ic-that-uses-flip-flop-style-naming-for-spi-pins.png" width="427px" caption="The M25P128 flash IC which uses flip-flop style pin naming conventions." >}}

## SD Cards

NAND flash is used as the main memory device inside of SD cards. There is also a memory controller IC (typically a microcontroller) which acts as an intermediary between the flash and the connected device reading/writing to/from the memory .

### The TRIM command

The TRIM command is an ATA command which can be sent to an SSD controller by the OS. It is sent from the OS when a file is deleted from the filesystem, and the OS tells the SSD controller which NAND pages have been deleted. If the controller supports TRIM commands, then it will flag the pages for deletion so that the SSD controller can erase/free the pages. This increases the pool of available memory the wear-levelling algorithm can work with, allowing it to work more effectively and increasing the life time of the storage device.

```text
# m     h       dom     mon     dow     command
0       1       *       *       *       ionice -c 3 fstrim -v /
```

### Wear-levelling

> Wear leveling is an intrinsic part of the erase pooling functionality of cards in the SanDisk microSD Card Product Family using NAND memory.[^sandisk-sd-oem-product-manual]

There are two types of wear-levelling, _static_ and _global_.

A local cached copy of [SanDisk Whitepaper: SanDisk Flash Memory Cards Wear Leveling, October 2003](/electronics/components/memory/sandisk-white-paper-flash-memory-cards-wear-leveling.pdf).

### Multi-level Cells

A _multi-level cell_ is a individual storage element which can hold more than one bit of information.

1. **SLC** (_Single Level Cell_) is the highest grade of NAND flash. It is very hard to purchase via standard retail outlets. [Example](https://nz.rs-online.com/web/p/micro-sd-cards/1448058/).
2. **MLC** (_Multi Level Cell_). Read speeds are typically lower than _SLC_ because the controller may need to read the cell at two different voltages to help resolve errors[^wikipedia-multi-level-cell]. MLC cards are also marketed for industrial use.

[^sandisk-sd-oem-product-manual]: [https://datasheet.ciiva.com/26837/getdatasheetpartid-335894-26837658.pdf](https://datasheet.ciiva.com/26837/getdatasheetpartid-335894-26837658.pdf)
[^wikipedia-multi-level-cell]: [https://en.wikipedia.org/wiki/Multi-level_cell](https://en.wikipedia.org/wiki/Multi-level_cell)
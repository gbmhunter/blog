---
authors: [ "Geoffrey Hunter" ]
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

{{% figure src="_assets/example-eeprom-pinout-in-sot-23-6-package.png" width="361px" caption="Example pinout of a EEPROM IC in a SOT-23-6 component package." %}}

### Unique IDs

Some EEPROM chips also come with unique ID's burnt into memory. The [DS28E05 by Maxim Integrated](http://datasheets.maximintegrated.com/en/ds/DS28E05.pdf) is one such example. It provides a unique 64-bit ID number which can be read back from read-only memory. It also serves as it's 1-wire address.

{{% figure src="_assets/ds28e05-eeprom-ic-connected-to-micro-using-1-wire.pdf.png" width="390px" caption="The DS28E05 EEPROM I2C, connected to a microcontroller via the 1-wire interface." %}}

## Flash

Flash sometimes uses flip-flop style pin naming conventions. The M25P128 is one such example.

{{% figure src="_assets/m25p128-flash-ic-that-uses-flip-flop-style-naming-for-spi-pins.png" width="420px" caption="The M25P128 flash IC which uses flip-flop style pin naming conventions." %}}

---
author: gbmhunter
date: 2013-10-02 22:22:07+00:00
draft: false
title: Memory
type: page
url: /electronics/components/memory
---

# EEPROM

Even though flash is technically a form of EEPROM, the word EEPROM is usually reserved to smaller-memory, read/write/erase 1 byte at-a-time ICs (flash is usually erased in pages and has way more memory).

The cheapest EEPROM on the market is usually available with an I2C, 1-wire (e.g. UNI/O), or SPI-like (e.g. Microwire) interface, in packages such as the SOT-23-6, SOIC-8 and DIP-8.

[caption id="attachment_13043" align="aligncenter" width="361"][![Example pinout of a EEPROM IC in a SOT-23-6 component package.](/images/2013/10/example-eeprom-pinout-in-sot-23-6-package.png)
](/images/2013/10/example-eeprom-pinout-in-sot-23-6-package.png) Example pinout of a EEPROM IC in a SOT-23-6 component package.[/caption]

## Unique IDs

Some EEPROM chips also come with unique ID's burnt into memory. The [DS28E05 by Maxim Integrated](http://datasheets.maximintegrated.com/en/ds/DS28E05.pdf) is one such example. It provides a unique 64-bit ID number which can be read back from read-only memory. It also serves as it's 1-wire address.

[caption id="attachment_13044" align="aligncenter" width="390"][![The DS28E05 EEPROM I2C, connected to a microcontroller via the 1-wire interface.](/images/2013/10/ds28e05-eeprom-ic-connected-to-micro-using-1-wire.pdf.png)
](/images/2013/10/ds28e05-eeprom-ic-connected-to-micro-using-1-wire.pdf.png) The DS28E05 EEPROM I2C, connected to a microcontroller via the 1-wire interface.[/caption]

# Flash

Flash sometimes uses flip-flop style pin naming conventions. The M25P128 is one such example.

[caption id="attachment_9317" align="aligncenter" width="427"][![The M25P128 flash IC which uses flip-flop style pin naming conventions.](/images/2013/10/m25p128-flash-ic-that-uses-flip-flop-style-naming-for-spi-pins.png)
](/images/2013/10/m25p128-flash-ic-that-uses-flip-flop-style-naming-for-spi-pins.png) The M25P128 flash IC which uses flip-flop style pin naming conventions.[/caption]

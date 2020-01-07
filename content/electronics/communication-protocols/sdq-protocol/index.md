---
author: "gbmhunter"
date: 2015-04-12
draft: false
lastmod: 2020-01-07
tags: [ "electronics", "communication protocols", "SDQ protocol", "1-wire", "Texas Instruments", "TI", "CRC", "Apple", "lightning connector" ]
title: "SDQ Protocol"
type: "page"
---

## Overview

The SDQ protocol is a proprietary 1 wire (excluding ground) interface designed by Texas Instruments. It is very similar to the [1-wire communication protocol](/electronics/communication-protocols/1-wire-protocol).

An example of an IC which uses this protocol is the [Texas Instruments BQ2024](http://www.ti.com/lit/ds/symlink/bq2024.pdf), a 1.4kb serial EEPROM.

[8-bit CRC calculations](https://blog.mbedded.ninja/programming/general/crcs-cyclic-redundancy-checks/) are used within this protocol to ensure a high-degree of data integrity.

A number of Apple products use the SDQ interface, including the Apple lightning connector, MagSafe, and iPhone/iPad batteries[^github-sdq-analyzer].

The popular Saleae logic analyzer product range can support the SDQ protocol with the additional use of the free and open-source [SDQAnalyzer plugin](https://github.com/nezza/SDQAnalyzer).

[^github-sdq-analyzer]: [https://github.com/nezza/SDQAnalyzer](https://github.com/nezza/SDQAnalyzer)

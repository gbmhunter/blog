---
author: "gbmhunter"
categories: [ "Programming" ]
date: 2021-05-11
draft: false
lastmod: 2021-05-11
tags: [ "programming" ]
title: "A Comparison Of Embedded Platforms And HALs"
type: "page"
---

{{% warning-is-notes %}}

## Overview

PlatformIO not included as it does not provide a HAL.

Arduino

Most popular.
No built-in or bundled RTOS.
Hard definitions/peripherals.
Library support: 9/10

Many Arduino libraries make assumptions about what SPI/I2C peripheral you are using. For example, most just assume (and use) the `SPI` interface), which is a global variable to your first SPI interface.

mbed

Only polling support for SPI
Library support: 5/10

Zephyr

cmsis

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

This is a opinioned review of the many different "platforms" available for use when you want to develop firmware to run on your microcontroller.

Who wants to be trying to find the missing register information in a 1000 page technical reference manual when someone has already done the work for you and provided a HAL (hardware abstraction layer).

Shall be rated under the following categories:

- HAL
- RTOS Support
- Dependency Management
- Library Support
- IDE Support

## Arduino

### Ratings

**HAL: 7/10**

The documentation for the Arduino API is o.k. Not bad, not great, but generally acceptable.

**RTOS Support: 4/10**

**Dependency Management: 6/10**

**Library Support: 5/10**

**IDE Support: 9/10**

### Comments

Most popular.
No built-in or bundled RTOS.
Global, constant definitions/peripherals can hinder the flexibility. `yield()` based co-routines.

Many Arduino libraries make assumptions about what SPI/I2C peripheral you are using. For example, most just assume (and use) the `SPI` interface), which is a global variable to your first SPI interface.

## PlatformIO

### Ratings

**HAL: n/a**

Being a build system and package manager PlatformIO does not provide any HAL (as expected). 

**RTOS Support: n/a**

Being a build system and package manager PlatformIO does not provide any RTOS (as expected). 

**Dependency Management: 9/10**

Unsure of the amount of support for libraries of libraries (dependencies of dependencies).

**Library Support: 5/10**

**IDE Support: x/10**

### Comments

PlatformIO is a package manager and build system. It can be used together with many of the platforms mentioned here that do provide a HAL, such as Arduino, mbed or Zephyr.


## mbed

**HAL: n/a**

**RTOS Support: n/a**

**Dependency Management: x/10**

**Library Support: x/10**

**IDE Support: x/10**

### Comments

Only polling support for SPI.

## Zephyr

Lacking  C++ support for:

- Dynamic memory allocation via `new` or `delete`
- No exception support
- No RTTI

## cmsis

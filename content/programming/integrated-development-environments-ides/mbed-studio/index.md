---
author: "gbmhunter"
categories: [ "Programming", "Integrated Development Environments" ]
date: 2020-06-23
description: "Info about Mbed Studio."
draft: false
lastmod: 2020-08-09
tags: [ "programming", "integrated development environments", "IDEs", "Mbed Studio", "ARM", "Cortex-M", "pyOCD", "ARM Compiler", "Mbed OS", "RTOS", "API", "HAL" ]
title: "Mbed Studio"
type: "page"
---

{{% warning-is-notes %}}

## Overview

Mbed Studio is an IDE for embedded devices. It is based of the [Eclipse Theia IDE](https://theia-ide.org/), which is itself based of Visual Studio Code.

{{% img src="arm-mbed-studio-getting-started.png" width="600px" caption="A screenshot of the 'Getting Started' welcome screen in Mbed Studio." %}}

Mbed Studio uses ARM Compiler 6 (as of June 2020).

Mbed Studio also tightly integrates with Mbed OS. Mbed OS provides an RTOS and object-orientated HAL.

{{% img src="mbed-studio-os-blinky-example.png" width="600px" caption="A screenshot of the 'OS blinky' example project in Mbed Studio." %}}

## Installation

Mbed Studio can be installed on Linux, MacOS and Windows.

Default directory for projects is `<user-home-directory>/Mbed Programs/<project-name>`.

## Debugging

For flashing and debugging microcontrollers, Mbed Studio uses the [PyOCD](https://github.com/mbedmicro/pyOCD) library. pyOCD is an open-source Python library for programming and debugging Arm Cortex-M microcontrollers.

```bash
pyocd list
pyocd gdbserver
pyocd pack --find <microcontroller-part-num>
```

## Mbed Version Preprocessor Definitions

Mbed provides the following preprocessor `#define` macros in `mbed_version.h`:

```text
MBED_MAJOR_VERSION
MBED_MINOR_VERSION
MBED_PATCH_VERSION
```

## Adding Custom Boards

See [https://os.mbed.com/docs/mbed-os/v6.0/porting/porting-custom-boards.html](https://os.mbed.com/docs/mbed-os/v6.0/porting/porting-custom-boards.html).

## HAL Support

If you get the pin configuration wrong, Mbed will print an error using `printf()` at runtime, e.g. if I configured a `BufferedSerial` and passed in the TX and RX pins in the wrong order:

```
BufferedSerial debug_uart(PA_10, PA_9); // These pins are in the wrong order, PA_9 is TX, PA_10 is RX (STM32F070 microcontroller)
```

You get the runtime error:

```
++ MbedOS Error Info ++
Error Status: 0x80010130 Code: 304 Module: 1
Error Message: pinmap not found for peripheral
Location: 0x8005AC7
Error Value: 0xA
For more info, visit: https://mbed.com/s/error?error=0x80010130&tgt=NUCLEO_F070RB
```

## API

### Serial

As of mbed v6.0, `Serial` has been deprecated in favour of `BufferedSerial` and `UnbufferedSerial`.

### SPI

```c
SPI(const spi_pinmap_t);
```
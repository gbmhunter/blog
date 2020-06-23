---
author: "gbmhunter"
categories: [ "Programming", "Integrated Development Environments" ]
date: 2020-06-23
description: "Info about Mbed Studio."
draft: false
lastmod: 2020-06-23
tags: [ "programming", "integrated development environments", "IDEs", "Mbed Studio", "ARM", "Cortex-M", "pyOCD", "ARM Compiler", "Mbed OS", "RTOS" ]
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

## Adding Custom Boards

See [https://os.mbed.com/docs/mbed-os/v6.0/porting/porting-custom-boards.html](https://os.mbed.com/docs/mbed-os/v6.0/porting/porting-custom-boards.html).
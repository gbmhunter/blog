---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Integrated Development Environments" ]
date: 2020-06-19
description: "Info about STM32CubeIDE, an IDE for the STM32 family of microcontrollers."
draft: false
lastmod: 2020-06-22
tags: [ "programming", "integrated development environments", "IDEs", "STM32CubeIDE", "C", "C++", "embedded", "microcontrollers", "STMicroelectronics", "ioc", "arm-none-eabi-gcc", "arm-none-eabi-g++" ]
title: "STM32CubeIDE"
type: "page"
---

{{% warning-is-notes %}}

## Overview

STM32CubeIDE is an IDE from STMicroelectronics specifically for the STM32 range of microcontrollers. It supports firmware development in C or C++. It integrates with _STM32Cube_.

{{% img src="stm32-cube-ide-logo.png" width="600px" caption="The STM32CubeIDE logo." %}}

## Installation

The installer is approx. 685MiB.

Default directories (examples below shown for `v1.3.0`):

**Windows**
Installation: `C:\ST\STM32CubeIDE_1.3.0`

**All OSes**
Workspace: `<user home directory>/STM32CubeIDE/workspace_1.3.0`
STM32Cube Repository: `<user home directory>/STM32Cube/Repository`

SEGGER J-Link drivers, ST_LINK drivers and ST_LINK server software is provided with the installation.

## Default File Structure

```
<root_project_dir>
  |-- Core
  |   |-- Inc                    Contains the user header files.
  |   |-- Src                    Contains the user source code.
  |   |-- Startup
  |-- Debug                     Default directory for debug build artifacts.
  |-- Drivers
  |-- .cproject
  |-- .mxproject
  |-- .project       
  |-- <project_name>.ioc        Contains the pinout and hardware configuration of the micro.
  |-- <micro_name>_FLASH.ld     This is the linker script for the micro.
```

## The .ioc File

The `.ioc` file contains information about the target microcontroller and the hardware configuration for your project.

{{% img src="stm32cubeide-ioc-file-micro-pinout.png" width="700px" caption="A screenshot of the 'Pinout & Configuration' view of the .ioc file in STM32CubeIDE." %}}

Enabling peripherals via the `.ioc` file generates `MX_<peripheral_name>_Init()` functions in the `main.c` file. HAL driver files are also provided for peripherals. They are written in a object-orientated way (e.g. every `UART` related HAL function which take a pointer to the UART object as it's first parameter).

## Git Ignore File

```
Debug/
```

## C++ Projects

Confusingly, even if you specify the project as a "C++ Project" when creating it, you will be presented with `main.c` file. You can rename this to `main.cpp` to begin using C++ (this will cause `arm-none-eabi-g++` to be called on `main.cpp` rather than `arm-none-eabi-gcc`, which will allow you to include C++ code).

The linker is called correctly regardless of the extension of `main` --- `arm-none-eabi-g++` will be called during the linking step.

However, when you change the peripheral configurations using the `.ioc` file and re-generate code, it will also recreate the `main.c`.

## STM32CubeMonitor

{{% img src="stm32-cube-monitor-screenshot.png" width="800px" caption="A screenshot of the STM32CubeMonitor application running on Windows." %}}
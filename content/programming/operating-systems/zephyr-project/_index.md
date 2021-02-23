---
author: "gbmhunter"
date: 2020-04-19
description: "Installation and usage info on the Zephyr project, an open-source embedded RTOS developed by the Linux Foundation."
draft: false
categories: [ "Programming", "Operating Systems" ]
lastmod: 2021-02-23
tags: [ "programming", "operating systems", "OSes", "RTOS", "Zephyr", "Zephyr SDK", "west", "Python", "CMake", "HAL" ]
title: "Zephyr Project"
type: "page"
---

{{% warning-is-notes %}}

## Overview

The _Zephyr Project_ (also just called _Zephyr_, which will be used for the remainder of this page) is a real-time operating system designed for resource-constrained devices such as microcontrollers. Is is part of the Linux Foundation.

{{% img src="zephyr-project-logo.png" width="500px" %}}

The [main repo can be found on GitHub](https://github.com/zephyrproject-rtos/zephyr).

Zephyr provides cooperative and preemptive scheduling.

Uses a [CMake](/programming/build-systems-and-package-managers/cmake) build environment.

## Installation

### Windows

The easiest way to install Zephyr on Windows is to use the chocolatey package manager. Once that is installed, run the following steps from an elevated command prompt:

1. Enable global confirmation so that you don't have to manually confirm the installation of individual programs:

    ```cmd
    > choco feature enable -n allowGlobalConfirmation
    Chocolatey v0.10.15
    Enabled allowGlobalConfirmation
    ```

1. Install Zephyr dependencies:

    ```cmd
    > choco install cmake --installargs 'ADD_CMAKE_TO_PATH=System'
    > choco install ninja gperf python git
    ```

    If you already have some of these packages installed on your machine via means other than chocolatey, it's advisable to remove them from the above command so you don't install them again and have one program shadow/conflict the other.

1. Install the Zephyr command-line tool called `west` (NOTE: I have run into problems using a Python virtual environment, so I install `west` to the OS version of Python, more on this below):

    ```cmd
    > pip install west
    ```

1. Create a new Zephyr project:

    ```cmd
    > west init myproject
    === Initializing in C:\Users\gbmhunter\myproject
    --- Cloning manifest repository from https://github.com/zephyrproject-rtos/zephyr, rev. master
    Initialized empty Git repository in C:/Users/gbmhunter/myproject/.west/manifest-tmp/.git/
    remote: Enumerating objects: 55, done.
    remote: Counting objects: 100% (55/55), done.
    remote: Compressing objects: 100% (42/42), done.
    ...
    ...
    Branch 'master' set up to track remote branch 'master' from 'origin'.
    --- setting manifest.path to zephyr
    === Initialized. Now run "west update" inside C:\Users\gbmhunter\zephyrproject.
    ```

    WARNING: I got the following error when trying to use a Python virtual environment rather than the OS Python environment to install west and then run `west init`:

    ```text
    > python -m venv .venv
    > .\.venv\Scripts\activate
    > pip install west
    > west init myproject
    Updating files: 100% (14758/14758), done.
    Already on 'master'
    Branch 'master' set up to track remote branch 'master' from 'origin'.
    Traceback (most recent call last):
      File "C:\Users\gbmhunter\AppData\Local\Programs\Python\Python38-32\lib\shutil.py", line 788, in move
        os.rename(src, real_dst)
    PermissionError: [WinError 5] Access is denied: 'C:\\Users\\gbmhunter\\myproject\\.west\\manifest-tmp' -> 'C:\\Users\\gbmhunter\\myproject\\zephyr'
    ```

1. Export a Zephyr CMake package to your local CMake user package registry. This allows CMake to automatically find a Zephyr "base":

    ```cmd
    > west zephyr-export
    Zephyr (C:/Users/gbmhunter/zephyrproject/zephyr/share/zephyr-package/cmake)
    has been added to the user package registry in:
    HKEY_CURRENT_USER\Software\Kitware\CMake\Packages\Zephyr

    ZephyrUnittest (C:/Users/gbmhunter/zephyrproject/zephyr/share/zephyrunittest-package/cmake)
    has been added to the user package registry in:
    HKEY_CURRENT_USER\Software\Kitware\CMake\Packages\ZephyrUnittest
    ```

1. Download and install the GNU Arm Embedded Toolchain from <https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads>. By default this was installed on my system at `C:\Program Files (x86)\GNU Arm Embedded Toolchain\10 2020-q4-major>`.

1. Setup environment variables:

    ```cmd
    set ZEPHYR_TOOLCHAIN_VARIANT=gnuarmemb
    set GNUARMEMB_TOOLCHAIN_PATH=C:\Program Files (x86)\GNU Arm Embedded Toolchain\10 2020-q4-major
    ```

## Hardware Abstraction Layers

Examples of some of the HALs (which are installed under `<project root dir>/modules/hal/`) supported by Zephyr:

* ST
* STM32
* NXP
* Atmel
* Microchip

## Zephyr SDK

The _Zephyr SDK_ contains toolchains to compile, assemble, link and program/debug Zephyr applications. Currently it is only supported on Linux. On Windows and macOS, you have to manually install the toolchains you require for your Zephyr application.

## Supported Boards

See <https://docs.zephyrproject.org/latest/boards/index.html#boards> for a comprehensive list of all the development boards supported by the Zephyr platform.

## Common Errors

### File not found (on Windows)

If you get an error when running `west build` similar to:

```text
CMake Error at C:/Users/Geoffrey Hunter/temp/zephyrproject/zephyr/cmake/kconfig.cmake:206 (message):
  File not found: C:/Users/Geoffrey
```

It is due to there being one or more spaces in the path to your Zephyr project directory. This isn't a bug that is going to be fixed anytime soon, Zephyr is very clear on the matter in their documentation:

{{% img src="spaces-in-path-not-supported-zephyr-documentation-warning.png" width="900px" caption="" %}}

I found this out the hard way and went through all the trouble of [renaming my user directory](https://superuser.com/questions/890812/how-to-rename-the-user-folder-in-windows-10) to fix the issue.
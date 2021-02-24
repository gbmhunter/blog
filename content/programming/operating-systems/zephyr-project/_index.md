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

Zephyr is cross-platform (i.e. you can build projects and flash embedded devices) and supported on Linux, Windows and macOS. However, you will experience the least amount of issues and friction running Zephyr on Linux. Linux is also the only platform currently supported by the Zephyr SDK.

## Installation

### Windows

The easiest way to install Zephyr on Windows is to use the chocolatey package manager. Once that is installed, run the following steps from an elevated command prompt:

{{% warning %}}
Make sure to use a command-prompt and not PowerShell, as PowerShell does not play nice with the `set` method of defining environment variables.
{{% \warning %}}

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

1. Change into the project directory and run `west update`:

    ```cmd
    > west update
    ```

    This command can take a few minutes to run as it clones a number of repositories into the project directory.

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

1. Download and install the GNU Arm Embedded Toolchain from <https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads>. By default it will want to be installed on your system at `C:\Program Files (x86)\GNU Arm Embedded Toolchain\10 2020-q4-major>`, but don't let it! Zephyr does not like spaces in the path, so install it to a path which has none. I chose `C:\gnu-arm-embedded-toolchain\10-2020-q4-major\`:

1. Setup environment variables:

    ```cmd
    set ZEPHYR_TOOLCHAIN_VARIANT=gnuarmemb
    set GNUARMEMB_TOOLCHAIN_PATH=C:\gnu-arm-embedded-toolchain\10-2020-q4-major
    ```

1. Install the Python dependencies that Zephyr

1. Build the application! For this example I will be using the ST NUCLEO F070RB development board. Note that you can't build this from the project root directory, first you have to change into the `zephyr` subdirectory:

    ```cmd
    > cd .\zephyr
    > west build -b nucleo_f070rb samples/basic/blinky
    C:\Users\gbmhunter\temp\myproject\zephyr>west build -b nucleo_f070rb samples/basic/blinky
    [121/128] Linking C executable zephyr\zephyr_prebuilt.elf

    [128/128] Linking C executable zephyr\zephyr.elf
    Memory region         Used Size  Region Size  %age Used
              FLASH:       13544 B       128 KB     10.33%
                SRAM:        4416 B        16 KB     26.95%
            IDT_LIST:          0 GB         2 KB      0.00%
    ```

1. Install OpenOCD from <https://github.com/xpack-dev-tools/openocd-xpack/releases>. I extracted the .zip file and then copied the files to `C:\Program Files\OpenOCD\bin`.

1. Flash the application:

    ```cmd
    west flash
    ```

    NOTE: I got an error when running this:

    ```text
      File "C:\Users\gbmhunter\temp\myproject\zephyr\scripts/west_commands\runners\core.py", line 504, in require
        if shutil.which(program) is None:
      File "C:\Users\gbmhunter\AppData\Local\Programs\Python\Python38-32\lib\shutil.py", line 1365, in which
        if os.path.dirname(cmd):
      File "C:\Users\gbmhunter\AppData\Local\Programs\Python\Python38-32\lib\ntpath.py", line 223, in dirname
        return split(p)[0]
      File "C:\Users\gbmhunter\AppData\Local\Programs\Python\Python38-32\lib\ntpath.py", line 185, in split
        p = os.fspath(p)
    TypeError: expected str, bytes or os.PathLike object, not NoneType
    ```

### Ubuntu

1. Install system dependencies:

    ```sh
    sudo apt install --no-install-recommends git cmake ninja-build gperf \
      ccache dfu-util device-tree-compiler wget \
      python3-dev python3-pip python3-setuptools python3-tk python3-wheel xz-utils file \
      make gcc gcc-multilib g++-multilib libsdl2-dev
    ```

1. Install `west`:

    ```sh
    pip3 install --user -U west
    echo 'export PATH=~/.local/bin:"$PATH"' >> ~/.bashrc
    source ~/.bashrc
    ```

1. Get the Zephyr source code:

    ```sh
    west init ~/zephyrproject
    cd ~/zephyrproject
    west update
    ``

1. Export a Zephyr CMake package:

    ```sh
    west zephyr-export
    ```

1. Download the Zephyr SDK:

    ```sh
    cd ~
    wget https://github.com/zephyrproject-rtos/sdk-ng/releases/download/v0.12.3/zephyr-sdk-0.12.3-x86_64-linux-setup.run
    ```

1. Install the Zephyr SDK:

    ```sh
    $ chmod +x zephyr-sdk-0.12.3-x86_64-linux-setup.run
    $ sudo ./zephyr-sdk-0.12.3-x86_64-linux-setup.run -- -d /opt/zephyr-sdk-0.12.3
    Verifying archive integrity...  100%   All good.
    Uncompressing SDK for Zephyr  100%  
    Installing SDK to /opt/zephyr-sdk-0.12.3
    Creating directory /opt/zephyr-sdk-0.12.3
    Success
    [*] Installing arm tools... 
    [*] Installing arm64 tools... 
    [*] Installing arc tools... 
    [*] Installing nios2 tools... 
    [*] Installing riscv64 tools... 
    [*] Installing sparc tools... 
    [*] Installing mips tools... 
    [*] Installing x86_64 tools... 
    [*] Installing xtensa_sample_controller tools... 
    [*] Installing xtensa_intel_apl_adsp tools... 
    [*] Installing xtensa_intel_s1000 tools... 
    [*] Installing xtensa_intel_bdw_adsp tools... 
    [*] Installing xtensa_intel_byt_adsp tools... 
    [*] Installing xtensa_nxp_imx_adsp tools... 
    [*] Installing xtensa_nxp_imx8m_adsp tools... 
    [*] Installing CMake files... 
    [*] Installing additional host tools... 
    Success installing SDK.
    SDK is ready to be used.
    ```

    You don't have to install into `/opt/` if you don't want to. Installing into your home directory is also valid.

1. Install `udev` rules:

    ```sh
    sudo cp /opt/zephyr-sdk-0.12.3/sysroots/x86_64-pokysdk-linux/usr/share/openocd/contrib/60-openocd.rules /etc/udev/rules.d
    sudo udevadm control --reload
    ```

1. `cd` into the `zephyr` directory (a sub-directory of the project directory) and build the Blinky sample:

    ```sh
    cd ~/zephyrproject/zephyr
    west build -p auto -b nucleo_f070rb samples/basic/blinky
    ```

1. Make sure the dev. kit is plugged into the computer, and then flash the application onto the dev kit (remember we were using the NUCLEO-F070RB for this example):

    ```sh
    west flash
    ````

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

## Peripheral APIs

The latest documentation for peripheral (UART, SPI, PWM, PIN, e.t.c.) APIs can be found at <https://docs.zephyrproject.org/latest/reference/peripherals/index.html>.

## What Does A Basic Zephyr Firmware Application Look Like?

The following example shows `main.c` (the only `.c` file) for the `Blinky` sample project:

```c
/*
 * Copyright (c) 2016 Intel Corporation
 *
 * SPDX-License-Identifier: Apache-2.0
 */

#include <zephyr.h>
#include <device.h>
#include <devicetree.h>
#include <drivers/gpio.h>

/* 1000 msec = 1 sec */
#define SLEEP_TIME_MS   1000

/* The devicetree node identifier for the "led0" alias. */
#define LED0_NODE DT_ALIAS(led0)

#if DT_NODE_HAS_STATUS(LED0_NODE, okay)
#define LED0	DT_GPIO_LABEL(LED0_NODE, gpios)
#define PIN	DT_GPIO_PIN(LED0_NODE, gpios)
#define FLAGS	DT_GPIO_FLAGS(LED0_NODE, gpios)
#else
/* A build error here means your board isn't set up to blink an LED. */
#error "Unsupported board: led0 devicetree alias is not defined"
#define LED0	""
#define PIN	0
#define FLAGS	0
#endif

void main(void)
{
	const struct device *dev;
	bool led_is_on = true;
	int ret;

	dev = device_get_binding(LED0);
	if (dev == NULL) {
		return;
	}

	ret = gpio_pin_configure(dev, PIN, GPIO_OUTPUT_ACTIVE | FLAGS);
	if (ret < 0) {
		return;
	}

	while (1) {
		gpio_pin_set(dev, PIN, (int)led_is_on);
		led_is_on = !led_is_on;
		k_msleep(SLEEP_TIME_MS);
	}
}
```

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

### No module named 'elftools'


```text
FAILED: zephyr/include/generated/kobj-types-enum.h zephyr/include/generated/otype-to-str.h zephyr/include/generated/otype-to-size.h
cmd.exe /C "cd /D C:\Users\gbmhunter\temp\myproject\zephyr\build\zephyr && C:\Users\gbmhunter\AppData\Local\Programs\Python\Python38-32\python.exe C:/Users/gbmhunter/temp/myproject/zephyr/scripts/gen_kobject_list.py --kobj-types-output C:/Users/gbmhunter/temp/myproject/zephyr/build/zephyr/include/generated/kobj-types-enum.h --kobj-otype-output C:/Users/gbmhunter/temp/myproject/zephyr/build/zephyr/include/generated/otype-to-str.h --kobj-size-output C:/Users/gbmhunter/temp/myproject/zephyr/build/zephyr/include/generated/otype-to-size.h --include C:/Users/gbmhunter/temp/myproject/zephyr/build/zephyr/misc/generated/struct_tags.json "
Traceback (most recent call last):
  File "C:/Users/gbmhunter/temp/myproject/zephyr/scripts/gen_kobject_list.py", line 62, in <module>
    import elftools
ModuleNotFoundError: No module named 'elftools'
```

You typically get the error `No module named 'elftools'` if you haven't installed the Python modules that Zephyr requires to build. To install the required modules:

```cmd
> pip3 install -r scripts/requirements.txt
```
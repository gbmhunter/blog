---
authors: [ Geoffrey Hunter ]
date: 2020-04-19
description: Installation and usage info on the Zephyr project, an open-source embedded RTOS developed by the Linux Foundation.
draft: false
categories: [ Programming, Operating Systems ]
lastmod: 2024-01-08
tags: [ programming, operating systems, OSes, RTOS, Zephyr, Zephyr SDK, west, Python, CMake, HAL, bit field, reset reason, shell, module ]
title: Zephyr Project
type: page
---

{{% warning-is-notes %}}

## Overview

The _Zephyr Project_ (also just called _Zephyr_, which will be used for the remainder of this page) is a real-time operating system designed for resource-constrained devices such as microcontrollers. Is is part of the Linux Foundation.

{{% figure src="_assets/zephyr-project-logo.png" width="500px" caption="The Zephyr Project logo." %}}

The [main repo can be found on GitHub](https://github.com/zephyrproject-rtos/zephyr).

Zephyr provides cooperative and preemptive scheduling.

Uses a {{% link text="CMake" src="/programming/build-systems-and-package-managers/cmake" %}} build environment.

Zephyr is cross-platform (i.e. you can build projects and flash embedded devices) and supported on Linux, Windows and macOS. However, you will experience the least amount of issues and friction running Zephyr on Linux. Linux is also the only platform currently supported by the Zephyr SDK.

Zephyr is also a platform supported by the {{% link text="PlatformIO" src="/programming/integrated-development-environments-ides/platform-io" %}} build system and IDE.

## Installation

### Windows

The easiest way to install Zephyr on Windows is to use the chocolatey package manager. Once that is installed, run the following steps from an elevated command prompt:

{{% warning %}}
Make sure to use a command-prompt and not PowerShell, as PowerShell does not play nice with the `set` method of defining environment variables.
{{% /warning %}}

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

## Device Trees

Example device tree (for the STM32F070RB development board):

```text
/*
 * Copyright (c) 2018 qianfan Zhao
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/dts-v1/;
#include <st/f0/stm32f070Xb.dtsi>
#include "arduino_r3_connector.dtsi"

/ {
	model = "STMicroelectronics NUCLEO-F070RB board";
	compatible = "st,stm32f070rb-nucleo", "st,stm32f070";

	chosen {
		zephyr,console = &usart2;
		zephyr,shell-uart = &usart2;
		zephyr,sram = &sram0;
		zephyr,flash = &flash0;
	};

	leds {
		compatible = "gpio-leds";
		green_led_2: led_2 {
			gpios = <&gpioa 5 GPIO_ACTIVE_HIGH>;
			label = "User LD2";
		};
	};

	gpio_keys {
		compatible = "gpio-keys";
		user_button: button {
			label = "User";
			gpios = <&gpioc 13 GPIO_ACTIVE_LOW>;
		};
	};

	aliases {
		led0 = &green_led_2;
		sw0 = &user_button;
	};
};

&usart1 {
	current-speed = <115200>;
	status = "okay";
};

&usart2 {
	current-speed = <115200>;
	status = "okay";
};

&i2c1 {
	status = "okay";
	clock-frequency = <I2C_BITRATE_FAST>;
};

&i2c2 {
	status = "okay";
	clock-frequency = <I2C_BITRATE_FAST>;
};

&spi1 {
	status = "okay";
};

&spi2 {
	status = "okay";
};

&iwdg {
	status = "okay";
};
```

## Peripheral APIs

Not only does Zephyr provide you with an RTOS, but it also gives you a collection of well defined APIs for interacting with microcontroller peripherals.

The latest documentation for peripheral (UART, SPI, PWM, PIN, e.t.c.) APIs can be found at <https://docs.zephyrproject.org/latest/reference/peripherals/index.html>.

### Hardware Info

The Zephyr Hardware Info API can be used to access the device ID and reset cause of a microcontroller. The reset cause comes from a list of standardised reasons that apply to most microcontrollers such as reset pin, a software reset, a watchdog timer reset, brownout reset, debug event, e.t.c (not all reset causes may be applicable to a particular microcontroller).

`hwinfo_get_reset_cause()` sets a uint32_t with each bit representing a different reason for reset (a bit field). More than 1 bit can be set. Below is a C function which decodes the reset cause bit field returned from `hwinfo_get_reset_cause()` and creates a human-readable string of the reset reason(s) (great for logging).

```c
#include <stdint.h>

#include <zephyr/drivers/hwinfo.h>
#include <zephyr/logging/log.h>

typedef struct {
    uint32_t flag;
    char name[20]; // Make sure this is as large as the largest name
} resetCauseFlag_t;

/**
 * @brief This function logs the reset cause in a human-readable manner, obtained via hwinfo_get_reset_cause().
 */
void LogResetCause()
{
    uint32_t resetCause;
    int resetCauseRc = hwinfo_get_reset_cause(&resetCause);
    __ASSERT_NO_MSG(resetCauseRc == 0);

    resetCauseFlag_t resetCauseFlags[] = {
        { RESET_PIN, "RESET_PIN" },
        { RESET_SOFTWARE, "RESET_SOFTWARE" },
        { RESET_BROWNOUT, "RESET_BROWNOUT" },
        { RESET_POR, "RESET_POR" },
        { RESET_WATCHDOG, "RESET_WATCHDOG" },
        { RESET_DEBUG, "RESET_DEBUG" },
        { RESET_SECURITY, "RESET_SECURITY" },
        { RESET_LOW_POWER_WAKE, "RESET_LOW_POWER_WAKE" },
        { RESET_CPU_LOCKUP, "RESET_CPU_LOCKUP" },
        { RESET_PARITY, "RESET_PARITY" },
        { RESET_PLL, "RESET_PLL" },
        { RESET_CLOCK, "RESET_CLOCK" },
        { RESET_HARDWARE, "RESET_HARDWARE" },
        { RESET_USER, "RESET_USER" },
        { RESET_TEMPERATURE, "RESET_TEMPERATURE" },
    };

    const uint32_t buffSize = 100;
    char resetReasonBuffer[buffSize];
    resetReasonBuffer[0] = '\0'; // Set the initial byte to 0 so that strncat will work correctly
    uint32_t currLength = 0;

    for(int i = 0; i < sizeof(resetCauseFlags) / sizeof(resetCauseFlag_t); i++)
    {
        if(resetCause & resetCauseFlags[i].flag) 
        {
            // Append reset cause string to message
            strncat(resetReasonBuffer, resetCauseFlags[i].name, buffSize - currLength);
            currLength = strlen(resetReasonBuffer);

            // Add ", " between reasons
            strncat(resetReasonBuffer, ", ", buffSize - currLength);
            currLength = strlen(resetReasonBuffer);
        } 
    }

    LOG_INF("Reset reason as a bit field: 0x%04X. This means the following flags were set: %s", resetCause, resetReasonBuffer);

    // Clear the reset cause
    resetCauseRc = hwinfo_clear_reset_cause();
    __ASSERT_NO_MSG(resetCauseRc == 0);
}
```

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

## Emulation

Zephyr supports the targets `qemu_x86` and `qemu_cortex_m3` for running Zephyr applications on desktop computers. This is great for development, testing and CICD purposes.

## Zephyr and C++

There are a number of C++ features that Zephyr does not support which removes C++ as a 1st tier language for writing Zephyr applications. This includes:

- No dynamic memory allocation support via `new` or `delete`. Dynamic memory allocation in the embedded land is a contentious subject, but it's nice to be able to use it if it's a suitable choice for your application.
- No RTTI (run-time type information)
- No support for exceptions. Again, another contentious embedded subject, but nice to have the option of using them if you want.

## The Zephyr Shell

[Zephyr features a "shell"](https://docs.zephyrproject.org/latest/services/shell/index.html) (one of it's modules) that it can provide over a serial transport such as a UART, USB or Segger RTT. The shell provides to the user things such as Linux command-line style commands, logging, auto-complete, command history and more. In  It is great for implementing a debug interface to control your microcontroller from a terminal application such as [NinjaTerm](https://ninjaterm.mbedded.ninja/) (shameless plug, I developed this app).

Zephyr provides an API that the firmware can use to define the commands available to the user over the shell.

## Common Errors

### File not found (on Windows)

If you get an error when running `west build` similar to:

```text
CMake Error at C:/Users/Geoffrey Hunter/temp/zephyrproject/zephyr/cmake/kconfig.cmake:206 (message):
  File not found: C:/Users/Geoffrey
```

It is due to there being one or more spaces in the path to your Zephyr project directory. This isn't a bug that is going to be fixed anytime soon, Zephyr is very clear on the matter in their documentation:

{{% figure src="_assets/spaces-in-path-not-supported-zephyr-documentation-warning.png" width="900px" caption="" %}}

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

### '__device_dts_ord_DT_N_NODELABEL_xxx_ORD' undeclared

Zephyr can produce some really obscure error messages when there are errors relating to the device tree, for example:

```text
C:/project/zephyr/include/zephyr/device.h:83:41: error: '__device_dts_ord_DT_N_NODELABEL_hs_0_ORD' undeclared (first use in this function)
   83 | #define DEVICE_NAME_GET(dev_id) _CONCAT(__device_, dev_id)
      |                                         ^~~~~~~~~
```

If you are using the VS Code and the nRF Connect extension, sometimes this can be fixed by making when you setup the build configuration you set the Configuration to "Use build system default" as shown in {{% ref "selecting-use-build-system-default-in-nrf-connect" %}}.

{{% figure ref="selecting-use-build-system-default-in-nrf-connect" src="selecting-use-build-system-default-in-nrf-connect.png" width="900px" caption="" %}}

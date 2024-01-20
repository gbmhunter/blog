---
authors: [ Geoffrey Hunter ]
date: 2020-04-19
description: Installation and usage info on the Zephyr project, an open-source embedded RTOS developed by the Linux Foundation.
draft: false
categories: [ Programming, Operating Systems ]
lastmod: 2024-01-18
tags: [ programming, operating systems, OSes, RTOS, Zephyr, Zephyr SDK, west, Python, CMake, HAL, bit field, reset reason, shell, module, workqueues, threads, non-volatile storage, NVS, install, toolchain, ARM, Linux, workspace, west, application ]
title: Zephyr Project
type: page
---

{{% warning-is-notes %}}

## Overview

The _Zephyr Project_ (also just called _Zephyr_, which will be used for the remainder of this page) is the combination of a **real-time operating system, peripheral API framework, and build system** that is designed for resource-constrained devices such as microcontrollers. Is is part of the Linux Foundation.

{{% figure ref="fig-zephyr-project-logo.png" src="_assets/zephyr-project-logo.png" width="500px" caption="The Zephyr Project logo." %}}

Zephyr provides a firmware developer with a rich ecosystem of out-of-the-box OS and peripheral functionality that is consistent across MCU manufacturers (e.g. you can use the same UART API on both a STM32 and nRF53 MCU). It also features an integrated build system called `west`. 

Some criticism arises from Zephyr's complexity. Once such example is that Zephyr adds another layer of configurability with the use of Kconfig (a configuration language that was originally designed to configure the Linux kernel[^kernel-org-kconfig-language]). Firmware behaviour can now be controlled via a combination of Kconfig settings, preprocessor macros and API calls at runtime. The Kconfig is layered in a hierarchical manner and dependencies and overrides can make it difficult to determine how your MCU is being configured.

The [main repo can be found on GitHub](https://github.com/zephyrproject-rtos/zephyr).

Zephyr provides cooperative and preemptive scheduling.

Uses a {{% link text="CMake" src="/programming/build-systems-and-package-managers/cmake" %}} build environment.

Zephyr is cross-platform (i.e. you can build projects and flash embedded devices) and supported on Linux, Windows and macOS. However, you will experience the least amount of issues and friction running Zephyr on Linux. Linux is also the only platform currently supported by the Zephyr SDK.

Zephyr is also a platform supported by the {{% link text="PlatformIO" src="/programming/integrated-development-environments-ides/platform-io" %}} build system and IDE.

## Installation

Below are some basic Zephyr installation guides for various OSes. Another good read is the official [Getting Started Guide](https://docs.zephyrproject.org/latest/develop/getting_started/index.html).

### Windows

The easiest way to install Zephyr on Windows is to use the chocolatey package manager. Once that is installed, run the following steps from an elevated command prompt:

{{% aside type="warning" %}}
Make sure to use a command-prompt and not PowerShell, as PowerShell does not play nice with the `set` method of defining environment variables.
{{% /aside %}}

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

### Ubuntu/WSL

Follow these instructions to setup/install Zephyr on UNIX like systems, including Ubuntu and WSL. Use of `apt` assumes you are running a Debian like system.

1. Firstly, install system dependencies:

    ```sh
    sudo apt install --no-install-recommends git cmake ninja-build gperf \
      ccache dfu-util device-tree-compiler wget \
      python3-dev python3-pip python3-setuptools python3-tk python3-wheel xz-utils file \
      make gcc gcc-multilib g++-multilib libsdl2-dev
    ```

1. Create a new directory for the Zephyr project and a Python virtual environment in a `.venv` sub-directory:

    ```sh
    mkdir ~/zephyr-project
    cd ~/zephyr-project
    python3 -m venv .venv
    source .venv/bin/activate
    ```

1. Install `west` in the new virtual environment (`west` is a Python package):

    ```sh
    pip install west
    ```

1. Initialize the west workspace:

    ```sh
    west init .
    ```

    This creates a directory called `.west` inside the current working directory. Inside `.west` another directory called `manifest-tmp`.

1. Update:

    ```
    west update
    ```

    `west update` downloads a lot of Git submodules that are present in the project under `./modules/`.

1. Export a Zephyr CMake package:

    ```sh
    west zephyr-export
    ```

    This adds `Zephyr` to the user package registry at `~/.cmake/packages/Zephyr` (which is outside of the project root directory).

1. Install additional Python dependencies:

    ```sh
    pip install -r ./zephyr/scripts/requirements.txt
    ```

1. Next, download the _Zephyr SDK_. The SDK contains toolchains (compilers, linkers, assemblers and other tools such as QEMU and OpenOCD) for all of Zephyr's supported architectures (e.g. `ARM`, `RISCV64`, `x86_64`, `Xtensa`, `aarch64`). Find the release you want from https://github.com/zephyrproject-rtos/sdk-ng/tags (use the latest if you don't otherwise care). The example below uses `v0.16.4`.

    This is downloaded and installed outside of the Zephyr project directory. You only need one copy of this for many Zephyr projects.

    ```sh
    cd ~
    wget https://github.com/zephyrproject-rtos/sdk-ng/releases/download/v0.16.4/zephyr-sdk-0.16.4_linux-x86_64.tar.xz
    ```

    This file is over 1GB in size, so make sure you have space! There is also a _minimal release_ which doesn't come with all the toolchains, but instead let's you select and download the ones you needed.

1. Extract the downloaded SDK:

    ```sh
    tar xvf zephyr-sdk-0.16.4_linux-x86_64.tar.xz
    ```

    This will extract the SDK to `~/zephyr-sdk-0.16.4`. You can choose to move it somewhere else if you want. Other common choices include `/opt/` and `/usr/local/`.

1. Run the Zephyr SDK setup script:

    ```sh
    cd zephyr-sdk-0.16.4
    ./setup.sh
    ```

1. Install `udev` rules, which let's you program most boards as a regular user (serial port permissions):

    ```sh
    sudo cp ~/zephyr-sdk-0.16.4/sysroots/x86_64-pokysdk-linux/usr/share/openocd/contrib/60-openocd.rules /etc/udev/rules.d
    sudo udevadm control --reload
    ```

1. `cd` into the `zephyr` directory (a sub-directory of the project directory) and build the Blinky sample:

    ```sh
    cd ~/zephyr-project/zephyr
    west build -p auto -b nucleo_f070rb samples/basic/blinky
    ```

1. Make sure the dev. kit is plugged into the computer, and then flash the application onto the dev kit (remember we were using the NUCLEO-F070RB for this example):

    ```sh
    west flash
    ````

{{% aside type="note" %}}
Both `west init` and `west update` can take some time to run (2-5mins each).
{{% /aside %}}

If you don't have a dev. board, you could always test out Zephyr by building it for Linux.

```sh
west build -p auto -b native_sim samples/basic/blinky
```

The build executable is at `./zephyr/build/zephyr/zephyr.exe` (even though the extension is `.exe`, it is compiled for Linux not Windows). Of course, there is no basic LED we can blink when running on Linux, but it is mocked for us and instead prints to `stdout`:

```sh
~/zephyr-project/zephyr/build/zephyr$ ./zephyr.exe 
*** Booting Zephyr OS build zephyr-v3.5.0-4014-g0d7d39d44172 ***
LED state: OFF
LED state: ON
LED state: OFF
LED state: ON
LED state: OFF
LED state: ON
...
```

## Creating An Application

Once you've followed the installation instructions, you should be able to build and flash _repository_ applications that are contained with the Zephyr repo (e.g. blinky). But what if you want to develop your own application? This is were is pays to understand the three different application types:

* **Repository Application:** An application contained with the Zephyr repository itself (inside the `zephyr/` directory in the workspace you created above). Typically these are example projects under `samples/` like "Hello, world!" and "blinky". In the directory structure below, `hello_world` is a repository application.
    ```text
    zephyr-project/
    ├─── .west/
    │    └─── config
    └─── zephyr/
        ├── arch/
        ├── boards/
        ├── cmake/
        ├── samples/
        │    ├── hello_world/
        │    └── ...
        ├── tests/
        └── ...
    ```
* **Workspace Application:** An application that is within the west workspace, but not within the zephyr repository (`zephyr/`). This is the way I recommended you create an application if you're learning! In the directory structure below, `app` is a workspace application:
    ```text
    <home>/
    ├─── zephyr-project/
    │     ├── .west/
    │     ├── app/
    │     │    ├── CMakeLists.txt
    │     │    ├── prj.conf
    │     │    └── src/
    │     │        └── main.c
    │     ├── zephyr/
    │     ├── bootloader/
    │     ├── modules/
    │     └── ...
    ```
* **Freestanding Application:** An application that is not within the west workspace, i.e. stored somewhere else entirely on your disk. In the directory structure below, `app` is a freestanding application:
    ```text
    <home>/
    ├─── zephyr-project/
    │     ├─── .west/
    │     │    └─── config
    │     ├── zephyr/
    │     ├── bootloader/
    │     ├── modules/
    │     └── ...
    │
    └─── app/
        ├── CMakeLists.txt
        ├── prj.conf
        └── src/
            └── main.c
    ```

### Creating a Workspace Application

If you are learning, I'd recommend you start by creating a bare bones workspace application to learn what the core files are for. Create a directory called `app` in the workspace:

```bash
cd ~/zephyr-project
mkdir app
```

Now create a file called `CMakeLists.txt` with the follow context:

```cmake
cmake_minimum_required(VERSION 3.20.0)

find_package(Zephyr)
project(my_zephyr_app)

target_sources(app PRIVATE src/main.c)
```

Create an empty `prj.conf`. It needs to exist, but you don't need anything in it for now.

The last thing you need to create a directory called `src` to store all the source code, and then create a file in it called `main.c` with the following contents.

```c
#include <stdio.h>
#include <zephyr/kernel.h>

int main(void) {
    while (1) {
        printf("Hello, world!\n");
        k_msleep(1000);
    }
    return 0;
}
```

Your basic app is done! Your file structure should look like this:

```text
<home>/
├─── zephyr-project/
│     ├── .west/
│     ├── app/
│     │    ├── CMakeLists.txt
│     │    ├── prj.conf
│     │    └── src/
│     │        └── main.c
│     ├── zephyr/
│     ├── bootloader/
│     ├── modules/
│     └── ...
```

To build and run, first `cd` back into the west workspace at `~/zephyr-project/`. The run this at the command-line:

```bash
west build -b native_sim ./app
west build -t run
```

The first command performs a build, telling west to use the `native_sim` board (runs on Linux) and to build the app located at `./app`. The second command tells west to run it, and you should get output similar to this:

```bash
(.venv) geoff@my-computer:~/zephyr-project$ west build -t run
-- west build: running target run
[1/2] cd /home/geoff/zephyr-project/build && /home/geoff/zephyr-project/build/zephyr/zephyr.exe
*** Booting Zephyr OS build zephyr-v3.5.0-4014-g0d7d39d44172 ***
Hello, world!
Hello, world!
Hello, world!
...
```

## Moving a West Workspace

I haven't had much luck moving a West workspace on Linux. After moving, the `west` executable could not be found (making sure the Python virtual environment was activated).

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

### Native Simulator (native_sim)

`native_sim` allows you to build a Zephyr application to run on POSIX-like OSes, e.g. Linux.

{{% aside type="note" %}}
`native_sim` is a successor to the legacy `native_posix` Zephyr board. Use `native_sim` instead wherever possible.
{{% /aside %}}

To build for POSIX, provide `native_sim` as the build target to west with the `-b` option, e.g.:

```bash
west build -b native_sim samples/hello_world
```

You can then run the built application with:

```bash
west build -t run
```

The `native_sim` board supports the following APIs:

* GPIO (mocked)
* Watchdog
* Timers

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

## System/OS Features

### Timers

Zephyr _Timers_ are an OS primitive that you can start and then have timeout after a certain duration. If you provide a callback, you can to run things after a fixed duration in the future in either a one-off (one-shot) or continuous manner. If you don't provide a callback, you can still inspect the state of the timer from your application.

You do not have to add anything to `prj.conf` to use timers. First you'll need to include the following header file which defines the timer API:

```c
#include <zephyr/kernel.h>
```

You create a timer with `void k_timer_init(struct k_timer * timer, k_timer_expiry_t expiryFn, k_timer_stop_t stopFn)`. You can then start a timer with `void k_timer_start(struct k_timer * timer, k_timeout_t duration, k_timeout_t period)`.

Note that the function you pass in as `expiryFn` gets executed in the system interrupt context. Thus you have to be careful not to block in the expiry function or take too much time processing.

Here is a basic example:

```c
#include <stdio.h>
#include <zephyr/kernel.h>

extern void MyExpiryFn(struct k_timer * timerId) {
    printf("Timer expired!\n");
}

int main(void) {
    struct k_timer myTimer;
    printf("Creating timer to expire every 1s...\n");
    k_timer_init(&myTimer, MyExpiryFn, NULL);
    k_timer_start(&myTimer, K_MSEC(1000), K_MSEC(1000));

    while (1) {
        k_msleep(1000);
    }
    return 0;
}
```

{{% figure ref="fig-timers-basic-example-output" src="_assets/timers-basic-example-output.png" width="400px" caption="Running the timer example code above and observing the expiry function run every second." %}}

You can read the official Zephyr documentation for Timers [here](https://docs.zephyrproject.org/latest/kernel/services/timing/timers.html).

### Workqueues

A Zephyr _workqueue_ is like a thread but a few extra features included, the main one being a "queue" in which you can add work to for the thread to complete.

What you submit to a workqueue is a function pointer. This function will be run when the thread processes the item from the queue. This is very similar to the way you would typically create a thread, except that usually thread functions in embedded systems are designed to never return (i.e. they are designed to be created when the firmware starts-up and run continuously).

The following C code shows a basic work object being statically defined using the `K_WORK_DEFINE()` macro, and then work submitted in `main()` using `k_work_submit()`. The program will log the "Hello" message when the workqueue processes the work in the workqueue thread. Note that `k_work_submit()` submits work to the special system workqueue (explained below).

```c
static void myWorkQueueHandler(struct k_work * work)
{
    LOG_INF("Hello from the work thread!");
}

K_WORK_DEFINE(my_work_queue, &myWorkQueueHandler);

int main()
{
    int rc = k_work_submit(&my_work_queue); // Submits work to the system workqueue, myWorkQueueHandler() will get called soon from a different thread...
    // Allow any of the positive return codes but don't allow errors
    __ASSERT_NO_MSG(rc >= 0);

    return 0;
}
```

#### System Workqueue

The Kernel defines a standardized "system workqueue" that you can use. It is recommended that you use this workqueue by default, and only create additional ones only if you need multiple work queue jobs to run in parallel (e.g. in one job may block or otherwise take a long time to complete). The reason for this is that every new workqueue requires a stack, and a typical stack size could be 2kB or more. Having many workqueues will quickly eat into your remaining available RAM[^zephyr-docs-workqueue].

Work can be submitted to the system workqueue by using the function `k_work_submit()`. Use the more generic `k_work_submit_to_queue()` if you want to submit work to a queue that you created (in this case, you also have to pass in a pointer to the queue).

#### Creating Your Own Workqueue

If you can't just use the system workqueue and want to create your own workqueues, you can use the functions `k_work_queue_init()` and `k_work_queue_start()` to do so. You first have to create a stack object before creating the workqueue, passing the stack object into it.

The following code example shows how to do this:

```c
#define STACK_SIZE 512 // Stack size of work queue
#define PRIORITY 5 // Priority of work queue

K_THREAD_STACK_DEFINE(myStackArea, STACK_SIZE);

struct k_work_q myWorkQueue;

k_work_queue_init(&myWorkQueue);

k_work_queue_start(&myWorkQueue,
                   myStackArea,
                   K_THREAD_STACK_SIZEOF(myStackArea),
                   PRIORITY,
                   NULL);
```

### Asserts

Zephyr provides support for standard C library `assert()` function as well as providing more powerful assert macros if you wish you use them.

`ASSERT_NO_MSG()` can be used if you don't want to have to provide a message. I end up using this a lot as adding a message to every assert becomes tiresome (a typical project ends up with hundreds of assert calls, checking things like passed-in pointers are non-null, integers are within range, e.t.c).

```c
ASSERT_NO_MSG();
```

### Watchdog

Zephyr provides a software/hardware based watchdog API you can use to monitor your threads and perform actions (usually a system reset) in the case that your threads become unresponsive and do not feed the watchdog in time. The API provides the ability to monitor multiple application threads at once via it's software watchdog. This software watchdog can in turn be monitored by a hardware watchdog. A hardware watchdog (i.e. a physical peripheral provided by the MCU) can be trusted to reliably reset the device, even if the software watchdog locks up (which can be the case with certain errors).

{{% aside type="note" %}}
Why not just use the hardware watchdog? The useful thing about the software watchdog thread is that is provides the ability to independently monitor multiple threads, with different timeouts associated with each thread. It provides a more granularly and control about what you watch and how often you expect each thread to "check in". 
{{% /aside %}}

To use the watchdog, first add the following to your `prf.conf`:

```text
CONFIG_TASK_WDT=y
```

You'll then need to include the header file that provides the API:

```c
#include <zephyr/task_wdt/task_wdt.h>
```

You then need to enable the watchdog task with `int task_wdt_init (const struct device * hw_wdt)`:

```c
int wdRc = task_wdt_init(NULL);
__ASSERT_NO_MSG(wdRc == 0);
```

Passing in `NULL` for `hw_wdt` says you don't want to connect the software watchdog task up with a hardware watchdog. In most real life applications you do want to provide a hardware watchdog, **as the probability of the software watchdog failing is too high to rely solely on it** (whereas a hardware watchdog is very reliable).

You can "install" a new channel with the software watchdog by using `int task_wdt_add(uint32_t reload_period, task_wdt_callback_t callback, void *user_data)`. You then need to regularly feed the channel with `int task_wdt_feed (int channel_id)`, as shown in the below code snippet:

```c
void my_thread_fn() {
    // When your thread starts, install a new watchdog timeout for this thread
    // Passing NULL as second param means system reset handler will be called
    // if watchdog timer expires
    int wdtChannelId = task_wdt_add(5000, NULL, NULL);
    __ASSERT_NO_MSG(wdtChannelId == 0);

    while(1) {
        int rc = task_wdt_feed(wdtChannelId); // Regularly feed the watchdog to prevent system reset
        __ASSERT_NO_MSG(rc == 0);
        // Sleep for a second before feeding again
        k_sleep(K_MSEC(1000));
    }
}
```

Make sure you have enough available channels to be able to install timeouts. You can change this in `prf.conf` with `CONFIG_TASK_WDT_CHANNELS`. By default is set to `5`, but can be changed to anything in the range `[2, 100]`[^zephyr-docs-kconfig-search-wdt-channels].

The following code is a complete example showing watchdog task functionality that can be built for the `native_sim` board (Linux). It sets the watchdog up with a 3s timeout. It feeds the watchdog once a second for 5 seconds, and then pretends there is a bug which locks up the code. The software watchdog successfully resets the device 3 seconds later.

It does not use multiple threads (as a real world application typically would), but just shows watchdog working in the main thread.

```c
#include <stdio.h>

#include <zephyr/kernel.h>
#include <zephyr/task_wdt/task_wdt.h>

int main(void) {
    // Initialize, passing NULL so we are not using a hardware watchdog
    // (for real applications you normally want a hardware watchdog backing the software one!)
    int wdRc = task_wdt_init(NULL);
    __ASSERT_NO_MSG(wdRc == 0);

    // Install a new WDT channel
    int wdtChannelId = task_wdt_add(3000, NULL, NULL);
    __ASSERT_NO_MSG(wdtChannelId == 0);

    uint32_t cycleCount = 0;

    while(1) {
        printf("Feeding watchdog.\n");
        int rc = task_wdt_feed(wdtChannelId); // Regularly feed the watchdog to prevent system reset
        __ASSERT_NO_MSG(rc == 0);
       
        if (cycleCount == 5) {
            printf("Oh oh, bug has got this thread stuck!\n");
            while(1) {
                // Do nothing, just hang here
                k_msleep(1000);
            }
        }

        cycleCount += 1;
        // Sleep for a second before cycling around again
        k_msleep(1000);
    }
    return 0;
}
```

{{% figure ref="fig-watchdog-example" src="_assets/watchdog-example.png" width="800px" caption="Running the watchdog example code and seeing it timeout." %}}

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

### Non-Volatile Storage

Zephyr provides an API for storing things in non-volatile storage (flash memory). The NVS API is provided by `#include <zephyr/fs/nvs.h>`.

{{% aside type="note" %}}
Although different, Zephyr provides a similar service called the _Retention System_ for storing data whilst the device is powered on (i.e. it will persist across resets, but it will NOT persist across power cycles).
{{% /aside %}}

Typically a partition called `storage_partition` is setup in the main flash for the NVS system to use. This can be defined in the board files.

An official code example of the NVS can be found at https://github.com/zephyrproject-rtos/zephyr/blob/main/samples/subsys/nvs/src/main.c[^github-zephyr-nvs-code-example].

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

## Logging

Zephyr has very powerful logging features (compared to what you typically expect for embedded devices) provided via it's logging API.

The code below shows how you can change the logging levels at runtime:

```c
#include <zephyr/logging/log.h>
#include <zephyr/logging/log_ctrl.h>

int main() {
  // ...

  // Change all log levels at runtime
  // NOTE: If you do this for a particular event, you may want to save all
  // the previous levels and restore them after the event is finished
  uint32_t sourceId = 0;
  const char * sourceName;
  uint32_t logLevel = LOG_LEVEL_INF;
  while(1) {
      sourceName = log_source_name_get(0, sourceId);
      if (sourceName == NULL) {
          // Found the last source ID, let's bail
          break;
      } else {
          LOG_WRN("Settings %s log level to: %d", sourceName, logLevel);
          log_filter_set(NULL, 0, sourceId, logLevel);
          sourceId += 1;
      }
  }

  // ...
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

## Reducing Flash and RAM Usage in Zephyr

Zephyr-based applications can get large, in part due to the powerful features it provides out-of-the-box. Just things like using logging throughout your code can increase flash usage significantly, due to every call saving the log message (before substitution takes place at runtime) as a string literal in ROM. This can easily use up many "kB" of space. If you weren't using float printing before hand, this call also bring in float formatting functionality. Similarly, all `ASSERT()` style macros save the file name and line number of the assert as a string literal in ROM. However these are quite useful, even in production, so think carefully before disabling them.

`CONFIG_SIZE_OPTIMIZATIONS=y` can be set in `prj.conf` to reduce the flash size. One thing this does is set the compiler flag `-Os` which tells the compiler to optimize for size, not speed or debug ability.

On one project I was working on, just setting `CONFIG_SIZE_OPTIMIZATIONS=y` in `prf.conf` resulted in a flash size reduction from 421kB to 330kB.

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

### "__device_dts_ord_DT_N_NODELABEL_xxx_ORD" undeclared

Zephyr can produce some really obscure error messages when there are errors relating to the device tree, for example:

```text
C:/project/zephyr/include/zephyr/device.h:83:41: error: '__device_dts_ord_DT_N_NODELABEL_hs_0_ORD' 
       undeclared (first use in this function)
   83 | #define DEVICE_NAME_GET(dev_id) _CONCAT(__device_, dev_id)
      |                                         ^~~~~~~~~
```

If you are using the VS Code and the nRF Connect extension, sometimes this can be fixed by making when you setup the build configuration you set the Configuration to "Use build system default" as shown in {{% ref "selecting-use-build-system-default-in-nrf-connect" %}}.

{{% figure ref="selecting-use-build-system-default-in-nrf-connect" src="_assets/selecting-use-build-system-default-in-nrf-connect.png" width="600px" caption="Selecting \"Use build system default\" can sometimes fix device tree errors." %}}

### "ERROR: Build directory xxx is for application yyy, but source directory zzz was specified"

The error:

```text
ERROR: Build directory xxx is for application yyy, but source directory zzz was specified;
  please clean it, use --pristine, or use --build-dir to set another build directory
```

typically occurs when you try to build a second project for the first time. By default, `west` creates build directories outside of the application you are currently building, in a directory called `build` directly under the west workspace directory (e.g. `zephyr-project/build/`).

When you tell `west` to build a different project (say, you tested out a sample like `samples/hello_world` but now want to build your own workspace application), `west` will try and re-use `build`. Except that it notices that the remnants from the last build do not belong to the same project, and gives you this error. Because build artifacts can be reproduced by rebuilding, it is generally save to provide the `--pristine` option and override the contents (this would be equivalent to you deleting the `build` directory and re-running `west`). If you want to have multiple builds on-the-go at the same time (perhaps because builds can take a long time to rebuild from scratch!), you can specify a different build directory with the `--build-dir` option.

### "By not providing "FindZephyr.cmake" in CMAKE_MODULE_PATH ..."

If you get the following warning (which then results in an error further down in the build process):

```text
(.venv) geoff@geoffs-laptop:~/zephyr-project$ west build -b native_sim ./apps/hello-world/
-- west build: generating a build system
CMake Warning at CMakeLists.txt:3 (find_package):
  By not providing "FindZephyr.cmake" in CMAKE_MODULE_PATH this project has
  asked CMake to find a package configuration file provided by "Zephyr", but
  CMake did not find one.

  Could not find a package configuration file provided by "Zephyr" with any
  of the following names:

    ZephyrConfig.cmake
    zephyr-config.cmake

  Add the installation prefix of "Zephyr" to CMAKE_PREFIX_PATH or set
  "Zephyr_DIR" to a directory containing one of the above files.  If "Zephyr"
  provides a separate development package or SDK, be sure it has been
  installed.
```

{{% figure ref="fig-by-not-providing-find-zephyr-cmake" src="_assets/by-not-providing-find-zephyr-cmake.png" width="700px" caption="Screenshot of the error \"By not providing \"FindZephyr.cmake\" in CMAKE_MODULE_PATH ...\"." %}}

It usually can be due to forgetting to export Zephyr to the CMake user package registry. Run the following command from the west workspace directory:

```bash
west zephyr-export
```

### ModuleNotFoundError: No module named 'elftools'

The error:

```text
Traceback (most recent call last):
  File "/home/geoff/zephyr-project/zephyr/scripts/build/gen_kobject_list.py", line 62, in <module>
    import elftools
ModuleNotFoundError: No module named 'elftools'
```

{{% figure ref="fig-error-no-module-named-elftools" src="_assets/error-no-module-named-elftools.png" width="700px" caption="Screenshot of the error \"No module named 'elftools'\"." %}}

can occur if you have forgotten to install the additional Zephyr dependencies into your Python environment (which can happen if you delete the existing virtual environment and recreate it). This can be fixed by running the following command, assuming you have activated the Python virtual environment if relevant:

```shell
pip install -r ./zephyr/scripts/requirements.txt
```

## References

[^github-zephyr-nvs-code-example]: Zephyr. _zephyrproject-rtos/zephyr zephyr/samples/subsys/nvs/src/main.c_ [code example]. GitHub. Retrieved 2024-01-10, from https://github.com/zephyrproject-rtos/zephyr/blob/main/samples/subsys/nvs/src/main.c.
[^zephyr-docs-workqueue]: Zephyr. _Docs / Latest -> Kernel -> Kernel Services -> Workqueue Threads_ [documentation]. Zephyr Docs. Retrieved 2024-01-10, from https://docs.zephyrproject.org/latest/kernel/services/threads/workqueue.html.
[^kernel-org-kconfig-language]: Kernel.org. _Kconfig Language_ [documentation]. Retrieved 2024-10-12, from https://www.kernel.org/doc/html/next/kbuild/kconfig-language.html.
[^zephyr-docs-kconfig-search-wdt-channels]. Zephyr (2024, Jan 16). _Kconfig Search - CONFIG_TASK_WDT_CHANNELS_ [documentation]. Zephyr Docs. Retrieved 2024-01-17, from https://docs.zephyrproject.org/latest/kconfig.html#CONFIG_TASK_WDT_CHANNELS.

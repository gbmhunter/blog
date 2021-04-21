---
author: "gbmhunter"
categories: [ "Programming", "Integrated Development Environments (IDEs)" ]
date: 2021-03-08
description: "A basic tutorial and in-depth notes on PlatformIO, a build manager/IDE for embedded systems."
draft: false
lastmod: 2021-03-10
tags: [ "programming", "integrated development environments", "IDEs", "PlatformIO", "PlatformIO Core", "PlatformIO IDE", "Core", "LDF", "Library Dependency Finder" ]
title: "PlatformIO"
type: "page"
---

{{% warning-is-notes %}}

## Overview

PlatformIO is a cross-platform CLI tool and IDE extension (primarily for Visual Studio Code) that allows you to build and upload firmware to embedded devices. Unlike other tools such as Arduino, mbed or Zephyr, it is purely a build tool and does not provide it's own API (framework) that you can call when writing firmware. Instead, it supports a number of frameworks including Arduino, mbed and Zephyr. It is designed to automatically pull down, install and run the toolchains/compilers required to compile your firmware for the target architecture so that you don't have to manage these yourself.

{{% img src="platformio-logo.png" width="150px" caption="The logo for PlatformIO. Retrieved from https://platformio.org on 2021-03-10." %}}

_PlatformIO Core_ is the command-line tool that contains most of PlatformIO's core logic (the IDE makes calls to this). _PlatformIO IDE_ is an extension to Visual Studio Code which provides GUI access to the functions provided by _PlatformIO Core_, as well as the usual text editing and syntax highlighting.

## Terminology

* `board`: A physical PCB containing a microcontroller that code can be built for and programmed.
* `platform`: Examples of platforms include `atmelavr`, `atmelsam`, and `ststm32`. A `platform` uses `packages`. Default install directory for platforms is `core_dir/platforms`.
* `package`: A _package_ is a tool of framework that can be used when compiling one or more `platform`s. Default install directory for packages is `core_dir/packages`.
* `framework`: A firmware "framework" providing an API to call from your application to interface with hardware peripherals and device drivers. Available options include `arduino`, `zephyr`.

## PlatformIO Core

### Installation

Via `pip`:

```cmd
> pip install -U platformio
```

### Library Dependency Finder (LDF)

For more info on the LDF, see <https://docs.platformio.org/en/latest/librarymanager/ldf.html>.

Local libraries can be stored in the `lib/` directory.

## How To Create A PlatformIO Project

Create a new project in the current directory:

```cmd
pio project init --board uno
```

Build the project:

```cmd
pio run
```

## The PlatformIO Config File

Data not specific to any one environment goes under the `[platformio]` section in the `platformio.ini` file.

Want to use a private package for a particular project? The good news is that PlatformIO supports SSH-style Git URLs and will use your default SSH key to attempt to `git clone` the package. You can specify a URL to a private package repo in `platformio.ini` with the following line: 

```ini
platform_packages = framework-arduino-samd-privatepackage @ git@github.org:my-company-name/my-private-repo.git
```

A specific branch or tag can be specified by appending a `#` and then the name of the branch/tag (note that `#` denotes the start of a comment in an `INI` file, but this tag name is processed by the parser...it feels a little strange to be doing this):

```ini
platform_packages = framework-arduino-samd-privatepackage @ git@github.org:my-company-name/my-private-repo.git#my-tag-or-branch-name
```

## Enabling Floating-Point printf() Support When Using The mbed Platform

If you are trying to print a floating point number using `printf()` (or other functions in the same family such as `snprintf()`) like so:

```c
printf("%f\n", 2.3);
```

but are just getting the string `%f`, it could be because floating-point `printf()` support is disabled. To enable it, create a file (if it doesn't already exist) called `mbed_app.json` in the root directory of your PlatformIO project, and add the following lines:

```json
{
    "target_overrides": {
      "*": {
        "platform.minimal-printf-enable-floating-point": true
      }
    }
}
```
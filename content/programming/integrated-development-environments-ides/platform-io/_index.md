---
author: "gbmhunter"
categories: [ "Programming", "Integrated Development Environments (IDEs)" ]
date: 2021-03-08
description: "A basic tutorial and in-depth notes on PlatformIO, a build manager/IDE for embedded systems."
draft: false
lastmod: 2021-03-08
tags: [ "programming", "integrated development environments", "IDEs", "PlatformIO", "PlatformIO Core", "PlatformIO IDE", "Core", "LDF", "Library Dependency Finder" ]
title: "PlatformIO"
type: "page"
---

{{% warning-is-notes %}}

## Overview

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

```cmd
pio project init --board uno
```

## The PlatformIO Config File

Want to use a private package for a particular project? The good news is that PlatformIO supports SSH-style Git URLs and will use your default SSH key to attempt to `git clone` the package. You can specify a URL to a private package repo in `platformio.ini` with the following line: 

```ini
platform_packages = framework-arduino-samd-privatepackage @ git@github.org:my-company-name/my-private-repo.git
```

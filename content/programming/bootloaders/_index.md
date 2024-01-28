---
authors: [ Geoffrey Hunter ]
date: 2015-01-09
draft: false
lastmod: 2024-01-26
tags: [ bootloaders, MCUboot Zephyr, firmware, microcontroller, memory, updates ]
title: Bootloaders
type: page
---

{{% warning-is-notes %}}

## Overview

A _bootloader_ is a separate program in a computers memory that is run when you want to update the main application that resides at different memory address(es). They are commonly added to microcontrollers to update the main firmware application. Bootloaders will use a communication protocol/transport to "download" new firmware from a host computer (e.g. laptop via cable, or server on the internet). Common transports include UART, RS-232, I2C, CAN, Ethernet, WiFi or Bluetooth. 

The bootloader will typically verify the downloaded image using a checksum or hash before allowing the new version of firmware to run. The bootloader can either then force a reset and boot into the new application, or allow it to happen at a more convenient time in the future. The bootloader can also enforce that the application "checks in" and states it's ok (typically once initialization is complete) otherwise it will fall back to the previous version.

Bootloaders are typically the first thing that is run whenever the microcontroller is reset. This gives the bootloader control over what application to then boot.

## Memory Layout

{{% ref "basic-bootloader-memory-map" %}} shows what the memory layout might look like for a microcontroller using a basic bootloader. The _Reset Vector_ is the first instruction executed by the microcontroller on start-up. This is typically located at memory address `0x0000 0000` (the Intel 8086 processor is a notable exception). The reset vector usually contains a "goto" (jump) instruction will tells the CPU to jump to the bootloaders entry point. The bootloader will then execute. The bootloader could then initialise a transport to download new firmware, e.g. over UART. It then might wait for a message for a fixed amount of time. After 10s the chance to download firmware passes, and then the bootloader jumps to the start of the application executable.

{{% figure ref="basic-bootloader-memory-map" src="_assets/basic-bootloader-memory-map.webp" width="700px" caption="A basic example showing the layout of a microcontrollers memory when a bootloader is used." %}}

## Multiple Application Images

Relocation can be problematic for memory. When your firmware application undergoes the linking step during compilation, then linker assigns memory addresses for all the functions and static variables in your code. It needs to know where the executable is being placed in memory to do this. But what if you have two different images, which require different offsets?

One solution is a swap algorithm.

## Security



## Golden Image

A golden image is a firmware application with minimal support for firmware updating. If updating over-the-air (OTA), than this image must include basic wireless comms support. It is usually stored either in external flash or in a protected area of the microcontrollers internal memory. It is loaded by the bootloader if the main application is faulty, and in that sense, it is a backup application which is guaranteed to work.

## Bootloader Libraries

### MCUboot

MCUboot is a popular, open-source, secure bootloader for 32-bit microcontrollers. As of Jan 2024 it has 1.1k star on GitHub, 2,201 commits and active development month over month. It is designed to be run from flash memory[^mcuboot-doc].

It currently supports the following frameworks/OSes:

* [Zephyr](/programming/operating-systems/zephyr-project/)
* [Apache Mynewt](https://mynewt.apache.org/)
* [Apache NuttX](https://nuttx.apache.org/)
* RIOT
* Mbed OS
* Espressif
* Cypress/Infineon
* Simulator (primarily for testing the upgrade code and badly timed resets - written in Rust[^mcuboot-sim-readme])

The MCUboot implementation for Zephyr supports Bluetooth bootloading. The Nordic nRF app can be used to bootload during development.

## References

[^mcuboot-doc]: MCUboot. _MCUboot - Secure boot for 32-bit Microcontrollers!_ [project homepage]. Retrieved 2024-01-27, from https://docs.mcuboot.com/.
[^mcuboot-sim-readme]: MCUboot. _MCUboot simulator - README_. Retrieved 2024-01-27, from https://github.com/mcu-tools/mcuboot/blob/main/sim/README.rst.
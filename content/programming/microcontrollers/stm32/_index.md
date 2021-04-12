---
author: "gbmhunter"
date: 2020-06-19
description: "Info about the STM32 range of microcontrollers."
categories: [ "Programming", "Microcontrollers", "STM32" ]
lastmod: 2021-02-22
tags: [ "programming", "microcontrollers", "STM32", "STM32F0", "Cortex-M0", "ARM", "STM32CubeIDE", "Nucleo", "STM32WLEx", "LoRa", "LoRaWAN", "ST-LINK/V2", "virtual COM ports", "VCPs", "LoRaWAN" ]
title: "STM32 Microcontrollers"
type: "page"
---

{{% warning-is-notes %}}

## Overview

`STM32` is a family of 32-bit, ARM Cortex-M microcontrollers manufactured by ST Mircoelectronics. 

All `STM32` micros are supported by ST's own {{% link text="STM32CubeIDE" src="/programming/integrated-development-environments-ides/stm32cubeide" %}}.

## Development Kits

A very popular range of development kits using the STM32 microcontrollers is the STM32 _NUCLEO_. These boards feature a STM32 microcontroller, integrated programmer with UART, and both Arduino and Morpho-style header pins (Morpho is ST's proprietary header arrangement which provides greater connectivity than the industry-standard Arduino arrangement).

A Windows machine is required to update the firmware on the Nucleo programmer/debugger IC (the IC which emulates an ST-Link).

## Programmers

To get an in-depth overview of all the ST programmers by ST themselves, see <https://www.st.com/resource/en/technical_note/dm00290229-overview-of-stlink-derivatives-stmicroelectronics.pdf>.

### ST-LINK/V1

_ST-LINK/V1_ is deprecated.

### ST-LINK/V2

The _ST-LINK/V2_ is an in-circuit programmer and debugger for the STM8 and STM32 families of microcontrollers. It supports the SWIM (Single Wire Interface Module, for STM8 only)[^st-swim], SWD (Single Wire Debug) and JTAG programming protocols. 

### ST-LINK/V2-ISOL

The _ST-LINK/V2-ISOL_ is similar in functionality to the ST-LINK/V2 but with additional isolation between the PC and target board.

### ST-LINK/V3

Designed to supersede the ST-LINK/V2 family of programmers. Comes in three flavours:

* STLINK-V3SET
* STLINK-V3MINI
* **STLINK-V3MODS**: A programmer on a castellated-edged PCB module, designed to be soldered onto a PCB containing the microcontroller to be programmed.

All have 1 or more virtual comm ports (VCPs) and mass-storage device emulation for drag-and-drop flash programming.

{{% img src="stlink-v3set-st-microelectronics-programmer-photo.png" width="500px" caption="A photo of the STLINK-V3SET programmer. Image from https://www.digikey.co.nz/product-detail/en/stmicroelectronics/STLINK-V3SET/497-18216-ND." %}}

### NUCLEO Development Kits

Given the costlier nature of the ST-LINK compared to the NUCLEO development kits, it makes economic sense just to by the NUCLEO development kits and use them as standalone programmers (the kits provide header pins which breakout the programming pins, so you can route it to an off-board micro). You also get the added benefit of having a extremely useful built-in UART (which emulates a COM port when the on-board programmer is plugged into a computer via USB cable), which for example, can be used as a debug UART. The standard programmers don't have this!

## STM32F0

The `STM32F0` is a family of "general purpose" STM32 microcontrollers. The family uses a 48MHz ARM Cortex-M0 CPU architecture.

Low-power modes:

* Sleep mode: Only the CPU is stopped. All peripherals continue to operate and can wake-up the CPU.
* Stop mode: A mode designed to put everything into a low-power state but retain the content of SRAM and the registers.
* Standby mode: The lowest-power mode. Everything is stopped and SRAM/register content is lost, except for the registers in the RTC domain and standby circuitry

GPIO capabilities:

GPIO can be configured as one of the following outputs:

* Push-pull
* Open-drain

Or as the following inputs:

* High-impedance
* Pull-up
* Pull-down

Reference schematic for the STM32F030 (just power, clock and programming):

{{% img src="stm32f030-reference-schematic.png" width="800px" caption="The reference schematic for the STM32F030 microcontroller. Image from https://www.st.com/resource/en/application_note/dm00089834-getting-started-with-stm32f030xx-and-stm32f070xx-series-hardware-development-stmicroelectronics.pdf." %}}

## STM32F1

The `STM32F1` is a family of "general purpose" STM32 microcontrollers. The family uses a ARM Cortex-M3 CPU architecture.

## STM32G

The `STM32G` is a family of "general purpose" STM32 microcontrollers. The family uses a 64MHz ARM Cortex-M0+ CPU architecture (the M0+ instructions are an optimized superset of the M0, the M0+ also has a two-stage pipeline, while the M0 has a three-stage pipeline).

* STM32G0x0: Value line.
* STM32G0x1: 

## STM32WLEx

The `STM32WLEx` is a family of "SoC" microcontrollers featuring a `STM32L4` coupled with a wireless radio IC that supports LoRaWAN (both of these are in the same physical IC).

## References

[^st-swim]: <https://www.st.com/resource/en/user_manual/cd00173911-stm8-swim-communication-protocol-and-debug-module-stmicroelectronics.pdf>
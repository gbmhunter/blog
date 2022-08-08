---
authors: [ "Geoffrey Hunter" ]
date: 2020-06-19
description: "Info about the STM32 range of microcontrollers."
categories: [ "Programming", "Microcontrollers", "STM32" ]
lastmod: 2022-01-12
tags: [ "programming", "microcontrollers", "STM32", "STM32F0", "Cortex-M0", "ARM", "STM32CubeIDE", "Nucleo", "STM32WLEx", "LoRa", "LoRaWAN", "ST-LINK/V2", "virtual COM ports", "VCPs", "LoRaWAN" ]
title: "STM32 Microcontrollers"
type: "page"
---

{{% warning-is-notes %}}

## Overview

`STM32` is a family of 32-bit, ARM Cortex-M microcontrollers manufactured by ST Microelectronics. 

All `STM32` micros are supported by ST's own [STM32CubeIDE](/programming/integrated-development-environments-ides/stm32cubeide).

## Development Kits

A very popular range of development kits using the STM32 microcontrollers is the STM32 _NUCLEO_. These boards feature a STM32 microcontroller, integrated programmer with UART, and both Arduino and Morpho-style header pins (Morpho is ST's proprietary header arrangement which provides greater connectivity than the industry-standard Arduino arrangement).

A Windows machine is required to update the firmware on the Nucleo programmer/debugger IC (the IC which emulates an ST-Link).

## Programmers

To get an in-depth overview of all the ST programmers by ST themselves, see https://www.st.com/resource/en/technical_note/dm00290229-overview-of-stlink-derivatives-stmicroelectronics.pdf.

### ST-LINK/V1

_ST-LINK/V1_ is deprecated.

### ST-LINK/V2

The _ST-LINK/V2_ is an in-circuit programmer and debugger for the STM8 and STM32 families of microcontrollers. It supports the SWIM (Single Wire Interface Module, for STM8 only)[^bib-st-swim], SWD (Single Wire Debug) and JTAG programming protocols. 

### ST-LINK/V2-ISOL

The _ST-LINK/V2-ISOL_ is similar in functionality to the ST-LINK/V2 but with additional isolation between the PC and target board.

### ST-LINK/V3

Designed to supersede the ST-LINK/V2 family of programmers. Comes in three flavours:

* STLINK-V3SET
* STLINK-V3MINI
* **STLINK-V3MODS**: A programmer on a castellated-edged PCB module, designed to be soldered onto a PCB containing the microcontroller to be programmed.

All have 1 or more virtual comm ports (VCPs) and mass-storage device emulation for drag-and-drop flash programming.

{{% figure src="stlink-v3set-st-microelectronics-programmer-photo.png" width="500" caption="A photo of the STLINK-V3SET programmer. Image from https://www.digikey.co.nz/product-detail/en/stmicroelectronics/STLINK-V3SET/497-18216-ND." %}}

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

{{% figure src="stm32f030-reference-schematic.png" width="800" caption="The reference schematic for the STM32F030 microcontroller. Image from https://www.st.com/resource/en/application_note/dm00089834-getting-started-with-stm32f030xx-and-stm32f070xx-series-hardware-development-stmicroelectronics.pdf." %}}

## STM32F1

The `STM32F1` is a family of "general purpose" STM32 microcontrollers. The family uses a ARM Cortex-M3 CPU architecture.

Some things to note:

- All GPIO pins with the same integer last digit across each port (e.g. `PA1`, `PB1`, `PC1`, ...) are connected to the same interrupt, and only one pin may be connected to the interrupt at any one time. Be careful when routing signals to your GPIO pins!
- Peripherals are divided into two APB buses. All peripherals connected to `APB1` run at half the main clock frequency, and peripherals connected to `APB2` run at the main clock frequency.

To develop with STM32F1 microcontrollers you will need two PDFs, the specific "datasheet" for the exact microcontroller you are using, and the more general and much bigger [reference manual](https://www.st.com/resource/en/reference_manual/cd00171190-stm32f101xx-stm32f102xx-stm32f103xx-stm32f105xx-and-stm32f107xx-advanced-arm-based-32-bit-mcus-stmicroelectronics.pdf).

## STM32G

The `STM32G` is a family of "general purpose" STM32 microcontrollers. The family either uses a 64MHz ARM Cortex-M0+ CPU architecture (the M0+ instructions are an optimized superset of the M0, the M0+ also has a two-stage pipeline, while the M0 has a three-stage pipeline) for the `G0` or the Cortex-M4F for the `G4`[^bib-wp-stm32].

### STM32G0

* STM32G0x0: _Value line_. Cheapest STM32G0 microcontrollers, with an entry-level set of analogue peripherals.
* STM32G0x1: More analogue features than the STM32G0x0.

### STM32G4

Family of mixed-signal microcontrollers, which include both DSP and FPU instructions. This family uses the ARM Cortex-M4F CPU architecture. This is further sub-divided into the following sub-families:

* STM32G4x1: _Access line:_ General-purpose microcontrollers with entry-level set of analogue peripherals.
* STM32G4x3: _Performance line:_ General-purpose microcontrollers with the maximum number of analogue peripherals.
* STM32G4x4: _Hi-resolution line:_ Features a high-resolution timer and complex waveform builder plus event handler for digital power conversion.

## STM32WLEx

The `STM32WLEx` is a family of "SoC" microcontrollers featuring a `STM32L4` coupled with a wireless radio IC that supports LoRaWAN (both of these are in the same physical IC).

## References

[^bib-st-swim]:  ST Microelectronics (2016, Aug). _UM0470 User manual: STM8 SWIM communication protocol and debug module_. Retrieved 2020-09-03, from https://www.st.com/resource/en/user_manual/cd00173911-stm8-swim-communication-protocol-and-debug-module-stmicroelectronics.pdf.
[^bib-wp-stm32]:  Wikipedia (last edited 2021, Aug 31). _STM32_. Retrieved 2022-01-12, from https://en.wikipedia.org/wiki/STM32.

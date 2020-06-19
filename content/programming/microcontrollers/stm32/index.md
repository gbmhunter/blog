---
author: "gbmhunter"
date: 2020-06-19
description: "Info about the STM32 range of microcontrollers."
categories: [ "Programming", "Microcontrollers", "STM32" ]
lastmod: 2020-06-19
tags: [ "programming", "microcontrollers", "STM32", "STM32F0", "Cortex-M0", "ARM", "STM32CubeIDE" ]
title: "STM32 Microcontrollers"
type: "page"
---

{{% warning-is-notes %}}

## Overview

All `STM32` micros are supported by ST's own {{% link text="STM32CubeIDE" src="/programming/integrated-development-environments-ides/stm32cubeide" %}}.

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
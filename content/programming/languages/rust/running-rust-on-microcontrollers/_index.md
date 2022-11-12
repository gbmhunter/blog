---
authors: [ Geoffrey Hunter ]
categories: [ Programming, Programming Languages ]
date: 2022-11-12
description: An exploration into programming with Rust on microcontrollers.
draft: false
lastmod: 2022-11-12
tags: [ Rust, programming, languages, code, software, firmware, embedded, microcontrollers, RTOS, RTIC, STM32, ESP32, ARM ]
title: Running Rust on Microcontrollers
type: page
---

{{% warning-is-notes %}}

## Overview

Rust is a fairly new programming language, but is showing great potential for developing embedded firmware. It is first and foremost designed to be a systems programming language, which makes it particularly suitable for microcontrollers. And it's aim to improve on some of C/C++'s biggest shortcomings by implementing a robust ownership model (which removes entire classes of errors from occurring) is also very much applicable to firmware.

As of 2022, the C and C++ programming languages still remain the de-facto standard for embedded firmware. However, Rust's role in firmware is looking bright. Rather than firmware being an afterthought, it feels as if Rust has first-tier embedded support. There is an official [Rust Embedded Devices Working Group](https://github.com/rust-embedded/wg) and [The Embedded Rust Book](https://docs.rust-embedded.org/book/). 

{{% figure src="ewg-logo-blue-white-on-transparent.png" width="200px" caption="The logo of Rust's Embedded Devices Working Group[^bib-rust-embedded-working-group-repo]." %}}

This page aims to be an exploration into running Rust on microcontrollers, covering things such as:

1. Language Features
1. Vendor Support
1. RTOSes

Lets jump straight in!

## Language Features

Only allowed to:
* Borrow as many immutable references and no mutable references, OR
* Borrow one mutable reference and no immutable references.

## Vendor Support

### ST Microelectronics STM32

Congratulations, if you happen to be using the STM32 family of microcontrollers you get to enjoy rich Rust support for the microcontrollers.

### Atmel SAM

### TI MSP430

### Espressif ESP

I'm not sure how I feel about their approach of forking the entire Rust repository and tweaking it to suit their needs.


## RTOSes

No language can claim to be suitable for embedded programming without a selection of RTOSes to choose from. Luckily, Rust has some, from Rust wrappers of existing C/C++ RTOSes such FreeRTOS to RTOSes built from scratch to run on Rust. Lets review some of the popular options.

### FreeRTOS Wrappers

### RTIC

Interesting approach to an RTOS.

### Embassy

Supports co-operative multitasking (it is not pre-emptive).

## References

[^bib-rust-embedded-working-group-repo]: Rust Embedded. _Embedded Devices Working Group (repository)_. GitHub. Retrieved 2022-11-12, from https://github.com/rust-embedded/wg.

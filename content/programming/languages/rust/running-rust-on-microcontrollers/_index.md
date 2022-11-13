---
authors: [ Geoffrey Hunter ]
categories: [ Programming, Programming Languages ]
date: 2022-11-12
description: An exploration into programming with Rust on microcontrollers.
draft: false
lastmod: 2022-11-13
tags: [ Rust, programming, languages, code, software, firmware, embedded, microcontrollers, RTOS, RTIC, STM32, ESP32, ARM, cargo, cargo flash ]
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
1. IDEs
1. Programming
1. RTOSes

Lets jump straight in!

## Language Features

You are only allowed to:

* Borrow as many immutable references and no mutable references, OR
* Borrow one mutable reference and no immutable references.

One sorely lacking feature with C/C++ is a standardized package manager for managing your dependencies and build process. Luckily (like most common languages) Rust comes with the `cargo` package manager. `cargo` translates well to embedded development, you can use it to easily include 3rd party libraries (what they call _crates_) -- or create your own libraries to make your code more modular and re-usable.

One thing I really liked about `cargo` is that it allows extensions to be installed, which can add features to the `cargo` command. There is a [cargo-flash crate](https://github.com/probe-rs/cargo-flash) which adds microcontroller flashing support to `cargo`. You can install `cargo-flash` with:

```bash
$ cargo install cargo-flash
```

This adds the sub-command `cargo flash` to `cargo`. Then you can type the following to program a microcontroller with your Rust executable:

```bash
$ cargo flash --chip STM32F042C4Tx
```

## Manufacturer Support

When considering Rust for an embedded project, you'll be wondering "Is the xxx microcontroller supported in Rust". As there are so many manufacturers and MCU families out there, it all depends on exactly what you are using. We'll cover the level of Rust support of some of the popular MCU families below.

The ARM Cortex CPU architecture is well supported by Rust, so many of the MCU families that use the Cortex naturally have good support too.

* ARM Cortex-M0+ -- ARMv6-M -- thumbv6m-none-eabi

### ST Microelectronics STM32

The STM32 family of microcontrollers has some of the richest Rust support out of any microcontroller.

### Atmel SAM

### TI MSP430

### Espressif ESP

I'm not sure how I feel about their approach of forking the entire Rust repository ([esp-rs/rust](https://github.com/esp-rs/rust)) and adding in support for Xtensa that way. Hopefully it will get upstreamed sometime in the future?

## IDEs

VSCode has very good support for Rust.
## Programming and Debugging

One must have for embedded development is a smooth write code -> build -> program -> debug workflow. What 

## RTOSes

No language can claim to be suitable for embedded programming without a selection of RTOSes to choose from. Luckily, Rust has some, from Rust wrappers of existing C/C++ RTOSes such FreeRTOS to RTOSes built from scratch to run on Rust. Lets review some of the popular options.

### FreeRTOS Wrappers

### RTIC

Interesting approach to an RTOS.

### Embassy

Supports co-operative multitasking (it is not pre-emptive).

## Further Reading

Be sure to check out the [Matrix "Rust Embedded" chat room](https://app.element.io/#/room/#rust-embedded:matrix.org).

## References

[^bib-rust-embedded-working-group-repo]: Rust Embedded. _Embedded Devices Working Group (repository)_. GitHub. Retrieved 2022-11-12, from https://github.com/rust-embedded/wg.

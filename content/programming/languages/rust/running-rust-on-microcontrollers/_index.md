---
authors: [ Geoffrey Hunter ]
categories: [ Programming, Programming Languages ]
date: 2022-11-12
description: An exploration into programming with Rust on microcontrollers.
draft: false
lastmod: 2022-11-15
tags: [ Rust, programming, languages, code, software, firmware, embedded, microcontrollers, RTOS, RTIC, STM32, ESP32, Xtensa, ARM, cargo, cargo flash, svd2rust, Nordic, nRF, rustup, cross-compiling, peripheral access crates, PACs, hardware abstraction layers, HALs, board support packages, BSPs ]
title: Running Rust on Microcontrollers
type: page
---

{{% warning-is-notes %}}

## Overview

Rust is a fairly new programming language (born in 2010), but is showing great potential for developing embedded firmware. It is first and foremost designed to be a systems programming language, which makes it particularly suitable for microcontrollers. And it's aim to improve on some of C/C++'s biggest shortcomings by implementing a robust ownership model (which removes entire classes of errors from occurring) is also very much applicable to firmware.

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

### Peripheral Access

A big part of writing firmware is interacting with peripherals (GPIO, UART, USB, DMA, e.t.c.). Most peripherals are memory mapped -- i.e. you read/write to "magic" memory addresses to control the peripheral. What does peripheral access look like in Rust?

The singleton pattern in Rust can be implemented with the `Option<T>` enumeration, e.g. `Option<SerialPort>`. The peripheral can then be requested by "taking" the `SerialPort` from the option (replacing it with `None`). Thus further requests to take the `SerialPort` will result in an error. All of this can be wrapped into a static `PERIPHERALS` instance. `unsafe` has to be used once to take the peripheral, but from then on it's safe.

```rust
struct SerialPort {}

// Define our peripheral structure to contain all our various peripherals
struct Peripherals {
    serial_port: Option<SerialPort>,
}

impl Peripherals {
    fn take_serial_port(&mut self) -> SerialPort {
        return self.serial_port.take().unwrap();
    }
}

// Now lets create our single instance
static mut PERIPHERALS: Peripherals = Peripherals {
    serial_port: Some(SerialPort {}),
};

fn main() {
    // This works
    let serial_port_1 = unsafe { PERIPHERALS.take_serial_port() };

    // This will panic
    let serial_port_2 = unsafe { PERIPHERALS.take_serial_port() };
}
```

(runnable code at https://replit.com/@gbmhunter/rust-playground#examples/peripherals.rs)

Another thing Rust can do is provide compile-time checks that hardware has been configured properly based on how the code uses it. The Embedded Rust Book has this to say:

> When applied to embedded programs these static checks can be used, for example, to enforce that configuration of I/O interfaces is done properly. For instance, one can design an API where it is only possible to initialize a serial interface by first configuring the pins that will be used by the interface.
> 
> One can also statically check that operations, like setting a pin low, can only be performed on correctly configured peripherals. For example, trying to change the output state of a pin configured in floating input mode would raise a compile error. -- The Embedded Rust Book - Static Guarantees[^bib-the-embedded-rust-book]

Lets explain this with an example. We'll follow the Embedded Rust Book guide as use a GPIO pin (a very basic form of MCU peripheral) as an example, with `into_...()` named functions to convert between the different types.

```rust
let pin = get_gpio();

// We can't do much with a disabled GPIO pin, let's convert it
// into an input pin
let input_pin = pin.into_enabled_input_pin();

// We can now read the state of the pin
let pin_state = input_pin.is_set();

input_pin.set(); // We can't set an input, this produces a compile time error!

// We've changed our minds, we now want it to be an output! This
// is easy to do, again it "consumes" the input_pin object
let output_pin = input_pin.into_enabled_output_pin();

// Set output pin high
output_pin.set(true);
```

`svd2rust` is a command-line tool that ingests SVD files and creates Rust crates that expose the peripherals in a type-safe Rust API[^bib-svd2rust-docs]. It currently supports the Cortex-M, MSP430, RISCV and Xtensa LX6 microcontrollers[^bib-svd2rust-docs].

### cargo

One sorely lacking feature with C/C++ is a standardized package manager for managing your dependencies and build process. Luckily (like most common languages) Rust comes with the `cargo` package manager. `cargo` translates well to embedded development, you can use it to easily include 3rd party libraries (what they call _crates_) -- or create your own libraries to make your code more modular and re-usable.

One thing I really liked about `cargo` is that it allows extensions to be installed, which can add features to the `cargo` command. There is a [cargo-flash crate](https://github.com/probe-rs/cargo-flash) which adds microcontroller flashing support to `cargo`. You can install `cargo-flash` with:

```bash
$ cargo install cargo-flash
```

This adds the sub-command `cargo flash` to `cargo`. Then you can type the following to program a microcontroller with your Rust executable:

```bash
$ cargo flash --chip STM32F042C4Tx
```

## Architecture Support

When considering Rust for an embedded project, you'll be wondering "Is the microcontroller I used supported in Rust?". As there are so many manufacturers and MCU families out there (and a few different architectures), it all depends on exactly what you are using. We'll cover the level of Rust support of some of the popular architectures and MCU families below.

Support for a particular architecture is usually added by running `rustup` (by default `rustup` only installs the standard library for your host platform[^bib-the-rustup-book-cross-compilation]):

```bash
$ rustup target add <architecture>
```

This sets up the build environment for cross-compiling to your chosen architecture. For a complete list of supported platforms see [The rustc Book: Platform Support](https://doc.rust-lang.org/nightly/rustc/platform-support.html).

### Cortex-M (ARM)

The ARM Cortex-M CPU architecture is well supported by Rust, so many of the MCU families that use the Cortex-M naturally have good support too. The [rust-embedded/cortex-m](https://github.com/rust-embedded/cortex-m) repo provides the minimal start-up code and runtime (including semihosting) for the Cortex-M family.

<table>
<caption>

Table of the supported ARM Cortex-Mx compilation targets for Rust[^bib-the-rustc-book-platform-support] [^bib-arm-processors-cortex-m3] [^bib-arm-processors-cortex-m4].
</caption>
<thead>
<tr><th>ISA</th>                                                    <th>rustup Target</th></tr>
</thead>
<tbody>
<tr><td>ARMv6-M (Cortex-M0, M0+, M1)</td>                           <td><code>thumbv6m-none-eabi</code></td></tr>
<tr><td>Armv7-M (Cortex-M3)</td>                                    <td><code>thumbv7m-none-eabi</code></td></tr>
<tr><td>Armv7E-M (Cortex-M4, M7 -- no floating-point-support)</td>  <td><code>thumbv7em-none-eabi</code></td></tr>
<tr><td>Armv7E-M (Cortex-M4F, M7F -- floating-point-support)</td>   <td><code>thumbv7em-none-eabihf</code></td></tr>
</tbody>
</table>

### RISC-V

<table>
<caption>

Table of the supported RISC-V compilation targets for Rust[^bib-the-rustc-book-platform-support].
</caption>
<thead>
<tr><th>ISA</th>                    <th>rustup Target</th></tr>
</thead>
<tbody>
<tr><td>RV32I ISA</td>              <td><code>riscv32i-unknown-none-elf</code></td></tr>
<tr><td>RV32IMAC ISA</td>           <td><code>riscv32imac-unknown-none-elf</code></td></tr>
<tr><td>RV32IMC ISA</td>            <td><code>riscv32imc-unknown-none-elf</code></td></tr>
<tr><td>RV64IMAFDC ISA</td>         <td><code>riscv64gc-unknown-none-elf</code></td></tr>
<tr><td>RV64IMAC ISA</td>           <td><code>riscv64imac-unknown-none-elf</code></td></tr>
</tbody>
</table>

### Xtensa

The Xtensa architecture is only predominant in the ESP32 range of MCUs, so we'll cover that below.

## MCU Family Support

So we've covered the CPU architecture (which defines the instruction set), but what about support for all the peripherals that surround it and make up a MCU? Let's cover the amount of Rust support of some popular manufacturers and their MCU families. 
### STM32 (ST Microelectronics)

The STM32 family of microcontrollers has some of the richest Rust support out of any microcontroller.

### Atmel SAM

### MSP430 (Texas Instruments)

### ESP32 (Espressif Systems)

I'm not sure how I feel about their approach of forking the entire Rust repository ([esp-rs/rust](https://github.com/esp-rs/rust)) and adding in support for the Xtensa instruction set that way. Hopefully it will get upstreamed sometime in the future?

### Nordic nRF

The [nrf-rs/nrf-hal](https://github.com/nrf-rs/nrf-hal) repo provides a Rust HAL for the nRF51, nRF52 and nRF91 families of microcontrollers[^bib-nrf-rs-nrf-hal].

### SiFive

The rustup target `riscv32imac-unknown-none-elf` is available to cross-compile for the Freedom E310 (e.g. the HiFive1).

## IDEs

VSCode has very good support for Rust.
## Programming and Debugging

One must have for embedded development is a smooth write code -> build -> program -> debug workflow. What 

[Knurling](https://github.com/knurling-rs/) is a collection of projects by Ferrous Systems (two of their popular tools include `probe-run` and `defmt`).

semihosting (slow debug print statements via the attached debugger) is provided for Cortex-M MCUs via the `cortex-m` crate.
## RTOSes

No language can claim to be suitable for embedded programming without a selection of RTOSes to choose from. Luckily, Rust has some, from Rust wrappers of existing C/C++ RTOSes such FreeRTOS to RTOSes built from scratch to run on Rust. Lets review some of the popular options.

### FreeRTOS Wrappers

### RTIC

Interesting approach to an RTOS.

### Embassy

Supports co-operative multitasking (it is not pre-emptive).

### Tock

https://github.com/tock/tock

## Further Reading

Be sure to check out the [Matrix "Rust Embedded" chat room](https://app.element.io/#/room/#rust-embedded:matrix.org).

The GitHub repo [rust-embedded/awesome-embedded-rust](https://github.com/rust-embedded/awesome-embedded-rust) is a huge list of embedded Rust resources maintained by the Rust Resources team. It includes tools, RTOSes, peripheral access crates (PACs), hardware abstraction layers (HALs), board support crates (BSPs), blogs, books and other training materials.

## References

[^bib-rust-embedded-working-group-repo]: Rust Embedded. _Embedded Devices Working Group (repository)_. GitHub. Retrieved 2022-11-12, from https://github.com/rust-embedded/wg.
[^bib-the-embedded-rust-book]: Rust Embedded. _The Embedded Rust Book_. Retrieved 2022-11-14, from https://docs.rust-embedded.org/book/. 
[^bib-svd2rust-docs]: svd2rust. _Crate svd2rust (documentation)_. Retrieved 2022-11-14, from https://docs.rs/svd2rust/latest/svd2rust/.
[^bib-nrf-rs-nrf-hal]: nrf-rs. _nrf-hal (Git repository)_. Retrieved 2022-11-14, from https://github.com/nrf-rs/nrf-hal.
[^bib-the-rustup-book-cross-compilation]: rust-lang. _The rustup book: Cross-compilation_. Retrieved 2022-11-14, from https://rust-lang.github.io/rustup/cross-compilation.html.
[^bib-the-rustc-book-platform-support]: rust-lang. _The rustc book: Platform Support_. Retrieved 2022-11-15, from https://doc.rust-lang.org/nightly/rustc/platform-support.html.
[^bib-arm-processors-cortex-m3]: ARM Developer. _Processors: Cortex-M3_. Retrieved 2022-11-15, from https://developer.arm.com/Processors/Cortex-M3. 
[^bib-arm-processors-cortex-m4]: ARM Developer. _Processors: Cortex-M4_. Retrieved 2022-11-15, from https://developer.arm.com/Processors/Cortex-M4. 

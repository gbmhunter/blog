---
authors: [ Geoffrey Hunter ]
categories: [ Programming, Programming Languages ]
date: 2022-11-12
description: An exploration into programming with Rust on microcontrollers.
draft: false
lastmod: 2022-11-23
tags: [ Rust, programming, languages, code, software, firmware, embedded, microcontrollers, RTOS, RTIC, STM32, ESP32, Xtensa, ARM, cargo, cargo flash, svd2rust, Nordic, nRF, rustup, cross-compiling, peripheral access crates, PACs, hardware abstraction layers, HALs, board support packages, BSPs, Tock ]
title: Running Rust on Microcontrollers
type: page
---

{{% warning-is-notes %}}

## Overview

Rust is a fairly new programming language (born in 2010[^wikipedia-rust]), **but is showing great potential for developing embedded firmware**. It is first and foremost designed to be a systems programming language, which makes it particularly suitable for microcontrollers. It's aim to improve on some of C/C++'s biggest shortcomings by implementing a **robust ownership model** (which removes entire classes of errors from occurring) is also very much applicable to firmware.

As of 2022, the C and C++ programming languages still remain the de-facto standard for embedded firmware. However, Rust's role in firmware is looking bright. Rather than firmware being an afterthought, it feels as if Rust has first-tier embedded support. There is an official [Rust Embedded Devices Working Group](https://github.com/rust-embedded/wg) and [The Embedded Rust Book](https://docs.rust-embedded.org/book/). 

{{% figure src="ewg-logo-blue-white-on-transparent.png" width="200px" caption="The logo of Rust's Embedded Devices Working Group[^bib-rust-embedded-working-group-repo]." %}}

This page aims to be an exploration into running Rust on microcontrollers, covering things such as:

1. Language Features
1. Architecture Support
1. MCU Family Support
1. IDEs, Programming and the Debugging Experience
1. RTOSes

Lets jump straight in!

## Rust Language Features

Let's explore some of Rust's language features and how they are applicable to embedded firmware.
### Ownership

One of the core differences between Rust and C/C++ is that Rust implements a robust ownership model into the programming language. This prevents many memory-related bugs that can occur in C/C++ (think memory leaks, dangling pointers, e.t.c.). **These benefits that Rust provides are just as applicable to embedded firmware as they are to software.**

For anything but basic primitive data types that live on the stack (primitive data types include `u32`, `bool`, `f64`, e.t.c), Rust will move data when the assignment operator is used, rather than perform a copy. The following example shows how the compiler enforces that only one variable may own a piece of data at once.

```rust
let s1 = String::from("hello"); // Create complex data type which involves the use of the heap
let s2 = s1; // This "moves" the data from s1 to s2 (s2 owns the data), s1 is no longer valid

println!("{}", s1); // The compiler will throw an error here, s1 is no longer valid!
```

If you did actually want to perform a copy, `s2 = s1.clone()` is the correct way to do it. These ownership rules also apply to passing variables into functions. A comprehensive walk-through can be found in [The Rust Programming Language - Ch. 04 - Understanding Ownership](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html).

Rather than transfer ownership, Rust also lets you "borrow" data via references. You are only allowed to:

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

A pattern similar to this is followed by most PACs and HALs provided for microcontrollers. You'll be calling `take()` on peripheral objects to claim ownership of them, giving you the ability to use them in your application.

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

`svd2rust` is a command-line tool that ingests SVD files (a.k.a. `CMSIS-SVD` -- they are files that define register names, addresses and uses, you can think of them as a computer-readable version of the microcontrollers datasheet) and creates Rust PAC crates that expose the peripherals in a type-safe Rust API[^bib-svd2rust-docs]. It currently supports the Cortex-M, MSP430, RISCV and Xtensa LX6 microcontrollers[^bib-svd2rust-docs]. 

### Traits

Rust supports ad-hoc polymorphism via its concept of _traits_. As a really basic example, both float and integer types implement the `Add` trait because they can be added. The embedded-hal project leverages traits by defining traits for things such as GPIO pins (input and output), UART, I2C, SPI, ADC, e.t.c. These generic interfaces can be used by the application code, and underneath the vendor specific drivers implement the correct functionality for each particular microcontroller. This is very similar to how virtual interface classes in C++ are used to create a portable HAL.

{{% figure src="embedded-hal-firmware-layers.png" width="500px" caption="The different layers of a Rust firmware project using the embedded-hal project. Image from the Embedded Rust Book - Portability[^bib-embedded-rust-book-portability]." %}}

### Concurrency

Concurrency is something you have to concern yourself about in embedded firmware when it comes to interrupts and multiple threads/cores (e.g. running a RTOS). One of the first times you'll encounter concurrency concerns is when updating variables from within an interrupt. In C/C++, the use of `volatile` and critical sections is generally the way the problem is solved. When using multiple threads, RTOS primitives such as mutexes/queues/e.t.c are used to prevent data corruption.

In Rust, you can also use critical sections to prevent data races in interrupts.

The `nb` crate (it's docs are [here](https://docs.rs/nb/latest/nb/index.html)) takes an interesting approach to solving the problem of deciding whether or not an API call should block or not (or how to block!). It allows people writing APIs to write the core functionality, and then let the caller decide on the blocking behaviour. The API has return a type of `nb::Result<T, Error>` where `T` is the standard return type for the function. If the caller does want to block waiting for the function to complete, they can wrap the call in the `block!` macro. This `nb` crate has some potential to be used with HAL peripherals such as UART `read/write()` functions (which typically block until data is sent/received).

### cargo and Package Structure

One sorely lacking feature with C/C++ is a standardized package manager for managing your dependencies and build process. Luckily (like most common languages) Rust comes with the `cargo` package manager. `cargo` translates well to embedded development, you can use it to easily include 3rd party libraries (what they call _crates_) -- or create your own libraries to make your code more modular and re-usable.

One thing I really liked about `cargo` is that it allows extensions to be installed, which can add features to the `cargo` command. There is a [cargo-flash crate](https://github.com/probe-rs/cargo-flash) which adds microcontroller flashing support to `cargo`. You can install `cargo-flash` with:

```bash
$ cargo install cargo-flash
```

This adds the sub-command `cargo flash` to `cargo`. Then you can type the following to program a microcontroller with your Rust executable:

```bash
$ cargo flash --chip STM32F042C4Tx
```

Another nice thing about cargo and embedded is that the community seems to have settled onto a structured way of organizing various firmware-related libraries.

TODO: Add image.

## Rust Architecture Support

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

You can quickly start a new project for a Cortex-M CPU with the command:

```bash
cargo generate --git https://github.com/rust-embedded/cortex-m-quickstart
```


{{% figure src="cargo-cortex-m-quickstart-project-files.png" width="800px" caption="The resulting Cortex-M quickstart project creating by running the above cargo command." %}}

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

## Rust MCU Family Support

So we've covered the CPU architecture (which defines the instruction set), but what about support for all the peripherals that surround it and make up a MCU? Let's cover the amount of Rust support of some popular manufacturers and their MCU families. 
### STM32 (ST Microelectronics)

The STM32 family of microcontrollers has some of the richest Rust support out of any microcontroller.

### Atmel AVR

[https://github.com/Rahix/avr-hal](Rahix/avr-hal) is a popular 3rd party Rust HAL layer for the ATmega AVRs (incl. Arduino, ATmega, ATtiny).

`ravedude` is a useful cargo application which adds support to `cargo run` to program the Arduino boards, and then connect up a serial to display any print messages.

```bash
cargo +stable install ravedude
```

{{% figure src="using-cargo-generate-for-arduino-uno.png" width="700px" caption="cargo generate with the Rahix/avr-hal-template GitHub repo provides a really quick way of setting up a Rust project for an Arduino board." %}}

There is a great tutorial on getting Rust working on the Arduino Uno (which uses the ATmega328P microcontroller) at https://blog.logrocket.com/complete-guide-running-rust-arduino/. Getting a blinky Rust project built and programming takes about 5 minutes using that tutorial when developing in the WSL (passing through the Arduino USB device with `usbip`).

{{% figure src="screenshot-of-basic-arduino-app-in-rust.png" width="700px" caption="Screenshot of a bare-bones Arduino app written in Rust (flashing an LED and printing \"Hello\" to the console." %}}

### Atmel SAM

The [atsamd-rs/atsamd](https://github.com/atsamd-rs/atsamd) GitHub repo provides various crates for working with Atmel `samd11`, `samd21`, `samd51` and `same5x` based devices using Rust[^bib-github-atsamd-rs-atsamd]. This repo provides PACs (Peripheral Access Crates) and higher level HALs (Hardware Abstraction Layers). The HALs implement traits specified by the embedded-hal project.

Also included in this repo are BSPs (Board Support Packages) for a number of development boards. They distinguish between _Tier 1_ and _Tier 2_ BSPs, the Tier 1 BSPs are those that are kept up-to-date with the latest version of `atsamd-hal`, whilst the Tier 2 BSPs don't (they might be locked to some past version).

{{% figure src="atsamd-rs-atsamd-repo-screenshot.png" width="600px" caption="Screenshot of the README of the atsamd-rs/atsamd repository." %}}

The repo looks to be active, with 705 commits and 421 stars as of November 2022.

### MSP430 (Texas Instruments)

There is a not well maintained version of RTFM (Real-Time For the Masses, the old name for RTIC) available for the MSP430 MCUs at the GitHub repo [japaric/msp430-rtfm](https://github.com/japaric/msp430-rtfm).

### ESP32 (Espressif Systems)

I'm not sure how I feel about their approach of forking the entire Rust repository ([esp-rs/rust](https://github.com/esp-rs/rust)) and adding in support for the Xtensa instruction set that way. Hopefully it will get upstreamed sometime in the future?

### Nordic nRF

The [nrf-rs/nrf-hal](https://github.com/nrf-rs/nrf-hal) repo provides a Rust HAL for the nRF51, nRF52 and nRF91 families of microcontrollers[^bib-nrf-rs-nrf-hal].

The default Embedded Rust tutorial now uses the micro:bit v2 (it used to use the STM32F303 Discovery Kit), which happens to have an nRF52 MCU onboard.

### SiFive

The rustup target `riscv32imac-unknown-none-elf` is available to cross-compile for the Freedom E310 (e.g. the HiFive1). I couldn't find any support for the HiFive1 Rev B bootloader, so a dedicated programmer was required to program the board.

### Others

* PSoC: The [psoc-rs GutHub organization](https://github.com/psoc-rs) has a PAC and HAL repo for the PSoC 6 but they don't look well maintained or used.
* PIC: The GitHub repo [kiffie/pic32-rs](https://github.com/kiffie/pic32-rs) contains a HAL for the PIC32. It looks somewhat maintained.

## Rust IDEs, Programming and the Debugging Experience

One must have for embedded development is a smooth `write code -> build -> program -> debug workflow`. Ideally this is without vendor lock-in (i.e. being forced to use the vendors specific IDE) and with step-by-step debugging in your code editor rather than just on the command-line. Luckily Rust can provide all this! I focused on using VS Code since it is the most popular non-vendor-specific IDE these days. VS Code has very good support for Rust and embedded development. `Cortex-Debug` and `rust-analyzer` are two VS Code extensions that you are definitely going to want to install.

I had access to a STM32F303 Discovery Kit (development board with a STM32F303 MCU on it), so I did a bit of searching and found the repo [rubberduck203/stm32f3-discovery](https://github.com/rubberduck203/stm32f3-discovery). This contained pre-made VS Code launch configurations so I should be able to debug the Rust code straight from within VS Code. With a few tweaks (including adding `"cortex-debug.gdbPath": "gdb-multiarch"` to `settings.json`) I was able to get thus workflow up and running! 

All I needed to do is hit `F5` -- this built the code, flashed it to the STM32F303 dev. kit and then jumped into a debug session. Below is an image from when I was stepping through the "Blinky" example. I was using VS Code connected to Ubuntu via the WSL (using `usbip` to pass-through the STM32F303 USB device).

{{% figure src="stm32-discovery-blinky-debugging-in-vs-code.png" width="800px" caption="Step-by-step debugging a STM32F303 Discovery Kit blinky Rust application in VS Code. I started with the repo at https://github.com/rubberduck203/stm32f3-discovery, and after a few tweaks, this was up and running!" %}}

[Knurling](https://github.com/knurling-rs/) is a collection of projects by Ferrous Systems (two of their popular tools include `probe-run` and `defmt`).

semihosting (slow debug print statements via the attached debugger) is provided for Cortex-M MCUs via the `cortex-m` crate.

## Rust RTOSes

No language can claim to be suitable for embedded programming without a selection of RTOSes to choose from. Luckily, Rust has some, from Rust wrappers of existing C/C++ RTOSes (such FreeRTOS and RIOT) to RTOSes built from scratch to run on Rust (such as RTIC, Embassy and Tock). Lets review some of the popular options available to Rust developers.

### FreeRTOS Wrappers

### RTIC

Interesting approach to an RTOS.

### Embassy

Supports co-operative multitasking (it is not pre-emptive).

### Tock

{{% figure src="tock-os-logo.png" width="700px" caption="The Tock logo. Image from the Tock GitHub organization page." %}}

> Tock is an embedded operating system designed for running multiple concurrent, mutually distrustful applications on Cortex-M and RISC-V based embedded platforms -- GitHub README.

| Property           | Value
|--------------------|------------------
| Scheduling         | 
| Num. Repo Stars    | 4k
| Num. Repo Commits  | 11k

{{% figure src="tock-architecture-diagram.png" width="700px" caption="Architecture block diagram for the Tock RTOS. Image from the Tock documentation[^bib-tock-tock-design]." %}}

Some of Tock is not completely baked into Rust, for example you have to break out of the Rust ecosystem and call `make` to program the kernel onto your board. Once the kernel is programmed onto your board, you can then use their own `tockloader` program to flash the application code.

### Drone

[Drone](https://www.drone-os.com/) is a interrupt-based pre-emptive RTOS built in Rust for embedded devices. 

| Property           | Value
|--------------------|------------------
| Scheduling         | Interrupt-based pre-emptive with priority
| Num. Repo Stars    | 361 (drone-core)
| Num. Repo Commits  | 251 (drone-core)


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
[^wikipedia-rust]: Wikipedia (2022, Nov 11). _Rust (programming language)_. Retrieved 2022-11-19, from https://en.wikipedia.org/wiki/Rust_(programming_language).
[^bib-embedded-rust-book-portability]: Rust Embedded. _The Embedded Rust Book - Portability_. Retrieved 2022-11-19, from https://docs.rust-embedded.org/book/portability/.
[^bib-github-atsamd-rs-atsamd]: atsamd-rs. _atsamd & atsame support for Rust (Git repository)_. Retrieved 2022-11-21, from https://github.com/atsamd-rs/atsamd.
[^bib-tock-tock-design]: Tock (2022, Jul 27). _Tock Design (Markdown documentation)_. Retrieved 2022-11-23, from https://github.com/tock/tock/blob/master/doc/Design.md.
---
author: gbmhunter
date: 2011-09-14 21:22:43+00:00
draft: false
title: ATmega
type: page
url: /programming/microcontrollers/atmel/atmega
---

# Overview

The ATmega is a microcontroller series by Atmel. It is an 8-bit architecture, with chip variants depending on the needed memory, peripherals and package size. Below are code examples for the ATmega range of microcontrollers.

{{< figure src="/images/2011/09/atmel-avr-atmega168-ic-photo-www-wolfpaulus-com.jpeg" width="426px" caption="A photo of the Atmel AVR ATmega168 microcontroller. Image from https://wolfpaulus.com."  >}}

# Child Pages

[sb_child_list template=2 orderby=title order=asc nest_level=1]

# Code Examples

One annoyance with the ATmega series is that Atmel wrote all the code to compile with IAR Compiler, a paid for IDE, and not their own proprietary and free AVR Studio. This means that you have to port the code to work with the Win-AVR compiler if you want to use ATMEL's code examples. The main differences between the two compilers are precompiler directives (e.g. #pragma), delay functions, and the handling of variables that are stored in flash.

# Code Compatibility

ATMEL has done a good job at keeping code as similar as possible between microcontrollers in the ATmega family. One point to note is that at some point, they decided to add a '0' to all peripheral register descriptions, even when there was only one of these peripherals present in the chip (e.g. USART0 instead of USART). This generally applies to all the registers that are associated with the peripheral (e.g. RX0 and TX0 instead of RX and TX). You may have to add these before code will compile when using older source code with the newer avr libraries.

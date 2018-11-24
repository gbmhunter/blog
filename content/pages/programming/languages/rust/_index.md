---
author: gbmhunter
date: 2015-05-13 11:01:30+00:00
draft: false
title: Rust
type: page
url: /programming/languages/rust
---

# Overview

Rust is a "systems" programming language. 

{{< figure src="/images/2015/05/rust-programming-language-logo-white-background.png" width="393" caption="The logo of the Rust programming language. Image from http://www.rust-lang.org/." caption-position="bottom" >}}

# Memory

Rust has a powerful, and well-thought out (IMO) ownership system for variables. This ownership system combines ownership, borrowing and copying concepts and relies heavily on zero-cost (no run-time influence) compiler checks to implement it. The system is designed to prevent common software issues relating to concurrency and data races.

You can read more about the ownership system in the [official Rust book](https://doc.rust-lang.org/book/ownership.html).

# Source Code

The source code for Rust is maintained on GitHub at [https://github.com/rust-lang/rust](https://github.com/rust-lang/rust).

# Online Editor

You can write and run Rust test code online at the [Rust playpen](https://play.rust-lang.org/).

# Embedded Platforms

Rust is beginning to be used on embedded platforms (however, it is still in a mostly experimental manner). There is dicussion of the suitability of rust for an embedded platform at [Atomic Object](http://spin.atomicobject.com/2015/02/20/rust-language-c-embedded/).

[zinc.rs](http://zinc.rs/) is an attempt to write an ARM stack (similar to CMSIS or mbed in functionality, which are both written in C) using the rust programming language.

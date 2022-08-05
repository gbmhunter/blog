---
authors: [ "Geoffrey Hunter" ]
date: 2022-07-29
description: "What is volatile and how to use in when writing firmware for embedded systems."
draft: false
lastmod: 2022-08-05
tags: [ programming, C, volatile, buffers, C++, interrupts, embedded, ISR ]
title: Embedded Systems And The Volatile Keyword
type: page
---

{{% warning-is-notes %}}

## Overview

Many C/C++ software engineers could go their entire life without ever needing to use the `volatile` keyword. However in embedded systems, knowing how the `volatile` keyword works and how to use it is a vital skill.

The `volatile` keyword is a qualifier you apply to a variable, e.g. `volatile uint8_t my_var;`. It tells the compiler that the value stored at this address may change at any time, even if the compiler cannot see a code path that would cause it to change. This forces the compiler to perform a read/write from memory every time the variable is used in the code, rather than the compiler storing the variable locally in a register or optimizing the read/write out completely!

You can place the keyword `volatile` before or after the type when declaring a variable (`const` behaves the same way). The basic syntax for defining a `volatile` variable is:

```c
volatile uint8_t my_var;
uint8_t volatile my_var; // Alternative method, exactly the same as the line above
```

In the embedded world, it is common to want to use pointers that point to volatile memory, i.e. a pointer to an 8-bit memory mapped register for controlling a UART. Pointers to volatile data are defined with:

```c
volatile uint8_t * ptr_to_register;
```

`volatile` is used for:

* Variables which are read/written to from interrupts and also accessed outside the interrupt. If you forgot the `volatile` the compiler cannot set the code path that calls the interrupt (because interrupts are called asynchronously) and thus may assume nothing else touches the variable and cache the value in a register (or optimize out the read/write completely).
* Memory addresses which point to hardware registers in microcontrollers (memory mapped registers). These hardware registers are liable to be changed at any time by the hardware (e.g. a bit in a UART peripheral register which indicates when there are received bytes available for reading), so the compiler cannot assume it's only changed when the code writes to it.

{{% tip %}}
Any time a variable may be changed outside the flow of control of a piece of code accessing it, the variable should be declared `volatile`.
{{% /tip %}}

What `volatile` **should not be** used for:

* Guaranteeing thread safe access of a shared variable between two threads. `volatile` provides some, but not all of the guarantees required for thread safe access. Other threading objects such as memory barriers, mutexes e.t.c are required, but these also provide the guarantees that `volatile` does, so `volatile` is not needed in this use case.

## The Use Of volatile With Buffers 

It is also common to write incoming data to buffers (e.g. ring buffers) from interrupts in embedded firmware, and then read the data back out of the buffer outside of the interrupt in the main application routine (or flip the read/write for outgoing data). `volatile` can be used when declaring the array of bytes in the buffer.

For example, to declare a 100-byte buffer which contains volatile data:

```c
volatile char buffer[100];
```

This forces the compiler to generate code in the main app routine that goes out and reads the values in the buffer. If you did not use `volatile`, the compiler may infer that because the interrupt function that writes to the buffer never gets called (remember: the compiler can't see the interrupt being called), so it never has to read the values from the buffer because it will always stay as the initialized values. This can result in you reading garbage data from your buffer!

Below is an example in C++ of a volatile buffer than is written to from an ISR (interrupt service routine) and read from a main application thread (outside of the interrupt). Because this is on a web-based system, I didn't have access to true interrupts, so I simulated one with a separate thread instead. If you remove the `volatile` keyword, you should get undefined behaviour. In the case when I ran it, I got the same output as when declared `volatile`, which I think is because I couldn't get the compiler to optimize out the read.

(run this code at https://replit.com/@gbmhunter/volatile-buffer-experiment)

```c++
// To build and run code:
// g++ main.cpp -lpthread; ./a.out
#include <iostream>
#include <memory>
#include <thread>

// This buffer needs to be declared volatile as the ISR writes to
// it (ISR faked with a separate thread)
volatile char buffer[3];

void isr_fn() {
  char data[] = "abc";
  // Copy the chars, ignore the null
  for (int i = 0; i < 3; i++) {
    buffer[i] = data[i];
  }
}

int main() {
  std::thread t1(isr_fn);
  t1.join(); // Wait for ISR to finish writing to buffer

  // Now read from buffer
  for (int i = 0; i < 3; i++) {
    std::cout << buffer[i];
  }
  std::cout << "\n";
}
```

## memcpy() And volatile

`memcpy()` cannot operate on `volatile` data. This can be an annoyance if you are trying to copy data to or from a buffer (array of bytes, i.e. `char *`) which is declared `volatile`. However, you can easily make your own version of `memcpy()` which does work with `volatile`. Below is a example of a `memcpy()` equivalent that works with a destination buffer that is `volatile`:

```c
// Version of memcpy that works with a volatile destination buffer
void memcpy_to_volatile(volatile char * dest, char * src, uint32_t num_bytes) {
    for (uint32_t i = 0; i < num_bytes; i++) {
        dest[i] = src[i];
    }
}
```

## Casting Away volatile

{{% warning %}}
Casting away `volatile` on a variable can cause undefined behaviour.
{{% /warning %}}

In C++, you can use `const_cast` to cast away `volatile` (confusingly, it's called `const_cast`, but it actually casts away both `const` and `volatile`).

## C++ Member Functions Declared volatile

TODO: Add info here.

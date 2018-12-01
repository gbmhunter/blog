---
author: gbmhunter
date: 2016-06-16 05:14:49+00:00
draft: false
title: MPLAB XC Compilers
type: page
url: /programming/compilers/mplab-xc-compilers
---

# Overview

The MPLAB XC compilers are a range of compilers built by Microchip, which **compile C/C++ source code for 8, 16 and 32-bit PIC microcontrollers**, as well as the dsPIC DSCs.

{{< figure src="/images/2016/06/mplab-xc-compiler-microchip-logo.png" width="282px" caption="The logo for the range of MPLAB XC compilers. Image from http://www.microchip.com/."  >}}

# Licensing

The _Free_ versions of the MPLAB XC compilers allow for limited optimisation (both in w.r.t. size and speed). The _Standard_ and _Pro_ versions allow for increased optimisation levels.

{{< figure src="/images/2016/06/mplab-xc-compiler-build-status-output-memory-summary-licensing.png" width="540px" caption="Build status output from the free version of the MPLAB XC compiler."  >}}

# MPLAB X IDE Integration

The MPLAB XC compilers are designed to be used with the MPLAB X IDE, also provided by Microchip.

# Delays

Delays are provided by the compiler/library through the __delay_us() and __delay_ms() functions.

{{< figure src="/images/2016/06/built-in-pic-microcontroller-delay-functions.png" width="719px" caption="A screenshot of the built-in delay functions provided in the PIC microcontroller libraries. This screenshot was taken from pic18.h."  >}}

Note that you have to manually define the macro _XTAL_FREQ correctly before you can use these delays.

# Variadic Macros

Unfortunately, the **XC preprocessor does not support variadic macros **(well, at least XC8 doesn't as of July 2016).

However, you can somewhat implement the same functionality by using the _double-brackets_ technique.

    ```c
    #define DPRINTF(arguments) printf arguments;
    
    int main(void) {
       int x = 3;
       DPRINTF(("x = %i", x))   // This prints "x = 3"
    }

The limitation with using the double-brackets technique is that you **don't have individual access to any of the parameters** in the macro. The only thing you can do is pass them onto a variadic function (although the XC compiler doesn't support variadic macros, it DOES support variadic functions). DPRINTF() as defined above is pretty useless, so let's make a better version:
    
    ```c
    #define DPRINTF(arguments) \
        printf("%s, %i: ", __FILE__, __LINE__); \
        printf arguments; \
        printf("\n");

    int main(void) {
        int x = 3;
        DPRINTF(("x = %i", x))    // This will print something like "main.c, 23: x = 3"
    }
    ```

# No Recursive Functions

Because of the hardware-limited stack size on the microcontrollers the XC8 compiler targets, the compiler does not support recursive functions.

> "Due to limited memory and no hardware implementation of a data stack, recursion is not supported and functions are not reentrant." -- MPLAB XC8 C Compiler User's Guide [5.2.1]

This lack in functionality (and a rather serious one at that!) is the one item that makes the XC8 compiler non-compliant with ANSI.

What are my alternatives? Function duplication (albeit with a different function name) is an "easyish" hack that may get you where you want to be. However, it is not recommended due to issues in readability and maintainability (two copies of the same code to maintain, and people might not rember to update one when they update the other!).

# Bits!

The XC8 compiler defines a new bit type. This is a non-standard C extension, and is added because the PIC microcontroller have hardware support for single-bit manipulation.

The bit type does actually use a single bit (as opposed to the bool_t defined in standard C, which uses a whole byte to represent just true or false).

# Compiler Errors

## can't generate code for this expression

This error can occur if trying to use the bool_t inside the conditional expression for an  if statement.

> The inability to compile the code can be a deficiency in the compiler, or an expression that requires more registers or resources than are available at that point in the code. -- Microchip, XC8 compiler help (r.e. the "can't generate code..." error)

## undefined symbols

Error Message: error: (500) undefined symbols

---
authors: [ "Geoffrey Hunter" ]
date: 2011-09-14
draft: false
title: ATmega Interrupts
type: page
---

## Overview

Interrupts can be triggered from many sources in an AVR architecture. Typical examples include timer compares, logic level changes on external pins, watchdog timer overflows and usart buffer empty or byte received interrupts. The individual interrupts are enabled by setting a bit in the configuration registers for each peripheral, and there is a global interrupt enable/disable bit supplied in the SREG register. They can be used to execute code, or to wake the microcontroller up from a sleep mode. Interrupts are mapped with a vector table.

## AVR-LibC

AVR-LibC provides a library to handle interrupt routines for ATmega chips. The following code example assumes you have included the library in your project, as shown below:

```c    
#include <avr/interrupt.h>
```

## Writing Interrupt Handler Functions

Interrrupts are handled in AVR Studio with:

```c    
ISR(<interrupt vector>)
{
    <code to be executed>
}
```

There is also a handler for an interrupt which you don't want to write any code for. This is typically used when the interrupt is going to wake the microcontroller up, but do nothing else. If you do not include a handler, the interrupt will default to calling BADISR_vect code, which by default restarts the application. It has no body (and hence no curly braces).

```c   
EMPTY_INTERRUPT(<interrupt vector>);
```

## Enabling/Disabling Interrupts

All interrupts can be enabled and cleared with the following commands. This is a global control which will enable or disale ALL interrupts, irrespective of their individual enable bits in other configuration registers. These macros set or clear the I bit (interrupt enable) in the SREG register.

```c   
//Enable interrupts
sei();
//Disable interrupts
cli();
```

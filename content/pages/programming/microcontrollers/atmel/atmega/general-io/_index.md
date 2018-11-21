---
author: gbmhunter
date: 2011-09-14 21:23:46+00:00
draft: false
title: ATmega General I/O
type: page
url: /programming/microcontrollers/atmel/atmega/general-io
---

General I/O are pins that are used for non-specific purposes. Non-specific purposes are those not requiring any of the on-board peripherals that come with the ATmega micro-controllers (such as USART, timers). They are essentially pins which can be set either to digital high or digital low by the software.


## Configuring Ports


x = port letter (A, B or C), e.g. PORTA PORTB PORTC
n = pin number (0 to 7)

If the pin is used as input, setting PORTxn  controls pull-up for the pin (0 = disabled, 1 = enabled). If the pin is used as an output, PORTxn  is used to control the voltage at the pin. PINx  reads the value of the pin (for the whole port at once)


## Writing To Ports


Writing to ports can be done in a number of ways. The objective is to modify just one bit of the register which controls the state of the pin, as to not effect the state of any of the other pins. This is done with a little bit shifting and using the value of the register itself. This is called the read-modify-write method. More advanced microcontrollers have a special register you can write to that can change the pins one-by-one, which is called the modify-write method. Some microcontrollers even allow you to modify just the single bit from the register (bit addressable).

To write a bit (in this example, setting pin 2 of port A high)

    
    PORTA |= (1<<PA2)


To clear a bit (in this example, setting pin 2 of port A low)

    
    PORTA &= ~(1<<PA5)

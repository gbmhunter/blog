---
author: gbmhunter
date: 2011-09-14 21:52:05+00:00
draft: false
title: ATmega Power Management And Sleep Modes
type: page
url: /programming/microcontrollers/atmel/atmega/power-management-and-sleep-modes
---

# Overview


The ATmega architecture provides power saving modes of operation to reduce to total power consumption of the microcontroller. The number and type of power saving modes depends on the exact chip in the ATmega family. Power saving modes are very useful when designing an embedded solution that will be powered of a limited power source, such as a coin-cell, solar power, or energy harvesting method.


# AVR-LibC Library


AVR-LibC provides a good library for utilising the sleep modes on an ATmega microcontroller. To use them, make sure to include sleep.h from AVR-LibC into your project. If using AVR Studio 5, this can be done with the following inclusion at the top of your code.

    
    #include <avr/sleep.h>


The following code examples make use of the functions provided by this library.


# Sleep Modes


<table >

<tr >
Mode
clkCPU
clkFLASH
clkI/O
Can Wake Up From
Notes
</tr>

<tbody >
<tr >

<td >Idle
</td>

<td >0
</td>

<td >0
</td>

<td >1
</td>

<td >



	  * External interrupts
	  * Internal interrupts


</td>

<td >Stops the cpu and flash access, but allows all other components to run.
</td>
</tr>
<tr >

<td >ADC Noise Reduction Mode
</td>

<td >0
</td>

<td >0
</td>

<td >0
</td>

<td >



	  * External interrupts
	  * Internal interrupts
	  * Watchdog reset


</td>

<td >Improves the noise performance of the ADC. Use this if you want to do hard-core ADC measurements and get the maximum possible resolution.
</td>
</tr>
<tr >

<td >Power-down Mode
</td>

<td >
</td>

<td >
</td>

<td >
</td>

<td >
</td>

<td >
</td>
</tr>
<tr >

<td >Power-save Mode
</td>

<td >
</td>

<td >
</td>

<td >
</td>

<td >
</td>

<td >
</td>
</tr>
<tr >

<td >Standby Mode
</td>

<td >
</td>

<td >
</td>

<td >
</td>

<td >
</td>

<td >
</td>
</tr>
</tbody>
</table>


# Putting The Micro To Sleep


There are three functions from the AVR-LibC sleep library that need to be called to make the microcontroller enter a sleep mode. The first is set_sleep_mode(mode).


# Things To Watch Out For





	  * USART/other comm transmissions have finished before you enter a sleep mode which stops the USART clock. If not, you will be sending corrupted data.



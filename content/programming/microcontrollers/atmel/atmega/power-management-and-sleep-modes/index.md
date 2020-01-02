---
author: gbmhunter
date: 2011-09-14
draft: false
title: ATmega Power Management And Sleep Modes
type: page
---

## Overview

The ATmega architecture provides power saving modes of operation to reduce to total power consumption of the microcontroller. The number and type of power saving modes depends on the exact chip in the ATmega family. Power saving modes are very useful when designing an embedded solution that will be powered of a limited power source, such as a coin-cell, solar power, or energy harvesting method.

## AVR-LibC Library

AVR-LibC provides a good library for utilising the sleep modes on an ATmega microcontroller. To use them, make sure to include `sleep.h` from AVR-LibC into your project. If using AVR Studio 5, this can be done with the following inclusion at the top of your code.

```c    
#include <avr/sleep.h>
```

The following code examples make use of the functions provided by this library.

## Sleep Modes

<table>
	<thead>
		<tr>
			<th>Mode</th>
			<th>clkCPU</th>
			<th>clkFLASH</th>
			<th>clkI/O</th>
			<th>Can Wake Up From</th>
			<th>Notes</th>
		</tr>
	</thead>
<tbody >
<tr >
<td >Idle</td>
<td >0</td>
<td >0</td>
<td >1</td>
<td >
<ul>
	<li>External interrupts</li>
	<li>Internal interrupts</li>
</ul>
</td>
<td >Stops the cpu and flash access, but allows all other components to run.</td>
</tr>
<tr >
<td >ADC Noise Reduction Mode</td>
<td >0</td>
<td >0</td>
<td >0</td>
<td >
<ul>
	<li>External interrupts</li>
	<li>Internal interrupts</li>
	<li>Watchdog reset</li>
</ul>
</td>
<td >Improves the noise performance of the ADC. Use this if you want to do hard-core ADC measurements and get the maximum possible resolution.</td>
</tr>
<tr >
<td >Power-down Mode</td>
<td ></td>
<td ></td>
<td ></td>
<td ></td>
<td ></td>
</tr>
<tr >
<td >Power-save Mode</td>
<td ></td>
<td ></td>
<td ></td>
<td ></td>
<td ></td>
</tr>
<tr >
<td >Standby Mode</td>
<td ></td>
<td ></td>
<td ></td>
<td ></td>
<td ></td>
</tr>
</tbody>
</table>

## Putting The Micro To Sleep

There are three functions from the AVR-LibC sleep library that need to be called to make the microcontroller enter a sleep mode. The first is `set_sleep_mode(mode)`.

## Things To Watch Out For

* USART/other comm transmissions have finished before you enter a sleep mode which stops the USART clock. If not, you will be sending corrupted data.
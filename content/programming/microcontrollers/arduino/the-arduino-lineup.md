---
author: gbmhunter
date: 2013-03-27 20:02:50+00:00
draft: false
title: The Arduino Lineup
type: page
url: /programming/microcontrollers/arduino/the-arduino-lineup
---

## Arduino Due

The first official 32-bit Arduino development board, released in 2012! The 32-bit microcontroller is a welcome addition to the Arduino range, with a fast clock speed (84MHz) and huge amounts of flash/SRAM (512kB/96kB respectively).

One of the disadvantages is that it only has 3.3V tolerant inputs, meaning there are no guarantees that shields designed for the rest of the Arduino range will work with the Due.

The Specs:

* Vcc: +3.3V
* Architecture: Atmel SAM3X8E ARM Cortex-M3 CPU
* Flash: 512kB
* SRAM: 96kB
* Clock: 84MHz
* GPIO: 54 (12 can be PWM)
* Analogue Inputs: 12
* USB OTG
* UART'S: 4

Official Version: [http://arduino.cc/en/Main/ArduinoBoardDue](http://arduino.cc/en/Main/ArduinoBoardDue)

The Due currently has a problem running the OneWire library. The micros() function has a problem with noInterrupts(), causing the library to work sporadically. The problem and potential work-arounds are listed on [this forum page](http://arduino.cc/forum/index.php/topic,141030.msg1117349.html). My friend found that Reply #41 on Feburary 13, 2013 by leonid_leonid fixed the issue.

## Arduino Uno

{{< figure src="/images/electronics-arduino/arduino-uno-pcb.jpg" caption="The Arduino UNO, the first ever Arduino PCB."  width="200px" >}}

Being one of the most popular Arduino boards, most shields are designed to be compatible with the Arduino Uno. The original contains a [DIP-packaged](/electronics/circuit-design/component-packages) microcontroller placed in a socket, but there is also a SMD version.

The Specs:

* Vcc: +5V
* Architecture: ATmega328
* SRAM: 2kB
* EEPROM: 1kB
* Clock: n/a
* GPIO: 14 (6 can be PWM)
* Analogue Pins: 6
* Serial-to-USB chip

Legitimate versions: DigiKey, Element14, Mouser, e.t.c  
Rip-offs: DealExtreme

I used one of these in the [Luxcity Tonic UV Control System project](/electronics/projects/luxcity-uv-tonic-control-system).

## Arduino Yun

{{< figure src="/images/electronics-arduino/arduino-yun-pcb.jpg" caption="The Arduino Yun, a PCB with both a real-time Arduino microcontroller and Linux-based microprocessor."  width="200px" >}}

The Arduino Yun was released in 2013, and was the first Arduino to incorporate a traditional real-time Arduino microcontroller (the Arduino Leonardo) with a networked, high-performance Linux-based SOC running right next to it.


Arduino Microcontroller

<table>
<tbody >
<tr >

<td >Architecture
</td>

<td >ATmega32u4
</td>
</tr>
<tr >

<td >Voltage
</td>

<td >5.0V
</td>
</tr>
<tr >

<td >SRAM
</td>

<td >?
</td>
</tr>
<tr >

<td >GPIO
</td>

<td >20
</td>
</tr>
<tr >

<td >PWM Channels
</td>

<td >7
</td>
</tr>
<tr >

<td >Architecture 2
</td>

<td >Atheros AR9331
</td>
</tr>
<tr >

<td >RAM
</td>

<td >64MB (DDR2)
</td>
</tr>
<tr >

<td >Flash
</td>

<td >32MB
</td>
</tr>
<tr >

<td >Clock Speed
</td>

<td >16MHz
</td>
</tr>
</tbody>
</table>


Linux Microprocessor


<table>
<tbody >
<tr >

<td >Architecture
</td>

<td >Atheros AR9331
</td>
</tr>
<tr >

<td >Voltage
</td>

<td >3.3V
</td>
</tr>
<tr >

<td >RAM
</td>

<td >64MB (DDR2)
</td>
</tr>
<tr >

<td >Flash
</td>

<td >32MB
</td>
</tr>
<tr >

<td >Other Features:
</td>

<td >
<ul>
	<li>IEEE 802.11b/g/n WiFi</li>
	<li>IEEE 802.3 10/100Mbit/s Ethernet</li>
	<li>PoE Compatible Ethernet</li>
	<li>USB Type-A 2.0 Host</li>
	<li>Micro-SD Card Reader</li>
</ul>
</td>
</tr>
</tbody>
</table>

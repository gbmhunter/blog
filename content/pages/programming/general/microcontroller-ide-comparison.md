---
author: gbmhunter
date: 2011-09-15 07:33:05+00:00
draft: false
title: Microcontroller IDE Comparison
type: page
url: /programming/general/microcontroller-ide-comparison
---

# Overview

Below is a comparison of some of the more popular microcontroller IDEs (integrated development environments).

The results from the 2012 embedded survey were interesting...

{{< figure src="/images/programming-misc/embedded-vendor-which-has-the-best-ecosystem.png" caption="Results from a embedded design survey, showing what microcontroller users thought has the best ecosystem."  width="650px" >}}

# AVR Studio

<table>
	<tbody>
		<tr>
			
<td >Cost
</td>
			
<td >Free
</td>
		</tr>
		<tr >
			
<td >Supported Operating Systems
</td>
			
<td >Recent Windows
</td>
		</tr>
		<tr >
			
<td >Supported Architectures
</td>
			
<td >All 8-bit and 32-bit ATMEL micro-controllers...
<ul>
	<li>ATmega</li>
	<li>ARM</li>
	<li>AT91</li>
</ul>
</td>
		</tr>
		<tr >
		
<td >Supported Languages
</td>
			
<td >
<ul>
	<li>C</li>
	<li>C++</li>
</ul>
	</td>
		</tr>
		<tr >
			
<td >Supported Compilers
</td>
			
<td >WinAVR
</td>
		</tr>
		<tr >
			
<td >Supported Programmers
</td>
			
<td >All of the AVR branded programmers...
				
<ul>
	<li>AVR ONE!</li>
	<li>JTAGICE MKII</li>
	<li>JTAGICE3</li>
	<li>STK600</li>
	<li>QT600</li>
	<li>AVRISP MKII</li>
	<li>AVR Dragon</li>
</ul>
			
</td>
		</tr>
		<tr >
			
<td >Supported Programming/Debugging Methods:
</td>
			
<td >
<ul>
	<li>JTAG</li>
</ul>
				
</td>
		</tr>
		<tr >
			
<td >Latest Version
</td>
			
<td >6.0 (as of July 2014)
</td>
		</tr>
	</tbody>
</table>

Designed to be used with ATMEL micro-controllers (the IDE is built by ATMEL after-all). Supports most if not all of ATEML's programmers. It can use Win-GCC to compile. The lastest version (5.0 beta) has had a major facelift (over v4) and given it that much needed feature boost to keep in the IDE game. Now it has auto-complete other Visual Studio features!

The **ASF** (Atmel Software Framework), is a collection of firmware libraries that is set-up graphically through Atmel Studio. The libraries include things such as UART drivers, common signal processing algorithms, e.t.c. They can provide a high-level interface to the hardware which promotes modular, reusable code.

Atmel Studio also promotes an integrated app-store, simulator (which of July 2014 only supports AVR devices), and shared workspace.

# Eclipse

<table>
	<tbody >
		<tr >
			
<td >Cost
</td>
			
<td >Free (and open-source)
</td>
		</tr>
		<tr >
			
<td >Supported Operating Systems
</td>
			
<td >
<ul>
	<li>Windows</li>
	<li>Linux</li>
	<li>MacOS</li>
</ul>
		
</td>
		</tr>
		<tr >
			
<td >Supported Architectures
</td>
			
<td >Heaps
</td>
		</tr>
		<tr >
			
<td >Supported Languages
</td>
			
<td >
<ul>
	<li>Java</li>
	<li>PHP</li>
	<li>C/C++</li>
	<li>Many more...</li>
</ul>
				
		</tr>
		<tr >
			
<td >Supported Compilers
</td>
			
<td >
<ul>
	<li>GCC</li>
</ul>						
</td>
		</tr>
		<tr >
			
<td >Supported Programming/Debugging Methods:
</td>
			
<td >
<ul>
	<li>JTAG</li>
</ul>
</td>
		</tr>
		<tr >
			
<td >Latest Version
</td>
			
<td >Unknown
</td>
		</tr>
	</tbody>
</table>

Eclipse would be one of the most popular open-source IDE's out there. It's popularity is partly due to the fact it supports so many frameworks with it's modular design. The Eclipse project was started initially in 2001 and the not-for-profit corporation The Eclipse Foundation was founded in 2004. With support for many large frameworks such as Java, C/C++, PHP and mobile platforms, it is very powerful. It also support TEX based mark-up languages.

There are many different releases of Eclipse that you can download.

# Keil uVision



<table>
	<tbody >
		<tr >
<td >Cost
</td>
			
<td >Free
</td>
		</tr>
		<tr >
			
<td >Supported Architectures
</td>
			
<td >
<ul>
	<li>ARM</li>
	<li>Cortex</li>
	<li>8051</li>
	<li>C116</li>
</ul>
</tr>
		<tr >
			
<td >Supported Compilers
</td>
			
<td >WinAVR
</td>
		</tr>
		<tr >
			
<td >Supported Programmers
</td>
			
<td >SiLabs USB Debug Adapters
</td>
		</tr>
		<tr >
			
<td >Simulation
</td>
			
<td >Yes
</td>
		</tr>
		<tr >
			
<td >Supported Programming/Debugging Methods:
</td>
			
<td >
<ul>
	<li>JTAG</li>
</ul>
</td>
		</tr>
		<tr >
			
<td >Latest Version
</td>
			
<td >
</td>
		</tr>
	</tbody>
</table>

Supports programming of 8051 architecture micro-controllers. Can be used with SiLabs micro-controllers. Supports JTAG de-bugging. No auto-complete which can get annoying.

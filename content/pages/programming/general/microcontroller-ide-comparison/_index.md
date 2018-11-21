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





[singlepic id=1151 w=650 h=550 float=center]





# AVR Studio



<table style="width: 700px" >
	<tbody >
		<tr >
			
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
				


					  * ATmega
					  * ARM
					  * AT91
				
			
</td>
		</tr>
		<tr >
			
<td >Supported Languages
</td>
			
<td >
				


					  * C
					  * C++
				
			
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
				


					  * AVR ONE!
					  * JTAGICE MKII
					  * JTAGICE3
					  * STK600
					  * QT600
					  * AVRISP MKII
					  * AVR Dragon
				
			
</td>
		</tr>
		<tr >
			
<td >Supported Programming/Debugging Methods:
</td>
			
<td >
				


					  * JTAG
				
			
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



<table style="width: 700px" >
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
				


					  * Windows
					  * Linux
					  * MacOS
				
			
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
				


					  * Java
					  * PHP
					  * C/C++
					  * Many more...
				
		</tr>
		<tr >
			
<td >Supported Compilers
</td>
			
<td >
				


					  * GCC
				
			
</td>
		</tr>
		<tr >
			
<td >Supported Programming/Debugging Methods:
</td>
			
<td >
				


					  * JTAG
				
			
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



<table style="width: 700px" >
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
				


					  * ARM
					  * Cortex
					  * 8051
					  * C116
				
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
				


					  * JTAG
				
			
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





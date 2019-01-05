---
author: "gbmhunter"
date: 2011-09-12
description: "A tutorial on the UART communication protocol, including types, baud rates, flow control, error checking, RS-232 and more."
draft: false
lastmod: 2019-01-04
tags: [ "UART", "communication protocol", "USART", "microcontroller", "serial", "8n1", "universal asynchronous", "receiver", "transmitter", "RX", "TX" ]
title: "UART Protocol"
type: "page"
---

## Overview

UART (_Universal Asynchronous Receiver/Transmitter_) is a lower-voltage, microcontroller friendly equivalent of the RS-232 digital data transmission protocol with origins dating back to the 1960's. It was designed as a communication protocol to talk between _DTE_ (data terminal equipment) and _DCE_ (data communication equipment). It is universal in the sense the timing, voltages, flow control and error checking can be configured.

<table>
    <tbody>
        <tr>
            <td>Drive Type</td>
            <td>Single-ended</td>
        </tr>
        <tr>
            <td>Num. Wires (excl. GND)</td>
            <td>2 (TX/RX) or 4 (TX/RX and RTS/CTS)</td>
        </tr>
        <tr>
            <td>Duplexity</td>
            <td>Full</td>
        </tr>
        <tr>
            <td>Connection Topology</td>
            <td>Point-to-point</td>
        </tr>
        <tr>
            <td>OSI Layers</td>
            <td>Layers 1 (physical) and 2 (data link)</td>
        </tr>
    </tbody>
</table>


**It is commonly used today as a simple, two-way node-to-node serial communications protocol between devices on a circuit board** or possibly over a cable. Because of it's low voltage and single-ended nature, it is not very noise resilient, and is usually replaced with a more robust protocol such as [RS-232](/electronics/communication-protocols/rs-232-protocol) or [RS-485](/electronics/communication-protocols/rs-485-protocol) when communication occurs over any significant cable length or in a noisy environment.

## Terminology

Sorted in alphabetical order.

<table>
    <thead>
        <tr>
            <th>Term</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>CTS</td>
            <td>CTS is an initialism for <i>Clear To Send</i>. See the Flow Control section for more information.</td>
        </tr>
        <tr>
            <td>DCD</td>
            <td>DCD is an initialism for <i>Data Carrier Detect</i>. See the Flow Control section for more information.</td>
        </tr>
        <tr>
            <td>DCE</td>
            <td>DTE is an initialism for <i>Data Communication Equipment</i>. It was a term created when UART was first developed to describe electronic devices which transmitted/received data and connected to terminals (which were termed DTE's). See the Flow Control section for more information.</td>
        </tr>
        <tr>
            <td>DTE</td>
            <td>DTE is an initialism for <i>Data Terminal Equipment</i>. It was a term created when UART was first developed to describe electronic devices which displayed data and connected to modems (which were termed DCE's). See the Flow Control section for more information.</td>
        </tr>
        <tr>
            <td>DTR</td>
            <td>DTR is an initialism for <i>Data Terminal Ready</i>. See the Flow Control section for more information.</td>
        </tr>
        <tr>
            <td>RI</td>
            <td>RI is an initialism for <i>Ring Indicator</i>. See the Flow Control section for more information.</td>
        </tr>
        <tr>
            <td>RTS</td>
            <td>RTS is an initialism for <i>Request To Send</i>. See the Flow Control section for more information.</td>
        </tr>
        <tr>
            <td>RxD</td>
            <td>RxD is an acronym for <i>Receive Data</i>. See the Flow Control section for more information.</td>
        </tr>
        <tr>
            <td>TxD</td>
            <td>TxD is an acronym for <i>Transmit Data</i>. See the Flow Control section for more information.</td>
        </tr>
        <tr>
            <td>UART</td>
            <td>UART is an initialism for <i>Universal Asynchronous Receiver/Transmitter</i>.</td>
        </tr>
        <tr>
            <td>USART</td>
            <td>USART is an initialism for <i>Universal Asynchronous/Synchronous Receiver/Transmitter</i>. ATMEL uses this term to describe the peripherals on its ATmega range of microcontrollers that support the standard asynchronous protocol as well as a synchronous (clocked) protocol.</td>
        </tr>
        <tr>
            <td>Voting</td>
            <td>Voting describes a error-checking process in which the same bit of UART data is sampled multiple times and then a vote occurs to determine it's state.</td>
        </tr>
    </tbody>
</table>


## Protocol

The long history of RS-232 like serial communication means that UART is synonymous/compatible with many physical and protocol layer variations such as:

* CMOS UART
* RS-232
* RS-423 (differential)
* RS-485 (differential)
* DMX512 (commonly used to control stage lighting and effects)
* MIDI
* LIN Bus
* IrDa

## Connectors

UART is a protocol that has no one single recognizable connector. Because it is commonly used in conjunction with RS-232 or RS-485 protocols, the D subminiature connectors are commonly associated with the UART protocol. However, because UART is a very common microcontroller peripheral and can be used for short, permanent on-PCB communications between microcontroller and 3rd party device, it is also commonly implemented without any connector at all (pin-to-pin on PCB), or is routed from microcontroller directly to 0.1" header pins for things such as debugging (a debug UART is very common on embedded devices).

## Transmission Speeds

UART, by today's standards, is a slow transmission protocol. However, it is still fast enough for tons of applications. The commonly supported baud rate speeds are:

* 600, 1200, 3400, 4800, 9600, 14400, 19200, 28800, 38400, 56000, 57600, 115200, 128000, 256000, 460800, 921600

I have had basically no issues using speeds up to 460800 baud in embedded systems (either talking to another embedded system, or to a computer through a virtual COM port). However, 921600 baud has not worked for me in some situations.

Some devices also support custom baud rates.

## Flow Control

The flow control is a way of detecting when the receiver or transmitter is ready to accept or send new data. The UART protocol provides a few (all optional) methods for flow control:

* Hardware RTS/CTS lines
* Software XON/XOFF flow control

## RTS/CTS

This is done by various additional connections to the standard transmit, receive and ground wires. The two most common are CTS and RTS. Typically, a micro-controller may have one or two UART peripherals that support this feature, while the rest are just basic non-flow control UART's.

A small amount of power can be extracted from the RTS and CTS lines for powering low-power devices.

The following tables lists all of the flow control signals (as well as the data signals), with respect to the device in question. Matching signals are grouped together.

<div class="table-wrapper">
<table>
    <thead>
        <tr>
            <th>Signal</th>
            <th>Port Type</th>
            <th>Description</th>
            <th>DB-25 Pin</th>
            <th>DE-9 Pin</th>
        </tr>
    </thead>
    <tbody>
<tr >
<td>DTR (Data Terminal Ready)
</td>
<td>Output
</td>
<td>DTE drives this to indicate to the DCE that it is present.
</td>
<td>5
</td>
<td>4
</td>
</tr>
<tr >
<td>DCD (Data Carrier Detect)
</td>
<td>Input
</td>
<td>DCE drives this when it is connected to the telephone line.
</td>
<td>8
</td>
<td>1
</td>
</tr>
<tr >

<td>RI (Ring Indicator)
</td>

<td>Input
</td>

<td>The DCE drives this when it has detected a phone call. Note that there is no matching signal going the other way.
</td>
<td>22
</td>
<td>9
</td>
</tr>
<tr >
<td>RTS (Request To Send)
</td>
<td>Output
</td>
<td>DTE drives this to tell the DCE to get ready to receive data.
</td>

<td>4
</td>

<td>7
</td>
</tr>
<tr >

<td>CTS (Clear To Send)
</td>

<td>Input
</td>

<td>Driven by the DCE when it is ready to accept data.
</td>

<td>5
</td>

<td>8
</td>
</tr>
<tr >

<td>TxD (Data Transmit)
</td>

<td>Output
</td>

<td>The DTE sends data to the DCE over this line.
</td>

<td>2
</td>

<td>3
</td>
</tr>
<tr >

<td>RxD (Data Receive)
</td>

<td>Input
</td>

<td>The DCE sends data to the DTE over this line.
</td>

<td>3
</td>

<td>2
</td>
</tr>
<tr >

<td>Common Ground (GND)
</td>

<td>n/a
</td>

<td>The common ground for all signals.
</td>

<td>7
</td>

<td>5
</td>
</tr>
<tr >

<td>Protective Ground (PG)
</td>

<td>n/a
</td>

<td>The protective ground. This is usually just connected up to the common ground on the PCB.
</td>

<td>1
</td>

<td>n/a
</td>
</tr>
</tbody>
</table>
</div>

Note that confusion of how to connect two UART devices together arises when it is not terminal equipment (DTE) connected to modem equipment (DCE). In the embedded world, microcontrollers and other devices which support UART can act either as a DTE or a DCE. **Take particular care when connecting UART ports together on embedded devices!**

> Rule-of-thumb: Most RS-232 serial interfaces with a male 9 or 25 pin connector are DTE's, most with a female 9 or 25 pin connector are DCE's.

Most often, manufacturers label the UART pins as DTE's. In this case, you have to swap all connections with their matching line. So TxD of device 1 is connected to RxD of device 2, RxD of device 1 is connected to TxD of device 2, RTS of device 1 is connected to CTS of device 2, e.tc.

## Error Checking/Noise Immunity

The only error checking a UART has by specification is parity checking (additional error features may exist).

You may notice when sending lots of characters across a UART that some appear to be corrupted. These can be a real bummer if you are using UART to transmit lots of data (for say a data logging application). The best ways to improve noise immunity are:

* Slow down the transmission rate to the slowest acceptable speed. Far less errors occurs at 9600 baud than say, 57600 baud.
* Enable parity checking (does not completely fix the problem!)
* Enable voting algorithms if the transmitter or receiver support it.
* Similarly, enable oversampling if the transmitter or receiver support it (very similar to voting).
* Make the UART transmission lines as short as possible and with as little capacitance as possible.
* Shield the UART cable (not so important)
* Implement a checksum algorithm into the receiver and transmitter, such as a CRC. The UART protocol does not support this natively, you will have to use a 3rd party library/write the code to do this yourself. Even when using a simple checksum algorithm such as exclusive or (XOR), this is probably one of the most fool proof methods for error checking.

## Break Signal

The _break signal_ is not a character, but a **special signal which can be sent from transmitter to receiver to indicate an event**.

The transmitter sends a break signal by **driving it's TX line low for a period longer than one frame**. There are two types of breaks, short breaks and long breaks. A short break is when the TX line is driven low for a period of between 1 and 2 frame lengths, and a long break is when it is driven low for a period of more than 2 frame lengths.

## Higher-Level Protocols

Do you need a higher-level communication protocol that works over a UART connection? See the [SerialFiller](https://github.com/mbedded-ninja/SerialFiller) library on GitHub (written in C++). SerialFiller uses a publish/subscribe mechanism and works well on point-to-point serial connections such as UART.

## Terminal Programs

### RealTerm (3.5/5)

Website: [http://realterm.sourceforge.net/](http://realterm.sourceforge.net/)

A easy to use and powerful terminal program for Windows. Stolen from the website, it's description is:

> a terminal program specially designed for capturing, controlling and debugging binary and other difficult data streams. It is far better for debugging comms than Hyperterminal. It has no support for dialing modems, BBS etc - that is what hyperterminal does.

It can view and send binary, hex, ASCII, ANSI, integers (both signed and unsigned, 8 or 16-bit), floats and more. Support for half-duplex communication as well as I2C! Does not lag/hang at all (including when you disable the COM port while it is still running). You can run multiple RealTerm apps at the same time, to get data from multiple UART ports simultaneously. It can add timestamps to received UART messages, which is useful for data logging.

{{< figure src="/images/2011/09/realterm-window.jpg" width="620px" caption="A screenshot of RealTerm in action."  >}}

I have noticed a few bugs with RealTerm, especially when it comes to changing the number of rows and columns, and scrolling back through received data (the scrollback variable is buggy also).

### Terminal by Br@y (3.5/5)

Website: [https://sites.google.com/site/terminalbpp/](https://sites.google.com/site/terminalbpp/)

A simple and tidy Windows terminal program. Personally, it doesn't get the same amount of respect as RealTerm because of it's simplicity and slightly buggy nature. When decoding into hex, the program can hang if your receiving large amounts of data. It can also hang if you disable the COM port while it is still connected.

{{< figure src="/images/2011/09/terminal-v1-9b-by-bray-window.jpg" width="800px" caption="A screenshot of 'Terminal by Br@y' in action."  >}}

### PuTTy (4/5)

Website: [http://www.chiark.greenend.org.uk/~sgtatham/putty/](http://www.chiark.greenend.org.uk/~sgtatham/putty/)

> PuTTY is a free implementation of Telnet and SSH for Windows and Unix platforms, along with an xterm terminal emulator.

If your running windows, PuTTY is a very handy application to have if you want to emulate the command-line style interface of a UNIX-like system. Although the debugging and capturing features are not as good as say, RealTerm, it offers character-by-character input and proper response to pressing 'special' keys such as enter (which RealTerm doesn't allow, instead you have to enter a string and then press send). This may sound like a very small difference, but this feature does come in useful! I find it very handy when using FreeRTOS and the CLI (command-line interface) extension, which allows you to communicate from a pc to a embedded system using a command-line style interface (as in the picture to the right).

{{< figure src="/images/2011/09/putty-terminal-screenshot-with-settings-window.png" width="831px" caption="A screenshot of the PuTTy application in action, along with the settings window."  >}}

I have discovered one bug in PuTTY...if it receives a large number of characters all at once (which is common when printing debug messages from an embedded system, and for some reason, the string is not null-terminated, and starts printing gobble-de-gooch from random memory locations), PuTTY can freeze, and needs to be restarted. In this situation, it can also print the message "PuTTyPuTTyPuTTy" many times over across the COM port you are debugging. Weird.

{{< figure src="/images/2011/09/putty-bug-when-receiving-large-num-of-chars.png" width="699px" caption="PuTTY can freeze when printing a large number of random characters to it across a COM port."  >}}

## 9-Bit Addressing

9-bit addressing was employed when using a multi-drop configuration to prevent slaves from wasting processor time in decoding every byte on the bus to see if it was addressed to them. A 9th bit is sent out after every byte, and is used to signal if the previous 8-bits where an address (which the slaves have to listen to), or just data (which can be ignored).

## Radiation Hardening

Some UART protocols have radiation tolerant devices, such as the [DRS4485](http://www.aeroflex.com/ams/pagesproduct/datasheets/4485.pdf), an Dual RS-485 Interface Transceiver made by Aeroflex.

## RS-232

RS-232 is a very similar protocol to UART, and a UART to RS-232 converter is one of the most popular communication protocol converters you will see in an embedded system.

For more information, see the [RS-232 page](/electronics/communication-protocols/rs-232-protocol).

## RS-485

RS-482 is another very common protocol that UART is converted to and from. It is usually chosen over RS-232 when longer distances and/or larger noise immunity is needed. For more information, see the [RS-485 page](/electronics/communication-protocols/rs-485-protocol).

## Cables

You can get null-terminated USB-to-USB serial port emulator cables. These are awesome for transferring data between two computers (or any 2-USB host devices) without reverting to a true USB-to-USB A cable (which requires use of a more complicated protocol).

FTDI makes one such cable called the [USB to USB cable](http://www.ftdichip.com/Products/Cables/USBtoUSB.htm).

If you are interested in routing between two COM ports **on the same computer**, you could use one of these, however, it is normally much easier to do it purely in software with a serial bridge instead.

## Powerline Transceivers

The [SIG60](http://www.yamar.com/sig60.php) is an example of a powerline transceiver.

## Creating A Serial Port Bridge

There are occasions when you want or need to send serial data between two pieces of software on the computer, or between two hardware devices both connected to the computer. An example would be to unit test a PC-based serial communications protocol you have written without writing the unit-test code on the microcontroller. There are software programs that emulate a serial port bridge, but in my experience I found these are every buggy or cost money.

{{< figure src="/images/2011/09/testing-a-physical-serial-port-bridge.jpg" width="931px" caption="Testing a physical serial-port bridge, made by connecting two FTDI cable together."  >}}

You can create a rudimentary serial bridge to connect to pieces of software together by connecting two USB-to-UART (or USB-to-RS232) converters together, crossing the RX and TX lines over. Although not a very permanent solution, this is good for simple tests. The following image shows a hardware-based serial port bridge with a terminal on each end.

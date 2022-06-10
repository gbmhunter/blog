---
authors: [ "Geoffrey Hunter" ]
date: 2011-09-12
description: "A tutorial on the UART communication protocol, including types, baud rates, flow control, error checking, RS-232 and more."
draft: false
lastmod: 2022-06-09
tags: [ "UART", "communication protocol", "USART", "microcontroller", "serial", "8n1", "universal asynchronous", "receiver", "transmitter", "RX", "TX", "backfeeding", "IOFF", synchronization, parity, stop bits, start bit ]
title: "UART Communication Protocol"
type: "page"
---

## Overview

UART (_Universal Asynchronous Receiver/Transmitter_) is a lower-voltage, microcontroller friendly equivalent of the RS-232 digital data transmission protocol with origins dating back to the 1960's. It is universal in the sense the timing, voltages, flow control and error checking can be configured.

|                        |
|------------------------|-----------------------
| Drive Type             | Single-ended
| Num. Wires (excl. GND) | Commonly just 2 (TX/RX) or 4 (TX/RX and RTS/CTS)
| Duplexity              | Full
| Connection Topology    | Point-to-point
| OSI Layers             | Layers 1 (physical) and 2 (data link)


**It is commonly used today as a simple, two-way node-to-node serial communications protocol between devices on a circuit board** or possibly over a cable. Because of it's low voltage and single-ended nature, it is not very noise resilient, and is usually replaced with a more robust protocol such as [RS-232](/electronics/communication-protocols/rs-232-protocol) or [RS-485](/electronics/communication-protocols/rs-485-protocol) when communication occurs over any significant cable length or in a noisy environment.

## UART Frame Structure

UART sends data in groups of 5, 6, 7 or 8 bits at a time across the bus (typically 8, to equal a single byte) in what is called a _UART frame_. The bus idles "high" when no data is sent. To indicate the start of a frame, the transmitter drives the line low for one bit period, this is called the start bit. The receiver synchronizes it's incoming bit sampling clock with the falling edge of the start bit. The start bit lasts for one bit period, and which point the transmitter sends the bits of data by driving the line either high or low. This is then followed by an optional parity bit (which is more often than not excluded). Then this is followed by 1 or 2 stop bits.

The figure below shows what a UART frame would look like when configured in the popular '8n1' configuration (8 bits, no parity, 1 stop bit):

{{% img src="uart-example-byte-waveform-8n1.png" width="800px" caption="Drawing showing the basic frame structure of a byte sent across a UART bus in the popular '8n1' configuration (8 bits, no parity, 1 stop bit)." %}}

UART has no say in what the data means, it is up to the application code to make sense of one these bits of data mean and to group them into larger data structures.

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

Generally, if someone uses the term UART with no additional context, they are referring to the RS-232 protocol but with voltage levels between VCC and GND, typically created by a UART peripheral in a microcontroller or FPGA.

## Connectors

UART is a protocol that has no one single recognizable connector. Because it is commonly used in conjunction with RS-232 or RS-485 protocols, the D subminiature connectors are commonly associated with the UART protocol. However, because UART is a very common microcontroller peripheral and can be used for short, permanent on-PCB communications between microcontroller and 3rd party device, it is also commonly implemented without any connector at all (pin-to-pin on PCB), or is routed from microcontroller directly to 0.1" header pins for things such as debugging (a debug UART is very common on embedded devices).

WARNING: There is confusion of how to connect two RS-232 (or UART!) devices together arises when it is not terminal equipment (DTE) connected to modem equipment (DCE). In the embedded world, microcontrollers and other devices which support RS-232/UART can act either as a DTE or a DCE. **Take particular care when connecting RS-232/UART ports together on embedded devices!**

## Transmission Speeds

UART, by today's standards, is a slow transmission protocol. However, it is still fast enough for tons of applications. The commonly supported baud rate speeds are:

* 600, 1200, 3400, 4800, 9600, 14400, 19200, 28800, 38400, 56000, 57600, 115200, 128000, 256000, 460800, 921600

I have had basically no issues using speeds up to 460800 baud in embedded systems (either talking to another embedded system, or to a computer through a virtual COM port). However, 921600 baud has not worked for me in some situations.

Out of the baud rates listed above, there are three which are used more than others:

1. `9600`: Very common default baud rate for microcontroller development kits such as Arduino.
1. `57600`: Another common baud rate.
1. `115200`: Another common default baud rate, offering a 10-fold improvement in data throughput compared to `9600`. If you are looking for a default baud rate to choose for a new design, I recommend using this speed!

Some devices also support custom baud rates.

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

## Synchronization

Synchronization problems can arise if data is sent continuously (i.e. with no idle time between blocks of data) from a UART transmitter and the receiver boots up in the middle of the transmission (or otherwise gets reset or loses where it thinks it was). In this case, the receiver may not be able to correctly distinguish the start bit from any of the other bits, as the start and end bits have the same bit width as the data. The receiver may produce incorrect data or signal framing errors until there is enough idle time to "reset" it's internal state and correctly wait for the next start bit.

{{% warning %}}
Because of these synchronization issues, it's advisable to add occasional pauses (idle time) between blocks of data if they do not happen naturally. 
{{% /warning %}}

## Break Signal

The _break signal_ is not a character, but a **special signal which can be sent from transmitter to receiver to indicate an event**.

The transmitter sends a break signal by **driving it's TX line low for a period longer than one frame**. There are two types of breaks, short breaks and long breaks. A short break is when the TX line is driven low for a period of between 1 and 2 frame lengths, and a long break is when it is driven low for a period of more than 2 frame lengths.

## Higher-Level Protocols

Do you need a higher-level communication protocol that works over a UART connection? See the [SerialFiller](https://github.com/gbmhunter/SerialFiller) library on GitHub (written in C++). SerialFiller uses a publish/subscribe mechanism and works well on point-to-point serial connections such as UART.

## Backfeeding Through UART

When using UARTs on microcontrollers, be careful about _backfeeding_ (a.k.a _backpowering_) devices through the `TX` line! If a microcontroller loses it's power rails during normal operation, the `TX` line connected to the microcontrollers `RX` can keep it's `VCC` afloat by conducting through the internal ESD diodes (remember that in the idle state, the TX line is driven high).

{{% warning %}}
A common scenario for this to occur is debug UARTs, in where an FTDI cable or similar is connected to a UART port on a microcontroller for debugging. During debugging you disconnect power from the microcontroller in an attempt to reset it, only to discover it's being kept alive by the backfeeding through the FTDI's TX pin.
{{% /warning %}}

[Voltage-level translator ICs](/electronics/components/voltage-level-translation/) are one way to fix this problem. You have make sure they are of the type which make the I/O pins `\(A\)` and `\(B\)` high-impedance when there is `\(0V\)` on one or more of the `\(V_{CC}\)` pins. The below image shows how a voltage-translator IC can be used to prevent backfeeding a MCU from a debug UART:

{{% img src="voltage-translator-to-prevent-uart-backfeeding.png" width="800" caption="Schematic showing a circuit using a voltage translator IC to prevent backfeeding a microcontroller from an FTDI cable (or similar) when power (VCC) is removed." %}}

Rather than a voltage-level translating IC, a buffer IC with `\(I_{OFF}\)` functionality (this is what Texas Instruments calls a logic IC which won't backfeed current from the I/O pins into the `\(V_{CC}\)` pins when the VCC pins are at `\(0V\)`) will also work -- for example, the SN74LVC1G125 ("Single Bus Buffer Gate With 3-State Output").

## Pull-up Resistors On TX Lines

Spurious garbage can be sent along along a microcontrollers UART TX line when the microcontroller resets. When microcontrollers reset, all of their GPIO pins typically default back to high-impedance inputs. This will cause the voltage on the TX line, typically idling HIGH, to collapse and signal `LOW`. The UART receiver on the other end of the bus could interpret this as data and give to nonsensical garbage. As shown in the below image, a solution to this is to add a pull-up resistor to `\(V_{CC}\)`, which keeps the TX line HIGH when the microcontroller resets.

{{% img src="pull-up-on-uart-tx-line.png" width="500" caption="A 10kΩ pull-up resistor added to the UART TX line (TX w.r.t to the MCU) from a MCU to prevent spurious data being sent when the MCU resets or otherwise disables the UART peripheral via firmware." %}}

{{% tip %}}
Of course, you might have to apply this to the RX line also, as this is a TX line from the perspective of the driver on the other end of the bus. It all depends on whether or not the driver is expected to reset under normal operation and whether or not you can tolerate the occasional bad byte!
{{% /tip %}}

## Terminal Programs

### RealTerm (3.5/5)

Website: [http://realterm.sourceforge.net/](http://realterm.sourceforge.net/)

A easy to use and powerful terminal program for Windows. Stolen from the website, it's description is:

> a terminal program specially designed for capturing, controlling and debugging binary and other difficult data streams. It is far better for debugging comms than Hyperterminal. It has no support for dialing modems, BBS etc - that is what hyperterminal does.

It can view and send binary, hex, ASCII, ANSI, integers (both signed and unsigned, 8 or 16-bit), floats and more. Support for half-duplex communication as well as I2C! Does not lag/hang at all (including when you disable the COM port while it is still running). You can run multiple RealTerm apps at the same time, to get data from multiple UART ports simultaneously. It can add timestamps to received UART messages, which is useful for data logging.

{{% img src="realterm-window.jpg" width="620" caption="A screenshot of RealTerm in action." %}}

I have noticed a few bugs with RealTerm, especially when it comes to changing the number of rows and columns, and scrolling back through received data (the scrollback variable is buggy also).

**UPDATE 2021-05-17**: It seems like development on the SourceForge site has stopped long ago. There is a Realterm "Development Version" which can be found at <https://realterm.i2cchip.com/>, this has updates as recent as 2018.

### Terminal by Br@y (3.5/5)

Website: [https://sites.google.com/site/terminalbpp/](https://sites.google.com/site/terminalbpp/)

A simple and tidy Windows terminal program. Personally, it doesn't get the same amount of respect as RealTerm because of it's simplicity and slightly buggy nature. When decoding into hex, the program can hang if your receiving large amounts of data. It can also hang if you disable the COM port while it is still connected.

{{% img src="terminal-v1-9b-by-bray-window.jpg" width="800" caption="A screenshot of 'Terminal by Br@y' in action." %}}

### PuTTy (4/5)

Website: [http://www.chiark.greenend.org.uk/~sgtatham/putty/](http://www.chiark.greenend.org.uk/~sgtatham/putty/)

> PuTTY is a free implementation of Telnet and SSH for Windows and Unix platforms, along with an xterm terminal emulator.

If your running windows, PuTTY is a very handy application to have if you want to emulate the command-line style interface of a UNIX-like system. Although the debugging and capturing features are not as good as say, RealTerm, it offers character-by-character input and proper response to pressing 'special' keys such as enter (which RealTerm doesn't allow, instead you have to enter a string and then press send). This may sound like a very small difference, but this feature does come in useful! I find it very handy when using FreeRTOS and the CLI (command-line interface) extension, which allows you to communicate from a pc to a embedded system using a command-line style interface (as in the picture to the right).

{{% img src="putty-terminal-screenshot-with-settings-window.png" width="831" caption="A screenshot of the PuTTy application in action, along with the settings window." %}}

I have discovered one bug in PuTTY...if it receives a large number of characters all at once (which is common when printing debug messages from an embedded system, and for some reason, the string is not null-terminated, and starts printing gobble-de-gooch from random memory locations), PuTTY can freeze, and needs to be restarted. In this situation, it can also print the message "PuTTyPuTTyPuTTy" many times over across the COM port you are debugging. Weird.

{{% img src="putty-bug-when-receiving-large-num-of-chars.png" width="699" caption="PuTTY can freeze when printing a large number of random characters to it across a COM port." %}}

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

{{% img src="testing-a-physical-serial-port-bridge.jpg" width="931" caption="Testing a physical serial-port bridge, made by connecting two FTDI cable together." %}}

You can create a rudimentary serial bridge to connect to pieces of software together by connecting two USB-to-UART (or USB-to-RS232) converters together, crossing the RX and TX lines over. Although not a very permanent solution, this is good for simple tests. The following image shows a hardware-based serial port bridge with a terminal on each end.

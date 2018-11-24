---
author: gbmhunter
date: 2011-09-03 02:18:19+00:00
draft: false
title: SPI Protocol
type: page
url: /electronics/communication-protocols/spi-protocol
---

# Overview

SPI stands for _Serial Peripheral Interface_, and was initially developed by Motorola. It is **full-duplex** (data can be sent in both directions at once), and is ideally suited to sending data streams between devices. Speeds of **10MHz** or more are achievable. It is a **de-facto standard**, which means there is no governing body that defines and regulates the protocol. This means there a quite a number of protocol variants.

## Advantages  * SPI has much higher throughput compared to other board-level communication protocols (such as I2C or 1-wire), primarily because the bus lines are driven both high and low, and there is a separate wire for transmit and receive (full-duplex)  * SPI can have an arbitrary data/frame length  * Most logic analysers support SPI decoding

## Disadvantages  * When configured in the standard manner, SPI requires 1 extra control line (for the slave select signal) from the master for every extra slave added to the SPI bus. This can take up more space and I/O pins for designs with a large number of SPI devices.

# Physical Layer

SPI can either be _three wire_ (when there is only one slave and the slave does not require any signal on this line), or _four wire_ (when there are multiple slaves, and the slave select line needs to be used). For every slave there needs to be new select line, but the other three traces can be shared.

{{< figure src="/images/2011/09/typical-spi-connections.jpg" width="181px" caption="The typical SPI connections that an IC will have." caption-position="bottom" >}}

One limitation with SPI is that the master has to **initiate** all communication. This can be a problem if the slave has data for the master but the master hasn't or doesn't know when to ask for it. Designers get around this by also providing a _Data Ready_ line to the master. This is separate from the SPI interface, and usually set to trigger an **interrupt** to tell the master to request for the data.

**No specific termination** is needed on SPI connections. Long connections (many metres or more) and high data rates (>10Mhz) may require standard termination procedures to prevent reflections.

# Protocol

Many **microcontrollers** support the SPI protocol with **dedicated hardware** to perform the low-level functions associated with sending and receiving SPI data. However, SPI can also be **bit banged** (see below).

The MSB (most significant bit) is sent first, and naturally is then the first to be received. There is no pre-defined packet format, so there is no overhead. This makes SPI great for fast transmission of data streams.

Chip select normally uses inverse logic (low = chip selected). It usually is used to 'frame' a command sequence.

Because the master has to always drive the clock signal, if the slave wants to send data back to the master, the master must know about this and must have some way of knowing how many clock signals to send.

# Modes

SPI has **four** standard 'modes'. These define different polarities of the clock cycle and whether sampling is on the positive or falling edge of the clock. This is sometimes called the _SPI Clock Polarity (CPOL)_ and _SPI Clock Phase (CPHA)_.

The clock polarity (CPOL) determines whether the idle state of the clock signal is either 0 (CPOL = 0) or 1 (CPOL = 1).

The clock phase (CPHA) determines whether data is captured/sent on the rising or falling edge. **If CPHA = 0, then data is sampled on the first clock edge. If CPHA = 1, then data is sampled on the second clock edge.** This is true no matter what the clock polarity (CPOL) is set to. Note that if CPHA = 0, then data must be setup before the first clock edge.

The following table shows the naming conventions for _Microchip PIC_ or _ARM-based _microcontrollers:

<table ><tbody ><tr >
<td >**Clock Polarity (CPOL)**
</td>
<td >**Clock Phase (CPHA)**
</td>
<td >**SPI Mode**
</td></tr><tr >
<td >0
</td>
<td >1
</td>
<td >0
</td></tr><tr >
<td >0
</td>
<td >0
</td>
<td >1
</td></tr><tr >
<td >1
</td>
<td >1
</td>
<td >2
</td></tr><tr >
<td >1
</td>
<td >0
</td>
<td >3
</td></tr></tbody></table>

The standard defines these different modes to allow for greater variability in the master and slave devices that can use SPI.

**Note that many devices do not support all four SPI modes.** It is common (especially for slave devices) to only support two of the four modes.

# Timing

SPI is **inherently synchronous** (requires a clock signal). There is **no such thing as asynchronous SPI**, as there is with UART and other transmission protocols.

# Bit Banging

Bit banging (on the master device) can be **easily done** with SPI since it is synchronous and the master has full control over the clock, hence the timing can be manipulated. Care has to be taken to assert the right lines and read data before applying the next clock transition, as well as obeying any minimum/maximum time specifications for each state.

# Daisy-Chaining

SPI _daisy-chaining_ is way of **overcoming** the routing/capability issue of having many SPI slaves and therefore **many slave select lines**. ICs have to support SPI daisy-chaining with a _DOUT_ (or similar) signal before you can implement it.

The basic idea is that instead of data line being connected to every slave, the master's data line is connected to **one slave only**, and that slaves DOUT is connected to the next slaves data in, forming a _"daisy chain"_. The other difference is that a **single chip select line is routed to all slave ICs**.

The data is passed from the microcontoller to the first slave, who stores it in a **shift register**. After a number of clock cycles, the data reaches the end of it's internal shift-register, and is passed onto the next slave. The microcontroller continues passing out data until all the slaves shift-registers are full, at which point a pulse is sent down the global chip select signal, which causes the slave devices to read/execute/do whatever with the data currently in it's shift register.

Some devices that support daisy chaining are Microchips MCP42xxx digital potentiometers and Linear Technologies LED drivers.

# Point-to-Point SPI

Some slave devices only support _point-to-point_ SPI communication. This means that there can only be one master on the bus, and also only one slave (the device which supports point-to-point SPI).

The Freescale FXOS8700CQ magnetometer is one such example.

{{< figure src="/images/2011/09/fxos8700cq-freescale-magnetometer-note-supports-only-point-to-point-spi-protocol.pdf.png" width="745px" caption="The note from the Freescale FXOS8700CQ magnetometer stating that it only supports the 'point-to-point' SPI protocol." caption-position="bottom" >}}

# Similar Protocols

## Microwire (uWire)

The Microwire protocol is a subset of the SPI communication protocol, and is a trademark of National Semiconductor.

## mSPI (mini-SPI)

The mSPI bus is a modification of the SPI bus that enforces that the comms protocol always has 4-wires, no matter how many slave devices are attached. This simplifies the software needed on the slave devices. All devices share the same SS (slave select) line.

## RapidS

The RapidS term is used by [Atmel](http://www.atmel.com/) and [Adesto Technologies](http://www.adestotech.com/). It is commonly present on memory chips such as EEPROM and Flash memory ICs. The RapidS serial interface is SPI compatible for frequencies up to 33MHz. The RapidS protocol is different to the Rapid8 protocol, which is a **parallel interface**.

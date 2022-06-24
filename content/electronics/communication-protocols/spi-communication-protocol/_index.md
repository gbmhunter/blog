---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Communication Protocols ]
date: 2011-09-03
draft: false
lastmod: 2022-06-02
tags: [ electronics, communication protocols, SPI, bit-banging, MOSI, MISO, peripherals, microcontrollers, MCP4131 ]
title: SPI Communication Protocol
type: page
---

## Overview

SPI (_Serial Peripheral Interface_) is a **communication protocol commonly used to talk between microcontrollers/FPGAs and peripheral ICs on circuit boards**. The SPI protocol was initially developed by Motorola. It is **full-duplex** (data can be sent in both directions at once), and is ideally suited to sending medium-speed data streams between devices. Speeds of **10MHz** or more are achievable. It is a **de-facto standard**, which means there is no governing body that defines and regulates the protocol. This means there a quite a number of protocol variants.

{{% img src="spi-basic-master-slave-diagram.png" width="600px" caption="The basic connections needed between an SPI master and a single SPI slave." %}}

## Advantages

* SPI has much higher throughput compared to other board-level communication protocols (such as I2C or 1-wire), primarily because the bus lines are driven both high and low, and there is a separate wire for transmit and receive (full-duplex). However not as fast as protocols such as LVDS.
* SPI can have an arbitrary data/frame length.
* Most logic analysers support SPI decoding.

## Disadvantages

* When configured in the standard manner, SPI requires 1 extra control line (for the slave select signal) from the master for every extra slave added to the SPI bus. This can take up more space and I/O pins for designs with a large number of SPI devices.

## Physical Layer

SPI can either be _three wire_ (when there is only one slave and the slave does not require any signal on this line), or _four wire_ (when there are multiple slaves, and the slave select line needs to be used). For every slave there needs to be new select line, but the other three traces can be shared.

The track names are:

Name    | Function
--------|------------
CS      |
SCLK    |
MOSI    |
MISO    |

{{% img src="typical-spi-connections.jpg" width="180px" caption="The typical SPI connections that an IC will have." %}}

One limitation with SPI is that the master has to **initiate** all communication. This can be a problem if the slave has data for the master but the master hasn't or doesn't know when to ask for it. Designers get around this by also providing a _Data Ready_ line to the master. This is separate from the SPI interface, and usually set to trigger an **interrupt** to tell the master to request for the data.

**No specific termination** is needed on SPI connections. Long connections (many metres or more) and high data rates (>10Mhz) may require standard termination procedures to prevent reflections.

## Protocol

Many **microcontrollers** support the SPI protocol with **dedicated peripheral hardware** to perform the low-level functions associated with sending and receiving SPI data. However, SPI can also be **bit banged** (see below).

The MSB (most significant bit) is sent first, and naturally is then the first to be received. There is no pre-defined packet format, so there is no overhead added by the SPI protocol. This makes SPI great for fast transmission of arbitrary data streams.

Chip select normally uses inverse logic (low = chip selected). It usually is used to 'frame' a command sequence.

Because the master has to always drive the clock signal, if the slave wants to send data back to the master, the master must know about this and must have some way of knowing how many clock signals to send.

## Modes

SPI has **four** standard 'modes'. These define different polarities of the clock cycle and whether sampling is on the positive or falling edge of the clock. This is sometimes called the _SPI Clock Polarity (CPOL)_ and _SPI Clock Phase (CPHA)_.

The clock polarity (CPOL) determines whether the idle state of the clock signal is either 0 (CPOL = 0) or 1 (CPOL = 1).

The clock phase (CPHA) determines whether data is captured/sent on the rising or falling edge. **If CPHA = 0, then data is sampled on the first clock edge. If CPHA = 1, then data is sampled on the second clock edge.** This is true no matter what the clock polarity (CPOL) is set to. Note that if CPHA = 0, then data must be setup before the first clock edge.

The following table shows the naming conventions for _Microchip PIC_ or _ARM-based_ microcontrollers:

SPI Mode | Clock Polarity (CPOL) | Clock Phase (CPHA) | Which Clock Edge Is Used To Sample/Shift?
---------|-----------------------|--------------------|--------------------------------------------------------------
0        | 0                     | 0                  | Data sampled on rising edge and shifted out on falling edge.
1        | 0                     | 1                  | Data sampled on falling edge and shifted out on rising edge.
2        | 1                     | 0                  | Data sampled on falling edge and shifted out on rising edge.
3        | 1                     | 1                  | Data sampled on rising edge and shifted out on falling edge.

A common point of confusion is what clock phase (CPHA) means for data sampling/shifting for the different clock polarities. I have seen many sites and diagrams online which state that a clock phase of `0` means that data is sampled on the rising edge for 

The standard defines these different modes to allow for greater variability in the master and slave devices that can use SPI.

### What Is The Idle State?

The idle state is defined as the periods when:

* CS is high and transitioning to low at the start of a transmission
* CS is low and transitioning to high at the end of a transmission

{{% note %}}
Many devices do not support all four SPI modes. It is common (especially for slave devices) to only support two of the four modes.
{{% /note %}}

### Can A Single Master Support Multiple SPI Modes On The Same Bus?

Yes, a single master can support different SPI modes on the same bus, as long as the master can be configured to all the relevant modes (most SPI peripherals inside microcontrollers support multiple SPI modes). The SPI slaves do not care what happens on the SCLK, MOSI and MISO lines while their chip select is inactive (high). So other slave devices that use other SPI modes can be communicated with whilst the chip select is held high for all other slave devices (as per normal operation). Care must be taken to change the clock polarity to what the slave node expects before making it's chip select active.

## Timing

SPI is **inherently synchronous** (requires a clock signal). There is **no such thing as asynchronous SPI**, as there is with UART and other transmission protocols.

## Bit Banging

Bit banging (on the master device) can be **easily done** with SPI since it is synchronous and the master has full control over the clock, hence the timing can be manipulated. Care has to be taken to assert the right lines and read data before applying the next clock transition, as well as obeying any minimum/maximum time specifications for each state.

## Daisy-Chaining

SPI _daisy-chaining_ is way of **overcoming** the routing/capability issue of having many SPI slaves and therefore **many slave select lines**. ICs have to support SPI daisy-chaining with a _DOUT_ (or similar) signal before you can implement it.

The basic idea is that instead of data line being connected to every slave, the master's data line is connected to **one slave only**, and that slaves DOUT is connected to the next slaves data in, forming a _"daisy chain"_. The other difference is that a **single chip select line is routed to all slave ICs**.

The data is passed from the microcontroller to the first slave, who stores it in a **shift register**. After a number of clock cycles, the data reaches the end of it's internal shift-register, and is passed onto the next slave. The microcontroller continues passing out data until all the slaves shift-registers are full, at which point a pulse is sent down the global chip select signal, which causes the slave devices to read/execute/do whatever with the data currently in it's shift register.

Some devices that support daisy chaining are Microchips MCP42xxx digital potentiometers and Linear Technologies LED drivers.

## Point-to-Point SPI

Some slave devices only support _point-to-point_ SPI communication. This means that there can **only be one master on the bus, and also only one slave** (the device which supports point-to-point SPI). The Freescale (now NXP) `FXOS8700CQ` magnetometer is one such example.

{{% img src="fxos8700cq-freescale-magnetometer-note-supports-only-point-to-point-spi-protocol.pdf.png" width="745px" caption="The note from the Freescale FXOS8700CQ magnetometer stating that it only supports the 'point-to-point' SPI protocol[^bib-nxp-fxos8700cq-ds]." %}}

## Dedicated Chip Select Pins

Some microcontrollers have dedicated chip select pins which are connected to the SPI peripheral inside the microcontroller. This pin usually has a number of different purposes:

* Used to select a slave device for communication (only really works when the SPI bus has only 1 slave on it)
* Synchronize data frames
* Detect conflicts between multiple masters

On STM32 microcontrollers this pin is called `NSS` (which stands for _not slave select_, _not_ being because the signal is active low).

## Shared MOSI/MISO Pins

Some low-pin count packaged ICs use shared MOSI/MISO lines. One such example is some of the DPOTs in the Microchip MCP4XXX family. The 8-pin potentiometer variants such as the MCP4131 contain a single MOSI/MISO pin (called SDI/SDO). This obviously prevents data from being transmitted in both directions at the same time. If connecting such a device up to a normal hardware SPI peripheral, a resistor is needed to prevent driver contention (as shown in the below image) when the MCP4131 sends data back to the microcontroller. If you are bit-banging the SPI communications, you can smartly turn the host controller output into an input at the right clock edge to receive data and eliminate the need for the resistor.

{{% img src="microchip-mcp41x1-dpot-spi-connections.png" width="600px" caption="Schematics from the MCP4XXX DPOT datasheet showing to connect the shared MOSI/MISO pin (called SDI/SDO) to a SPI bus and SPI host[^bib-microchip-mcp4xxxx-dpot-ds]." %}}

The datasheet says exactly when the SDI will be turned into an SDO and data sent back:

> The 8-lead Single Potentiometer devices are pin limited so the SDO pin is multiplexed with the SDI pin
(SDI/SDO pin). After the Address/Command (first 6-bits) are received, If a valid Read command has been
requested, the SDO pin starts driving the requested read data onto the SDI/SDO pin[^bib-microchip-mcp4xxxx-dpot-ds].

## Similar Protocols

### Microwire (uWire)

The Microwire protocol is older than the SPI protocol, and began life as a protocol used by National Semiconductors in their COPS processor family[^bib-scienceprog-microwire-compared]. It is generally equivalent to SPI when `CPOL = 0` and `CPHA = 0`[^bib-microchip-forums-spi-3-wire-microwire]. The wires are called `SO`, `SI` and `SK`[^bib-ti-an-452-microwire].

### mSPI (mini-SPI)

The mSPI bus is a modification of the SPI bus that enforces that the comms protocol always has 4-wires, no matter how many slave devices are attached. This simplifies the software needed on the slave devices. All devices share the same SS (slave select) line.

### RapidS

The RapidS term is used by [Atmel](http://www.atmel.com/) and [Adesto Technologies](http://www.adestotech.com/). It is commonly present on memory chips such as EEPROM and Flash memory ICs. The RapidS serial interface is SPI compatible for frequencies up to 33MHz. The RapidS protocol is different to the Rapid8 protocol, which is a **parallel interface**.

## References

[^bib-microchip-mcp4xxxx-dpot-ds]: Microchip (2008). _Microchip MCP413X/415X/423X/425X: 7/8-Bit Single/Dual SPI Digital POT with Volatile Memory (datasheet)_. Retrieved 2022-06-02, from https://ww1.microchip.com/downloads/aemDocuments/documents/OTH/ProductDocuments/DataSheets/22060b.pdf.
[^bib-nxp-fxos8700cq-ds]: NXP (2017, Apr 25). _FXOS8700CQ 6-axis sensor with integrated linear accelerometer and magnetometer_. Retrieved 2022-06-02, from https://www.nxp.com/docs/en/data-sheet/FXOS8700CQ.pdf.
[^bib-microchip-forums-spi-3-wire-microwire]: Microchip Forum (2006, Nov 13). _Differences between SPI, 3-Wire and Microwire_. Retrieved 2022-06-02, from https://www.microchip.com/forums/m202051.aspx.
[^bib-scienceprog-microwire-compared]: ScienceProg. _Microwire compared to SPI and I2C_. Retrieved 2022-06-02, from https://scienceprog.com/microwire-compared-to-spi-and-i2c/.
[^bib-ti-an-452-microwire]: Texas Instruments (1992, Jan). _AN-452: MICROWIRE Serial Interface_. Retrieved 2022-06-02, from https://www.ti.com/lit/an/snoa743/snoa743.pdf.

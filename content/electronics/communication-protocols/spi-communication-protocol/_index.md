---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Communication Protocols ]
date: 2011-09-03
draft: false
lastmod: 2024-01-15
tags: [ electronics, communication protocols, SPI, bit-banging, MOSI, MISO, peripherals, microcontrollers, MCP4131, Arduino, controller, peripheral, master, slave, OSHWA, execute-in-place, XIP, WS2812, RGB ]
title: SPI Communication Protocol
type: page
---

## Overview

SPI (_Serial Peripheral Interface_) is a **communication protocol commonly used to talk between microcontrollers/FPGAs and peripheral ICs on circuit boards**. The SPI protocol was initially developed by Motorola. It is **full-duplex** (data can be sent in both directions at once), and is ideally suited to sending medium-speed data streams (typical rates up to 10-24Mbps[^bib-totalphase-single-dual-quad-spi]) between devices on the same PCB. It is a **de-facto standard**, which means there is no governing body that defines and regulates the protocol. This means there a quite a number of protocol variants.

{{% figure ref="fig-spi-basic-master-slave-diagram" src="_assets/spi-basic-master-slave-diagram.webp" width="600px" caption="The basic connections needed between an SPI master and a single SPI slave." %}}

## Advantages

* SPI has much higher throughput compared to other board-level communication protocols (such as I2C or 1-wire), primarily because the bus lines are driven both high and low, and there is a separate wire for transmit and receive (full-duplex). However not as fast as protocols such as LVDS.
* SPI can have an arbitrary data/frame length.
* Most logic analysers support SPI decoding.

## Disadvantages

* When configured in the standard manner, SPI requires 1 extra control line (for the slave select signal) from the master for every extra slave added to the SPI bus. This can take up more space and I/O pins for designs with a large number of SPI devices.

## Physical Layer

SPI consists of a basis of three wires (SCLK, MOSI and MISO), plus one chip select (nCS) wire per slave. In the special case of only one slave, the chip select line can be dropped and the pin pulled permanently low on the slave.

The purpose of these connections is:

<table>
  <thead>
    <tr><th style="width:100px">Name</th>   <th>Function</th></tr>
  </thead>
  <tbody>
    <tr><td>nCS</td>    <td><i>Chip select</i>, a.k.a. <i>slave select</i> (nSS). This is driven low (hence the `n`) by the master to select a slave. There is a separate chip select line going from the master to each slave.</td></tr>
    <tr><td>SCLK</td>   <td><i>Clock</i>. Driven by the master, this provides the clock signal to the slaves to clock data in and out with. The exact polarity and edges that are used depend on the values of CPOL and CPHA.</td></tr>
    <tr><td>MOSI</td>   <td><i>Master out, slave in</i>. A.k.a. <i>main out, subnode in</i>. The master drives the line and provides data to the slaves. Only the slave with nCS asserted (low) listens to the data.</td></tr>
    <tr><td>MISO</td>   <td><i>Master in, slave out</i>. A.k.a. <i>main in, subnode out</i>. The selected slave can drive this line to send data to the master.</td></tr>
  </tbody>
</table>

{{% figure src="_assets/spi-basic-master-slave-diagram.webp" width="600px" caption="The basic connections needed between an SPI master and a single SPI slave." %}}

One limitation with SPI is that the master has to **initiate** all communication. This can be a problem if the slave has data for the master but the master hasn't or doesn't know when to ask for it. If continuous polling is not feasible, designers get around this by also providing a _Data Ready_ line to the master. This is separate from the SPI interface, and usually set to trigger an **interrupt** to tell the master to request for the data across the SPI interface.

**No specific termination** is needed on SPI connections. Long connections (many metres or more) and high data rates (>10Mhz) may require standard termination procedures to prevent reflections.

Arduino has moved away from master/slave terminology (supported by an [OSHWA resolution](https://www.oshwa.org/a-resolution-to-redefine-spi-signal-names)) and now uses the following _controller/peripheral_ terminology for SPI[^bib-arduino-spi]:

Old (Master/Slave)          | New (Controller/Peripheral)
----------------------------|---------
SS (Slave Select)           | CS (Chip Select)
SCLK (Serial Clock)         | SCK (Serial Clock)
MOSI (Master Out, Slave In) | COPI (Controller Out, Peripheral In)
MISO (Master In, Slave Out) | CIPO (Controller In, Peripheral Out)

## Protocol

Many **microcontrollers** support the SPI protocol with **dedicated peripheral hardware** to perform the low-level functions associated with sending and receiving SPI data. However, SPI can also be **bit banged** (see below).

The MSB (most significant bit) is typically sent first, and naturally is then the first to be received. However this is not specified by the standard, and occasionally you will encounter SPI devices that expect data LSB first. There is no pre-defined packet format, so there is no overhead added by the SPI protocol. This makes SPI great for fast transmission of arbitrary data streams, but relies on application specific interpretation of the raw bytes.

Chip select normally uses inverse logic (low = chip selected). It usually is used to 'frame' a command sequence.

Because the master has to always drive the clock signal, if the slave wants to send data back to the master, the master must know about this and must have some way of knowing how many clock signals to send.

## Modes

SPI has **four** standard 'modes'. These define different polarities of the clock cycle and whether sampling is on the positive or falling edge of the clock. This is sometimes called the _SPI Clock Polarity (CPOL)_ and _SPI Clock Phase (CPHA)_.

The clock polarity (CPOL) determines whether the idle state of the clock signal is either 0 (CPOL = 0) or 1 (CPOL = 1).

The clock phase (CPHA) determines whether data is captured/sent on the rising or falling edge. **If CPHA = 0, then data is sampled on the first clock edge. If CPHA = 1, then data is sampled on the second clock edge.** This is true no matter what the clock polarity (CPOL) is set to, and applies both to the master and all the slaves. Note that if CPHA = 0, then data must be setup before the first clock edge. If CPHA = 1, then the devices have the initial clock edge to shift data onto the lines, in preparation for sampling on the second clock edge.

The following table shows the naming conventions for _Microchip PIC_ or _ARM-based_ microcontrollers, as well as what is used for the Arduino SPI API[^bib-arduino-spi]:

SPI Mode | Clock Polarity (CPOL) | Clock Phase (CPHA) | Which Clock Edge Is Used To Sample/Shift?
---------|-----------------------|--------------------|--------------------------------------------------------------
0        | 0                     | 0                  | Data sampled on rising edge and shifted out on falling edge.
1        | 0                     | 1                  | Data sampled on falling edge and shifted out on rising edge.
2        | 1                     | 0                  | Data sampled on falling edge and shifted out on rising edge.
3        | 1                     | 1                  | Data sampled on rising edge and shifted out on falling edge.

A common point of confusion is what clock phase (CPHA) means for data sampling/shifting for the different clock polarities. I have seen many sites and diagrams online which state that a clock phase CPHA of `0` means that data is sampled on the rising edge (this is only true is CPOL is also 0).

The following diagram gives a graphical representation of the different CPOL and CPHA settings. Bits on the MOSI and MISO lines are always sampled half-way between the transitions. For CPHA=0 this means data is sampled on clock edges 1, 3, 5, e.t.c and for CPHA=1 data is sampled on clock edges 2, 4, 6, e.t.c.

{{% figure ref="fig-cpol-and-cpha-diagram" src="_assets/cpol-and-cpha-diagram.webp" width="800px" caption="Diagram showing the different behaviours for different CPOL and CPHA settings." %}}

Below shows an example of a single-byte transfer with CPOL=0 and CPHA=0. The master sends the data `0xA1` and the slave sends `0x75`. Data is sampled at the dotted red vertical lines.

{{% figure ref="fig-example-transmission-cpol0-cpha0" src="_assets/example-transmission-cpol0-cpha0.webp" width="800px" caption="Example single-byte transfer with CPOL=0 and CPHA=0 (Mode 0). Master sends 0xA1, slave sends 0x75. Data is sampled at the dotted red vertical lines." %}}

And now for comparison, let's see what it would look like if we transmitted the same data but with CPOL=1 and CPHA=1 (Mode 3):

{{% figure ref="fig-example-transmission-cpol1-cpha1" src="_assets/example-transmission-cpol1-cpha1.webp" width="800px" caption="Example single-byte transfer with CPOL=1 and CPHA=1 (Mode 3). Master sends 0xA1, slave sends 0x75. Data is sampled at the dotted red vertical lines." %}}

The standard defines these different modes to allow for greater variability in the master and slave devices that can use SPI.

{{% aside type="note" %}}
Many devices do not support all four SPI modes. It is common (especially for slave devices) to only support the two modes CPOL=0, CPHA=0 and CPOL=1, CPHA=1.
{{% /aside %}}

To give you an example of what it means for firmware, below is a screenshot of the SPI modes table from the [Microchip SAM D21 MCU datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/SAM-D21-DA1-Family-Data-Sheet-DS40001882H.pdf). We are lucky in this case, the SAMD21 microcontroller supports all four modes of operation. 

{{% figure ref="fig-microchip-sam-d21-spi-transfer-modes-table" src="_assets/microchip-sam-d21-spi-transfer-modes-table.png" width="800px" caption="Screenshot of the SPI modes table from the Microchip SAM D21 datasheet[^bib-microchip-samd21-datasheet]." %}}

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

{{% figure ref="fig-fxos8700cq-freescale-magnetometer-note-supports-only-point-to-point-spi-protocol" src="_assets/fxos8700cq-freescale-magnetometer-note-supports-only-point-to-point-spi-protocol.png" width="745px" caption="The note from the Freescale FXOS8700CQ magnetometer stating that it only supports the 'point-to-point' SPI protocol[^bib-nxp-fxos8700cq-ds]." %}}

## Dedicated Chip Select Pins

Some microcontrollers have dedicated chip select pins which are connected to the SPI peripheral inside the microcontroller. This pin usually has a number of different purposes:

* Used to select a slave device for communication (only really works when the SPI bus has only 1 slave on it)
* Synchronize data frames
* Detect conflicts between multiple masters

On STM32 microcontrollers this pin is called `NSS` (which stands for _not slave select_, _not_ being because the signal is active low).

## Shared MOSI/MISO Pins

Some low-pin count packaged ICs use shared MOSI/MISO lines. One such example is some of the DPOTs in the Microchip MCP4XXX family. The 8-pin potentiometer variants such as the MCP4131 contain a single MOSI/MISO pin (called SDI/SDO). This obviously prevents data from being transmitted in both directions at the same time. If connecting such a device up to a normal hardware SPI peripheral, a resistor is needed to prevent driver contention (as shown in the below image) when the MCP4131 sends data back to the microcontroller. If you are bit-banging the SPI communications, you can smartly turn the host controller output into an input at the right clock edge to receive data and eliminate the need for the resistor.

{{% figure fig="fig-microchip-mcp41x1-dpot-spi-connections" src="_assets/microchip-mcp41x1-dpot-spi-connections.png" width="600px" caption="Schematics from the MCP4XXX DPOT datasheet showing to connect the shared MOSI/MISO pin (called SDI/SDO) to a SPI bus and SPI host[^bib-microchip-mcp4xxxx-dpot-ds]." %}}

The datasheet says exactly when the SDI will be turned into an SDO and data sent back:

> The 8-lead Single Potentiometer devices are pin limited so the SDO pin is multiplexed with the SDI pin
(SDI/SDO pin). After the Address/Command (first 6-bits) are received, If a valid Read command has been
requested, the SDO pin starts driving the requested read data onto the SDI/SDO pin[^bib-microchip-mcp4xxxx-dpot-ds].

## Dual And Quad SPI

Dual and Quad SPI (QSPI) are extensions on the basic SPI bus which allow for faster communication rates. Dual SPI replaces the `MOSI` and `MISO` lines with bi-directional `IO0` and `IO1` lines. This allows twice the data transfer rate in any one direction at a time, however, it now makes the protocol half-duplex (it is now unable to transfer data in both directions at the same time).

{{% figure ref="fig-dual-spi-diagram" src="_assets/dual-spi-diagram.webp" width="500px" caption="A Dual SPI bus, where MOSI and MISO have been replaced with bi-directional IO0 and IO1." %}}

QSPI takes this idea even further and adds two additional bi-directional data lines, `IO2` and `IO3`, as shown in the following diagram:

{{% figure ref="fig-quad-spi-diagram" src="_assets/quad-spi-diagram.webp" width="500px" caption="A Quad SPI (QSPI) bus, which is like a Dual SPI bus but with two additional data lines, IO2 and IO3." %}}

With the four data lines in QSPI, **a single byte can be sent in two clock cycles** (4 bits per clock cycle). QSPI is commonly used for external NOR flash memory. Examples include the [Cypress S79FS01GS 1 Gbit, 1.8 V Dual-Quad Serial Peripheral Interface with Multi-I/O Flash](https://www.infineon.com/dgdl/Infineon-S79FS01GS_1_Gbit_1.8_V_Dual-Quad_Serial_Peripheral_Interface_with_Multi-I_O_Flash-DataSheet-v03_00-EN.pdf?fileId=8ac78c8c7d0d8da4017d0ee7dd5970c3). Chips that support QSPI usually also support Dual SPI.

{{% figure ref="fig-infineon-s25fs128s-qspi-flash-connection-diagram" src="_assets/infineon-s25fs128s-qspi-flash-connection-diagram.png" width="500px" caption="Wiring diagram for the Infineon S25FS128S QSPI flash IC[^bib-infineon-s25fs128s-ds]." %}}

## Execute-In-Place (XIP)

Many QSPI flash ICs support _execute-in-place_ (XIP). This is when a section of the CPUs main memory is mapped to the external flash memory. The CPU is unaware that this section of memory is off-chip, and the fetching process happens automatically in the background over a QSPI interface.

## Firmware

The Arduino platform provides a consistent API for accessing peripherals on an SPI bus. The API is accessed by including `SPI.h` in your `.cpp` file. If the microcontroller has only one SPI bus, it can usually be accessed via the global `SPI`.

```c++
#include <SPI.h>

const int slavePin = 20;

int main() {
    uint8_t val1, val2;

    // Begin SPI transaction, setting clock speed to 1MHz, most significant bit first (typical), and
    // SPI Mode 0 (CPOL=0, CPHA=0).
    SPI.beginTransaction(SPISettings(1000000, MSBFIRST, SPI_MODE0));

    // Assert the slaves chip select (drive low)
    digitalWrite(slavePin, LOW);

    // Two bytes transferred across, and read the two bytes sent back to us
    val1 = SPI.transfer(0xA1);
    val2 = SPI.transfer(0x07);

    // De-assert the chip select
    digitalWrite(slavePin, HIGH);

    // End transaction, SPI bus is now free to be used by other devices
    SPI.endTransaction();
}

```

## Non-Standard Uses

### WS2812 RGB LEDs

Microcontroller SPI peripherals are commonly used to generate the data to talk to long strings of WS2812 RGB LEDs. The WS2812 RGB LEDs feature a custom 1-wire communications protocol. There is no clock line, only a single data line. Each bit is a fixed width, and a 0 is communicated with the line staying HIGH for a particular amount of time during the bit, and then transitioning low. A 1 is communicated by the voltage staying HIGH for slightly longer during the bit before transitioning to 0. This "return to zero (RTZ)" scheme allows the clock to be easily recovered from the data.

{{% figure ref="fig-ws2812b-comms-protocol-info" src="_assets/ws2812b-comms-protocol-info.webp" width="900px" caption="Data showing how the WS2812 RGB LED communication protocol relies of the timings of HIGH and LOW parts of a bit to determine a 0 or 1[^worldsemi-ws2812b-rgb-led-ds]." %}}

Depending on the MCU, generating these timings by "bit-banging" could be difficult because of the fast baud rate and HIGH/LOW timing requirements. However, an SPI peripheral running at a faster bit rate can be used to generate the data relatively easily. One option is to set the SPI speed so there are three SPI bits for every WS2812 bit. The SPI bit period can be set to `0.4us`, so that three bits takes `1.2us`. Then you can send the SPI bit pattern `100` for a WS2812 `0` and a `110` for a WS2812 `1`[^controllers-tech-ws2812-leds-using-spi].

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
[^bib-arduino-spi]: Arduino. _Arduino & Serial Peripheral Interface (SPI)_. Retrieved 2022-06-25, from https://docs.arduino.cc/learn/communication/spi.
[^bib-totalphase-single-dual-quad-spi]: Kathleen Chan. _What are the Differences of Single vs Dual vs Quad SPI?_. TotalPhase. Retrieved 2022-06-25, from https://www.totalphase.com/blog/2020/05/what-are-the-differences-of-single-vs-dual-vs-quad-spi/.
[^bib-infineon-s25fs128s-ds]: Infineon (2019, Nov 22). _S25FS128S/S25FS256S: 1.8 V, Serial Peripheral Interface with Multi-I/O, MirrorBit® Non-Volatile Flash (datasheet)_. Retrieved 2022-06-26, from https://www.infineon.com/dgdl/Infineon-S25FS128S_S25FS256S_1.8_V_Serial_Peripheral_Interface_with_Multi-I_O_MirrorBit(R)_Non-Volatile_Flash-DataSheet-v14_00-EN.pdf?fileId=8ac78c8c7d0d8da4017d0ed6b5ab5758. 
[^bib-microchip-samd21-datasheet]: Microchip (2021). _SAM D21/DA1 Family: Low-Power, 32-bit Cortex-M0+ MCU with Advanced Analog and PWM (datasheet)_. Retrieved 2022-10-10, from https://ww1.microchip.com/downloads/en/DeviceDoc/SAM-D21-DA1-Family-Data-Sheet-DS40001882H.pdf.
[^worldsemi-ws2812b-rgb-led-ds]: Worldsemi. _WS2812B - Intelligent control LED integrated light source_ [datasheet]. Adafruit. Retrieved 2024-01-15, from https://cdn-shop.adafruit.com/datasheets/WS2812B.pdf.
[^controllers-tech-ws2812-leds-using-spi]: Controllerstech. _WS2812 LEDs using SPI_. Retrieved 2024-01-15, from https://controllerstech.com/ws2812-leds-using-spi/.
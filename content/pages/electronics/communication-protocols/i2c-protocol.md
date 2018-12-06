---
author: gbmhunter
date: 2011-09-03 02:17:06+00:00
draft: false
title: I2C Protocol
type: page
url: /electronics/communication-protocols/i2c-protocol
---

# Overview

The I²C bus is a communication protocol commonly used for PCB level transmissions between IC's and microcontrollers. It is a half-duplex synchronous protocol which requires 2 non-power-related wires (4 if you include power and ground). It uses device addressing to indicate the recipient of the data. It is commonly used for sending small packets of information to IC's (such as configuration settings, or a sensor value), while [SPI](http://localhost/?q=node/135) is used for more data intensive communication (due to its full-duplex and push-pull driver operation). The I2C protocol does not define the semantics (the meaning of the data). I2C can support multiple masters through software protocols.

{{< figure src="/images/2011/09/i2c-logo.gif" width="200px" caption="The I2C logo."  >}}

# Typical Electrical Specs

<table>
    <thead>
        <tr>
            <th>Specification</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Bus Capacitive Load</td>
            <td>400pF max (this limits cable length and fan-out)</td>
        </tr>
        <tr>
            <td>Signal Rise Times</td>
            <td>1000ns max (standard mode), 300ns max (fast-mode)</td>
        </tr>
        <tr>
            <td>Maximum Pull-down Current</td>
            <td>3mA (this limits the minimum pull-up resistance)</td>
        </tr>
        <tr>
            <td>Signal Naming Conventions</td>
            <td>SCK (clock), SDA (data)</td>
        </tr>
    </tbody>
</table>

# Signal Names

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Flow</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>SCL (sometimes called SCK)</td>
            <td>Master drives, slaves listen</td>
            <td>Clock</td>
        </tr>
        <tr >
            <td>SDA</td>
            <td>Bi-directional</td>
            <td>Data</td>
        </tr>
    </tbody>
</table>

# Pull-Up Resistors

The I²C bus uses open-drain drivers to allow for **compatibility** between chips that run of different voltages, bus arbitration, and hot-swapping. Thus pull-up resistors are essential for the bus to work. 

{{< figure src="/images/2011/09/i2c-pull-up-resistors.png" width="488px" caption="I2C pull-up resistors."  >}}

**The value of the resistor determines the maximum speed of the bus (the lower the resistance, the faster the bus can operate).** The resistance is limited at the lower end by the maximum bus current that the I²C chips can supply, and maximum power consumption if relevant. The I2C specification states that an I2C compliant device must be able to sink at least 3mA from the I2C bus lines and have a logic low voltage of no higher than `\(V_{OL} = 0.4V\)` while doing this. Using this information, it is easy to come up with the equation for the minimum allowed resistance:

<div>$$ R_{min} = \frac{V_{CC} - V_{OL}}{I_{OL}} $$</div>

<p class="centered">
where:<br>
\( V_{CC} \) is the supply voltage that one side of the pull-up resistor is connected to, in Volts<br>
\( V_{OL} \) is the maximum voltage allowed on the bus while the device is sinking \) I_{OL} \), in Volts<br>
\( I_{OL} \) is the maximum current the I2C device pulling the bus line low is required to sink (typ. 3mA), in Amps<br>
</p>

Given the fixed known values, this can be simplified to:

<div>$$ R_{P, min} = \frac{V_{CC} - 0.4V}{3mA} $$</div>

Because of I2C's open-collector topology, it is **solely the pull-up resistors duty to pull the line high** when a device releases it (i.e. stops pulling it to ground). The pull-up resistor, along with the bus capacitance `\( C_{BUS} \)`, creates a time constant which slows the rise time of the bus voltage. The I2C specification states that a voltage above `\( V_{IH} = 0.7V_{CC} \)` must be considered logic high by all devices.

<div>$$ R_{P, max} = \frac{T_R}{0.847298C_{BUS}} $$</div>

<p class="centered">
    where:<br>
    \( T_R \) is the maximum allowed rise time as specified by the I2C specification for a particular mode, in seconds<br>
    \( C_{BUS} \) is the total bus capacitance, in Farads<br>
</p>

The maximum rise time `\( T_R \)` is specified by the I2C standard for each I2C mode as shown in the table below:

<table>
    <thead>
        <tr>
            <th>I2C Mode</th>
            <th>Maximum Rise Time \( T_R \)</th>
        </tr>
    </thead>
    <tbody >
        <tr >
            <td>Standard</td>
            <td>1000ns</td>
        </tr>
        <tr>
            <td>Fast Mode</td>
            <td>300ns</td>
        </tr>
    </tbody>
</table>

Note that this is not the only thing which limits the maximum pull-up resistance, the **high-level input current**, `\( I_{IH} \)` also puts a restriction on the maximum resistance (it is usually higher than that imposed by the maximum rise time, and therefore rarely considered). The high-level input current is due to leakage current through the digital input pins connected to the bus, which creates a constant voltage drop over the pull-up resistors (remember, it's the resistors which are pulling the bus line high).

Typical pull-up resistor values are 10kΩ for up to a 100kHz bud rate, and 1kΩ for up to a 400kHz baud rate. External pull-up resistors should be used as normally, the internal pull-up of microcontroller ports and other I2C compliant devices have too high a resistance (100kΩ-1MΩ).

A **gotcha** during PCB design is to unintentionally **add multiple pull-up resistors to each bus line**. Maybe you added pull-up resistors to every I2C slave device, and then connected them to the same bus? Maybe you designed a plug-in board which had an I2C slave on it, and added resistors to that too? In any case, **try and make sure there is only one set of pull-up resistors**, associated with the I2C bus master. If you do need to have multiple resistors, make sure their **combined equivalent resistance does not violate** the I2C specifications.

# Transmission Speeds

## Overview

The data on an I2C bus can be transmitted at different rates, depending on what modes both the transmitter and receiver support. The following table outline the modes and the maximum speeds at which data can be transmitted on them. Note that because the data is clocked, there is almost no minimum speed (unless the device implements some sort of time-out feature).

<table>
    <thead>
        <tr>
            <th>I2C Mode</th>
            <th>Maximum Speed (Kbps)</th>
        </tr>
    </thead>
    <tbody>        
        <tr>
            <td>Standard</td>
            <td>100</td>
        </tr>
        <tr>
            <td>Fast-mode (Fm)</td>
            <td>400</td>
        </tr>
        <tr>
            <td>Fast-mode Plus (Fm+)</td>
            <td>1000</td>
        </tr>
        <tr>
            <td>High-speed (HS)</td>
            <td>3400</td>
        </tr>
    </tbody>
</table>

## Fast Mode (Fm)

Fast mode is a mode of operation for the I2C bus that allows devices to communicate at speeds of up to 400kbps. It is supported by a great number of I2C devices.

## Fast Mode Plus (Fm+)

Fast mode plus (Fm+) is an extension of I2C Fast mode which allows devices to communicate at speeds of up to 1Mbps. It was introduced by Phillips Semiconductors (which is now NXP) in April 2006. It is occasionally used for I2C devices which require high data throughput.

## High-Speed

The high-speed mode allows for communcation rates of up to 3.4Mbps, which makes it the fastest I2C mode available. It is an **officially supported** mode of operation, however, not many I2C devices support this mode of operation (the competing [SPI communcation protocol](/electronics/communication-protocols/spi-protocol) seems to be the preferred way of doing things at >1Mbps). One of the key differences between normal I2C communcations and high-speed mode is the **current sourcing** capabilities of the master device. This allows the master to inject current onto the I2C lines to pull-them high faster than what pull-up resistors on their own would allow.

Also, the clock signal has a high to low ratio of 1:2, which is different the the ratio of 1:1 for all other modes.

# I²C Bus Protocols And Variants

There are variants on the I2C bus, defined and implemented by various manufactures. These include:

* SMBus - The System Management Bus. Only works with a single slave. Uses less current, but operates at a lower speed.
* PMBus - Extends the SMBus functionality
* IPMB - The Intelligent Platform Management Bus
* TWI - The Two-Wire Interface. A name used by some vendors (including ATMEL), to describe a I2c bus (exactly identical).
* ACCESS.bus
* DDC, E-DDC - (Enhanced) Display Data Channel, used by the HDMI protocol send data from the sink to the source about what resolutions and frame rates it supports. The HDMI specification says it must support standard rate I2C (100kbit/s), with optional support for fast mode (400kbit/s).

# I2C Applications

* Automotive (although the CAN/LIN bus is more popular in automotive environments due to the higher noise resistance)
* Consumer
* Industrial (ethernet is also popular for industrial control)
* Mobile
* Telecom/networking
* Radio/T.V.

{{< figure src="/images/2011/09/typical-application-schematic-for-i2c-io-expander.png" width="411px" caption="A typical application schematic for an I2C I/O expander."  >}}

# Addressing

All I2C slave devices must have an address. This address is used by the master to select which device to talk with. All addresses are 7 bits long (EDIT April 2016, this is no longer true, see the [10-bit Addressing section](/electronics/communication-protocols/i2c-protocol#10-bit-addressing)), and are left shifted by one and packed into the first byte which is sent across the I2C bus by the master (the final bit, bit 0, of the first byte, is used to signal whether a read or write operation is about to take place).

## Multiple ICs, Same Address?

Connecting two identical devices (e.g. lets say you have two temperature sensors) onto the same I2C bus, both with the same pre-programmed I2C address means that that the master cannot address them individually and functionality is serverly reduced. To overcome this, many I2C slave ICs also come with a few address pins. These address pins are digital inputs and control what I2C address the slave will respond to. A device with two address pins allows the designer to connect up to four identical ICs to the same I2C bus by connecting the address pins to different combinations of Vcc and GND.

Newer pin-constrained I2C slave devices allow you to connect the address pins up to SCL and SDA to further increase the number of assignable addresses. With two address pins, and the possibility of connecting each up to either `\(V_{CC}\)`, GND, SCL or SDA, gives a total of 16 different I2C addresses.

{{< figure src="/images/2011/09/i2c-slave-address-pins-logic-table-with-scl-sda-ability-ti-ina226.png" width="826px" caption="The logic table (truth table) of the I2C address pins on the TI INA226 IC. Notice how you can connect the address pins up to SCL or SDA as well as the standard VS and GND, to give a total of 16 possible I2C addresses."  >}}

## Reserved I2C Addresses

The I2C specification reserves some addresses for special purposes. Because of these reserved addresses, only 112 addresses are available to I2C devices using the 7-bit address scheme. Do not set your device to use these addresses listed below.

<table>
    <thead>
        <tr>
            <th>Reserved Address</th>
            <th>Description</th>
        </tr>
    </thead>
<tbody>
<tr >
<td >0000000 0
</td>
<td >General call.
</td></tr><tr >
<td >0000000 1
</td>
<td >Start byte.
</td></tr><tr >
<td >0000001 x
</td>
<td >CBUS addresses.
</td></tr><tr >
<td >0000010 x
</td>
<td >Reserved for different bus formats.
</td></tr><tr >
<td >0000011 x
</td>
<td >Reserved for future purposes.
</td></tr><tr >
<td >00001xx x
</td>
<td >High-speed master code.
</td></tr><tr >
<td >11110xx x
</td>
<td >10-bit slave addressing.
</td></tr><tr >
<td >11111xx x
</td>
<td >Reserved for future purposes.
</td></tr></tbody></table>

## General Call

0000000(0) is the I2C address for a general call. It is used by the **master to address all the slaves on an I2C bus at once**. The second byte contains the command the master wishes to send all the slaves. These commands, as they are generic, are also specified as part of the I2C protocol.

## Start Byte

000000(1) is the I2C address for a **start byte**. The start byte was added to the I2C specification to allow microcontrollers without dedicated I2C peripherals to use the I2C bus without consuming too much power when having to poll the I2C lines at a high speed to detect the start of a transmission (a technique referred to as bit banging). Instead, the microcontroller only has to detect one of the seven 0's in the start byte at a slower polling speed, and then switch to a high rate for the rest of the transmission. The master transmits a start condition, the start byte, a **dummy acknowledge pulse**, a repeated start condition, and then the actual transmission.

## CBUS

0000001(x) is the I2C address reserved for CBUS addresses. CBUS is a three-wire bus with a different transmission format to I2C, and is used in home automation products. This reserved address allows CBUS receivers to be connected to I2C buses. I2C devices should ignore any messages sent to this address.

CBUS addressing over I2C is very uncommon.

## 10-bit Addressing

Due to the rise in popularity of the I2C protocol and the limited amount of addresses available with the original 7-bit addressing scheme (leading to address clashes), a 10-bit addressing scheme was introduced. 10-bit addressing gives an additional 1024 unique addresses.

The 10-bit addressing scheme involves two address bytes (instead of just one). The first byte includes the bits 11110 (in bit positions 7:3) which is a _reserved code_ to indicate that a 10-bit address follows. The actual 10-bit address is sent in bits 2:1 of the first address byte (the MSB) and bits 7:0 of the second address byte (LSB).

{{< figure src="/images/2011/09/i2c-10-bit-addressing-scheme-bit-pattern-of-address-bytes-1.gif" width="1023px" caption="The bit pattern of the two address bytes in the I2C 10-bit addressing scheme. Image from http://www.i2c-bus.org/."  >}}

Bit 0 of the first address byte is the read/not-write (RnW) bit. **Note that when using the 10-bit addressing scheme, this must be set to 0. **Thus, to perform a read operation, a _combined transfer_ must be used. In a _combined transfer_, the above two bytes are sent with the RnW bit set to 0, then a repeated start, then the first address byte again, but with the RnW bit set to 1. A read operation then may be performed as usual.

The 10-bit addressing scheme has been to designed so that it can work on a bus alongside the 7-bit addressing scheme.

# Transmission Distances And Buffer's

{{< figure src="/images/2011/09/i2c-buffer-ic-example.jpg" width="800px" caption="An example from a NXP application note showing how their P82B96 I2C-bus buffering IC can utilise buffering and twisted pairs to increase the I2C communication distance."  >}}

If you are following the I2C spec, the transmission distance is usually limited to a few metres due the max line capacitance rated at 400pF. Speaking from personal experience, when trying to get I2C to work through long cables, cross-talk is usually the problem which stops the communications from working. The cross-capacitance between the SCL and SDA lines results in the signals mixing together, and often your start condition won't work because the SDA line being pulled low will couple into the SCL and pull that low too, invalidating the transmission. Slowing down the transition speeds could help this (aka drive strength), but the rise /fall times is typically limited to a maximum of 300ns.

The picture below shows how cross-coupling can introduce noise onto the SDA and SCL lines when using long cables. This shows SCL (yellow) and SDA (blue) over an 8m ethernet cable.

{{< figure src="/images/2011/09/i2c-noise-from-long-cable.jpg" width="387px" caption="The cross-talk noise that occurs on long I2C transmission lines. This shows SCL (yellow) and SDA (blue) over a 20m ethernet cable."  >}}

## Using Twisted Pair Cabling And A Buffer IC

I have had very good results with using twisted-pair cabling along with the P82B96 buffer IC to extend the length of the I2C bus. With the SDA and SCL lines connected to wires in different pairs, and then either power or ground connected to the other wire in each pair, I have managed to transmit I2C at 50kHz through a 30m cable. Make sure power and ground are decoupled well at each end with 100nF ceramic capacitors. Using a data/clock line and either power or ground in a twisted pair couples them tightly together, and reduces the amount of emissions that couple onto other wires in the cable. Cat5e ethernet cable can be used (although you only use 2 of the 4 pairs if following the above example).

The picture below shows the difference grounding the other wire in a pair makes when transmitting I2C over twisted pair cables. The yellow trace is SCK (for reference), the white trace is SDA with the second wire floating, and the blue trace is SDA when the second wire is either grounded or connected to VCC. Notice a great reduction in cross-coupling on the blue trace.

{{< figure src="/images/2011/09/i2c-long-cable-ground-no-ground.jpg" width="364px" caption="The difference grounding the other wire in a pair makes when transmitting I2C over twisted pair cables. The yellow trace is SCK (for reference), the white trace is SDA with the second wire floating, and the blue trace is SDA when the second wire is either grounded or connected to VCC. Notice a great reduction in cross-coupling on the blue trace. This was over a 20m ethernet cable."  >}}

The I2C transmission distance can also be extended by using I2C buffer IC's. These chips buffer the inputs and provide high output drive signals useful for sending down long cables. Some also support RX/TX splitting (sending the RX and TX signals from the SDA down separate lines to increase transmission times), as well as differential line driving). Buffering the I2C lines introduces a 'lock-up' problem, in which if the bus is driven low, the receiver will keep it low even after the sender has released it. To stop this from happening, manufacturers cleverly introduced two 'logic-low' levels, which both conform to the logic-low of the I2C standard. Typically anything 0.5V is counted as a true 'low' (which is propagated through the buffer), while anything between 0.5V and 0.9V is a buffer-generated low which is not propagated.

The transmission distance could also be extended by using I2C controllers or bridges that convert the comm protocol into another (e.g. UART) before sending. But this is kinda cheating, isn't it?

If you follow by example, Nintendo's Wii hand controller is a good example of a device that uses I2C over a longer-than-designed-for distance. Their controller cables can be up to 2m in length with the extension.

## Rise-time Accelerators

Rise-time accelerators, such as those used on the [NXP PCA9507 2-wire Serial Bus Extender](http://www.nxp.com/documents/data_sheet/PCA9507.pdf), can be used to extend the length of an I2C bus. They work by intelligently detecting when the bus voltage is rising (being pulled up by the pull-up resistors), and then injecting current to shorten the time it takes for the bus to reach a logic high voltage level. The current injector is then quickly turned off, allowing the I2C line to be pulled low again.

# Hot-Swapping

## Precharging

A clever I2C trick for hot-swapping capability is to pre-charge the bus lines, as used on the [NXP PCA9511 Hot-swappable I2C Bus Buffer](http://www.marutsu.co.jp/contents/shop/marutsu/datasheet/PCA9511.pdf) (this also features rise-time accelerators). During insertion (assuming this chip is on a hot-swappable device which uses I2C), the bus lines are pre-charged to about 1V, which limits the worst-case capacitive disturbances on insertion due the I2C lines being a different voltage levels.

# Clock Stretching

A slave device can indicate that it is not ready to receive new data by holding the clock line (SCL) low. This tells the master to wait until the clock line is high before sending more data.

# Complimentary/Useful I2C Devices

* I/O Expanders - Used for trace reduction and routing simplification. Basically an IC with digital ports that can be turned on or off through I2C communication. Used to compliment processors with limited I/O, and drive port-hungry peripherals such as keypads (you can also get dedicated I2C keypad controllers)
* I2C Multiplexers/Switches - Performs voltage translation/isolation and multiplexing of I2C traces. Useful when dealing with mixed-voltage I2C systems and for resolving address conflicts 
* USB-to-I2c Bridges - These provide a interface between your computer and an external I2C communication line. Certain FTDI chips/cables with an in-built MPSSE (multi-purpose synchronous serial engine) support USB-to-I2C communication. See this application note here ([Application Note AN-190: C232HM MPSSE Cable in USB to I2C/SMBus interface](http://www.ftdichip.com/Support/Documents/AppNotes/AN_190_C232HM_MPSSE_Cable_in_USB_to_I2C_Interface.pdf)).  
  
{{< figure src="/images/2011/09/c232hm-ddhsl-0-ftdi-usb-to-mpsse-cable.jpg" width="265px" caption="The C232HM-DDHSL-0 FTDI USB-to-MPSSE cable. Creates a bridge between your computer and a number of serial comm protocols such as SPI, I2C and UART."  >}}

# Typical I2C Operation

I2C is typically used to configure and talk to digital sensor IC's in an embedded environment. IC's such as accelerometers, capacitive sensors, digital thermometers usually have an I2c protocol for configuration and/or data transfer.

{{< figure src="/images/2011/09/typical-i2c-waveform.jpg" width="483px" caption="A typical I2C waveform. The top waveform is the clock (SCK), and the bottom waveform is the data (SDA). This shows a master trying to communicate with the slave, but the slave does not acknowledge (the ninth bit is high)."  >}}

Typically, the IC has a 7-bit address which if right-shifted with the read/write bit being the LSB. If the IC detects its address, it issues an acknowledge. The second word (which may or may not be a byte, this depends on the size of the registers on the chip, typically 1 or 2bytes) sent by the master over I2C writes to an address pointer, this determines what register is going to be read to/written from. This is always a write operation.

At this point, if the master is performing a write, the master's third word will write to the register pointed to by the address pointer (which was sent as the second word). The address pointer is automatically incremented by one a this point, allowing the master to write consecutive registers all at once without having to do separate I2C transmissions.

{{< figure src="/images/electronics-misc/i2c-waveform-example-saleae-logic-analyser.png" caption="i2c-waveform-example-saleae-logic-analyser" caption="An I2C waveform." >}}

But if instead the master is performing a read, a repeated start is normally issued after writing to the address pointer. Then the master issues a read command (the IC's 7-bit address and the read/write bit set correctly). The master then provides clock pulses while the slave 'reads' out register contents beginning at the register set in the address pointer in the previous write cycle. Just as with a write, the address pointer is incremented automatically, allowing multiple registers to be read at once.

The following image shows an I2C slave that is not responding. Notice the absence of an "ACK" on the SDA line on the 9th clock pulse. The slave should of pulled this low.

{{< figure src="/images/electronics-misc/i2c-waveform-with-nak-saleae-logic-analyser.png" width="600px" caption="An I2C slave that doesn't respond, no ACK on the 9th clock pulse."  >}}

# Prototyping

I try to use SPI or UART over I2C (if the option exists, and there are no other clear advantages/dis-advantages of choosing one over another) when prototyping because they tend to be easier protocols to debug. I2C is difficult because the data line is shared between master and slave (making it harder to work out what is sending what), and the transmission lines are pulled-up (hence it's hard/impossible to differentiate between a device driving the line or it being tri-stated).

# Microcontroller Support

I2C is a very popular protocol and is supported by most microcontrollers. Some examples of microcontroller I2C support include the TI MSP430 Enhanced Universal Serial Communication Interface (eUSCI),[ PSoC 3, 4, and 5LP I2C drag'n'drop modules](/programming/microcontrollers/psoc/components#i2c) (both integrated and hardware fabric versions), and the Atmel Atmega TWI peripheral.

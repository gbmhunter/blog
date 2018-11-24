---
author: gbmhunter
date: 2011-09-07 02:15:11+00:00
draft: false
title: Atmel AT32 Family
type: page
url: /programming/microcontrollers/atmel/atmel-at32-family
---

# Overview

The AT32 family of microcontrollers are manufactured by ATMEL. They use the proprietary Atmel AVR architecture for the core part of the microcontroller. The memory and data paths are 32-bits wide, and they come with varying amounts of flash memory and hardware peripherals.

{{< figure src="/images/2011/09/atmel-avr-at32-3d-render-of-ic-www-teckhat-com.gif" width="259" caption="A 3D render of the AT32UC3L, an Atmel AVR AT32 microcontroller. Image from http://teckhat.com/." caption-position="bottom" >}}

Because of their large pin count, AT32 microcontrollers normally in high-density packages such as QFN and BGA.

# Child Pages

[sb_child_list template=2 orderby=title order=asc nest_level=1]

# Programming

They support both JTAG and programming via pre-installed bootloader over USB (on all USB capable devices). BatchISP is a computer-side program developed by ATMEL that can program firmware onto the devices through the USB connection.

# I/o Multiplexing

The AT32 microcontrollers feature an I/O controller which controls the functionality of each individual IO pin. The pin can either be selected to be GPIO or connected to 1 of 4 peripheral channels.

# TWI Peripheral

The **TWI (two-wire interface)** peripheral supports the Phillips/NXP I2C communication interface and SMBs interface. Most AT32 microcontrollers have 1 or 2 of these TWI peripherals. Atmel names the pins TWCK (I2C SCK) and TWD (I2C SDA). They also provide a third pin, TWALM which is not part of the I2C standard (it is used to provide SMBus SMBALERT signals).

I2C pull-up resistors have to be provided **externally**, there are no built-in pull-up resistors inside the AT32 on these pins.

The TWI peripheral can be configured as a I2C master (TWIM) or I2C slave (TWIS).

DMA is supported on the TWI interface through the DMA controller.

---
author: gbmhunter
date: 2011-09-06 06:38:44+00:00
draft: false
title: Electric Skateboard Firmware
type: page
url: /electronics/projects/electric-skateboard/electric-skateboard-firmware
---

# Overview

{{< figure src="/images/programming-misc/bit-bucket-logo.png" caption="The BitBucket logo. Image from https://bitbucket.org/."  width="320px" >}}

The firmware covers the code that runs on the remote and board microcontrollers (ATmega8's, or PSoC 5's, depending on which version).

The firmware is public and can be downloaded as a Mercurial repo on www.bitbucket.com from [https://bitbucket.org/gbmhunter/electric-skateboard-firmware](https://bitbucket.org/gbmhunter/proj-electricskateboardfirmware). Note that this is quite a large repo, as it contains the most recent and old versions of code, which were for different platforms.

{{< figure src="/images/electronics-electricskateboard/electric-skateboard-c-code-screenshot.png" caption="Screenshot of the electric skateboard firmware, showing main.c."  width="600px" >}}

# Wireless Comms

## General Format

```
<3 letter identifier of destination><number of data bytes n><data byte 0><data byte 1><...><data byte n><checksum>
```

(link to comms code here)


## Remote To Board Package Format

```
's' 'k' 't' <number of data bytes> <status byte> <MS1> <MS0> '\0'
```

where:
MS1 = motor speed high byte
MS0 = motor speed low byte


## Board To Remote Package Format

```
'r' 'm' 't' <number of data bytes> <status byte> '\0'
```

or in hex

```
72 6D 74 xx xx (xx xx xx...) 00
```

## Protocol

The remote initiates the communication. The board listens for a package sent from the remote (starts with 'skt'). If there is one present in the comms buffer, the in-range bit is set in the status byte and the board moves into the in-range state. The remote listens for a return packet, and if the in-range bit is checked, it also moves into the in-range state.

The remote then flashes the 'in-range' LED, and waits for the user to press the on button. When this occurs, the remote sets the on status bit high. The board waits for this bit in the received packages to go high, and then itself goes into the on state.

# Battery Charge Monitoring

The state of both the 48V 10Ah LiFePO4 skateboard battery and 9V Ni-MH remote battery is measured with ADC's, using resistor voltage dividers to scale the voltage down to a level safe for the microcontrollers. Voltage measurement provides an O.K. estimate of the batteries state-of-charge, however, the 48V battery's voltage drops when gunning it, making the display jump around a bit. The batteries charge is displayed using a 3-LED bar graph-type kind of setup on the remote. The LED's are flashed to increase the resolution of the graph (the flash rate of one LED increases as the voltage drops, before moving down to the next LED).

# Speed Control

Speed control is performed with a fixed-frequency, variable duty-cycle PWM peripheral. This is then low-pass filtered and amplified with a bit of external circuitry before going into the DC motor controller (which was designed for POT control, hence the LPF).

# Programming

## Prototyping

AVR Studio was used to program the ATmega8 chips used for prototyping (they come in a prototype board loving [DIP package](http://blog.mbedded.ninja/electronics/circuit-design/component-packages)). That was until communication crapped out between the AVRISPmkII and the new AVR Studio 5 (I'm not the only one who has had this problem.. From that point on I uninstalled the AVR Jungo drivers for the AVRISPmkII and used the command line programmer avrdude to program the chips, using the following command:

```
avrdude -c avrispmkII - p atmega8 -P usb -U flash:w:<filename.hex>
```

where `<filename>` was either remote.hex or board.hex

## The Final Version

The final version of the PCB's used non-DIP-package-but-slightly-more-powerful PSoC 5 microcontrollers. The firmware from the prototyping boards was ported and developed further in PSoC Programmer.

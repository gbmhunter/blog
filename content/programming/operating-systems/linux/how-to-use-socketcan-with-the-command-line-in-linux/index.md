---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Operating Systems", "Linux" ]
date: 2017-07-21
description: "How to open, configure, read and write to SocketCAN devices in Linux using the command-line."
images: [ "/programming/operating-systems/linux/how-to-use-socketcan-with-the-command-line-in-linux/socketcan-image.png" ] 
lastmod: 2019-04-26
tags: [ "CAN bus", "SocketCAN", "command-line", "Linux", "vcan", "slcan", "interface", "communication protocol" ]
title: "How To Use SocketCAN With The Command-Line In Linux"
type: "page"
---

## Overview

**This tutorial shows you how to manipulate SocketCAN interfaces using the Linux command-line**. This includes finding out what SocketCAN interfaces are available, printing detailed info about them, and then sending/receiving data.

If you are looking for help controlling a SocketCAN interface from C software, see the [How To Use SocketCAN With C In Linux page](/programming/operating-systems/linux/how-to-use-socketcan-with-c-in-linux/).

If you are looking for more information about the CAN bus protocol itself, see the [CAN Protocol page](/electronics/communication-protocols/can-protocol/).

{{% figure src="socketcan-image.png" width="337px" caption="Icon for SocketCAN. Image from https://github.com/linux-can/can-utils." %}}

## What Types of CAN Interfaces Are There?

SocketCAN provides the following types of CAN interfaces:

1. **Native interfaces.** These are CAN interfaces associated with real hardware (such as a USB-to-CAN adapter). They are named `canX` , e.g. `can0`, `can1`, ...
2. **Virtual interfaces.** These are CAN interfaces that are not associated with any real hardware. They are named `vcanX`, e.g. `vcan0`, `vcan1`, ...
3. **SLCAN based interfaces.** SLCAN interfaces provide a serial interface. They are named `slcanX`, e.g. `slcan0`, `slcan1`, e.t.c

## Investigating SocketCAN Interfaces

First off, you want to print all the available ip interfaces and see if you have some can interfaces. This uses the `iproute2` suite of tools:

```sh
~$ ip link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DEFAULT group default qlen 1000
    link/ether 00:0c:29:35:8c:af brd ff:ff:ff:ff:ff:ff
3: can0: <NOARP,ECHO> mtu 16 qdisc noop state DOWN mode DEFAULT group default qlen 10
    link/can 
```

The last interface listed is `can0`. This is a SocketCAN interface!

{{% note %}}
The above command was run on Ubuntu 17.04 64-bit, running on VMware Workstation with a PCAN-USB dongle connected.
{{% /note %}}

## Print SocketCAN Info

Native CAN devices that support SocketCAN can be seen using the `iproute2` suite of tools. For example:

```sh    
~$ ip addr ls dev can0
3: can0: <NOARP,ECHO> mtu 16 qdisc noop state DOWN group default qlen 10
    link/can
```

If you attempt it for a CAN device that does not exist:

```sh    
~$ ip addr ls dev can1
Device "can1" does not exist.
```   

An alternative way to investigate CAN interfaces is to use `ifconfig <canx>`:

```sh    
~$ ifconfig can0
can0: flags=128<NOARP>  mtu 16
        unspec 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00  txqueuelen 10  (UNSPEC)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

## Configuring And Enabling The SocketCAN Interface

Before we can enable the SocketCAN interface, we need to configure it:

```sh    
~$ sudo ip link set can0 type can bitrate 500000
```

{{% warning %}}
The above command only works for interfaces that already exist (such as a physical `can0` that has been created when a CAN-to-USB dongle was connected). For virtual CAN interfaces, you must create the interface with a slightly different command:
{{% /warning %}}

```sh    
~$ sudo modprobe vcan
~$ sudo ip link add dev vcan0 type vcan
```

**Enabling a specific SocketCAN interface is also called _"bringing the interface up"_.** To bring the connection up:

```sh    
~$ sudo ip link set up can0
```

**Note 1:** If you ever get the following error: `RTNETLINK answers: Operation not permitted`, try the command again with sudo.

**Note 2**: And if you get the error: `RTNETLINK answers: Operation not supported` then try run `sudo modprobe can` (or `sudo modprobe vcan` ) first.

## Send/Receive Data On SocketCAN

If you then want to send/receive data on the CAN interface, you should install `can-utils`:

```sh    
~$ sudo apt install can-utils
```

The repository for can-utils can be found at [https://github.com/linux-can/can-utils](https://github.com/linux-can/can-utils).

**To send data to the CAN bus**, use the `cansend` utility:

```sh    
~$ cansend can0 123#1122334455667788
```

The above command will send a CAN message on can0 with the identifier 0x123 and the data bytes `[ 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88 ]`. Values are always treated as hexadecimal.

**To display a list of received messages on the bus** in realtime, use the `candump` utility:

```sh    
~$ candump can0
```
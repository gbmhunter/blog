---
author: "gbmhunter"
categories: [ "Programming", "Operating Systems", "Linux", "Communication Protocols", "C++" ]
date: 2017-07-21
draft: false
lastmod: 2019-05-31
tags: [ "SocketCAN", "C++", "Linux", "API", "CAN bus", "communication protocol", "libsocketcan", "kernel", "network" ]
title: "How To Use SocketCAN With C++ In Linux"
type: "page"
---

## Overview

The Linux C/C++ API allows you to control a SocketCAN interface via a C/C++ application.

If you are looking for help interfacing with SocketCAN from the Linux command-line, see the [How To Use SocketCAN With The Command-Line In Linux page](/programming/operating-systems/linux/how-to-use-socketcan-with-the-command-line-in-linux/).

If you are looking for more information about the CAN bus protocol itself, see the [CAN Protocol page](/electronics/communication-protocols/can-protocol/).

SocketCAN supports _standard frame format_ (SFF), _extended frame format_ (EFF) and _CAN FD_ frames.

## Reading And Writing

The data for reading and writing to the CAN bus is communicated through the `can_frame` struct which is declared and defined in `<linux/can.h>`.

```c
struct can_frame {
    canid_t can_id;  // 32-bit CAN_ID + EFF/RTR/ERR flags
    __u8    can_dlc; // Number of bytes used in data (0..8)
    __u8    __pad;   // Padding
    __u8    __res0;  // Reserved/padding
    __u8    __res1;  // Reserved/padding
    __u8    data[8] __attribute__((aligned(8))); // Data
};
```

The 32-bit `can_id` value has the following structure:

**[0-28]**: CAN identifier (11/29bit)  

**[29]**: Error frame flag (0 = data frame, 1 = error frame)  

**[30]**: Remote transmission request flag (1 = rtr frame)  

**[31]**: Frame format flag (0 = standard 11bit, 1 = extended 29bit)

The padding in the above struct allows data to be aligned to a 64-bit boundary. This allows the user to define their own structs and unions to easily access the data (by _casting_). For example, you could access all 8-bytes of data as a single 64-bit value if desired.


Note that the `can_id` structure does not map directly to the bits present in the arbitration field of a CAN message.

There is also an extended frame struct, called `canfd_frame`.

```c    
struct canfd_frame {
    canid_t can_id;  /* 32 bit CAN_ID + EFF/RTR/ERR flags */
    __u8    len;     /* frame payload length in byte (0 .. 64) */
    __u8    flags;   /* additional flags for CAN FD */
    __u8    __res0;  /* reserved / padding */
    __u8    __res1;  /* reserved / padding */
    __u8    data[64] __attribute__((aligned(8)));
};
```

The `canfd_frame` struct does not have a `can_dlc` member to indicate the number of bytes, but rather a len member.

A `read()` system call transfers a `can_frame` or `canfd_frame` struct from the kernel CAN buffer to the user space.

Data is buffered internally, which means for virtual interfaces, you can do a write, pause, and then read the value back at a later time (you do not have to use separate threads/processes).

## libsocketcan

_**libsocketcan**_ is a Linux library that provides some userspace functionality to control a SocketCAN interface. It provides functions such as `can_set_bitrate()`, `can_do_start()` and `can_do_stop()`.

{{% warning %}}
Although _libsocketcan_ seems to work fine for physical CAN interfaces (e.g. `can0`), **I have had issues when using it with a virtual CAN interface** (e.g. `vcan0`). Specifically, functions such as `can_get_state()` do not seem to work correctly.
{{% /warning %}}

You can install `libsocketcan` on your Linux machine by following the below steps:

1. Clone the **libsocketcan** git repository:  

    ```sh    
    ~$ git clone https://git.pengutronix.de/git/tools/libsocketcan
    ```

2. Build/install (libsocketcan uses the **_autotools_** build system):

    ```sh    
    ~$ cd libsocketcan
    ~/libsocketcan$ ./autogen.sh
    ~/libsocketcan$ ./configure
    ~/libsocketcan$ make
    ~/libsocketcan$ sudo make install
    ```

You should now have **libsocketcan.a** installed to **/usr/local/lib** and the header file** libsocketcan.h** installed to **/usr/local/include**.

## External Resources

[https://www.kernel.org/doc/Documentation/networking/can.txt](https://www.kernel.org/doc/Documentation/networking/can.txt) is a great page detailing with the Linux C API for SocketCAN, including code examples and use cases.

The _can-utils_ package source code can be found at [https://github.com/linux-can/can-utils](https://github.com/linux-can/can-utils). This has great C code examples on how to read and write messages to the SocketCAN interface.

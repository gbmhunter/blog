---
author: gbmhunter
date: 2017-06-24 00:49:00+00:00
draft: false
title: Linux Serial Ports Using C/C++
type: page
url: /programming/operating-systems/linux/linux-serial-ports-using-c-cpp
---

# Overview

Unluckily, using serial ports in Linux is not the easiest thing in the world. When dealing with the termios.h header, there are many finicky settings buried within multiple bytes worth of bitfields.

# Everything Is A File

In typical UNIX style, **serial ports are represented by files** within the operating system. These files usually pop-up in /dev, and begin with the name tty*.

Common names are:

    * /dev/ttyACM0 - ACM stands for the ACM modem on the USB bus. Arduino UNOs (and similar) will appear using this name.
    * /dev/ttyPS0 - Xilinx Zynq FPGAs running a Yocto-based Linux build will use this name for the default serial port that Getty connects to.
    * /dev/ttyS0 - Standard COM ports will have this name. These are less common these days with newer desktops and laptops not having actual COM ports.
    * /dev/ttyUSB0 - Most USB-to-serial cables will show up using a file named like this.
    * /dev/pts/0 - A psuedo terminal. These can be generated with socat.

**To write to a serial port, you write to the file. To read from a serial port, you read from the file.** Of course, this allows you to send/receive data, but how do you set the serial port parameters such as baud rate, parity, e.t.c? This is set by a special tty configuration struct.

# Disabling Canonical Mode

UNIX systems provide two basic modes of input, canonical and non-canonical mode. In canonical mode, input is processed when a new line character is received. The receiving application receives that data line-by-line. This is usually undesirable when dealing with a serial port, and so we normally want to disable canonical mode.

Canonical mode is disabled with:

```c    
tty.c_lflag &= ~ICANON;
```

Also, in canonical mode, some characters such as backspace are treated specially, and are used to edit the current line of text (erase). Again, we don't want this feature if processing raw serial data, as it will cause particular bytes to go missing!

# VMIN and VTIME Explained

`VMIN` and `VTIME` are a **source of confusion** for many programmers when trying to configure a serial port in Linux.

An important point to note is that VTIME means slightly different things depending on what VMIN is. When VMIN is 0, VTIME specifies a **time-out from the start of the read() call**. But when VMIN is > 0, VTIME specifies the **time-out from the start of the first received character**.

**VMIN = 0, VTIME = 0**: No blocking, return immediately with what is available  

**VMIN > 0, VTIME = 0**: This will make read() always wait for bytes (exactly how many is determined by VMIN), so read() could block indefinitely.  

**VMIN = 0, VTIME > 0**: This is a blocking read of any number chars with a maximum timeout (given by VTIME). read() will block until either any amount of data is available, or the timeout occurs. This happens to be my favourite mode (and the one I use the most).  

**VMIN > 0, VTIME > 0**: Block until either VMIN characters have been received, or VTIME after first character has elapsed. Note that the timeout for VTIME does not begin until the first character is received.

`VMIN` and `VTIME` are both defined as the type `cc_t`, which I have always seen be an alias for unsigned char (1 byte). This puts an upper limit on the number of VMIN characters to be 255 and the maximum timeout of 25.5 seconds (255 deciseconds).

**For Linux serial port code examples see [https://github.com/mbedded-ninja/CppLinuxSerial](https://github.com/mbedded-ninja/CppLinuxSerial).**

# Issues With Getty

Getty can cause issues with serial communication if it is trying to manage the same tty device that you are attempting to perform serial communications with.

**To Stop Getty:**

Getty can be hard to stop, as by default, if you try and kill the process, and new process will start up immediately.

These instructions apply to older versions of Linux, and/or embedded Linux.

1. Load /etc/inittab in your favourite text editor.
2. Comment out any lines involving getty and your tty device.
3. Save and close the file.
4. Run the command ~$ init q to reload the /etc/inittab file.
5. Kill any running getty processes attached to your tty device.

# Exclusive Access

It can be prudent to try and prevent other processes from reading/writing to the serial port at the same time you are.

One way to accomplish this is with the `flock()` system call:

```c    
#include <sys/file.h>

int main() {
    
    // ... get file descriptor here

    // Acquire non-blocking exclusive lock
    if(flock(fd, LOCK_EX | LOCK_NB) == -1) {
        throw std::runtime_error("Serial port with file descriptor " + 
            std::to_string(fd) + " is already locked by another process.");
    }

    // ... read/write to serial port here
}
```

# Examples

**For Linux serial port code examples see [https://github.com/mbedded-ninja/CppLinuxSerial](https://github.com/mbedded-ninja/CppLinuxSerial).**

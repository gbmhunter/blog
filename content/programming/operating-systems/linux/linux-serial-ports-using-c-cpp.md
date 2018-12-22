+++
title = "Linux Serial Ports Using C/C++"
description = "A walk-through on how to configure serial ports correctly in Linux."
author = "gbmhunter"
date = "2017-06-24"
draft = false
type = "page"
url = "/programming/operating-systems/linux/linux-serial-ports-using-c-cpp"
+++

# Overview

Unluckily, using serial ports in Linux is not the easiest thing in the world. When dealing with the `termios.h` header, there are many finicky settings buried within multiple bytes worth of bitfields. This page is an attempt to help explain these settings and show you how to configure a serial port in Linux correctly.

# Everything Is A File

In typical UNIX style, **serial ports are represented by files** within the operating system. These files usually pop-up in `/dev/`, and begin with the name `tty*`.

Common names are:

* `/dev/ttyACM0` - ACM stands for the ACM modem on the USB bus. Arduino UNOs (and similar) will appear using this name.
* `/dev/ttyPS0` - Xilinx Zynq FPGAs running a Yocto-based Linux build will use this name for the default serial port that Getty connects to.
* `/dev/ttyS0` - Standard COM ports will have this name. These are less common these days with newer desktops and laptops not having actual COM ports.
* `/dev/ttyUSB0` - Most USB-to-serial cables will show up using a file named like this.
* `/dev/pts/0` - A psuedo terminal. These can be generated with `socat`.

**To write to a serial port, you write to the file. To read from a serial port, you read from the file.** Of course, this allows you to send/receive data, but how do you set the serial port parameters such as baud rate, parity, e.t.c? This is set by a special `tty` configuration `struct`.

# Basic Setup In C

This code is also applicable to C++.

First we want to include a few things:

```c
#include <termios.h> // Contains POSIX terminal control definitions
#include <fcntl.h> // Contains file controls
```

Then we want to open the serial port device (which appears as a file under `/dev/`), saving the file descriptor that is returned by `open()`:

```c
file_desc = open("/dev/ttyUSB0", O_RDWR);
```

At this point we could technically read and write to the serial port, but it will likely not work, because the default configuration settings are not designed for serial port use. So now we will set the configuration correctly.

When modifying any configuration value, it is best practice to only modify the bit you are interested in, and leave all other bits of the field untouched. This is why you will see below the use of `&=` or `|=`, and never `&` or `|` when setting bits.

# c_cflags

The `c_cflags` member of the `termios` struct contains control parameter fields.

## PARENB (Parity)

If this bit is set, generation and detection of the parity bit is enabled. Most serial communications do not use a parity bit, so if you are unsure, clear this bit.

```c
tty.c_cflag &= ~PARENB; // Clear parity bit, disabling parity (most common)
tty.c_cflag |= PARENB;  // Set parity bit, enabling parity
```

## CSTOPB (Num. Stop Bits)

If this bit is set, two stop bits are used. If this is cleared, only one stop bit is used. Most serial communications only use one stop bit.

```c
tty.c_cflag &= ~CSTOPB; // Clear stop field, only one stop bit used in communication (most common)
tty.c_cflag |= CSTOPB;  // Set stop field, two stop bits used in communication
```

## Number Of Bits Per Byte

The `CS<number>` fields set how many data bits are transmitted per byte across the serial port. The most common setting here is 8 (`CS8`). Definitely use this if you are unsure, I have never used a serial port before which didn't use 8 (but they do exist).

```c
tty.c_cflag |= CS5; // 5 bits per byte
tty.c_cflag |= CS6; // 6 bits per byte
tty.c_cflag |= CS7; // 7 bits per byte
tty.c_cflag |= CS8; // 8 bits per byte (most common)
```

## Flow Control (CRTSCTS)

If the `CRTSCTS` field is set, hardware RTS/CTS flow control is enabled. The most common setting here is to disable it. Enabling this when it should be disabled can result in your serial port receiving no data, as the sender will buffer it indefinitely, waiting for you to be "ready".

```c
tty.c_cflag &= ~CRTSCTS; // Disable RTS/CTS hardware flow control (most common)
tty.c_cflag |= CRTSCTS;  // Enable RTS/CTS hardware flow control
```

## CREAD and CLOCAL

Setting `CLOCAL` disables modem-specific signal lines such as carrier detect. Is also prevents the controlling process from getting sent a `SIGHUP` signal when a modem disconnect is detected, which is usually a good thing here. Setting `CLOCAL` allows us to read data (we definitely want that!).

```c
tty.c_cflag |= CREAD | CLOCAL; // Turn on READ & ignore ctrl lines (CLOCAL = 1)
```

# Local Modes (c_lflag)

## Disabling Canonical Mode

UNIX systems provide two basic modes of input, **canonical** and **non-canonical mode**. In canonical mode, input is processed when a new line character is received. The receiving application receives that data line-by-line. This is usually undesirable when dealing with a serial port, and so we normally want to disable canonical mode.

Canonical mode is disabled with:

```c    
tty.c_lflag &= ~ICANON;
```

Also, in canonical mode, some characters such as backspace are treated specially, and are used to edit the current line of text (erase). Again, we don't want this feature if processing raw serial data, as it will cause particular bytes to go missing!

## Echo

If this bit is set, sent characters will be echoed back. Because we disabled canonical mode, I don't think these bits actually do anything, but it doesn't harm to disable them just in case!

```c
tty.c_lflag &= ~ECHO; // Disable echo
tty.c_lflag &= ~ECHOE; // Disable erasure
tty.c_lflag &= ~ECHONL; // Disable new-line echo
```

## Disable Signal Chars

When the `ISIG` bit is set, `INTR`, `QUIT` and `SUSP` characters are intrepreted. We don't want this with a serial port, so clear this bit:

```c
tty.c_lflag &= ~ISIG; // Disable interpretation of INTR, QUIT and SUSP
```

# Input Modes (c_iflag)

The `c_iflag` member of the `termios` struct contains low-level settings for input processing. The `c_iflag` member is an `int`.

## Software Flow Control (IXOFF, IXON, IXANY)

Clearing `IXOFF`, `IXON` and `IXANY` disables software flow control, which we don't want:

```c
tty.c_iflag &= ~(IXON | IXOFF | IXANY); // Turn off s/w flow ctrl
```

## Disabling Special Handling Of Bytes On Receive

Clearing all of the following bits disables any special handling of the bytes as they are received by the serial port, before they are passed to the application. We just want the raw data thanks!

```c
tty.c_iflag &= ~(IGNBRK|BRKINT|PARMRK|ISTRIP|INLCR|IGNCR|ICRNL); // Disable any special handling of received bytes
```

# Output Modes (c_oflag)

The `c_oflag` member of the `termios` struct contains low-level settings for output processing. When configuring a serial port, we want to disable any special handling of output chars/bytes, so do the following:

```c
tty.c_oflag &= ~OPOST; // Prevent special interpretation of output bytes (e.g. newline chars)
tty.c_oflag &= ~ONLCR; // Prevent conversion of newline to carriage return/line feed
tty.c_oflag &= ~OXTABS; // Prevent conversion of tabs to spaces
tty.c_oflag &= ~ONOEOT; // Prevent removal of C-d chars (0x004) in output
```

# VMIN and VTIME (c_cc)

`VMIN` and `VTIME` are a **source of confusion** for many programmers when trying to configure a serial port in Linux.

An important point to note is that `VTIME` means slightly different things depending on what `VMIN` is. When `VMIN` is 0, `VTIME` specifies a **time-out from the start of the read() call**. But when `VMIN` is > 0, `VTIME` specifies the **time-out from the start of the first received character**.

**VMIN = 0, VTIME = 0**: No blocking, return immediately with what is available  

**VMIN > 0, VTIME = 0**: This will make `read()` always wait for bytes (exactly how many is determined by `VMIN`), so `read()` could block indefinitely.  

**VMIN = 0, VTIME > 0**: This is a blocking read of any number chars with a maximum timeout (given by `VTIME`). `read()` will block until either any amount of data is available, or the timeout occurs. This happens to be my favourite mode (and the one I use the most).  

**VMIN > 0, VTIME > 0**: Block until either `VMIN` characters have been received, or `VTIME` after first character has elapsed. Note that the timeout for `VTIME` does not begin until the first character is received.

`VMIN` and `VTIME` are both defined as the type `cc_t`, which I have always seen be an alias for unsigned char (1 byte). This puts an upper limit on the number of `VMIN` characters to be 255 and the maximum timeout of 25.5 seconds (255 deciseconds).

"Returning as soon as any data is received" does not mean you will only get 1 byte at a time. Depending on the OS latency, serial port speed, hardware buffers and many other things you have no direct control over, you may receive any number of bytes.

For example, if we wanted to wait for up to 1s, returning as soon as any data was received, we could use:

```c
tty.c_cc[VTIME] = 10.0;    // Wait for up to 1s (10 deciseconds), returning as soon as any data is received.
tty.c_cc[VMIN] = 0;
```

# Baud Rate

Rather than use bit fields as with all the other settings, the serial port baud rate is set by calling the functions `cfsetispeed()` and `cfsetospeed()`:

```c
// Set in/out baud rate to be 9600
cfsetispeed(&tty, B9600);
cfsetospeed(&tty, B9600);
```

If you want to remain UNIX compliant, the baud rate must be chosen from one of the following:

```c
B0,  B50,  B75,  B110,  B134,  B150,  B200, B300, B600, B1200, B1800, B2400, B4800, B9600, B19200, B38400, B57600, B115200, B230400, B460800
```

If you are compiling with the GNU C library, you can forgo these enumerations and just specify an integer baud rate directly, e.g.:

```c
// Specifying a custom baud rate when using GNU C
cfsetispeed(&tty, 104560);
cfsetospeed(&tty, 104560);
```

Not all hardware will support all baud rates, so it is best to stick with one of the standard `BXXX` rates above if you have the option to do so. If you have no idea what the baud rate is and you are trying to communicate with a 3rd party system, try `B9600`, then `B57600` and then `B115200` as they are the most common rates.

**For Linux serial port code examples see [https://github.com/mbedded-ninja/CppLinuxSerial](https://github.com/mbedded-ninja/CppLinuxSerial).**

# Issues With Getty

Getty can cause issues with serial communication if it is trying to manage the same tty device that you are attempting to perform serial communications with.

**To Stop Getty:**

Getty can be hard to stop, as by default, if you try and kill the process, and new process will start up immediately.

These instructions apply to older versions of Linux, and/or embedded Linux.

1. Load `/etc/inittab` in your favourite text editor.
2. Comment out any lines involving `getty` and your `tty` device.
3. Save and close the file.
4. Run the command `~$ init q` to reload the `/etc/inittab` file.
5. Kill any running `getty` processes attached to your `tty` device. They should now stay dead!

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

For Linux serial port code examples see [https://github.com/mbedded-ninja/CppLinuxSerial](https://github.com/mbedded-ninja/CppLinuxSerial).

# External Resources

See [http://www.gnu.org/software/libc/manual/html_node/Terminal-Modes.html](http://www.gnu.org/software/libc/manual/html_node/Terminal-Modes.html) for the official specifications of the `termios` struct configuration parameters.
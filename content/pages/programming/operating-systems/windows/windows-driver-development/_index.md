---
author: gbmhunter
date: 2013-04-14 02:10:49+00:00
draft: false
title: Windows Driver Development
type: page
url: /programming/operating-systems/windows/windows-driver-development
---

# Child Pages


[Keyboard Driver](http://blog.mbedded.ninja/programming/general/windows-driver-development/keyboard-driver)


# User Space




# Kernel Space




# I/O Control Codes (IOCTLs)


IOCTL is a UNIX term.

From the Wikipedia article, "[ioctl](http://en.wikipedia.org/wiki/Ioctl)".

A Win32 `DeviceIoControl` takes as parameters:



	  1. an open object handle (the Win32 equivalent of a file descriptor)
	  2. a request code number (the "control code")
	  3. a buffer for input parameters
	  4. length of the input buffer
	  5. a buffer for output results
	  6. length of the output buffer
	  7. an `OVERLAPPED` structure, if overlapped I/O is being used.



# I/O Request Packets (IRPs)




# Interrupt Request Level (IRQL)


The IRQL can be tempoarily raised at any point, but can only be lowered by the routine that raised it.


## IRQL 0 (PASSIVE_LEVEL)


All user code, and most kernel code is executed at this level.


## IRQL 1 (APC_LEVEL)




## IRQL 2 (DISPATCH_LEVEL)




## IRQL 3+ (DIRQL)


Level 3 and above (except for one, called HIGH_LEVEL, see below) are interrupts reserved for connecting to hardware devices, and are known as (DIRQL ).


## HIGH_LEVEL




# Driver Stack


A hardware device has not one, but many drivers which work together to provide the correct functionality. These are implemented on a "driver stack".


## Physical Device Object (PDO)




## Function Device Object (FDO)




## Filter Drivers




# Windows Driver Development Kit (WDK)


The compiler bundled with the WDK is optimised for driver development, and should not be used for standard C/C++ applications (and vise versa).


# Windows Driver Model (WDM)


The Windows driver model was first included with Windows 98 and replaces the older VxD driver model.


# Windows Driver Foundation (WDF)


The Windows driver foundation is event driven and object-orientated.


## User Mode Driver Framework (UMDF)




## Kernel Mode Driver Framework (KMDF)

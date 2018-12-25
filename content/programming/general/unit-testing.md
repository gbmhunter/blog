---
author: gbmhunter
date: 2013-05-22 06:13:52+00:00
draft: false
title: Unit Testing
type: page
url: /programming/general/unit-testing
---

## Overview

Unit testing is the method of testing small segments of a code base (say, a function or class) individually, using testing code. There are good unit test frameworks for pretty much every programming language imaginable.

The aim of unit testing is to make sure that the small section of code works correctly. This also involves **testing the edge cases**. The following quote explains this well:

<blockquote>
    A code tester walks into a bar.  
    Orders a beer.  
    Orders 3 beers.  
    Orders 2147483648 beers.  
    Orders 0 beers.  
    Orders -1 beers.  
    Orders nothing.  
    Orders a bear.  
    Tries to leave without paying.
</blockquote>

## Unit Testing Embedded Systems

Unit testing on embedded systems can be much harder than "typical" software unit tests. Low-level embedded C/C++ code can have many hardware/MCU peripheral dependencies, which may not be available when unit testing (e.g. if you want to run the unit tests on a standard computer). These dependencies require mocking, which can be very difficult.

If the particular embedded code in question doesn't rely on any hardware peripherals (like a message decoder or mathematical function), you don't usually need the embedded system to perform the tests on. This is great, since you can run them on a normal computer, and save you all the time and hassle of setting correct test conditions on a microcontroller.

Linux is a great tool to use here, as it is great for compiling and testing C/C++ code, and usually supports the same compiler as which the embedded system uses (e.g. GCC), meaning you have to make little or no changes. See [Linux Bash Commands For C](/programming/languages/c/linux-bash-commands-for-c) for instructions on how to compile C code in Linux, and the [Bash page](/programming/scripting-languages/bash) for more helpful bash (Linux terminal) commands.

It is common practice to put unit tests in a separate folder to your source code. I (and others, including those who write libraries in python) use the name test .

## C/C++

See the [Programming->Languages->C++->Unit Testing And Mocking page](/programming/languages/c-plus-plus/unit-testing-and-mocking).

## External Links

A really good read is [How To Write Good Unit Tests](http://wiki.developerforce.com/page/How_to_Write_Good_Unit_Tests), on the DeveloperForce website.

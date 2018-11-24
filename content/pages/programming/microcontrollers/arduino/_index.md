---
author: gbmhunter
date: 2011-11-10 05:10:12+00:00
draft: false
title: Arduino
type: page
url: /programming/microcontrollers/arduino
---

#  

# Overview

The Arduino is a low-cost, easy-to-use, microcontroller development environment. It consists of a range of hardware PCB's, and the Arduino software and supporting libraries.

{{< figure src="revision r3" width="425" caption="](/images/2011/11/arduino-uno-r3-photo.jpg) A photo of the Arduino Uno (revision r3). Image from https://www.wikimedia.org/." caption-position="bottom" >}}

The Arduino platform was used in the [Luxcity Tonic UV Control System project](http://blog.mbedded.ninja/electronics/projects/luxcity-uv-tonic-control-system) that I designed.

# Child Pages

[sb_child_list template=2 orderby=title order=asc nest_level=1]

# Windows 8

The Arduino drivers do not currently work on Windows 8, because they have not been digitally signed. However "Louis Davis" on the Arduino forum created a signed cat file (signed with a test certificate) so that you can install the driver (INF) file on Windows 8 (see [forum](http://arduino.cc/forum/index.php/topic,94651.msg711489.html#msg711489)). Tested and it works!

{{< figure src="/images/2011/11/windows-8-start-screen.jpg" width="272" caption="The Windows 8 start screen." caption-position="bottom" >}}

## NetDuino

An embedded platform that runs the .NET Micro framework.

{{< figure src="/images/2011/11/netduino-plus-photo.jpg" width="470" caption="The Netduino, an embedded platform that runs the .NET Micro framework. Image from http://netduino.com/." caption-position="bottom" >}}

## FezDomino

Website: [http://www.ghielectronics.com/catalog/product/133](http://www.ghielectronics.com/catalog/product/133) An embedded platform that run the .NET Micro framework.

# The IDE And Extensions

## The Arduino IDE

Most importantly, the Arduino IDE is free and open-source. The complete tool-chain (compilers/linkers/assemblers/programmers e.t.c) is free to use.

## MariaMole

MariaMole is an IDE that runs over the Arduino install. I think it's main benefit is that it allows you to write code in a proper file/library structure (which is a serious downside to the native Arduino IDE). It provides the Workspace/project/file window that is a default to any good IDE.

{{< figure src="/images/2011/11/mariamole-screenshot-from-website.jpg" width="402" caption="Screenshot of the MariaMole IDE. Image from http://dalpix.com/mariamole." caption-position="bottom" >}}

As of Mar 2013, MariaMole does not support Arduino v1.5.2, which is required to run the Due.

## Visual Studio Plugin

There is a Visual Studio plugin called Visual Micro (downloadable from [this website](http://www.visualmicro.com/)), for the Arduino.

# RTOS

There are a few RTOS's which can be run on Arduinos, including NilRTOS, ChibiOS/RT and FreeRTOS. NilRTOS runs on the AVR Arduinos (everything but the Due and Teensy 3.0), while both ChibiOS/RT and FreeRTOS run on both the AVR and ARM-based Arduinos. The best place for more information and to download these RTOS systems (which are pre-configured to run on the Arduino systems) is the Google group rtoslibs ([https://code.google.com/p/rtoslibs/](https://code.google.com/p/rtoslibs/)).

# Command-line Interface

Ino - "Ino is a command line toolkit for working with Arduino hardware" Website: [http://inotool.org/](http://inotool.org/) Ino allows you to create, build, program, and serial monitor with the Arduino platform, doing away the need to use the Arduino GUI (although you still have to have it installed so it can use it's libraries). It currently works on Linux or MacOS systems. Great when wanting to automate the programming method (for example, if you want to program multiple Arduinos all at the same time.

# External Links

The official Arduino website is [here](http://www.arduino.cc/). A good article on the history of the Arduino can be found [here](http://spectrum.ieee.org/geek-life/hands-on/the-making-of-arduino/).

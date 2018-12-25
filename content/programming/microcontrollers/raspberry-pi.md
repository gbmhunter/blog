---
author: gbmhunter
date: 2013-03-23 23:59:27+00:00
draft: false
title: RaspberryPi
type: page
url: /programming/microcontrollers/raspberry-pi
---

## Overview

The RaspberryPi is a cheap, fully-functional micro-computer.

{{< figure src="/images/project-autoelectricblanket/raspberry-pi-with-lots-of-cables-filtered.jpg" caption="The RaspberryPi while testing."  width="800px" >}}

## Quick Setup

www.raspberrypi.com has released software called NOOBS (new out-of-the-box software), which makes it really easy to setup the RPi. Just download NOOBS (which was just over 1GB at v1.2.1), format ([go here](https://www.sdcard.org/downloads/formatter_4/)) then unpack NOOBS onto the SD card, and your good to plug the SD card into the RPi and power up (NOOBS will present you with various operating systems to install on start-up).

At the bare minimum, you'll also need a USB keyboard, mouse (hard-outs may be able to forgo this) and either an HDMI or composite screen.

<table >
<tbody >
<tr >

<td >Default username:
</td>

<td >pi
</td>
</tr>
<tr >

<td >Default password:
</td>

<td >raspberry
</td>
</tr>
</tbody>
</table>

## Longer Setups

You can also write images directly to the SD card. The recommended tool for this is the open source program [Win32DiskImager](http://sourceforge.net/projects/win32diskimager/).

## Operating Systems

There are many operating systems that are compatible with the RPi.

A list of some of the supported operating systems and downloads for them can be found [here.](http://www.raspberrypi.org/downloads)

### Occidentalis

A port of the Raspian OS by Adafruit industries which makes the OS more hacker friendly. It provides hardware SPI and I2C support, Realtek RTL8188CUS WiFi support (a common chipset used in USB WiFi modules).

### Pidora

URL: [http://pidora.ca/](http://pidora.ca/)

Pidora is a mod of Fedora for the RPi.

### Raspian

URL: [http://www.raspbian.org/](http://www.raspbian.org/)

A Debian-based (Ubuntu-like) operating system optimised for running on the RPi. It is one of the most popular operating systems for the RPi. Provides a config menu the first time you boot, where you can change settings such as the password, enabling SSH, expanding the file system to use the entire SD card, and configuring the keyboard/mouse.

You can bring up the config menu at any time by typing the command sudo raspi-config.

To load up the GUI from the command-line, type startx.

To shutdown the GUI from the command-line, type sudo shutdown "now" (this also shuts down any other processes).

The nano text editor comes pre-installed, type nano to load it.

### RISC OS

URL: [https://www.riscosopen.org/wiki/documentation/show/Welcome%20to%20RISC%20OS%20Pi](https://www.riscosopen.org/wiki/documentation/show/Welcome%20to%20RISC%20OS%20Pi)

A version of the RISC OS (a operating system dating back to 1987 for 32-bit ARM chips) for the RPi.

## Music Orientated

### Pi MusicBox


<table>
<tbody >
<tr >

<td >Supported Music Sources
</td>

<td >



  * Apple AirPlay
  * DLNA streaming from phone/tablet
  * Google Music
  * MP3/OGG/FLAC/AAC (on SD Card, USB or Network)
  * Spotify
  * Soma FM
  * SoundCloud
  * Subsonic


</td>
</tr>
<tr >

<td >Supported Platforms
</td>

<td >



  * Raspberry Pi


</td>
</tr>
<tr >

<td >Structure
</td>

<td >



  * Mopidy (which itself is MPD)


</td>
</tr>
<tr >

<td >Licensing
</td>
<td >
  * Open Source
</td>
</tr>
</tbody>
</table>

### Volumio


<table>
<tbody >
<tr >

<td >Supported Music Sources
</td>

<td >
  * Apple Airplay
</td>
</tr>
<tr >

<td >Supported Platforms
</td>

<td >
  * Cubox
  * Beaglebone Black
  * Raspberry Pi
  * Udoo


</td>
</tr>
<tr >

<td > 
</td>

<td > 
</td>
</tr>
<tr >

<td >Licensing
</td>

<td >
  * Open Source
</td>
</tr>
</tbody>
</table>

Comments:

Volumio began as the RaspyFi project in December 2012. It then expanded to support many embedded platforms including the Udoo and BeagleBoard. IMO, Volumio looks more polished than the Pi MusicBox.

## RPi Store

There is an [official RPi store](http://store.raspberrypi.com/projects) that offers applications and games (some cost, some are free) for the RPi.

## Video Output

The RPi has two native video outputs, HDMI, and RCA/composite. **You cannot use both at the same time. **Converting any of these two to VGA is rather expensive.

## DSI

The RaspberryPi also has a DSI output connector (the 15-pin connector that is not on the edge of the board), which is a high-speed, differential, serial point-to-point bus designed by the mobile industry to connect a host controller up to a graphics display device (normally an LCD screen). However, it is very difficult to use these on the RaspberryPi, as the pins are controller by the GPU, which is controlled by closed software written by Broadcom. I don't know of anyone who has managed to connect anything to this 15-pin connector!

## Controlling The GPIO

[Understanding Outputs](http://www.thebox.myzen.co.uk/Raspberry/Understanding_Outputs.html) explains the GPIO pins on the RaspberryPi really well.

Check out the [Quick2wire Python API repo](https://github.com/quick2wire/quick2wire-python-api), this allows to to control the RPi's GPIO from a python script.

There is also the [pi-gpio module](https://npmjs.org/package/pi-gpio) for controlling GPIO with [nodejs](/programming/languages/nodejs). Good for when you are wanting to control the RPi GPIO from across a network (remotely).

{{< figure src="/images/project-autoelectricblanket/simple-led-connected-to-raspberry-pi-gpio.jpg" caption="I used a single LED connected up to one of the RaspberryPi's GPIO pins for basic testing."  width="800px" >}}

## PWM

The RPi has one hardware PWM output (yes, only one, this isn't a microcontroller). Unfortunately this is shared with the audio system, so you can't use the PWM and listen to audio through the 3.5mm jack at the same time. Other GPIO can be bit-bashed with software PWM.

## How To Change Keyboard Layout

The default keyboard layout is British, so you might find yourself getting a pound sign when you really want a dollar sign (and other quirky differences). To change the keyboard mapping, open the file etc/default/keyboard with a text editor like nano.

## Updating

Assuming you have an internet connection, run:

```sh
sudo apt-get update

sudo apt-get upgrade
```   

## SSH

You can log into a RaspberryPi from another computer using SSH. Type the following command into a terminal:

```sh    
ssh 192.168.1.100 -l pi
```    

where you replace 192.168.1.100 with the IP address of the RaspberryPi (this is the RaspberryPi's local address, which is only accessible via another computer on the intranet). The flag -l pi tells SSH to login with the username pi, not the default username of the calling terminal.

## Useful Packages To Install

```sh    
# GIT repo engine
sudo apt-get install git

## Advanced make-like compiler
sudo apt-get install scons

## GCC/G++ compilers and additional tools
sudo apt-get install build-essential

## C++ wrapper for the perl-compatible regex engine (PCRE)
sudo apt-get install libpcre++-dev

## API for XUL embedders and Gecko applications (the main engine for Mozilla
# programs such as Firefox)
sudo apt-get install xulrunner-dev

## The boost library
sudo apt-get install libboost-dev libboost-program-options-dev libboost-thread-dev libboost-filesystem-dev
```

## Node.js

Node.js will work with the hard-float version of Raspian Wheezy. It takes aggggeeeesss to compile from the source code, but luckily, there is a pre-compiled binary available for the ARM processor which will work on the RaspberryPi.

You can install Node.js on Wheezy by just typing sudo apt-get install nodejs. See below for the harder way.

```sh
sudo mkdir /opt/node
wget http://nodejs.org/dist/v0.10.2/node-v0.10.2-linux-arm-pi.tar.gz
tar xvzf node-v0.10.2-linux-arm-pi.tar.gz
sudo cp -r node-v0.10.2-linux-arm-pi/* /opt/node
```

Then Node.js has to be added to your PATH variable, to do this, type

```sh    
nano /etc/profile
```

And add the following lines before the export variable

```sh    
...
NODE_JS_HOME="/opt/node"
PATH="$PATH:$NODE_JS_HOME/bin"
export PATH
...
```

This [great tutorial on the Kitware blog](http://www.kitware.com/blog/home/post/433) easily explains how to remotely access the RPi using nodejs. Once you have installed Node.js, it also pays to install npm (node package manager), by typing:

```sh    
sudo apt-get install npm
```    

## Uses

## Education

The RPi is great for educating people about computers, as it is cheap and readily available.

## Home Automation

QW Home Automation

Website: [http://qwhomeautomation.com/](http://qwhomeautomation.com/)
Works with [Insteon products](http://www.insteon.com).

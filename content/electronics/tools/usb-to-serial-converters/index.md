---
author: gbmhunter
categories: [ "Electronics", "Tools" ]
date: 2016-07-11
draft: false
tags: [ "USB-to-Serial", "FTDI", "serial", "UART", "converter" ]
title: USB-to-Serial Converters
type: page
---

## FTDI Converters

FTDI (Future Technology Devices International Ltd.) is a popular and reputable designer and manufacturer of USB-to-Serial converters. They make a range of ICs for this purpose, as well and manufacturing useful products which use these ICs (such as USB-to-serial cables).

As of 2016, their ICs are commonly found in good quality USB-to-serial hardware (more so than one of their main competitors, Prolific

## Latency

USB-to-Serial converters introduce a fair bit of delays into serial communications. and depending on your latency requirements, this may effect your design.

{{< img src="ftdi-ic-send-serial-data-conditions-annotated.png" caption="The conditions which will cause an FTDI IC to send received serial data to the computer. Especially notice the 16ms 'latency timer'. Image from 'FTDI – AN232B-04 – Data Throughput. Latency and Handshaking'." width="500px" >}}

The conditions which will cause an FTDI IC to send received serial data to the computer. Especially notice the 16ms "latency timer". Image from "FTDI - AN232B-04 - Data Throughput. Latency and Handshaking".[/caption]

The below image is a screenshot of FTDI RX/TX data captured with a logic analyser. The computer was running Java code which sent an 0x02 response as soon as it received an 0x01 byte.

{{< img src="screenshot-fast-computer-response-ftdi-java-set-latency-timer.png" width="759px" caption="FTDI RX and TX data captured by a logic analyser, with the computer running Java code which responds to 0x01 with 0x02. The 'latency timer' on the FTDI IC has been reduced to 1ms, which gives a much faster response time from the computer (about 1.5ms delay)."  >}}

## Drivers

FTDI provides the Java D2xx API for Android systems. The API is packaged into a file called d2xx.jar and can be downloaded from [http://www.ftdichip.com/Android.htm](http://www.ftdichip.com/Android.htm).

Basic information on the driver software can be found at [http://www.ftdichip.com/Support/Documents/TechnicalNotes/TN_147_Java_D2xx_for_Android.pdf](http://www.ftdichip.com/Support/Documents/TechnicalNotes/TN_147_Java_D2xx_for_Android.pdf).

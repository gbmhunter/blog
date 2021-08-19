---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Operating Systems" ]
date: 2020-12-05
draft: false
lastmod: 2020-12-06
tags: [ "programming", "operating systems", "Azure", "RTOS", "ThreadX", "Microsoft", "NetX", "USBX", "GUIX", "memory usage", "flash", "microcontroller", "cloud", "IoT"
 ]
title: "Azure RTOS ThreadX"
type: "page"
---

{{% warning-is-notes %}}

## Overview

_Azure RTOS ThreadX_ is a open-source RTOS (real-time operating system) suitable for running on embedded microcontrollers. ThreadX also come with a family of components which are all designed to run atop of ThreadX:

* FileX: FAT32-based file system
* NetX: TCP/IP networking stack
* USBX: Embedded USB support.
* GUIX: Embedded UI.

## History

ThreadX first released in 1997. It was started and developed by Express Logic. In April 2019, Microsoft brought Express Logic for an undisclosed sum. ThreadX and it's family of components are still actively maintained as part of Microsoft's embedded Azure IoT platform.

## Memory Usage

{{% img src="azure-rtos-threadx-static-memory-usage-table.png" width="500px" caption="A summary of Azure RTOS ThreadX's static memory (flash) utilization. Image retrieved 2020-12-06 from https://docs.microsoft.com/en-us/azure/rtos/threadx/overview-threadx#most-deployed-rtos." %}}
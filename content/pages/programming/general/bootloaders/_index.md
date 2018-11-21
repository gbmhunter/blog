---
author: gbmhunter
date: 2015-01-09 02:18:15+00:00
draft: false
title: Bootloaders
type: page
url: /programming/general/bootloaders
---

# Overview




Bootloaders are typically loaded by the devices ROM or BIOS.




# Child Pages




[sb_child_list template=2 orderby=title order=asc nest_level=1]




# Golden Image




A golden image is a firmware application with minimal support for firmware updating. If updating over-the-air (OTA), than this image must include basic wireless comms support. It is usually stored either in external flash or in a protected area of the microcontrollers internal memory. It is loaded by the bootloader if the main application is faulty, and in that sense, it is a backup application which is guaranteed to work.

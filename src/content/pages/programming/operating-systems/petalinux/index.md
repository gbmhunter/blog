---
authors: [ "Geoffrey Hunter" ]
date: 2014-03-25
draft: false
title: PetaLinux
type: page
---

## Overview

PetaLinux is a custom version of Linux designed for embedded Xilinx systems. PetaLinux is designed to work with the Zynq-7000, all programmables SOCs, MicroBlaze and PowerPC.

## Compiling For PetaLinux

Programs can be written and cross-compiled for the PetaLinux platform in the Eclipse-based Xilinx SDK (`xsdk`).

By default, the Xilinx SDK installs itself on a Linux machine at `/opt/Xilinx/SDK`. The executable to run the Xilinx SDK is located at `/opt/Xilinx/SDK/<year.quarter>/bin/` and then `lin` if running on a 32-bit machine, or `lin64` if running on a 64-bit machine.

I added the line `PATH="$PATH:/opt/Xilinx/SDK/2013.4/bin/lin64"` to my `~/.bashrc` file, so that I could run the IDE by just typing `sudo xsdk`. Note the sudo, this is important for the IDE to run correctly. Running sudo can corrupt the path, and so I added the line `alias sudo='sudo env PATH=$PATH'` to my `~/.bashrc` file.

I had errors when trying to run `xsdk` for the first time. I believe this was due to me trying to run it on Ubuntu (Debian package manager) when it had been designed for Red Hat (RPM package manager) systems. I fixed these by updating a file in the Xilinx folder from my system library folder.

## Incremental Build Bug

I have experienced a bug with the incremental bug system when programming with C++ in the `xsdk`, which cause the compiled program to do weird things such a **segmentation faults**. After much debugging, I discovered that the constructors of classes created on the stack where not being called, which then caused memory errors (like the segmentation fault) when trying to access members of these non-created/non-initialised variables.

The only way to fix this (and why I guess it is a problem with the incremental build system), is to do a **clean** and then **build**.

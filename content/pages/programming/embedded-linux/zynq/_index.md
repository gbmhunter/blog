---
author: gbmhunter
date: 2017-04-12 04:05:40+00:00
draft: false
title: Zynq
type: page
url: /programming/embedded-linux/zynq
---

# Overview




**The Zynq is a family of Xilinx FPGAs which incorporate both programmable logic and one or more dedicated ARM Cortex-A9 processors** (because of the inclusion of the processor, it can be referred to as a SoC instead of an FPGA).



[caption id="attachment_14274" align="aligncenter" width="773"][![](/images/2017/04/xilinx-zynq-7000-ZC720-evaluation-kit-photo.png)
](/images/2017/04/xilinx-zynq-7000-ZC720-evaluation-kit-photo.png) The Xilinx ZC720 Evaluation Kit featuring the Zynq-7000 SoC.[/caption]



# Child Pages




[sb_child_list template=2 orderby=title order=asc nest_level=1]




# Acronyms




PL - **P**rogrammable **L**ogic. This refers to the programmable FPGA logic (a.k.a. fabric) inside the Zynq-7000.




PS - **P**rocessing **S**ystem. This refers to the Cortex-A9 subsystem inside the Zynq-7000.




# Variants




**There are two main variants of the Zynq**, the Zynq-7000S, a cheaper cost-optimised FPGA (with one Cortex-A9 processor), and the Zynq-7000, the more powerful and expensive FPGA (with more logic cores and dual Cortex-A9 processors).




# Microblaze




Microblaze, a soft-core CPU architecture provided by Xilinx, can be run on the programmable logic inside the Zynq, in addition to the dedicated Cortex-A9 processor.




# The SDK




The Xilinx **S**oftware **D**evelopment **K**it (SDK) can be used to design and debug Zynq FPGAs.




# Operating Systems




You can run a number of different operating systems on the Cortex-A9 processor inside the Zynq FPGA. These include:





	  * [Yocto-based builds](http://blog.mbedded.ninja/programming/embedded-linux/yocto-project) (Xilinx provides device and dev board support through [meta-xilinx](https://github.com/Xilinx/meta-xilinx))
	  * [PetaLinux](http://blog.mbedded.ninja/programming/operating-systems/petalinux)
	  * Ubuntu (limited support, usually with a GUI)
	  * [Android](http://blog.mbedded.ninja/programming/operating-systems/android)
	  * [FreeRTOS](http://blog.mbedded.ninja/programming/operating-systems/freertos)
	  * [Arch Linux ARM](https://archlinuxarm.org/) (the ARM port of Arch Linux)



# meta-xilinx




**meta-xilinx is the Yocto layer provided by Xilinx to build Yocto-based images for the Zynq architecture.**




The device trees are located at:



    
    meta-xilinx/recipes-bsp/device-tree/




In particular, zynq7-base.dtsi located at meta-xilinx/recipes-bsp/device-tree/files/common/ could be of particular interest because it defines hardware such as the ethernet, UART, I2C, CAN, USB, ADC e.t.c.

---
author: gbmhunter
date: 2017-04-21 17:33:10+00:00
draft: false
title: Installing xsdb And JTAG Drivers
type: page
url: /programming/embedded-linux/zynq/installing-xsdb-and-jtag-drivers
---

# Overview




Use this page to **help you install Diligent JTAG drivers on your computer so you can use JTAG to the Xilinx Zynq-7000 ZC702 board via the micro-USB connection**. No special JTAG programmer is required, as the ZC702 development board has a USB-to-JTAG module on board.



[caption id="attachment_14353" align="aligncenter" width="548"][![](http://blog.mbedded.ninja/wp-content/uploads/2017/04/xilinx-zc702-usb-to-jtag-module-highlighted.png)
](http://blog.mbedded.ninja/wp-content/uploads/2017/04/xilinx-zc702-usb-to-jtag-module-highlighted.png) The Xilinx Zynq-7000 ZC702 development board with the USB-to-JTAG module highlighted.[/caption]



This tutorial is designed for people running a Ubuntu client using VMware on a Windows host.




# Install Diligent JTAG Drivers On Windows




You will need the cable drivers on both Windows and Ubuntu (you need them on Windows so that you can do a USB pass through to the virtual machine). Download and install either Vivado Design Suite (large!) or Vivado Lab Edition (smaller install size) from [https://www.xilinx.com/support/download.html](https://www.xilinx.com/support/download.html) on Windows. This should install the Diligent JTAG drivers.




Once the drivers have been installed on Windows, VMware detects the cable as "Future Devices Digilent Adept USB Device", under VM->Removable Devices. Connect this device to the virtual machine.




Plug the micro USB cable into the ZC702 dev. board and your computer.




**NOTE: On recent versions of Mac OS (as of Aug 2017), it looks like the JTAG device on the ZC-702 is recognized as a "Digilent Adept USB Device" without the installation of any additional drivers.**




# Install Diligent JTAG Drivers And SDK On Ubuntu




Download and install the SDK on Ubuntu (again, from [https://www.xilinx.com/support/download.html](https://www.xilinx.com/support/download.html)). This includes the xsdb program, which is located




Now download and install _Vivado Design Suite_ or _Vivado Lab Edition_ on Ubuntu. Vivado includes the drivers for the JTAG cable, but unlike Windows, **they are NOT automatically installed on Linux**.




To install the drivers on Linux, once Vivado is installed (we assume it's been installed to /opt/Xilinx/), navigate to:



    
    /opt/Xilinx/Vivado/2017.1/data/xicom/cable_drivers/lin64/install_script/install_drivers




And then run the install_drivers script (with admin privileges) that resides in this directory:



    
    gbmhunter@ubuntu:/opt/Xilinx/Vivado/2017.1/data/xicom/cable_drivers/lin64/install_script/install_drivers$ sudo ./install_drivers






[caption id="attachment_14349" align="aligncenter" width="587"][![](http://blog.mbedded.ninja/wp-content/uploads/2017/04/installing-xilinx-digilent-jtag-drivers-ubuntu-snapshot.png)
](http://blog.mbedded.ninja/wp-content/uploads/2017/04/installing-xilinx-digilent-jtag-drivers-ubuntu-snapshot.png) A snapshot of the terminal output while installing the Xilinx "Digilent" JTAG drivers on Ubuntu.[/caption]



# Testing?

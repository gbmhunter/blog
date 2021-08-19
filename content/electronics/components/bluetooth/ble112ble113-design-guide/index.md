---
authors: [ "Geoffrey Hunter" ]
date: 2015-02-18
draft: false
title: BLE112/BLE113 Design Guide
type: page
---

## UART And USB

The UART and USB peripherals onboard the BLE113 module use the concept of endpoints. That is, there are different pin configurations available for each UART or USB module, and the specific one in use is called the endpoint (similar to how many microcontrollers work).

The endpoints can be configured in the hardware.xml file, which has to be programmed onto the module. You cannot use OTA programming to do this.

## Over-The-Air (OTA) Programming

The BLE113 module supports OTA programming for a limited number of sections in the device. 

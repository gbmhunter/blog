---
author: gbmhunter
date: 2011-09-08 23:51:50+00:00
draft: false
title: GPRS
type: page

---

# Overview

GPRS (General Packet Radio Service) allows data to be sent over a cellular network (i.e. the same network cellphones use) in a cost-effective and efficient manner. It can be used on 2G and 3G.

{{< figure src="/images/2011/09/dev-kit-featuring-sim900-gprs-module-and-sma-antenna.jpg" width="398px" caption="Development kit featuring the SIM900 GPRS module and a SMA antenna."  >}}

# GPRS Modules

If you want to use GPRS for a project, unless you double as an RF and embedded brain-child, you want to buy a GPRS module. GPRS modules can also support CSM modes (the data transmission mode used for a typical phone call).

These modules usually use the AT command interface for communication. The reference guides for these are huge (100-1000 pages)!.

They can also have native support for speakers and microphones for phone calls, reducing the required number of external components. The amplifiers/receivers typically have noise reduction and echo supressors built in.

# Popular AT Commands

AT+E1 - Enable echoing of commands  

AT+E0 - Disable echoing of commands  

AT+CGPRS - Check to see if modem is in GPRS coverage  

AT+MIPCALL - Creates a wireless PPP connection with the server and returns a IP address for the modem  

AT+CSQ - Return signal strength (RSSI) and bit error information

# Examples

The Motorola G30 - A thin, flat SMD GPRS module. Features SIM support, an audio interface, and a SPI logger.

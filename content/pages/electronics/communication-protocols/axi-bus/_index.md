---
author: gbmhunter
date: 2015-02-16 21:27:48+00:00
draft: false
title: AXI Bus
type: page
url: /electronics/communication-protocols/axi-bus
---

# Overview

The Advanced eXtensible Interface (AXI) bus is part of the ARM AMBA, a family of open-standard on-chip microcontroller buses first introduced in 1996. The AXI bus was part of the third generation AMBA interface. It is designed for on-chip, high-speed interconnects (sub-micrometer to micrometer connection distance).

The AXI bus is the most widely used AMBA interface. The bus use has long since expanded from just use within microcontrollers, and is now used within SoC's and FPGAs.

# Protocol

The protocol has separate address/control and data phases. It supports un-aligned data transfers with byte strobes. It uses burst-based data transfers with only the start address provided. It supports out-of-order transaction completion. It has separate read and write channels.

{{< figure src="/images/2015/02/axi-bus-channel-architecture-of-reads-and-writes-diagram.png" width="422px" caption="The AXI bus channel architecture. Image from http://www.xilinx.com/support/documentation/ip_documentation/axi_ref_guide/v13_4/ug761_axi_reference_guide.pdf." caption-position="bottom" >}}

# Versions

As of February 2015, AXI4 was the latest version of the bus. There is also AXI4-Lite.

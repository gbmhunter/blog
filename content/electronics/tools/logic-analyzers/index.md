---
author: "gbmhunter"
categories: [ "Electronics", "Tools" ]
date: 2020-05-19
description: "A tutorial on what logic analyzers are used for and the various makes and models that exist."
draft: false
lastmod: 2020-05-19
tags: [ "electronics", "tools", "logic analyzers", "Saleae", "DreamSourceLab", "DSView", "digital", "communication protocols", "sigrok", "decode" ]
title: "Logic Analyzers"
type: "page"
---

## Overview

Logic analyzers are electronic tools which connect to digital circuitry and decode serial or parallel communication protocols.

High-end oscilloscopes now include logic analyzers, either built-in or as an additional module/license. Tektronic charges a license per communication protocol. 

## Saleae

Saleae is probably the most expensive well-known logic analyzer brand. As of April 2020, the 8-channel, 500MS/s (Samples/second), 100MHz, USB3.0 Saleae logic analyzer (the _Logic Pro 8_) will cost USD$699, which is quite a lot of money for JUST a logic analyzer.

## DreamSourceLab

DreamSourceLab provides the _DSView_ software for viewing the digital signals from the _DSLogic_ series of logic analyzers. _DSView_ is compatible with Windows, MacOS and Linux. It uses the _sigrok project_ to provide all of the protocol decoders and therefore supports many of the protocols listed on [https://sigrok.org/wiki/Protocol_decoders](https://sigrok.org/wiki/Protocol_decoders).

{{% img src="dsview-v1.1.2-screenshot.png" width="700px" caption="A screenshot of the DSView v1.1.2 software." %}}

Whilst a setup `.exe` is provided for Windows and a `.dmg` for MacOS, no pre-built executables are provided for Linux, and you have to build yourself from the source code. Easy instructions are provided in the `INSTALL` text file.

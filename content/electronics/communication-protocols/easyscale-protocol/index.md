---
author: "gbmhunter"
date: 2020-09-22
draft: false
lastmod: 2020-09-22
tags: [ "electronics", "communication protocols", "EasyScale", "TI", "Texas Instruments", "LEDs", "drivers" ]
title: "EasyScale Protocol"
type: "page"
---

{{% warning-is-notes %}}

## Overview

_EasyScale_ is a 2-way, half-duplex, single-wire communication protocol by Texas Instruments used by some of it's LED driver ICs to allow a microcontroller to digitally control the LED current/PWM settings with a single wire.

{{% img src="easyscale-bit-coding-diagram-ti.png" width="700px" caption="A bit coding diagram of the EasyScale communication protocol. Image from https://www.ti.com/lit/ds/symlink/lm3404.pdf." %}}
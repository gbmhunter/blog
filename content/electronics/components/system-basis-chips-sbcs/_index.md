---
authors: [Geoffrey Hunter]
categories: [Electronics, Components]
date: 2024-04-03
description:
draft: false
lastmod: 2024-04-03
tags: [electronics, components, system basis chips, SBC]
title: System Basis Chips (SBCs)
type: page
---

## Overview

A system basis chip (SBC) is a integrated circuit which contains many of the functions of an automotive electronic control unit (ECU) on a single die[^wikipedia-system-basic-chip].

SBCs are offered by many IC manufacturers including:

* Texas Instruments
* NXP
* Infineon
* STMicroelectronics

{{% figure src="_assets/nxp-fs26-architecture-block-diagram.png" width="700px" caption="Architecture block diagram of the NXP FS26 SBC[^nxp-fs26-product-page]." %}}

SBCs are similar in functionality to power management ICs (PMICs). SBCs appear to have more of a automotive focus with the addition of CAN and LIN transceivers, along with the addition of automotive functional safety blocks (e.g. rated to ASIL-B, ASIL-D) such as fail-safe outputs.

## References

[^wikipedia-system-basic-chip]: Wikipedia (2020, Jan 6). _System basis chip_. Retrieved 2024-04-03, from https://en.wikipedia.org/wiki/System_basis_chip.
[^nxp-fs26-product-page]: NXP. _Safety System Basis Chip with Low Power, for ASIL D Systems_ [product page]. Retrieved 2024-04-03, from https://www.nxp.com/products/power-management/pmics-and-sbcs/system-basis-chips/safety-system-basis-chip-with-low-power-for-asil-d-systems:FS26.

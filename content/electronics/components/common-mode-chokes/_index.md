---
author: "gbmhunter"
categories: [ "Electronics", "Electronic Components" ]
date: 2021-01-18
description: "Schematic symbols, designators, manufacturing part numbers are more info about common-mode chokes."
draft: false
lastmod: 2021-01-19
tags: [ "electronics", "components", "common-mode chokes" ]
title: "Common-mode Chokes"
type: "page"
---

{{% warning-is-notes %}}

## Overview

Common-mode chokes 

Power-line filters?

Find them on DigiKey under [Filters -> Common Mode Chokes](https://www.digikey.co.nz/products/en/filters/common-mode-chokes/839) (CMC).

Commmon-mode chokes are good at filtering out high frequency common-mode noise. For filtering out differential-mode noise, see the {{% link text="Ferrite Bead page" src="/electronics/components/ferrite-beads" %}}.

## Schematic Symbol And Designator

**A common-mode choke is typically drawn as two inductors separated by two lines**. The two lines represent the inductive coupling between the two inductors. A common-mode choke has 4 pins. Typical designator prefixes are `L` (which is also used for a single inductor) or `FL` (for FiLter).

{{% img src="common-mode-choke-schematic-symbol.png" width="300px" caption="The schematic symbol for a common-mode choke." %}}

## How It Works

A common-mode choke blocks common-mode noise (noise which is equal in voltage/current at the same time on two signals, typically power and ground). At this point you might be wondering, how can the current be going in the same direction down both wires, doesn't the current need a return path? The key is to understand that **common-noise finds a way back to it's source through an external ground and capacitive coupling**. The following diagram attempts to illustrate this: 

{{% img src="common-mode-choke-how-it-works-diagram.svg" width="700px" caption="Diagram showing how a common-mode choke works." %}}

The other type of noise, differential noise, is not blocked with a common-mode choke. To block differential noise, you need to use something such as a ferrite bead in a pi-filter configuration (the capacitors are not needed, but greatly help!).

{{% img src="differential-noise-diagram.svg" width="700px" caption="Diagram showing what differential noise is and how it is commonly suppressed." %}}

## Manufacturer Part Numbers

* **BNX023-01L**: Expensive but performant power-line filter by Murata. 
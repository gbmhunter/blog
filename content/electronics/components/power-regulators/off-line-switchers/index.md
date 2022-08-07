---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Electronic Components", "Power Regulators" ]
date: 2016-06-28
draft: false
tags: [ "power regulator", "off-line switchers", "isolation" ]
title: Off-line Switchers
type: page
---

## Overview

Off-line switchers convert a usually high AC input voltage (e.g. 240VAC mains supply) down to a IC level DC voltage (e.g. 5V). Their design is based on a _flyback regulator_ circuit. 

## Terminology

The term "_off-line switchers_" comes from the fact that the DC output voltage is derived straight from the AC input (the DC voltage comes straight "off" the line (AC)). 

IMHO, this was a **bad name choice**, as many people would assume it is related to being offline (disconnected), rather than online. Remember back to when dot-matrix printers had a "online" LED?

## Isolation

Both isolated and non-isolated off-line switchers exist on the market.

{{% figure src="offline-switcher-complete-isolated-flyback-switching-supply-schematic-ti.png" width="651px" caption="Schematic of a isolated off-line switcher by TI. Image from http://www.ti.com."  %}}

And here is an example of a non-isolated version:

{{% figure src="offline-switcher-linkswitch-tn-typical-application-schematic.pdf.png" width="625px" caption="A typical application schematic for the LinkSwitch-TN family of non-isolated off-line switchers by Power Integrations. Image from www.power.com."  %}}

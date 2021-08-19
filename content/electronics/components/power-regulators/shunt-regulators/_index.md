---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Electronic Components", "Power Regulators" ]
date: 2021-01-26
description: "Architectures, schematic symbols, functional diagrams and more info on 2 and 3-pin shunt voltage regulators."
draft: false
lastmod: 2021-01-26
tags: [ "electronics", "components", "power supplies", "shunt regulators", "Zeners", "Zener diodes", "voltage references" ]
title: "Shunt Regulators"
type: "page"
---

## Overview


## Architectures

* Two-pin shunt regulators
* Three-pin shunt regulators

## Three-Pin Shunt Regulators

A three-pin shunt voltage regulator is typically drawn as a Zener diode with a third pin coming from the middle and out to the side. 

{{% img src="three-pin-shunt-regulator-schematic-symbol.png" width="300px" caption="The schematic symbol for a three-pin shunt voltage regulator, with the pin names also shown." %}}

This can be confusing, as a three-pin shunt regulator is an IC (integrated circuit) that typically contains an op-amp, and BJT transistor along with the Zener! This is also reflected by the `U` IC designator prefix which is commonly used for these devices. The following image shows what actually is inside one of these devices:

{{% img src="three-pin-shunt-regulator-functional-diagram-ti.png" width="300px" caption="The internal functional diagram of a three-pin shunt regulator. Note that there is much more to one of these than just a simple Zener diode! Image from https://www.ti.com/lit/ds/symlink/lm431.pdf, retrieved 2021-01-26." %}}


## Manufacturer Part Numbers

* **431**: Very common shunt regulator.
* **LM431**: Shunt regulator from Texas Instruments based on the 431 series.

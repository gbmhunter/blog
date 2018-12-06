---
author: gbmhunter
date: 2015-11-23 23:31:14+00:00
draft: false
title: Varistors (VDRs)
type: page

---

# Overview

A varistor (also known as a voltage-dependent resistor, VDR) is an electrical component whose resistance depends on the applied voltage. As the voltage increases, the resistance of a varistor drops. Their voltage-resistance behaviour is similar to that of a diode, except a varistor exhibits this behaviour with voltages of both polarities (where diodes are a one-way device).

They can also be called MOVs, but is strictly a type of varistor named after it's inclusion of a metal-oxide chemical.

They are commonly used as a form of circuit-protection against voltage transients, especially in mains and other high voltage applications.

Because their resistance in not fixed, they are called non-Ohmic devices. Note that this does not mean they do not obey Ohm's law, it's just that the resistance is different for each operating point.

# Schematic Symbol

{{< figure src="/images/2015/11/varistor-schematic-symbol.png" width="327px" caption="The schematic symbol for a varistor (a.k.a. voltage-dependent resistor, VDR)."  >}}

# Important Parameters

## Varistor Voltage

This is the voltage at which the varistor starts to "conduct". The varistor is considered conducting when the current through it exceeds some small threshold amperage (typically 1mA).

## Surge Current

The surge current rating is an indication of how much current the varistor can withstand during a voltage transient event.

## Energy Rating

Typically a one-off (non-repetitive) and repetitive pulse energy rating is given for the varistor. The ratings are normally given for standardised transients, such as the 8/10 or 10/1000.

# Comparison With Other Forms Of Circuit Protection

Varistors are preferred over TVS diodes when the product is price-sensitive, higher surge energy absorption is required, when physical space is not a constraint, or when high operating voltage capability is required. 

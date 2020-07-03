---
author: "gbmhunter"
categories: [ "Electronics", "Circuit Design" ]
date: 2013-12-16
description: "CMOS, TTL, latch-up and other info about logic families."
draft: false
lastmod: 2020-07-03
tags: [ "electronics", "circuit design", "logic families", "electrical signal types", "CMOS", "latch-up", "TTL", "transistor-transistor logic" ]
title: "Logic Families"
type: "page"
---

## Overview

Logic families are groups of basic digital logic electronic circuits (and, or, nor gates e.t.c), where each group consists of a different semiconductor technology from which the logic gates are built from. Within a family the voltage levels and signalling should be compatible between the various inputs and outputs.

Logic families are sorted in alphabetical order. Take note that there may be a low-voltage equivalent of many signal types under the prefix "LV" (e.g. TTL and LVTTL).

## CML

> See PECL.

## CMOS

### Overview

CMOS (_complementary metal-oxide semiconductor_) is the most widespread logic family in use today. CMOS logic is built from P-channel (PMOS) and N-channel (NMOS) {{% link text="MOSFETs" src="/electronics/components/transistors/mosfets" %}}.

{{< img src="logic-family-cmos-technologies-voltage-vs-speed.png" width="762px" caption="A comparison of voltage vs. speed for a range of CMOS-based logic families. Image from http://www.ti.com/." >}}

### Latch-up

CMOS logic suffers from a phenomenon known as _latch-up_. This is when a **short occurs between a power-rail and pin** in an CMOS-based IC, usually causing serious operation problems if not destruction of the IC. Once latch-up is triggered, it cannot be removed until the circuit is power-cycled.

Latch-up occurs because the PN junctions that form the **PMOS and NMOS switching elements form parasitic {{% link text="PNPN thyristors (SCRs)" src="/electronics/components/transistors/silicon-controlled-rectifiers-scrs" %}}**[^ti-latch-up-white-paper]. A latch-up has to be initially triggered by an over-voltage/current condition which causes the voltage on a pin to go at least one diode drop above the rail voltage.

### AUC

Advanced ultra-low CMOS (AUC) is a CMOS logic family. It is optimised for 1.8V operation and voltage tolerant up to 3.6V.

### LVCMOS

Voltage specifications:

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Minimum</th>
      <th>Typical</th>
      <th>Maximum</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>\( V_{CCO} \)</td>
      <td>2.3V</td>
      <td>2.5V</td>
      <td>2.7V</td>
    </tr>
    <tr>
      <td>\( V_{REF} \)</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>\( V_{TT} \)</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>\( V_{IH} \)</td>
      <td>1.7V</td>
      <td>-</td>
      <td>3.6V</td>
    </tr>
    <tr>
      <td>\( V_{IL} \)</td>
      <td>-0.5V</td>
      <td>-</td>
      <td>0.7V</td>
    </tr>
    <tr>
      <td>\( V_{OH} \)</td>
      <td>1.9V</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>\( V_{OL} \)</td>
      <td>-</td>
      <td>-</td>
      <td>0.4V</td>
    </tr>
    <tr>
      <td>\( I_{OH} @ V_{OH} \)</td>
      <td>-12mA</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>\( I_{OL} @ V_{OL} \)</td>
      <td>12mA</td>
      <td>-</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

## CSEF

> See PECL.

## CSL

> See PECL.

## DCS (Differential Current Switch)

## DTLL (Differential Transistor-Transistor Logic)

DTLL is a differential signal type that is similar to standard to TTL. Because of it's differential nature, DTLL is preferred over TTL for communications over long cables. DTLL comes under the category HVDS (high-voltage differential signalling), and is the most popular choice in this category.

## LVTTL

LVTTL is the low-voltage version of TTL.

Common drive-strengths are 24mA.

### Converters

TI SN65LVELT23 converts LVPECL and LVDS to LVTTL.

## LVDS

### Stats

Mode                                    | Differential
----------------------------------------|------------------------
Logic High (`\(V_{OH}\)`)               | 1.55mV (+3.5mA through 100Ω)
Logic Out Low (`\(V_{OL}\)`)            | 0.95mV (-3.5mA through 100Ω)
Common-mode Voltage (`\(V_{CMO}\)`)     | 1.20V
Power (`\(P\)`)                         | 8.75mW (@ `\(V_{CC}=2.5V\)`)

Because the current is kept constant (3.5mA), it doesn't put as much pressure on the decoupling capacitors to provide the energy during switching states. The low common-mode voltage (1.20V), allows this signalling standard to be used with a wide variety of ICs with power supplies down to 2.5V or lower.

LVDS consumes very little power compared to other differential signalling techniques. At a 2.5V supply, the power to drive a line with LVDS is 8.75mW

### Converters

TI SN65LVELT23 converts LVPECL and LVDS to LVTTL.

## LVPECL (Low-Voltage Emitter-Coupled Logic)

LVPECL is the low-voltage version of PECL.

### Converters

TI SN65LVELT23 converts LVPECL and LVDS to LVTTL.

## HSTL

HSTL compares the input voltage with a reference voltage.

## PECL (Emitter-Coupled Logic)

PECL is also called CSL (current-steering logic), CML (current-mode logic) or CSEF (current-switch emitter-follower logic).

The MOSFET-based equivalent of PECL is SCFL (source-coupled logic).

## SCFL (Source-Coupled Logic)

The transistor-based equivalent of SCFL is PECL (emitter-coupled logic).

## TTL

TTL (_transistor-transistor logic_) is a very common voltage level signal used by many embedded devices today. Even though the standard "high" is 5.0V, many systems transmit logic highs at 3.3V.

Low: 0-0.8V
High: 2-5.0V

Power dissipation: 10mW per gate[^ni-differences-between-cmos-ttl]
Propagation delay: 10ns when driving a 15pF/400Ohm load[^ni-differences-between-cmos-ttl]


[^ni-differences-between-cmos-ttl]: [https://knowledge.ni.com/KnowledgeArticleDetails?id=kA00Z000000P9yaSAC](https://knowledge.ni.com/KnowledgeArticleDetails?id=kA00Z000000P9yaSAC)
[^ti-latch-up-white-paper]: <https://www.ti.com/lit/wp/scaa124/scaa124.pdf>. Retrieved 2020-07-03.
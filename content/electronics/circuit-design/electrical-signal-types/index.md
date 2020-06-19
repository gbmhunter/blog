---
author: "gbmhunter"
categories: [ "Electronics", "Circuit Design" ]
date: 2013-12-16
draft: false
lastmod: 2020-06-19
tags: [ "electronics", "circuit design", "electrical signal types", "CMOS", "TTL", "transistor-transistor logic" ]
title: "Electrical Signal Types"
type: "page"
---

Signal types are sorted in alphabetical order. Take note that there may be a low-voltage equivalent of many signal types under the prefix "LV" (e.g. TTL and LVTTL).

## CML

> See PECL.

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

## Converters

TI SN65LVELT23 converts LVPECL and LVDS to LVTTL.

## LVDS

### Stats

Mode                                    | Differential
----------------------------------------|------------------------
Logic High (`\(V_{OH}\)`)               | 1.55mV (+3.5mA through 100Ω)
Logic Out Low (`\(V_{OL}\)`)            | 0.95mV (-3.5mA through 100Ω)
Common-mode Voltage (`\(V_{CMO}\)`)     | 1.20V
Power (`\(P\)`)                         | 8.75mW (@`\($V_{CC}=2.5V\)`

Because the current is kept constant (3.5mA), it doesn't put as much pressure on the decoupling capacitors to provide the energy during switching states. The low common-mode voltage (1.20V), allows this signalling standard to be used with a wide variety of ICs with power supplies down to 2.5V or lower.

LVDS consumes very little power compared to other differential signalling techniques. At a 2.5V supply, the power to drive a line with LVDS is 8.75mW

### Converters

TI SN65LVELT23 converts LVPECL and LVDS to LVTTL.

## LVPECL (Low-Voltage Emitter-Coupled Logic)

LVPECL is the low-voltage version of PECL.

### Converters

TI SN65LVELT23 converts LVPECL and LVDS to LVTTL.

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
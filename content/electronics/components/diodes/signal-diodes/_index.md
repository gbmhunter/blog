---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Electronic Components", "Diodes" ]
date: 2011-09-05
description: "Info about signal diodes."
draft: false
lastmod: 2022-07-16
tags: [ "electronics", "diodes", "components", signal, signal diodes ]
title: Signal Diodes
type: "page"
---

## Overview

_Signal diodes_ (a.k.a. _small signal diodes_) are designed for rectification of low power signals rather than the higher power electronics that general purpose diodes are designed to rectify. Although they can't handle high currents or high reverse voltages, they benefit from being able switch faster and therefore more suitable for higher frequency operation. Signal diodes are built in two different ways:

* Point contact diode
* Glass passivated diode

{{% figure src="1n4148-small-signal-diode-photo-on-semi.png" width="200" caption="Photo of the small signal 1N41488 diode by onsemi in the DO-35 component package. Image (C) onsemi." %}}

SPICE model for the small signal `1N4148` diode:

```
.model 1N4148 D 
+ IS = 4.352E-9 
+ N = 1.906 
+ BV = 110 
+ IBV = 0.0001 
+ RS = 0.6458 
+ CJO = 7.048E-13 
+ VJ = 0.869 
+ M = 0.03 
+ FC = 0.5 
+ TT = 3.48E-9
```
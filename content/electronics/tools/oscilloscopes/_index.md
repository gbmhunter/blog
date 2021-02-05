---
author: "gbmhunter"
categories: [ "Electronics", "Tools" ]
date: 2021-02-05
description: "Info on oscilloscopes."
draft: false
lastmod: 2021-02-05
tags: [ "electronics", "tools", "oscilloscopes", "probes", "passive", "active", "Keysight" ]
title: "Oscilloscopes"
type: "page"
---

{{% warning-is-notes %}}

## Overview

## Probes

* Passive: Non-powered
* Active: Powered with active buffering and/or amplification of the signal within the probe itself (before it gets to the oscilloscope).

10:1 probes are the industry standard.

Capacitance increases when you go from 10:1 to 1:1. e.g. a 10:1 passive probe may have 10pF of capacitance while an equivalent 1:1 probe may have approx. 100pF. You also lose some input resistance, e.g. it drops from `\(10M\Omega\)` to `\(1M\Omega\)`.

1:1 probes can be good for measuring small levels of noise as they effectively increase the minimum resolution of the oscilloscope by 10 (compared to a 10:1 probe).
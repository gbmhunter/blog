---
author: gbmhunter
categories: [ "Electronics", "Electronic Components" ]
date: 2015-11-02
draft: false
tags: [ "TRIAC", "component", "semiconductor", "schematic symbol" ]
title: TRIACs
type: page
---

## Overview

A TRIAC is a 4-layer semiconductor device that conducts current in either direction when given a signal.

The name TRIAC is a generic trademark and is an abbreviation of _TRIode for Alternating Current_. The formal names for a TRIAC are _bidirectional triode thyristor_ or _bilateral triode thyristor_, although these names are rarely used.

## Schematic Symbol

The schematic symbol for the TRIAC is shown below:

{{< img src="triac-schematic-symbol-with-pin-names.png" width="255px" caption="The schematic symbol for the TRIAC, with pin names."  >}}

The anodes A1 and A2 may be called Main Terminal 1 (MT1) and Main Terminal 2 (MT2) respectively.

## Component Parameter Descriptions

**Repetitive Peak Off-State Voltage (50-60Hz)**

The maximum repetitive peak voltage (`\(V_{DSM}\)`) allowed across the device. Remember that RMS voltage readings need to be multiplied by `\(\sqrt{2}\)` to find the peak voltage (assuming a sinewave).

**Non-repetitive Off-State Voltage**

The maximum off-state peak voltage across A1 and A2 that is non-repetitive. Normally this is defined to pulses less than 10ms wide.

## Gate Currents

A "normal" TRIAC might have a gate trigger current (`\(I_{gt}\)`) of 20-50mA. A "sensitive" TRIAC might have an `\(I_{gt}\)` of 2-10mA.

## Part Numbering

Many TRIACs begin with/include the three-letter term _BTA_.

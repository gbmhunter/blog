---
author: gbmhunter
date: 2015-11-02 01:06:49+00:00
draft: false
title: TRIACs
type: page
url: /electronics/components/triacs
---

[mathjax]

# Overview

A TRIAC is a 4-layer semiconductor device that conducts current in either direction when given a signal.

The name TRIAC is a generic trademark and is an abbreviation of _TRIode for Alternating Current_. The formal names for a TRIAC are _bidirectional triode thyristor_ or _bilateral triode thyristor_, although these names are rarely used.

# Schematic Symbol

The schematic symbol for the TRIAC is shown below:

[caption id="attachment_12505" align="aligncenter" width="255"][![The schematic symbol for the TRIAC, with pin names.](/images/2015/11/triac-schematic-symbol-with-pin-names.png)
](/images/2015/11/triac-schematic-symbol-with-pin-names.png) The schematic symbol for the TRIAC, with pin names.[/caption]

The anodes A1 and A2 may be called Main Terminal 1 (MT1) and Main Terminal 2 (MT2) respectively.

# Component Parameter Descriptions

<table ><tbody ><tr >
<td style="width: 100px;" >Parameter
</td>
<td >Name  
Description
</td></tr><tr >
<td >\(V_{DRM}\)
</td>
<td >

**Repetitive Peak Off-State Voltage (50-60Hz)**

The maximum repetitive peak voltage allowed across the device. Remember that RMS voltage readings need to be multiplied by \(\sqrt{2}\) to find the peak voltage (assuming a sinewave).

</td></tr><tr >
<td >\(V_{DSM}\)
</td>
<td >

**Non-repetitive Off-State Voltage**

The maximum off-state peak voltage across A1 and A2 that is non-repetitive. Normally this is defined to pulses less than 10ms wide.

</td></tr></tbody></table>

# Gate Currents

A "normal" TRIAC might have a gate trigger current (\(I_{gt}\)) of 20-50mA. A "sensitive" TRIAC might have an \(I_{gt}\) of 2-10mA.

# Part Numbering

Many TRIACs begin with/include the three-letter term _BTA_.

---
authors: [ "Geoffrey Hunter" ]
categories: [ "PCB Design" ]
date: 2015-12-01
draft: false
tags: [ "PCB design", "impedance", "routing", "dielectrics", "characteristic impedance", "waveguides", "microstrips", "striplines" ]
title: Striplines
type: page
---

## Overview

Striplines are impedance controlled transmission lines that are embedded on a middle layer (not the top or bottom) of a PCB, and have a copper pour both above and below them. This is opposed to microstrips, which are on either the top or bottom layers of a PCB, and have free space above and a copper pour below them.

## Edge-Coupled Striplines

Edge-coupled striplines are differential transmission striplines where both **tracks lay on the same plane**, i.e. are both on the same internal PCB copper layer. This is as opposed to a _broad-side coupled stripline_ in where the tracks are ontop of each other.

{{< img src="edge-coupled-stripline-impedance-controlled-routing-diagram-with-dimensions.png" width="827px" caption="A cross-sectional diagram of a edge-coupled stripline, showing the common names for the dimensions."  >}}

Because they only involve three layers (broad-side coupled involves 4 copper layers), edge-coupled striplines are **easier to route in low-layer boards** (4-8), while still adhering to good EMI practices and maintaining high copper utilisation.

## Calculations

The calculations to find the differential impedance for edge-coupled striplines are not simple. They involve elliptic integrals of the first kind, which are not supported natively by basic calculators nor Excel.

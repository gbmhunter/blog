---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Tools" ]
date: 2021-02-05
description: "Info on oscilloscopes."
draft: false
lastmod: 2021-02-09
tags: [ "electronics", "tools", "oscilloscopes", "scope", "probes", "compensation", "passive", "active", "Keysight", "Tektronix", "Tenma", "Rigol" ]
title: "Oscilloscopes"
type: "page"
---

{{% warning-is-notes %}}

## Overview

An _oscilloscope_ (or just _scope_) is to an electrical engineer what a hammer is to a builder. It is a general purpose tool which lets you view voltages (and currents) in a circuit over time. It's cheaper counterpart is a digital multimeter, however they can typically only display the voltage with an update rate of a few Hertz, and only display a discrete value, not the waveform over time. Oscilloscopes can also measure much faster signals and much faster rates and trigger (take a snapshot) on specific conditions. They typically also have multiple input channels (at least two) so you can compare two voltage waveforms side-by-side.

Mixed-signal oscilloscopes (MSOs) measure both traditional analogue signals as well as digital signals.

## Oscilloscope Specifications

### Bandwidth

The bandwidth of a scope defines the range of frequencies it can measure. The upper limit is defined when the observed signal drops by -3dB (drops to 70.7%) of the true value. Because all oscilloscopes start measuring at DC (0Hz), this also defines the highest frequency the scope can measure. El cheapo scopes have a bandwidth of 100MHz. 

## Probes

* Passive: Non-powered
* Active: Powered with active buffering and/or amplification of the signal within the probe itself (before it gets to the oscilloscope).

10:1 probes are the industry standard. Almost all oscilloscopes have an input impedance of `\(1M\Omega\)` when looking into the connector on the front panel of the scope.

Capacitance increases when you go from 10:1 to 1:1. e.g. a 10:1 passive probe may have 10pF of capacitance while an equivalent 1:1 probe may have approx. 100pF. You also lose some input resistance, e.g. it drops from `\(10M\Omega\)` to `\(1M\Omega\)`.

1:1 probes can be good for measuring small levels of noise as they effectively increase the minimum resolution of the oscilloscope by 10 (compared to a 10:1 probe).

### Probe Compensation

Some scope probes allow you to adjust the probes compensation.

Without the variable capacitor, the resistance of the probe combined with the resistance and capacitance of the scope will create a low-pass filter that will greatly distort high frequency measurements. The variable capacitor is added in parallel with the `\(9M\Omega\)` probe resistance so that there is both a resistive and capacitive potential divider. The capacitance is then adjusted so that both the resistor divider and capacitor divider have the same division ratio. This ensures the response of the probe is flat across the frequencies of interest.

## Maths Functions

I have never had great success using the maths functions on a scope to measure differential signals (by using two single-ended inputs and subtracting one from the other).

## Manufacturers

### Keysight

Mid to high-end scope manufacturer, in the same class as Tektronix.

### Tektronix

Mid to high-end scope manufacturer, in the same class as Keysight.

### Tenma

Low-end scope manufacturer.
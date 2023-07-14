---
authors: [ Geoffrey Hunter ]
categories: [ Electronics ]
date: 2016-05-03
draft: false
lastmod: 2023-07-14
tags: [ electronics, emc, design, guidelines, inductors ]
title: EMC Design Guidelines
type: page
---

## Overview

## Inductor Polarity

Inductors don't have a polarity right? Most of the time, they don't. But certain inductors do feature polarity marks for EMC purposes.

When inductors are used in switch-mode power supplies, one side of the inductor is normally connected to what is called the _switching node_. In a buck converter, the switching node is the side of the inductor that gets switched from `\(V_{IN}\)` to `\(GND\)`. In a boost converter, the switching node is the side of the inductor which gets switched from `\(V_{OUT}\)` to `\(GND\)`.

This switching node has a high `\(\frac{dV}{dt}\)` -- it's voltage changes rapidly between two values. The copper on the switching node can act as an antenna and radiate energy, contributing to generated EMC noise. One way to mitigate this is to minimize the amount of copper on the switching node, by placing the components close together and make sure it is shielded with a ground plane.

Some inductors include polarity marks to indicate which side of the inductor has the shortest copper path to the leads. One example is the Coilcraft XAL Family of inductors, including the `XAL7050-223MEC`. shows the top view of the inductor, highlighting the polarity indicator and a note about how to reduce EMI.

{{% figure src="coilcraft-xal7050-showing-polarity-indicator-and-emi-note.png" width="500px" %}}

## Contact vs. Non-Contact Probes

Non-contact probes have the advantage of being easy to use. They do not require you to make and break electrical connections to test the circuit. They don't require you to ground the probe using a very short and obtrusive ground lead. They don't run the risk of shorting out parts of the circuit if your hand slips (non-contact probes are almost always insulated).

## Oscilloscope Probes

The loop made with the probe tip and it's ground connection forms an unshielded antenna which will pick up high frequency noise in it's vicinity.

Most general-purpose oscilloscope have very poor common-mode rejection. The common-mode rejection capability of an oscilloscope probe can be gauged by firstly connecting the probe tip and ground together, and then connecting both up a noisy PCB track. Ideally, the oscilloscope waveform should still be a flat line. The more noise seen on the oscilloscope, the poorer the probe's common-mode rejection.

The impedance mismatch between the noise source, the tracks, the scope probe and oscilloscope may cause reflections to reduce the accuracy of your noise measurements. 

For example, the output impedance of a SMPS may be a few `\(m\Omega\)`, which then connects to the PCB tracks and scope probe, which may have an impedance of `\(50\Omega\)`. This then connects to the oscilloscope which has an impedance in the `\(M\Omega\)`. 

These reflections can be minimised by adding the appropriate termination resistors, e.g. a `\(50\Omega\)` resistor in series with the SMPS (as close to the SMPS output as you can), and then another `\(50\Omega\)` resistor in parallel (shunt to ground), as close to the oscilloscope input as you can. All noise measurements

## Mu-metal

Mu-metal is a nickel-iron alloy with a very high permeability, making it suitable for shielding sensitive equipment against magnetic interference.

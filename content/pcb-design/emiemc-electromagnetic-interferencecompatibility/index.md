---
author: gbmhunter
categoires: [ "PCB Design" ]
date: 2016-05-03
draft: false
title: EMI/EMC (Electromagnetic Interference/Compatibility)
type: page
---

## Overview

> It is very difficult to reduce EM emissions by more than 20dB without serious design changes - Anon

## Contact vs. Non-Contact Probes

Non-contact probes have the advantage of being easy to use. They do not require you to make and break electrical connections to test the circuit. They don't require you to ground the probe using a very short and obtrusive ground lead. They don't run the risk of shorting out parts of the circuit if your hand slips (non-contact probes are almost always insulated).

## Oscilloscope Probes

The loop made with the probe tip and it's ground connection forms an unshielded antenna which will pick up high frequency noise in it's vicinity.

Most general-purpose oscilloscope have very poor common-mode rejection. The common-mode rejection capability of an oscilloscope probe can be gauged by firstly connecting the probe tip and ground together, and then connecting both up a noisy PCB track. Ideally, the oscilloscope waveform should still be a flat line. The more noise seen on the oscilloscope, the poorer the probe's common-mode rejection.

The impedance mismatch between the noise source, the tracks, the scope probe and oscilloscope may cause reflections to reduce the accuracy of your noise measurements. 

For example, the output impedance of a SMPS may be a few `\(m\Omega\)`, which then connects to the PCB tracks and scope probe, which may have an impedance of `\(50\Omega\)`. This then connects to the oscilloscope which has an impedance in the `\(M\Omega\)`. 

These reflections can be minimised by adding the appropriate termination resistors, e.g. a `\(50\Omega\)` resistor in series with the SMPS (as close to the SMPS output as you can), and then another `\(50\Omega\)` resistor in parallel (shunt to ground), as close to the oscilloscope input as you can. All noise measurements

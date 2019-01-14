---
author: "gbmhunter"
date: 2016-04-11
draft: false
title: "How To Calculate Maximum Track Current"
type: "page"
---

## Overview

All tracks (a.k.a. traces) on a PCB have a maximum current limit. For most of the PCB routing process, the PCB designer does not have to worry about this, as most tracks are far larger than than they need to be to carry the tiny currents associated with digital and analogue signals (i.e. the track width is limited by manufacturing tolerances rather than the maximum current it can take).

However, the track current limits do sometimes play an important rule when it comes to sizing power supply traces, motor driver circuitry, mains power circuitry and other tracks which take relatively high current.

## Wait, What Is A Maximum Current Anyway?

You may be wondering what is meant by _maximum_ current. Is it the maximum current before the track "explodes" and spews plasma across the room? Is it the maximum current before the track slowly heats up, starts smoking, and eventually goes open-circuit?

In the interests of circuit board longevity, the "maximum current" is usually specified and neither of the above, but rather the is the **current required to raise the temperature of the track a certain amount above ambient**.

## What Standard Should I Use?

There are two dominant standards in use when it comes to calculating track current.

**One stroke of luck is that IPC-2221A seems to, if anything, under-estimate the current-carrying ability of a track rather than over-estimate.** This is why it can (and is!) still used with success, even with today's multilayer PCBs with complex geometery.

## IPC-2221A

The first standard, IPC-2221A is quite old, and is based of an older standard called IPC-D-275, which is itself based of measurements and graphs drawn in 1954.

IPC-2221A has a single graph (currently figure 6-4), which the following equation for calculating the track current `\(I\)` is derived from:

<div>$$ I = k\Delta T^b A^c $$</div>

<p class="centered">
    where:<br>
    \( k \) = 0.048 for external traces, 0.024 for internal tracks<br>
    \( \Delta T \) = the change in temperature (temperature rise) in \( ^{\circ}C \)<br>
    \( b \) = 0.44<br>
    \( A \) = cross-sectional area in \( mils^2 \)<br>
    \( c \) = 0.725<br>
</p>

The standard only covers values where the current is 0-35A, track width is 0-10.16mm, temperature rise is from 10-100°C, and the copper from 0.5-3oz (which influences the cross-sectional area). Values outside this range are extrapolated (and there more error-prone).

This equation also assumes the track is sufficiently long enough the the end-points do not have a significant effect on the heatsinking. For example, this calculator should not be used for calculating the width of thermal-relief style connections from a copper pour to a via, in where the track is very short (0.2-1.0mm). It also assumes there are no vias along the length of the track.

The current in assumed to be constant (DC). However, you can use the RMS value for a pulsed current as long as the pulses are fast enough.

The temperature of the PCB material should NEVER exceed the relative thermal index (RTI) of the material. This is defined in UL746B as the temperature at which 50% of the materials properties are retained after 100,000 hours.

## IPC-2152

The second standard, IPC-2152, is a much newer standard. It has a more technical and presumably accurate method for calculating the maximum track current.

## History

The data in the IPC-2152 standard is based of two experiments. One was done by Mike Jouppi of Lockheed Martin, and the other by the Naval Surface Warface Center, Crane Division. The results from these two experiments was compiled into IPC-2152 under the heading "_Standard for Determining Current Carrying Capacity in Printed Board Design_"

## The Calculation Steps

Unlike IPC-2221A, IPC-2152 is not just a simple equation.


1. Firstly, use the _Universal Chart_ to calculate an unadjusted cross-sectional area.  

    {{< figure src="/images/2016/04/ipc-2152-universal-chart.png" width="641px" caption="The Universal Chart in IPC-2152 which gives an un-adjusted track cross-sectional area based upon the desired current and temperature rise."  >}}  

2. Then, a bunch of co-efficients (modifiers) are found based on a number of other parameters. The parameters include:  

    - Thermal conductivity of the PCB  
    - The PCB thickness  
    - The proximity of the current-carrying track to a copper plane  
    - The thickness of the current-carrying track  

3. Once all the coefficients are found, they are multiplied with the unadjusted cross-sectional area to give an adjusted cross-sectional area.  

4. The adjusted cross-sectional area

## That's Hard Work, Can It Be Any Easier?

Glad you asked! mbedded.ninja has developed a desktop application called [NinjaCalc](http://mbedded-ninja.github.io/NinjaCalc/), which includes IPC-2221A and IPC-2152 track current calculators (remember, use IPC-2152 wherever possible!).

You can get to the IPC-2221A calculator directly by going to [http://ninja-calc.mbedded.ninja/calc/track-current-ipc-2221a-calculator](http://ninja-calc.mbedded.ninja/calc/track-current-ipc-2221a-calculator).

You can fet to the IPC-2152 calculator directly by going to [http://ninja-calc.mbedded.ninja/calc/track-current-ipc-2152-calculator](http://ninja-calc.mbedded.ninja/calc/track-current-ipc-2152-calculator).

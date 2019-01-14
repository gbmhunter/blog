---
author: gbmhunter
date: 2015-09-25 00:43:35+00:00
draft: false
title: Current Probes
type: page
---

## Overview

Current probes are measurement devices which are used to measure the current flowing through a conductive material, typically a wire or track on the PCB (usually with an appropriate connection loop).

The main disadvantage with a hall-effect or transformer-based current-probe is that the probe tip must encircle the conductor under test. To do this you must use a wire, or provide a special PCB cut-out around the current-carrying trace. Fluxgate magnetometer-based current probes do not have this issue.

A typical current-probe will add a few nH of inductance to the conductor under test. Any additional wire added to the conductor to accommodate the current-probe might add around 10nH per centimeter.

The sensitivity of a current probe can be increase by increasing the number of turns of the wire. Be careful to divide the displayed current on the oscilloscope by the number of turns to get the actual current. Note that increasing the number of turns increases the insertion impedance (the inductance rises with the square of the number of turns).

## Price

Current probes are not cheap! They are significantly more expensive than their voltage-measuring brothers. As of 2016, you can find cheap no-brand ones for US$60-700, and more expensive Tektronics or Keysight Technologies (the new Agilent) current probes for US$1000-8000.

## Hall-Effect Probes

Hall-effect current probes use the hall-effect phenomonym to measure the current travelling through a conductor. Their main advantage over the transformer-based current probes is that they can measure DC currents. However, they do not perform well at higher frequencies (20kHz seems to be a rough upper limit).

The hall-effect sensor is an active sensor, and therefor the probe requires an external power source. This may be provided by an internal replaceable battery (e.g. 9V battery), and external power supply connector, or from the oscilloscope through a specialised connector (this is common on the more expensive, brand specific ones).

Like the AC transformer-based current probes, they require the wire to be inserted into a loop. 

## Standard AC/DC Current Probes

A combined AC/DC current probe is the most versatile current measurement probe. Traditionally, it uses a transformer to measure AC current, and a hall-effect sensor to measure DC currents (originally patented by Tektronics). Hall-effect sensors are active sensors, so AD/DC current probes require a power source.

The probes are normally **split-core**, which allows you to open the probe tip up to inset the wire under test. 

AC/DC probes output a voltage which is proportional to the current flowing through the wire under test. This voltage is measured by the oscilloscope and displayed on a current-scaled waveform. High-end current probes which are built for specific oscilloscopes may draw power from the single oscilloscope connection, as well as automatically changing the units on the scope and auto-scaling.

## Fluxgate Magnetometer Current Probes

The main advantage is that the measuring device does not need to fully encircle the track/wire under test, and you can design a probe-styled instrument that can measure track/wire current just by bringing the probe tip into close proximity.

## Aim I-Prober 520

Aim has patents around it's fluxgate magnetometer based current probe, so it might be a while before other manufacturers make similar probes.

{{< figure src="/images/2015/09/aim-i-prober-520-fluxgate-magnetometer-current-probe-with-scope.jpg" width="390px" caption="The AIM I-Prober 520 current probe based on fluxgate magnetometer technology. Image from http://www.tti-test.com/."  >}}

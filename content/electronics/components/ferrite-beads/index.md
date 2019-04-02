---
author: "gbmhunter"
date: 2013-09-19
draft: false
tags: [ "ferrite bead", "component", "schematic", "inductor", "impedance", "PCB" ]
title: "Ferrite Beads"
type: "page"
---

## Overview

Ferrite beads (also called ferrite chips) are inductors which are used for filtering out high frequencies. To do this, they are designed to have a large resistance at high frequency (i.e. they are lossy). They absorb this high frequency energy and dissipate it as heat. The following graph shows the typical impedance of a ferrite bead across a range of frequencies.

{{< img src="impedance-frequency-characteristics-graph-of-ferrite-beads.png" width="644px" caption="Graph showing the impedance-frequency characteristics of a range of ferrite beads."  >}}

The most basic ferrite bead is a piece of wire with encased in ferrite material, it is this ferrite material which is lossy at high frequencies.

{{< img src="usb-cable-with-ferrite-beads-annotated.png" width="450px" caption="A USB cable with the in-cable ferrite bead highlighted."  >}}

## Schematic Symbol

The IEEE 315 standard dictates that a ferrite bead should have the following schematic symbol:

{{< img src="ferrite-bead-schematic-symbol-ieee-315-slanted-rectangle.png" width="223px" caption="The IEEE 315 schematic symbol for a ferrite bead."  >}}

You might also see a ferrite bead symbol like this:

{{< img src="ferrite-bead-schematic-symbol-triple-line.png" width="324px" caption="The 'triple-line' type of schematic symbol for a ferrite bead."  >}}

Unfortunately, you may even see them used with an inductor symbol (and with an L for it's designator)!

{{< img src="inductor-schematic-symbol-curly-with-bar.png" width="361px" caption="Some schematics will use the inductor symbol for a ferrite bead."  >}}

However, although technically correct (a ferrite bead is an inductor, and does have a core, so the bar on top of the coil is correct also), I find this very confusing. You never use a ferrite bead for it's inductive properties (it's designed to be lossy at high frequencies, while most standard inductors are designed to be as loss-less as possible and return the energy to the circuit).

## Important Parameters

## Impedance (@ Frequency)

The frequency is usually 100MHz. This is good for comparing one ferrite bead against another. Manufacturers usually provide a frequency vs. impedance graph if you want more information.

## Use In Circuits

Ferrite beads are commonly placed in series on the power supply rails of electronic circuits.

## Their Frequency Response Explained...

As the graph shows below, it is the ferrite beads resistance, not inductance, which is largely responsible for the increase in it's reactance. This is what we want, as resistance dissipates the noise as heat, while inductance only stores the energy ina magnetic field to return to the circuit at a later point in time.

{{< img src="impedance-frequency-characteristics-graph-of-ferrite-beads-showing-inductance-and-resistive-components.png" width="706px" caption="This graph shows a breakdown of the different components (resistive R and reactive X, which has both inductive and capacitive parts) contributing to the overall impedance Z."  >}}

Ultimately, at higher frequencies (1-10GHz), it is their parasitic capacitance which causes the ferrite bead to become ineffective. This capacitance shorts out the inductive and resistive elements of the ferrite bead.

## Equivalent Circuit Model

The following image shows a common way of simulating a ferrite bead.

{{< img src="ferrite-bead-circuit-model-and-spice-simulation-setup.png" width="832px" caption="A basic simulation model for a ferrite bead, and the equivalent representation in SPICE."  >}}

Another way to model a ferrite bead is a high-frequency transformer with a low valued resistance connected across it's secondary. The two transformer primary inputs are the two leads on the ferrite bead.

## Packages

They come in many [package sizes](/pcb-design/component-packages/), including small [0603 sized SMD packages](/pcb-design/component-packages/chip-eia-component-packages/). Ferrite beads tend to be smaller than general purpose inductors because they are not used for their inductance (which is what requires space). They usually have milli-Ohms of DC resistance, which increases to \(50-500\Omega\) (typically) at 100MHz (which is the usual rated frequency, but they also provide a continuous frequency vs. impedance graph).

This really great PDF, [Understanding Ferrite Bead Inductors](http://lpvo.fe.uni-lj.si/fileadmin/files/Izobrazevanje/RES/Gradiva/07/Ferrite%20beads.pdf), explains them well.

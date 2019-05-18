---
author: gbmhunter
date: 2011-09-05 06:42:54+00:00
draft: false
title: Circuit Simulation
type: page
---

## Overview

Circuit simulation is a useful tool for prototyping and testing circuit designs. The basic method to simulating a circuit goes:

1. Draw a schematic of the circuit in a software package that supports simulations.
2. Attach simulation models to the various components in the schematic. These models describe the electrical behaviour of the component. SPICE is a common language used to describe the models (see below).
3. Attach voltage supplies, input/outputs, and probes to the various places in the schematic. These are usually specific symbols related to simulation only, therefore if you are using an integrated software package these are likely to have their own menu or library (Altium has it's own libraries under `<AltiumInstallationRootFolder>/Libraries/Simulation`).
4. Define test points/analysis locations on the circuit. These are the nets you want to investigate.
5. Run a simulation. There are many different types of simulation, from DC analysis, AC analysis, transient analysis, frequency sweeps, noise analysis, and even monte carlo (which varies the values of components within their specified tolerances, so simulate a circuit made with real-world components).

There are a few circuit simulation languages, but SPICE (and it's variants), seems to be the most well-known and well used. Many manufacturers release free SPICE models of their components so you can quickly and easily use them in your simulation. If a specific simulation model for the component does not exist, you can either write you own (SPICE is a simple language that can easily be written in a text editor), or fall back to using a generic SPICE model for the particular type of component you are using. Note that although SPICE is powerful, it cannot do PCB circuit analysis, that is, it cannot simulate the effect of having the circuit routed onto a PCB (which brings into play noise issues, stray inductances/capacitances e.t.c). This requires very powerful software, and I have personally never done this before.

There are heaps of software packages that allow you to simulate components, including:

* {{% link text="Altium" src="/electronics/general/altium" %}} ([www.altium.com](www.altium.com)) - Expensive but powerful SPICE simulator, benefits for being a fully integrated pcb development program, so no external software needed. Supports SPICE3f5, XSpice and PSpice file formats.
* Tina Design Suite ([www.tina.com](www.tina.com)) - Primarily a SPICE simulator, but also features a PCB designer.
* LTspice ([http://www.linear.com/designtools/software/](http://www.linear.com/designtools/software/)) - Linear Technologies spice simulator orientated towards testing their own components. This SPICE simulator is once of the best free options out there, with some people quoting that it's better than most paid for programs!


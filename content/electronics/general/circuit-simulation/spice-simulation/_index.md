---
author: "gbmhunter"
categories: [ "Electronics", "General", "Circuit Simulation" ]
date: 2015-06-09
draft: false
lastmod: 2021-04-28
tags: [ "electronics", "SPICE", "simulation", "KiCad", "components", "voltage sources", "current sources", "ECircuitCenter" ]
title: "SPICE Simulation"
type: "page"
---

See the {{% link text="Simulation section on the KiCad Tips And Tricks page" src="/electronics/general/kicad/kicad-tips-and-tricks#simulation" %}} for info specifically involving KiCad and ngspice.

## Elementary SPICE Components

Note: The `XXXXXXX` syntax in the general form describing elementary SPICE components is to dominate a user choosen alpha-numeric identifier (e.g. `RXXXXXXX` could stand for `R1`, `RC1` or `RMYNAME`).

## Voltage And Current Sources

The current direction convention for voltage sources is that a positive current is when the current is flowing into the positive pin of the voltage source.

## Voltage And Current Controlled Switches

Two types of switches in SPICE, voltage and current controlled. They are not ideal switches, and are modelled with a finite on and off resistance, as well as finite turn on and off times. However, you can usually set these to the extremes so that they act almost like an ideal switch, in relation to everything else in your circuit.

They are great for seeing what effect a short with have on your circuit (e.g. shorting out one LED in a string of LEDs controlled by a constant-current driver).

SPICE prefix for switches is S.

The general form for a switch is:

```text
SXXXXXXX N+ N- NC+ NC- MODEL <ON><OFF>
WYYYYYYY N+ N- VNAM MODEL <ON><OFF>
```

The most basic syntax to create a voltage-controlled switch is:

```text
.model VSW SW()
```

## ngspice

{{% figure src="ngspice-main-window-windows-screenshot.png" width="600px" caption="Screenshot of the main window of ngspice v34.0 when running on Windows." %}}

Type `display` to print a list of all currently defined vectors.

Use `source` to load a netlist file. This is called the _input file_:

```bash
source my-netlist-file.net
```

Type `run` to run the simulation --- this will run any control lines specified in the input file. Control lines are commands such as `.dc`, `.ac`, `.tran` and `.op`:

```bash
run
```

Use `let` to create new variables.

AC analysis creates complex vectors.

Use `.control` to create a control block which can contain executable statements such as `run` and `plot` within a circuit netlist file.

## The Best SPICE Resources Out There

1. ECircuitCenter ([http://www.ecircuitcenter.com](http://www.ecircuitcenter.com/)) - Top-notch and free resource of SPICE thoery and circuits.
1. National Instruments SPICE Simulation Fundamentals ([http://zone.ni.com/devzone/cda/tut/p/id/5413#toc3](http://zone.ni.com/devzone/cda/tut/p/id/5413#toc3)) - Helpful, professional resources covering most aspects of SPICE simulation
1. [Intusoft: Solving SPICE Convergence Problems](http://www.intusoft.com/articles/converg.pdf): Explains the common reasons for no convergence and the many ways to try and fix this.

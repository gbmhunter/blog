---
author: gbmhunter
date: 2015-06-09 05:52:43+00:00
draft: false
title: SPICE Simulation
type: page
url: /electronics/general/circuit-simulation/spice-simulation
---

# Elementary SPICE Components

Note: The XXXXXXX syntax in the general form describing elementary SPICE components is to dominate a user choosen alpha-numeric identifier (e.g. RXXXXXXX could stand for R1, RC1 or RMYNAME).

## Voltage And Current Controlled Switches

Two types of switches in SPICE, voltage and current controlled. They are not ideal switches, and are modelled with a finite on and off resistance, as well as finite turn on and off times. However, you can usually set these to the extremes so that they act almost like an ideal switch, in relation to everything else in your circuit.

They are great for seeing what effect a short with have on your circuit (e.g. shorting out one LED in a string of LEDs controlled by a constant-current driver).

SPICE prefix for switches is S.

The general form for a switch is:
    
    SXXXXXXX N+ N- NC+ NC- MODEL <ON><OFF>
    WYYYYYYY N+ N- VNAM MODEL <ON><OFF>

The most basic syntax to create a voltage-controlled switch is:

.model VSW SW() 

# The Best SPICE Resources Out There  1. ECircuitCentre ([http://www.ecircuitcenter.com](http://www.ecircuitcenter.com/)) - Top-notch and free resource of SPICE thoery and circuits.  2. National Instruments SPICE Simulation Fundamentals ([http://zone.ni.com/devzone/cda/tut/p/id/5413#toc3](http://zone.ni.com/devzone/cda/tut/p/id/5413#toc3)) - Helpful, professional resources covering most aspects of SPICE simulation

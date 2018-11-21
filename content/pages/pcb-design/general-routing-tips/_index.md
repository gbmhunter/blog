---
author: gbmhunter
date: 2015-07-14 08:13:40+00:00
draft: false
title: General Routing Tips
type: page
url: /pcb-design/general-routing-tips
---

# Overview

See below for PCB routing tips and tricks.

[caption id="attachment_12300" align="aligncenter" width="321"][![Screenshot during the routing of a track on a PCB in Altium.](http://blog.mbedded.ninja/wp-content/uploads/2015/07/screenshot-during-routing-a-track-on-pcb-in-altium.png)
](http://blog.mbedded.ninja/wp-content/uploads/2015/07/screenshot-during-routing-a-track-on-pcb-in-altium.png) Screenshot during the routing of a track on a PCB in Altium.[/caption]

# Always Have Schematics In-Front Of You

Having schematics in-front of you when routing is a must. Either print them out or put them on a second monitor if you are lucky enough to have one.

Sometimes it is not obvious from the rats nest to where a component should go. A classic example is decoupling caps. A rats nest will only show one pin connected to the power rail, and the other to ground. However, the schematic show (hopefully!) that it is associated with the power input to an IC, and therefore should be placed next to the IC. 

Having the schematic visible also lets you place the components in a logical manner.

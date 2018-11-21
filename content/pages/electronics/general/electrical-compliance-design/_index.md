---
author: gbmhunter
date: 2011-09-05 06:44:22+00:00
draft: false
title: Electrical Compliance Design
type: page
url: /electronics/general/electrical-compliance-design
---

Circuits emit electrical noise. They emit radiated electromagnetic noise, and conductive noise (noise that travels down any external electrical connections). Many electronic standards define maximum values of noise and disruption that a circuit can emmit.

Reduce these levels requires careful circuit design, in both the components used, the layout, the number of layers, and sheilding.


### TVS Diodes


TVS diodes are designed to suppress large voltage spikes on traces. The are essentially a diode with a specified avalanche breakdown voltage that you place reverse viased between the trace you want to protect and ground. The 'monolithic arrays' of TVS diodes can come in really small packages, such as the 6-UQFN which has a PCB area of only 1.45mm2 and con contain 4 or 5 diodes.


### Ferrite Beads


Ferrite beads are used to reduce high frequency (10-100Mhz) noise in circuits. They are similar to an inductor in the fact they are a coil of wire wrapped around a ferrous core, except they are designed to consume power by resistive heating, while an inductor is designed to store energy it's energy in a magnetic field and then return it to the source at a later time. This is done by designing the ferrous material to conduct and absorb the magnetic field (eddy currents) at high frequencies.

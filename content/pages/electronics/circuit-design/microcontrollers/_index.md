---
author: gbmhunter
date: 2012-01-05 02:59:53+00:00
draft: false
title: Microcontrollers
type: page
url: /electronics/circuit-design/microcontrollers
---

All microcontroller-related programming stuff is found under Programming->Microcontrollers.




# Current Sharing




When driving large loads, you can normally tie many microcontroller GPIO together for increased output current capability. This is because microcontroller GPIO have a comparatively large and consistant (from one pin to another) output impedance. This output impedance (well, resistance at DC levels) servers to load balance and makes sure that each pin takes about the same amount of current as the one next to it (all you need is Ohm's law to come to this conclusion). 




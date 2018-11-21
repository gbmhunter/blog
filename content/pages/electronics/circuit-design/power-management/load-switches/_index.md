---
author: gbmhunter
date: 2013-11-08 02:04:26+00:00
draft: false
title: Load Switches
type: page
url: /electronics/circuit-design/power-management/load-switches
---

# MOSFET Based




The following image shows a MOSFET based high-side switch:


[caption id="attachment_11214" align="aligncenter" width="678"][![A high-side load switch made from a N-Channel and P-Channel MOSFET.](http://blog.mbedded.ninja/wp-content/uploads/2013/11/high-side-mosfet-load-switch-schematic.png)
](http://blog.mbedded.ninja/wp-content/uploads/2013/11/high-side-mosfet-load-switch-schematic.png) A high-side load switch made from a N-Channel and P-Channel MOSFET.[/caption]


# IC Based




The following image shows an IC based high-side switch.


[caption id="attachment_11216" align="aligncenter" width="692"][![The TPS27082LDDCR, a high-side load switch IC.](http://blog.mbedded.ninja/wp-content/uploads/2013/11/high-side-load-switch-with-tps27082lddcr-ic-schematic.png)
](http://blog.mbedded.ninja/wp-content/uploads/2013/11/high-side-load-switch-with-tps27082lddcr-ic-schematic.png) The TPS27082LDDCR, a high-side load switch IC.[/caption]


Some load-switches have reverse-polarity protection. More information of how they exactly implement reverse-protection with only the one MOSFET can be found in the [The Substrate (Body) Connection section of the MOSFET page](http://blog.mbedded.ninja/electronics/components/mosfets#the-substrate-body-connection).


[caption id="attachment_11653" align="aligncenter" width="516"][![A functional diagram of the NCP380 high-side load switch. Note the switches connected to the MOSFET substrate which show how reverse-current protection is performed.](http://blog.mbedded.ninja/wp-content/uploads/2013/11/ncp380-ncv-380-load-switch-internal-block-diagram-with-reverse-current-protection.png)
](http://blog.mbedded.ninja/wp-content/uploads/2013/11/ncp380-ncv-380-load-switch-internal-block-diagram-with-reverse-current-protection.png) A functional diagram of the NCP380 high-side load switch. Note the switches connected to the MOSFET substrate which show how reverse-current protection is performed.[/caption]


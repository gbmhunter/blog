---
author: gbmhunter
date: 2012-06-09 00:54:46+00:00
draft: false
title: Skateboard H-Bridge Blew Up (for the +10th time)
type: post
url: /electronics/electronics-electric-skateboard/skateboard-h-bridge-blew-up-for-the-10th-time
categories:
- Electric Skateboard
tags:
- blow up
- dac
- electric skateboard
- emf
- half-bridge
- motor
- pwm
---

So the half-bridge blew up again. This time it was bad, since it was my final design (printed on proper PCB). It is also the design I thought I had prototyped enough that I was confident that it would work. It blew up while stopping the motor suddenly from about 1/4 speed (with no load).

Considering this was the fifth complete redesign of the half-bridge, with countless smaller changes, I had chewed through $100's of dollars of MOSFET's, many hours of debugging time, "cloudsourced" (using Facebook) h-bridge help, and still could not design one that would not blow up, I thought it was high time to cheat and buy one off-the-shelf.

I found and purchased this [one](http://www.aliexpress.com/product-fm/486387907-A121-Wide-Voltage-DC12-60V-30A-1500W-PWM-Pulse-DC-Motor-Speed-Controller-Adjuster-0-100-wholesalers.html) of AliExpress for just over $US50 (including shipping). It is rated for 60V and 30A (over-current protection trips at 35A). This should be perfect for my design (48V nominal, up to 58V), with a maximum current of about 30A also. The controller comes with three terminals for a POT to adjust the speed, so I will have to connect this directly up to a PSoC DAC (if the voltages allow, but I doubt it), or more likely a PWM-based DAC (with a RC low-pass filter) so that I can match the voltage the controller requires.

{{< figure src="/images/electronics-electricskateboard-final-mech/h-bridge-from-aliexpress.jpg"   width="500px" >}}

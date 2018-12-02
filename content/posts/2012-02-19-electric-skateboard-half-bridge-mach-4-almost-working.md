---
author: gbmhunter
date: 2012-02-19 08:34:27+00:00
draft: false
title: Electric Skateboard Half-Bridge Mach 4 Almost Working
type: post
url: /electronics/electronics-electric-skateboard/electric-skateboard-half-bridge-mach-4-almost-working
categories:
- Electric Skateboard
tags:
- electric skateboard
- half-bridge
- heating
- MOSFET
- motor
---

I finished building and started testing half-bridge mach 4 this weekend. To my surprise, it's working much better than the previous 3! For one, no MOSFET's blew up within the first few seconds of connecting it up to the motor. I have a feeling it's to do with the higher Vds (100V) of these MOSFET's over the previous ones (75V). This gives the drain-source TVS diodes plenty of play-room to kick in and absorb transients before the MOSFET gets damaged.

The schematic the prototype board was made from.

[singlepic id=473 w=320 h=240 float=center]

Tentatively testing the half-bridge with a lightbulb before hooking it up to a motor.

[singlepic id=463 w=320 h=240 float=center]

Testing it with a motor. I was able to stand on it for short times! (last time the MOSFET's blew).

[singlepic id=468 w=320 h=240 float=center]

However, the MOSFET's and the bulk capacitor were getting unusually hot. I hooked a scope up to the gates of the MOSFET's and noticed ringing on the low-side FET when the high-side FET switched on. I think this is causing momentary shoot-through. This would explain hot FET's, and, if the voltage rail was sagging, hot bulk capacitors.

[singlepic id=465 w=320 h=240 float=center]

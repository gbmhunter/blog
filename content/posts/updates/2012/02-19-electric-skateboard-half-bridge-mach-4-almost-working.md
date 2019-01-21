---
author: gbmhunter
date: 2012-02-19 08:34:27+00:00
draft: false
title: Electric Skateboard Half-Bridge Mach 4 Almost Working
type: post
categories:
- Electric Skateboard
tags:
- electric skateboard
- half-bridge
- heating
- MOSFET
- motor
---

I finished building and started testing half-bridge mach 4 this weekend. To my surprise, it's working much better than the previous 3! For one, no MOSFETs blew up within the first few seconds of connecting it up to the motor. I have a feeling it's to do with the higher Vds (100V) of these MOSFETs over the previous ones (75V). This gives the drain-source TVS diodes plenty of play-room to kick in and absorb transients before the MOSFET gets damaged.

The schematic the prototype board was made from.

{{< figure src="/images/electronics-electricskateboard-secondprototype/half-bridge-schematic-for-eda-forums.jpg"   width="320px" >}}

Testing it with a motor. I was able to stand on it for short times! (last time the MOSFET's blew).

{{< figure src="/images/electronics-electricskateboard-secondprototype/2012-02-18-17-08-37.jpg"   width="320px" >}}

However, the MOSFETs and the bulk capacitor were getting unusually hot. I hooked a scope up to the gates of the MOSFETs and noticed ringing on the low-side FET when the high-side FET switched on. I think this is causing momentary shoot-through. This would explain hot FETs, and, if the voltage rail was sagging, hot bulk capacitors.

{{< figure src="/images/electronics-electricskateboard-secondprototype/2012-02-18-16-17-26.jpg" caption="The oscillating gate drive to the MOSFETs."  width="320px" >}}

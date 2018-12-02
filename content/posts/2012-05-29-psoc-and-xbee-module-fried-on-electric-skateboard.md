---
author: gbmhunter
date: 2012-05-29 10:26:24+00:00
draft: false
title: PSoC And Xbee Module Fried On Electric Skateboard
type: post
url: /electronics/electronics-electric-skateboard/psoc-and-xbee-module-fried-on-electric-skateboard
categories:
- Electric Skateboard
tags:
- blown
- electric skateboard
- fried
- ground potential
- ir
- psoc
- smoke
- spare
- sparks
- xbee
- xbee usb
---

[singlepic id=580 w=500 h=500 float=center]

The fried PSoC and Xbee module after I accidentally connected two circuits with grounds at a potential difference of over 30V. Purple sparks and smoke came from the PSoC, but I was surprised that the Xbee died too.

Luckily, I was able to recover one of the two spare (but used) PSoC's that I had for the project. After one failed IR soldering attempt, I managed to get the spare to work the second time around by boosting the IR temperature up to 280C (its bang-bang controlled, so it's not very accurate or good for the IC's!), but miraculously the PSoC survived.

Again, luckily, my friend had a spare Xbee module lying around, and I had mounted them in header, so it was as easy as pull-out/push-in to replace. He also has a USB board that allows you to configure the Xbee's, so I'm contemplating increasing the baud rate (to save power), and making the Xbee comms secure (so interference doesn't throw you off the board).

---
authors: [ "Geoffrey Hunter" ]
date: 2012-05-29
draft: false
title: PSoC And Xbee Module Fried On Electric Skateboard
type: post
categories:
- Electric Skateboard
tags:
- blown
- electric skateboard
- fried
- ground potential
- IR
- PSoC
- smoke
- spare
- sparks
- Xbee
- USB
---

{{< img src="2012-05-29-18-04-31.jpg" caption="The fried PSoC and Xbee module after I accidentally connected two circuits with grounds at a potential difference of over 30V. Purple sparks and smoke came from the PSoC, but I was surprised that the Xbee died too."  width="500px" >}}

The fried PSoC and Xbee module after I accidentally connected two circuits with grounds at a potential difference of over 30V. Purple sparks and smoke came from the PSoC, but I was surprised that the Xbee died too.

Luckily, I was able to recover one of the two spare (but used) PSoC's that I had for the project. After one failed IR soldering attempt, I managed to get the spare to work the second time around by boosting the IR temperature up to 280C (its bang-bang controlled, so it's not very accurate or good for the ICs!), but miraculously the PSoC survived.

Again, luckily, my friend had a spare Xbee module lying around, and I had mounted them in header, so it was as easy as pull-out/push-in to replace. He also has a USB board that allows you to configure the Xbees, so I'm contemplating increasing the baud rate (to save power), and making the Xbee comms secure (so interference doesn't throw you off the board).

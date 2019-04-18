---
author: gbmhunter
date: 2012-05-20 08:47:38+00:00
draft: false
title: Electric Skateboard Near Misses And Mistakes
type: page
url: /electronics/projects/electric-skateboard/electric-skateboard-near-misses-and-mistakes
---

Near misses/mistakes are always fun to talk about, so here is a list of them...

1. The PSoC's capacitive sensing peripheral needs an external modulation capacitor to work. I did not realise this until after the boards were made. Luckily, I had routed some spare I/O lines, and thanks to the flexibility of the PSoC's GPIO, I was able to connect a capacitor onto one of these.
2. After I cut out the outline of the board from the fibreglass and fitted the axles, I realised that there was not enough room to fit the battery and the electronics enclosure in the orientation that I had first planned. However, I was able to rotate the battery 90 and make it fit. The battery was exactly the right size to do this, had it been even 5mm longer it would of protruded from the sides.
3. Altium decided to remove the soldermask from a few PCB objects when I panelized it (this is a Altium bug, and was not really my fault). I noticed it had removed it from the high-power half-bridge traces which I was planning on soldering to improve their current-handling capability, and was able to fix that. However I didn't notice it had also removed the soldermask from the cap sense buttons, so when the PCB's arrived, the cap sense buttons had exposed metal. However, the cap buttons still seem to work fine!
4. I didn't think twice about putting a ground plane under and around the Xbee modules. This created a partial Faraday-cage in exactly the directions I didn't want it too (attenuated signals going upwards from the board, and attenuated signals in the downwards direction from the remote). This reduced the range of the Xbee's from the transmission distance of around 50-100m when I tested them outside to only a metre or so. Luckily, this is just enough for the skateboard to still work. However, it does drop in-and-out often, which can get annoying.
5. No brakes! After my half-bridge designs blew up time and time again, I had to resort to a off-the-shelf motor driver. Unfortunately, is can't break! I have been getting by without them, but it makes it really dangerous to use down hills, and in high activity areas.
6. I didn't expect the remote to use so much current, and has resulted in a rather ironic situation in where the skateboard battery lasts far longer than the remote control battery.  What doesn't help is that I'm powering the remote of 9V and dropping it to 3.3V with a linear regulator, wasting plenty of power. What also doesn't help is weak wireless signals, requiring me to run the Xbee modules at full power (see number 4 above!).

---
author: gbmhunter
date: 2013-07-26 02:53:30+00:00
draft: false
title: Low-Volume Production With PSoC Microcontrollers
type: page
url: /programming/microcontrollers/psoc/low-volume-production-with-psoc-microcontrollers
---

If you are wanting to do low-volume production with the PSoC microcontroller (I'm talking 1-100's of units), Cypress has made a nice program called PSoC Programmer which is a simple interface for programming (or reading from) a hex file onto a PSoC microcontroller. It has options to turn of self-powered or external power mode for the MiniProg (and change the voltage). This usefullness of this feature cannot be over-exaggurated! It basically means that you don't have to go through the hassle of connecting a external power supply up to the board when programming. and provides flash checking (which is pretty standard). It also features nice green/red OK/Fail boxes to facilitate programming. {{< figure src="/images/programming-psoc/psoc-programmer-screenshot-01.png" caption="Screenshot of the PSoC programmer application in Windows."  width="600px" >}}

 

**Steps To Make Production Ready Hex Files In PSoC Creator:**  1. Make sure flash security is turned on when going into production (PSoC Programmer will warn you of this if you haven't). PSoC Creator (at least from version 2.1) gives you the option of setting individual blocks of flash or setting the entire flash security level with a single global checkbox.  2. Set the 'Debug Mode' in PSoC Creator to GPIO, unless you need to debug the devices once they are in operation. Don't worry, this won't mean you're prevented from ever reprogramming the device again (but see step 3.)  3. If you want extra security, enable the 'Chip Lock' option in the PSoC Programmer options menu to prevent ever writing to the device again. Only do this if you are confident that you will never need or want to reprogram the IC again. {{< figure src="/images/programming-psoc/psoc-programmer-chip-lock-enabled.png" caption="The 'Chip Lock Enabled' option in PSoC programmer."  width="600px" >}}

 

One feature I'd like to see in the PSoC Programmer is the option to automatically program a device as soon as it's connected. This would be easy to implement and make batch programming even easier!

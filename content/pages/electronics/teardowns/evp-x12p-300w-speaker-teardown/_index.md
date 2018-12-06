---
author: gbmhunter
date: 2012-07-09 07:10:27+00:00
draft: false
title: EVP-X12P 300W Speaker Teardown
type: page

---

Here is a little teardown of a Wharfedale EVP-X12P 300W active speaker.

<blockquote>BACKSTORY: So I borrowed two Wharfedale EVP-X12P active speakers for DJing at a 21st party, and half-way through the set, as Skrillex was playing, I happened to blow one up (if I remove the theatrics, what I really mean is that one of the bass/mid cone speakers stopped working). It turned off, and I smelt that 'burnt electronics' smell. It turned back in about 10minutes, however was not producing any sound from the cone speaker. I managed to survive the rest of the set with just one.</blockquote>

On the premise I over-drove it, I was looking for visibly wrong things such as blown fuses or dried up/non-existant thermal compound. All components were through-hole, so that made things easier to investigate...

{{< figure src="/images/electronics-evp-x12p-speaker-teardown/rear-panel-with-active-amp.jpg" caption="The rear panel of the speaker, which has all the circuitry bolted onto it."  width="800px" >}}

It has thermal PTC  resettable fuses, so these couldn't of blown...

{{< figure src="/images/electronics-evp-x12p-speaker-teardown/ptc-resettable-fuses.jpg" caption="PTC resettable fuses on the main PCB."  width="800px" >}}

The four gruntiest looking power compontns are all in TO-3P packages and directly bolted onto the aluminium heatsink. Designators are Q18, Q20, Q21, Q23. Two are the Sanken 2SA1492 PNP transistors (product marking A1492 55 P), while the other two are Sanken 2SC3856 NPN transistors. They are complements to each other (mentioned in the respective datasheets).

{{< figure src="/images/electronics-evp-x12p-speaker-teardown/power-amp-circuitry.jpg" caption="The power amp circuitry, once the PSU and other pre-amp/filtering circuitry has been removed."  width="800px" >}}

I tested the base-emitter voltage drop of the transistors while they were in circuit. I got a reading of 43mV for all four transistors, which is not what you would expect if you were testing a transistor by itself (0.3-0.7V is usual). But since it was in circuit, other components could of been affecting this result.

{{< figure src="/images/electronics-evp-x12p-speaker-teardown/a1492-power-transistor.jpg" caption="The SCA1492 power transistor."  width="800px" >}}

Since I had two speakers, one working, and one not, the next thing to try was a differential diagnosis. I removed the electronics panel from the working speaker and connected both to the same audio signal. I made sure that the speakers had the same left and right channel signals, and that all the panel dials such as volume and bass were all set to the same amount. Unfortunately, when the speakers had main power and I connected a ground lead up to the earth on each of the speaker circuits, smoke started coming from the broken one! Unsure of why that happened...

I measured the signals on the 6-pin connector going from the input board to the main board as follows:

Pin 1: (unknown use) +1.4V
Pin 2: (unknown use) -1.68V
Pin 3: (unknown use, possibly ground) 0V
Pin 4: (unknown use, possibly ground) 0V
Pin 5: Audio Shield
Pin 6: Audio Signal

All of them had 70kHz, 200-300mV noise present (relative to earth).

I found a pad labelled ground on the output board! Hooray for nicely labelled test points!

{{< figure src="/images/electronics-evp-x12p-speaker-teardown/2012-07-23-20-28-21.jpg" caption="Hooray for nicely labelled test points!"  width="800px" >}}

After finding to difference between the broken and working circuits, I decided to remove the speakers from the enclosures.

{{< figure src="/images/electronics-evp-x12p-speaker-teardown/2012-07-23-22-30-27.jpg"   width="800px" >}}

This is where I finally found the problem, the LF speaker coil had completely blown!

{{< figure src="/images/electronics-evp-x12p-speaker-teardown/2012-07-23-22-44-31.jpg"   width="800px" >}}

And then I discovered why I was still reading 4Ω at the connector on the amplifier PCB, there was another PCB between the amp and the speaker to filter the sounds between the LF (low-frequency, aka bass-driver) and horn (HF, high-frequency) speaker.

{{< figure src="/images/electronics-evp-x12p-speaker-teardown/2012-07-23-22-39-03.jpg"   width="800px" >}}

Now knowing that I needed a new bass-driver, I got the guys at [South Pacific Music](http://www.southpacmusic.co.nz/), the New Zealand stockists for Wharfedale Pro speakers, to re-cone the bass-driver.

# Datasheets:

## Power Transistors


[gview file="/images/2012/07/2SC3856-Sanken-NPN-Transistor.pdf"]

[gview file="/images/2012/07/2SA1492-Sanken-PNP-Transistor.pdf"]

# Pictures:

[nggallery id=38]

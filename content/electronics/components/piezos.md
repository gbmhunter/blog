---
author: gbmhunter
date: 2012-05-02 02:28:59+00:00
draft: false
title: Piezo's
type: page
url: /electronics/components/piezos
---

## Overview

Piezo's (in the electrical component sense), are small speakers that feature a piezo-electric crystal. When you apply a voltage, the crystal distorts, vibrating a plate and producing noise. They are very loud for their relatively small size and price, and typically achieve over 90dB of sound pressure from an object the size of a few coins. The annoying beeps you hear from the insides of computer on boot-up or when you do something wrong (like mash the keyboard) are typically made with a piezo.

{{< figure src="/images/electronics-misc/piezo-photo.jpg" caption="Photo of an externally driven piezo. They tend to be smaller than their internally driven cousins."  width="400px" >}}

Important Parameters:

* Maximum drive voltage
* Sound-pressure level (SPL)
* Resonant frequency
* Operating current

## The Piezo Schematic Symbol

The schematic symbol for a piezo is shown below. Some piezos have internal oscillating circuity already built into them, and only require a DC voltage to run (typically 9-12V). These are called internal drive piezo's (or buzzers), while the ones without circuitry are called external drive piezos (or just piezos). Externally driven piezo's are not polarized, while internally driven ones usually are. Some have a third leg, which is called the feedback pin, and can be used as an input to the driving circuitry to drive the piezo at it's resonant frequency.

{{< figure src="/images/electronics-misc/piezo-schematic-symbol.jpg" caption="The schematic symbol for a piezo speaker."  width="320px" >}}

## A Piezo's Frequency Response

A piezo does not have near anything like an ideal flat frequency response over the audible range! This does not make them suitable for quality sound/music reproduction. See the figure below.

{{< figure src="/images/electronics-misc/piezo-4khz-resonant-frequency-response.jpg" caption="The frequency response of a piezo speaker with a resonant frequency of 4kHz."  width="500px" >}}

## How To Drive A Piezo

An easy and loud way to drive a piezo speaker using an inductor in parallel with the piezo and a NPN BJT.

When the NPN BJT is switched on, the current builds up through the inductor and energy is stored in it's magnetic field. When the transistor is switched off, the inductor creates a large voltage spike which excites the piezo speaker. The piezo can be driven to around 40-60V with a 5V supply. Make sure the BJT has a collector-emitter breakdown voltage high enough to withstand this!

The frequency of the PWM controls the pitch of the sound, the duty cycle controls the volume. Duty cycle should be varied from 0-50%. The inductance does not matter to much, something in the range of 10-50mH seems to give the best results with most piezo's.

{{< figure src="/images/electronics-misc/piezo-drive-circuit-parallel-inductor.jpg" caption="An easy and loud way to drive a piezo speaker using an inductor in parallel with the piezo and a NPN BJT."  width="500px" >}}

A non-standard and slightly convoluted method for driving a piezo speaker using a half-bridge driver IC.

{{< figure src="/images/electronics-misc/piezo-drive-circuit-half-bridge-ic.jpg" caption="A non-standard and slightly convulated method for driving a Piezo speaker using a half-bridge driver IC."  width="500px" >}}

## How To Drive A Buzzer

Buzzers (or internally driven piezo's), contain internal drive circuitry, and only require a DC voltage to run. They are typically louder than externally driven versions because:

1. They normally feature a resonant cavity which amplifies the sound. You will notice most buzzers are larger than externally driven piezo's.
2. The internal circuitry usually has feedback, which means the piezo is always driven at resonance.

One disadvantage of buzzers is that you can't change the tone of the sound.

The volume can be controlled with a simple RC low pass filter and PWM signal as shown in the circuit diagram below.

{{< figure src="/images/electronics-misc/piezo-int-drive-volume-control-circuit.jpg" caption="The schematic of an internally driven piezo volume control circuit."  width="500px" >}}

This circuit uses a RC low-pass filter and PWM to change the DC voltage that the buzzer sees across it's terminal, thus controlling the volume. Note that the volume changes drastically from 0-1% duty cycle because of the logarithmic nature of sound, so a 12-bit or higher PWM is normally needed for smooth control. 12-bits will give you increments of approximately 0.025%. When I built one of these circuits, at 1% duty cycle the piezo was at approximately 90% apparent volume.

## Piezo Benders

{{< figure src="/images/electronics-misc/piezoelectric-bender.jpg" caption="A piezoelectric bender. Image from http://www.kineticceramics.com/."  width="250px" >}}

Piezo bendors are essentially un-mounted piezos, the insides of the standard black cased piezo that you commonly see. They are used in more spaced-constrained situations.

These un-mounted piezos have to be mounted on something, and consideration about the vibrational aspects of the piezo have to be taken into account. Obviously, if you glue the entire piezo to the mounting surface, it won't be able to vibrate, and you'll get no sound. There are two standard ways of mounting a piezo, and they are called either edge-mounting or nodal-mounting.

Edge mounting is pretty self-explanatory, it is when you mount the piezo by holding onto its edge. A thin ring of double-sided adhesive tape can achieve this. Nodal mounting is where the piezo is fixed around it's nodal points. A nodal point is a place on the piezo surface that does not move while it is vibrating. As a general rule of thumb, there are nodal points on a piezo at 0.65 of the radius from the centre of the piezo, in all directions. Again, this can be done with a ring of double-sided adhesive tape, whose diameter is 0.65 that of the edge mounting tape ring.

## Multi-layer Piezo Speakers

Mutli-layer piezo speakers contain more than one vibrating piezo element. The vibrating elements are designed to have different resonant frequency's, and when combined, give a speaker which has a flatter frequency response over the audible range than traditional piezo speakers.

The bandwidth of multi-layer piezos is usually between 200-500Hz and 20kHz. Because of this, they are able to reproduce music and voice much better than a traditional piezos whose frequency response if usually limited to a few hundred hertz either side of a resonant frequency in the 3-4kHz region.

[PUI Audio](http://www.puiaudio.com/) makes some good quality multi-layer speakers, which can be found on DigiKey.

## Homemade Piezo Crystals

You can easily make crystals with a few common household ingredients. See the [Piezo Crystal Formation Project](/electronics/projects/piezo-crystal-formation) for more information.

{{< figure src="/images/electronics-piezocrystalformation/2012-07-16-22-21-30.jpg" caption="A large homemade piezo crystal."  width="600px" >}}

## Examples

If you want a loud buzzer, then the ABI-D23-RC (Element14 Num: [102-2400](http://nz.element14.com/pro-signal/abi-023-rc/piezo-buzzer-12vdc-leads/dp/1022400)) is a good choice. It runs of 12VDC and has a SPL of 96dBm.

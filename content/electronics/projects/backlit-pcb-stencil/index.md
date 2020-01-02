---
author: gbmhunter
date: 2014-01-15
draft: false
title: Backlit PCB Stencil
type: page
---

## Stats

<table>
    <tbody >
        <tr>           
            <td>Project Started:</td>
            <td>13/12/2013</td>
        </tr>
        <tr>
            <td>Project Finished:</td>
            <td>17/12/2013</td>
        </tr>
        <tr>
            <td>Time Taken:</td>
            <td>Approx. 24 hours</td>
        </tr>
        <tr>
            <td>Cost:</td>
            <td>Approx. NZ$80</td>
        </tr>
    </tbody>
</table>

## The Idea

To turn a spare and used PCB stencil into a wall decoration by adding a backlight and tidying up it's appearance.
	
# The Backlight

The original plan was to use EL sheets, and build an EL driver for it. Unfortunately, the EL driver we built could only provide up to 200Vp2p, and when operating within a safe range (160Vp2p), it didn't make the EL sheet glow enough.

So we ditched that idea and decided to use LEDs instead. We first tried a big bunch (maybe 200 or so) LEDs in the form of cheap christmas lights, but again, they didn't have enough brightness! We eventually settled on using super-bright green LEDs from Jaycar.

## Diffusing The Light

Diffusing the light correctly and well enough was a big problem. The LEDs behind the stencil, without any diffusing, created intense spots of green light right infront of them and pretty much nothing anywhere else.

We has a three-step diffusing method:

1. A layer of "window tint" stuck to the under-side surface of the PCB stencil. This is the stuff you can buy in hardware stores for tinting bathroom windows for privacy. It is about 0.5mm thick. This provided a uniform texture and hid the bubble-wrap from the viewer (see the next item).
2. A thick layer of bubble-wrap ontop of the window tint. This stuff did most of the diffusing. The super-bright LED's were stuck onto the surface of the bubble-wrap (once it was laid ontop of the window tint).
3. A flat piece of stainless steel sheet metal, stuck on the inside surface of the back cover (this placed in about 10mm of the surface of the bubble-wrap and the LEDs). This reflected any useless light going backwards, so that it had another chance of making it out of the stencil holes and into the eyes of the viewer. This improved the overall brightness of the backlight, and helped brighten the darker spots.

## Images

{{< gallery dir="images/project-backlitpcbstencil" />}}
---
authors: [ "Geoffrey Hunter" ]
date: 2012-08-04
draft: false
title: Piezo Crystal Formation
type: page
---

Start Date: June 2012
End Date: August 2012
Status: Completed

I can't claim that this project was my work, as my brother had the idea and did most of the crystal growth. But since I couldn't see him posting this online any time soon, and I gave advice/helped him along the way/lent him tools, I figured I could add this onto the CladLabs site.

The piezo crystal is potassium sodium tartrate, a double salt which exhibits piezoelectricity. The advantage of this chemical is that it can be made easily from common household items.

The piezo synthesis at RimStar was followed ([http://rimstar.org/materials/piezo/how_to_make_rochelle_salt_piezoelectric_crystal.htm](http://rimstar.org/materials/piezo/how_to_make_rochelle_salt_piezoelectric_crystal.htm)). To promote the growth of one large crystal, any small crystals were removed as soon as they started to form. Unfortunately I have no photos of the synthesis (which took a few weeks).

The first photo I got was once the crystals had been grown. The size of the largest crystal is shown below.

{{% figure src="2012-07-16-22-21-30.jpg" caption="A large homemade piezo crystal."  width="500px" %}}

To do a crude test of whether or not it would produce a voltage when struck, the crystal was sandwiched between two pieces of tin foil that were connected to an oscilloscope.

{{% figure src="2012-07-21-19-43-19.jpg" caption="The simple setup to generate a measurable voltage from the piezo. The two tin pieces of tin foil where connected up to an oscilloscope."  width="500px" %}}

We were not expecting this, but a voltage was generated when we hit it!

<blockquote>To anyone using an oscilloscope: Mains ripple easily gets it way onto the trace (since it's really an open circuit), but aslong as you set the trigger to manual and at a high enough voltage, you should be able to catch this spike!</blockquote>

{{% figure src="2012-07-21-19-42-13.jpg" caption="The voltage when giving the piezo a small whack from the end of a screw driver."  width="500px" %}}

An even larger voltage was created when it was hit with the back-end of a screw-driver (not the ideal tool for this, but hey...). At 10V/div, this is about 55V peak-to-peak!

{{% figure src="2012-07-21-19-42-57.jpg" caption="The voltage created when giving the piezo a large whack from the back-end of the screw driver."  width="500px" %}}

These crystals are quite brittle (they aren't diamonds!). Not surprisingly, it broke it two shortly after recording 50V across it.

{{% figure src="2012-07-21-19-50-19.jpg" caption="The piezo crystal broke in two after one too many hits with the screw driver."  width="500px" %}}

If you want more information about piezos and their use in electronics, see the [Piezo Speaker page](/electronics/components/piezos).

## Picture Gallery

{{< gallery dir="images/electronics-piezocrystalformation" />}}
---
author: "gbmhunter"
categories: [ "Electronics", "Tools" ]
date: 2015-11-22
description: "Rosin fluxes, organic fluxes, in-organic fluxes, no-clean types and more info about soldering flux."
draft: false
lastmod: 2020-07-06
tags: [ "electronics", "tools", "flux", "solder", "rosin", "organic acid", "inorganic acid", "no clean flux", "syringe", "flux pen" ]
title: "Flux"
type: "page"
---

## Overview

Flux is a substance used in the soldering process to remove metal corrosion and improve the adhesion of the molten solder to the metal surfaces.

## Solder Compatibility

Typically, fluxes are compatible with a broad range of solder compounds, including both leaded and higher-temperature lead-free solders.

## Activity

Flux activity is a measure of the strength/aggressiveness of the flux in it's ability to clean metals while soldering. Low activity fluxes are weak fluxes and as usually mild acids. High activity fluxes are strong fluxes and are usually low pH acids.

## Types Of Flux

### Rosin Flux

Rosin fluxes are the oldest types of flux (well, charcoal was first!). Rosin is the name of refined **pine sap**. Rosin flux is typically a solid at room temperature, but quickly melts and flow easily at soldering temperatures. It is usually a light or dark amber colour. Rosin fluxes have a **low flux activity**.

{{< img src="rosin-flux-tin-kolophonium-loeten-photo.jpg" width="329px" caption="A tin of rosin-based flux. Image from https://en.wikipedia.org."  >}}

As such, it is usually inert while as a solid, and therefore **safe to leave** on the PCB after soldering. This is of course unless during normal operation the PCB temperature rises enough to melt the rosin flux.

Rosin fluxes are usually non-polar and therefore cannot be washed off with plain water. Non-polar solvents like isopropyl alcohol, acetone, or paint thinner can be used to clean rosin fluxes. Semi-aqueous solvents or water with

Some types of solder contain a rosin core to aid the soldering process, and saves you time because you do not have to apply the flux manually.

{{< img src="rosin-core-solder-firepower-60-40-photo.jpg" width="278px" caption="A brand of solder which has a rosin-based flux core."  >}}

For the chemically-minded people, rosin flux usually has a formula of:

<p>$$ C_{19}H_{19}COOH $$</p>

Obviously, being a naturally produced substance, the make-up of a rosin flux will change.

### Organic Acid Flux

Organic acid flux is typically made of a weak, organic-based acid such as citric, lactic or stearic acid. The acid is dissolved in a solvent such as a mixture of isopropyl alcohol and water.

They can be a good compromise between reliability, flux activity and cleanability.

### Inorganic Acid Flux

The most aggressive type of flux, **inorganic fluxes are usually a blend of aggressive chemicals such as hydrochloric acid, zinc chloride and ammonium chloride**. They have a **high activity**. They are normally used for non-electronics related soldering such as a joining of copper pipes (also called brazing).

Inorganic acid fluxes should not be used for electronic soldering because they can leave chemically active residues which cause reliability problems.

### "No Clean" Flux

The term "no clean" flux is used for fluxes whose residue will not effect the long-term reliability of the PCB. The two important qualities

A disadvantage of no clean flux is the poor aesthetics of leaving the flux residue on the PCB, it can make the PCB appear dirty, old, and may give people the perception that the build quality is not high (only relevant if people actually see the PCB during it's normal use).

The IPC-610 standard specifies some the required properties of no clean flux to be compliant.

## Flux Applicators

### Syringes

Flux can be shipped in a syringe. The syringe tip is either a large-diameter (compared to most medical syringes) metal or plastic needle. Syringes offer more precise application of flux than a syringe pen or rod.

### Pens

Flux pens are permanent marker ("sharpies" for all the Americans) sized pens which contain flux inside them. The tip is made from a porous material which applies flux to the surface and draws more up via the capillary action (much like a normal pen). To promote proper flowing, fluxes used in flux pens are typically of a lower viscosity than the ones in syringes or standard containers.

{{% img src="solder-flux-pen-no-clean.jpg" width="700px" caption="A no-clean solder flux pen from ChemTools (part number CT-NC-DP)." %}}

Flux pens are great to have on the work bench for quick, on-off flux applications for reworking. The tips are usually quite thick and do not offer the same precision as flux syringes, but normally this extra precision is not necessary (flux can be "slopped" around the board with little consequence).

## Soldering Fumes

During the soldering process fumes are released. The amount of fumes increases drastically as flux is used.

It is generally not a good thing to inhale these fumes on a long term basis. Fume extractors can be used to remove the fumes safely.

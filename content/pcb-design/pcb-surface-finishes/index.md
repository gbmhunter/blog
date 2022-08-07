---
authors: [ "Geoffrey Hunter" ]
date: 2015-10-06
draft: false
title: PCB Surface Finishes
type: page
---

## Overview

The following surface finishes are listed in order of increasing price/performance.

## Hot Air Solder Leveled (HASL)

HASL is one of the most widely used surface finishes. It involves dipping the circuit board into a pot of molten solder, taking it out, and then removing the excess solder with a set of "air knives".

{{% figure src="hasl-pcb-surface-finish-example.jpg" width="463px" caption="An example of a PCB with a HASL surface finish. Image from http://www.pcbsourcing.com/."  %}}

**Pros:**

* Cheap
* Tough
* Re-workable

**Cons:**

* Uneven surface
* Thermally shocks the PCB (decreased reliability)
* Plugs (or partially plugs) plated through-holes

HASL used to be the de-facto surface finish for most PCBs. As component footprint has shrunk, the limitations of HASL have begun to cause serious issues.

The major issue is the uneven surface that HASL provides. With 0.5-0.8mm pitch QFN and BGA components, this irregular solder deposit can bridge pads and create shorts.

The thermal shock from dipping the PCB into a pool of molten solder can damage tiny vias and tracks, even causing a via to crack. This may result in the board working fine at room temperatures, but failing at -10°C as the metal in the via contracts.

## Immersion Tin (ISn)

Immersion tin is

{{% figure src="example-of-immersion-tin-surface-finish-on-pcb.jpg" width="890px" caption="Example of an immersion tin (ISn) PCB surface finish. Image from http://www.standardpcb.com/."  %}}

**Pros**

* Relatively cheap, but more expensive than HASL
* Flat surface
* No lead (RoHS compliant)
* Re-workable

**Cons**

* Short shelf-life (3-6 months)

The biggest issue with ISn is that the copper and tin layers slowly diffuse into one another over time. This creates "tin wiskers", and limits the shelf-life of ISn PCBs (before soldering) to about 3-6 months.

## Immersion Silver (IAg)

Immersion silver is good alternative to ENIG.

{{% figure src="pcb-surface-finish-immersion-silver.jpg" width="600px" caption="Example of an immersion silver (IAg) PCB finish. Image from http://www.rlcinnovation.com/."  %}}

**Pros**

* Precise
* Only requires one plating procedure (compared to ENIG)

**Cons**

* Moderately expensive
* Finger-grease and solvents can cause wetting problems
* Gets attacked in acidic and sulphur environments

PCBs plated with IAg must not be handled directly or cleaned with a solvent prior to soldering, as finger-grease and solvents can cause wetting problems.

## Electroless Nickel Immersion Gold (ENIG)

ENIG is becoming more and more popular as component package pitch sizes drop, and RoHS regulation becomes more common place.

{{% figure src="example-of-immersion-gold-pcb-surface-finish.jpg" width="1557px" caption="Example of an immersion gold PCB surface finish. Image from http://www.standardpcb.com/."  %}}

**Pros**

* Very high shelf-life
* Good for PCB fingers
* Good for RF shield connections

**Cons**

* More expensive than immersion silver
* Requires to plating procedures (nickel, then gold)

## Immersion vs. Electro-less Platings

Immersion platings rely on a chemical displacement reaction of the surface of the PCB copper with a more noble metal that is in solution. Remember back to school chemistry in where iron nails where placed in a copper sulphate solution, and after a while the nail would be covered in copper?

Immersion platings are very thin (once the surface is covered, the reaction stops), and don't have great adhesion.

Electro-less platings use auto-catalytic platings.

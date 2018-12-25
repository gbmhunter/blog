---
author: gbmhunter
date: 2015-04-27 07:51:28+00:00
draft: false
title: Designators
type: page
url: /pcb-design/designators
---

## Overview

Designators are small component-identifying pieces of text that usually reside on both the circuit schematics and the top and bottom silkscreen layers of a PCB design.

{{< figure src="/images/2015/04/0603-resistor-and-designator-2d-cad-birds-eye-high-zoom.png" width="425px" caption="A 0603 resistor and it's designator inside a CAD packages PCB design file."  >}}

## Resetting Designators

There are pros and cons to resetting the designators on a PCB:

**PROS**  * You get to re-order the designators, this is especially true if there are now "gaps" (e.g. R8 and R10 exist, but there is no R9) after component changes have been made.

**CONS**  * Component numbers may no longer match up between versions. This can be confusing when people refer to a component as "U7" on one version, but it is "U4" on the next.  * Changing designator text lengths may cause silk-screen violations on PCB. For example, if the designator used to be "C96", and is renamed to "C102", it will now be longer and may, say, run into a copper pad on the PCB.  * Component targeted rules and other design methodologies may stop working correctly if the CAD package uses the designators to identify the component. This is true with Alitum when defining classes and rules based of the designators.

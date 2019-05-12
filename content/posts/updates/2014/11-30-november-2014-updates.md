---
author: gbmhunter
categories: [ "Updates" ]
date: 2014-11-30
draft: false
tags: [ "Altium", "bss", "candy-calc", "canvas", "castellation", "desmear", "etchback", "gerber", "HTML", "IMS", "IPC-2581b", "odb++", "resistors", "RF design", "rotation", "scripts", "SEPIC", "temperature sensors", "updates" ]
title: November 2014 Updates
type: post
---

* Added [Desmear and Etch/pcb-design/desmear-and-etchback/nd-etchback) under Electronics->PCB Design.  

    {{< figure src="/images/2014/11/etchback-after-plating.png" width="219px" caption="A via which has been plated after etchback was done, notice the 'three-point connection'."  >}}

* Update to the [sed page](/programming/operating-systems/linux/programs/sed) with a new example on replacing a date format.

* Added a new [Coin Cell page](/electronics/components/batteries/button-cell-coin-cell) under Electronics->Components->Batteries.

* Added information about terminal block connection types to the [Connectors page](/electronics/components/connectors).

* Added information about [volume resitivity](/electronics/components/resistors#volume-resistance-bulk-resistance) to the [Resistors page](/electronics/components/resistors).

* New [IMS (Insulated Metallic Substrate) PCBs page under Electronics->PCB Design. Includes tikz drawn diagrams.  
](/electronics/pcb-design/ims-insulated-metal-substrate-pcbs)  

    {{< figure src="/images/2014/11/ims-pcb-aluminium-side-on-photo.png" width="653px" caption="A side on photo of a IMS PCB with an aluminium base."  >}}

* New [.bss Section page](/programming/languages/c/bss-section) under Programming->Languages->C.

* Added more info and photos to the [Castellation page.](/pcb-design/castellation/)

* Added more information about [current-sense resistors](/electronics/components/resistors#current-sense-resistors) to the [Resistors page](/electronics/components/resistors).

* Added more information about analogue and digital temperature sensors to the [Temperature Sensor page](/electronics/components/sensors/temperature-sensors/).

* Fixed the problem with the asterisks appearing after page headers throughout the website, for more info is the post [Two Bugs Which Need Fixing Soon...](/posts/updates/2014/11-05-two-bugs-which-need-fixing-soon/).

* Starting using HTML5 canvas objects to draw diagrams. See the [IMS PCBs page](/pcb-design/ims-insulated-metal-substrate-pcbs/#single-sided-single-layer-ims-pcb) for some examples.

* Fixed plugin conflict between Raw HTML Pro and Preserved HTML Editor Markup, which were both trying to do the same thing and somehow causing HTML/Javascript code in posts to get corrupted. I disabled the Preserved HTML Editor Markup plugin and now Raw HTML Pro seems to be working fine (raw HTML/Javascript is preserved when saving, and also when switching between the visual and text editor).

* Updated [candy-calc](https://github.com/gbmhunter/candy-calc), fixed bug where characters where being deleted from inputs if non-numeric.

* Removed non-embedded engineering related pages from website.

* Made Online Calculators a main menu entry.

* The "Component Packages page" is now been moved to be a sub-page of PCB Design. I have now started creating a seperate page per package as the single page was getting a little too large.

* New [SOD-523 Component Package page](/pcb-design/component-packages/sod-523-component-package).

* Added [Linear Regulators page](/electronics/components/power-regulators/linear-regulators) under Electronics->Components->Power Regulators.

* Updates to the [AltiumScriptCentral repo](https://github.com/gbmhunter/AltiumScriptCentral), including a new polygon generator!

* Updates to the [Altium Scripting page](/electronics/general/altium/altium-scripting-and-using-the-api) and the [VBScript page](/programming/languages/vbscript).

* New RF Design section under Electronics. Added the first pages, [Link Budgets](/electronics/rf-design/link-budgets) and RF Black Magic.

* New [page on 2D Coordinate Rotation](/mathematics/geometry/2d-coordinate-rotation/) under Mathematics.  

    {{< figure src="/images/2014/12/2d-co-ordinate-rotation-equations.png" width="375px" caption="2D co-ordinate rotation equations."  >}}

* New info about SEPICs added to the [Power Converters page](/electronics/components/power-regulators).

* Removed the double title bug which occurred when I started using a new SEO plugin,

* New tip on adding direct connect style to specific pads in Altium to the [Altium Tricks And Standards page](/electronics/general/altium/altium-tricks-and-standards#direct-connect-for-specific-pads).

* The Gerber file page has now been renamed to [PCB Data Formats](/pcb-design/pcb-data-formats), and more information regarding other PCB file formats such as ODB++, Gerber X2 and IPC-2581B have been added.
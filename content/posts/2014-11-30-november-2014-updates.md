---
author: gbmhunter
date: 2014-11-30 08:36:44+00:00
draft: false
title: November 2014 Updates
type: post
url: /updates/november-2014-updates
categories:
- Updates
tags:
- altium
- bss
- candy-calc
- canvas
- castellation
- desmear
- etchback
- gerber
- html 5
- ims
- ipc-2581b
- odb++
- resistors
- rf design
- rotation
- scripts
- sepic
- temperature sensors
- updates
---


  * Added [Desmear and Etchback page](http://blog.mbedded.ninja/electronics/pcb-design/desmear-and-etchback) under Electronics->PCB Design.  

{{< figure src="/images/2014/11/etchback-after-plating.png" width="219px" caption="A via which has been plated after etchback was done, notice the 'three-point connection'." caption-position="bottom" >}}

  * Update to the [sed page](http://blog.mbedded.ninja/programming/operating-systems/linux/programs/sed) with a new example on replacing a date format.
  * Added a new [Coin Cell page](http://blog.mbedded.ninja/electronics/components/batteries/button-cell-coin-cell) under Electronics->Components->Batteries.
  * Added information about terminal block connection types to the [Connectors page](http://blog.mbedded.ninja/electronics/components/connectors).
  * Added information about [volume resitivity](http://blog.mbedded.ninja/electronics/components/resistors#volume-resistance-bulk-resistance) to the [Resistors page](http://blog.mbedded.ninja/electronics/components/resistors).
  * New [IMS (Insulated Metallic Substrate) PCBs page under Electronics->PCB Design. Includes tikz drawn diagrams.  
](http://blog.mbedded.ninja/electronics/pcb-design/ims-insulated-metal-substrate-pcbs)  

{{< figure src="/images/2014/11/ims-pcb-aluminium-side-on-photo.png" width="653px" caption="A side on photo of a IMS PCB with an aluminium base." caption-position="bottom" >}}

  * New [.bss Section page](http://blog.mbedded.ninja/programming/languages/c/bss-section) under Programming->Languages->C.
  * Added more info and photos to the [Castellation page.](http://blog.mbedded.ninja/electronics/pcb-design/castellation)
  * Added more information about [current-sense resistors](http://blog.mbedded.ninja/electronics/components/resistors#current-sense-resistors) to the [Resistors page](http://blog.mbedded.ninja/electronics/components/resistors).
  * Added more information about analogue and digital temperature sensors to the [Temperature Sensor page](http://blog.mbedded.ninja/electronics/components/temperature-sensors).
  * Fixed the problem with the asterisks appearing after page headers throughout the website, for more info is the post [Two Bugs Which Need Fixing Soon...](http://blog.mbedded.ninja/site-admin/two-bugs-which-need-fixing-soon).
  * Starting using HTML5 canvas objects to draw diagrams. See the [IMS PCBs page](http://blog.mbedded.ninja/electronics/pcb-design/ims-insulated-metal-substrate-pcbs#single-sided-single-layer-ims-pcb) for some examples.
  * Fixed plugin conflict between Raw HTML Pro and Preserved HTML Editor Markup, which were both trying to do the same thing and somehow causing HTML/Javascript code in posts to get corrupted. I disabled the Preserved HTML Editor Markup plugin and now Raw HTML Pro seems to be working fine (raw HTML/Javascript is preserved when saving, and also when switching between the visual and text editor).
  * Updated [candy-calc](https://github.com/mbedded-ninja/candy-calc), fixed bug where characters where being deleted from inputs if non-numeric.
  * Removed non-embedded engineering related pages from website.
  * Made Online Calculators a main menu entry.
  * The "Component Packages page" is now been moved to be a sub-page of PCB Design. I have now started creating a seperate page per package as the single page was getting a little too large.
  * New [SOD-523 Component Package page](http://blog.mbedded.ninja/pcb-design/component-packages/sod-523-component-package).
  * Added [Linear Regulators page](http://blog.mbedded.ninja/electronics/components/power-regulators/linear-regulators) under Electronics->Components->Power Regulators.
  * Updates to the [AltiumScriptCentral repo](https://github.com/mbedded-ninja/AltiumScriptCentral), including a new polygon generator!
  * Updates to the [Altium Scripting page](http://blog.mbedded.ninja/electronics/general/altium/altium-scripting-and-using-the-api) and the [VBScript page](http://blog.mbedded.ninja/programming/languages/vbscript).
  * New RF Design section under Electronics. Added the first pages, [Link Budgets](http://blog.mbedded.ninja/electronics/rf-design/link-budgets) and RF Black Magic.
  * New [page on 2D Coordinate Rotation](http://blog.mbedded.ninja/mathematics/2d-coordinate-rotation) under Mathematics.  

{{< figure src="/images/2014/12/2d-co-ordinate-rotation-equations.png" width="375px" caption="2D co-ordinate rotation equations." caption-position="bottom" >}}

  * New info about SEPIC's added to the [Power Converters page](http://blog.mbedded.ninja/electronics/components/power-regulators).
  * Removed the double title bug which occurred when I started using a new SEO plugin,
  * New tip on adding direct connect style to specific pads in Altium to the [Altium Tricks And Standards page](http://blog.mbedded.ninja/electronics/general/altium/altium-tricks-and-standards#direct-connect-for-specific-pads).
  * The Gerber file page has now been renamed to [PCB Data Formats](http://blog.mbedded.ninja/pcb-design/pcb-data-formats), and more information regarding other PCB file formats such as ODB++, Gerber X2 and IPC-2581B have been added.


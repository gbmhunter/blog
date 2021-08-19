---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Electronic Components" ]
date: 2015-11-30
draft: false
tags: [ "connectors", "electronic components", "headers", "pins", "sockets" ]
title: Headers
type: page
---

## Overview

The term "Header" normally refers to a basic row of pins or sockets, with little or no additional features such as shrouds, locking ability, or keyed parts. The most common pitch for headers is 2.54mm (100mil). Headers are versatile, as they not vendor-specific, can be connected to by soldering, hooks/probes, or the opposite gender header (either a plug or jack), normally have a standardised pitch, can handle a decent amount of current (at least 1A for normal 2.54mm headers), and are cheap!

Headers are used frequently on electronic development kits. For example, the [Arduino](/programming/microcontrollers/arduino), [RaspberryPi](/programming/microcontrollers/raspberry-pi), and [PSoC](/programming/microcontrollers/psoc) development kits all use headers for various things such as programming the microcontroller to providing a way to connect expansion boards.

## Types

Headers can have two different pin types, square post of machined post. Square-post headers have square pins, while machined post header have circular pins. The machined post headers are more expensive, but can take more current as there is more contact area between the male and female parts.

You can also get headers which are polarised, usually by both the male missing one pin, and the female part missing the associated hole. This prevents the common mistake of plugging in a header offset by 1 pin or completely the wrong way around. Note that careful choice of the missing pin is required to minimise the chance of an incorrect mating.

## Typical Pin Numbering

Male headers (plugs) are normally numbered from left-to-right, when the connectors solder terminals (tail end) are facing south on the PCB, and the bits that do the connecting are facing north (all of this while looking down on the PCB). For female headers (jacks) to match, they are numbered from right-to-left. This is all better explained in the following image.

{{< img src="typical-numbering-order-for-header-connectors.png" width="687px" caption="This image show the typical way in which headers are numbered, with males headers (plugs) being numbered left-to-right and female headers (jacks) being numbered from right-to-left."  >}}

## Using Headers For Board-to-Board Connections

They are also a great, cheap way of connecting two or more PCBs together, as shown in the following image. A disadvantage is that this method is not as mechanically strong as some more expensive custom board-to-board connection methods.

{{< img src="2-54mm-smd-right-angle-header-plug-and-jack-mosaic.jpg" width="1200px" caption="Header plugs and jacks (male and female parts) are a good way of connecting PCBs together."  >}}

## Part Links

Samtec make some good priced, [2.54mm pitch square-post connectors](http://www.samtec.com/connectors/standard-board-to-board/100-inch-square-post.aspx).

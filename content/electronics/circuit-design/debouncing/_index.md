---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Circuit Design ]
date: 2013-08-02
draft: false
lastmod: 2023-07-02
tags: [ buttons, debouncing, hardware, firmware, schematics, Schmitt trigger, Ganssle, switch ]
title: Debouncing
type: page
---

{{% warning-is-notes %}}

## Overview

_Debouncing_ is the technique of detecting and removing multiple state changes from a hardware device (most commonly a push-button switch) caused when the mechanical contacts touch. Because of tiny imperfections in switch contacts, as the contacts come together and make a conductive circuit, the actual resistance jumps up and down multiple times in quick succession (this is the bouncing). Although the human eye cannot see this when a light is turned on in a house, this bouncing can cause problems for logic which is expecting a single state tradition (e.g. a microcontroller which is counting button presses).

{{% figure src="example-switch-waveform-needs-debouncing.webp" width="600px" caption="An example output from a button press, which needs debouncing." %}}

You might have encountered a cheap electronic device before which didn't perform debouncing, and noticed when pressing buttons the device would behave erratically. Sometimes pressing down once will scroll through multiple items, or pressing "back" will jump through multiple menus (Puhui T-962 Reflow Oven, I'm looking at you).

Debouncing has also been adopted as a software term to describe functions which are only called once even though the user may click the button multiple times (or to delay a function after user input[^free-code-camp-debounce-how-to-delay-a-javascript-function]). A classic example is a "Pay Now" button when buying something online.

The amount the time it takes for a switch to stabilize is highly dependent on the type of switch and how it is actuated, but if designing a filter you have to start somewhere right? **A general rule-of-thumb is to allow the switch 20ms to settle** when switching between on and off (in either direction). However, some switches have been seen to take 150ms[^ganssle-guide-to-debouncing]!

## Hardware Debouncing

TODO: Add RC circuit.

A schmitt trigger can be used to avoid "grey areas" of digital logic.

Another way to get around debouncing issues is to use a double-throw switch, and connect both sides of the throw (one side of the pole) through pull-up resistors to a microcontroller. Connect the other side of the pole to ground. The microcontroller can then monitor both pins and detect a switch state only when one pin goes high and then the other goes low.

## Firmware Debouncing

Another way to debounce inputs is to use firmware. Assuming the button is connected to the input of a microcontroller, it is normally simpler, cheaper, and easier to do the debouncing in firmware than hardware.

## Further Reading

[The Ganssle group, A Guide To Debouncing](http://www.ganssle.com/debouncing.pdf), is an awesome, in-depth investigation into switch debouncing. If you are reading up on this topic, it is a must see!

## References

[^ganssle-guide-to-debouncing]: Jack Ganssle (2014, Mar). _A Guide to Debouncing, or, How to Debounce a Contact in Two Easy Pages_ [Web Page]. The Ganssle Group. Retrieved 2020-06-20, from http://www.ganssle.com/debouncing.pdf.
[^free-code-camp-debounce-how-to-delay-a-javascript-function]: Ondrej Polesny (2021, Jan 18). _Debounce – How to Delay a Function in JavaScript (JS ES6 Example)_ [Web Page]. freeCodeCamp. Retrieved 2023-07-02, from https://www.freecodecamp.org/news/javascript-debounce-example/.

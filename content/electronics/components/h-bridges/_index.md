---
aliases: [ /electronics/circuit-design/h-bridges/ ]
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Circuit Design ]
date: 2011-09-03
description: Schematics, circuits, half-bridges, transistor-based design, motors, controlling bi-color LEDs and more info about H-bridges.
draft: false
lastmod: 2018-12-31
tags: [ electronics, circuit design, H-bridges, half-bridges, circuits, transistors, MOSFETs, motors, LEDs ]
title: H-Bridges and Other Motor Drivers
type: page
---

## Overview

A _motor driver_ is a circuit which drives some type of motor. A _H-bridge_ is a two-leg/four-switch power inverter which converts DC current into a form of AC current. It is also known as a full-bridge. A half-bridge is only one leg of the full-bridge.

{{% aside type="tip" %}}
Try **not get confused** with thinking H-bridge stands for half-bridge, the H is for the shape a full-bridge makes, it does not shorthand for _half_.
{{% /aside %}}

## Circuit

{{% figure src="lm5104-example-circuit.jpg" width="800px" caption="Example half-bridge circuit for the LM5104 half-bridge controller."  %}}

## A Basic Switch/Relay H-Bridge

**A double-pole, double-throw switch or relay can act as an basic H-bridge.** This may be suitable for manually-switched loads, or loads which do not require switching often.

The disadvantages are high-drive power (if using relays), mechanical wear of the switching elements, and slow switching speeds (PWM control is pretty much impossible with a switch or relay).

They are suitable for things like heating/cooling elements which use on/off control (with suitable hysteresis) with large thermal masses (i.e. slow switching speeds).

## A Transistor H-Bridge

Almost all serious half or full-bridges use [MOSFETs](/electronics/components/transistors/mosfets/) as the switches. This is because MOSFETs have very low on resistances, meaning they can sink/source plenty of current without heating up. Some of the better MOSFETs are pushing on resistances (`\( R_{DS(on)} \)`) as low as `\( 1m\Omega \)` or less, allowing for continuous currents in the hundred's of amps as long as the MOSFET is heatsinked correctly.

## Discrete Component H-Bridge With Only Two Control Lines

With a bit of clever circuitry, you can create a H-bridge made from discrete components that only requires two control lines, direction and PWM.

{{% figure src="full-bridge-schematic-two-control-inputs-discrete-components.png" width="1067px" caption="A full-bridge example schematic made from discrete components. This circuit only requires two control inputs and has shoot-thru protection."  %}}

As a bonus, it also has shoot-through protection!

One thing to watch out for here is the forward voltage drop of the diodes compared to the gate turn-on voltage of the N-channel MOSFETs. The gates of Q5 and Q6 are driven low through diodes. This means that the voltage at the gate doesn't go all the way down to 0V, but hangs around the forward-voltage drop of the diode. For general purpose diodes, this can be around 700mV, which is approaching the turn-on gate threshold voltage of some N-channel MOSFETs. The best solution is to use Schottky diodes (as shown), which have a lower voltage drop of around 300-500mV (dependent on current of course).

## Driver ICs

There are heaps of H-bridge related ICs! Some are just a controller that takes in a PWM signal and outputs control signals designed to go to a MOSFET driver, some include the controller and the MOSFET driver, and some even include the power MOSFETs (these are typically called _fully integrated_ motor driver ICs).

For the same price and or physical size, N-channel MOSFETs have a lower `\(R_{DS(on)}\)` than P-channels. Because of this, many H-bridge circuits use N-channel MOSFETs for the top-side switches as well as the bottom-side. Top-side N-channel switches require a voltage greater than `\( V_{CC} \)` at the gate to turn them on. Most H-bridge drivers have an internal charge pump which takes care of this for you.

### L298/L298N

The `L298` is an older, fully integrated motor driver IC that uses BJTs rather than MOSFETs for the H-bridges. It contains 2 independent H-bridges. It uses AND gates to implement simple control logic based two input lines and 1 enable line per H-bridge.

### DRV82x

The `DRV821x` is a family of fully integrated (control and power electronics) brushed DC motor controllers from Texas Instruments. 

{{% aside type="tip" %}}
Texas Instruments uses the prefix `DRV` for all of their brushed, brushless and stepper motor driver ICs[^ti-motor-drivers-overview].
{{% /aside %}}

{{% ref "fig-drv8212p-motor-driver-ic-functional-block-diagram" %}} shows the functional block diagram for the `DRV8212P` motor driver IC. It has internal charge pumps for the gate drives to power the high-side N-Channel MOSFETs, and basic over-current, under-voltage and over-temperature protection. There are two separate power supplies can be provided. `\(V_{CC}\)` is for the logic and can range from 1.65-5.5V. `\(V_M\)` is purely for powering the motor and can range from 0-11V[^ti-drv8212p-motor-driver-ic-ds].

{{% figure ref="fig-drv8212p-motor-driver-ic-functional-block-diagram" src="drv8212p-motor-driver-ic-functional-block-diagram.png" width="600px" caption="The functional block diagram for the DRV8212P motor driver IC[^ti-drv8212p-motor-driver-ic-ds]." %}}

## Bi-Colour LED's

Bi-colour LED's that only have two pins (two LED's connected head-to-tail) require a full-bridge to be driven correctly. Normally the bi-colour LED can be connected directly up to pins on a microcontroller (with a current-limiting resistor), as long as the micro can sink and source the required current.

## Filtering

Unfiltered H-bridges subject the load to square wave whose frequency is the same as frequency of the H-bridge switching elements.

This is acceptable for some loads (e.g. resistive heaters), but not for others (e.g. peltiers). The problem is that although the average power delivered to a load from a PWM controlled H-bridge is the same powering the load from a continuous DC source at the average voltage, resistive losses are proportional to the square of the current (`\( P_R = I^2 R \)`).

This results in higher resistive losses in a complex load controlled by a PWM source than a constant DC power source providing the same average input power.

The solution is to filter the switching H-bridge output, so the load sees a constant DC voltage. H-bridges can be filtered with two inductors and two capacitors, forming two low-pass filters on each side of the load.

## External Links

[http://homepages.which.net/~paul.hills/SpeedControl/SpeedControllersBody.html](http://homepages.which.net/~paul.hills/SpeedControl/SpeedControllersBody.html) is a really good site explaining half-bridges, full-bridges and regenerative breaking.

[http://www.homofaciens.de/technics-base-circuits-h-bridge_en_navion.htm](http://www.homofaciens.de/technics-base-circuits-h-bridge_en_navion.htm) has some great general information and schematics on full-bridges.

## References

[^ti-drv8212p-motor-driver-ic-ds]: Texas Instruments (2021, Jul). _DRV8212P - 11-V H-Bridge Motor Driver with PWM Interface and Low-Power Sleep Mode_ [Datasheet]. Retrieved 2023-07-18, from https://www.ti.com/lit/ds/symlink/drv8212p.pdf.
[^ti-motor-drivers-overview]: Texas Instruments. _Motor drivers_ [Product Family Page]. Retrieved 2023-07-18, from https://www.ti.com/motor-drivers/overview.html.

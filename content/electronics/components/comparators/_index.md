---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Electronic Components ]
date: 2014-06-24
draft: false
lastmod: 2023-08-01
tags: [ comparators, op-amp, voltage reference, hysteresis, PCBs, surface leakage, non-inverting, inverting ]
title: Comparators
type: page
---

## Overview

A _comparator_ is an electronic circuit which takes two inputs, and outputs a signal which depends on which input has a higher voltage. One input is called the non-inverting input and the other input the inverting input. The output is `1` (`HIGH`) if the non-inverting input voltage is higher than the inverting input, the output is `0` (`LOW`) is the opposite is true.

{{% aside type="tip" %}}
Comparators are closely related to op-amps. A comparator is basically an op-amp which is operated in it's open-loop mode (no feedback). Be careful interchanging the two as there are other subtleties, such that comparators are generally higher speed. Op-amps can generally work well as slow comparators, but comparators don't work so well as op-amps.
{{% /aside %}}

This is the schematic symbol for a comparator, which is the same as the op-amp.

{{% figure src="basic-op-amp-schematic-symbol.png" width="350px" caption="The basic schematic symbol for a comparator (it is the same for an op-amp)."  %}}

Comparators are commonly used as building-blocks in larger circuits. Comparators are a core component in [voltage supervisor ICs](/electronics/components/voltage-supervisors/).

## Comparators vs. Op-Amps

So what are the differences between comparators and op-amps?  * Comparators are optimised for fast slew rate and propagation time.  * Op-amp's are designed to have negative feedback to reduce the gain. Comparators can go unstable when negative feedback is added.

Op-amps can be used as low-performance comparators, but comparators cannot usually be used as low-performance op-amps (they are typically unstable under negative feedback).

## Gain

Comparators have a very high open-loop gain.

## Types

There are push-pull and open-drain comparators.

## Voltage References

Usually you want some kind of stable voltage reference to feed into one of the compparators input pin, the other pin being fed the signal you want to compare to the refernce. Some comparators come with built-in voltage references, which can be directly hooked up to the input pin of your choosing.

## Hysteresis

Hystersis is essentially caused by positive feedback. Many comparators have a small, built in hystersis (**interal hystersis**). External hystersis can be added if additional noise is to be expected, or to stop the output from switching so quickly (e.g. thermostat controls).

The following diagram shows how hystersis effects the outputs state changes (from low to high and back again) in regards to the input, for a non-inverting comparator configuration.

{{% figure src="comparator-hystersis-graph.png" width="334px" caption="A graph showing how comparator hystersis works."  %}}

## Push-Pull Output Comparators

## Non-Inverting Configuration

The following diagram shows a non-inverting comparator with hystersis resistors added.

{{% figure src="comparator-push-pull-out-non-inverting-configuration.png" width="535px" caption="A schematic of a comparator in the non-inverting configuration."  %}}

Firstly, determine the amount of hystersis you want (\( V_{HYST} \)). Then use the following equation to work out the ratio between the feedback and input resistor.

<div>$$ \frac{R_{FB}}{R_I} = \frac{V_{OH} - V_{OL}}{V_{HYST}} $$</div>

Next, you need to determine an appropriate value for one of them, and then calculate the other resistance value. One way to determine \( R_{FB}\) is to set a quiscent current limit, say 100uA.

## Inverting Configuration

Nothing here yet...

## Open-Drain Output Comparators

Open-drain output comparators require an extra pull-up resistor on the output (when compared to push-pull output comparators) to enable hystersis. This resistor, along with the feedback resistor, will create a voltage divider and introduce some error when the output is high. To keep this error small, it is recommended that \( R_{FB} > 100 \times R_{pullup} \).

## PCB Surface Leakage

When keeping the input bias current low is important, sometimes you have to consider the effects of **PCB surface leakage**. The resistance between two PCB traces in close proximity is about 1012 in low humidity conditions. If the two comparators inputs have a 5V difference, this surface leakage allows 5pA to flow, which can be much more than the input bias current of some comparators (e.g. 1pA). Guard rings can be added to prevent leakage currents.

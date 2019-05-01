---
author: gbmhunter
categories: [ "Electronics", "Electronic Components" ]
date: 2013-05-06
draft: false
tags: [ "inductor", "inductors", "inductance", "permeability", "parallel", "series", "parasitic model", "saturation current", "packages" ]
title: Inductors
type: page
---

## Overview

Inductors are passive electronic components which store energy as a magnetic field. They are made by coiling wire around a material (be it air, or something else). They are not as common as [resistors](/electronics/components/resistors) and [capacitors](/electronics/components/capacitors) in electronic circuits. They are related to [transformers](/electronics/components/transformers).

{{< img src="3-35uh-20a-large-inductor.jpg" caption="A 3.35uH 20A large inductor." width="400px" >}}

**The mechanical equivalent of an inductor is mass.** The larger the inductance, the larger the mass. This is when using the [force-voltage](http://lpsa.swarthmore.edu/Analogs/ElectricalMechanicalAnalogs.html) equivalence.

Two inductances which are in close proximity they can couple with each, this is called **mutual inductance**. This is the basic principle behind a [transformer](/electronics/components/transformers).

## Terminology

<table>
    <thead>
        <tr>
            <th>Term</th>
            <th>Definition</th>
        </tr>
    </thead>
<tbody>
<tr>
<td>Core</td>
<td>Inductors are made from turns of wire. The core of an inductor is the area enclosed by these turns of wires.
</td>
</tr>
<tr>
<td>Ferro-magnetic</td>
<td></td>
</tr>
<tr>
<td>Inductance</td>
<td>The inductance of an inductor is it's primary parameter. It is a measure of how much energy the inductance can store. It is also a measure of the voltage the inductor will generate in response to a current change. This parameter is used to calculate it's impedance, for a given frequency.</td>
</tr>
<tr>
<td>Permeability</td>
<td></td>
</tr>
<tr>
<td>Self-resonance</td>
<td></td>
</tr>
</tbody>
</table>

## Inductors In Series And In Parallel

The behaviour of inductors when connected together in series and in parallel is exactly the same behaviour resistors exhibit, and exactly the opposite behvaiour of what capacitors exhibit.

## Inductors In Parallel

When two inductors are connected in parallel, the equivalent total inductance follows the inverse law, as long as there is no **mutual coupling** of their magnetic fields:

<div>$$ L_{total} = \dfrac{1}{\dfrac{1}{L1} + \dfrac{1}{L2}} $$</div>

It is usually easier to remember this equation as:

<div>$$ \dfrac{1}{L_{total}} = \dfrac{1}{L1} + \dfrac{1}{L2} $$</div>

The following diagram shows this:

{{< img src="inductors-in-parallel-with-equation.png" width="608px" caption="Two inductors in parallel is the equivalent of one inductor whose inductance is given by the reciprocal equation in this image."  >}}

## Inductors In Series

The equivalent inductance of two inductors connected in series is the sum of the individual inductances, as long as there is no **mutual coupling** of their magnetic fields.

<div>$$ L_{total} = L1 + L2 $$</div>

This is shown in the diagram below:

{{< img src="inductor-in-series-with-equation.png" width="609px" caption="Two inductors in series are the equivalent of one inductor whose inductance is the sum of the indiviual inductances."  >}}

## Common Core Materials

<table>
    <thead>
        <tr>
            <th>Core Material</th>
            <th>Uses</th>
        </tr>
    </thead>
<tbody >
<tr >
<td >Air core</td>
<td >Air core is used to describe any inductor which does not use a magnetic material for it's core (so they may infact, have something other than air for their core). Used in low inductance, RF applications because they lack any magnetic core to boost their inductance, but at the same time benefit from smaller core losses which can be significant in the RF spectrum. Go to the Air-Cored Inductors section for more info.</td>
</tr>
<tr >
<td >Powdered Ferrite Core</td>
<td >The powder is compressed into blocks before using (but don't confuse these with solid ferrite core inductors). Very lossy (resistive) at high frequencies. Used to make ferrite beads.</td>
</tr>
<tr >
<td >Solid Iron (or Steel) Core</td>
<td >Used in low resistance, high inductance applications. Has a higher saturation current than air-cored inductors, but lower one than powdered iron cores.</td>
</tr>
<tr >
<td >Powerdered Iron Core</td>
<td >Powered iron core inductors have a **distributed air gap**, which gives them a higher stauration current then solid iron cored inductors.</td>
</tr>
<tr >
<td >Metal Composite</td>
<td > </td>
</tr>
</tbody>
</table>


## Equations

## Inductance Equation

The equation relating the voltage, inductance and change in current is:

<div>$$v = L \frac{di}{dt}$$</div>

<p class="centered">
    where:<br>
    \(v\) is the voltage across the inductor<br>
    \(L\) is the inductance of the inductor<br>
    \(\frac{di}{dt}\) is the instantanous change in current through the inductor<br>
</p>

## Energy Equation

The energy stored in a inductor is given by:

<div>$$E = \frac{1}{2}LI^2$$</div>

<p class="centered">
    where:<br>
    \(E\) is the energy stored in the inductor<br>
    \(L\) is the inductance of the inductor<br>
    \(I\) is the current flowing through the inductor<br>
</p>

This equation is only valid when the inductor is operating in it's linear region, that is, before the current reachs the point where the magnetic feild begins to **saturate**. Notice that it is similar to the [equation for energy in a capacitor](/electronics/components/capacitors#energy).

## Simple Impedance Model

An ideal inductor (no parasitic elements) has an impedance given by:

<div>$$Z_L = 2\pi fL$$</div>

<p class="centered">
    where:<br>
    \( Z_L \) = inductor's impendence (\( \Omega \))<br>
    \( f \) = frequency of analysis (\( Hz \))<br>
    \( L \) = inductance of inductor (\( H \))<br>
</p>

This shows that the impedance goes up as the frequency goes up. At DC levels, the inductor has no impedance and acts like a short-circuit, while at high frequencies the inductor approaches an open-circuit.

You may also see this written as:

<div>$$Z_L = \omega L$$</div>

<p class="centered">
    where:<br>
    \( \omega \) = radian frequency (rad/s) (which is equal to \( 2\pi f \))<br>
</p>

{{% note %}}
Impedance, although measured in Ohms, is **not the same as resistance**. A resistance converts the energy into heat, the impedance of the inductor however cause the energy to be stored in it's magnetic field, which is returned to the circuit when the current falls.
{{% /note %}}

For a more accurate but complex model, see the Parasitic Model section.

## Parasitic Model

An inductor with parasitic components may be modelled by:

<div>$$Z_L = \frac{1}{ \frac{1}{R_P} + \frac{1}{j \omega L + R_S} + j \omega C_P }$$</div>

<p class="centered">
    where:<br>
    \( Z_L \) = inductor's impendence (\( \Omega \))<br>
    \( R_P \) = parasitic parallel resistance (which is negliable for most simulations) (\( \Omega \))<br>
    \( \omega \) = frequency of analysis (\( rad/s \))<br>
    \( L \) = inductance of inductor (\( H \))<br>
    \( R_S \) = parasitic series resistance (\( \Omega \))<br>
    \( C_P \) = parasitic parallel capacitance (\( F \))<br>
</p>

The main parasitic components are the series resistance (`\( R_S \)`) and the parallel capacitance (`\( C_P \)`). The series resistance arises from the resistance of the coil of wire which makes up the inductor. This thinner and longer the coil, the larger this resistance. The parallel capacitance is due to coil windings being very close to one another, each coil forming small capacitors to surrounding coils. This small capacitors can be lumped together and form the parallel capacitance.

This model is a pretty good representation for most simulation purposes, and gives that characteristic decrease in performance (non-inductor-like behavior) at high-frequencies.

Typical values might be:

* `\( R_P = 0\Omega \)`
* `\( L = 1uH \)`
* `\( R_S = 10m\Omega \)`
* `\( C_P = 10pF \)`.

## Inductor Networks

## Inductors In Parallel

Inductors in parallel behave just like resistors in parallel.

<div>$$ \frac{1}{L_{eq}} = \frac{1}{L_1} + \frac{1}{L_2} + \ldots + \frac{1}{L_N} $$</div>

## Inductors In Series

Inductors in series behave just like resistors in series.

<div>$$ L_{eq} = L_1 + L_2 + \ldots + L_n $$</div>

## Important Parameters

<table>
    <thead>
        <tr>
            <th>Parameter Symbol</th>
            <th>Parameter</th>
            <th>Units</th>
            <th>Important Because...</th>
        </tr>
    </thead>
<tbody>
<tr >
<td >\(I\)</td>
<td >Inductance</td>
<td >Henrys (\(H\))</td>
<td >This parameter determines the relationship between the rate of change in current through the inductor and the inductors voltage.</td>
</tr>
<tr >
<td >\(DCR\)</td>
<td >DC resistance</td>
<td >Ohms (\(\Omega\))</td>
<td >The DC resistance of the coil of wire that the inductor is made up from. You can use this to calculate resistive losses through the inductor. An ideal inductor has no DCR.</td>
</tr>
<tr >
<td >\(I_{sat}\)</td>
<td >Saturation Current</td>
<td >Amps (\(A\))</td>
<td >This is the most important current rating. Essentially, this is the maximum current the inductor can take before it stops working like an inductor. At higher currents, the inductor becomes much more lossy.</td>
</tr>
<tr >
<td >\(I_{rated}\)</td>
<td >Rated current</td>
<td >Amps (\(A\))</td>
<td >Be careful when choosing an inductor, normally it's the saturation current which is important, and it can be much lower than the rated current!</td>
</tr>
</tbody>
</table>

Inductors are commonly used as an energy storage component in [DC/DC converters](/electronics/components/power-regulators).

## Air-cored Inductors

Air-cored inductors represent any inductor which contains no ferromagnetic material. This means that "air-cored" inductors also covers a range of inductors which use an insulator instead of air for the core, which includes materials such as glass or PTFE.

## Advantages

* Unlike a ferro-magnetic cored inductor, an air-cored inductors **inductance does not vary with the amount current that is flowing with it**. Ferromagnetic cores work fine up until a point at which they **saturate**.
* Air-cores do not have any iron losses. This advantage becomes more significant with increasing frequency.

## Disadvantages

* Air-cored inductors have to have more  and/or larger turns to achieve the same inductance value as a ferro-magnetic core. This is because **ferro-magnetic cores have a higher permeability than air**.
* Air-cored inductors radiate more electromagnetic fields over a wider area, and also pickup more radiation. This is because ferro-magnetic-cores constrain the magnetic field lines better.

## Ferrite Beads

See the [Ferrite Beads page](/electronics/components/ferrite-beads).

## Inductor Kickback

Inductor kickback is when an inductor the current through an inductor is quickly stopped, usually by making an open circuit. Because inductors "want to keep the current flowing", they generate a very large voltage spike in attempt to keep the current going. This large voltage spike can jump switch gaps, fry MOSFET's, destroy other sensitive circuitry, and give people dangerous shocks.

A more technical way of looking a kickback is by analysing the [voltage-inductance equation](/electronics/components/inductors#inductance-equation). From this is should be obvious that the inductors voltage is proportional to the change in current. Making an inductor open-circuit is creating a very large change in current, and hence it produces a very large voltage spike.

Inductor kickback is a significant design issue when using [relays](/electronics/components/relays) or [motors](/electronics/components/motors).

## Saturation Current

Inductors only behave like inductors over a **limited current range**. As the current continues to increase, the apparent inductance of the inductor decreased. Above a certain current, they become what is called saturated. 

> Saturation is the state reached when an increase in applied external magnetizing field H cannot increase the magnetization of the material any further.

The below image shows a typical inductance vs. current curve for a ferrite core, SMD inductor that could be used on a 3A SMPS design. It's rated saturation current is 4.2A. Notice how after the current increases beyond this point, the inductance of the inductor drops of rapidly.

{{< img src="inductance-vs-current-graph-wurth-7447789003-3.3uh.png" width="502px" caption="Inductance vs. current graph of the Wurth 7447789003, a 3.3uH ferrite SMD inductor with a specified saturation current of 4.2A."  >}}

As governed by the basic induction equation, applying a constant voltage across an inductor will lead to a linear increase in current. This will be the case until the saturation point, at which the current will begin to increase more rapidly, until is reaches a limit determined only by the DC resistance of the windings.

Reaching saturation is not always a bad thing. Saturation is desirable in self-switching power supplies, timing circuits and blocked oscillators, and saturable-core transformers (e.g. arc welding). It is not desirable in typical SMPS, or power/signal transformers.

## Rated Current

The rated current of an inductor is the maximum DC current allowed before the inductor gets"too hot". "Too hot" is usually defined as a certain temperature rise above ambient (e.g. `\( 40^{\circ}C \)`) when the inductor is mounted using a standard footprint on a standard PCB; again, both defined by the manufacturer. 

## Saturation Current vs. Rated Current

There are usually two maximum current ratings on an inductor's datasheet, the saturation current and the rated current.

Confusing? The most simple Simon design approach is to pick the lower maximum current of the two and treat that as the maximum current allowed through the inductor. A seasoned inductor sensei will realise that the rated current is not applicable to short current peaks, and so it is safe to exceed this for brief periods of time, as long as the saturation current is not exceeded (disclaimer: in some cases, even exceeding the saturation current limit is o.k. or even desirable, but see the Saturation Current section for more info on this.

## Inductor Packages

{{< img src="ipc-sm-782-component-dimensions-for-smd-inductors.png" width="709px" caption="Standard dimensions for three different types of SMD inductor packages. Image from the IPC-SM-782 standard."  >}}

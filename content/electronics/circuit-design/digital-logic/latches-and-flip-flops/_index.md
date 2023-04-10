---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Circuit Design" ]
date: 2012-08-06
draft: false
lastmod: 2023-04-10
tags: [ electronics, circuit design, digital logic, latches, flip-flops, SR latch, D latch, JK latch, D flip-flop, propagation delay, inverters, and gates, edge detection, circuit, mtbf ]
title: "Latches And Flip-Flops"
type: "page"
---

## Overview

A _latch_ or _flip-flop_ (a.k.a. _bistable multivibrator_) is a digital circuit which is able to store a single "bit" of information. It has two stable states (representing a digital `1` or `0`), and they can be made to change state by manipulating digital inputs. Hence they are also called _bistable multivibrators_ (two stable states). **Latches and flip-flops form the basic storage element in sequential logic**.

The typical distinction between a latch and a flip-flops is[^bib-eforu-flipflops]:
* Latches are level-triggered (a.k.a. _asynchronous_)
* Flip-flops are edge-triggered (a.k.a. _synchronous_, _clocked_).

## Latches

Latches are level-triggered circuits which can retain memory. When a latch passes the input through to the output, we say it is _transparent_. When the input is blocked from passing through to the output (i.e. in input has no effect) we say the latch is _opaque_.

Most latches are built from two identical cross-coupled inverting logic gates, e.g. two NOR gates or two NAND gates. 

### SR Latches

The SR (**S**et-**R**eset) latch is the most basic form of latch. It can be built from two cross-coupled NOR gates as shown below:

{{% figure src="sr-latch-from-nor-gates.svg" width="500px" caption="A SR latch made from NOR gates." %}}

Driving either S or R high allows you to set the latch into the 1 or 0 state respectively. The state of the latch is represented by the output `\(Q\)` and it's complement `\(\bar{Q}\)`. Because of feedback from the outputs, driving both S and R low makes the latch "remember" or "retain" it's last known state (holding). Below is the characteristic table for a SR latch built from NOR gates:

<table>
  <thead>
    <tr>
      <th style="width: 50px;">S</th> 
      <th style="width: 50px;">R</th>
      <th style="width: 80px;">\(Q\)</th>
      <th style="width: 80px;">\(\bar{Q}\)</th>
      <th style="width: 200px;">Action</th></tr>
  </thead>
  <tbody>
    <tr><td>0</td>  <td>0</td>  <td>\(Q\)</td>  <td>\(\bar{Q}\)</td>  <td>Hold</td></tr>
    <tr><td>0</td>  <td>1</td>  <td>0</td>  <td>1</td>            <td>Reset</td></tr>
    <tr><td>1</td>  <td>0</td>  <td>1</td>  <td>0</td>            <td>Set</td></tr>
    <tr><td>1</td>  <td>1</td>  <td>0</td>  <td>0</td>            <td>Not allowed</td></tr>
  </tbody>
</table>

Driving both set and reset high is a forbidden state, as it makes both `\(Q\)` and `\(\bar{Q}\)` equal 0.

A SR latch can also be made with two NAND gates instead of two NOR gates:

{{% figure src="sr-latch-from-nand-gates.png" width="500px" caption="A SR latch made from two NAND gates." %}}

When making the SR latch from NAND gates the invalid state is now `\(S = R = 0\)` and the hold state is `\(S = R = 1\)`, they switch positions compared to the SR latch built from NOR gates. Below is the full truth table:

<table>
  <thead>
    <tr><th style="width: 50px;">S</th>
    <th style="width: 50px;">R</th>
    <th style="width: 80px;">\(Q\)</th>
    <th style="width: 80px;">\(\bar{Q}\)</th>
    <th style="width: 200px;">Action</th></tr>
  </thead>
  <tbody>
    <tr><td>0</td>  <td>0</td>  <td>1</td> <td>1</td>            <td>Not allowed</td></tr>
    <tr><td>0</td>  <td>1</td>  <td>0</td> <td>1</td>            <td>Reset</td></tr>
    <tr><td>1</td>  <td>0</td>  <td>1</td> <td>0</td>            <td>Set</td></tr>
    <tr><td>1</td>  <td>1</td>  <td>\(Q\)</td> <td>\(\bar{Q}\)</td>            <td>Hold</td></tr>
  </tbody>
</table>

`SN74LS279` is a quad SR latch component by Texas Instruments. Two of the four latches have two set inputs, allowing for either to be active to set the latch (equivalent to an OR gate placed before a normal single set input SR latch).

SR latches can be used to make a switch debounce circuit.

#### Why Have Q And Q Bar?

You might wonder what the purpose of `\(\bar{Q}\)` is, given it's always the opposite of `\(Q\)` and you generally think of the value of `\(Q\)` representing the state of the latch. It's because sometimes you do need the inverse of `\(Q\)` in further logic, and so providing it saves an inverter. And it's needed in the internal logic of the latch anyway, so it's not of great cost to provide a pin for it on the package.

#### How Does An SR Latch Work?

. **`\(R\)` is `HIGH` and `\(S\)` is `LOW`:** Since `\(R\)` is high, the output of the top NOR gate is `LOW`. This `LOW` feeds into the bottom NOR gate, along with `\(S\)` which is also `LOW`, thus the output of the bottom NOR gate is `HIGH`. This `HIGH` feeds into the top NOR gate, which will keep the circuit in this defined state, even if `\(R\)` is then brought LOW. This gives the SR latch it's memory.
. **`\(R\)` is `LOW` and `\(S\)` is `HIGH`:** Because of the symmetry, the same things happens, but in reverse. `\(Q\)` is `HIGH` and `\(\bar{Q}\)` is `LOW`. Again, if `\(S\)` goes low, the SR latch "remembers" and keeps it's outputs in the same state.

{{% figure src="sr-latch-from-nor-gates-states-red-black.svg" width="800px" caption="(A): A SR latch in the reset state. (B): A SR latch in the set state. Red represents logical \"1\", black logical \"0\"." %}}

### D Latch

A _D Latch_ is like a SR latch except extra circuitry is added so that instead of and set and reset input, you obtain a single input to set or reset (`\(D\)`), and an enable line `(\(E\))`. This is generally a more practical type of latch as it can store the arbitrary state of a single line when told to do so by the enable input.

As the below diagram shows, a D latch is essentially a SR latch but with extra NAND gates and a inverter added to the front. The NAND gates "gate" the data line by anding it with the enable, such as that when the enable line is 0, no signal gets through. The inverter acts to remove the need to separate "set" and "reset" lines of a traditional SR latch by providing the two signals from one input.

{{% figure src="d-latch-from-nand-gates.png" width="700px" caption="A D latch made from NAND gates and an inverter." %}}

You can see from the below truth table that when `\(E = 0\)`, the latch remembers it's last state. When `\(E = 1\)`, the signal on `\(D\)` is passed onto the output:

<table>
  <thead>
    <tr><th style="width: 50px;">E</th>
    <th style="width: 50px;">D</th>
    <th style="width: 80px;">\(Q\)</th>
    <th style="width: 80px;">\(\bar{Q}\)</th>
    <th style="width: 200px;">Action</th></tr>
  </thead>
  <tbody>
    <tr><td>0</td>  <td>0</td>  <td>\(Q\)</td>  <td>\(\bar{Q}\)</td>            <td>Hold</td></tr>
    <tr><td>0</td>  <td>1</td>  <td>\(Q\)</td>  <td>\(\bar{Q}\)</td>            <td>Hold</td></tr>
    <tr><td>1</td>  <td>0</td>  <td>0</td>      <td>1</td>                      <td>Reset</td></tr>
    <tr><td>1</td>  <td>1</td>  <td>1</td>      <td>0</td>                      <td>Set</td></tr>
  </tbody>
</table>

### JK Latch

A JK latch is just an extension of the SR latch where the circuit is modified to remove the forbidden state `\(S = R = 1\)` and instead cause the output to toggle.

## Flip-Flops

_Flip-flops_ are like latches, except the input is only propagated to the output (i.e. transparent) for a very brief period during the transition of the clock pulse (the clock edge). Flip-flops can be built from two back-to-back latches, with the clock signal inverted to one of them.

### D Flip-Flops

A D flip-flop (where the D either stands for **D**elay or **D**ata) is a flip-flop which is based off the D latch, with additional circuitry to make it edge-triggered instead of level triggered. Below is the basic symbol for a D-type flip-flop with no preset or clear:

{{% figure src="d-flipflop-symbol-level.png" width="300px" caption="The schematic symbol for a D-type flipflop." %}}

But how is a D flip-flop actually made? Basically, you could add the edge-trigger circuit to the `\(E\)` line of a D latch (as shown above) to make a D flip-flop:

{{% figure src="d-flipflop-with-time-delay-trigger.png" width="800px" caption="A D flip-flop made from a D NAND-based latch and additional edge-trigger circuit." %}}

We now instead call the `\(E\)` line the `\(CLK\)`, to signify it is edge-triggered rather than level-triggered.

How does the front-end edge-detecting circuit work? It is a very simple circuit made from an inverter and an AND gate, and exploits the non-zero propagation delay time through the inverter. The timing diagram for the circuit is shown below:

{{% figure src="time-delay-trigger-using-and-inverter-timing-diagram.png" width="500px" caption="Positive edge-detecting circuit made from an inverter and an AND gate. This circuit exploits the non-zero propagation delay through the inverter." %}}

{{% note %}}
Any odd number of inverters may be placed in series to increase the pulse-width of the output signal. You commonly see this circuit drawn with three. An RC circuit may also be used to increase the pulse-width.
{{% /note %}}

You can actually eliminate the need the inverting/NAND gate altogether by connecting the output of the top NAND to the input of the bottom NAND as shown in the below image, saving one gate (lower cost/size).

{{% figure src="d-flipflop-internals-no-inv-gate.svg" width="800px" caption="A D-type flip-flop with the inverting/NAND gate removed by connecting the output of the top NAND to the input of the bottom NAND." %}}

You may have noticed that the output stage of the D-type flip-flop looks familiar -- that's because it's just an SR latch! The below image highlights the SR latch section of a D-type flip-flop.

{{% figure src="d-flipflop-internals-highlighting-sr-latch.svg" width="800px" caption="A D flip-flop is just a SR latch with some extra circuitry added on the front end to add in the delay functionality." %}}

D-type flip-flops are used for counters, shift-registers and input synchronization.

#### Triggering

Edge-triggered D flip-flops can be either positive or negative edge triggered. Edge-triggered flip-flops are shown by a triangle at the clock input, and negative edge-triggered ones have an additional bubble. However, positive-edge triggered is much more common, and standard practice is to make a negative edge triggered flip-flop by adding your own inverting gate on the clock signal.

NOTE: Adding a inverting gate to the clock signal increasing the propagation delay for that clock input, and will have a significant impact on the operation in high-speed designs.

#### Flip-flop MTBF

<p>\begin{align}
{\rm MTBF}(t_r) = \frac{e^{ \frac{t_r}{\tau} } } {T_O fa}
\end{align}</p>

<p class="centered">
where:<br/>
\(t_r\) = resolution time (time since clock edge), \(s\)<br/>
\(f\) = sampling clock frequency, \(Hz\)<br/>
\(a\) = asynchronous event frequency, \(Hz\)<br/>
\(\tau\) = flip-flop time constant (this is a function of it's transconductance), \(s\)<br/>
\(T_o\) = <br/>
</p>

Typical values for a flip-flop inside an ASIC could be:

* `\(t_r = 2.3ns\)`
* `\(\tau = 0.31ns\)`
* `\(T_O = 9.6as\)`
* `\(f = 100MHz\)`
* `\(a = 1MHz\)`

Which gives `\(\rm MTBF = 20.1days\)`.

### JK Flip-flop

## References

[^bib-eforu-flipflops]:  ElectronicsForu (2017, Aug 16). _Basics and Overview of Flip Flops_. Retrieved 2021-10-19, from https://www.electronicsforu.com/technology-trends/learn-electronics/flip-flop-rs-jk-t-d.
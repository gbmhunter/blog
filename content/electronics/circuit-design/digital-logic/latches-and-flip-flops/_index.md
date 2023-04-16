---
authors: [ "Geoffrey Hunter" ]
categories: [ Electronics, Circuit Design ]
date: 2012-08-06
draft: false
lastmod: 2023-04-13
tags: [ electronics, circuit design, digital logic, latches, flip-flops, SR latch, D latch, JK latch, D flip-flop, propagation delay, inverters, and gates, edge detection, circuit, mtbf, asynchronous, reset, NAND, NOR, AND ]
title: "Latches and Flip-Flops"
type: "page"
---

## Overview

A _latch_ or _flip-flop_ (a.k.a. _bistable multivibrator_) is a digital circuit which is able to store a single "bit" of information. It has two stable states (representing a digital `1` or `0`), and they can be made to change state by manipulating digital inputs. Hence they are also called _bistable multivibrators_ (two stable states). **Latches and flip-flops form the basic storage element in sequential logic**.

The typical distinction between latch and a flip-flop is:

* Latches are not provided a clock-signal, and they act immediately when their inputs change. Latches are said to be _asynchronous_.
* Flip-flops are fed a clock-signal, and they store information when either the clock is at a particular level (level-triggered) or on the transition of the clock signal between states (edge-triggered). Flip-flops are said to be _synchronous_ or _clocked_.

There is some confusing statements made in online references to the difference between latches and flip-flops. Some sources say latches are level-triggered and flip-flops are edge-triggered, but then go on to present a "D-type flip-flop" schematic which is actually level-triggered (normally transparent when the clock is high) and has no edge detection circuitry. Other sources say latches are not provided a clock whilst flip-flops need a clock, but then go to show a SR "latch" with an enable input, which could easily be driven by a clock signal.

Another thing not helping the confusion is that a "D latch" has an enable input (`E`). This could be easily fed from a clock signal and become a level-triggered flip-flop. So it all depends on who you ask. I'll try to stick to the commonly used term (either latch or flip-flop), when describing the below circuits.

{{% tip %}}
Latches and flip-flops can store information, but they are not typically used when one generally thinks of computer "memory", i.e. hard drives, solid-state drives or RAM. They use entirely different ways of storing information. Hard drives use magnetism to store non-volatile information, while solid-state drives and RAM use "floating gate" MOSFETs to store information.
{{% /tip %}}

## Latches

**Latches are asynchronous (no clock) circuits which can retain memory.** Latches can have an enable input, which blurs the line between what is a latch and what is a flip-flop (if the enable line was driven from a clock, it would become a level-triggered flip-flop). For latches that have an enable input, when a latch passes the input through to the output, we say it is _transparent_. When the input is blocked from passing through to the output (i.e. in input has no effect) we say the latch is _opaque_.

Most latches are built from **two identical cross-coupled inverting logic gates**, e.g. two NOR gates or two NAND gates. 

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
    <tr><td>0</td>  <td>1</td>  <td>0</td>      <td>1</td>            <td>Reset</td></tr>
    <tr><td>1</td>  <td>0</td>  <td>1</td>      <td>0</td>            <td>Set</td></tr>
    <tr><td>1</td>  <td>1</td>  <td>0</td>      <td>0</td>            <td>Not allowed</td></tr>
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

<div class="worked-example">
Let's simulate a NAND-based SR latch in Micro-Cap. Here is the schematic:

{{% figure src="sr-latch-nand-sim/schematic.png" width="500px" caption="" %}}

The digital stimulus `U1` drives `R` and `U2` drives `S`. With the following sequence:

1. Both were set to start as both `1`'s, which should put the latch in an indeterminate state (start-up).
1. After 10ns, we test the set functionality by driving `R` low while keeping `S` high, which should set the latch.
1. After 20ns, `R` is driven back high which should make the latch hold the previous state (set).
1. After 30ns, we test the reset by driving `S` low while keeping `R` high, which should reset the latch.
1. After 40ns, `S` is driven back high, which should make the latch hold the previous state (reset).

And here is the transient analysis, which agrees with the expected behaviour:

{{% figure src="sr-latch-nand-sim/transient-analysis.png" width="900px" caption="" %}}

{{% tip %}}
Quite nicely, Micro-Cap shows the indeterminate state between 0 and 10ns with lines at both the `0` and `1` level.
{{% /tip %}}

The Micro-Cap circuit file used to perform this simulation can be downloaded [here](sr-latch-nand-sim/circuit.cir).

</div>

`SN74LS279` is a quad SR latch component by Texas Instruments. Two of the four latches have two set inputs, allowing for either to be active to set the latch (equivalent to an OR gate placed before a normal single set input SR latch).

SR latches can be used to make a switch debounce circuit.

#### Why Have Q And Q Bar?

You might wonder what the purpose of `\(\bar{Q}\)` is, given it's always the opposite of `\(Q\)` and you generally think of the value of `\(Q\)` representing the state of the latch. It's because sometimes you do need the inverse of `\(Q\)` in further logic, and so providing it saves an inverter. And it's needed in the internal logic of the latch anyway, so it's not of great cost to provide a pin for it on the package.

#### How Does An SR Latch Work?

1. **`\(R\)` is `HIGH` and `\(S\)` is `LOW`:** Since `\(R\)` is high, the output of the top NOR gate is `LOW`. This `LOW` feeds into the bottom NOR gate, along with `\(S\)` which is also `LOW`, thus the output of the bottom NOR gate is `HIGH`. This `HIGH` feeds into the top NOR gate, which will keep the circuit in this defined state, even if `\(R\)` is then brought LOW. This gives the SR latch it's memory.
1. **`\(R\)` is `LOW` and `\(S\)` is `HIGH`:** Because of the symmetry, the same things happens, but in reverse. `\(Q\)` is `HIGH` and `\(\bar{Q}\)` is `LOW`. Again, if `\(S\)` goes low, the SR latch "remembers" and keeps it's outputs in the same state.

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

**You can actually simplify the above circuit and remove the need for an inverter altogether.** Just realise the output of the top left NAND gate is always the inverse of `D` as long as `E` is high, so you can actually take the output of this as the inverted `D` and feed it into the bottom left NAND gate as shown:

{{% figure src="d-latch-from-nand-gates-simplified.png" width="700px" caption="A simplified D latch without an inverter." %}}

## Flip-Flops

_Flip-flops_ are like latches, except their inputs are gated by an enable or clock signal which only allows transitions during particular states. You can further separate flip-flops into two categories:

* Level-triggered flip-flops allow state transitions when the enable or clock signal is in a particular state (e.g. when it is `1`).
* Edge-triggered flip-flops only allow state transitions for a very brief period during the transition of the clock pulse (the clock edge).

### Edge Detection

The key feature about a flip-flop is edge-triggered nature of them vs. latched. So how do you design a flip-flop to only do something on the edges of the clock signal? **One very simple way is a circuit made from an inverter and an AND gate**, and exploits the non-zero propagation delay time through the inverter. When the input changes from a 0 to a 1, the delay through the inverter causes both of the inputs to go high for a brief amount of time, which makes the output 1. This enables the latch for a very brief amount of time during the positive edge transition.

The is the basic schematic:

{{% figure src="edge-detection-using-and-inverter.png" width="500px" caption="Simple edge detection circuit made with an inverter and AND gate." %}}

And this is what the timing looks like:

{{% figure src="edge-detection-using-and-inverter-timing-diagram.png" width="700px" caption="Positive edge-detecting circuit made from an inverter and an AND gate. This circuit exploits the non-zero propagation delay through the inverter." %}}

{{% note %}}
Any odd number of inverters may be placed in series to increase the pulse-width of the output signal. You commonly see this circuit drawn with three. An RC circuit may also be used to increase the pulse-width.
{{% /note %}}

<div class="worked-example">
To test this idea, we can simulate the circuit in Micro-Cap. The schematic looks like this:

{{% figure src="edge-detection-using-and-inverter-sim/schematic.png" width="700px" %}}

This simulation used logic gates which had a nominal delay time of `0.3ns` (both low to high and high to low). This is the `D_ABC` timing model in Micro-Cap. The 1-bit Digital Stimulus was setup to go high at `t=5ns` and go low again at `t=10ns` as follows:

{{% figure src="edge-detection-using-and-inverter-sim/1-bit-digital-stimulus-config.png" width="500px" %}}

The resulting transient analysis is:

{{% figure src="edge-detection-using-and-inverter-sim/transient-analysis.png" width="900px" %}}

The Micro-Cap circuit file used to perform this simulation can be downloaded [here](edge-detection-using-and-inverter-sim/circuit.cir).

</div>

The problem with the above edge-detection circuit is that it cannot guarantee that the created pulse is long enough for the latch logic to obtain the correct state[^bib-libretexts-edge-triggered-flip-flop]. There is a better way to do it.

### D-Type Flip-Flops

A _D-type flip-flop_ (where the D either stands for **D**elay or **D**ata depending on who you ask) is a flip-flop which is **based off the D latch, with additional circuitry to make it edge-triggered instead of level triggered**. Below are the basic symbols for a D-type flip-flop:

{{% figure src="d-flipflop-symbol.png" width="700px" caption="The schematic symbols for a D-type flipflop. On the left is one WITH NO asynchronous set or reset, and the right is one WITH asynchronous set or reset." %}}

{{% tip %}}
The wedge symbol drawn against the `CLK` input to tell the reader it is an edge-triggered input. Typically the set and reset are inverse logic, i.e. `1` to do nothing and `0` to either set or reset. The reset pin can also be called _preset_[^bib-ti-sn7474-ds].
{{% /tip %}}

#### D-Type Flip-Flops with Inverters

But how is a D flip-flop actually made? Basically, you could add the edge-trigger circuit to the `\(E\)` (enable) line of a D latch (as shown above) to make a D flip-flop:

{{% figure src="d-flipflop-with-and-inverter.png" width="800px" caption="A D flip-flop made from a D NAND-based latch and additional edge-trigger circuit made with an AND gate and inverter." %}}

We now instead call the `\(E\)` line the `\(CLK\)`, to signify it is edge-triggered rather than level-triggered.

D-type flip-flops are used for counters, shift-registers and input synchronization.

#### D-Type Flip-Flops with More NANDs

The above D-type flip-flop style using the propagation delay through an inverter to create the edge-triggering is not used commonly in industry. What is actually used is either a design with more NAND gates or transmission gates. Let's look at the NAND gate design first. In reality, it is quite a complicated arrangement of gates! The logic diagram is:

{{% figure src="d-flipflop-with-more-nand-gates.png" width="600px" caption="A D-type flip-flop made solely from NAND gates. This version has no asynchronous set and clear inputs." %}}

Roughly speaking, the above circuit is made from three SR latches, the output latch (center right), the input reset latch (upper left) and input set latch (lower left). Note that one of the input NAND gates is has three inputs rather than two.

Let's try and understand how this circuit works! To do so, we'll assume you know how the output SR latch works (if you don't, read the first part of this page!). This removes `U5` and `U6` from the analysis, we can just treat their inputs as the standard `R` and `S` (as annotated on the diagram). Now let's walk through two scenarios, the first when the `CLK` transitions from `0` to `1` while `D=0`, and then second scenario the same clock transition when `D=1`. We'll see what happens to the circuit if further changes to `D` are made once the transition finishes (HINT: nothing happens!).

{{% tip %}}
Common terminology for gates inputs/outputs are used where inputs are labelled `UxA`, `UxB`, ... in order, and the output is `UxY`.
{{% /tip %}}

**What if `D=0` when CLK transitions from `0` to `1`?**

1. Before the transition, `D=1` and `CLK=0`. Then at least 1 input to U2 and U3 is `0`. This means than `U2Y` and `U3Y` must both be `1`.
1. Since `D=0` and `U3Y=1`, then `U4Y=1`. 
1. Since `U4Y=1` and `U2Y=1`, then `U1Y=0`. This gives the following state for all inputs/outputs:
    | Gate | A | B | C | Y
    |------|---|---|---|---
    | U1   | 1 | 1 |   | 0
    | U2   | 0 | 0 |   | 1
    | U3   | 1 | 0 | 1 | 1
    | U4   | 1 | 0 |   | 1
1. Now, `CLK` transitions to `1`. `U2B` and `U3B` immediately go high.
1. Within 1 propagation period, `U2` and `U3` respond. `U2` doesn't do anything because `U2` still has at least 1 of it's inputs as `0` (`U2A`). `U3` however now has all three of it's inputs high, and so `U3Y=0`. This gives the following state for all inputs/outputs:
    | Gate | A | B | C | Y
    |------|---|---|---|---
    | U1   | 1 | 1 |   | 0
    | U2   | 0 | 1 |   | 1
    | U3   | 1 | 1 | 1 | 0
    | U4   | 0 | 0 |   | 1
1. If `D` now changes from `0` to `1` while the `CLK` is high, it will have no effect as it's blocked at `U4` by the fact `U4A` is now `0`.

**What if `D=1` when CLK transitions from `0` to `1`?**

1. If `D=1`, `CLK=0` then at least 1 input to U2 and U3 is `0`. This means than `U2Y` and `U3Y` must both be `1`.
1. Since `D=1` and `U3Y = 1`, then `U4Y=0`.
1. Since `U4Y=0` and `U2Y=1`, then `U1Y=1`.
1. The reset of the gate inputs/outputs are easy to deduce.
1. This gives the following state for all inputs/outputs:
    | Gate | A | B | C | Y
    |------|---|---|---|---
    | U1   | 0 | 1 |   | 1
    | U2   | 1 | 0 |   | 1
    | U3   | 1 | 0 | 0 | 1
    | U4   | 1 | 1 |   | 0
1. Thus, `R=1` and `S=1`, and so the output latch is in a hold state. 
1. Now `CLK` immediately transitions to `1`. Within 1 propagation delay, U2 and U3 respond. `U2` already had `U2A=1`, and now `CLK=1` makes `U2B=1`. This causes the gate to change state and `U2Y` goes from `1` to `0`. `U3` doesn't do anything however, as while `U3B` goes to `1`, `U3C` is still `0`, as so "blocks" `U3` from changing.  This gives the following state for all inputs/outputs:
    | Gate | A | B | C | Y
    |------|---|---|---|---
    | U1   | 0 | 0 |   | 1
    | U2   | 1 | 1 |   | 0
    | U3   | 0 | 1 | 0 | 1
    | U4   | 1 | 1 |   | 0
1. Thus `R=0` and `S=1`, and the output latch gets "set".
1. If `D` changes back from `1` to `0` it will effect the output of `U4Y` which will go from `0` to `1`. However, this output will not effect gates `U1` and `U3` as they are both now "blocked" from changing because `U2Y=0`, meaning they both have at least one `0` input. 

**In Summary**

When the `CLK` transitions from `0` to `1`, the output latch gets set if `D=1` and gets reset if `D=0`. Within 1 NAND gate propagation delay, further changes to `D` do not affect the output as `D` is now blocked by other `0`'s and the inputs to the NAND gates (either immediately by `U4` or by `U2` and `U3`). This is the exact behaviour we wanted!

A common example of this style is the Texas Instruments [SN7474](https://www.ti.com/lit/ds/symlink/sn54ls74a-sp.pdf) "Dual D-Type Positive-Edge Triggered Flip-flops with Reset and Clear"[^bib-ti-sn7474-ds].

This circuit gets even more complicated when you add asynchronous set and reset inputs! Rather than just the 1 three-input NAND gate, all NAND gates need to be three-input.

<div class="worked-example">

Let's simulate a NAND-based edge-triggered D-type flip-flop with asynchronous set and reset inputs. The schematic is:

{{% figure src="d-flipflop-nand-with-set-reset-sim/schematic.png" width="600px" caption="The Micro-Cap schematic for simulating a edge-triggered D-type flip-flop with async. set and reset." %}}

The resulting transient analysis looks as expected! (explanation below graph):

{{% figure src="d-flipflop-nand-with-set-reset-sim/transient-analysis.png" width="900px" caption="The transient analysis of the above circuit." %}}

Explanation of behaviour:

1. The flip-flop first starts up in an undefined state. We don't use the `nSET` or `nRESET` pins to fix this, we'll test those later. So the flip-flop output first transitions into a valid state on the transition of the first positive-going clock pulse at `0.5us`. Because `D=0`, `Q` gets set to `0`.
1. `D` is then "wiggled" back and forth between `0` and `1` and there is no change in the output.
1. The next output transition happens at `t=1.5us`, when there is another positive clock edge while `D=1`. Thus `Q` gets set correctly to `1`. Again, no amount of changing `D` after the edge affects the output.
1. Then we have a play around with the asynchronous reset and set inputs. At `t=3.1us`, we drive `nSET` low, which correctly sets `Q` high, regardless of the clock. Then at `t=3.3us` we drive `nRESET` low and it correctly sets `Q` back to `0`, again, asynchronous to the clock.
1. Everything looks like it is working correctly!

The Micro-Cap circuit file used to perform this simulation can be downloaded [here](d-flipflop-nand-with-set-reset-sim/circuit.cir).

</div>

#### D-Type Flip-Flops with Transmission Gates

In reality, the actual D-type flip-flops you can buy can be much more complicated than what we have just discussed! This is the logic diagram for the Nexperia `74HC74` dual D-type flip-flop IC[^bib-nexperia-74hc74-ds]:

{{% figure src="nexperia-74hc74-d-flip-flop-logic-diagram.png" width="700px" caption="Logic diagram for 1 of the positive-edge triggered D-type flip-flops in the Nexperia 74HC74 IC. Note the complexity![^bib-nexperia-74hc74-ds]" %}}

The four triangles pointing towards each other are transmission gates (TGs), normally made from one N-channel and one P-channel MOSFET connected in parallel (with the substrate not connected to the body, to avoid conduction through it's internal diodes). Some of the circuitry that seems to serve no purpose (like the two inverters in series on the `D` input) has been presumably added to balance propagation times.

#### Examples

The partial part number `74HC74` is a dual D-type CMOS positive-edge triggered flip-flop with set and reset. It has balanced propagation delays. Orderable variants include the Nexperia [74HC74D](https://assets.nexperia.com/documents/data-sheet/74HC_HCT74.pdf) and Toshiba [74HC74D](https://toshiba.semicon-storage.com/info/74HC74D_datasheet_en_20201117.pdf?did=37138&prodName=74HC74D).

The partial part number `LS734` is used for an 8-channel (octal) edge-triggered D-type flip-flop IC. The Texas Instruments [74LS373](https://www.ti.com/lit/ds/symlink/sn54ls373-sp.pdf) is one such example.

{{% figure src="ti-ls374-octal-edge-triggered-d-flip-flop-ic-logic-diagram.png" width="300px" caption="Logic diagram of the Texas Instruments 74LS373 Edge-Triggered D-type Flip-flop IC[^bib-ti-ls374-ds]." %}}

#### Triggering

Edge-triggered D flip-flops can be either positive or negative edge triggered. Edge-triggered flip-flops are shown by a triangle at the clock input, and negative edge-triggered ones have an additional bubble. However, positive-edge triggered is much more common, and standard practice is to make a negative edge triggered flip-flop by adding your own inverting gate on the clock signal.

{{% note %}}
Adding an inverting gate to the clock signal increases the propagation delay for that clock input, and will have a significant impact on the operation in high-speed designs.
{{% /note %}}

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

A JK flip-flop is also known as the gated or clocked SR latch[^bib-byju-sr-flip-flop]. It is a level-triggered device, even though many online tutorials suggest it is edge-triggered. The schematic symbol is:

{{% figure src="jk-flipflop-symbol.png" width="400px" caption="The schematic symbol for a JK flip-flop." %}}

TODO: Should the `CLK` input really have a wedge since it's level-triggered?

The letters J and K were chosen by the inventor of the JK flip-flop, Jack Kilby[^electronics-tutorials-jk-flip-flop]. A JK flip-flop can be built with NAND gates with the following circuit:

{{% figure src="jk-flipflop-from-nand-gates.png" width="700px" caption="Circuit showing how to build a JK flip-flop from NAND gates." %}}

<div class="worked-example">

Let's simulate a NAND-based JK flip-flop in Micro-Cap. The schematic is:

{{% figure src="jk-flipflop-nand-sim/schematic.png" width="600px" caption="The simulation schematic for the JK flip-flop." %}}

We have to set up some rather complicated digital stimulus to put the JK flip-flop through it's paces. The simulation text determining these waveforms is:

{{% figure src="jk-flipflop-nand-sim/schematic-sim-text.png" width="300px" caption="The supported simulation \"text\" that goes with the schematic. This defines the waveforms of the 3x digital stimulus and the initial conditions." %}}

Notice also the definition of initial conditions at the bottom (`.IC`). If this was not provided, the states of `Q` and `nQ` would be forever stuck as indeterminate (in Micro-Cap this is represented by an `X` in text or double-lines at `0` and `1` in the waveform views), as the only way for the simulator to determine their state without using themselves (because of feedback) would be if `nR` or `nS` were 0 (because then the indeterminate state of `Q` and `nQ` doesn't matter in determining `Q` and `nQ`, they would just be `1`). However with a `JK` flip-flop we can't set `nR` or `nS` to `0` via the inputs `J` and `K` without also considering the feedback from `Q` and `nQ` in the triple input NAND gates. Hence the circuit gets stuck! In real life, the circuit would settle on either `Q=1` or `Q=0` at start-up due to real-world noise and manufacturing differences in the start-up times of the NAND gates.

Below is the simulated waveforms of the circuit:

{{% figure src="jk-flipflop-nand-sim/transient-analysis.png" width="1000px" caption="Annotated transient analysis of the JK flip-flop." %}}

Explanation of behaviour:

1. To test setting the JK flip-flop`J` is driven high, `K` is driven low whilst `CLK` is low (i.e. not enabled).
2. `CLK` goes high.
3. `Q` goes high due to `J` being high whilst `CLK` being high. Flip-flop has been set.
4. To test resetting the JK flip-flop, `J` is driven low and `J` driven high whilst `CLK` is low (not enabled).
5. `CLK` goes high.
6. `Q` gets reset as expected.
7. Let's set the JK flip-flop again, but this time show how it is not edge-triggered, the state can still be changed whilst the `CLK` is high.
8. We now bring `J` low and drive `K` high.
9. The output gets reset half-way through the `CLK` being high.
10. Lets demonstrate the oscillatory nature than can be caused if both `J` and `K` are high when the `CLK` is high.
11. The outputs oscillate at a speed determined by the propagation delay of the NAND gates!

</div>

## References

[^bib-eforu-flipflops]: ElectronicsForu (2017, Aug 16). _Basics and Overview of Flip Flops_. Retrieved 2021-10-19, from https://www.electronicsforu.com/technology-trends/learn-electronics/flip-flop-rs-jk-t-d.
[^bib-libretexts-edge-triggered-flip-flop]: Charles W. Kann (2021, May 28). _Book: Digital Circuit Projects - An Overview of Digital Circuits Through Implementing Integrated Circuits (Kahn). 9.4: Edge Triggered Flip-Flop_. LibreTexts: Engineering. Retrieved 2023-04-11 from https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Electronics/Book%3A_Digital_Circuit_Projects_-_An_Overview_of_Digital_Circuits_Through_Implementing_Integrated_Circuits_(Kahn)/09%3A_Memory_Basics_-_Flip-Flops_and_Latches/9.04%3A_Edge_Triggered_Flip-Flop#:~:text=It%20is%20said%20to%20trigger,will%20be%20positive%20edge%20trigger.
[^bib-nexperia-74hc74-ds]: Nexperia (2023, Feb 9). _74HC74; 74HCT74 - Dual D-type flip-flop with set and reset; positive edge-trigger_. Retrieved 2023-04-11 from https://assets.nexperia.com/documents/data-sheet/74HC_HCT74.pdf.
[^bib-ti-ls374-ds]: Texas Instruments (2002, Aug). _SN54LS373, SN54LS374, SN54S373, SN54S374, SN74LS373, SN74LS374, SN74S373, SN74S374 Octal D-type Transparent Latches and Edge-triggered Flip-flops_. Retrieved 2023-04-12 from https://www.ti.com/lit/ds/symlink/sn54ls373-sp.pdf.
[^bib-ti-sn7474-ds]: Texas Instruments (1988, March). _SN5474, SN54LS74A, SN54S74, SN7474, SN74LS74A, SN74S74 - Dual D-Type Positive-Edge Triggered Flip-Flops With Preset And Clear_. Retrieved 2023-04-12 from https://www.ti.com/lit/ds/symlink/sn54ls74a-sp.pdf.
[^bib-byju-sr-flip-flop]: Priyanshu Vaish (2022, Aug 26). _SR Flip-Flop: What is SR Flip-Flop Truth Table?_. Byju's Exam Prep. Retrieved 2023-04-14, from https://byjusexamprep.com/sr-flip-flop-truth-table-i.
[^electronics-tutorials-jk-flip-flop]: Electronics Tutorials. _The JK Flip Flop_. Retrieved 2023-04-14, from https://www.electronics-tutorials.ws/sequential/seq_2.html.

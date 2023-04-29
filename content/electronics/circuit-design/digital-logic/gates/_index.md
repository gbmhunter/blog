---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Circuit Design, Digital Logic ]
date: 2012-08-06
draft: false
lastmod: 2023-04-29
tags: [ electronics, circuit design, digital logic, gates, diode logic, DL, RTL, DTL, TTL, CMOS, binary counter, Karnaugh maps, NAND, NOR ]
title: Gates
type: page
---

## Overview

Logic gate inputs are normally labelled as a single letter, starting with `A` (e.g. a three input AND gate would have inputs `A`, `B` and `C`). The output is normally labelled `Y` (in other material you may see this labelled `X`), unless you are using a flip-flop or latch, and the output is labelled `Q`.

There are a few different standards used to draw logic gates on schematics:

* *MIL-STD-806B* (Graphic Symbols For Logic Diagrams): This most commonly used symbols for basic and/or/xor e.t.c gates is captured in this standard. Each gate has a unique shape and are easily distinguished on a large schematic with many gates. NOT logic is shown with a _bubble_.
* *IEC 60617* (ANSI/IEEE Std 91-1984): All the gates are IC-like rectangles with symbols inside to denote the function. NOT logic is shown with a _flag_ on the pin rather than a _bubble_. Not as easy too quickly identify the gate as MIL-STD-806B, and not as widely used.
* *DIN 40700-24* (Graphical Symbols; Components For Precision Engineering Devices, Especially Clocks): Ever rarer than the MIL-STD-806B or IEC 60617 symbols, these are rarely seen. The 1976 Edition was released in June 1976. DIN symbols on this page are referenced to https://de.wikipedia.org/wiki/Logikgatter#Typen_von_Logikgattern_und_Symbolik.

This page uses the convention of `TRUE` or `1` to represent the logic state true, and `FALSE` or `0` to represent the logic state false.

### NOT

Arguably the simplest logical gate (ignoring a buffer), a _NOT_ gate (a.k.a. inverter) always outputs the opposite (complement) of the input. If the input is `TRUE`, the output is `FALSE`. If the input is `FALSE`, the output is `TRUE`.

{{% figure src="not-gate-symbol.svg" width="800px" caption="The symbols for a NOT gate (inverter)." %}}

The truth table for an NOT gate is:

| Inputs | Output |
|--------|--------|
| *A*    | *Y*    |
| 0      | 1      |
| 1      | 0      |

And this gives rise to the simple equation for NOT logic:

<p>\begin{align}
Y = \overline{A}
\end{align}</p>

### AND/NAND

An AND gate outputs `TRUE` only if all it's inputs are `TRUE`. AND is also called logical conjunction[^bib-wp-list-logic-sym].

{{% figure src="and-gate-symbol.svg" width="800px" caption="The symbols for an AND gate." %}}

Truth table for an AND gate is:

<table>
  <thead>
    <tr><th colspan=2>Inputs</th> <th>Output</th></tr>
    <tr><th>A</th>  <th>B</th>    <th>Y</th></tr>
  </thead>
  <tbody>
    <tr><td>0</td>  <td>0</td>    <td>0</td></tr>
    <tr><td>0</td>  <td>1</td>    <td>0</td></tr>
    <tr><td>1</td>  <td>0</td>    <td>0</td></tr>
    <tr><td>1</td>  <td>1</td>    <td>1</td></tr>
  </tbody>
</table>

The equation for the AND logic may be written in one of the following ways:

<p>\begin{align}
Y &= A \cdot B \ \text{(preferred)} \\
Y &= AB \\
Y &= A \& B \\
Y &= A \wedge B \\
\end{align}</p>

An AND gate can be made using basic diode logic as shown below:

{{% figure src="and-gate-from-diodes-and-resistors.svg" width="300px" caption="An AND gate made from basic diode logic." %}}

A NAND gate is just an AND gate but with the output inverted. This is shown below with the bubble at the output of the AND symbol:

{{% figure src="nand-gate-symbol.svg" width="800px" caption="The symbol for an NAND gate." %}}

Truth table for an NAND gate:

<table>
  <thead>
    <tr><th colspan=2>Inputs</th> <th>Output</th></tr>
    <tr><th>A</th>  <th>B</th>    <th>Y</th></tr>
  </thead>
  <tbody>
    <tr><td>0</td>  <td>0</td>    <td>1</td></tr>
    <tr><td>0</td>  <td>1</td>    <td>1</td></tr>
    <tr><td>1</td>  <td>0</td>    <td>1</td></tr>
    <tr><td>1</td>  <td>1</td>    <td>0</td></tr>
  </tbody>
</table>

### OR/NOR

A OR gate is `TRUE` if at least one input is `TRUE`. This means it is also outputs `TRUE` if all it's inputs are `TRUE`. OR is also called logical disjunction[^bib-wp-list-logic-sym].

{{% figure src="or-gate-symbol.svg" width="800px" caption="The symbol for an OR gate." %}}

Truth table for an OR gate:

<table>
  <thead>
    <tr><th colspan=2>Inputs</th> <th>Output</th></tr>
    <tr><th>A</th>  <th>B</th>    <th>Y</th></tr>
  </thead>
  <tbody>
    <tr><td>0</td>  <td>0</td>    <td>0</td></tr>
    <tr><td>0</td>  <td>1</td>    <td>1</td></tr>
    <tr><td>1</td>  <td>0</td>    <td>1</td></tr>
    <tr><td>1</td>  <td>1</td>    <td>1</td></tr>
  </tbody>
</table>

The OR operation can be expressed in an equation in the following ways:

<p>\begin{align}
Y &= A + B \ \text{(preferred)} \\
Y &= A \vee B \\
Y &= A || B \\
\end{align}</p>

A NOR gate is just a OR gate but with the output inverted (i.e. what you would get if you connected the output of an OR gate to an inverter). Just like the NAND gate, the NOR is gate is shown in the below image -- and is just an OR gate symbol with a bubble on the output.

{{% figure src="nor-gate-symbol.svg" width="800px" caption="The symbols for a NOR gate." %}}

Truth table for an NOR gate:

<table>
  <thead>
    <tr><th colspan=2>Inputs</th> <th>Output</th></tr>
    <tr><th>A</th>  <th>B</th>    <th>Y</th></tr>
  </thead>
  <tbody>
    <tr><td>0</td>  <td>0</td>    <td>1</td></tr>
    <tr><td>0</td>  <td>1</td>    <td>0</td></tr>
    <tr><td>1</td>  <td>0</td>    <td>0</td></tr>
    <tr><td>1</td>  <td>1</td>    <td>0</td></tr>
  </tbody>
</table>

The equation for an NOR gate:

<p>\begin{align}
Y = \overline{A + B}
\end{align}</p>

The OR gate be drawn using three equal diameter circles placed on a grid as shown in the below image. Segments of the circles perimeters are taken along with the addition of two horizontal line sections to form the classic OR gate shape[^bib-spin-num-logic-gates].

{{% figure src="how-to-draw-the-or-gate.png" width="600px" caption="Diagram showing how to draw an OR gate from the segments of three equal diameter circles placed on a grid[^bib-spin-num-logic-gates]." %}}

### XOR

A 2-input _XOR gate_ (_exclusive OR_) only outputs `TRUE` if *one and only one* of it's inputs is also `TRUE`. 

{{% figure src="xor-gate-symbol.svg" width="800px" caption="The symbols for a 2-input XOR (exclusive-or) gate." %}}

Truth table for a 2-input XOR gate:

<table>
  <thead>
    <tr><th colspan=2>Inputs</th> <th>Output</th></tr>
    <tr><th>A</th>  <th>B</th>    <th>Y</th></tr>
  </thead>
  <tbody>
    <tr><td>0</td>  <td>0</td>    <td>0</td></tr>
    <tr><td>0</td>  <td>1</td>    <td>1</td></tr>
    <tr><td>1</td>  <td>0</td>    <td>1</td></tr>
    <tr><td>1</td>  <td>1</td>    <td>0</td></tr>
  </tbody>
</table>

{{% note %}}
The only difference in behaviour between an OR and XOR is when both inputs are `TRUE`. An OR gate outputs a `TRUE` in this case, whilst and XOR outputs a `FALSE`.
{{% /note %}}

The symbol `\(\bigoplus\)` is used to represent XOR, as hence XOR can be written in the following ways:

<p>\begin{align}
Y &= (A \cdot \bar{B}) + (\bar{A} \cdot B) \\
Y &= (A + B) \cdot (\bar{A} + \bar{B}) \\
Y &= A \bigoplus B \\
\end{align}</p>

{{% figure src="xor-gate-made-from-and-nand-or.svg" width="500px" caption="A XOR gate made from 1 AND, NAND and OR gate." %}}

The below image shows a XOR gate made exclusively from NAND gates:

{{% figure src="xor-gate-made-from-nands.svg" width="600px" caption="A XOR gate made exclusively from NAND gates." %}}

You can also make a XOR gate exclusively from NOR gates, as shown in the below image. Note that the structure is similar to the all-NAND gate version of the XOR, but with the additional inverting gate on the output.

{{% figure src="xor-gate-made-from-nors.svg" width="600px" caption="A XOR gate made exclusively from NOR gates." %}}

Whilst it is intuitive how a AND or OR gate should work with more than 2 inputs, that same cannot be said for a XOR gate. Should the output be TRUE only if exactly one input is TRUE? Should the output be TRUE if at least 1 but not all of the inputs are TRUE? Or should the output be TRUE if one input is TRUE, FALSE for 2 inputs TRUE, TRUE again for 3 inputs TRUE, e.t.c?

1. *Output TRUE only if 1 and only 1 input is TRUE*. This is called a _one-hot detector_. However, this is rarely seen in practise.
1. *Output TRUE only if an odd number of inputs are TRUE*. This is called a _parity generator_ or _modulo-2 adder_. This is more commonly implemented behaviour for a XOR gate with more than 2 inputs.

XOR gates are used for:

* *Parity generators*: A sequence of XOR gates can calculate the parity of block of data, which is used for simple single-bit error detection in some communication protocols (e.g. optional setting you can enable with UART)[^bib-maxim-xor-definition].
* *Correlation/sequence detection*: XOR gates output `FALSE` if both inputs are the same. This behaviour can be utilized to perform correlation between two bit streams.
* Cryptographic circuits.

XNOR is an XOR gate but with the output inverted.

{{% figure src="xnor-gate-symbol.svg" width="800px" caption="The symbols for a XNOR gate." %}}

Truth table for an XNOR gate:

<table>
  <thead>
    <tr><th colspan=2>Inputs</th> <th>Output</th></tr>
    <tr><th>A</th>  <th>B</th>    <th>Y</th></tr>
  </thead>
  <tbody>
    <tr><td>0</td>  <td>0</td>    <td>1</td></tr>
    <tr><td>0</td>  <td>1</td>    <td>0</td></tr>
    <tr><td>1</td>  <td>0</td>    <td>0</td></tr>
    <tr><td>1</td>  <td>1</td>    <td>1</td></tr>
  </tbody>
</table>

## What Are Logic Gates Built From?

### Diode Logic (DL)

_Diode logic_ (DL) is digital logic circuitry *made from just diodes and resistors*. It is a very simple (if not the simplest) way of constructing logic gates in a circuit. Diode logic is great for getting a basic theoretical understanding of how logic gates are realized, but is *rarely used in practise due to fan-out, switching speed issues, and limited gate constructibility (more on this below)!*. Also known as _diode-resistor logic_ (DRL). 

{{% figure src="and-gate-from-diodes-and-resistors.svg" width="300px" caption="An AND gate made from basic diode logic." %}}

Before long you'll be struck with the solemn realization you can't create a NOT gate (inverter) from pure diode logic (or any gates that require inverting capabilities, such as NAND or NOR gates). *This limits you to being only able to make AND or OR gates*, and hence it's usefulness is severely limited. NOT gates are constructable as soon as you add switching elements, such as transistors. [^_resistor_transistor_logic_rtl, Resistor-transistor logic] is the extension of diode logic but the addition of transistors.

### Resistor-Transistor Logic (RTL)

_Resistor-transistor logic_ (RTL) is one of the most basic families of digital logic (only diode logic beats it in terms of simplicity). It uses resistors and BJTs to build the basic gates required for digital logic. Now days it is completely superseded by logic families such transistor-transistor logic (TTL) and CMOS. However, it serves as a great place to introduces readers on how logic gates are built from discrete components.

{{% figure src="rtl-logic-inverter.svg" width="400px" caption="A very basic logic \"inverter\" made from RTL." %}}

**Advantages:**

* Very basic to create.
* Used a minimal amount of transistors (this was important in the early days of IC fabrication as transistors were expensive!)

**Disadvantages:**

* **Very limited fan-out.**
* **Significant power consumption:** When the transistors are switched on.
* **Weak drive in one direction:** Single transistor strongly drives output only in one direction, pull-up/down resistor is used in opposite direction.
* **Poor noise margins**.

{{% figure src="rtl-logic-nor-gate.svg" width="400px" caption="Schematic of a RTL NOR gate. When both inputs are `LOW`, neither transistor is on and the output is pulled `HIGH` by `\(R_C\)`. Any `HIGH` input will turn on a transistor, which will drive the output `LOW`. " %}}

### Diode-Transistor Logic (DTL)

TODO: Add info here.

### Transistor-Transistor Logic (TTL)

The inputs of TTL logic are the emitters of BJTs.

### N-type Metal-oxide Semiconductor (NMOS) Logic

N-type Metal-oxide Semiconductor (NMOS) logic is a way of building logic functions from N-channel MOSFETs. In the early days of digital logic (1970s), it was much faster and easier to manufacture than CMOS, however since the 1980s CMOS took over and has become the dominant way of implementing logic gates[^bib-wikipedia-nmos]. NMOS is built from an arrangement of N-channel MOSFETs on the low-side (depending on the function) and a pull-up resistor on the high side. 

#### NMOS Inverter Gate

A NMOS inverter is simply made from a N-channel MOSFET and a resistor, as shown below: 

<div style="display: flex;">
{{% figure src="nmos-inverter-gate.png" width="200px" caption="The simple inverter made using NMOS technology." %}}
{{% circuitjs data="CQAgzCAMB0l3BWEBGGAmOaDsWyQBxoBsAnCViApJZdQgKYC0yyAUAGaX4AsI3YaEEQF8RI5NCQxIaVgHchYovkWCwJQZFYBzVX24rhg7kV7UtAJT1gwRa5DNQ+dJ+cmsAMpWWjBCW76uIOwAhgA2AM70NFoKRuAaetzIdloAskJYaolYDgmaIGjucVn51olaAB6UyBBo+MgguI31vLxovAByaQDyAMoAOhEAkgB2AG70AE4ALtNDAOIhc-LeKvx+PIFVlAhI3GgQCFiNB3btvACCrNVEWLxghEIk1I-7hbwAmqxT1gHxthU1FQcFYQA" %}}
</div>

When the input `\(A\)` is `LOW`, the N-channel MOSFET is turned OFF, and so the output `\(Y\)` is pulled `HIGH` by `\(R1\)`. When `\(A\)` is `HIGH`, the N-channel MOSFET gets turned on. It's equivalent drain-source resistance drops to a value much lower than `\(R1\)`, and so therefore the output is effectively driven `LOW`, completing the inverter functionality.

{{% tip %}}
You can see the static current flow (and therefore power consumption) in the above NMOS circuit simulation when you toggle the input to `HIGH`.
{{% /tip %}}

#### NMOS NOR Gate

The NMOS NOR gate uses two N-channel MOSFETs connected in parallel to drive the output `LOW` if either input is `HIGH`. If neither input is `LOW`, then no MOSFET will be on and the output will be pulled `HIGH` by the resistor.

<div style="display: flex;">
{{% figure src="nmos-nor-gate.png" width="300px" caption="A NOR gate made using NMOS technology." %}}
{{% circuitjs data="CQAgzCAMB0l3BWEBGGAmOaDsWyQBxoBsAnCViApJZdQgKYC0yyAUAGaX4AsI3YaEEQF8RI5NCQxIaVgHMhI7t3yLB3Ir2qRWAJSFZBeXkUMhsg7XzpRbMBKwAylIqv6CEYIqMu32AQwAbAGd6Gh0AdzVwEkFhdWRvHQBZEENVL1UsImpM2zRJVijTI1josDKdAA8XEnMEJCwEOrQEN3NeADlkgHkAZQAdYM6e3SGAcX8AF3oilzcRNt53KFYahqRuNAgETT5iPhReAEE1tIOwXbTL8GbD5F4ATVYAJwMjSBMzMC9bVDgOEI9issJ8fOBBBIpLBZM5dm58KpPN4VKorAEQmEpHN4XxEUDlvjIgS8aoiMCRMTQbwKoJqXxEqtit9XO8YpY5iVwKz0ty0Zzvgg4iz+cyjL8uZcOWL2WkwbTVgp6cosmCNFpVusrtwcC5NvhqLwHiAAEKsIA" %}}
</div>

### Complementary Metal-oxide Semiconductor (CMOS) Logic

_Complementary metal-oxide-semiconductor_ (CMOS) is a way of building logic functions from complementary pairs of N-channel and P-channel MOSFETs. Today, it is by far the most popular way of constructing digital integrated circuits (ICs)[^bib-wikipedia-cmos]. CMOS circuits typically have negligible static power dissipation and only consume power during transitions. It advances from NMOS technology by replacing the upper resistor with P-channel MOSFETs, which both eliminates static power dissipation and speeds up the low-to-high transition.

Represented by `AC`/`ACT` in part numbers, or `HC`/`HCT` for high-speed equivalents. The `T` in the logic subfamily name signifies the parts have TTL-compatible inputs.

#### CMOS Inverter Gate

The inverter is the easiest CMOS logic gate to make! It just consists of one P-channel and one N-channel MOSFET in a "totem-pole" configuration: 

{{% figure src="cmos-inverter-gate.png" width="200px" caption="A CMOS inverter gate." %}}

{{% tip %}}
These diagrams use the simplified MOSFET symbols in where the P-channel as a bubble next to it's gate and the N-channel doesn't. No indication of drain or source are shown either, although this may be a moot point if in an integrated circuit with the substrate not connected to the source. If you are unfamiliar with this MOSFET symbol style, see the [MOSFETs page](/electronics/components/transistors/mosfets/) for more info.
{{% /tip %}}

When the input `\(A\)` is `HIGH`, the gate-source voltage of the bottom-side N-channel MOSFET is `\(+V_{DD}\)` and turns the MOSFET ON. The top-side P-channel MOSFETs gate-source voltage is `\(0V\)` and therefore OFF. Hence the output gets driven `LOW`. When `\(A\)` is `LOW`, the bottom-side N-channel MOSFETs gate-source voltage goes to `\(0V\)` and the P-channel's gate-source voltage goes to `\(-V_{DD}\)`, turning it ON and driving the output `HIGH`. 

{{% circuitjs width="400" height="400" data="CQAgzCAMB0l3BWEBGGAmOaDsWyQBxoBsAnCViApJZdQgKYC0yyAUAGaX4As4CaIImAFh+4CMmhIYkNBy69uwwcqUiBk6bDkB3FSKL594EgMisA5se7cjQgdyK9q5gErGwYIh8jOoIbjp-FylWABlKQxMBBC9o4JB2AEMAGwBnehpzPQQeeNzeUTNWPXt4su5kb3MAWUFbcvxqMFN-NFDShpaBMu6oVgAPSmQINHxkEFwJscUQNF4AYRqAeQBlAB00gEkAOwA3egAnABcjzYBxJNOShQDlAvjsyKM+h77zIYQuwkjC-CRePMQABBQaCKjgH5EaGQgFzXgATVYQA" %}}

#### CMOS NAND Gate

After the inverter, the two easiest CMOS gates to build are the NAND and NOR gates. The NAND gate can be built from two P-channel and two N-channel MOSFETs as shown below.

{{% figure src="cmos-nand-gate.png" width="400px" caption="A CMOS NAND gate, built from two P-channel and two N-channel MOSFETs." %}}

Two N-channels are connected in series on the bottom side, and two P-channels are connected in parallel on the top side. Both inputs (`\(A\)` and `\(B\)`) have to be `HIGH` to turn on both the lower side N-channel MOSFETs and drive the output (`\(Y\)`) `LOW`. If either inputs are `LOW`, at least one of the high-side P-channel MOSFETs will be turned on, driving the output `HIGH`. This completes the NAND logic.

You can play around with the interactive CMOS NAND gate below:

{{% circuitjs data="CQAgzCAMB0l3BWEBGGAmOaDsWyQBxoBsAnCViApJZdQgKYC0yyAUAGaX4As4R+IImDR8BwlNCQxIaDpW69sIhCRFLwEZJKixZnBDxDdxQkcZHitU3XKJpFWEUUch1YTdumyA7pVWv8ARULZBFIVl9nEKcXNECoVgBzQXEFAVMjIl5qcIAlPzUEIgLXeyhy7jpynMlWfKjXIsFYspyjKraYBFYAGXlec0pQo3E29gBDABsAZ3oacL6EBVEhi35qkAmZuakI-pWDXjB18N8lh2Vl44FTynXBorE4hLP14XSCcGfbok-3wU+6h+gJcdguLxSFkMGW4yGK4QAsiBHNR3MUsAgLMdymhaq8BA9DINbsFwMMMmBhj9xJSYtEISiNMUKdjqRZMZCmRCWcyaVS9ucRsp7qNWAAPShoNSQCCOCgYYqKXgAYQRAHkAMoAHWmADkAIK6gAiOoA4uMAC70VhAA" %}}

#### CMOS NOR Gate

A CMOS NOR gate is built in a similar fashion to a NAND gate, except you swap the serial and parallel connections of the P-Ch and N-Ch MOSFETs around.

{{% figure src="cmos-nor-gate.png" width="400px" caption="A CMOS NOR gate." %}}

Play around with toggling the inputs on the interactive simulation: 

{{% circuitjs data="CQAgzCAMB0l3BWEBGGAmOaDsWyQBxoBsAnCViApJZdQgKYC0yyAUAGYhEAs1YJaLvj4Dwg5NCQxIaDpVEZ8XMIMXgIEqbFmcEREYP0GxKSVG1yECrIZUhsgsBrPTZAcy68Q3NN0-VuL2pIVgAlZXEsIgiUQKh4ryl4mARWABlKDHsCb3wlNWCQdgBDABsAZ3oaEIyELIdc-JtkorLK6tYAdxi0Xx69KFYAWRAsZEdx0biwSeo0SS6Y5FEiO2QowYAPTKVxpTHdme97PwBhIYB5AGUAHXKAOQvQu4BxYoAXekWjbxyfnz8IW6-z6PACfSBQnBfiIwl+SkhYO8oLhAMG3Tqc2aeiagkhOPAkD8BLAdXRlFh4DJRGQ0VJeO+tKphiZ-AZwNZKy8bPJmOySgQYGiBUWBIaVlUzXxQv58lUOWlwsSMp5ivAoj0xkRdhmtkcMsRcHAGx+Tmihr4MtW+vN3x1VrhZvJsMt0RdxttwJ1k2t9jyzu9gjGE3ZlBlvjo4YVospeGJlIaIW2VA0JGiCGWKDIxz6AEFWMnIBBiIIMyR7EQkH4+gAhAujFiEiA2Ch4aLVvwATVYQA" %}}

#### Tristate CMOS Inverter

A useful building block for digital logic is a CMOS inverter whose output can also be tri-stated. The obvious way to do this would be connect the output of a regular inverter to a transmission gate, as shown in `(a)` in the figure below. But these MOSFETs can be recombined to make a single "totem-pole" stack which provides the same functionality, as shown in `(b)`[^bib-utah-digital-vlsi-lab-ass-3]. In `(b)`, the N-channel MOSFET of the transmission gate it connected in series with the N-channel MOSFET of the inverter on the lower leg. Likewise for the P-channel MOSFETs. This circuit is sometimes simplified to the symbol shown in `(c)`.

{{% figure src="tristate-inverter.png" width="900px" caption="Diagram showing how a tri-state converter can be made by combining the MOSFETs from a inverter and transmission gate into a single \"totem pole\" arrangement." %}}


### Comparison

<table>
    <thead>
        <tr>
            <th>Logic Subfamily</th>
            <th>Description</th>
            <th>Comment</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>AC</td>
            <td>CMOS.</td>
            <td>|</td>
        </tr>
        <tr>
            <td>CVSL</td>
            <td>Cascode voltage switch logic.</td>
            <td></td>
        </tr>
        <tr>
            <td>HC</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>HCT</td>
            <td>High-speed CMOS with TTL-compatible inputs.</td>
            <td>Only works with a +5V power supply. Interestingly, still slower than original TTL.</td>
        </tr>
        <tr>
            <td>IIL</td>
            <td>Integrated injection logic.</td>
            <td>|</td>
        </tr>
        <tr>
            <td>LS</td>
            <td>Low-power Schottky.</td>
            <td>|</td>
        </tr>
        <tr>
            <td>PTL</td>
            <td>Pass transistor logic.</td>
            <td>|</td>
        </tr>
    </tbody>
</table>

## Logic Gate Part Numbers

Texas Instruments introduced the `SN74xx` series of logic ICs in the 1960s, using TTL logic. These parts became very popular and many other manufactures began making pin-compatible parts. They kept the `74xx` section of the part number to aid identification, and hence the `74xx` is somewhat standardized across the industry.

The 5400 series is the military rated version of the 7400 series. The 4000 series is the newer CMOS alternative to the 7400 TTL logic. However (and which is somewhat confusing), newer 7400 parts can also be made using CMOS logic, for example, the 74HC4051 analogue multiplexer[^bib-ti-74hc4051-multi]. These parts commonly using the logic subfamily names `HC` or `HCT`.

Part number descriptions for the popular TTL 74xx family of ICs:

<table>
    <thead>
        <tr>
            <th>Part Number</th>
            <th>Description</th>
            <th>Num. Units</th>
            <th>Input</th>
            <th>Output</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>74x00</td>
            <td>Quad 2-input NAND gate</td>
            <td>4</td>
            <td>Normal</td>
            <td>Push-pull</td>
        </tr>
        <tr>
            <td>74x01</td>
            <td>Quad 2-input NAND gate</td>
            <td>4</td>
            <td>Normal</td>
            <td>Open-collector</td>
        </tr>
        <tr>
            <td>74x02</td>
            <td>Quad 2-input NOR gate</td>
            <td>4</td>
            <td>Normal</td>
            <td>Push-pull</td>
        </tr>
        <tr>
            <td>74x03</td>
            <td>Quad 2-input NAND gate</td>
            <td>4</td>
            <td>Normal</td>
            <td>Open-collector</td>
        </tr>
        <tr>
            <td>74x04</td>
            <td>Hex inverter gate</td>
            <td>6</td>
            <td>Normal</td>
            <td>Push-pull</td>
        </tr>
        <tr>
            <td>74x05</td>
            <td>Hex inverter gate</td>
            <td>6</td>
            <td>Normal</td>
            <td>Open-collector</td>
        </tr>
        <tr>
            <td>74x06</td>
            <td>Hex inverter gate</td>
            <td>6</td>
            <td>Normal</td>
            <td>Open-collector, 30V/40mA</td>
        </tr>
        <tr>
            <td>74x07</td>
            <td>Hex buffer gate</td>
            <td>6</td>
            <td>Normal</td>
            <td>Open-collector, 30V/40mA</td>
        </tr>
        <tr>
            <td>74x08</td>
            <td>Quad 2-input AND gate</td>
            <td>4</td>
            <td>Normal</td>
            <td>Push-pull</td>
        </tr>
        <tr>
            <td>74x09</td>
            <td>Quad 2-input AND gate</td>
            <td>4</td>
            <td>Normal</td>
            <td>Open-collector</td>
        </tr>
        <tr>
            <td>74x10</td>
            <td>Triple 3-input NAND gate</td>
            <td>3</td>
            <td>Normal</td>
            <td>Push-pull</td>
        </tr>
        <tr>
            <td>74x11</td>
            <td>Triple 3-input AND gate</td>
            <td>3</td>
            <td>Normal</td>
            <td>Push-pull</td>
        </tr>
        <tr>
            <td>74x12</td>
            <td>Triple 3-input NAND gate</td>
            <td>3</td>
            <td>Normal</td>
            <td>Open-collector</td>
        </tr>
        <tr>
            <td>74x13</td>
            <td>Dual 4-input NAND gate</td>
            <td>2</td>
            <td>Schmitt trigger</td>
            <td>Push-pull</td>
        </tr>
        <tr>
            <td>74x4051</td>
            <td>High-speed 8-channel analog multiplexer/demultiplexer</td>
            <td>1</td>
            <td>Analog</td>
            <td>Analog</td>
        </tr>
        <tr>
            <td>74x4052</td>
            <td>Dual 4-channel analog multiplexer/demultiplexer</td>
            <td>2</td>
            <td>Analog</td>
            <td>Analog</td>
        </tr>
        <tr>
            <td>74x4053</td>
            <td>Triple 2-channel analog multiplexer/demultiplexer</td>
            <td>3</td>
            <td>Analog</td>
            <td>Analog</td>
        </tr>
    </tbody>
</table>

The `x` is a placeholder for the logic subfamily. For example, in `74LSxx` the `LS` represent the low-power Schottky subfamily.

A company specific prefix may be added to the above part numbers depending on the manufacturer.

<table>
    <thead>
        <tr>
            <th>Prefix</th>
            <th>Company</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>&lt;none&gt;</td>
            <td>Nexperia, Phillips</td>
        </tr>
        <tr>
            <td>CD</td>
            <td>Texas Instruments</td>
        </tr>
        <tr>
            <td>DM</td>
            <td>National Semiconductor</td>
        </tr>
        <tr>
            <td>ID</td>
            <td>IDT</td>
        </tr>
        <tr>
            <td>M</td>
            <td>STMicroelectronics</td>
        </tr>
        <tr>
            <td>MC</td>
            <td>OnSemi</td>
        </tr>
        <tr>
            <td>MM</td>
            <td>National Semiconductor</td>
        </tr>
        <tr>
            <td>NLV</td>
            <td>OnSemi</td>
        </tr>
        <tr>
            <td>SN</td>
            <td>Texas Instruments</td>
        </tr>
        <tr>
            <td>TC</td>
            <td>Toshiba</td>
        </tr>
    </tbody>
</table>

## Karnaugh Maps

Karnaugh maps are a way of simplifying combinational logic, often used before realising a combination equation into a number of gates to reduce the complexity.

## Logic Simulators

[CEDAR Logic Simulator](http://sourceforge.net/projects/cedarlogic/) is my personal favourite. Free, easy to use, colours the wires depending on their state, and allows for named nets as well as direct connections.

## Example Logic Circuits

### 6-State Binary Counter

Category: Counter  
Expression Style: Sum of Products  
No. of Gates: 14  
No. of Flip-flops:  3  
1-Bit Inputs: 2 + reset  
1-Bit Outputs: 3  

Tested On:

* Simulation: Yes ([CEDAR Logic Simulator](http://sourceforge.net/projects/cedarlogic/))
* Hardware: Yes

Downloads: [CEDAR Logic Simulator File](https://docs.google.com/open?id=0B9GgsT_bUc27SW5sTGZDSlhWQkU)

The 6-state binary counter is a counter which counts from 000 to 101 in the normal binary fashion before resetting back to 0. The output increments on every rising-edge of the count pulse, and the direction pin (upNDown) determines the count direction (when upNDown = 1, the counter goes from 000 to 101, when upNDown is 0 the counter goes from 101 to 000).

The flip-flop equations expressed as sums of products are:

<p>\begin{align}
Q_2 = \bar{Q_2}.\bar{Q_1}.\bar{Q_0}.\bar{y} + \bar{Q_2}.Q_1.Q_0.y + Q_2.\bar{Q_1}.Q_0.\bar{y} + Q_2.\bar{Q_1}.\bar{Q_0}.y \\ \\  
Q_1 = \bar{Q_2}.\bar{Q_1}.Q_0.y + \bar{Q_2}.Q_1.\bar{Q_0}.y + \bar{Q_2}.Q_1.Q_0.\bar{y} + Q_2.\bar{Q_1}.\bar{Q_0}.\bar{y} \\ \\  
Q_0 = \bar{Q_2}.\bar{Q_0} + Q_2.\bar{Q_1}.\bar{Q_0} \\ \\  
\end{align}</p>

{{% figure src="digital-logic-counter-six-state-binary.png" width="700px" caption="Schematic of a six state binary counter." %}}

### 3-Bit Grey Encoded Counter

Category: Counter  
Expression Style: Sum of Products  
No. of Gates: 14  
No. of Flip-flops: 3  
1-Bit Inputs: 2 + reset  
1-Bit Outputs: 3  

Tested On:

* Simulation: Yes ([CEDAR Logic Simulator](http://sourceforge.net/projects/cedarlogic/))
* Hardware: Yes

Download: [CEDAR Logic Simulator File](https://docs.google.com/open?id=0B9GgsT_bUc27REVITzhmQk9DMk0)

The 3-Bit Grey Encoded Counter is a counter that counts from 0 to 7 in binary in a grey encoded fashion. The counter increments on every rising edge of the bit 'count' and the direction bit 'upNDown' determines the direction of counting.

{{% figure src="digital-logic-counter-three-bit-grey-encoded-binary.png" width="700px" caption="Schematic of a three-bit Grey encoded binary counter." %}}

### Quadrature Detection Circuit

This quadrature detection circuit is built entirely in hardware, and only uses one flip-flop. It is useful for detecting the direction that an encoder that outputs quadrature signals is spinning in. Potential applications include [BLDC motor control](/electronics/circuit-design/bldc-motor-control). This circuit can be built entirely in [reconfigurable PSoC on-chip logic](/programming/microcontrollers/psoc).

When the encoder is spinning in one direction, the output will be logic high (1), when it is spinning in the opposite direction, it will be logic low (0).

{{% figure src="quadrature-phase-detection-circuit.png" width="600px" caption="A simple quadrature phase detection circuit using a D flip-flop." %}}

### Delay Circuit

A simple delay circuit can be made just by chaining DQ flip-flops together in series (the output of one feeds the input of another). For every flip-flop, the signal will be delayed by one clock-cycle (assuming they all share the same clock source).

{{% figure src="four-clock-cycle-delay-element-from-flipflops.png" width="800px" caption="A simple four clock-cycle delay element made from four DQ flip-flops. This can be used as a simple timer." %}}

This can be used to make a simple timer. Obviously, a limitation is that a flip-flop is needed for every clock cycle of delay needed (try that with a 1000 clock cycle delay!). More advanced timers use binary encoding with the flip-flops to achieve a greater number of states for a lower number of flip-flops.

## References

[^bib-ti-74hc4051-multi]: Texas Instruments (1997, Nov). _CDx4HC405x, CDx4HCT405x High-Speed CMOS Logic Analog Multiplexers and Demultiplexers (Datasheet)_. Retrieved 2021-10-20, from https://www.ti.com/lit/ds/symlink/cd74hc4051.pdf.
[^bib-maxim-xor-definition]: Maxim Integrated (2020). _Glossary Definition For XOR Gate_. Retrieved 2021-10-22, from https://www.maximintegrated.com/en/glossary/definitions.mvp/term/XOR%20Gate/gpk/1202.
[^bib-spin-num-logic-gates]: McAllister, Willy (2021). _Digital logic gates_. Spinning Numbers. Retrieved 2021-10-24, from https://spinningnumbers.org/a/logic-gates.html.
[^bib-wp-list-logic-sym]: Wikipedia (2005, Aug 20). _List of logic symbols_. Retrieved 2021-10-25, from https://en.wikipedia.org/wiki/List_of_logic_symbols.
[^bib-utah-digital-vlsi-lab-ass-3]: University of Utah: John and Marcia Price College of Engineering. _ECE/CS 5710/6710 – Digital VLSI Design: Lab Assignment #3_. Retrieved 2023-04-24, from https://my.eng.utah.edu/~kstevens/5710/lab3.pdf.
[^bib-wikipedia-cmos]: Wikipedia (2023, Feb 17). _CMOS_. Retrieved 2023-04-29, from https://en.wikipedia.org/wiki/CMOS.
[^bib-wikipedia-nmos]: Wikipedia (2023, March 12). _NMOS Logic_. Retrieved 2023-04-29, from https://en.wikipedia.org/wiki/NMOS_logic.

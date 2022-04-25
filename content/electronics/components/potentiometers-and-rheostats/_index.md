---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Electronic Components" ]
date: 2013-06-24
draft: false
lastmod: 2022-04-19
tags: [ "potentiometers", "rheostats", "resistors", "rotational", "linear", "taper", "linear", "log", "antilog", "Bourns", "independent linearity" ]
title: "Potentiometers And Rheostats"
type: "page"
---

## Overview

This page is about mechanically adjustable resistors called potentiometers and rheostats. For fixed resistors, see the [Resistors page](/electronics/components/resistors/). For digitally controlled potentiometers, see the [Digital Potentiometers (DPOTS) page](/electronics/components/digital-potentiometers-dpots).

_Potentiometers_ are 3 terminal resistors whose resistance can be varied by means of a mechanical wiper or similar actuating device. They consist of two outer terminals which provide connections to a fixed resistance made from a conductive track, and a middle pin which connects to the wiper. The potentiometer can be turned so that the wiper slides from one end of the track to the other, changing the resistance between it and the two outer pins. A rheostat (which is also called a _variable resistor_) is simply a potentiometer but with one of the outside pins missing. They typically come in values of 5, 10, 20, 50 and 100kΩ.


{{< img src="potentiometer-10k-edited.jpg" width="300px" caption="A photo of a panel-mount, through-hole potentiometer from BI Technologies/TT Electronics (part number P160KNP-0EC15B10K). The outer pins have a fixed resistance across them of `\(10k\Omega\)`. The middle pin is connected to the wiper, and it's resistance varies between the outer pins (linearly in this case, but other tapers exist such as logarithmic) as the knob is turned." >}}

Potentiometers are commonly used for user interfaces (e.g. volume control on an audio amplifier), once-off manufacturing calibration, and cheap mechanical rotation to digital converters.

## Designator Prefixes And Schematic Symbols

Designator prefixes for potentiometers and rheostats include:

* `VR` (**V**ariable **R**esistor, my preferred choice)
* `RV` (`VR` the other way around, KiCAD style)
* `POT`

The schematic symbol looks like a normal resistor, but with a third pin added to the side of the resistor with an arrow, indicating the wiper. An example (with the US style squiggly resistor) is shown below:

{{< img src="potentiometer-symbol.svg" width="200px" caption="The schematic symbol for a potentiometer, with the US-style 'squiggly' resistor." >}}

See the [Resistors section of the Component Schematic Symbols and Designators page](/electronics/circuit-design/component-schematic-symbols-and-designators#resistors-r-vr) for more information.

## Resistive Track

The resistive track is most cheap potentiometer is made from graphite. Others may be made from carbon or wound wire.

## Style

The _style_ of a potentiometer can be:

* Rotary (most common)
* Trimmer
* Slide

## Taper

The taper is the relationship between position and resistance. It is also sometimes called the "**law"**. The _taper_ of a potentiometer can either be:

* **Linear taper**: Most common form of taper. Value changes linearly with knob rotation.
* **Logarithmic taper** or **Audio taper**: Commonly used in audio applications for volume control to achieve a more natural change in volume (human ears perceive loudness logarithmically). However, "logarithmic taper" is a misnomer, they are actually exponential (opposite of logarithmic) to compensate for logarithmic hearing[^bib-eepower-potentiometer-taper]!
* **Reverse logarithmic taper**: Also called the _antilog taper_. Exact opposite response of a logarithmic taper pot. Used for applications such as audio volume controls which need to rotate counter-clockwise rather than clockwise[^bib-eepower-potentiometer-taper]. These pots actually have a logarithmic response.

The below plot gives you an idea on the shapes of these tapers. For the equation used to generate these tapers, see the below section [The Ideal Logarithmic Taper Equation](#the-ideal-logarithmic-taper-equation). 

{{< img src="plot-of-tapers.png" width="500px" caption="Plot of the approximation of three common potentiometer tapers, the linear, log and antilog taper." >}}

{{% warning %}}
Log and antilog tapers are usually never very precise (unless you pay big money), and in cases are just two piece-wise linear tapers of different gradients. The plot above just shows the **approximate shape**.
{{% /warning %}}

_Taper codes_ exist to inform the user of a potentiometers taper. Confusingly, there are many different taper code naming schemes in use, however the Asian version seems to be most common these days[^bib-eepower-potentiometer-taper].

| Taper               | Asian (common) | Europe | America | Vishay
|---------------------|----------------|--------|---------|-------
| Linear              | B              | A      | B       | A
| Logarithmic (Audio) | A              | C      | A       | L
| Antilog             |                | F      | C       | F

### Tapering Resistors

If you can't get log or antilog potentiometers, you can approximate the behaviour of them using a linear potentiometer and additional fixed resistors (which are called _tapering resistors_ in this context). The below schematic shows to to approximate log, antilog and log-antilog behaviour: 

{{% img src="resistor-taper-circuits.png" width="800px" caption="Schematic showing how to modify the response of a linear potentiometer (to make it approximate log, antilog and log-antilog behaviour) using tapering resistors." %}}

{{% note %}}
The tapering resistor trick only works if you are using the potentiometer as a voltage divider. If you are just connecting to one end terminal and the middle (i.e. rheostat style), you will need a proper log/anti-log potentiometer/rheostat.
{{% /note %}}

How do we choose the value of `\(R_{taper}\)`? A good rule-of-thumb is to pick a value which is about 10-20% of the potentiometers total resistance. For example, for a `\(10k\Omega\)` linear potentiometer, you would choose a tapering resistance of `\(1{-}2k\Omega\)`. The below graph shows the response of a pot with a tapering resistor connected up to provide a log response. The tapering resistor's resistance is 10% of the potentiometers (e.g. if it was a `\(10k\Omega\)` pot, the tapering resistor would be `\(1k\Omega\)`). This response is also compared to an "ideal" logarithmic response, with `\(y_m = 0.1\)` (see [The Ideal Logarithmic Taper Equation Section](#the-ideal-logarithmic-taper-equation) for more on what this means).

{{% img src="tapering_resistor_log.png" width="500px" caption="Plot showing the response of a tapering resistor (approx. log) vs. an ideal log pot (with y_m = 0.1). Whilst it doesn't match that closely, this level of precision is good enough for many applications!" %}}

Not bad for just a single additional resistor! And while yes, you can clearly see differences between the tapering resistor circuit and the ideal logarithmic response, in many applications this is close enough (also remembering that many proper log tapered pots will have similar amounts of difference to an ideal response).

## Tolerance And Linearity

Tolerance on potentiometers normally ranges from 2-15%. Note that this is much higher than standard 1% chip SMD fixed resistors, don't expect potentiometers to be as cheap and accurate!

Precision potentiometers typically focus achieving was is called good _independent linearity_. Independent linearity is the maximum deviation from a linear "best fit line" which is plotted against the points comparing the output resistance to the position of the potentiometer[^bib-bourns-pot-linearity-tech-note]. This best-fit line does not often go through 0.

{{% img src="bourns-potentiometer-independent-linearity-plot.png" width="700px" caption="A plot from the Bourns Potentiometer Linearity Tech Note showing how independent linearity is specified[^bib-bourns-pot-linearity-tech-note]." %}}

For example, the Bourns 3590S-2-103L 10-turn precision rotary potentiometer has a specified independent linearity of `\(\pm 0.25\%\)`[^bib-bourns-3590s-2-103l-ds].

## Labelling

Potentiometers are labelled according to their resistance value and resistance layout of the track (taper).

## Resistance

The resistance is of potentiometers is easy to read, a usually indicated by a three-digit number and a multiplier. For example, 100K would symbolise a 100kΩ pot.

## Travel (Rotation)

### Partial-turn

Partial-turn potentiometers are the most common and cheapest form of potentiometer. The _total mechanical travel_ (rotation) is usually between 250-330°. The _total electrical travel_ is usually less than this, which means there is some dead-zone and the start and end of the travel in where the resistance does not changed.

Partial-turn potentiometers are commonly used in human-operated situations (the potentiometer is rotated by hand). They provide enough resolution for things such as amplifier volume control.

### Multi-turn

A common number of turns for multi-turn potentiometers is 10. They are usually MUCH MORE expensive than their partial turn counterparts (as of June 2016, US$20 (100) for a "cheap" 3-turn wire-wound potentiometer).

Multi-turn potentiometers are used when more resolution is required, or the "thing" rotating the potentiometer is going to go through 1 or more revolutions (e.g. if the potentiometer was connected to an axle or pulley which rotated back and forth through 4 revolutions).

{{% img src="bourns-3590s-2-103l-10-turn-rotary-pot.png" width="250px" caption="Photo of the Bourns 3590S-2-103L 10-turn precision rotary potentiometer. As of April 2022, this costs approx. US$17 each in quantities of 10[^bib-mouser-bourns-3590s-2-103l]." %}}

## Common Uses And Example Circuits

The most common use for a potentiometer to provide a variable output voltage based on how the far the potentiometer has been turned. This voltage then can be used to control any number of things, such as the volume of music as the user turns the volume dial. The two ends of the potentiometer are connected across a constant voltage source, in the example below, this is `\( 5V \)`. The wiper then forms the variable mid-point of a voltage divider. As you turn the potentiometer, one of the "resistors" increases while the other decreases, and thus the wiper varies in voltage from one end point to the other. In the example below the wiper voltage varies from `\( 0V \)` to `\( 5V \)`:

{{% img src="potentiometer-common-resistor-divider-circuit.png" width="600px" caption="A very common way to use a potentiometer in a circuit to provide a variable output voltage." %}}

A word of caution...Make sure you do not draw too much current from the wiper. Ignoring the wiper resistance, the output impedance of the potentiometer changes depending on the wiper position. When the wiper is at either end, the output impedance is `\( 0 \Omega \)` (great you may say). But the output impedance increases to the worst case when the wiper is exactly half-way between the two ends, in which case it is `\( \frac{R_{pot}}{4} \, \Omega \)` (two resistors in parallel, each resistor being `\( \frac{R_{pot}}{2} \, \Omega \)`).

If we assume the worst-case, **the output impedance of a potentiometer is**:

<p>
\begin{align}
\b{Z_O} = \frac{R_{pot}}{4}
\end{align}
</p>

<p class="centered">
where:<br/>
\(\b{Z_O}\) is the output impedance, in \( \Omega \)<br/>
\( R_{pot} \) is the end-to-end resistance of the potentiometer, in \( \Omega \)<br/>
</p>

## The Ideal Logarithmic Taper Equation

We can write the general equation to map a linear scale to a logarithmic scale as:

<p>
\begin{align}
y = ab^x + c
\end{align}
</p>

Let `\(x\)` be the percentage of total potentiometer rotation in where `\(0 \le x \le 1\)`, and `\(y\)` be the percentage of total resistance, again varying from `\(0 \le y \le 1\)`. `\(a\)`, `\(b\)` and `\(c\)` are free parameters to fit the desired curve (they are constrained below).

For an ideal potentiometer, we want the resistance to be `\(0\)` when the rotation is `\(0\)`, e.g. `\(y = 0\)` when `\(x = 0\)`. Therefore:

<p>
\begin{align}
0 = a + c \nonumber \\
c = -a \\
\end{align}
</p>

This allows us to remove `\(c\)` from the equation, giving:

<p>
\begin{align}
y = ab^x - a
\end{align}
</p>

Also, we want to have maximum resistance when the potentiometer is rotated to maximum. So `\(y = 1\)` when `\(x = 1\)`.

<p>
\begin{align}
1 = ab - a
\end{align}
</p>

Let's solve for `\(a\)` in terms of `\(b\)`:

<p>
\begin{align}
1 &= ab - a \nonumber \\
  &= a(b - 1) \nonumber \\
a = \frac{1}{b - 1} \\
\end{align}
</p>

Substituting `\(a\)` into our equation now gives:

<p>
\begin{align}
y &= \frac{1}{b - 1}b^x - \frac{1}{b - 1} \nonumber \\
  &= \frac{1}{b - 1}(b^x - 1) \nonumber \\
  &= \frac{b^x - 1}{b - 1} \\
\end{align}
</p>

We are almost there, except we still have one degree of freedom! How do we choose the value of `\(b\)`? One way is to define the value of `\(y\)` when the potentiometer is rotated half-way to max, i.e. at `\(x = 0.5\)`. We'll call this resistance `\(y_m\)` (y at midpoint).

<p>
\begin{align}
y_m &= \frac{b^{0.5} - 1}{b - 1} \nonumber \\
    &= \frac{\sqrt{b} - 1}{b - 1} \nonumber \\
    &= \frac{\sqrt{b} - 1}{ (\sqrt{b} + 1)(\sqrt{b} - 1) } \nonumber \\
    &= \frac{1}{\sqrt{b} + 1} \\
\end{align}
</p>

Let's solve for `\(b\)`:

<p>
\begin{align}
y_m &= \frac{1}{\sqrt{b} + 1} \nonumber \\
y_m(\sqrt{b} + 1) &= 1 \nonumber \\
\sqrt{b} + 1 &= \frac{1}{y_m} \nonumber \\
\sqrt{b} &= \frac{1}{y_m} - 1 \nonumber \\
b &= \left( \frac{1}{y_m} - 1 \right)^2 \\
\end{align}
</p>

The below graph shows the shape of the potentiometers response for different values of `\(y_m\)`, starting at `\(0.1\)` and ending with `\(0.9\)`.

{{% note %}}
At `\(y_m = 0.5\)` the resistance factor goes to `\(\infty\)`, so `\(y_m = 0.5\)` is not plotted.
{{% /note %}}

{{% img src="plot-of-parametric-log-law.png" width="600px" caption="Plot of the ideal potentiometer log taper equation for various values of `\(y_m\)`." %}}

In reality, potentiometers with a "log taper" can be roughly approximated with `\(y_m = 0.1\)`, whilst those with an "antilog taper" with `\(y_m = 0.9\)`.

## Further Reading

_The Potentiometer Handbook_ by Bourns is a great resource for anything potentiometer related (a hefty 227 pages). Available for free (as of 2022) from https://www.bourns.com/pdfs/onlinepotentiometerhandbook.pdf.

{{% img src="bourns-the-potentiometer-handbook-front-cover.png" width="500px" caption="Screenshot of the 'front cover' from the online edition of 'The Potentiometer Handbook' by Bourns[^bib-bourns-the-potentiometer-handbook]." %}}

## References

[^bib-bourns-the-potentiometer-handbook]: Bourns (2008). _The Potentiometer Handbook_. Retrieved 2022-04-19, from https://www.bourns.com/pdfs/onlinepotentiometerhandbook.pdf.
[^bib-eepower-potentiometer-taper]: EE Power. _Chapter 3 - Resistor Types: Potentiometer Taper_. Retrieved 2021-12-13, from https://eepower.com/resistor-guide/resistor-types/potentiometer-taper/#.
[^bib-mouser-bourns-3590s-2-103l]: Mouser. _Bourns 3590S-2-103L (product page)_. Retrieved 2022-04-20, from https://www.mouser.com/ProductDetail/Bourns/3590S-2-103L?qs=ka0oSW1bB1LlqwdMBlB3qQ%3D%3D.
[^bib-bourns-pot-linearity-tech-note]: Bourns. _Potentiometers Linearity Technical Note_. Retrieved 2022-04-20, from https://www.bourns.com/docs/technical-documents/technical-library/sensors-controls/technical-notes/Bourns_pot_linearity_technote.pdf.
[^bib-bourns-3590s-2-103l-ds]: Bourns. _Bourns 3590 - Precision Potentiometer (datasheet)_. Retrieved 2022-04-20, from https://www.mouser.com/datasheet/2/54/3590-1989906.pdf.

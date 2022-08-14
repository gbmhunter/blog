---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Electronic Components" ]
date: 2012-05-14
description: "Schematic symbols, series and parallel behaviour, manufacturing processes, the E series, tolerances, variable resistors, volume resistance and more info about the electrical components called resistors."
draft: false
lastmod: 2022-04-21
tags: [ "resistors", "resistors", "components", "electronics", "schematic symbols", "tolerances", "E series", "packages", "thick film", "thin film", "wirewound", "potentiometers", "rheostats", "variable resistors", "Ayrton-Perry winding" ]
title: "Resistors"
type: "page"
---

## Overview

This page is about fixed resistance components called resistors. For info on mechanically variable resistors, see the [Potentiometers and Rheostats page](/electronics/components/potentiometers-and-rheostats/). For info on digital controlled resistors, see the [Digital Potentiometers (DPOTs) page](/electronics/components/digital-potentiometers-dpots/).

Resistors are a passive electronic component that restricts the flow of current when a given voltage is applied. They dissipate energy as heat. Given their simplicity and usefulness in circuits, they are the normally most commonly used electronic component in any circuit design.

For information on positive temperature coefficient resistors used as "fuses" in circuit protection applications, see the [PTC Type Thermistor page](/electronics/components/circuit-protection/ptc-type-thermistor). For info on digital potentiometers, see the [Digital Potentiometers (DPOTs) page](/electronics/components/digital-potentiometers-dpots/).

**The mechanical equivalent of a resistor is friction.** The larger the resistance, the larger the friction. This is when using the [force-voltage](http://lpsa.swarthmore.edu/Analogs/ElectricalMechanicalAnalogs.html) equivalence.

{{% figure src="ti-it-looks-like-weve-encountered-some-resistance.png" width="600" caption="One should always appreciate a good pun. Texas Instruments 404 page as of October 2020." %}}

Resistors are used for a huge number of purposes, including:

* **Potential dividers**: To produce an output voltage that is a fixed percentage of the input voltage.
* **Voltage/current biasing**: e.g. transistor amplifiers
* **Current limiting**: Power an LED from a fixed voltage rail.
* **Op-amp gain/feedback configuration**: Resistors (along with the occasional capacitor) are used to set the gain/feedback of op-amps. 
* **Impedance matching**
* **Current measuring**: Resistors convert a current into a voltage, which is easily measurable by op-amps/ADCs/e.t.c.
* **GPIO/communication bus pull-up/pull-downs**: To drive nets into passive states, for example to keep the gate tied to source so it's always OFF unless driven on. Also to drive communication bus lines into passive states, especially buses that use arbitration (e.g. I2C, CAN bus).

## Schematic Symbols

The most commonly-used resistor schematic symbols are shown below. I prefer the American-style resistor over the European purely because there are already many "box-like" schematic symbols used for other components (e.g. fuses, ICs), and so the squiggle makes a resistor more distinguishable (given my distaste for the American imperial system, I never thought I would ever say that!). The American style is used through-out the rest of this website.

{{% figure src="schematic-symbols-amer-euro-resistors.png" width="500" caption="The \"American\" and \"European\" schematic symbols for a resistor. I prefer the American-style because it's easiest to distinguish from other box-like symbols." %}}

See the [Potentiometers And Rheostats (Variable Resistors) section](#potentiometers-and-rheostats-variable-resistors) for more schematic symbols.

## Resistors In Series And In Parallel

The behaviour of resistors when connected together in series and in parallel is exactly the same behaviour inductors exhibit, and exactly the opposite behaviour of what capacitors exhibit.

### Resistors In Parallel

When two resistors are connected in parallel, the equivalent total resistance follows the inverse law:

<p>\begin{align}
R_{total} = \frac{1}{\frac{1}{R1} + \frac{1}{R2}}
\end{align}</p>

It is usually easier to remember this equation as:

<p>\begin{align}
\frac{1}{R_{total}} = \frac{1}{R1} + \frac{1}{R2}
\end{align}</p>

The following diagram shows this:

{{% figure src="resistors-in-parallel-equivalence-with-equation.png" width="723" caption="Two resistors in parallel can be treated as one resistor using the shown equation." %}}

### Resistors In Series

When two resistors are connected in series, the total equivalent resistance is equal to the sum of individual resistances.

<p>\begin{align}
R_{total} = R1 + R2
\end{align}</p>

This is shown in the diagram below:

{{% figure src="two-resistors-in-series-equivalent-single-resistance.png" width="669" caption="Two resistors in series is the equivalent of one resistor with the resistance shown by the equation in this image." %}}

## Resistor Dividers

Resistor dividers are two or more resistors in a series configuration such that at some junction in the string, the voltage is a fixed proportion of the total voltage applied to the end's of the string. In this way, they **"divide"** the input voltage into a smaller output voltage.

The simplest voltage divider consists of just two resistors in series.

{{% figure src="resistor-divider-schematic.png" width="350" caption="A basic schematic of a simple resistor divider. You will see these used everywhere in circuits!" %}}

The equation for `\(V_{OUT}\)` is:

<p>\begin{align}
\label{eq:vout-eq-r2-r1-vin}
V_{OUT} &= \frac{R2}{R1\ +\ R2} V_{IN} \\
\end{align}</p>

The input voltage "divides" itself across the resistors proportionally based on relative resistances. The more resistance of any one resistor, the greater amount of voltage that will drop across it. You can easily reach the above equation by applying Ohm's law to the circuit.

{{% tip %}}
The above equation on holds true when the input voltage source is of sufficiently low low impedance (e.g. output from linear regulator, SMPS) and the output is connected to something of relatively high impedance (input to ADC, input to op-amp, e.t.c).
{{% /tip %}}

During circuit design, you will encounter times when you have three knowns from `\(Eq.\ \ref{eq:vout-eq-r2-r1-vin}\)` but have to solve for any one of the others. Thus it has be re-arranged for every variable below for convenience (with `\(V_{IN}\)` and `\(R1\)` being able to be simplified slightly):

<p>\begin{align}
V_{IN} &= \frac{R1 + R2}{R2} V_{OUT} \\
       &= \left( \frac{R1}{R2} + 1 \right) V_{OUT} \\
R1 &= \frac{V_{IN} - V_{OUT}}{V_{OUT}} R2 \\
   &= \left( \frac{V_{IN}}{V_{OUT}} - 1 \right) R2 \\
R2 &= \frac{V_{OUT}}{V_{IN} - V_{OUT}} R1 \\
\end{align}</p>

### Output Impedance

The output impedance of a resistor divider is equivalent the `\(R1\)` in parallel with `\(R2\)`:

<p>\begin{align}
\b{Z_O} &= R1 || R2 \nonumber \\
    &= \frac{R1 \cdot R2}{R1 + R2} \\
\end{align}</p>

This output impedance is relevant for both small signals and large signals. See the [Analysis Of A Resistor Divider section on the Small-Signal Analysis page](/electronics/circuit-design/small-signal-analysis#analysis-of-a-resistor-divider) for more information.

Note that the output impedance of a resistor divider is normally quite high, compared to other "standard" voltage sources. For this reason, **you cannot normally use a resistor divider to drop the voltage and provide power to a device**. This is a common mistake that people learning electronics do, when in reality you should either be using a linear regulator, a SMPS, or a transformer. Voltage dividers should normally only be used to provide a voltage to a high-impedance input (e.g. op-amp input, comparator input, microcontroller ADC input, or voltage-level translation for comms signals).

The exception to the above rule is when the two following conditions are met:

* The device will draw a small enough current that the voltage sag due to the extra current through R1 is acceptable (and the current is not too variable).
* The extra current going through R1 will not cause it to overheat.

### Applications

Resistors dividers are used everywhere in circuit design! They are commonly used for:

* Scaling down a higher voltage (e.g. a 0-12V voltage rail) down to something that can be measured by an [ADC](/electronics/components/analogue-to-digital-converters-adcs/) (e.g. 0-2.5V).
* Biasing [transistors](/electronics/components/transistors/).
* Providing the correct voltages to the inputs of [op-amps](/electronics/components/op-amps/).

An interesting example I have seen of a resistor divider powering a circuit was a low-power microcontroller being powered directly from a resistor-divider, diode and capacitor from mains supply (240VAC). The microcontroller only drew `\(uA\)` so met the two above conditions.

### Online Calculators

The [NinjaCalc](http://gbmhunter.github.io/NinjaCalc/) has a calculator that can work out voltages, resistances and currents of a resistor divider.

{{% figure src="screenshot-of-ninjacalc-resistor-divider-calculator.png" width="604" caption="A screenshot of the NinjaCalc's 'Resistor Divider' calculator, being used to find the top resistance." %}}

## Tolerances

The tolerance of a resistor defines how accurately the resistor the actual resistors value is to the specified value, usually in terms of a percentage. 5% and 1% resistors are the most common. Typically the cost of a resistor goes up as the tolerance reduces, as it requires increased manufacturing precision.

5% resistors are normally fine for the most resistor jobs such as:

* Current-limiting
* ESD protection
* Pull-ups/pull-downs
* Termination resistors

1% or lower precision is usually required for:

* Resistor dividers for ADC inputs
* Op-amp gain resistors
* Current measuring resistors (0.1% precision may be needed here, and they start costing a bit!)

With the advent of SMD resistors, the difference in price between 1% and 5% resistors is so insignificant that for **most purposes you can get away with using 1% tolerance resistors** for everything in your circuit design.

## Can I Put Resistors In Series Or Parallel For Better Tolerances?

**The short answer. No.** 2x `\(1k\Omega\)` 1% resistors in series is the equivalent to 1x `\(2k\Omega\)` 1% resistor.

**The long answer.** You will never get a worse tolerance by putting two resistors in series or parallel. BUT, you may get a better distribution of values, depending on the distribution of the original resistors. If you assume (and this is a bad assumption) that the resistor values followed a Gaussian distribution, then the resulting distribution is a better Gaussian distribution (skinnier/smaller deviation). If the original resistors had a flat distribution, the resulting distribution is a triangle shape.

However, the distribution of resistor values could be any number of shapes. For example, the manufacturer might make heaps of 5% `\(1k\Omega\)` resistors, which are then measured. If the resistance falls within 1% of `\(1k\Omega\)`, then they are made into 1% resistors. This would leave the 5% resistor bin with a double peak, with a valley right in the middle of the distribution.

Also, correlation between resistors from the same manufacturing batch run may mean that you do not get any standard deviation improvements.

## Manually Tweaking Resistance

For non-repetitive, high precision values, you can actually tweak a resistors value by grinding some of the resistor away with a metal file. This only works for the metal film style resistors. See [this video](https://www.youtube.com/watch?v=OQDjjIvLaj4) as an example.

## The E Series

Practically all resistors follow an _E series_, a **scale of predefined resistances** that have standardised by IEC 60063. This type of sequence is called [preferred numbers](https://en.wikipedia.org/wiki/Preferred_number). Common E series are the E12, E24, E48, E96 and E192 series. The series divides the numbers between 1 and 10 into 12, 24, 48, e.t.c steps. The steps are chosen so that maximum relative error between any resistance you want and the closest resistance in the series is fixed (i.e. constant).

Simply, this means that each series guarantees you will be able to find a resistor that equals the resistance you need within a **fixed maximum percentage error***.

TIP: Confusingly, for each series, you can get ever so slightly higher errors than what is listed below. This is due to the final rounding process (e.g. E96 resistors are rounded to three significant figures).


| Series | Maximum Percentage Error
|--------|--------------------------
| E6     | 20%
| E12    | 10%
| E24    | 5%
| E48    | 2%
| E96    | 1%
| E192   | 0.5%

The E192 series is also used for 0.25% and 0.1% error resistors.

Below are all the actual values for the common E series. They are written as initialised arrays in the [C programming language](/programming/languages/c), so that you can copy them and use them in code easily (some modifications may be required for other programming languages).

```
E6[6] = {10, 15, 22, 33, 47, 68};

E12[12] = {10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82};
```

Note how there are two digits of precision for E6, E12, and E24 values, while 3 digits of precision for E48, E96 and E192 values. These two sets of three series share special properties with one another. E6 is every second value from the E12 series, and E12 is every second value from the E24 series. Similarly, E48 is every second value from the E96 series, and E96 is every second value from the E192 series.

The values come from the exponential number series, using the equation:

<p>\begin{align}
v(i, n) = 10^{i/n}
\end{align}</p>

<p class="centered">
where:</br>
\(i\) = the i'th element in the series</br>
\(n\) = the total number of elements in the series</br>
</p>

See [Wikipedia - Preferred Number](https://en.wikipedia.org/wiki/Preferred_number), for information on these series.

[The NinjaCalc Standard Resistance Finder calculator](https://ninja-calc.mbedded.ninja/calculators/electronics/basics/standard-resistance-finder), can easily find the closest E-series resistance to your desired resistance.

{{% figure src="screenshot-ninjacalc-standard-resistance-finder-preferred-value-e6-e192-324.png" width="550" caption="NinjaCalc's 'Standard Resistance Finder' calculator showing the closest E-series values to a desired resistance of 10.3kΩ (with closest highest and closest lowest resistance)." %}}

## Resistor Manufacturing Processes

### Wire Wound

Wire-wound resistors are the oldest type of resistor, and are formed by coiling up a piece of wire to get a desired resistance. They are only typically used in modern times in high power applications and for things like fuses, with ratings up into the 100's of Watts.

{{% figure src="wire-wound-resistor-diagram-bourns.png" width="300" caption="Cut-away diagram of a typical wire-wound resistor. Image by Bourns, retrieved on 2021-08-14 from https://www.bourns.com/products/resistors/wirewound-resistors." %}}

Given they are normally a coil of wire, they can have a significant parasitic inductance and be give off/be susceptible to magnetic fields.

{{% figure src="tt-electronics-w22-2kji-2kr-wirewound-resistor.png" width="500" caption="Close-up photo of the TT Electronics W22-2KJI 2kΩ 7W wirewound resistor[^bib-tt-electronics-w20-series-ds]." %}}

### Metal Film

Metal film resistors are the most popular resistor in today's market. They have replaced [^_carbon_film, carbon film resistors] in most applications due to their cheaper cost, lower noise and smaller size. Metal film resistors can be split into two sub-categories, thick metal film and thin metal film.

#### Thick Metal Film

Thick film is the most common type of metal film resistor. Most 1% and 5% SMD chip package resistors (0402, 0603, e.t.c) use thick film technology.

#### Thin Metal Film

Most 0.1% SMD chip package resistors (0402, 0603, e.t.c) use thin film technology. Thin film resistors can be split into two sub-categories, commercial thin-film and precision thin-film.

### Metal Foil

Even rarer than thick and thin film resistors, metal foil resistor technology allows the most precise resistors to be made.

### Carbon Film

Carbon film resistors are formed by forming a conductive carbon film on a ceramic substrate. Carbon film resistors have been replaced in most applications by metal film resistors.

## Power Resistors

Power resistors is a term used with resistors which are usually rated to dissipate 1W or more of power (without heatsinking).

{{% figure src="bunch-of-ceramic-power-resistors.jpg" width="600" caption="A bunch of ceramic power resistors rated from 5 to 25W of power dissipation." %}}

They can be used to intentionally heat things, as the picture below shows. This image below is a common 5W resistor being used to heat a small container of oil, with a copper thermostat from a hot water cylinder being used to control the temperature.

{{% figure src="using-a-power-resistor-to-heat-oil.jpg" width="800" caption="Power resistors can be used for heating. This photo shows a 5W resistor being used to heat a small container of oil, with a thermostat from a hot water cylinder to control the temperature." %}}

## Current-Sense Resistors

Current-sense resistors are a label given to low-valued, high precision (1% or better), and high power resistors that are good for using in current-sense circuits. Sometimes there is nothing special about these resistors (it's purely a marketing term), othertimes they may have two additional terminals for _Kelvin sensing_. A four terminal resistor is also called an _ammeter shunt_. Two of the terminals are used to pass the high current, the other two are used to measure to voltage drop across the resistor. This gets rid of measurement errors due to voltage drop in the wires going to the resistor (when the sense line and high-current path are the same thing).

{{% figure src="current-sensing-resistor-large-four-lead.jpg" width="500" caption="A large four-lead current sensing resistor." %}}

More information and schematics on how to make current-sense circuits can be found on the [Current-Sensing page](/electronics/circuit-design/current-sensing).

## Jumpers

Most resistor series also include a 0Ω **jumper** resistor. Jumper resistors are great for jumping tracks when doing PCB design, as well as providing a convenient and cheap way of connecting/disconnecting certain tracks in different PCB variants.

Note that sometimes these jumper resistors can handle much less current than you expect! For example, most 0603/0805 sized SMD jumper resistors are only rated to 1-2A, even though at this current the I*R power dissipation is well below the continuous maximum (0.1-0.5W). However, some can handle some decent current, for example, the [Susumu YJP1608-R001 0603 jumper resistor](http://www.digikey.com/product-detail/en/YJP1608-R001/408-1515-1-ND/2815069), which can handle 10A continuous.

Jumper resistors are not specified with a percentage tolerance as most other resistors, as this makes no sense (what is 5% of 0Ω?). Instead, they are printed as 0Ω, and a maximum resistance is given in the datasheet, which is usually in the order of 1-50mΩ.

## Volume Resistance (Bulk Resistance)

Volume resistance (also known as just resistivity, electrical resistivity, or bulk resistance) has the SI units `\(\Omega m\)`. It is a measure of how well a particular material conducts electricity, and is an intrinsic property of that material (it does not depend on how much of the material or what shape it is in). If the resistance between two conducting plates on opposite faces of a `\(1 \times 1 \times 1m\)` cube of material is measured to be `\(1\Omega\)`, then the material has a volume resistivity of `\(1\Omega m\)`. 

## Parasitic Elements

For most day-to-day applications, resistors can just be treated as if they have a resistance. However, in high frequency circuits, there are other parasitic elements to a resistor that you must consider. Typically, the main parasitics are modelled as a extra inductor and capacitor, although the is no standard way of wiring them (depends on what literature you are reading). One popular configuration is shown below:

{{% figure src="parasitic-model-of-resistor-series-rl-parallel-c.svg" width="600" caption="Parasitic model of a resistor modelling the resistance in parallel with an inductor which is then in series with a capacitor." %}}

Below shows another model which is popular as it models the resistance in parallel with the end cap capacitance and this in series with the lead inductance[^bib-edn-resistors-arent-resistors].

{{% figure src="parasitic-model-of-resistor-parallel-rc-series-l.svg" width="600" caption="Parasitic model of a resistor modelling the resistance in parallel with the end cap capacitance and that in series with the lead inductance." %}}

The below table shows resistor types and the ranges of their parasitic inductance[^bib-eepower-res-ind]:

| Resistor Type | Capacitance   | Inductance
|---------------|---------------|---------------
| Wirewound     |               | 0.03-56uH
| Metal oxide   |               | 3-200nH
| Metal foil    | 0.05pF        | <80nH
| Metal film    |               | <2nH

Helical wirewound resistors have an especially large parasitic inductance because they are wound in a coil. They are also especially susceptible to magnetic pickup (inducing electrical noise into the circuit due to nearby magnetic fields). There are also special _non-inductive_ wirewound resistors in where the wire is wound back and forth rather than in a coil to drastically reduce the inductance (they use the _Ayrton–Perry winding_ technique).

## Resistor Noise

Resistors add _thermal (Johnson-Nyquist) noise_ into circuits. See the [Electrical Noise page](/electronics/circuit-design/electrical-noise/) for more info.

## Packages

Resistor come in many packages, from large, wire-wound power resistors that come in coils and blocks, to smaller through-hole resistors, to even smaller still SMD resistors. You can find more about resistor packages on the [Component Package Database](/pcb-design/component-packages/) page.

Through-hole resistors use the older color code scheme (the current international standard as of 2013 is IEC 60062). Newer surface-mount resistors usually have the value printed directly on them (a three-digit number is most common, with the third digit being the multiplier).

{{% figure src="500-0603-smd-resistors-on-tape.jpg" width="530" caption="SMD resistors usually come on a tape like the one shown (which could be on a reel) which contains 500 0603 SMD resistors." %}}

Once taken out of the tape, they don't look like much!

{{% figure src="500-0603-smd-resistors-next-to-a-pin.jpg" width="517" caption="500 0603 SMD resistors in a pile next to pin. This is too illustrate just how small they are! (and then can get smaller)." %}}

This was me trying to be arty-farty with the left-overs from putting about 30,000 reeled 0603 resistors into containers for prototyping with.

{{% figure src="reel-0603-resistor-leftovers-best.jpg" width="900" caption="This was me trying to be creative with the left-overs from putting about 30,000 reeled 0603 resistors into containers for prototyping with." %}}

## References

[^bib-eepower-res-ind]:  EE Power. _Resistor Inductance_. Retrieved 2021-08-13, from https://eepower.com/resistor-guide/resistor-fundamentals/resistor-inductance/#.
[^bib-edn-resistors-arent-resistors]:  Wyatt, Kenneth (2013-10-29). _Resistors aren’t resistors_. EDN. Retrieved 2021-08-15, from https://www.edn.com/resistors-arent-resistors/.
[^bib-tt-electronics-w20-series-ds]:  TT Electronics (2020, Jun). _Vitreous Enamelled Wirewound Resistors: W20 Series (datasheet)_. Retrieved 2022-04-21, from https://www.mouser.com/datasheet/2/414/TTRB_S_A0010754439_1-2565592.pdf.
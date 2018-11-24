---
author: gbmhunter
date: 2012-05-14 00:08:16+00:00
draft: false
title: Resistors
type: page
url: /electronics/components/resistors
---

[mathjax]

# Overview

Resistors are a passive electronic component that restricts the flow of current when a given voltage is applied. They dissipate energy as heat. Given their simplicity and usefulness in circuits, they are the most commonly used electronic component.

For information on positive temperature coefficient resistors used as "fuses" in circuit protection applications, see the [PTC Type Thermistor page](http://blog.mbedded.ninja/electronics/components/circuit-protection/ptc-type-thermistor).

**The mechanical equivalent of a resistor is friction.** The larger the resistance, the larger the friction. This is when using the [force-voltage](http://lpsa.swarthmore.edu/Analogs/ElectricalMechanicalAnalogs.html) equivalence.

# Schematic Symbols

The most commonly-used resistor schematic symbols are shown below. I prefer the American-style resistor over the European (given my distaste for the American imperial system, I never thought I would ever say that!), and use the American style through-out the rest of this website.

<table style="width: 600px; text-align: center; margin: 0 auto;" ><tbody ><tr >
<td >

{{< figure src="/images/2012/05/resistor-schematic-symbol-american.png" width="168" caption="The American-styled schematic symbol for a resistor." caption-position="bottom" >}}

</td>
<td >{{< figure src="/images/2012/05/resistor-schematic-symbol-european.png" width="142" caption="The European schematic symbol for a resistor." caption-position="bottom" >}}
</td>
<td >

{{< figure src="/images/2012/05/resistor-schematic-symbol-variable-2-terminal.png" width="212" caption="The schematic symbol for a 2-terminal variable resistor." caption-position="bottom" >}}

</td>
<td >

{{< figure src="/images/2012/05/potentiometer-schematic-symbol.png" width="207" caption="The schematic symbol for a potentiometer." caption-position="bottom" >}}

</td></tr><tr >
<td >American-styled resistor.
</td>
<td >European-style resistor.
</td>
<td >Variable resistor (2-terminal component).
</td>
<td >Potentiometer (3-terminal component).
</td></tr></tbody></table>

# Resistors In Series And In Parallel

The behaviour of resistors when connected together in series and in parallel is exactly the same behaviour inductors exhibit, and exactly the opposite behaviour of what capacitors exhibit.

## Resistors In Parallel.

When two resistors are connected in parallel, the equivalent total resistance follows the inverse law:

$$ R_{total} = \frac{1}{\frac{1}{R1} + \frac{1}{R2}} $$

It is usually easier to remember this equation as:

$$ \frac{1}{R_{total}} = \frac{1}{R1} + \frac{1}{R2} $$

The following diagram shows this:

{{< figure src="/images/2012/05/resistors-in-parallel-equivalence-with-equation.png" width="723" caption="Two resistors in parallel can be treated as one resistor using the shown equation." caption-position="bottom" >}}

## Resistors In Series.

When two resistors are connected in series, the total equivalent resistance is equal to the sum of individual resistances.

$$ R_{total} = R1 + R2 $$

This is shown in the diagram below:

{{< figure src="/images/2012/05/two-resistors-in-series-equivalent-single-resistance.png" width="669" caption="Two resistors in series is the equivalent of one resistor with the resistance shown by the equation in this image." caption-position="bottom" >}}

# Resistor Dividers

``````````````[debugembedit snippet="resistive-voltage-divider-calculator"]``````````````

Resistor dividers are two or more resistors in a series configuration such that at some junction in the string, the voltage is a fixed proportion of the total voltage applied to the end's of the string. In this way, they **"divide"** the input voltage into a smaller output voltage.

The simplest voltage divider consists of just two resistors in series.

 

{{< figure src="/images/2012/05/basic-resistor-divider-schematic-with-equation.png" width="556" caption="A basic schematic of a resistor divider, showing the equation which determines the output voltage." caption-position="bottom" >}}

Note that the DC output impedance of a resistor divider is normally quite high (it is equal to R1), and for this reason, **you cannot normally use a resistor divider to drop the voltage and provide power for a device**. This is a common mistake that people learning electronics do, when in reality you should either be using a linear regulator, a SMPS, or a transformer. Voltage dividers should normally only be used to provide a voltage to a high-impedance input (e.g. op-amp input, comparator input, microcontroller ADC input, or voltage-level translation for comms signals).

The exception to the above rule is when the two following conditions are met:  * The device will draw so little current that the voltage sag due to the extra current through R1 is acceptable.  * The extra current going through R1 will not cause it to overheat.

An interesting example I have seen of a resistor divider powering a circuit was a low-power microcontroller being powered directly from a resistor-divider, diode and capacitor from mains supply (240VAC). The microcontroller only drew \(uA\) so met the two above conditions.

The [NinjaCalc program](http://mbedded-ninja.github.io/NinjaCalc/) has a calculator that can work out voltages, resistances and currents of a resistor divider.

{{< figure src="/images/2012/05/screenshot-of-ninjacalc-resistor-divider-calculator.png" width="604" caption="A screenshot of the NinjaCalc's "Resistor Divider" calculator, being used to find the top resistance." caption-position="bottom" >}}

# Variable Resistors

The output of a potentiometer varies depending on the wiper position. If varies from 0R when the wiper is at both ends of the pot to a maximum of Rpot/4 when the wiper is in the middle.

You call also get variable resistors which can be changed digitially (called DPOT's). They have their own page which can be found [here](http://blog.mbedded.ninja/electronics/components/dpots).

# Tolerances

The tolerance of a resistor defines how accurately the resistor the actual resistors value is to the specified value, usually in terms of a percentage. 5% and 1% resistors are the most common. Typically the cost of a resistor goes up as the tolerance reduces, as it requires increased manufacturing precision.

5% resistors are normally fine for the most resistor jobs such as:  * Current-limiting  * ESD protection  * Pull-ups/pull-downs  * Termination resistors

1% or lower precision is usually required for:  * Resistor dividers for ADC inputs  * Op-amp gain resistors  * Current measuring resistors (0.1% precision may be needed here, and they start costing a bit!)

With the advent of SMD resistors, the difference in price between 1% and 5% resistors is so insignificant that for **most purposes you can get away with using 1% tolerance resistors** for everything in your circuit design.

## Can I Put Resistors In Series Or Parallel For Better Tolerances?

**The short answer. No.** 2x \(1k\Omega\) 1% resistors in series is the equivalent to 1x \(2k\Omega\) 1% resistor.

**The long answer.** You will never get a worse tolerance by putting two resistors in series or parallel. BUT, you may get a better distribution of values, depending on the distribution of the original resistors. If you assume (and this is a bad assumption) that the resistor values followed a Gaussian distribution, then the resulting distribution is a better Gaussian distribution (skinnier/smaller deviation). If the original resistors had a flat distribution, the resulting distribution is a triangle shape.

However, the distribution of resistor values could be any number of shapes. For example, the manufacturer might make heaps of 5% \(1k\Omega\) resistors, which are then measured. If the resistance falls within 1% of \(1k\Omega\), then they are made into 1% resistors. This would leave the 5% resistor bin with a double peak, with a valley right in the middle of the distribution.

## Manually Tweaking Resistance

For non-repetitive, high precision values, you can actually tweak a resistors value by grinding some of the resistor away with a metal file. This only works for the metal film style resistors. See [this video](https://www.youtube.com/watch?v=OQDjjIvLaj4) as an example.

``````````````

# The E Series

Practically all resistors follow an _E series_, a **scale of predefined resistances** that have standardised by IEC 60063. This type of sequence is called [preferred numbers](https://en.wikipedia.org/wiki/Preferred_number). Common E series are the E12, E24, E48, E96 and E192 series. The series divides the numbers between 1 and 10 into 12, 24, 48, e.t.c steps. The steps are chosen so that maximum relative error between any resistance you want and the closest resistance in the series is fixed (i.e. constant).

Simply, this means that each series guarantees you will be able to find a resistor that equals the resistance you need within a **fixed maximum percentage error***.

*NOTE: Confusingly, for each series, you can get ever so slightly higher errors than what is listed below. This is due to the final rounding process (e.g. E96 resistors are rounded to three significant figures).

<table style="width: 400px;" ><tbody ><tr >SeriesMaximum Percentage Error</tr><tr >
<td >E6
</td>
<td >20%
</td></tr><tr >
<td >E12
</td>
<td >10%
</td></tr><tr >
<td >E24
</td>
<td >5%
</td></tr><tr >
<td >E48
</td>
<td >2%
</td></tr><tr >
<td >E96
</td>
<td >1%
</td></tr><tr >
<td >E192
</td>
<td >0.5%
</td></tr></tbody></table>

The E192 series is also used for 0.25% and 0.1% error resistors.

Below are all the actual values for the common E series. They are written as initialised arrays in the [C programming language](http://blog.mbedded.ninja/programming/languages/c), so that you can copy them and use them in code easily (some modifications may be required for other programming languages).
    
    E6[6] = {10, 15, 22, 33, 47, 68};
    
    E12[12] = {10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82};
    

Note how there are two digits of precision for E6, E12, and E24 values, while 3 digits of precision for E48, E96 and E192 values. These two sets of three series share special properties with one another. E6 is every second value from the E12 series, and E12 is every second value from the E24 series. Simarly, E48 is every second value from the E96 series, and E96 is every second value from the E192 series.

The values come from the exponential number series, using the equation:

$$v(i, n) = 10^{i/n}$$

where:  
\(i\) = the i'th element in the series  
\(n\) = the total number of elements in the series

See [Wikipedia - Preferred Number](https://en.wikipedia.org/wiki/Preferred_number), for information on these series.

[NinjaCalc, a free embedded engineering calculator toolbox](http://mbedded-ninja.github.io/NinjaCalc/), can easily find the closest E-series resistance to your desired resistance.

{{< figure src="/images/2012/05/screenshot-ninjacalc-standard-resistance-finder-preferred-value-e6-e192-324.png" width="552" caption="NinjaCalc's "Standard Resistance Finder" calculator showing the closest E-series values to a desired resistance of 2.34kΩ." caption-position="bottom" >}}

# Manufacturing Processes

## Thick Film

Thick film is the most common type of resistor. Most 1% and 5% SMD chip package resistors (0402, 0603, e.t.c) use thick film technology.

## Thin Film

Most 0.1% SMD chip package resistors (0402, 0603, e.t.c) use thin film technology. Thin film resistors can be split into two sub-categories, commercial thin-film and precision thin-film.

## Metal Foil

Even rarer than thick and thin film resistors, metal foil resistor technology allows the most precise resistors to be made.

# Power Resistors

Power resistors is a term used with resistors which are usually rated to dissipate 1W or more of power (without heatsinking).

They can be used to intentionally heat things, as the picture below shows. This image below is a common 5W resistor being used to heat a small container of oil, with a copper thermostat from a hot water cylinder being used to control the temperature.

{{< figure src="/images/2012/05/using-a-power-resistor-to-heat-oil.jpg" width="1600" caption="Power resistors can be used for heating. This photo shows a 5W resistor being used to heat a small container of oil, with a thermostat from a hot water cylinder to control the temperature." caption-position="bottom" >}}

``````````````

# Current-Sense Resistors

Current-sense resistors are a label given to low-valued, high precision (1% or better), and high power resistors that are good for using in current-sense circuits. Sometimes there is nothing special about these resistors (it's purely a marketing term), othertimes they may have two additional terminals for _Kelvin sensing_. A four terminal resistor is also called an _ammeter shunt_. Two of the terminals are used to pass the high current, the other two are used to measure to voltage drop across the resistor. This gets rid of measurement errors due to voltage drop in the wires going to the resistor (when the sense line and high-current path are the same thing).

{{< figure src="/images/2012/05/current-sensing-resistor-large-four-lead.jpg" width="513" caption="A large four-lead current sensing resistor." caption-position="bottom" >}}

More information and schematics on how to make current-sense circuits can be found on the [Current-Sensing page](http://blog.mbedded.ninja/electronics/circuit-design/current-sensing).

``````````````

# Jumpers

Most resistor series also include a 0Ω **jumper** resistor. Jumper resistors are great for jumping tracks when doing PCB design, as well as providing a convenient and cheap way of connecting/disconnecting certain tracks in different PCB variants.

Note that sometimes these jumper resistors can handle much less current than you expect! For example, most 0603/0805 sized SMD jumper resistors are only rated to 1-2A, even though at this current the I*R power dissipation is well below the continuous maximum (0.1-0.5W). However, some can handle some decent current, for example, the [Susumu YJP1608-R001 0603 jumper resistor](http://www.digikey.com/product-detail/en/YJP1608-R001/408-1515-1-ND/2815069), which can handle 10A continuous.

Jumper resistors are not specified with a percentage tolerance as most other resistors, as this makes no sense (what is 5% of 0Ω?). Instead, they are printed as 0Ω, and a maximum resistance is given in the datasheet, which is usually in the order of 1-50mΩ.

# Volume Resistance (Bulk Resistance)

Volume resistance (also known as just resitivity, electrical resistivity, or bulk resistance) has the SI units \(\Omega m\). It is a measure of how well a particular material conducts electricity, and is an intrinsic property of that material (it does not depend on how much of the material or what shape it is in). If the resistance between two conducting plates on opposite faces of a \(1 \times 1 \times 1m\) cube of material is measured to be \(1\Omega\), then the material has a volume resistivity of \(1\Omega m\). 

# Packages

Resistor come in many packages, from large, wire-wound power resistors that come in coils and blocks, to smaller through-hole resistors, to even smaller still SMD resistors. You can find more about resistor packages on the [Component Package Database](http://blog.mbedded.ninja/electronics/circuit-design/component-packages) page.

Through-hole resistors use the older color code scheme (the current international standard as of 2013 is IEC 60062). Newer surface-mount resistors usually have the value printed directly on them (a three-digit number is most common, with the third digit being the multiplier).

{{< figure src="which could be on a reel" width="530" caption="](/images/2012/05/500-0603-smd-resistors-on-tape.jpg) SMD resistors usually come on a tape like the one shown (which could be on a reel) which contains 500 0603 SMD resistors." caption-position="bottom" >}}

Once taken out of the tape, they don't look like much!

{{< figure src="and then can get smaller" width="517" caption="](/images/2012/05/500-0603-smd-resistors-next-to-a-pin.jpg) 500 0603 SMD resistors in a pile next to pin. This is too illustrate just how small they are! (and then can get smaller)." caption-position="bottom" >}}

This was me trying to be arty-farty with the left-overs from putting about 30,000 reeled 0603 resistors into containers for prototyping with.

{{< figure src="/images/2012/05/reel-0603-resistor-leftovers-best.jpg" width="1024" caption="This was me trying to be creative with the left-overs from putting about 30,000 reeled 0603 resistors into containers for prototyping with." caption-position="bottom" >}}

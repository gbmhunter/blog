---
author: gbmhunter
date: 2016-04-12
draft: false
title: NTC Thermistors (Temperature Sensors)
type: page
---

## Overview

**A _negative-temperature coefficient_ (NTC) thermistor can be used as a temperature sensor.** A NTC thermistor is a resistor which has a non-linear change in resistance in a response to a change in temperature. It is a _passive sensor_.

{{< figure src="/images/2016/04/ntc-thermistor-with-lug-vishay-ntcalug03a103gc-v2.jpg" width="372px" caption="An example of a NTC thermistor built into a metal lug, and provided with a cable and connector. Vishay component NTCALUG03A103GC. Image from www.digikey.com."  >}}

## NTCs vs RTDs

A NTC differs from a _resistive temperature detector_ (RTD) in the material used to make the sensor. **RTDs have a resistive element made with pure metals, while NTCs have a resistive element made from ceramics or polymers with semiconductor properties.**

NTCs are used for smaller, but more accurate temperature ranges such as measuring ambient temperature or fridge/freezer temperature, while RTDs are used for larger, less accurate temperature ranges such as measuring furnace temperature.

## Temperature Accuracy

The temperature accuracy of a thermistor can be calculated (at the reference temperature) by dividing the percentage resistance tolerance at 25°C (or whatever the reference temperature is) by the thermistor's temperature coefficient, `\(\alpha\)`.

<div>$$ \text{accuracy (at T)} = \frac{\text{resistance tolerance (at T)}}{\alpha\text{ (at T)}} $$</div>

For example, the [Vishay NTCALUG03A103GC](http://www.digikey.com/product-detail/en/vishay-bc-components/NTCALUG03A103GC/BC2381-ND/2230709) has a resistance tolerance of `\(\pm 2%\)` and `\(\alpha_{25} = \pm 4.39%\)`. Therefore:

<div>$$ \text{accuracy}_{25} = \frac{2%}{4.39} \\ = 0.46% $$</div>

## Self Heating

A NTC thermistor, like any other resistor, dissipates energy as heat when current flows through it. The power dissipation, `\(P_{NTC}\)` in a NTC thermistor is:

<div>$$ P_{NTC} = I^2 * R $$</div>

<p class="centered">
    where: <br>
    \(I\) is the current going through the thermistor, in Amps<br>
    \(R\) is the resistance of the thermistor, at the present temperature, in Ohms<br>
    \(P_{NTC}\) is the power dissipation as heat in the NTC thermistor, in Watts<br>
</p>

Because the resistance of the NTC changes as the temperature changes, so does the dissipated power. In a simple resister divider circuit, the thermistor dissipates the most power when it's resistance is equal to the fixed resistance.

**RULE OF THUMB:** To make sure self-heating doesn't affect your temperature measurements, make sure that no more than 1mW of power is dissipated in the NTC thermistor at any temperature.

## Beta Equation

The Beta equation or Beta formula is a empirical equation used to work out the temperature from the measured resistance of a NTC thermistor.

It uses a single material constant, `\(\beta\)`, which is also known as the _coefficient of temperature sensitivity_. The equation is an exponential approximation of the relationship between resistance and temperature in the form:

<div>$$ R(T) = R(T_0)e^{\beta(\frac{1}{T} - \frac{1}{T_0})} $$</div>

<p class="centered">
    where:<br>
    \(R(T)\) is the actual resistance, in Ohms, at the actual temperature \(T\)<br>
    \(R(T_0)\) is the reference resistance, in Ohms, at the reference temperature \(T_0\)<br>
    \(T\) is the actual temperature, in Kelvin<br>
    \(T_0\) is the reference temperature, in Kelvin<br>
</p>

At best, the accuracy of the Beta equation approaches `\(\pm 1%\)` between `\(0-100^{\circ}C\)`, and not more than `\(\pm 5%\)` other the NTC thermistor's entire temperature range.

`\(\beta\)` can be calculated when you have both the temperature and resistance  of the thermistor at two different operating points. `\(\beta\)` can be calculated as follows:

<div>$$ \beta = \frac{ln(R_1) - ln(R_2)}{\frac{1}{T_1} - \frac{1}{T_2}} $$</div>

Or, written another way:

<div>$$ \beta = \frac{T_1 * T_2}{T_2 - T1}ln(\frac{R_1}{R_2}) $$</div>

Re-arranged so that we can calculate a temperature from a measured resistance, and using the terminology `\(R_0\)` and `\(T_0\)` instead of `\(R_2\)` and `\(T_2\)`, we get the following equation:

<div>$$ \frac{1}{T} = \frac{1}{T_0} + \frac{1}{\beta}ln(\frac{R}{R_0}) $$</div>

{{< figure src="/images/2016/04/ninja-calc-logo-v2-no-transparency.png" caption="ninja-calc-logo-v2-no-transparency"  >}}The free embedded-engineering calculator app, [NinjaCalc](http://mbedded-ninja.github.io/NinjaCalc/), features a calculator for working out the thermistor temperature (or any other variable) using the Beta equation.

## Steinhart-Hart Equation

The Steinhart-Hart is a complex but highly accurate way of modelling the relationship between temperature and resistance of a NTC thermistor.

The Steinhart-Hart equation is:

<div>$$ \frac{1}{T} = A + Bln(R) + C(ln(R))^3 $$</div>

<p class="centered">
    where:<br>
    \(T\) is the temperature, in kelvins<br>
    \(R\) is the resistance at \(T\), in Ohms<br>
    \(A, B, C\) are the _Steinhart-Hart coefficients_ which vary depending on the type of thermistor and the temperature range of interest<br>
</p>

**CAREFUL:** The `\(B\)` in the Steinhart-Hart equation above is not the same as the `\(\beta\)` in the Beta Equation.

## Linearising The NTC With Extra Resistors

By just adding a few extra resistors, the output of a NTC thermistor can be "linearised" enough that the equation `\(y = ax + b\)` can be used within the microcontroller over a limited temperature range.

Linearisation is also used in purely analogue circuits in where there is no digital circuitry (that means no ADCs or processing logic), and the output of the NTC thermistor circuit goes directly to a voltage comparator (or similar) to control an output.

 

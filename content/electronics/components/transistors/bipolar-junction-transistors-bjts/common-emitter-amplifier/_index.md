---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Components, Transistors ]
date: 2022-08-18
description: Schematics, equations and worked examples for the BJT common emitter amplifier.
draft: false
lastmod: 2022-08-19
tags: [ electronics, components, transistors, bipolar junction transistors, BJTs, common emitter amplifier, gain, NPN, PNP, current ]
title: Common Emitter Amplifier
type: page
---

## Overview

The _common emitter amplifier_ is a general-purpose BJT-based amplifier that it typically used for voltage amplification. It offers medium input impedance but unfortunately high output impedance. It is commonly followed with a buffer circuit such as a common-collector amplifier to reduce the output impedance.

**Properties:**

<table>
  <tbody>
    <tr><td>Voltage Gain</td>       <td class="good">High</td></tr>
    <tr><td>Input Impedance</td>   <td class="ok">Medium</td></tr>
    <tr><td>Output Impedance</td>  <td class="bad">High</td></tr>    
    <tr><td>Phase Shift</td>        <td>180</td></tr>
  </tbody>
</table>

{{% note %}}
Lower case letters used below represent changes in quantities, e.g. `\(V_C\)` is the voltage at the collector, whilst `\(v_c\)` is the change in voltage at the collector, `\(\Delta V_C\)`.
{{% /note %}}

## How A Common Emitter Amplifier Works

{{% figure src="common-emitter-amplifier-schematic.png" width="600px" caption="Schematic for a common emitter amplifier with DC bias and AC coupling." %}}

`\(R1\)` and `\(R2\)` are used to provide a DC bias point for the base of the transistor, using the standard resistor divider technique (to be exact, you also have to take into account that the transistor draws some current from the output of the resistor divider, but generally you can ignore that). `\(C1\)` is used to AC couple the input signal to the DC bias point -- it's value is chosen so that it appears as a short for the AC signal frequencies of interest but blocks DC. `\(R_L\)` is known as the load resistance. `\(R_E\)` adds _emitter degeneration_ and makes the amplifier gain more stable with variations in `\(\beta\)`. `\(C_E\)` is the _emitter bypass capacitor_ and is used to bypass `\(R_E\)` so that the AC signal essentially sees the emitter connected directly to ground.

## Gain Of A Common Emitter Amplifier

{{% figure src="common-emitter-amplifier-gain-equation-diagram.png" width="300px" float="right" caption="Diagram showing how the gain equation for a common emitter amplifier is found." %}}

The gain of a common-emitter amplifier by definition is:

<p>\begin{align}
A = \frac{v_{out}}{v_{in}} \nonumber \\
\end{align}</p>

Now, assuming `\(i_c \approx i_e\)`, the change in voltage at the output is:

<p>\begin{align}
v_{out} = - i_e R_C \nonumber \\
\end{align}</p>

And the change in voltage at the input is:

<p>\begin{align}
v_{in} = i_e (r_e + R_E) \nonumber \\
\end{align}</p>

Note that we have to take the internal emitter resistance `\(r_e\)` into account here, as the emitter bypass capacitor is going to remove the `\(R_E\)` term further down, leaving only `\(r_e\)`.

Substituting these equations for `\(v_{in}\)` and `\(v_{out}\)` into the gain equation gives:

<p>\begin{align}
A &= \frac{- i_e R_C}{i_e (r_e + R_E)} \nonumber \\
  &= -\frac{R_C}{r_e + R_E} \nonumber \\
\end{align}</p>

Remember that the value for `\(r_e\)` is dependent on the emitter current at the DC bias point:

<p>\begin{align}
r_e &= \frac{25mV}{I_E} \nonumber \\    
\end{align}</p>

Thus, for our signal frequencies at which the `\(C_E\)` capacitor shorts out external resistor `\(R_E\)`, the emitter resistance is just `\(r_e\)` and the gain becomes:

<p>\begin{align}
A &= -\frac{R_C}{r_e} \nonumber \\
  &= -\frac{I_E R_C}{25mV} \nonumber \\
\end{align}</p>

{{% note %}}
The voltage gain of the common emitter amplifier **is not dependent on the current gain `\(\beta\)` of the BJT**. This is good news, as this property cannot be tightly controlled during manufacture and usually varies between "identical" transistors by a few `\(100%\)` or more!
{{% /note %}}

## Common Emitter Amplifier Design Process

How do you design a common emitter amplifier? Let's do a worked example to progress through the design steps.

**Assumptions**

* `\(V_{CC}\)` is `\(12V\)`
* We'll be using the venerable [BC548BTA NPN transistor from onsemi](https://nz.mouser.com/datasheet/2/308/BC550_D-1802078.pdf) in our amplifier.
* We're trying to get as much gain as possible (a noble quest).

**Steps**

1. **Choose collector current:** Chose a suitable DC collector current for your amplifier. A reasonable choice would be `\(I_C = 10mA\)` (max. `\(I_C\)` for the BC547B is `\(100mA\)`).
    <br/><br/>

1. **Determine `\(R_E\)`:** As a rule of thumb, 10% of `\(V_{CC}\)` is normally dropped across `\(R_E\)`[^bib-stack-exchange-resistor-values-for-common-emitter]:
    <p>\begin{align}
    V_{R_E} &= 0.1V_{CC} \nonumber \\
        &= 0.1*12V \nonumber \\
        &= 1.2V \nonumber \\
    \end{align}</p>
    <br/>

    And then:
    <p>\begin{align}
    R_E &= \frac{V_{R_E}}{I_{R_E}} \nonumber \\
        &= \frac{1.2V}{10mA} \nonumber \\
        &= 120\Omega \nonumber \\
    \end{align}</p>
    <br/>

1. **Find the collector resistor value:** We are dropping `\(1.2V\)` across the emitter resistor. That leaves `\(10.8V\)` to be dropped across the collector resistor and the BJT. Assuming a saturation voltage of 200mV, this gives the BJT `\(10.6V\)` of swing. For maximum symmetrical output, we want to drop half of this `\(10.6V\)` across the collector resistor:
    <p>\begin{align}
    R_C &= \frac{V_{R_C}}{I_{R_C}} \nonumber \\
        &= \frac{0.5*10.6V}{10mA} \nonumber \\    
        &= 530\Omega \nonumber \\
    \end{align}</p>
    <br/>

1. **Find the base current:** Calculate `\(I_B\)` using the approximate gain:
    <p>\begin{align}
    I_B &= \frac{I_C}{\beta} \nonumber \\
        &= \frac{10mA}{200} \nonumber \\
        &= 50uA \nonumber \\
    \end{align}</p>
    <br/>

1. **Determine the base voltage `\(V_B\)`:** `\(V_B\)` is just the emitter voltage plus the diode `\(V_BE\)` drop:

    <p>\begin{align}
    V_B &= V_E + V_{BE} \nonumber \\
        &= 1.2V + 0.7V \nonumber \\
        &= 1.9V \nonumber \\
    \end{align}</p>
    <br/>

1. **Calculate resistor divider values**: Chose `\(R1\)` and `\(R2\)` to set the output of the resistor divider to match this base voltage. We also want to make sure the current flowing through the resistor is 10x the current that will be sucked out of it into the base of the transistor, that way we can ignore the loading of the BJT when calculating the resistor values.
    <p>\begin{align}
    I_{R2} &= 10 \cdot I_B \nonumber \\
           &= 10 \cdot 50uA \nonumber \\
           &= 500uA \nonumber \\
    \end{align}</p>

    Now we can easily calculate the value of `\(R2\)`:

    <p>\begin{align}
    R2 &= \frac{V_{R2}}{I_{R2}} \nonumber \\
       &= \frac{1.9V}{500uA} \nonumber \\
       &= 3.8k\Omega \nonumber \\
    \end{align}</p>

    And `\(R1\)`:

    <p>\begin{align}
    R1 &= \frac{V_{R1}}{I_{R1}} \nonumber \\
       &= \frac{12V - 1.9V}{500uA} \nonumber \\
       &= 20.2k\Omega \nonumber \\
    \end{align}</p>

1. **Calculate input AC coupling capacitor:** The rule of thumb is to make sure the impedance of the capacitor is 10x less that the AC impedance of the resistor divider at the lowest frequency of interest[^bib-electronics-tutorials-common-emitter-amplifier]. Our lowest frequency of interest is `\(20Hz\)`.

    <p>\begin{align}
    R_{in} &= R1 || R2 \nonumber \\
           &= \frac{R1 \cdot R2}{R1 + R2} \nonumber \\
           &= \frac{20.2k\Omega \cdot 3.8k\Omega}{20.2k\Omega + 3.8k\Omega} \nonumber \\
           &= 3.20k\Omega \nonumber \\
    \end{align}</p>

    <p>\begin{align}
    Z_{C_{in}} &= \frac{R_{in}}{10} \nonumber \\
               &= \frac{3.20k\Omega}{10} \nonumber \\
               &= 320\Omega \nonumber \\
    \end{align}</p>

    <p>\begin{align}
    C_{in} &= \frac{1}{2\pi f Z_{C_{in}}} \nonumber \\
           &= \frac{1}{2\pi \cdot 20Hz \cdot 320\Omega} \nonumber \\
           &= 25uF \nonumber \\
    \end{align}</p>

1. **Calculate emitter bypass capacitor:** The same rule of thumb applies to `\(C_E\)`, except this time it's impedance should be 10x smaller than `\(R_E\)`:
    <p>\begin{align}
    Z_{C_E} &= \frac{R_E}{10} \nonumber \\
            &= \frac{120\Omega}{10} \nonumber \\
            &= 12\Omega \nonumber \\
    \end{align}</p>

    <p>\begin{align}
    C_E &= \frac{1}{2\pi f Z_{C_E}} \nonumber \\
        &= \frac{1}{2\pi \cdot 20Hz \cdot 12\Omega} \nonumber \\
        &= 663uF \\
    \end{align}</p>

1. **Calculate the gain**: 

    <p>\begin{align}
    A &= -\frac{I_E R_C}{25mV} \nonumber \\
      &= -\frac{10mA * 530\Omega}{25mV} \nonumber \\
      &= -212 \\
    \end{align}</p>

    Or in dB:

    <p>\begin{align}
    A_{db} &= 20\log(A) \nonumber \\
           &= 20\log(212) \nonumber \\
           &= 46.5 \\
    \end{align}</p>

1. **Done!**

The finished schematic, along with voltage sources ready for simulation is shown below.

{{% figure src="common-emitter-amplifier-design-process-schematic.png" width="800px" caption="The finished schematic of our common emitter amplifier, ready for simulation." %}}

Given the large gain of `\(46.5dB\)`, I didn't want to saturate the output so I chose an input sine wave signal with an amplitude of `\(10mV\)` at a frequency of `\(1kHz\)`. The simulated input and output voltages are shown below.

{{% figure src="common-emitter-amplifier-simulation-vin-vout-plot.png" width="600px" caption="Simulation results showing `\(V_{OUT}\)` vs. `\(V_{IN}\)`." %}}

The simulated frequency response shown below is close to what we expect. The simulated gain of around `\(42dB\)` is close enough to our calculated gain of `\(46.5dB\)` considering all the approximations we made!

{{% figure src="common-emitter-amplifier-simulation-freq-response-plot.png" width="600px" caption="The simulated frequency response of our common emitter amplifier." %}}

## References

[^bib-cadence-common-emitter-design]: Cadence. _Common-Emitter Transistor Amplifier Design_. Retrieved 2022-08-17, from https://resources.system-analysis.cadence.com/blog/msa2021-common-emitter-transistor-amplifier-design.
[^bib-stack-exchange-resistor-values-for-common-emitter]: Stack Exchange: Electrical Engineering (2021, Oct 13). _How to choose resistors' value for common emitter amplifier?_. Retrieved 2022-08-17, from https://electronics.stackexchange.com/questions/127491/how-to-choose-resistors-value-for-common-emitter-amplifier. 
[^bib-electronics-tutorials-common-emitter-amplifier]: Electronics Tutorials. _Common Emitter Amplifier_. Retrieved 2022-08-18, from https://www.electronics-tutorials.ws/amplifier/amp_2.html.
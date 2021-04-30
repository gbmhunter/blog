---
author: "gbmhunter"
date: 2012-01-05
description: "Crystals (XTALs), load capacitance, frequency accuracy and stability, schematic symbols, MEMS oscillators, and more info about oscillators."
draft: false
lastmod: 2021-04-30
tags: [ "electronics", "components", "oscillators", "crystals", "MEMS", "XTAL", "XC", "XO", "OCXO", "frequency", "clocks", "power consumption", "stability", "accuracy", "ultrasonic baths" ]
title: "Oscillators"
type: "page"
---

## Overview

## Crystals

_Crystals_ (also called by the more generic term _oscillator_, although oscillators are also used to refer to other "oscillating" components) are electrical components which output a periodic waveform that can be used as a clock source for digital logic (which includes microcontrollers, it's main use). They can also be called _piezoelectric resonators_. See the {{% link text="Oscillator page" src="" %}} for information on powered oscillators.

{{< img src="crystal-schematic.png" width="275px" caption="A schematic of a crystal, usually connected to a microcontroller or other digital device that uses a clock. The load capacitance usually varies from 6-25pF per leg (see the crystals datasheet for the correct value)." >}}

{{< img src="smd-tuning-fork-weird-name-for-crystal.png" width="275px" caption="Weird name for a crystal, don't you think? Image from http://www.foxonline.com/pdfs/fsrlf.pdf."  >}}

_AT Cut_ crystals are the most common form of crystal. This is where the resonant frequency is determined by the thickness of the cut crystal.

### Schematic Symbol

Unfortunately, many different designator prefixes are used to represent a crystal. Some of the most common are:

* XC
* XO
* OCXO (oven-controller crystal oscillator)


### Important Parameters

Sorted alphabetically.

#### Accuracy

Like stability, this is measured in ppm.

Combined with the stability, this gives you the total error you can expect from a crystal operating over a particular temperature range.

#### Frequency

Arguably the most important parameter, this is the nominal frequency of the waveform the crystal generates.

Typical values: 20kHz-48MHz

#### Lead Capacitance

Typical Values: 8pF-20pF

#### Operating Mode

Most crystals operate in the "fundamental" operating mode, that is, they are running at their fundamental frequency. Most crystals below 30MHz operate in their fundamental operating mode. For frequencies higher than 30MHz, crystals begin to operate in the 3rd, 5th or sometimes 7th overtone. Only odd overtones are viable operating frequencies.

Most crystals operating at a overtone frequency use series resonance to do so[^elec-tutorials-crystals].

#### Operating Temperature

The operating temperature is the temperature range in which the crystal is guaranteed to operate within it's specified tolerances (e.g. stability and accuracy).

Typical operating temperatures are -40 to +85°C.

#### Power Consumption

The power consumption of a crystal is a measure of how much **power** the **crystal consumes** during normal operation. This can be of concern for extremely low power designs.

Typical power consumption for a TH/SMD crystal is around 50uW.

Note that this is the power consumption of the crystal itself, and **does not take into account the power consumption of the associated drive circuitry** (which can be much greater!).

#### Stability

Stability is a measure of how repetitive, or stable, the clocks frequency is over time. It is measured in parts-per-million (ppm).

Typical stability is around 30-50ppm.

### What The Crystal Output Looks Like...

The following waveform is the voltage on one of a 12MHz SMD crystals pins, when driven by a standard microcontroller.

{{< img src="12mhz-crystal-output-when-driven-by-microcontroller.jpg" width="1200px" caption="The output voltage waveform of a 12MHz crystal being driven by a standard microcontroller."  >}}

### Equivalent Circuit

A piezoelectric crystal resonator can be modelled as a series LCR circuit in parallel with a capacitor:

{{% figure src="crystal-equivalent-circuit.svg" width="800px" caption="The equivalent circuit for a two-lead piezoelectric crystal resonator." %}}

The series components `\(C_1\)`, `\(L_1\)`, and `\(R_1\)` model the physical properties of the piezoelectric crystal. They are not real physical electronic components inside the crystal. The parallel component `\(C_0\)` is the lead capacitance[^cts-app-note-crystal-basics].

`\(L_1\)`: This models the mechanical mass of the quartz in motion. Lower frequency crystals have a value of `\(1-2H\)` (yes, that's whole Henries, much larger than micro/milli Henries of most real inductors!). This value can drop down to `\(1-100mH\)` for the higher frequency crystals, which are smaller and therefore less mass.

`\(C_1\)`: This models a number of mechnical properties of the quartz crystal: the stiffness, the area of the electrodes, and the thickness/shape of the wafer. The value for fundamental mode crystals ranges between `\(0.005pF\)` and `\(0.030pF\)`.

`\(R_1\)`: This models the impedance of the crystal when it is oscillating at it's series resonant frequency. When a series LC circuit is at resonant frequency, it's impedance is `\0\Omega\)`, therefore the impedance (and therefore current) is purely determined by this `\(R_1\)`. `\(R_1\)` is inversely proportional to the active area of the crystal, therefore smaller crystals have a larger `\(R_1\)`.

`\(C_0\)`: This models the parallel capacitance (a.k.a. _shunt capacitance_) between the two leads of a crystal. It is the measured capacitance between the two leads when the crystal is not excited (i.e. not vibrating). `\(C_0\)` typically ranges from `\(1-7pF\)`.

### Quality Factor

The quality factor for crystal oscillators is extremely large, typically 10,000 or greater. This is due to the very low series resistance (typically around `\(5\Omega\)`).

The quality factor is determined by the following equation:

<p>\begin{align}
Q &= \frac{X_L}{R} \\
  &= \frac{2\pi f L}{R} \\
\end{align}</p>

<p class="centered">
where:<br/>
\(X_L\) is the impedance of the inductor.
</p>

### Oven-Controlled Crystal Oscillators (OCXOs)

High-performance crystal oscillators are kept with temperature-controlled environments to increase the stability of the oscillator. They are called oven-controlled crystal oscillators (OCXOs).

{{< img src="n4a-series-oven-controlled-crystal-oscillator-ocxo-photo.gif" width="264px" caption="A photo of an N4A series OCXO. Image from http://www.bliley.com/." >}}

The crystals are designed to have a _turning-point_, a point of greatest stability, close to the oven temperature. OCXOs, rather than having a temperature stability in the ppm (parts-per-million) range like normal crystals, have a stability in the ppb (parts-per-billion) range (20ppb would be a viable stability).

Peltier devices can be used as the "oven" to keep the crystal's temperature constant.

### Popular Crystal Packages

The HC-49/U package is a popular choice for older through-hole crystals.

Newer crystals come in small, custom SMD packages, with typically either 2 or 4 pins (with the 4-pin packages usually have two GND pins).

### Simulation

Crystal oscillators can be difficult to simulate accurately in most SPICE-based programs[^fast-crystal-oscillator-simulation-methodology]. Most SPICE programs use the Newton-Raphson algorithm for converging to a solution. Unfortunately, the Newton-Raphson algorithm is not suitable for very high Q circuits, of which a crystal resonantor is definitely one (Q values of `\(10,000\)` or more!). The time step has to be set so small for accurate simulation of crystal resonantor circuits that it can take days of simulation to "start-up" the ceramic resonantor (i.e. reach steady-state oscillation from power-on).

## Oscillators

This site uses the word _oscillator_ to represent a component with an **self-contained** oscillating feature that has power, ground, and signal out pins. This site uses the word _crystal_ to represent an component which contains a oscillating element (in the form of a crystal), which requires an **external oscillation circuit** before it useful.

### Designators

A common designator prefix to use for oscillators is `\(Y\)` (e.g. `\(Y1\)`). I do not recommend using the prefix `\(XC\)` as this should be reserved for crystal oscillators.

### Important Parameters

#### Phase Noise

Phase noise is a way of describing the stability of the crystal in the frequency domain.

#### Start-Up Time

Symbol: `\(T_{SU}\)`

The start-up time for most oscillators is within the range 2-20ms. This start-up time can be important in low-power designs when the start/stop time of the crystal results in wasted energy.

## MEMS Oscillators

MEMS oscillators are built using small mechanical structures (less than 0.1mm in any dimension) that vibrate at set frequencies when electrostatic forces are applied. This mechanical vibratory part of a MEMS oscillator is called the MEMS resonator. This is etched into a silicon die, and surrounding electronics contain both the driving, measuring, and compensation circuitry.

They use less power than a crystal-based oscillator, making them suitable for battery-powered devices. They are manufactured using standard IC manufacturing processes, so they are also more durable. They typically have better frequency stability over their operating temperature range, with common values being 10ppm at room temperature and 100pm over their entire operating temperature range.

**MEMS oscillators do not like ultrasonic cleaning baths**. Ultrasonic baths may permanently damage the oscillator or cause long term reliability issues[^sit1533-mems-oscillator-datasheet].

### Packaging

MEMS oscillators have been made in packages which are also commonly used for crystal packages, such as the 2012 SMD package.

{{% img src="mems-vs-crystal-oscillator-package-size.png" width="700px" caption="A comparison between MEMS and crystal-based oscillators in CSP and larger 2012 SMD packages. Note how the MEMS oscillator sneaks in two extra pins between the standard 2012 pads for power and ground." %}}

## Wien Bridge Oscillator

The Wien bridge oscillator is a relatively simple oscillator that can generate reasonably accurate sine waves. It is named after a bridge circuit designed by Max Wien in 1891 for the measurement of impedances.

{{% figure src="wien-bridge-oscillator/schematic-traditional-as-bridge.svg" width="800px" caption="Schematics of a Wien bridge oscillator circuit, drawn in the traditional way with the RC and R networks shown as a bridge." %}}

However the modern way to draw this is to split up the non-inverting and inverting feedback circuits like this:

{{% figure src="wien-bridge-oscillator/schematic-modern.svg" width="800px" caption="The modern way to draw the Wien bridge oscillator circuit, separating the non-inverting and inverting feedback sections." %}}

In my opinion this is a clearer way of drawing the circuit.

One disadvantage of a Wien Bridge oscillator is that they need a gain of exactly 3 to function properly. If the gain is less than this, the oscillator will not start (or will stop if already started). If it is more than 3, the oscillator output will saturate and your sine wave output will start looking more like a square wave. Wien bridge oscillators typically need a non-linear component (a component which has a resistance which changes with applied voltage) to actively limit the gain and keep it at 3.

Common methods of actively limiting the gain include using a incandescent bulb (resistance increases as it heats up), diodes (resistance decreases as voltage increases) or JFETs.

The frequency of oscillation is determined by the RC networks connected to the non-inverting pin. Given the `\(R\)` and `\(C\)` are identical for both RC networks, the frequency is given by:

<p>\begin{align}
  f = \frac{1}{2\pi RC}
\end{align}</p>

<p class="centered">
  where:<br/>
  \(f\) is the frequency of oscillation, in \(Hz\)<br/>
  \(R\) is the resistance, in \(\Omega\)<br/>
  \(C\) is the capacitance, in \(F\)
</p>

### Example And SPICE Simulation

{{% figure src="wien-bridge-oscillator/schematics.png" width="800px" caption="Wien Bridge oscillator circuit." %}}

The frequency is:

<p>\begin{align}
\label{eqn:example-freq-calc}
f &= \frac{1}{2\pi RC} \\
  &= \frac{1}{2\pi \cdot 80k\Omega \cdot 10nF} \\
  &= 199 Hz
\end{align}</p>


{{% figure src="wien-bridge-oscillator/v-sine-out.png" width="800px" caption="SPICE simulation results for the Wien Bridge oscillator circuit shown above. Note how the circuit takes approx. 350ms to start-up, relying on noise (which SPICE does simulate) for the initial 'kick' to begin oscillating." %}}

If we zoom in we can measure the frequency SPICE puts the oscillator at:

{{% figure src="wien-bridge-oscillator/v-sine-out-few-cycles.png" width="800px" %}}

You can count 3 cycles in 15ms, which puts the simulated frequency at:

<p>\begin{align}
f &= \frac{3}{15ms}
  &= 200Hz
\end{align}</p>

which agrees well with what we calculated in `\(Eq. \ref{eqn:example-freq-calc}\)`.

You can download the following assets:

* <a href="wien-bridge-oscillator/wien-bridge-oscillator-sim.sch" download>KiCad schematics</a>
* <a href="wien-bridge-oscillator/wien-bridge-oscillator-sim.cir" download>SPICE netlist (generated from the KiCad schematics)</a>

## Manufacturer Part Numbers

* **SiT1533AI**: SiTime standard clock oscillators and MEMS oscillators.
  * **SiT1533AI-H4-D14-32.768G**: MEMS clock oscillator.

## References

[^sit1533-mems-oscillator-datasheet]: <https://www.mouser.com/datasheet/2/371/SiT1533_rev1.4_03202018-1324419.pdf>, retrieved 2021-01-18.
[^cts-app-note-crystal-basics]: <https://www.ctscorp.com/wp-content/uploads/Appnote-Crystal-Basics.pdf>, retrieved 2021-04-28.
[^fast-crystal-oscillator-simulation-methodology]: <https://designers-guide.org/forum/Attachments/GEHRING_-_Fast_Crystal-Oscillator-Simulation_Methodology.pdf>, retrieved 2021-04-28.
[^elec-tutorials-crystals]: <https://www.electronics-tutorials.ws/oscillator/crystal.html>, retrieved 2021-04-29.
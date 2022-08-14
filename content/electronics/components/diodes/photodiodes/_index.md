---
authors: [ "Geoffrey Hunter" ]
date: 2022-02-24
description: "Schematic symbols, equivalent circuits and more info on photodiodes."
draft: false
images: [ ]
lastmod: 2022-02-28
tags: [ "electronics", "components", "photodiodes", "diodes", "light", "transimpedance", "amplifier", "op-amp", "PN", "junction", "PIN", "semiconductor", "equivalent circuit", "Germanium", "current source", "avalanche" ]
title: "Photodiodes"
type: "page"
---

{{% warning-is-notes %}}

## Overview

A photodiode is a two terminal component which converts light into an electrical current. Just like a [general-purpose diode](/electronics/components/diodes/), they consist of a normal semiconductor PN junction. The difference is the photodiodes semiconductor junction is exposed to light through a transparent window rather than encapsulated in opaque material as in a standard diode.

Uses:

* Light sensors
* MOSFET gate drivers in opto-couplers

## Schematic Symbol

Below is the common schematic symbol used for a photodiode:

{{% figure src="photodiode-schematic-symbol.png" width="300" caption="Schematic symbol for a photodiode." %}}

{{% tip %}}
The photodiode schematic symbol is very similar to one for an [LED (light-emitting diode)](/electronics/components/diodes/light-emitting-diodes-leds/), but the "light arrows" on an LED point away from the diode.
{{% /tip %}}

## Types of Photodiodes

There are three basic types of photodiode:

* PN junction photodiode
* PIN photodiode
* Avalanche photodiode

### PN Junction Photodiode

A _PN junction photodiode_ is the "standard photodiode" that uses a PN junction to detect light. The PN junction forms a depletion region, which is exposed to the environment through a transparent window. When a photon strikes this depletion region, it is absorbed, and an electron-hole pair is created. Because of the electric field present in the depletion region, the electron will want to move (_sweeped_) towards the N doped semiconductor, whilst the hole will want to move towards the P doped semiconductor. These moving charge carries create the photodiode current (_photocurrent_) that you measure.

### PIN Photodiode

A _PIN photodiode_ is a variant of the standard PN junction photodiode that has an intrinsic layer placed between the two doped semiconductor layers. This intrinsic region increases the depletion region, which in turn reduces the junction capacitance of the photodiode. This allows it to be used in high-speed applications.

### Avalanche Photodiode

An _avalanche photodiode_ (APDs) is a variant of the standard PN junction photodiode that makes use of impact ionization (the avalanche effect) to increase the photon to current response of the photodiode (gain). This internal gain means that APDs have high responsivity, making them useful for detecting extremely low levels of light. APDs require to be operated at a high reverse-bias voltage, near their breakdown voltage. Even though the high reverse-bias creates a larger dark current (and higher current noise), the effect of the internal gain outweighs this additional noise, making them suitable for low-level light detection[^bib-wavelength-elec-photodiodes].

## Photodiode Current vs. Voltage

The typical relationship between the photodiodes voltage and current is shown below:

{{% figure src="photodiode-voltage-vs-current.png" width="700" caption="Graph showing the typical relationship between photodiode voltage and current, for three different levels of incident light power. The top-most curve is with no incident light, curves then shift downwards very linearly with increasing light power. " %}}

{{% tip %}}
Except for `\(V=0V\)` (right on the vertical axis), almost no photodiode is operated in the right-half of the graph.
{{% /tip %}}

The top-most curve is when there is no incident light (`\(P_{IN} = 0W\)`). You will notice this curve goes through `\((0,0)\)`. As the incident light power increases, the curve shifts downwards, in a mostly linear fashion (this is why you can make accurate light sensors with photodiodes).

The right-half of the graph is not terribly interesting, as the photodiode just acts as a normal diodes in this area, with a sharp increase in the current around the typical "turn-on" voltage of `\(0.7V\)`. In the left-hand side of the graph, as the reverse-bias voltage increases, the diodes dark current increases (the line with `\(P_{IN} = 0W\)`).

## Important Parameters

### Responsivity

* Units: `\(AW^{-1}\)`
* Typical range: `\(0.1{-}1AW^{-1}\)`

### Linearity

> In some cases, applying a reverse voltage is effective in enhancing the upper limit of linearity -- Hamamatsu: Si photodiodes[^bib-hamamatsu-si-photodiodes].

### Quantum Efficiency

### Spectral Range

* Units: `\(nm\)`
* Typical range: `\(400-1100nm\)`

### Sensitive Area

* Units: `\(mm^2\)`
* Typical range: `\(1-10mm^2\)`

The _sensitive area_ is the area of the PN junction that is exposed and responds to light. A larger sensitive area will result in a photodiode being able detect lower levels of light, and provide more bits of resolution.

{{% figure src="bpw34-sensitive-area.png" width="300" caption="Mechanical outline showing the sensitive area on the top face of the Vishay BPW34 photodiode (DIP-2 package)[^bib-vishay-bpw34-ds]." %}}

### Dark Current

The dark current for a silicon photodiode approximately doubles for every `\(10^{\circ}C\)` in temperature rise[^bib-nthu-optical-detectors], giving rise to the following equation:

<p>\begin{align}
I_{dark}(T_2) = I_{dark}(T_1) \cdot 2^{\frac{T_2 - T_1}{6}} 
\end{align}</p>

The dark current at `\(25^{\circ}C\)` is usually specified in the photodiode's datasheet. Using this equation, you can then find the dark current for any other temperature.

## Basic Photodiode-based Transimpedance Amplifier Circuit

Photodiodes are commonly used to measure light intensities. But the output of a photodiode is a very small current, which isn't very useful for measuring. A common "analogue front-end" to add to a photodiode is a _transimpedance amplifier_ using an [op-amp](/electronics/components/op-amps/), as shown below. The transimpedance amplifier converts the very small current into a much larger voltage. This voltage can then be used to control other parts of a circuit or can be fed into an ADC for digitizing before being read by a microcontroller.

{{% figure src="simple-transimpedance-photodiode-circuit.png" width="700" caption="A basic transimpedance amplifier circuit to convert the photodiodes light-dependent current into a measurable voltage. The output can be used to control other analog circuitry are can be connected to an [ADC](/electronics/components/analogue-to-digital-converters-adcs/)." %}}

Because the op-amps non-inverting is tied to ground, the inverting input is a "virtual ground" (it also stays at 0V). Because the diode current `\(I_D\)` has no-where to go but through the resistor `\(R_f\)`, this gives the simple equation:

<p>\begin{align}
V_{OUT} &= I_D R_f
\end{align}</p>

{{% tip %}}
Remember that the op-amp will drive it's output to whatever voltage is needed to keep it's inverting input at the same potential as it's non-inverting input (0V).
{{% /tip %}}

The current noise density of the circuit is[^bib-osi-photodiode-chars-and-apps]:

<p>\begin{align}
I_N = \sqrt{\frac{4kT}{R_f}}
\end{align}</p>

<p class="centered">
where:</br>
\(I_N\) is the current noise density, in \(A_{rms}Hz^{-0.5}\)</br>
\(k\) is Boltzmann's constant, \(1.38{\times}10^{-23}JK^{-1}\)</br>
\(T\) is the temperature of the photodiode, in \(K\)</br>
</p>

## Gain Peaking Capacitor

A capacitor `\(C_f\)` can be added in parallel with `\(R_f\)` to prevent _gain peaking_.

## Biasing

When connected to a transimpedance amplifier, the photodiode can either be used with `\(0V\)` potential across it (_photovoltaic mode_) or with a reverse bias (_photoconductive mode_)[^bib-osi-photodiode-chars-and-apps].

### Photovoltaic Mode

_Photovoltaic mode_ is when the photodiode is not operated with any DC bias across it (i.e. there is `\(0V\)` across it). This is usually achieved by tying one side of the photodiode to ground, whilst the other side is held at "virtual ground" by an op-amp.

The photovoltaic mode of operation is recommended for low speed `\(<350kHz\)` and low-light level applications[^bib-osi-photodiode-chars-and-apps]. It also appears to be more linear, due to the less variations in response due to changes in temperature[^bib-osi-photodiode-chars-and-apps].

### Photoconductive Mode

_Photoconductive mode_ is when the photodiode is operated with a reverse-bias voltage across it. Applying a reverse-bias to a photodiode can improve the speed of the device, and is the preferred mode of operation for high-speed applications[^bib-osi-photodiode-chars-and-apps]. The speed increase is because a greater reverse-bias increases the depletion region. This in turn reduces the junction capacitance, increasing the bandwidth of the device.

* Increased speed.
* Increased dark and noise current.

## Equivalent Circuit

Below shows an equivalent circuit for a photodiode:

{{% figure src="photodiode-equivalent-circuit.png" width="700" caption="An equivalent circuit for a photodiode. Based of the circuit in _Photodiode Characteristics and Applications_ by OSI Optoelectronics[^bib-osi-photodiode-chars-and-apps]." %}}

`\(R_{sh}\)` represents the resistance in parallel with the current source, and is called the _shunt resistance_. You want this shunt resistance to be as high as possible, as this means more of the current is delivered to the load. Germanium photodiodes can have lower shunt resistance in the `\(1-100k\Omega\)` range[^bib-aac-photodiode-equiv-circuit].

`\(C_j\)` represents the junction capacitance, cause by the depletion region of the PN junction. Junction capacitance effects the photodiodes high-frequency response, as the capacitances impedance drops with increasing frequency. Lower capacitance photodiodes have better high frequency response. The value of `\(C_j\)` is not constant -- in fact it is strongly dependent on the reverse-bias voltage. **The higher the reverse-bias, the lower the capacitance**. Thus you can improve a photodiodes high frequency response by reverse-biasing it at a high voltage.

{{% figure src="bpw34-diode-capacitance-vs-reverse-voltage.png" width="400" caption="A graph showing the junction capacitance vs. reverse voltage for the Vishay BPW34 photodiode[^bib-vishay-bpw34-ds]. You can clearly see the reduction of capacitance with increased reverse bias!" %}}

## Manufacturers

### Opto Diode

Opto Diode manufacture a range of silcon photodiodes in through-hole TO-5, TO-8 and TO-18 packages.

{{% figure src="odd-5wisol-photodiode-photo-to-5.png" width="200" caption="Close-up photo of the ODD-5WISOL photodiode from Opto Diode in a TO-5 package[^bib-opto-diode-odd-5wisol-ds]. This photodiode has an active area of approx. `\(5mm^2\)` and responsivity of `\(0.4A/W\)` at 632nm (red)." %}}

## Popular Parts

### Vishay BPW34

* Package: DIP-2
* Price: [US$0.48 (1000)](https://www.digikey.com/en/products/detail/vishay-semiconductor-opto-division/BPW34/1681149)

Popular PIN photodiode with a spectral range from 400-1100nm.

## References

[^bib-burr-brown-noise-perf-tia-vs-int]:  Bonnie C. Baker (1993). _Comparison Of Noise Performance Between A FET Transimpedance Amplifier And A Switched Integrator_. Burr Brown (now Texas Instruments). Retrieved 2022-02-25, from https://www.ti.com/lit/an/sboa034/sboa034.pdf.
[^bib-aac-photodiode-equiv-circuit]:  Robert Keim (2020, Dec 23). _Understanding the Photodiode Equivalent Circuit_. Retrieved 2022-02-27, from https://www.allaboutcircuits.com/technical-articles/understanding-the-photodiode-equivalent-circuit/.
[^bib-osi-photodiode-chars-and-apps]:  OSI Optoelectronics. _Photodiode Characteristics and Applications_. Retrieved 2022-02-27, from http://www.osioptoelectronics.com/application-notes/an-photodiode-parameters-characteristics.pdf.
[^bib-opto-diode-odd-5wisol-ds]:  Opto Diode (2022, Jan 27). _Photodiode 5 mm2 - Isolated: ODD-5WISOL (datasheet)_. Retrieved 2022-02-27, from https://optodiode.com/pdf/ODD-5WISOL.pdf. 
[^bib-vishay-bpw34-ds]:  Vishay (2011, Aug 23). _BPW34, BPW34S: Silicon PIN Photodiode (datasheet)_. Retrieved 2022-02-27, from https://www.vishay.com/docs/81521/bpw34.pdf.
[^bib-hamamatsu-si-photodiodes]:  Hamamatsu (2020, Dec). _Si photodiodes_. Retrieved 2022-02-28, from https://www.hamamatsu.com/content/dam/hamamatsu-photonics/sites/documents/99_SALES_LIBRARY/ssd/si_pd_kspd9001e.pdf.
[^bib-wavelength-elec-photodiodes]:  Wavelength Electronics (2018). _Photodiode Basics_. Retrieved 2022-02-28, from https://www.teamwavelength.com/photodiode-basics/.
[^bib-nthu-optical-detectors]:  Wei-Chih Wang. _Optical Detectors_. Retrieved 2022-03-02, from https://depts.washington.edu/mictech/optics/me557/detector.pdf.
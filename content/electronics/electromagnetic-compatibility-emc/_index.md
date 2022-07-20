---
authors: [ Geoffrey Hunter ]
date: 2011-09-05
draft: false
lastmod: 2022-07-18
tags: [ electrical compliance, compliance, EMI, EMC, attenuators, transient limiters, anechoic, TekBox, EMCview, FCC, Part 15, radiators, LISN, conducted emissions, radiated emissions, CISPR ]
title: Electromagnetic Compatibility (EMC)
type: page
---

{{% warning %}}
This page is in notes format, and may not be of the same quality as other pages on this site.
{{% /warning %}}

## Overview

_Electromagnetic Compatibility (EMC)_ is a measure of a devices ability to function in a shared operating environment (validated with susceptibility testing) whilst at the same time not effecting the ability for neighbouring equipment to function (validated with emissions testing).

Electronic devices both emit electrical noise and "absorb" noise from their environment. There are two main forms of emitted noise -- they emit radiated electromagnetic noise (noise that travels through the atmosphere) and conductive noise (noise that travels down any external electrical connections). Many electronic standards define maximum values of noise that a electronics device can emit, as well as levels of ambient noise that the device must functional properly within.

{{% note %}}
There are differing interpretations of what EMI and EMC stand for, be wary when reading articles (including this one!).
{{% /note %}}

There are two ways to test a device:

* **Emissions testing:** How much electromagnetic noise a device is emitting, and making sure it is under certified limits so that it does not prevent nearby equipment from working.
* **Susceptibility (immunity) testing:** Making sure the device works with certified amounts of electromagnetic noise present in the both the surrounding atmosphere (EMI) and cabling (EMC).

EMC testing involves spectrometers, antennas, radio frequency cabling/connectors and very specific test setups (including shielded or anechoic chambers). It can be very expensive to get a device certified (especially if it fails the first time!), and therefore pre-compliance testing is usually used to pre-validate devices before official testing begins.

Reduce these levels requires careful circuit design, in both the components used, the layout, the number of layers, and shielding.

## Standards

### FCC Part 15

Part 15 is a section of the document _Title 47 of the Code of Federal Regulations_ titled _Radio Frequency Devices_ (47 CFR § 15), written by the FCC. It sets out standards for the amount of electromagnetic emissions an _unlicensed_ device can emit. It is available for free online at https://www.ecfr.gov/current/title-47/chapter-I/subchapter-A/part-15.

The FCC defines the following types of radiators[^bib-fcc-equipment-authorization-rf-device]:

* **Incidental radiator:** A device that is designed not to use or generate any signals over 9kHz and cause radio interference. Things such as AC/DC motors and mechanical switches fall into this category. Covered in Part 15, Subpart A
* **Unintentional radiator:** A device which contains signals between 9kHz-3THz but does not intentionally radiate the signals. Pretty much all digital circuitry these days will contains signals in the band, e.g. a microcontroller running at a clock speed of 8MHz. Covered in Part 15, Subparts B and G.
* **Intentional radiator:** A device which has been designed to emit electromagnetic radiation, e.g. a Bluetooth device. Covered in Part 15, Subpart C through F and H.

The FCC also groups devices into two classes[^bib-sunfire-fcc-part-15]:

* **Class A**: Devices used in industrial or commercial settings which are not marketed for use in a residential house or by the general public. Not as restrictive as Class B.
* **Class B**: Devices marketed for primary use in a residential environment and for general use by the public. _Class B_ has more restrictive conductive and radiated limits the device must meet.

The EMC limits for Class A devices are higher (more relaxed) than they are for Class B.

#### FCC Part 15 Conductive Limits for Unintentional Radiators

For Class A unintentional radiators the voltage that is conducted back onto the AC mains must not exceed the following limits. Part 15 only cares about the frequency range of 150kHz at 30MHz, and the voltages are as measured by a 50uH/50Ω LISN from each live wire to ground. These are from FCC Part 15 section [15.107 Conductive Limits](https://www.ecfr.gov/current/title-47/section-15.107).

<table>
  <thead>
    <tr>
      <th rowspan="2">Frequency of emission (MHz)</th>
      <th colspan="2">Conducted limit (dBuV)</th>
    </tr>
    <tr>
      <th>Quasi-peak</th>
      <th>Average</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0.15-0.5MHz</td>
      <td>79dBuV</td>
      <td>66dBuV</td>
    </tr>
    <tr>
      <td>0.5-30MHz</td>
      <td>73dBuV</td>
      <td>60dBuV</td>
    </tr>
  </tbody>
</table>

Reminder: To convert from dBuV to uV, use the equation:

<p>\begin{align}
\large
uV = 10^{\frac{dBuV}{20}} \cdot 1uV
\end{align}</p>

For example, `\(79dBuV = 8913uV = 8.9mV\)`.

For everything but Class A devices (i.e. Class B, it's the only other class), the following conductive limits apply:

<table>
  <thead>
    <tr>
      <th rowspan="2">Frequency of emission (MHz)</th>
      <th colspan="2">Conducted limit (dBuV)</th>
    </tr>
    <tr>
      <th>Quasi-peak</th>
      <th>Average</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0.15-0.5MHz</td>
      <td>66 to 56dBuV*</td>
      <td>56 to 46dBuV*</td>
    </tr>
    <tr>
      <td>0.5-5MHz</td>
      <td>56dBuV</td>
      <td>46dBuV</td>
    </tr>
    <tr>
      <td>5-30MHz</td>
      <td>60dBuV</td>
      <td>50dBuV</td>
    </tr>
  </tbody>
</table>

Ranges marked with `*` vary linearly between the two values on a plot of uVdB vs. log(frequency) across the specified frequency range.

#### FCC Part 15 Radiative Limits for Unintentional Radiators

FCC Part 15 imposes the following radiative limits on Class A and Class B unintentional radiators, as per [§ 15.109 Radiated emission limits](https://www.ecfr.gov/current/title-47/chapter-I/subchapter-A/part-15/subpart-B/section-15.109) (notice the different measurement distances):

<table>
  <thead>
    <tr>
      <th>Frequency of emission</th>
      <th>Field Strength, Class A @ 10m</th>
      <th>Field Strength, Class B @ 3m</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>30-88MHz</td>
      <td>90uV/m</td>
      <td>100uV/m</td>
    </tr>
    <tr>
      <td>88-216MHz</td>
      <td>150uV/m</td>
      <td>150uV/m</td>
    </tr>
    <tr>
      <td>216-960MHz</td>
      <td>210uV/m</td>
      <td>200uV/m</td>
    </tr>
    <tr>
      <td>>960MHz</td>
      <td>300uV/m</td>
      <td>500uV/m</td>
    </tr>
  </tbody>
</table>

{{% note %}}
The field strength for Class B (residential) is measured at 3m whilst Class A (industrial/commercial) is measured at 10m, so whilst the uV/m can be similar, the shorter Class B distance is more restrictive.
{{% /note %}}

The bandwidth (frequency range) you have to measure depends on complicated set of rules specified in [§ 15.33 Frequency range of radiated measurements](https://www.ecfr.gov/current/title-47/chapter-I/subchapter-A/part-15/subpart-A/section-15.33). In general, expect to measure from 9kHz up to the 2-5th harmonic of your highest operating frequency (including digital clock signals).

Instead of these radiative limits above, the FCC allows you to use the CISPR 22 limits if you so choose:

> As an alternative to the radiated emission limits shown in paragraphs (a) and (b) of this section, digital devices may be shown to comply with the standards contained in Third Edition of the International Special Committee on Radio Interference (CISPR), Pub. 22, “Information Technology Equipment - Radio Disturbance Characteristics - Limits and Methods of Measurement” (incorporated by reference, see § 15.38). -- FCC Part 15: § 15.109 Radiated emission limits.

### CISPR 25

CISPR 25 is a very popular standard that provides limits and measurement techniques for EMC compliance. The standard directly applies to automobiles.

## Pre-compliance Testing

Because official compliance testing is generally expensive, in-house _pre-compliance_ testing is a popular way of gaining confidence the DUT will pass once it is submitted for official testing.

### Software

The [TekBox EMCview software](https://www.tekbox.com/product/emcview-pc-software-emc-compliance-testing/) can control the spectrum analyzer to do multiple sweeps across the frequency range, collate the data, and display the results with comparison/thresholds for the popular EMC standards. It currently supports a range of spectrum analysers from Rigol, Siglent, R&S and others[^bib-tekbox-emcview].

{{% img src="tekbox-emcview-screenshot.png" width="700" caption="Screenshot of the Texbox EMCview software[^bib-tekbox-emcview]. Image © 2021, Texbox." %}}

### LISNs

A _line-impedance stabilization network_ is a vital piece of equipment when performing EMC tests.

Below is an image of a TexBox TBL5016-1 50uH/50R LISN that is designed to work with DC or AC up to 250V (and therefore can be used to perform a FCC conducted emissions test):

{{% img src="tekbox-50uh-lisn-tbl5016-1-photo.png" width="500px" caption="A photo of the TekBox TBL5016-1 50uH/50R LISN." %}}

The internal schematic of this LISN is shown below:

{{% img src="tekbox-50uh-lisn-tbl5016-1-schematic.png" width="700px" caption="The internal schematic of the TekBox LISN shown above." %}}

For DC powered DUTs, you will need one LISN for the positive power supply line and one LISN for the negative/ground power supply line. For AC powered DUTs, you similarly need one LISN per wire, so:

* Single phase: 1 LISN on the live, 1 LISN on the neutral.
* Three phase: 1 LISN on each phase.

**Why are some LISNs 50uH and others 5uH?**

A LISN inductance of 50 µH represents the inductance of power distribution wiring running for approximately 50m, which is a good approximation for most mains powered devices. Automobile standards usually specify a LISN inductance of 5uH because this more closely represents the inductance in the power wires in a car[^bib-analog-ic-tips-emi-comparison].

### Attenuators

_Attenuators_ are devices which reduce the power of a signal without distorting the waveform. A note, for what is little-more than a well-tuned and shielded resistor divider, RF-rated attenuators can be expensive (US$100+)!

### Transient Limiters

_Transient limiters_ are another level of protection to a spectrum analyzer above and beyond what a simple attenuator can provide. They are commonly used whilst performing conducted EMI measurements using a LISN. `10dB` of flat in-band attenuation is common, across a frequency range of 9kHz to 30MHz. Maximum input is typically somewhere between +-10-20V DC at 2-5W of continuous power. N-type connectors are typically provided for the input and output.

{{% img src="lit-930a-transient-limiter-freq-response.png" width="600" caption="Frequency response of the LIT-930A transient limiter by Com-Power[^bib-com-power-lit-930a-ds]. Graph shows a flat 10dB attenuation across the pass-band between 9kHz and 30MHz. Image © Com-Power." %}}

## Peak, Quasi-Peak And Averages

TODO: Add info.

## References

[^bib-com-power-lit-930a-ds]: : Com-Power. _Transient Limiters: LIT-153A and LIT-930A (Datasheet)_. Retrieved 2021-11-11, from https://www.com-power.com/uploads/pdf/LIT-930A-1.pdf.
[^bib-tekbox-emcview]:  Texbox. _EMVView PC Software For EMC Pre-Compliance Testing_. Retrieved 2021-11-11, from https://www.tekbox.com/product/emcview-pc-software-emc-compliance-testing/.
[^bib-fcc-equipment-authorization-rf-device]: FCC. _Equipment Authorization – RF Device_. Retrieved 2022-06-03, from https://www.fcc.gov/oet/ea/rfdevice.
[^bib-sunfire-fcc-part-15]: Tim Payne. _What Is FCC Part 15 Testing?_. Sunfire Testing. Retrieved 2022-06-03, from https://sunfiretesting.com/What-Is-FCC-Part-15-Testing/.
[^bib-tekbox-tbl5016-1-manual]: TekBox. _TBL5016-1: 50µH Line Impedance Stabilisation Network (manual)_. Retrieved 2022-07-18, from https://www.tekbox.com/product/TBL5016-1_LISN-Manual.pdf.
[^bib-analog-ic-tips-emi-comparison]: Timothy Hegarty (2021, April 2). _A comparison of EMI test setups and specifications for automotive, industrial and defense applications, part 1: conducted emissions_. Analog IC Tips. Retrieved 2022-07-18, from https://www.analogictips.com/a-comparison-of-emi-test-setups-and-specifications-for-automotive-industrial-and-defense-applications-part-1-conducted-emissions/.

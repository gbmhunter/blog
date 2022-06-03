---
authors: [ Geoffrey Hunter ]
date: 2011-09-05
draft: false
lastmod: 2022-06-03
tags: [ electrical compliance, compliance, EMI, EMC, attenuators, transient limiters, anechoic, TekBox, EMCview, FCC, Part 15, radiator ]
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

* **Class A**: Devices used in industrial or commercial settings which are not marketed for use in a residential house or by the general public.
* **Class B**: Devices marketed for primary use in a residential environment and for general use by the public.

The EMC limits for Class A devices are higher (more relaxed) than they are for Class B.

## Pre-compliance Testing

Because official compliance testing is generally expensive, in-house _pre-compliance_ testing is a popular way of gaining confidence the DUT will pass once it is submitted for official testing.

### Software

The [TekBox EMCview software](https://www.tekbox.com/product/emcview-pc-software-emc-compliance-testing/) can control the spectrum analyzer to do multiple sweeps across the frequency range, collate the data, and display the results with comparison/thresholds for the popular EMC standards. It currently supports a range of spectrum analysers from Rigol, Siglent, R&S and others[^bib-tekbox-emcview].

{{% img src="tekbox-emcview-screenshot.png" width="700" caption="Screenshot of the Texbox EMCview software[^bib-tekbox-emcview]. Image © 2021, Texbox." %}}

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

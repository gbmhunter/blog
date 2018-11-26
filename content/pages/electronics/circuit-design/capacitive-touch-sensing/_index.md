---
author: gbmhunter
date: 2012-01-09 09:49:05+00:00
draft: false
title: Capacitive Touch Sensing
type: page
url: /electronics/circuit-design/capacitive-touch-sensing
---

# Overview

Capacitive touch sensing is a relatively new interface method for electronics, which probably owes at least some of it's popularity with the iPhone (although capacitive touch interfaces did exist a long time before them).

# Types Of Interfaces

* Buttons
* Sliders
* Wheels

# Detection Methods

There are two main methods, single and differential.

{{< figure src="/images/2012/01/cap-sense-button-diagram-cypress.jpg" width="395px" caption="How simple cap sense buttons work."  >}}

# Detection Limits

Most capacitance detection hardware has VERY good resolution and can detect capacitance changes as small as or less than one femto-Farad (that's 1x10^-15F). Considering a finger coming close to a copper pad increases the resistance by about 1pF (1x10^-12F), this can detect changes a 1000 times smaller!

# Buttons

The button footprint can vary between the designs. One of the easiest is simply a copper circle (typically around 10mm in diameter).

{{< figure src="/images/2012/01/atmel-recommended-cap-button-shape.jpg" width="430px" caption="A recommended cap button shape by Atmel. Image from atmel.com."  >}}

# ESD Protection

ESD protection can be important in certain applications due to the human body getting very close to the capacitive touch pads, which can capacitively couple static into the system. However careful consideration must be taken in what ESD protection is employed as to not affect the circuits operation. In general, TVS diodes are unacceptable as theri parasitic capacitance and leakage currents greatly reduce the button sensitivity. Series resistors are a much better option (between 50 and 200R).

The Silicon Labs application note [AN376](http://www.silabs.com/Support%20Documents/TechnicalDocs/AN376.pdf) explains this in greater detail.

# Manufacturers

The Cypress range of PSoC micro-controllers have in-built hardware to support self-capacitance touch sensoring.

Analog Devices make a range of stand-alone capacitance sensing chips that use mutual capacitance and range from 12 to 24-bit.

# Useful Links

Physical Design And Layout Guidelines For Capacitive Sensor Systems (SMSC) - [http://www.smsc.com/media/Downloads/Application_Notes/an1916.pdf](http://www.smsc.com/media/Downloads/Application_Notes/an1916.pdf)

Capacitive Touch Sensing Layout Guidelines (Semtech) - [http://www.semtech.com/images/datasheet/capacitive-touch-sensing-layout-guidelines-an.pdf](http://www.semtech.com/images/datasheet/capacitive-touch-sensing-layout-guidelines-an.pdf)

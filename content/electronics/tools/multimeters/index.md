---
author: "gbmhunter"
categories: [ "Electronics", "Tools" ]
date: 2020-07-15
description: "Info on multimeters."
draft: false
lastmod: 2020-07-15
tags: [ "electronics", "tools", "multimeters", "low-impedance voltage measurements", "Fluke", "ghost voltages", "noise", "capacitive coupling" ]
title: "Multimeters"
type: "page"
---

## Overview

Multimeters are multi-purpose electrical measurement devices used by both electricians and electronics engineers (among other disciplines).

Some multimeters are designed for electricians (people who deal primarily with 240VAC), which are not as suitable for electronics engineers.

## Ghost Voltages (Low-Impedance Voltage Measurements)

Typically, voltage measurements are done at the highest-impedance achievable (`\( >1M\Omega \)`) by the multimeter so that the multimeter does not effect the circuit it is measuring. However, this can sometimes lead to "ghost voltages". This is when a real but high-impedance voltage is present on a circuit, normally due to the circuit picking up noise from near-by circuits via phenomenon such as capacitive coupling. This voltage, although real, is misleading as it does not represent the voltage a load (or person getting a shock) would actually see. For this reason these voltages are called _ghost voltages_.

Some newer digital multimeters come with a low impedance voltage measurement mode to ignore these ghost voltages. This is especially useful for when working with mains power (115/240VAC) and trying to determine if a voltage on a wire is a significant danger or not. Examples of multimeters which have a low-impedance voltage measurement setting include the [Fluke 117 Digital Multimeter](https://www.fluke.com/en/product/electrical-testing/digital-multimeters/fluke-117).

Older, analogue multimeters are not as susceptible to the ghost voltage problem as they typically have a lower impedance when measuring voltages, normally around `\( 10k\Omega \)`.

Low-impedance mode should not be used when working with sensitive, small-signal circuitry. The low-impedance of the multimeter might draw enough current to disrupt the circuit and will give you incorrect readings.
---
author: gbmhunter
date: 2015-05-08 05:53:31+00:00
draft: false
title: Voltage-Level Translation
type: page
url: /electronics/circuit-design/voltage-level-translation
---

# Overview

Voltage-level translation refers to the conversion to digital logic signals from one voltage level (e.g. +3.3V) to another (e.g. +5.0). It is commonly used to provide communication capability between two ICs which are operating of a different voltage rail.

Do not confuse voltage-level translation with voltage converters (e.g. linear regulators or SMPS) which are designed to provide power.

# Discrete MOSFETs

The below schematic shows a simple circuit for voltage-level translation using a single MOSFET and pull-up resistors. It supports bi-directional digital signal translation.

{{< figure src="/images/2015/05/schematic-of-voltage-level-translation-with-a-mosfet.png" width="660px" caption="An example schematic of bi-directional voltage-level translation using a MOSFET."  >}}

**What happens if \(V_{low}\) is driven?**

If `\(V_{low}\)` is driven high, then the gate-source voltage of the N-channel MOSFET (`\(V_{GS}\)`) is `\(0V\)`, and the MOSFET is OFF. This means that `\(V_{high}\)` is pulled high by its `\(10k\Omega\)` resistor.

If `\(V_{low}\)` is driven low, then the gate-source voltage of the N-channel MOSFET (`\(V_{GS}\)`) is now `\(+3.3V\)`, and the MOSFET is ON. This means that `\(V_{high}\)` is driven LOW through the MOSFET.

**What happens if \(V_{high}\) is driven?**

If `\(V_{high}\)` is driven high, the body-diode of the MOSFET will be reverse-biased, and OFF. This means that the source of the MOSFET will be pulled to `\(+3.3V\)` by the `\(10k\Omega\)` resistor, (`\(V_{GS}\)`) will be `\(0V\)`, the MOSFET OFF, and `\(V_{low}\)` also high because of it's `\(10k\Omega\)` resistor.

If `\(V_{high}\)` is driven low, the body-diode of the MOSFET will be forward-biased, and switch ON. This will start pulling `\(V_{low}\)` to ground plus the forward voltage drop of the diode (`\(0V + 0.7V = 0.7V\)`). As the voltage on `\(V_{low}\)` drops, the (`\(V_{GS}\)`) of the MOSFET will start to increase, and the MOSFET will soon turn ON. At this point `\(V_{low}\)` will be driven fully to ground (0V).

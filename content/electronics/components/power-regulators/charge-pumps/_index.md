---
author: "gbmhunter"
date: 2014-12-01
description: "Schematics, advantages/disadvantages to buck converters, uses/applications and more info about charge pumps (a type of SMPS)."
draft: false
lastmod: 2020-12-14
tags: [ "electronics", "components", "power supplies", "charge pumps", "SMPS", "switch-mode power supplies", "op-amps", "MOSFETs", "buck converters", "LEDs", "drivers", "voltage doublers", "diodes", "schottky", "capacitors", "RS-232", "flying capacitor", "reservoir capacitor", "Dickson charge pump" ]
title: "Charge Pumps"
type: "page"
---

## Overview

A _charge pump_ (also known as a _Dickson charge pump_, _switched capacitor_ circuit, _voltage multiplier_, or _voltage splitter_ when halving the input voltage) is a voltage-converting circuit that **uses capacitors, diodes, and a oscillating switch to move charge from one capacitor to another**. Like a _buck converter_, charge pumps are typically used to produce an output voltage which is higher than the input voltage. However, they can also be configured to reduce the input voltage (buck) or invert it.

The basic principle of a charge pump is to **charge capacitors individually (in parallel) from the input voltage, and then connect them in series to provide a higher output voltage**. Whilst this can be done manually or mechanically, almost every practical charge pump circuit uses electronic switches (diodes, MOSFETs, e.t.c) to change between series and parallel connectivity.

Charge Pump                         | Boost Converter
------------------------------------|-------------------
Efficient at low power (<10mA)      | Efficient at high power (>100mA)
Simple circuit, low component count | Complex control, high count/bulky components
Low noise                           | High noise

A single capacitor/diode configuration (with additional smoothing capacitor on the output) **doubles the input voltage**. Multiple elements can be connected together to create larger voltage increases. Basic charge pumps that double/half the input voltage are called _unregulated_ charge pumps. There are also more advanced _regulated_ charge pumps, which provide a fixed output voltage over a range of input voltages.

_Marx generators_ are similar to charge pumps except they use spark gaps instead of diodes as the switching elements. Marx generators are typically used for high voltage/high power applications.

## How It Works

In charge pump designs in which both legs of the capacitor are switched to different parts of the circuit at the same time, the capacitors are called _flying capacitors_, named because both their leads are for a brief moment in time disconnected from the circuit. The capacitor connected across the output load is called the _reservoir capacitor_, _storage capacitor_ or _load capacitor_[^sipex-charge-pump-caps-for-rs-232].

{{% img src="charge-pump-voltage-doubler-schematic.png" width="700px" caption="The basic schematic for a voltage doubling charge pump circuit." %}}

Schottky diodes are preferred because of their low forward voltage drop and higher switching speeds.

Larger reservoir capacitances result in longer start-up times, but result in less voltage ripple.

The switching frequency is usually limited to 100-500kHz.

MOSFETs can be wired to behave like a diode and are sometimes used instead of Schottky diodes. However the MOSFET-based charge pumps do not work as well at low voltages due to the large drain-source voltage drops across the MOSFETs.

### Voltage Inverting Charge Pump



## History

The _Greinacher voltage multiplier_ was invented by Swiss physicist Heinrich Greinacher in 1919[^edn-capacitive-voltage-conversion].

John F. Dickson patented what is known as the "Dickson charge pump" in the late 1970's (filed in 1978, patent dated July 22, 1980)[^justia-patents-john-f-dickson]. It is very similar to the Greinacher doubler except it runs of an DC input. It was primarily used to generate programming/rewrite voltages in EEPROM/flash memory ICs.

{{% img src="john-f-dickson-patent-charge-pump-schematic.png" width="600px" caption="A schematic from John F. Dickson's 1978 charge pump patent. Image from https://patentimages.storage.googleapis.com/d5/27/b7/321211f48454c8/US4214174.pdf, retrieved 2020-12-14." %}}

## Uses

### Negative Voltage Bias For Op-Amps

Charge pumps can be used to provide the negative voltage to op-amps. They suit this application since op-amp power supplies typically require little current (1-20mA), and can generate the negative voltage from the main, higher-current, positive power source.

Special charge pumps exist that only produce a very small negative voltage (e.g. -250mV), for providing the negative power supply to rail-to-rail "single-supply" op-amps so that they can output a true 0V. [More on this on the Op-amps page.](/electronics/components/op-amps#rail-to-rail-op-amps)

{{< img src="lm7705-low-noise-negative-bias-voltage-generator-for-op-amp-application-schematic.png" width="409px" caption="The typical application schematic for the Texas Instruments LM7705, a 'Low-Noise Negative Bias Generator' for the negative supply of an op-amp. This allows the op-amp to output true 0V. Image from http://www.ti.com/."  >}}

### LED Drivers

Some LED drivers feature charge pumps to boost the supply voltage to a proper level to drive the LEDs. Charge pumps are usually feature in low power (20mA per channel) LED drivers, that may need to boost say, a +3.3V supply to +4.5V to drive an LED with the correct current. The [NCP1840 8-Channel Charge-Pump I2C LED Driver by On Semiconductor](http://www.onsemi.com/PowerSolutions/product.do?id=NCP1840) is one such example.

### MOSFET Gates

N-channel MOSFETs are typically better performing (lower `\(R_{DS(on)}\)`, larger max. current limit) than P-channel MOSFETs. However, N-channel MOSFETs require a positive gate-source voltage (`\(V_{GS}\)`) to turn them on. This makes it problematic to use them as a high-side switch on a circuit, as you require a voltage on the gate which is higher than the load/input voltage (the load is connected to the source, which is at the same potential as the input voltage when the switch is on).

The most common way to overcome this problem is to use a small charge pump circuit to power the gate. Many buck converters use this trick to use an N-channel rather than a P-channel MOSFET as the switching element.

### RS-232

The RS-232 standard mandates 5-15V `\(V_{OH}\)` and `\(V_{OL}\)` levels. Because most modern day circuits are powered by +3.3 or +5V, charge pumps are commonly used to provide these higher voltage levels. Early RS-232 transceivers used unregulated charge pumps (which just doubled the input voltage), whilst more modern transceivers use regulated charge pumps which provide stable RS-232 logic levels over a range over input voltages.

## References

[^edn-capacitive-voltage-conversion]: <https://www.edn.com/capacitive-voltage-conversion-aka-the-charge-pump/>, retrieved 2020-12-08.
[^sipex-charge-pump-caps-for-rs-232]: <https://www.maxlinear.com/appnote/ani-19_selectingchargepumpcaps_072406_d.pdf>, retrieved 2020-12-14.
[^justia-patents-john-f-dickson]: <https://patents.justia.com/inventor/john-f-dickson>, retrieved 2020-12-14.

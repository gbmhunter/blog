---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Electronic Components, Diodes ]
date: 2011-09-05
description: Info about diodes.
draft: false
lastmod: 2022-04-28
tags: [ electronics, diodes, components, schematic symbols, TVS, ESD, snapback, Semtech ]
title: TVS Diodes
type: page
---

## Overview

TVS (transient voltage suppressor) diodes are used to protect circuit board traces from high voltage spikes. They are designed to be operated in the reverse direction and work by shunting currents when the reverse voltage exceeds the **avalanche breakdown potential**. They are basically **high-power [Zener diodes](/electronics/components/diodes/zener-diodes/)**, and are a specialized form of an _avalanche diode_.

They are part of a family of components used for ESD (electro-static discharge) protection, which also includes Zener diodes (however, ESD is not the only thing Zeners are used for). TVS diodes can handle large amounts of peak power (hundred's or thousands of Watts), but Zeners have a tighter voltage tolerance. TVS diodes have more capacitance than Zeners, which could be detrimental in some circumstances (e.g. when protecting the gate signal on a MOSFET).

They come in either _uni-directional_ or _bi-directional_ flavours. Uni-directional TVS diodes block up to the rated voltage in one direction, and behave like a normal conducting diode in the other. Bi-directional block up to the rated voltage in both directions (good for protecting AC waveforms). Use uni-directional diodes if possible, they are cheaper, and they have much faster turn-on times than their bi-directional counterparts (e.g. 4ps compared to 4ns).

## Schematic Symbol

{{% figure src="tvs-diode-schematic-symbol.svg" width="400" caption="My preferred schematic symbol for a uni-directional TVS diode (or any other type of avalanche diode for that matter). Notice the double bar distinguishing it from a Zener diode symbol." %}}

## Arrays

TVS diodes can be grouped into IC packages called arrays. A typical schematic symbol for a diode array is shown below.

{{% figure src="schematic-symbol-esd-diode-array.png" width="300" caption="The schematic symbol of a diode array, with a common anode connection." %}}

## Important Parameters

### Breakdown Voltage

* Symbol: \(V_{breakdown}\)
* Units: \(V\)

Also called the reverse breakdown voltage. This is the reverse voltage (cathode-to-anode) at which the diode "begins" to conduct. The point at which the diode begins to conduct is usually specified as a fixed current, typically 1mA.

### Rated Power

* Symbol: \(P\)
* Units: \(W\)

The maximum power the TVS diode can dissipate, for a specified time period. Typical values range between 400W-1.5kW.

### Standoff Voltage

* Symbol: \(V_{standoff}\), \(V_{WM}\)
* Units: \(V\)

This is the reverse voltage that the diode can withstand without drawing "any" current. This is one of the most important parameters, as you usually match this voltage to the maximum operating voltage of the wire you are connecting it to. Note that there is a small amount of current drawn at this voltage, this is called the reverse leakage current.

Vishay uses the symbol \(V_{WM}\) to denote the standoff voltage[^vishay-xld5a24ca-ds].

### Leakage Current

The reverse-leakage of TVS diodes decreases as the stand-off voltage increases. Be warned, the leakage current of TVS diodes which have low voltage stand-offs (e.g. <10V), can have large leakage currents! A 5V stand-off TVS diode typically has a reverse-leakage current of around 500uA, but TVS diodes with a stand-off voltage of 10V or higher have a reverse-leakage of 1uA or less. Note that at low stand-off voltages, the leakage current of a bi-directional diode can be double that of a uni-directional diode for the same stand-off voltage.

{{% figure src="leakage-currents-of-tvs-diodes-with-low-standoff-voltage.png" width="1182" caption="Leakage currents of TVS diodes with low stand-off voltages." %}}

For more information, see the [ESD Protection](/electronics/circuit-design/esd-protection) page.

## Reverse Polarity Protection

Unusually, TVS diodes. along with a fuse or other current-limiting device, can act as a **very good reverse-polarity protection mechanism** on inputs to a PCB. They are usually present on a voltage rail input for the primary reason of reducing ESD. However, if the V+ and GND are connected to the PCB the wrong way around, the TVS diode will forward conduct and clamp the voltage to a normally non-destructive 0.7-1.5V. A current-limiting device like a fuse also has to be present to prevent the TVS diode from overheating.

They are especially suited to this role (when considering other diodes) as the are usually built to dissipate large amounts of heat.

{{% figure src="tvs-diode-for-reverse-polarity-protection.png" width="700" caption="A TVS diode (along with a fuse) can also be a good mechanism for reverse-polarity protection." %}}

In the schematic above, the **fuse will quickly blow** if the power supply is connected to the input connector the wrong way around.

## Low Capacitance

There are a family of TVS diodes called low-capacitance (or ultra-low) TVS diodes. They have much less capacitance than standard TVS diodes (typical capacitances are between 0.4-0.9pF), and are designed for protecting high-speed data lines such as those used in USB, HDMI, DisplayPort, and Ethernet communication protocols and also for RF antennas such as GPS, FM radio and NFC antenna lines.

This low capacitance is achieved by adding a forward-biased general purpose diode in series with the usual reverse-biased TVS (zener-style diode). The schematic symbol for a low-capacitance TVS diode is shown below:

{{% figure src="internal-schematic-of-low-capacitance-tvs-diode-annotated.png" width="500" caption="The internal schematic of a low-capacitance TVS diode, showing the forward-biased general purpose diode added in series to greatly reduce the total capacitance of the component." %}}

The forward-biased general purpose diode has a much smaller parasitic capacitance than the zener diode. Because the parasitic capacitances are in series (grey capacitors in diagram), the total capacitance of the component is greatly reduced!

## Snapback Type TVS Diodes

Snapback TVS diodes are a type of TVS diode in which the clamping voltage right after triggering is less than the trigger voltage (a form of foldback). This is to provider a harder "turn-on" characteristic and results in the voltage not creeping as far above the reverse standoff voltage than with a conventional TVS. Snapback can either be _shallow_ or _deep_, depending on the application. Shallow snapback can be achieved with a standard TVS diode connected in parallel with a BJT. Deep snapback can be achieved with a self-triggering thyristor circuit[^semtech-tvs-just-a-diode-part-2].

{{% figure src="vishay-snapback-tvs-typical-vi-curve-vs-standard-tvs.png" width="900px" caption="Excerpt from Vishay document showing the V/I curve of a snapback TVS vs. a conventional TVS[^vishay-did-you-know-snapback]." %}}

The [Vishay XLD5A24CA](https://www.vishay.com/docs/87199/xld5a24ca.pdf) is an example of a snapback TVS from Vishay's XClampR series. Is had a standoff voltage \(V_{WM} = 24V\) and a clamping voltage \(V_C = 18{-}26V\) at \(I_{PPM}=120A\) (\(10/10,000us\) waveform)[^vishay-xld5a24ca-ds]. Note the clamping voltage is much closer to the standoff voltage than a conventional TVS!

## Special-Purpose TVS Diodes

### RS-485 TVS Diodes

TVS diodes built specifically for protecting RS-485 communication protocol bus lines are bi-directional and have two different hold-off voltages to meet the RS-485 spec. They normally include the character sequence "SM712" in their part name (e.g. SM712-02HTG by Littelfuse and SM712-TP by Micro Commerical).

{{% figure src="sm712-02htg-rs485-tvs-diode-pinout-and-functional-block-diagram.png" width="500" caption="The pintout and functional block diagram of the SM712-02HTG TVS diode, designed specifically for protecting RS-485 bus lines. Image from http://www.littelfuse.com/~/media/electronics/datasheets/tvs_diode_arrays/littelfuse_tvs_diode_array_sm712_datasheet.pdf.pdf." %}}

More information on these diodes can be found in the [Specialised TVS Diodes section on the RS-485 Protocol page](/electronics/communication-protocols/rs-485-protocol#specialised-tvs-diodes).

## References

[^semtech-tvs-just-a-diode-part-2]: Bill Russell (2020, Mar 18). _TVS? It’s Just a Diode, Right? Part Two_. Semtech. Retrieved 2023-05-30, from https://blog.semtech.com/tvs-its-just-a-diode-right-part-two.
[^vishay-did-you-know-snapback]: Vishay (2022). _Did you know? - Industry-first Snapback Type XClampR™ TVS_. Retrieved 2023-05-30, from https://www.vishay.com/docs/48799/ms26900578_did_you_know-xclampr_tvs.pdf.
[^vishay-xld5a24ca-ds]: Vishay (2022, Dec 1). _XLD5A24CA - Surface Mount XClampRTM Transient Voltage Suppressors (datasheet)_. Retrieved 2023-05-30, from https://www.vishay.com/docs/87199/xld5a24ca.pdf.

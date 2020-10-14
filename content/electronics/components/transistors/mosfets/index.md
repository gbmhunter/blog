---
author: "gbmhunter"
categories: [ "Electronics", "Components" ]
date: 2011-09-03
description: "Schematic symbol, important parameters, leakage currents, failure modes, thermal stability, dead-time, FGMOS and more info about MOSFETs."
draft: false
lastmod: 2020-10-14
tags: [ "MOSFETs", "transistors", "field-effect transistors", "metal oxide semiconductors", "schematics", "electronics", "switches", "inverters", "H-bridges", "half-bridges", "switch-mode", "substrate bias effect", "floating-gate MOSFETs", "FGMOS", "EEPROM", "flash memory", "drain", "source", "gate", "split-gate", "SOA diagram" ,"safe operating area", "thermal limits", "Spirito effect" ]
title: "MOSFETs"
type: "page"
---

## Overview

A _MOSFET_ (big breath now...it stands for..._Metal-Oxide-Semiconductor Field-Effect-Transformer_) is a **three-pin active semi-conductor device**, used frequently in electronics design. In the most basic sense, they can be thought of as a **voltage controlled switch** that can turn things on and off (or partially on!).

MOSFETs should not be confused with similar but different semiconductor devices such as _MODFETs_ (modulation-doped FETs) or _MESFETs_ (metal-semiconductor FETs).

## Uses

* Basic electric switches (turn a load on/off)
* Totem-pole drivers
* {{% link text="H-bridges" src="/electronics/circuit-design/h-bridges" %}}
* 3-Phase Inverters
* Current regulating shunts (with feedback)
* {{% link text="Switch-mode PSUs" src="/electronics/components/power-regulators" %}}

## Schematic Symbol

The following image shows the schematic symbol and pin names for both an N-channel and P-channel MOSFET.

{{< img src="mosfet-schematic-symbols-n-ch-p-ch.png" caption="The schematic symbol and pin names for both an n-channel and p-channel MOSFET." width="400px" >}}

## Important Parameters

Note that with all voltage parameters that mention two pins of a MOSFET (e.g. `\( V_{DS(max)} \)`), the voltage is measured with respect to the second pin (e.g. source). This would be the same as connecting the red probe of a multimeter to the drain, and the black probe to the source.

Sorted by alphabetical order, including subscripts.

<table>
  <thead>
    <tr>
      <th>Symbol</th>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>\(R_{DS(on)}\)</td>
      <td>On-state drain-source resistance.</td>
      <td>The resistance between drain and source when the MOSFET is turned on. Usually around 1-10Ω for smaller MOSFETs, and can be as low as 1m for larger power MOSFETs.</td>
    </tr>
    <tr>
      <td>\(V_{DS(max)}\)</td>
      <td>Maximum drain-source voltage.</td>
      <td>The maximum allowed voltage between the drain and source. A higher voltage can cause the MOSFET to breakdown.</td>
    </tr>
    <tr>
      <td>\(V_{GS(max)}\)</td>
      <td>Maximum gate-source voltage</td>
      <td>The maximum allowed gate-source voltage. Voltages above this may destroy the MOSFET due to gate punch-through.</td>
    </tr>
    <tr>
      <td>\(V_{GS(th)}\)</td>
      <td>Threshold voltage.</td>
      <td>The voltage between the gate-source at which the MOSFET begins to turn on.  The point at which it "begins to turn on" is defined by the manufacturer and should be mentioned in the datasheet.</td>
    </tr>
  </tbody>
</table>

## How To Use Them?

The amount of current through the drain-source in controlled by a voltage on the gate. To make a basic switch, you can insert an N-Channel MOSFET between the load and ground. The source is connected to ground, and the drain to the negative terminal of the load. If the gate is given 0V (aka connected to ground), the switch will be off. If significantly more than `\(V_{GS(th)}\)` is applied to the gate, the MOSFET will fully turn on (conduct current), and the load will get power.

P-channels work in a similar manner to N-channels, the difference being that a negative `\(V_{GS}\)` has to be applied to turn them off (that is, the voltage on the gate has to be less than that on the source). This results in them commonly being used for high-side switching, in where the source is connected to Vcc, the drain to the load, and the gate voltage pulled low to turn it on, or pulled-up to `\(V_{cc}\)` to turn it off.

**In any case, do not leave the MOSFET gate floating**. Since it has a very high impedance input, if the gate is not driven, then noise can change the voltage on the gate, and cause the MOSFET to conduct/have undefined behaviour.

The above examples describing switching a MOSFET from it's fully off state to it's fully on state. But if you apply a `\(V_{GS}\)` at or just above `\(V_{GS(th)}\)`, the MOSFET will only partially turn on. You are now operating the MOSFET in it's _linear_ region.

{{% note %}}
The _linear_ region of a MOSFET is a very confusing term, and can **completely switch (ha, switch...get it?) meaning depending on the literature your're reading**! Let's now avoid confusion by calling the region when the MOSFET is partially on the _ohmic_ region, and the region when the MOSFET is fully on the _saturation_ region. For more discussion on this confusion, see this [StackExchange Electrical Engineering thread](https://electronics.stackexchange.com/questions/76071/meaning-of-mosfet-linear-region-in-the-context-of-switching-losses).
{{% /note %}}

## Leakage Current

Leakage current is an important parameter to consider when you are using the MOSFET for switching on-and-off other circuitry in a low power design. MOSFET have both a gate-to-source and a drain-to-source leakage current. Typically the drain-to-source leakage current is 10x greater than the gate-to-source leakage current. The drain-to-source leakage current increases greatly with an increase in temperature. Typical values at 25°C are 100nA for the gate-to-source leakage current and 1uA for the drain-to-source leakage current.

If you need lower leakage currents that what you can achieve with a MOSFET, try using a J-FET. They have typical leakage currents of 1-10nA.

## Failure Modes

There are three ways in which a MOSFET can generally fail:

* Gate punch-through: Occurs when a large voltage spike appears on the gate that exceeds the maximum gate-source voltage (typically 10-20V). It punches a hole in the weak oxide layer.
* The drain-source voltage exceeds the rated maximum
* Overheating

To prevent over-voltage failure's, TVS diodes, Zener diodes, or snubber circuits can be used to protect the pins. TVS and Zener diodes are the most common ways to do this, and are used to clamp the voltages to a safe level.

Almost always, a MOSFET will short out the drain and source when it fails. This mean the MOSFET goes into conduction, and can destroy even more circuitry! Either make sure that your MOSFET won't fail, or take precautions against large currents if it does. I experienced plenty of MOSFET failures when designing the half-bridge for the [Electric Skateboard project](/electronics/projects/electric-skateboard)).

## Thermal Stability

The drain-source resistance of a MOSFET increases with an increase in temperature (a BJT behaves in the opposite manner, it's collector-emitter resistance decreases with an increase in temperature).

This means that MOSFETs can share current with each other easily. The positive temperature-to-resistance coefficient creates a self-balancing current mechanism for MOSFETs connected in parallel. Just make sure each MOSFET has its own gate drive resistor! Directly connected MOSFET gates can cause weird oscillation problems.

## Dead-Time

Dead-time is a technique which is commonly applied to MOSFET driving when the MOSFETs are in a H-Bridge (or half-bridge) configuration. Dead-time is the time between when one MOSFET(s) is turned off and another MOSFET(s) is turned on. It is used to prevent **shoot-through**, which is when two MOSFETs on the same leg of a H-bridge are on at the same time, creating a direct short between `\(V_{cc}\)` and `\(GND\)`. Shoot-through occurs because of the turn-off delay time of a MOSFET.

## Turn On/Turn Off Times

In precise pulse-drive situations, it is desirable for the MOSFET to have similar turn-on and turn-off times. This is so the output pulse, although delayed by these parameters, has roughly the same width as the input pulse to the gate. This is important in applications such as laser range-finding.

## Different MOSFET Construction Methods And Industry Names

### FinFETs

FinFETs are multi-fin FETs which overcome issues once MOSFET approach very small sizes (such as 22nm).

{{< img src="3d-model-of-the-structure-of-a-multi-fin-finfet.png" caption="The 3D structure of a multi-fin MOSFET (FinFET)."  width="600px" >}}

### FRFET

A trademarked name by Fairchild used to label some of their fast-recovery MOSFETs used in inverter and [BLDC controller](/electronics/circuit-design/bldc-motor-control) design

### Lateral MOSFETs

### PROFET

A name (it stands for protected-FET) used by [Siemens](http://www.siemens.com) and now [Infineon](http://www.infineon.com) to describe power MOSFETs with built in logic circuitry for "smart switches", designed for controlling current and voltage into a load. An document about PROFETs from Infineon can be found [here](http://www.infineon.com/dgdl?folderId=db3a30431400ef68011421b54e2e0564&fileId=db3a304332d040720132f7151b4a7955).

### Trench MOSFETs

Trench MOSFETs give a very low `\( R_{DS(on)} \)` per unit silicon area.

## Load Switching

MOSFETs can be used for load switches, as shown on the [Load Switches page](/electronics/circuit-design/power-management/load-switches/). They can be used in a back-to-back configuration for creating AC solid-state relays (SSRs).

## Isolated Gate Drives

One problem with MOSFETS (well, with any switched semiconductor) is dealing with the gate drive when either:

* A) The source voltage is not constant or at a point where the gate-source voltage for turn-on is not easy to achieve
* B) The MOSFET is dealing with large voltages and so electrical isolation between the load and the drive circuitry is desired/required (normally by law)

In these cases, the gate drive has to be **isolated**.

[IRF - Application Note AN-937 - Gate Drive Characteristics And Requirements for HEXFET Power MOSFETs](http://www.irf.com/technical-info/appnotes/an-937.pdf) is a great article on isolated gate drive techniques.

## Internal Diodes

Because any PN junction is inherently a diode, a regular MOSFET has two of them.

One of the diodes is removed when the substrate is connected to the source.

## The Internal BJT

So know we know that MOSFETs naturally have two internal diodes, did you know they also contain a BJT. The source-substrate-drain layers form either an NPN or PNP BJT. You don't normally have to worry about this "parasitic" element.

CMOS devices have PNPN structures. This forms a parasitic thyristor, which can cause latchup.

## The Body Effect (aka The Substrate Bias Effect)

The body effect (also known as the _Substrate Bias Effect_) of a MOSFET describes how the threshold voltage of a MOSFET, `\(V_{TH}\)` is affected by the voltage difference between the substrate and source, `\(V_{SB}\)`. Because the source-to-body voltage can effect the threshold voltage, it can be thought of as a second gate, and the substrate sometimes called the _back gate_, and this effect called the _back-gate effect_.

Note that most discrete MOSFETs that you can buy internally tie the substrate to the source, meaning `\(V_{SB} = 0V\)`. This prevents any body effect from occurring.

Do you want the huge equation that tells you how the threshold voltage changes? Here you go:

<p>$$ V_{TN} = V_{TO} + \gamma (\sqrt{|V_{SB} + 2\phi_F|} - \sqrt{|2\phi_F|}) $$</p>

<p class="centered">
    where:<br>
    \(V_{TN}\) = the threshold voltage with substrate bias present [Volts]<br>
    \(V_{TO}\) = the threshold voltage for zero substrate bias [Volts]<br>
    \(\gamma\) = the body effect parameter<br>
    \(V_{SB}\) = the source to body (substrate) voltage [Volts]<br>
</p>

## The Substrate (Body) Connection

Standard MOSFETs actually have four, not three, electrical connection points. However most discrete MOSFET components only provide 3 leads from the package. This is because the substrate (body) lead, is normally connected internally to the source (as mentioned above in the _The Body Effect_ section), so you only get three external connections (_Gate_, _Source/Substrate_, and _Drain_).

{{% note %}}
There are other types of specialty MOSFETs which have even more pins, such as current-measurement MOSFETs.
{{% /note %}}

{{< img src="mosfet-four-terminal-internal-diagram.gif" width="311px" caption="Internal diagram of a MOSFET showing the four connections, including the substrate (body) pin. Image from http://www.muzique.com/news/mosfet-body-diodes/." >}}

Another interesting note is that without the connection of the substrate to the source, the MOSFET source and drain connections would be identical, and there would be no need to separately identify them

**Q. Why is the substrate normally connected to the source?**

A. Because when it isn't, a MOSFET becomes much harder to use. If the substrate is not connected to the source, you have to consider the _body effect_. It is easier/better to connect the substrate to ground internally (less connection resistance, one less lead, e.t.c) rather than to leave it up to the circuit designed to connect it externally. Manufacturers of ICs with integrated MOSFETs may choose to connect the substrate to something else. A common choice is ground.

The 3N163 is an example of a MOSFET which provides you with a fourth pin for the substrate connection.

{{< img src="3n163-mosfet-drawing-with-substrate-connection.png" width="348px" caption="A drawing of the 3N163 P-channel MOSFET, which has a fourth leg for the substrate connection (C). Image from http://pdf1.alldatasheet.com/datasheet-pdf/view/123459/CALOGIC/3N163.html." >}}

You may also note that some IC designs do not connect the substrate to the source. The TPS2020 load switch by Texas Instruments is one example. You can see in the diagram below that the substrate pin is connected to ground. I'm not entirely sure why, but it might have something to do with the devices ability to block reverse current. Normally this is achieved with back-to-back MOSFETs, but this diagram almost suggests that they pull it off using only the one MOSFET.

{{< img src="tps2020-functional-diagram-with-mosfet-body-grounded-annotated.png" width="611px" caption="Functional block diagram of the TPS2020 load switch. Note how the substrate of the MOSFET (top middle) is not connected to the source, but instead connected to ground. Image from http://www.ti.com/lit/ds/symlink/tps2020.pdf." >}}

Interestingly, the block diagram for the [NCP380 high-side load switch by On Semiconductor](http://www.onsemi.com/pub_link/Collateral/NCP380-D.PDF) may shed more light on this matter. Notice how in the image below, the substrate of the MOSFET is connected to two switches, which can either connect it to the input or the output.

{{< img src="ncp380-ncv-380-load-switch-internal-block-diagram-with-reverse-current-protection.png" width="711px" caption="A functional diagram of the NCP380 high-side load switch. Note the switches connected to the MOSFET substrate which show how reverse-current protection is performed." >}}

## The Transconductance Of A MOSFET

The transconductance of a MOSFET is the ratio of a change in output current (drain-source current, `\(I_{DS}\)`) due to the change in input voltage (gate-source voltage, `\(V_{GS}\)`) over an arbitrarily small range of operation.

The range of operation has to be restricted because the transconductance of a MOSFET changes depending on the operating point.

## Spice Model

Information about the MOSFET Spice model can be found on the [Altium Simulation page](/electronics/general/altium/altium-simulation).

## Floating-gate MOSFETs

A _floating-gate MOSFET_ (FGMOS) is a type of MOSFET where the gate is completely isolated. Isolation in this sense refers to no connection via conductive materials such as copper or doped semiconductor. The gate is capacitively coupled to one or more "input gates". Because the gate is isolated (the gate can also be thought of as "floating"), any charge stored on it via the capacitive coupling remains there for a long time. This forms the basis of a _floating-gate memory cell_ which is used to provide the storage in non-volatile memory such as EEPROM and flash. The cell "remembers" the state it was last in, for long periods of time, even when power is removed from the circuit.

**How long will floating-gate MOSFETs retain their charge, if un-powered?** As of 2020, the current mass-produced, consumer grade flash memory devices and SD cards claim to have a memory retention life of approximately 10 years, if left un-powered the entire time (if periodically plugged in, these devices can re-charge and "reset" the 10-year clock).

## Split-Gate MOSFETs

A very critical parameter for a MOSFET is it's on state resistance. The easiest way to reduce this is to increase the doping concentration of the epitaxial layer[^science-direct-split-gate-mosfet]. However this also decreases the breakdown voltage. The _Split Gate_ MOSFET structure is a design that has been developed to allow the on resistance to decrease whilst keeping a high breakdown voltage. Comparing a standard MOSFET with a split-gate MOSFET to which both have the same breakdown voltage, the on resistance of the split-gate MOSFET can be around 50% lower. 

## Part Recommendations

### Small, Low-Voltage, High Current Capability (aka low RDS(on)) and Cheap

PMV45EN - N-Channel MOSFET

Manufacturer: NXP  
Manufacturer Code: PMV45EN  
Element 14 Code: 108-1483  
Element 14 Price: NZ$0.29 (1), NZ$0.25 (100)

The PMV45EN is a low cost, very low RDS(on) N-Channel MOSFET which I use as the work horse for most of my projects. It has an RDS(on) of only 35mOhm and is rated for a current of 5.4A. The maximum drain source voltage is 30V, making it suitable for most embedded, low voltage applications.

## MOSFET Safe Operating Areas

*The section is in notes format and needs tidying up.*

A MOSFET's SOA (_Safe Operating Area_) is usually shown as a graph in the datasheet. The SOA graph shows which combinations of drain-source voltages and drain currents are safe and which will likely damage the MOSFET. The graph takes into account steady-state operating conditions (i.e. infinite DC current) and also pulse operation. Different areas are provided for current pulses of different lengths. SOA graphs are particular important to understand for hot-swap circuits.

Transient thermal impedance plot. This is a plot which shows how the effective thermal impedance of the MOSFET changes with a time-limited pulse of power (voltage x current). The thermal impedance reduces as the pulse period becomes shorter and shorter (these graphs usually show the change between 1us and 1s). 

For moderate `\(V_{DS}\)` voltages, manufacturers determine the lines on the SOA plot from the transient thermal impedance plot.

_Spirito effect_: Named after electronic engineer and professor [Paolo Spirito](https://ieeexplore.ieee.org/author/37282676100) who showed that as MOSFET manufacturers have pushed for lower and lower `\(R_{DS(on)}\)` values, they have also inadvertently increased the tendency for a MOSFET to fail by forming unstable hot spots. Modern-day high-spec MOSFETs are actually made of from an array of MOSFET cells on the silicon with their sources, drains and gates connected in parallel. As some cells become hotter, their threshold voltage decreases relative to the other cells, and then they conduct more current, which can lead to a thermal runaway effect, destroying the MOSFET. High-density trench-style MOSFETs are effected the most[^electronic-design-the-spirito-effect].

The Spirito effect is observed at high Vds voltages and low Id currents. High Vds voltages because this results in a greater change in cell power as the cell current changes. Low Id because this gives the cells more time to thermally runaway -- at higher currents the individual cells do not get a chance to thermally runaway since the entire package quickly hits it's thermal limit.

{{% img src="mosfet-soa-diagram-with-annotations.png" width="700px" caption="A MOSFET SOA (safe operating area) diagram, showing the different limits which bound the area." %}}

1. Rds(on) Limit: When `\(V_{DS}\)` is very low, it means that the MOSFET is driven to saturation, and the MOSFET acts if it has a fixed drain-source resistance, `\(R_{DS(on)}\)`. This gives a linear relationship between voltage and current and is the limit line in the upper-left section of the SOA graph.
1. Package Current Limit: MOSFET datasheets will specify a maximum current, irrespective of the amount of power dissipation. The current limit is driven by physical parts inside the package which are not the silicon MOSFET cell(s), but the surrounding lead wires, bonding clips, e.t.c. This gives the upper-centre horizontal line on the SOA graph.
1. Power Limit: The power limit line is determined by the maximum power dissipation the MOSFET can handle before the junction temperature exceeds it's maximum value (typically between 100-200°C). This line is dependent on the case-to-ambient thermal resistance (which is specific to the PCB/environment the MOSFET is used in!) and ambient temperature, so the best the MOSFET manufacturer can do is assume a sensible value (and hopefully state the assumption in the datasheet).
1. Thermal Instability: Thermal instability occurs at lower `\(V_{GS}\)` voltages[^infineon-mosfet-safe-operating-diagram].
1. Breakdown Voltage Limit: Above a certain drain-source voltage, the MOSFET "breaksdown" and stops working correctly. This puts a hard upper-limit on the `\(V_{DS}\)` voltage, shown by the far right vertical line on the SOA graph.


## External Resources

Fairchild's application note, [AN-558 - Introduction To Power MOSFETs And Their Applications](http://www.fairchildsemi.com/an/AN/AN-558.pdf) is a great resource when using MOSFETs for power applications.

Typical [gate drive waveforms, on richieburnett.co.uk](http://www.richieburnett.co.uk/temp/gdt/gdt2.html).

## References

[^science-direct-split-gate-mosfet]: <https://www.sciencedirect.com/science/article/pii/S2589208820300041>
[^infineon-mosfet-safe-operating-diagram]: <https://www.infineon.com/dgdl/Infineon-ApplicationNote_Linear_Mode_Operation_Safe_Operation_Diagram_MOSFETs-AN-v01_00-EN.pdf?fileId=db3a30433e30e4bf013e3646e9381200>
[^electronic-design-the-spirito-effect]: <https://www.electronicdesign.com/power-management/article/21795492/the-spirito-effect-improved-my-designand-i-didnt-even-know-it#:~:text=Known%20as%20the%20Spirito%20Effect,trench%20devices%20are%20particularly%20impacted>

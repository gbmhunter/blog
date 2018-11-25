---
author: gbmhunter
date: 2011-09-03 02:23:53+00:00
draft: false
title: MOSFET's
type: page
url: /electronics/components/transistors/mosfets
---

[mathjax]

# Overview

A MOSFET is a three-pin active semi-conductor device, used frequently in electronics design. In the most basic sense, they can be thought of as a voltage controlled switch, that can turn things on and off.

MOSFETs should not be confused with MODFETs (modulation-doped FETs) or MESFETs (metal-semiconductor FETs).

# Uses  * Basic electric switches (turn a load on/off)  * Totem-pole drivers  * [H-bridges](http://blog.mbedded.ninja/electronics/circuit-design/h-bridges)  * 3-Phase Inverters  * Current regulating shunts (with feedback)  * Switch-mode PSUs

# Schematic Symbol

The following image shows the schematic symbol and pin names for both an N-channel and P-channel MOSFET.

{{< figure src="/images/electronics-misc/mosfet-schematic-symbols-n-ch-p-ch.png" caption="The schematic symbol and pin names for both an n-channel and p-channel MOSFET." caption-position="bottom" width="400px" >}}

# Important Parameters

Note that with all voltage parameters that mention two pins of a MOSFET (e.g. \(V_{DS(max)}\)), the voltage is measured with respect to the second pin (e.g. source). This would be the same as connecting the red probe of a multimeter to the drain, and the black probe to the source.

Sorted by alphabetical order, including subscripts.

<table style="width: 600px; margin: 0 auto;" ><tbody ><tr >SymbolNameDescription</tr><tr >
<td >\(R_{DS(on)}\)
</td>
<td >On-state drain-source resistance.
</td>
<td >The resistance between drain and source when the MOSFET is turned on. Usually around 1-10Ω for smaller MOSFETs, and can be as low as 1m for larger power MOSFETs.
</td></tr><tr >
<td >\(V_{DS(max)}\)
</td>
<td >Maximum drain-source voltage.
</td>
<td >The maximum allowed voltage between the drain and source. A higher voltage can cause the MOSFET to breakdown.
</td></tr><tr >
<td >\(V_{GS(max)}\)
</td>
<td >Maximum gate-source voltage
</td>
<td >The maximum allowed gate-source voltage. Voltages above this may destroy the MOSFET due to gate punch-through.
</td></tr><tr >
<td >\(V_{GS(th)}\)
</td>
<td >Threshold voltage.
</td>
<td >The voltage between the gate-source at which the MOSFET begins to turn on.  The point at which it "begins to turn on" is defined by the manufacturer and should be mentioned in the datasheet.
</td></tr></tbody></table>

# How To Use Them?

The amount of current through the drain-source in controlled by a voltage on the gate. To make a basic switch, you can insert an N-Channel MOSFET between the load and ground. The source is connected to ground, and the drain to the negative terminal of the load. If the gate is given 0V (aka connected to ground), the switch will be off. If more than \(V_{GS(th)}\) is applied to the gate, the MOSFET will turn on (start conducting), and the load will get power.

P-channels work in a similar manner to N-channels, the difference being that a negative \(V_{GS}\) has to be applied to turn them off (that is, the voltage on the gate has to be less than that on the source). This results in them commonly being used for high-side switching, in where the source is connected to Vcc, the drain to the load, and the gate voltage pulled low to turn it on, or pulled-up to \(V_{cc}\) to turn it off.

In any case, do not leave the MOSFET gate floating. Since it has a very high impedance input, if the gate is not driven, then noise can change the voltage on the gate, and cause the MOSFET to conduct/have undefined behaviour.

# Leakage Current

Leakage current is an important parameter to consider when you are using the MOSFET for switching on-and-off other circuitry in a low power design. MOSFET have both a gate-to-source and a drain-to-source leakage current. Typically the drain-to-source leakage current is 10x greater than the gate-to-source leakage current. The drain-to-source leakage current increases greatly with an increase in temperature. Typical values at 25°C are 100nA for the gate-to-source leakage current and 1uA for the drain-to-source leakage current.

If you need lower leakage currents that what you can achieve with a MOSFET, try using a J-FET. They have typical leakage currents of 1-10nA.

# Failure Modes

There are three ways in which a MOSFET can generally fail:  * Gate punch-through: Occurs when a large voltage spike appears on the gate that exceeds the maximum gate-source voltage (typically 10-20V). It punches a hole in the weak oxide layer.  * The drain-source voltage exceeds the rated maximum  * Overheating

To prevent over-voltage failure's, TVS diodes, zener diodes, or snubber circuits can be used to protect the pins. TVS and zener diodes are the most common ways to do this, and are used to clamp the voltages to a safe level.

Almost always, a MOSFET will short out the drain and source when it fails. This mean the MOSFET goes into conduction, and can destroy even more circuitry! Either make sure that your MOSFET won't fail, or take precautions against large currents if it does. I experienced plenty of MOSFET failures when designing the half-bridge for the [Electric Skateboard project](http://blog.mbedded.ninja/electronics/projects/electric-skateboard)).

# Thermal Stability

The drain-source resistance of a MOSFET increases with an increase in temperature (a BJT behaves in the opposite manner, it's collector-emitter resistance decreases with an increase in temperature).

This means that MOSFET's can share current with each other easily. The positive temperature-to-resistance coefficient creates a self-balancing current mechanism for MOSFET's connected in parallel. Just make sure each MOSFET has its own gate drive resistor! Directly connected MOSFET gates can cause weird oscilllary problems.

# Dead-Time

Dead-time is a technique which is commonly applied to MOSFET driving when the MOSFETs are in a H-Bridge (or half-bridge) configuration. Dead-time is the time between when one MOSFET(s) is turned off and another MOSFET(s) is turned on. It is used to prevent **shoot-through**, which is when two MOSFET's on the same leg of a H-bridge are on at the same time, creating a direct short between \(V_{cc}\) and \(GND\). Shoot-through occurs because of the turn-off delay time of a MOSFET.

The following graph shows the actual gate-drive voltage of two switched MOSFET's with dead-time added (the dead-time has been made quite large in this graph for extra emphasis).

[php]  
include $_SERVER['DOCUMENT_ROOT'] . '/eng-graphs-js/graphs/mosfets/two-mosfet-gate-drives-with-deadtime.php';  
[/php]

# Turn On/Turn Off Times

In precise pulse-drive situations, it is desirable for the MOSFET to have similar turn-on and turn-off times. This is so the output pulse, although delayed by these parameters, has roughly the same width as the input pulse to the gate. This is imporatant in applications such as laser range-finding.

# Industry Names  * FRFET - A trademarked name by Fairchild used to label some of their fast-recovery MOSFETs used in inverter and [BLDC controller](http://blog.mbedded.ninja/electronics/circuit-design/bldc-motor-control) design  * PROFET - A name (it stands for protected-FET) used by [Siemens](http://www.siemens.com) and now [Infineon](http://www.infineon.com) to describe power MOSFETs with built in logic circuitry for "smart switches", designed for controlling current and voltage into a load. An document about PROFETs from Infineon can be found [here](http://www.infineon.com/dgdl?folderId=db3a30431400ef68011421b54e2e0564&fileId=db3a304332d040720132f7151b4a7955).

# FinFET's

FinFET's are multi-fin FET's which overcome issues once MOSFET approach very small sizes (such as 22nm).

{{< figure src="/images/electronics-misc/3d-model-of-the-structure-of-a-multi-fin-finfet.png" caption="The 3D structure of a multi-fin MOSFET (FinFET)." caption-position="bottom" width="600px" >}}

# Load Switching

MOSFET's can be used for load switches, as shown on the [Load Switches page](http://blog.mbedded.ninja/electronics/circuit-design/load-switches). They can be used in a back-to-back configuration for creating AC solid-state relays (SSRs).

# Isolated Gate Drives

One problem with MOSFETS (well, with any switched semiconductor) is dealing with the gate drive when either:  * A) The source voltage is not constant or at a point where the gate-source voltage for turn-on is not easy to acheive  * B) The MOSFET is dealing with large voltages and so electrical isolation between the load and the drive circuitry is desired/required (normally by law)

In these cases, the gate drive has to be **isolated**.

[IRF - Application Note AN-937 - Gate Drive Characteristics And Requirements for HEXFET Power MOSFETs](http://www.irf.com/technical-info/appnotes/an-937.pdf) is a great article on isolated gate drive techniques.

# Internal Diodes

Because any PN junction is inherently a diode, a regular MOSFET has two of them.

One of the diodes is removed when the substrate is connected to the source.

# The Internal BJT

So know we know that MOSFETs naturally have two internal diodes, did you know they also contain a BJT. The source-substrate-drain layers form either an NPN or PNP BJT. You don't normally have to worry about this "parasitic" element.

CMOS devices have PNPN structures. This forms a parasitic thyristor, which can cause latchup.

# The Body Effect (aka The Substrate Bias Effect)

The body effect (also known as the Substrate Bias Effect of a MOSFET describes how the threshold voltage of a MOSFET, \( V_{TH} \) is affected by the voltage difference between the substrate and source, \(V_{SB}\). Because the source-to-body voltage can effect the threshold voltage, it can be thought of as a second gate, and the substrate sometimes called the _back gate_, and this effect called the _back-gate effect_.

Note that most discrete MOSFET's that you can buy internally tie the substrate to the source, meaning \(V_{SB} = 0V\). This prevents any body effect from occuring.

Do you want the huge equation that tells you how the threshold voltage changes? Here you go:

$$ V_{TN} = V_{TO} + \gamma (\sqrt{|V_{SB} + 2\phi_F|} - \sqrt{|2\phi_F|}) $$

where:  
\(V_{TN}\) = the threshold voltage with substrate bias present [Volts]  
\(V_{TO}\) = the threshold voltage for zero substrate bias [Volts]  
\(\gamma\) = the body effect parameter  
\(V_{SB}\) = the source to body (substrate) voltage [Volts]

# The Substrate (Body) Connection

You generic MOSFET's actually have four leads (pins). It's just that one of them, the substrate (body) lead, is normally connected internally to the source, and so you only get three external connections. Note: There are other types of specialty MOSFETs which have even more pins, such as current-measurement MOSFETs.

{{< figure src="/images/2011/09/mosfet-four-terminal-internal-diagram.gif" width="311px" caption="Internal diagram of a MOSFET showing the four connections, including the substrate (body) pin. Image from http://www.muzique.com/news/mosfet-body-diodes/." caption-position="bottom" >}}

The substrate lead is pretty self-explanatory, it is connected to the substrate (body) of the MOSFET.

Another interesting note is that without the connection of the substrate to the source, the MOSFET source and drain connections would be identical, and there would be no need to separately identify them

**Q. Why is the substrate normally connected to the source?**

 A. Because when it isn't, a MOSFET becomes much harder to use. If the substrate is not connected to the source, you have to consider the _body effect_. It is easier/better to connect the substrate to ground internally (less connection resistance, one less lead, e.t.c) rather than to leave it up to the circuit designed to connect it externally. Manufacturers of ICs with integrated MOSFET's may choose to connect the substrate to something else. A common choice is ground.

The 3N163 is an example of a MOSFET which provides you with a fourth pin for the substrate connection.

{{< figure src="/images/2011/09/3n163-mosfet-drawing-with-substrate-connection.png" width="348px" caption="A drawing of the 3N163 P-channel MOSFET, which has a fourth leg for the substrate connection (C). Image from http://pdf1.alldatasheet.com/datasheet-pdf/view/123459/CALOGIC/3N163.html." caption-position="bottom" >}}

You may also note that some IC designs do not connect the substrate to the source. The TPS2020 load switch by Texas Instruments is one example. You can see in the diagram below that the substrate pin is connected to ground. I'm not entirely sure why, but it might have something to do with the devices ability to block reverse current. Normally this is achieved with back-to-back MOSFETs, but this diagram almost suggests that they pull it off using only the one MOSFET.

{{< figure src="/images/2011/09/tps2020-functional-diagram-with-mosfet-body-grounded-annotated.png" width="611px" caption="Functional block diagram of the TPS2020 load switch. Note how the substrate of the MOSFET (top middle) is not connected to the source, but instead connected to ground. Image from http://www.ti.com/lit/ds/symlink/tps2020.pdf." caption-position="bottom" >}}

Interestingly, the block diagram for the [NCP380 high-side load switch by On Semiconductor](http://www.onsemi.com/pub_link/Collateral/NCP380-D.PDF) may shed more light on this matter. Notice how in the image below, the substrate of the MOSFET is connected to two switches, which can either connect it to the input or the output.

{{< figure src="/images/2013/11/ncp380-ncv-380-load-switch-internal-block-diagram-with-reverse-current-protection.png" width="711px" caption="A functional diagram of the NCP380 high-side load switch. Note the switches connected to the MOSFET substrate which show how reverse-current protection is performed." caption-position="bottom" >}}

# The Transconductance Of A MOSFET

The transconductance of a MOSFET is the ratio of a change in output current (drain-source current, \(I_{DS}\)) due to the change in input voltage (gate-source voltage, \(V_{GS}\)) over an arbitrarily small range of operation.

The range of operation has to be restricted because the transcondutance of a MOSFET changes depending on the operating point.

# Spice Model

Information about the MOSFET Spice model can be found on the [Altium Simulation page](http://blog.mbedded.ninja/electronics/general/altium/altium-simulation).

# Part Recommendations

### Small, Low-Voltage, High Current Capability (aka low RDS(on)) and Cheap

PMV45EN - N-Channel MOSFET

Manufacturer: NXP  
Manufacturer Code: PMV45EN  
Element 14 Code: 108-1483  
Element 14 Price: NZ$0.29 (1), NZ$0.25 (100)

The PMV45EN is a low cost, very low RDS(on) N-Channel MOSFET which I use as the work horse for most of my projects. It has an RDS(on) of only 35mOhm and is rated for a current of 5.4A. The maximum drain source voltage is 30V, making it suitable for most embedded, low voltage applications.

# External Resources

Fairchild's application note, [AN-558 - Introduction To Power MOSFET's And Their Applications](http://www.fairchildsemi.com/an/AN/AN-558.pdf) is a great resource when using MOSFETs for power applications.

Typical [gate drive waveforms, on richieburnett.co.uk](http://www.richieburnett.co.uk/temp/gdt/gdt2.html).

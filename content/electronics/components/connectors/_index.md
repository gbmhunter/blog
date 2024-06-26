---
authors: [ "Geoffrey Hunter" ]
date: 2011-09-05
description: "Terminology, types, manufacturers, common usages and more info on electrical connectors."
draft: false
lastmod: 2021-12-03
tags: [ "electronics", "connectors", "electronic components", "circular connectors", "pogo", "TagConnect", "spring-loaded", "socket", "plug", "crimp", "plating", "contacts", "IDC", "insulation displacement connectors", "terminal blocks", "DE-9", "DB-9", "DB-25", "headers", "IEC 60320" ]
title: "Connectors"
type: "page"
---

## Overview

Electrical _connectors_ are physical devices to electrically connect things together. Not only are they used in the traditional sense to connect a [^_wire_to_board_wtb_connectors, wire to a board] (board usually means PCB), but there is a huge number of types to connect wires to wires, boards to boards, wires to panels (panel mount), breakouts, and more. There are specialty connectors for [^_rf_connectors, RF (radio frequency)], high current and high voltage. Connectors can also be characterized by their shape, for example the popular [M8/M12 circular connectors]().

{{% figure src="jst-ph-connector-photo.png" width="400px" caption="Photo of the W2B (wire-to-board) PH 2.0mm pitch connector from JST[^bib-jst-ph-conn]. Image (C) 2021, JST." %}}

This page will hopefully explain the various types of connectors you can purchase and when they should be used in electronic/embedded projects. 

## Connector Manufacturers

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Website</th>
            <th>Range</th>
            <th>Provide 3D Models</th>
            <th>Affordability (1 expensive, 10 cheap)</th>
            <th>Site Usability (1 bad, 10 good)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>3M</td>
            <td>http://www.3m.com/</td>
            <td>Card edge (inc. latching)</td>
            <td>Yes, but not always for all parts in a connector family. (Step, IGES, Parasolid)</td>
            <td>3</td>
        </tr>
        <tr>
            <td>Harting</td>
            <td>http://www.harting.com</td>
            <td>Card edge</td>
            <td>Yes (Step)</td>
            <td>5</td>
        </tr>
        <tr>
            <td>Hirose</td>
            <td>http://www.hirose.com/</td>
            <td>High-end circular</td>
            <td>Yes, after providing your paid-for email address. (Step)</td>
            <td>5</td>
        </tr>
        <tr>
            <td>Molex</td>
            <td>http://www.molex.com</td>
            <td>


Headers


Wire-to-Board


Card edge


</td>
            <td>Yes (Step)</td>
            <td>3</td>
            <td>6</td>
        </tr>
        <tr>
            <td>Samtec</td>
            <td>http://www.samtec.com</td>
            <td>


Backplane


Headers (various pitches, and both square-post and machined)


Rugged circular.


</td>
            <td>Yes (Step)</td>
            <td>7</td>
            <td>8</td>
        </tr>
        <tr>
            <td>TE Connectivity</td>
            <td>http://www.te.com</td>
            <td>Backplane</td>
            <td>?</td>
            <td>6</td>
        </tr>
    </tbody>
</table>

## Tin vs. Gold Plating

Many connectors come to at least two plating options, either tin or gold. Gold is a more expensive option, but offers a lower initial contact resistance, lower corrosion over time, and lower mating force (which may or may not be a good thing).

There is the 50:50:50 rule (taken from www.connector.com, as of **Dec 2017, link no longer alive**) when it comes to deciding which plating to choose. The rule says that tin is the best choice if:

* You have less than 50 contacts (due to the mating force getting too large)
* The connector will experience 50 or less mating cycles
* You can live with 50mOhms of contact resistance over time

Selecting gold tinned contacts can add a good US$0.50 or more to the price of the connector.

Mixing the two plating metals is not recommended! The corrosion rate is greatly increased when two dissimilar metals come into contact with each other (this is due to the difference in the metal's electrode potentials, which is +1.5V for gold, and only +0.15V for tin).

{{% figure src="gold-and-tin-plated-contacts.jpg" width="500px" caption="You can see the difference between the gold and tin plated header connectors. Image from http://www.fischerelektronik.de/en/latest-news/press-releases/releases/smd-high-precision-male-header-with-2point54mm-grid-spacing-horizontal-design/." %}}

## Telecom Connectors

### BT Connector

The connector called the "BT" connector (which is an acronym for the British Telecom connector) is commonly used through out houses in many countries (including the U.K. and New Zealand) to plug into a  Telecom jack that is mounted on the wall. It's proper name is the BS6312 431A plug. You can get cheap BT to RJ-11 adapters.

## Contactless Connectors

Contactless connectors is the name given to connectors which don't require a physical electrical contact between the two mating pieces (they still may require physical mechanical contact). They can transmit both signals and power from one side to the other. This is normally done through magnetic/capacitive coupling.

This is still a relatively new field compared to other forms of connectors, and unit prices are still very high.

TE Connectivity make a range under the family name [ARISO](http://www.digikey.co.nz/en/product-highlight/t/te-connectivity-amp/ariso-contactless-connectivity). They are capable to transmitting up to 12W of power at 24VDC.

{{% figure src="te-connectivity-ariso-m30-contactless-connector-pair-photo.png" width="640px" caption="A photo of TE Connectivity's ARISO M30 contactless connectors. Image from www.te.com." %}}

## Terminal Blocks

Terminal blocks are a great easy-to-use connection method for signal from mA right up to 10A+. They make it **easy to connect (and re-arrange)** wires, accept one of the largest ranges of wire sizes, and the standard screw type requires no crimp on the end of the wire. They are also great because they **allow the cable itself to be fed through glands and other small orifices**, as there is no mating connector permanently mounted onto the end of the cable.

There are different types of terminal blocks:

<table>
    <thead>
        <tr>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>One piece</td>
            <td>These are your standard terminal blocks that are soldered onto PCBs.&amp;lt;/td&amp;gt;</td>
        </tr>
        <tr>
            <td>Feed-through</td>
            <td>Rather than connecting to a PCB, these provide mechanical contacts on both sides of the terminal block, allowing wires to be connected together. Popular with mains (household) wiring.</td>
        </tr>
        <tr>
            <td>Pluggable</td>
            <td>These are like on-piece, except that the PCB part and the wire part are plugged into each other, so that they can be separated.</td>
        </tr>
        <tr>
            <td>Barrier</td>
            <td>These provide electrical isolation.</td>
        </tr>
    </tbody>
</table>

You can see the push-in terminal blocks I used to connect up all the solenoids for the [Luxcity Tonic project](/electronics/projects/luxcity-uv-tonic-control-system) in the image below (the green things with numbered stickers and wires coming out of them).

{{% figure src="arduino-relay-shields-and-relays.jpg" width="1200px" caption="Many push-in terminal blocks (items in green) I used as part of the [Luxcity Tonic project](/electronics/projects/luxcity-uv-tonic-control-system)." %}}

However, because they do not enforce a specific wiring configuration, they are prone to wiring errors, especially if someone else than that who designed the circuit is wiring it up.

Common pitches for terminal blocks are:

<table>
    <thead>
        <tr>
            <th>Pitch</th>
            <th width="400px">Use</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>2.54mm (100mill)</td>
            <td>Imperial pitch used for small wires (16-30AWG). While this is a very common pitch for other connectors, the design of terminal blocks actually makes this result in very small connections, hence larger pitches are more popular.</td>
        </tr>
        <tr>
            <td>3.5mm</td>
            <td>Common metric pitch.</td>
        </tr>
        <tr>
            <td>3.84mm (150mill)</td>
            <td>This is a common terminal block imperial pitch.</td>
        </tr>
        <tr>
            <td>5.08mm (200mill)</td>
            <td>This is a very common imperial pitch.</td>
        </tr>
    </tbody>
</table>

{{% aside type="warning" %}}
**DO NOT** completely tin the ends of wires that go in the terminal block. Under the pressure of the screw, solder will creep over time, and the connection will become loose, either falling out, or making a high resistance connection. It is acceptable to lightly tin **the very ends** of the wires to keep the individual strands from fraying, but nothing more.
{{% /aside %}}

A better way to fix this problem is to use wire ferrules. These are small hollow metal cylinder which just fit over the wire and then crimped onto it, before being inserted into the terminal block. It stops the wires from fraying, and gets rid of the solder creep problem.

{{% figure src="wire-ferrules-used-in-terminal-block.jpg" width="500px" caption="Wire ferrule are crimped onto wires before they are inserted into a terminal block, preventing fraying and solder creep." %}}

### Connection Type

Terminal blocks have many different connection types:

#### Screw

{{% figure src="terminal-block-screw-style.jpg" width="181px" caption="A terminal block with a screw-style connection method." %}}

The most basic terminal block connection type. I don't particularly like this connection style, especially when clamping bare wires (i.e. no wire ferrule), as the screw can pinch and break the individual wire strands, as well as the screw completely missing some/all of the wire strands if they ride up the sides of the metal enclosure. This problem is exasperated when the gauge of the wire is small compared to the size of the terminal block.

#### Rising Cage

{{% figure src="terminal-block-rising-cage-close-up.jpg" width="148px" caption="A terminal block with a rising-cage style connection method." %}}

Screw with rising cage clamp is my preferred connection type. This is where the bottom side of a square cage rises up and clamps the wire when you tighten the screw. This does not pinch and break the wire as often as the basic screw connection type terminal block does.

### Terminal Block Covers

You can purchase terminal block covers, which give further protection to the wires after they have been fixed into the contacts.

Commonly, they clip onto the top of the terminal block and shield the terminal block from objects approaching from overhead.

{{% figure src="terminal-block-cover-beside-block1.jpg" width="400px" caption="A terminal block cover beside the terminal block." %}}

{{% figure src="terminal-block-cover-mounted-on-block.jpg" width="400px" caption="A terminal block cover mounted onto a terminal block." %}}

### Ceramic (Porcelain) Terminal Blocks

Ceramic (also called _porcelain_) terminal blocks were used before plastic ones became widely available. They still find a niche in applications where they would be subjected to very high temperatures that would melt plastic. They can typically operate in temperatures of -40° to 650°C. This includes things such as heaters, thermocouple connections, machinery, and many other industrial uses. Steatite is a popular ceramic material used for construction of these types of terminal blocks.

{{% figure src="20150109-ceramic-terminal-block.jpg" width="400px" caption="A ceramic terminal block." %}}

## Barrier Strips

_Barrier strips_ (a.k.a. _barrier blocks_) are rows of screw-based electrical clamps designed to connect wires together. They are very similar to [^_terminal_blocks, terminal blocks], however they generally provide better protection than terminal blocks against loose of frayed wire ends shorting out against adjacent positions. They are also generally rated for higher current/voltage applications than terminal blocks (300-600V, 10-30A ratings are common), and consequentially usually larger (pitches of 8-12mm).

{{% figure src="molex-0387700104-barrier-strip-photo.png" width="400px" caption="Photo of a 4 circuit 9.53mm (0.375\") pitch barrier strip by Molex (part number: 0387700104). Image retrieved 2021-10-07, from https://www.digikey.com/en/products/detail/molex/0387700104/362488." %}}

Whilst terminal blocks don't usually have an exposed metal that can easily short out against neighbouring parts, barrier strips are open on the top face (to allow for the connection of lugs). If the exposed conductors are a problem, you can purchase some barrier strips that come with insulating covers. The covers are usually see-through and made of plastic.

{{% figure src="barrier-strips-forks-coloured-glarks.png" width="400px" caption="Photo of covered barrier strips, combs and wire forks. Image retrieved 2021-10-07, from https://www.amazon.com/Glarks-Positions-Terminals-Pre-Insulated-Insulated/dp/B07Y217129/." %}}

Barrier strips can be found on DigiKey at https://www.digikey.com/en/products/filter/terminal-blocks-barrier-blocks/368.

## Wire-to-Board (WTB) Connectors

Wire-to-board (WTB) connectors are a very common type of electrical connector. WTB connectors are used to attach free wires and cables to a PCB, to provide both electrical connections and mechanical support.

### Naming

The name can be abbreviated to _WTB connectors_ or _W-T-B connectors_. They can also be referred to as _board-to-wire connectors_.

WTB connectors get rid of all the problems with soldering wires directly onto a PCB, which include fatigue/breaking issues, short-circuit woes, and the ease of disconnecting/re-connecting the wires.

Trying the find a good, reasonably-priced WTB connector on a electronic supplier's website can be near-impossible. There are so many varieties, shapes, lead pitches, bad datasheets, and different manufacturer's making nearly identical products. Also, to top it all of, you need to usually find more than one item to make a connector work (e.g. if you buy a connector you must also find the matching receptacle and crimp pins). And most suppliers don't do a good job and making the related parts obvious.

### Examples

#### JST PH/SH Family

The JST PH 2.0mm pitch W2B connector family is used for the [Adafruit STEMMA devices](https://learn.adafruit.com/introducing-adafruit-stemma-qt), and the JST SH 1.0mm pitch W2B connector used for Adafruit STEMMA QT (QT representing _cutie_, referring to the smaller pitch) and SparkFun QwiiC devices[^bib-adafruit-jst-sh-conn].

{{% figure src="jst-sh-conn-adafruit-stemma-qt-sparkfun-qwiic.png" width="400px" caption="A photo of a Adafruit \"STEMMA QT\" or SparkFun \"Qwiic\" connector + cable. Both use the JST SH 1.0mm pitch W2B connector family[^bib-adafruit-jst-sh-conn]. Image (C) 2021, Adafruit." %}}

#### TE Connectivity HPI

TE Connectivity's 2.0mm HPI connectors are a good choice if you want a smallish connector with 2 to 12 wires. There are SMD and TH variants of the PCB mounted half. I like these because they are relatively cheap, have good documentation, and best of all, come with 3D step models for creating a 3D mock-up of the PCB.

Manufacturing codes include _1775469-x_ for the right-angle SMD variants, and _1775470-x_ for the vertical SMD variants. _x_ is the number of pins in all cases.

#### Molex PicoBlade

Molex's PicoBlade connector families are quite popular. They have a 1.25mm pitch and a 1A capacity per contact. There are a variety of wire-to-board and wire-to-wire options.

{{% figure src="molex-picoblade-connector-photo.gif" width="300px" caption="A photo showing a few of the connectors from the Molex PicoBlade families. Image from www.molex.com." %}}

#### MTA/CST-100 Connectors

_MTA-100 connectors_ are a family of wire-to-board and wire-to-wire connectors. They use the insulation displacement contact (IDC) technique to make electrical contact between the housing and the wires without having to use crimps[^bib-te-mta-100-conns]. MTA-100 connectors are colour coded according the wire size they accept.

<table>
    <thead>
        <tr>
            <th>Connector Colour</th>
            <th>Wire Size</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Red</td>
            <td>22AWG</td>
        </tr>
        <tr>
            <td>White</td>
            <td>24AWG</td>
        </tr>
        <tr>
            <td>Blue</td>
            <td>26AWG</td>
        </tr>
        <tr>
            <td>Green</td>
            <td>28AWG</td>
        </tr>
    </tbody>
</table>

## RF Connectors

RF connectors are connectors specifically designed to carry high-frequency signals, typically in the 100MHz-30GHz range.

### BNC Connectors

BNC (_Bayonet Neill-Concelman_) connectors are quick connect connectors designed for RF signals. It is named after it's **B**ayonet locking mechanism and it's inventors, Paul **N**eill and Carl **C**oncelman. It is "standardized" in MIL-STD-348A[^bib-everyspec-mil-std-348a].

{{% figure src="bnc-connectors-on-oscilloscope.jpg" width="700px" caption="Four BNC connectors on the front of a Keysight InfiniiVision DSOX2024A oscilloscope to connect the probes to." %}}

### Specifications

* **Passband:** 0-4GHz
* **Impedance:** \(50\Omega\) or \(75\Omega\) (video).

#### Uses 

They were originally designed for military use, but are now commonly used for a variety of RF applications including:

* **Oscilloscope probes:** Used for lower frequency oscilloscope probes (0-200MHz). The top-end modern oscilloscopes tend to have proprietary connections to the probes, with added pins for extra functionality.
* **Analog video signals**
* **Radio antennas**

{{% figure src="bnc-adapter-edited.jpg" width="300px" caption="Photo of a BNC adapter, showing the male BNC connector." %}}

The USSR version of the BNC connector is called the SR connector. However, the connector dimensions are slightly different due to the conversion from imperial to metric. The SR connectors can be mated with BNC connectors, although sometimes it requires a decent amount of force.

### U.FL

Also known as UMC or XFL connectors.

{{% figure src="ufl-connector-photo.png" width="350px" caption="A photo of a male, SMD mount UFL connector. Image from www.digikey.com." %}}

#### Schematic Symbol

There is no "standard" schematic symbol for the male, SMD mount UFL connector, so I normally decide to go with some that is visually resembles the actual connector part, as shown below:

{{% figure src="ufl-umc-umcc-rf-connector-schematic-symbol.png" width="510px" caption="A schematic symbol for the male, SMD, UFL (a.k.a. UMC, UMCC) style RF connector." %}}

The height of the male SMD connector can vary, but something around 1.2mm is common.

### SMA Connectors

SMA (SubMiniature version A) connectors are small (although probably medium-sized by today's standards) \(50\Omega\) RF coaxial connectors with a screw-style connection mechanism. The gender name refers to the innermost electrical component (e.g. a male SMA connector has the pin in the middle, whilst the female has the socket to accept the pin). They typically have a passband between \(0-16GHz\), although some specialized versions extends in the 30+ GHz territory[^bib-amphenolrf-sma].

{{% figure src="sma-male-and-female-next-to-each-other-edited.jpg" width="700px" caption="One male and one female inline (connector to cable) SMA connector next to each other." %}}

The original SMA connectors were developed in the 1960s[^bib-reichelt-sma-rpsma].

* Standard Male SMA connector: Central **0.9mm diameter pin** surrounded by a barrel with **inside** threads.
* Standard Female SMA connector: Central **sleeve** (made from the di-electric) surrounded by a barrel with **outside** threads.

{{% figure src="female-th-sma-connector-amphenolrf.png" width="300px" caption="Female through-hole standard SMA connector, designed to be mounted on a PCB[^bib-amphenolrf-sma]. Image © 2020 Amphenol." %}}

{{% figure src="sma-cable-edited.jpg" width="700px" caption="A coaxial cable with SMA connectors at both ends." %}}

_Reverse-polarity_ (RP) SMA connectors have the pin and sleeve swapped between the male and female parts. Also known as _RP-SMA_ or _R-SMA_. _Reverse-polarity_ was designed  to prevent the unauthorized connection of a antenna with a larger gain to WiFi equipment[^bib-reichelt-sma-rpsma], to distinguish them from cellular equipment involving LTE/GSM/UMTS which was utilizing the standard SMA connector. These days, RP-SMA connectors are now commonplace, somewhat defeating the protection through obscurity. However in general, standard SMA connectors are still used for cellular applications whilst RP-SMA for WiFi/WLAN.

### N Connectors

_N connectors_ (a.k.a. N-type or Type N connectors) are large RF connectors.

{{% figure src="n-connector-close-up-edited.jpg" width="300px" caption="Close-up of a N Connector." %}}

### 7/16 DIN Connectors

TODO: Add info here.

## Board-to-Board Connectors

Board-to-board connectors which connect to PCBs side-by-side are called _coplanar_ connectors.

Board-to-board-connectors which connect PCBs ontop of one another are called _mezzanine_ or _stacked_ connectors.

{{% figure src="stacked-board-to-board-connector-photo.png" width="500px" caption="An example of a 'mezzanine' or 'stacked' style of board-to-board connector." %}}

### Wire-to-Board (WTB) Support

Some board-to-board connector families are have wire-to-board support, with a special wire-crimped inline receptacle which mates with the PCB-mounted connector that works with both the board-to-board and wire-to-board connectors.

The Hirose DF-59 family is a set of board-to-board/board-to-wire connectors. The special feature about this family is the "floating" contact which allows up to 0.5mm of mis-alignment between the boards.

{{% figure src="df59-hirose-board-to-board-connector-with-special-floating-feature.pdf.png" width="400px" caption="Diagram of the Hirose DF-59 family of board-to-board connectors, showing their special 'floating' feature." %}}

## Mains Power Connectors

### IEC 60320

The C13/C14 coupler is very common for powering computers, computer screens and other tech equipment from mains power. In New Zealand, they are commonly called "jug plugs".

{{% figure src="iec-60320-c13-male-and-female-mains-power-connector-photo.jpg" width="500px" caption="A photo of both the male and female C13/C14 style connectors from the IEC 60320 standard. Also known as 'kettle' or 'jug' plugs. Image from www.amazon.com." %}}

## PCB Card Edge Connectors

This is a cheap and many-pin capable solution when you want to connect two PCBs together. PCB card edge connector involve using the edge of one of the mating PCBs as the connector, by etching/routing "fingers" on the PCB. The other mating part of the connector is designed to accept these fingers. Most card edge connectors are used when the PCBs are at right-angles to each other, although you can get connectors designed for parallel and co-planar connections.

The fingers that are etched on the PCB are usually gold plated to make the contacts more reliable (the normal lead/tin coating oxidises too quickly). This is a special process that most PCB manufacturers will support, and does not add much to the cost of the PCB. The supported PCB thickness of most of these connectors is around 1.60mm (which is pretty standard). Also, it is recommended to add a small bevel to the inserted end of the PCB to facilitate mating. Again, most quality PCB manufacturers will support this.

Card-edge connectors are very susceptible to board warping and board thickness errors, so takes these into consideration when adding card-edge connectors to your PCB design.

{{% figure src="edge-connector-gold-fingers-and-bevel.png" width="445px" caption="Edge connector fingers which have been gold plated and the PCB bevelled. Image from http://www.eurocircuits.com/index.php/eurocircuits-printed-circuits-blog/gold-plating-for-edge-connectors." %}}

The following image is of PCB card edge connectors on the [Cavro XL-3000 syringe pump](/electronics/teardowns/cavro-xl3000-8-port-syringe-pump-teardown).

{{% figure src="pcb-card-edge-connector-example-from-cavro-xl-3000.jpg" width="1200px" caption="An example of a PCB card edge connector. This is a photo of the Cavro XL-3000 syringe pump." %}}

You can get PCB card edge connectors which have latches, which lock in the daughter board which has special "hockey stick" pieces routed on the sides.

{{% figure src="pcb-edge-connector-pci-hockey-stick.png" width="412px" caption="Male pcb-card edge connectors can have 'hockey-stick' latches as indicated (the female connector also has to support this)." %}}

This is a screenshot from a PCB design for the male part of a card-edge connector in Altium.

{{% figure src="altium-card-edge-male-connector-on-pcb.png" width="1502px" caption="An Altium PCB design of a male card-edge connector. This is for the 20-pin connector in the Molex SPD08 series." %}}

This is a female latching card-edge connector.

{{% figure src="pcb-connector-with-latches-3m-spd08.png" width="1265px" caption="A 20-pin card-edge female connector from the Molex SPD08 series." %}}

In some rare cases (e.g. the Sullins EBC Card-Edge connector series), aside from the socket, the connector manufacturer will also manufacture a plug which replicates PCB fingers, instead of you using the PCB for this purpose.

## Identifying Connectors

Unlike most other electrical components, most connector manufacturers do not append any letter codes in the part numbers for connectors, rather they are just a long sequence of numbers. This can make part recognition very confusing (e.g. when you see an IC with "74" in it's part name, you instantly think of digital logic). A standard way to indicate pin 1 on a connector PCB footprint is to make the copper pad surrounding the pin 1 hole to be a different shape than the rest (e.g. square, while all the others are round).

The website https://connectorbook.com/identification.html is a great tool to help you identify unknown connectors. If guides you through a series of questions which narrows down the connector you are looking at.

{{% figure src="identifying-a-w2b-connector-on-connector-book.png" width="700px" caption="Identifying a W2B (wire-to-board) connector with the help connectorbook.com[^bib-connector-book]." %}}

## References

[^bib-te-mta-100-conns]:  TE Connectivity. _MTA 100 & MTA 156 Connectors_. Retrieved 2021-10-07, from https://www.te.com/usa-en/products/connectors/pcb-connectors/intersection/mta-100-mta-156-connectors.html.
[^bib-reichelt-sma-rpsma]:  Reichelt Elektronik. _SMA and RP-SMA – What You Need to Know About Coaxial Connectors_. Retrieved 2021-11-22, from https://www.reichelt.com/magazin/en/sma-and-rp-sma-what-you-need-to-know-about-coaxial-connectors/.
[^bib-amphenolrf-sma]:  Amphenol RF. _SMA Connectors_. Retrieved 2021-11-22, from https://www.amphenolrf.com/connectors/sma-connectors.html.
[^bib-connector-book]:  The Electronic Connector Book. _Identify a connector or connecting component_. Retrieved 2021-12-03, from https://connectorbook.com/identification.html.
[^bib-jst-ph-conn]:  JST. _PH connector_. Retrieved 2021-12-03, from https://www.jst-mfg.com/product/detail_e.php?series=199.
[^bib-adafruit-jst-sh-conn]:  Adafruit. _JST SH 4-pin Right Angle Connector (10-pack) - Qwiic Compatible_. Retrieved 2021-12-03, from https://www.adafruit.com/product/4208.
[^bib-everyspec-mil-std-348a]:  Department of Defence. _Interface Standard: Radio Frequency Connector Interfaces for MIL-C-3643, MIL-C-3650, MIL-C-3655, MIL-C-25516, MIL-C-26637, MIL-C-39012, MIL-C-49142, MIL-A-55339, MIL-C-83517_. Retrieved 2021-12-10, from http://everyspec.com/MIL-STD/MIL-STD-0300-0499/MIL-STD-348A_420/.

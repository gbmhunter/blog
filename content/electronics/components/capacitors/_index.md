---
author: "gbmhunter"
categories: [ "Electronics", "Electronic Components" ]
date: 2011-09-05
description: "A introduction to capacitors, a fundamental component used in circuit design. A walk-though of the different types, properties, uses and capacitor equations."
draft: false
images: [ "/electronics/components/capacitors/container-of-th-tantalum-caps.jpg" ]
lastmod: 2020-07-20
tags: [ "capacitor", "cap", "components", "schematic symbols", "circuit", "ceramic", "electrolytics", "tantalums", "packages", "film", "feedthrough", "decoupling", "MFC", "X5R", "X7R", "C0G", "NP0", "singing capacitors", "piezoelectric", "Class I", "Class II", "Class III", "audible noise", "dielectrics", "bending flex", "FT-CAP" ]
title: "Capacitors"
type: "page"
---

## Overview

Capacitors are a passive electronic component that stores charge between two conductive surfaces. The conductive surfaces (plates) are usually very close together, with a dielectric inbetween, to maximize the capacitance for a given size. They are a popular component, that along with resistors, make up the two most commonly used components on a circuit board. They come in a large range of sizes, from water tank sized caps to small SMD capacitors and capacitors formed from tracks on PCBs.

**The mechanical equivalent of a capacitor is a spring**. The larger the capacitance, the stronger the spring. This is using the [force-voltage](http://lpsa.swarthmore.edu/Analogs/ElectricalMechanicalAnalogs.html) mechanical equivalent.

## Schematic Symbol

Below is a table of most of the capacitor schematic symbols in use.

<table>
  <tbody>
    <tr>
      <td>
          {{< img src="capacitor-unpolarised-schematic-symbol.png" width="196px" caption="The schematic symbol for an unpolarised capacitor." >}}
      </td>
      <td>
          {{< img src="capacitor-polarised-schematic-symbol.png" width="200px" caption="The schematic symbol for a polarised capacitor." >}}
      </td>
      <td>
          {{< img src="capacitor-variable-schematic-symbol.png" width="185px" caption="The schematic symbol for a variable capacitor." >}}
      </td>
    </tr>
  </tbody>
</table>

## Uses

Some of the well-known uses for capacitors are:

* Analog filtering
* Energy storage (supercapacitors)
* Charge pumps (voltage boosting, or a bootstrap capacitor)
* High power energy supplies (e.g. for powering coil and rail guns)
* Oscillators (along with resistors and/or inductors)
* Touch/proximity sensors and screens
* Distance measurement (e.g. the technique used in digital callipers)

A **feedforward capacitor** is the name given to capacitor between the VOUT and ADJ pins of a linear regulator to improve stability.

## Types

### Ceramic

<table>
  <tbody>
    <tr>
      <td>Range</td>
      <td>1pF - 100uF</td>
    </tr>
    <tr>
      <td>Polarized</td>
      <td>No</td>
    </tr>
    <tr>
      <td>Typical Marking</td>
      <td>
        <ul>
          <li>Value in pF with multiplier (similar to resistors)</li>
          <li>Nothing (small ceramic chip capacitors)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Uses</td>
      <td>
        <ul>
          <li>General purpose (they are cheap)</li>
          <li>RF circuits</li>
          <li>Filter circuits</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

Ceramic capacitors are named after the tiny disc of ceramic material they use for their dielectric. Values above 1nF are usually made from stacked ceramic plates and are called 'multilayer monolithics'.

Ceramic capacitors can generate audible noise when operated at certain frequencies. This is due to the electrostrictive (not piezo-electric, as many people suggest) effect of the internal dielectric materials in a monolithic ceramic capacitor. This causes the capacitor to mechanically vibrate (the movement is in the order of 1pm-1nm), which creates acoustic noise. This noise can commonly be heard in switch-mode power supplies and other high-frequency switching devices. Tantalum and electrolytic capacitors do not exhibit this effect, and can be used as a replacement when this noise is undesirable.

{{< img src="murata-deformation-of-pcb-by-electrostrictive-phenomenon.jpg" width="452px" caption="The deformation of a PCB due to the electrostrictive phenomenon in ceramic chip capacitors. Image from http://www.murata.com/products/capacitor/solution/naki.html."  >}}

**Ceramic Di-electrics**

Ceramic capacitors are made from two broad categories of dielectric, _Class 1_ ceramic capacitors have high stability and low losses, suitable for resonant circuit applications. _Class 2_ ceramic capacitors have high volumetric efficiency (more capacitance for the same size!) and are suitable for buffer, by-pass and coupling applications in where the exact capacitance value is usually not so critical.

When talking about the high stability of _Class 1_ ceramic capacitors, we are usually referring to the stability of the capacitance over:

* The operating temperature
* DC operating voltage range (remember, the capacitance changes as the DC voltage across the capacitor changes!)
* The life of the capacitor

The following table lists the common ceramic dielectric codes. 

Class 1:

Class 1 capacitors are specified by the following EIA dielectric codes[^ceramic-dielectric-types]:

<table class="small">
  <thead>
    <tr>
      <th colspan=2>1ST CHARACTER</th>
      <th colspan=2>2ND CHARACTER</th>
      <th colspan=2>3RD CHARACTER</th>
    </tr>
    <tr>
      <th>Letter</th>
      <th>Significant Figures</th>
      <th>Digit</th>
      <th>Multiplier (10^X)</th>
      <th>Letter</th>
      <th>Tolerance (ppm/°C)</th>
    </tr>
  </thead>
  <tbody>
    <tr>  <td>C</td>  <td>0.0</td>    <td>0</td>  <td>-1</td>     <td>G</td>  <td>±30</td>    </tr>
    <tr>  <td>B</td>  <td>0.3</td>    <td>1</td>  <td>-10</td>    <td>H</td>  <td>±60</td>    </tr>
    <tr>  <td>L</td>  <td>0.8</td>    <td>2</td>  <td>-100</td>   <td>J</td>  <td>±120</td>   </tr>
    <tr>  <td>A</td>  <td>0.9</td>    <td>3</td>  <td>-1000</td>  <td>K</td>  <td>±250</td>   </tr>
    <tr>  <td>M</td>  <td>1.0</td>    <td>4</td>  <td>+1</td>     <td>L</td>  <td>±500</td>   </tr>
    <tr>  <td>P</td>  <td>1.5</td>    <td>6</td>  <td>+10</td>    <td>M</td>  <td>±1000</td>  </tr>
    <tr>  <td>R</td>  <td>2.2</td>    <td>7</td>  <td>+100</td>   <td>N</td>  <td>±2500</td>  </tr>
    <tr>  <td>S</td>  <td>3.3</td>    <td>8</td>  <td>+1000</td>  <td></td>   <td></td>       </tr>
    <tr>  <td>T</td>  <td>4.7</td>    <td></td>   <td></td>       <td></td>   <td></td>       </tr>
    <tr>  <td>V</td>  <td>5.6</td>    <td></td>   <td></td>       <td></td>   <td></td>       </tr>
    <tr>  <td>U</td>  <td>7.5</td>    <td></td>   <td></td>       <td></td>   <td></td>       </tr>
  </tbody>
</table>

_Significant Figures_ refers to the significant figure of the change in capacitance with temperature, in `ppm/°C`. The multiplier digit `5` is intentionally excluded (although I don't know why!).

`NP0` is used to refer to the same material as `C0G`, and so they are the same thing. Some manufacturers use them interchangeably to refer to them together as `C0G/NP0`. `NP0` stands for "negative positive 0" and refers to the capacitance not have a positive or negative change with respect to temperature.

{{% img src="c0g-np0-capacitor-temp-coeff-grouping-digikey.png" width="500px" caption="DigiKey, like many over suppliers, groups together C0G and NP0 as one temperature coefficient. Screenshot from https://www.digikey.com/product-detail/en/tdk-corporation/CGA4C2C0G1H392J060AA/445-6942-1-ND/2672960." %}}

Class 2:

The following are based on the EIA RS-198 standard.

<table class="small">
  <thead>
    <tr>
      <th>First Character (lower temperature letter)</th>
      <th>Second Character (upper temperature letter)</th>
      <th>Third Character (change in capacitance over temperature)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>X = -55°C (-67°F)</td>
      <td>4 = +65°C (+149°F)</td>
      <td>P = ±10%</td>
    </tr>
    <tr>
      <td>Y = -30°C (-22°F)</td>
      <td>5 = +85°C (185°F)</td>
      <td>R = ±15%</td>
    </tr>
    <tr>
      <td>Z = +10°C (+50°F)</td>
      <td>6 = +105°C (221°F)</td>
      <td>S = ±22%</td>
    </tr>
    <tr>
      <td></td>
      <td>7 = +125°C (257°F)</td>
      <td>T = +22/-33%</td>
    </tr>
    <tr>
      <td></td>
      <td>8 = +150°C (302°F)</td>
      <td>U = +22/-56%</td>
    </tr>
    <tr>
      <td></td>
      <td>9 = +200°C (392°F)</td>
      <td>V = +22/-82%</td>
    </tr>
  </tbody>
</table>

The most common codes from the above table are `X5R`, `X7R`, `Y5V` and `Z5U`.

The following table lists the class 2 codes defined by the JIS standard.

<table>
  <thead>
    <tr>
      <th>Standard</th>
      <th>Symbol</th>
      <th>Temperature Range</th>
      <th>Capacitance Tolerance</th>
    </tr>
    </thead>
  <tbody>
    <tr>
      <td>JIS</td>
      <td>JB</td>
      <td>-25°C to +85°C</td>
      <td>±10%</td>
    </tr>
  </tbody>
</table>

There is also the two codes JB (which is similar to `X5R`) and CH (which is similar to `C0G`) produced by TDK. They are similar to the codes mentioned except optimised for a smaller temperature range.

#### Insulation Resistance

The [insulation resistance](/electronics/components/capacitors#leakage-currents) limits for military MLCCs are:

IR > `\( 10^{11}\Omega \)` or `\( 10^3 M\Omega \cdot uF \)`, whichever is less, at `\( +25^{\circ}C \)`  

IR > `\( 10^{10}\Omega \)` or `\( 10^2 M\Omega \cdot uF \)`, whichever is less, at `\( +125^{\circ}C \)`

IR requirements for commercial MLCCs are about two times less.

#### Singing Capacitors (Audible Noise)

Sometimes you will hear ceramic capacitors make audible noise! This audible noise is caused due the piezoelectric effect which physically vibrates the capacitor, and can occur in ceramic capacitors which are ferroelectric. Both _Class II_ and _Class III_ ceramic capacitors are ferroelectric, and are susceptible to this problem. However, _Class I_ (e.g. `C0G/NP0`) capacitors are immune[^tdk-singing-capacitors].

_Class II_ and _Class III_ capacitors are most likely to "sing" when the capacitor is subject to large current/voltage ripple.

#### Flexibility

Ceramic capacitors are sometimes tested and rated to be able to withstand a minimum _bending flex_. One example is the [Kemet VW80808 (FT-CAP)](https://content.kemet.com/datasheets/KEM_X7R_FT_VW_AUDI.pdf) range of ceramic capacitors which can withstand 5mm bending flex. These are aimed towards automotive use (but not exclusive to). The large bending flex specification is achieved by designing flexible termination caps at each end of the capacitor, which stops the transfer of stress from the PCB to the fragile ceramic capacitor body.

### Electrolytic

<table>
  <tbody>
    <tr>
      <td>Range</td>
      <td>100nF - 5000uF</td>
    </tr>
    <tr>
      <td>Polarized</td>
      <td>Yes (but some special ones aren't)</td>
    </tr>
    <tr>
      <td>Typical Marking</td>
      <td>Because of their large size, the capacitance is usually printed in it's absolute form on the cylinder.</td>
    </tr>
    <tr>
      <td>Uses</td>
      <td>
        <ul>
          <li>Power supply bulk decoupling</li>
          <li>Filtering</li>
          <li>Audio bypass capacitors</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

Electrolytic capacitors uses a very thin electrically deposited metal oxide film (`\(Al_2 O_3\)`) as their dielectric. They have a high capacitance density (well, that was before super-caps came along). They are usually cylindrical in shape, and come in through-hole (axial and radial) and surface-mount types.

In over-voltage conditions, holes can be punched through the dielectric layer and the capacitor will begin to conduct. The good news is that if the over-voltage disappears quickly enough (e.g. just a surge or spike), the capacitor can self-heal. The bad news is that a if the capacitor heats up enough, the dielectric can boil, create vapours, and the cap explodes. Most electrolytics have a specific "weak spot" on the case which is designed to break in an over-pressure situation. This can make quite a bang, and can be dangerous if you happen to be peering closely at the circuit while this happened.

The common size codes and sizes of SMD Electrolytic capacitors, see the {{% link text="SMD Electrolytic Capacitor Packages page" src="/pcb-design/component-packages/smd-electrolytic-capacitor-packages" %}}.

### Tantalum

<table>
  <tbody>
    <tr>
      <td>Range</td>
      <td>100nF-2mF (from 47nF to 10mF on DigiKey as of Jan 2014)</td>
    </tr>
    <tr>
      <td>Polarized</td>
      <td>Yes (mark indicates POSITIVE side)</td>
    </tr>
    <tr>
      <td>Typical Marking</td>
      <td>Capacitance is usually printed directly onto capacitor</td>
    </tr>
    <tr>
      <td>Uses</td>
      <td>
        <ul>
          <li>Power supply filtering on small PCBs</li>
          <li>Medical and space equipment</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

Tantalum capacitors are actually special type of electrolytic capacitor. But they deserve their own category because of their special properties and wide-spread use. The have lower ESR, lower leakage and higher temperature ranges (up to 125°C) than their electrolytic counterparts.

{{< img src="container-of-th-tantalum-caps.jpg" width="1000px" caption="Through-hole tantalum capacitors." >}}

Most tantalum capacitors are made with a solid electrolyte, and therefore are not prone to the electrolyte evaporation/drying up problems normal electrolytics have. This makes them able to retain their rated capacitance for years, if not decades.

#### Construction

At the heart of a tantalum capacitor is a pellet of tantalum (`\( Ta_2 O_5 \)`).

{{< img src="cross-section-of-tantalum-capacitor.png" width="489px" caption="Cross-section of a SMD tantalum capacitor." >}}

#### Packaging

Tantalum capacitors come in both through-hole and SMD packages.

#### Price

Tantalum capacitors tend to be more expensive than any other commonly used capacitor (electrolytic, ceramic), and so are usually reserved for applications when a large amount of capacitance with low ESR is needed in a tight space.

#### Issues

The SILLYEST THING about tantalum capacitors is that the polarity indicator is a stripe, next to the POSITIVE end. It goes against pretty much all other stripy-polarity-mark thingies, which all indicate which end is the negative end (think electrolytics, diodes, e.t.c). So, be very careful and vigilant when using these, for it is so easy for forget this rule!

Tantalum capacitors are more susceptible to reverse and over-voltage than their electrolytic counterparts. At a high enough voltage, the dielectric breaks down and the capacitor begins to conduct. The current can generate plenty of heat, and here's the best part, it can start of a **mini-thermite** reaction between tantalum and manganese dioxide. Some slightly better news to offset this is that at low-energy breakdowns, tantalum capacitors can actually **self-heal** and stop the leakage current.

<p>Because of their large operating temperature range, stability, and high price, they are often found in medical and space equipment.</p>

### Film Capacitors

<table>
<tbody>
<tr>
  <td>Synonyms/Subfamilies</td>
  <td>
    <ul>
      <li>MKT</li>
      <li>MFCs (metallized film capacitors)</li>
      <li>MPFCs (metallized polyester film capacitors)</li>
      <li>Power (film) capacitor</li>
    </ul>
  </td>
</tr>
<tr>
  <td>Range</td>
  <td>1nF - 10uF</td>
</tr>
<tr>
  <td>Polarized</td>
  <td>No</td>
</tr>
<tr>
  <td>Dielectric</td>
  <td>Polyester, Polycarbonate</td>
</tr>
<tr>
<td>Typical Marking</td>
<td>

Because of their large size, the capacitance is usually either in `<number><number><multiplier><tolerance>` picofarad form (e.g. `105K` equals `10e^5pF` equals `1uF`), or because of their large size printed in it's absolute form (e.g. `0.1uF`) on the block somewhere.

</td>
</tr>
<tr>
  <td>Uses</td>
  <td>
    <ul>
      <li>Power supplies</li>
      <li>Audio circuits</li>
    </ul>
  </td>
</tr>
</tbody>
</table>

Film capacitors are a family of capacitors which use thin insulating plastic film as the dielectric[^wikipedia-film-capacitor]. They are not polarity sensitive. The film can either be **left as is** or **metallized**, which makes it a metallized film capacitor[^capacitorguide.com].

How do you identify film capacitors? Film capacitors usually come in the following forms:

1. A potted rectangular block with the two leads typically coming out of the same side (radial). Typical colors are yellow, blue, or white.

    <table>
      <tr>
        <td>
          {{< img src="yellow-potted-film-capacitor-alibaba.png" width="200px" caption="A yellow potted film capacitor. Image from alibaba.com." >}}
        </td>
        <td>
          {{< img src="blue-potted-film-capacitor-hitano.png" width="200px" caption="A blue potted film capacitor from Hitano." >}}
        </td>
      </tr>
    </table>

1. A rounded, red case that has been coasted in a epoxy lacquer, with the leads typically coming out of the same side.

    {{% img src="red-radial-film-capacitor-photo-ecq-p1h822gz3-digikey.png" width="300px" caption="A red radial film capacitor (Panasonic ECQ-P1H822GZ3). Image from digikey.com." %}}

**Metallized Polyester Film Capacitors**

_Metallized polyester film capacitors_ (MFCs) are used when long-term stability is required at a relatively low cost. They are usually recognized by their appearance of a bright yellow, rectangular block.

Metallized film capacitors have a self-healing effect when an over-voltage even occurs, while others such as ceramic capacitors do not. This makes them safer to use in high-power applications.

{{% img src="20191227-capacitor-blown-in-circuit.jpg" width="800px" caption="A broken 1uF (marking 105K) 250VAC metallized film capacitor (red bulge with cracks in it) inside a paper shredder." %}}

### Polyester (Green Cap)

<table>
<tbody >
<tr>
<td>Range</td>
<td>1nF - 10uF</td>
</tr>
<tr>
<td>Polarized</td>
<td>No</td>
</tr>
<tr>
<td>Dielectric</td>
<td>Polyester, Polycarbonate</td>
</tr>
<tr>
<td>Typical Marking</td>
<td>Value in pF with multiplier (similar to resistors)</td>
</tr>
<tr>
<td>Uses</td>
<td>General circuits</td>
</tr>
</tbody>
</table>

Polyester capacitors use polyester plastic film for their dielectric. They have similar properties to disc ceramic capacitors. They are sometimes called green caps because they have a green outer plastic coating to protect them. The problem with that is that not all polyesters are green! Quite a few are brown, among other colours.

### Supercapacitors

<table>
<tbody>
<tr>
<td>Range</td>
<td>10mF-1000F
</td>
</tr>
<tr>
<td>Polarized</td>
<td>Yes (mark indicates negative side)</td>
</tr>
<tr>
<td>Typical Marking</td>
<td>Capacitance is usually printed directly onto capacitor</td>
</tr>
<tr>
<td>Uses</td>
<td>
<ul>
    <li>Filtering of low frequency voltage ripple, usually due to large and low-frequency pulse currents.</li>
    <li>As an energy storage alternative to a battery</li>
    <li>To be hooked up in parallel with batteries to provide good pulse-current capabilities to battery chemistries which typically lack in that regard (i.e. those which have a large internal resistance,). This is a common practice with lithium thionyl chloride batteries.</li>
    <li>To provide extra support for bass in audio systems (essentially providing a low-source impedance energy source for when the bass goes boom)</li>
</ul>
</td>
</tr>
</tbody>
</table>

Supercapacitors are actually a special type of electrolytic capacitor.

They typically range from 10mF up to 1000F (in a single capacitor). Stacks of these capacitors can produce capacitances as high as your imagination.

You have to be careful, the leakage current of large supercapacitors (10F and greater) can be quite high (100's uA or mA's!). Even worse, some datasheets don't even mention the leakage current! The ESR of a supercapacitor usually decreases with increasing capacitance.

Through-hole and SMD super capacitor packages exist.

### Door Knob Capacitors

Door knob (or barrel) capacitors are a form of ceramic capacitor named after their look-alike appearance to a door knob. They are usually rated for high voltages (kV's), and used in RF applications. They hav a low dielectric loss and linear temperature co-efficient of capacitance. They are typically used in the frequency range from 50kHz-100MHz.

{{< img src="door-knob-capacitors.jpg" width="666px" caption="Ceramic, high-voltage 'door-knob' capacitors. Image from www.trademe.co.nz."  >}}

## Dielectric Constants Of Common Materials

Sorted by alphabetic order.

<table>
    <thead>
        <tr>
            <th>Material</th>
            <th>Dielectic Constant (value or range, no unit)</th>
            <th>Notes</th>
        </tr>
    </thead>
<tbody >
<tr >
<td >Air</td>
<td >1</td>
<td >See below for data on how temperature, humidity, and pressure influences the dielectric of air.</td>
</tr>
<tr >
<td >Bakelite</td>
<td >4.4-5.4</td>
<td ></td>
</tr>
<tr >
<td >Ethanol</td>
<td >24</td>
<td ></td>
</tr>
<tr >
<td >Formica</td>
<td >4.6-4.9</td>
<td > </td>
</tr>
<tr >
<td >Glass</td>
<td >7.6-8.0</td>
<td >This is common window glass</td>
</tr>
<tr >
<td >Mica</td>
<td >5.4</td>
<td ></td>
</tr>
<tr >
<td >Mylar</td>
<td >3.2</td>
<td></td>
</tr>
<tr >
<td >Paper</td>
<td >3.0</td>
<td></td>
</tr>
<tr >
<td >Paraffin</td>
<td >2.1</td>
<td ></td>
</tr>
<tr >
<td >Plexiglass</td>
<td >2.8</td>
<td ></td>
</tr>
<tr >
<td >Polyethylene</td>
<td >2.3</td>
<td ></td>
</tr>
<tr >
<td >Polystyrene</td>
<td >2.6</td>
<td ></td>
</tr>
<tr >
<td >Porcelain</td>
<td >5.1-5.9</td>
<td ></td>
</tr>
<tr >
<td >Quartz</td>
<td >3.8</td>
<td ></td>
</tr>
<tr >
<td >Rubber</td>
<td >2.8</td>
<td >Hard rubber</td>
</tr>
<tr >
<td >Teflon</td>
<td >2.1</td>
<td ></td>
</tr>
<tr >
<td >Vacuum</td>
<td >1.0</td>
<td ></td>
</tr>
<tr >
<td >Vinyl</td>
<td >2.8-4.5</td>
<td ></td>
</tr>
<tr >
<td >Water</td>
<td >76.5-80</td>
<td >Distilled water</td>
</tr>
</tbody>
</table>

## The Dielectric Of Air

The dielectric of air changes with humidity, pressure and temperature.

<table><tbody ><tr >
<td >Temperature
</td>
<td >5ppm/C
</td></tr><tr >
<td >Relative Humidity
</td>
<td >1.4ppm/%RH
</td></tr><tr >
<td >Pressure
</td>
<td >100ppm/atm
</td></tr></tbody></table>

## Capacitors In Series And In Parallel

The behaviour of capacitors when connected together in series and in parallel is exactly the opposite behaviour of what resistors and inductors exhibit.

### Capacitors In Parallel

Capacitors in parallel can be treated as one capacitor with the equivalent capacitance of:

<p>$$ C_{total} = C1 + C2 $$</p>

<p>That is, in parallel, <b>the total equivalent capacitance is the sum of the individual capacitances</b>. This is shown in the below diagram.</p>

{{< img src="capacitor-equivalence-in-parallel-with-equation.png" width="629px" caption="Diagram showing the resulting capacitance from two capacitors in parallel." >}}

<p><b>Connecting capacitors in parallel increases the capacitance.</b> Parallel-connected capacitors occurs everywhere in circuit design. A classic example is bulk decoupling for a switch-mode power supply, which will typically have more than one large capacitor connected in parallel on the input.</p>

<p>One of the benefits of connecting many capacitors in parallel rather than using one large capacitor is that you will usually get a lower ESR (equivalent series resistance).</p>

<h2>Capacitors In Series</h2>

<p>Capacitors in series with each other can be treated as one capacitor with a capacitance:</p>

<p>$$ C_{total} = \frac{1}{\frac{1}{C1} + \frac{1}{C2}} $$</p>

<p>It is usually easier to remember this equation as:</p>

<p>$$ \frac{1}{C_{total}} = \frac{1}{C1} + \frac{1}{C2} $$</p>

<p>This is shown in the following diagram.</p>

{{< img src="capacitor-equivalence-in-series-with-equation.png" width="620px" caption="Diagram showing the equivalent capacitance from two capacitors connected in series."  >}}

<p>Notice how the total equivalent capacitance is less than any one capacitor in the series string. <b>Connecting capacitors in series reduces the capacitance</b>.</p>

<p>One of the benefits of connecting capacitors in series is that each capacitor only sees a portion of the total applied voltage, hence you can apply a higher voltage than the max rated voltage for any single capacitor. However, care must be taken to make sure the capacitors don't build up a <b>charge imbalance</b>, which could cause a single capacitor to take more than it's fair share of voltage, and blow up! A balancing circuit can be made by connecting a high-value resistor(e.g. \( 1M\Omega \)) across each capacitor. This causes any unbalanced build-up of charge to dissipate through the resistors, at the expense of increasing the leakage current of the circuit (remember, capacitors have an internal leakage current also). This is similar to how a battery cell charge balancing circuit works.</p>

## Formulas

### Charge

<p>The charge stored on the plates of a capacitor is related to the voltage and capacitance by:</p>

<p>$$Q = CV$$</p>

<p class="centered">
    where:<br>
    \(Q\) = charge stored in plates (Colombs)<br>
    \(C\) = capacitance (Farads)<br>
    \(V\) = voltage (Volts)<br>
</p>

If using this formula, see the Capacitor Charge Calculator.

### Energy

The energy stored in a capacitor is:

<div>$$E = \frac{1}{2}CV^2$$</div>

<p class="centered">
    where:<br>
    \(E\) = energy stored in the capacitor (Joules)<br>
    \(C\) = capacitance (Farads)<br>
    \(V\) = voltage across the capacitor (Volts)<br>
</p>

As shown by the equation, the energy stored in a capacitor is related to both the capacitance and voltage of the capacitor. A typical 100nF, 6.5V capacitor can store 2.11uJ. Not much huh! If you are really considering capacitors for their energy storage capabilities, you must look at supercapacitors, which have typical values of 100F and 2.5V (as of 2011). This gives 313J of energy, which is useful amount for powering something.

If using this formula, see the Capacitor Energy Calculator.

### Force

The force exerted on the two parallel plates of a capacitor is:

<div>$$F = \frac{\epsilon_0 AV^2}{2d^2}$$</div>

<p class="centered">
    where:<br>
    \(F\) = outwards force extered on each parallel plate of the capacitor, in Newtons<br>
    \(\epsilon_0\) = the permittivity of free space<br>
    \(A\) = overlapping area of the two plates, in meters squared<br>
    \(V\) = voltage across the capacitor, in Volts<br>
    \(d\) = seperation distance between the two plates, in meters<br>
</p>

### Single Disc Capacitance

{{< img src="diagram-for-disc-capacitance-equation.png" caption="Diagram for the disc-to-infinity capacitance equation. Image from http://www.capsense.com/capsense-wp.pdf."  width="320px" >}}

The capacitance of a single thin plate, with  a ground at 'infinity' (or more practically, just very far away) is:

<div>$$C = 35.4 \times 10^{-12} \epsilon_r d$$</div>

<p class="centered">
    where:<br>
    \(C\) = capacitance (Farads)<br>
    \(\epsilon_r\) = relative dielectric constant (1 for a vacuum)<br>
    \(d\) = diameter of the thin plate (meters)<br>
</p>

### Sphere Capacitance

{{< img src="diagram-for-sphere-capacitance-equation.png" caption="Diagram for the sphere-to-infinity capacitance equation. Image from http://www.capsense.com/capsense-wp.pdf."  width="320px" >}}

The capacitance of a single sphere, again, with a ground at infinity is:

<div>$$C = 55.6 \times 10^{-12} \epsilon_r d$$</div>

<p class="centered">
    where:<br>
    \(C\) = capacitance (Farads)<br>
    \(\epsilon_r\) = relative dielectric constant (1 for a vacuum)<br>
    \(r\) = radius of sphere (meters)<br>
</p>

<h3>Parallel Plate Capacitance</h3>

The capacitance of two parallel plates is approximately

<div>$$C = \epsilon_r \epsilon_o\frac{A}{d}$$</div>

<p class="centered">
where:<br>
\(\epsilon_o\) = electric constant (\(8.854 \times 10^{-12}Fm^{-1}\))<br>
\(\epsilon_r\) = dielectric constant of the material between the plates (no unit)<br>
\(A\) = overlapping surface area of the parallel plates (meters squared)<br>
\(d\) = distance between the plates (meters)<br>
</p>

### Concentric Cylinder Capacitance

{{< img src="diagram-for-coaxial-cylinders-capacitance-equation.png" caption="Diagram for the coaxial cylinder capacitance equation. Image from http://www.capsense.com/capsense-wp.pdf."  width="320px" >}}

The capacitance of two concentric cylinders as shown in the diagram above is:

<div>$$\frac{2 \pi \epsilon_o \epsilon_r}{\ln (\frac{b}{a})} L$$</div>

<p class="centered">
    where:<br>
    \(a\) = radius of inner cylinder (meters)<br>
    \(b\) = radius of outer cylinder (meters)<br>
    \(L\) = length of both cylinders (meters)<br>
    and all other variables as previously mentioned<br>
</p>

## Equivalent Series Resistance (ESR)

Ceramic SMD capacitors have very low ESRs. In fact, in certain applications, this can be a bad thing (such as the input/output stabilization capacitors for linear regulators and DC/DC converters), and either tantalums are used or resistance has to be added in series with the capacitor. Since usually only milli-Ohms is required, this can be done with an appropriately sized PCB track which is usually snaked to the capacitor terminal.

Electrolytic capacitors typically have a large ESR (there are special low-ESR types, but they still don't compare to ceramic caps).

<table>
    <thead>
        <tr>
            <th>Capacitor Type</th>
            <th>Typical ESR (at 1kHz)</th>
        </tr>
    </thead>
<tbody >
<tr >
<td >Super-cap (1-100F)</td>
<td >4-0.1Ω</td>
</tr>
</tbody>
</table>

Since the ESR is proportional to the capacitor's plate area, for a similar capacitor designs, the ESR decreases with increasing capacitance.

## Leakage Currents

Leakage currents are present in all types of capacitor. Leakage current is the sum of electrical losses from energy required to build up the oxide layers, weaknesses in the dielectric, tunnel effects, and cross currents. They are typically increase proportionally to the capacitance of the capacitor. We can reduce the leakage current down to two main factors, the absorption current `\( I_{abs} \)`, and the intrinsic leakage current `\( I_{il} \)`.

<div>$$ I_{leakage} = I_{abs} + I_{il} $$</div>

Absorption currents are due to quantum tunnelling of electrons at the metal/ceramic barrier! Absorption currents, `\(I_{abs}\)` reduce with time and have weak temperature dependence, while intrinsic leakage currents `\(I_{il}\)` remain constant with time but exponentially increase with temperature.

Desorption currents (depolarization) flow when the voltage on a capacitor is decreased (e.g. when it is shorted). These currents can actually recharge a previously discharged capacitor, sometimes up to dangerous voltages (people experimenting with coil/rail guns can have this problem)!

Capacitors that have had a relatively constant voltage across them for a decent amount of time typically exhibit far less absorption current than one which has not been charged in the short-term past. This is due to a phenomenon called ‘self-healing’, in where a charged capacitor will heal defects in the electrolyte. Uncharged electrolytic capacitors may have weakened electrolyte due to ‘dissolution’, the destruction of the dielectric when no charge is present.

The leakage current through a capacitor can be modeled with a resistor in parallel with the actual capacitance, as shown in the image below:

{{< img src="capacitor-with-parasitic-series-resistance-leakage-current.png" width="288px" caption="A capacitor showing the parasitic series resistance present in all real capacitors, which creates a leakage current."  >}}

## How Leakage Current Is Specified

For electrolytics, the maximum leakage current is usually specified in terms of the capacitance.

<p>$$ I_{leakage} = xC $$</p>

<p class="centered">
    where:<br>
    \( I_{leakage} \) = the leakage current, usually specified in units of mA (this is up to the manufacturer and their choice of constant)<br>
    \( x \) = a fixed constant (e.g. 0.5)<br>
    \( C \) = the capacitance of the capacitor, and again, choice of units is up to the manufacturer<br>
</p>

{{% note %}}
When specified this way, the current is <b>completely independent on voltage</b>. The leakage current for electrolytic super-caps in the range of 1 to 100F is typically 0.5C (mA), where C is the rated capacitance in Farads.
{{% /note %}}

The leakage current for MLCC capacitors is specified by an **insulation resistance**. To work out the leakage current, you just use Ohm's law as follows:

<p>$$ I_{leakage} = \frac{V}{R_{insulation}} $$</p>

<p class="centered">
    where:<br>
    \( V \) = the voltage across the capacitor<br>
    \( R_{insulation} \) = the insulation resistance as specified on the capacitors datasheet<br>
</p>

{{% note %}}
When leakage current is specified this way, <b>it is dependent on the voltage</b>.
{{% /note %}}

Ceramic capacitors are rated with an initial minimum insulation resistance (e.g. 500MR) and then a lower minimum resistance rated over its entire life time (e.g. 50MR).

## Why Leakage Currents Are Important

Leakage current becomes an important parameter to consider when designing long-life battery powered circuits. This is especially true for circuits powered of primary batteries with high internal resistance, such as lithium thionyl chloride batteries (LiSOCl2), because large (>100uF) capacitors can be required to help provide energy during high pulse current situations. These capacitors can have significant leakage current.

## Measuring The Leakage Current Of A Capacitor

Because of the small currents/total energy involved, you can't really measure the leakage current of a capacitor with standard multimeter. One way is to use a dedicated high-resistance meter, commonly called a megaohm meter or insulation resistance tester.

## Voltage Dependence

Some types of capacitors have a capacitance which changes depending on the applied voltage (well, technically, all do, but I'm talking about a significant/useful change).

The good news is this can be manipulated to make things such as voltage-controlled oscillators (VCOs), in where the capacitance is part of a resonant circuit, and the resonant frequency is changed by modifying the voltage on the capacitor, hence changing the capacitance. [Diodes](/electronics/components/diodes) also offer this feature and can be used to make FM radio signals by modulating a high-frequency waveform.

The bad news is that this also adversely affects the capacitance in situations where you want it to stay constant. This can actually be a very significant problems, especially with small [package](/pcb-design/component-packages/) size ceramic capacitors (such as 0603 and 0805 SMD chip capacitors). An excellent explanation on this effects if Maxim Integrated's "[Temperature and Voltage Variation of Ceramic Capacitors, or Why Your 4.7uF Capacitor Becomes a 0.33uF Capacitor](http://www.maximintegrated.com/app-notes/index.mvp/id/5527)". The following graph is from Maxim's page, and just serves as an example to show by how much the capacitance can vary in normal operation conditions!

{{< img src="graph-of-temperature-variation-of-ceramic-chip-4-7uf-capacitors.png" width="925px" caption="Graph of the capacitance variation (w.r.t. voltage) of a select group of 4.7uF ceramic chip capacitors, Image from http://www.maximintegrated.com/app-notes/index.mvp/id/5527."  >}}

This can upset op-amp gains, frequency cut-off points of filters, and the time constant of RC oscillators.

## Decoupling

Capacitors are commonly used for decoupling, as this following schematic shows (taken from the Raspberry-Pi PCB design).

{{< img src="decoupling-caps-schematic-example-on-r-pi-pcb.png" width="396px" caption="Example usage of decoupling capacitors for ICs. Schematic is from the Raspberry-Pi PCB. Image from http://www.raspberrypi.org/wp-content/uploads/2012/04/Raspberry-Pi-Schematics-R1.0.pdf."  >}}

## Mains Line Filters

Capacitors used on mains lines for filtering are usually rated with the "XY" scheme.

Capacitors rated with an X are deemed suitable for connecting between two main voltage AC lines (line-to-line). They pose no risk if they either fail open or closed circuit. Capacitors with a Y are deemed suitable for connecting between line and neutral. These capacitors do pose a risk if they fail closed circuit, as this would make the ground (and hence chassis) "hot".

They are also given a number to represent there impulse test rating, as shown in the table below.

<table>
    <thead>
        <tr>
            <th>Classification</th>
            <th>Impulse Voltage (V)</th>
        </tr>
    </thead>
<tbody >
<tr >
<td >X1</td>
<td >4,000</td>
</tr>
<tr >
<td >X2</td>
<td >2,500</td>
</tr>
<tr >
<td >Y1</td>
<td >8,000</td>
</tr>
<tr >
<td >Y2</td>
<td >5,000</td>
</tr>
</tbody>
</table>

## Dielectric Soakage

A weird and little known about property of capacitors is their ability to seemingly 'create' energy and charge themselves up when left in certain conditions. This can be particularly dangerous with high voltage capacitors such as the old oil-filled paper capacitors, which would charge themselves up and then give anyone a shock who was unfortunate enough to get too close.

It's called dielectric soakage because it's essentially a property of the dielectric which retains some of the charge if a capacitor is discharged quickly and then left open circuit. The voltage climb can be up to 10% of the original voltage on the capacitor.

## Charge Pumps (Bootstrapping)

A charge pump (also commonly called **bootstrapping**), is a way of using capacitors to generate a voltage higher than the supply. A typical charge-pump circuit has two capacitors and two diodes, and requires an oscillating input.

It is commonly used as a simple way of driving the gate of a n-doped silicon switch (such as a N-Channel MOSFET or IGBT) when being used as a high side driver. Although using a P-Channel as the high-side driver would not require this voltage step-up, N-Channel MOSFETs are preferred in most cases because of their lower on-resistance and price. When using a capacitor to charge the gate of a N-Channel MOSFET, you must make sure the capacitor stores enough charge to transfer to the MOSFET gate while raising the voltage enough drive the on-resistance as low as you need. A general rule of thumb is that the capacitor should store 100x more charge than the gate charge as stated on the MOSFETs datasheet. The charge stored in a capacitor can be calculated using the following equation:

<div>$$Q = CV$$</div>

<p class="centered">
    where:<br>
    \(Q\) is the charge (Coulombs)<br>
    \(C\) the capacitance (Farads)<br>
    \(V\) the voltage (Volts)<br>
</p>

However, if you really want to optimise the charge pump capacitor, this rule does not suffice. The Fairchild Semiconductor Application Note, ["Design And Application Guide Of Bootstrap Circuit For High-Voltage Gate-Drive IC"](http://www.fairchildsemi.com/an/AN/AN-6076.pdf) has an in-depth analysis of the bootstrap capacitor and surrounding circuit.

The following circuit shows a charge pump circuit used to generate -5V from a +5V PWM signal.

{{< img src="charge-pump-based-negative-voltage-gen-schematic.png" width="1157px" caption="This schematic shows a charge pump circuit used to generate -5V from a +5V PWM signal."  >}}

## Capacitor Packages

Through-hole capacitors can usually be used in a surface mount fashion by lying the caps down on the board, bending the legs 90 degrees, and soldering them onto pads on the PCB.

Ceramic chip capacitors usually have a three letter code which describes the max cap temp, min cap temp, and change over temperature. The following table shows what the three letter code means for "Class II" and "Class III" ceramics. This basically covers all ceramic caps except the NP0/COG capacitors which belong to Class I.

<table>
    <thead>
        <tr>
            <th>1st Character</th>
            <th>Low Temp</th>
            <th>2nd Character</th>
            <th>High Temp</th>
            <th>3rd Character</th>
            <th>Change Over Temp (max)</th>
        </tr>
        <tr >CharTemp (°C)NumTemp (°C)CharChange (%)</tr>
<tbody >
<tr>
<td>Z
</td>
<td>+10
</td>
<td>2
</td>
<td>+45
</td>
<td>A
</td>
<td>±1.0
</td></tr><tr >
<td>Y
</td>
<td>-30
</td>
<td>4
</td>
<td>+65
</td>
<td>B
</td>
<td>±1.5
</td></tr><tr >
<td>X
</td>
<td>-55
</td>
<td>5
</td>
<td>+85
</td>
<td>C
</td>
<td>±2.2
</td></tr><tr >
<td>-
</td>
<td>-
</td>
<td>6
</td>
<td>+105
</td>
<td>D
</td>
<td>±3.3
</td></tr><tr >
<td>-
</td>
<td>-
</td>
<td>7
</td>
<td>+125
</td>
<td>E
</td>
<td>±4.7
</td></tr><tr >
<td>-
</td>
<td>-
</td>
<td>8
</td>
<td>+150
</td>
<td>F
</td>
<td>±7.5
</td></tr><tr >
<td>-
</td>
<td>-
</td>
<td>9
</td>
<td>+200
</td>
<td>P
</td>
<td>±10
</td></tr><tr >
<td>-
</td>
<td>-
</td>
<td>-
</td>
<td>-
</td>
<td>R
</td>
<td>±15
</td></tr><tr >
<td>-
</td>
<td>-
</td>
<td>-
</td>
<td>-
</td>
<td>S
</td>
<td>±22
</td></tr><tr >
<td>-
</td>
<td>-
</td>
<td>-
</td>
<td>-
</td>
<td>T
</td>
<td>+22, -33
</td></tr><tr >
<td>-
</td>
<td>-
</td>
<td>-
</td>
<td>-
</td>
<td>U
</td>
<td>+22, -56
</td></tr><tr >
<td>-
</td>
<td>-
</td>
<td>-
</td>
<td>-
</td>
<td>V
</td>
<td>+22, -82
</td></tr></tbody></table>

## Feedthrough Capacitors

Feedthrough (or feedthru) capacitors are special three-terminal capacitors (sometimes with four connections) used for **suppression** of **RF noise**. They are also known under the more general name of an _EMI suppression filter_ or _three-terminal capacitor._

{{< img src="feedthrough-capacitor-3d-render-0603-1608-3-connections.jpg" width="314px" caption="A 3D render of an 0603-sized feedthrough capacitor with 3 connections. Image from www.digikey.com." >}}

Their advantage over a standard decoupling capacitor to ground is **lower parasitic series inductance**, which offers a lower impedance path for RF noise to ground.

### Schematic Symbol

{{< img src="feedthrough-capacitor-schematic-symbol-3-connection.png" width="422px" caption="The schematic symbol for a 3-terminal feedthrough capacitor."  >}}

### Component Package

Many smaller, PCB suitable feedthrough capacitors come in {{% link text="chip packages" src="/pcb-design/component-packages/chip-eia-component-packages" %}}, such as the 0603 or 0402 size. They can be distinguished from normal capacitors by the fact that the package will have three or four terminals rather than the standard two.

### Uses

Feedthrough capacitors are commonly used in {{% link text="RC, LC, π and t-type filters" src="/electronics/circuit-design/filters/passive-filters" %}}) when good RF performance is required.

## Repairing Electrolytics

When electrolytic capacitors get old, they can dry out and stop working properly (for example, their capacitance can reduce and/or maximum dielectric voltage drop). There are many sources quoting that electrolytic capacitors can be repaired by ramping the voltage slowly up to its full rated voltage. It is meant to repair the aluminium oxide dielectric layer.

{{< img src="circuit-schematic-showing-how-to-repair-an-electrolytic-capacitor.png" width="287px" caption="Schematic showing how to repair/reform an old electrolytic capacitor. The voltage on the capacitor should slowly rise to the rated voltage."  >}}

This can be done with power supply set the rated voltage and a high-power (e.g. 5W) 30kΩ resistor in series with the capacitor, as shown in the image above. Connect the circuit and measure the voltage across the capacitor. It should start at 0V and increase as an inverse exponential as the current through the capacitor decreases. Wait until the voltage across the capacitor gets above 90% of the rated voltage before disconnecting the circuit, as shown in the image below. If the voltage stabilises below 90% of the full-rated voltage, the capacitor is stuffed and can be thrown out.

{{< img src="capacitor-voltage-graph-while-charging-through-resistor-for-reforming.png" width="399px" caption="Graph of an electrolytic capacitor charging through a resistor to reform the aluminium oxide. The graph part of the image from http://www.antonine-education.co.uk/Pages/Electronics_2/Timing_Subsystems/RC_Networks/further_page_2.htm."  >}}

## Energy Loss While Charging A Capacitor

An interesting phenomenon occurs when charging a capacitor from a fixed voltage source (e.g. battery or power supply). Assuming a real-world world situation, there is always going to be some resistance between the voltage source and capacitor. **Exactly the same amount of energy** is dissipated through this resistance as is stored in the capacitor when charging it up to the voltage source voltage `\(V_{cc}\)`. It **doesn't matter how large or small** this resistance is! The resistance could just be the ESR of the capacitor, or it could be a dedicated resistor placed in series to limit the inrush current.

Here is an example schematic:

{{< img src="energy-loss-while-charging-a-capacitor-schematic.png" width="573px" caption="A schematic showing the basic circuit while charging a capacitor, highlighting the energy lost in the series resistance."  >}}

This quite significant and fixed energy loss has implications when it comes to charging caps in low-power circuits (e.g. running of a battery), and sizing resistors (including NTC thermistors) for limiting the inrush current to capacitors, normally as part of the front end to a power supply or motor driver.

### The Proof

Let's start from the basics.

We know total energy in the circuit is the integral of power over time:

<div>$$ E_{in} = \int{P_{in} \cdot dt} $$</div>

Using the basic equation for electrical power `\( P = VI \)` we can write:

<div>$$ P_{in} = V_{in} \cdot I_{in} $$</div>

Substituting the power equation into integral equation, we get an equation for the energy in terms of the voltage and current:

<div>$$ E_{in} = \int{  V_{in} I_{in} \cdot dt } $$</div>

If we assume a fixed DC voltage source, `\( V_{in} \)`, that does not vary over time, we can bring it outside the integral:

<div>$$ E_{in} = V_{in} \int{  I_{in} \cdot dt } $$</div>

Now using the equation for charge in it's integral form `\( Q = \int{I \cdot dt} \)` we can write:

<div>$$ Q_{in} = \int{I_{in} \cdot dt} $$</div>

We can substitute the charge equation into for energy equation:

<div>$$ E_{in} = V_{in} Q_{in} $$</div>

Assuming the cap was fully charged to `\( V_{in} \)` (o.k., this would take an infinite amount of time, but lets just be realistic and say 99.9% is fully charged), and using the basic formula for the energy in a capacitor (`\( E = \frac{1}{2}CV^2 \)`), we can write:

<div>$$ E_{cap} = \frac{1}{2}CV_{in}^2 $$</div>

Now, all of the input charge `\(Q_{in}\)` referred to in charge equation got to the capacitor since the resistor and capacitor share the same current. The equation for the energy in the capacitor can be re-written in terms of charge (using `\(Q=CV\)`):

<div>$$ E_{cap} = \frac{1}{2} V_{in} Q_{in} $$</div>

We now have an equation for the energy given out by the voltage source, and an equation for the amount of energy given to the capacitor. Subtracting the two will give the amount of energy lost to the resistance during charging:

<div>$$ E_{res} = E_{in} - E_{cap} $$</div>
<div>$$ = V_{in} Q_{in} - \frac{1}{2} V_{in} Q_{in} $$</div>
<div>$$ = \frac{1}{2} V_{in} Q_{in} $$</div>

Woah, hang on a moment, this is the same as the energy in the capacitor!

This implies that when charging a capacitor from a fixed DC source, you dissipate just as much energy as heat as you store in the capacitor. It does not matter what the resistance is (it could just be the resistance of the wires and the ESR (equivalent series resistance) in the capacitor).

[^capacitorguide.com]: [http://www.capacitorguide.com/film-capacitor/](http://www.capacitorguide.com/film-capacitor/)
[^wikipedia-film-capacitor]: [https://en.wikipedia.org/wiki/Film_capacitor](https://en.wikipedia.org/wiki/Film_capacitor)
[^ceramic-dielectric-types]: <https://www.electronics-notes.com/articles/electronic_components/capacitors/ceramic-dielectric-types-c0g-x7r-z5u-y5v.php>
[^tdk-singing-capacitors]: <https://product.tdk.com/en/contact/faq/31_singing_capacitors_piezoelectric_effect.pdf>
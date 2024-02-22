---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Electronic Components ]
date: 2011-09-05
description: A introduction to capacitors, a fundamental component used in circuit design. A walk-though of the different types, properties, uses and capacitor equations.
draft: false
images: [ /electronics/components/capacitors/container-of-th-tantalum-caps.jpg ]
lastmod: 2023-07-13
tags: [ capacitor, cap, components, schematic symbols, circuit, ceramic, electrolytics, tantalums, packages, film, feedthrough, decoupling, MFC, X5R, X7R, C0G, NP0, singing capacitors, piezoelectric, Class I, Class II, Class III, audible noise, dielectrics, bending flex, FT-CAP, capacitance multipliers ]
title: Capacitors
type: page
---

## Overview

Capacitors are a passive electronic component that stores charge between two conductive surfaces. The conductive surfaces (plates) are usually very close together, with a dielectric in-between, to maximize the capacitance for a given size. They are a popular component, that along with resistors, make up the two most commonly used components on a circuit board. They come in a large range of sizes, from water tank sized caps to small SMD capacitors and capacitors formed from tracks on PCBs.

**The mechanical equivalent of a capacitor is a spring**. The larger the capacitance, the stronger the spring. This is using the [force-voltage](http://lpsa.swarthmore.edu/Analogs/ElectricalMechanicalAnalogs.html) mechanical equivalent.

## Schematic Symbols

{{% ref "capacitor-symbols" %}} shows the common schematics symbols used for various types of capacitors.

{{% figure ref="capacitor-symbols" src="_assets/capacitor-symbols.png" width="500px" caption="Schematic symbols used for various types of capacitors." %}}

These symbols only cover the main types you will see in schematics. There are other symbols for speciality capacitors such as [feedthrough capacitors](#feedthrough-capacitors) and trimming capacitors.

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

* Range: 1pF - 100uF
* Polarized: No
* Typical Markings: For large ceramics, the value in pF with multiplier (similar to resistors). No markings on small ceramic chip capacitors.
* Uses:
  * General purpose (they are cheap)
  * RF circuits
  * Filter circuits

Ceramic capacitors are named after the tiny disc of ceramic material they use for their dielectric. Values above 1nF are usually made from stacked ceramic plates and are called "multilayer monolithics".

#### Classes And Ceramic Temperature Codes

Ceramic capacitors are made from two broad categories of dielectric types, which influences the temperature stability of the capacitor. _Class 1_ ceramic capacitors have high stability and low losses, suitable for resonant circuit applications. _Class 2_ ceramic capacitors have high volumetric efficiency (more capacitance for the same size!) and are suitable for buffer, by-pass and coupling applications in where the exact capacitance value is usually not so critical. However they suffer from significant DC bias effects.

{{% aside type="note" %}}
When talking about the high stability of _Class 1_ ceramic capacitors, we are usually referring to the stability of the capacitance over:

* The operating temperature
* DC operating voltage range (the capacitance changes as the DC bias voltage across the capacitor changes!)
* The life of the capacitor
{{% /aside %}}

**Class 1:**

Class 1 capacitors primarily use calcium zirconate as their dielectric[^kemet-heres-what-makes-mlcc-dielectrics-different], which has a very stable permittivity across both temperature and DC bias. However, it's permittivity (and hence dielectric constant) is much less than the dielectrics used for Class 2 MLCCs, and so the capacitances are much smaller (typically pF to nF).

{{% ref "class-1-cap-eia-dielectric-codes" %}} shows the EIA temperature codes for Class 1 ceramic capacitors.

<table ref="class-1-cap-eia-dielectric-codes" class="small">
  <caption>

Class 1 capacitor EIA temperature codes[^bib-ceramic-dielectric-types].
  </caption>
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
    <tr>  <td>T</td>  <td>4.7</td>    <td>9</td>  <td>+10000</td> <td></td>   <td></td>       </tr>
    <tr>  <td>V</td>  <td>5.6</td>    <td></td>   <td></td>       <td></td>   <td></td>       </tr>
    <tr>  <td>U</td>  <td>7.5</td>    <td></td>   <td></td>       <td></td>   <td></td>       </tr>
  </tbody>
</table>

_Significant Figures_ refers to the significant figure of the change in capacitance with temperature, in `ppm/°C`. The multiplier digit `5` is intentionally excluded (although I don't know why!).

`NP0` is used to refer to the same material as `C0G`, and so they are the same thing. As {{% ref "c0g-np0-capacitor-temp-coeff-grouping-digikey" %}} shows, some manufacturers and suppliers refer to them together as `C0G/NP0`. `NP0` stands for "negative positive 0" and refers to the capacitance not having a positive nor negative change in capacitance with respect to temperature.

{{% figure ref="c0g-np0-capacitor-temp-coeff-grouping-digikey" src="_assets/c0g-np0-capacitor-temp-coeff-grouping-digikey.png" width="500px" caption="DigiKey, like many other suppliers, groups together C0G and NP0 as one temperature coefficient. Screenshot from https://www.digikey.com/product-detail/en/tdk-corporation/CGA4C2C0G1H392J060AA/445-6942-1-ND/2672960." %}}

**Class 2:**

{{% ref "class-2-cap-dielectric-codes" %}} shows the Class 2 temperature codes, based on the EIA RS-198 standard.

<table ref="class-2-cap-dielectric-codes" class="small">
  <caption>

Class 2 capacitor EIA temperature codes[^bib-ceramic-dielectric-types].
  </caption>
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

{{% ref "jis-dielectric-codes" %}} lists codes from the JIS standard. They are not commonly seen in industry, the EIA codes above are far more popular.

<table ref="jis-dielectric-codes">
  <caption>

The two main JIS temperature codes for capacitors[^tdk-temp-characteristics-mlcc].
  </caption>
  <thead>
    <tr>
      <th>Symbol</th>
      <th>Class</th>
      <th>Temperature Range</th>
      <th>Capacitance Tolerance</th>
    </tr>
    </thead>
  <tbody>
    <tr>
      <td>CH</td>
      <td>Class 1</td>
      <td>-25°C to +85°C</td>
      <td>±60ppm/°C</td>
    </tr>
    <tr>
      <td>JB</td>
      <td>Class 2</td>
      <td>-25°C to +85°C</td>
      <td>±10%</td>
    </tr>
  </tbody>
</table>

There is also the two codes JB (which is similar to `X5R`) and CH (which is similar to `C0G`) produced by TDK. They are similar to the codes mentioned except optimised for a smaller temperature range.

#### Insulation Resistance

The [insulation resistance](#leakage-currents) limits for military MLCCs are:

* IR > \( 10^{11}\Omega \) or \( 10^3 M\Omega \cdot uF \), whichever is less, at \( +25^{\circ}C \).
* IR > \( 10^{10}\Omega \) or \( 10^2 M\Omega \cdot uF \), whichever is less, at \( +125^{\circ}C \).

IR requirements for commercial MLCCs are about two times less.

#### Singing Capacitors (Audible Noise)

**Ceramic capacitors can generate audible noise when operated at certain frequencies.** This is due to a combination of piezoelectric and electrostrictive forces exhibited by the internal dielectric material Barium Titanate \(BaTiO_3\) in a monolithic ceramic capacitor when subjected to an electric field[^covaci-singing-mlccs-and-mitigation]. This causes the capacitor to mechanically vibrate (the movement is in the order of 1pm-1nm), which creates acoustic noise. This noise can commonly be heard in switch-mode power supplies and other high-frequency switching devices. Tantalum and electrolytic capacitors do not exhibit this effect, and can be used as a replacement when this noise is undesirable.

{{% figure ref="murata-deformation-of-pcb-by-electrostrictive-phenomenon" src="_assets/murata-deformation-of-pcb-by-electrostrictive-phenomenon.jpg" width="450px" caption="The deformation of a PCB due to the electrostrictive phenomenon in ceramic chip capacitors. Image from http://www.murata.com/products/capacitor/solution/naki.html." %}}

#### Flexibility

Ceramic capacitors are sometimes tested and rated to be able to withstand a maximum _bending flex_. One example is the [Kemet VW80808 (FT-CAP)](https://content.kemet.com/datasheets/KEM_X7R_FT_VW_AUDI.pdf) range of ceramic capacitors which can withstand 5mm bending flex. These are aimed towards automotive use (but not exclusive to). The large bending flex specification is achieved by designing flexible termination caps at each end of the capacitor, which stops the transfer of stress from the PCB to the fragile ceramic capacitor body.

AVX has coined the term _FLEXITERM_ for their range of ceramic chip capacitors that can withstand higher bending flex. {{% ref "avx-flexiterm-test-for-ceramic-chip-caps" %}} shows a diagram of the test setup for measuring the maximum bending flex.

{{% figure ref="avx-flexiterm-test-for-ceramic-chip-caps" src="avx-flexiterm-test-for-ceramic-chip-caps.png" width="500px" caption="Diagram showing the test setup for measuring the maximum bending flex for AVX chip capacitors with \"FLEXITERM\" terminals[^bib-avx-auto-mlcc]." %}}

#### DC Bias Characteristic

Ceramic MLCC capacitors suffer from significant DC Bias effects (reduction in capacitance with applied voltage). See the [DC Bias Characteristic section](#dc-bias-characteristic) for more info.

### Electrolytic

* Range: 100nF - 5000uF
* Polarized: Yes (but some special ones aren't)
* Typical Marking: Because of their large size, the capacitance is usually printed in it's absolute form on the cylinder.
* Uses:
  * Power supply bulk decoupling
  * Filtering<
  * Audio bypass capacitors

Electrolytic capacitors uses a very thin electrically deposited metal oxide film (\(Al_2 O_3\)) as their dielectric. They have a high capacitance density (well, that was before super-caps came along). They are usually cylindrical in shape, and come in through-hole (axial and radial) and surface-mount types.

In over-voltage conditions, holes can be punched through the dielectric layer and the capacitor will begin to conduct. The good news is that if the over-voltage disappears quickly enough (e.g. just a surge or spike), the capacitor can self-heal. The bad news is that a if the capacitor heats up enough, the dielectric can boil, create vapours, and the cap explodes. Most electrolytics have a specific "weak spot" on the case which is designed to break in an over-pressure situation. This can make quite a bang, and can be dangerous if you happen to be peering closely at the circuit while this happened.

The common size codes and sizes of SMD Electrolytic capacitors, see the [SMD Electrolytic Capacitor Packages page](/pcb-design/component-packages/smd-electrolytic-capacitor-packages).

#### Electrolyte Leakage

Electrolytic capacitors are somewhat infamous for electrolyte leakage and/or vaporization over long periods of time. The leakage or vaporization rate is increased drastically with increased operating temperatures, and typically results in the capacitance of the capacitor decreasing and the ESR increasing[^bib-cadence-causes-of-elec-cap-degradation]. Electrolyte that leaks onto the PCB can cause significant corrosion to neighbouring components. This is due to increased oxidation and by allowing the conduction between traces and other conductive parts at different voltage potentials, which causes chemical etching to occur. 

The _capacitor plague_ was a period between 1999 and 2007 when **electrolytic capacitors experienced higher than expected failure rates** due to faulty design. The back story is one of intrigue, with the issue starting in 1999 with scientist working for Rubycon Corporation in Japan stealing a mis-copied formula for a capacitor electrolyte a giving it to his former employer, Luminous Town Electric company in China. The faulty formula was further stolen abroad to Taiwan, and many faulty capacitors were produced as a result. Bulging and bursting electrolytic capacitors in things such as PC motherboards begun making headlines in 2002[^bib-passive-component-industry-electrolytic-failures].

{{% aside type="info" %}}

My dad had an older Dell WL6000 "Wireless Speaker System" that began playing up. After 20-40mins after turn-on, a crackling noise would begin to get louder and louder in the speakers and soon make the system unusable. After opening the main unit up, I discovered the classic signs of electrolytic capacitor leakage, as shown in {{% ref "fig-pcb-with-electrolyte-leakage-zoomed-out" %}}. The electrolyte had leaked out of the capacitor, and also corroded right through the lead of a neighbouring resistor, making the resistor go open circuit (the capacitor was probably functioning poorly also). After replacing both components, the noise went away!

{{% figure ref="fig-pcb-with-electrolyte-leakage-zoomed-out" src="_assets/pcb-with-electrolyte-leakage-zoomed-out.jpg" width="1000px" caption="Photo of a PCB in a Dell sound system. Highlighted is leaking electrolytic capacitor, which also corroded right through the lead of a neighbouring resistor." %}}

{{% ref "fig-pcb-with-electrolyte-leakage-zoomed-in" %}} shows a close-up of the faulty electrolytic capacitor. You can't see the corroded resistor as it is hidden above the orange disk-style capacitor and inductor-looking component. 

{{% figure ref="fig-pcb-with-electrolyte-leakage-zoomed-in" src="_assets/pcb-with-electrolyte-leakage-zoomed-in.jpg" width="800px" caption="A close-up of the faulty electrolytic capacitor." %}}

{{% /aside %}}

### Tantalum

* Range: 100nF-2mF (from 47nF to 10mF on DigiKey as of Jan 2014)
* Polarized: Yes (mark indicates POSITIVE side)<
* Typical Marking: Capacitance is usually printed directly onto capacitor
* Uses
  * Power supply filtering on small PCBs
  * Medical and space equipment

Tantalum capacitors are a special type of electrolytic capacitor. But they are categorized distinctly from general electrolytic capacitors because of their special properties and wide-spread use. The have lower ESR, lower leakage and higher temperature ranges (up to 125°C) than their general electrolytic counterparts. {{% ref "container-of-th-tantalum-caps" %}} shows an example of through-hole tantalum capacitors.

{{% figure ref="container-of-th-tantalum-caps" src="_assets/container-of-th-tantalum-caps.jpg" width="700px" caption="Through-hole tantalum capacitors." %}}

There are two basic types of tantalum capacitors, older _solid_ tantalum capacitors and newer _wet_ tantalum capacitors.

#### Solid Tantalum Capacitors

As their name suggests, _solid_ tantalum capacitors contain a solid electrolyte. Not prone to the electrolyte evaporation/drying up problems normal electrolytics have. This makes them able to retain their rated capacitance for years, if not decades.

#### Wet Tantalum Capacitors

_Wet_ tantalum capacitors are a newer from of tantalum capacitor, with a better energy density than solid types. Higher price than solid tantalum capacitors. Wet tantalum capacitors have the interesting property of being able to **self-heal** and stop leakage current due to breakdown[^bib-nasa-self-healing-tantalum]. The wet electrolyte is able to deliver oxygen and reform the oxide layer in locations where it is compromised[^bib-wikipedia-tantalum-capacitor].

#### Construction

At the heart of a tantalum capacitor is a pellet of tantalum (\(Ta_2 O_5\)), as shown in {{% ref "fig-cross-section-of-tantalum-capacitor" %}}.

{{% figure ref="fig-cross-section-of-tantalum-capacitor" src="_assets/cross-section-of-tantalum-capacitor.png" width="500px" caption="Cross-section of a SMD tantalum capacitor." %}}

#### Packaging

Tantalum capacitors come in both through-hole and SMD packages.

#### Price

Tantalum capacitors tend to be more expensive than any other commonly used capacitor (electrolytic, ceramic), and so are usually reserved for applications when a large amount of capacitance with low ESR is needed in a tight space.

#### Issues

The SILLIEST THING about tantalum capacitors is that the polarity indicator is a stripe, next to the POSITIVE end. It goes against pretty much all other stripy-polarity-mark thingies, which all indicate which end is the negative end (think electrolytics, diodes, e.t.c). So, be very careful and vigilant when using these, for it is so easy for forget this rule!

Tantalum capacitors are more susceptible to reverse and over-voltage than their electrolytic counterparts. At a high enough voltage, the dielectric breaks down and the capacitor begins to conduct. The current can generate plenty of heat, and here's the best part, it can start of a **mini-thermite** reaction between tantalum and manganese dioxide.

Because of their large operating temperature range, stability, and high price, they are often found in medical and space equipment.

### Film Capacitors

* Synonyms/Subfamilies:
  * MKT
  * MFCs (metallized film capacitors)
  * MPFCs (metallized polyester film capacitors)
  * Power (film) capacitor
* Range: 1nF - 10uF
* Polarized: No
* Dielectric: Polyester, Polycarbonate
* Typical Marking: Because of their large size, the capacitance is usually either in `<number><number><multiplier><tolerance>` picofarad form (e.g. `105K` equals `10e^5pF` equals `1uF`), or because of their large size printed in it's absolute form (e.g. `0.1uF`) on the block somewhere.
* Uses:
  * Power supplies
  * Audio circuits

Film capacitors are a family of capacitors which use thin insulating plastic film as the dielectric[^bib-wikipedia-film-capacitor]. They are not polarity sensitive. The film can either be **left as is** or **metallized**, which makes it a metallized film capacitor[^bib-capacitorguide.com].

How do you identify film capacitors? Film capacitors usually come in the following forms:

A potted rectangular block with the two leads typically coming out of the same side (radial). Typical colors are yellow, blue, or white.

<div style="display: flex;">
{{% figure src="_assets/yellow-potted-film-capacitor-alibaba.png" width="200px" caption="A yellow potted film capacitor. Image from alibaba.com." %}}
{{% figure src="_assets/blue-potted-film-capacitor-hitano.png" width="200px" caption="A blue potted film capacitor from Hitano." %}}
</div>

{{% ref "red-radial-film-capacitor-photo-ecq-p1h822gz3-digikey" %}} shows a film capacitor that has a rounded, red case that's been coasted in a epoxy lacquer, with the leads coming out of the same side.

{{% figure ref="red-radial-film-capacitor-photo-ecq-p1h822gz3-digikey" src="_assets/red-radial-film-capacitor-photo-ecq-p1h822gz3-digikey.png" width="300px" caption="A red radial film capacitor (Panasonic ECQ-P1H822GZ3). Image from digikey.com." %}}

**Metallized Polyester Film Capacitors**

_Metallized polyester film capacitors_ (MFCs) are used when long-term stability is required at a relatively low cost. They are usually recognized by their appearance of a bright yellow, rectangular block.

Metallized film capacitors have a self-healing effect when an over-voltage even occurs, while others such as ceramic capacitors do not. This makes them safer to use in high-power applications. {{% ref "20191227-capacitor-blown-in-circuit" %}} shows a blown 1uF 250VAC metallized polyester film capacitor.

{{% figure ref="20191227-capacitor-blown-in-circuit" src="_assets/20191227-capacitor-blown-in-circuit.jpg" width="800px" caption="A broken 1uF (marking 105K) 250VAC metallized film capacitor (red bulge with cracks in it) I found inside my mum's paper shredder." %}}

### Polyester (Green Cap)

* Range: 1nF - 10uF
* Polarized: No
* Dielectric: Polyester, Polycarbonate
* Typical Marking: Value in pF with multiplier (similar to resistors)
* Uses
  * General circuits

Polyester capacitors use polyester plastic film for their dielectric. They have similar properties to disc ceramic capacitors. They are sometimes called green caps because they have a green outer plastic coating to protect them. The problem with that is that not all polyesters are green! Quite a few are brown, among other colours.

### Supercapacitors

* Range: 10mF-1000F
* Polarized: Yes (mark indicates negative side)
* Typical Marking: Capacitance is usually printed directly onto capacitor
* Uses
  * Filtering of low frequency voltage ripple, usually due to large and low-frequency pulse currents.
  * As an energy storage alternative to a battery,
  * To be hooked up in parallel with batteries to provide good pulse-current capabilities to battery chemistries which typically lack in that regard (i.e. those which have a large internal resistance,). This is a common practice with lithium thionyl chloride batteries.
  * To provide extra support for bass in audio systems (essentially providing a low-source impedance energy source for when the bass goes boom)</li>

Supercapacitors are actually a special type of electrolytic capacitor.

They typically range from 10mF up to 1000F (in a single capacitor). Stacks of these capacitors can produce capacitances as high as your imagination.

You have to be careful, the leakage current of large supercapacitors (10F and greater) can be quite high (100's uA or mA's!). Even worse, some datasheets don't even mention the leakage current! The ESR of a supercapacitor usually decreases with increasing capacitance.

Through-hole and SMD super capacitor packages exist.

### Door Knob Capacitors

Door knob (or barrel) capacitors are a form of ceramic capacitor named after their look-alike appearance to a door knob. They are usually rated for high voltages (kV's), and used in RF applications. They hav a low dielectric loss and linear temperature co-efficient of capacitance. They are typically used in the frequency range from 50kHz-100MHz. {{% ref "fig-door-knob-capacitors" %}} shows some exampes of high-voltage door knob capacitors.

{{% figure ref="fig-door-knob-capacitors" src="_assets/door-knob-capacitors.jpg" width="600px" caption="Ceramic, high-voltage 'door-knob' capacitors. Image from www.trademe.co.nz." %}}

## Relative Permittivity Of Common Materials

_Dielectrics_ are insulators or very poorly conducting materials but efficient supporters of electric fields[^britannica-dielectric]. When dielectrics are placed in an electric field, practically no current flows in them because they do not allow electrons to move (unlike metals). However, they become _polarized_ due to positive and negative charges within the material being displaced by tiny amounts. The polarization creates an internal electric field which reduces the overall electric field in the dielectric (the sum of the external field and it's internal field)[^wikipedia-dielectric]. In terms of capacitors, a dielectric placed between the two plates of a capacitor increases the capacitance compared to that in a vacuum. 

The amount of polarization that any material allows is called it's permittivity and is normally characterized by a number called it's _relative permittivity_. The relative permittivity is the ratio of the permittivity of the material compared to that of a vacuum[^tutorials-point-difference-between-dielectric-constant-and-permittivity]. It is also called the _dielectric constant_, although this term is considered out-dated and deprecated by standards organizations in engineering[^wikipedia-relative-permittivity]. {{% ref "tbl-dielectric-constants-of-common-materials" %}} shows the dielectric constant of common materials, sorted by alphabetic order.

<table ref="tbl-dielectric-constants-of-common-materials">
  <caption>The relative permittivity of common materials.</caption>
  <thead>
    <tr>
      <th style="width: 150px;">Material</th>
      <th style="width: 150px;">Relative Permittivity (no units)</th>
      <th style="width: 400px;">Notes</th>
    </tr>
  </thead>
<tbody>
<tr><td>Vacuum</td>   <td>1</td>          <td>1 by definition.</td></tr>
<tr><td>Air</td>      <td>1.000590</td>   <td>Depends on temperature, pressure and humidity.</td></tr>
<tr><td>Bakelite</td> <td>4.4-5.4</td>    <td></td></tr>
<tr><td>Ethanol</td>  <td>24</td>         <td></td></tr>
<tr>
<td>Formica</td>
<td>4.6-4.9</td>
<td> </td>
</tr>
<tr>
<td>Glass</td>
<td>7.6-8.0</td>
<td>This is common window glass</td>
</tr>
<tr>
<td>Mica</td>
<td>5.4</td>
<td></td>
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

The relative permittivity of air changes with humidity, pressure and temperature.  

## Capacitors In Series And In Parallel

The behaviour of capacitors when connected together in series and in parallel is exactly the opposite behaviour of what resistors and inductors exhibit.

### Capacitors In Parallel

Capacitors in parallel can be treated as one capacitor with the equivalent capacitance of:

$$\begin{align}
C_{total} = C1 + C2
\end{align}$$

That is, in parallel, *the total equivalent capacitance is the sum of the individual capacitances*. This is shown in {{% ref "fig-capacitors-in-parallel" %}}.

{{% figure ref="fig-capacitors-in-parallel" src="_assets/capacitors-in-parallel.webp" width="600px" caption="Diagram showing the resulting capacitance from two capacitors in parallel." %}}

*Connecting capacitors in parallel increases the capacitance.* Parallel-connected capacitors occurs everywhere in circuit design. A classic example is bulk decoupling for a switch-mode power supply, which will typically have more than one large capacitor connected in parallel on the input.

One of the benefits of connecting many capacitors in parallel rather than using one large capacitor is that you will usually get a lower ESR (equivalent series resistance).

### Capacitors In Series

Capacitors in series with each other can be treated as one capacitor with a capacitance:

$$\begin{align}
C_{total} = \frac{1}{\frac{1}{C1} + \frac{1}{C2}}
\end{align}$$

or:

$$\begin{align}
C_{total} = \frac{C1C2}{C1 + C2}
\end{align}$$

It is usually easier to remember this equation as:

$$\begin{align}
\frac{1}{C_{total}} = \frac{1}{C1} + \frac{1}{C2}
\end{align}$$

This is illustrated in {{% ref "fig-capacitors-in-series" %}}.

{{% figure ref="fig-capacitors-in-series" src="_assets/capacitors-in-series.webp" width="800px" caption="Diagram showing the equivalent capacitance from two capacitors connected in series." %}}

Notice how the total equivalent capacitance is less than any one capacitor in the series string. *Connecting capacitors in series reduces the capacitance*. **Capacitors in series behave in the same way as resistors in parallel.**

One of the benefits of connecting capacitors in series is that each capacitor only sees a portion of the total applied voltage, hence you can apply a higher voltage than the max rated voltage for any single capacitor. However, care must be taken to make sure the capacitors don't build up a *charge imbalance*, which could cause a single capacitor to take more than it's fair share of voltage, and blow up! A balancing circuit can be made by connecting a high-value resistor(e.g. \(1M\Omega\)) across each capacitor. This causes any unbalanced build-up of charge to dissipate through the resistors, at the expense of increasing the leakage current of the circuit (remember, capacitors have an internal leakage current also). This is similar to how a battery cell charge balancing circuit works.

## Formulas

### Charge

The charge stored on the plates of a capacitor is related to the voltage and capacitance by:

$$\begin{align}
Q = CV
\end{align}$$

<p class="centered">
where:<br/>
\(Q\) = charge stored in plates (Coulombs)<br/>
\(C\) = capacitance (Farads)<br/>
\(V\) = voltage (Volts)<br/>
</p>

If using this formula, see the Capacitor Charge Calculator.

### Energy

The energy stored in a capacitor is:

$$\begin{align}
E = \frac{1}{2}CV^2
\end{align}$$

<p class="centered">
where:<br/>
\(E\) = energy stored in the capacitor (Joules)<br/>
\(C\) = capacitance (Farads)<br/>
\(V\) = voltage across the capacitor (Volts)<br/>
</p>

As shown by the equation, the energy stored in a capacitor is related to both the capacitance and voltage of the capacitor. A typical 100nF, 6.5V capacitor can store 2.11uJ. Not much huh! If you are really considering capacitors for their energy storage capabilities, you must look at supercapacitors, which have typical values of 100F and 2.5V (as of 2011). This gives 313J of energy, which is useful amount for powering something.

If using this formula, see the Capacitor Energy Calculator.

### Force

The force exerted on the two parallel plates of a capacitor is:

$$\begin{align}
F = \frac{\epsilon_0 AV^2}{2d^2}
\end{align}$$

<p class="centered">
where:<br/>
\(F\) = outwards force exerted on each parallel plate of the capacitor, in Newtons<br/>
\(\epsilon_0\) = the permittivity of free space<br/>
\(A\) = overlapping area of the two plates, in meters squared<br/>
\(V\) = voltage across the capacitor, in Volts<br/>
\(d\) = separation distance between the two plates, in meters<br/>
</p>

### Single Disc Capacitance

{{% figure ref="fig-diagram-for-disc-capacitance-equation" src="_assets/diagram-for-disc-capacitance-equation.svg" width="320px" caption="Diagram for the disc-to-infinity capacitance equation." %}}

The capacitance of a single thin plate as shown in {{% ref "fig-diagram-for-disc-capacitance-equation" %}}, with  a ground at 'infinity' (or more practically, just very far away) is:

$$\begin{align}
C = 35.4 \times 10^{-12} \epsilon_r d
\end{align}$$

<p class="centered">
where:<br/>
\(C\) = capacitance (Farads)<br/>
\(\epsilon_r\) = relative permittivity (1 for a vacuum)<br/>
\(d\) = diameter of the thin plate (meters)<br/>
</p>

### Sphere Capacitance

{{% figure ref="fig-diagram-for-sphere-capacitance-equation" src="_assets/diagram-for-sphere-capacitance-equation.svg" width="320px" caption="Diagram for the sphere-to-infinity capacitance equation." %}}

The capacitance of a single sphere as shown in {{% ref "fig-diagram-for-sphere-capacitance-equation" %}}, again with a ground at infinity is[^bib-qs-study-capacitance-spherical]:

$$\begin{align}
C = 4\pi \epsilon_0 \epsilon_r r
\end{align}$$

<p class="centered">
where:<br/>
\(C\) = capacitance [\(F\)]<br/>
\(\epsilon_0\) is the permittivity of free space, approx. \(8.85 \times 10^{-12}Fm^{-1}\)<br/>
\(\epsilon_r\) is the relative permittivity (\(1\) for a vacuum)<br/>
\(r\) is the radius of sphere [\(m\)]<br/>
</p>

### Parallel Plate Capacitance

The capacitance of two parallel plates is approximately

$$\begin{align}
C = \epsilon_r \epsilon_o\frac{A}{d}
\end{align}$$

<p class="centered">
where:<br/>
\(\epsilon_o\) is the electric constant (\(8.854 \times 10^{-12}Fm^{-1}\))<br/>
\(\epsilon_r\) is the relative permittivity of the material between the plates [no units]<br/>
\(A\) is the overlapping surface area of the parallel plates \([m^2]\)<br/>
\(d\) is the distance between the plates \([m]\)<br/>
</p>

### Concentric Cylinder Capacitance

{{% figure ref="fig-diagram-for-coaxial-cylinders-capacitance-equation" src="_assets/diagram-for-coaxial-cylinders-capacitance-equation.png" width="320px" caption="Diagram for the coaxial cylinder capacitance equation. Image from http://www.capsense.com/capsense-wp.pdf." %}}

The capacitance of two concentric cylinders as shown in {{% ref "fig-diagram-for-coaxial-cylinders-capacitance-equation" %}} is:

$$\begin{align}
C = \frac{2 \pi \epsilon_o \epsilon_r}{\ln (\frac{b}{a})} L
\end{align}$$

<p class="centered">
where:<br/>
\(a\) = radius of inner cylinder \([m]\)<br/>
\(b\) = radius of outer cylinder \([m]\)<br/>
\(L\) = length of both cylinders \([m]\)<br/>
and all other variables as previously mentioned<br/>
</p>

## Equivalent Series Resistance (ESR)

Ceramic SMD capacitors have very low ESRs. In fact, in certain applications, this can be a bad thing (such as the input/output stabilization capacitors for linear regulators and DC/DC converters), and either tantalums are used or resistance has to be added in series with the capacitor. Since usually only milli-Ohms is required, this can be done with an appropriately sized PCB track which is usually snaked to the capacitor terminal.

Electrolytic capacitors typically have a large ESR of 0.1-5Ω (there are special low-ESR types, but they still don't compare to ceramic caps).

Since the ESR is proportional to the capacitor's plate area, for a similar capacitor designs, the ESR decreases with increasing capacitance.

## Leakage Currents

Leakage currents are present in all types of capacitor. Leakage current is the sum of electrical losses from energy required to build up the oxide layers, weaknesses in the dielectric, tunnel effects, and cross currents. They are typically increase proportionally to the capacitance of the capacitor. We can reduce the leakage current down to two main factors, the absorption current \(I_{abs}\), and the intrinsic leakage current \(I_{il}\).

$$\begin{align}
I_{leakage} = I_{abs} + I_{il}
\end{align}$$

Absorption currents are due to quantum tunnelling of electrons at the metal/ceramic barrier! Absorption currents, \(I_{abs}\) reduce with time and have weak temperature dependence, while intrinsic leakage currents \(I_{il}\) remain constant with time but exponentially increase with temperature.

Desorption currents (depolarization) flow when the voltage on a capacitor is decreased (e.g. when it is shorted). These currents can actually recharge a previously discharged capacitor, sometimes up to dangerous voltages (people experimenting with coil/rail guns can have this problem)!

Capacitors that have had a relatively constant voltage across them for a decent amount of time typically exhibit far less absorption current than one which has not been charged in the short-term past. This is due to a phenomenon called ‘self-healing’, in where a charged capacitor will heal defects in the electrolyte. Uncharged electrolytic capacitors may have weakened electrolyte due to ‘dissolution’, the destruction of the dielectric when no charge is present.

The leakage current through a capacitor can be modelled with a resistor in parallel with the actual capacitance, as shown in {{% ref "fig-capacitor-with-parasitic-series-resistance-leakage-current" %}}.

{{% figure ref="fig-capacitor-with-parasitic-series-resistance-leakage-current" src="_assets/capacitor-with-parasitic-series-resistance-leakage-current.png" width="300px" caption="A capacitor showing the parasitic series resistance present in all real capacitors, which creates a leakage current." %}}

### How Leakage Current Is Specified

For electrolytics, the maximum leakage current is usually specified in terms of the capacitance.

$$\begin{align}
I_{leakage} = xC
\end{align}$$

<p class="centered">
where:<br/>
\( I_{leakage} \) = the leakage current, usually specified in units of mA (this is up to the manufacturer and their choice of constant)<br/>
\( x \) = a fixed constant (e.g. 0.5)<br/>
\( C \) = the capacitance of the capacitor, and again, choice of units is up to the manufacturer<br/>
</p>

{{% aside type="tip" %}}
When specified this way, the current is *completely independent on voltage*. The leakage current for electrolytic super-caps in the range of 1 to 100F is typically 0.5C (mA), where C is the rated capacitance in Farads.
{{% /aside %}}

The leakage current for MLCC capacitors is specified by an **insulation resistance**. To work out the leakage current, you just use Ohm's law as follows:

$$\begin{align}
I_{leakage} = \frac{V}{R_{insulation}}
\end{align}$$

<p class="centered">
where:<br/>
\( V \) = the voltage across the capacitor<br/>
\( R_{insulation} \) = the insulation resistance as specified on the capacitors datasheet<br/>
</p>

{{% aside type="tip" %}}
When leakage current is specified this way, *it is dependent on the voltage*.
{{% /aside %}}

Ceramic capacitors are rated with an initial minimum insulation resistance (e.g. \(500M\Omega\)) and then a lower minimum resistance rated over its entire life time (e.g. \(50M\Omega\)).

### Why Leakage Currents Are Important

Leakage current becomes an important parameter to consider when designing long-life battery powered circuits. This is especially true for circuits powered of primary batteries with high internal resistance, such as lithium thionyl chloride batteries (LiSOCl2), because large (>100uF) capacitors can be required to help provide energy during high pulse current situations. These capacitors can have significant leakage current.

### Measuring The Leakage Current Of A Capacitor

Because of the small currents/total energy involved, you can't really measure the leakage current of a capacitor with standard multimeter. One way is to use a dedicated high-resistance meter, commonly called a megaohm meter or insulation resistance tester.

## DC Bias Characteristic

The _DC Bias Characteristic_ is how a measure of how a capacitors **capacitance changes with applied DC voltage**. Some types of capacitors (such as [MLCC capacitors](#ceramic)) have a capacitance which significantly reduces as it's DC voltage increases.

The good news is this can be manipulated to make things such as voltage-controlled oscillators (VCOs), in where the capacitance is part of a resonant circuit, and the resonant frequency is changed by modifying the voltage on the capacitor, hence changing the capacitance. [Diodes](/electronics/components/diodes) also offer this feature and can be used to make FM radio signals by modulating a high-frequency waveform.

The bad news is that this also adversely affects the capacitance in situations where you want it to stay constant. The **drop in capacitance can upset op-amp gains, frequency cut-off points of filters, the time constant of RC oscillators, and the noise removal of decoupling caps**. This can actually be a very significant problems, especially with small [package](/pcb-design/component-packages/) size ceramic capacitors (such as 0603 and 0805 SMD chip capacitors). An excellent explanation on this effects if Maxim Integrated's [Temperature and Voltage Variation of Ceramic Capacitors, or Why Your 4.7uF Capacitor Becomes a 0.33uF Capacitor](http://www.maximintegrated.com/app-notes/index.mvp/id/5527). {{% ref "fig-graph-of-temperature-variation-of-ceramic-chip-4-7uf-capacitors" %}} is from Maxim's page, and just serves as an example to show by how much the capacitance can vary in normal operation conditions!

{{% figure ref="fig-graph-of-temperature-variation-of-ceramic-chip-4-7uf-capacitors" src="_assets/graph-of-temperature-variation-of-ceramic-chip-4-7uf-capacitors.png" width="800px" caption="Graph of the capacitance variation (w.r.t. voltage) of a select group of 4.7uF ceramic chip capacitors, Image from http://www.maximintegrated.com/app-notes/index.mvp/id/5527." %}}

Just to illustrate the change, a 22uF 6.3V X5R 0603 capacitor from Murata (GRT188R60J226ME13) has 22uF at 0V. This drops to only 3.6uF at 6.3V, a reduction of 84%[^murata-sim-surfing-tool-mlcc]!

It's important to note that the **DC bias problem gets worse with smaller ceramic chip capacitor packages**. {{% ref dc-bias-capacitance-derating-graph-from-murata %}} shows the difference in capacitance change for 4 caps which are almost identical except for the package they are in.

{{% figure ref="dc-bias-capacitance-derating-graph-from-murata" src="_assets/dc-bias-capacitance-derating-graph-from-murata.webp" width="600px" caption="Graph showing how the package size changes the DC bias behaviour. All 4 capacitors have are from the same manufacturer, and have the same ratings (capacitance, voltage, dielectric) except for package size. Graph was generated by Murata's SimSurfing tool[^murata-sim-surfing-tool-mlcc]." %}}

One possible explanation for why smaller packages suffer from more DC bias problems is that the electric field across the dielectric is stronger in smaller packages (same voltage across a smaller distance between the plates = larger electric field), leading to more non-linearities occurring in the permittivity of the dielectric[^eevblog-is-ceramic-capacitor-package-relevant].

## Decoupling

Capacitors are commonly used for decoupling, as shown in the schematic in {{% ref "fig-decoupling-caps-schematic-example-on-r-pi-pcb" %}}.

{{% figure ref="fig-decoupling-caps-schematic-example-on-r-pi-pcb" src="_assets/decoupling-caps-schematic-example-on-r-pi-pcb.png" width="400px" caption="Example usage of decoupling capacitors for ICs. Schematic is from the Raspberry-Pi PCB. Image from http://www.raspberrypi.org/wp-content/uploads/2012/04/Raspberry-Pi-Schematics-R1.0.pdf." %}}

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
<tr>
<td>X1</td>
<td>4,000</td>
</tr>
<tr>
<td>X2</td>
<td>2,500</td>
</tr>
<tr>
<td>Y1</td>
<td>8,000</td>
</tr>
<tr>
<td>Y2</td>
<td>5,000</td>
</tr>
</tbody>
</table>

## Dielectric Soakage

A weird and little known about property of capacitors is their ability to seemingly 'create' energy and charge themselves up when left in certain conditions. This can be particularly dangerous with high voltage capacitors such as the old oil-filled paper capacitors, which would charge themselves up and then give anyone a shock who was unfortunate enough to get too close.

It's called dielectric soakage because it's essentially a property of the dielectric which retains some of the charge if a capacitor is discharged quickly and then left open circuit. The voltage climb can be up to 10% of the original voltage on the capacitor.

## Charge Pumps (Bootstrapping)

A charge pump (also commonly called **bootstrapping**), is a way of using capacitors to generate a voltage higher than the supply. A typical charge-pump circuit has two capacitors and two diodes, and requires an oscillating input.

It is commonly used as a simple way of driving the gate of a n-doped silicon switch (such as a N-Channel MOSFET or IGBT) when being used as a high side driver. Although using a P-Channel as the high-side driver would not require this voltage step-up, N-Channel MOSFETs are preferred in most cases because of their lower on-resistance and price. When using a capacitor to charge the gate of a N-Channel MOSFET, you must make sure the capacitor stores enough charge to transfer to the MOSFET gate while raising the voltage enough drive the on-resistance as low as you need. A general rule of thumb is that the capacitor should store 100x more charge than the gate charge as stated on the MOSFETs datasheet. The charge stored in a capacitor can be calculated using the following equation:

$$\begin{align}
Q = CV
\end{align}$$

<p class="centered">
where:<br/>
\(Q\) is the charge (Coulombs)<br/>
\(C\) the capacitance (Farads)<br/>
\(V\) the voltage (Volts)<br/>
</p>

However, if you really want to optimise the charge pump capacitor, this rule does not suffice. The Fairchild Semiconductor Application Note, [Design And Application Guide Of Bootstrap Circuit For High-Voltage Gate-Drive IC](http://www.fairchildsemi.com/an/AN/AN-6076.pdf) has an in-depth analysis of the bootstrap capacitor and surrounding circuit.

{{% ref "fig-charge-pump-based-negative-voltage-gen-schematic" %}} shows a charge pump circuit used to generate -5V from a +5V PWM signal.

{{% figure ref="fig-charge-pump-based-negative-voltage-gen-schematic" src="_assets/charge-pump-based-negative-voltage-gen-schematic.png" width="800px" caption="This schematic shows a charge pump circuit used to generate -5V from a +5V PWM signal." %}}

For more infomation, see the [Electronics->Components->Power Regulators->Charge Pumps page](/electronics/components/power-regulators/charge-pumps/).

## Feedthrough Capacitors

Feedthrough (or feedthru) capacitors are special three-terminal capacitors (sometimes with four connections) used for **suppression** of **RF noise**. They are also known under the more general name of an _EMI suppression filter_ or _three-terminal capacitor_. {{% ref "fig-feedthrough-capacitor-3d-render-0603-1608-3-connections" %}} is a render of a 3-terminal 0603 feedthrough capacitor.

{{% figure ref="fig-feedthrough-capacitor-3d-render-0603-1608-3-connections" src="_assets/feedthrough-capacitor-3d-render-0603-1608-3-connections.jpg" width="350px" caption="A 3D render of an 0603-sized feedthrough capacitor with 3 connections. Image from www.digikey.com." %}}

Their advantage over a standard decoupling capacitor to ground is **lower parasitic series inductance**, which offers a lower impedance path for RF noise to ground.

### Schematic Symbol

{{% figure ref="fig-feedthrough-capacitor-schematic-symbol-3-connection" src="_assets/feedthrough-capacitor-schematic-symbol-3-connection.png" width="400px" caption="The schematic symbol for a 3-terminal feedthrough capacitor." %}}

### Component Package

Many smaller, PCB suitable feedthrough capacitors come in [chip packages](/pcb-design/component-packages/chip-eia-component-packages), such as the 0603 or 0402 size. They can be distinguished from normal capacitors by the fact that the package will have three or four terminals rather than the standard two.

### Uses

Feedthrough capacitors are commonly used in [RC, LC, π and t-type filters](/electronics/circuit-design/analogue-filters) when good RF performance is required.

## Capacitance Multipliers

_Capacitance multipliers_ are circuits which use an active element such as a BJT transistor to "multiply" a capacitor to create an effective capacitance which is much larger. They are useful for:

* Transformer/rectifier style DC PSU voltage rail filtering.
* Providing low-pass filtering into heavy loads, in where just a standard RC filter would suffer from too much voltage drop (or power dissipation) across the resistor.
* Power supply filtering for Class-A audio amplifiers.

What they are not good for is propping up the voltage rail when the load itself experiences a high di/dt (change in current over time). Loads that draw high peak currents include solenoids switching and H-bridges. They are not any better than a regular capacitor in this regard, as they store no more energy.

The below schematic shows a simple capacitance multiplier made from 1 resistor, 1 capacitor and 1 NPN BJT transistor:

{{% figure ref="fig-capacitance-multiplier-simple" src="_assets/capacitance-multiplier-simple.svg" width="500px" caption="A simple capacitance multiplier consisting of a single resistor, capacitor and NPN BJT transistor. The effective capacitance is approximately the capacitance of C1 multiplied by the current gain B of the transistor." %}}

The BJT is configured as a emitter-follower (common collector). The output voltage will always be \(0.7V\) less than the voltage across the capacitor. When the load draws current at \(V_{OUT}\), rather than all of that current loading the RC filter, only the proportion \(\frac{1}{\beta + 1}\) gets drawn through the base from the RC filter, the rest of it gets delivered directly from \(V_{IN}\) via the collector. The effective capacitance seen by the circuit is the capacitance of C1 multiplied by the current gain \(\beta + 1\) of the transistor:

$$\begin{align}
\label{eq:eff-cap}
C_{eff} = (\beta + 1)\ C1
\end{align}$$

Normally \(\beta >> 1\) such that it's simplified to:

$$\begin{align}
C_{eff} = \beta\ C1
\end{align}$$

The cut-off frequency for the capacitance multiplier is:

$$\begin{align}
\label{eq:cap-mult-rc-cutoff}
f_c = \frac{1}{2\pi R1 C1}
\end{align}$$

{{% aside type="warning" %}}
Even though this circuit is called a capacitance multiplier, when calculating the cutoff frequency, you must use the real capacitance value, not the effective capacitance! For this I consider this circuit's name somewhat misleading, as the corner frequency is just the same as a regular old RC low-pass filter. What does change is the current capability of the filter, as now most of the current is going through \(Q1\), rather than \(R1\). Perhaps the name _buffered RC filter_ would be better than _capacitance multiplier_?
{{% /aside %}}

The steady-state output voltage at no load is:

$$\begin{align}
V_{OUT} = V_{IN} - 0.7V
\end{align}$$

We can improve on the above design by changing the resistor into a resistor divider.

{{% figure ref="fig-capacitance-multiplier-resistor-divider" src="_assets/capacitance-multiplier-resistor-divider.svg" width="500px" caption="A capacitance multiplier which has improved filtering performance compared to the single resistor version." %}}

Adding in \(R2\) lowers the base voltage applied to the transistor, which then lowers the output voltage. Because more voltage is now dropped across the transistor, the circuit is able to provide better filtering than before when the input voltage droops.

The steady-state output voltage (at no load) is:

$$\begin{align}
V_{OUT} = \frac{R2}{R1 + R2} V_{IN} - 0.7V
\end{align}$$

The cut-off frequency for the 2 resistor capacitance multiplier is the same equation as Eq. \ref{eq:cap-mult-rc-cutoff} but with the equivalent resistance being \(R1\) and \(R2\) in parallel:

$$\begin{align}
f_c &= \frac{1}{2\pi (R1 || R2) C1} \nonumber \\
\label{eq:cm-resistor-divider-cutoff}
    &= \frac{R1 + R2}{2\pi R1 R2 C1}
\end{align}$$

The "effective capacitance" is exactly the same as in the single-resistor version in Eq. \ref{eq:eff-cap} (but remember, you don't use this for the cutoff frequency calculations).

{{% aside type="example" %}}

Let's go through the design process for a capacitance multiplier circuit, and then simulate it using KiCad/ngspice to see what it's frequency response is.

Design criteria:

* 12VDC in
* Assume power supply is very noisy, with the voltage fluctuating at most 1Vp2p with frequency components from 50Hz (mains ripple) to 100kHz.
* Cut-off frequency of 10Hz (which is quite low)
* A relatively low load resistance of \(100\Omega\) (you can go even lower, but smaller resistors/bigger caps are needed)

Given the noise fluctuations can be up to \(1V_{p2p}\), we want the *BJT transistor to be dropping more than \(1V_{p2p}\) so that in input voltage is always larger than our output voltage*, even with the ripple present on the input. Let's aim for nominal \(10V\) output at no load.

$$\begin{align}
V_{OUT} = 10V
\end{align}$$

This constrains the ratio of \(R1\) and \(R2\) as (basic resistor divider equation):

$$\begin{align}
\label{eq:cm-r1-r2-vin-vout}
\frac{R1}{R2} = \frac{V_{IN} - V_{OUT}}{V_{OUT}}
\end{align}$$

We'll use the time-honoured 2N2222 NPN transistor, just because, well, I had a simulation model for it (power consumption shouldn't be to high that we'd need something beefier, but more on that below). The forward current gain (\(\beta\)) of the 2N2222 is simulated at \(200\).

Our load resistance is \(100\Omega\). At \(10V\), this will be a current of \(100mA\). We need to make sure this current will not cause a significant extra voltage drop across \(R1\), which would cause the output voltage to droop. Let's allow for \(100mV\) of drop (i.e. \(V_{OUT} = 9.9V\)) at \(100mA\).

\(100mA\) through the load will cause a current to be drawn through \(R1\) that will be \(\beta + 1\) times smaller:

$$\begin{align}
I_{R1} &= \frac{1}{\beta + 1} I_{load} \nonumber \\
       &= \frac{1}{200 + 1} * 100mA \nonumber \\
       &= 498uA
\end{align}$$

{{% aside type="tip" %}}
\(I_{R1}\) will actually be larger than this due to the current through it drawn down to ground via \(R2\). But this number is fine for calculation purposes.
{{% /aside %}}

We can now find what value of \(R1\) will produce no more than \(100mV\) drop:

$$\begin{align}
R1 &= \frac{V_{R1}}{I_{R1}} \nonumber \\
   &= \frac{100mV}{498uA} \nonumber \\
   &= 200\Omega
\end{align}$$

Then using Eq. \ref{eq:cm-r1-r2-vin-vout}, that means \(R2\) must be:

$$\begin{align}
R2 &= R1 \frac{V_{OUT}}{V_{IN} - V_{OUT}} \nonumber \\
   &= 200\Omega \frac{10V}{12V - 10V} \nonumber \\
   &= 1k\Omega
\end{align}$$

Now we have found \(R1\) and \(R2\), \(C1\) is determined for us by the cut-off equation (Eq. \ref{eq:cm-resistor-divider-cutoff}):

$$\begin{align}
C1 &= \frac{R1 + R2}{2\pi R1 R2 f_c} \nonumber \\
   &= \frac{200\Omega + 1k\Omega}{2\pi*200\Omega*1k\Omega*10Hz} \nonumber  \\
   &= 95uF \nonumber \\
   &= 100uF\ \text{(E12 series)}
\end{align}$$

We can now draw the finished schematic:

{{% figure src="_assets/capacitance-multiplier-sim/schematic.png" width="800px" caption="Simulation-ready schematic of the capacitance multiplier we are designing. " %}}

Running AC analysis using ngspice gives us the following frequency response (bode plot):

{{% figure src="_assets/capacitance-multiplier-sim/out.png" width="800px" caption="The simulated frequency response of the capacitance multiplier circuit above. " %}}

Looking at the "DC" gain, it is a value of \(-1.75dB\). At an input voltage of \(12V\) this corresponds to an output voltage of \(12V \cdot 10^{\frac{-1.75}{20}} = 9.8V\), close to the \(9.9V\) we were aiming for.

Our cut-off frequency should then be \(-3dB\) ontop of that, i.e. at \(-1.75dB - 3dB = -4.75dB\). Plotting across and then down does indeed give us a cut-off frequency of approx. \(10Hz\). The roll-off in the stop band is the same as a standard RC low-pass filter at \(-20dB/decade\).

{{% aside type="warning" %}}
Watch out for the transistors power dissipation! In our example, \(100mA\) was going through the 2N2222 which was dropping \(2.1V\). This gives \(210mW\), which should be o.k. for the 2N2222 (when in the old style TO-18 can package). But capacitance multipliers are typically used in high-current situations (many amps and more), in where careful attention has to be given to the power dissipation in the transistor. Large transistors and/or heat-sinking may be required. The voltage drop can also be reduced, but this also gives to a poorer filtering capability (i.e. less headroom).
{{% /aside %}}

Capacitance multipliers don't have to built from BJT transistors, they can also use MOSFETs or op-amps as their active component. BJTs are used in a majority of cases though because of their cost, power dissipation capability, and simplicity.

{{% /aside %}}

## Repairing Electrolytic Capacitors

When electrolytic capacitors get old, they can dry out and stop working properly (for example, their capacitance can reduce and/or maximum dielectric voltage drop). There are many sources quoting that electrolytic capacitors can be repaired by ramping the voltage slowly up to its full rated voltage. It is meant to repair the aluminium oxide dielectric layer.

{{% figure ref="fig-circuit-schematic-showing-how-to-repair-an-electrolytic-capacitor" src="_assets/circuit-schematic-showing-how-to-repair-an-electrolytic-capacitor.png" width="300px" caption="Schematic showing how to repair/reform an old electrolytic capacitor. The voltage on the capacitor should slowly rise to the rated voltage." %}}

This can be done with power supply set the rated voltage and a high-power (e.g. 5W) 30kΩ resistor in series with the capacitor, as shown in the image above. Connect the circuit and measure the voltage across the capacitor. It should start at 0V and increase as an inverse exponential as the current through the capacitor decreases. Wait until the voltage across the capacitor gets above 90% of the rated voltage before disconnecting the circuit, as shown in the image below. If the voltage stabilises below 90% of the full-rated voltage, the capacitor is stuffed and can be thrown out.

{{% figure ref="fig-capacitor-voltage-graph-while-charging-through-resistor-for-reforming" src="_assets/capacitor-voltage-graph-while-charging-through-resistor-for-reforming.png" width="400px" caption="Graph of an electrolytic capacitor charging through a resistor to reform the aluminium oxide. The graph part of the image from http://www.antonine-education.co.uk/Pages/Electronics_2/Timing_Subsystems/RC_Networks/further_page_2.htm." %}}

## Energy Loss While Charging A Capacitor

An interesting phenomenon occurs when charging a capacitor from a fixed voltage source (e.g. battery or power supply). Assuming a real-world world situation, there is always going to be some resistance between the voltage source and capacitor. **Exactly the same amount of energy** is dissipated through this resistance as is stored in the capacitor when charging it up to the voltage source voltage \(V_{cc}\). It **doesn't matter how large or small** this resistance is! The resistance could just be the ESR of the capacitor, or it could be a dedicated resistor placed in series to limit the inrush current.

{{% ref "fig-energy-loss-while-charging-a-capacitor-schematic" %}} shows an example schematic.

{{% figure ref="fig-energy-loss-while-charging-a-capacitor-schematic" src="_assets/energy-loss-while-charging-a-capacitor-schematic.webp" width="600px" caption="A schematic showing the basic circuit while charging a capacitor, highlighting the energy lost in the series resistance." %}}

This quite significant and fixed energy loss has implications when it comes to charging caps in low-power circuits (e.g. running of a battery), and sizing resistors (including NTC thermistors) for limiting the inrush current to capacitors, normally as part of the front end to a power supply or motor driver.

{{% aside type="tip" %}}
Luckily, losing half the energy in the series resistance only applies to charging a capacitor from a fixed voltage source with no other components. If you charge a cap with a variable voltage source or by also using inductance you can significantly reduce energy losses! 
{{% /aside %}}

### The Proof

Let's start from the basics.

We know total energy in the circuit is the integral of power over time:

$$\begin{align}
E_{in} = \int{P_{in} \cdot dt}
\end{align}$$

Using the basic equation for electrical power \(P = VI\) we can write:

$$\begin{align}
P_{in} = V_{in} \cdot I_{in}
\end{align}$$

Substituting the power equation into integral equation, we get an equation for the energy in terms of the voltage and current:

$$\begin{align}
E_{in} = \int{  V_{in} I_{in} \cdot dt }
\end{align}$$

If we assume a fixed DC voltage source, \(V_{in}\), that does not vary over time, we can bring it outside the integral:

$$\begin{align}
E_{in} = V_{in} \int{  I_{in} \cdot dt }
\end{align}$$

Now using the equation for charge in it's integral form \(Q = \int{I \cdot dt}\) we can write:

$$\begin{align}
Q_{in} = \int{I_{in} \cdot dt}
\end{align}$$

We can substitute the charge equation into for energy equation:

$$\begin{align}
E_{in} = V_{in} Q_{in}
\end{align}$$

Assuming the cap was fully charged to \(V_{in}\) (o.k., this would take an infinite amount of time, but lets just be realistic and say 99.9% is fully charged), and using the basic formula for the energy in a capacitor (\(E = \frac{1}{2}CV^2\)), we can write:

$$\begin{align}
E_{cap} = \frac{1}{2}CV_{in}^2
\end{align}$$

Now, all of the input charge \(Q_{in}\) referred to in charge equation got to the capacitor since the resistor and capacitor share the same current. The equation for the energy in the capacitor can be re-written in terms of charge (using \(Q=CV\)):

$$\begin{align}
E_{cap} = \frac{1}{2} V_{in} Q_{in}
\end{align}$$

We now have an equation for the energy given out by the voltage source, and an equation for the amount of energy given to the capacitor. Subtracting the two will give the amount of energy lost to the resistance during charging:

$$\begin{align} 
E_{res} &= E_{in} - E_{cap} \nonumber \\
        &= V_{in} Q_{in} - \frac{1}{2} V_{in} Q_{in} \nonumber \\
        &= \frac{1}{2} V_{in} Q_{in}
\end{align}$$

Woah, hang on a moment, this is the same as the energy in the capacitor!

This implies that when charging a capacitor from a fixed DC source, you dissipate just as much energy as heat as you store in the capacitor. It does not matter what the resistance is (it could just be the resistance of the wires and the ESR (equivalent series resistance) in the capacitor).

## References

[^bib-capacitorguide.com]: http://www.capacitorguide.com/film-capacitor/.
[^bib-wikipedia-film-capacitor]: Wikipedia (2023, Jun 19). _Film capacitor_ [Web Page]. Retrieved 2023-07-11, from https://en.wikipedia.org/wiki/Film_capacitor.
[^bib-ceramic-dielectric-types]: https://www.electronics-notes.com/articles/electronic_components/capacitors/ceramic-dielectric-types-c0g-x7r-z5u-y5v.php.
[^bib-qs-study-capacitance-spherical]: QS Study. _Capacitance of a Spherical Conductor_. Retrieved 2021-09-17, from https://qsstudy.com/physics/capacitance-spherical-conductor.
[^bib-avx-auto-mlcc]: AVX. _Automotive MLCC (datasheet)_. Retrieved 2022-02-01, from https://datasheets.avx.com/AutoMLCC.pdf.
[^bib-cadence-causes-of-elec-cap-degradation]: Cadence. _The Causes of Electrolytic Capacitor Degradation_. Retrieved 2023-06-05, from https://resources.pcb.cadence.com/blog/2022-the-causes-of-electrolytic-capacitor-degradation.
[^bib-nasa-self-healing-tantalum]: Alexander Teverovsky. _Breakdown and Self-healing in Tantalum Capacitors_. Jacobs Technology Inc. Retrieved 2023-06-05, from https://ntrs.nasa.gov/api/citations/20205008339/downloads/Breakdown%20and%20Self-healing%20DEI%20rev%20A1.pdf.
[^bib-wikipedia-tantalum-capacitor]: Wikipedia (2023, Apr 11). _Tantalum capacitor_. Retrieved 2023-06-05, from https://en.wikipedia.org/wiki/Tantalum_capacitor. 
[^bib-passive-component-industry-electrolytic-failures]: Passive Component Industry (2002, Sep). _Low-ESR Aluminum Electrolytic Failures Linked to Taiwanese Raw Material Problems_. Retrieved 2023-06-05, from https://web.archive.org/web/20160303234525/http://old.passivecomponentmagazine.com/files/archives/2002/PCI_02_05Sept-Oct.pdf.
[^murata-sim-surfing-tool-mlcc]: Murata. _SimSurfing_ [Online Design Support Software]. Retrieved 2023-07-11, from https://ds.murata.co.jp/simsurfing/mlcc.html?lcid=en-us.
[^covaci-singing-mlccs-and-mitigation]: Covaci C, Gontean A (2022, May 19). _"Singing" Multilayer Ceramic Capacitors and Mitigation Methods - A Review_. Sensors (Basel). 22(10):3869. doi: 10.3390/s22103869. PMID: 35632278; PMCID: PMC9147252. Retrireved 2023-07-12, from https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9147252/.
[^britannica-dielectric]: Britannica (2023, Jun 13). _Dielectric_ [Encyclopedia Entry]. Retrieved 2023-07-12, from https://www.britannica.com/science/dielectric. 
[^wikipedia-dielectric]: Wikipedia (2023, Jun 9). _Dielectric_ [Encyclopedia Entry]. Retrieved 2023-07-12, https://en.wikipedia.org/wiki/Dielectric.
[^eevblog-is-ceramic-capacitor-package-relevant]: EEVblog. _Is ceramic capacitor package relevant?_ [Forum Thread]. Retrieved 2023-07-12, from https://www.eevblog.com/forum/projects/is-ceramic-capacitor-package-relevant/.
[^tdk-temp-characteristics-mlcc]: Trevor Crow (2014, Jan). _Temperature Characteristics of Multilayer Ceramic Capacitors_ [PDF]. TDK. Retrieved 2023-07-12, from https://file.elecfans.com/web1/M00/20/AD/oYYBAFmkxDGAAYIpAAb6nD4zLi0492.pdf.
[^kemet-heres-what-makes-mlcc-dielectrics-different]: (2019, April 4). _Here’s What Makes MLCC Dielectrics Different_ [Article]. Retrieved 2023-07-13, from https://www.kemet.com/en/us/technical-resources/heres-what-makes-mlcc-dielectrics-different.html.
[^tutorials-point-difference-between-dielectric-constant-and-permittivity]: Vineet Nanda (2023-04-18). _Difference Between Dielectric Constant and Permittivity_ [Article]. TutorialsPoint. Retrieved 2023-07-13, from https://www.tutorialspoint.com/difference-between-dielectric-constant-and-permittivity.
[^wikipedia-relative-permittivity]: Wikipedia (2023, April 19). _Relative permittivity_ [Encylopedia Entry]. Retrieved 2023-07-13, from https://en.wikipedia.org/wiki/Relative_permittivity.

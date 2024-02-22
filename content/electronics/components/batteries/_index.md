---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Electronic Components ]
date: 2011-09-05
draft: false
lastmod: 2023-07-31
title: Batteries
type: page
---

## Button Cells (Coin Cells)

### Overview

Button cells maybe also be known as coin cells or watch batteries.

### Polarity

The insulated top cap of a button cell is the negative terminal, the base is the positive terminal.

### Internal Resistance

The internal resistance of a coin cell battery starts of at a rather large 10Ω. This then rapidly increases as the batteries energy is consumed. Where high pulse currents are needed, coin cell batteries can be used in conjunction with high-valued capacitors.

A rule of thumb for coin cell batteries is that 10mA is the maximum current draw.

### Technologies

#### Silver Cell

Silver cells have a very stable output voltage over the lifespan of the battery.

### Common Types

CR2032. CR2025.

## Lithium Thionyl Chloride Batteries

### Overview

_Lithium thionyl chloride_ batteries are non-rechargeable batteries that are good for long-term power applications such as wireless remote sensors, backup power for non-persistent memory ICs, and real-time clocks. They are different to family of rechargeable [Lithium-ion battery technologies](/electronics/components/batteries/lithium-ion/), such as Lithium-ion, Lithium-polymer and Lithium-iron phosphate.

### Voltage

Lithium thionyl chloride batteries have a nominal voltage of 3.6V.

### Current Draw

This is where Lithium thionyl chloride batteries show their weakness. They are really bad at providing large pulse currents, due to their high internal resistance. This can make the batteries bad at powering pulse-current drawing things like cellular modems. You can add super-capacitors to provide the pulse current in some applications. Some manufacturers have begun selling a combined battery/supercap module which allows for higher pulse currents.

### Leakage Current

Lithium thionyl chloride batteries have a really low leakage current.

### Discharge Characteristics

They have a pretty flat voltage discharge characteristic.

### Energy Density

They have an energy density of 970mWh/cm^3 (when the discharge current is 100uA).

### Temperature Range

They can be used over a wide temperature range of \(-55^\circ C\) to \(+85^\circ C\).

### Chemical Reaction

Lithium thionyl chloride batteries use liquid thionyl chloride (\(SOCl_2\) as the positive active material, and lithium (Li) as the negative active material.

Note that the following table describes the reactions for **discharging**, the reactions occur in the opposite direction when the battery is **recharging**.

<table >
	<tbody>
		<tr>
      <td>Positive Reaction:</td>
      <td>$$2SOCl_2 + 4Li^+ + 4e^- -> 4LiCl + S + SO_2$$</td>
		</tr>
		<tr>
			<td>Negative Reaction:</td>
			<td>$$Li -> Li^+ + e^-$$</td>
    </tr>
		<tr>
			<td>Combined Reaction:</td>
			<td>$$2SOCl_2 + 4Li -> 4LiCl + S + SO_2$$</td>
		</tr>
	</tbody>
</table>

## Zinc-Air Batteries

### Overview

Zinc-air batteries are batteries characterised by their use of zinc and a reaction with atmospheric oxygen. There is both non-rechargeable (primary) and rechargeable (secondary) zinc-air batteries, although the primary batteries are far more common.

{{% figure src="zinc-air-battery-cut-away-annotated.jpg" width="450px" caption="A cut-away of a zinc-air button cell with annotations. Image from http://hear-better.com/." %}}

### Chemistry

A zinc-air battery is a specific type of metal-air battery. 

The reactions at each part of the battery are shown below:

#### Anode

$$\begin{align}
Zn + 4OH^- \to Zn(OH)_4^{2-} + 2e^-
\end{align}$$

This has a voltage potential of \(E_0 = -1.25V\).

#### Fluid

$$\begin{align}
Zn(OH)_4^{2-} \to ZnO + H_2 O + 2OH^-
\end{align}$$

#### Cathode

$$\begin{align}
\frac{1}{2}O_2 + H_2 O + 2e^- \to 2OH^-
\end{align}$$

This has a voltage potential of \(E_0 = 0.34V\).

#### Overall

$$\begin{align}
2Zn + O_2 \to 2ZnO
\end{align}$$

This has a voltage potential of \(E_0 = 1.59V\).

### Voltage

The theoretical voltage of a zinc-air cell is 1.65V (based on the chemistry). In reality, the voltage of a zinc-air cell is between 1.35-1.4V.

### Energy Density

One of zinc-air's unique properties is that they consume atmospheric oxygen as part of the chemical reaction. This means that they can have higher energy densities than other similar batteries because one of the reactants is not actually contained within the battery.

### Storage

Zinc-air batteries can be stored without losing much energy as long as oxygen is kept away from the battery. Digital hearing aids come with a little tab that must be removed before use, this tab prevents air from entering the battery and reacting with the zinc. They can last for 3 years with little capacity loss.

### Applications

Most digital hearing aids use zinc-air button cells. You remove a tab to allow air into the battery, starting the reaction that produces an electro-motive force (i.e. the voltage).

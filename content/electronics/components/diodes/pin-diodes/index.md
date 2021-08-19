---
authors: [ "Geoffrey Hunter" ]
date: 2016-08-07
draft: false
tags: [ "components", "diodes", "PIN", "light detector", "RF", "reverse recovery"]
title: PIN Diodes
type: page
---

<h2>Overview</h2>

<p>A PIN diode is a semiconductor diode with a wide undoped intrinsic semiconductor region between a p-type and n-type semiconductor region (hence the name PIN).</p>

{{< img src="pin-diode-photo-small.jpg" width="192px" caption="A photo of a small, through-hole PIN diode."  >}}

<p>A "normal" PN diode has a very small intrinsic region, which is good when you wish to use the diode as a standard rectifier. The PIN diodes wide intrinsic region makes it an inferior rectifier, but gives it other desirable properties.</p>

<p>A PIN diode is a light detector. It can be used to convert optical signals into electrical electrical signals. It consists of a p region, an intrinsic region, and a n region (hence the name PIN diode).</p>

<h2>Important Parameters</h2>

<table>
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Symbol</th>
            <th>Units</th>
            <th>Description</th>
        </tr>
    </thead>
<tbody>
<tr>
<td>Dark Current</td>
<td >\(I_D\)</td>
<td >A</td>
<td >Typically in the 0.1-5nA range.</td>
</tr>
<tr >
<td >Extinction Ratio</td>
<td > </td>
<td >none</td>
<td > </td>
</tr>
<tr >
<td >Field of View</td>
<td >FoV</td>
<td > </td>
<td ></td>
</tr>
<tr >
<td >Output Rise Time</td>
<td >\(t_r\)</td>
<td >s</td>
<td > </td>
</tr>
<tr >
<td >Responsivity</td>
<td > </td>
<td >A/W</td>
</tr>
</tbody>
</table>

<p>PIN diodes are normally operated in the reverse bias state.</p>

<p>Because of their good light-to-current linearity, they are commonly connected to a transimpedance amplifier (one which converts an input current into an output voltage). A typical example would be the Maxim MAX3658, which is designed for fibre-optic applications.</p>

<h2>RF Applications</h2>

<p>They act as almost perfect resistors in the RF and microwave frequencies. The resistivity these AC waveforms see is dependent on the DC bias current flowing through the diode, and the intensity, wavelength and modulation rate of the incoming light.</p>

<p>Because the PIN diodes RF resistance is dependant on the DC bias current, they can be used as an RF switch or variable resistor. The RF resistance can range from about \( 100m\Omega\) to \(10k\Omega\).</p>

<h2>Reverse Recovery Time</h2>

<p>PIN diodes have a very poor reverse recovery time.</p>

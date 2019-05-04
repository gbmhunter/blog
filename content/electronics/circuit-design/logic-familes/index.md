---
author: gbmhunter
categories: [ "Electronics", "Circuit Design" ]
date: 2015-07-15
draft: false
title: "Logic Families"
type: page
---

## HSTL

HSTL compares the input voltage with a reference voltage.

## CMOS

### Overview

Complementary metal-oxide semiconductor.

{{< img src="logic-family-cmos-technologies-voltage-vs-speed.png" width="762px" caption="A comparison of voltage vs. speed for a range of CMOS-based logic families. Image from http://www.ti.com/."  >}}

## AUC

Advanced ultra-low CMOS (AUC) is a CMOS logic family. It is optimised for 1.8V operation and voltage tolerant up to 3.6V.

## LVCMOS

Voltage specifications:

<table>
    <tr>
        <th>Parameter</th>
        <th>Minimum</th>
        <th>Typical</th>
        <th>Maximum</th>
    </tr>
    <tbody >
        <tr >
            <td>\( V_{CCO} \)</td>
            <td>2.3V</td>
            <td>2.5V</td>
            <td>2.7V</td>
        </tr>
        <tr>
            <td>\( V_{REF} \)</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr>
            <td>\( V_{TT} \)</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        </tr>
        <tr >
            <td>\( V_{IH} \)</td>
            <td>1.7V</td>
            <td>-</td>
            <td>3.6V</td>
        </tr>
        <tr>
            <td>\( V_{IL} \)</td>
            <td>-0.5V</td>
            <td>-</td>
            <td>0.7V</td>
        </tr>
        <tr >
<td >\( V_{OH} \)</td>
<td >1.9V</td>
<td >-</td>
<td >-</td>
</tr>
<tr >
<td >\( V_{OL} \)</td>
<td >-</td>
<td >-</td>
<td >0.4V</td>
</tr>
<tr >
<td >\( I_{OH} @ V_{OH} \)</td>
<td >-12mA</td>
<td >-</td>
<td >-</td>
</tr>
<tr >
<td >\( I_{OL} @ V_{OL} \)</td>
<td >12mA</td>
<td >-</td>
<td >-</td>
</tr>
</tbody>
</table>

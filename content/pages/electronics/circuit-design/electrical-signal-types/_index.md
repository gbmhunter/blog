---
author: gbmhunter
date: 2013-12-16 23:28:56+00:00
draft: false
title: Electrical Signal Types
type: page

---

Signal types are sorted in alphabetical order. Take note that there may be a low-voltage equivalent of many signal types under the prefix "LV" (e.g. TTL and LVTTL).

# CML

> See PECL.

# CSEF

> See PECL.

# CSL

> See PECL.

# DCS (Differential Current Switch)

# DTLL (Differential Transistor-Transistor Logic)

DTLL is a differential signal type that is similar to standard to TTL. Because of it's differential nature, DTLL is preferred over TTL for communications over long cables. DTLL comes under the category HVDS (high-voltage differential signalling), and is the most popular choice in this category.

# LVTTL

## Stats

<table style="width: 500px;" border="0" >
<tbody >
<tr style="height: 28px;" >
<td style="height: 28px;" >**Mode**
</td>
<td style="height: 28px;" >**Single-ended**
</td>
</tr>
<tr style="height: 28px;" >
<td style="height: 28px;" >Logic High
</td>
<td style="height: 28px;" >
</td>
</tr>
<tr style="height: 28px;" >
<td style="height: 28px;" >Logic Low
</td>
<td style="height: 28px;" >
</td>
</tr>
</tbody>
</table>


LVTTL is the low-voltage version of TTL.

Common drive-strengths are 24mA.

## Converters

TI SN65LVELT23 converts LVPECL and LVDS to LVTTL.

# LVDS

## Stats

<table style="width: 500px;" border="0" >
<tbody >
<tr >
<td >**Mode**
</td>

<td >**Differential**
</td>
</tr>
<tr>

<td >Logic High ([latex]V_{OH}[/latex])
</td>

<td >1.55mV (+3.5mA through 100Ω)
</td>
</tr>
<tr >

<td >Logic Out Low ([latex]V_{OL}[/latex])
</td>

<td >0.95mV (-3.5mA through 100Ω)
</td>
</tr>
<tr >

<td >Common-mode Voltage ([latex]V_{CMO}[/latex])
</td>

<td >1.20V
</td>
</tr>
<tr >

<td >Power ([latex]P[/latex])
</td>

<td >8.75mW (@ [latex]V){CC}=2.5V[/latex])
</td>
</tr>
</tbody>
</table>


Because the current is kept constant (3.5mA), it doesn't put as much pressure on the decoupling capacitors to provide the energy during switching states. The low common-mode voltage (1.20V), allows this signalling standard to be used with a wide variety of IC's with power supplies down to 2.5V or lower.




LVDS consumes very little power compared to other differential signalling techniques. At a 2.5V supply, the power to drive a line with LVDS is 8.75mW




## Converters




TI SN65LVELT23 converts LVPECL and LVDS to LVTTL.




# LVPECL (Low-Voltage Emitter-Coupled Logic)




LVPECL is the low-voltage version of PECL.




## Converters




TI SN65LVELT23 converts LVPECL and LVDS to LVTTL.




# PECL (Emitter-Coupled Logic)




PECL is also called CSL (current-steering logic), CML (current-mode logic) or CSEF (current-switch emitter-follower logic).




The MOSFET-based equivalent of PECL is SCFL (source-coupled logic).




# SCFL (Source-Coupled Logic)




The transistor-based equivalent of SCFL is PECL (emitter-coupled logic).




# TTL




LVTTL is the low-voltage version of TTL.

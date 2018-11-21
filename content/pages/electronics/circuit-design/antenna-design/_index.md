---
author: gbmhunter
date: 2013-10-30 20:01:08+00:00
draft: false
title: Antenna Design
type: page
url: /electronics/circuit-design/antenna-design
---

# Overview




Antennas are an import part of any circuit design which incorporates RF frequencies.


[caption id="attachment_14026" align="aligncenter" width="306"][![](/images/2013/10/rf-antenna-with-sma-connection.jpg)
](/images/2013/10/rf-antenna-with-sma-connection.jpg) A standard 1-3GHz RF antenna with an SMA connection.[/caption]


# Terminology


<table border="0" >
<tbody >
<tr >
Term
Description
</tr>
<tr >

<td >VSWR
</td>

<td >VSWR is an initialism for "**Voltage Standing Wave Ratio**". The bandwidth of an antenna is usually defined as the range of frequencies at which VSWR is less than 2.
</td>
</tr>
</tbody>
</table>


# Dipoles




The voltage in a dipole is maximum at the ends, and 0 at the middle. The current is the opposite, with the maximum being in the middle, and being 0 at both ends.




# PCB Antennas




You have to consider the placement of other components surrounding the PCB antenna. The following diagram shows the minimum recommended clearances between a PCB antenna and other components.


[caption id="attachment_14023" align="aligncenter" width="812"][![](/images/2013/10/typical-minimum-component-clearances-from-pcb-antenna.png)
](/images/2013/10/typical-minimum-component-clearances-from-pcb-antenna.png) The minimum recommended clearances between a PCB antenna and other components. Image from http://www.antenova-m2m.com/resources/literature.[/caption]


# Shorting Antennas




Note that shorting out an antenna is not an effective way of stopping it from communicating. At RF frequencies, a direct short with a piece of wire is no longer a direct short, and can for example, appear inductive. This means the antenna can still work, and sometime make it perform better! I have shorted out cellular modem antennas before with pliers and the signal strength increased!

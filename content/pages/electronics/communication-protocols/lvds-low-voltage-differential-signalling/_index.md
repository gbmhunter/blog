---
author: gbmhunter
date: 2017-08-21 18:36:20+00:00
draft: false
title: LVDS (Low-Voltage Differential Signalling)
type: page
url: /electronics/communication-protocols/lvds-low-voltage-differential-signalling
---

# Overview




_Low-Voltage Differential Signalling_ (LVDS) is a standard which specifies the low-level electrical characteristics of a serial communications protocol.




The standard only defines the low-level electrical characteristics, which leaves designers free to specify the data link later, which includes things such as encoding.




# Characteristics


<table >
<tbody >
<tr >

<td >Drive Type
</td>

<td >Differential
</td>
</tr>
<tr >

<td >Num. Wires
</td>

<td >2 (excl. GND)
</td>
</tr>
<tr >

<td >Duplex
</td>

<td >Half
</td>
</tr>
<tr >

<td >Connection Topology
</td>

<td >Point-to-point (LVDS) or multidrop (MLVDS)
</td>
</tr>
</tbody>
</table>


# Implementing LVDS On A FPGA




Many of the I/O present on an FPGA can support the differential LVDS protocol. They have built in drivers and receivers that can convert the LVDS signal to and from a stream of 1's and 0's.




A serializer/deserializer (SERDES) can be used to convert the stream of bits into bytes of data. This can then be passed into a FIFO for storage, before being handled by processor or other part of the FPGA system.




# Mulitpoint LVDS (MLVDS)




The original LVDS standard was concerned only with point-to-point communications. NSC invented a standard called Bus LVDS (BLVDS) which is a variant on LVDS which allows for a topology of one transmitter connected to multiple receivers.



{{< figure src="/images/2017/08/lvds-multipoint-configuration-example-schematic-ti.png" width="676px" caption="Example schematics showing LVDS devices in a multipoint configuration. Image from www.ti.com."  >}}



Multipoint LVDS is now covered by the TIA/EIA-899 standard.




There are two types of receivers for MLVDS buses. _Type 1_ receivers are compatible with LVDS and use a +/- 50mV threshold. _Type 2_ receivers allow for _Wired-OR_ type signalling (arbitration), but are not compatible with standard LVDS buses. Some MLVDS transceivers support both types of receivers (for example, the [SN65MLVD206B](http://www.ti.com/product/SN65MLVD206B)).




TIA/EIA-899 recommends using _reflected-wave switching_ for wired-OR signalling.




RoboNet, a communication protocol used by the Robotic Operating System (ROS) is a data-link layer protocol that uses MLVDS.

---
author: gbmhunter
date: 2017-07-18 00:06:40+00:00
draft: false
title: High-Level Data Link Control (HDLC)
type: page
url: /electronics/communication-protocols/high-level-data-link-control-hdlc
---

# Overview

**High-Level Data Link Control (HDLC) is a synchronous data-link layer protocol**. It was developed by the International Organization for Standardization (ISO).{{< figure src="/images/2017/07/high-level-data-link-control-icon.png"   >}}

It only describes the data-link layer (layer 2 in the OSI model), and therefore is not really considered an communication protocol in it's own right. It may be used by other communication protocols such as LVDS.

# Acronyms/Glossary

<table>
    <tr>
        <th>Term</th>
        <th>Definition</th>
    </tr>
    <tbody>
        <tr>
            <td>Term</td>
            <td>Definition</td>
        </tr>
        <tr>
            <td>Cisco HDLC</td>
            <td >An extension to HDLC created by Cisco. Also known as _cHDLC_. Cisco HDLC uses an alternative framing structure to ISO HDLC.</td>
        </tr>
<tr >

<td >Frame
</td>

<td >A unit that data is organised into and sent across the HDLC bus in.
</td>
</tr>
<tr >

<td >HDLC
</td>

<td >High-level Data link Control.
</td>
</tr>
<tr >

<td >PPP
</td>

<td > Point-to-Point Protocol.
</td>
</tr>
<tr >

<td >SLARP
</td>

<td >Serial Line Address Resolution Protocol. A control protocol used by Cisco HDLC to maintain serial link keepalives.
</td>
</tr>
<tr >

<td >X.25
</td>

<td > A protocol for packet switched WAN communication. Very popular in the 1980's.
</td>
</tr>
</tbody>
</table>

# History

HDLC is a superset of IBM's _SDLC_ protocol (SDLC can be essentially imitated with HDLC in _Normal Response Mode_ (NRM).

# Framing

**Framing for a HDLC packet is done with the special bit sequence `0x7E` (`0b01111110`). This is used to mark the beginning and end of each frame**. Because `0x7E` can only be used to as a framing sequence, any occurrence of `0x7E` in the packet must be removed. This is done differently depending of the framing type (_synchronous_ or _asynchronous_, see below).

## Synchronous Framing

To prevent **0x7E** from ever occurring in the packet data, **bit stuffing** is used. Every time 5 consecutive **0**'s are transmitted, a **1** is inserted. The receiver must also look for 5 consecutive **0**'s and then remove the following **1**.

## Asynchronous Framing

Bit-stuffing is inconvenient when the communication protocol requires bits to be sent in groups such as bytes (e.g. RS-232). In this case, _**control-octet transparency**_ is used instead (also called byte stuffing or octet stuffing).

With control-octet transparency, if either **0x7E** (the _frame boundary octet_) or **0x7D** (the _control escape octet_) appears in the packet data, the escape octet is first sent, followed by the original data, but with bit 5 inverted. This ensures that **0x7E** is never found withing the packet data, and is only used for packet framing.

Obviously, the receiver has to look for escape octets, remove them from the data stream, and invert bit 5 of the next byte.

# Link Configurations (Modes)

1. _Normal Response Mode_ (NRM): A unbalanced configuration where only the primary terminal may initiate a data transfer.
1. _Asynchronous Response Mode_ (ARM): An unbalanced configuration where secondary terminals may transmit without permission from the primary.
1. _Asynchronous Balanced Mode_ (ABM): A balanced configuration in where all terminals are treated equally, and any may send frames at any time.

# Standards

The HLDC protocol is specified in ISO 13239.

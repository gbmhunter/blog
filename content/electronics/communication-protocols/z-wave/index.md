---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Communication Protocols" ]
date: 2016-04-21
draft: false
tags: [ "Z-wave", "communication protocol", "wireless", "home automation" ]
title: Z-Wave
type: page
---

## Overview

Z-Wave is a wireless communications protocol primarily designed for home automation.

{{< img src="z-wave-logo-large.png" width="447px" caption="The Z-Wave logo. Image from http://www.z-wave.com/."  >}}

## Frequency

Z-Wave operates on frequencies around 900MHz. The exact frequency depends on country.

<table>
    <thead>
        <tr>
            <th>Region</th>
            <th>Frequency</th>
        </tr>
    </thead>
<tbody>
<tr>
<td>Europe</td>
<td>868.42MHz</td>
</tr>
<tr>
<td>United States</td>
<td>908.42MHz</td>
</tr>
<tr>
<td>Australia/New Zealand</td>
<td>921.42MHz</td>
</tr>
</tbody>
</table>

## Network Topology

Z-Wave uses a source-routed mesh network topology. The mesh network allows devices to send messages through other Z-Wave devices before reaching the destination, allowing the message to "hop" between devices to extend the communication range and overcome RF dead spots.

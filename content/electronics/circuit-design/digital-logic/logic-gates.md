---
author: gbmhunter
date: 2013-08-02 05:58:59+00:00
draft: false
title: Logic Gates
type: page
url: /electronics/circuit-design/digital-logic/logic-gates
---

## Overview

When sourcing logic IC's, note that the standard prefix used by many manufactures is "74".

Logic gate inputs are normally labelled as a single letter, starting with A (e.g. a three input AND gate would have inputs A, B and C). The output is normally labelled Y, unless you are using a flip-flop or latch, and the output is labelled Q.

## D Flip-Flops

## Important Parameters

<table >
	<tbody >
		<tr>
			<th>Parameter</th>
			<th>Symbol</th>
			<th>Description</th>
		</tr>
		<tr>	
			<td>Propagation Delay</td>			
			<td>\(t_P\)</td>			
			<td></td>
		</tr>
	</tbody>
</table>

## Triggering

Edge-triggered D flip-flops can be either positive or negative edge triggered. Edge-triggered flip-flops are shown by a triangle at the clock input, and negative edge-triggered ones have an additional bubble. However, positive-edge triggered is much more common, and standard practise is to make a negative edge triggered flip-flop by adding your own inverting gate on the clock signal.

Note that adding a inverting gate to the clock signal increasing the propagation delay for that clock input, and will have a significant impact on the operation in high-speed designs.

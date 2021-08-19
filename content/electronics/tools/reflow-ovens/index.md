---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Tools" ]
date: 2020-05-18
description: "Info on reflow soldering ovens."
draft: false
lastmod: 2020-06-23
tags: [ "electronics", "tools", "reflow ovens", "Puhui", "T-962", "T-962A", "T-962C", "soldering", "Atten", "AT-R3028" ]
title: "Reflow Ovens"
type: "page"
---

## Overview

## The Infamous Puhui T-962/T-962A

The T-962A has the same design except is a larger unit and provides and effective soldering area of 300x320mm.

<table>
  <tbody>
    <tr>
      <td>Model Number</td>
      <td>Rated Power</td>
      <td>Panel Area</td>
    </tr>
    <tr>
      <td>T-962</td>
      <td>800W</td>
      <td>180x235mm</td>
    </tr>
    <tr>
      <td>T-962A</td>
      <td>1500W</td>
      <td>300x320mm</td>
    </tr>
    <tr>
      <td>T-962C</td>
      <td>2900W</td>
      <td>585x400</td>
    </tr>
  </tbody>
</table>

It is know to produce bad-smelling fumes when in use, especially when it is new. This is because the manufacturer uses aluminium tape and masking tape in the unit which is not designed for high temperatures, which melts!!! It is recommended to replace the masking tape with kapton tape after purchase (see the upgrade section below for more info).

Third parties have made "upgrade kits" for these reflow ovens which aim to to provide better thermal control of the soldering process and improve the UI experience. For example, [ES Technical provides upgrade packages](https://www.estechnical.co.uk/products/reflow-oven-controllers?gclid=EAIaIQobChMI3KXlo7X_5gIVknZgCh11oAU-EAMYASAAEgIFtfD_BwE) for both the T-962 and T-962A. [UnifiedEngineering redesigned the firmware](https://github.com/UnifiedEngineering/T-962-improvements) to run on the existing microcontroller, with the hardware addition of a temperature sensor for cold junction compensation.

Clones? The Atten AT-R3028 looks VERY similar to the T-962.


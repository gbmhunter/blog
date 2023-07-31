---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Electronic Components" ]
date: 2023-07-31
draft: false
lastmod: 2023-07-31
title: "Lithium-ion Batteries"
type: "page"
---

{{% warning-is-notes %}}

## Overview

A lithium-ion (or li-ion) battery is a rechargeable battery that uses the recombination of Lithium ions with their missing electron to generate electricity, and the reverse of this process to recharge[^wikipedia-lithium-ion-battery].

Lithium-ion batteries can be considered a family of battery technologies including:

1. Traditional lithium-ion
1. Lithium polymer
1. Lithium-iron phosphate

{{% ref "tbl-basic-properties" %}} shows some of the basic properties of Lithium-ion batteries.

<table ref="tbl-basic-properties">
  <caption>Some of the basic properties of Lithium-ion batteries.</caption>
  <thead>
    <tr><th>Property</th>           <th>Value</th></tr>
  </thead>
  <tbody>
    <tr><td>Specific energy</td>    <td>{{% md %}}100-265Wh/kg (0.360-0.954MJ/kg)[^wikipedia-lithium-ion-battery]{{% /md %}}</td></tr>
    <tr><td>Energy density</td>     <td>{{% md %}}250-693Wh/L (0.90-2.49MJ/kg)[^wikipedia-lithium-ion-battery]{{% /md %}}</td></tr>
    <tr><td>Specific power</td>     <td>{{% md %}}250-340W/kg[^wikipedia-lithium-ion-battery]{{% /md %}}</td></tr>
  </tbody>
</table>

## Self Discharge

Lithium-ion batteries have a self-discharge rate which is 10 times less than NiMH batteries[^ti-li-ion-battery-charger-jeita-compliance].

## Charging

### TI's BQ Range

Texas Instruments sells a large number of battery charger ICs under the prefix `BQ`. Some are I2C controllable, others are standalone. Some have hot/cold temperature monitoring and others (typically with a `J` after the numerical code in the part name) have JEITA temperature monitoring.

Four phases:

1. Battery short
1. Pre-conditioning
1. Constant current (CC)
1. Constant voltage (CV)

### Richtek RT9481, RT9485

The `RT9485` has an on-board MCU.

## References

[^ti-li-ion-battery-charger-jeita-compliance]: Jinrong Qian (2010). _Li-ion battery-charger solutions for JEITA compliance_. Texas Instruments. Retrieved 2023-07-31, from https://www.ti.com/lit/an/slyt365/slyt365.pdf.
[^wikipedia-lithium-ion-battery]: Wikipedia (2023, Jul 27). _Lithium-ion battery_. Retrieved 2023-07-31, from https://en.wikipedia.org/wiki/Lithium-ion_battery.

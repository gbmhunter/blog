---
author: gbmhunter
date: 2012-07-24
draft: false
title: Medium-Voltage Cap Charger
type: page
---

Project Start Date: March 2006
Project End Date: April 2006
Current State: Completed

## The Crucial Stats:

Input Voltage: 12V
Maximum Charge Voltage: 500V

This was before I knew what a boost converter was, so I used the Aahz's Boost Converter  design (member of the www.4hv.org forum, see [here](https://4hv.org/e107_plugins/forum/forum_viewtopic.php?6457)). A blurry schematic (the only one I have!) of his design is shown below.

{{< img src="aahzs-boost-converter-schematic.jpg" width="400px" >}}

The only thing I would do differently would be to improve the MOSFET switching, as it gets very hot during use. Something is causing the MOSFET to remain in it's linear region for too long.

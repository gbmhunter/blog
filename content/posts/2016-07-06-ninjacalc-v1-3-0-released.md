---
author: gbmhunter
date: 2016-07-06 10:35:24+00:00
draft: false
title: NinjaCalc v1.3.0 Released
type: post
url: /ninjacalc/ninjacalc-v1-3-0-released
categories:
- NinjaCalc
tags:
- algorithm
- calculator
- checksum
- crc
- custom
- cyclic redundancy check
- ninjacalc
- polynomial
- update
---

[NinjaCalc v1.3.0 has been released!](http://mbedded-ninja.github.io/NinjaCalc/) The biggest change is the addition of a **CRC calculator**, which allows you to calculate the CRC value for ASCII or hex data, using either **common pre-loaded CRC algorithms or your own custom algorithm**.

[caption id="attachment_13651" align="aligncenter" width="1094"][![Example usage of the CRC Calculator within NinjaCalc (http://mbedded-ninja.github.io/NinjaCalc/).](/images/2016/07/ninja-calc-crc-calculator-example.gif)
](/images/2016/07/ninja-calc-crc-calculator-example.gif) Example usage of the CRC Calculator within NinjaCalc (http://mbedded-ninja.github.io/NinjaCalc/).[/caption]

The **custom algorithm section** allows you to enter a CRC width from 1-64 bits, a CRC polynomial, initial value, XOR-out value, and whether the input data and/or the output CRC value is reflected. Then it will calculate the resultant CRC value.

**Either [download NinjaCalc v1.3.0 here](http://mbedded-ninja.github.io/NinjaCalc/)**, or open up your previous installation and click yes to update when prompted.

More information on CRC algorithms can be found on the [CRCs (Cyclic Redundancy Checks) page](http://blog.mbedded.ninja/programming/general/crcs-cyclic-redundancy-checks).

**Changelog**  * Added CRC calculator, closes [#122](https://github.com/mbedded-ninja/NinjaCalc/issues/122).  * Fixed issue with install4j dependency, closes [#123](https://github.com/mbedded-ninja/NinjaCalc/issues/123).  * Removed .idea/workspace.xml file from repo, closes [#124](https://github.com/mbedded-ninja/NinjaCalc/issues/124).  * Added a text-based calculator variable, closes [#125](https://github.com/mbedded-ninja/NinjaCalc/issues/125).  * Added check so that calculator variables can't be accidentally added to the same calculator twice, closes [#126](https://github.com/mbedded-ninja/NinjaCalc/issues/126).[caption id="attachment_13314" align="aligncenter" width="308"][![The NinjaCalc logo (with no transparency).](/images/2016/04/ninja-calc-logo-v2-no-transparency.png)
](/images/2016/04/ninja-calc-logo-v2-no-transparency.png) The NinjaCalc logo (with no transparency).[/caption]

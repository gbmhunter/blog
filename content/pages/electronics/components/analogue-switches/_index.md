---
author: gbmhunter
date: 2015-03-25 05:00:51+00:00
draft: false
title: Analogue Switches
type: page
url: /electronics/components/analogue-switches
---

[latexpage]


# Overview


Analogue switches are electrical circuits which connect and disconnect analogue signals.

They are also useful for certain digital signals which have analogue characteristics. An example would be the [I2C bus](http://blog.mbedded.ninja/electronics/communication-protocols/i2c-protocol). Although driven low (with sharp edges), the I2C bus lines are pulled high, causing the voltage to rise in a exponential fashion. Digital switches would turn this into a sharp rise, once the voltage reached a certain threshold. Analogue switches will let the waveform through unchanged, resulting in proper I2C operation.


# Crosstalk


For ICs with more than one switch, the amount of channel-to-channel crosstalk becomes an important metric.


# Switching Speeds


For switches with more than one pole, the IC manufacturers usually make sure there is a specified "break-before-make" period.


# Power Consumption


The following values are considered a low-power switch:

Iq = 25nA (typ), 40nA (max)
Ileakage = 5nA (typ), 90nA (max)


# Examples




## Intersil ISL43L410




The Intersil ISL43L410 is a low on-resistance, low-voltage single-supply, DPDT analogue switch. One of its main selling points is it's low power consumption:




$$ I_q = 25nA (typ), 40nA (max) $$
$$ I_{leakage} = 5nA (typ), 90nA (max) $$




[caption id="attachment_11061" align="aligncenter" width="256"][![Functional diagram of the Intersil ISL43L410 analogue switch. Image from http://www.intersil.com/content/dam/Intersil/documents/isl4/isl43l410.pdf.](/images/2015/03/intersil-isl43l410-analogue-switch-functional-diagram.png)
](/images/2015/03/intersil-isl43l410-analogue-switch-functional-diagram.png) Functional diagram of the Intersil ISL43L410 analogue switch. Image from http://www.intersil.com/content/dam/Intersil/documents/isl4/isl43l410.pdf.[/caption]

This IC has the nice feature that the common net can be disconnected from both NC and NO at the same time. However, both switches cannot be switched from NC to NO independently, which might be a deal-breaker for some designs.

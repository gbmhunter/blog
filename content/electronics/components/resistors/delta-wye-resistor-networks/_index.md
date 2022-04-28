---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Components ]
date: 2022-04-28
draft: false
lastmod: 2022-04-28
tags: [ resistors, delta, wye, resistor networks ]
title: Delta-Wye Resistor Networks
type: page
---

{{% warning-is-notes %}}

## Overview

## Delta To Wye Transformation

<p>\begin{align}
R1 = \frac{R_bR_c}{R_a + R_b + R_c} \\
R2 = \frac{R_aR_c}{R_a + R_b + R_c} \\
R3 = \frac{R_aR_b}{R_a + R_b + R_c} \\
\end{align}</p>

## Resistor Network Example

{{% img src="wheatstone-resistor-network.png" width="400px" caption="What is the current I drawn from the +12V for this resistor network? This can't be solved purely with resistors-in-series and resistors-in-parallel equations, but can be done with the help of a Delta To Wye transformation." %}}

21mA.
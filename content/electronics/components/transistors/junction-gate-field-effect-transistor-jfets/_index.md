---
author: "gbmhunter"
categories: [ "Electronics", "Components" ]
date: 2011-04-29
description: "Schematic symbols, important parameters, and more info about junction-gate field-effect transistors (JFETs)."
draft: false
lastmod: 2021-04-29
tags: [ "electronics", "components", "junction-gate", "field-effect", "transistors", "JFETs", "current-source" ]
title: "Junction-Gate Field-Effect Transistors (JFETs)"
type: "page"
---

{{% warning-is-notes %}}

## Datasheet Parameters

### Gate-Source Cutoff Voltage Vgs(off)

This is the gate-source voltage at which the JFET is pretty much "turned off", i.e. the current flowing through the drain has dropped to almost 0. Typically it is specified as the voltage at which the drain current drops down to a current of `\(10nA\)`. Unfortunealty for JFETs, this value varies significantly due to manufacturing tolerances and typically a Vgs(off) min. to max. range of >5V can be given! Taking the OnSemi 2N5457 for example, it's datasheet specifies a `\(V_{GS(off)}\)` min. of `\(-0.5V\)` and a max. of `\(-6.0V\)` (ignore that because we are dealing with negative numbers, the max. is actually a "smaller" number than the min.).

### Zero Gate Voltage Drain Current (Idss)

This is the current through the drain when `\(V_{GS} = 0V\)`.

### Gate-Source Breakdown Voltage V(br)gss

The gate-source breakdown voltage `\(V_{(BR)GSS}\)` is the maximum voltage the gate can withstain (relative to the source) before breakdown occurs.

## Current Source

JFETs can be used to make two-terminal current sources which can be useful in circuit design due to their simplicity. They can also be used to make low-noise current sources.

You first calculate the required gate-source voltage[^vishay-an103-jfet-constant-current-source]:

<p>\begin{align}
V_{GS} = V_{GS(off)} [ 1 - (\frac{I_D}{I_{DSS}})^{1/k} ]
\end{align}</p>

<p class="centered">
where:<br/>
\(V_{GS}\) is the gate-source voltage required to bias the JFET at the correct current, in \(V\)<br/>
\(V_{GS(off)}\) is the gate-source cutoff voltage, a parameter you can get from the JFETs datasheet, in \(V\)<br/>
\(I_D\) is the current you want the current source to drive at, in \(A\)<br/>
\(I_{DSS}\) is the zero gate-source drain current, a parameter you can get from the JFETs datasheet, in \(A\)<br/>
\(k\) is the conduction parameter for the JFET, and depends on the device geometry. This is not normally mentioned in the datasheet, however for this equation you can generally assume it to be \(2\).
</p>

You can then find the value of `\(R_S\)` with:

<p>\begin{align}
R_S = \frac{V_{GS}}{I_D}
\end{align}</p>

## Common Components

* **2N5457**: Common "general purpose" N-channel JFET.
* **J202**: N-channel JFET by ON Semiconductor that originally came in a TO-92 package, but now comes in a SOT-23-3 package.

## References

[^vishay-an103-jfet-constant-current-source]: <https://www.vishay.com/docs/70596/70596.pdf>, retrieved 2021-04-29.
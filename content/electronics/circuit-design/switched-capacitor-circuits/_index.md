---
authors: [ Geoffrey Hunter ]
date: 2022-09-15
description: 
draft: false
lastmod: 2022-09-15
tags: [ switched capacitors, capacitors ]
title: Switched-Capacitor Circuits
type: 
---

## Overview

Switched-capacitor circuits are circuits which move electronic charge in and out of capacitors using electronics switches. They are commonly manipulated to make a "tunable" resistance which depends on the switching frequency. They are used in circuits such as [switched-capacitor filters](/electronics/components/switched-capacitor-filters/) and  [charge pumps](/electronics/components/power-regulators/charge-pumps/).

The basic switched-capacitor circuit is shown below:

{{% figure src="basic-switched-capacitor-circuit.png" width="400px" caption="A basic switched-capacitor circuit." %}}

## Equivalent Resistance

**By changing the switching frequency, you can change the equivalent "resistance"** between `\(V_{in}\)` and `\(V_{out}\)`. The equivalent resistance is:

<p>\begin{align}
R_{equiv} &= \frac{1}{C_1f} \\
\end{align}</p>

This is the core principle behind [switched-capacitor filters](/electronics/components/switched-capacitor-filters/).

### Equivalent Resistance Derivation

In phase 1 when switch `SW1` is closed and `SW2` is open, the capacitor charges up to `\(V_{in}\)`. [By definition](/electronics/components/capacitors/#_charge), the charge stored in the capacitor during this time is:

<p>\begin{align}
Q_1 = C_1V_{in}
\end{align}</p>

Similarly, in phase 2 when switch `SW1` is open and `SW2` is closed, the capacitor charges up to `\(V_{out}\)`. The charge stored in the capacitor during this time is:

<p>\begin{align}
Q_2 = C_1V_{out}
\end{align}</p>

So the change in charge is:

<p>\begin{align}
\Delta Q &= Q_1 - Q_2 \nonumber \\
         &= C_1V_{in} - C_1V_{out} \nonumber \\
         &= C_1(V_{in} - V_{out}) \nonumber \\
         &= C_1\Delta V \\
\end{align}</p>

Now, current is defined as change in charge over the change in time:

<p>\begin{align}
I = \frac{\Delta Q}{\Delta T}
\end{align}</p>

Assume the switching period `\(\Delta T\)` is the total time of phase 1 and phase 2. The switching frequency is just the reciprocal of this, so:

<p>\begin{align}
I = \Delta Q*f
\end{align}</p>

Substitute in `\(\Delta Q\)`:

<p>\begin{align}
I = C_1 \Delta V*f
\end{align}</p>

Finally, using Ohm's law, the equivalent resistance of the switched-capacitor circuit is:

<p>\begin{align}
R_{equiv} &= \frac{\Delta V}{I} \nonumber \\
          &= \frac{\Delta V}{C_1 \Delta V f} \nonumber \\
          &= \frac{1}{C_1f} \\
\end{align}</p>

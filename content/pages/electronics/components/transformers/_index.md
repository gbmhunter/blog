---
author: gbmhunter
date: 2013-02-24 20:32:13+00:00
draft: false
title: Transformers
type: page
url: /electronics/components/transformers
---

[mathjax]

# Transformation Ratio

For an **ideal transformer**, the voltage of the output (secondary) compared to the input (primary) is directly related to the ratio between the number of turns on the output compared to the input.

$$ \frac{V_P}{N_P} = \frac{V_S}{N_S} $$

# Power Equivalence

Remember, energy cannot be created nor destroyed. Therefore, for an **ideal transformer**, with no losses, the output (secondary) power \( P_S \) must be equal to the input (primary) power \( P_P \).

$$ P_P = P_S $$

$$ V_P \cdot I_P = V_S \cdot I_S $$

Substituting in the transformation ratio above gives:

$$ I_P \cdot N_P = I_S \cdot N_S $$

# Mutual Inductance

In general, the number of mutual inductances that a transformer with N windings has is:

$$\frac{N \cdot (N-1)}{2}$$

Notice that the number of mutual inductances grows with \(N^2\).

# Coupling Coefficient

The coupling coefficient is usually denoted K. It is used extensively in SPICE simulations ([see Linear Technology: Using Transformers in LTspice/SwitcherCAD III by Mike Engelhardt](http://cds.linear.com/docs/en/lt-journal/LTMag-V16N3-23-LTspice_Transformers-MikeEngelhardt.pdf)). The leakage inductance can be calculated from the coupling coefficient using the following formula:

$$L_{leakage} = L_{wind} \cdot (1 - K^2)$$

# Non-Ideal Transformer Losses

There are three main types of losses that occur in a non-ideal (real-world) transformer. These are resistive losses, hysteresis losses, and eddy current losses.

In large power transformers, with the appropriate design to reduce the non-ideal losses mentioned below, the efficiency of the transformer can be up around 98%, closely approximating an ideal transformer.

## Resistive Losses

These losses occur due to the windings of the transformer having a non-zero resistance. The power lost by resistive losses is:

$$ P = I^2 \cdot R $$

for both the primary and secondary. For this reason they are also called \( I^2 R \) losses.

## Hysteresis Losses

Remember that transformers work with an AC voltage/current. The tiny magnetic domains in the core material are reversed each cycle. This causes losses in the core of the transformer.

The hysteresis loss can be seen on the BH (flux-density vs. field strength) curve.

{{< figure src="/images/2013/02/transformer-graph-explaining-hysteresis-losses.jpg" width="609" caption="Graph explaining the hysteresis losses in a transformer. Image from http://ecetutorials.com/." caption-position="bottom" >}}

## Eddy Current Losses

Because the core is conductive, it too gets an EMF generated in it, just like the secondary. This causes a current to flow in the core, which is dissipated as heat energy due to the resistance of the core material. To reduce eddy currents, most transformers use a core built up from many **laminated** sheets of metal, sandwiched between insulating layers.

 

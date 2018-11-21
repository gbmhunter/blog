---
author: gbmhunter
date: 2015-01-13 07:21:25+00:00
draft: false
title: Inrush Current
type: page
url: /electronics/circuit-design/inrush-current
---

[mathjax]




# Overview




Power supplies are responsible for a large number of inrush current issues due to their large amounts of input and output capacitance. Advanced switch-mode power supplies will limit the inrush current to the output appropriately (either fixed or set by a resistor to a dedicated pin on the SMPS controller), but you still have the input capacitance to deal with.




# Standard Resistors




Standard resistors are one of the simplest ways of limiting inrush current. They are typically used in low-power situations, as unlike many of the more complex inrush current protection methods, their resistance does not reduce after start-up, meaning they dissipate significant power continuously and can cause large voltage drops.




# NTC Thermistors




NTC thermistors can be used for reducing the amount of inrush current.


[caption id="attachment_14087" align="aligncenter" width="475"][![](/images/2015/01/inrush-current-limiting-with-thermistor.jpg)
](/images/2015/01/inrush-current-limiting-with-thermistor.jpg) A graph showing the effect of a NTC thermistor limiting the inrush current to a circuit.[/caption]


They will always be some measurable amount of voltage drop when using a NTC, as some continuous thermal dissipation is required to keep the thermistor warm enough to be in it's low resistance state.




The total energy $ E $ provided by the inrush current is given by:




$$ E = \frac{1}{2} C V_{in}^2 $$




where:  

\(C\) = the downstream capacitance, in Farads  

\(V_{in}\) = the input voltage, in Volts




Note: You may be initially confused, thinking, wait, this is the equation for the energy stored in the capacitor, not the energy dissipated by the thermistor. The cool thing is, in this circuit, the energy stored in the capacitor and the energy dissipated by the thermistor (or any resistor) is exactly the same!




The minimum resistance (provided by the NTC thermistor), \(R_{min}\), is given by:




$$ R_{min} = \frac{V_{in}}{I_{max}} $$




where:  

\(I_{max}\) = the desired maximum inrush current, in Amps




This assumes that the other resistances in the path of the inrush current (e.g. the trace resistance, the ESR of the input capacitors) is negligible.




The steady-state current must not be larger than the maximum steady-state current rating of the NTC thermistor.




The steady-state current rating of the NTC thermistor must be derated if the ambient temperature is too high.




If steady-state power dissipation or voltage drop is a big issue, the NTC thermistor can bypassed with a timed relay during steady-state operation.




Ametherm is a popular manufacturer of NTC themristors. As of Jan 2015, they have the following material types: A, B, C, G, H, I, L, M, N, Q, R, S. There provide an online calculator ([http://www.ametherm.com/inrush-current/](http://www.ametherm.com/inrush-current/)) to quickly choose a NTC thermistor for limiting the inrush current to a power supply.

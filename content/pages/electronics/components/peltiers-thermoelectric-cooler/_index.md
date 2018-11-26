---
author: gbmhunter
date: 2015-10-13 05:02:51+00:00
draft: false
title: Peltiers (Thermoelectric Cooler)
type: page
url: /electronics/components/peltiers-thermoelectric-cooler
---

[mathjax]

# Overview

Peltiers are electrical components that use the Peltier effect to heat/cool objects. They act as a heat pump, moving heat energy from the cold side to the hot side.

{{< figure src="/images/2015/10/standard-peltier-module-photo.jpg" width="444px" caption="A photo of a standard peltier module. Image from www.cherrybiotech.com."  >}}

# History

The Peltier effect was discovered by Jean Charles Athanase Peltier in 1834.

# Uses

Peltiers are used in things such as:  * Portable fridges/freezers (especially when powered from 12V)  * Electronic temperature stabilisers (e.g. CPU cooler)  * Temperature-sensitive scientific equipment  * Medical devices  * Photonic systems

# Construction

Most Peltiers consist of many small semiconductor junctions, joined together in array, and connected between two thermally conductive, white ceramic plates.

# Important Parameters

## Max. Heat Transfer (Qmax)

The maximum heat transfer (also known as \(Q_{max}\), or maximum work), is the **maximum amount of energy per second** that the Peltier device can **move** from the cold side to the hot side. It is measured in Watts (\(W\)).

This always occurs when the **temperature differential** between the hot and cold sides is 0°C. (i.e. at the same temperature). Obviously, for any real-life operating Peltier, this is impossible. The larger the temperature differential, the less heat can be moved across the plates.

\(Q_{max}\) is also dependent on the **absolute temperature** of the plates. As the absolute temperature rises, \(Q_{max}\) also increases. The absolute temperature that \(Q_{max}\) is measured at is usually specified on the Peltier's datasheet. The absolute temperature of the hot side is usually given (\(T_H\). Since \(Q_{max}\) is given for when both sides are at the same temperature, this is also equal to the temperature of the cold side.

It is important to NOT confuse the heat transfer \(Q\) with the input power \(P\).

## Max. Temp Differential

The maximum temperature differential (\(\Delta T_{max}\)) is the maximum temperature difference that the Peltier can produce between the hot and cold sides. It happens to be the point at which \(Q_{max} = 0\) (remember that the maximum heat transfer decreases with increasing temp. differential). It also occurs when the Peltier is being driven at maximum voltage and current.

For all practical designs \(\Delta T_{max}\) is a theoretical upper limit, you will never be able to achieve this temperature differential.

## Max. Operating Temp

The maximum operating temperature (\(T_{max}\)) is the maximum temperature any part of the Peltier is allowed to reach. Naturally this is the maximum temperature of the hot side.

Do NOT confuse this with the maximum temperature differential, \(\Delta T_{max}\).

Be very careful not to exceed the maximum. operating temperature! Among other things, you could cause the solder connecting the thermoelectric pairs inside the Peltier module to melt, destroying the device (and potentially causing short-circuits). This solder usually melts around 120-160°C.

# How Should I Drive One Of These?

If you want simple on/off control and the hot/cold sides don't need to switch, then you can control a peltier with a single mechanical switch, relay, or transistor (e.g. MOSFET).

If you want tighter control over the power, you can PWM a transistor to provide varying power from a constant DC source.

If you want full control over the heat direction (i.e. which side is hot/cold), then you will need a H-bridge setup (similar to what is used to control stepper motors.

# Examples

Many non-branded, cheap Peltier modules use the part number _TEC1-127xx_, where _xx_ can be things like _03_ or _05_ (e.g. _TEC1-12703_, _TEC1-12705_). Be warned though, Peltiers with identical part numbers in this style can have widely varying parameter values.

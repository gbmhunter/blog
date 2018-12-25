---
author: gbmhunter
date: 2015-10-29 04:14:11+00:00
draft: false
title: Fans
type: page
url: /electronics/components/fans
---

## Overview

## Computer Fans

Computer fans usually have two, three or four wires. The simpilist two-wire fans just have a wire for power and ground.

{{< figure src="/images/2015/10/computer-cooling-fan-photo-front-view-blog-lili-farm.jpg" width="308px" caption="A photo of a standard computer cooling fan."  >}}

## 3-Wire Computer Fans

Fans with feedback have two wires for power and ground, and one wire for feedback. The feedback wire is normally an open-collector (common) or open-emitter (less common) output. The open-collector design allows the feedback signal to communicate with +5V and +3.3V logic systems with the appropriate pull-up resistor.

They normally use a hall-effect sensor mounted near the fans rotor which is triggered twice per revolution. This signal is then filtered and converted into digital output pulse. Thus the feedback wire normally outputs 2 digital pulses per revolution.

## 4-wire Computer Fans

4-wire computer fans are identical to 3-wire fans except for an additional speed control input wire. This wire accepts a PWM waveform which controls the fans rotational speed.

## Speed Control

Some fans are called "PWM fans" and have a dedicated input for sending in a PWM waveform, allowing you to provide a constant DC power source to it's power pin.

Because of the rotational inertia of the spinning blades, low-speed PWM (100Hz-10kHz) is usually permissible for fan control, which gives reduced acoustic noise and permits the use of smaller power transistors.

Fan controller ICs can be found under two sections on DigiKey's website, Integrated Circuits (ICs)->PMIC - Thermal Management. 

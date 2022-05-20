---
authors: [ Geoffrey Hunter ]
categories: [ Programming ]
date: 2012-10-01
description: A tutorial on PID control including equations, examples and simulations.
draft: false
lastmod: 2022-05-09
tags: [ programming, control theory, PID, systems, controllers, setpoints, integral windup, simulation, NinjaCalc, derivative kick, PV, CV, SP, process value, control value ]
title: PID Control
type: page
---

## Overview

PID control (a.k.a. three-term control[^wikipedia-pid]) is a very common technique for controlling a system in which you have a desired set-point for the system to be in, and are able to control this with one variable. PID is an acronym for Proportional-Derivative-Integral, and describes the three mathematical processes used to decide on a output to the control system.

You change the dynamics of the PID control loop by varying three parameters, the proportional, integral and derivative constants.

## How PID Works

PID is a industry-standard way of controlling a system, given a single process variable `PV` that you want controlled (e.g. temperature of the heater) and a single variable you can adjust called the control variable `CV` (e.g. duty cycle of heater).

A PID controller compares a set-point (`SP`) (decided on by the user, e.g. this may the temperature you want the room to be at). The `SP` has the same units as the `PV`. It then compares this with the measured system variable (the actual temperature of the room). The difference between the set-point and the measured variable is called the _error_. 

This error is fed into the `P` (proportional), `I` (integral) and `D` (derivative) blocks of the PID controller. These blocks act on the error in different ways, and their output is summed together to generate the `CV`. The way these P, I and D blocks work is explained below.

{{% img src="pid-controller-diagram-process-error-setpoint-measured-value.png" width="700px" caption="A block diagram of a PID controller." %}}

## The Maths

The standard PID equation is:

<p>\begin{align}
output = K_{p}e(t) + K_{i}\int e(t) \mathrm{d} x + K_{d}\frac{d}{dt}e(t)
\end{align}</p>

The error is always defined as the `setpoint value - process value` `\(SP - PV\)`, so the error is positive when the actual value is less than what it needs to be. It is defined by the following equation:

<p>\begin{align}
e(t) = SP - PV
\end{align}</p>

<p class="centered">
	where:<br>
	\(e(t)\) = error<br>
	\(SP\) = setpoint value<br>
	\(PV\) = process value<br>
</p>

This PID equation is in the continuous time domain. However, most PID control loops are implemented digitally. The discrete equation is written:

<div>$$output = K_{p}e_{k} + K_{i}T\sum\limits_{i=0}^k e_{k} + K_{d}\frac{(e_{k} - e_{k-1})}{T}$$</div>

<p class="centered">
	where:<br>
	\(T\) is the time period between samples<br>
</p>

This equation is suitable for implementing in code. There also exists the Z transformation of the equation, but this obscures the physical meaning of the parameters used in the controller.

## Gain vs. Bands

Some PID controllers work on absolute inputs and outputs (e.g. temperature in °C for the `PV` and `SP`, and power output to heater in Watts as the `CV`), whilst other PID controllers use inputs/outputs that represent the percentage of total range (i.e. their units are percent). One benefit of using percentages is that the PID loops can require less tuning adjustment when transferring to a different system, as the percentage-based inputs/outputs scale proportionally with the changing ranges of the system.

The band is also called the throttling range.

Commonly referred to as the throttling range (TR), proportional band is defined as the amount of change in the controlled variable required to drive the loop output from 0 to 100%.

<p>\begin{align}
PB = \frac{100}{G}
\end{align}</p>

For example, if the proportional band (PB) is 20%, then the proportional gain (G) is 5.

## Tuning Methods

Coming soon...

## Integral Windup

Integral windup is a common problem with PID controllers. It is when a sudden change in the set-point or large disturbance on the output (really anything that causes a large error between where you are and where you want to be), causes the integral term to build up (remember that the integral term accumulates errors). Once you have reached where you want to be, the integral term has to "unwind", and will drive the output past the setpoint until the error-time product is unwound.

Ways of preventing integral windup:

**Limit Integral Effort To Fixed Values**

This is the simplest form of preventing integral windup. Windup is preventing by limiting the integral effort to fixed maximum/minimum values. If the integral efforts begins to exceed the set max/min values, it is limited to these max/min values. **Note that the integral effort is not reset.** This is a common point of confusion, as sometimes the process of preventing integral windup is called "resetting".

**Limit Integral Effort Based On Output Limits**

If output limits exist (they should for most real-world processes), the integral effort can be limited when the output hits it's limits.

For example, say the P, I and D terms were contributing the following effort to the output:

* P = 6
* I = 5
* D = 2

Lets pretend the output is limited to 10. `P + I + D = 13`, so the output is going to be saturated. The I effort is likely to be even larger next iteration (assuming we haven't reached our set-point yet) and so the output will saturate even more. To prevent this, we could limit the I value so that the sum of all three just hits the saturation limit, e.g. I would be set to 2.

Be careful not to set the integral term to a negative value! This could potentially occur if the P + D term were already larger than the saturated value.

## Getting Rid Of Derivative Kick

_Derivative Kick_ is the name for large output (CV) swings when a step-change in the set point (SP) occurs. When the set point changes abruptedly (you want the temperature of the room to be 20°C, but now someone else has come along and set it 25°C), the derivative of error is mathematically infinite! In a discrete, sampled based system this essentially results in a really large number. Remembering that the derivative term is:

<p>\begin{align}
\text{derivative term} = K_{d}\frac{d}{dt}e(t)
\end{align}</p>

this results in a huge spike (kick) in the output (CV). Luckily, when implementing a PID controller, there is an easy way to fix this. Remember that the error is:

<p>\begin{align}
e(t) = SP - PV
\end{align}</p>

If we take the derivative of this:

<p>\begin{align}
\frac{d}{dt}e(t) = \frac{d}{dt}(SP - PV)
\end{align}</p>

The trick is to now assume the SP is constant. If the SP is constant, then the derivative of a constant is just 0. Thus:

<p>\begin{align}
\frac{d}{dt}e(t) = -\frac{d}{dt}(PV)
\end{align}</p>

**So for the derivative term, rather than calculating the change in error as the change in SP - PV, we just use the negative change in PV**. In code, this would look like:

```python
delta_error = new_error - last_error # Don't do this, results in derivative kick
delta_error = new_PV - last_PV # Do this instead! No derivative kick with change in set pint!
d_term = delta_error / delta_time 
```

This gets rid of derivative kick in the PID controller when the set point changes abruptedly.

## Worked Example

Lets assume a mass/spring/damper process (aka plant or system) which consists of a mass attached to a fixed wall by spring and damper. We want to control the position of the mass, relative to it's resting point (which will be when the spring exerts no force).

{{% img src="mass-spring-damper-system-diagram-pid.png" width="600px" caption="A mass-spring-damper system, which is commonly used to demonstrate PID control and appropriate tuning." %}}

The mass `\(m\)` is `\(2kg\)`. The spring has a spring constant, `\(k\)`, which is `\(5Nm^{-1}\)`. The damping coefficient `\(c\)` is `\(3 Nsm^{-1}\)`.

We can model the system using Newton's equation:

<div>$$ F = ma $$</div>

Summing up the forces on the mass `\(m\)` gives:

<div>$$ F_{ext} - F_{spring} - F_{damper} = m\ddot{x} $$</div>

Substituting in the equations for the spring and damper give:

<div>$$ F_{ext} - kx - c\dot{x} = m\ddot{x} $$</div>

<p class="centered">
	where:<br>
	\(x\) is the displacement<br>
	\(\dot{x}\) is the first derivative of \(x\) (i.e. velocity)<br>
	\(\ddot{x}\) is the second derivative of \(x\) (i.e. acceleration)<br>
 </p>

We can simulate this system in code by discretizing the system into small time steps, and assume linear values for the acceleration and velocity over these small time steps.

**The way the simulation works:**

1. Assume starting conditions of displacement, velocity and acceleration are 0. `\(F_{ext}\)` is the control variable (set by the PID controller).

2. Determine a suitably small time step, `\( \Delta{T} \)`. Then for each time step:

3. Calculate the force exerted by the spring and damper.  

	<p>$$ F_{spring} = kx $$</p>

 	<p>$$ F_{damper} = c\dot{x} $$</p>

4. Calculate the acceleration for this time step:  

	<p>$$ \ddot{x} = \frac{F_{ext} - F_{spring} - F_{damper}}{m} $$</p>

5. Calculate the change in velocity and displacement for this time step:  

	<p>$$ \Delta{\dot{x}} = \ddot{x} \Delta{T} $$</p>

	<p>$$ \Delta{x} = \dot{x} \Delta{T} $$</p>
   
	**Note that these are changes in velocity and displacement, so to calculate the current velocity and displacement you add this change to the stored velocity/displacement state.**

6. Once the values for the velocity and displacement are updated, repeat steps 3-5 for the next time step. `\(F_{spring}\)` and `\(F_{damper}\)` will calculated for the next time step using these updated velocity and displacement values.

### Response Plots

{{% img src="msd-response-plots.png" width="500px" %}}

## Firmware Modules

If you are looking for PID code for an embedded system, check out my [Pid project on GitHub (CP3id)](https://github.com/gbmhunter/CP3id). It is written in C++ and designed to be portable enough to run on many embedded systems, as well as Linux.

## External Links

A really cool open-source hardware project is the [osPID Kit](http://www.rocketscream.com/shop/ospid-kit) which is sold at [RocketScream](http://www.rocketscream.com). It looks really swank in it's acrylic blue enclosure.

[Improving The Beginners PID: Introduction](http://brettbeauregard.com/blog/2011/04/improving-the-beginners-pid-introduction/) is a great set of articles explaining PID control loops and use Arduino code examples to supplement the explanations.

[Practical Process Control: Proven Methods And Best Practices For Automated Process Control](http://controlguru.com/) has lots of useful information on PID.

[Implementing PID Controllers with Python Yield Statement](https://jckantor.github.io/CBE30338/04.01-Implementing_PID_Control_with_Python_Yield_Statement.html) has some interesting examples on using the `yield` statement in Python to help create a PID controller.

## References

[^wikipedia-pid]: Wikipedia (2022, Mar 30). _PID controller_. Retrieved 2022-05-07, from https://en.wikipedia.org/wiki/PID_controller.

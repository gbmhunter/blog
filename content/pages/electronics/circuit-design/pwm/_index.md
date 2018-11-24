---
author: gbmhunter
date: 2012-10-04 05:51:22+00:00
draft: false
title: PWM
type: page
url: /electronics/circuit-design/pwm
---

# Operating Modes

PWM hardware peripherals may not support every one these modes.

## Edge-Aligned (aka Asymmetric)

**Edge-aligned, the most common (and usually the default) operating mode for a PWM peripheral, is when one edge of the switching from on/off is aligned with the edge of of the PWM period.** In it's most basic form it is simple to implement, requiring a counter, and two registers, one for resetting the counter (which determines the PWM period), and another for comparing with the count value, and switching the output if it's greater than/less than/some logical expression (this sets the duty cycle).

## Centre-Aligned (aka Symmetric)

Centre-aligned PWM is good for motor control as it generates fewer harmonics in the output voltage and current than asymmetric PWM. Some centre-aligned PWM hardware peripherals implement this by using a counter which changes direction every cycle. It counts up for the first cycle, down for the second, and then repeats. Doing this **effectively reduces the PWM frequency by 2**. So to arrive back at the same PWM frequency as when in asymmetric mode, you have to half the period (in terms of clock cycles). This reduces your duty cycle resolution.

# A Warning About PWM And Oscilloscopes

When viewing a PWM output on an oscilloscope, you can experience what is called _aliasing_, and oscilloscope seems to show that the PWM signal is stopping and then restarting at a rate much slower than the PWM frequency.

{{< figure src="in reality it is continuous" width="1200" caption="](/images/2012/10/oscilloscope-aliasing-pwm-output-appaearing-to-turn-on-off.jpg) An oscilloscope aliasing problem which appears to show that the 15kHz PWM signal turning on and off (in reality it is continuous)." caption-position="bottom" >}}

While your PWM could actually be doing this, more often than not what you are seeing is an **artefact caused by the digital sampling of the oscilloscope**. The following picture shows a 15kHz PWM signal appearing to stop and start every 10ms or so. I can assure you that the PWM signal is fine, it is the Rigol 100MHz oscilloscope showing the wrong thing.

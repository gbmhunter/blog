---
author: "gbmhunter"
categories: [ "Electronics", "Circuit Design" ]
date: 2020-09-07
description: "History, modes of operation, schematics and more info on the historic and ubiquitous 555 timer IC."
draft: false
lastmod: 2020-09-07
tags: [ "electronics", "circuit design", "555", "timers", "ICs", "monostable", "astable", "PWM", "duty cycle", "multi-vibrator" ]
title: "555 Timer Circuits"
type: "page"
---

## Internal Workings

{{% img src="555-timer-simplified-internal-schematic-ti.png" width="600px" caption="A simplified internal schematic of a 555 timer IC. Image from https://www.ti.com/lit/ds/symlink/sa555.pdf?HQS=TI-null-null-digikeymode-df-pf-null-wwe." %}}

## Modes Of Operation

### Monostable Mode (Time Delay Mode)

_Monostable mode_ is when the 555 timer is configured to output a single pulse after a fixed amount of time. It only outputs one pulse and then stops until it is externally reset. This mode is used for creating a time delay.

{{% img src="555-timer-schematic-for-monostable-operation-ti.png" width="600px" caption="Schematic for putting the 555 timer into monostable mode. Image from https://www.ti.com/lit/ds/symlink/sa555.pdf?HQS=TI-null-null-digikeymode-df-pf-null-wwe." %}}

### Astable Mode

Astable mode is when the 555 timer is configured to output a continuous waveform with a fixed frequency and duty cycle. It is similar to monostable mode, except that it continually resets itself after every pulse.

Astable mode is also called running the 555 timer as a _multi-vibrator_. **The duty cycle of the output waveform cannot be reduced below 50%**. If you want a duty cycle lower than that, you have to use an inverter on the output.

{{% img src="555-timer-schematic-for-astable-operation-ti.png" width="600px" caption="Schematic for putting the 555 timer into astable mode. Image from https://www.ti.com/lit/ds/symlink/sa555.pdf?HQS=TI-null-null-digikeymode-df-pf-null-wwe." %}}
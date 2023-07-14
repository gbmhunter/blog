---
authors: [ Geoffrey Hunter ]
categories: [ Electronics, Components ]
date: 2023-07-14
draft: false
lastmod: 2023-07-14
tags: [ electronics, components, voltage supervisors ]
title: Voltage Supervisors
type: page
---

{{% warning-is-notes %}}

## Overview

_Voltage supervisors_ (a.k.a. reset ICs[^ti-voltage-supervisors-and-reset-ics]) are ICs that monitor a voltage and output a digital logic level which changes state if the voltage is above or below a threshold. They are typically used for monitoring supply rails and turning ON devices once the voltage reaches an operating level (or looking at it another way, turning OFF devices when the voltage falls below a safe level).

## How They Work

Internally, voltage supervisors have a few core components. One is a stable voltage reference to generate a fixed and known voltage. This is fed into a comparator. The measured analogue voltage is fed to the other input of the comparator.

## References

[^ti-voltage-supervisors-and-reset-ics]: Cory Tran, Abhinav Sharma (2019). _Voltage Supervisor and Reset ICs: Tips, Tricks and Basics_ [Application Note]. Texas Instruments. Retrieved 2023-07-14, from https://www.ti.com/lit/eb/slyy167/slyy167.pdf.

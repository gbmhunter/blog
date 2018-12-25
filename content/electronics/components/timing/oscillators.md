---
author: gbmhunter
date: 2015-12-17 01:21:25+00:00
draft: false
title: Oscillators
type: page
url: /electronics/components/timing/oscillators
---

## Overview

This site uses the word _oscillator_ to represent a component with an **self-contained** oscillating feature that has power, ground, and signal out pins. This site uses the word _crystal_ to represent an component which contains a oscillating element (in the form of a crystal), which requires an **external oscillation circuit** before it useful.

## Designators

A common designator prefix to use for oscillators is `\(Y\)` (e.g. `\(Y1\)`). I do not recommend using the prefix `\(XC\)` as this should be reserved for crystal oscillators.

## Important Parameters

## Phase Noise

Phase noise is a way of describing the stability of the crystal in the frequency domain.

## Start-Up Time

Symbol: `\(T_{SU}\)`

The start-up time for most oscillators is within the range 2-20ms. This start-up time can be important in low-power designs when the start/stop time of the crystal results in wasted energy.

## Physical Construction

The smaller SMD oscillators use MEMs technology in order to fit the entire device into small component packages.

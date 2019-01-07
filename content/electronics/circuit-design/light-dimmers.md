---
author: "gbmhunter"
date: 2015-11-01
draft: false
title: "Light Dimmers"
type: "page"
---

## Overview

Light dimmers are circuits which vary the amount of power going to a light source. The common one associated with the word "light dimmer" is a circuit which dims incandescent bulbs running of a mains (110, 230VAC) supply.

## Resistive Dimming

The most basic way to dim a light is to put a variable resistor in series with the light. This is very simple but has the following disadvantages:  1. It is not very efficient, and the resistor dissipates the remaining energy that is not used by the light, causing heating issues for any moderate dimmer circuit.  2. The colour "temperature" of a tungsten light gets worse with increased dimming, as the voltage across the light drops. 

## Phase Cutting

There are two types of phase-cutting:  1. Leading-edge phase-cutting  2. Trailing-edge phase-cutting

## Zero-Cross Detection

Here is a VERY simple two-component zero-cross detection circuit by Atmel:

{{< figure src="/images/2015/11/two-resistor-one-micro-very-simple-zero-cross-detector-atmel.png" width="333px" caption="A very simple two-component mains zero-cross detection circuit. Image from http://www.atmel.com/."  >}}

More info on this circuit can be found [here](http://www.atmel.com/Images/doc2508.pdf).

## LED Light Dimming

The Cirrus Logic CS1610 family of ICs are designed to be built into the base of an LED lamp, and provide LED dimming when powered from a main supply which is being altered by a circuit which is dimming on either the leading or trailing-edge.

---
author: gbmhunter
date: 2016-05-31 02:56:09+00:00
draft: false
title: Voltage-To-Current Converters
type: page
url: /electronics/circuit-design/voltage-to-current-converters
---

[mathjax]

# Overview

_Voltage-to-current converters_ are circuits which **convert an input voltage into an output current**. The output current is usually proportional to the input voltage, over some suitable range.

Many of these circuit designs use op-amps. Please see the [Op-Amp page](http://blog.mbedded.ninja/electronics/components/op-amps) for more general information on operational amplifiers.

# Howland Current Source

The Howland current source is an op-amp based voltage-to-current converter.

For the circuit to work correctly, three pairs of resistors have to be equal:

$$ R_1 = R_3, R_2 = R_4, R_S = R_{S'} $$

Given the resistor equations above are satisfied, the load current is given by the following equation:

$$ I_{LOAD} = \frac{V_{IN}}{R_S}(\frac{R_2 + R_S}{R_1}) $$

The output impedance is given by the equation (note that this does not depend on the above resistor equality equations to be satisfied):

$$ Z_{OUT} = \frac{R_3 R_{S'}(R_1 + R_2)}{R_1 (R_4 + R_S) - R_3 (R_2 + R_{S'})} $$

The Howland current source is commonly used to build a [4-20mA current-loop transmitter](http://blog.mbedded.ninja/electronics/communication-protocols/4-20ma-current-loops).

# Pre-built ICs

## XTR111

The XTR111 is a current-loop transmitter by Texas Instruments. It can drive grounded loads. It requires both an external BJT and MOSFET. As of May 2016, this IC was US$1.28 (100).

## XTR117

The XTR117 is a current-loop transmitter by Texas Instruments. It cannot drive grounded loads. It only requires an external MOSFET. As of May 2016, this IC was US$1.77 (100).

## DigiKey Search

DigiKey stocks a number of pre-built voltage-to-current converter ICs. First, navigate to the following component sub-section on [www.digikey.com](http://www.digikey.com):

_Product Index -> Integrated Circuits (ICs) -> Interface - Sensor and Detector Interfaces._

Then select the filtering options:  * Type: _Current Transmitter_  * Input Type: _Voltage_

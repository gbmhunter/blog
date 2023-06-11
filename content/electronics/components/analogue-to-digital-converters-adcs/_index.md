---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Circuit Design" ]
date: 2011-09-03
description: "A tutorial on analog-to-digital converters (ADCs), including accuracy, resolution, measuring techniques, usage in microcontrollers and more."
draft: false
lastmod: 2022-03-31
tags: [ "ADCs", "microcontrollers", "accuracy", "resolution", "current loop", "analog-to-digital converter", "digital", "analogue", "analog" ]
title: "Analogue-to-Digital Converters (ADCs)"
type: "page"
---

## Overview

An _analogue-to-digital converter_ (ADC) is a device which converts an input analogue voltage level into a representative digital value. They are commonly used in embedded electronics to measure the value of an analogue sensor. They are very popular and many microcontrollers have one or more built in ADCs, as well as stand-alone ADC ICs which normally offer greater precision and resolutions.

{{% figure src="adc-symbol-analogue-to-digital.png" width="350px" caption="A symbol representing a analogue-to-digital converter (ADC)." %}}

## Microcontroller ADCs

Microcontroller ADCs usually have a 8-12bit resolutions (with some going up to 20-bit). A typical microcontroller has only one ADC unit, but offers an input multiplexor to be able to select an analogue input from a number of pins. The ADC is controlled via registers, usually with voltage reference selectable from an external pin or an internal reference. Voltage dividers can be used to scale a larger voltage into the range acceptable to the microcontroller. Since the input to the ADC is usually of a very high impedance, the voltage at the ADC pin will the related to the ratio of the resistances in the resistor divider. A pull-down resistor is usually connected to an ADC input to prevent it from floating (and giving erroneous results when nothing is connected).

## Accuracy And Resolution

The resolution of an ADC normally depends on the number of bit's it supports. ADCs typically support a bit resolution of 8 to 24 bits, with the resolution error usually limited to the last bit. The accuracy can normally be increased by increasing the sample time, which lengthens the amount of time the input capacitor has to stabilize and allows the ADC to complete finer adjustments. Accuracy can also be increased by taking multiple samples and averaging them. A good way to do this with a microcontroller is to take a number that is equal to a power of 2n (i.e. 2, 4, 8, 16, ...), and then to save computational time the result can be bit shifted right n times instead of using the divide function (essentially doing the same thing).

## Measuring Techniques

There are many ways to convert a analogue signal into a digital one. The two most popular ADC methodologies are _successive approximation register_ (SAR) and _Delta-Sigma_. **SAR ADCs are usually faster but have a lower resolution (typically 8 to 12-bit) while Delta Sigma's are slower but offer greater accuracy (typically up to 20-bit)**. SAR ADCs typically have a sampling rate of 100kHz-1MHz while Sigma-Delta ADCs have a sampling rate of 1-20Hz.

Delta-Sigma ADCs also take longer to switch between input signals (if measuring multiple signals with just one ADC) because they incorporate a filter which needs to be reset and stabilised before the measurements become accurate (essentially the filter's response time).

## Medical Uses

ADCs are commonly used in medical devices for biopotential measurements. One common application is for the analogue front-end in EEG devices. The [Texas Instruments ADS1299](http://www.ti.com/product/ads1299) is one example of an ADC IC designed for EEG applications.

## 4-20mA Current Loops

ADCs can be used to read the value from a 4-20mA current loop signal with the help of a current-to-voltage converting resistors (what all resistors do, right?).

See the [4-20mA Current Loops page](/electronics/communication-protocols/4-20ma-current-loops) for more info.

## Examples

### Texas Instruments ADS8866IDRCR

| |
|-------------------|----------------
| Manf.             | Texas Instruments
| Manf. Part Num    | [ADS8866IDRCR](https://www.ti.com/lit/ds/symlink/ads8866.pdf)
| Topology          | SAR
| Resolution        | 16-bit
| Speed             | 100ksps
| Digital Interface | SPI
| Package           | DFN-10-3x3-TP

Claims to be pin compatible with the Microchip MCP33131-05-E/MN, however the analogue supply voltage ranges are incompatible!

### Microchip MCP33131-05-E/MN

| |
|-------------------|------------
| Manf.             | Microchip
| Manf. Part Num    | [MCP33131-05-E/MN](https://ww1.microchip.com/downloads/en/DeviceDoc/MCP33131-MCP33121-MCP33111-Family-Data-Sheet-DS20006122A.pdf)
| Topology          | SAR
| Resolution        | 16-bit
| Speed             | 500ksps
| Digital Interface | SPI
| Package           | DFN-10-3x3-TP

## Suppliers

* [DigiKey's Data Acquisition - Analog to Digital Converters (ADC) section](https://www.digikey.com/products/en/integrated-circuits-ics/data-acquisition-analog-to-digital-converters-adc/700) (US)

---
authors: [Geoffrey Hunter]
date: 2024-04-30
description: ""
draft: false
lastmod: 2024-04-30
tags: [BLE, low power, batteries, peripheral, central, bluetooth, Apple, iOS, advertising, latency, connection interval]
title: Optimizing BLE for Low Power
type: page
---

{{% warning-is-notes %}}

## Overview

This page discusses how to optimize Bluetooth Low Energy (BLE) for low power consumption. BLE is a Bluetooth protocol specifically designed for communication on low power devices that need to run for months or years off small batteries. With proper design, active BLE connections can be maintained by a microcontroller (MCU) with approx. 4-20uA of average current when running of 3.3V (the exact current depends on a lot of things, including connections settings and transmission power).

## Measuring Current Consumption

First off, you need a way to accurately measure the current consumption of your system. The current consumption is likely to be very "bursty" requiring good time resolution and a high dynamic range due to the brief periods of high consumption (1-20mA) when Bluetooth is running, and long periods of low current consumption when the MCU is otherwise asleep (1-100uA).

My preferred tool is the Nordic Power Profiler Kit (PPK) which is a USB dongle that can either measure in-series current with an external voltage source or also provide the voltage source via an adjustable internal regulator. Shown below is a photo of the hardware:

{{% figure src="_assets/power-profiler-kit-2-photo.webp" width="800px" caption="A photo of the Nordic Power Profiler Kit 2 which is great for measuring the power consumption of low power circuits!" %}}

The current consumption graphs in the rest of this page are screenshots from the Nordic Power Profiler software which accompanies this hardware.

{{% aside type="tip" %}}
Watch out when measuring current upstream of a [switch-mode power supply (SMPS)](/electronics/components/power-regulators/switch-mode-power-supplies-smps/) that has a pulse skipping mode. This could hide the current peaks (and related timing) of the current consumption. The average current/power consumption will be correct however.
{{% /aside %}}

## Advertising Interval

When a peripheral device is advertising, it is regularly sending out transmit-only packets. The time between transmissions is called the _advertising interval_. This is a trade-off between power consumption and the time it takes for a central device to discover (and connect if relevant) to the peripheral.

## Connection Interval

The connection interval specifies the amount of time between when the central device and peripheral device both wake up and communicate with each other. The connection interval is a trade-off between latency and power consumption. The below graph shows the current consumption of 94uA for a nRF52 MCU that is connected to a central device with a connection interval of 30ms and a peripheral latency of 0. The average current consumption is 94uA:

{{% figure src="_assets/ble-current-conn-interval-30ms-latency-0.webp" width="1000px" caption="The current consumption of a BLE device with a connection interval of 30ms and a peripheral latency of 0." %}}

Now if we change the connection interval from 30ms to 1000ms we get a significant current consumption to 20.4uA:

{{% figure src="_assets/ble-current-conn-interval-1000ms-latency-0.webp" width="1000px" caption="The current consumption of a BLE device with a connection interval of 1000ms and a peripheral latency of 0." %}}

## Peripheral Latency

The peripheral latency specifies the number of connection intervals that the peripheral device can skip when connected to a central device. This has a similar effect to the connection interval, except with the additional benefit of allowing the peripheral to wake-up more frequently (i.e. respond to more connection intervals) if it has a lot of data to send. The downside is that the central device still needs to poll the peripheral on every connection interval, so is suitable when you don't care so much about the central devices current consumption.

If we set the connection interval back to 30ms, but change the peripheral latency from 0 to 30 (which would mean the peripheral would skip packets for at most 900ms), the current consumption drops from 94uA (as per above) to 18uA as shown in the below image:

{{% figure src="_assets/ble-current-conn-interval-30ms-latency-30.webp" width="1000px" caption="The current consumption of a BLE device with a connection interval of 30ms and a peripheral latency of 30." %}}

## Apple Device Support

Apple recommends some further restrictions on the connection interval and peripheral latencies for support with iOS devices[^apple-accessory-design-guidelines]. Apple's document, "Accessory Design Guidelines for Apple Devices" can be downloaded from [here](https://developer.apple.com/accessories/Accessory-Design-Guidelines.pdf).

A screenshot of the BLE connection parameters from Apple's document is shown below:

{{% figure src="_assets/apple-accessory-design-guidelines-ble-connection-parameters.png" width="600px" caption="The recommended BLE connection parameters from Apple's \"Accessory Design Guidelines for Apple Devices\"[^apple-accessory-design-guidelines]." %}}

## Further Reading

See the [Bluetooth page](/electronics/communication-protocols/bluetooth/) if you are interested in learning more about the Bluetooth protocol.

## References

[^silicon-labs-optimizing-current-ble]: Silicon Labs. _Optimizing Current Consumption in Bluetooth Low Energy Devices_. Retrieved 2024-04-30, from https://docs.silabs.com/bluetooth/3.2/general/system-and-performance/optimizing-current-consumption-in-bluetooth-low-energy-devices.
[^apple-accessory-design-guidelines]: Apple (2023, Oct 10). _Accessory Design Guidelines for Apple Devices - Release R21_. Retrieved 2024-04-30, from https://developer.apple.com/accessories/Accessory-Design-Guidelines.pdf.

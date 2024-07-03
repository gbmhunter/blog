---
authors: [Geoffrey Hunter]
categories: [Programming, Firmware]
date: 2024-07-01
description: 
draft: false
lastmod: 2024-07-03
tags: [Memfault, embedded, firmware, IoT, nRF Connect SDK, nRF Connect, nRF, Bluetooth, GATT, Memfault Diagnostic Service, MDS, Android, iOS, OTA]
title: Memfault
type: page
---

Memfault is a commercial cloud-based service designed for collecting and analysing data from a fleet of internet-connected embedded devices. It also allows you to manage and deploy OTA (over-the-air) updates to your devices.

{{% figure src="_assets/memfault-logo-full-light-min.png" width="500px" caption="The Memfault logo[^memfault-docs]." %}}

## Dashboard

Memfault has a web-based dashboard for viewing data from your devices and managing things like OTA updates.

{{% figure src="_assets/memfault-demo-dashboard-overview-screenshot.webp" width="1000px" caption="A screenshot of the Memfault dashboard on their demo account[^memfault-demo-dashboard]." %}}

## Traces

Memfault gives you the ability to send traces from your embedded device. A trace is designed to be sent when a significant issue occurs. By defaults, traces send you emails.

## nRF Memfault Phone App

The nRF Memfault app by Nordic Semiconductor is a phone app (available for [Android](https://play.google.com/store/apps/details?id=no.nordicsemi.memfault&hl=en) and [iOS](https://apps.apple.com/us/app/nrf-memfault/id1641119282)) which allows you to connect to devices running Memfault and publishing on the Memfault Diagnostic Service (MDS). The MDS is a [Bluetooth](/electronics/communication-protocols/bluetooth/) GATT service. The app connects to these devices and streams the "chunks" from the device to the Memfault cloud.

The nRF Memfault app displays the application key (project key) and device ID.

{{% figure src="_assets/nrf-memfault-app-chunks-screenshot.webp" width="300px" caption="A screenshot of the nRF Memfault app with a device connected to it. You can see the chunks of data which have been downloaded of the device and uploaded to Memfault." %}}

## References

[^memfault-docs]: Memfault. _Memfault Docs_. Retrieved 2024-07-03, from https://docs.memfault.com/.
[^memfault-demo-dashboard]: Memfault. _Demo Dashboard_. Retrieved 2024-07-03, from https://demo.memfault.com/organizations/acme-inc/projects/shapemate/dashboards/memfault-overview.
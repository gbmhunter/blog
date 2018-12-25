---
author: gbmhunter
date: 2017-03-27 01:48:03+00:00
draft: false
title: FreeRTOS And Watchdogs
type: page
url: /programming/operating-systems/freertos/freertos-and-watchdogs
---

## Overview

The multi-tasked nature of FreeRTOS presents challenges when implementing a watchdog.

## A Simple Approach

A simple approach to implementing a watchdog in a multi-tasked FreeRTOS application is to create a new watchdog task whose responsibility is to feed the watchdog at a constant rate.

However, this only proves that the scheduler is working well enough to call this one task at the correct time. Other tasks could be in a "locked" state and the watchdog task would never be the wiser.

## A Better Approach

Each running task should "check-in" within a certain period of time. A watchdog task regularly runs and makes sure that **every task has checked in within it's specified time limit**. If all tasks have checked in on time, the watchdog task feeds the watchdog. If any one task has failed to check in on time, the watchdog task should not feed the watchdog, which should then cause the watchdog to fire.

## Can I Use The System Tick?

**Do not use the system tick to feed the watchdog.** Most system ticks are interrupts triggered by a hardware timer, which just proves that the timer is running o.k. (the rest of the operating system could have crashed).

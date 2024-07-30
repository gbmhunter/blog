---
authors: [ "Geoffrey Hunter" ]
categories: [ "Embedded", "Software", "Operating Systems" ]
date: 2013-07-31
draft: false
tags: [ "FreeRTOS", "idle task", "hook", "vApplicationIdleHook", "freeing memory" ]
title: The Idle Task
type: page
---

The idle task is the default task that the FreeRTOS scheduler will enter into if their are no tasks waiting for execution time. It is created automatically by the FreeRTOS core, and cannot be disabled. There are two ways of getting access to the idle function (so you can write you own code inside it).

Monitoring the idle task is a good way to measure the utilization of an embedded CPU, and see how much free time it has left to do other things.

FreeRTOS always requires at least one task that is ready to run, and because of this, you must not use FreeRTOS API functions in the idle task which may wait of block on things.

The idle task is responsible for freeing memory of tasks which have been recently deleted. So if your application deletes tasks, you must make sure that the idle task is not starved continuously of processor time, otherwise the memory will never be freed. This is the only thing the idle task has to do however, so if you don't delete any tasks (which is a common scenario), the idle task can be starved of processor time.

## Creating An Idle Hook

To create an idle hook, `configUSE_IDLE_HOOK` must be set to `1` in `FreeRTOSConfig.h`, and then define a function with the following prototype:

```c
void vApplicationIdleHook();
```
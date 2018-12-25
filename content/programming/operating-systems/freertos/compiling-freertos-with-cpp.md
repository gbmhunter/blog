---
author: gbmhunter
date: 2013-08-01 00:53:05+00:00
draft: false
title: Compiling FreeRTOS With C++
type: page
url: /programming/operating-systems/freertos/compiling-freertos-with-cpp
---

## Overview

This page contains helpful advice for people wanting to use FreeRTOS on a C++ application designed for a embedded system (e.g. a microcontroller).

## General Compatibility

In general, FreeRTOS can work within/alongside a C++ embedded application. All of the FreeRTOS headers are wrapped in extern "C" { } blocks to ensure correct linkage in a C++ application.

Because of this, is usually doesn't take much to get FreeRTOS working with C++ code. That said, you have to make sure your tool chain supports C++ compilation (most compilers for ARM microcontrollers do, e.g g++ can be used instead of gcc).

## Task Functions

Traditionally, the task function needs to be a function with C linkage, and takes 1 void * parameter (for the pvParameters variable). Unfortunately, this means you cannot use a C++ member function (a.k.a method, a function which belongs to a class and is not static).

There are a few ways to solve this problem:

1. Define the task function as static, or put the function outside of a class altogether (so it is just like a regular C function).

2. Pass in the object as part of the pvParameters variable, and then create a wrapper function which casts this variable back into a function pointer.

## Wrapping FreeRTOS Primitives

FreeRTOS primitives, such as mutexes, semaphores, queues, delays e.t.c **can be called directly from C++ code**. However, you may decide that more OO-friendly primitives are required.

This can be done by **wrapping the FreeRTOS primitives in a object-orientated C++ layer**. For instance, you could create a C++ mutex class which then calls the FreeRTOS APIs.

## Alternatives

A alternative to modifying/wrapping FreeRTOS for a C++ environment is to use a RTOS which is explicitly designed for C++. [distortos](https://github.com/DISTORTEC/distortos) is one such promising example. As of Dec 2016, it is not as well supported as FreeRTOS, but has active development.

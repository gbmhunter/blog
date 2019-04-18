---
author: gbmhunter
date: 2013-06-18 02:19:00+00:00
draft: false
title: Reading User Input
type: page
url: /programming/languages/c/reading-user-input
---

## Overview

Reading user input is the process of prompting the user for input, and then receiving this by the software so that actions can be done based on what was typed. This applies more to C programs running on Linux and other terminal-capable architectures, rather than embedded microcontrollers.

## Using scanf()

`scanf()`  is one of the most common ways of getting user input from a terminal in Linux.

The simplest example is that which gets an integer displayed by the user and stores it in a variable called input .

```c
int32_t input;
scanf ("%d", &input);
```
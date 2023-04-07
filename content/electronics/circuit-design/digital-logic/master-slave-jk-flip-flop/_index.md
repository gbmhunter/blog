---
authors: [ "Geoffrey Hunter" ]
categories: [ "Electronics", "Circuit Design" ]
date: 2023-04-04
draft: false
lastmod: 2023-04-04
tags: [ electronics, circuit design, digital logic, jk, flip-flop, master, slave, clock ]
title: "Master Slave JK Flip Flop"
type: "page"
---

## Overview

The _master-slave JK flip-flop_ is a circuit made by connecting two gated JK flip-flops in a "series" connection. It solves the race condition with basic JK flip-flops where if the clock stays high for a significant period of time, the output toggles very quickly between LOW and HIGH. Connecting two JK flip-flops in this manner also makes the overall device _edge triggered_, rather than _level triggered_.

The first JK flip-flop acts as a "master" circuit which triggers on the rising edge of the clock pulse, and the second flip-flop acts as a "slave" circuit which triggers on the falling edge of the clock pulse.

The `74LS73` IC contains two JK flip-flops and can be used to make a master-slave JK flip-flop.
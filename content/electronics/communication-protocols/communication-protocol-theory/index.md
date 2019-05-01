---
author: "gbmhunter"
date: 2017-08-30
draft: false
tags: [ "communication protocols" ]
title: "Communication Protocol Theory"
type: "page"
---

## Communication Bus Topologies

The topology of a communication bus describes how nodes are connected to each other (e.g. line, ring, mesh), and what the type of each node is (e.g. whether nodes are master or slave, and how many are allowed of each).

## Point-to-Point

A point-to-point communication bus has **one driver, one receiver**. This is the simplest type of communication bus. It is also the communication bus which gives the greatest signal integrity, as the fan-out of one driver to many receiver increases the number of impedance mismatches.

{{% note %}}
The concept of point-to-point applies to each "wire" of the bus. For example, even though UART could be thought of one transceiver connected to another transceiver, each wire on the bus has only one transmitter and one receiver, and hence is point-to-point.
{{% /note %}}

Examples of point-to-point communication buses are:

* UART
* RS-232

## Multidrop

A multidrop communication bus has **one driver, many receivers**. RS-485 is an example of a communication protocol which supports a multidrop topology.

## Multipoint

A multipoint communication bus has **many drivers, many receivers**. It is also commonly referred to as a multi-master configuration. Because there is more than 1 driver on a multipoint system, contention issues (when multiple drivers try and drive the bus at the same time) have to be considered.

There are different solutions to providing multipoint arbitration:

* Common collector (also called wired OR) signalling
* Token passing

Multipoint buses often use **wired-OR signalling**. This means that drivers only actively drive the bus for one logic state, and the bus is passively driven for the other logic state. An example of this is I2C. An I2C driver will drive the bus low to transmit a 0, but to transmit a 1 the driver turns off, the bus is pulled high to a "1" state by a pull-up resistor.

Wired-OR signalling prevents signalling contentions (when two drivers attempts to drive at the same time) from **drawing large currents** and causing damage to the buses.

Examples of multipoint communication buses include:

* 1-wire
* CAN
* I2C
* SCSI

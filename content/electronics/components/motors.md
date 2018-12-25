---
author: gbmhunter
date: 2011-09-03 02:17:41+00:00
draft: false
title: Motors
type: page
url: /electronics/components/motors
---

## Brushed DC Motors

Half-Bridge

A half-bridge is useful if you only need to control the motor in one direction. A half-bridge allows acceleration, free-running, and deceleration in one direction. A half-bridge needs one high-side and one low-side switch, usually a P and N channel MOSFET. There are many OTC chips that do a varying amount of the control for you.

* Half-bridge gate drivers - These are chips which don't have any of the h-bridge swicthes inside them, they are purely designed to control the gate's of external MOSFET's. They typically used in higher power designs because the exteranl swicthes allow for lower on-resistance MOSFET's and better heatsinking. They normally control the dead-time (to prevent shoot-through), have thermal protection circuitry, and a enable pin.
* Full-bridge gate drivers - Just like half-bridge gate drivers, except now they control a full-bridge. This means the motor can go in reverse also!

Major supliers of H-bridge driver IC's include Texas Instruments (FAN738 series), ST Microelectronics (L6 series) ROHM (the BD621, BD622, and BD623 series).

## The Open Source Motor Control Project (OSMC)  

URL: [http://www.robotpower.com/osmc_info/](http://www.robotpower.com/osmc_info/)  

Decription: A open source project for a high-power DC motor control system. The H-bridge uses 16 IRFB3207 MOSFET's which have an on resistance of 4.5mOhm. It is controlled by the Intersil HIP4081A H-bridge driver.

## Brushless DC Motors (BLDC)

Brushless DC motors do not have any brushes or cummutation rings to switch the current for you like traditional brushed DC motors. The motors have a varing number of phases (usually three), and these must be swictched at the correct times for the motor to work. The naming conventions for the different types of BLDC motors is pretty messed up, but the general rule is:

1. Any motor name a "BLDC motor" has trapezoidal BEMF
2. Any motor named a DC Servo or PMSM is also a BLDC motor, but has sinusoidal BEMF

Various options to control the BLDC include:

* OTC complete RC Hobby ESC (electronic speed controller). These are sold by RC Hobbist suppliers such as Hobby King ([www.hobbyking.com](http://www.hobbyking.com/))
* Special microcontroller that is desinged for BLDC motor control (such as ST Microelectronics ST7MC)
* Design your own from scratch

For more information on BLDC motors, go to the [BLDC Motor Control](/electronics/circuit-design/bldc-motor-control) page.

## Universal Motors

These motors are named from the fact they can run on either DC or AC. They are similar to a permanent magnet DC motor, except that the permanent magnets are replaced with electro-magnets. They are used in blenders, drills, circular saws, vacuum cleaners and anything-else that requires a cheap, high-rpm motor. They can turn at any almost any speed you want it to, including really fast.

## Weird Motors

Ball-bearing Motors

## Standard Motor Sizes

The NEMA standard.

## External Links

[UNSW - Electric Motors And Generators](http://www.animations.physics.unsw.edu.au/jw/electricmotors.html) is a great website showing the basic principles of operation behind many different motors.

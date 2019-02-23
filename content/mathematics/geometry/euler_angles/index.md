---
author: gbmhunter
date: 2019-02-20
draft: false
lastmod: 2019-02-20
tags: [ "matrix", "rotation", "complex", "interpolation", "Euler", "angle", "RPY", "gimbal lock", "attitude", "orientation", "vector" ]
title: "Euler Angles"
type: page
---

## Overview

Euler angles is a way of describing the rotation in 3D space using three separate rotations around an axes.

## Syntax

Euler angles are usually defined one of the two symbol sets:

* `\( \alpha, \beta, \gamma \)` (Alpha, Beta, Gamma). These are usually used with _proper Euler angles_.
* `\( \Phi, \Theta, \Psi \)` (Phi, Theta, Psi). These are usually used with _Tait-Bryan angles_.

## Proper Euler Angles vs. Tait-Bryan Angles

Euler angles can be split into two categories based on the axis used:

* **Proper Euler Angles**: These use the same axis for both the first and third rotations, e.g. x-y-x, x-z-x, y-x-y, y-z-y, z-x-z, z-y-z
* **Tait-Bryan Angles**: These use all three axis (no axis is used twice), e.g. x-y-z, x-z-y, y-x-z, y-z-x, z-x-y, z-y-x

Proper Euler angles are also called **classic Euler angles**.

The classic roll, pitch, yaw (RPY) terminology is a Tait-Bryan angle. Tait-Bryan angles are also called **Cardan angles**, **nautical angles**, or **heading, elevation and bank**.

The axes of the initial frame (also called the reference frame) is denoted with x, y, z. The rotated frame is denoted with X, Y, Z.

The line of nodes is the line (or vector) made by the intersection of the xy and XY planes.

# Calculating Euler Angles Between Two 3D Vectors

First we calculate the cross-product of the two vectors, which gives us the vector of rotation:

<div>$$ N = a \cross b $$</div>

<div>$$ \cos{\theta} = \frac{a \cdot b}{length(a)*length(b)} $$</div>

If you are using unit vectors, you can ignore the lengths (this would just divide by 1).
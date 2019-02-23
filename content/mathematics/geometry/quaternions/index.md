---
author: gbmhunter
date: 2014-11-13
draft: false
lastmod: 2019-02-14
tags: [ "quaternion", "matrix", "rotation", "complex", "SLERP", "interpolation", "Euler", "angle", "RPY", "gimbal lock", "attitude", "orientation", "vector" ]
title: "Quaternions"
type: page
---

## Overview

A quaternion (pronounced qwa-ter-ne-ion) is a object which contains four numbers. Arguably, the most useful quaternions is a subset of all quaternions, called **unit quaternions** (or **versors**), which can be used to describe a rotation in 3D space. This page focuses on these unit quaternions.

There are a number of different ways to describe rotations. These include:

* Euler angles (roll, pitch, yaw)
* Rotation matrices
* Quaternions

Quaternions do not suffer from the **gimbal lock** that Euler angles do. A quaternion describes a rotation from one coordinate system to another. When they are used purely to represent a rotation (e.g. no reference coordinate system specified), they are called **rotation quaternions**. They can also be used to describe an orientation, as long as a reference coordinate system is supplied (in which the quaternion specifies the orientation as a rotation from the reference coordinate system to the coordinate system of the rotated object). In this case they are called **orientation quaternions**.

## Scalar And Vector

A quaternion can be divided up into a scalar part and a vector part.

<div>$$ q = (r, v) $$</div>

## Rotating A Vector

<div>$$
P = [ 0, p_x, p_y, p_z ]
R = [ w, x, y, z ]
R' = [ w, -x, -y, -z ]
$$</div>

## Combining Rotations

Rotations can be easily combined when using quaternions.

Given two quaternion rotations that are to be applied consecutively, `\( R_A \)` and then `\( R_B \)`, the total rotation `\( R_C \)` is found with:

<div>$$ R_C = R_B R_A $$</div>

Remember that **quaternion multiplication is not associative**, so the ordering of `\( R_A \)` and `\( R_B \)` is important.

## Some Useful Quaternions

Quaternion                                      | Description
------------------------------------------------|-------------------------------------------
$$ q = [1, 0, 0, 0] $$</div>                    | Identity quaternion, no rotation.
$$ q = [0, 1, 0, 0] $$</div>                    | Rotation of 180 around X axis.
$$ q = [0, 0, 1, 0] $$</div>                    | Rotation of 180 around Y axis.
$$ q = [0, 0, 0, 1] $$</div>                    | Rotation of 180 around Z axis.
$$ q = [\sqrt{0.5}, \sqrt{0.5}, 0, 0] $$</div>  | Rotation of 90 around X axis.
$$ q = [\sqrt{0.5}, 0, \sqrt{0.5}, 0] $$</div>  | Rotation of 90 around Y axis.
$$ q = [\sqrt{0.5}, 0, 0, \sqrt{0.5}] $$</div>  | Rotation of 90 around Z axis.
$$ q = [\sqrt{0.5}, -\sqrt{0.5}, 0, 0] $$</div> | Rotation of -90 around X axis.
$$ q = [\sqrt{0.5}, 0, -\sqrt{0.5}, 0] $$</div> | Rotation of -90 around Y axis.
$$ q = [\sqrt{0.5}, 0, 0, -\sqrt{0.5}] $$</div> | Rotation of -90 around Z axis.

## Interpolation

### SLERP

SLERP is shorthand for **spherical linear interpolation**. It is commonly used with quaternions to produce a smooth rotation of a 3D body from one orientation to another.

[https://en.wikipedia.org/wiki/Slerp](https://en.wikipedia.org/wiki/Slerp) has some code examples in Python and C++ that perform SLERP on quaternions.
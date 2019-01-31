---
author: gbmhunter
date: 2014-11-13
draft: false
title: "Quaternions"
type: page
---

## Overview

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

Remember that quaternion multiplication is not associative, so the ordering of `\( R_A \)` and `\( R_B \)` is important.

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

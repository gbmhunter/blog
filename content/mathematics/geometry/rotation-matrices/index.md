---
author: "gbmhunter"
date: 2019-02-25
description: "An introduction to rotation matrices. What they are, how to calculate them, and what they are useful for!"
draft: false
lastmod: 2019-10-03
tags: [ "matrix", "interpolation", "angle", "attitude", "orientation", "vector", "rotation", "rotation matrix", "dot product", "reference frame", "coordinate system" ]
title: "Rotation Matrices"
type: "page"
---

## Overview

Rotation matrices are matrices which are used to describe the rotation of a rigid body from one orientation to another.

In R3 they form a 3x3 matrix.

## How To Find The Rotation Matrix Between Two Coordinate Systems

Suppose I have the frame with the following vectors defining the first coordinate system:

```
X1 = [ x_x x_y x_z ]
Y1 = [ y_x y_y y_z ]
Z1 = [ z_x z_y z_z ]
```

The rotation matrix `\( R \)` which rotates objects from the first coordinate system `\(X1Y1Z1\)` into the second coordinate system `\(X2Y2Z2\)` is:

<p>$$
R = \begin{bmatrix}
  X1 \cdot X2 & X1 \cdot Y2 & X1 \cdot Z2\\
  Y1 \cdot X2 & Y1 \cdot Y2 & Y1 \cdot Z2\\
  Z1 \cdot X2 & Z1 \cdot Y2 & Z1 \cdot Z2\\
\end{bmatrix}
$$</p>

<p class="centered">
  where:<br>
  \( \cdot \) is the matrix dot product
</p>
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

<p>$$
\mathbf{R} = \begin{bmatrix} \bhat{u_x} & \bhat{v_x} & \bhat{w_x} \\ \bhat{u_y} & \bhat{v_y} & \bhat{w_y} \\ \bhat{u_z} & \bhat{v_z} & \bhat{w_z} \end{bmatrix}
$$</p>

such that:

<p>$$
\b{Ra} = \b{b}
$$</p>

<p class="centered">
where:<br>
\(\b{a}\) and \(\b{b}\) are 1x3 vectors<br>
</p>

## Combining Rotations

Two successive rotations represented by `\(\b{R_1}\)` and `\(\b{R_2}\)` can be represented by a single rotation matrix `\(\b{R_3}\)` where:

<p>$$ \b{R_3} = \b{R_2} \b{R_1} $$</p>

Pay careful attention to the order of the matrix multiplication, successive rotation matrices are multiplied on the left.

## How To Find The Rotation Matrix Between Two Coordinate Systems

Suppose I have the frame with the following unit vectors defining the first coordinate system `\( X1Y1Z1 \)`:

<p>$$
X1=\begin{bmatrix}x_x\\x_y\\x_z\end{bmatrix} \quad Y1=\begin{bmatrix}y_x\\y_y\\y_z\end{bmatrix} \quad Z1=\begin{bmatrix}z_x\\z_y\\z_z\end{bmatrix}
$$</p>

And a second coordinate system `\( X2Y2Z2 \)` defined by the unit vectors:

<p>$$
X2=\begin{bmatrix}x_x\\x_y\\x_z\end{bmatrix} \quad Y2=\begin{bmatrix}y_x\\y_y\\y_z\end{bmatrix} \quad Z2=\begin{bmatrix}z_x\\z_y\\z_z\end{bmatrix}
$$</p>

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
  \( \cdot \) is the matrix dot product<br>
  and everything else as above
</p>
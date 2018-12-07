---
author: gbmhunter
date: 2017-11-14 18:06:33+00:00
draft: false
title: Affine Transformations
type: page
url: /mathematics/geometry/affine-transformations
---

# Overview

An affine transformation is a function between two different coordinate systems (or affine spaces) which preserves certain properties. These properties include:

* Points (points that exists in the first coordinate system will exist in the second coordinate system)
* Straight lines (lines that are straight in the first coordinate system are straight in the second)
* Parallelism (lines that are parallel in the first coordinate system are parallel in the second)

An affine transformation can encompass the following "basic" modifications:

* Translation
* Reflection
* Scaling
* Rotation
* Shearing

# The Transformation Matrix

A 2D affine transformation matrix is always in the form:

<div>$$ M = \begin{bmatrix}a&b&t_x\\c&d&t_y\\0&0&1\end{bmatrix} $$</div>

This maps from one affine space to another via the equation:

<div>$$ \begin{bmatrix}x^\prime\\y^\prime\\1\end{bmatrix} = \begin{bmatrix}a&b&t_x\\c&d&t_y\\0&0&1\end{bmatrix}\begin{bmatrix}x\\y\\1\end{bmatrix}$$</div>

Note how one more matrix dimension is used than the dimension of the space you wish to apply the affine transformation to. This is so that translation transformations can be performed.

# Translation

A 2D translation can be described by the following equation (using homogeneous coordinates):

<div>$$ \begin{bmatrix}x^\prime\\y^\prime\\1\end{bmatrix} = \begin{bmatrix}1&0&t_x\\0&1&t_y\\0&0&1\end{bmatrix} \begin{bmatrix}x\\y\\1\end{bmatrix}$$</div>

# Scaling

A 2D scaling can be done with:

<div>$$ \begin{bmatrix}x^\prime\\y^\prime\\1\end{bmatrix} = \begin{bmatrix}s_x&0&0\\0&s_y&0\\0&0&1\end{bmatrix} \begin{bmatrix}x\\y\\1\end{bmatrix}$$</div>

# Rotation

A 2D counter-clockwise rotation can be described by the following equation:

<div>$$ \begin{bmatrix}x^\prime\\y^\prime\\1\end{bmatrix} = \begin{bmatrix}cos\theta&-sin\theta&0\\sin\theta&cos\theta&0\\0&0&1\end{bmatrix} \begin{bmatrix}x\\y\\1\end{bmatrix}$$</div>

Note that the above equation performs rotation around the origin. To perform rotation around an arbitrary point, first translate the point to the origin, perform the rotation, and then translate back.

3D rotation can be divided into 3 rotations around each of the axis:

<div>$$R_x = \begin{bmatrix}1&0&0\\0&cos\theta&-sin\theta\\0&sin\theta&cos\theta\end{bmatrix}$$</div>

<div>$$R_y = \begin{bmatrix}cos\theta&0&sin\theta\\0&1&0\\-sin\theta&0&cos\theta\end{bmatrix}$$</div>

<div>$$R_z = \begin{bmatrix}cos\theta&-sin\theta&0\\sin\theta&cos\theta&0\\0&0&1\end{bmatrix}$$</div>

# Shearing

A x direction shear (a shearing along x that is proportional to y):

<div>$$ \begin{bmatrix}x^\prime\\y^\prime\\1\end{bmatrix} = \begin{bmatrix}1&0&0\\\lambda&1&0\\0&0&1\end{bmatrix} \begin{bmatrix}x\\y\\1\end{bmatrix}$$</div>

A y direction shear (a shearing along y that is proportional to x):

<div>$$ \begin{bmatrix}x^\prime\\y^\prime\\1\end{bmatrix} = \begin{bmatrix}1&\lambda&0\\0&1&0\\0&0&1\end{bmatrix} \begin{bmatrix}x\\y\\1\end{bmatrix}$$</div>

# Combining Transformations

Multiple affine transformations (translation, rotation, shear, e.t.c) can be combined into a single transformation matrix.

Remember, we can do this because **matrix multiplication is associative!** `\(A(Bx) = (AB)x\)`.

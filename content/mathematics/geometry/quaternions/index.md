---
author: gbmhunter
categories: [ "Mathematics", "Geometry" ]
date: 2014-11-13
description: "A tutorial on quaternions, including calculators to convert between quaternions, rotation matrices and axis-angle notations."
draft: false
lastmod: 2019-10-14
tags: [ "quaternion", "matrix", "rotation", "complex", "SLERP", "interpolation", "Euler", "angle", "RPY", "gimbal lock", "attitude", "orientation", "vector", "calculator", "conversion" ]
title: "Quaternions"
type: "page"
---

## Overview<

A quaternion (pronounced _qwa-ter-ne-ion_) is a complex-number like system which contains three imaginary components and one real component. Arguably, the most useful quaternions is a subset of all quaternions called <b>unit quaternions</b> (or <b>versors</b>), which can be used to describe a rotation in 3D space. This page focuses primarily on these unit quaternions.


## Defining Equation And Identities

The basic form of a quaternion is:

<p>$$ \mathbf{q} = w + x\mathbf{i} + y\mathbf{j} + z\mathbf{k} $$</p>

<p class="centered">
  where:<br />
  \(w, x, y, z\) are real numbers<br />
  \(\mathbf{i, j, k}\) are the <i>quaternion units</i><br />
  (which can be seen as similar to the complex number \(\mathbf{i}\))
</p>

The multiplication rules for the quaternion units are:

<p>$$ \mathbf{i}^2 = \mathbf{j}^2 = \mathbf{k}^2 = \mathbf{ijk} = -1 $$</p>

From these rule above, you can determine some identities:

<p>$$ \mathbf{ijk} = -1 $$</p>

Multiply both sides by `\(\mathbf{i}\)`:

<p>$$ \mathbf{i}^2\mathbf{jk} = -\mathbf{i} $$</p>

<p>Using the rule that \(\mathbf{i}^2 = -1\):</p>

<p>$$ -\mathbf{jk} = -\mathbf{i} $$</p>

<p>And thus:</p>

<p>$$ \mathbf{i} = \mathbf{jk} $$</p>

<p>The same process can be applied the other way around and also to \(\mathbf{j}\) and \(\mathbf{k}\) resulting in the following six identities:</p>

<p>$$ \begin{align}
  \mathbf{i} &= \mathbf{jk} \\
  \mathbf{j} &= -\mathbf{ik} \\
  \mathbf{k} &= \mathbf{ij} \\
  \mathbf{-i} &= \mathbf{kj} \\
  \mathbf{-j} &= -\mathbf{ki} \\
  \mathbf{-k} &= \mathbf{ji} \\
\end{align} $$</p>

<p>These identities are used to <b>simplify terms when applying the product rule to quaternion multiplication</b>.</p>

## Quaternion Conjugates

All quaternions have a conjugate. The conjugate of a quaternion represents a rotation in the opposite direction. For example, if `\( \mathbf{q} \)` describes the orientation of frame `B` relative to frame `A`, then `\( \mathbf{\bar{q}} \)` would describe the orientation of frame `A` relative to frame `B`. The conjugate of a quaternion `\(\mathbf{q}\)` is:

<p>$$ \mathbf{\bar{q}} = w - x\mathbf{i} - y\mathbf{j} - z\mathbf{k} $$</p>

All you need to do is multiple all of the imaginary terms by `\( -1 \)`. The conjugate can also be denoted by `\( \mathbf{q*} \)` or `\( \mathbf{q^T} \)`. However `\( \mathbf{\bar{q}} \)` is the preferred choice on this site.

The conjugate of a unit quaternion is the same as it's inverse.

## Pure/Vector Quaternions

A pure quaternion is a quaternion where `\(w=0\)`. This results in a quaternion:

<p>$$ \mathbf{q} = x\mathbf{i} + y\mathbf{j} + z\mathbf{k} $$</p>

This three-valued quaternion also happens to be able to represent a vector in 3D space, and so it is also called a <i>vector quaternion</i>. A vector quaternion is used to represent either a vector or point in 3D space when you want to apply a quaternion rotation to it (more on this below).

## Scalar/Vector Notation

You can split a quaternion into a scalar and a vector component. The `\(w\)` represents the **scalar** part of the quaternions and the `\(x, y, z\)` represents the **vector** part. You may see a quaternion written with an `\(w\)` for the scalar part and a `\(\vec{r}\)` for the vector part.

<p>$$ \mathbf{q} = (w, \vec{r}) $$</p>

## Unit Quaternions

Unit quaternions are quaternions in which the coefficients have been **normalized** as follows:

<p>$$ w^2 + x^2 + y^2 + z^2 = 1 $$</p>

Interestingly, all rotations in 3D space (which is called the 3D rotation group, or `\(\mathbf{SO(3)}\))` can be represented by the unit quaternions (which is a sub-set of all quaternions). In fact, you will rarely ever deal with a quaternion that is not a unit quaternion!

## Representation In Software/Programming

In software, quaternions are typically described with a vector/array (in the programming sense of the word) in the following form:

<p>$$ \mathbf{q} = \begin{bmatrix}w\\x\\y\\z\end{bmatrix} $$</p>

in where the coefficients are stored in an array and the quaternion units are implied by position.

It is important to note that **although it is common to represent a quaternion with vector-like syntax, it is definitely not a vector** (in the mathematical sense of the word). For one, quaternion multiplication does not follow the dot or cross-product multiplication rules that vectors do.

## Why Use Quaternions To Describe Rotations?

There are a number of different ways to describe rotations. These include:

* Axis-angle representation
* Euler angles (roll, pitch, yaw)
* Rotation matrices
* Quaternions

Why choose Quaternions? One reason is that Quaternions do not suffer from the _gimbal lock_ that Euler angles do. This also is related to the fact that they are differentiable (i.e. very small changes in rotation cause very small changes in the quaternion values), which allows for smooth interpolation, important for many use cases including 3D animation. They are also more compact with only four numbers need to be stored than a 9 number rotation matrix. Quaternions are also easily converted into the angle-axis representation and back again.
  
  
## Rotating A Vector

You can rotate a vector `\(v\)` in 3D space to `\(v'\)` with:

<p>$$ \begin{bmatrix}0\\v'\end{bmatrix} = q \begin{bmatrix}0\\v\end{bmatrix}q' $$</p>

Because the vector is squashed between the quaternion and it's conjugate, this is sometimes referred to as the "sandwich product". The multiplications can be done by the basic product rule, or more easily using the _Hamilton product_.

Lets assume we have the vector:

<p>$$ v = \begin{bmatrix}1\\0\\0\end{bmatrix} $$</p>

And we want to rotate it with the quaternion>

<p>$$ q = \begin{bmatrix}\sqrt{0.5} \\ 0 \\ \sqrt{0.5} \\ 0]\end{bmatrix} $$</p>

This quaternion just so happens to be a rotation of `\(90\)` around the y-axis>

We turn the vector into a vector quaternion by adding a fourth value of 0 (which is the `\(w\)`):

<p>$$ v = \begin{bmatrix}0\\1\\0\\0\end{bmatrix} $$</p>

Combine into:

<p>$$
  v' = 
  \begin{bmatrix}\sqrt{0.5} \\ 0 \\ \sqrt{0.5} \\ 0]\end{bmatrix}
  \begin{bmatrix}0\\1\\0\\0\end{bmatrix}
  \begin{bmatrix}\sqrt{0.5} \\ 0 \\ -\sqrt{0.5} \\ 0]\end{bmatrix}
$$</p>

To calculate the multiplication of two quaternions, you can use the Hamilton product. If you have the equation:

<p>$$q3 = q1*q2$$</p>

where each quaternion is composed in the following manner:

<p>$$ q1 = q1_w + q1_x \mathbf{i} + q1_y \mathbf{y} + q1_z \mathbf{z} $$</p>

then using the Hamilton product, the values of each component in `\(q3\)` are<a href="#1"><sup>1</sup></a>:

<p> 
$$
  q3_w = q1_w q2_w - q1_x q2_x - q1_y q2_y - q1_z q2_z \\
  q3_x = q1_x q2_w + q1_w q2_x - q1_z q2_y + q1_y q2_z \\
  q3_y = q1_y q2_w + q1_z q2_x + q1_w q2_y - q1_x q2_z \\
  q3_x = q1_z q2_w - q1_y q2_x + q1_x q2_y + q1_w q2_z
$$</p>

You can also rotate a vector `\(\vec{v}\)` by a quaternion `\(q\)` by decomposing the quaternion into it's scalar part `\(w\)` and it's vector part `\(\vec{r}\)`:

<p>$$ \mathbf{q} = (w, \vec{r}) $$</p>

and then using the following formula to calculate the rotated vector `\(v_{rotated}\)`:

<p>$$ v_{rotated} = \vec{v} + 2\vec{r} \times (\vec{r} \times \vec{v} + w\vec{v}) $$</p>

<p class="centered">
  where:<br />
  \( \times \) is the vector cross-product<br />
</p>

## Rotation Matrix

You can calculate a 3x3 rotation matrix from a quaternion. This is useful if you want to express the rotation as a matrix instead of a quaternion, but comes at the expense of having to store 9 numbers rather than 4!

## Combining Rotations

Rotations can be easily combined when using quaternions.

Given two quaternion rotations that are to be applied consecutively, `\(R_A\)` and then `\(R_B\)`, the total rotation `\(R_C\)` is found with:

<p>$$ R_C = R_B R_A $$</p>

Remember that **quaternion multiplication is not associative**, so the ordering of `\( R_A \)` and `\( R_B \)` is important.</p>

## Some Useful Quaternions

<table>
    <thead>
        <tr>
            <th>Quaternion</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>$$ \mathbf{q} = [1, 0, 0, 0] $$</td>
            <td>Identity quaternion, no rotation.</td>
        </tr>
        <tr>
            <td>$$ \mathbf{q} = [0, 1, 0, 0] $$</td>
            <td>Rotation of 180 around X axis.</td>
        </tr>
        <tr>
            <td>$$ \mathbf{q} = [0, 0, 1, 0] $$</td>
            <td>Rotation of 180 around Y axis.</td>
        </tr>
        <tr>
            <td>$$ \mathbf{q} = [0, 0, 0, 1] $$</td>
            <td>Rotation of 180 around Z axis.</td>
        </tr>
        <tr>
            <td>$$ \mathbf{q} = [\sqrt{0.5}, \sqrt{0.5}, 0, 0] $$</td>
            <td>Rotation of 90 around X axis.</td>
        </tr>
        <tr>
            <td>$$ \mathbf{q} = [\sqrt{0.5}, 0, \sqrt{0.5}, 0] $$</td>
            <td>Rotation of 90 around Y axis.</td>
        </tr>
        <tr>
            <td>$$ \mathbf{q} = [\sqrt{0.5}, 0, 0, \sqrt{0.5}] $$</td>
            <td>Rotation of 90 around Z axis.</td>
        </tr>
        <tr>
            <td>$$ \mathbf{q} = [\sqrt{0.5}, -\sqrt{0.5}, 0, 0] $$</td>
            <td>Rotation of -90 around X axis.</td>
        </tr>
        <tr>
            <td>$$ \mathbf{q} = [\sqrt{0.5}, 0, -\sqrt{0.5}, 0] $$</td>
            <td>Rotation of -90 around Y axis.</td>
        </tr>
        <tr>
            <td>$$ \mathbf{q} = [\sqrt{0.5}, 0, 0, -\sqrt{0.5}] $$</td>
            <td>Rotation of -90 around Z axis.</td>
        </tr>
</table>

## Interpolation

### SLERP

SLERP is shorthand for *spherical linear interpolation*. It is commonly used with quaternions to produce a smooth rotation of a 3D body from one orientation to another. Performing SLERP on two quaternions produces a smooth, continuous rotation with a constant angular velocity around a fixed rotation axis (the first quaternion describes the starting rotation, the second quaternion describes the end rotation).

SLERP does not work well when the two quaternions are too similar. In this case it is safer to just perform linear interpolation on all four values quaternion values independently (making sure to normalize the resulting quaternion before using it).

The following Python code example demonstrates the SLERP algorithm on a pair of quaternions [^wikipedia]:

```python
import numpy as np
def slerp(v0, v1, t_array):
    # >>> slerp([1,0,0,0],[0,0,0,1],np.arange(0,1,0.001))
    t_array = np.array(t_array)
    v0 = np.array(v0)
    v1 = np.array(v1)
    dot = np.sum(v0*v1)

    if (dot < 0.0):
        v1 = -v1
        dot = -dot
    
    DOT_THRESHOLD = 0.9995
    if (dot > DOT_THRESHOLD):
        result = v0[np.newaxis,:] + t_array[:,np.newaxis]*(v1 - v0)[np.newaxis,:]
        return (result.T / np.linalg.norm(result, axis=1)).T
    
    theta_0 = np.arccos(dot)
    sin_theta_0 = np.sin(theta_0)

    theta = theta_0*t_array
    sin_theta = np.sin(theta)
    
    s0 = np.cos(theta) - dot * sin_theta / sin_theta_0
    s1 = sin_theta / sin_theta_0
    return (s0[:,np.newaxis] * v0[np.newaxis,:]) + (s1[:,np.newaxis] * v1[np.newaxis,:])
```

<p><a href="https://en.wikipedia.org/wiki/Slerp">https://en.wikipedia.org/wiki/Slerp</a> has some code examples in Python and C++ that perform SLERP on quaternions.</p>

## Conversion From Axis-Angle Form To Quaternion

A rotation in axis-angle form:

<p>$$ axis = \begin{bmatrix}a_x\\a_y\\a_z\end{bmatrix} \quad angle = \theta $$</p>

can be converted into a quaternion with:

<p>$$ \mathbf{q} = \begin{bmatrix}q_w\\q_x\\q_y\\q_z\end{bmatrix} = \begin{bmatrix} 
    \cos{\frac{\theta}{2}} \\
    a_x \sin{\frac{\theta}{2}} \\
    a_y \sin{\frac{\theta}{2}} \\
    a_z \sin{\frac{\theta}{2}} \\
    \end{bmatrix} $$</p>

Use this tool to convert from a rotation expressed as an axis-angle to a quaternion:

{{< calculators/axis-angle-to-quaternion >}}

## Conversion From Quaternion To Rotation Matrix

If you have a quaternion in the form:

<p>$$ \mathbf{q} = \begin{bmatrix}q_w\\q_x\\q_y\\q_z\end{bmatrix} $$</p>

Then the equivalent rotation matrix is:

<p>$$ \mathbf{R} = 
\begin{bmatrix}
1 - 2q_y^2 - 2q_z^2     & 2q_xq_y - 2q_zq_w    & 2q_xq_z + 2q_yq_w \\
2q_xq_y + 2q_zq_w       & 1 - 2q_x^2 - 2q_z^2  & 2q_yq_z - 2q_xq_w \\
2q_xq_z - 2q_yq_w       & 2q_yq_z + 2q_xq_w    & 1 - 2q_x^2 - 2q_y^2
\end{bmatrix}
$$</p>

Use this tool to convert quaternions to rotation matrices.

{{< calculators/quaternion-to-rotation-matrix >}}

## 3D Rotation

<iframe src="https://calc-mbedded-ninja.gbmhunter.now.sh/calculators/3d-rotations" style="width: 800px; height: 800px; border: 0;"></iframe>

[^wikipedia]: https://en.wikipedia.org/wiki/Slerp
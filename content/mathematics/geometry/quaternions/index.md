---
author: gbmhunter
categories: [ "Mathematics", "Geometry" ]
date: 2014-11-13
description: "A tutorial on quaternions, including calculators to convert between quaternions, rotation matrices and axis-angle notations."
draft: false
lastmod: 2019-03-24
tags: [ "quaternion", "matrix", "rotation", "complex", "SLERP", "interpolation", "Euler", "angle", "RPY", "gimbal lock", "attitude", "orientation", "vector", "calculator", "conversion" ]
title: "Quaternions"
type: page
---

## Overview<

<p>A quaternion (pronounced <i>qwa-ter-ne-ion</i>) is a complex-number like system which contains three imaginary components and one real component. Arguably, the most useful quaternions is a subset of all quaternions called <b>unit quaternions</b> (or <b>versors</b>), which can be used to describe a rotation in 3D space. This page focuses primarily on these unit quaternions.</p>


## Defining Equation And Identities

<p>The basic form of a quaternion is:</p>

<p>$$ \mathbf{q} = w + x\mathbf{i} + y\mathbf{j} + z\mathbf{k} $$</p>

<p class="centered">
  where:<br />
  \(w, x, y, z\) are real numbers<br />
  \(\mathbf{i, j, k}\) are the <i>quaternion units</i><br />
  (which can be seen as similar to the complex number \(\mathbf{i}\))
</p>

<p>The multiplication rules for the quaternion units are:</p>

<p>$$ \mathbf{i}^2 = \mathbf{j}^2 = \mathbf{k}^2 = \mathbf{ijk} = -1 $$</p>

<p>From these rule above, you can determine some identities:</p>

<p>$$ \mathbf{ijk} = -1 $$</p>

<p>Multiply both sides by \(\mathbf{i}\):</p>

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

<p>A pure quaternion is a quaternion where \(w=0\). This results in a quaternion:</p>

<p>$$ \mathbf{q} = x\mathbf{i} + y\mathbf{j} + z\mathbf{k} $$</p>

<p>This three-valued quaternion also happens to be able to represent a vector in 3D space, and so it is also called a <i>vector quaternion</i>. A vector quaternion is used to represent either a vector or point in 3D space when you want to apply a quaternion rotation to it (more on this below).</p>

## Scalar/Vector Notation

<p>You can split a quaternion into a scalar and a vector component. The \(w\) represents the <i>scalar</i> part of the quaternions and the \(x, y, z\) represents the <i>vector</i> part. You may see a quaternion written with an \(w\) for the scalar part and a \(\vec{r}\) for the vector part.</p>

<p>$$ \mathbf{q} = (w, \vec{r}) $$</p>

## Unit Quaternions

<p>Unit quaternions are quaternions in which the coefficients have been <i>normalized</i> as follows:</p>

<p>$$ w^2 + x^2 + y^2 + z^2 = 1 $$</p>

<p>Interestingly, all rotations in 3D space (which is called the 3D rotation group, or \(\mathbf{SO(3)}\)) can be represented by the unit quaternions (which is a sub-set of all quaternions). In fact, you will rarely ever deal with a quaternion that is not a unit quaternion!</p>

## Representation In Software/Programming

<p>In software, quaternions are typically 
  described with a vector/array (in the programming sense of the word) in the following form:</p>

<p>$$ \mathbf{q} = \begin{bmatrix}w\\x\\y\\z\end{bmatrix} $$</p>

<p>in where the coefficients are stored in an array and the quaternion units \(\) are implied by position.</p>

<p>It is important to note that <b>although it is common to represent a quaternion with vector-like syntax, it is definitely not a vector</b> (in the mathematical sense of the word). For one, quaternion multiplication does not follow the dot or cross-product multiplication rules that vectors do.</p>

## Why Use Quaternions To Describe Rotations?

<p>There are a number of different ways to describe rotations. These include:</p>

<ul>
    <li>Axis-angle representation</li>
    <li>Euler angles (roll, pitch, yaw)</li>
    <li>Rotation matrices</li>
    <li>Quaternions</li>
</ul>

<p>Why choose Quaternions? One reason is that Quaternions do not suffer from the <b>gimbal lock</b> that Euler angles do. This also is related to the fact that they are differentiable (i.e. very small changes in rotation cause very small changes in the quaternion values), which allows for smooth interpolation, important for many use cases including 3D animation. They are also more compact with only four numbers need to be stored than a 9 number rotation matrix. Quaternions are also easily converted into the angle-axis representation and back again.</p>
  
  
<!-- ###################################################################### -->
<!-- ROTATING A VECTOR                                                      -->
<!-- ###################################################################### -->
<h2>Rotating A Vector</h2>

<p>You can rotate a vector \(v\) in 3D space to \(v'\) with:</p>

<p>$$ \begin{bmatrix}0\\v'\end{bmatrix} = q \begin{bmatrix}0\\v\end{bmatrix}q' $$</p>

<p>Because the vector is squashed between the quaternion and it's conjugate, this is sometimes referred to as the "sandwich product". The multiplications can be done by the basic product rule, or more easily using the <i>Hamilton product</i>.</p>

<p>Lets assume we have the vector:</p>

<p>$$ v = \begin{bmatrix}1\\0\\0\end{bmatrix} $$</p>

<p>And we want to rotate it with the quaternion:</p>

<p>$$ q = \begin{bmatrix}\sqrt{0.5} \\ 0 \\ \sqrt{0.5} \\ 0]\end{bmatrix} $$</p>

<p>This quaternion just so happens to be a rotation of \(90\) around the y-axis.</p>

<p>We turn the vector into a vector quaternion by adding a fourth value of 0 (which is the \(w\)):</p>

<p>$$ v = \begin{bmatrix}0\\1\\0\\0\end{bmatrix} $$</p>

<p>Combine into:</p>

<p>$$
  v' = 
  \begin{bmatrix}\sqrt{0.5} \\ 0 \\ \sqrt{0.5} \\ 0]\end{bmatrix}
  \begin{bmatrix}0\\1\\0\\0\end{bmatrix}
  \begin{bmatrix}\sqrt{0.5} \\ 0 \\ -\sqrt{0.5} \\ 0]\end{bmatrix}
$$</p>

<p>To calculate the multiplication of two quaternions, you can use the Hamilton product. If you have the equation:</p>

<p>$$q3 = q1*q2$$</p>

<p>where each quaternion is composed in the following manner:</p>

<p>$$ q1 = q1_w + q1_x \mathbf{i} + q1_y \mathbf{y} + q1_z \mathbf{z} $$</p>

<p>then using the Hamilton product, the values of each component in \(q3\) are<a href="#1"><sup>1</sup></a>:</p>

<p> 
$$
  q3_w = q1_w q2_w - q1_x q2_x - q1_y q2_y - q1_z q2_z \\
  q3_x = q1_x q2_w + q1_w q2_x - q1_z q2_y + q1_y q2_z \\
  q3_y = q1_y q2_w + q1_z q2_x + q1_w q2_y - q1_x q2_z \\
  q3_x = q1_z q2_w - q1_y q2_x + q1_x q2_y + q1_w q2_z
$$</p>

<p>You can also rotate a vector \(\vec{v}\) by a quaternion \(q\) by decomposing the quaternion into it's scalar part \(w\) and it's vector part \(\vec{r}\):</p>

<p>$$ \mathbf{q} = (w, \vec{r}) $$</p>

<p>and then using the following formula to calculate the rotated vector \(v_{rotated}\):</p>

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

<p>Remember that <b>quaternion multiplication is not associative</b>, so the ordering of \( R_A \) and \( R_B \) is important.</p>

<!-- ###################################################################### -->
<!-- SOME USEFUL QUATERNIONS                                                -->
<!-- ###################################################################### -->
<h2>Some Useful Quaternions</h2>

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

## SLERP

SLERP is shorthand for *spherical linear interpolation*. It is commonly used with quaternions to produce a smooth rotation of a 3D body from one orientation to another.

<p><a href="https://en.wikipedia.org/wiki/Slerp">https://en.wikipedia.org/wiki/Slerp</a> has some code examples in Python and C++ that perform SLERP on quaternions.</p>

## Conversion From Axis-Angle Form To Quaternion

A rotation in axis-angle form:

<p>$$ axis = \begin{bmatrix}a_x\\a_y\\a_z\end{bmatrix} \quad angle = \theta $$</p>

can be converted into a quaternion with:</p>

<p>$$ \mathbf{q} = \begin{bmatrix}q_w\\q_x\\q_y\\q_z\end{bmatrix} = \begin{bmatrix} 
    \cos{\frac{\theta}{2}} \\
    a_x \sin{\frac{\theta}{2}} \\
    a_y \sin{\frac{\theta}{2}} \\
    a_z \sin{\frac{\theta}{2}} \\
    \end{bmatrix} $$</p>

Use this tool to convert from a rotation expressed as an axis-angle to a quaternion:

{{< calculators/axis-angle-to-quaternion >}}

<!-- ###################################################################### -->
<!-- CONVERSION FROM QUATERNIONS TO ROTATION MATRIX                         -->
<!-- ###################################################################### -->
<h2>Conversion From Quaternion To Rotation Matrix</h2>

<p>If you have a quaternion in the form:</p>

<p>$$ \mathbf{q} = \begin{bmatrix}q_w\\q_x\\q_y\\q_z\end{bmatrix} $$</p>

<p>Then the equivalent rotation matrix is:</p>

<p>$$ \mathbf{R} = 
\begin{bmatrix}
1 - 2q_y^2 - 2q_z^2     & 2q_xq_y - 2q_zq_w    & 2q_xq_z + 2q_yq_w \\
2q_xq_y + 2q_zq_w       & 1 - 2q_x^2 - 2q_z^2  & 2q_yq_z - 2q_xq_w \\
2q_xq_z - 2q_yq_w       & 2q_yq_z + 2q_xq_w    & 1 - 2q_x^2 - 2q_y^2
\end{bmatrix}
$$</p>

<p>Use this tool to convert quaternions to rotation matrices.</p>

{{< calculators/quaternion-to-rotation-matrix >}}


<a name="1">https://www.mathworks.com/help/aeroblks/quaternionmultiplication.html</a>

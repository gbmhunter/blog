---
author: gbmhunter
date: 2017-11-16 17:47:38+00:00
draft: false
title: Projective Transformations
type: page
url: /mathematics/geometry/projective-transformations
---

# Overview

Perspective projection is a particular type of projection where all the rays of the projection pass through a single point. This puts constrains on the form of the matrix `\( \mathbf{P} \)`.

A perspective projection has the form:

<div>$$ \begin{bmatrix}x_1\\x_2\\x_3\end{bmatrix} = \mathbf{P} \begin{bmatrix}X\\Y\\Z\\S\end{bmatrix} $$</div>

<p class="centered">
    where:<br>
    \( (x_1,x_2,x_3)^\top \) are the homogeneous coordinates of a point in the image plane \( \mathbf{P} \)<br>
    \( \mathbf{P} \) is a 3x4 matrix<br>
    \( (X, Y, Z, S)^\top \) are the homogeneous coordinates of a point in the world<br>
</p>

# Plane To Image Projectivity

<div>$$ \rho \begin{bmatrix} q_1 \\ q_2 \\ 1 \end{bmatrix} = \mathbf{T} \begin{bmatrix} p_1 \\ p_2 \\ 1 \end{bmatrix} = \begin{bmatrix} A&B&C \\ D&E&F \\ G&H&1 \end{bmatrix} \begin{bmatrix} p_1 \\ p_2 \\ 1 \end{bmatrix} $$</div>

<p class="centered">
    where:<br>
    \( \rho \) is the scale factor<br>
<p>

This gives two linear equations with 8 unknowns:

<div>$$ Ap_1 + Bp_2 + C - Gp_1q_1 - Hp_2q_1 = q_1 $$</div>

<div>$$ Dp_1 + Ep_2 + F - Gp_1q_2 - Hp_2q_2 = q_2 $$</div>

Four pairs of points `\( \hat{p} = (p_x, p_y), \hat{q} = (q_x, q_y) \)` (four points from each image which are paired together) give eight linear equations and then `\( A, B, ..., H \)` can be solved. One condition is that no three of the four points can be collinear (i.e. lie on the same line).

# Quad-To-Quad Projection

The above projection algorithm can be used to perform "quad-to-quad" projection between 2 2D spaces (or two 2D coordinate systems). A quadrilateral (four sided polygon) is defined both in the input space and the output space. **It is guaranteed that there is exactly one transformation** that will map points from the input space to the output space as defined by the quadrilaterals.

{{< figure src="/images/2017/11/quad-to-quad-transformation-complex-image.png" width="598px" caption="A quad-to-quad transformation of an image, going from a rectangle to a complex non-rectangular quadrilateral with no parallel edges."  >}}

**Quadrilateral restrictions: No three of the four points in the quadrilateral can be collinear (i.e. lie on the same line).** That is the same as saying that the quadrilateral must have four distinct edges.

**Note: If you learn better from example, see the Worked Example section below.**

The order in which you define the four vertices is not important. However, I define them in counter-clockwise order as this seem to be a common convention in industry.

We want to find the matrix `\(\mathbf{T}\)` that projects an input point `\(\hat{p}\)` to an output point `\(\hat{q}\)`, such that:

<div>$$ \hat{q} = \mathbf{T}\hat{p} $$</div>

We can find the individual numbers `\(A, B, ... , H\)` that make up `\(\mathbf{T}\)` by forming some linear equations. For each point `\( \hat{p} = (p_x, p_y) \)` that maps to point `\( \hat{q} = (q_x, q_y) \)` we can form two linear equations:

<div>$$ Ap_x + Bp_y + C - Gp_xq_x - Hp_yq_x = q_x $$</div>

<div>$$ Dp_x + Ep_y + F - Gp_xq_y - Hp_yq_y = q_y $$</div>

The four corners of the input quad map to the four corners of the output quad, so this gives us **8 equations with 8 unknowns.** To solve these linear equations, we can use matrices. If we pull all of the coefficients of `\(A, B, ..., H\)` into a matrix `\(\mathbf{A}\)`, we can write the equation in the form `\(\mathbf{A}\hat{x} = \mathbf{B}\)`:

<div>
$$ \small{\begin{bmatrix}  
 p_{1,x} & p_{1,y} & 1 & 0 & 0 & 0 & -p_{1,x}q_{1,x} & -p_{1,y}q_{1,x} \\  
 0 & 0 & 0 & p_{1,x} & p_{1,y} & 1 & -p_{1,x}q_{1,y} & -p_{1,y}q_{1,y} \\  
 p_{2,x} & p_{2,y} & 1 & 0 & 0 & 0 & -p_{2,x}q_{2,x} & -p_{2,y}q_{2,x} \\  
 0 & 0 & 0 & p_{2,x} & p_{2,y} & 1 & -p_{2,x}q_{2,y} & -p_{2,y}q_{2,y} \\  
 p_{3,x} & p_{3,y} & 1 & 0 & 0 & 0 & -p_{3,x}q_{3,x} & -p_{3,y}q_{3,x} \\  
 0 & 0 & 0 & p_{3,x} & p_{3,y} & 1 & -p_{3,x}q_{3,y} & -p_{3,y}q_{3,y} \\  
 p_{4,x} & p_{4,y} & 1 & 0 & 0 & 0 & -p_{4,x}q_{4,x} & -p_{4,y}q_{4,x} \\  
 0 & 0 & 0 & p_{4,x} & p_{4,y} & 1 & -p_{4,x}q_{4,y} & -p_{4,y}q_{4,y} \\  
 \end{bmatrix} \begin{bmatrix} A\\B\\C\\D\\E\\F\\G\\H \end{bmatrix} = \begin{bmatrix} q_{1,x}\\q_{1,y}\\q_{2,x}\\q_{2,y}\\q_{3,x}\\q_{3,y}\\q_{4,x}\\q_{4,y}\end{bmatrix}} $$
</div>

This can then be re-arranged to solve for `\(\hat{x}\)` (which is our vector of coefficients `\(A, B, ... H\)` which we will eventually put back into the transformation matrix `\(\mathbf{T}\)`).

<div>$$ \hat{x} = A^{-1}B $$</div>

Once `\(\hat{x}\)` has been found, `\(\mathbf{T}\)` can be made from the values in `\(\hat{x}\)`. You can then convert points from your input coordinate space to the output coordinate space using:

<div>$$ \hat{q} = \mathbf{T}\hat{p} $$</div>

[http://homepages.inf.ed.ac.uk/rbf/CVonline/LOCAL_COPIES/BEARDSLEY/node3.html](http://homepages.inf.ed.ac.uk/rbf/CVonline/LOCAL_COPIES/BEARDSLEY/node3.html) has more information on this projection method.

**Worked Example**

For example, take the square (which is a simple quadrilateral) defined by (0, 0), (1, 0), (1, 1), (0, 1) (the blue square below) and a second quadrilateral defined by (1, 2), (1, 4), (3, 4), (3, 2) (the red square below). _Find the transformation matrix `\(T\)` which maps points from `\(P\)` to `\(Q\)`._

{{< figure src="/images/2017/11/quad-to-quad-transformation-simple-square.png" width="455px" caption="A simple quad-to-quad transformation of the square P to the square Q."  >}}

We can then pair the points together, i.e. `\(p1 = (0, 0)\)` maps to `\(q1 = (1, 2)\)`.

<div>
$$ \small{\begin{bmatrix}  
 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 \\  
 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 \\  
 0 & 1 & 1 & 0 & 0 & 0 & 0 & -1 \\  
 0 & 0 & 0 & 0 & 1 & 1 & 0 & -4 \\  
 1 & 1 & 1 & 0 & 0 & 0 & -3 & -3 \\  
 0 & 0 & 0 & 1 & 1 & 1 & -4 & -4 \\  
 1 & 0 & 1 & 0 & 0 & 0 & -3 & 0 \\  
 0 & 0 & 0 & 1 & 0 & 1 & -2 & 0 \\  
 \end{bmatrix} \begin{bmatrix} A\\B\\C\\D\\E\\F\\G\\H \end{bmatrix} = \begin{bmatrix} 1\\2\\1\\4\\3\\4\\3\\2 \end{bmatrix}} $$
</div>

Solving for vector `\(\hat{x}\)` gives:

<div>$$ \hat{x} = \begin{bmatrix} 2\\0\\1\\0\\2\\2\\0\\0 \end{bmatrix} $$</div>

These are our values `\(A, B, ..., H\)` that we need to build the transformation matrix `\(\mathbf{T}\)`!

<div>$$ \mathbf{T} = \begin{bmatrix} 2&0&1\\0&2&2\\0&0&1 \end{bmatrix} $$</div>

Note that the last element in `\(\mathbf{T}\)` is always 1! We can now transform any point from out input space to our output space using:

<div>$$ \hat{q} = \mathbf{T}\hat{p} $$</div>

<div>$$ \begin{bmatrix}q_x\\q_y\\1\end{bmatrix} = \begin{bmatrix} 2&0&1\\0&2&2\\0&0&1 \end{bmatrix} \begin{bmatrix}p_x\\p_y\\1\end{bmatrix} $$</div>

Let's select point `\(\hat{p} = (0.5, 0.5)\)`. This is in the middle of our input polygon, so we should expect it to be transformed to the middle of our output polygon, at `\(\hat{q} = (2, 3)\)`.

<div>$$ \begin{bmatrix}q_x\\q_y\\1\end{bmatrix} = \begin{bmatrix} 2&0&1\\0&2&2\\0&0&1 \end{bmatrix} \begin{bmatrix}0.5\\0.5\\1\end{bmatrix} $$</div>

<div>$$ q_x = 2*0.5 + 0*0.5 + 1*1 = 2 \\  
 q_y = 0*0.5 + 2*0.5 + 2*1 = 3 $$</div>

... which is what we expected!

Python code for this worked example can be found at [https://github.com/mbedded-ninja/BlogAssets/tree/master/Mathematics/QuadToQuad](https://github.com/mbedded-ninja/BlogAssets/tree/master/Mathematics/QuadToQuad).

Of course, Quad-to-Quad transformations do not have to use simple square, any four sided polygon can be used in the transformation, as shown in the below image:

{{< figure src="/images/2017/11/quad-to-quad-transformation-complex-image.png" width="616px" caption="A quad-to-quad transformation of an image, going from a rectangle to a complex non-rectangular quadrilateral with no parallel edges."  >}}

**Code Libraries**

Qt provides a QTranform::quadToQuad() method which can be used to create a transformation object that can then be applied to things such as images. Note how ever that that when transforming an image, **"extra" translation is removed from the output so that the translated image is contained within the smallest number of pixels possible**. Qt also specifies the structure of the transformation matrix slightly differently, **with the order of each element being different from "standard"** (it looks like it has been mirrored around the leading diagonal).

{{< figure src="/images/2017/11/qt-transformation-matrix-element-order.png" width="827px" caption="The structure of a Qt transformation matrix. Notice how the ordering is different to 'standard' ( it looks like the matrix has been mirrored around the leading diagonal)."  >}}

Python's image library (PIL) provides a transform() function with can do perspective transformations, along with interpolation (this is what is used to transform the above "Hello" image).

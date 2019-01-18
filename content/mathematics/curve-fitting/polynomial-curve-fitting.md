---
author: gbmhunter
date: 2018-07-01 23:58:02+00:00
draft: false
title: Polynomial Curve Fitting
type: page
url: /mathematics/curve-fitting/polynomial-curve-fitting
---

## Overview

Before reading this page, please check out the [Linear Curve Fitting page](/mathematics/curve-fitting/linear-curve-fitting). Many of the principles mentioned there will be re-used here, and will not be explained in as much detail.

{{< figure src="/images/2018/07/many-polynomial-best-fits-on-graph.png" width="605px" caption="A graph showing how different degree polynomials can be fitted to data."  >}}

## Calculating The Polynomial Curve

We can write an equation for the error as follows:

<div>$$
\begin{align}  
err & = \sum d_i^2 \\  
& = (y_1 - f(x_1))^2 + (y_2 - f(x_2))^2 + (y_3 - f(x_3))^2 \\  
& = \sum_{i = 1}^{n} (y_i - f(x_i))^2  
\end{align}
$$</div>

<p class="centered">
    where:<br>
    \(n\) is the number of points of data (each data point is an \(x, y\) pair)<br>
    \(f(x)\) is the function which describes our polynomial curve of best fit<br>
</p>

Since we want to fit a polynomial, we can write `\(f(x)\)` as:

<div>$$ \begin{align} f(x) &= a_0 + a_1 x + a_2 x^2 + ... + a_n x^n \\  
&= a_0 + \sum_{j=1}^k a_j x^j \end{align} $$</div>

<p class="centered">
    where:<br>
    \(k\) is the order of the polynomial<br>
</p>

Substituting into above:

<div>$$ err = \sum_{i = 1}^{n} (y_i - (a_0 + \sum_{j=0}^k a_j x^j))^2 $$</div>

How do we find the minimum of this error function? We use the derivative. If we can differentiate `\(err\)`, we have an equation for the slope. We know that the slope will be 0 when the error is at a minimum.

We have `\(k\)` unknowns, `\(a_0, a_1, ..., a_k \)`. We have to take the derivative of each unknown separately:

<div>
$$ \begin{align}  
\frac{\partial err}{\partial a_0} &= -2 \sum_{i=1}^{n} (y_i - (a_0 + \sum_{j=0}^k a_j x_j)) &= 0 \\  
\frac{\partial err}{\partial a_1} &= -2 \sum_{i=1}^{n} (y_i - (a_0 + \sum_{j=0}^k a_j x_j))x &= 0 \\  
\frac{\partial err}{\partial a_1} &= -2 \sum_{i=1}^{n} (y_i - (a_0 + \sum_{j=0}^k a_j x_j))x^2 &= 0 \\  
\vdots \\  
\frac{\partial err}{\partial a_k} &= -2 \sum_{i=1}^{n} (y_i - (a_0 + \sum_{j=0}^k a_j x_j))x^k &= 0  
\end{align} $$
</div>

These equations can be re-arranged into matrix form:

<div>
$$ \begin{bmatrix}  
n & \sum x_i & \sum x_i^2 & ... & \sum x_i^k \\  
\sum x_i & \sum x_i^2 & \sum x_i^3 & ... & \sum x_i^{k+1} \\  
\sum x_i^2 & \sum x_i^3 & \sum x_i^4 & ... & \sum x_i^{k+2} \\  
\vdots & \vdots & \vdots & ... & \vdots \\  
\sum x_i^k & \sum x_i^{k+1} & \sum x_i^{k+2} & ... & \sum x_i^{k+k} \\  
\end{bmatrix}   
\begin{bmatrix}  
a_0 \\ a_1 \\ a_2 \\ \vdots \\ a_k  
\end{bmatrix} =   
\begin{bmatrix}  
\sum (y_i) \\  
\sum (x_i y_i) \\  
\sum (x_i^2 y_i) \\  
\sum (x_i^k y_i)  
\end{bmatrix}$$
</div>

We solve this by re-arranging which involves taking the inverse of `\(\textbf{x}\))`:

<div>$$ \mathbf{x} = \mathbf{A^{-1}} \mathbf{B} $$</div>

Thus a polynomial curve of best fit is:

<div>$$ y = x[0] + x[1]x + x[2]x^2 + ... + x[j]x^j $$</div>

See [https://github.com/gbmhunter/BlogAssets/tree/master/Mathematics/CurveFitting/polynomial](https://github.com/gbmhunter/BlogAssets/tree/master/Mathematics/CurveFitting/polynomial) for Python code which performs these calculations.

## Worked Example

Find a 2 degree polynomial that best describes the following points:

<div>$$ (1, 1) \\ (2, 3) \\ (3, 4) \\ (4, 8) $$</div>

We will then find the values for each one of the nine elements in the `\(\mathbf{A}\)` matrix:

<div>
$$ \begin{align}   
A_{11} &= n = 4 \\  
A_{12} &= \sum x_i = 1 + 2 + 3 + 4 = 10 \\  
A_{13} &= \sum x_i^2 = 1^2 + 2^2 + 3^2 + 4^2 = 30 \\  
A_{21} &= A_{12} = 10 \\  
A_{22} &= A_{13} = 30 \\  
A_{23} &= \sum x_i^3 = 1^3 + 2^3 + 3^3 + 4^3 = 100 \\  
A_{31} &= A_{22} = 30 \\  
A_{32} &= A_{23} = 100 \\  
A_{33} &= \sum x_i^4 = 1^4 + 2^4 + 3^4 + 4^4 = 354  
\end{align} $$
</div>

And now find the elements of the `\(\mathbf{B}\)` matrix:

<div>
$$\begin{align}  
B_{11} &= \sum y_i = 1 + 3 + 4 + 8 = 16 \\  
B_{21} &= \sum x_i y_i = 1*1 + 2*3 + 3*4 + 4*8 = 51 \\  
B_{31} &= \sum x_i^2 y_i = 1^2*1 + 2^2*3 + 3^2*4 + 4^2*8 = 177  
\end{align} $$
</div>

Plugging these values into the matrix equation:

<div>
$$ \begin{bmatrix}  
4 & 10 & 30 \\  
10 & 30 & 100 \\  
30 & 100 & 354  
\end{bmatrix}   
\begin{bmatrix}  
a_0 \\ a_1 \\ a_2  
\end{bmatrix} =   
\begin{bmatrix}  
16 \\  
51 \\  
177  
\end{bmatrix}$$
</div>

We can then solve `\(\mathbf{x} = \mathbf{A^{-1}}\mathbf{B}\)` by hand, or use a tool. I used Python's NumPy package to end up with:

<div>
$$ \begin{bmatrix}a_0 \\ a_1 \\ a_2 \end{bmatrix} =  
\begin{bmatrix}1 \\ -0.3 \\ 0.5\end{bmatrix} $$
</div>

Thus our line of best fit:

<div>$$ y = 1 - 0.3x + 0.5x^2 $$</div>

The data points and polynomial of best fit are shown in the below graph:

{{< figure src="/images/2018/07/2-degree-poly-best-fit-graph.png" width="600px" caption="Four data points and a 2 degree polynomial of best fit (using the least squares method)."  >}}

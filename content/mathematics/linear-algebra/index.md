---
authors: [ "Geoffrey Hunter" ]
date: 2018-08-09
draft: false
tags: [ "matrix", "condition number", "invertible" ]
title: Linear Algebra
type: page
---

<h2>Matrix Condition Number</h2>

<p>low condition number -> matrix is well conditioned<br />
high condition number -> matrix is ill conditioned</p>

<p>infinity -> matrix is singular (non-invertible)</p>

<p>A matrix that is not invertible has a condition number of infinity.</p>

<p>What does this mean in a practical sense? When using the formula \( \textbf{Ax = b} \), a matrix \( \textbf{A} \) with a high condition number is usually unsuitable when solving real-world problems, as it means that a small change in \(b\) will result in a large change in \(\textbf{x}\).</p>

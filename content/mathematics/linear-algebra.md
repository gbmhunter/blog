---
author: gbmhunter
date: 2018-08-09 02:18:21+00:00
draft: false
title: Linear Algebra
type: page
url: /mathematics/linear-algebra
---

# Matrix Condition Number

low condition number -> matrix is well conditioned  

high condition number -> matrix is ill conditioned  

infinity -> matrix is singular (non-invertible)

A matrix that is not invertible has a condition number of infinity.

What does this mean in a practical sense? When using the formula `\(\textbf{Ax = b}\)`, a matrix `\(\textbf{A}\)` with a high condition number is usually unsuitable when solving real-world problems, as it means that a small change in b will result in a large change in `\(\textbf{x}\)`.

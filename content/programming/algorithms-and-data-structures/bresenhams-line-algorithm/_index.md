---
author: "gbmhunter"
date: 2019-01-03
draft: true
lastmod: 2019-01-03
tags: [ "algorithm", "code", "software", "programming", "data structure" ]
title: "Bresenham's Line Algorithm"
type: "page"
---

Bresenham's line algorithm is way of drawing a line between two points, `\(A\)` and `\(B\)` on a computer screen of pixels. While this is somewhat trivial to do with floating point arithmetic, the key idea in Bresenham's line algorithm is to avoid expensive floating point arithmetic, and use integer maths only. This algorithm was invented at a time when floating-point units (FPUs) in CPUs where a lot rarer than they are today. It still has application in todays world for GPUs and other devices where FPUs are not available.

To simplify the problem, we will look at drawing a line where:

* `\(x_1 < x_2\)` and `\(y_1 < y_2\)`
* The slope (gradient) of the line, `\(m\)` is `\(0 < m <= 1\)`

Although we make these simplifications to explain the algorithm, Bresenham's line algorithm is easily extendible to draw any line (this will be shown later).

We start at the start pixel, `\( x_k, y_k \)`, and we increase `\(x\)` by 1. Then we decide on whether `\(y\)` needs to increase by 1, or remain at `\(y\)`. We make this decision based on whether the pixel `\( x_k + 1, y_k \)` or the pixel `\( x_k + 1, y_k + 1\) is closest to the line.
---
author: "gbmhunter"
categories: [ "Programming", "Algorithms" ]
date: 2017-06-11
description: "A tutorial on popular convex hull algorithms."
draft: false
lastmod: 2019-01-29
tags: [ "programming", "algorithms", "convex hull", "Jarvis March", "gift wrapping algorithm", "scipy", "shapely" ]
title: "Convex Hull Algorithms"
type: "page"
---

## Overview

Given a cloud of points on a 2D plane, a convex hull is the smallest set of points which encloses all of the points.

Another useful concept related to convex hulls is the _minimum bounded rectangle_. The minimum bounded rectangle is the smallest rectangle (measured by area) which encompasses the entire convex hull (by extension, it is also the smallest rectangle that encompasses all points).

The minimum bounded rectangle must have an edge which is colinear to one of the edges in the convex hull.

## The Jarvis March (Gift Wrapping Algorithm)

Orientation:


## Scipy

scipy provides a `ConvexHull` object which can be used to calculate a convex hull from a set of points.

## Shapely

The Shapely library for Python has built-in support for finding the minimum bounded rectangle for a generic geometry type. Shapely can find the minimum bouded rectangle for polygons, point sequences, e.t.c.

```py
BaseGeometry.minimum_rotated_rectangle()
```

```py

Polygon([
  [1, 1],
  [2, 1],
  [5, 4],
  [4, 3],
  [6, 2],
])
```

## Other Resources

[https://www.geometrictools.com/Source/ComputationalGeometry.html](https://www.geometrictools.com/Source/ComputationalGeometry.html) contains some useful geometric algorithms for C/C++, including convex hull algorithms and code for finding the minimum bounding box/volume/circle/sphere e.t.c.

[https://stackoverflow.com/questions/13542855/python-help-to-implement-an-algorithm-to-find-the-minimum-area-rectangle-for-gi](https://stackoverflow.com/questions/13542855/python-help-to-implement-an-algorithm-to-find-the-minimum-area-rectangle-for-gi) contains useful information to fin the minimum bounded rectangle.

[https://www.geometrictools.com/Documentation/MinimumAreaRectangle.pdf](https://www.geometrictools.com/Documentation/MinimumAreaRectangle.pdf) is a very detailed and precies explanation on how the minimum bounded rectangle algorithm works. See [here](2015-05-17-DavidEberly-MinimumAreaRectangle.pdf) for a cached copy.
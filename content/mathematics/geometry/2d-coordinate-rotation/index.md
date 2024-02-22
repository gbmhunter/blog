---
authors: [ "Geoffrey Hunter" ]
categories: [ "Mathematics", "Geometry" ]
date: 2014-11-13
draft: false
tags: [ "mathematics", "geometry", "coordinate", "rotation", "2D", "transformation" ]
title: "2D Coordinate Rotation"
type: page
---

<p>A 2D coordinate \((x_1, y_1)\) can be easily rotated by \(\theta\) around another point \((x_c, y_c)\) to give the new rotated point \((x_2, y_2)\) with the equation:</p>

$$x_2 = (x_1 - x_c) cos(\theta) - (y_1 - y_c) sin(\theta) + x_c$$
$$y_2 = (x_1 - x_c) sin(\theta) + (y_1 - y_c) cos(\theta) + y_c$$

<p>The angle \(\theta\) is positive for a counter-clockwise rotation. You may notice that the coordinate is translated as if \((x_c, y_c)\) was the origin, the rotation transformation is applied, and then it is translated back into position.</p>

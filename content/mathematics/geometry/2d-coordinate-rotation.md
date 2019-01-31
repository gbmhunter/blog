---
author: gbmhunter
date: 2014-11-13
draft: false
title: "2D Coordinate Rotation"
type: page
---

A 2D coordinate `\((x_1, y_1)\)` can be easily rotated by `\(\theta\)` around another point `\((x_c, y_c)\)` to give the new rotated point `\((x_2, y_2)\)` with the equation:

<div>$$x_2 = (x_1 - x_c) cos(\theta) - (y_1 - y_c) sin(\theta) + x_c$$</div>
<div>$$y_2 = (x_1 - x_c) sin(\theta) + (y_1 - y_c) cos(\theta) + y_c$$</div>

The angle `\(\theta\)` is positive for a counter-clockwise rotation. You may notice that the coordinate is translated as if `\((x_c, y_c)\)` was the origin, the rotation transformation is applied, and then it is translated back into position.

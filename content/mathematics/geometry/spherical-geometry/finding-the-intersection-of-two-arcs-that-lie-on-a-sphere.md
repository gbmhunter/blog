---
author: gbmhunter
date: 2018-02-15 22:11:29+00:00
draft: false
title: Finding The Intersection Of Two Arcs That Lie On A Sphere
type: page
url: /mathematics/geometry/spherical-geometry/finding-the-intersection-of-two-arcs-that-lie-on-a-sphere
---

## Finding The Intersection Of Two Arcs That Lie On A Sphere

This is a common problem which usually arises because you want to find if two great circles (or segments of two great circles) on the earth's surface intersect (obviously with are approximating the earth as a sphere).

**Let's Start With Our Inputs To The Problem**

We will choose to define each of the two arcs with two points on the surface of the sphere/earth. We could use either the geocentric (x, y, z) or geodetic (lat/lon) coordinate system to define these points. Let's use geodetic for now:

<div>
$$ \newcommand{\bs}{\boldsymbol}   
 \bs{a_{11}} = \left[ {\begin{array}{c} \lambda_{11} \\ \phi_{11} \end{array} } \right]  
 \bs{a_{12}} = \left[ {\begin{array}{c} \lambda_{12} \\ \phi_{12} \end{array} } \right]  
 \bs{a_{21}} = \left[ {\begin{array}{c} \lambda_{21} \\ \phi_{21} \end{array} } \right]  
 \bs{a_{22}} = \left[ {\begin{array}{c} \lambda_{22} \\ \phi_{22} \end{array} } \right] $$
</div>

<p class="centered">
    where:<br>
    \( \lambda \) = latitude, in degrees<br>
    \( \phi \) = longitude, in degrees<br>
</p>

We will then convert these into spherical coordinates:

<div>
    $$ x = \cos(\lambda) \, \sin(\phi) \\  
    y = \cos(\lambda) \, \cos(\phi) \\  
    z = \sin(\lambda) $$
</div>

<div>
$$ \bs{a_{11}} = \left[ {\begin{array}{c} x_{11} \\ y_{11} \\ z_{11} \end{array} } \right]  
\bs{a_{12}} = \left[ {\begin{array}{c} x_{12} \\ y_{12} \\ z_{12} \end{array} } \right]  
\bs{a_{21}} = \left[ {\begin{array}{c} x_{21} \\ y_{21} \\ z_{21} \end{array} } \right]  
\bs{a_{22}} = \left[ {\begin{array}{c} x_{22} \\ y_{22} \\ z_{22} \end{array} } \right] $$
</div>

**Calculate Cross-Products**

We then need to calculate a cross-product for each arc, using the two vectors which define the arc as the inputs to the cross-product:

<div>
$$ \bs{N_1} = \bs{a_{11}} \times \bs{a_{12}} \\  
\bs{N_2} = \bs{a_{21}} \times \bs{a_{22}} $$
</div>

These cross-products will be perpendicular to the plane that the arc lies in. Hence these cross-products are called _plane normals_.

**Calculate The Cross-Product of the Cross-Product**

Yup, you read that correctly. We now calculate the cross-product of the two cross-products we calculated above. Because the two arc cross-products define two plane normals, the cross-product of two plane normals gives us a vector that is in the same direction as the intersecting line.

<div>$$ \bs{L} = \bs{N_1} \times \bs{N_2} $$</div>

Because the line must pass through `\([0, 0, 0]^T\)`, this vector is also the line itself!

**Find The Intersecting Points**

Now that we have the line of intersection, we can now find the two points of intersection between the arc planes by normalizing L (remember, we are using a unit sphere, so normalizing the line reduces it to a vector to one of the intersecting points):

<div>
$$ I_1 = |L/L| \\  
I_2 = -I_1 $$
</div>

To get the other point of intersection, just take the negative of the first one.

**Check If These Intersecting Points Are Within The Original Arc Segments**

So we now have the two points of intersection between the arcs. If these arcs were complete great circles, then job done, you are guaranteed that the two above points lie within your great circles. But what if you had great-circle arc segments? These intersection points may not be within both arc segments.

We can determine if these intersection points lies within arc segments by doing a angle test, using the dot product:

<div>$$ \bs{a} \cdot \bs{b} = ||\bs{a}|| ||\bs{b}|| cos (\theta) $$</div>

We will re-arrange for `\(\theta\)`:

<div>$$ \theta = \arccos \frac{\bs{a} \cdot \bs{b}}{||\bs{a}|| ||\bs{b}|| } $$</div>

The angle from the start of arc 1 to intersecting point 1, and the angle from the end of arc 1 to intersecting point 1, and compare it against the angle between the start and end of arc 1.

The intersecting point is within arc 1 if:

<div>$$ \theta_{a1start,i1} + \theta_{a1end,i1} = \theta_{a1start,a1end} $$</div>

Take note that if calculating this result using any data type that can lose precision (e.g. floats, doubles), you will have to check it is close to equal rather than exactly equal. This can be done by adding some epsilon. Usually `\(1^{-10}\)` is sufficient.

This test has to be repeated between potential intersecting point 1 and arc 2. If both arcs intersect this potential intersecting point, then with have just confirmed that both arcs do intersect at this point!

The same process has to be applied to potential intersecting point 2 (remember, normalizing the line of intersection between the two planes gives us TWO potential points of intersection).

## Worked Example

Let's define two arcs using two points each in geodetic (lat/lon) form (latitude and longitude are in degrees):

<div>
$$ a_{11} = \left[ {\begin{array}{c} 10 \\ 20 \end{array} } \right]  
a_{12} = \left[ {\begin{array}{c} 60 \\ 90 \end{array} } \right]  
a_{21} = \left[ {\begin{array}{c} 50 \\ 10 \end{array} } \right]  
a_{22} = \left[ {\begin{array}{c} 5 \\ 80 \end{array} } \right] $$
</div>

Then convert them to spherical coordinates:

<div>
$$ a_{11} = \left[ {\begin{array}{c} x_{11} \\ y_{11} \\ z_{11} \end{array} } \right]  
 a_{12} = \left[ {\begin{array}{c} x_{12} \\ y_{12} \\ z_{12} \end{array} } \right]  
 a_{21} = \left[ {\begin{array}{c} x_{21} \\ y_{21} \\ z_{21} \end{array} } \right]  
 a_{22} = \left[ {\begin{array}{c} x_{22} \\ y_{22} \\ z_{22} \end{array} } \right] $$
</div>

## External Resources

[https://stackoverflow.com/questions/2954337/great-circle-rhumb-line-intersection](https://stackoverflow.com/questions/2954337/great-circle-rhumb-line-intersection) is a great page showing how to calculate the intersection between a arc and a Rhumb line (similar to above).

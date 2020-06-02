---
author: gbmhunter
categories: [ "Mathematics", "Geometry", "Spherical Geometry" ]
date: 2018-02-15
draft: false
lastmod: 2020-06-02
tags: [ "sphere", "intersection", "arc", "geometry", "spherical", "geospatial", "earth" ]
title: "Finding The Intersection Of Two Arcs That Lie On A Sphere"
type: "page"
---

## Finding The Intersection Of Two Arcs That Lie On A Sphere

This is a common problem which usually arises because you want to find if two great circles (or segments of two great circles) on the earth's surface intersect (obviously with are approximating the earth as a sphere).

**Let's Start With Our Inputs To The Problem**

We will choose to define each of the two arcs with two points on the surface of the sphere/earth. We could use either the geocentric (x, y, z) or geodetic (lat/lon) coordinate system to define these points. Let's use geodetic for now:

Points for arc 1: 

<p>$$
 \b{a_{11}} = \left[ {\begin{array}{c} \lambda_{11} \\ \phi_{11} \end{array} } \right]  
 \b{a_{12}} = \left[ {\begin{array}{c} \lambda_{12} \\ \phi_{12} \end{array} } \right]  
 $$</p>

Points for arc 2:

<p>$$
 \b{a_{21}} = \left[ {\begin{array}{c} \lambda_{21} \\ \phi_{21} \end{array} } \right]  
 \b{a_{22}} = \left[ {\begin{array}{c} \lambda_{22} \\ \phi_{22} \end{array} } \right]
 $$</p>

<p class="centered">
    where:<br>
    \( \lambda \) = latitude, in degrees<br>
    \( \phi \) = longitude, in degrees<br>
</p>

We will then convert these into spherical coordinates with the following equations:

<div>
    $$ x = \cos(\lambda) \, \sin(\phi) \\  
    y = \cos(\lambda) \, \cos(\phi) \\  
    z = \sin(\lambda) $$
</div>

<div>$$
\b{a_{11}} = \left[ {\begin{array}{c} x_{11} \\ y_{11} \\ z_{11} \end{array} } \right]  
\b{a_{12}} = \left[ {\begin{array}{c} x_{12} \\ y_{12} \\ z_{12} \end{array} } \right]  
\b{a_{21}} = \left[ {\begin{array}{c} x_{21} \\ y_{21} \\ z_{21} \end{array} } \right]  
\b{a_{22}} = \left[ {\begin{array}{c} x_{22} \\ y_{22} \\ z_{22} \end{array} } \right]
$$</div>

**Calculate Cross-Products**

We then need to calculate a cross-product for each arc, using the two vectors which define the arc as the inputs to the cross-product:

<p>$$
\b{N_1} = \b{a_{11}} \times \b{a_{12}} \\  
\b{N_2} = \b{a_{21}} \times \b{a_{22}}
$$</p>

Note how we switched from using "point" to "vector" terminology here. Before we were talking about two "points" that lie on the sphere and define the arc. This is the easiest way to intuitively understand how two points can fully define an arc on the surface of a sphere. But now we can describe them as _vectors_. When we talk about them as _vectors_, we are referring to the vector which starts at `\( [0, 0, 0] \)` and passes through this _point_. 

These cross-products will be perpendicular to the plane that the arc lies in. Hence these cross-products are called _plane normals_.

**Calculate The Cross-Product of the Cross-Product**

Yup, you read that correctly. We now calculate the cross-product of the two cross-products we calculated above. Because the two arc cross-products define two plane normals, the cross-product of two plane normals gives us a vector that is in the same direction as the intersecting line.

<p>$$ \b{L} = \b{N_1} \times \b{N_2} $$</p>

Because the line must pass through `\([0, 0, 0]^T\)`, this vector is also the line itself!

**Find The Intersecting Points**

Now that we have the line of intersection, we can now find the two points of intersection between the arc planes by normalizing L (remember, we are using a unit sphere, so normalizing the line reduces it to a vector to one of the intersecting points):

<p>$$
\b{I_1} = \frac{\b{L}}{||\b{L}||} \\  
\b{I_2} = -\b{I_1}
$$</p>

To get the other point of intersection, just take the negative of the first one.

**Check If These Intersecting Points Are Within The Original Arc Segments**

So we now have the two points of intersection between the arcs. If these arcs were complete great circles, then job done, you are guaranteed that the two above points lie within your great circles. But what if you had great-circle arc segments? These intersection points may not be within both arc segments.

We can determine if these intersection points lies within arc segments by doing a angle test, using the dot product:

<p>$$ \b{a} \cdot \b{b} = ||\b{a}|| ||\b{b}|| cos (\theta) $$</p>

We will re-arrange for `\(\theta\)`:

<p>$$ \theta = \arccos \frac{\b{a} \cdot \b{b}}{||\b{a}|| ||\b{b}|| } $$</p>

The angle from the start of arc 1 to intersecting point 1, and the angle from the end of arc 1 to intersecting point 1, and compare it against the angle between the start and end of arc 1.

The intersecting point is within arc 1 if:

<p>$$ \theta_{a1start,i1} + \theta_{a1end,i1} = \theta_{a1start,a1end} $$</p>

Take note that if calculating this result using any data type that can lose precision (e.g. floats, doubles), you will have to check it is close to equal rather than exactly equal. This can be done by adding some epsilon. Usually `\(1^{-10}\)` is sufficient.

This test has to be repeated between potential intersecting point 1 and arc 2. If both arcs intersect this potential intersecting point, then with have just confirmed that both arcs do intersect at this point!

The same process has to be applied to potential intersecting point 2 (remember, normalizing the line of intersection between the two planes gives us TWO potential points of intersection).

## Worked Example

Let's define two arcs using two points each in geodetic (lat/lon) form (latitude and longitude are in degrees):

<p>$$
a_{11} = \left[ {\begin{array}{c} 10 \\ 20 \end{array} } \right]  
a_{12} = \left[ {\begin{array}{c} 60 \\ 90 \end{array} } \right]  
a_{21} = \left[ {\begin{array}{c} 50 \\ 10 \end{array} } \right]  
a_{22} = \left[ {\begin{array}{c} 5 \\ 80 \end{array} } \right]
$$</p>

Then convert them to spherical coordinates:

<p>$$
\b{a_{11}} = R \cdot \left[ {\begin{array}{c} x_{11} \\ y_{11} \\ z_{11} \end{array} } \right] \\
       = \left[ {\begin{array}{c} \cos(\theta) \cos(\phi) \\ \cos(\theta) \sin(\phi) \\ \sin(\theta) \end{array} } \right] \\
       = \left[ {\begin{array}{c} \cos(10) \cos(20) \\ \cos(10) \sin(20) \\ \sin(10) \end{array} } \right] \\
       = \left[ {\begin{array}{c} 5896 \\ 2146 \\ 1106 \end{array} } \right] \\
$$</p>

And do the same for the other three points:

<p>$$
\b{a_{12}} = \left[ {\begin{array}{c} 0.0 \\ 3186 \\ 5517 \end{array} } \right]  
\b{a_{21}} = \left[ {\begin{array}{c} 4033 \\ 711 \\ 4880 \end{array} } \right]  
\b{a_{22}} = \left[ {\begin{array}{c} 1102 \\ 6250 \\ 555 \end{array} } \right]
$$</p>

Now calculate the normal vectors for arc 1 and 2 by taking the cross-product:

<p>\begin{align}
\b{N_1} &= \b{a_{11}} \times \b{a_{12}} \\
        &= \left[ {\begin{array}{c} 5896 \\ 2146 \\ 1106 \end{array} } \right] \times \left[ {\begin{array}{c} 0.0 \\ 3186 \\ 5517 \end{array} } \right] \\
        &= \left[ {\begin{array}{c} 8.316e6 \\ -3.253e7 \\ 1.878e7 \end{array} } \right] \\
\b{N_2} &= \b{a_{21}} \times \b{a_{22}} \\
        &= \left[ {\begin{array}{c} 4033 \\ 711 \\ 4880 \end{array} } \right] \times \left[ {\begin{array}{c} 1102 \\ 6250 \\ 555 \end{array} } \right] \\
        &= \left[ {\begin{array}{c} -3.011e7 \\ 3.139e6 \\ 2.442e7 \end{array} } \right]
\end{align}</p>

Now calculate the "normal of the normals":

<p>\begin{align}
\b{L} &= \b{N_1} \times \b{N_2} \\
      &= \left[ {\begin{array}{c} 8.316e6 \\ -3.253e7 \\ 1.878e7 \end{array} } \right] \times \left[ {\begin{array}{c} -3.011e7 \\ 3.139e6 \\ 2.442e7 \end{array} } \right] \\
      &= \left[ {\begin{array}{c} -8.535e+14 \\ -7.686e+14 \\ -9.533e+14 \end{array} } \right]
\end{align}</p>

Now find the two points of intersection of the arc planes:

<p>\begin{align}
\b{I_1} &= \frac{ \b{L} }{ || \b{L}|| } \\
        &= \left[ {\begin{array}{c} -8.535e+14 \\ -7.686e+14 \\ -9.533e+14 \end{array} } \right] \cdot \frac{1}{ 1.493e15 } \\
        &= \left[ {\begin{array}{c} -0.5717737 \\ -0.51491737 \\ -0.63869785 \end{array} } \right] \\
\b{I_2} &= -\b{I_1} \\
        &= \left[ {\begin{array}{c} 0.5717737 \\ 0.51491737 \\ 0.63869785 \end{array} } \right] \\
\end{align}</p>

Check if these intersecting points are within the original arc segments:

<p>\begin{align}

\end{align}</p>


## External Resources

[https://stackoverflow.com/questions/2954337/great-circle-rhumb-line-intersection](https://stackoverflow.com/questions/2954337/great-circle-rhumb-line-intersection) is a great page showing how to calculate the intersection between a arc and a Rhumb line (similar to above).

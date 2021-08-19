---
authors: [ "Geoffrey Hunter" ]
date: 2018-02-26 18:27:01+00:00
draft: false
title: Geodesic Calculator Added To NinjaCalc
type: post
categories:
- NinjaCalc
tags:
- bearing
- calculator
- coordinates
- distance
- earth
- free
- geodesics
- great circle
- haversine
- intermediate point
- NinjaCalc
- online
- web app
- world
---

[NinjaCalc has a new calculator, a "Two Coordinate Geodesics" calculator](http://ninja-calc.mbedded.ninja/calc/distance-between-two-coordinates) that can help you analyse properties of two coordinates/points on the earth's surface (defined by latitude/longitude).

Given two points in latitude/longitude form (both degrees and radians supported), the calculator can give you the great circle (shortest) distance between the two points, and the initial/final bearings. This calculator can also find an intermediate coordinate/point between the two coordinates, given a fractional amount (such as 0.5). All of these properties are calculated using the [Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula).

{{< figure src="/images/2018/02/ninja-calc-two-coordinate-geodesics-calculator-screenshot.png" width="450px" caption="A screenshot of the 'Two Coordinate Geodesics' calculator in NinjaCalc." width="400px" >}}

All these properties are shown on a interactive model of the earth in 3D (the sphere can be rotated).

This calculator can be found in the NinjaCalc web app at [http://ninja-calc.mbedded.ninja/](http://ninja-calc.mbedded.ninja/).
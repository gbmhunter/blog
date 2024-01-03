---
authors: [ Geoffrey Hunter ]
categories: [ Mathematics, Geometry ]
date: 2023-12-29
draft: false
lastmod: 2024-01-03
tags: [ law of sines, law of cosines, triangles, angles, lengths, equations ]
title: Triangles
type: page
---

## Overview

Triangle geometry pops up time and time again in engineering, in all sorts of things such as robotics, motors, linkages, maps, and sensing (e.g. GPS or ultrasound). It's helpful to know how to work with triangles and solve for things like unknown side lengths and angles, areas, e.t.c.

This page will teach you how! If you have a right-angles triangle and what to calculate unknown edge lengths or angles, use the basic trigonometric ratios (SOH CAH TOA). If you have a non-right angled triangle but want to also want to solve for lengths and/or angles, use the [Law of Sines](#law-of-sines) and/or [Law of Cosines](#law-of-cosines). 

## Law of Sines

### The Equation

The _Law of Sines_ is a useful equation for determining unknown lengths and angles of any triangle (not just right-angled triangles) if you know some of the other lengths and angles. Together with the Law of Cosines you can find the lengths and angles of any triangle as long as you know enough values already to fully-constrain it.

{{% figure ref="fig-law-of-sines-diagram" src="_assets/law-of-sines-diagram.webp" width="400px" caption="Diagram illustrating the variables used in the Law of Sines." %}}

If a triangle has lengths of `\(a\)`, `\(b\)`, and `\(c\)` and opposite angles of `\(A\)`, `\(B\)`, and `\(C\)` respectively (as shown in {{% ref "fig-law-of-sines-diagram" %}}), then the Law of Sines is:

<p>\begin{align}
\frac{\sin{A}}{a} = \frac{\sin{B}}{b} = \frac{\sin{C}}{c}
\end{align}</p>

This means that the sine of the angle divided by the opposite length is the same value for all three angle/side pairs.

### What Are Opposite Angles?

The opposite angle for any side of a triangle is the angle which does not "touch" the side in question. For example, if `\(a\)` was a side of a triangle, then it's opposite angle `\(A\)` would be the angle enclosed by sides `\(b\)` and `\(c\)`. The angle is directly "opposite" the side.

{{% aside type="tip" %}}

The lengths `\(a\)`, `\(b\)`, and `\(c\)` and opposite angles of `\(A\)`, `\(B\)`, and `\(C\)` may be moved around the triangle, the letters do not have a particular "side" they belong to. What is important is that `\(A\)` is always the angle opposite side `\(a\)` and so on.

{{% /aside %}}

{{% aside type="example" title="Basic Law of Sines Calculation" %}}

Given the triangle shown in {{% ref "fig-law-of-sines-example-1-diagram" %}}, calculate the length of side `\(a\)`.

{{% figure ref="fig-law-of-sines-example-1-diagram" src="_assets/law-of-sines-example-1-diagram.webp" width="400px" caption="Diagram for Example 1." %}}

We'll flip the Law of Sines equation and just use one equality:

<p>\begin{align}
\frac{a}{\sin{A}} = \frac{b}{\sin{B}}
\end{align}</p>

Re-arranging for `\(a\)`:

<p>\begin{align}
a = \sin{A}\frac{b}{\sin{B}}
\end{align}</p>

Plugging in the numbers:

<p>\begin{align}
a &= \sin{A}\frac{b}{\sin{B}} \\
  &= \sin{(72^{\circ})}\frac{31\text{mm}}{\sin{(45^{\circ})}} \\
  &= 47.1\text{mm} \\
\end{align}</p>

{{% /aside %}}

### Watch Out For Ambiguity

In certain circumstances, there is more than one possible answer when calculating values using the Law of Sines. This occurs in a specific situation, when[^libretexts-maths-the-law-of-sines]:

* You know the length of two sides of the triangle (`\(a\)` and `\(b\)`) and one opposite angle `\(A\)` (and thus are trying to calculate the other opposite angle `\(B\)`).
* Angle `\(A\)` is in the range `\(0^{\circ} < A < 90^{\circ}\)` (i.e. is acute).
* Length `\(a\)` is greater than `\(h\)` but less than `\(b\)`, where `\(h\)` is the "vertical" height as shown in {{% ref "fig-law-of-sines-ambiguous-case-diagram" %}}.

{{% figure ref="fig-law-of-sines-ambiguous-case-diagram" src="_assets/law-of-sines-ambiguous-case-diagram.webp" width="1000px" caption="Diagram showing the situations when you know two sides of the triangle and 1 opposite angle. c) is the ambiguous cases which has two possible solutions." %}}

Mathematically this occurs because `\(\sin^{-1}\)` can give two answers in the range of `\([0, 180]\)` (a valid angle of a triangle has to be within this range). For example, `\(\sin^{-1}(0.6)\)` gives the following values:

<p>\begin{align}
\sin^{-1}(0.6) &= 36.9^{\circ} && \text{This is what the calculator will give you} \\
\sin^{-1}(0.6) &= 180.0^{\circ} - 36.9^{\circ} \\
               &= 143.1^{\circ} \\
\end{align}</p>

Calculators always give you the angle in the range of `\([-90, 90]\)` when using `\(\sin^{-1}\)` (also called `\(asin\)` or `\(arcsin\)`). To get the other answer you have to subtract the calculator answer from `\(180^{\circ}\)`. {{% ref "fig-sine-law-sine-wave-graph" %}} explains the situation in visual manner.

{{% figure ref="fig-sine-law-sine-wave-graph" src="_assets/sine-law-sine-wave-graph.png" width="600px" caption="Graph showing how inverse sine can result in two values between `\([0, 180]\)`." %}}

Ambiguity is not a problem if A is in the range `\(90^{\circ} \leq A < 180^{\circ}\)` (i.e. `\(A\)` is **not** acute). In this scenario, There can either be no solution or just 1 solution, but never 2. {{% ref "fig-law-of-sines-ambiguous-case-a-not-acute-diagram" %}} illustrates this.

{{% figure ref="fig-law-of-sines-ambiguous-case-a-not-acute-diagram" src="_assets/law-of-sines-ambiguous-case-a-not-acute-diagram.webp" width="600px" caption="Diagram showing that when A is not acute, there is no ambiguous case for the Law of Sines." %}}

**If you find yourself in a position with two possible answers, what can you do?** If you don't have any other information about the triangle, then you are out of luck. However, if you know the length of the remaining side of the triangle, you can use the Cosine Law to completely solve for all angles and sides of the triangle. If you know one other angle of the triangle, then you can use the simple fact that all the internal angles sum to `\(180^{\circ}\)` to solve for the angle you were interested in.

{{% aside type="example" title="Ambiguous Law of Sines" %}}

Given the triangle shown in {{% ref "fig-law-of-sines-ambiguous-example-diagram" %}}, calculate the angle of `\(B\)`. This triangle has been designed to be ambiguous (two possible answers).

{{% figure ref="fig-law-of-sines-ambiguous-example-diagram" src="_assets/law-of-sines-ambiguous-example-diagram.webp" width="600px" caption="Diagram for the ambiguous Law of Sines worked example." %}}

Let's start with the Law of Sines equation:

<p>\begin{align}
\frac{\sin{A}}{a} = \frac{\sin{B}}{b}
\end{align}</p>

Re-arrange to solve for `\(B\)`:

<p>\begin{align}
B = \sin^{-1}\left(\frac{b\sin{A}}{a}\right)
\end{align}</p>

Plugging in the values:

<p>\begin{align}
B &= \sin^{-1}\left(\frac{44\text{mm} \cdot \sin{37.5^{\circ}}}{28\text{mm}}\right) \\
  &= \sin^{-1}(0.957)
\end{align}</p>

The calculator will give us (this is the answer using the **solid** blue line in {{% ref "fig-law-of-sines-ambiguous-example-diagram" %}}):

<p>\begin{align}
B &= \sin^{-1}(0.957) \\
  &= 73.1^{\circ}
\end{align}</p>

And the other solution is `\(180\)` minus this (this is the answer using the **dotted** blue line in {{% ref "fig-law-of-sines-ambiguous-example-diagram" %}}):

<p>\begin{align}
B &= 180^{\circ} - \sin^{-1}(0.957) \\
  &= 107^{\circ}
\end{align}</p>

{{% /aside %}}

## Law of Cosines

The Law of Cosines (also known as the cosine formula or cosine rule[^wikipedia-law-of-cosines]) is an equation similar to the [Law of Sines](#law-of-sines) which lets you calculate unknown sides and opposite angles if you know some of the others.

### Equation

The Law of Cosines equation is:

<p>\begin{align}
c^2 &= a^2 + b^2 - 2ab\cos{C} \\
\end{align}</p>

<p class="centered">
where:<br />
\(a\), \(b\) and \(c\) are side lengths of the triangle<br />
\(C\) is the opposite angle of side \(c\)<br />
</p>

{{% ref "fig-law-of-cosines-diagram" %}} shows the side and angles involved in the Law of Cosines equation. Knowing all but one of these values, you can calculate the last one by re-arranging the equation.

{{% figure ref="fig-law-of-cosines-diagram" src="_assets/law-of-cosines-diagram.webp" width="400px" caption="Diagram showing the sides and angles involved in the Law of Cosines." %}}

**The law of cosines is useful for solving the sides and angles of a triangle when all three sides are known, or two sides and their included angle are known.** If you know two angles and a side, or two sides and an angle other than the included angle, use the [law of sines](#law-of-sines) instead.

{{% aside type="note" %}}
While the Law of Sines has a [potential to be ambiguous](#watch-out-for-ambiguity), the same problem does not exist for the Law of Cosines.
{{% /aside %}}

### Calculators

Google has a handy Law of Cosines calculator that pops up when you search ["law of cosines"](https://www.google.com/search?q=law+of+cosines). {{% ref "fig-law-of-cosines-google-calculator" %}} shows a screenshot of it.

{{% figure ref="fig-law-of-cosines-google-calculator" src="_assets/law-of-cosines-google-calculator.png" width="600px" caption="Screenshot of the Law of Cosines calculator Google provides when you search \"law of cosines\"[^google-law-of-cosines-calc]." %}}

## References

[^libretexts-maths-the-law-of-sines]: Libretexts: Mathematics. _2.1: The Law of Sines_. Retrieved 2023-12-31, from https://math.libretexts.org/Bookshelves/Precalculus/Elementary_Trigonometry_(Corral)/02%3A_General_Triangles/2.01%3A_The_Law_of_Sines
[^google-law-of-cosines-calc]: Google. _Law of Cosines_ [Search Results]. Retrieved 2024-01-03, from https://www.google.com/search?q=law+of+cosines.
[^wikipedia-law-of-cosines]: Wikipedia (2023, Dec 27). _Law of cosines_. Retrieved 2024-01-03, from https://en.wikipedia.org/wiki/Law_of_cosines.

---
authors: [ Geoffrey Hunter ]
categories: [ Mathematics, Geometry ]
date: 2023-12-29
draft: false
lastmod: 2023-12-29
tags: [ law of sines, law of cosines, triangles, angles, lengths, equations ]
title: Triangles
type: page
---

## Law of Sines

The _Law of Sines_ is a useful equation for determining unknown lengths and angles of any triangle (not just right-angled triangles) if you know some of the other lengths and angles. Together with the Law of Cosines you can find the lengths and angles of any triangle as long as you know enough values already to fully-constrain it.

{{% figure ref="fig-law-of-sines-diagram" src="_assets/law-of-sines-diagram.webp" width="400px" caption="Diagram illustrating the variables used in the Law of Sines." %}}

If a triangle has lengths of `\(a\)`, `\(b\)`, and `\(c\)` and opposite angles of `\(A\)`, `\(B\)`, and `\(C\)` respectively (as shown in {{% ref "fig-law-of-sines-diagram" %}}), then the Law of Sines is:

<p>\begin{align}
\frac{\sin{A}}{a} = \frac{\sin{B}}{b} = \frac{\sin{C}}{c}
\end{align}</p>

This means that the sine of the angle divided by the opposite length is the same value for all three angle/side pairs.

{{% aside type="tip" %}}

The lengths `\(a\)`, `\(b\)`, and `\(c\)` and opposite angles of `\(A\)`, `\(B\)`, and `\(C\)` may be moved around the triangle, the letters do not have a particular "side" they belong to. What is important is that `\(A\)` is always the angle opposite side `\(a\)` and so on.

{{% /aside %}}

{{% aside type="example" %}}

Given the triangle shown in {{% ref "fig-law-of-sines-example-1-diagram" %}}, calculate the length of side `\(x\)`.

{{% figure ref="fig-law-of-sines-example-1-diagram" src="_assets/law-of-sines-example-1-diagram.webp" width="400px" caption="Diagram for Example 1." %}}

We'll flip the Law of Sines equation and just use one equality:

<p>\begin{align}
\frac{a}{\sin{A}} = \frac{b}{\sin{B}} \nonumber
\end{align}</p>

Re-arranging for `\(a\)`:

<p>\begin{align}
a = \sin{A}\frac{b}{\sin{B}} \nonumber
\end{align}</p>

Plugging in the numbers:

<p>\begin{align}
a &= \sin{A}\frac{b}{\sin{B}} \nonumber \\
  &= \sin{(72^{\circ})}\frac{31\text{mm}}{\sin{(45^{\circ})}} \nonumber \\
  &= 47.1\text{mm} \nonumber \\
\end{align}</p>

{{% /aside %}}

### Watch Out For Ambiguity

In certain circumstances, there is more than one possible answer when calculating values using the Law of Sines. This occurs in a specific situation, when[^libretexts-maths-the-law-of-sines]:

* You know the length of two sides of the triangle (`\(a\)` and `\(b\)`) and one opposite angle `\(A\)` (and thus are trying to calculate the other opposite angle `\(B\)`).
* Angle `\(A\)` is in the range `\(0^{\circ} < A < 90^{\circ}\)` (i.e. is acute).
* Length `\(a\)` is greater than `\(h\)` but less than `\(b\)`, where `\(h\)` is the "vertical" height as shown in {{% ref "fig-law-of-sines-ambiguous-case-diagram" %}}.

{{% figure ref="fig-law-of-sines-ambiguous-case-diagram" src="_assets/law-of-sines-ambiguous-case-diagram.webp" width="1000px" caption="Diagram showing the situations when you know two sides of the triangle and 1 opposite angle. c) is the ambiguous cases which has two possible solutions." %}}

Mathematically this occurs because `\(\sin^{-1}\)` can give two answers in the range of `\([0, 180]\)` (a valid angle of a triangle has to be within this range). For example, `\(\sin^{-1}(0.8)\)`.

{{% figure ref="fig-sine-law-sine-wave-graph" src="_assets/sine-law-sine-wave-graph.png" width="600px" caption="Graph showing how inverse sine can result in two values between `\([0, 180]\)`." %}}

**If you find yourself in a position with two possible answers, what can you do?** If you don't have any other information about the triangle, then you are out of luck. However, if you know the length of the remaining side of the triangle, you can use the Cosine Law to completely solve for all angles and sides of the triangle. If you know one other angle of the triangle, then you can use the simple fact that all the internal angles sum to `\(180^{\circ}\)` to solve for the angle you were interested in.

## References

[^libretexts-maths-the-law-of-sines]: Libretexts: Mathematics. _2.1: The Law of Sines_. Retrieved 2023-12-31, from https://math.libretexts.org/Bookshelves/Precalculus/Elementary_Trigonometry_(Corral)/02%3A_General_Triangles/2.01%3A_The_Law_of_Sines



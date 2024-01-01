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

{{% figure src="_assets/law-of-sines-diagram.webp" width="400px" caption="Diagram illustrating the variables used in the Law of Sines." %}}

If a triangle has lengths of `\(a\)`, `\(b\)`, and `\(c\)` and opposite angles of `\(A\)`, `\(B\)`, and `\(C\)` respectively (as shown in the above diagram), then the Law of Sines is:

<p>\begin{align}
\frac{\sin{A}}{a} = \frac{\sin{B}}{b} = \frac{\sin{C}}{c}
\end{align}</p>

This means that the sine of the angle divided by the opposite length is the same value for all three angle/side pairs.

{{% aside type="example" %}}

Given the triangle shown in the below diagram, calculate the length of side `\(x\)`.

{{% figure src="_assets/law-of-sines-example-1-diagram.webp" width="400px" caption="Diagram for Example 1." %}}

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
  &= 47.1\text{mm}
\end{align}</p>

{{% /aside %}}


### Watch Out For Ambiguity

In certain circumstances, there is more than one possible answer when calculating values using the Law of Sines. This occurs when you know two sides and one angle[^libretexts-maths-the-law-of-sines].

## References

[^libretexts-maths-the-law-of-sines]: Libretexts: Mathematics. _2.1: The Law of Sines_. Retrieved 2023-12-31, from https://math.libretexts.org/Bookshelves/Precalculus/Elementary_Trigonometry_(Corral)/02%3A_General_Triangles/2.01%3A_The_Law_of_Sines



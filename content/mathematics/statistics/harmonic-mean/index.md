---
author: "gbmhunter"
categories: [ "Mathematics", "Statistics" ]
date: 2020-03-21
description: "What is the harmonic mean?"
draft: false
lastmod: 2020-03-21
tags: [ "mathematics", "statistics", "harmonic mean", "geometric mean", "arithmetic mean", "classification", "f1 score" ]
title: "Harmonic Mean"
type: "page"
---

## Overview

The harmonic mean is one of the three Pythagorean means, along with the arithmetic mean and geometric mean.

The harmonic mean for a set of positive, real numbers `\( x_1, x_2, ..., x_n \)` is defined as[^wikipedia-harmonic-mean]:

<p>$$ H = \frac{n}{ \frac{1}{x_1} + \frac{1}{x_2} + ... + \frac{1}{x_n} } $$</p>

For example, the harmonic mean `\(H\)` of the set `\( 2, 3, 6 \)` is:

<p>\begin{align}
H &= \frac{3}{ \frac{1}{2} + \frac{1}{3} + \frac{1}{6} } \\
  &= \frac{3}{1} \\
  &= 3 
\end{align}</p>

## How Is It Related To the Arithmetic And Geometric Means?

For all positive data sets containing at least one pair of non-equal values, the harmonic mean is always the least of the three means[^].

## Uses

The harmonic mean is used to calculate the `\( F_1 score \)` when performing classification. This is useful in classification algorithms such as {{% link text="logistic regression" src="/programming/artificial-intelligence/understanding-logistic-regression" %}}.

[^wikipedia-harmonic-mean]: https://en.wikipedia.org/wiki/Harmonic_mean
[^]: http://ajmaa.org/RGMIA/papers/v2n1/v2n1-10.pdf
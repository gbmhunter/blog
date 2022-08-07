---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Artificial Intelligence" ]
date: 2020-02-04
description: "What is the sigmoid function, and how is it used in neural networks?"
draft: false
lastmod: 2020-03-04
tags: [ "programming", "artificial intelligence", "AI", "Sigmoid", "function", "mathematics", "S curve", "machine learning", "logistic function", "logistic regression" ]
title: "The Sigmoid Function"
type: "page"
---

The sigmoid function is a mathematical function which when plotted, has a characteristic "S" shape or sigmoid curve. Sigmoid curves include many cumulative distribution functions (CDFs), including the CDF of the normal distribution. They are also used in neural networks as an activation function.

## Logistic Function

The logistic function is given by the following equation:

<p>$$
S(x) = \frac{1}{1 + e^{-x}}
$$</p>

Plotted from `\(x = -10\)` to `\(x = 10\)`, the function looks like this:

{{% figure src="graph-logistic-function.png" width="700px" caption="A graph of the logistic function." %}}

The logistic function pops up in _logistic regression_ (a popular algorithm used in machine learning) in the form:

<p>$$
P = \frac{1}{1 + e^{-(a + b_i X_i)}}
$$</p>

<p class="centered">
where:<br>
\(P\) is the probability of success
(\a, b_i\) are coefficients
\(X_i\) are feature variables
</p>
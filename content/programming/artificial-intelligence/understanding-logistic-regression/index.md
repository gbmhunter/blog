---
author: "gbmhunter"
categories: [ "Programming", "Artificial Intelligence" ]
date: 2020-02-21
description: "What is logistic regression, and how does it work?"
draft: true
lastmod: 2020-02-21
tags: [ "programming", "artificial intelligence", "logistic regression", "logit regression", "probability", "odds" ]
title: "Understanding Logistic Regression"
type: "page"
---

## Overview

_Logistic regression_ (or _logit regression_) is a very common and popular algorithm that is used in machine learning. It is used for making binary categorical predictions, such as "is it going to rain today?" or more precisely, it can be used to give a percentage chance of it raining today. Logistic regression can also be extended to make many-option categorical predictions, such as "is it more likely to be sunny, overcast, or rainy today?".

## Probability and Odds

Before learning about logistic regression, it is wise to understand the terms probability and odds.

We'll start with a real simple equation. The probability `\(P\)` of a binary event occurring is:

<p>$$ P $$</p>

The probability of a binary event not occurring must then be:

<p>$$ 1 - P $$</p>

The Odds is defined as the **ratio of success to the ratio of failure**.

<p>$$ O = \frac{P}{1 - P} $$</p>

It should be clear from the above equation that if `\(P\)` can vary in the range `\([0, 1]\)` then `\(O\)` can vary in the range `\([0, \infty]\)`. The higher the odds, the higher the chance of success. This should sound very familiar to gamblers, who use this term frequently.

## Why Use The Logarithmic Function?

The reason we introduce the `\(ln()\)` function into the equation begins to make sense once you understand basic linear regression, which can be used to predict the probability of continuous target variables. The basic equation defining linear regression is:

<p>$$
aX + b = Y\\
-\infty &lt; X &lt; \infty\\
-\infty &lt; Y &lt; \infty 
$$</p>


The problem with using linear regression for making binary categorical predictions (i.e. `true/false`) is that `\(Y\)` can vary from `\(-\infty\)` to `\(+\infty\)`. We really want `\(Y\)` to range from `\(0\)` to `\(1\)`. When varying between `\(0\)` and `\(1\)`, this tells us the probability of the target being `true` or `false`. For example, if `\(Y=0.7\)` this would say there is a 70% chance of the target being `true`, and conversely a 30% chance of the target being `false`.

To make things less confusing, we will replace `\(Y\)` which is used to represent a continuous target variable with `\(P\)` (for probability), which is used to represent the probability:

<p>$$
aX + b = P\\
-\infty &lt; X &lt; \infty\\
0 \leq P \leq 1 
$$</p>

Notice a problem? This limits of the LHS and RHS of the equation don't match up! This is where we begin to understand why the log function is introduced. We will try and modify the RHS such that it has the same range as the LHS (`\(-\infty\)` to `\(+\infty\)`). What if we replace the probability `\(P\)` on the LHS with the odds `\(O\)`:

<p>$$
aX + b = O\\
-\infty \leq X &lt; \infty\\
0 \leq O &lt; \infty 
$$</p>

<p class="centered">
where:<br>
\(O\) are the odds
</p>

We are getting closer! Now the RHS varies from `\(0\)` to `\(\infty\)` rather than from just `\(0\)` to `\(1\)`. So how do we modify a number which ranges from `\(0\)` to `\(1\)` to range from `\(-\infty\)` to `\(+\infty\)`? One way is to use the `ln()` function! (to recap some mathematics, the `ln` of values between 0 and 1 map from `\(-\infty\)` and `\(0\)`, and the `ln` of values from `\(1\)` to `\(\infty\)` map to `\(0\)` to `\(\infty\)`.)

<p>$$
aX + b = \ln(O)\\
-\infty &lt; X &lt; \infty\\
-\infty &lt; \ln(O) &lt; \infty 
$$</p>

The ranges on both sides of the equation now match! The base of the logarithm does not actually matter. We choose to use the natural logarithm (`\(\ln\)`) but you could use any other base such as base 10 (typically written as `\(log_{10}\)` or just `\(log\)`).

**Now we can see why it's called logistic regression**, and why it is useful.

However, the equation is usually re-arranged with `\(P\)` on the LHS.

<p>\begin{align}
\ln(O)              &= aX + b\\
O                   &= e^{aX + b}                         &\text{Take the exponential of both sides}\\
\frac{P}{1 - P}     &= e^{aX + b}                         &\text{Substitute $O$ as per equation XXX}\\
P                   &= e^{aX + b}(1 - P)                  &\text{Multiply both sides by $(1 - P)$}\\
P                   &= e^{aX + b} - Pe^{aX + b}           &\text{Expand RHS}\\
P + Pe^{aX + b}     &= e^{aX + b}                         &\text{Move all terms with $P$ to the LHS}\\
P(1 + e^{aX + b})   &= e^{aX + b}                         &\text{Factor the $P$}\\
P                   &= \frac{e^{aX + b}}{1 + e^{aX + b}}  &\text{Divide both sides of equation by $1 + e^{aX + b}$}\\
P                   &= \frac{1}{\frac{1}{e^{aX + b}} + 1} &\text{Divide top and bottom of RHS fraction by $e^{aX + b}$}\\
P                   &= \frac{1}{1 + e^{-(aX + b)}}        &\text{Use rule $\frac{1}{e^x} = e^{-x}$}
\end{align}</p>

As you can see from above, `\(P\)` is now a form of a sigmoid function.


https://towardsdatascience.com/logit-of-logistic-regression-understanding-the-fundamentals-f384152a33d1
---
author: gbmhunter
date: 2018-06-05 21:55:54+00:00
draft: false
title: Convolution
type: page
url: /programming/signal-processing/convolution
---

## Overview

Convolution is a mathematic operation that can be performed on two functions, which produces a third output function which is a "blend" of the two inputs.

Convolution can be thought of as a measure of the amount of overlap of one function as it is shifted over the other function

## Formal Definition

<div>$$ f \ast g = \int_{-\infty}^{\infty} f(\tau)\ g(t - \tau) d \tau $$</div>

## Mathematical Properties

Convolution is **commutative**:

<div>$$ f \ast g = g \ast f $$</div>

Convolution is **associative**:

<div>$$ (f \ast g) \ast h = f \ast (g \ast h) $$</div>

Convolution is **distributive**:

<div>$$ f \ast (g + h) = f \ast g + f \ast h $$</div>

These other properties also hold true:

<div>$$ a (f \ast g) = (af) \ast g $$</div>

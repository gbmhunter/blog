---
author: gbmhunter
date: 2018-06-05
draft: false
title: Convolution
type: page
---

## Overview

Convolution is a mathematic operation that can be performed on two functions, which produces a third output function which is a "blend" of the two inputs.

Convolution can be thought of as a measure of the amount of overlap of one function as it is shifted over the other function

## Formal Definition

<p>$$ f \ast g = \int_{-\infty}^{\infty} f(\tau)\ g(t - \tau) d \tau $$</p>

## Mathematical Properties

Convolution is **commutative**:

<p>$$ f \ast g = g \ast f $$</p>

Convolution is **associative**:

<p>$$ (f \ast g) \ast h = f \ast (g \ast h) $$</p>

Convolution is **distributive**:

<p>$$ f \ast (g + h) = f \ast g + f \ast h $$</p>

These other properties also hold true:

<p>$$ a (f \ast g) = (af) \ast g $$</p>

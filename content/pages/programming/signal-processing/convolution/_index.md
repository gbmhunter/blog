---
author: gbmhunter
date: 2018-06-05 21:55:54+00:00
draft: false
title: Convolution
type: page
url: /programming/signal-processing/convolution
---

[mathjax]




Overview




Convolution is a mathematic operation that can be performed on two functions, which produces a third output function which is a "blend" of the two inputs.




Convolution can be thought of as a measure of the amount of overlap of one function as it is shifted over the other function




# Formal Definition




$$ f \ast g = \int_{-\infty}^{\infty} f(\tau)\ g(t - \tau) d \tau $$




# Mathematical Properties




Convolution is **commutative**:




$$ f \ast g = g \ast f $$




Convolution is **associative**:




$$ (f \ast g) \ast h = f \ast (g \ast h) $$




Convolution is **distributive**:




$$ f \ast (g + h) = f \ast g + f \ast h $$




These other properties also hold true:




$$ a (f \ast g) = (af) \ast g $$

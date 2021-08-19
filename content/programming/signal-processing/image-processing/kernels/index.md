---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Image Processing" ]
date: 2019-05-08
draft: false
tags: [ "programming", "image processing" ]
title: "Image Processing"
type: page
---

# Seperability

A kernel `k` is seperable if and only if all of it's rows are multiples of each other. Intuitivly, this means you can pick any row `l` and then make a column of mulitplicative factors `g`, so that:

<p>$$ \mathbf{K} = \vec{f} \cross \vec{g} $$</p>
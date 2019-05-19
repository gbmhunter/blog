---
author: gbmhunter
categories: [ "Mathematics" ]
date: 2017-10-30
draft: false
tags: [ "Perlin", "noise", "clouds", "Ken Perlin", "computer graphics" ]
title: Perlin Noise
type: page
---

## Overview

**Perlin noise** is commonly used to create natural looking textures in computer graphics. A common example is it's use to create a randomly generated landscape, or realistic looking clouds.

{{< img src="perlin-noise-cloud-example.png" width="331px" caption="Rendered Perlin noise that has been configured to make realistic looking clouds." >}}

Ken Perlin invented the Perlin noise algorithm following CGI work on the movie Tron.

## Libraries

<a href="https://github.com/Reputeless/PerlinNoise">siv::PerlinNoise</a> is a good header-only Perlin noise library for C++.

The <a href="https://pypi.python.org/pypi/noise/">Python library noise</a> has Perlin "improved" noise and Perlin simplex noise algorithms.
